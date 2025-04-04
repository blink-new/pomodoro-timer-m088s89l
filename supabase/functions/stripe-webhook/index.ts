
import { serve } from "https://deno.fresh.dev/std@0.168.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@14.16.0?target=deno";

const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY')!, {
  apiVersion: '2023-10-16',
  httpClient: Stripe.createFetchHttpClient(),
});

const webhookSecret = Deno.env.get('STRIPE_WEBHOOK_SECRET')!;

serve(async (req) => {
  try {
    if (req.method !== 'POST') {
      return new Response('Method not allowed', { status: 405 });
    }

    const signature = req.headers.get('stripe-signature');
    if (!signature) {
      return new Response('No signature', { status: 400 });
    }

    const body = await req.text();
    let event: Stripe.Event;

    try {
      event = stripe.webhooks.constructEvent(
        body,
        signature,
        webhookSecret
      );
    } catch (err) {
      console.error(`Webhook signature verification failed: ${err instanceof Error ? err.message : 'Unknown error'}`);
      return new Response('Invalid signature', { status: 400 });
    }

    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session;
        // Handle successful checkout
        // TODO: Update user's subscription status in Supabase
        console.log('Checkout completed:', session.id);
        break;
      }

      case 'payment_intent.succeeded': {
        const paymentIntent = event.data.object as Stripe.PaymentIntent;
        // Handle successful payment
        console.log('Payment succeeded:', paymentIntent.id);
        break;
      }

      case 'customer.subscription.created':
      case 'customer.subscription.updated': {
        const subscription = event.data.object as Stripe.Subscription;
        // TODO: Update subscription status in Supabase
        console.log('Subscription event:', subscription.id, event.type);
        break;
      }

      case 'customer.subscription.deleted': {
        const subscription = event.data.object as Stripe.Subscription;
        // TODO: Handle subscription cancellation in Supabase
        console.log('Subscription cancelled:', subscription.id);
        break;
      }

      default: {
        console.log(`Unhandled event type: ${event.type}`);
      }
    }

    return new Response(JSON.stringify({ received: true }), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error('Error:', err);
    return new Response('Internal server error', { status: 500 });
  }
});
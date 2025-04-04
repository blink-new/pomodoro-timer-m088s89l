
import express from 'express';
import Stripe from 'stripe';
import dotenv from 'dotenv';

dotenv.config();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16',
});

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export const webhookRouter = express.Router();

webhookRouter.post('/stripe', express.raw({ type: 'application/json' }), async (req, res) => {
  try {
    const signature = req.headers['stripe-signature']!;

    let event: Stripe.Event;

    try {
      event = stripe.webhooks.constructEvent(
        req.body,
        signature,
        webhookSecret
      );
    } catch (err) {
      console.error(`Webhook signature verification failed: ${err instanceof Error ? err.message : 'Unknown error'}`);
      return res.status(400).json({ error: 'Invalid signature' });
    }

    try {
      switch (event.type) {
        case 'checkout.session.completed': {
          const session = event.data.object as Stripe.Checkout.Session;
          // Handle successful checkout
          // - Update user's subscription status
          // - Grant access to paid features
          // - Send welcome email
          console.log('Checkout completed:', session.id);
          break;
        }

        case 'payment_intent.succeeded': {
          const paymentIntent = event.data.object as Stripe.PaymentIntent;
          // Handle successful payment
          console.log('Payment succeeded:', paymentIntent.id);
          break;
        }

        case 'payment_intent.payment_failed': {
          const paymentIntent = event.data.object as Stripe.PaymentIntent;
          // Handle failed payment
          // - Notify user
          // - Update order status
          console.log('Payment failed:', paymentIntent.id);
          break;
        }

        case 'customer.subscription.created':
        case 'customer.subscription.updated': {
          const subscription = event.data.object as Stripe.Subscription;
          // Handle subscription updates
          // - Update user's subscription status
          // - Update access levels
          console.log('Subscription event:', subscription.id, event.type);
          break;
        }

        case 'customer.subscription.deleted': {
          const subscription = event.data.object as Stripe.Subscription;
          // Handle subscription cancellation
          // - Remove access to paid features
          // - Update user's status
          console.log('Subscription cancelled:', subscription.id);
          break;
        }

        default: {
          console.log(`Unhandled event type: ${event.type}`);
        }
      }
    } catch (err) {
      console.error(`Error processing webhook: ${err instanceof Error ? err.message : 'Unknown error'}`);
      return res.status(500).json({ error: 'Webhook processing failed' });
    }

    res.json({ received: true });
  } catch (err) {
    console.error('Error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});
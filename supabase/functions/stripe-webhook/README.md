
# Stripe Webhook Edge Function

This Edge Function handles Stripe webhook events for payment processing and subscription management.

## Setup

1. Deploy the function to Supabase:
```bash
supabase functions deploy stripe-webhook
```

2. Set the required secrets in Supabase:
```bash
supabase secrets set STRIPE_SECRET_KEY=sk_test_...
supabase secrets set STRIPE_WEBHOOK_SECRET=whsec_...
```

3. In your Stripe Dashboard:
   - Go to Developers → Webhooks
   - Add endpoint: `https://<project-ref>.supabase.co/functions/v1/stripe-webhook`
   - Copy the signing secret and set it as STRIPE_WEBHOOK_SECRET
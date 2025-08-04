# Paymongo Integration Setup Guide

## Overview
This guide will help you set up Paymongo payment processing for UsapUpgrade, enabling premium subscriptions and monetization.

## Step 1: Create Paymongo Account

1. Go to [Paymongo Dashboard](https://dashboard.paymongo.com)
2. Sign up for a Paymongo account
3. Complete your business verification
4. Get your API keys from the dashboard

## Step 2: Environment Variables

Add these environment variables to your Vercel project:

```bash
# Paymongo Configuration
NEXT_PUBLIC_PAYMONGO_PUBLIC_KEY=pk_test_your_public_key
PAYMONGO_SECRET_KEY=sk_test_your_secret_key
PAYMONGO_WEBHOOK_SECRET=whsec_your_webhook_secret
```

### Getting Your API Keys:

1. **Public Key**: Found in your Paymongo dashboard under "API Keys"
2. **Secret Key**: Found in your Paymongo dashboard under "API Keys" 
3. **Webhook Secret**: Generated when you create a webhook

## Step 3: Set Up Webhooks

1. In your Paymongo dashboard, go to "Webhooks"
2. Create a new webhook with these settings:
   - **URL**: `https://usapupgrade.com/api/payment/webhook`
   - **Events**: Select all payment events
   - **Secret**: Copy the generated webhook secret

## Step 4: Database Tables

Ensure your Supabase database has these tables:

### payments table
```sql
CREATE TABLE payments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  paymongo_payment_id TEXT UNIQUE,
  amount INTEGER NOT NULL,
  currency TEXT DEFAULT 'PHP',
  status TEXT DEFAULT 'pending',
  payment_method TEXT,
  metadata JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### payment_intents table
```sql
CREATE TABLE payment_intents (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  paymongo_intent_id TEXT UNIQUE,
  user_id UUID REFERENCES users(id),
  amount INTEGER NOT NULL,
  status TEXT DEFAULT 'pending',
  metadata JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

## Step 5: Test the Integration

### Test Payment Flow:
1. Go to your payment page: `https://usapupgrade.com/payment`
2. Select a payment method (GCash, GrabPay, Card)
3. Complete the payment
4. Verify the user is upgraded to premium

### Test Webhook:
1. Use Paymongo's webhook testing tool
2. Send a test payment event
3. Check your logs for webhook processing

## Step 6: Production Deployment

### Update Environment Variables:
```bash
# Production Paymongo Keys
NEXT_PUBLIC_PAYMONGO_PUBLIC_KEY=pk_live_your_production_key
PAYMONGO_SECRET_KEY=sk_live_your_production_key
PAYMONGO_WEBHOOK_SECRET=whsec_your_production_webhook_secret
```

### Update Webhook URL:
- Change webhook URL to: `https://usapupgrade.com/api/payment/webhook`

## Payment Flow

1. **User clicks "Pay"** → Creates payment intent
2. **Payment source created** → Redirects to payment gateway
3. **User completes payment** → Paymongo processes payment
4. **Webhook received** → Updates user to premium
5. **User redirected** → Success/failed page

## Supported Payment Methods

- **GCash**: Most popular in Philippines
- **GrabPay**: Widely used e-wallet
- **Credit/Debit Cards**: Visa, Mastercard, etc.
- **PayMaya**: Another popular e-wallet
- **Billease**: Installment payments

## Pricing

- **Original Price**: ₱1,999
- **Discounted Price**: ₱499
- **Voucher Support**: Yes (DEMO50 for ₱50 off)

## Troubleshooting

### Common Issues:

1. **Payment Intent Creation Fails**
   - Check API keys are correct
   - Verify environment variables are set
   - Check network connectivity

2. **Webhook Not Receiving Events**
   - Verify webhook URL is correct
   - Check webhook secret matches
   - Ensure HTTPS is enabled

3. **User Not Upgraded to Premium**
   - Check webhook processing logs
   - Verify database connection
   - Check user ID matching

### Debug Mode:
The system includes fallback mock data for development. Check console for warnings about demo keys.

## Security Considerations

1. **Webhook Verification**: All webhooks are verified using HMAC signatures
2. **API Key Security**: Secret keys are server-side only
3. **Payment Validation**: All payments are verified before granting access
4. **Database Logging**: All payment attempts are logged for audit

## Support

For payment-related issues:
- Email: support@usapupgrade.com
- WhatsApp: +63 912 345 6789
- Paymongo Support: Available in dashboard

## Next Steps

After setting up Paymongo:

1. **Monitor Payments**: Check Paymongo dashboard regularly
2. **Analytics**: Track conversion rates and payment methods
3. **Customer Support**: Be ready to handle payment issues
4. **Optimization**: A/B test pricing and payment methods 
# Paymongo Deployment Checklist

## Pre-Deployment Setup

### ✅ Environment Variables
- [ ] `NEXT_PUBLIC_PAYMONGO_PUBLIC_KEY` set in Vercel
- [ ] `PAYMONGO_SECRET_KEY` set in Vercel  
- [ ] `PAYMONGO_WEBHOOK_SECRET` set in Vercel
- [ ] `NEXT_PUBLIC_APP_URL` set to `https://usapupgrade.com`

### ✅ Database Setup
- [ ] Run `database/payment_tables.sql` in Supabase SQL editor
- [ ] Verify `payments` table created
- [ ] Verify `payment_intents` table created
- [ ] Check RLS policies are active

### ✅ Paymongo Dashboard
- [ ] Account created and verified
- [ ] API keys obtained (test mode)
- [ ] Webhook configured with URL: `https://usapupgrade.com/api/payment/webhook`
- [ ] Webhook events selected (payment.paid, payment.failed, etc.)

## API Routes Verification

### ✅ Payment APIs
- [ ] `/api/payment/create-intent` - Creates payment intent
- [ ] `/api/payment/create-source` - Creates payment source
- [ ] `/api/payment/webhook` - Handles webhook events
- [ ] `/api/payment/verify` - Verifies payment completion

### ✅ Voucher System
- [ ] `/api/vouchers/validate` - Validates voucher codes
- [ ] Demo voucher "DEMO50" working

## Frontend Pages

### ✅ Payment Pages
- [ ] `/payment` - Main payment page
- [ ] `/payment/success` - Success page
- [ ] `/payment/failed` - Failed payment page

### ✅ Payment Flow
- [ ] User can select payment method (GCash, GrabPay, Card)
- [ ] Payment intent creation works
- [ ] Redirect to payment gateway works
- [ ] Success/failed redirects work
- [ ] User upgraded to premium after successful payment

## Testing Checklist

### ✅ Test Payment Flow
- [ ] Go to `/payment` page
- [ ] Select payment method
- [ ] Apply voucher "DEMO50"
- [ ] Click "Pay" button
- [ ] Verify payment intent created
- [ ] Verify redirect to payment gateway
- [ ] Complete payment (test mode)
- [ ] Verify webhook received
- [ ] Verify user upgraded to premium
- [ ] Verify success page displayed

### ✅ Test Error Handling
- [ ] Test with invalid API keys
- [ ] Test webhook signature verification
- [ ] Test payment failure scenarios
- [ ] Test network errors

### ✅ Test Voucher System
- [ ] Valid voucher code works
- [ ] Invalid voucher code rejected
- [ ] Demo voucher "DEMO50" gives ₱50 discount
- [ ] Voucher can be removed

## Security Verification

### ✅ API Security
- [ ] Secret keys not exposed in frontend
- [ ] Webhook signature verification working
- [ ] RLS policies protecting payment data
- [ ] User can only see own payments

### ✅ Payment Security
- [ ] Payment amounts validated server-side
- [ ] User authentication required for payments
- [ ] Payment status verified before granting access
- [ ] Audit trail maintained in database

## Production Deployment

### ✅ Environment Variables (Production)
- [ ] Switch to production Paymongo keys
- [ ] Update webhook URL to production domain
- [ ] Verify HTTPS enabled
- [ ] Test production payment flow

### ✅ Monitoring Setup
- [ ] Payment logs in Supabase
- [ ] Error monitoring configured
- [ ] Webhook delivery monitoring
- [ ] Payment success rate tracking

## Post-Deployment Verification

### ✅ Live Testing
- [ ] Test with real GCash account
- [ ] Test with real credit card
- [ ] Verify actual charges processed
- [ ] Verify premium access granted
- [ ] Test voucher system with real codes

### ✅ Support Preparation
- [ ] Support email configured
- [ ] Payment FAQ created
- [ ] Refund policy documented
- [ ] Customer support trained

## Troubleshooting Commands

```bash
# Check environment variables
echo $NEXT_PUBLIC_PAYMONGO_PUBLIC_KEY
echo $PAYMONGO_SECRET_KEY

# Test webhook endpoint
curl -X POST https://usapupgrade.com/api/payment/webhook \
  -H "Content-Type: application/json" \
  -d '{"test": "data"}'

# Check database tables
# Run in Supabase SQL editor:
SELECT * FROM payments LIMIT 5;
SELECT * FROM payment_intents LIMIT 5;
```

## Emergency Rollback

If issues occur:
1. Disable payment button temporarily
2. Revert to demo mode in Paymongo service
3. Check logs for specific errors
4. Contact Paymongo support if needed

## Success Metrics

Track these metrics after deployment:
- Payment conversion rate
- Most popular payment methods
- Average payment completion time
- Support ticket volume
- Revenue generated 
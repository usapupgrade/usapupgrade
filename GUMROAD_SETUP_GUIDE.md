# Gumroad Integration Setup Guide

This guide will help you set up Gumroad payment processing for UsapUpgrade, enabling premium subscriptions and monetization without requiring business registration.

## Step 1: Create Gumroad Account

1. Go to [Gumroad](https://gumroad.com/)
2. Sign up for a free Gumroad account
3. Complete your profile setup

## Step 2: Create Your Product

1. In your Gumroad dashboard, click "Create Product"
2. Set product details:
   - **Name**: "UsapUpgrade Premium"
   - **Description**: "Complete access to all 120+ professional conversation lessons"
   - **Price**: ₱399 (or your preferred price)
   - **Currency**: PHP
   - **Type**: Digital Product
3. Upload a product image (optional)
4. Save the product

## Step 3: Get Product Details

1. In your Gumroad dashboard, find your product
2. Note down:
   - **Product ID**: Found in the product URL (e.g., `usapupgrade`)
   - **Product URL**: The full product link (e.g., `https://gumroad.com/l/usapupgrade`)

## Step 4: Environment Variables

Add these to your `.env.local` file:

```env
# Gumroad Configuration
NEXT_PUBLIC_GUMROAD_PRODUCT_ID=your_product_id_here
NEXT_PUBLIC_GUMROAD_PRODUCT_URL=https://gumroad.com/l/your_product_id
NEXT_PUBLIC_GUMROAD_ENVIRONMENT=development
```

For production, change `NEXT_PUBLIC_GUMROAD_ENVIRONMENT` to `production`.

## Step 5: Set Up Gumroad Webhooks

### In Gumroad Dashboard:
1. Go to your product settings
2. Find "Webhooks" section
3. Add webhook URL: `https://your-domain.com/api/payment/gumroad-webhook`
4. Select events: "Sale completed"
5. Save webhook settings

## Step 6: Database Setup

Run the SQL script in Supabase SQL Editor:

```sql
-- Run database/gumroad_tables.sql in Supabase
```

This creates:
- `purchases` table for detailed purchase logs
- `daily_analytics` table for aggregated stats
- Adds `is_premium` column to users table

## Step 7: Test the Integration

1. Start your development server: `npm run dev`
2. Go to `/payment` page
3. Click "Upgrade to Premium"
4. Complete a test purchase
5. Verify webhook processes the purchase

### Testing with Gumroad:
- Use Gumroad's test mode for development
- Make a small test purchase
- Check that user gets upgraded to premium
- Verify purchase appears in admin dashboard

## Step 8: Production Deployment

1. Update environment variables in Vercel:
   - `NEXT_PUBLIC_GUMROAD_PRODUCT_ID`
   - `NEXT_PUBLIC_GUMROAD_PRODUCT_URL`
   - `NEXT_PUBLIC_GUMROAD_ENVIRONMENT=production`

2. Update webhook URL in Gumroad dashboard to your production domain

3. Test with a real purchase (small amount)

## Troubleshooting

### Common Issues:

1. **"Gumroad widget not loading"**
   - Check that `NEXT_PUBLIC_GUMROAD_PRODUCT_ID` is correct
   - Verify product is published in Gumroad

2. **"Webhook not receiving data"**
   - Check webhook URL in Gumroad dashboard
   - Verify webhook is enabled for "Sale completed" events
   - Check server logs for webhook errors

3. **"User not upgraded to premium"**
   - Check webhook is processing correctly
   - Verify user email matches purchase email
   - Check database for purchase records

4. **"Payment completed but no upgrade"**
   - Check webhook signature verification
   - Verify webhook URL is accessible
   - Check Supabase logs for errors

### Debug Steps:
1. Check browser console for JavaScript errors
2. Check server logs for API errors
3. Verify Gumroad product settings
4. Test webhook with Gumroad's test mode

## Security Considerations

1. **Webhook Verification**: In production, implement proper webhook signature verification
2. **Environment Variables**: Never commit Gumroad credentials to version control
3. **HTTPS**: Ensure webhook URL uses HTTPS in production
4. **Rate Limiting**: Consider adding rate limiting to webhook endpoint

## Support Resources

1. Check Gumroad documentation
2. Review webhook logs in Supabase
3. Test with Gumroad's test mode before going live
4. Contact Gumroad support for account-specific issues

## Next Steps

After successful Gumroad integration:

1. **Monitor Analytics**: Check admin dashboard for purchase data
2. **Optimize Conversion**: A/B test pricing and messaging
3. **Customer Support**: Set up support for payment issues
4. **Scale**: Consider additional payment methods if needed

## Migration from PayPal

If migrating from PayPal:
1. Keep PayPal tables for historical data
2. Update frontend to use Gumroad components
3. Test both systems during transition
4. Remove PayPal code after confirming Gumroad works 
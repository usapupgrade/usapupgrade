# Gumroad Integration Testing Guide

This guide covers comprehensive testing for all phases of the Gumroad integration for UsapUpgrade.

## Phase 1: Gumroad Widget Testing ✅

### 1.1 Basic Widget Functionality
- [ ] **Test Widget Loading**
  - Navigate to `/payment` page
  - Verify Gumroad script loads without errors
  - Check browser console for any script errors

- [ ] **Test Upgrade Button**
  - Click "Upgrade to Premium" button
  - Verify Gumroad overlay opens
  - Confirm overlay displays correct price (₱499)
  - Test overlay closes properly

- [ ] **Test Different Variants**
  - Test button variant on payment page
  - Test card variant in lesson gates
  - Test modal variant (if implemented)
  - Verify all variants show correct pricing

### 1.2 User State Testing
- [ ] **Free User Experience**
  - Login as free user
  - Navigate to lesson 31+
  - Verify locked state appears
  - Verify upgrade widget shows
  - Test upgrade flow

- [ ] **Premium User Experience**
  - Login as premium user
  - Navigate to any lesson
  - Verify no locked states
  - Verify premium badge shows

- [ ] **Guest User Experience**
  - Test without logging in
  - Verify upgrade prompts work
  - Test authentication flow

## Phase 2: Webhook Testing

### 2.1 Webhook Endpoint Testing
- [ ] **Test Webhook URL**
  - Verify `/api/payment/gumroad-webhook` is accessible
  - Test with POST request
  - Verify proper response format

- [ ] **Test Webhook Data Processing**
  ```bash
  # Test webhook with curl
  curl -X POST http://localhost:3000/api/payment/gumroad-webhook \
    -H "Content-Type: application/x-www-form-urlencoded" \
    -H "x-gumroad-signature: test-signature" \
    -d "sale_id=test_123&buyer_email=test@example.com&price_cents=49900&currency=PHP&product_id=usapupgrade&country=PH"
  ```

### 2.2 Database Integration Testing
- [ ] **Test User Creation**
  - Send webhook for new user
  - Verify user created in database
  - Verify `subscription_status` set to 'premium'
  - Verify `is_premium` set to true

- [ ] **Test Existing User Upgrade**
  - Send webhook for existing user
  - Verify user upgraded to premium
  - Verify no duplicate user created

- [ ] **Test Purchase Logging**
  - Verify purchase logged in `purchases` table
  - Check all required fields populated
  - Verify `is_new_user` flag correct

- [ ] **Test Analytics Updates**
  - Verify `daily_analytics` table updated
  - Check revenue calculations
  - Verify user counts updated

### 2.3 Error Handling Testing
- [ ] **Test Invalid Webhook**
  - Send malformed data
  - Verify proper error response
  - Check error logging

- [ ] **Test Duplicate Webhook**
  - Send same webhook twice
  - Verify idempotency (no duplicate processing)
  - Check database integrity

- [ ] **Test Network Failures**
  - Simulate database connection issues
  - Verify graceful error handling
  - Check retry mechanisms

## Phase 3: Admin Analytics Testing

### 3.1 API Endpoint Testing
- [ ] **Test Analytics API**
  ```bash
  # Test analytics endpoint
  curl http://localhost:3000/api/admin/analytics?period=30
  ```

- [ ] **Test Different Time Periods**
  - Test 7 days: `?period=7`
  - Test 30 days: `?period=30`
  - Test 90 days: `?period=90`
  - Test 365 days: `?period=365`

- [ ] **Test Date Range Filtering**
  - Test custom date ranges
  - Verify date filtering works
  - Check edge cases (empty data, future dates)

### 3.2 Dashboard Integration Testing
- [ ] **Test Analytics Component**
  - Navigate to admin dashboard
  - Verify GumroadAnalytics component loads
  - Check all charts render properly
  - Test period selector functionality

- [ ] **Test Data Display**
  - Verify revenue calculations correct
  - Check purchase counts accurate
  - Verify conversion rates calculated
  - Test country breakdown

- [ ] **Test Error Handling**
  - Simulate API failures
  - Verify fallback to mock data
  - Check error messages display

### 3.3 Real Data Testing
- [ ] **Test with Real Purchases**
  - Make actual Gumroad purchase
  - Verify webhook processes correctly
  - Check analytics update in real-time
  - Verify all data flows correctly

## Phase 4: Premium Feature Gates Testing

### 4.1 Lesson Access Control
- [ ] **Test Free User Access**
  - Login as free user
  - Try to access lesson 31
  - Verify locked state appears
  - Test upgrade flow from locked lesson

- [ ] **Test Premium User Access**
  - Login as premium user
  - Access any lesson (1-120)
  - Verify no locked states
  - Check premium badge displays

- [ ] **Test Lesson Navigation**
  - Verify lock icons on premium lessons
  - Check progress indicators
  - Test lesson list display

### 4.2 Upgrade Flow Testing
- [ ] **Test Upgrade from Locked Lesson**
  - Click upgrade button on locked lesson
  - Verify Gumroad overlay opens
  - Complete purchase
  - Verify lesson unlocks immediately

- [ ] **Test Upgrade from Payment Page**
  - Navigate to `/payment`
  - Complete purchase
  - Verify redirect to dashboard
  - Check premium status updated

### 4.3 Progress Tracking
- [ ] **Test Progress Indicators**
  - Verify "X/30 free lessons" display
  - Check "Unlock X+ premium lessons" message
  - Test progress calculations

## Phase 5: Database Schema Testing

### 5.1 Schema Migration Testing
- [ ] **Test Database Migration**
  ```sql
  -- Run in Supabase SQL Editor
  -- Check if tables exist
  SELECT table_name FROM information_schema.tables 
  WHERE table_schema = 'public' 
  AND table_name IN ('purchases', 'daily_analytics');
  
  -- Check if columns added to users table
  SELECT column_name FROM information_schema.columns 
  WHERE table_name = 'users' 
  AND column_name IN ('is_premium', 'purchase_details');
  ```

- [ ] **Test Indexes**
  ```sql
  -- Verify indexes created
  SELECT indexname FROM pg_indexes 
  WHERE tablename IN ('purchases', 'daily_analytics');
  ```

- [ ] **Test RLS Policies**
  ```sql
  -- Check RLS enabled
  SELECT schemaname, tablename, rowsecurity 
  FROM pg_tables 
  WHERE tablename IN ('purchases', 'daily_analytics');
  ```

### 5.2 Data Integrity Testing
- [ ] **Test Purchase Data**
  - Insert test purchase record
  - Verify all fields populated correctly
  - Check foreign key constraints
  - Test unique constraints

- [ ] **Test Analytics Data**
  - Insert test daily analytics
  - Verify aggregation calculations
  - Test date uniqueness constraints

### 5.3 Performance Testing
- [ ] **Test Query Performance**
  - Test analytics queries with large datasets
  - Verify indexes improve performance
  - Check query execution plans

## Phase 6: Comprehensive Testing

### 6.1 End-to-End Testing
- [ ] **Complete User Journey**
  1. Register new user
  2. Complete free lessons (1-30)
  3. Try to access premium lesson
  4. Complete purchase via Gumroad
  5. Verify immediate premium access
  6. Check analytics updated

- [ ] **Admin Journey**
  1. Login as admin
  2. View analytics dashboard
  3. Check purchase data
  4. Verify revenue calculations
  5. Test different time periods

### 6.2 Error Recovery Testing
- [ ] **Test Webhook Failures**
  - Simulate webhook processing failure
  - Verify error logging
  - Test manual retry mechanisms
  - Check data consistency

- [ ] **Test Database Failures**
  - Simulate database connection issues
  - Verify graceful degradation
  - Test recovery procedures

### 6.3 Security Testing
- [ ] **Test Webhook Security**
  - Verify signature verification
  - Test with invalid signatures
  - Check for injection attacks

- [ ] **Test Admin Access**
  - Verify only admins can access analytics
  - Test RLS policies
  - Check data isolation

### 6.4 Performance Testing
- [ ] **Load Testing**
  - Test with multiple concurrent purchases
  - Verify webhook processing under load
  - Check analytics performance

- [ ] **Stress Testing**
  - Test with large datasets
  - Verify system stability
  - Check memory usage

## Testing Tools and Commands

### Local Development Testing
```bash
# Start development server
npm run dev

# Test webhook locally
curl -X POST http://localhost:3000/api/payment/gumroad-webhook \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "sale_id=test_123&buyer_email=test@example.com&price_cents=49900&currency=PHP&product_id=usapupgrade&country=PH"

# Test analytics API
curl http://localhost:3000/api/admin/analytics?period=30
```

### Database Testing
```sql
-- Check webhook processing
SELECT * FROM purchases ORDER BY created_at DESC LIMIT 5;

-- Check daily analytics
SELECT * FROM daily_analytics ORDER BY date DESC LIMIT 5;

-- Check user premium status
SELECT email, subscription_status, is_premium FROM users WHERE subscription_status = 'premium';
```

### Browser Testing
```javascript
// Test Gumroad widget in browser console
// Check if Gumroad script loaded
console.log(window.GumroadOverlay);

// Test webhook manually
fetch('/api/payment/gumroad-webhook', {
  method: 'POST',
  headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
  body: 'sale_id=test_123&buyer_email=test@example.com&price_cents=49900&currency=PHP&product_id=usapupgrade&country=PH'
});
```

## Expected Results

### Successful Integration
- ✅ Gumroad widget loads and functions properly
- ✅ Webhooks process purchases and upgrade users
- ✅ Analytics display real data from database
- ✅ Premium features properly gated
- ✅ Admin dashboard shows comprehensive analytics
- ✅ Database schema supports all features
- ✅ Error handling works gracefully

### Common Issues and Solutions
- **Widget not loading**: Check Gumroad script URL and network connectivity
- **Webhook not processing**: Verify endpoint URL and database connection
- **Analytics not updating**: Check database permissions and RLS policies
- **Premium not activating**: Verify webhook processing and user table updates

## Production Deployment Checklist

Before going live:
- [ ] Test with real Gumroad account
- [ ] Configure production webhook URL
- [ ] Set up monitoring and logging
- [ ] Test with real purchases
- [ ] Verify all analytics working
- [ ] Check security and permissions
- [ ] Document deployment process

## Support and Troubleshooting

### Debugging Webhooks
```bash
# Check webhook logs
tail -f /var/log/nginx/access.log | grep gumroad-webhook

# Test webhook signature
echo -n "webhook_data" | openssl dgst -sha256 -hmac "your_secret"
```

### Database Debugging
```sql
-- Check webhook processing
SELECT * FROM purchases WHERE sale_id = 'your_sale_id';

-- Check user status
SELECT * FROM users WHERE email = 'user@example.com';

-- Check analytics
SELECT * FROM daily_analytics WHERE date = CURRENT_DATE;
```

This testing guide ensures comprehensive validation of all Gumroad integration phases. Run through each section systematically to verify the integration works correctly in all scenarios. 
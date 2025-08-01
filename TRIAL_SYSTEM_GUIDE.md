# 30-Day Free Trial System - Implementation Guide

## Overview

The ConvoMaster trial system provides users with 30 days of free access to lessons 1-30, creating urgency for conversion while maintaining a clean database by automatically deleting expired accounts.

## Key Features

### ✅ Implemented Features

1. **30-Day Trial Period**
   - Free users get exactly 30 days from registration
   - Access to lessons 1-30 only
   - Automatic account deletion after expiry

2. **Access Control**
   - Lesson access validation
   - Account status checking
   - Premium content protection

3. **UI Components**
   - Trial info banner on registration
   - Countdown timer on dashboard
   - Upgrade prompts near expiry
   - Expired account screen

4. **Database Functions**
   - Automated cleanup of expired accounts
   - Re-registration handling
   - Lesson access validation

## Database Schema Updates

### New User Fields
```sql
-- Trial system fields
expires_at TIMESTAMP, -- 30 days from created_at for free users
is_expired BOOLEAN DEFAULT false,
re_registration_count INTEGER DEFAULT 0,
```

### Database Functions
- `cleanup_expired_trials()` - Daily cleanup job
- `handle_re_registration()` - Handle re-registration logic
- `check_lesson_access()` - Validate lesson access

## User Journey Flow

### 1. Registration
```
User signs up → Trial banner shown → Account created with 30-day expiry
```

### 2. Active Trial
```
User accesses lessons 1-30 → Dashboard shows countdown → Normal learning experience
```

### 3. Near Expiry (≤10 days)
```
Countdown turns orange → Upgrade prompts appear → Urgency messaging
```

### 4. Expired Account
```
Account marked as expired → Expired screen shown → Option to upgrade or re-register
```

### 5. Re-registration
```
Same email allowed → Old account deleted → New 30-day trial starts
```

## API Endpoints

### Trial Cleanup
```
POST /api/trial/cleanup
```
- Runs daily via cron job
- Deletes expired accounts and their data
- Returns count of cleaned accounts

### Trial Status Check
```
GET /api/trial/status?userId={id}
```
- Checks current trial status
- Returns days left, expiry status
- Used for access control

## UI Components

### TrialInfoBanner
- Shows on registration page
- Explains trial benefits and limitations
- Sets proper expectations

### TrialCountdown
- Displays on dashboard header
- Shows days remaining
- Changes color when near expiry
- Shows upgrade button when ≤10 days

### UpgradePromptModal
- Appears when user is near expiry
- Highlights progress and achievements
- Clear upgrade benefits
- Non-intrusive design

### ExpiredAccountScreen
- Full-screen when trial expires
- Clear messaging about expiry
- Options to upgrade or re-register
- Netflix/Spotify-style messaging

### AccessControl
- Wraps lesson pages
- Validates access before showing content
- Redirects to appropriate screens
- Handles premium content protection

## Implementation Status

### ✅ Completed
- [x] Database schema updates
- [x] User interface components
- [x] Access control logic
- [x] Trial countdown system
- [x] Upgrade prompts
- [x] Expired account handling
- [x] API endpoints
- [x] Registration page updates

### 🔄 In Progress
- [ ] Cron job setup for daily cleanup
- [ ] Email notifications for trial expiry
- [ ] Push notification reminders
- [ ] Analytics tracking for trial conversions

### 📋 Planned
- [ ] A/B testing for trial messaging
- [ ] Advanced analytics dashboard
- [ ] Automated email sequences
- [ ] Social proof integration

## Testing Scenarios

### Test Cases
1. **New Registration**
   - User signs up → 30-day trial starts
   - Can access lessons 1-30
   - Dashboard shows countdown

2. **Near Expiry**
   - Set trial to 8 days remaining
   - Verify upgrade prompts appear
   - Check countdown color changes

3. **Expired Account**
   - Set trial to expired
   - Verify expired screen shows
   - Test upgrade and re-registration flows

4. **Re-registration**
   - Expire an account
   - Re-register with same email
   - Verify new 30-day trial starts

5. **Premium Upgrade**
   - Upgrade during trial
   - Verify trial restrictions removed
   - Check access to all lessons

## Configuration

### Environment Variables
```env
# Trial System
TRIAL_DURATION_DAYS=30
TRIAL_WARNING_DAYS=10
TRIAL_CLEANUP_ENABLED=true
```

### Database Configuration
```sql
-- Enable cleanup function
SELECT cleanup_expired_trials();

-- Check trial status
SELECT check_lesson_access('user-uuid', 25);
```

## Monitoring & Analytics

### Key Metrics
- Trial conversion rate
- Days to conversion
- Re-registration rate
- Cleanup success rate

### Dashboard Metrics
- Active trials: `COUNT(*) WHERE subscription_status = 'free' AND expires_at > NOW()`
- Expired trials: `COUNT(*) WHERE subscription_status = 'free' AND expires_at < NOW()`
- Conversion rate: `(Premium users) / (Total registrations)`

## Security Considerations

### Data Protection
- Expired accounts are completely deleted
- No personal data retention after expiry
- GDPR compliant cleanup process

### Access Control
- Server-side validation of lesson access
- Database-level access control
- Secure API endpoints

## Future Enhancements

### Planned Features
1. **Smart Notifications**
   - Behavioral-based reminder timing
   - Personalized upgrade messaging
   - Achievement-based prompts

2. **Advanced Analytics**
   - Conversion funnel analysis
   - Cohort retention tracking
   - A/B testing framework

3. **Gamification**
   - Trial extension rewards
   - Progress-based incentives
   - Social sharing features

## Support & Maintenance

### Daily Tasks
- Monitor cleanup job success
- Check trial conversion metrics
- Review expired account count

### Weekly Tasks
- Analyze conversion patterns
- Optimize upgrade messaging
- Review user feedback

### Monthly Tasks
- Update trial messaging
- Analyze cohort performance
- Plan feature improvements

---

This trial system creates urgency for conversion while maintaining a clean, cost-effective database structure. The implementation follows best practices for user experience and data management. 
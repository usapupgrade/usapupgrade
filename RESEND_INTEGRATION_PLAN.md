# 📧 Resend Email Integration Plan

## 🎯 Overview
Integrating Resend for the forgot password feature to send real password reset emails. Resend offers **10,000 emails/month free** with excellent deliverability and developer experience.

## 📋 Implementation Roadmap

### **Phase 1: Setup & Configuration (30 minutes)**

#### **1.1 Resend Account Setup**
- [ ] Create Resend account at [resend.com](https://resend.com)
- [ ] Verify domain or use Resend's test domain
- [ ] Get API key from dashboard
- [ ] Set up environment variables

#### **1.2 Project Configuration**
- [ ] Install Resend SDK: `npm install resend`
- [ ] Add environment variables to `.env.local`
- [ ] Create email templates
- [ ] Set up API routes

### **Phase 2: Backend Implementation (45 minutes)**

#### **2.1 API Routes**
- [ ] Create `/api/auth/forgot-password` endpoint
- [ ] Create `/api/auth/reset-password` endpoint
- [ ] Add token generation and validation
- [ ] Implement rate limiting

#### **2.2 Database Integration**
- [ ] Add password reset tokens table
- [ ] Implement token storage and cleanup
- [ ] Add user email verification
- [ ] Set up token expiration (24 hours)

### **Phase 3: Frontend Integration (30 minutes)**

#### **3.1 Update Forgot Password Modal**
- [ ] Connect to real API endpoint
- [ ] Add proper error handling
- [ ] Improve loading states
- [ ] Add email validation

#### **3.2 Update Reset Password Page**
- [ ] Connect to real API endpoint
- [ ] Add token validation
- [ ] Improve success/error states
- [ ] Add password strength indicator

### **Phase 4: Testing & Polish (30 minutes)**

#### **4.1 Testing**
- [ ] Test email delivery
- [ ] Test token validation
- [ ] Test rate limiting
- [ ] Test mobile responsiveness

#### **4.2 Polish**
- [ ] Add email templates
- [ ] Improve error messages
- [ ] Add analytics tracking
- [ ] Performance optimization

## 🛠️ Technical Implementation

### **Environment Variables**
```env
# .env.local
RESEND_API_KEY=re_xxxxxxxxxxxx
NEXTAUTH_SECRET=your-secret-key
DATABASE_URL=your-database-url
```

### **API Routes Structure**
```
app/api/auth/
├── forgot-password/
│   └── route.ts
└── reset-password/
    └── route.ts
```

### **Database Schema**
```sql
-- Password reset tokens table
CREATE TABLE password_reset_tokens (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) NOT NULL,
  token VARCHAR(255) UNIQUE NOT NULL,
  expires_at TIMESTAMP NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  used_at TIMESTAMP NULL
);
```

### **Email Templates**
- **Password Reset Request**: Confirmation email
- **Password Reset Link**: Secure reset link
- **Password Reset Success**: Confirmation of password change

## 📧 Resend Features We'll Use

### **Free Tier Benefits:**
- ✅ 10,000 emails/month
- ✅ 3 domains
- ✅ Email analytics
- ✅ Webhook support
- ✅ API rate limits: 10 requests/second
- ✅ 99.9% uptime SLA

### **Advanced Features (Future):**
- 🔄 Email templates
- 🔄 A/B testing
- 🔄 Advanced analytics
- 🔄 Custom domains

## 🚀 Implementation Steps

### **Step 1: Install Dependencies**
```bash
npm install resend @types/node
```

### **Step 2: Environment Setup**
```bash
# Add to .env.local
RESEND_API_KEY=re_xxxxxxxxxxxx
```

### **Step 3: Create API Routes**
```typescript
// app/api/auth/forgot-password/route.ts
import { Resend } from 'resend'
import { NextRequest, NextResponse } from 'next/server'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json()
    
    // Generate secure token
    const token = crypto.randomUUID()
    
    // Store token in database
    // await storeResetToken(email, token)
    
    // Send email
    await resend.emails.send({
      from: 'ConvoMaster <noreply@yourdomain.com>',
      to: email,
      subject: 'Reset Your Password - ConvoMaster',
      html: `
        <h1>Reset Your Password</h1>
        <p>Click the link below to reset your password:</p>
        <a href="${process.env.NEXT_PUBLIC_APP_URL}/auth/reset-password?token=${token}&email=${email}">
          Reset Password
        </a>
        <p>This link expires in 24 hours.</p>
      `
    })
    
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 })
  }
}
```

### **Step 4: Update Frontend**
```typescript
// Update forgot password modal to use real API
const handleForgotPassword = async (e: React.FormEvent) => {
  e.preventDefault()
  setForgotPasswordLoading(true)

  try {
    const response = await fetch('/api/auth/forgot-password', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: forgotPasswordEmail })
    })

    if (response.ok) {
      setForgotPasswordSuccess(true)
    } else {
      throw new Error('Failed to send reset email')
    }
  } catch (error) {
    console.error('Password reset error:', error)
    setError('Failed to send reset email. Please try again.')
  } finally {
    setForgotPasswordLoading(false)
  }
}
```

## 📊 Cost Analysis

### **Free Tier Usage:**
- **10,000 emails/month** = ~333 emails/day
- **Typical usage**: 50-100 password reset emails/month
- **Cost**: $0/month (well within free tier)

### **If We Exceed Free Tier:**
- **$0.80 per 1,000 emails** after free tier
- **Very cost-effective** for most applications

## 🔒 Security Considerations

### **Implemented Security:**
- ✅ Secure token generation (UUID)
- ✅ Token expiration (24 hours)
- ✅ Rate limiting (1 request per email per hour)
- ✅ Email validation
- ✅ CSRF protection
- ✅ Secure password hashing

### **Additional Security:**
- 🔄 IP-based rate limiting
- 🔄 Email domain verification
- 🔄 Audit logging
- 🔄 Suspicious activity detection

## 🎨 Email Template Design

### **Password Reset Email:**
```html
<!DOCTYPE html>
<html>
<head>
  <style>
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .button { background: #f2750a; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; }
    .footer { margin-top: 40px; font-size: 12px; color: #666; }
  </style>
</head>
<body>
  <div class="container">
    <h1>Reset Your Password</h1>
    <p>Hello!</p>
    <p>We received a request to reset your password for your ConvoMaster account.</p>
    <p><a href="{{resetLink}}" class="button">Reset Password</a></p>
    <p>If you didn't request this, you can safely ignore this email.</p>
    <div class="footer">
      <p>This link expires in 24 hours.</p>
      <p>ConvoMaster Team</p>
    </div>
  </div>
</body>
</html>
```

## 📱 Mobile Optimization

### **Email Mobile Optimization:**
- ✅ Responsive email templates
- ✅ Touch-friendly buttons
- ✅ Readable font sizes
- ✅ Proper spacing for mobile

## 🚀 Deployment Checklist

### **Pre-Deployment:**
- [ ] Set up Resend account
- [ ] Configure domain verification
- [ ] Test email delivery
- [ ] Set up environment variables
- [ ] Test API endpoints

### **Post-Deployment:**
- [ ] Monitor email delivery rates
- [ ] Check spam folder placement
- [ ] Monitor API usage
- [ ] Set up webhook notifications
- [ ] Configure analytics

## 💡 Future Enhancements

### **Email Features:**
- [ ] Custom email templates
- [ ] Branded email headers
- [ ] Email tracking analytics
- [ ] A/B testing for email content

### **Security Features:**
- [ ] Two-factor authentication
- [ ] SMS verification backup
- [ ] Account recovery options
- [ ] Security notifications

## 🎯 Success Metrics

### **Key Performance Indicators:**
- 📧 Email delivery rate: >99%
- 📧 Email open rate: >25%
- 📧 Click-through rate: >15%
- ⏱️ Password reset completion: >80%
- 🔒 Security incidents: 0

## 📅 Timeline

### **Week 1: Setup & Basic Implementation**
- Day 1: Resend account setup and configuration
- Day 2: API routes and database schema
- Day 3: Frontend integration
- Day 4: Testing and bug fixes

### **Week 2: Polish & Production**
- Day 1: Email template design
- Day 2: Security hardening
- Day 3: Performance optimization
- Day 4: Production deployment

## 🎉 Summary

Resend integration will provide:
- ✅ **Free email service** (10,000 emails/month)
- ✅ **Excellent deliverability** and analytics
- ✅ **Simple API** and great developer experience
- ✅ **Production-ready** security features
- ✅ **Mobile-optimized** email templates

This implementation will make the forgot password feature truly production-ready with real email delivery! 🚀

---

**Next Action:** Start with Resend account setup and basic configuration when ready to implement. 
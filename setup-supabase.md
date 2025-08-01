# 🚀 UsapUpgrade Supabase Setup Guide

## 📋 **Quick Setup Checklist**

### **Step 1: Supabase Project Setup (10 minutes)**

1. **Create Supabase Account**
   - Go to: https://supabase.com
   - Click "Start your project"
   - Sign up with GitHub (recommended)

2. **Create New Project**
   - Click "New Project"
   - **Name**: `usapupgrade-prod`
   - **Database Password**: Click "Generate" (save this!)
   - **Region**: Singapore or Tokyo (closest to Philippines)
   - **Pricing Plan**: Free
   - Click "Create new project"
   - Wait 2-3 minutes for setup

3. **Get API Keys**
   - Go to **Settings** → **API**
   - Copy these three values:
     - **Project URL**: `https://your-project.supabase.co`
     - **Anon Key**: `eyJ...` (starts with eyJ)
     - **Service Role Key**: `eyJ...` (starts with eyJ)

### **Step 2: Database Setup (5 minutes)**

1. **Go to SQL Editor**
   - In Supabase dashboard, click "SQL Editor"
   - Click "New Query"

2. **Run Database Schema**
   - Copy entire contents of `database/schema.sql`
   - Paste into SQL editor
   - Click "Run" or "Execute"
   - Should see success message

### **Step 3: Environment Setup (2 minutes)**

1. **Create .env.local file**
   - In your project root folder
   - Create new file named `.env.local`
   - Copy template from `env-setup-template.txt`

2. **Replace placeholder values**
   ```bash
   # Replace these with your actual values:
   NEXT_PUBLIC_SUPABASE_URL=https://your-actual-project.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_actual_anon_key
   SUPABASE_SERVICE_ROLE_KEY=your_actual_service_role_key
   ```

### **Step 4: Test Your Setup (3 minutes)**

1. **Start your app**
   ```bash
   npm run dev
   ```

2. **Test authentication**
   - Go to http://localhost:3000
   - Try signing up with your email
   - Try signing in
   - Check for any errors

## ✅ **What Should Work After Setup**

- ✅ Users can sign up with email/password
- ✅ Users can sign in and access dashboard
- ✅ User data saved in cloud database
- ✅ Trial system working (30 days)
- ✅ Progress tracking working
- ✅ No more fake/demo data

## 🔧 **Troubleshooting**

### **Common Issues:**

1. **"Invalid API key" error**
   - Check `.env.local` file exists
   - Verify keys are copied correctly
   - No extra spaces or quotes

2. **"Database connection failed"**
   - Check Supabase project is running
   - Verify SQL schema was executed
   - Check region selection

3. **"Cannot find module" error**
   - Run `npm install`
   - Check you're in correct folder

## 🎯 **Next Steps After Setup**

1. **Test all features locally**
2. **Deploy to Vercel** (optional)
3. **Add Google OAuth** (optional)
4. **Set up payments** (PayMongo)

## 💡 **Development Workflow**

### **Local Development:**
- Edit code in your IDE
- Test with `npm run dev`
- Changes reflect immediately

### **Database Changes:**
- Edit `database/schema.sql`
- Run in Supabase SQL Editor
- Test locally

### **Environment Variables:**
- Update `.env.local` for local testing
- Update Vercel environment variables for production

## 🚀 **Ready for Production!**

Once you can sign up and sign in without errors, your app is production-ready!

**Your UsapUpgrade app is now using real data and ready for Filipino professionals! 🇵🇭** 
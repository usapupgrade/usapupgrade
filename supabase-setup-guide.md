# 🔥 Supabase Setup Guide for ConvoMaster

## 📋 **Step 1: Create Supabase Account**

### **Sign Up Process:**
1. Go to [supabase.com](https://supabase.com)
2. Click "Start your project"
3. Sign up with GitHub (recommended) or email
4. Verify your email

### **Free Tier Benefits:**
- **50,000 monthly active users** (vs Railway's ~100)
- **500MB database** (vs Railway's pay-per-use)
- **Unlimited API requests**
- **Built-in authentication**
- **Real-time subscriptions**
- **Edge functions**
- **File storage**

## 📦 **Step 2: Create Your Project**

### **Project Setup:**
1. Click "New Project"
2. Choose organization
3. Enter project name: "ConvoMaster"
4. Enter database password (save this!)
5. Choose region: "Southeast Asia (Singapore)"
6. Click "Create new project"

## 🗄️ **Step 3: Database Setup**

### **Auto-Generated Tables:**
Supabase creates these automatically:
- `auth.users` - User authentication
- `public.profiles` - User profiles
- `public.user_progress` - Lesson progress
- `public.achievements` - User achievements

### **Custom Tables to Create:**
```sql
-- Lessons table
CREATE TABLE public.lessons (
  id SERIAL PRIMARY KEY,
  lesson_number INTEGER UNIQUE NOT NULL,
  title TEXT NOT NULL,
  setting TEXT,
  scenario TEXT,
  character_says TEXT,
  cultural_note TEXT,
  xp_reward INTEGER DEFAULT 10,
  is_free BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT NOW()
);

-- User progress table
CREATE TABLE public.user_progress (
  id SERIAL PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  lesson_id INTEGER REFERENCES public.lessons(id),
  completed_at TIMESTAMP DEFAULT NOW(),
  xp_earned INTEGER DEFAULT 10,
  is_correct BOOLEAN DEFAULT true,
  UNIQUE(user_id, lesson_id)
);

-- Achievements table
CREATE TABLE public.achievements (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  icon TEXT,
  xp_reward INTEGER DEFAULT 50,
  unlock_criteria JSONB,
  created_at TIMESTAMP DEFAULT NOW()
);

-- User achievements table
CREATE TABLE public.user_achievements (
  id SERIAL PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  achievement_id INTEGER REFERENCES public.achievements(id),
  unlocked_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(user_id, achievement_id)
);
```

## 🔧 **Step 4: Environment Variables**

### **Add These to Your App:**
```env
NEXT_PUBLIC_SUPABASE_URL=your-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

### **Get These from Supabase Dashboard:**
1. Go to Settings > API
2. Copy Project URL and anon key
3. Copy service role key (for admin functions)

## 🚀 **Step 5: Install Supabase Client**

```bash
npm install @supabase/supabase-js
```

## 🎯 **Step 6: Test Connection**

### **Health Check:**
Visit: `https://your-project.supabase.co/rest/v1/`

### **Test Authentication:**
- Sign up a test user
- Check user appears in auth.users table
- Test login/logout functionality

## 💰 **Cost Analysis**

### **Free Tier Limits:**
- **50,000 monthly active users** ✅
- **500MB database** ✅
- **Unlimited API requests** ✅
- **1GB file storage** ✅

### **When You Need Pro ($25/month):**
- Over 50,000 users
- Over 500MB database
- Need email support

## 🎯 **Migration Benefits**

### **vs Railway:**
- **Free for 50,000 users** vs Railway's ~100 users
- **Built-in auth** vs separate auth system
- **Real-time features** vs manual implementation
- **Edge functions** vs separate server
- **File storage** vs separate storage

### **vs MongoDB Atlas:**
- **PostgreSQL** (better for relational data)
- **Built-in auth** vs manual auth
- **Real-time subscriptions**
- **Better query performance**

---

**Total Setup Time: 30-45 minutes**
**Monthly Cost: ₱0 (free for first 50,000 users!)** 
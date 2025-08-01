# 🔥 Supabase Deployment Checklist

## ✅ **Pre-Deployment (Complete)**

- [x] Supabase client installed (`@supabase/supabase-js`)
- [x] Supabase configuration (`lib/supabase.ts`)
- [x] API routes updated for Supabase (`app/api/users/route.ts`, `app/api/progress/route.ts`)
- [x] Health check endpoint (`app/api/health/route.ts`)

## 📋 **Step 1: Create Supabase Account**

1. **Go to [supabase.com](https://supabase.com)**
2. **Click "Start your project"**
3. **Sign up with GitHub** (recommended)
4. **Verify your email**

## 📦 **Step 2: Create Project**

1. **Click "New Project"**
2. **Choose organization**
3. **Project name**: "ConvoMaster"
4. **Database password**: Save this securely!
5. **Region**: "Southeast Asia (Singapore)"
6. **Click "Create new project"**
7. **Wait for setup** (2-3 minutes)

## 🗄️ **Step 3: Database Setup**

### **Auto-Generated Tables:**
Supabase creates these automatically:
- `auth.users` - User authentication
- `public.profiles` - User profiles

### **Create Custom Tables:**
Run this SQL in Supabase SQL Editor:

```sql
-- Create profiles table if not exists
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email TEXT UNIQUE,
  name TEXT,
  subscription_status TEXT DEFAULT 'free',
  total_xp INTEGER DEFAULT 0,
  current_level INTEGER DEFAULT 1,
  current_streak INTEGER DEFAULT 0,
  longest_streak INTEGER DEFAULT 0,
  completed_lessons INTEGER[] DEFAULT '{}',
  achievements TEXT[] DEFAULT '{}',
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Create lessons table
CREATE TABLE IF NOT EXISTS public.lessons (
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

-- Create user_progress table
CREATE TABLE IF NOT EXISTS public.user_progress (
  id SERIAL PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  lesson_id INTEGER REFERENCES public.lessons(id),
  completed_at TIMESTAMP DEFAULT NOW(),
  xp_earned INTEGER DEFAULT 10,
  is_correct BOOLEAN DEFAULT true,
  UNIQUE(user_id, lesson_id)
);

-- Create achievements table
CREATE TABLE IF NOT EXISTS public.achievements (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  icon TEXT,
  xp_reward INTEGER DEFAULT 50,
  unlock_criteria JSONB,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Create user_achievements table
CREATE TABLE IF NOT EXISTS public.user_achievements (
  id SERIAL PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  achievement_id INTEGER REFERENCES public.achievements(id),
  unlocked_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(user_id, achievement_id)
);

-- Enable RLS (Row Level Security)
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.lessons ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_achievements ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
CREATE POLICY "Users can view own profile" ON public.profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Users can insert own profile" ON public.profiles FOR INSERT WITH CHECK (auth.uid() = id);

-- Lessons are public (read-only)
CREATE POLICY "Lessons are viewable by everyone" ON public.lessons FOR SELECT USING (true);

-- User progress is private
CREATE POLICY "Users can view own progress" ON public.user_progress FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own progress" ON public.user_progress FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Achievements are public (read-only)
CREATE POLICY "Achievements are viewable by everyone" ON public.achievements FOR SELECT USING (true);

-- User achievements are private
CREATE POLICY "Users can view own achievements" ON public.user_achievements FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own achievements" ON public.user_achievements FOR INSERT WITH CHECK (auth.uid() = user_id);
```

## 🔧 **Step 4: Get Environment Variables**

1. **Go to Settings > API**
2. **Copy Project URL**
3. **Copy anon key**
4. **Copy service role key** (for admin functions)

## 🌐 **Step 5: Deploy to Vercel**

1. **Push code to GitHub**
2. **Go to [vercel.com](https://vercel.com)**
3. **Import your repository**
4. **Add environment variables**:
   ```
   NEXT_PUBLIC_SUPABASE_URL=your-project-url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
   SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
   ```
5. **Deploy**

## 🧪 **Step 6: Test Everything**

1. **Visit your Vercel URL**
2. **Test health endpoint**: `/api/health`
3. **Test admin access**: `/admin-access`
4. **Test user registration**
5. **Test lesson completion**
6. **Check Supabase dashboard** for data

## 📊 **Step 7: Monitor & Optimize**

1. **Check Supabase dashboard** for usage
2. **Monitor Vercel analytics**
3. **Set up alerts** for usage limits
4. **Test all features work**

## 🎯 **Expected Timeline**

- **Supabase setup**: 15 minutes
- **Database setup**: 10 minutes
- **Vercel deployment**: 10 minutes
- **Testing**: 15 minutes
- **Total**: 50 minutes

## 💰 **Cost Monitoring**

- **Supabase**: ₱0/month (free for 50,000 users!)
- **Vercel**: ₱0/month (free tier generous)
- **Total expected cost**: ₱0/month

## 🚀 **Benefits Achieved**

- **50,000 free users** vs Railway's ~100
- **Built-in authentication**
- **Real-time subscriptions**
- **Edge functions**
- **File storage**
- **Better performance**

---

**Your app will be live and ready for 50,000 users! 🚀** 
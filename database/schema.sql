-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Users table
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR UNIQUE NOT NULL,
  name VARCHAR NOT NULL,
  avatar_url VARCHAR,
  google_id VARCHAR UNIQUE,
  subscription_status VARCHAR DEFAULT 'free' CHECK (subscription_status IN ('free', 'premium', 'lifetime')),
  subscription_end_date TIMESTAMP,
  stripe_customer_id VARCHAR UNIQUE,
  
  -- Trial system fields
  expires_at TIMESTAMP, -- 30 days from created_at for free users
  is_expired BOOLEAN DEFAULT false,
  re_registration_count INTEGER DEFAULT 0,
  
  -- User preferences
  primary_goal VARCHAR NOT NULL,
  experience_level VARCHAR NOT NULL,
  daily_time_commitment VARCHAR NOT NULL,
  preferred_study_time TIME,
  timezone VARCHAR DEFAULT 'Asia/Manila',
  
  -- Certification name fields
  certification_first_name VARCHAR,
  certification_last_name VARCHAR,
  certification_name_updated_at TIMESTAMP,
  
  -- Gamification data
  total_xp INTEGER DEFAULT 0,
  current_level INTEGER DEFAULT 1,
  current_streak INTEGER DEFAULT 0,
  longest_streak INTEGER DEFAULT 0,
  last_lesson_date DATE,
  
  -- Settings
  email_notifications BOOLEAN DEFAULT true,
  push_notifications BOOLEAN DEFAULT true,
  sound_effects BOOLEAN DEFAULT true,
  
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Lessons table
CREATE TABLE lessons (
  id VARCHAR PRIMARY KEY,
  title VARCHAR NOT NULL,
  description TEXT,
  level VARCHAR NOT NULL CHECK (level IN ('foundation', 'intermediate', 'advanced')),
  category VARCHAR NOT NULL,
  is_premium BOOLEAN DEFAULT false,
  estimated_duration INTEGER NOT NULL,
  learning_objectives TEXT[],
  order_index INTEGER NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Scenarios table
CREATE TABLE scenarios (
  id VARCHAR PRIMARY KEY,
  lesson_id VARCHAR REFERENCES lessons(id) ON DELETE CASCADE,
  setting VARCHAR NOT NULL,
  context TEXT,
  character_name VARCHAR NOT NULL,
  character_dialogue TEXT NOT NULL,
  learning_tip TEXT,
  order_index INTEGER NOT NULL
);

-- Response options table
CREATE TABLE response_options (
  id VARCHAR PRIMARY KEY,
  scenario_id VARCHAR REFERENCES scenarios(id) ON DELETE CASCADE,
  text TEXT NOT NULL,
  is_correct BOOLEAN NOT NULL,
  feedback TEXT NOT NULL,
  explanation TEXT,
  xp_reward INTEGER DEFAULT 10,
  order_index INTEGER NOT NULL
);

-- User progress table
CREATE TABLE user_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  lesson_id VARCHAR REFERENCES lessons(id) ON DELETE CASCADE,
  scenario_id VARCHAR REFERENCES scenarios(id) ON DELETE CASCADE,
  selected_option_id VARCHAR REFERENCES response_options(id) ON DELETE CASCADE,
  is_correct BOOLEAN NOT NULL,
  xp_earned INTEGER NOT NULL,
  completed_at TIMESTAMP DEFAULT NOW(),
  
  UNIQUE(user_id, scenario_id)
);

-- Achievements table
CREATE TABLE achievements (
  id VARCHAR PRIMARY KEY,
  title VARCHAR NOT NULL,
  description TEXT NOT NULL,
  icon VARCHAR NOT NULL,
  rarity VARCHAR NOT NULL CHECK (rarity IN ('common', 'uncommon', 'rare', 'epic', 'legendary')),
  xp_reward INTEGER NOT NULL,
  unlock_criteria JSONB NOT NULL,
  is_shareable BOOLEAN DEFAULT true
);

-- User achievements table
CREATE TABLE user_achievements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  achievement_id VARCHAR REFERENCES achievements(id) ON DELETE CASCADE,
  unlocked_at TIMESTAMP DEFAULT NOW(),
  shared_count INTEGER DEFAULT 0,
  
  UNIQUE(user_id, achievement_id)
);

-- Analytics events table
CREATE TABLE analytics_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  event_type VARCHAR NOT NULL,
  event_data JSONB,
  session_id VARCHAR NOT NULL,
  timestamp TIMESTAMP DEFAULT NOW(),
  user_agent TEXT,
  ip_address INET
);

-- Social shares table
CREATE TABLE social_shares (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  share_type VARCHAR NOT NULL CHECK (share_type IN ('achievement', 'streak', 'level_up', 'completion')),
  share_data JSONB NOT NULL,
  platform VARCHAR NOT NULL,
  shared_at TIMESTAMP DEFAULT NOW()
);

-- Subscriptions table
CREATE TABLE subscriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  stripe_subscription_id VARCHAR UNIQUE,
  plan_type VARCHAR NOT NULL,
  status VARCHAR NOT NULL,
  current_period_start TIMESTAMP,
  current_period_end TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_google_id ON users(google_id);
CREATE INDEX idx_users_subscription_status ON users(subscription_status);
CREATE INDEX idx_lessons_level ON lessons(level);
CREATE INDEX idx_lessons_category ON lessons(category);
CREATE INDEX idx_lessons_order_index ON lessons(order_index);
CREATE INDEX idx_scenarios_lesson_id ON scenarios(lesson_id);
CREATE INDEX idx_response_options_scenario_id ON response_options(scenario_id);
CREATE INDEX idx_user_progress_user_id ON user_progress(user_id);
CREATE INDEX idx_user_progress_lesson_id ON user_progress(lesson_id);
CREATE INDEX idx_user_achievements_user_id ON user_achievements(user_id);
CREATE INDEX idx_analytics_events_user_id ON analytics_events(user_id);
CREATE INDEX idx_analytics_events_timestamp ON analytics_events(timestamp);
CREATE INDEX idx_social_shares_user_id ON social_shares(user_id);
CREATE INDEX idx_subscriptions_user_id ON subscriptions(user_id);

-- Create RLS (Row Level Security) policies
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE lessons ENABLE ROW LEVEL SECURITY;
ALTER TABLE scenarios ENABLE ROW LEVEL SECURITY;
ALTER TABLE response_options ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE analytics_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE social_shares ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;

-- Users can only access their own data
CREATE POLICY "Users can view own profile" ON users FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON users FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Users can insert own profile" ON users FOR INSERT WITH CHECK (auth.uid() = id);

-- Lessons are public (read-only)
CREATE POLICY "Lessons are viewable by everyone" ON lessons FOR SELECT USING (true);

-- Scenarios are public (read-only)
CREATE POLICY "Scenarios are viewable by everyone" ON scenarios FOR SELECT USING (true);

-- Response options are public (read-only)
CREATE POLICY "Response options are viewable by everyone" ON response_options FOR SELECT USING (true);

-- User progress is private
CREATE POLICY "Users can view own progress" ON user_progress FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own progress" ON user_progress FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own progress" ON user_progress FOR UPDATE USING (auth.uid() = user_id);

-- Achievements are public (read-only)
CREATE POLICY "Achievements are viewable by everyone" ON achievements FOR SELECT USING (true);

-- User achievements are private
CREATE POLICY "Users can view own achievements" ON user_achievements FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own achievements" ON user_achievements FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own achievements" ON user_achievements FOR UPDATE USING (auth.uid() = user_id);

-- Analytics events are private
CREATE POLICY "Users can insert own analytics" ON analytics_events FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can view own analytics" ON analytics_events FOR SELECT USING (auth.uid() = user_id);

-- Social shares are private
CREATE POLICY "Users can insert own shares" ON social_shares FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can view own shares" ON social_shares FOR SELECT USING (auth.uid() = user_id);

-- Subscriptions are private
CREATE POLICY "Users can view own subscriptions" ON subscriptions FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own subscriptions" ON subscriptions FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own subscriptions" ON subscriptions FOR UPDATE USING (auth.uid() = user_id);

-- Create functions for common operations
CREATE OR REPLACE FUNCTION update_user_streak()
RETURNS TRIGGER AS $$
BEGIN
  -- Update streak when user completes a lesson
  IF NEW.completed_at::date = CURRENT_DATE THEN
    UPDATE users 
    SET current_streak = current_streak + 1,
        longest_streak = GREATEST(longest_streak, current_streak + 1),
        last_lesson_date = CURRENT_DATE
    WHERE id = NEW.user_id;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for streak updates
CREATE TRIGGER update_streak_trigger
  AFTER INSERT ON user_progress
  FOR EACH ROW
  EXECUTE FUNCTION update_user_streak();

-- Function to calculate user level based on XP
CREATE OR REPLACE FUNCTION calculate_user_level(total_xp INTEGER)
RETURNS INTEGER AS $$
BEGIN
  RETURN GREATEST(1, FLOOR(total_xp / 100) + 1);
END;
$$ LANGUAGE plpgsql;

-- Function to check achievement unlocks
CREATE OR REPLACE FUNCTION check_achievement_unlocks(user_uuid UUID)
RETURNS VOID AS $$
DECLARE
  achievement_record RECORD;
  user_record RECORD;
  progress_count INTEGER;
  streak_count INTEGER;
BEGIN
  -- Get user data
  SELECT * INTO user_record FROM users WHERE id = user_uuid;
  
  -- Check each achievement
  FOR achievement_record IN SELECT * FROM achievements LOOP
    -- Skip if user already has this achievement
    IF EXISTS (SELECT 1 FROM user_achievements WHERE user_id = user_uuid AND achievement_id = achievement_record.id) THEN
      CONTINUE;
    END IF;
    
    -- Check unlock criteria based on achievement type
    CASE achievement_record.id
      WHEN 'first_lesson' THEN
        IF user_record.total_xp > 0 THEN
          INSERT INTO user_achievements (user_id, achievement_id) VALUES (user_uuid, achievement_record.id);
        END IF;
        
      WHEN 'streak_3' THEN
        IF user_record.current_streak >= 3 THEN
          INSERT INTO user_achievements (user_id, achievement_id) VALUES (user_uuid, achievement_record.id);
        END IF;
        
      WHEN 'streak_7' THEN
        IF user_record.current_streak >= 7 THEN
          INSERT INTO user_achievements (user_id, achievement_id) VALUES (user_uuid, achievement_record.id);
        END IF;
        
      WHEN 'streak_30' THEN
        IF user_record.current_streak >= 30 THEN
          INSERT INTO user_achievements (user_id, achievement_id) VALUES (user_uuid, achievement_record.id);
        END IF;
        
      WHEN 'level_5' THEN
        IF user_record.current_level >= 5 THEN
          INSERT INTO user_achievements (user_id, achievement_id) VALUES (user_uuid, achievement_record.id);
        END IF;
        
      WHEN 'level_10' THEN
        IF user_record.current_level >= 10 THEN
          INSERT INTO user_achievements (user_id, achievement_id) VALUES (user_uuid, achievement_record.id);
        END IF;
        
      WHEN 'lessons_10' THEN
        SELECT COUNT(DISTINCT lesson_id) INTO progress_count FROM user_progress WHERE user_id = user_uuid;
        IF progress_count >= 10 THEN
          INSERT INTO user_achievements (user_id, achievement_id) VALUES (user_uuid, achievement_record.id);
        END IF;
        
      WHEN 'lessons_50' THEN
        SELECT COUNT(DISTINCT lesson_id) INTO progress_count FROM user_progress WHERE user_id = user_uuid;
        IF progress_count >= 50 THEN
          INSERT INTO user_achievements (user_id, achievement_id) VALUES (user_uuid, achievement_record.id);
        END IF;
        
      WHEN 'perfect_lesson' THEN
        SELECT COUNT(*) INTO progress_count FROM user_progress 
        WHERE user_id = user_uuid AND is_correct = true;
        IF progress_count >= 1 THEN
          INSERT INTO user_achievements (user_id, achievement_id) VALUES (user_uuid, achievement_record.id);
        END IF;
        
      ELSE
        -- Default: check if criteria are met based on JSON criteria
        -- This is a simplified version - in production you'd have more complex logic
        NULL;
    END CASE;
  END LOOP;
END;
$$ LANGUAGE plpgsql;

-- Function to clean up expired trial accounts
CREATE OR REPLACE FUNCTION cleanup_expired_trials()
RETURNS INTEGER AS $$
DECLARE
  expired_count INTEGER;
  expired_user_ids UUID[];
BEGIN
  -- Find expired free accounts
  SELECT array_agg(id) INTO expired_user_ids
  FROM users 
  WHERE subscription_status = 'free' 
    AND expires_at < NOW() 
    AND is_expired = false;
  
  -- Mark accounts as expired
  UPDATE users 
  SET is_expired = true 
  WHERE id = ANY(expired_user_ids);
  
  -- Get count of expired accounts
  GET DIAGNOSTICS expired_count = ROW_COUNT;
  
  -- Delete progress data for expired accounts
  DELETE FROM user_progress WHERE user_id = ANY(expired_user_ids);
  DELETE FROM user_achievements WHERE user_id = ANY(expired_user_ids);
  DELETE FROM analytics_events WHERE user_id = ANY(expired_user_ids);
  DELETE FROM social_shares WHERE user_id = ANY(expired_user_ids);
  
  -- Delete expired accounts
  DELETE FROM users WHERE id = ANY(expired_user_ids);
  
  RETURN expired_count;
END;
$$ LANGUAGE plpgsql;

-- Function to handle re-registration
CREATE OR REPLACE FUNCTION handle_re_registration(
  user_email VARCHAR,
  user_name VARCHAR,
  user_google_id VARCHAR DEFAULT NULL
)
RETURNS UUID AS $$
DECLARE
  existing_user_id UUID;
  new_user_id UUID;
  re_reg_count INTEGER;
BEGIN
  -- Check if user email was previously registered
  SELECT id, re_registration_count INTO existing_user_id, re_reg_count
  FROM users 
  WHERE email = user_email AND is_expired = true;
  
  IF existing_user_id IS NOT NULL THEN
    -- Delete the expired account first
    DELETE FROM user_progress WHERE user_id = existing_user_id;
    DELETE FROM user_achievements WHERE user_id = existing_user_id;
    DELETE FROM analytics_events WHERE user_id = existing_user_id;
    DELETE FROM social_shares WHERE user_id = existing_user_id;
    DELETE FROM users WHERE id = existing_user_id;
    
    -- Create new account with incremented counter
    INSERT INTO users (
      email, 
      name, 
      google_id,
      subscription_status,
      expires_at,
      re_registration_count,
      is_expired,
      primary_goal,
      experience_level,
      daily_time_commitment
    ) VALUES (
      user_email,
      user_name,
      user_google_id,
      'free',
      NOW() + INTERVAL '30 days',
      COALESCE(re_reg_count, 0) + 1,
      false,
      'small_talk',
      'beginner',
      '5_minutes'
    ) RETURNING id INTO new_user_id;
    
    RETURN new_user_id;
  ELSE
    -- Regular new registration
    INSERT INTO users (
      email, 
      name, 
      google_id,
      subscription_status,
      expires_at,
      re_registration_count,
      is_expired,
      primary_goal,
      experience_level,
      daily_time_commitment
    ) VALUES (
      user_email,
      user_name,
      user_google_id,
      'free',
      NOW() + INTERVAL '30 days',
      0,
      false,
      'small_talk',
      'beginner',
      '5_minutes'
    ) RETURNING id INTO new_user_id;
    
    RETURN new_user_id;
  END IF;
END;
$$ LANGUAGE plpgsql;

-- Function to check lesson access
CREATE OR REPLACE FUNCTION check_lesson_access(user_uuid UUID, lesson_number INTEGER)
RETURNS VARCHAR AS $$
DECLARE
  user_record RECORD;
BEGIN
  -- Get user data
  SELECT * INTO user_record FROM users WHERE id = user_uuid;
  
  -- Check if account expired
  IF user_record.subscription_status = 'free' AND user_record.expires_at < NOW() THEN
    RETURN 'ACCOUNT_EXPIRED';
  END IF;
  
  -- Check lesson access
  IF lesson_number >= 31 AND user_record.subscription_status = 'free' THEN
    RETURN 'PAYMENT_REQUIRED';
  END IF;
  
  RETURN 'ACCESS_GRANTED';
END;
$$ LANGUAGE plpgsql;

-- Insert sample data
INSERT INTO achievements (id, title, description, icon, rarity, xp_reward, unlock_criteria) VALUES
('first_lesson', 'Conversation Starter', 'Complete your first lesson', '🎯', 'common', 50, '{"type": "first_lesson"}'),
('streak_3', 'Getting Hot', 'Maintain a 3-day streak', '🔥', 'uncommon', 100, '{"type": "streak", "days": 3}'),
('streak_7', 'Week Warrior', 'Maintain a 7-day streak', '🔥', 'rare', 200, '{"type": "streak", "days": 7}'),
('streak_30', 'Month Master', 'Maintain a 30-day streak', '🔥', 'epic', 500, '{"type": "streak", "days": 30}'),
('level_5', 'Chat Champion', 'Reach level 5', '🏆', 'uncommon', 150, '{"type": "level", "level": 5}'),
('level_10', 'Communication Guru', 'Reach level 10', '🏆', 'rare', 300, '{"type": "level", "level": 10}'),
('lessons_10', 'Dedicated Learner', 'Complete 10 lessons', '📚', 'uncommon', 100, '{"type": "lessons", "count": 10}'),
('lessons_50', 'Conversation Expert', 'Complete 50 lessons', '📚', 'rare', 250, '{"type": "lessons", "count": 50}'),
('perfect_lesson', 'Perfect Score', 'Get all answers correct in a lesson', '⭐', 'uncommon', 100, '{"type": "perfect_lesson"}');

-- Vouchers table
CREATE TABLE vouchers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  code VARCHAR(50) UNIQUE NOT NULL,
  discount_type VARCHAR(10) NOT NULL CHECK (discount_type IN ('fixed', 'percentage')),
  discount_value DECIMAL(10,2) NOT NULL,
  max_uses INTEGER DEFAULT NULL,
  used_count INTEGER DEFAULT 0,
  expires_at TIMESTAMP DEFAULT NULL,
  is_active BOOLEAN DEFAULT true,
  description TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Voucher usage tracking table
CREATE TABLE voucher_usage (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  voucher_id UUID REFERENCES vouchers(id) ON DELETE CASCADE,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  order_id VARCHAR(100),
  discount_applied DECIMAL(10,2) NOT NULL,
  used_at TIMESTAMP DEFAULT NOW()
);

-- Create indexes for voucher tables
CREATE INDEX idx_vouchers_code ON vouchers(code);
CREATE INDEX idx_vouchers_is_active ON vouchers(is_active);
CREATE INDEX idx_vouchers_expires_at ON vouchers(expires_at);
CREATE INDEX idx_voucher_usage_voucher_id ON voucher_usage(voucher_id);
CREATE INDEX idx_voucher_usage_user_id ON voucher_usage(user_id);

-- Enable RLS for voucher tables
ALTER TABLE vouchers ENABLE ROW LEVEL SECURITY;
ALTER TABLE voucher_usage ENABLE ROW LEVEL SECURITY;

-- Vouchers are viewable by everyone (for validation)
CREATE POLICY "Vouchers are viewable by everyone" ON vouchers FOR SELECT USING (true);

-- Only admins can manage vouchers (you'll need to implement admin role checking)
CREATE POLICY "Admins can manage vouchers" ON vouchers FOR ALL USING (true);

-- Voucher usage is private
CREATE POLICY "Users can view own voucher usage" ON voucher_usage FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own voucher usage" ON voucher_usage FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Function to validate and apply voucher
CREATE OR REPLACE FUNCTION validate_voucher(
  voucher_code VARCHAR,
  user_uuid UUID,
  order_amount DECIMAL(10,2)
)
RETURNS JSONB AS $$
DECLARE
  voucher_record RECORD;
  discount_amount DECIMAL(10,2);
  result JSONB;
BEGIN
  -- Get voucher details
  SELECT * INTO voucher_record 
  FROM vouchers 
  WHERE code = voucher_code 
    AND is_active = true
    AND (expires_at IS NULL OR expires_at > NOW())
    AND (max_uses IS NULL OR used_count < max_uses);
  
  IF voucher_record IS NULL THEN
    RETURN jsonb_build_object(
      'valid', false,
      'error', 'Invalid or expired voucher code'
    );
  END IF;
  
  -- Check if user already used this voucher
  IF EXISTS (
    SELECT 1 FROM voucher_usage 
    WHERE voucher_id = voucher_record.id 
    AND user_id = user_uuid
  ) THEN
    RETURN jsonb_build_object(
      'valid', false,
      'error', 'Voucher already used by this user'
    );
  END IF;
  
  -- Calculate discount
  IF voucher_record.discount_type = 'fixed' THEN
    discount_amount := LEAST(voucher_record.discount_value, order_amount);
  ELSE
    discount_amount := (order_amount * voucher_record.discount_value) / 100;
  END IF;
  
  -- Return success
  RETURN jsonb_build_object(
    'valid', true,
    'voucher_id', voucher_record.id,
    'discount_amount', discount_amount,
    'discount_type', voucher_record.discount_type,
    'discount_value', voucher_record.discount_value
  );
END;
$$ LANGUAGE plpgsql;

-- Function to apply voucher and track usage
CREATE OR REPLACE FUNCTION apply_voucher(
  voucher_code VARCHAR,
  user_uuid UUID,
  order_id VARCHAR,
  order_amount DECIMAL(10,2)
)
RETURNS JSONB AS $$
DECLARE
  validation_result JSONB;
  voucher_record RECORD;
BEGIN
  -- Validate voucher
  validation_result := validate_voucher(voucher_code, user_uuid, order_amount);
  
  IF NOT (validation_result->>'valid')::boolean THEN
    RETURN validation_result;
  END IF;
  
  -- Get voucher details
  SELECT * INTO voucher_record FROM vouchers WHERE code = voucher_code;
  
  -- Record usage
  INSERT INTO voucher_usage (
    voucher_id, 
    user_id, 
    order_id, 
    discount_applied
  ) VALUES (
    voucher_record.id,
    user_uuid,
    order_id,
    (validation_result->>'discount_amount')::decimal
  );
  
  -- Update voucher usage count
  UPDATE vouchers 
  SET used_count = used_count + 1,
      updated_at = NOW()
  WHERE id = voucher_record.id;
  
  RETURN validation_result;
END;
$$ LANGUAGE plpgsql;

-- Insert sample vouchers
INSERT INTO vouchers (code, discount_type, discount_value, max_uses, description) VALUES
('WELCOME20', 'fixed', 80.00, 100, 'Welcome discount for new users'),
('SAVE50', 'fixed', 200.00, 50, '50% off promotion'),
('FRIEND100', 'fixed', 100.00, 200, 'Referral program discount'),
('SUMMER30', 'percentage', 30.00, 75, 'Summer sale 30% off'),
('FLASH25', 'percentage', 25.00, 25, 'Flash sale 25% off');

-- Insert sample lessons
INSERT INTO lessons (id, title, description, level, category, is_premium, estimated_duration, learning_objectives, order_index) VALUES
('small_talk_001', 'Starting Conversations with Strangers', 'Learn the art of breaking the ice and starting meaningful conversations', 'foundation', 'small_talk', false, 5, ARRAY['Identify conversation starters', 'Ask follow-up questions', 'Show genuine interest'], 1),
('small_talk_002', 'Weather Talk That Actually Works', 'Transform boring weather conversations into engaging discussions', 'foundation', 'small_talk', false, 5, ARRAY['Use weather as a conversation bridge', 'Connect weather to activities', 'Avoid weather dead-ends'], 2),
('small_talk_003', 'Asking Follow-up Questions', 'Master the art of keeping conversations flowing naturally', 'foundation', 'small_talk', false, 5, ARRAY['Ask open-ended questions', 'Show active listening', 'Build on previous responses'], 3),
('professional_001', 'Elevator Conversations', 'Make the most of brief professional encounters', 'foundation', 'professional', false, 5, ARRAY['Deliver concise introductions', 'Show professional value', 'Create networking opportunities'], 4),
('professional_002', 'Coffee Shop Networking', 'Turn casual coffee meetings into valuable professional connections', 'foundation', 'professional', false, 5, ARRAY['Prepare conversation topics', 'Show genuine interest', 'Follow up effectively'], 5); 

-- Certifications table
CREATE TABLE certifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  certificate_id VARCHAR UNIQUE NOT NULL,
  first_name VARCHAR NOT NULL,
  last_name VARCHAR NOT NULL,
  issued_at TIMESTAMP DEFAULT NOW(),
  completion_date TIMESTAMP NOT NULL,
  total_xp_at_completion INTEGER NOT NULL,
  longest_streak_at_completion INTEGER NOT NULL,
  lessons_completed_at_completion INTEGER NOT NULL,
  certificate_hash VARCHAR UNIQUE NOT NULL, -- For verification
  is_revoked BOOLEAN DEFAULT false,
  revoked_at TIMESTAMP,
  revoked_reason TEXT,
  
  UNIQUE(user_id) -- Ensure only one certification per user
);

-- Create indexes for certifications
CREATE INDEX idx_certifications_user_id ON certifications(user_id);
CREATE INDEX idx_certifications_certificate_id ON certifications(certificate_id);
CREATE INDEX idx_certifications_certificate_hash ON certifications(certificate_hash);
CREATE INDEX idx_certifications_issued_at ON certifications(issued_at);

-- Enable RLS for certifications
ALTER TABLE certifications ENABLE ROW LEVEL SECURITY;

-- Certifications are private
CREATE POLICY "Users can view own certifications" ON certifications FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own certifications" ON certifications FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own certifications" ON certifications FOR UPDATE USING (auth.uid() = user_id);

-- Function to check if user can change certification name (30-day restriction)
CREATE OR REPLACE FUNCTION can_change_certification_name(user_uuid UUID)
RETURNS BOOLEAN AS $$
DECLARE
  last_update TIMESTAMP;
BEGIN
  SELECT certification_name_updated_at INTO last_update
  FROM users
  WHERE id = user_uuid;
  
  -- If never updated or more than 30 days ago, allow change
  RETURN last_update IS NULL OR last_update < NOW() - INTERVAL '30 days';
END;
$$ LANGUAGE plpgsql;

-- Function to generate unique certificate ID
CREATE OR REPLACE FUNCTION generate_certificate_id()
RETURNS VARCHAR AS $$
DECLARE
  cert_id VARCHAR;
  counter INTEGER := 0;
  max_attempts INTEGER := 10;
BEGIN
  LOOP
    -- Generate certificate ID with timestamp and random number
    cert_id := 'UC-' || 
               EXTRACT(YEAR FROM NOW()) || '-' ||
               LPAD(EXTRACT(MONTH FROM NOW())::TEXT, 2, '0') || '-' ||
               LPAD(EXTRACT(DAY FROM NOW())::TEXT, 2, '0') || '-' ||
               LPAD(EXTRACT(HOUR FROM NOW())::TEXT, 2, '0') || '-' ||
               LPAD(EXTRACT(MINUTE FROM NOW())::TEXT, 2, '0') || '-' ||
               LPAD(EXTRACT(SECOND FROM NOW())::TEXT, 2, '0') || '-' ||
               LPAD(FLOOR(RANDOM() * 1000)::TEXT, 3, '0');
    
    -- Check if this ID already exists
    IF NOT EXISTS (SELECT 1 FROM certifications WHERE certificate_id = cert_id) THEN
      RETURN cert_id;
    END IF;
    
    -- If we've tried too many times, add a random suffix
    counter := counter + 1;
    IF counter >= max_attempts THEN
      cert_id := cert_id || '-' || LPAD(FLOOR(RANDOM() * 10000)::TEXT, 4, '0');
      RETURN cert_id;
    END IF;
  END LOOP;
END;
$$ LANGUAGE plpgsql;

-- Function to generate certificate hash for verification
CREATE OR REPLACE FUNCTION generate_certificate_hash(
  user_uuid UUID,
  first_name VARCHAR,
  last_name VARCHAR,
  completion_date TIMESTAMP,
  total_xp INTEGER
)
RETURNS VARCHAR AS $$
BEGIN
  RETURN encode(
    hmac(
      user_uuid::TEXT || first_name || last_name || completion_date::TEXT || total_xp::TEXT,
      'convomaster-cert-secret-key',
      'sha256'
    ),
    'hex'
  );
END;
$$ LANGUAGE plpgsql;

-- Function to issue certification (prevents multiple certifications)
CREATE OR REPLACE FUNCTION issue_certification(
  user_uuid UUID,
  first_name VARCHAR,
  last_name VARCHAR,
  total_xp INTEGER,
  longest_streak INTEGER,
  lessons_completed INTEGER
)
RETURNS UUID AS $$
DECLARE
  cert_id UUID;
  cert_hash VARCHAR;
BEGIN
  -- Check if user already has a certification
  IF EXISTS (SELECT 1 FROM certifications WHERE user_id = user_uuid) THEN
    RAISE EXCEPTION 'User already has a certification';
  END IF;
  
  -- Generate certificate hash
  cert_hash := generate_certificate_hash(user_uuid, first_name, last_name, NOW(), total_xp);
  
  -- Insert certification
  INSERT INTO certifications (
    user_id,
    certificate_id,
    first_name,
    last_name,
    completion_date,
    total_xp_at_completion,
    longest_streak_at_completion,
    lessons_completed_at_completion,
    certificate_hash
  ) VALUES (
    user_uuid,
    generate_certificate_id(),
    first_name,
    last_name,
    NOW(),
    total_xp,
    longest_streak,
    lessons_completed,
    cert_hash
  ) RETURNING id INTO cert_id;
  
  RETURN cert_id;
END;
$$ LANGUAGE plpgsql; 
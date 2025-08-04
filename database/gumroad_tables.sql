-- Gumroad Integration Database Schema
-- Run this in Supabase SQL Editor

-- Add is_premium column to users table if it doesn't exist
ALTER TABLE users ADD COLUMN IF NOT EXISTS is_premium BOOLEAN DEFAULT FALSE;
ALTER TABLE users ADD COLUMN IF NOT EXISTS purchase_details JSONB DEFAULT '{}';

-- Create purchases table for detailed purchase logs
CREATE TABLE IF NOT EXISTS purchases (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  sale_id TEXT UNIQUE NOT NULL,
  product_id TEXT NOT NULL,
  email TEXT NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  currency TEXT DEFAULT 'PHP',
  purchase_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  country TEXT,
  status TEXT DEFAULT 'completed' CHECK (status IN ('completed', 'refunded', 'failed')),
  is_new_user BOOLEAN DEFAULT FALSE,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create daily_analytics table for aggregated daily stats
CREATE TABLE IF NOT EXISTS daily_analytics (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  date DATE UNIQUE NOT NULL,
  revenue DECIMAL(10,2) DEFAULT 0,
  purchases INTEGER DEFAULT 0,
  refunds INTEGER DEFAULT 0,
  new_users INTEGER DEFAULT 0,
  total_users INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_purchases_user_id ON purchases(user_id);
CREATE INDEX IF NOT EXISTS idx_purchases_sale_id ON purchases(sale_id);
CREATE INDEX IF NOT EXISTS idx_purchases_purchase_date ON purchases(purchase_date);
CREATE INDEX IF NOT EXISTS idx_purchases_status ON purchases(status);
CREATE INDEX IF NOT EXISTS idx_daily_analytics_date ON daily_analytics(date);

-- Create updated_at trigger function if it doesn't exist
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Add updated_at triggers
CREATE TRIGGER update_purchases_updated_at 
  BEFORE UPDATE ON purchases 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_daily_analytics_updated_at 
  BEFORE UPDATE ON daily_analytics 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Row Level Security (RLS) Policies

-- Enable RLS on purchases table
ALTER TABLE purchases ENABLE ROW LEVEL SECURITY;

-- Users can only see their own purchases
CREATE POLICY "Users can view own purchases" ON purchases
  FOR SELECT USING (auth.uid() = user_id);

-- Only admins can insert/update/delete purchases
CREATE POLICY "Admins can manage purchases" ON purchases
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM users 
      WHERE users.id = auth.uid() 
      AND users.role = 'admin'
    )
  );

-- Enable RLS on daily_analytics table
ALTER TABLE daily_analytics ENABLE ROW LEVEL SECURITY;

-- Only admins can access daily analytics
CREATE POLICY "Admins can access daily analytics" ON daily_analytics
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM users 
      WHERE users.id = auth.uid() 
      AND users.role = 'admin'
    )
  );

-- Update users table RLS to allow admins to update is_premium
CREATE POLICY "Admins can update user premium status" ON users
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM users 
      WHERE users.id = auth.uid() 
      AND users.role = 'admin'
    )
  );

-- Insert some sample data for testing (optional)
-- INSERT INTO daily_analytics (date, revenue, purchases, new_users, total_users) 
-- VALUES (CURRENT_DATE, 0, 0, 0, 0) 
-- ON CONFLICT (date) DO NOTHING; 
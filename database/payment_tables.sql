-- Payment Tables Migration
-- Run this in your Supabase SQL editor

-- Create payments table
CREATE TABLE IF NOT EXISTS payments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  paymongo_payment_id TEXT UNIQUE,
  amount INTEGER NOT NULL,
  currency TEXT DEFAULT 'PHP',
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'processing', 'completed', 'failed', 'cancelled')),
  payment_method TEXT,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create payment_intents table
CREATE TABLE IF NOT EXISTS payment_intents (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  paymongo_intent_id TEXT UNIQUE,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  amount INTEGER NOT NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'processing', 'succeeded', 'failed', 'cancelled')),
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_payments_user_id ON payments(user_id);
CREATE INDEX IF NOT EXISTS idx_payments_status ON payments(status);
CREATE INDEX IF NOT EXISTS idx_payments_created_at ON payments(created_at);

CREATE INDEX IF NOT EXISTS idx_payment_intents_user_id ON payment_intents(user_id);
CREATE INDEX IF NOT EXISTS idx_payment_intents_status ON payment_intents(status);
CREATE INDEX IF NOT EXISTS idx_payment_intents_created_at ON payment_intents(created_at);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_payments_updated_at 
  BEFORE UPDATE ON payments 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_payment_intents_updated_at 
  BEFORE UPDATE ON payment_intents 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Create RLS policies for payments table
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;

-- Users can only see their own payments
CREATE POLICY "Users can view own payments" ON payments
  FOR SELECT USING (auth.uid() = user_id);

-- Only service role can insert/update payments (via webhooks)
CREATE POLICY "Service role can manage payments" ON payments
  FOR ALL USING (auth.role() = 'service_role');

-- Create RLS policies for payment_intents table
ALTER TABLE payment_intents ENABLE ROW LEVEL SECURITY;

-- Users can only see their own payment intents
CREATE POLICY "Users can view own payment intents" ON payment_intents
  FOR SELECT USING (auth.uid() = user_id);

-- Only service role can insert/update payment intents
CREATE POLICY "Service role can manage payment intents" ON payment_intents
  FOR ALL USING (auth.role() = 'service_role');

-- Insert sample data for testing (optional)
-- INSERT INTO payments (user_id, paymongo_payment_id, amount, status, payment_method) 
-- VALUES ('your-user-id', 'pi_test_123', 49900, 'completed', 'gcash');

-- Grant necessary permissions
GRANT USAGE ON SCHEMA public TO anon, authenticated;
GRANT ALL ON payments TO anon, authenticated;
GRANT ALL ON payment_intents TO anon, authenticated; 
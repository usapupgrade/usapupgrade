-- Migration to add missing progress tracking fields
-- Run this in your Supabase SQL editor

-- Add completed_lessons field to users table
ALTER TABLE users 
ADD COLUMN IF NOT EXISTS completed_lessons INTEGER[] DEFAULT '{}';

-- Add current_lesson field to users table
ALTER TABLE users 
ADD COLUMN IF NOT EXISTS current_lesson INTEGER DEFAULT 1;

-- Update existing users to have default values
UPDATE users 
SET completed_lessons = '{}', current_lesson = 1 
WHERE completed_lessons IS NULL OR current_lesson IS NULL;

-- Verify the migration
SELECT 
  id, 
  email, 
  completed_lessons, 
  current_lesson, 
  total_xp, 
  current_streak 
FROM users 
LIMIT 5; 
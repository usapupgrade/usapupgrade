import { createClient } from '@supabase/supabase-js'

// Get environment variables with proper error handling
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

// Validate required environment variables
if (!supabaseUrl) {
  console.warn('NEXT_PUBLIC_SUPABASE_URL is missing')
}

if (!supabaseAnonKey) {
  console.warn('NEXT_PUBLIC_SUPABASE_ANON_KEY is missing')
}

// Create Supabase client for client-side operations
export const supabase = createClient(
  supabaseUrl || 'https://cqgmgcgckncsadgwjtxr.supabase.co',
  supabaseAnonKey || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNxZ21nY2dja25jc2FkZ3dqdHhyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQwMTgxODUsImV4cCI6MjA2OTU5NDE4NX0.Ej8Ej8Ej8Ej8Ej8Ej8Ej8Ej8Ej8Ej8Ej8Ej8Ej8Ej8'
)

// Admin client for server-side operations
export const supabaseAdmin = createClient(
  supabaseUrl || 'https://cqgmgcgckncsadgwjtxr.supabase.co',
  supabaseServiceKey || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNxZ21nY2dja25jc2FkZ3dqdHhyIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1NDAxODE4NSwiZXhwIjoyMDY5NTk0MTg1fQ.vTuvjxJHVEUkLzJ7BxNoUnxZj3N5dyULaSTEPCKCAeg',
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  }
)

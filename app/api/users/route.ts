import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'
import { userInputSchema, validateAndSanitize, sanitizeEmail, sanitizeString } from '../../lib/validation'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Validate and sanitize input
    const validation = userInputSchema.validate(body)
    if (!validation.success) {
      return NextResponse.json({ error: validation.error }, { status: 400 })
    }
    
    const { email, name } = validation.data!
    const subscriptionStatus = 'free'
    const sanitizedEmail = sanitizeEmail(email)
    const sanitizedName = sanitizeString(name)
    
    // Check if supabaseAdmin is available
    if (!supabaseAdmin) {
      return NextResponse.json({ error: 'Database not available' }, { status: 500 })
    }
    
    // Check if user already exists
    const { data: existingUser } = await supabaseAdmin
      .from('profiles')
      .select('*')
      .eq('email', sanitizedEmail)
      .single()
    
    if (existingUser) {
      return NextResponse.json({ error: 'User already exists' }, { status: 400 })
    }
    
    // Create new user profile
    const { data: user, error } = await supabaseAdmin
      .from('profiles')
      .insert({
        email: sanitizedEmail,
        name: sanitizedName,
        subscription_status: subscriptionStatus,
        total_xp: 0,
        current_level: 1,
        current_streak: 0,
        longest_streak: 0,
        completed_lessons: [],
        achievements: []
      })
      .select()
      .single()
    
    if (error) {
      console.error('Error creating user:', error)
      return NextResponse.json({ error: 'Failed to create user' }, { status: 500 })
    }
    
    return NextResponse.json({ 
      success: true, 
      userId: user.id 
    })
  } catch (error) {
    console.error('Error creating user:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const email = searchParams.get('email')
    
    // Check if supabaseAdmin is available
    if (!supabaseAdmin) {
      return NextResponse.json({ error: 'Database not available' }, { status: 500 })
    }
    
    if (email) {
      const { data: user, error } = await supabaseAdmin
        .from('profiles')
        .select('*')
        .eq('email', email)
        .single()
      
      if (error || !user) {
        return NextResponse.json({ error: 'User not found' }, { status: 404 })
      }
      
      return NextResponse.json(user)
    }
    
    // Get all users (for admin dashboard)
    const { data: users, error } = await supabaseAdmin
      .from('profiles')
      .select('*')
      .limit(100)
    
    if (error) {
      console.error('Error fetching users:', error)
      return NextResponse.json({ error: 'Failed to fetch users' }, { status: 500 })
    }
    
    return NextResponse.json(users || [])
  } catch (error) {
    console.error('Error fetching users:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
} 
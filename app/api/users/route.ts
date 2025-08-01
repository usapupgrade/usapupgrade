import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'

export async function POST(request: NextRequest) {
  try {
    const { email, name, subscriptionStatus = 'free' } = await request.json()
    
    // Check if user already exists
    const { data: existingUser } = await supabaseAdmin
      .from('profiles')
      .select('*')
      .eq('email', email)
      .single()
    
    if (existingUser) {
      return NextResponse.json({ error: 'User already exists' }, { status: 400 })
    }
    
    // Create new user profile
    const { data: user, error } = await supabaseAdmin
      .from('profiles')
      .insert({
        email,
        name,
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
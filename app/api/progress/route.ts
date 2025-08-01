import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'

export async function POST(request: NextRequest) {
  try {
    const { email, lessonId, xpEarned, isCorrect } = await request.json()
    
    // Get user by email
    const { data: user, error: userError } = await supabaseAdmin
      .from('profiles')
      .select('id, completed_lessons, total_xp')
      .eq('email', email)
      .single()
    
    if (userError || !user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }
    
    // Update user progress
    const updatedLessons = [...(user.completed_lessons || []), lessonId]
    const { error: updateError } = await supabaseAdmin
      .from('profiles')
      .update({
        completed_lessons: updatedLessons,
        total_xp: (user.total_xp || 0) + xpEarned
      })
      .eq('id', user.id)
    
    if (updateError) {
      console.error('Error updating progress:', updateError)
      return NextResponse.json({ error: 'Failed to update progress' }, { status: 500 })
    }
    
    // Add progress record
    const { error: progressError } = await supabaseAdmin
      .from('user_progress')
      .insert({
        user_id: user.id,
        lesson_id: lessonId,
        xp_earned: xpEarned,
        is_correct: isCorrect
      })
    
    if (progressError) {
      console.error('Error creating progress record:', progressError)
    }
    
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error updating progress:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const email = searchParams.get('email')
    
    if (!email) {
      return NextResponse.json({ error: 'Email required' }, { status: 400 })
    }
    
    const { data: user, error } = await supabaseAdmin
      .from('profiles')
      .select('completed_lessons, total_xp, current_level, current_streak, longest_streak')
      .eq('email', email)
      .single()
    
    if (error || !user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }
    
    return NextResponse.json({
      completedLessons: user.completed_lessons || [],
      totalXp: user.total_xp || 0,
      currentLevel: user.current_level || 1,
      currentStreak: user.current_streak || 0,
      longestStreak: user.longest_streak || 0
    })
  } catch (error) {
    console.error('Error fetching progress:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
} 
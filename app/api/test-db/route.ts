import { NextResponse } from 'next/server'
import { supabase } from '../../../lib/supabase'

export async function GET() {
  try {
    // Test database connection and check user table structure
    const { data: users, error } = await supabase
      .from('users')
      .select('*')
      .limit(1)

    if (error) {
      return NextResponse.json({ 
        error: 'Database connection failed', 
        details: error.message 
      }, { status: 500 })
    }

    // Check if the required fields exist
    const firstUser = users?.[0]
    const hasCompletedLessons = firstUser && 'completed_lessons' in firstUser
    const hasCurrentLesson = firstUser && 'current_lesson' in firstUser
    const hasTotalXp = firstUser && 'total_xp' in firstUser

    return NextResponse.json({
      success: true,
      databaseConnected: true,
      userFields: {
        hasCompletedLessons,
        hasCurrentLesson,
        hasTotalXp,
        sampleUser: firstUser ? {
          id: firstUser.id,
          email: firstUser.email,
          completed_lessons: firstUser.completed_lessons,
          current_lesson: firstUser.current_lesson,
          total_xp: firstUser.total_xp,
          current_streak: firstUser.current_streak
        } : null
      },
      allFields: firstUser ? Object.keys(firstUser) : []
    })

  } catch (error) {
    return NextResponse.json({ 
      error: 'Unexpected error', 
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
} 
import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'

export async function GET(request: NextRequest) {
  try {
    if (!supabaseAdmin) {
      return NextResponse.json({ error: 'Database connection failed' }, { status: 500 })
    }

    // Fetch all users with their progress data
    const { data: users, error: usersError } = await supabaseAdmin
      .from('users')
      .select(`
        id,
        email,
        name,
        subscription_status,
        is_premium,
        total_xp,
        current_level,
        current_streak,
        longest_streak,
        last_lesson_date,
        created_at,
        updated_at
      `)
      .order('created_at', { ascending: false })

    if (usersError) {
      console.error('Error fetching users:', usersError)
      return NextResponse.json({ error: 'Failed to fetch users' }, { status: 500 })
    }

    // Get lesson completion counts for each user
    const usersWithProgress = await Promise.all(
      users.map(async (user) => {
        // Get completed lessons count
        const { count: completedLessons } = await supabaseAdmin!
          .from('user_progress')
          .select('*', { count: 'exact', head: true })
          .eq('user_id', user.id)

        // Calculate last active time
        const lastActive = user.last_lesson_date 
          ? new Date(user.last_lesson_date).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'short',
              day: 'numeric'
            })
          : 'Never'

        return {
          id: user.id,
          name: user.name || user.email.split('@')[0],
          email: user.email,
          subscriptionStatus: user.subscription_status || 'free',
          totalXp: user.total_xp || 0,
          currentLevel: user.current_level || 1,
          currentStreak: user.current_streak || 0,
          completedLessons: completedLessons || 0,
          lastActive,
          joinedAt: new Date(user.created_at).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
          })
        }
      })
    )

    // Calculate user statistics
    const stats = {
      total: usersWithProgress.length,
      free: usersWithProgress.filter(u => u.subscriptionStatus === 'free').length,
      premium: usersWithProgress.filter(u => u.subscriptionStatus === 'premium').length,
      active: usersWithProgress.filter(u => u.lastActive !== 'Never').length
    }

    return NextResponse.json({
      success: true,
      data: {
        users: usersWithProgress,
        stats
      }
    })

  } catch (error) {
    console.error('Admin users API error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
} 
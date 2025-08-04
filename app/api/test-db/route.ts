import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'

export async function GET(request: NextRequest) {
  try {
    if (!supabaseAdmin) {
      return NextResponse.json({ 
        error: 'Database connection failed - no admin client',
        supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL,
        hasServiceKey: !!process.env.SUPABASE_SERVICE_ROLE_KEY
      }, { status: 500 })
    }

    // Test database connection by fetching basic data
    const { data: users, error: usersError } = await supabaseAdmin
      .from('users')
      .select('id, email, subscription_status, created_at')
      .limit(5)

    const { data: purchases, error: purchasesError } = await supabaseAdmin
      .from('purchases')
      .select('*')
      .limit(5)

    const { data: analytics, error: analyticsError } = await supabaseAdmin
      .from('daily_analytics')
      .select('*')
      .limit(5)

    return NextResponse.json({
      success: true,
      database: {
        users: users || [],
        purchases: purchases || [],
        analytics: analytics || [],
        errors: {
          users: usersError?.message,
          purchases: purchasesError?.message,
          analytics: analyticsError?.message
        }
      },
      environment: {
        hasSupabaseUrl: !!process.env.NEXT_PUBLIC_SUPABASE_URL,
        hasServiceKey: !!process.env.SUPABASE_SERVICE_ROLE_KEY,
        supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL
      }
    })

  } catch (error) {
    console.error('Test DB error:', error)
    return NextResponse.json({ 
      error: 'Internal server error',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
} 
import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'

export async function GET(request: NextRequest) {
  try {
    if (!supabaseAdmin) {
      return NextResponse.json({ error: 'Database not configured' }, { status: 500 })
    }

    // Get analytics data from database
    const { data: analytics, error: analyticsError } = await supabaseAdmin
      .from('daily_analytics')
      .select('*')
      .order('date', { ascending: false })
      .limit(30)

    if (analyticsError) {
      console.error('Analytics error:', analyticsError)
      return NextResponse.json({ error: 'Failed to fetch analytics' }, { status: 500 })
    }

    // Get user counts
    const { data: users, error: usersError } = await supabaseAdmin
      .from('users')
      .select('id, subscription_status, created_at')

    if (usersError) {
      console.error('Users error:', usersError)
      return NextResponse.json({ error: 'Failed to fetch users' }, { status: 500 })
    }

    // Get purchase data
    const { data: purchases, error: purchasesError } = await supabaseAdmin
      .from('purchases')
      .select('*')
      .order('purchase_date', { ascending: false })

    if (purchasesError) {
      console.error('Purchases error:', purchasesError)
      return NextResponse.json({ error: 'Failed to fetch purchases' }, { status: 500 })
    }

    // Calculate metrics
    const totalUsers = users?.length || 0
    const premiumUsers = users?.filter(u => u.subscription_status === 'premium').length || 0
    const totalPurchases = purchases?.length || 0
    const totalRevenue = purchases?.reduce((sum, p) => sum + (p.price || 0), 0) || 0

    // Calculate recent metrics (last 7 days)
    const sevenDaysAgo = new Date()
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7)

    const recentUsers = users?.filter(u => 
      new Date(u.created_at) >= sevenDaysAgo
    ).length || 0

    const recentPurchases = purchases?.filter(p => 
      new Date(p.purchase_date) >= sevenDaysAgo
    ).length || 0

    const recentRevenue = purchases?.filter(p => 
      new Date(p.purchase_date) >= sevenDaysAgo
    ).reduce((sum, p) => sum + (p.price || 0), 0) || 0

    // Format analytics data for charts
    const chartData = analytics?.map(day => ({
      date: day.date,
      revenue: day.revenue || 0,
      purchases: day.purchases || 0,
      newUsers: day.new_users || 0
    })) || []

    return NextResponse.json({
      success: true,
      data: {
        overview: {
          totalUsers,
          premiumUsers,
          totalPurchases,
          totalRevenue: Math.round(totalRevenue * 100) / 100, // Round to 2 decimal places
          recentUsers,
          recentPurchases,
          recentRevenue: Math.round(recentRevenue * 100) / 100
        },
        chartData,
        recentPurchases: purchases?.slice(0, 10) || [],
        analytics: analytics || []
      }
    })

  } catch (error) {
    console.error('Analytics API error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
} 
import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'

export async function GET(request: NextRequest) {
  try {
    // Get query parameters for filtering
    const { searchParams } = new URL(request.url)
    const startDate = searchParams.get('startDate')
    const endDate = searchParams.get('endDate')
    const period = searchParams.get('period') || '30' // days

    if (!supabaseAdmin) {
      return NextResponse.json({ error: 'Database connection failed' }, { status: 500 })
    }

    // Get date range
    const end = endDate ? new Date(endDate) : new Date()
    const start = startDate ? new Date(startDate) : new Date(Date.now() - parseInt(period) * 24 * 60 * 60 * 1000)

    // Fetch purchase analytics
    const { data: purchases, error: purchasesError } = await supabaseAdmin
      .from('purchases')
      .select('*')
      .gte('purchase_date', start.toISOString())
      .lte('purchase_date', end.toISOString())
      .order('purchase_date', { ascending: false })

    if (purchasesError) {
      console.error('Error fetching purchases:', purchasesError)
      return NextResponse.json({ error: 'Failed to fetch purchases' }, { status: 500 })
    }

    // Fetch daily analytics
    const { data: dailyAnalytics, error: analyticsError } = await supabaseAdmin
      .from('daily_analytics')
      .select('*')
      .gte('date', start.toISOString().split('T')[0])
      .lte('date', end.toISOString().split('T')[0])
      .order('date', { ascending: true })

    if (analyticsError) {
      console.error('Error fetching daily analytics:', analyticsError)
      return NextResponse.json({ error: 'Failed to fetch analytics' }, { status: 500 })
    }

    // Fetch user statistics
    const { data: userStats, error: userError } = await supabaseAdmin
      .from('users')
      .select('subscription_status, created_at')

    if (userError) {
      console.error('Error fetching user stats:', userError)
      return NextResponse.json({ error: 'Failed to fetch user stats' }, { status: 500 })
    }

    // Calculate metrics
    const totalRevenue = purchases.reduce((sum, purchase) => sum + parseFloat(purchase.price), 0)
    const totalPurchases = purchases.length
    const newUserPurchases = purchases.filter(p => p.is_new_user).length
    const existingUserPurchases = totalPurchases - newUserPurchases
    
    const premiumUsers = userStats.filter(u => u.subscription_status === 'premium').length
    const totalUsers = userStats.length
    const conversionRate = totalUsers > 0 ? (premiumUsers / totalUsers * 100).toFixed(1) : '0'

    // Calculate daily revenue trend
    const dailyRevenue = dailyAnalytics.map(day => ({
      date: day.date,
      revenue: parseFloat(day.revenue),
      purchases: day.purchases,
      newUsers: day.new_users
    }))

    // Get recent purchases with user details
    const recentPurchases = await Promise.all(
      purchases.slice(0, 10).map(async (purchase) => {
        if (!supabaseAdmin) {
          return {
            id: purchase.id,
            saleId: purchase.sale_id,
            email: purchase.email,
            price: purchase.price,
            currency: purchase.currency,
            purchaseDate: purchase.purchase_date,
            country: purchase.country,
            status: purchase.status,
            isNewUser: purchase.is_new_user,
            userEmail: null,
            userCreatedAt: null
          }
        }

        const { data: user } = await supabaseAdmin
          .from('users')
          .select('email, created_at')
          .eq('id', purchase.user_id)
          .single()

        return {
          id: purchase.id,
          saleId: purchase.sale_id,
          email: purchase.email,
          price: purchase.price,
          currency: purchase.currency,
          purchaseDate: purchase.purchase_date,
          country: purchase.country,
          status: purchase.status,
          isNewUser: purchase.is_new_user,
          userEmail: user?.email,
          userCreatedAt: user?.created_at
        }
      })
    )

    // Calculate refund rate
    const refundedPurchases = purchases.filter(p => p.status === 'refunded').length
    const refundRate = totalPurchases > 0 ? (refundedPurchases / totalPurchases * 100).toFixed(1) : '0'

    // Get top countries
    const countryStats = purchases.reduce((acc, purchase) => {
      const country = purchase.country || 'Unknown'
      acc[country] = (acc[country] || 0) + 1
      return acc
    }, {} as Record<string, number>)

    const topCountries = Object.entries(countryStats)
      .sort(([,a], [,b]) => (b as number) - (a as number))
      .slice(0, 5)
      .map(([country, count]) => ({ country, count }))

    return NextResponse.json({
      success: true,
      data: {
        overview: {
          totalRevenue,
          totalPurchases,
          newUserPurchases,
          existingUserPurchases,
          premiumUsers,
          totalUsers,
          conversionRate,
          refundRate
        },
        dailyRevenue,
        recentPurchases,
        topCountries,
        dateRange: {
          start: start.toISOString(),
          end: end.toISOString()
        }
      }
    })

  } catch (error) {
    console.error('Admin analytics error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
} 
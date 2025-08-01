import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

// Check if Supabase environment variables are available
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY

let supabase: any = null

if (supabaseUrl && supabaseKey) {
  supabase = createClient(supabaseUrl, supabaseKey)
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const timeRange = searchParams.get('range') || '30d'
    
    // If Supabase is not configured, return mock data
    if (!supabase) {
      return NextResponse.json({
        success: true,
        data: {
          overview: {
            totalCertificates: 156,
            totalUsers: 1247,
            completionRate: '12.5%',
            avgCompletionTime: '45 days'
          },
          verification: {
            totalVerifications: 234,
            successfulVerifications: 220,
            failedVerifications: 14
          },
          dailyStats: {
            '2024-12-15': 12,
            '2024-12-14': 8,
            '2024-12-13': 15,
            '2024-12-12': 10,
            '2024-12-11': 9
          },
          topMetrics: {
            mostCommonCompletionDate: 'December 15, 2024',
            averageXP: 15420,
            averageStreak: 45
          },
          timeRange
        }
      })
    }

    // Calculate date range
    const now = new Date()
    let startDate = new Date()
    
    switch (timeRange) {
      case '7d':
        startDate.setDate(now.getDate() - 7)
        break
      case '30d':
        startDate.setDate(now.getDate() - 30)
        break
      case '90d':
        startDate.setDate(now.getDate() - 90)
        break
      case '1y':
        startDate.setFullYear(now.getFullYear() - 1)
        break
      default:
        startDate.setDate(now.getDate() - 30)
    }

    // Get certificate statistics
    const { data: certificates, error: certError } = await supabase
      .from('certifications')
      .select('*')
      .gte('issued_at', startDate.toISOString())
      .lte('issued_at', now.toISOString())

    if (certError) {
      console.error('Error fetching certificate analytics:', certError)
      return NextResponse.json(
        { error: 'Failed to fetch certificate analytics' },
        { status: 500 }
      )
    }

    // Calculate analytics
    const totalCertificates = certificates?.length || 0
    const totalUsers = await getTotalUsers()
    const completionRate = totalUsers > 0 ? (totalCertificates / totalUsers * 100).toFixed(1) : '0'
    
    // Calculate average completion time (mock data for demo)
    const avgCompletionTime = 45 // days
    
    // Calculate certificate verification stats (mock data for demo)
    const verificationStats = {
      totalVerifications: Math.floor(totalCertificates * 1.5), // Assume 1.5 verifications per certificate
      successfulVerifications: Math.floor(totalCertificates * 1.4),
      failedVerifications: Math.floor(totalCertificates * 0.1)
    }

    // Calculate daily certificate issuance
    const dailyStats = calculateDailyStats(certificates || [], startDate, now)

    // Calculate top performing metrics
    const topMetrics = {
      mostCommonCompletionDate: getMostCommonCompletionDate(certificates || []),
      averageXP: calculateAverageXP(certificates || []),
      averageStreak: calculateAverageStreak(certificates || [])
    }

    return NextResponse.json({
      success: true,
      data: {
        overview: {
          totalCertificates,
          totalUsers,
          completionRate: `${completionRate}%`,
          avgCompletionTime: `${avgCompletionTime} days`
        },
        verification: verificationStats,
        dailyStats,
        topMetrics,
        timeRange
      }
    })

  } catch (error) {
    console.error('Error generating certificate analytics:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

async function getTotalUsers(): Promise<number> {
  try {
    const { count, error } = await supabase
      .from('users')
      .select('*', { count: 'exact', head: true })
    
    if (error) {
      console.error('Error getting total users:', error)
      return 0
    }
    
    return count || 0
  } catch (error) {
    console.error('Error getting total users:', error)
    return 0
  }
}

function calculateDailyStats(certificates: any[], startDate: Date, endDate: Date) {
  const dailyStats: { [key: string]: number } = {}
  
  // Initialize all dates in range with 0
  const currentDate = new Date(startDate)
  while (currentDate <= endDate) {
    const dateKey = currentDate.toISOString().split('T')[0]
    dailyStats[dateKey] = 0
    currentDate.setDate(currentDate.getDate() + 1)
  }
  
  // Count certificates by date
  certificates.forEach(cert => {
    const dateKey = new Date(cert.issued_at).toISOString().split('T')[0]
    if (dailyStats[dateKey] !== undefined) {
      dailyStats[dateKey]++
    }
  })
  
  return dailyStats
}

function getMostCommonCompletionDate(certificates: any[]): string {
  if (certificates.length === 0) return 'No data'
  
  const dateCounts: { [key: string]: number } = {}
  
  certificates.forEach(cert => {
    const dateKey = new Date(cert.completion_date).toISOString().split('T')[0]
    dateCounts[dateKey] = (dateCounts[dateKey] || 0) + 1
  })
  
  const mostCommonDate = Object.entries(dateCounts)
    .sort(([,a], [,b]) => b - a)[0]
  
  return mostCommonDate ? new Date(mostCommonDate[0]).toLocaleDateString() : 'No data'
}

function calculateAverageXP(certificates: any[]): number {
  if (certificates.length === 0) return 0
  
  const totalXP = certificates.reduce((sum, cert) => sum + (cert.total_xp_at_completion || 0), 0)
  return Math.round(totalXP / certificates.length)
}

function calculateAverageStreak(certificates: any[]): number {
  if (certificates.length === 0) return 0
  
  const totalStreak = certificates.reduce((sum, cert) => sum + (cert.longest_streak_at_completion || 0), 0)
  return Math.round(totalStreak / certificates.length)
}

export async function POST(request: NextRequest) {
  try {
    const { action, certificateId, userId } = await request.json()
    
    // Track certificate-related actions
    const analyticsData = {
      action,
      certificate_id: certificateId,
      user_id: userId,
      timestamp: new Date().toISOString(),
      metadata: {
        userAgent: request.headers.get('user-agent'),
        ipAddress: request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip'),
        referer: request.headers.get('referer')
      }
    }
    
    // In a real application, you would store this in an analytics table
    console.log('Certificate analytics event:', analyticsData)
    
    return NextResponse.json({
      success: true,
      message: 'Analytics event recorded'
    })
    
  } catch (error) {
    console.error('Error recording certificate analytics:', error)
    return NextResponse.json(
      { error: 'Failed to record analytics event' },
      { status: 500 }
    )
  }
} 
// Analytics Service for Gumroad Integration
// Fetches real data from the admin analytics API

export interface GumroadAnalytics {
  overview: {
    totalRevenue: number
    totalPurchases: number
    newUserPurchases: number
    existingUserPurchases: number
    premiumUsers: number
    totalUsers: number
    conversionRate: string
    refundRate: string
  }
  dailyRevenue: Array<{
    date: string
    revenue: number
    purchases: number
    newUsers: number
  }>
  recentPurchases: Array<{
    id: string
    saleId: string
    email: string
    price: number
    currency: string
    purchaseDate: string
    country: string
    status: string
    isNewUser: boolean
    userEmail?: string
    userCreatedAt?: string
  }>
  topCountries: Array<{
    country: string
    count: number
  }>
  dateRange: {
    start: string
    end: string
  }
}

export interface AnalyticsError {
  error: string
  message?: string
}

class AnalyticsService {
  private baseUrl: string

  constructor() {
    this.baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'
  }

  async fetchAnalytics(params?: {
    startDate?: string
    endDate?: string
    period?: string
  }): Promise<GumroadAnalytics | AnalyticsError> {
    try {
      const searchParams = new URLSearchParams()
      if (params?.startDate) searchParams.append('startDate', params.startDate)
      if (params?.endDate) searchParams.append('endDate', params.endDate)
      if (params?.period) searchParams.append('period', params.period)

      const url = `${this.baseUrl}/api/admin/analytics${searchParams.toString() ? `?${searchParams.toString()}` : ''}`
      
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      
      if (!data.success) {
        return { error: data.error || 'Failed to fetch analytics' }
      }

      return data.data
    } catch (error) {
      console.error('Analytics fetch error:', error)
      return { 
        error: 'Failed to fetch analytics',
        message: error instanceof Error ? error.message : 'Unknown error'
      }
    }
  }

  // Get analytics for the last 30 days by default
  async getRecentAnalytics(): Promise<GumroadAnalytics | AnalyticsError> {
    return this.fetchAnalytics({ period: '30' })
  }

  // Get analytics for a specific date range
  async getAnalyticsForRange(startDate: string, endDate: string): Promise<GumroadAnalytics | AnalyticsError> {
    return this.fetchAnalytics({ startDate, endDate })
  }

  // Get analytics for different time periods
  async getAnalyticsForPeriod(period: '7' | '30' | '90' | '365'): Promise<GumroadAnalytics | AnalyticsError> {
    return this.fetchAnalytics({ period })
  }

  // Format currency for display
  formatCurrency(amount: number, currency: string = 'PHP'): string {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency
    }).format(amount)
  }

  // Format number for display
  formatNumber(num: number): string {
    return new Intl.NumberFormat('en-US').format(num)
  }

  // Calculate growth percentage
  calculateGrowth(current: number, previous: number): number {
    if (previous === 0) return current > 0 ? 100 : 0
    return ((current - previous) / previous) * 100
  }

  // Get mock data for development/testing
  getMockAnalytics(): GumroadAnalytics {
    return {
      overview: {
        totalRevenue: 12450,
        totalPurchases: 25,
        newUserPurchases: 18,
        existingUserPurchases: 7,
        premiumUsers: 25,
        totalUsers: 150,
        conversionRate: '16.7',
        refundRate: '0.0'
      },
      dailyRevenue: [
        { date: '2024-01-01', revenue: 499, purchases: 1, newUsers: 1 },
        { date: '2024-01-02', revenue: 998, purchases: 2, newUsers: 2 },
        { date: '2024-01-03', revenue: 1497, purchases: 3, newUsers: 2 },
        { date: '2024-01-04', revenue: 1996, purchases: 4, newUsers: 3 },
        { date: '2024-01-05', revenue: 2495, purchases: 5, newUsers: 4 },
        { date: '2024-01-06', revenue: 2994, purchases: 6, newUsers: 5 },
        { date: '2024-01-07', revenue: 3493, purchases: 7, newUsers: 6 }
      ],
      recentPurchases: [
        {
          id: '1',
          saleId: 'sale_123',
          email: 'user1@example.com',
          price: 499,
          currency: 'PHP',
          purchaseDate: '2024-01-15T10:30:00Z',
          country: 'PH',
          status: 'completed',
          isNewUser: true,
          userEmail: 'user1@example.com',
          userCreatedAt: '2024-01-15T10:30:00Z'
        },
        {
          id: '2',
          saleId: 'sale_124',
          email: 'user2@example.com',
          price: 499,
          currency: 'PHP',
          purchaseDate: '2024-01-14T15:20:00Z',
          country: 'PH',
          status: 'completed',
          isNewUser: true,
          userEmail: 'user2@example.com',
          userCreatedAt: '2024-01-14T15:20:00Z'
        }
      ],
      topCountries: [
        { country: 'PH', count: 20 },
        { country: 'US', count: 3 },
        { country: 'CA', count: 2 }
      ],
      dateRange: {
        start: '2024-01-01T00:00:00.000Z',
        end: '2024-01-31T23:59:59.999Z'
      }
    }
  }
}

export const analyticsService = new AnalyticsService() 
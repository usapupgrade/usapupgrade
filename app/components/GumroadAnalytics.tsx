'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  DollarSign, 
  Users, 
  TrendingUp, 
  ShoppingCart,
  Globe,
  Calendar,
  RefreshCw,
  AlertCircle
} from 'lucide-react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Cell } from 'recharts'
import { analyticsService } from '@/app/lib/analyticsService'
import type { GumroadAnalytics, AnalyticsError } from '@/app/lib/analyticsService'

interface GumroadAnalyticsProps {
  className?: string
  timeRange?: '7' | '30' | '90' | '365'
}

export default function GumroadAnalytics({ 
  className = '', 
  timeRange = '30' 
}: GumroadAnalyticsProps) {
  const [analytics, setAnalytics] = useState<GumroadAnalytics | null>(null)
  const [error, setError] = useState<AnalyticsError | null>(null)
  const [loading, setLoading] = useState(true)
  const [selectedPeriod, setSelectedPeriod] = useState(timeRange)

  const fetchAnalytics = async (period: string) => {
    setLoading(true)
    setError(null)
    
    try {
      const result = await analyticsService.getAnalyticsForPeriod(period as '7' | '30' | '90' | '365')
      
      if ('error' in result) {
        setError(result)
        // Fallback to mock data for development
        setAnalytics(analyticsService.getMockAnalytics())
      } else {
        setAnalytics(result)
      }
    } catch (err) {
      console.error('Failed to fetch analytics:', err)
      setError({ error: 'Failed to fetch analytics' })
      // Fallback to mock data
      setAnalytics(analyticsService.getMockAnalytics())
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchAnalytics(selectedPeriod)
  }, [selectedPeriod])

  const formatCurrency = (amount: number) => {
    return analyticsService.formatCurrency(amount)
  }

  const formatNumber = (num: number) => {
    return analyticsService.formatNumber(num)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    })
  }

  if (loading) {
    return (
      <div className={`flex items-center justify-center p-8 ${className}`}>
        <div className="flex items-center gap-2">
          <RefreshCw className="w-5 h-5 animate-spin" />
          <span>Loading analytics...</span>
        </div>
      </div>
    )
  }

  if (error && !analytics) {
    return (
      <div className={`flex items-center justify-center p-8 ${className}`}>
        <div className="flex items-center gap-2 text-red-600">
          <AlertCircle className="w-5 h-5" />
          <span>{error.error}</span>
        </div>
      </div>
    )
  }

  if (!analytics) {
    return (
      <div className={`flex items-center justify-center p-8 ${className}`}>
        <span>No analytics data available</span>
      </div>
    )
  }

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 rounded-lg border shadow-lg">
          <p className="font-medium">{formatDate(label)}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} style={{ color: entry.color }}>
              {entry.name}: {entry.dataKey === 'revenue' ? formatCurrency(entry.value) : formatNumber(entry.value)}
            </p>
          ))}
        </div>
      )
    }
    return null
  }

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Header with period selector */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">Gumroad Analytics</h2>
          <p className="text-sm text-gray-600">Revenue and purchase insights</p>
        </div>
        
        <div className="flex items-center gap-2">
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value as '7' | '30' | '90' | '365')}
            className="px-3 py-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="7">Last 7 days</option>
            <option value="30">Last 30 days</option>
            <option value="90">Last 90 days</option>
            <option value="365">Last year</option>
          </select>
          
          <button
            onClick={() => fetchAnalytics(selectedPeriod)}
            className="p-1 text-gray-500 hover:text-gray-700"
            title="Refresh analytics"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white p-4 rounded-lg border border-gray-200"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Revenue</p>
              <p className="text-2xl font-bold text-gray-900">{formatCurrency(analytics.overview.totalRevenue)}</p>
            </div>
            <DollarSign className="w-8 h-8 text-green-500" />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white p-4 rounded-lg border border-gray-200"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Purchases</p>
              <p className="text-2xl font-bold text-gray-900">{formatNumber(analytics.overview.totalPurchases)}</p>
            </div>
            <ShoppingCart className="w-8 h-8 text-blue-500" />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white p-4 rounded-lg border border-gray-200"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Premium Users</p>
              <p className="text-2xl font-bold text-gray-900">{formatNumber(analytics.overview.premiumUsers)}</p>
            </div>
            <Users className="w-8 h-8 text-purple-500" />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white p-4 rounded-lg border border-gray-200"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Conversion Rate</p>
              <p className="text-2xl font-bold text-gray-900">{analytics.overview.conversionRate}%</p>
            </div>
            <TrendingUp className="w-8 h-8 text-orange-500" />
          </div>
        </motion.div>
      </div>

      {/* Revenue Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-white p-6 rounded-lg border border-gray-200"
      >
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Daily Revenue</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={analytics.dailyRevenue}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              dataKey="date" 
              tickFormatter={formatDate}
              tick={{ fontSize: 12 }}
            />
            <YAxis 
              tickFormatter={(value) => formatCurrency(value)}
              tick={{ fontSize: 12 }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Line 
              type="monotone" 
              dataKey="revenue" 
              stroke="#10b981" 
              strokeWidth={2}
              name="Revenue"
            />
          </LineChart>
        </ResponsiveContainer>
      </motion.div>

      {/* Recent Purchases */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-white p-6 rounded-lg border border-gray-200"
      >
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Purchases</h3>
        <div className="space-y-3">
          {analytics.recentPurchases.slice(0, 5).map((purchase) => (
            <div key={purchase.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <div>
                  <p className="font-medium text-gray-900">{purchase.email}</p>
                  <p className="text-sm text-gray-600">
                    {purchase.country} • {purchase.isNewUser ? 'New user' : 'Existing user'}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-medium text-gray-900">{formatCurrency(purchase.price)}</p>
                <p className="text-sm text-gray-600">
                  {new Date(purchase.purchaseDate).toLocaleDateString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Top Countries */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="bg-white p-6 rounded-lg border border-gray-200"
      >
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Countries</h3>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={analytics.topCountries}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="country" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="count" fill="#3b82f6" />
          </BarChart>
        </ResponsiveContainer>
      </motion.div>

      {/* Error notice if using mock data */}
      {error && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-yellow-600" />
            <div>
              <p className="text-sm font-medium text-yellow-800">Using demo data</p>
              <p className="text-sm text-yellow-700">
                {error.error}. Showing mock analytics for demonstration.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
} 
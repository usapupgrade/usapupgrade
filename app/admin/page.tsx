'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { 
  Users, 
  DollarSign, 
  TrendingUp, 
  BarChart3, 
  Calendar,
  CreditCard,
  Activity,
  Target,
  ArrowUpRight,
  ArrowDownRight,
  Eye,
  Download,
  Filter,
  Bell,
  Settings,
  Moon,
  Sun,
  BookOpen,
  MessageSquare,
  Tag,
  RefreshCw,
  UserCheck,
  UserPlus,
  Crown
} from 'lucide-react'
import { useDarkMode } from '../providers'

export default function AdminDashboard() {
  const [timeRange, setTimeRange] = useState('30d')
  const [loading, setLoading] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const { isDarkMode, toggleDarkMode } = useDarkMode()
  const router = useRouter()

  // Enhanced analytics data with user focus
  const [analytics, setAnalytics] = useState({
    totalUsers: 0,
    premiumUsers: 0,
    totalRevenue: 0,
    totalPurchases: 0,
    recentUsers: 0,
    recentPurchases: 0,
    recentRevenue: 0,
    conversionRate: 0,
    recentPurchasesList: []
  })

  useEffect(() => {
    // Check if admin is authenticated
    const adminAuth = localStorage.getItem('admin_authenticated')
    if (!adminAuth) {
      router.push('/admin-access')
      return
    }
    setIsAuthenticated(true)
    
    // Load real analytics data
    loadAnalytics()
    
    // Auto-refresh every 30 seconds for real-time updates
    const interval = setInterval(loadAnalytics, 30000)
    return () => clearInterval(interval)
  }, [router])

  const loadAnalytics = async () => {
    try {
      setLoading(true)
      // Fetch real data from API
      const response = await fetch('/api/admin/analytics')
      if (response.ok) {
        const data = await response.json()
        if (data.success && data.data) {
          const overview = data.data.overview
          const conversionRate = overview.totalUsers > 0 
            ? ((overview.premiumUsers / overview.totalUsers) * 100).toFixed(1)
            : '0'
            
          setAnalytics({
            totalUsers: overview.totalUsers || 0,
            premiumUsers: overview.premiumUsers || 0,
            totalRevenue: overview.totalRevenue || 0,
            totalPurchases: overview.totalPurchases || 0,
            recentUsers: overview.recentUsers || 0,
            recentPurchases: overview.recentPurchases || 0,
            recentRevenue: overview.recentRevenue || 0,
            conversionRate: parseFloat(conversionRate),
            recentPurchasesList: data.data.recentPurchases || []
          })
        } else {
          // Fallback to empty data
          setAnalytics({
            totalUsers: 0,
            premiumUsers: 0,
            totalRevenue: 0,
            totalPurchases: 0,
            recentUsers: 0,
            recentPurchases: 0,
            recentRevenue: 0,
            conversionRate: 0,
            recentPurchasesList: []
          })
        }
      }
    } catch (error) {
      console.error('Failed to load analytics:', error)
      // Keep default empty values
    } finally {
      setLoading(false)
    }
  }

  if (!isAuthenticated) {
    return null // Will redirect to admin-access
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-PH', {
      style: 'currency',
      currency: 'PHP'
    }).format(amount)
  }

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('en-US').format(num)
  }

  return (
    <div className={`min-h-screen transition-colors duration-200 ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      {/* Header */}
      <header className={`shadow-sm border-b transition-colors duration-200 ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
            {/* Logo and Title */}
            <div className="flex items-center space-x-3 sm:space-x-4">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm sm:text-base">UU</span>
              </div>
              <span className={`text-lg sm:text-xl font-bold transition-colors duration-200 ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>
                UsapUpgrade Admin
              </span>
            </div>
            
            {/* Action Buttons */}
            <div className="flex items-center gap-3">
              {/* Navigation Buttons */}
              <div className="hidden md:flex items-center gap-2">
                <button
                  onClick={() => window.location.href = '/admin/users'}
                  className="px-3 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm"
                >
                  Users
                </button>
                <button
                  onClick={() => window.location.href = '/admin/content'}
                  className="px-3 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors text-sm"
                >
                  Content
                </button>
                <button
                  onClick={() => window.location.href = '/admin/revenue'}
                  className="px-3 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors text-sm"
                >
                  Revenue
                </button>
                <button
                  onClick={() => window.location.href = '/admin/support'}
                  className="px-3 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors text-sm"
                >
                  Support
                </button>
                <button
                  onClick={() => window.location.href = '/admin/notifications'}
                  className="px-3 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors text-sm"
                >
                  Notifications
                </button>

              </div>

              {/* Mobile Menu Button */}
              <div className="md:hidden">
                <button
                  onClick={() => {
                    const mobileMenu = document.getElementById('mobile-menu')
                    if (mobileMenu) {
                      mobileMenu.classList.toggle('hidden')
                    }
                  }}
                  className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                </button>
              </div>

              <button
                onClick={loadAnalytics}
                disabled={loading}
                className="flex items-center gap-2 px-3 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
                <span className="hidden sm:inline">Refresh</span>
              </button>
              
              <button
                onClick={toggleDarkMode}
                className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              >
                {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>
            </div>
                  </div>
      </div>

      {/* Mobile Menu */}
      <div id="mobile-menu" className="hidden md:hidden bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
        <div className="px-4 py-2 space-y-1">
          <button
            onClick={() => window.location.href = '/admin/users'}
            className="w-full text-left px-3 py-2 text-sm rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            Users
          </button>
          <button
            onClick={() => window.location.href = '/admin/content'}
            className="w-full text-left px-3 py-2 text-sm rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            Content
          </button>
          <button
            onClick={() => window.location.href = '/admin/revenue'}
            className="w-full text-left px-3 py-2 text-sm rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            Revenue
          </button>
          <button
            onClick={() => window.location.href = '/admin/support'}
            className="w-full text-left px-3 py-2 text-sm rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            Support
          </button>
          <button
            onClick={() => window.location.href = '/admin/notifications'}
            className="w-full text-left px-3 py-2 text-sm rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            Notifications
          </button>
          
        </div>
      </div>
    </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {/* User Base Focus - Primary Metrics */}
        <div className="mb-8">
          <h2 className={`text-2xl font-bold mb-6 ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>
            User Base Overview
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Total Users */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className={`p-6 rounded-xl shadow-sm border-l-4 border-blue-500 ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className={`text-sm font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    Total Users
                  </p>
                  <p className={`text-3xl font-bold ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>
                    {formatNumber(analytics.totalUsers)}
                  </p>
                  {analytics.recentUsers > 0 && (
                    <p className="text-sm text-green-600 flex items-center gap-1 mt-1">
                      <ArrowUpRight className="w-4 h-4" />
                      +{analytics.recentUsers} this week
                    </p>
                  )}
                </div>
                <Users className="w-10 h-10 text-blue-500" />
              </div>
            </motion.div>

            {/* Premium Users */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className={`p-6 rounded-xl shadow-sm border-l-4 border-green-500 ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className={`text-sm font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    Premium Users
                  </p>
                  <p className={`text-3xl font-bold ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>
                    {formatNumber(analytics.premiumUsers)}
                  </p>
                  <p className="text-sm text-green-600 flex items-center gap-1 mt-1">
                    <Crown className="w-4 h-4" />
                    {analytics.conversionRate}% conversion
                  </p>
                </div>
                <Crown className="w-10 h-10 text-green-500" />
              </div>
            </motion.div>

            {/* Total Revenue */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className={`p-6 rounded-xl shadow-sm border-l-4 border-purple-500 ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className={`text-sm font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    Total Revenue
                  </p>
                  <p className={`text-3xl font-bold ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>
                    {formatCurrency(analytics.totalRevenue)}
                  </p>
                  {analytics.recentRevenue > 0 && (
                    <p className="text-sm text-green-600 flex items-center gap-1 mt-1">
                      <ArrowUpRight className="w-4 h-4" />
                      +{formatCurrency(analytics.recentRevenue)} this week
                    </p>
                  )}
                </div>
                <TrendingUp className="w-10 h-10 text-purple-500" />
              </div>
            </motion.div>

            {/* Total Purchases */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className={`p-6 rounded-xl shadow-sm border-l-4 border-orange-500 ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className={`text-sm font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    Total Purchases
                  </p>
                  <p className={`text-3xl font-bold ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>
                    {formatNumber(analytics.totalPurchases)}
                  </p>
                  {analytics.recentPurchases > 0 && (
                    <p className="text-sm text-green-600 flex items-center gap-1 mt-1">
                      <ArrowUpRight className="w-4 h-4" />
                      +{analytics.recentPurchases} this week
                    </p>
                  )}
                </div>
                <CreditCard className="w-10 h-10 text-orange-500" />
              </div>
            </motion.div>
          </div>
        </div>

        {/* Real-time Status */}
        <div className={`mb-8 p-4 rounded-lg ${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow-sm`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              <span className={`text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Lemon Squeezy Integration Active
              </span>
            </div>
            <span className="text-xs text-gray-500">
              Auto-refresh every 30s
            </span>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Purchases */}
          <div className={`p-6 rounded-xl shadow-sm ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
            <div className="flex items-center justify-between mb-4">
              <h3 className={`text-lg font-semibold ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>
                Recent Purchases
              </h3>
              <button
                onClick={() => window.location.href = '/admin/revenue'}
                className="text-blue-500 hover:text-blue-600 text-sm"
              >
                View All
              </button>
            </div>
            
            {analytics.recentPurchasesList.length > 0 ? (
              <div className="space-y-3">
                {analytics.recentPurchasesList.slice(0, 5).map((purchase: any, index: number) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <div>
                      <p className="font-medium text-sm">{purchase.email}</p>
                      <p className="text-xs text-gray-500">{purchase.purchase_date}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-sm">{formatCurrency(purchase.price)}</p>
                      <p className="text-xs text-gray-500">{purchase.currency}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <CreditCard className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  No recent purchases
                </p>
              </div>
            )}
          </div>

          {/* Quick Actions */}
          <div className={`p-6 rounded-xl shadow-sm ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
            <h3 className={`text-lg font-semibold mb-4 ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>
              Quick Actions
            </h3>
            
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => window.location.href = '/admin/users'}
                className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors"
              >
                <Users className="w-6 h-6 text-blue-500 mb-2" />
                <p className="text-sm font-medium">Manage Users</p>
              </button>
              
              <button
                onClick={() => window.location.href = '/admin/revenue'}
                className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg hover:bg-green-100 dark:hover:bg-green-900/30 transition-colors"
              >
                <DollarSign className="w-6 h-6 text-green-500 mb-2" />
                <p className="text-sm font-medium">View Revenue</p>
              </button>
              
              <button
                onClick={() => window.location.href = '/admin/content'}
                className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg hover:bg-purple-100 dark:hover:bg-purple-900/30 transition-colors"
              >
                <BookOpen className="w-6 h-6 text-purple-500 mb-2" />
                <p className="text-sm font-medium">Content</p>
              </button>
              
              <button
                onClick={() => window.location.href = '/admin/support'}
                className="p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg hover:bg-orange-100 dark:hover:bg-orange-900/30 transition-colors"
              >
                <MessageSquare className="w-6 h-6 text-orange-500 mb-2" />
                <p className="text-sm font-medium">Support</p>
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
} 
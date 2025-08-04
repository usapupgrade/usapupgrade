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
  RefreshCw
} from 'lucide-react'
import { useDarkMode } from '../providers'

export default function AdminDashboard() {
  const [timeRange, setTimeRange] = useState('30d')
  const [loading, setLoading] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const { isDarkMode, toggleDarkMode } = useDarkMode()
  const router = useRouter()

  // Simple analytics data - will be populated from real database
  const [analytics, setAnalytics] = useState({
    totalUsers: 0,
    premiumUsers: 0,
    totalRevenue: 0,
    totalPurchases: 0,
    recentPurchases: []
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
  }, [router])

  const loadAnalytics = async () => {
    try {
      setLoading(true)
      // Fetch real data from API
      const response = await fetch('/api/admin/analytics')
      if (response.ok) {
        const data = await response.json()
        setAnalytics(data.data || {
          totalUsers: 0,
          premiumUsers: 0,
          totalRevenue: 0,
          totalPurchases: 0,
          recentPurchases: []
        })
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
    return new Intl.NumberFormat('en-US', {
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
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Total Users */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`p-6 rounded-xl shadow-sm ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-sm font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Total Users
                </p>
                <p className={`text-2xl font-bold ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>
                  {formatNumber(analytics.totalUsers)}
                </p>
              </div>
              <Users className="w-8 h-8 text-blue-500" />
            </div>
          </motion.div>

          {/* Premium Users */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className={`p-6 rounded-xl shadow-sm ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-sm font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Premium Users
                </p>
                <p className={`text-2xl font-bold ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>
                  {formatNumber(analytics.premiumUsers)}
                </p>
              </div>
              <DollarSign className="w-8 h-8 text-green-500" />
            </div>
          </motion.div>

          {/* Total Revenue */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className={`p-6 rounded-xl shadow-sm ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-sm font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Total Revenue
                </p>
                <p className={`text-2xl font-bold ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>
                  {formatCurrency(analytics.totalRevenue)}
                </p>
              </div>
              <TrendingUp className="w-8 h-8 text-purple-500" />
            </div>
          </motion.div>

          {/* Total Purchases */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className={`p-6 rounded-xl shadow-sm ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-sm font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Total Purchases
                </p>
                <p className={`text-2xl font-bold ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>
                  {formatNumber(analytics.totalPurchases)}
                </p>
              </div>
              <CreditCard className="w-8 h-8 text-orange-500" />
            </div>
          </motion.div>
        </div>

        {/* Recent Purchases */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className={`p-6 rounded-xl shadow-sm ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}
        >
          <h3 className={`text-lg font-semibold mb-4 ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>
            Recent Purchases
          </h3>
          
          {analytics.recentPurchases.length > 0 ? (
            <div className="space-y-3">
              {analytics.recentPurchases.map((purchase: any, index: number) => (
                <div key={index} className={`p-3 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className={`font-medium ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>
                        {purchase.email}
                      </p>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        {purchase.purchaseDate}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className={`font-medium ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>
                        {formatCurrency(purchase.price)}
                      </p>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        {purchase.status}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className={`text-center py-8 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
              <CreditCard className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>No purchases yet</p>
              <p className="text-sm">Purchases will appear here after users make payments</p>
            </div>
          )}
        </motion.div>
      </main>
    </div>
  )
} 
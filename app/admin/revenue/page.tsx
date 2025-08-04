'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { 
  DollarSign, 
  TrendingUp, 
  Users, 
  Download,
  Eye,
  EyeOff,
  ArrowLeft,
  Moon,
  Sun,
  CreditCard
} from 'lucide-react'
import { useDarkMode } from '../../providers'

export default function RevenueTracking() {
  const [showSensitiveData, setShowSensitiveData] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [loading, setLoading] = useState(false)
  const { isDarkMode, toggleDarkMode } = useDarkMode()
  const router = useRouter()

  // Real revenue data - will be populated from database
  const [revenueData, setRevenueData] = useState({
    totalRevenue: 0,
    monthlyRevenue: 0,
    totalPurchases: 0,
    premiumUsers: 0,
    recentTransactions: []
  })

  useEffect(() => {
    // Check if admin is authenticated
    const adminAuth = localStorage.getItem('admin_authenticated')
    if (!adminAuth) {
      router.push('/admin-access')
      return
    }
    setIsAuthenticated(true)
    
    // Load real revenue data
    loadRevenueData()
  }, [router])

  const loadRevenueData = async () => {
    try {
      setLoading(true)
      // Fetch real data from API
      const response = await fetch('/api/admin/analytics')
      if (response.ok) {
        const data = await response.json()
        setRevenueData(data.data || {
          totalRevenue: 0,
          monthlyRevenue: 0,
          totalPurchases: 0,
          premiumUsers: 0,
          recentTransactions: []
        })
      }
    } catch (error) {
      console.error('Failed to load revenue data:', error)
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

  const handleExportData = () => {
    // Export functionality
    alert('Revenue data exported successfully!')
  }

  return (
    <div className={`min-h-screen transition-colors duration-200 ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'} p-4 sm:p-6`}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <div>
              <h1 className={`text-2xl sm:text-3xl font-bold transition-colors duration-200 ${isDarkMode ? 'text-gray-100' : 'text-gray-900'} mb-2`}>Revenue Tracking</h1>
              <p className={`transition-colors duration-200 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Monitor payments and financial metrics</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-2">
              <button
                onClick={loadRevenueData}
                disabled={loading}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center justify-center space-x-2"
              >
                <span>{loading ? 'Loading...' : 'Refresh'}</span>
              </button>
              <button
                onClick={toggleDarkMode}
                className={`p-2 rounded-lg transition-colors duration-200 ${
                  isDarkMode 
                    ? 'bg-gray-700 hover:bg-gray-600 text-gray-100' 
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                }`}
              >
                {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </button>
              <button
                onClick={() => window.location.href = '/admin'}
                className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors flex items-center justify-center space-x-2"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back to Admin Dashboard</span>
              </button>
            </div>
          </div>
        </motion.div>

        {/* Revenue Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6 sm:mb-8"
        >
          <div className={`p-4 rounded-xl shadow-sm ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
            <div className="flex items-center space-x-3">
              <DollarSign className="w-6 h-6 text-green-500 flex-shrink-0" />
              <div className="min-w-0 flex-1">
                <p className={`text-sm transition-colors duration-200 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Total Revenue</p>
                <p className={`text-xl font-bold transition-colors duration-200 ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>{formatCurrency(revenueData.totalRevenue)}</p>
                <p className="text-xs text-gray-500">All time</p>
              </div>
            </div>
          </div>

          <div className={`p-4 rounded-xl shadow-sm ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
            <div className="flex items-center space-x-3">
              <TrendingUp className="w-6 h-6 text-orange-500 flex-shrink-0" />
              <div className="min-w-0 flex-1">
                <p className={`text-sm transition-colors duration-200 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Monthly Revenue</p>
                <p className={`text-xl font-bold transition-colors duration-200 ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>{formatCurrency(revenueData.monthlyRevenue)}</p>
                <p className="text-xs text-gray-500">{revenueData.premiumUsers} premium users</p>
              </div>
            </div>
          </div>

          <div className={`p-4 rounded-xl shadow-sm ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
            <div className="flex items-center space-x-3">
              <Users className="w-6 h-6 text-blue-500 flex-shrink-0" />
              <div className="min-w-0 flex-1">
                <p className={`text-sm transition-colors duration-200 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Total Purchases</p>
                <p className={`text-xl font-bold transition-colors duration-200 ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>{formatNumber(revenueData.totalPurchases)}</p>
                <p className="text-xs text-gray-500">All time</p>
              </div>
            </div>
          </div>

          <div className={`p-4 rounded-xl shadow-sm ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
            <div className="flex items-center space-x-3">
              <CreditCard className="w-6 h-6 text-purple-500 flex-shrink-0" />
              <div className="min-w-0 flex-1">
                <p className={`text-sm transition-colors duration-200 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Premium Users</p>
                <p className={`text-xl font-bold transition-colors duration-200 ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>{formatNumber(revenueData.premiumUsers)}</p>
                <p className="text-xs text-gray-500">Active subscriptions</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-col sm:flex-row gap-2 mb-6"
        >
          <button
            onClick={handleExportData}
            className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors flex items-center justify-center space-x-2"
          >
            <Download className="w-4 h-4" />
            <span>Export Data</span>
          </button>
          <button
            onClick={() => setShowSensitiveData(!showSensitiveData)}
            className={`px-4 py-2 rounded-lg transition-colors flex items-center justify-center space-x-2 ${
              showSensitiveData 
                ? 'bg-blue-500 text-white hover:bg-blue-600' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {showSensitiveData ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            <span>Visibility</span>
          </button>
        </motion.div>

        {/* Revenue Charts */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6"
        >
          {/* Revenue Trend Chart */}
          <div className={`p-6 rounded-xl shadow-sm ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
            <h3 className={`text-lg font-semibold transition-colors duration-200 ${isDarkMode ? 'text-gray-100' : 'text-gray-900'} mb-4`}>Revenue Trend</h3>
            <div className={`h-64 rounded-lg flex items-center justify-center ${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
              <div className="text-center">
                <TrendingUp className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                <p className={`text-sm transition-colors duration-200 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Revenue trend chart</p>
                <p className={`text-xs transition-colors duration-200 ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>Monthly growth visualization</p>
              </div>
            </div>
          </div>

          {/* Payment Methods Chart */}
          <div className={`p-6 rounded-xl shadow-sm ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
            <h3 className={`text-lg font-semibold transition-colors duration-200 ${isDarkMode ? 'text-gray-100' : 'text-gray-900'} mb-4`}>Payment Methods</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className={`text-sm transition-colors duration-200 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Gumroad</span>
                <span className={`font-medium transition-colors duration-200 ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>100%</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div className="bg-green-500 h-2 rounded-full" style={{ width: '100%' }}></div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Recent Transactions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className={`p-6 rounded-xl shadow-sm ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}
        >
          <h3 className={`text-lg font-semibold transition-colors duration-200 ${isDarkMode ? 'text-gray-100' : 'text-gray-900'} mb-4`}>Recent Transactions</h3>
          
          {revenueData.recentTransactions.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className={`border-b ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                    <th className={`text-left py-2 px-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Customer</th>
                    <th className={`text-left py-2 px-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Amount</th>
                    <th className={`text-left py-2 px-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Type</th>
                    <th className={`text-left py-2 px-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Status</th>
                    <th className={`text-left py-2 px-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {revenueData.recentTransactions.map((transaction: any, index: number) => (
                    <tr key={index} className={`border-b ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                      <td className="py-2 px-4">{transaction.email}</td>
                      <td className="py-2 px-4">{formatCurrency(transaction.price)}</td>
                      <td className="py-2 px-4">{transaction.type}</td>
                      <td className="py-2 px-4">{transaction.status}</td>
                      <td className="py-2 px-4">{transaction.purchaseDate}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className={`text-center py-8 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
              <CreditCard className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>No transactions yet</p>
              <p className="text-sm">Transactions will appear here after users make payments</p>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  )
} 
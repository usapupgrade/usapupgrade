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
  Sun
} from 'lucide-react'
import { useDarkMode } from '../../providers'
import { useAdminStore } from '../../data/adminData'

export default function RevenueTracking() {
  const [showSensitiveData, setShowSensitiveData] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const { isDarkMode, toggleDarkMode } = useDarkMode()
  const router = useRouter()

  // Get live data from shared store
  const { 
    revenueData, 
    getRevenueStats, 
    getPaymentTransactions 
  } = useAdminStore()

  useEffect(() => {
    // Check if admin is authenticated
    const adminAuth = localStorage.getItem('admin_authenticated')
    if (!adminAuth) {
      router.push('/admin-access')
      return
    }
    setIsAuthenticated(true)
  }, [router])

  if (!isAuthenticated) {
    return null // Will redirect to admin-access
  }

  const stats = getRevenueStats()
  const transactions = getPaymentTransactions()

  const handleExportData = () => {
    // Mock export functionality
    alert('Revenue data exported successfully!')
  }

  return (
    <div className={`min-h-screen transition-colors duration-200 ${isDarkMode ? 'bg-primary-900' : 'bg-gradient-to-br from-primary-50 to-accent-50'} p-4 sm:p-6`}>
      <div className="max-w-7xl mx-auto">
        {/* Mobile-Optimized Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <div>
              <h1 className={`text-2xl sm:text-3xl font-bold transition-colors duration-200 ${isDarkMode ? 'text-primary-100' : 'text-primary-900'} mb-2`}>Revenue Tracking</h1>
              <p className={`transition-colors duration-200 ${isDarkMode ? 'text-primary-300' : 'text-primary-600'}`}>Monitor payments and financial metrics</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-2">
              <button
                onClick={toggleDarkMode}
                className={`p-2 rounded-lg transition-colors duration-200 ${
                  isDarkMode 
                    ? 'bg-primary-700 hover:bg-primary-600 text-primary-100' 
                    : 'bg-primary-100 hover:bg-primary-200 text-primary-700'
                }`}
              >
                {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </button>
              <button
                onClick={() => window.location.href = '/admin'}
                className="px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors flex items-center justify-center space-x-2 w-full sm:w-auto"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back to Admin Dashboard</span>
              </button>
            </div>
          </div>
        </motion.div>

        {/* Revenue Stats Cards - Mobile Optimized */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6 sm:mb-8"
        >
          <div className="card p-3 sm:p-4">
            <div className="flex items-center space-x-2 sm:space-x-3">
              <DollarSign className="w-5 h-5 sm:w-6 sm:h-6 text-success-500 flex-shrink-0" />
              <div className="min-w-0 flex-1">
                <p className={`text-xs sm:text-sm transition-colors duration-200 ${isDarkMode ? 'text-primary-300' : 'text-primary-600'}`}>Total Revenue</p>
                <p className={`text-lg sm:text-xl font-bold transition-colors duration-200 ${isDarkMode ? 'text-primary-100' : 'text-primary-900'}`}>₱{stats.totalRevenue.toLocaleString()}</p>
                <p className="text-xs text-success-600 dark:text-success-400">+{stats.revenueGrowth}% from last month</p>
              </div>
            </div>
          </div>

          <div className="card p-3 sm:p-4">
            <div className="flex items-center space-x-2 sm:space-x-3">
              <TrendingUp className="w-5 h-5 sm:w-6 sm:h-6 text-accent-500 flex-shrink-0" />
              <div className="min-w-0 flex-1">
                <p className={`text-xs sm:text-sm transition-colors duration-200 ${isDarkMode ? 'text-primary-300' : 'text-primary-600'}`}>Monthly Revenue</p>
                <p className={`text-lg sm:text-xl font-bold transition-colors duration-200 ${isDarkMode ? 'text-primary-100' : 'text-primary-900'}`}>₱{stats.monthlyRevenue.toLocaleString()}</p>
                <p className="text-xs text-accent-600 dark:text-accent-400">{stats.activeSubscriptions} active subscriptions</p>
              </div>
            </div>
          </div>

          <div className="card p-3 sm:p-4">
            <div className="flex items-center space-x-2 sm:space-x-3">
              <Users className="w-5 h-5 sm:w-6 sm:h-6 text-primary-500 flex-shrink-0" />
              <div className="min-w-0 flex-1">
                <p className={`text-xs sm:text-sm transition-colors duration-200 ${isDarkMode ? 'text-primary-300' : 'text-primary-600'}`}>Conversion Rate</p>
                <p className={`text-lg sm:text-xl font-bold transition-colors duration-200 ${isDarkMode ? 'text-primary-100' : 'text-primary-900'}`}>{stats.conversionRate}%</p>
                <p className="text-xs text-primary-600 dark:text-primary-400">+{stats.conversionGrowth}% from last month</p>
              </div>
            </div>
          </div>

          <div className="card p-3 sm:p-4">
            <div className="flex items-center space-x-2 sm:space-x-3">
              <DollarSign className="w-5 h-5 sm:w-6 sm:h-6 text-warning-500 flex-shrink-0" />
              <div className="min-w-0 flex-1">
                <p className={`text-xs sm:text-sm transition-colors duration-200 ${isDarkMode ? 'text-primary-300' : 'text-primary-600'}`}>Average Order Value</p>
                <p className={`text-lg sm:text-xl font-bold transition-colors duration-200 ${isDarkMode ? 'text-primary-100' : 'text-primary-900'}`}>₱{stats.averageOrderValue.toLocaleString()}</p>
                <p className="text-xs text-warning-600 dark:text-warning-400">+{stats.aovGrowth}% from last month</p>
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
            className="px-4 py-2 bg-success-500 text-white rounded-lg hover:bg-success-600 transition-colors flex items-center justify-center space-x-2"
          >
            <Download className="w-4 h-4" />
            <span>Export Data</span>
          </button>
          <button
            onClick={() => setShowSensitiveData(!showSensitiveData)}
            className={`px-4 py-2 rounded-lg transition-colors flex items-center justify-center space-x-2 ${
              showSensitiveData 
                ? 'bg-primary-500 text-white hover:bg-primary-600' 
                : 'bg-primary-100 text-primary-700 hover:bg-primary-200'
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
          <div className="card p-4 sm:p-6">
            <h3 className={`text-lg font-semibold transition-colors duration-200 ${isDarkMode ? 'text-primary-100' : 'text-primary-900'} mb-4`}>Revenue Trend</h3>
            <div className="h-64 bg-gradient-to-br from-success-50 to-success-100 dark:from-success-900 dark:to-success-800 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <TrendingUp className="w-12 h-12 text-success-500 mx-auto mb-2" />
                <p className={`text-sm transition-colors duration-200 ${isDarkMode ? 'text-primary-300' : 'text-primary-600'}`}>Revenue trend chart</p>
                <p className={`text-xs transition-colors duration-200 ${isDarkMode ? 'text-primary-400' : 'text-primary-500'}`}>Monthly growth visualization</p>
              </div>
            </div>
          </div>

          {/* Payment Methods Chart */}
          <div className="card p-4 sm:p-6">
            <h3 className={`text-lg font-semibold transition-colors duration-200 ${isDarkMode ? 'text-primary-100' : 'text-primary-900'} mb-4`}>Payment Methods</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className={`text-sm transition-colors duration-200 ${isDarkMode ? 'text-primary-300' : 'text-primary-600'}`}>Credit Card</span>
                <span className={`font-medium transition-colors duration-200 ${isDarkMode ? 'text-primary-100' : 'text-primary-900'}`}>65%</span>
              </div>
              <div className="w-full bg-primary-200 dark:bg-primary-700 rounded-full h-2">
                <div className="bg-success-500 h-2 rounded-full" style={{ width: '65%' }}></div>
              </div>
              
              <div className="flex items-center justify-between">
                <span className={`text-sm transition-colors duration-200 ${isDarkMode ? 'text-primary-300' : 'text-primary-600'}`}>PayPal</span>
                <span className={`font-medium transition-colors duration-200 ${isDarkMode ? 'text-primary-100' : 'text-primary-900'}`}>25%</span>
              </div>
              <div className="w-full bg-primary-200 dark:bg-primary-700 rounded-full h-2">
                <div className="bg-accent-500 h-2 rounded-full" style={{ width: '25%' }}></div>
              </div>
              
              <div className="flex items-center justify-between">
                <span className={`text-sm transition-colors duration-200 ${isDarkMode ? 'text-primary-300' : 'text-primary-600'}`}>Other</span>
                <span className={`font-medium transition-colors duration-200 ${isDarkMode ? 'text-primary-100' : 'text-primary-900'}`}>10%</span>
              </div>
              <div className="w-full bg-primary-200 dark:bg-primary-700 rounded-full h-2">
                <div className="bg-warning-500 h-2 rounded-full" style={{ width: '10%' }}></div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Recent Transactions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="card p-4 sm:p-6"
        >
          <h3 className={`text-lg font-semibold transition-colors duration-200 ${isDarkMode ? 'text-primary-100' : 'text-primary-900'} mb-4`}>Recent Transactions</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className={`border-b transition-colors duration-200 ${isDarkMode ? 'border-primary-700' : 'border-primary-200'}`}>
                  <th className={`text-left py-3 px-2 sm:px-4 font-semibold text-sm sm:text-base transition-colors duration-200 ${isDarkMode ? 'text-primary-100' : 'text-primary-900'}`}>Customer</th>
                  <th className={`text-left py-3 px-2 sm:px-4 font-semibold text-sm sm:text-base transition-colors duration-200 ${isDarkMode ? 'text-primary-100' : 'text-primary-900'}`}>Amount</th>
                  <th className={`text-left py-3 px-2 sm:px-4 font-semibold text-sm sm:text-base transition-colors duration-200 ${isDarkMode ? 'text-primary-100' : 'text-primary-900'}`}>Type</th>
                  <th className={`text-left py-3 px-2 sm:px-4 font-semibold text-sm sm:text-base transition-colors duration-200 ${isDarkMode ? 'text-primary-100' : 'text-primary-900'}`}>Status</th>
                  <th className={`text-left py-3 px-2 sm:px-4 font-semibold text-sm sm:text-base transition-colors duration-200 ${isDarkMode ? 'text-primary-100' : 'text-primary-900'}`}>Date</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((transaction, index) => (
                  <motion.tr
                    key={transaction.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                    className={`border-b transition-colors duration-200 hover:bg-opacity-50 ${
                      isDarkMode ? 'border-primary-700 hover:bg-primary-700' : 'border-primary-100 hover:bg-primary-50'
                    }`}
                  >
                    <td className="py-3 sm:py-4 px-2 sm:px-4">
                      <div className="min-w-0">
                        <p className={`font-medium text-sm sm:text-base transition-colors duration-200 ${isDarkMode ? 'text-primary-100' : 'text-primary-900'} truncate`}>
                          {showSensitiveData ? transaction.customerName : '***' + transaction.customerName.slice(-3)}
                        </p>
                        <p className={`text-xs sm:text-sm transition-colors duration-200 ${isDarkMode ? 'text-primary-400' : 'text-primary-600'} truncate`}>
                          {showSensitiveData ? transaction.email : '***@***.com'}
                        </p>
                      </div>
                    </td>
                    <td className="py-3 sm:py-4 px-2 sm:px-4">
                      <span className={`font-medium text-sm sm:text-base transition-colors duration-200 ${isDarkMode ? 'text-primary-100' : 'text-primary-900'}`}>
                        ₱{transaction.amount.toLocaleString()}
                      </span>
                    </td>
                    <td className="py-3 sm:py-4 px-2 sm:px-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        transaction.type === 'lifetime' ? 'bg-accent-100 text-accent-700 dark:bg-accent-900 dark:text-accent-300' :
                        'bg-primary-100 text-primary-700 dark:bg-primary-800 dark:text-primary-300'
                      }`}>
                        {transaction.type}
                      </span>
                    </td>
                    <td className="py-3 sm:py-4 px-2 sm:px-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        transaction.status === 'completed' ? 'bg-success-100 text-success-700 dark:bg-success-900 dark:text-success-300' :
                        transaction.status === 'pending' ? 'bg-warning-100 text-warning-700 dark:bg-warning-900 dark:text-warning-300' :
                        'bg-error-100 text-error-700 dark:bg-error-900 dark:text-error-300'
                      }`}>
                        {transaction.status}
                      </span>
                    </td>
                    <td className="py-3 sm:py-4 px-2 sm:px-4">
                      <span className={`text-xs sm:text-sm transition-colors duration-200 ${isDarkMode ? 'text-primary-400' : 'text-primary-600'}`}>
                        {transaction.date}
                      </span>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </div>
  )
} 
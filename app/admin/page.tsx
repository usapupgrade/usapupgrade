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
  Tag
} from 'lucide-react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts'
import { useDarkMode } from '../providers'
import ConversionAnalytics from '../components/ConversionAnalytics'
import CertificationAnalytics from '../components/CertificationAnalytics'
import { useAdminStore } from '../data/adminData'

export default function AdminDashboard() {
  const [timeRange, setTimeRange] = useState('30d')
  const [loading, setLoading] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const { isDarkMode, toggleDarkMode } = useDarkMode()
  const router = useRouter()

  // Get live data from shared store
  const { 
    getAnalytics, 
    getRevenueData, 
    getUserGrowthData, 
    getSubscriptionData 
  } = useAdminStore()

  // Get real-time analytics data
  const analytics = getAnalytics()
  const revenueData = getRevenueData()
  const userGrowthData = getUserGrowthData()
  const subscriptionData = getSubscriptionData()

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

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'PHP'
    }).format(amount)
  }

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('en-US').format(num)
  }

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className={`p-3 rounded-lg border ${isDarkMode ? 'bg-primary-800 border-primary-600 text-primary-100' : 'bg-white border-primary-200 text-primary-900'}`}>
          <p className="font-medium">{label}</p>
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
    <div className={`min-h-screen transition-colors duration-200 ${isDarkMode ? 'bg-primary-900' : 'bg-primary-50'}`}>
      {/* Mobile-Optimized Header */}
      <header className={`shadow-sm border-b transition-colors duration-200 ${isDarkMode ? 'bg-primary-800 border-primary-700' : 'bg-white border-primary-200'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
            {/* Logo and Title */}
            <div className="flex items-center space-x-3 sm:space-x-4">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm sm:text-base">UU</span>
              </div>
              <span className={`text-lg sm:text-xl font-bold transition-colors duration-200 ${isDarkMode ? 'text-primary-100' : 'text-primary-900'}`}>
                UsapUpgrade Admin
              </span>
            </div>
            
            {/* Mobile-Optimized Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-3">
              {/* Navigation Buttons - Stacked on Mobile */}
              <div className="flex gap-2">
                <button
                  onClick={() => window.location.href = '/admin/users'}
                  className="flex-1 sm:flex-none px-3 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors flex items-center justify-center space-x-2 text-sm"
                >
                  <Users className="w-4 h-4" />
                  <span className="hidden sm:inline">Users</span>
                </button>
                <button
                  onClick={() => window.location.href = '/admin/content'}
                  className="flex-1 sm:flex-none px-3 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors flex items-center justify-center space-x-2 text-sm"
                >
                  <BookOpen className="w-4 h-4" />
                  <span className="hidden sm:inline">Content</span>
                </button>
                <button
                  onClick={() => window.location.href = '/admin/revenue'}
                  className="flex-1 sm:flex-none px-3 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors flex items-center justify-center space-x-2 text-sm"
                >
                  <DollarSign className="w-4 h-4" />
                  <span className="hidden sm:inline">Revenue</span>
                </button>
                <button
                  onClick={() => window.location.href = '/admin/support'}
                  className="flex-1 sm:flex-none px-3 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center justify-center space-x-2 text-sm"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span className="hidden sm:inline">Support</span>
                </button>
                <button
                  onClick={() => window.location.href = '/admin/notifications'}
                  className="flex-1 sm:flex-none px-3 py-2 bg-accent-500 text-white rounded-lg hover:bg-accent-600 transition-colors flex items-center justify-center space-x-2 text-sm"
                >
                  <Bell className="w-4 h-4" />
                  <span className="hidden sm:inline">Notifications</span>
                </button>
                <button
                  onClick={() => window.location.href = '/admin/vouchers'}
                  className="flex-1 sm:flex-none px-3 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors flex items-center justify-center space-x-2 text-sm"
                >
                  <Tag className="w-4 h-4" />
                  <span className="hidden sm:inline">Vouchers</span>
                </button>
              </div>
              
              {/* Controls - Responsive Layout */}
              <div className="flex gap-2">
                <select 
                  value={timeRange} 
                  onChange={(e) => setTimeRange(e.target.value)}
                  className={`px-3 py-2 border rounded-lg text-sm transition-colors duration-200 ${
                    isDarkMode 
                      ? 'bg-primary-700 border-primary-600 text-primary-100' 
                      : 'border-primary-200 text-primary-900'
                  }`}
                >
                  <option value="7d">7 days</option>
                  <option value="30d">30 days</option>
                  <option value="90d">90 days</option>
                  <option value="1y">1 year</option>
                </select>
                
                <button className={`btn-secondary flex items-center justify-center px-3 py-2`}>
                  <Download className="w-4 h-4" />
                  <span className="hidden sm:inline ml-2">Export</span>
                </button>

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
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile-Optimized Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 sm:py-8">
        {/* Overview Cards - Mobile Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="card p-4 sm:p-6"
          >
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <p className={`text-sm transition-colors duration-200 ${isDarkMode ? 'text-primary-300' : 'text-primary-600'}`}>Total Users</p>
                <p className={`text-xl sm:text-2xl font-bold transition-colors duration-200 ${isDarkMode ? 'text-primary-100' : 'text-primary-900'}`}>{formatNumber(analytics.totalUsers)}</p>
                <div className="flex items-center mt-2">
                  <ArrowUpRight className="w-4 h-4 text-success-500 mr-1" />
                  <span className="text-sm text-success-600">+12.5%</span>
                </div>
              </div>
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg flex items-center justify-center ml-3">
                <Users className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="card p-4 sm:p-6"
          >
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <p className={`text-sm transition-colors duration-200 ${isDarkMode ? 'text-primary-300' : 'text-primary-600'}`}>Monthly Revenue</p>
                <p className={`text-xl sm:text-2xl font-bold transition-colors duration-200 ${isDarkMode ? 'text-primary-100' : 'text-primary-900'}`}>{formatCurrency(analytics.revenue.monthly)}</p>
                <div className="flex items-center mt-2">
                  <ArrowUpRight className="w-4 h-4 text-success-500 mr-1" />
                  <span className="text-sm text-success-600">+{analytics.revenue.growth}%</span>
                </div>
              </div>
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-green-500 to-green-600 rounded-lg flex items-center justify-center ml-3">
                <DollarSign className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="card p-4 sm:p-6"
          >
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <p className={`text-sm transition-colors duration-200 ${isDarkMode ? 'text-primary-300' : 'text-primary-600'}`}>Active Users (Daily)</p>
                <p className={`text-xl sm:text-2xl font-bold transition-colors duration-200 ${isDarkMode ? 'text-primary-100' : 'text-primary-900'}`}>{formatNumber(analytics.activeUsers.daily)}</p>
                <div className="flex items-center mt-2">
                  <ArrowUpRight className="w-4 h-4 text-success-500 mr-1" />
                  <span className="text-sm text-success-600">+8.3%</span>
                </div>
              </div>
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg flex items-center justify-center ml-3">
                <Activity className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="card p-4 sm:p-6"
          >
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <p className={`text-sm transition-colors duration-200 ${isDarkMode ? 'text-primary-300' : 'text-primary-600'}`}>Premium Users</p>
                <p className={`text-xl sm:text-2xl font-bold transition-colors duration-200 ${isDarkMode ? 'text-primary-100' : 'text-primary-900'}`}>{formatNumber(analytics.subscriptions.premium)}</p>
                <div className="flex items-center mt-2">
                  <ArrowUpRight className="w-4 h-4 text-success-500 mr-1" />
                  <span className="text-sm text-success-600">+15.2%</span>
                </div>
              </div>
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-accent-500 to-accent-600 rounded-lg flex items-center justify-center ml-3">
                <CreditCard className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
            </div>
          </motion.div>
        </div>

        {/* Charts - Mobile Stacked */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 mb-6 sm:mb-8">
          {/* Revenue Chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="card p-4 sm:p-6"
          >
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 sm:mb-6">
              <h3 className={`text-lg font-semibold transition-colors duration-200 ${isDarkMode ? 'text-primary-100' : 'text-primary-900'} mb-2 sm:mb-0`}>Revenue Growth</h3>
              <div className={`flex items-center space-x-2 text-sm transition-colors duration-200 ${isDarkMode ? 'text-primary-300' : 'text-primary-600'}`}>
                <Calendar className="w-4 h-4" />
                <span>Last 6 months</span>
              </div>
            </div>
            <div className="h-64 sm:h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={revenueData}>
                  <CartesianGrid strokeDasharray="3 3" stroke={isDarkMode ? '#475569' : '#e2e8f0'} />
                  <XAxis dataKey="month" stroke={isDarkMode ? '#cbd5e1' : '#64748b'} />
                  <YAxis stroke={isDarkMode ? '#cbd5e1' : '#64748b'} />
                  <Tooltip content={<CustomTooltip />} />
                  <Line type="monotone" dataKey="revenue" stroke="#f2750a" strokeWidth={3} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* User Growth Chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="card p-4 sm:p-6"
          >
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 sm:mb-6">
              <h3 className={`text-lg font-semibold transition-colors duration-200 ${isDarkMode ? 'text-primary-100' : 'text-primary-900'} mb-2 sm:mb-0`}>User Growth</h3>
              <div className={`flex items-center space-x-2 text-sm transition-colors duration-200 ${isDarkMode ? 'text-primary-300' : 'text-primary-600'}`}>
                <Users className="w-4 h-4" />
                <span>Total users</span>
              </div>
            </div>
            <div className="h-64 sm:h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={userGrowthData}>
                  <CartesianGrid strokeDasharray="3 3" stroke={isDarkMode ? '#475569' : '#e2e8f0'} />
                  <XAxis dataKey="month" stroke={isDarkMode ? '#cbd5e1' : '#64748b'} />
                  <YAxis stroke={isDarkMode ? '#cbd5e1' : '#64748b'} />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar dataKey="users" fill="#64748b" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </motion.div>
        </div>

        {/* Bottom Section - Mobile Stacked */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
          {/* Subscription Distribution */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.7 }}
            className="card p-4 sm:p-6"
          >
            <h3 className={`text-lg font-semibold transition-colors duration-200 ${isDarkMode ? 'text-primary-100' : 'text-primary-900'} mb-4 sm:mb-6`}>Subscription Distribution</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={subscriptionData}
                    cx="50%"
                    cy="50%"
                    outerRadius={60}
                    dataKey="value"
                    label={({ name, value }) => `${name}: ${formatNumber(value)}`}
                  >
                    {subscriptionData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => formatNumber(Number(value))} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* Key Metrics */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="card p-4 sm:p-6"
          >
            <h3 className={`text-lg font-semibold transition-colors duration-200 ${isDarkMode ? 'text-primary-100' : 'text-primary-900'} mb-4 sm:mb-6`}>Key Metrics</h3>
            <div className="space-y-3 sm:space-y-4">
              <div className={`flex items-center justify-between p-3 rounded-lg transition-colors duration-200 ${isDarkMode ? 'bg-primary-700' : 'bg-primary-50'}`}>
                <div>
                  <p className={`text-sm transition-colors duration-200 ${isDarkMode ? 'text-primary-300' : 'text-primary-600'}`}>Conversion Rate</p>
                  <p className={`text-lg font-semibold transition-colors duration-200 ${isDarkMode ? 'text-primary-100' : 'text-primary-900'}`}>{analytics.conversions.signupToPremium.toFixed(1)}%</p>
                </div>
                <Target className="w-5 h-5 text-accent-500" />
              </div>
              
              <div className={`flex items-center justify-between p-3 rounded-lg transition-colors duration-200 ${isDarkMode ? 'bg-primary-700' : 'bg-primary-50'}`}>
                <div>
                  <p className={`text-sm transition-colors duration-200 ${isDarkMode ? 'text-primary-300' : 'text-primary-600'}`}>Day 1 Retention</p>
                  <p className={`text-lg font-semibold transition-colors duration-200 ${isDarkMode ? 'text-primary-100' : 'text-primary-900'}`}>{analytics.retention.day1}%</p>
                </div>
                <TrendingUp className="w-5 h-5 text-success-500" />
              </div>
              
              <div className={`flex items-center justify-between p-3 rounded-lg transition-colors duration-200 ${isDarkMode ? 'bg-primary-700' : 'bg-primary-50'}`}>
                <div>
                  <p className={`text-sm transition-colors duration-200 ${isDarkMode ? 'text-primary-300' : 'text-primary-600'}`}>Avg Lessons/User</p>
                  <p className={`text-lg font-semibold transition-colors duration-200 ${isDarkMode ? 'text-primary-100' : 'text-primary-900'}`}>{analytics.lessons.averagePerUser}</p>
                </div>
                <BarChart3 className="w-5 h-5 text-purple-500" />
              </div>
            </div>
          </motion.div>

          {/* Recent Activity */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.9 }}
            className="card p-4 sm:p-6"
          >
            <h3 className={`text-lg font-semibold transition-colors duration-200 ${isDarkMode ? 'text-primary-100' : 'text-primary-900'} mb-4 sm:mb-6`}>Recent Activity</h3>
            <div className="space-y-3 sm:space-y-4">
              <div className={`flex items-center space-x-3 p-3 rounded-lg transition-colors duration-200 ${isDarkMode ? 'bg-success-900' : 'bg-success-50'}`}>
                <div className="w-2 h-2 bg-success-500 rounded-full flex-shrink-0"></div>
                <div className="flex-1 min-w-0">
                  <p className={`text-sm font-medium transition-colors duration-200 ${isDarkMode ? 'text-primary-100' : 'text-primary-900'}`}>New Premium User</p>
                  <p className={`text-xs transition-colors duration-200 ${isDarkMode ? 'text-primary-300' : 'text-primary-600'}`}>Sarah Chen upgraded to Premium</p>
                </div>
                <span className={`text-xs transition-colors duration-200 ${isDarkMode ? 'text-primary-400' : 'text-primary-500'} flex-shrink-0`}>2m ago</span>
              </div>
              
              <div className={`flex items-center space-x-3 p-3 rounded-lg transition-colors duration-200 ${isDarkMode ? 'bg-accent-900' : 'bg-accent-50'}`}>
                <div className="w-2 h-2 bg-accent-500 rounded-full flex-shrink-0"></div>
                <div className="flex-1 min-w-0">
                  <p className={`text-sm font-medium transition-colors duration-200 ${isDarkMode ? 'text-primary-100' : 'text-primary-900'}`}>Lesson Completed</p>
                  <p className={`text-xs transition-colors duration-200 ${isDarkMode ? 'text-primary-300' : 'text-primary-600'}`}>Marcus finished "Small Talk Basics"</p>
                </div>
                <span className={`text-xs transition-colors duration-200 ${isDarkMode ? 'text-primary-400' : 'text-primary-500'} flex-shrink-0`}>5m ago</span>
              </div>
              
              <div className={`flex items-center space-x-3 p-3 rounded-lg transition-colors duration-200 ${isDarkMode ? 'bg-purple-900' : 'bg-purple-50'}`}>
                <div className="w-2 h-2 bg-purple-500 rounded-full flex-shrink-0"></div>
                <div className="flex-1 min-w-0">
                  <p className={`text-sm font-medium transition-colors duration-200 ${isDarkMode ? 'text-primary-100' : 'text-primary-900'}`}>Achievement Unlocked</p>
                  <p className={`text-xs transition-colors duration-200 ${isDarkMode ? 'text-primary-300' : 'text-primary-600'}`}>Emma earned "Week Warrior" badge</p>
                </div>
                <span className={`text-xs transition-colors duration-200 ${isDarkMode ? 'text-primary-400' : 'text-primary-500'} flex-shrink-0`}>8m ago</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Conversion Analytics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.0 }}
          className="mt-6 sm:mt-8"
        >
          <ConversionAnalytics />
        </motion.div>

        {/* Certification Analytics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.1 }}
          className="mt-6 sm:mt-8"
        >
          <CertificationAnalytics />
        </motion.div>
      </div>
    </div>
  )
} 
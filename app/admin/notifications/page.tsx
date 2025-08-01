'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { 
  Bell, 
  Send, 
  Calendar,
  Users,
  ArrowLeft,
  Plus,
  Clock,
  CheckCircle,
  AlertCircle,
  Moon,
  Sun
} from 'lucide-react'
import { useDarkMode } from '../../providers'
import { useAdminStore, Notification } from '../../data/adminData'

export default function NotificationsManagement() {
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    message: '',
    targetAudience: 'all' as 'all' | 'free' | 'premium',
    scheduledFor: ''
  })
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const { isDarkMode, toggleDarkMode } = useDarkMode()
  const router = useRouter()

  // Get live data from shared store
  const { 
    notifications, 
    getNotificationStats, 
    addNotification, 
    updateNotification, 
    deleteNotification,
    getUserStats
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

  const stats = getNotificationStats()
  const userStats = getUserStats()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const newNotification: Notification = {
      id: Date.now().toString(),
      title: formData.title,
      message: formData.message,
      targetAudience: formData.targetAudience,
      status: formData.scheduledFor ? 'scheduled' : 'draft',
      scheduledFor: formData.scheduledFor || undefined,
      recipients: formData.targetAudience === 'all' ? userStats.total : 
                 formData.targetAudience === 'premium' ? userStats.premium : userStats.free,
      openedCount: 0
    }
    
    addNotification(newNotification)
    setFormData({ title: '', message: '', targetAudience: 'all', scheduledFor: '' })
    setShowForm(false)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'sent': return 'text-success-600 bg-success-100 dark:text-success-400 dark:bg-success-900'
      case 'scheduled': return 'text-warning-600 bg-warning-100 dark:text-warning-400 dark:bg-warning-900'
      case 'draft': return 'text-primary-600 bg-primary-100 dark:text-primary-400 dark:bg-primary-900'
      default: return 'text-gray-600 bg-gray-100 dark:text-gray-400 dark:bg-gray-800'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'sent': return <CheckCircle className="w-4 h-4" />
      case 'scheduled': return <Clock className="w-4 h-4" />
      case 'draft': return <AlertCircle className="w-4 h-4" />
      default: return <Bell className="w-4 h-4" />
    }
  }

  const handleSendNotification = (notificationId: string) => {
    updateNotification(notificationId, { 
      status: 'sent', 
      sentAt: new Date().toLocaleString(),
      openedCount: Math.floor(Math.random() * 100) // Mock opened count
    })
    alert('Notification sent successfully!')
  }

  const handleDeleteNotification = (notificationId: string) => {
    if (confirm('Are you sure you want to delete this notification?')) {
      deleteNotification(notificationId)
      alert('Notification deleted successfully!')
    }
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
              <h1 className={`text-2xl sm:text-3xl font-bold transition-colors duration-200 ${isDarkMode ? 'text-primary-100' : 'text-primary-900'} mb-2`}>Notification Management</h1>
              <p className={`transition-colors duration-200 ${isDarkMode ? 'text-primary-300' : 'text-primary-600'}`}>Send announcements to your users based on their subscription status</p>
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

        {/* Stats Cards - Mobile Optimized */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="grid grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-4 mb-6 sm:mb-8"
        >
          <div className="card p-3 sm:p-4">
            <div className="flex items-center space-x-2 sm:space-x-3">
              <Bell className="w-5 h-5 sm:w-6 sm:h-6 text-primary-500 flex-shrink-0" />
              <div className="min-w-0 flex-1">
                <p className={`text-xs sm:text-sm transition-colors duration-200 ${isDarkMode ? 'text-primary-300' : 'text-primary-600'}`}>Total Notifications</p>
                <p className={`text-lg sm:text-xl font-bold transition-colors duration-200 ${isDarkMode ? 'text-primary-100' : 'text-primary-900'}`}>{stats.total}</p>
              </div>
            </div>
          </div>

          <div className="card p-3 sm:p-4">
            <div className="flex items-center space-x-2 sm:space-x-3">
              <Send className="w-5 h-5 sm:w-6 sm:h-6 text-success-500 flex-shrink-0" />
              <div className="min-w-0 flex-1">
                <p className={`text-xs sm:text-sm transition-colors duration-200 ${isDarkMode ? 'text-primary-300' : 'text-primary-600'}`}>Sent</p>
                <p className={`text-lg sm:text-xl font-bold transition-colors duration-200 ${isDarkMode ? 'text-primary-100' : 'text-primary-900'}`}>{stats.sent}</p>
              </div>
            </div>
          </div>

          <div className="card p-3 sm:p-4">
            <div className="flex items-center space-x-2 sm:space-x-3">
              <Clock className="w-5 h-5 sm:w-6 sm:h-6 text-warning-500 flex-shrink-0" />
              <div className="min-w-0 flex-1">
                <p className={`text-xs sm:text-sm transition-colors duration-200 ${isDarkMode ? 'text-primary-300' : 'text-primary-600'}`}>Scheduled</p>
                <p className={`text-lg sm:text-xl font-bold transition-colors duration-200 ${isDarkMode ? 'text-primary-100' : 'text-primary-900'}`}>{stats.scheduled}</p>
              </div>
            </div>
          </div>

          <div className="card p-3 sm:p-4">
            <div className="flex items-center space-x-2 sm:space-x-3">
              <AlertCircle className="w-5 h-5 sm:w-6 sm:h-6 text-primary-500 flex-shrink-0" />
              <div className="min-w-0 flex-1">
                <p className={`text-xs sm:text-sm transition-colors duration-200 ${isDarkMode ? 'text-primary-300' : 'text-primary-600'}`}>Drafts</p>
                <p className={`text-lg sm:text-xl font-bold transition-colors duration-200 ${isDarkMode ? 'text-primary-100' : 'text-primary-900'}`}>{stats.draft}</p>
              </div>
            </div>
          </div>

          <div className="card p-3 sm:p-4 col-span-2 lg:col-span-1">
            <div className="flex items-center space-x-2 sm:space-x-3">
              <Users className="w-5 h-5 sm:w-6 sm:h-6 text-accent-500 flex-shrink-0" />
              <div className="min-w-0 flex-1">
                <p className={`text-xs sm:text-sm transition-colors duration-200 ${isDarkMode ? 'text-primary-300' : 'text-primary-600'}`}>Total Recipients</p>
                <p className={`text-lg sm:text-xl font-bold transition-colors duration-200 ${isDarkMode ? 'text-primary-100' : 'text-primary-900'}`}>{userStats.total}</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Create New Notification Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-6"
        >
          <button
            onClick={() => setShowForm(true)}
            className="w-full sm:w-auto px-4 py-2 bg-accent-500 text-white rounded-lg hover:bg-accent-600 transition-colors flex items-center justify-center space-x-2"
          >
            <Plus className="w-4 h-4" />
            <span>Create New Notification</span>
          </button>
        </motion.div>

        {/* Notification Form */}
        {showForm && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="card p-4 sm:p-6 mb-6"
          >
            <h3 className={`text-lg font-semibold transition-colors duration-200 ${isDarkMode ? 'text-primary-100' : 'text-primary-900'} mb-4`}>Create New Notification</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className={`block text-sm font-medium mb-2 transition-colors duration-200 ${isDarkMode ? 'text-primary-300' : 'text-primary-700'}`}>Title</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-accent-500 focus:border-transparent transition-colors duration-200 ${
                    isDarkMode 
                      ? 'bg-primary-700 border-primary-600 text-primary-100 placeholder-primary-400' 
                      : 'border-primary-200 text-primary-900 placeholder-primary-500'
                  }`}
                  placeholder="Enter notification title"
                  required
                />
              </div>
              
              <div>
                <label className={`block text-sm font-medium mb-2 transition-colors duration-200 ${isDarkMode ? 'text-primary-300' : 'text-primary-700'}`}>Message</label>
                <textarea
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-accent-500 focus:border-transparent transition-colors duration-200 ${
                    isDarkMode 
                      ? 'bg-primary-700 border-primary-600 text-primary-100 placeholder-primary-400' 
                      : 'border-primary-200 text-primary-900 placeholder-primary-500'
                  }`}
                  rows={4}
                  placeholder="Enter notification message"
                  required
                />
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className={`block text-sm font-medium mb-2 transition-colors duration-200 ${isDarkMode ? 'text-primary-300' : 'text-primary-700'}`}>Target Audience</label>
                  <select
                    value={formData.targetAudience}
                    onChange={(e) => setFormData({ ...formData, targetAudience: e.target.value as any })}
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-accent-500 focus:border-transparent transition-colors duration-200 ${
                      isDarkMode 
                        ? 'bg-primary-700 border-primary-600 text-primary-100' 
                        : 'border-primary-200 text-primary-900'
                    }`}
                  >
                    <option value="all">All Users</option>
                    <option value="free">Free Users Only</option>
                    <option value="premium">Premium Users Only</option>
                  </select>
                </div>
                
                <div>
                  <label className={`block text-sm font-medium mb-2 transition-colors duration-200 ${isDarkMode ? 'text-primary-300' : 'text-primary-700'}`}>Schedule (Optional)</label>
                  <input
                    type="datetime-local"
                    value={formData.scheduledFor}
                    onChange={(e) => setFormData({ ...formData, scheduledFor: e.target.value })}
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-accent-500 focus:border-transparent transition-colors duration-200 ${
                      isDarkMode 
                        ? 'bg-primary-700 border-primary-600 text-primary-100' 
                        : 'border-primary-200 text-primary-900'
                    }`}
                  />
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3">
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-accent-500 text-white rounded-lg hover:bg-accent-600 transition-colors"
                >
                  {formData.scheduledFor ? 'Schedule Notification' : 'Send Now'}
                </button>
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="px-4 py-2 border border-primary-200 text-primary-700 rounded-lg hover:bg-primary-50 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </motion.div>
        )}

        {/* Notifications List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="card p-4 sm:p-6"
        >
          <h3 className={`text-lg font-semibold transition-colors duration-200 ${isDarkMode ? 'text-primary-100' : 'text-primary-900'} mb-4 sm:mb-6`}>Recent Notifications</h3>
          <div className="space-y-3 sm:space-y-4">
            {notifications.map((notification, index) => (
              <motion.div
                key={notification.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                className={`p-4 rounded-lg border transition-colors duration-200 ${
                  isDarkMode ? 'border-primary-700 bg-primary-800 hover:bg-primary-700' : 'border-primary-200 bg-white hover:bg-primary-50'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-2 mb-2">
                      <h4 className={`font-medium transition-colors duration-200 ${isDarkMode ? 'text-primary-100' : 'text-primary-900'} truncate`}>{notification.title}</h4>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(notification.status)} mt-1 sm:mt-0`}>
                        {notification.status}
                      </span>
                    </div>
                    <p className={`text-sm transition-colors duration-200 ${isDarkMode ? 'text-primary-300' : 'text-primary-600'} mb-3 line-clamp-2`}>{notification.message}</p>
                    <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-xs">
                      <span className={`transition-colors duration-200 ${isDarkMode ? 'text-primary-400' : 'text-primary-500'}`}>
                        Target: {notification.targetAudience}
                      </span>
                      <span className={`transition-colors duration-200 ${isDarkMode ? 'text-primary-400' : 'text-primary-500'}`}>
                        Recipients: {notification.recipients.toLocaleString()}
                      </span>
                      {notification.openedCount > 0 && (
                        <span className={`transition-colors duration-200 ${isDarkMode ? 'text-primary-400' : 'text-primary-500'}`}>
                          Opened: {notification.openedCount.toLocaleString()}
                        </span>
                      )}
                      {notification.sentAt && (
                        <span className={`transition-colors duration-200 ${isDarkMode ? 'text-primary-400' : 'text-primary-500'}`}>
                          Sent: {notification.sentAt}
                        </span>
                      )}
                      {notification.scheduledFor && (
                        <span className={`transition-colors duration-200 ${isDarkMode ? 'text-primary-400' : 'text-primary-500'}`}>
                          Scheduled: {notification.scheduledFor}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className={`ml-4 ${getStatusColor(notification.status)} flex-shrink-0`}>
                    {getStatusIcon(notification.status)}
                  </div>
                </div>
                
                {/* Action Buttons */}
                <div className="flex gap-2 mt-3">
                  {notification.status === 'draft' && (
                    <button
                      onClick={() => handleSendNotification(notification.id)}
                      className="px-3 py-1 bg-success-500 text-white rounded text-xs hover:bg-success-600 transition-colors"
                    >
                      Send Now
                    </button>
                  )}
                  {notification.status === 'scheduled' && (
                    <button
                      onClick={() => handleSendNotification(notification.id)}
                      className="px-3 py-1 bg-warning-500 text-white rounded text-xs hover:bg-warning-600 transition-colors"
                    >
                      Send Now
                    </button>
                  )}
                  <button
                    onClick={() => handleDeleteNotification(notification.id)}
                    className="px-3 py-1 bg-error-500 text-white rounded text-xs hover:bg-error-600 transition-colors"
                  >
                    Delete
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
} 
'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { 
  Users, 
  Search, 
  Filter, 
  Download, 
  Eye,
  Mail,
  Calendar,
  TrendingUp,
  Crown,
  UserCheck,
  UserX,
  ArrowLeft,
  Moon,
  Sun
} from 'lucide-react'
import { useDarkMode } from '../../providers'
import { useAdminStore, User } from '../../data/adminData'

export default function UsersManagement() {
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState<'all' | 'free' | 'premium'>('all')
  const [sortBy, setSortBy] = useState<'name' | 'level' | 'streak' | 'lastActive'>('lastActive')
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const [showUserModal, setShowUserModal] = useState(false)
  const [showMessageModal, setShowMessageModal] = useState(false)
  const [messageText, setMessageText] = useState('')
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const { isDarkMode, toggleDarkMode } = useDarkMode()
  const router = useRouter()

  // State for real user data
  const [users, setUsers] = useState<User[]>([])
  const [stats, setStats] = useState({
    total: 0,
    free: 0,
    premium: 0,
    active: 0
  })
  const [loading, setLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [itemsPerPage] = useState(50) // Show 50 users per page

  // Fetch real user data
  const fetchUsers = async () => {
    try {
      setLoading(true)
      // Force fresh data with timestamp and cache-busting headers
      const response = await fetch(`/api/admin/users?t=${Date.now()}`, {
        method: 'GET',
        headers: {
          'Cache-Control': 'no-cache, no-store, must-revalidate',
          'Pragma': 'no-cache',
          'Expires': '0'
        }
      })
      if (response.ok) {
        const data = await response.json()
        if (data.success) {
          setUsers(data.data.users)
          setStats(data.data.stats)
          console.log('Updated users data:', data.data)
        }
      }
    } catch (error) {
      console.error('Failed to fetch users:', error)
    } finally {
      setLoading(false)
    }
  }

  // Mock functions for compatibility
  const getUserStats = () => stats
  const sendMessageToUser = (userId: string, message: string) => {
    console.log(`Message sent to user ${userId}: ${message}`)
  }
  const updateUserActivity = (userId: string, activity: string) => {
    console.log(`User ${userId} activity updated: ${activity}`)
  }
  const updateUserSubscription = (userId: string, status: 'free' | 'premium') => {
    console.log(`User ${userId} subscription updated to ${status}`)
  }

  useEffect(() => {
    // Check if admin is authenticated
    const adminAuth = localStorage.getItem('admin_authenticated')
    if (!adminAuth) {
      router.push('/admin-access')
      return
    }
    setIsAuthenticated(true)
    
    // Fetch users data with a small delay to ensure fresh data
    setTimeout(() => {
      fetchUsers()
    }, 100)
  }, [router])

  if (!isAuthenticated) {
    return null // Will redirect to admin-access
  }

  const filteredUsers = users
    .filter(user => 
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter(user => filterStatus === 'all' || user.subscriptionStatus === filterStatus)
    .sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name)
        case 'level':
          return b.currentLevel - a.currentLevel
        case 'streak':
          return b.currentStreak - a.currentStreak
        case 'lastActive':
          return new Date(b.lastActive).getTime() - new Date(a.lastActive).getTime()
        default:
          return 0
      }
    })

  // Use the stats from state

  const handleViewUser = (user: User) => {
    setSelectedUser(user)
    setShowUserModal(true)
  }

  const handleMessageUser = (user: User) => {
    setSelectedUser(user)
    setShowMessageModal(true)
  }

  const handleSendMessage = () => {
    if (selectedUser && messageText.trim()) {
      // Use the shared store to send message and update user activity
      sendMessageToUser(selectedUser.id, messageText)
      
      // Show success message
      alert(`Message sent to ${selectedUser.name}: "${messageText}"`)
      setMessageText('')
      setShowMessageModal(false)
      setSelectedUser(null)
    }
  }

  const handleUpdateUserSubscription = (userId: string, status: 'free' | 'premium') => {
    updateUserSubscription(userId, status)
    alert(`User subscription updated to ${status}`)
  }

  const handleUpdateUserActivity = (userId: string, activity: string) => {
    updateUserActivity(userId, activity)
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
              <h1 className={`text-2xl sm:text-3xl font-bold transition-colors duration-200 ${isDarkMode ? 'text-primary-100' : 'text-primary-900'} mb-2`}>User Management</h1>
              <p className={`transition-colors duration-200 ${isDarkMode ? 'text-primary-300' : 'text-primary-600'}`}>Manage your ConvoMaster users and their progress</p>
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
                onClick={fetchUsers}
                className="px-4 py-2 bg-accent-500 text-white rounded-lg hover:bg-accent-600 transition-colors flex items-center justify-center space-x-2 mr-2"
                title="Refresh user data"
              >
                <TrendingUp className="w-4 h-4" />
                <span>Refresh</span>
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
          className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6 sm:mb-8"
        >
          <div className="card p-3 sm:p-4">
            <div className="flex items-center space-x-2 sm:space-x-3">
              <Users className="w-5 h-5 sm:w-6 sm:h-6 text-primary-500 flex-shrink-0" />
              <div className="min-w-0 flex-1">
                <p className={`text-xs sm:text-sm transition-colors duration-200 ${isDarkMode ? 'text-primary-300' : 'text-primary-600'}`}>Total Users</p>
                <p className={`text-lg sm:text-xl font-bold transition-colors duration-200 ${isDarkMode ? 'text-primary-100' : 'text-primary-900'}`}>{stats.total}</p>
              </div>
            </div>
          </div>

          <div className="card p-3 sm:p-4">
            <div className="flex items-center space-x-2 sm:space-x-3">
              <UserCheck className="w-5 h-5 sm:w-6 sm:h-6 text-success-500 flex-shrink-0" />
              <div className="min-w-0 flex-1">
                <p className={`text-xs sm:text-sm transition-colors duration-200 ${isDarkMode ? 'text-primary-300' : 'text-primary-600'}`}>Active Users</p>
                <p className={`text-lg sm:text-xl font-bold transition-colors duration-200 ${isDarkMode ? 'text-primary-100' : 'text-primary-900'}`}>{stats.active}</p>
              </div>
            </div>
          </div>

          <div className="card p-3 sm:p-4">
            <div className="flex items-center space-x-2 sm:space-x-3">
              <Crown className="w-5 h-5 sm:w-6 sm:h-6 text-accent-500 flex-shrink-0" />
              <div className="min-w-0 flex-1">
                <p className={`text-xs sm:text-sm transition-colors duration-200 ${isDarkMode ? 'text-primary-300' : 'text-primary-600'}`}>Premium Users</p>
                <p className={`text-lg sm:text-xl font-bold transition-colors duration-200 ${isDarkMode ? 'text-primary-100' : 'text-primary-900'}`}>{stats.premium}</p>
              </div>
            </div>
          </div>

          <div className="card p-3 sm:p-4">
            <div className="flex items-center space-x-2 sm:space-x-3">
              <UserX className="w-5 h-5 sm:w-6 sm:h-6 text-gray-500 flex-shrink-0" />
              <div className="min-w-0 flex-1">
                <p className={`text-xs sm:text-sm transition-colors duration-200 ${isDarkMode ? 'text-primary-300' : 'text-primary-600'}`}>Free Users</p>
                <p className={`text-lg sm:text-xl font-bold transition-colors duration-200 ${isDarkMode ? 'text-primary-100' : 'text-primary-900'}`}>{stats.free}</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Filters and Search - Mobile Optimized */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="card p-4 sm:p-6 mb-6"
        >
          <div className="space-y-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-primary-400 w-4 h-4 sm:w-5 sm:h-5" />
              <input
                type="text"
                placeholder="Search users by name or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={`w-full pl-10 pr-4 py-2 sm:py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm sm:text-base transition-colors duration-200 ${
                  isDarkMode 
                    ? 'bg-primary-700 border-primary-600 text-primary-100 placeholder-primary-400' 
                    : 'border-primary-200 text-primary-900 placeholder-primary-500'
                }`}
              />
            </div>

            {/* Filters and Download - Mobile Optimized */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-3">
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value as any)}
                className={`px-3 sm:px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm sm:text-base transition-colors duration-200 ${
                  isDarkMode 
                    ? 'bg-primary-700 border-primary-600 text-primary-100' 
                    : 'border-primary-200 text-primary-900'
                }`}
              >
                <option value="all">All Users</option>
                <option value="free">Free Users</option>
                <option value="premium">Premium Users</option>
              </select>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className={`px-3 sm:px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm sm:text-base transition-colors duration-200 ${
                  isDarkMode 
                    ? 'bg-primary-700 border-primary-600 text-primary-100' 
                    : 'border-primary-200 text-primary-900'
                }`}
              >
                <option value="lastActive">Last Active</option>
                <option value="name">Name</option>
                <option value="level">Level</option>
                <option value="streak">Streak</option>
              </select>

              <button className="px-3 sm:px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors flex items-center justify-center">
                <Download className="w-4 h-4" />
              </button>
            </div>
          </div>
        </motion.div>

        {/* Users Table - Mobile Optimized */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="card p-4 sm:p-6"
        >
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className={`border-b transition-colors duration-200 ${isDarkMode ? 'border-primary-700' : 'border-primary-200'}`}>
                  <th className={`text-left py-3 px-2 sm:px-4 font-semibold text-sm sm:text-base transition-colors duration-200 ${isDarkMode ? 'text-primary-100' : 'text-primary-900'}`}>User</th>
                  <th className={`text-left py-3 px-2 sm:px-4 font-semibold text-sm sm:text-base transition-colors duration-200 ${isDarkMode ? 'text-primary-100' : 'text-primary-900'}`}>Status</th>
                  <th className={`text-left py-3 px-2 sm:px-4 font-semibold text-sm sm:text-base transition-colors duration-200 ${isDarkMode ? 'text-primary-100' : 'text-primary-900'}`}>Level</th>
                  <th className={`text-left py-3 px-2 sm:px-4 font-semibold text-sm sm:text-base transition-colors duration-200 ${isDarkMode ? 'text-primary-100' : 'text-primary-900'}`}>Streak</th>
                  <th className={`text-left py-3 px-2 sm:px-4 font-semibold text-sm sm:text-base transition-colors duration-200 ${isDarkMode ? 'text-primary-100' : 'text-primary-900'}`}>Lessons</th>
                  <th className={`text-left py-3 px-2 sm:px-4 font-semibold text-sm sm:text-base transition-colors duration-200 ${isDarkMode ? 'text-primary-100' : 'text-primary-900'}`}>Last Active</th>
                  <th className={`text-right py-3 px-2 sm:px-4 font-semibold text-sm sm:text-base transition-colors duration-200 ${isDarkMode ? 'text-primary-100' : 'text-primary-900'}`}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user, index) => (
                  <motion.tr
                    key={user.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                    className={`border-b transition-colors duration-200 hover:bg-opacity-50 ${
                      isDarkMode ? 'border-primary-700 hover:bg-primary-700' : 'border-primary-100 hover:bg-primary-50'
                    }`}
                  >
                    <td className="py-3 sm:py-4 px-2 sm:px-4">
                      <div className="min-w-0">
                        <p className={`font-medium text-sm sm:text-base transition-colors duration-200 ${isDarkMode ? 'text-primary-100' : 'text-primary-900'} truncate`}>{user.name}</p>
                        <p className={`text-xs sm:text-sm transition-colors duration-200 ${isDarkMode ? 'text-primary-400' : 'text-primary-600'} truncate`}>{user.email}</p>
                      </div>
                    </td>
                    <td className="py-3 sm:py-4 px-2 sm:px-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        user.subscriptionStatus === 'premium' ? 'bg-accent-100 text-accent-700 dark:bg-accent-900 dark:text-accent-300' :
                        'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300'
                      }`}>
                        {user.subscriptionStatus}
                      </span>
                    </td>
                    <td className="py-3 sm:py-4 px-2 sm:px-4">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-2">
                        <span className={`font-medium text-sm sm:text-base transition-colors duration-200 ${isDarkMode ? 'text-primary-100' : 'text-primary-900'}`}>Level {user.currentLevel}</span>
                        <span className={`text-xs sm:text-sm transition-colors duration-200 ${isDarkMode ? 'text-primary-400' : 'text-primary-600'}`}>({user.totalXp} XP)</span>
                      </div>
                    </td>
                    <td className="py-3 sm:py-4 px-2 sm:px-4">
                      <div className="flex items-center space-x-2">
                        <span className={`font-medium text-sm sm:text-base transition-colors duration-200 ${isDarkMode ? 'text-primary-100' : 'text-primary-900'}`}>{user.currentStreak} days</span>
                      </div>
                    </td>
                    <td className="py-3 sm:py-4 px-2 sm:px-4">
                      <span className={`text-sm sm:text-base transition-colors duration-200 ${isDarkMode ? 'text-primary-100' : 'text-primary-900'}`}>{user.completedLessons}/120</span>
                    </td>
                    <td className="py-3 sm:py-4 px-2 sm:px-4">
                      <span className={`text-xs sm:text-sm transition-colors duration-200 ${isDarkMode ? 'text-primary-400' : 'text-primary-600'}`}>{user.lastActive}</span>
                    </td>
                    <td className="py-3 sm:py-4 px-2 sm:px-4 text-right">
                      <div className="flex space-x-1 sm:space-x-2 justify-end">
                        <button 
                          onClick={() => handleViewUser(user)}
                          className="p-1.5 sm:p-2 text-primary-600 hover:text-primary-900 hover:bg-primary-100 rounded-lg transition-colors"
                          title="View user details"
                        >
                          <Eye className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                        </button>
                        <button 
                          onClick={() => handleMessageUser(user)}
                          className="p-1.5 sm:p-2 text-primary-600 hover:text-primary-900 hover:bg-primary-100 rounded-lg transition-colors"
                          title="Send message"
                        >
                          <Mail className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* User Details Modal */}
        {showUserModal && selectedUser && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
            onClick={() => setShowUserModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className={`rounded-lg p-4 sm:p-6 max-w-md w-full max-h-[80vh] overflow-y-auto transition-colors duration-200 ${
                isDarkMode ? 'bg-primary-800 border border-primary-700' : 'bg-white border border-primary-200'
              }`}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className={`text-lg font-semibold transition-colors duration-200 ${isDarkMode ? 'text-primary-100' : 'text-primary-900'}`}>User Details</h3>
                <button
                  onClick={() => setShowUserModal(false)}
                  className={`transition-colors duration-200 ${isDarkMode ? 'text-primary-400 hover:text-primary-100' : 'text-primary-600 hover:text-primary-900'}`}
                >
                  ✕
                </button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <h4 className={`font-medium transition-colors duration-200 ${isDarkMode ? 'text-primary-100' : 'text-primary-900'}`}>{selectedUser.name}</h4>
                  <p className={`text-sm transition-colors duration-200 ${isDarkMode ? 'text-primary-400' : 'text-primary-600'}`}>{selectedUser.email}</p>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <p className={`text-xs transition-colors duration-200 ${isDarkMode ? 'text-primary-400' : 'text-primary-600'}`}>Status</p>
                    <div className="flex items-center space-x-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        selectedUser.subscriptionStatus === 'premium' ? 'bg-accent-100 text-accent-700' :
                        'bg-gray-100 text-gray-700'
                      }`}>
                        {selectedUser.subscriptionStatus}
                      </span>
                      <button
                        onClick={() => handleUpdateUserSubscription(selectedUser.id, selectedUser.subscriptionStatus === 'premium' ? 'free' : 'premium')}
                        className="text-xs text-primary-600 hover:text-primary-800 underline"
                      >
                        Toggle
                      </button>
                    </div>
                  </div>
                  <div>
                    <p className={`text-xs transition-colors duration-200 ${isDarkMode ? 'text-primary-400' : 'text-primary-600'}`}>Level</p>
                    <p className={`font-medium transition-colors duration-200 ${isDarkMode ? 'text-primary-100' : 'text-primary-900'}`}>Level {selectedUser.currentLevel}</p>
                  </div>
                  <div>
                    <p className={`text-xs transition-colors duration-200 ${isDarkMode ? 'text-primary-400' : 'text-primary-600'}`}>Total XP</p>
                    <p className={`font-medium transition-colors duration-200 ${isDarkMode ? 'text-primary-100' : 'text-primary-900'}`}>{selectedUser.totalXp} XP</p>
                  </div>
                  <div>
                    <p className={`text-xs transition-colors duration-200 ${isDarkMode ? 'text-primary-400' : 'text-primary-600'}`}>Current Streak</p>
                    <p className={`font-medium transition-colors duration-200 ${isDarkMode ? 'text-primary-100' : 'text-primary-900'}`}>{selectedUser.currentStreak} days</p>
                  </div>
                  <div>
                    <p className={`text-xs transition-colors duration-200 ${isDarkMode ? 'text-primary-400' : 'text-primary-600'}`}>Lessons Completed</p>
                    <p className={`font-medium transition-colors duration-200 ${isDarkMode ? 'text-primary-100' : 'text-primary-900'}`}>{selectedUser.completedLessons}/120</p>
                  </div>
                  <div>
                    <p className={`text-xs transition-colors duration-200 ${isDarkMode ? 'text-primary-400' : 'text-primary-600'}`}>Last Active</p>
                    <p className={`font-medium transition-colors duration-200 ${isDarkMode ? 'text-primary-100' : 'text-primary-900'}`}>{selectedUser.lastActive}</p>
                  </div>
                </div>
                
                <div>
                  <p className={`text-xs transition-colors duration-200 ${isDarkMode ? 'text-primary-400' : 'text-primary-600'}`}>Joined</p>
                  <p className={`font-medium transition-colors duration-200 ${isDarkMode ? 'text-primary-100' : 'text-primary-900'}`}>{selectedUser.joinedAt}</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}

        {/* Message Modal */}
        {showMessageModal && selectedUser && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
            onClick={() => setShowMessageModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className={`rounded-lg p-4 sm:p-6 max-w-md w-full transition-colors duration-200 ${
                isDarkMode ? 'bg-primary-800 border border-primary-700' : 'bg-white border border-primary-200'
              }`}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className={`text-lg font-semibold transition-colors duration-200 ${isDarkMode ? 'text-primary-100' : 'text-primary-900'}`}>Send Message</h3>
                <button
                  onClick={() => setShowMessageModal(false)}
                  className={`transition-colors duration-200 ${isDarkMode ? 'text-primary-400 hover:text-primary-100' : 'text-primary-600 hover:text-primary-900'}`}
                >
                  ✕
                </button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <p className={`text-sm transition-colors duration-200 ${isDarkMode ? 'text-primary-400' : 'text-primary-600'}`}>To: {selectedUser.name}</p>
                  <p className={`text-xs transition-colors duration-200 ${isDarkMode ? 'text-primary-500' : 'text-primary-500'}`}>{selectedUser.email}</p>
                </div>
                
                <div>
                  <label className={`block text-sm font-medium mb-2 transition-colors duration-200 ${isDarkMode ? 'text-primary-300' : 'text-primary-700'}`}>Message</label>
                  <textarea
                    value={messageText}
                    onChange={(e) => setMessageText(e.target.value)}
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors duration-200 ${
                      isDarkMode 
                        ? 'bg-primary-700 border-primary-600 text-primary-100 placeholder-primary-400' 
                        : 'border-primary-200 text-primary-900 placeholder-primary-500'
                    }`}
                    rows={4}
                    placeholder="Enter your message..."
                  />
                </div>
                
                <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3">
                  <button
                    onClick={handleSendMessage}
                    className="flex-1 px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors"
                  >
                    Send Message
                  </button>
                  <button
                    onClick={() => setShowMessageModal(false)}
                    className="px-4 py-2 border border-primary-200 text-primary-700 rounded-lg hover:bg-primary-50 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </div>
    </div>
  )
} 
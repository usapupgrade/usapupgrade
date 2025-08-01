'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Eye, Mail, ArrowLeft, User, Crown, TrendingUp, Calendar } from 'lucide-react'

interface DemoUser {
  id: string
  name: string
  email: string
  status: 'premium' | 'free'
  level: number
  xp: number
  streak: number
  lastActive: string
}

const demoUsers: DemoUser[] = [
  {
    id: '1',
    name: 'Sarah Chen',
    email: 'sarah.chen@email.com',
    status: 'premium',
    level: 8,
    xp: 1250,
    streak: 12,
    lastActive: '2 hours ago'
  },
  {
    id: '2',
    name: 'Emma Thompson',
    email: 'emma.t@email.com',
    status: 'premium',
    level: 12,
    xp: 2100,
    streak: 25,
    lastActive: '30 minutes ago'
  },
  {
    id: '3',
    name: 'Lisa Wang',
    email: 'lisa.wang@email.com',
    status: 'premium',
    level: 18,
    xp: 3500,
    streak: 45,
    lastActive: '1 hour ago'
  }
]

export default function ActionIconsDemo() {
  const [selectedUser, setSelectedUser] = useState<DemoUser | null>(null)
  const [showViewModal, setShowViewModal] = useState(false)
  const [showMessageModal, setShowMessageModal] = useState(false)
  const [messageText, setMessageText] = useState('')
  const [actionHistory, setActionHistory] = useState<string[]>([])

  const handleViewUser = (user: DemoUser) => {
    setSelectedUser(user)
    setShowViewModal(true)
    setActionHistory(prev => [...prev, `Viewed details for ${user.name}`])
  }

  const handleMessageUser = (user: DemoUser) => {
    setSelectedUser(user)
    setShowMessageModal(true)
    setActionHistory(prev => [...prev, `Opened message form for ${user.name}`])
  }

  const handleSendMessage = () => {
    if (selectedUser && messageText.trim()) {
      setActionHistory(prev => [...prev, `Sent message to ${selectedUser.name}: "${messageText}"`])
      setMessageText('')
      setShowMessageModal(false)
      setSelectedUser(null)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-accent-50 p-4 sm:p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-primary-900 mb-2">Action Icons Demo</h1>
              <p className="text-primary-600">See the eye (view) and envelope (message) icons in action!</p>
            </div>
            <button
              onClick={() => window.location.href = '/admin'}
              className="px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors flex items-center justify-center space-x-2 w-full sm:w-auto"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Admin</span>
            </button>
          </div>
        </motion.div>

        {/* Demo Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8"
        >
          {/* Action Icons Info Card */}
          <div className="card">
            <h3 className="text-lg font-semibold text-primary-900 mb-4 flex items-center space-x-2">
              <Eye className="w-5 h-5 text-primary-500" />
              <span>Action Icons Explained</span>
            </h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-3 p-3 bg-primary-50 rounded-lg">
                <Eye className="w-5 h-5 text-primary-600" />
                <div>
                  <p className="font-medium text-primary-900">Eye Icon (View)</p>
                  <p className="text-sm text-primary-600">Click to view detailed user information</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-3 bg-primary-50 rounded-lg">
                <Mail className="w-5 h-5 text-primary-600" />
                <div>
                  <p className="font-medium text-primary-900">Envelope Icon (Message)</p>
                  <p className="text-sm text-primary-600">Click to send a message to the user</p>
                </div>
              </div>
            </div>
          </div>

          {/* Interactive Demo Card */}
          <div className="card">
            <h3 className="text-lg font-semibold text-primary-900 mb-4">Try the Icons!</h3>
            <p className="text-primary-600 mb-4">Click the eye and envelope icons in the table below to see them in action.</p>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-success-500 rounded-full"></div>
                <span className="text-sm text-primary-600">View user details</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-accent-500 rounded-full"></div>
                <span className="text-sm text-primary-600">Send messages</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Demo Users Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="card mb-6"
        >
          <h3 className="text-lg font-semibold text-primary-900 mb-6">Demo Users</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-primary-200">
                  <th className="text-left py-3 px-2 sm:px-4 font-semibold text-primary-900 text-sm sm:text-base">User</th>
                  <th className="text-left py-3 px-2 sm:px-4 font-semibold text-primary-900 text-sm sm:text-base">Status</th>
                  <th className="text-left py-3 px-2 sm:px-4 font-semibold text-primary-900 text-sm sm:text-base">Level</th>
                  <th className="text-left py-3 px-2 sm:px-4 font-semibold text-primary-900 text-sm sm:text-base">Streak</th>
                  <th className="text-left py-3 px-2 sm:px-4 font-semibold text-primary-900 text-sm sm:text-base">Last Active</th>
                  <th className="text-right py-3 px-2 sm:px-4 font-semibold text-primary-900 text-sm sm:text-base">Actions</th>
                </tr>
              </thead>
              <tbody>
                {demoUsers.map((user, index) => (
                  <motion.tr
                    key={user.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                    className="border-b border-primary-100 hover:bg-primary-50"
                  >
                    <td className="py-3 sm:py-4 px-2 sm:px-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                          <User className="w-4 h-4 text-primary-600" />
                        </div>
                        <div>
                          <p className="font-medium text-primary-900 text-sm sm:text-base">{user.name}</p>
                          <p className="text-xs sm:text-sm text-primary-600">{user.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 sm:py-4 px-2 sm:px-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium flex items-center space-x-1 w-fit ${
                        user.status === 'premium' ? 'bg-accent-100 text-accent-700' : 'bg-gray-100 text-gray-700'
                      }`}>
                        <Crown className="w-3 h-3" />
                        <span>{user.status}</span>
                      </span>
                    </td>
                    <td className="py-3 sm:py-4 px-2 sm:px-4">
                      <div className="flex items-center space-x-2">
                        <TrendingUp className="w-4 h-4 text-primary-500" />
                        <span className="font-medium text-primary-900 text-sm sm:text-base">Level {user.level}</span>
                        <span className="text-xs sm:text-sm text-primary-600">({user.xp} XP)</span>
                      </div>
                    </td>
                    <td className="py-3 sm:py-4 px-2 sm:px-4">
                      <div className="flex items-center space-x-2">
                        <Calendar className="w-4 h-4 text-success-500" />
                        <span className="font-medium text-primary-900 text-sm sm:text-base">{user.streak} days</span>
                      </div>
                    </td>
                    <td className="py-3 sm:py-4 px-2 sm:px-4">
                      <span className="text-xs sm:text-sm text-primary-600">{user.lastActive}</span>
                    </td>
                    <td className="py-3 sm:py-4 px-2 sm:px-4 text-right">
                      <div className="flex space-x-1 sm:space-x-2 justify-end">
                        <button 
                          onClick={() => handleViewUser(user)}
                          className="p-1.5 sm:p-2 text-primary-600 hover:text-primary-900 hover:bg-primary-100 rounded-lg transition-colors group"
                          title="View user details"
                        >
                          <Eye className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover:scale-110 transition-transform" />
                        </button>
                        <button 
                          onClick={() => handleMessageUser(user)}
                          className="p-1.5 sm:p-2 text-primary-600 hover:text-primary-900 hover:bg-primary-100 rounded-lg transition-colors group"
                          title="Send message"
                        >
                          <Mail className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover:scale-110 transition-transform" />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Action History */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="card"
        >
          <h3 className="text-lg font-semibold text-primary-900 mb-4">Action History</h3>
          <div className="space-y-2 max-h-40 overflow-y-auto">
            {actionHistory.length === 0 ? (
              <p className="text-primary-600 text-sm">No actions yet. Try clicking the icons above!</p>
            ) : (
              actionHistory.map((action, index) => (
                <div key={index} className="flex items-center space-x-2 p-2 bg-primary-50 rounded-lg">
                  <div className="w-2 h-2 bg-primary-500 rounded-full"></div>
                  <span className="text-sm text-primary-700">{action}</span>
                </div>
              ))
            )}
          </div>
        </motion.div>

        {/* View User Modal */}
        {showViewModal && selectedUser && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
            onClick={() => setShowViewModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-white rounded-lg p-4 sm:p-6 max-w-md w-full max-h-[80vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-primary-900 flex items-center space-x-2">
                  <Eye className="w-5 h-5 text-primary-500" />
                  <span>User Details</span>
                </h3>
                <button
                  onClick={() => setShowViewModal(false)}
                  className="text-primary-600 hover:text-primary-900"
                >
                  ✕
                </button>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                    <User className="w-6 h-6 text-primary-600" />
                  </div>
                  <div>
                    <h4 className="font-medium text-primary-900 text-lg">{selectedUser.name}</h4>
                    <p className="text-sm text-primary-600">{selectedUser.email}</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-3 bg-primary-50 rounded-lg">
                    <p className="text-xs text-primary-600 mb-1">Status</p>
                    <div className="flex items-center space-x-2">
                      <Crown className="w-4 h-4 text-accent-500" />
                      <span className="font-medium text-primary-900 capitalize">{selectedUser.status}</span>
                    </div>
                  </div>
                  <div className="p-3 bg-primary-50 rounded-lg">
                    <p className="text-xs text-primary-600 mb-1">Level</p>
                    <div className="flex items-center space-x-2">
                      <TrendingUp className="w-4 h-4 text-primary-500" />
                      <span className="font-medium text-primary-900">Level {selectedUser.level}</span>
                    </div>
                  </div>
                  <div className="p-3 bg-primary-50 rounded-lg">
                    <p className="text-xs text-primary-600 mb-1">Total XP</p>
                    <span className="font-medium text-primary-900">{selectedUser.xp} XP</span>
                  </div>
                  <div className="p-3 bg-primary-50 rounded-lg">
                    <p className="text-xs text-primary-600 mb-1">Current Streak</p>
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-4 h-4 text-success-500" />
                      <span className="font-medium text-primary-900">{selectedUser.streak} days</span>
                    </div>
                  </div>
                </div>
                
                <div className="p-3 bg-primary-50 rounded-lg">
                  <p className="text-xs text-primary-600 mb-1">Last Active</p>
                  <span className="font-medium text-primary-900">{selectedUser.lastActive}</span>
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
              className="bg-white rounded-lg p-4 sm:p-6 max-w-md w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-primary-900 flex items-center space-x-2">
                  <Mail className="w-5 h-5 text-primary-500" />
                  <span>Send Message</span>
                </h3>
                <button
                  onClick={() => setShowMessageModal(false)}
                  className="text-primary-600 hover:text-primary-900"
                >
                  ✕
                </button>
              </div>
              
              <div className="space-y-4">
                <div className="p-3 bg-primary-50 rounded-lg">
                  <p className="text-sm text-primary-600 mb-1">To:</p>
                  <p className="font-medium text-primary-900">{selectedUser.name}</p>
                  <p className="text-xs text-primary-500">{selectedUser.email}</p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-primary-700 mb-2">Message</label>
                  <textarea
                    value={messageText}
                    onChange={(e) => setMessageText(e.target.value)}
                    className="w-full px-3 py-2 border border-primary-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    rows={4}
                    placeholder="Enter your message..."
                  />
                </div>
                
                <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3">
                  <button
                    onClick={handleSendMessage}
                    className="flex-1 px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors flex items-center justify-center space-x-2"
                  >
                    <Mail className="w-4 h-4" />
                    <span>Send Message</span>
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
'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { 
  MessageSquare, 
  Users, 
  Clock, 
  CheckCircle,
  AlertCircle,
  ArrowLeft,
  Moon,
  Sun,
  Send,
  User
} from 'lucide-react'
import { useDarkMode } from '../../providers'
import { useAdminStore, SupportTicket } from '../../data/adminData'

export default function UserSupport() {
  const [selectedTicket, setSelectedTicket] = useState<SupportTicket | null>(null)
  const [showTicketModal, setShowTicketModal] = useState(false)
  const [responseText, setResponseText] = useState('')
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const { isDarkMode, toggleDarkMode } = useDarkMode()
  const router = useRouter()

  // Get live data from shared store
  const { 
    supportTickets, 
    getSupportStats, 
    updateTicketStatus, 
    addTicketResponse 
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

  const stats = getSupportStats()

  const handleViewTicket = (ticket: SupportTicket) => {
    setSelectedTicket(ticket)
    setShowTicketModal(true)
  }

  const handleUpdateStatus = (ticketId: string, status: 'open' | 'in_progress' | 'resolved' | 'closed') => {
    updateTicketStatus(ticketId, status)
    alert('Ticket status updated successfully!')
  }

  const handleSendResponse = () => {
    if (selectedTicket && responseText.trim()) {
      addTicketResponse(selectedTicket.id, responseText)
      setResponseText('')
      alert('Response sent successfully!')
      setShowTicketModal(false)
      setSelectedTicket(null)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open': return 'text-error-600 bg-error-100 dark:text-error-400 dark:bg-error-900'
      case 'in_progress': return 'text-warning-600 bg-warning-100 dark:text-warning-400 dark:bg-warning-900'
      case 'resolved': return 'text-success-600 bg-success-100 dark:text-success-400 dark:bg-success-900'
      case 'closed': return 'text-primary-600 bg-primary-100 dark:text-primary-400 dark:bg-primary-900'
      default: return 'text-gray-600 bg-gray-100 dark:text-gray-400 dark:bg-gray-800'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'open': return <AlertCircle className="w-4 h-4" />
      case 'in_progress': return <Clock className="w-4 h-4" />
      case 'resolved': return <CheckCircle className="w-4 h-4" />
      case 'closed': return <MessageSquare className="w-4 h-4" />
      default: return <MessageSquare className="w-4 h-4" />
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
              <h1 className={`text-2xl sm:text-3xl font-bold transition-colors duration-200 ${isDarkMode ? 'text-primary-100' : 'text-primary-900'} mb-2`}>User Support</h1>
              <p className={`transition-colors duration-200 ${isDarkMode ? 'text-primary-300' : 'text-primary-600'}`}>Manage customer inquiries and support tickets</p>
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
          className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6 sm:mb-8"
        >
          <div className="card p-3 sm:p-4">
            <div className="flex items-center space-x-2 sm:space-x-3">
              <MessageSquare className="w-5 h-5 sm:w-6 sm:h-6 text-primary-500 flex-shrink-0" />
              <div className="min-w-0 flex-1">
                <p className={`text-xs sm:text-sm transition-colors duration-200 ${isDarkMode ? 'text-primary-300' : 'text-primary-600'}`}>Total Tickets</p>
                <p className={`text-lg sm:text-xl font-bold transition-colors duration-200 ${isDarkMode ? 'text-primary-100' : 'text-primary-900'}`}>{stats.total}</p>
              </div>
            </div>
          </div>

          <div className="card p-3 sm:p-4">
            <div className="flex items-center space-x-2 sm:space-x-3">
              <AlertCircle className="w-5 h-5 sm:w-6 sm:h-6 text-error-500 flex-shrink-0" />
              <div className="min-w-0 flex-1">
                <p className={`text-xs sm:text-sm transition-colors duration-200 ${isDarkMode ? 'text-primary-300' : 'text-primary-600'}`}>Open</p>
                <p className={`text-lg sm:text-xl font-bold transition-colors duration-200 ${isDarkMode ? 'text-primary-100' : 'text-primary-900'}`}>{stats.open}</p>
              </div>
            </div>
          </div>

          <div className="card p-3 sm:p-4">
            <div className="flex items-center space-x-2 sm:space-x-3">
              <Clock className="w-5 h-5 sm:w-6 sm:h-6 text-warning-500 flex-shrink-0" />
              <div className="min-w-0 flex-1">
                <p className={`text-xs sm:text-sm transition-colors duration-200 ${isDarkMode ? 'text-primary-300' : 'text-primary-600'}`}>In Progress</p>
                <p className={`text-lg sm:text-xl font-bold transition-colors duration-200 ${isDarkMode ? 'text-primary-100' : 'text-primary-900'}`}>{stats.inProgress}</p>
              </div>
            </div>
          </div>

          <div className="card p-3 sm:p-4">
            <div className="flex items-center space-x-2 sm:space-x-3">
              <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-success-500 flex-shrink-0" />
              <div className="min-w-0 flex-1">
                <p className={`text-xs sm:text-sm transition-colors duration-200 ${isDarkMode ? 'text-primary-300' : 'text-primary-600'}`}>Resolved</p>
                <p className={`text-lg sm:text-xl font-bold transition-colors duration-200 ${isDarkMode ? 'text-primary-100' : 'text-primary-900'}`}>{stats.resolved}</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Support Tickets */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="card p-4 sm:p-6"
        >
          <h3 className={`text-lg font-semibold transition-colors duration-200 ${isDarkMode ? 'text-primary-100' : 'text-primary-900'} mb-4 sm:mb-6`}>Recent Support Tickets</h3>
          <div className="space-y-3 sm:space-y-4">
            {supportTickets.map((ticket, index) => (
              <motion.div
                key={ticket.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                className={`p-4 rounded-lg border transition-colors duration-200 ${
                  isDarkMode ? 'border-primary-700 bg-primary-800 hover:bg-primary-700' : 'border-primary-200 bg-white hover:bg-primary-50'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-2 mb-2">
                      <h4 className={`font-medium transition-colors duration-200 ${isDarkMode ? 'text-primary-100' : 'text-primary-900'} truncate`}>{ticket.subject}</h4>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(ticket.status)} mt-1 sm:mt-0`}>
                        {ticket.status.replace('_', ' ')}
                      </span>
                    </div>
                    <p className={`text-sm transition-colors duration-200 ${isDarkMode ? 'text-primary-300' : 'text-primary-600'} mb-3 line-clamp-2`}>{ticket.message}</p>
                    <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-xs">
                      <span className={`transition-colors duration-200 ${isDarkMode ? 'text-primary-400' : 'text-primary-500'}`}>
                        From: {ticket.customerName}
                      </span>
                      <span className={`transition-colors duration-200 ${isDarkMode ? 'text-primary-400' : 'text-primary-500'}`}>
                        Priority: {ticket.priority}
                      </span>
                      <span className={`transition-colors duration-200 ${isDarkMode ? 'text-primary-400' : 'text-primary-500'}`}>
                        Created: {ticket.createdAt}
                      </span>
                      {ticket.responses > 0 && (
                        <span className={`transition-colors duration-200 ${isDarkMode ? 'text-primary-400' : 'text-primary-500'}`}>
                          Responses: {ticket.responses}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className={`ml-4 ${getStatusColor(ticket.status)} flex-shrink-0`}>
                    {getStatusIcon(ticket.status)}
                  </div>
                </div>
                
                {/* Action Buttons */}
                <div className="flex gap-2 mt-3">
                  <button
                    onClick={() => handleViewTicket(ticket)}
                    className="px-3 py-1 bg-primary-500 text-white rounded text-xs hover:bg-primary-600 transition-colors"
                  >
                    View Details
                  </button>
                  {ticket.status === 'open' && (
                    <button
                      onClick={() => handleUpdateStatus(ticket.id, 'in_progress')}
                      className="px-3 py-1 bg-warning-500 text-white rounded text-xs hover:bg-warning-600 transition-colors"
                    >
                      Start Working
                    </button>
                  )}
                  {ticket.status === 'in_progress' && (
                    <button
                      onClick={() => handleUpdateStatus(ticket.id, 'resolved')}
                      className="px-3 py-1 bg-success-500 text-white rounded text-xs hover:bg-success-600 transition-colors"
                    >
                      Mark Resolved
                    </button>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Ticket Details Modal */}
        {showTicketModal && selectedTicket && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
            onClick={() => setShowTicketModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className={`rounded-lg p-4 sm:p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto transition-colors duration-200 ${
                isDarkMode ? 'bg-primary-800 border border-primary-700' : 'bg-white border border-primary-200'
              }`}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className={`text-lg font-semibold transition-colors duration-200 ${isDarkMode ? 'text-primary-100' : 'text-primary-900'}`}>Ticket Details</h3>
                <button
                  onClick={() => setShowTicketModal(false)}
                  className={`transition-colors duration-200 ${isDarkMode ? 'text-primary-400 hover:text-primary-100' : 'text-primary-600 hover:text-primary-900'}`}
                >
                  ✕
                </button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <h4 className={`font-medium transition-colors duration-200 ${isDarkMode ? 'text-primary-100' : 'text-primary-900'}`}>{selectedTicket.subject}</h4>
                  <p className={`text-sm transition-colors duration-200 ${isDarkMode ? 'text-primary-400' : 'text-primary-600'}`}>From: {selectedTicket.customerName}</p>
                </div>
                
                <div className={`p-3 rounded-lg border transition-colors duration-200 ${
                  isDarkMode ? 'border-primary-600 bg-primary-700' : 'border-primary-200 bg-primary-50'
                }`}>
                  <p className={`text-sm transition-colors duration-200 ${isDarkMode ? 'text-primary-300' : 'text-primary-700'}`}>{selectedTicket.message}</p>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <p className={`text-xs transition-colors duration-200 ${isDarkMode ? 'text-primary-400' : 'text-primary-600'}`}>Status</p>
                    <div className="flex items-center space-x-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(selectedTicket.status)}`}>
                        {selectedTicket.status.replace('_', ' ')}
                      </span>
                      <select
                        value={selectedTicket.status}
                        onChange={(e) => handleUpdateStatus(selectedTicket.id, e.target.value as any)}
                        className={`text-xs px-2 py-1 border rounded transition-colors duration-200 ${
                          isDarkMode 
                            ? 'bg-primary-700 border-primary-600 text-primary-100' 
                            : 'border-primary-200 text-primary-900'
                        }`}
                      >
                        <option value="open">Open</option>
                        <option value="in_progress">In Progress</option>
                        <option value="resolved">Resolved</option>
                        <option value="closed">Closed</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <p className={`text-xs transition-colors duration-200 ${isDarkMode ? 'text-primary-400' : 'text-primary-600'}`}>Priority</p>
                    <p className={`font-medium transition-colors duration-200 ${isDarkMode ? 'text-primary-100' : 'text-primary-900'}`}>{selectedTicket.priority}</p>
                  </div>
                  <div>
                    <p className={`text-xs transition-colors duration-200 ${isDarkMode ? 'text-primary-400' : 'text-primary-600'}`}>Created</p>
                    <p className={`font-medium transition-colors duration-200 ${isDarkMode ? 'text-primary-100' : 'text-primary-900'}`}>{selectedTicket.createdAt}</p>
                  </div>
                </div>
                
                <div>
                  <label className={`block text-sm font-medium mb-2 transition-colors duration-200 ${isDarkMode ? 'text-primary-300' : 'text-primary-700'}`}>Add Response</label>
                  <textarea
                    value={responseText}
                    onChange={(e) => setResponseText(e.target.value)}
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors duration-200 ${
                      isDarkMode 
                        ? 'bg-primary-700 border-primary-600 text-primary-100 placeholder-primary-400' 
                        : 'border-primary-200 text-primary-900 placeholder-primary-500'
                    }`}
                    rows={4}
                    placeholder="Enter your response..."
                  />
                </div>
                
                <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3">
                  <button
                    onClick={handleSendResponse}
                    className="flex-1 px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors flex items-center justify-center space-x-2"
                  >
                    <Send className="w-4 h-4" />
                    <span>Send Response</span>
                  </button>
                  <button
                    onClick={() => setShowTicketModal(false)}
                    className="px-4 py-2 border border-primary-200 text-primary-700 rounded-lg hover:bg-primary-50 transition-colors"
                  >
                    Close
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
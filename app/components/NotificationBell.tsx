'use client'

import { useState, useEffect, useRef } from 'react'
import { Bell, X, CheckCircle, Info, AlertTriangle } from 'lucide-react'
import { notificationService, type Notification } from '../lib/notificationService'

export default function NotificationBell() {
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [isOpen, setIsOpen] = useState(false)
  const [hasUnread, setHasUnread] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Load notifications from service
  useEffect(() => {
    const loadNotifications = () => {
      // Initialize premium notifications by default
      notificationService.initializePremiumNotifications()
      
      const notifs = notificationService.getNotifications()
      console.log('Loaded notifications:', notifs)
      setNotifications(notifs)
    }
    
    loadNotifications()
    
    // Also load after a short delay to ensure localStorage is available
    const timer = setTimeout(loadNotifications, 100)
    return () => clearTimeout(timer)
  }, [])

  // Check for unread notifications
  useEffect(() => {
    const unreadCount = notifications.filter(n => !n.read).length
    console.log('Unread count:', unreadCount)
    setHasUnread(unreadCount > 0)
  }, [notifications])

  // Update notifications when they change
  useEffect(() => {
    const handleStorageChange = () => {
      const notifs = notificationService.getNotifications()
      setNotifications(notifs)
    }

    window.addEventListener('storage', handleStorageChange)
    return () => window.removeEventListener('storage', handleStorageChange)
  }, [])

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const markAsRead = (id: string) => {
    notificationService.markAsRead(id)
    const updatedNotifications = notificationService.getNotifications()
    setNotifications(updatedNotifications)
    console.log('Marked as read, updated notifications:', updatedNotifications)
  }

  const markAllAsRead = () => {
    notificationService.markAllAsRead()
    const updatedNotifications = notificationService.getNotifications()
    setNotifications(updatedNotifications)
    console.log('Marked all as read, updated notifications:', updatedNotifications)
  }

  const removeNotification = (id: string) => {
    notificationService.removeNotification(id)
    const updatedNotifications = notificationService.getNotifications()
    setNotifications(updatedNotifications)
    console.log('Removed notification, updated notifications:', updatedNotifications)
  }

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'success':
        return <CheckCircle className="w-4 h-4 text-green-500" />
      case 'warning':
        return <AlertTriangle className="w-4 h-4 text-yellow-500" />
      default:
        return <Info className="w-4 h-4 text-blue-500" />
    }
  }

  const formatTimestamp = (timestamp: Date) => {
    const now = new Date()
    const diff = now.getTime() - timestamp.getTime()
    const minutes = Math.floor(diff / (1000 * 60))
    const hours = Math.floor(diff / (1000 * 60 * 60))
    const days = Math.floor(diff / (1000 * 60 * 60 * 24))

    if (minutes < 60) return `${minutes}m ago`
    if (hours < 24) return `${hours}h ago`
    return `${days}d ago`
  }

  const unreadCount = notifications.filter(n => !n.read).length

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Notification Bell Button */}
      <button
        onClick={() => {
          console.log('Bell clicked, notifications:', notifications)
          setIsOpen(!isOpen)
        }}
        className="relative bg-white hover:bg-gray-50 text-gray-700 px-3 py-2 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 shadow-sm hover:shadow-md border border-gray-200"
        aria-label="Notifications"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <Bell className="w-4 h-4" />
        
        {/* Notification Badge */}
        {hasUnread && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium notification-pulse">
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </button>

      {/* Mobile backdrop */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40 sm:hidden" onClick={() => setIsOpen(false)}></div>
      )}
      
      {/* Dropdown */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-72 sm:w-80 lg:w-96 bg-white rounded-lg shadow-lg border border-gray-200 z-50 max-h-96 overflow-hidden transform -translate-x-1/2 sm:translate-x-0 sm:right-0 sm:transform-none notification-dropdown">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <h3 className="text-sm font-semibold text-gray-900">Notifications</h3>
            <div className="flex items-center gap-2">
              {unreadCount > 0 && (
                <button
                  onClick={markAllAsRead}
                  className="text-xs text-blue-600 hover:text-blue-700 font-medium"
                >
                  Mark all as read
                </button>
              )}
              <button
                onClick={() => setIsOpen(false)}
                className="sm:hidden text-gray-400 hover:text-gray-600 p-1"
                aria-label="Close notifications"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Notifications List */}
          <div className="max-h-80 overflow-y-auto">
            {notifications.length === 0 ? (
              <div className="p-4 text-center text-gray-500">
                <Bell className="w-8 h-8 mx-auto mb-2 text-gray-300" />
                <p className="text-sm">No notifications yet</p>
              </div>
            ) : (
              <div className="divide-y divide-gray-100">
                {notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`p-4 hover:bg-gray-50 transition-colors ${
                      !notification.read ? 'bg-blue-50' : ''
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-3 flex-1">
                        <div className="flex-shrink-0 mt-0.5">
                          {getNotificationIcon(notification.type)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center space-x-2">
                            <p className="text-sm font-medium text-gray-900">
                              {notification.title}
                            </p>
                            {!notification.read && (
                              <span className="inline-block w-2 h-2 bg-blue-500 rounded-full"></span>
                            )}
                          </div>
                          <p className="text-sm text-gray-600 mt-1">
                            {notification.message}
                          </p>
                          <p className="text-xs text-gray-400 mt-2">
                            {formatTimestamp(notification.timestamp)}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-1">
                        {!notification.read && (
                          <button
                            onClick={() => markAsRead(notification.id)}
                            className="text-xs text-blue-600 hover:text-blue-700"
                            title="Mark as read"
                          >
                            Mark read
                          </button>
                        )}
                        <button
                          onClick={() => removeNotification(notification.id)}
                          className="text-gray-400 hover:text-gray-600 p-1"
                          title="Remove notification"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          {notifications.length > 0 && (
            <div className="p-3 border-t border-gray-200 bg-gray-50">
              <div className="flex justify-between items-center">
                <button
                  onClick={() => {
                    notificationService.clearAllNotifications()
                    setNotifications([])
                  }}
                  className="text-xs text-gray-600 hover:text-gray-800 font-medium"
                >
                  Clear all notifications
                </button>
                <button
                  onClick={() => {
                    notificationService.forceRefreshNotifications()
                    setNotifications(notificationService.getNotifications())
                  }}
                  className="text-xs text-blue-600 hover:text-blue-700 font-medium"
                >
                  Refresh
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
} 
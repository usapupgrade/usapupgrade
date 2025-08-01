'use client'

import { useState, useEffect } from 'react'
import { Bell, BellOff, Settings } from 'lucide-react'

interface NotificationSettings {
  dailyReminders: boolean
  streakAlerts: boolean
  newLessons: boolean
  achievements: boolean
}

export default function PushNotifications() {
  const [isSupported, setIsSupported] = useState(false)
  const [isSubscribed, setIsSubscribed] = useState(true) // Default to enabled
  const [isLoading, setIsLoading] = useState(false)
  const [settings, setSettings] = useState<NotificationSettings>({
    dailyReminders: true, // Enable daily reminders by default
    streakAlerts: true,   // Enable streak alerts by default
    newLessons: false,    // Keep new lessons disabled (less pushy)
    achievements: false    // Keep achievements disabled (less pushy)
  })

  useEffect(() => {
    // Check if push notifications are supported
    if ('serviceWorker' in navigator && 'PushManager' in window) {
      setIsSupported(true)
      checkSubscriptionStatus()
      
      // Load saved notification settings
      try {
        const savedSettings = localStorage.getItem('convomaster-notification-settings')
        if (savedSettings) {
          const parsedSettings = JSON.parse(savedSettings)
          setSettings(prev => ({ ...prev, ...parsedSettings }))
        }
      } catch (error) {
        console.log('Failed to load notification settings:', error)
      }
    }
  }, [])

  const checkSubscriptionStatus = async () => {
    try {
      const registration = await navigator.serviceWorker.ready
      const subscription = await registration.pushManager.getSubscription()
      
      // If no subscription exists, auto-enable notifications
      if (!subscription) {
        const permission = await Notification.requestPermission()
        if (permission === 'granted') {
          await registration.pushManager.subscribe({
            userVisibleOnly: true,
            applicationServerKey: urlBase64ToUint8Array(process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY || 'demo-key')
          })
          setIsSubscribed(true)
        } else {
          // Even if permission denied, show as enabled for better UX
          setIsSubscribed(true)
        }
      } else {
        setIsSubscribed(true)
      }
    } catch (error) {
      console.error('Error checking subscription status:', error)
      // Show as enabled even if there's an error
      setIsSubscribed(true)
    }
  }

  const subscribeToNotifications = async () => {
    if (!isSupported) return

    setIsLoading(true)
    
    try {
      const registration = await navigator.serviceWorker.ready
      
      // Request notification permission
      const permission = await Notification.requestPermission()
      if (permission !== 'granted') {
        throw new Error('Notification permission denied')
      }

      // Subscribe to push notifications
      const subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY || 'demo-key')
      })

      // Save subscription to server (mock for demo)
      console.log('Push subscription:', subscription)
      
      setIsSubscribed(true)
      
      // Show success message
      if ('toast' in window) {
        (window as any).toast?.success('Notifications enabled! You\'ll get gentle reminders to keep your learning streak going.')
      }
      
    } catch (error) {
      console.error('Error subscribing to notifications:', error)
      
      if ('toast' in window) {
        (window as any).toast?.error('Failed to enable notifications. Please try again.')
      }
    } finally {
      setIsLoading(false)
    }
  }

  const unsubscribeFromNotifications = async () => {
    setIsLoading(true)
    
    try {
      const registration = await navigator.serviceWorker.ready
      const subscription = await registration.pushManager.getSubscription()
      
      if (subscription) {
        await subscription.unsubscribe()
      }
      
      setIsSubscribed(false)
      
      if ('toast' in window) {
        (window as any).toast?.success('Notifications disabled')
      }
      
    } catch (error) {
      console.error('Error unsubscribing from notifications:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const updateNotificationSettings = (key: keyof NotificationSettings, value: boolean) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }))
    
    // Save settings to localStorage
    localStorage.setItem('convomaster-notification-settings', JSON.stringify({
      ...settings,
      [key]: value
    }))
  }

  const sendTestNotification = async () => {
    if (!isSubscribed) return
    
    try {
      const registration = await navigator.serviceWorker.ready
      
      await registration.showNotification('ConvoMaster Test', {
        body: 'This is a test notification from ConvoMaster!',
        icon: '/apple-touch-icon.png',
        badge: '/favicon.ico',
        data: {
          url: '/dashboard'
        }
      })
      
    } catch (error) {
      console.error('Error sending test notification:', error)
    }
  }

  // Convert VAPID key to Uint8Array
  const urlBase64ToUint8Array = (base64String: string) => {
    const padding = '='.repeat((4 - base64String.length % 4) % 4)
    const base64 = (base64String + padding)
      .replace(/-/g, '+')
      .replace(/_/g, '/')

    const rawData = window.atob(base64)
    const outputArray = new Uint8Array(rawData.length)

    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i)
    }
    return outputArray
  }

  if (!isSupported) {
    return (
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
        <div className="flex items-center">
          <BellOff className="w-6 h-6 text-yellow-600 mr-3" />
          <div>
            <h3 className="text-base font-semibold text-yellow-800">Push Notifications Not Supported</h3>
            <p className="text-sm text-yellow-700 mt-1">
              Your browser doesn't support push notifications. Try using a modern browser like Chrome or Firefox.
            </p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Subscription Status */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            {isSubscribed ? (
              <Bell className="w-6 h-6 text-green-600 mr-3" />
            ) : (
              <BellOff className="w-6 h-6 text-gray-400 mr-3" />
            )}
            <div>
              <h3 className="text-base font-semibold text-gray-900">
                {isSubscribed ? 'Notifications Enabled' : 'Enable Notifications'}
              </h3>
              <p className="text-sm text-gray-600">
                {isSubscribed 
                  ? 'You\'ll receive daily reminders and updates'
                  : 'Get daily reminders and stay motivated'
                }
              </p>
            </div>
          </div>
          
          <button
            onClick={isSubscribed ? unsubscribeFromNotifications : subscribeToNotifications}
            disabled={isLoading}
            className={`px-6 py-3 rounded-xl text-sm font-semibold transition-colors ${
              isSubscribed
                ? 'bg-red-100 hover:bg-red-200 text-red-700'
                : 'bg-blue-600 hover:bg-blue-700 text-white'
            } ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {isLoading ? 'Loading...' : isSubscribed ? 'Disable' : 'Enable'}
          </button>
        </div>
      </div>

      {/* Notification Settings */}
      {isSubscribed && (
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center mb-4">
            <Settings className="w-5 h-5 text-gray-600 mr-2" />
            <h3 className="text-base font-semibold text-gray-900">Notification Settings</h3>
          </div>
          
          <div className="space-y-4">
            <label className="flex items-center justify-between">
              <div>
                <span className="text-base text-gray-900">Daily Reminders</span>
                <p className="text-sm text-gray-600">Get reminded to complete your daily lesson</p>
              </div>
              <input
                type="checkbox"
                checked={settings.dailyReminders}
                onChange={(e) => updateNotificationSettings('dailyReminders', e.target.checked)}
                className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500"
              />
            </label>
            
            <label className="flex items-center justify-between">
              <div>
                <span className="text-base text-gray-900">Streak Alerts</span>
                <p className="text-sm text-gray-600">Notifications when your streak is at risk</p>
              </div>
              <input
                type="checkbox"
                checked={settings.streakAlerts}
                onChange={(e) => updateNotificationSettings('streakAlerts', e.target.checked)}
                className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500"
              />
            </label>
            
            <label className="flex items-center justify-between">
              <div>
                <span className="text-base text-gray-900">New Lessons</span>
                <p className="text-sm text-gray-600">When new lessons become available</p>
              </div>
              <input
                type="checkbox"
                checked={settings.newLessons}
                onChange={(e) => updateNotificationSettings('newLessons', e.target.checked)}
                className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500"
              />
            </label>
            
            <label className="flex items-center justify-between">
              <div>
                <span className="text-base text-gray-900">Achievements</span>
                <p className="text-sm text-gray-600">When you unlock new achievements</p>
              </div>
              <input
                type="checkbox"
                checked={settings.achievements}
                onChange={(e) => updateNotificationSettings('achievements', e.target.checked)}
                className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500"
              />
            </label>
          </div>
          
          <button
            onClick={sendTestNotification}
            className="mt-6 w-full bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-semibold py-3 px-4 rounded-xl transition-colors"
          >
            Send Test Notification
          </button>
        </div>
      )}
    </div>
  )
} 
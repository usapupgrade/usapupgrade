export interface Notification {
  id: string
  title: string
  message: string
  type: 'info' | 'success' | 'warning'
  timestamp: Date
  read: boolean
}

class NotificationService {
  private storageKey = 'usapupgrade_notifications'

  getNotifications(): Notification[] {
    if (typeof window === 'undefined') return []
    
    try {
      const stored = localStorage.getItem(this.storageKey)
      if (!stored) return this.getDefaultNotifications()
      
      const notifications = JSON.parse(stored)
      return notifications.map((n: any) => ({
        ...n,
        timestamp: new Date(n.timestamp)
      }))
    } catch (error) {
      console.error('Error loading notifications:', error)
      return this.getDefaultNotifications()
    }
  }

  private getDefaultNotifications(): Notification[] {
    return [
      {
        id: '1',
        title: 'Welcome to UsapUpgrade! 🎉',
        message: 'Start your professional conversation journey with 30 free lessons.',
        type: 'success',
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
        read: false
      },
      {
        id: '2',
        title: 'Lesson 5 Completed! 🎯',
        message: 'Great job completing "Professional Body Language and Presence". Keep up the momentum!',
        type: 'success',
        timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
        read: false
      },
      {
        id: '3',
        title: 'Streak Milestone! 🔥',
        message: 'Amazing! You\'ve maintained a 5-day learning streak. Don\'t break the chain!',
        type: 'info',
        timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
        read: false
      },
      {
        id: '4',
        title: 'Upgrade to Premium',
        message: 'Unlock 90+ advanced lessons and exclusive features to accelerate your career growth.',
        type: 'info',
        timestamp: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), // 5 days ago
        read: true
      }
    ]
  }

  saveNotifications(notifications: Notification[]): void {
    if (typeof window === 'undefined') return
    
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(notifications))
    } catch (error) {
      console.error('Error saving notifications:', error)
    }
  }

  addNotification(notification: Omit<Notification, 'id' | 'timestamp' | 'read'>): void {
    const notifications = this.getNotifications()
    const newNotification: Notification = {
      ...notification,
      id: Date.now().toString(),
      timestamp: new Date(),
      read: false
    }
    
    notifications.unshift(newNotification)
    this.saveNotifications(notifications)
  }

  markAsRead(id: string): void {
    const notifications = this.getNotifications()
    const updated = notifications.map(n => 
      n.id === id ? { ...n, read: true } : n
    )
    this.saveNotifications(updated)
  }

  markAllAsRead(): void {
    const notifications = this.getNotifications()
    const updated = notifications.map(n => ({ ...n, read: true }))
    this.saveNotifications(updated)
  }

  removeNotification(id: string): void {
    const notifications = this.getNotifications()
    const updated = notifications.filter(n => n.id !== id)
    this.saveNotifications(updated)
  }

  clearAllNotifications(): void {
    this.saveNotifications([])
  }

  getUnreadCount(): number {
    const notifications = this.getNotifications()
    return notifications.filter(n => !n.read).length
  }

  // Helper method to add common notification types
  addLessonCompletedNotification(lessonNumber: number, lessonTitle: string): void {
    this.addNotification({
      title: 'Lesson Completed! 🎉',
      message: `Great job completing Lesson ${lessonNumber}: ${lessonTitle}. Keep up the momentum!`,
      type: 'success'
    })
  }

  addAchievementUnlockedNotification(achievementTitle: string): void {
    this.addNotification({
      title: 'Achievement Unlocked! 🏆',
      message: `Congratulations! You've earned the "${achievementTitle}" achievement.`,
      type: 'success'
    })
  }

  addStreakNotification(streakDays: number): void {
    this.addNotification({
      title: 'Streak Milestone! 🔥',
      message: `Amazing! You've maintained a ${streakDays}-day learning streak. Don't break the chain!`,
      type: 'info'
    })
  }

  addWeeklyProgressNotification(lessonsCompleted: number): void {
    this.addNotification({
      title: 'Weekly Progress Report',
      message: `You've completed ${lessonsCompleted} lessons this week. Excellent progress!`,
      type: 'info'
    })
  }

  // Initialize notifications for demo users
  initializeDemoNotifications(): void {
    const existingNotifications = this.getNotifications()
    
    // Only initialize if no notifications exist
    if (existingNotifications.length === 0) {
      const demoNotifications = this.getDefaultNotifications()
      this.saveNotifications(demoNotifications)
    }
  }

  // Initialize notifications for premium users
  initializePremiumNotifications(): void {
    const existingNotifications = this.getNotifications()
    
    // Only initialize if no notifications exist
    if (existingNotifications.length === 0) {
      const premiumNotifications: Notification[] = [
        {
          id: '1',
          title: 'Premium Lesson Unlocked! 🎯',
          message: 'Lesson 46: Executive Board Meeting Presentation is now available for premium members.',
          type: 'info' as const,
          timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
          read: false
        },
        {
          id: '2',
          title: 'Achievement Unlocked! 🏆',
          message: 'Congratulations! You\'ve earned the "Executive Speaker" badge for completing advanced lessons.',
          type: 'success' as const,
          timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
          read: false
        },
        {
          id: '3',
          title: 'Premium Progress Update',
          message: 'You\'ve completed 15 premium lessons this month. You\'re on track for the "Premium Master" achievement!',
          type: 'info' as const,
          timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
          read: false
        },
        {
          id: '4',
          title: 'New Premium Content Available',
          message: 'Advanced negotiation strategies and cross-cultural communication modules have been added to your premium curriculum.',
          type: 'info' as const,
          timestamp: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), // 5 days ago
          read: true
        }
      ]
      this.saveNotifications(premiumNotifications)
    }
  }

  // Force refresh notifications (useful for debugging)
  forceRefreshNotifications(): void {
    const notifications = this.getDefaultNotifications()
    this.saveNotifications(notifications)
  }
}

export const notificationService = new NotificationService() 
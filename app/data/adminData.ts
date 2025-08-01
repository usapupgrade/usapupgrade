import { create } from 'zustand'

export interface User {
  id: string
  name: string
  email: string
  subscriptionStatus: 'free' | 'premium'
  totalXp: number
  currentLevel: number
  currentStreak: number
  completedLessons: number
  lastActive: string
  joinedAt: string
}

export interface Notification {
  id: string
  title: string
  message: string
  targetAudience: 'all' | 'free' | 'premium'
  status: 'draft' | 'scheduled' | 'sent'
  scheduledFor?: string
  sentAt?: string
  recipients: number
  openedCount: number
}

export interface Lesson {
  id: string
  title: string
  description: string
  status: 'free' | 'premium'
  xpReward: number
  options: number
}

export interface SupportTicket {
  id: string
  customerName: string
  subject: string
  message: string
  status: 'open' | 'in_progress' | 'resolved' | 'closed'
  priority: 'low' | 'medium' | 'high' | 'urgent'
  createdAt: string
  responses: number
}

export interface PaymentTransaction {
  id: string
  customerName: string
  email: string
  amount: number
  type: 'lifetime'
  status: 'completed' | 'pending' | 'failed'
  date: string
}

export interface AnalyticsData {
  totalUsers: number
  activeUsers: {
    daily: number
    weekly: number
    monthly: number
  }
  revenue: {
    monthly: number
    total: number
    growth: number
  }
  subscriptions: {
    free: number
    premium: number
  }
  conversions: {
    signupToPremium: number
    freeToPaid: number
  }
  retention: {
    day1: number
    day7: number
    day30: number
  }
  lessons: {
    completed: number
    averagePerUser: number
  }
}

interface AdminStore {
  // Users
  users: User[]
  addUser: (user: User) => void
  updateUser: (id: string, updates: Partial<User>) => void
  deleteUser: (id: string) => void
  getUserStats: () => {
    total: number
    free: number
    premium: number
    active: number
  }

  // Notifications
  notifications: Notification[]
  addNotification: (notification: Notification) => void
  updateNotification: (id: string, updates: Partial<Notification>) => void
  deleteNotification: (id: string) => void
  getNotificationStats: () => {
    total: number
    sent: number
    scheduled: number
    draft: number
  }

  // Lessons
  lessons: Lesson[]
  addLesson: (lesson: Lesson) => void
  updateLesson: (id: string, updates: Partial<Lesson>) => void
  deleteLesson: (id: string) => void
  getLessonStats: () => {
    total: number
    free: number
    premium: number
    draft: number
  }

  // Support Tickets
  supportTickets: SupportTicket[]
  addTicket: (ticket: SupportTicket) => void
  updateTicketStatus: (id: string, status: 'open' | 'in_progress' | 'resolved' | 'closed') => void
  addTicketResponse: (id: string, response: string) => void
  getSupportStats: () => {
    total: number
    open: number
    inProgress: number
    resolved: number
  }

  // Revenue
  revenueData: PaymentTransaction[]
  getRevenueStats: () => {
    totalRevenue: number
    monthlyRevenue: number
    revenueGrowth: number
    activeSubscriptions: number
    conversionRate: number
    conversionGrowth: number
    averageOrderValue: number
    aovGrowth: number
  }
  getPaymentTransactions: () => PaymentTransaction[]

  // Analytics (computed from users and notifications)
  getAnalytics: () => AnalyticsData
  getRevenueData: () => Array<{ month: string; revenue: number }>
  getUserGrowthData: () => Array<{ month: string; users: number }>
  getSubscriptionData: () => Array<{ name: string; value: number; color: string }>

  // Actions
  sendMessageToUser: (userId: string, message: string) => void
  updateUserActivity: (userId: string, activity: string) => void
  updateUserSubscription: (userId: string, status: 'free' | 'premium') => void
}

// Initial mock data
const initialUsers: User[] = [
  {
    id: '1',
    name: 'Sarah Chen',
    email: 'sarah.chen@email.com',
    subscriptionStatus: 'premium',
    totalXp: 1250,
    currentLevel: 8,
    currentStreak: 12,
    completedLessons: 45,
    lastActive: '2 hours ago',
    joinedAt: '2024-01-15'
  },
  {
    id: '2',
    name: 'Marcus Rodriguez',
    email: 'marcus.r@email.com',
    subscriptionStatus: 'free',
    totalXp: 680,
    currentLevel: 5,
    currentStreak: 7,
    completedLessons: 28,
    lastActive: '1 day ago',
    joinedAt: '2024-01-20'
  },
  {
    id: '3',
    name: 'Emma Thompson',
    email: 'emma.t@email.com',
    subscriptionStatus: 'premium',
    totalXp: 2100,
    currentLevel: 12,
    currentStreak: 25,
    completedLessons: 78,
    lastActive: '30 minutes ago',
    joinedAt: '2024-01-10'
  },
  {
    id: '4',
    name: 'David Kim',
    email: 'david.kim@email.com',
    subscriptionStatus: 'free',
    totalXp: 320,
    currentLevel: 3,
    currentStreak: 2,
    completedLessons: 12,
    lastActive: '3 days ago',
    joinedAt: '2024-01-25'
  },
  {
    id: '5',
    name: 'Lisa Wang',
    email: 'lisa.wang@email.com',
    subscriptionStatus: 'premium',
    totalXp: 3500,
    currentLevel: 18,
    currentStreak: 45,
    completedLessons: 120,
    lastActive: '1 hour ago',
    joinedAt: '2024-01-05'
  }
]

const initialNotifications: Notification[] = [
  {
    id: '1',
    title: 'New Premium Features Available',
    message: 'Unlock advanced conversation scenarios and personalized learning paths with our new premium features!',
    targetAudience: 'free',
    status: 'sent',
    sentAt: '2024-01-15 10:30',
    recipients: 8900,
    openedCount: 2340
  },
  {
    id: '2',
    title: 'Weekly Progress Reminder',
    message: 'Don\'t break your streak! Complete today\'s lesson to maintain your learning momentum.',
    targetAudience: 'all',
    status: 'scheduled',
    scheduledFor: '2024-01-20 09:00',
    recipients: 12450,
    openedCount: 0
  },
  {
    id: '3',
    title: 'Premium Upgrade Special',
    message: 'Limited time offer: 50% off premium subscription for the first month!',
    targetAudience: 'free',
    status: 'draft',
    recipients: 8900,
    openedCount: 0
  }
]

const initialLessons: Lesson[] = [
  {
    id: '1',
    title: 'Why Professional Conversations Matter in Filipino Culture',
    description: 'Office orientation session',
    status: 'free',
    xpReward: 10,
    options: 3
  },
  {
    id: '2',
    title: 'Understanding Filipino Corporate Hierarchy and Respect',
    description: 'Team meeting with mixed seniority levels',
    status: 'free',
    xpReward: 10,
    options: 3
  },
  {
    id: '3',
    title: 'Overcoming "Hiya" in Office Environments',
    description: 'Department presentation opportunity',
    status: 'free',
    xpReward: 10,
    options: 3
  },
  {
    id: '4',
    title: 'Professional Body Language and Presence',
    description: 'Client meeting preparation',
    status: 'premium',
    xpReward: 15,
    options: 4
  },
  {
    id: '5',
    title: 'Eye Contact in Filipino Business Culture',
    description: 'Interview skills workshop',
    status: 'premium',
    xpReward: 15,
    options: 4
  },
  {
    id: '6',
    title: 'Voice Tone for Authority and Warmth',
    description: 'Leadership communication training',
    status: 'premium',
    xpReward: 15,
    options: 4
  },
  {
    id: '7',
    title: 'Building Trust Through Cultural Sensitivity',
    description: 'Cross-cultural team building',
    status: 'premium',
    xpReward: 20,
    options: 5
  },
  {
    id: '8',
    title: 'Handling Difficult Conversations Respectfully',
    description: 'Conflict resolution workshop',
    status: 'premium',
    xpReward: 20,
    options: 5
  },
  {
    id: '9',
    title: 'Networking in Filipino Professional Circles',
    description: 'Industry networking event',
    status: 'premium',
    xpReward: 20,
    options: 5
  }
]

const initialSupportTickets: SupportTicket[] = [
  {
    id: '1',
    customerName: 'Sarah Chen',
    subject: 'Cannot access premium lessons',
    message: 'I upgraded to premium but I still cannot access lessons 31+. Please help me resolve this issue.',
    status: 'open',
    priority: 'high',
    createdAt: '2024-01-15T10:30:00Z',
    responses: 0
  },
  {
    id: '2',
    customerName: 'Marcus Rodriguez',
    subject: 'Payment not processed',
    message: 'I tried to pay for premium but the payment failed. My card was charged but I did not get access.',
    status: 'in_progress',
    priority: 'urgent',
    createdAt: '2024-01-16T14:20:00Z',
    responses: 1
  },
  {
    id: '3',
    customerName: 'Emma Thompson',
    subject: 'Streak counter not updating',
    message: 'I completed my lesson today but my streak counter did not update. This is affecting my motivation.',
    status: 'resolved',
    priority: 'medium',
    createdAt: '2024-01-17T09:15:00Z',
    responses: 2
  }
]

const initialRevenueData: PaymentTransaction[] = [
  {
    id: 'PAY-001',
    customerName: 'Sarah Chen',
    email: 'sarah.chen@email.com',
    amount: 1599,
    type: 'lifetime',
    status: 'completed',
    date: '2024-01-15'
  },
  {
    id: 'PAY-002',
    customerName: 'Marcus Rodriguez',
    email: 'marcus.r@email.com',
    amount: 1599,
    type: 'lifetime',
    status: 'completed',
    date: '2024-01-16'
  },
  {
    id: 'PAY-003',
    customerName: 'Emma Thompson',
    email: 'emma.t@email.com',
    amount: 1599,
    type: 'lifetime',
    status: 'completed',
    date: '2024-01-17'
  },
  {
    id: 'PAY-004',
    customerName: 'David Kim',
    email: 'david.kim@email.com',
    amount: 1599,
    type: 'lifetime',
    status: 'pending',
    date: '2024-01-18'
  },
  {
    id: 'PAY-005',
    customerName: 'Lisa Wang',
    email: 'lisa.wang@email.com',
    amount: 1599,
    type: 'lifetime',
    status: 'completed',
    date: '2024-01-19'
  }
]

export const useAdminStore = create<AdminStore>((set, get) => ({
  users: initialUsers,
  notifications: initialNotifications,
  lessons: initialLessons,
  supportTickets: initialSupportTickets,
  revenueData: initialRevenueData,

  // User actions
  addUser: (user) => set((state) => ({ users: [...state.users, user] })),
  
  updateUser: (id, updates) => set((state) => ({
    users: state.users.map(user => 
      user.id === id ? { ...user, ...updates } : user
    )
  })),
  
  deleteUser: (id) => set((state) => ({
    users: state.users.filter(user => user.id !== id)
  })),

  getUserStats: () => {
    const { users } = get()
    return {
      total: users.length,
      free: users.filter(u => u.subscriptionStatus === 'free').length,
      premium: users.filter(u => u.subscriptionStatus === 'premium').length,
      active: users.filter(u => u.lastActive.includes('hour') || u.lastActive.includes('minute')).length
    }
  },

  // Notification actions
  addNotification: (notification) => set((state) => ({ 
    notifications: [notification, ...state.notifications] 
  })),
  
  updateNotification: (id, updates) => set((state) => ({
    notifications: state.notifications.map(notification => 
      notification.id === id ? { ...notification, ...updates } : notification
    )
  })),
  
  deleteNotification: (id) => set((state) => ({
    notifications: state.notifications.filter(notification => notification.id !== id)
  })),

  getNotificationStats: () => {
    const { notifications } = get()
    return {
      total: notifications.length,
      sent: notifications.filter(n => n.status === 'sent').length,
      scheduled: notifications.filter(n => n.status === 'scheduled').length,
      draft: notifications.filter(n => n.status === 'draft').length
    }
  },

  // Analytics (computed from real data)
  getAnalytics: () => {
    const { users } = get()
    const stats = get().getUserStats()
    
    // Calculate analytics from real user data
    const totalXp = users.reduce((sum, user) => sum + user.totalXp, 0)
    const totalLessons = users.reduce((sum, user) => sum + user.completedLessons, 0)
    const premiumUsers = users.filter(u => u.subscriptionStatus === 'premium')
    const freeUsers = users.filter(u => u.subscriptionStatus === 'free')
    
    // Calculate revenue based on premium users (simplified)
    const monthlyRevenue = premiumUsers.length * 15.99 // $15.99 per premium user
    const totalRevenue = monthlyRevenue * 6 // 6 months
    
    return {
      totalUsers: stats.total,
      activeUsers: {
        daily: stats.active,
        weekly: Math.floor(stats.active * 2.5), // Estimate
        monthly: Math.floor(stats.active * 3.5) // Estimate
      },
      revenue: {
        monthly: monthlyRevenue,
        total: totalRevenue,
        growth: 23.5 // Mock growth rate
      },
      subscriptions: {
        free: stats.free,
        premium: stats.premium
      },
      conversions: {
        signupToPremium: stats.premium > 0 ? ((stats.premium / stats.total) * 100) : 0,
        freeToPaid: stats.free > 0 ? ((stats.premium / (stats.free + stats.premium)) * 100) : 0
      },
      retention: {
        day1: 78.5, // Mock retention rates
        day7: 45.2,
        day30: 28.7
      },
      lessons: {
        completed: totalLessons,
        averagePerUser: stats.total > 0 ? Math.round(totalLessons / stats.total) : 0
      }
    }
  },

  getRevenueData: () => {
    const { users } = get()
    const premiumUsers = users.filter(u => u.subscriptionStatus === 'premium').length
    const monthlyRevenue = premiumUsers * 15.99
    
    return [
      { month: 'Jan', revenue: monthlyRevenue * 0.8 },
      { month: 'Feb', revenue: monthlyRevenue * 0.85 },
      { month: 'Mar', revenue: monthlyRevenue * 0.9 },
      { month: 'Apr', revenue: monthlyRevenue * 0.95 },
      { month: 'May', revenue: monthlyRevenue * 0.98 },
      { month: 'Jun', revenue: monthlyRevenue }
    ]
  },

  getUserGrowthData: () => {
    const { users } = get()
    const totalUsers = users.length
    
    return [
      { month: 'Jan', users: Math.floor(totalUsers * 0.7) },
      { month: 'Feb', users: Math.floor(totalUsers * 0.75) },
      { month: 'Mar', users: Math.floor(totalUsers * 0.8) },
      { month: 'Apr', users: Math.floor(totalUsers * 0.85) },
      { month: 'May', users: Math.floor(totalUsers * 0.9) },
      { month: 'Jun', users: totalUsers }
    ]
  },

  getSubscriptionData: () => {
    const stats = get().getUserStats()
    return [
      { name: 'Free', value: stats.free, color: '#94a3b8' },
      { name: 'Premium', value: stats.premium, color: '#f2750a' }
    ]
  },

  // Action handlers
  sendMessageToUser: (userId, message) => {
    // In a real app, this would send to a messaging service
    console.log(`Message sent to user ${userId}: ${message}`)
    
    // Update user's last activity
    get().updateUser(userId, { lastActive: 'Just now' })
  },

  updateUserActivity: (userId, activity) => {
    get().updateUser(userId, { lastActive: activity })
  },

  updateUserSubscription: (userId, status) => {
    get().updateUser(userId, { subscriptionStatus: status })
  },

  // Lesson actions
  addLesson: (lesson) => set((state) => ({ 
    lessons: [...state.lessons, lesson] 
  })),
  
  updateLesson: (id, updates) => set((state) => ({
    lessons: state.lessons.map(lesson => 
      lesson.id === id ? { ...lesson, ...updates } : lesson
    )
  })),
  
  deleteLesson: (id) => set((state) => ({
    lessons: state.lessons.filter(lesson => lesson.id !== id)
  })),

  getLessonStats: () => {
    const { lessons } = get()
    return {
      total: lessons.length,
      free: lessons.filter(l => l.status === 'free').length,
      premium: lessons.filter(l => l.status === 'premium').length,
      draft: 0 // No draft lessons in current data
    }
  },

  // Support ticket actions
  addTicket: (ticket) => set((state) => ({ 
    supportTickets: [ticket, ...state.supportTickets] 
  })),
  
  updateTicketStatus: (id, status) => set((state) => ({
    supportTickets: state.supportTickets.map(ticket => 
      ticket.id === id ? { ...ticket, status } : ticket
    )
  })),
  
  addTicketResponse: (id, response) => set((state) => ({
    supportTickets: state.supportTickets.map(ticket => 
      ticket.id === id ? { ...ticket, responses: ticket.responses + 1 } : ticket
    )
  })),

  getSupportStats: () => {
    const { supportTickets } = get()
    return {
      total: supportTickets.length,
      open: supportTickets.filter(t => t.status === 'open').length,
      inProgress: supportTickets.filter(t => t.status === 'in_progress').length,
      resolved: supportTickets.filter(t => t.status === 'resolved').length
    }
  },

  // Revenue actions
  getRevenueStats: () => {
    const { revenueData, users } = get()
    const completedPayments = revenueData.filter(p => p.status === 'completed')
    const totalRevenue = completedPayments.reduce((sum, p) => sum + p.amount, 0)
    const monthlyRevenue = totalRevenue / 6 // Simplified calculation
    const premiumUsers = users.filter(u => u.subscriptionStatus === 'premium').length
    
    return {
      totalRevenue,
      monthlyRevenue,
      revenueGrowth: 23.5, // Mock growth rate
      activeSubscriptions: premiumUsers,
      conversionRate: users.length > 0 ? ((premiumUsers / users.length) * 100) : 0,
      conversionGrowth: 2.3, // Mock growth rate
      averageOrderValue: completedPayments.length > 0 ? totalRevenue / completedPayments.length : 0,
      aovGrowth: 8.5 // Mock growth rate
    }
  },

  getPaymentTransactions: () => {
    const { revenueData } = get()
    return revenueData
  }
})) 
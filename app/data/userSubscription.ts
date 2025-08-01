export interface UserSubscription {
  userId: string
  isPremium: boolean
  subscriptionType: 'free' | 'premium'
  purchaseDate?: string
  expiresAt?: string
  paymentMethod?: string
}

// Mock user subscription data
export let mockUserSubscription: UserSubscription = {
  userId: 'demo-user-123',
  isPremium: true,
  subscriptionType: 'premium'
}

// Check if user has premium access
export const hasPremiumAccess = (): boolean => {
  return mockUserSubscription.isPremium
}

// Check if lesson is premium
export const isPremiumLesson = (lessonNumber: number): boolean => {
  return lessonNumber > 30
}

// Check if user can access lesson
export const canAccessLesson = (lessonNumber: number): boolean => {
  if (isPremiumLesson(lessonNumber)) {
    return hasPremiumAccess()
  }
  return true
}

// Upgrade user to premium (for demo)
export const upgradeToPremium = () => {
  mockUserSubscription.isPremium = true
  mockUserSubscription.subscriptionType = 'premium'
  mockUserSubscription.purchaseDate = new Date().toISOString()
  mockUserSubscription.paymentMethod = 'PayMongo'
  
  // Save to localStorage for demo
  if (typeof window !== 'undefined') {
    localStorage.setItem('convomaster-user-subscription', JSON.stringify(mockUserSubscription))
  }
}

// Load subscription from localStorage
export const loadUserSubscription = (): UserSubscription => {
  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem('convomaster-user-subscription')
    if (saved) {
      return JSON.parse(saved)
    }
  }
  return mockUserSubscription
}

// Initialize subscription
mockUserSubscription = loadUserSubscription() 
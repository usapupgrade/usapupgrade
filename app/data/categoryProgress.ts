export interface UserProgress {
  userId: string
  currentLesson: number
  completedLessons: number[]
  totalXP: number
  streak: number
  lastActivity: string
}

// Load progress from localStorage or use default
const loadUserProgress = (): UserProgress => {
  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem('convomaster-user-progress')
    if (saved) {
      return JSON.parse(saved)
    }
  }
  
  return {
    userId: '',
    currentLesson: 1,
    completedLessons: [],
    totalXP: 0,
    streak: 0,
    lastActivity: new Date().toISOString()
  }
}

// Save progress to localStorage
const saveUserProgress = (progress: UserProgress) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('convomaster-user-progress', JSON.stringify(progress))
  }
}

export const mockUserProgress: UserProgress = {
  userId: '',
  currentLesson: 1,
  completedLessons: [],
  totalXP: 0,
  streak: 0,
  lastActivity: new Date().toISOString()
}

export const updateUserProgress = (lessonNumber: number, xpEarned: number) => {
  if (!mockUserProgress.completedLessons.includes(lessonNumber)) {
    mockUserProgress.completedLessons.push(lessonNumber)
    mockUserProgress.totalXP += xpEarned
    mockUserProgress.currentLesson = lessonNumber + 1
    mockUserProgress.lastActivity = new Date().toISOString()
    
    // Update streak logic
    const today = new Date().toDateString()
    const lastActivity = new Date(mockUserProgress.lastActivity).toDateString()
    
    if (lastActivity === today) {
      // Already completed today, maintain streak
    } else {
      const yesterday = new Date()
      yesterday.setDate(yesterday.getDate() - 1)
      
      if (lastActivity === yesterday.toDateString()) {
        mockUserProgress.streak += 1
      } else {
        mockUserProgress.streak = 1
      }
    }
    
    // Save to localStorage
    saveUserProgress(mockUserProgress)
  }
}

// Helper functions for linear progress
export const getProgressPercentage = (): number => {
  const totalLessons = 120
  return Math.round((mockUserProgress.completedLessons.length / totalLessons) * 100)
}

export const getCurrentLesson = (): number => {
  return mockUserProgress.currentLesson
}

export const getCompletedLessons = (): number[] => {
  return mockUserProgress.completedLessons
}

export const getTotalXP = (): number => {
  return mockUserProgress.totalXP
}

export const getStreak = (): number => {
  return mockUserProgress.streak
}

export const isLessonCompleted = (lessonNumber: number): boolean => {
  return mockUserProgress.completedLessons.includes(lessonNumber)
}

export const getNextLesson = (currentLesson: number): number | null => {
  return currentLesson < 120 ? currentLesson + 1 : null
}

export const getPreviousLesson = (currentLesson: number): number | null => {
  return currentLesson > 1 ? currentLesson - 1 : null
}

// Reset function for testing
export const resetProgress = () => {
  const defaultProgress: UserProgress = {
    userId: 'demo-user-123',
    currentLesson: 1,
    completedLessons: [],
    totalXP: 0,
    streak: 0,
    lastActivity: new Date().toISOString()
  }
  
  Object.assign(mockUserProgress, defaultProgress)
  saveUserProgress(mockUserProgress)
}

// Mock completion for testing certificate system
export const mockCompleteAllLessons = () => {
  const completedLessons = Array.from({ length: 120 }, (_, i) => i + 1)
  const testProgress: UserProgress = {
    userId: 'demo-user-123',
    currentLesson: 121,
    completedLessons,
    totalXP: 15420,
    streak: 45,
    lastActivity: new Date().toISOString()
  }
  
  Object.assign(mockUserProgress, testProgress)
  saveUserProgress(mockUserProgress)
} 
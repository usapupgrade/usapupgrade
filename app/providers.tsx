'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { supabase } from '@/lib/supabase'
import { User as SupabaseUser, Session } from '@supabase/supabase-js'

// User interface
interface User {
  id: string
  email: string
  name: string
  avatar_url?: string
  subscription_status: 'free' | 'premium' | 'lifetime'
  
  // Trial system fields
  expires_at?: string
  is_expired: boolean
  re_registration_count: number
  
  // Progress tracking fields
  total_xp: number
  current_level: number
  current_streak: number
  longest_streak: number
  current_lesson: number
  completed_lessons: number[]
  
  // User preferences
  primary_goal: string
  experience_level: string
  daily_time_commitment: string
  
  // Certification fields
  certification_first_name?: string
  certification_last_name?: string
  certification_name_updated_at?: string
  
  // Google OAuth fields
  google_id?: string
}

interface UserContextType {
  user: User | null
  loading: boolean
  signIn: (email: string, password: string) => Promise<{ success: boolean; error?: string }>
  signInWithGoogle: () => Promise<{ success: boolean; error?: string }>
  signUp: (email: string, password: string, name: string) => Promise<{ success: boolean; error?: string }>
  signOut: () => Promise<void>
  updateUser: (updates: Partial<User>) => Promise<{ success: boolean; error?: string }>
  resetPassword: (email: string) => Promise<{ success: boolean; error?: string }>
  
  // Trial system functions
  checkAccountStatus: (user: User) => 'ACTIVE' | 'EXPIRED' | 'NEAR_EXPIRY'
  checkLessonAccess: (user: User, lessonNumber: number) => 'ACCESS_GRANTED' | 'ACCOUNT_EXPIRED' | 'PAYMENT_REQUIRED'
  getDaysLeft: (user: User) => number
}

const UserContext = createContext<UserContextType | undefined>(undefined)

export function useUser() {
  const context = useContext(UserContext)
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider')
  }
  return context
}

function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  // Fetch user profile from database
  const fetchUserProfile = async (supabaseUser: SupabaseUser): Promise<User | null> => {
    try {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', supabaseUser.id)
        .single()

      if (error) {
        console.error('Error fetching user profile:', error)
        return null
      }

      return data
    } catch (error) {
      console.error('Error fetching user profile:', error)
      return null
    }
  }

  // Create user profile in database
  const createUserProfile = async (supabaseUser: SupabaseUser, name: string): Promise<User | null> => {
    try {
      const { data, error } = await supabase
        .from('users')
        .insert({
          id: supabaseUser.id,
          email: supabaseUser.email!,
          name: name,
          avatar_url: supabaseUser.user_metadata?.avatar_url,
          google_id: supabaseUser.user_metadata?.sub,
          subscription_status: 'free',
          expires_at: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(), // 30 days trial
          is_expired: false,
          re_registration_count: 0,
          total_xp: 0,
          current_level: 1,
          current_streak: 0,
          longest_streak: 0,
          current_lesson: 1,
          completed_lessons: [],
          primary_goal: 'small_talk',
          experience_level: 'beginner',
          daily_time_commitment: '5_minutes'
        })
        .select()
        .single()

      if (error) {
        console.error('Error creating user profile:', error)
        return null
      }

      return data
    } catch (error) {
      console.error('Error creating user profile:', error)
      return null
    }
  }

  // Handle authentication state changes
  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('Auth state changed:', event, session?.user?.id)
        
        if (session?.user) {
          // User is signed in
          let userProfile = await fetchUserProfile(session.user)
          
          if (!userProfile) {
            // Create new user profile if it doesn't exist
            userProfile = await createUserProfile(session.user, session.user.user_metadata?.full_name || session.user.email?.split('@')[0] || 'User')
          }
          
          setUser(userProfile)
        } else {
          // User is signed out
          setUser(null)
        }
        
        setLoading(false)
      }
    )

    return () => subscription.unsubscribe()
  }, [])

  const signIn = async (email: string, password: string) => {
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) {
        return { success: false, error: error.message }
      }

      return { success: true }
    } catch (error) {
      return { success: false, error: 'An unexpected error occurred' }
    }
  }

  const signInWithGoogle = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth/callback`
        }
      })

      if (error) {
        return { success: false, error: error.message }
      }

      return { success: true }
    } catch (error) {
      return { success: false, error: 'An unexpected error occurred' }
    }
  }

  const signUp = async (email: string, password: string, name: string) => {
    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: name,
          }
        }
      })

      if (error) {
        return { success: false, error: error.message }
      }

      return { success: true }
    } catch (error) {
      return { success: false, error: 'An unexpected error occurred' }
    }
  }

  const signOut = async () => {
    try {
      await supabase.auth.signOut()
      setUser(null)
    } catch (error) {
      console.error('Error signing out:', error)
    }
  }

  const updateUser = async (updates: Partial<User>) => {
    if (!user) {
      return { success: false, error: 'No user logged in' }
    }

    try {
      const { error } = await supabase
        .from('users')
        .update(updates)
        .eq('id', user.id)

      if (error) {
        return { success: false, error: error.message }
      }

      // Update local state
      setUser(prev => prev ? { ...prev, ...updates } : null)
      return { success: true }
    } catch (error) {
      return { success: false, error: 'An unexpected error occurred' }
    }
  }

  const resetPassword = async (email: string) => {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth/reset-password`,
      })

      if (error) {
        return { success: false, error: error.message }
      }

      return { success: true }
    } catch (error) {
      return { success: false, error: 'An unexpected error occurred' }
    }
  }

  // Trial system functions
  const checkAccountStatus = (user: User): 'ACTIVE' | 'EXPIRED' | 'NEAR_EXPIRY' => {
    if (user.subscription_status !== 'free') return 'ACTIVE'
    
    if (!user.expires_at) return 'ACTIVE'
    
    const now = new Date()
    const expiryDate = new Date(user.expires_at)
    const daysLeft = Math.ceil((expiryDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))
    
    if (daysLeft <= 0) return 'EXPIRED'
    if (daysLeft <= 10) return 'NEAR_EXPIRY'
    return 'ACTIVE'
  }

  const checkLessonAccess = (user: User, lessonNumber: number): 'ACCESS_GRANTED' | 'ACCOUNT_EXPIRED' | 'PAYMENT_REQUIRED' => {
    // First check if account expired
    if (user.subscription_status === 'free' && user.expires_at && new Date() > new Date(user.expires_at)) {
      return 'ACCOUNT_EXPIRED'
    }
    
    // Then check lesson access
    if (lessonNumber >= 31 && user.subscription_status === 'free') {
      return 'PAYMENT_REQUIRED'
    }
    
    return 'ACCESS_GRANTED'
  }

  const getDaysLeft = (user: User): number => {
    if (user.subscription_status !== 'free' || !user.expires_at) return 999
    
    const now = new Date()
    const expiryDate = new Date(user.expires_at)
    return Math.ceil((expiryDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))
  }

  const value = {
    user,
    loading,
    signIn,
    signInWithGoogle,
    signUp,
    signOut,
    updateUser,
    resetPassword,
    checkAccountStatus,
    checkLessonAccess,
    getDaysLeft,
  }

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  )
}

// Analytics context
interface AnalyticsContextType {
  trackEvent: (eventType: string, eventData?: Record<string, any>) => void
}

const AnalyticsContext = createContext<AnalyticsContextType | undefined>(undefined)

export function useAnalytics() {
  const context = useContext(AnalyticsContext)
  if (context === undefined) {
    throw new Error('useAnalytics must be used within an AnalyticsProvider')
  }
  return context
}

function AnalyticsProvider({ children }: { children: ReactNode }) {
  const trackEvent = async (eventType: string, eventData?: Record<string, any>) => {
    try {
      // Send analytics to Supabase
      const { error } = await supabase
        .from('analytics_events')
        .insert({
          event_type: eventType,
          event_data: eventData,
          session_id: Math.random().toString(36).substring(7),
          user_agent: navigator.userAgent,
        })

      if (error) {
        console.error('Error tracking analytics:', error)
      }
    } catch (error) {
      console.error('Error tracking analytics:', error)
    }
  }

  return (
    <AnalyticsContext.Provider value={{ trackEvent }}>
      {children}
    </AnalyticsContext.Provider>
  )
}

interface DarkModeContextType {
  isDarkMode: boolean
  toggleDarkMode: () => void
}

const DarkModeContext = createContext<DarkModeContextType | undefined>(undefined)

export function DarkModeProvider({ children }: { children: React.ReactNode }) {
  const [isDarkMode, setIsDarkMode] = useState(false)

  useEffect(() => {
    // Check for saved dark mode preference or default to system preference
    const savedMode = localStorage.getItem('darkMode')
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    
    if (savedMode !== null) {
      setIsDarkMode(savedMode === 'true')
    } else {
      setIsDarkMode(systemPrefersDark)
    }
  }, [])

  useEffect(() => {
    // Apply dark mode class to document
    if (isDarkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
    
    // Save preference to localStorage
    localStorage.setItem('darkMode', isDarkMode.toString())
  }, [isDarkMode])

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode)
  }

  return (
    <DarkModeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  )
}

export function useDarkMode() {
  const context = useContext(DarkModeContext)
  if (context === undefined) {
    throw new Error('useDarkMode must be used within a DarkModeProvider')
  }
  return context
}

export function Providers({ children }: { children: ReactNode }) {
  return (
    <UserProvider>
      <AnalyticsProvider>
        <DarkModeProvider>
          {children}
        </DarkModeProvider>
      </AnalyticsProvider>
    </UserProvider>
  )
} 
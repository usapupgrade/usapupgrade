import { supabase } from './supabase'

export interface LocalStorageData {
  user?: {
    id: string
    email: string
    name: string
    subscription_status: 'free' | 'premium' | 'lifetime'
    expires_at?: string
    is_expired: boolean
    re_registration_count: number
    total_xp: number
    current_level: number
    current_streak: number
    longest_streak: number
    primary_goal: string
    experience_level: string
    daily_time_commitment: string
  }
  progress?: {
    [lessonId: string]: {
      completed: boolean
      xp_earned: number
      completed_at: string
    }
  }
  achievements?: string[]
}

export class DataMigration {
  /**
   * Migrate localStorage data to Supabase database
   */
  static async migrateFromLocalStorage(): Promise<{ success: boolean; error?: string }> {
    try {
      // Get current user
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        return { success: false, error: 'No authenticated user found' }
      }

      // Get localStorage data
      const localStorageData = this.getLocalStorageData()
      if (!localStorageData) {
        return { success: false, error: 'No localStorage data found to migrate' }
      }

      // Migrate user profile
      if (localStorageData.user) {
        const userResult = await this.migrateUserProfile(user.id, localStorageData.user)
        if (!userResult.success) {
          return userResult
        }
      }

      // Migrate progress data
      if (localStorageData.progress) {
        const progressResult = await this.migrateProgressData(user.id, localStorageData.progress)
        if (!progressResult.success) {
          return progressResult
        }
      }

      // Migrate achievements
      if (localStorageData.achievements) {
        const achievementsResult = await this.migrateAchievements(user.id, localStorageData.achievements)
        if (!achievementsResult.success) {
          return achievementsResult
        }
      }

      // Clear localStorage data after successful migration
      this.clearLocalStorageData()

      return { success: true }
    } catch (error) {
      console.error('Migration error:', error)
      return { success: false, error: 'Migration failed' }
    }
  }

  /**
   * Get localStorage data
   */
  private static getLocalStorageData(): LocalStorageData | null {
    try {
      const userData = localStorage.getItem('usapupgrade_user')
      const progressData = localStorage.getItem('usapupgrade_progress')
      const achievementsData = localStorage.getItem('usapupgrade_achievements')

      if (!userData && !progressData && !achievementsData) {
        return null
      }

      return {
        user: userData ? JSON.parse(userData) : undefined,
        progress: progressData ? JSON.parse(progressData) : undefined,
        achievements: achievementsData ? JSON.parse(achievementsData) : undefined
      }
    } catch (error) {
      console.error('Error reading localStorage data:', error)
      return null
    }
  }

  /**
   * Migrate user profile data
   */
  private static async migrateUserProfile(userId: string, userData: any): Promise<{ success: boolean; error?: string }> {
    try {
      const { error } = await supabase
        .from('users')
        .upsert({
          id: userId,
          email: userData.email,
          name: userData.name,
          subscription_status: userData.subscription_status || 'free',
          expires_at: userData.expires_at,
          is_expired: userData.is_expired || false,
          re_registration_count: userData.re_registration_count || 0,
          total_xp: userData.total_xp || 0,
          current_level: userData.current_level || 1,
          current_streak: userData.current_streak || 0,
          longest_streak: userData.longest_streak || 0,
          primary_goal: userData.primary_goal || 'small_talk',
          experience_level: userData.experience_level || 'beginner',
          daily_time_commitment: userData.daily_time_commitment || '5_minutes'
        })

      if (error) {
        console.error('Error migrating user profile:', error)
        return { success: false, error: error.message }
      }

      return { success: true }
    } catch (error) {
      console.error('Error migrating user profile:', error)
      return { success: false, error: 'Failed to migrate user profile' }
    }
  }

  /**
   * Migrate progress data
   */
  private static async migrateProgressData(userId: string, progressData: any): Promise<{ success: boolean; error?: string }> {
    try {
      const progressEntries = Object.entries(progressData).map(([lessonId, data]: [string, any]) => ({
        user_id: userId,
        lesson_id: lessonId,
        is_correct: data.completed || false,
        xp_earned: data.xp_earned || 0,
        completed_at: data.completed_at || new Date().toISOString()
      }))

      if (progressEntries.length > 0) {
        const { error } = await supabase
          .from('user_progress')
          .upsert(progressEntries, { onConflict: 'user_id,lesson_id' })

        if (error) {
          console.error('Error migrating progress data:', error)
          return { success: false, error: error.message }
        }
      }

      return { success: true }
    } catch (error) {
      console.error('Error migrating progress data:', error)
      return { success: false, error: 'Failed to migrate progress data' }
    }
  }

  /**
   * Migrate achievements data
   */
  private static async migrateAchievements(userId: string, achievements: string[]): Promise<{ success: boolean; error?: string }> {
    try {
      const achievementEntries = achievements.map(achievementId => ({
        user_id: userId,
        achievement_id: achievementId,
        unlocked_at: new Date().toISOString()
      }))

      if (achievementEntries.length > 0) {
        const { error } = await supabase
          .from('user_achievements')
          .upsert(achievementEntries, { onConflict: 'user_id,achievement_id' })

        if (error) {
          console.error('Error migrating achievements:', error)
          return { success: false, error: error.message }
        }
      }

      return { success: true }
    } catch (error) {
      console.error('Error migrating achievements:', error)
      return { success: false, error: 'Failed to migrate achievements' }
    }
  }

  /**
   * Clear localStorage data after successful migration
   */
  private static clearLocalStorageData(): void {
    try {
      localStorage.removeItem('usapupgrade_user')
      localStorage.removeItem('usapupgrade_progress')
      localStorage.removeItem('usapupgrade_achievements')
      console.log('LocalStorage data cleared after migration')
    } catch (error) {
      console.error('Error clearing localStorage data:', error)
    }
  }

  /**
   * Check if migration is needed
   */
  static needsMigration(): boolean {
    try {
      const userData = localStorage.getItem('usapupgrade_user')
      const progressData = localStorage.getItem('usapupgrade_progress')
      const achievementsData = localStorage.getItem('usapupgrade_achievements')

      return !!(userData || progressData || achievementsData)
    } catch (error) {
      console.error('Error checking migration status:', error)
      return false
    }
  }

  /**
   * Get migration status
   */
  static getMigrationStatus(): {
    hasLocalData: boolean
    dataSize: number
    estimatedTime: string
  } {
    try {
      const userData = localStorage.getItem('usapupgrade_user')
      const progressData = localStorage.getItem('usapupgrade_progress')
      const achievementsData = localStorage.getItem('usapupgrade_achievements')

      const hasLocalData = !!(userData || progressData || achievementsData)
      const dataSize = (userData?.length || 0) + (progressData?.length || 0) + (achievementsData?.length || 0)
      
      // Estimate migration time based on data size
      let estimatedTime = 'Less than 1 minute'
      if (dataSize > 10000) {
        estimatedTime = '1-2 minutes'
      } else if (dataSize > 5000) {
        estimatedTime = '30-60 seconds'
      }

      return {
        hasLocalData,
        dataSize,
        estimatedTime
      }
    } catch (error) {
      console.error('Error getting migration status:', error)
      return {
        hasLocalData: false,
        dataSize: 0,
        estimatedTime: 'Unknown'
      }
    }
  }
} 
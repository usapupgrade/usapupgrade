'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ArrowRight, Trophy, Target, Zap, Calendar, Star, TrendingUp, BookOpen, Users, Award, Lightbulb, Crown, Settings, Lock } from 'lucide-react'
import NotificationBell from '../components/NotificationBell'
import { lessons, getLessonByNumber, getNextLesson, getProgressPercentage } from '../data/lessons'
import { achievements, calculateAchievementProgress } from '../data/achievements'
import { useUser } from '../providers'
import TrialCountdown from '../components/TrialCountdown'
import LessonGate from '../components/LessonGate'
import AccessControl from '../components/AccessControl'
import PremiumUpgrade from '../components/PremiumUpgrade'
import { supabase } from '../../lib/supabase'

export default function Dashboard() {
  const { user, loading } = useUser()
  const [showConfetti, setShowConfetti] = useState(false)
  const [refreshKey, setRefreshKey] = useState(0)
  const [forceRefresh, setForceRefresh] = useState(0)

  // Force refresh when user data changes
  useEffect(() => {
    if (user) {
      setRefreshKey(prev => prev + 1)
    }
  }, [user?.completed_lessons, user?.total_xp, user?.current_streak, user?.current_lesson])

  // Force complete data refresh
  const handleForceRefresh = async () => {
    console.log('🔄 Force refreshing user data...')
    setForceRefresh(prev => prev + 1)
    
    // Trigger a complete user data reload
    if (user) {
      try {
        const { data, error } = await supabase
          .from('users')
          .select('*')
          .eq('id', user.id)
          .single()
        
        if (error) {
          console.error('Force refresh error:', error)
        } else if (data) {
          console.log('✅ Force refresh successful:', data)
          // This will trigger the user context to update
        }
      } catch (error) {
        console.error('Force refresh failed:', error)
      }
    }
  }

  // Show loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading your dashboard...</p>
        </div>
      </div>
    )
  }

  // Redirect to sign in if no user
  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Please Sign In</h2>
          <p className="text-gray-600 mb-6">You need to sign in to access your dashboard.</p>
          <Link 
            href="/auth/signin"
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
          >
            Sign In
          </Link>
        </div>
      </div>
    )
  }

  // Check if user is premium
  const isPremiumUser = user.subscription_status === 'premium' || user.subscription_status === 'lifetime'
  const isFreeUser = !isPremiumUser

  // Debug logging
  console.log('Dashboard User Data:', {
    id: user.id,
    current_lesson: user.current_lesson,
    completed_lessons: user.completed_lessons,
    total_xp: user.total_xp,
    current_streak: user.current_streak,
    longest_streak: user.longest_streak,
    subscription_status: user.subscription_status
  })



  // Use real user data from Supabase - FIXED LOGIC
  const getNextUncompletedLesson = () => {
    const completedLessons = user.completed_lessons || []
    
    // If no lessons completed, start with lesson 1
    if (completedLessons.length === 0) {
      return getLessonByNumber(1)
    }
    
    // Find the next uncompleted lesson
    for (let i = 1; i <= 120; i++) {
      if (!completedLessons.includes(i)) {
        return getLessonByNumber(i)
      }
    }
    
    // If all lessons completed, return the last lesson
    return getLessonByNumber(120)
  }
  
  const currentLesson = getNextUncompletedLesson()
  const nextLesson = getNextLesson(currentLesson?.lessonNumber || 1)
  
  // Use the calculated current lesson - FIXED
  const currentLessonNumber = currentLesson?.lessonNumber || 1
  const completedLessonsCount = user.completed_lessons?.length || 0
  
  // Calculate progress percentages using real user data
  const progressPercentage = isPremiumUser 
    ? (completedLessonsCount / 120) * 100 
    : Math.min((completedLessonsCount / 30) * 100, 100)
  
  const foundationProgress = (user.completed_lessons?.filter(l => l <= 30).length || 0) / 30 * 100
  const premiumProgress = (user.completed_lessons?.filter(l => l > 30).length || 0) / 90 * 100
  


  // Get real unlocked achievements based on user progress
  const calculateRealAchievementProgress = (achievementId: string) => {
    const completedLessons = user.completed_lessons || []
    const totalXP = user.total_xp || 0
    const streak = user.current_streak || 0
    
    switch (achievementId) {
      case 'first-lesson':
        return { 
          progress: completedLessons.length > 0 ? 100 : 0, 
          isUnlocked: completedLessons.length > 0 
        }
      
      case 'week-warrior':
        return { 
          progress: Math.min((streak / 7) * 100, 100), 
          isUnlocked: streak >= 7 
        }
      
      case 'month-master':
        return { 
          progress: Math.min((streak / 30) * 100, 100), 
          isUnlocked: streak >= 30 
        }
      
      case 'legend-status':
        return { 
          progress: Math.min((streak / 100) * 100, 100), 
          isUnlocked: streak >= 100 
        }

      case 'conversation-scholar':
        const foundationProgress = completedLessons.filter(l => l <= 30).length
        return { 
          progress: Math.min((foundationProgress / 30) * 100, 100), 
          isUnlocked: foundationProgress >= 30 
        }

      case 'elevator-expert':
        const smallTalkProgress = completedLessons.filter(l => l >= 1 && l <= 15).length
        return { 
          progress: Math.min((smallTalkProgress / 15) * 100, 100), 
          isUnlocked: smallTalkProgress >= 15 
        }

      case 'client-champion':
        const clientProgress = completedLessons.filter(l => l >= 31 && l <= 60).length
        return { 
          progress: Math.min((clientProgress / 30) * 100, 100), 
          isUnlocked: clientProgress >= 30 
        }

      case 'conflict-resolver':
        const conflictProgress = completedLessons.filter(l => l >= 91 && l <= 120).length
        return { 
          progress: Math.min((conflictProgress / 30) * 100, 100), 
          isUnlocked: conflictProgress >= 30 
        }

      case 'leadership-communicator':
        const leadershipProgress = completedLessons.filter(l => l >= 61 && l <= 90).length
        return { 
          progress: Math.min((leadershipProgress / 30) * 100, 100), 
          isUnlocked: leadershipProgress >= 30 
        }

      case 'promotion-ready':
        const promotionProgress = completedLessons.filter(l => l >= 61 && l <= 120).length
        return { 
          progress: Math.min((promotionProgress / 60) * 100, 100), 
          isUnlocked: promotionProgress >= 60 
        }

      case 'meeting-master':
        const meetingProgress = completedLessons.filter(l => l >= 31 && l <= 90).length
        return { 
          progress: Math.min((meetingProgress / 60) * 100, 100), 
          isUnlocked: meetingProgress >= 60 
        }

      case 'salary-negotiator':
        const negotiationProgress = completedLessons.filter(l => l >= 91 && l <= 120).length
        return { 
          progress: Math.min((negotiationProgress / 30) * 100, 100), 
          isUnlocked: negotiationProgress >= 30 
        }

      case 'workplace-mentor':
        const mentorProgress = completedLessons.filter(l => l >= 61 && l <= 120).length
        return { 
          progress: Math.min((mentorProgress / 60) * 100, 100), 
          isUnlocked: mentorProgress >= 60 
        }

      // Additional achievements that were missing
      case 'professional-expert':
        const expertProgress = completedLessons.length
        return { 
          progress: Math.min((expertProgress / 120) * 100, 100), 
          isUnlocked: expertProgress >= 120 
        }

      case 'pakikipagkapwa-master':
        const pakikipagkapwaProgress = completedLessons.filter(l => l >= 1 && l <= 30).length
        return { 
          progress: Math.min((pakikipagkapwaProgress / 30) * 100, 100), 
          isUnlocked: pakikipagkapwaProgress >= 30 
        }

      case 'bayanihan-builder':
        const bayanihanProgress = completedLessons.filter(l => l >= 31 && l <= 60).length
        return { 
          progress: Math.min((bayanihanProgress / 30) * 100, 100), 
          isUnlocked: bayanihanProgress >= 30 
        }

      case 'hiya-overcomer':
        const hiyaProgress = completedLessons.filter(l => l >= 1 && l <= 20).length
        return { 
          progress: Math.min((hiyaProgress / 20) * 100, 100), 
          isUnlocked: hiyaProgress >= 20 
        }

      case 'bpo-professional':
        const bpoProgress = completedLessons.filter(l => l >= 31 && l <= 50).length
        return { 
          progress: Math.min((bpoProgress / 20) * 100, 100), 
          isUnlocked: bpoProgress >= 20 
        }

      case 'ofw-communicator':
        const ofwProgress = completedLessons.filter(l => l >= 51 && l <= 80).length
        return { 
          progress: Math.min((ofwProgress / 30) * 100, 100), 
          isUnlocked: ofwProgress >= 30 
        }

      case 'jeepney-networker':
        const jeepneyProgress = completedLessons.filter(l => l >= 1 && l <= 15).length
        return { 
          progress: Math.min((jeepneyProgress / 15) * 100, 100), 
          isUnlocked: jeepneyProgress >= 15 
        }

      case 'mall-socializer':
        const mallProgress = completedLessons.filter(l => l >= 1 && l <= 10).length
        return { 
          progress: Math.min((mallProgress / 10) * 100, 100), 
          isUnlocked: mallProgress >= 10 
        }

      case 'family-diplomat':
        const familyProgress = completedLessons.filter(l => l >= 1 && l <= 25).length
        return { 
          progress: Math.min((familyProgress / 25) * 100, 100), 
          isUnlocked: familyProgress >= 25 
        }

      case 'community-connector':
        const communityProgress = completedLessons.filter(l => l >= 1 && l <= 40).length
        return { 
          progress: Math.min((communityProgress / 40) * 100, 100), 
          isUnlocked: communityProgress >= 40 
        }

      case 'conversation-evangelist':
        // This is social-based, so using total lessons as proxy
        const evangelistProgress = completedLessons.length
        return { 
          progress: Math.min((evangelistProgress / 50) * 100, 100), 
          isUnlocked: evangelistProgress >= 50 
        }

      default:
        return { progress: 0, isUnlocked: false }
    }
  }

  const unlockedAchievements = achievements.filter(achievement => {
    const progress = calculateRealAchievementProgress(achievement.id)
    return progress.isUnlocked
  })
  const recentAchievements = unlockedAchievements.slice(0, 3)

  const handleLessonComplete = (lessonNumber: number, xpEarned: number) => {
    // This will be handled by the lesson completion logic
    setShowConfetti(true)
    setTimeout(() => setShowConfetti(false), 3000)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 py-4 sm:py-6">
          {/* Trial Countdown */}
          <TrialCountdown />
          
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sm:gap-0">
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Welcome back, {user.name}! 👋</h1>
              <p className="text-sm sm:text-base text-gray-600 mt-1">Ready to continue your conversation journey?</p>
            </div>
            <div className="flex gap-2 sm:gap-3">
              <div className={`flex items-center px-3 py-2 rounded-lg ${
                isPremiumUser
                  ? 'bg-green-100 text-green-800'
                  : 'bg-blue-100 text-blue-800'
              }`}>
                <Crown className="w-4 h-4 mr-2" />
                <span className="text-sm font-semibold">
                  {isPremiumUser ? 'Premium Member' : 'Free Trial'}
                </span>
              </div>
              {isFreeUser && (
                <PremiumUpgrade 
                  variant="button"
                  className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white px-4 py-2 rounded-lg font-semibold transition-all transform hover:-translate-y-0.5 shadow-lg hover:shadow-xl"
                />
              )}
              <button
                onClick={handleForceRefresh}
                className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-2 rounded-lg transition-colors"
                title="Force Refresh Progress"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
              </button>
              <NotificationBell />
              <Link 
                href="/settings"
                className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-2 rounded-lg transition-colors"
              >
                <Settings className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-6">
        {/* Stats Overview */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-6 sm:mb-8">
          <div className="bg-white rounded-xl p-4 sm:p-4 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <BookOpen className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
              <span className="text-lg sm:text-xl font-bold text-gray-900">{currentLessonNumber}/{isPremiumUser ? 120 : 30}</span>
            </div>
            <p className="text-xs sm:text-sm text-gray-600 mt-1">Current Lesson</p>
          </div>
          
          <div className="bg-white rounded-xl p-3 sm:p-4 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <Zap className="w-5 h-5 sm:w-6 sm:h-6 text-green-600" />
              <span className="text-lg sm:text-xl font-bold text-gray-900">{user.total_xp || 0}</span>
            </div>
            <p className="text-xs sm:text-sm text-gray-600 mt-1">Total XP</p>
          </div>
          
          <div className="bg-white rounded-xl p-3 sm:p-4 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <Calendar className="w-5 h-5 sm:w-6 sm:h-6 text-orange-600" />
              <span className="text-lg sm:text-xl font-bold text-gray-900">{user.current_streak || 0}</span>
            </div>
            <p className="text-xs sm:text-sm text-gray-600 mt-1">Day Streak 🔥</p>
          </div>
          
          <div className="bg-white rounded-xl p-3 sm:p-4 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <Trophy className="w-5 h-5 sm:w-6 sm:h-6 text-purple-600" />
              <span className="text-lg sm:text-xl font-bold text-gray-900">{unlockedAchievements.length}</span>
            </div>
            <p className="text-xs sm:text-sm text-gray-600 mt-1">Achievements</p>
          </div>
        </div>

        {/* DEBUG INFO - TEMPORARY */}
        {process.env.NODE_ENV === 'development' && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
            <h3 className="font-bold text-yellow-800 mb-2">DEBUG INFO</h3>
            <div className="text-xs text-yellow-700 space-y-1">
              <p>Completed Lessons: {JSON.stringify(user.completed_lessons)}</p>
              <p>Current Lesson (from user): {user.current_lesson}</p>
              <p>Current Lesson (calculated): {currentLessonNumber}</p>
              <p>Total XP: {user.total_xp}</p>
              <p>Current Streak: {user.current_streak}</p>
              <p>Completed Count: {completedLessonsCount}</p>
              <p>Refresh Key: {refreshKey}</p>
              <p>Force Refresh: {forceRefresh}</p>
            </div>
          </div>
        )}

        {/* Progress Overview */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-4 sm:p-6 mb-6 sm:mb-8">
          <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-4 sm:mb-6">Your Progress</h2>
          <div className="mb-4 sm:mb-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-600">Overall Progress</span>
              <span className="text-sm font-medium text-gray-900">{user.completed_lessons?.length || 0}/{isPremiumUser ? 120 : 30} lessons</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2 sm:h-3">
              <div 
                className="bg-gradient-to-r from-blue-500 to-indigo-600 h-2 sm:h-3 rounded-full transition-all duration-300"
                style={{ width: `${isPremiumUser ? progressPercentage : Math.min((user.completed_lessons?.length || 0) / 30 * 100, 100)}%` }}
              ></div>
            </div>
            <p className="text-xs sm:text-sm text-gray-500">
              {isPremiumUser ? `${progressPercentage}% complete` : `${Math.min((user.completed_lessons?.length || 0) / 30 * 100, 100)}% complete`}
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            <div className="bg-green-50 rounded-lg p-3 sm:p-4">
              <h3 className="font-semibold text-green-800 mb-2 text-sm sm:text-base">Foundation Module</h3>
              <p className="text-xs sm:text-sm text-green-600">Lessons 1-30: Professional Confidence Building</p>
              <div className="mt-2">
                <div className="w-full bg-green-200 rounded-full h-2">
                  <div 
                    className="bg-green-500 h-2 rounded-full"
                    style={{ width: `${foundationProgress}%` }}
                  ></div>
                </div>
                <p className="text-xs text-green-600 mt-1">
                  {(user.completed_lessons?.filter(l => l <= 30).length || 0)}/30 complete
                </p>
              </div>
            </div>
            <div className="bg-blue-50 rounded-lg p-3 sm:p-4">
              <h3 className="font-semibold text-blue-800 mb-2 text-sm sm:text-base">Premium Modules</h3>
              <p className="text-xs sm:text-sm text-blue-600">Lessons 31-120: Advanced Professional Skills</p>
              <div className="mt-2">
                <div className="w-full bg-blue-200 rounded-full h-2">
                  <div 
                    className="bg-blue-500 h-2 rounded-full"
                    style={{ width: `${premiumProgress}%` }}
                  ></div>
                </div>
                <p className="text-xs text-blue-600 mt-1">
                  {(user.completed_lessons?.filter(l => l > 30).length || 0)}/90 complete
                </p>
              </div>
              {isFreeUser && (
                <div className="mt-3 p-3 bg-gradient-to-r from-orange-50 to-red-50 border border-orange-200 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-orange-700">
                      <Lock className="w-4 h-4" />
                      <span className="text-sm font-medium">Unlock 90 Premium Lessons</span>
                    </div>
                    <PremiumUpgrade 
                      variant="button"
                      className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white px-3 py-1.5 rounded-md text-xs font-semibold transition-all transform hover:-translate-y-0.5 shadow-md hover:shadow-lg"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Today's Lesson */}
        <AccessControl lessonNumber={currentLesson?.lessonNumber}>
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-4 sm:p-6 mb-6 sm:mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg sm:text-xl font-bold text-gray-900">Today's Lesson</h2>
              <span className="text-sm sm:text-base text-gray-600">Lesson {currentLessonNumber} of {isPremiumUser ? 120 : 30}</span>
            </div>
            
            <LessonGate lessonNumber={currentLesson?.lessonNumber || 1}>
              <div className="mb-4 sm:mb-6">
                <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2">{currentLesson?.title || 'Loading...'}</h3>
                <p className="text-sm sm:text-base text-gray-600">{currentLesson?.setting || 'Professional workplace scenario'}</p>
              </div>

              <div className="bg-blue-50 rounded-xl p-3 sm:p-4 mb-4 sm:mb-6">
                <h4 className="font-semibold text-blue-800 mb-2 text-sm sm:text-base">Cultural & Psychological Insight</h4>
                <p className="text-blue-700 text-sm sm:text-base">{currentLesson?.culturalNote || 'Loading cultural insights...'}</p>
              </div>

              <Link 
                href={`/lesson/${currentLessonNumber}`}
                className="w-full inline-flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white px-6 sm:px-8 py-4 sm:py-5 rounded-xl font-semibold transition-colors text-base sm:text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                {user.completed_lessons?.includes(currentLessonNumber) ? 'Continue Learning' : 'Start Lesson'}
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </LessonGate>
          </div>
        </AccessControl>

        {/* Free User Upgrade Prompt */}
        {isFreeUser && (
          <div className="bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl p-4 sm:p-6 mb-6 sm:mb-8 text-white">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg sm:text-xl font-bold mb-2">Unlock Premium Access</h3>
                <p className="text-orange-100 text-sm sm:text-base">
                  You've completed {Math.min(user.completed_lessons?.length || 0, 30)}/30 free lessons. 
                  Upgrade to access all 120 lessons and advanced features!
                </p>
              </div>
              <Crown className="w-8 h-8 sm:w-12 sm:h-12 text-orange-200" />
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
              <div className="flex items-center gap-2 text-sm">
                <div className="w-2 h-2 bg-white rounded-full"></div>
                <span>90 Premium Lessons</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <div className="w-2 h-2 bg-white rounded-full"></div>
                <span>Progress Analytics</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <div className="w-2 h-2 bg-white rounded-full"></div>
                <span>Professional Certificate</span>
              </div>
            </div>
            
            <PremiumUpgrade 
              variant="button"
              className="w-full bg-white text-orange-600 hover:bg-orange-50"
            />
            
            <div className="mt-3 text-xs text-orange-100 text-center">
              One-time payment • Lifetime access • No recurring fees
            </div>
          </div>
        )}

        {/* Recent Achievements */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-4 sm:p-6 mb-6 sm:mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg sm:text-xl font-bold text-gray-900">Recent Achievements</h2>
            <Link 
              href="/achievements" 
              className="text-blue-600 hover:text-blue-700 text-sm sm:text-base font-medium"
            >
              View All
            </Link>
          </div>
          
          {recentAchievements.length > 0 ? (
            <div className="space-y-3">
              {recentAchievements.map((achievement) => (
                <div key={achievement.id} className="flex items-center p-3 bg-gray-50 rounded-lg">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-yellow-100 rounded-full flex items-center justify-center mr-3">
                    <Trophy className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 text-sm sm:text-base">{achievement.title}</h3>
                    <p className="text-xs sm:text-sm text-gray-600">{achievement.description}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-6 sm:py-8">
              <Trophy className="w-12 h-12 sm:w-16 sm:h-16 text-gray-300 mx-auto mb-3 sm:mb-4" />
              <p className="text-gray-500 text-sm sm:text-base">Complete lessons to unlock achievements!</p>
            </div>
          )}
        </div>

        {/* Today's Pro Tip */}
        <div className="bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl p-4 sm:p-6 text-white">
          <div className="flex items-center mb-3">
            <Lightbulb className="w-5 h-5 sm:w-6 sm:h-6 mr-2" />
            <h3 className="font-semibold text-sm sm:text-base">Today's Pro Tip</h3>
          </div>
          <p className="text-sm sm:text-base text-blue-100">
            "In Filipino workplace culture, showing respect through proper greetings and acknowledging seniority builds trust. 
            Start conversations with a warm 'Good morning/afternoon' and use appropriate titles when addressing superiors."
          </p>
        </div>
      </div>
    </div>
  )
}
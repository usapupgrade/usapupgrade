'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ArrowRight, Trophy, Target, Zap, Calendar, Star, TrendingUp, BookOpen, Users, Award, Lightbulb, Crown, Settings } from 'lucide-react'
import NotificationBell from '../components/NotificationBell'
import { lessons, getLessonByNumber, getNextLesson, getProgressPercentage } from '../data/lessons'
import { achievements, calculateAchievementProgress } from '../data/achievements'
import { useUser } from '../providers'
import TrialCountdown from '../components/TrialCountdown'

export default function Dashboard() {
  const { user, loading } = useUser()
  const [showConfetti, setShowConfetti] = useState(false)

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

  // Use real user data from Supabase
  const getNextUncompletedLesson = () => {
    const completedLessons = user.completed_lessons || []
    for (let i = 1; i <= 120; i++) {
      if (!completedLessons.includes(i)) {
        return getLessonByNumber(i)
      }
    }
    return getLessonByNumber(120) // All lessons completed
  }
  
  const currentLesson = getNextUncompletedLesson()
  const nextLesson = getNextLesson(currentLesson?.lessonNumber || 1)
  const progressPercentage = ((user.completed_lessons?.length || 0) / 120) * 100
  const totalLessons = 120

  // Get real unlocked achievements based on user progress
  const unlockedAchievements = achievements.filter(achievement => {
    const progress = calculateAchievementProgress(achievement.id)
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
          
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-0">
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Welcome back, {user.name}! 👋</h1>
              <p className="text-sm sm:text-base text-gray-600 mt-1">Ready to continue your conversation journey?</p>
            </div>
            <div className="flex gap-2 sm:gap-3">
              <div className={`flex items-center px-3 py-2 rounded-lg ${
                user.subscription_status === 'premium' || user.subscription_status === 'lifetime'
                  ? 'bg-green-100 text-green-800'
                  : 'bg-blue-100 text-blue-800'
              }`}>
                <Crown className="w-4 h-4 mr-2" />
                <span className="text-sm font-semibold">
                  {user.subscription_status === 'premium' || user.subscription_status === 'lifetime' 
                    ? 'Premium Member' 
                    : 'Free Trial'}
                </span>
              </div>
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
          <div className="bg-white rounded-xl p-3 sm:p-4 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <BookOpen className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
              <span className="text-lg sm:text-xl font-bold text-gray-900">{user.current_lesson || 1}/120</span>
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

        {/* Progress Overview */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-4 sm:p-6 mb-6 sm:mb-8">
          <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-4 sm:mb-6">Your Progress</h2>
          <div className="mb-4 sm:mb-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-600">Overall Progress</span>
              <span className="text-sm font-medium text-gray-900">{user.completed_lessons?.length || 0}/{totalLessons} lessons</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2 sm:h-3">
              <div 
                className="bg-gradient-to-r from-blue-500 to-indigo-600 h-2 sm:h-3 rounded-full transition-all duration-300"
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>
            <p className="text-xs sm:text-sm text-gray-500 mt-2">{progressPercentage}% complete</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            <div className="bg-green-50 rounded-lg p-3 sm:p-4">
              <h3 className="font-semibold text-green-800 mb-2 text-sm sm:text-base">Foundation Module</h3>
              <p className="text-xs sm:text-sm text-green-600">Lessons 1-30: Professional Confidence Building</p>
              <div className="mt-2">
                <div className="w-full bg-green-200 rounded-full h-2">
                  <div 
                    className="bg-green-500 h-2 rounded-full"
                    style={{ width: `${Math.min((user.completed_lessons?.filter(l => l <= 30).length || 0) / 30 * 100, 100)}%` }}
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
                    style={{ width: `${Math.min((user.completed_lessons?.filter(l => l > 30).length || 0) / 90 * 100, 100)}%` }}
                  ></div>
                </div>
                <p className="text-xs text-blue-600 mt-1">
                  {(user.completed_lessons?.filter(l => l > 30).length || 0)}/90 complete
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Today's Lesson */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-4 sm:p-6 mb-6 sm:mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg sm:text-xl font-bold text-gray-900">Today's Lesson</h2>
            <span className="text-sm sm:text-base text-gray-600">Lesson {currentLesson?.lessonNumber || 1} of 120</span>
          </div>
          
          <div className="mb-4 sm:mb-6">
            <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2">{currentLesson?.title || 'Loading...'}</h3>
            <p className="text-sm sm:text-base text-gray-600">{currentLesson?.setting || 'Professional workplace scenario'}</p>
          </div>

          <div className="bg-blue-50 rounded-xl p-3 sm:p-4 mb-4 sm:mb-6">
            <h4 className="font-semibold text-blue-800 mb-2 text-sm sm:text-base">Cultural & Psychological Insight</h4>
            <p className="text-blue-700 text-sm sm:text-base">{currentLesson?.culturalNote || 'Loading cultural insights...'}</p>
          </div>

          <Link 
            href={`/lesson/${currentLesson?.lessonNumber || 1}`}
            className="inline-flex items-center bg-blue-600 hover:bg-blue-700 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-semibold transition-colors text-sm sm:text-base"
          >
            {user.completed_lessons?.includes(currentLesson?.lessonNumber || 1) ? 'Continue Learning' : 'Start Lesson'}
            <ArrowRight className="w-4 h-4 ml-2" />
          </Link>
        </div>

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
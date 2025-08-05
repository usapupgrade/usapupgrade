'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, ArrowRight, CheckCircle, XCircle, Trophy, Star, Lock } from 'lucide-react'
import NotificationBell from '../../components/NotificationBell'
import { getLessonByNumber, getNextLesson, getPreviousLesson } from '../../data/lessons'
import { canAccessLesson, hasPremiumAccess } from '../../data/userSubscription'
import AccessControl from '../../components/AccessControl'
import { notificationService } from '../../lib/notificationService'
import { useUser } from '../../providers'

export default function LessonPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const { user, updateUser } = useUser()
  const lessonNumber = parseInt(params.id)
  const lesson = getLessonByNumber(lessonNumber)
  const nextLesson = getNextLesson(lessonNumber)
  const previousLesson = getPreviousLesson(lessonNumber)

  const [selectedOption, setSelectedOption] = useState<string | null>(null)
  const [showFeedback, setShowFeedback] = useState(false)
  const [showCompletion, setShowCompletion] = useState(false)
  const [xpEarned, setXpEarned] = useState(0)

  // Check if lesson is completed using real user data
  const isLessonCompleted = user?.completed_lessons?.includes(lessonNumber) || false

  useEffect(() => {
    if (lesson && isLessonCompleted) {
      setShowCompletion(true)
    }
  }, [lesson, lessonNumber, isLessonCompleted])

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Please Sign In</h2>
          <p className="text-gray-600 mb-6">You need to sign in to access lessons.</p>
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

  if (!lesson) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Lesson not found</h1>
          <p className="text-gray-600 mb-6">The lesson you're looking for doesn't exist.</p>
          <Link 
            href="/dashboard" 
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
          >
            Back to Dashboard
          </Link>
        </div>
      </div>
    )
  }

  // Check premium access
  if (!canAccessLesson(lessonNumber)) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="max-w-md mx-auto text-center">
          <div className="bg-white rounded-2xl shadow-sm border p-8">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Lock className="w-8 h-8 text-blue-600" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Premium Lesson</h1>
            <p className="text-gray-600 mb-6">
              This lesson is part of our premium curriculum. Upgrade to access all 120 professional lessons.
            </p>
            <div className="space-y-3">
              <Link 
                href="/payment" 
                className="w-full bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors block"
              >
                Upgrade to Premium
              </Link>
              <Link 
                href="/dashboard" 
                className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 px-6 py-3 rounded-lg font-semibold transition-colors block"
              >
                Back to Dashboard
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  }

  const handleOptionSelect = (optionId: string) => {
    setSelectedOption(optionId)
    setShowFeedback(true)
  }

  const handleContinue = () => {
    if (nextLesson) {
      router.push(`/lesson/${nextLesson.lessonNumber}`)
    } else {
      router.push('/dashboard')
    }
  }

  const handleCompleteLesson = () => {
    if (!isLessonCompleted) {
      // Find the next uncompleted lesson
      const completedLessons = [...(user.completed_lessons || []), lessonNumber]
      let nextUncompletedLesson = lessonNumber + 1
      while (completedLessons.includes(nextUncompletedLesson) && nextUncompletedLesson <= 120) {
        nextUncompletedLesson++
      }
      
      // Update global progress
      updateUser({
        completed_lessons: completedLessons,
        current_lesson: nextUncompletedLesson,
        total_xp: (user.total_xp || 0) + lesson.xpReward
      })
      
      // Update local state
      const newProgress = {
        ...user,
        completed_lessons: completedLessons,
        current_lesson: nextUncompletedLesson,
        total_xp: (user.total_xp || 0) + lesson.xpReward
      }
      updateUser(newProgress)
      setXpEarned(lesson.xpReward)
      
      // Add notification for lesson completion
      notificationService.addLessonCompletedNotification(lessonNumber, lesson.title)
      
      // Check for streak milestones
      const newStreak = (user.current_streak || 0) + 1
      const newLongestStreak = Math.max(newStreak, user.longest_streak || 0)
      if (newStreak % 7 === 0 && newStreak > 0) {
        notificationService.addStreakNotification(newStreak)
      }
    }
    setShowCompletion(true)
  }

  const selectedOptionData = lesson.options.find(option => 
    option.text === selectedOption
  )

  const progressPercentage = Math.round((lessonNumber / 120) * 100)

  return (
    <AccessControl lessonNumber={lessonNumber}>
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-white shadow-sm border-b border-gray-200">
          <div className="max-w-4xl mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <Link 
                href="/dashboard"
                className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Dashboard
              </Link>
              
              <div className="flex items-center space-x-4">
                <NotificationBell />
                <div className="flex items-center">
                  <Star className="w-4 h-4 text-yellow-500 mr-1" />
                  <span className="text-sm font-medium text-gray-600">{user.total_xp} XP</span>
                </div>
                                  <div className="flex items-center">
                    <Trophy className="w-4 h-4 text-orange-500 mr-1" />
                    <span className="text-sm font-medium text-gray-600">{user.current_streak} day streak</span>
                  </div>
              </div>
            </div>
          </div>
        </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-600">Progress</span>
            <span className="text-sm font-medium text-gray-900">Lesson {lessonNumber} of 120</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-blue-500 to-indigo-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
        </div>

        {/* Lesson Content */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
          {/* Lesson Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Lesson {lesson.lessonNumber}: {lesson.title}
            </h1>
            <div className="bg-blue-50 rounded-xl p-4 mb-6">
              <p className="text-gray-700 font-medium">📍 {lesson.setting}</p>
            </div>
          </div>

          {/* Scenario */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Scenario</h2>
            <div className="bg-gray-50 rounded-xl p-6">
              <p className="text-gray-700 mb-4">{lesson.scenario}</p>
              <div className="bg-blue-100 rounded-lg p-4">
                <p className="text-blue-800 font-medium">"{lesson.characterSays}"</p>
              </div>
            </div>
          </div>

          {/* Question */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">How would you respond?</h2>
            
            <div className="space-y-3">
              {lesson.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleOptionSelect(option.text)}
                  disabled={showFeedback}
                  className={`w-full text-left p-4 rounded-xl border-2 transition-all duration-200 ${
                    selectedOption === option.text
                      ? option.isCorrect
                        ? 'border-green-500 bg-green-50'
                        : 'border-red-500 bg-red-50'
                      : 'border-gray-200 hover:border-gray-300 bg-white'
                  } ${showFeedback ? 'cursor-default' : 'cursor-pointer hover:shadow-sm'}`}
                >
                  <div className="flex items-start">
                    <div className="flex-shrink-0 mr-3 mt-1">
                      {showFeedback && selectedOption === option.text ? (
                        option.isCorrect ? (
                          <CheckCircle className="w-5 h-5 text-green-500" />
                        ) : (
                          <XCircle className="w-5 h-5 text-red-500" />
                        )
                      ) : (
                        <div className="w-5 h-5 rounded-full border-2 border-gray-300"></div>
                      )}
                    </div>
                    <span className="text-gray-700">{option.text}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Feedback */}
          {showFeedback && selectedOptionData && (
            <div className="mb-8">
              <div className={`rounded-xl p-6 ${
                selectedOptionData.isCorrect 
                  ? 'bg-green-50 border border-green-200' 
                  : 'bg-red-50 border border-red-200'
              }`}>
                <div className="flex items-center mb-3">
                  {selectedOptionData.isCorrect ? (
                    <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                  ) : (
                    <XCircle className="w-5 h-5 text-red-500 mr-2" />
                  )}
                  <h3 className={`font-semibold ${
                    selectedOptionData.isCorrect ? 'text-green-800' : 'text-red-800'
                  }`}>
                    {selectedOptionData.isCorrect ? 'Correct!' : 'Incorrect'}
                  </h3>
                </div>
                <p className={`${
                  selectedOptionData.isCorrect ? 'text-green-700' : 'text-red-700'
                }`}>
                  {selectedOptionData.feedback}
                </p>
              </div>

              <div className="bg-blue-50 rounded-xl p-4 mb-6">
                <h4 className="font-semibold text-blue-800 mb-2">Cultural & Psychological Insight</h4>
                <p className="text-blue-700">{lesson.culturalNote}</p>
              </div>

              {selectedOptionData.isCorrect ? (
                <button
                  onClick={handleCompleteLesson}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-xl font-semibold transition-colors"
                >
                  Complete Lesson
                </button>
              ) : (
                <button
                  onClick={() => {
                    setSelectedOption(null)
                    setShowFeedback(false)
                  }}
                  className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 px-6 rounded-xl font-semibold transition-colors"
                >
                  Try Again
                </button>
              )}
            </div>
          )}

          {/* Lesson Completion */}
          {showCompletion && (
            <div className="text-center">
              <div className="bg-gradient-to-r from-green-400 to-blue-500 rounded-2xl p-8 text-white mb-6">
                <Trophy className="w-16 h-16 mx-auto mb-4" />
                <h2 className="text-2xl font-bold mb-2">Lesson Complete!</h2>
                <p className="text-lg mb-4">Great job on this conversation scenario!</p>
                <div className="flex items-center justify-center space-x-4">
                  <div className="flex items-center">
                    <Star className="w-5 h-5 mr-2" />
                    <span>+{lesson.xpReward} XP earned!</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                {previousLesson && (
                  <Link
                    href={`/lesson/${previousLesson.lessonNumber}`}
                    className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 px-6 rounded-xl font-semibold transition-colors text-center"
                  >
                    Previous Lesson
                  </Link>
                )}
                
                {nextLesson ? (
                  <button
                    onClick={handleContinue}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-xl font-semibold transition-colors flex items-center justify-center"
                  >
                    Next Lesson
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </button>
                ) : (
                  <Link
                    href="/dashboard"
                    className="flex-1 bg-green-600 hover:bg-green-700 text-white py-3 px-6 rounded-xl font-semibold transition-colors text-center"
                  >
                    Back to Dashboard
                  </Link>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
    </AccessControl>
  )
} 
'use client'

import { useUser } from '@/app/providers'
import { Lock, Crown, CheckCircle } from 'lucide-react'
import PremiumUpgrade from './PremiumUpgrade'

interface LessonGateProps {
  lessonNumber: number
  children: React.ReactNode
  className?: string
}

export default function LessonGate({ lessonNumber, children, className = '' }: LessonGateProps) {
  const { user } = useUser()
  
  // Free users can access lessons 1-30
  const isFreeLesson = lessonNumber <= 30
  const isPremiumUser = user?.subscription_status === 'premium'
  
  // If user is premium or it's a free lesson, show content
  if (isPremiumUser || isFreeLesson) {
    return <div className={className}>{children}</div>
  }
  
  // Show locked state for premium lessons
  return (
    <div className={`bg-white rounded-lg border border-gray-200 p-6 text-center ${className}`}>
      <div className="mb-4">
        <Lock className="w-12 h-12 text-gray-400 mx-auto mb-3" />
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Premium Lesson Locked</h3>
        <p className="text-gray-600 mb-4">
          This lesson is part of the premium curriculum. Upgrade to unlock all 120 lessons.
        </p>
      </div>
      
      <div className="space-y-3 mb-6">
        <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
          <CheckCircle className="w-4 h-4 text-green-500" />
          <span>You've completed {Math.min(30, lessonNumber - 1)}/30 free lessons</span>
        </div>
        <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
          <Crown className="w-4 h-4 text-orange-500" />
          <span>Unlock {120 - 30} premium lessons</span>
        </div>
      </div>
      
      <PremiumUpgrade
        variant="button"
        className="w-full"
      />
      
      <div className="mt-4 text-xs text-gray-500">
        One-time payment • Lifetime access • No recurring fees
        <div className="text-orange-600 font-medium mt-1">
          ⚠️ Price increases to ₱799 after 1 month
        </div>
      </div>
    </div>
  )
}

// Component for showing lesson navigation with lock indicators
export function LessonNavigation({ currentLesson, totalLessons = 120 }: { 
  currentLesson: number
  totalLessons?: number 
}) {
  const { user } = useUser()
  const isPremiumUser = user?.subscription_status === 'premium'
  
  return (
    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
      <div className="flex items-center gap-2">
        <span className="text-sm font-medium text-gray-700">Progress:</span>
        <span className="text-sm text-gray-600">
          {Math.min(currentLesson, isPremiumUser ? totalLessons : 30)}/{isPremiumUser ? totalLessons : 30} lessons
        </span>
      </div>
      
      {!isPremiumUser && currentLesson > 30 && (
        <div className="flex items-center gap-2 text-orange-600">
          <Lock className="w-4 h-4" />
          <span className="text-sm font-medium">Upgrade to continue</span>
        </div>
      )}
      
      {isPremiumUser && (
        <div className="flex items-center gap-2 text-green-600">
          <Crown className="w-4 h-4" />
          <span className="text-sm font-medium">Premium Active</span>
        </div>
      )}
    </div>
  )
}

// Component for showing lesson list with lock indicators
export function LessonList({ lessons, currentLesson }: {
  lessons: Array<{ id: number; title: string; description: string }>
  currentLesson: number
}) {
  const { user } = useUser()
  const isPremiumUser = user?.subscription_status === 'premium'
  
  return (
    <div className="space-y-2">
      {lessons.map((lesson) => {
        const isLocked = lesson.id > 30 && !isPremiumUser
        const isCurrent = lesson.id === currentLesson
        
        return (
          <div
            key={lesson.id}
            className={`flex items-center gap-3 p-3 rounded-lg border ${
              isCurrent 
                ? 'bg-blue-50 border-blue-200' 
                : isLocked 
                ? 'bg-gray-50 border-gray-200' 
                : 'bg-white border-gray-200 hover:bg-gray-50'
            }`}
          >
            <div className="flex-shrink-0">
              {isLocked ? (
                <Lock className="w-5 h-5 text-gray-400" />
              ) : isCurrent ? (
                <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                </div>
              ) : (
                <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-3 h-3 text-white" />
                </div>
              )}
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className={`font-medium ${
                  isLocked ? 'text-gray-500' : 'text-gray-900'
                }`}>
                  Lesson {lesson.id}: {lesson.title}
                </span>
                {isLocked && (
                  <span className="text-xs bg-orange-100 text-orange-700 px-2 py-1 rounded">
                    Premium
                  </span>
                )}
              </div>
              <p className={`text-sm ${
                isLocked ? 'text-gray-400' : 'text-gray-600'
              }`}>
                {lesson.description}
              </p>
            </div>
          </div>
        )
      })}
    </div>
  )
} 
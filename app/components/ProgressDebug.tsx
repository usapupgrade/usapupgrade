'use client'

import { useUser } from '../providers'

export default function ProgressDebug() {
  const { user, loading } = useUser()

  if (process.env.NODE_ENV !== 'development') {
    return null
  }

  return (
    <div className="fixed top-4 right-4 bg-red-900/90 text-white p-4 rounded-lg text-xs max-w-xs z-50">
      <h3 className="font-bold mb-2">Progress Debug</h3>
      <div className="space-y-1">
        <p>Loading: {loading ? 'Yes' : 'No'}</p>
        <p>User ID: {user?.id || 'None'}</p>
        <p>Current Lesson: {user?.current_lesson || 'None'}</p>
        <p>Completed Lessons: {user?.completed_lessons?.length || 0}</p>
        <p>Total XP: {user?.total_xp || 0}</p>
        <p>Streak: {user?.current_streak || 0}</p>
        <p>Completed Array: {JSON.stringify(user?.completed_lessons || [])}</p>
      </div>
    </div>
  )
} 
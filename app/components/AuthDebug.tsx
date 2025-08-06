'use client'

import { useUser } from '../providers'

export default function AuthDebug() {
  const { user, loading } = useUser()

  if (process.env.NODE_ENV !== 'development') {
    return null
  }

  return (
    <div className="fixed bottom-4 right-4 bg-black/80 text-white p-4 rounded-lg text-xs max-w-xs z-50">
      <h3 className="font-bold mb-2">Auth Debug</h3>
      <div className="space-y-1">
        <p>Loading: {loading ? 'Yes' : 'No'}</p>
        <p>User: {user ? user.id : 'None'}</p>
        <p>Email: {user?.email || 'None'}</p>
        <p>Name: {user?.name || 'None'}</p>
        <p>XP: {user?.total_xp || 0}</p>
        <p>Lessons: {user?.completed_lessons?.length || 0}</p>
      </div>
    </div>
  )
} 
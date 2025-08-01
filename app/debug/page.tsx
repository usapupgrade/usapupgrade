'use client'

import { useState, useEffect } from 'react'
import { useUser } from '../providers'

export default function DebugPage() {
  const { user, loading } = useUser()
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    try {
      console.log('Debug page loaded')
      console.log('User:', user)
      console.log('Loading:', loading)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error')
    }
  }, [user, loading])

  if (error) {
    return (
      <div className="min-h-screen bg-red-50 flex items-center justify-center p-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-900 mb-4">Error</h1>
          <p className="text-red-700 mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="bg-red-600 text-white px-4 py-2 rounded"
          >
            Reload Page
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-primary-50 flex items-center justify-center p-6">
      <div className="text-center max-w-md">
        <h1 className="text-3xl font-bold text-primary-900 mb-6">Debug Page</h1>
        
        <div className="space-y-4 text-left">
          <div className="bg-white p-4 rounded-lg shadow">
            <h2 className="font-semibold text-primary-900 mb-2">App Status</h2>
            <p className="text-sm text-primary-600">
              Loading: {loading ? 'Yes' : 'No'}
            </p>
            <p className="text-sm text-primary-600">
              User: {user ? 'Logged in' : 'Not logged in'}
            </p>
          </div>

          {user && (
            <div className="bg-white p-4 rounded-lg shadow">
              <h2 className="font-semibold text-primary-900 mb-2">User Info</h2>
              <p className="text-sm text-primary-600">Name: {user.name}</p>
              <p className="text-sm text-primary-600">Email: {user.email}</p>
              <p className="text-sm text-primary-600">Level: {user.current_level}</p>
              <p className="text-sm text-primary-600">XP: {user.total_xp}</p>
            </div>
          )}

          <div className="bg-white p-4 rounded-lg shadow">
            <h2 className="font-semibold text-primary-900 mb-2">Navigation</h2>
            <div className="space-y-2">
              <a href="/" className="block text-accent-600 hover:text-accent-700">
                ← Back to Home
              </a>
              <a href="/dashboard" className="block text-accent-600 hover:text-accent-700">
                → Go to Dashboard
              </a>
              <a href="/auth/signup" className="block text-accent-600 hover:text-accent-700">
                → Sign Up
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 
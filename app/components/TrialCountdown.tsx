'use client'

import { useUser } from '../providers'

export default function TrialCountdown() {
  const userContext = useUser()
  const { user, getDaysLeft } = userContext
  
  if (!user || user.subscription_status !== 'free') return null
  
  const daysLeft = getDaysLeft(user)
  const isNearExpiry = daysLeft <= 5
  
  return (
    <div className="flex items-center justify-between mb-4 p-3 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-200">
      <div className="flex items-center">
        <span className={`text-sm font-medium ${isNearExpiry ? 'text-orange-600' : 'text-blue-600'}`}>
          📅 {daysLeft > 0 ? `${daysLeft} days left` : 'Trial expired'} in free trial
        </span>
      </div>
      
      {isNearExpiry && (
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
          💾 Upgrade to Save Progress
        </button>
      )}
    </div>
  )
} 
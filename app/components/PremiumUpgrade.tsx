'use client'

import { useState } from 'react'
import { useUser } from '../providers'
import { toast } from 'sonner'

interface PremiumUpgradeProps {
  variant?: 'button' | 'card'
  onSuccess?: () => void
  onError?: (error: string) => void
  className?: string
}

export default function PremiumUpgrade({ 
  variant = 'button', 
  onSuccess, 
  onError,
  className = ''
}: PremiumUpgradeProps) {
  const { user } = useUser()
  const [loading, setLoading] = useState(false)

  const handleUpgrade = async () => {
    if (!user) {
      onError?.('Please sign in to upgrade')
      return
    }

    setLoading(true)
    try {
      // Show coming soon message until Lemon Squeezy is approved
      toast.info('Premium upgrade coming soon! Lemon Squeezy integration is being finalized.')
      onSuccess?.()
    } catch (error) {
      console.error('Upgrade error:', error)
      onError?.('Upgrade not available yet. Please try again later.')
    } finally {
      setLoading(false)
    }
  }

  if (variant === 'card') {
    return (
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-6 text-white shadow-xl">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-xl font-bold">Unlock Premium Access</h3>
            <p className="text-blue-100">Transform your communication skills today</p>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold">₱499</div>
            <div className="text-blue-100 text-sm">One-time payment</div>
          </div>
        </div>
        
        <div className="space-y-3 mb-6">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-300 rounded-full"></div>
            <span className="text-sm">Complete 120-lesson curriculum</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-300 rounded-full"></div>
            <span className="text-sm">Progress tracking & analytics</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-300 rounded-full"></div>
            <span className="text-sm">Real workplace scenarios</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-300 rounded-full"></div>
            <span className="text-sm">Professional certificate</span>
          </div>
        </div>

        <button
          onClick={handleUpgrade}
          disabled={loading}
          className="w-full bg-white text-blue-600 px-6 py-3 rounded-xl font-semibold hover:bg-blue-50 transition-colors disabled:opacity-50"
        >
          {loading ? 'Coming Soon...' : 'Coming Soon - ₱499'}
        </button>

        <div className="flex items-center justify-center gap-4 mt-4 text-xs text-blue-100">
          <div className="flex items-center gap-1">
            <div className="w-4 h-4 bg-white/20 rounded-full flex items-center justify-center">
              <div className="w-2 h-2 bg-white rounded-full"></div>
            </div>
            <span>Secure Payment</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-4 h-4 bg-white/20 rounded-full flex items-center justify-center">
              <div className="w-2 h-2 bg-white rounded-full"></div>
            </div>
            <span>Lifetime Access</span>
          </div>
        </div>
      </div>
    )
  }

  return (
    <button
      onClick={handleUpgrade}
      disabled={loading}
      className={`bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all transform hover:-translate-y-1 shadow-lg hover:shadow-xl disabled:opacity-50 ${className}`}
    >
      {loading ? 'Coming Soon...' : 'Coming Soon - ₱499'}
    </button>
  )
} 
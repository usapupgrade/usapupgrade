'use client'

import { useState } from 'react'
import { useUser } from '../providers'
import { lemonSqueezy } from '../lib/lemonsqueezy'

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
  const [isLoading, setIsLoading] = useState(false)

  const handleUpgrade = async () => {
    if (!user?.email) {
      onError?.('Please sign in to upgrade')
      return
    }

    setIsLoading(true)

    try {
      // Create Lemon Squeezy checkout session
      const checkoutUrl = await lemonSqueezy.createCheckoutSession(user.email)

      // Redirect to Lemon Squeezy checkout
      window.location.href = checkoutUrl

    } catch (error) {
      console.error('Failed to create checkout:', error)
      onError?.('Failed to create checkout. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  if (variant === 'card') {
    return (
      <div className={`bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-6 text-white ${className}`}>
        <h3 className="text-xl font-bold mb-2">Upgrade to Premium</h3>
        <p className="text-blue-100 mb-4">Get lifetime access to all lessons</p>
        <button
          onClick={handleUpgrade}
          disabled={isLoading}
          className="w-full bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors disabled:opacity-50"
        >
          {isLoading ? 'Loading...' : 'Upgrade Now - ₱499'}
        </button>
      </div>
    )
  }

  return (
    <button
      onClick={handleUpgrade}
      disabled={isLoading}
      className={`bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all disabled:opacity-50 ${className}`}
    >
      {isLoading ? 'Loading...' : 'Upgrade to Premium - ₱499'}
    </button>
  )
} 
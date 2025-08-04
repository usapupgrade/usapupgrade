'use client'

import { useState, useEffect } from 'react'
import { gumroad } from '../lib/gumroad'
import { useUser } from '../providers'
import { Crown, Lock, CheckCircle, Loader2 } from 'lucide-react'

interface PremiumUpgradeProps {
  userEmail?: string
  className?: string
  variant?: 'button' | 'card' | 'modal'
  onSuccess?: () => void
  onError?: (error: string) => void
}

export default function PremiumUpgrade({
  userEmail,
  className = '',
  variant = 'button',
  onSuccess,
  onError
}: PremiumUpgradeProps) {
  const { user } = useUser()
  const [isLoading, setIsLoading] = useState(false)
  const [isPremium, setIsPremium] = useState(false)

  // Check if user is premium
  useEffect(() => {
    if (user?.subscription_status === 'premium' || user?.is_premium) {
      setIsPremium(true)
    }
  }, [user?.subscription_status, user?.is_premium])

  const handleUpgrade = async () => {
    if (isPremium) return

    setIsLoading(true)
    try {
      await gumroad.openCheckout(userEmail || user?.email)
      
      // Listen for Gumroad success event
      const handleGumroadSuccess = (event: any) => {
        if (event.detail && event.detail.sale_id) {
          setIsPremium(true)
          onSuccess?.()
        }
      }

      // Listen for Gumroad close event
      const handleGumroadClose = () => {
        setIsLoading(false)
      }

      window.addEventListener('gumroad:success', handleGumroadSuccess)
      window.addEventListener('gumroad:close', handleGumroadClose)

      // Cleanup listeners after 5 minutes
      setTimeout(() => {
        window.removeEventListener('gumroad:success', handleGumroadSuccess)
        window.removeEventListener('gumroad:close', handleGumroadClose)
        setIsLoading(false)
      }, 300000)

    } catch (error) {
      console.error('Gumroad checkout error:', error)
      setIsLoading(false)
      onError?.(error instanceof Error ? error.message : 'Failed to open checkout')
    }
  }

  // If user is already premium, show success state
  if (isPremium) {
    return (
      <div className={`flex items-center gap-2 text-green-600 ${className}`}>
        <CheckCircle className="w-5 h-5" />
        <span className="font-medium">Premium Active</span>
      </div>
    )
  }

  // Different variants
  if (variant === 'card') {
    return (
      <div className={`bg-gradient-to-r from-orange-500 to-red-500 rounded-lg p-6 text-white ${className}`}>
        <div className="flex items-center gap-3 mb-4">
          <Crown className="w-8 h-8" />
          <div>
            <h3 className="text-xl font-bold">Upgrade to Premium</h3>
            <p className="text-orange-100">Unlock all 120 lessons and advanced features</p>
          </div>
        </div>
        
        <div className="space-y-3 mb-6">
          <div className="flex items-center gap-2">
            <CheckCircle className="w-5 h-5" />
            <span>Access to all 120 lessons</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle className="w-5 h-5" />
            <span>Advanced conversation scenarios</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle className="w-5 h-5" />
            <span>Detailed progress analytics</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle className="w-5 h-5" />
            <span>Priority support</span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <span className="text-2xl font-bold">₱499</span>
            <span className="text-orange-100 ml-1">one-time payment</span>
          </div>
          <button
            onClick={handleUpgrade}
            disabled={isLoading}
            className="bg-white text-orange-600 px-6 py-2 rounded-lg font-semibold hover:bg-orange-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Loading...
              </>
            ) : (
              'Upgrade Now'
            )}
          </button>
        </div>
      </div>
    )
  }

  if (variant === 'modal') {
    return (
      <div className={`bg-white rounded-lg shadow-lg p-6 max-w-md mx-auto ${className}`}>
        <div className="text-center mb-6">
          <Crown className="w-12 h-12 text-orange-500 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-gray-900">Unlock Premium Access</h3>
          <p className="text-gray-600 mt-2">Get access to all lessons and features</p>
        </div>

        <div className="space-y-3 mb-6">
          <div className="flex items-center gap-3">
            <CheckCircle className="w-5 h-5 text-green-500" />
            <span className="text-gray-700">All 120+ lessons unlocked</span>
          </div>
          <div className="flex items-center gap-3">
            <CheckCircle className="w-5 h-5 text-green-500" />
            <span className="text-gray-700">Advanced scenarios</span>
          </div>
          <div className="flex items-center gap-3">
            <CheckCircle className="w-5 h-5 text-green-500" />
            <span className="text-gray-700">Progress analytics</span>
          </div>
        </div>

        <div className="text-center mb-6">
                        <div className="text-3xl font-bold text-gray-900">₱499</div>
          <div className="text-sm text-gray-500">One-time payment</div>
        </div>

        <button
          onClick={handleUpgrade}
          disabled={isLoading}
          className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white py-3 rounded-lg font-semibold hover:from-orange-600 hover:to-red-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Loading...
            </>
          ) : (
            <>
              <Crown className="w-4 h-4" />
              Upgrade to Premium
            </>
          )}
        </button>
      </div>
    )
  }

  // Default button variant
  return (
    <button
      onClick={handleUpgrade}
      disabled={isLoading}
      className={`bg-gradient-to-r from-orange-500 to-red-500 text-white px-6 py-3 rounded-lg font-semibold hover:from-orange-600 hover:to-red-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 ${className}`}
    >
      {isLoading ? (
        <>
          <Loader2 className="w-4 h-4 animate-spin" />
          Loading...
        </>
      ) : (
        <>
          <Crown className="w-4 h-4" />
          Upgrade to Premium
        </>
      )}
    </button>
  )
} 
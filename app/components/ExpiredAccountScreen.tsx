'use client'

import Link from 'next/link'

export default function ExpiredAccountScreen() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg text-center">
        <div className="text-6xl mb-4">⏰</div>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Free Trial Expired
        </h2>
        <p className="text-gray-600 mb-6">
          Your 30-day free trial has ended. You can create a new account 
          or upgrade to premium to continue learning!
        </p>
        <div className="space-y-3">
          <Link 
            href="/payment"
            className="block w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white py-3 rounded-lg transition-colors font-medium"
          >
            Upgrade for ₱499 - Lifetime Access
          </Link>
          <Link 
            href="/auth/signup"
            className="block w-full bg-gray-200 text-gray-800 py-3 rounded-lg hover:bg-gray-300 transition-colors font-medium"
          >
            Create New Free Account
          </Link>
        </div>
        <p className="text-sm text-gray-500 mt-4">
          Just like Netflix or Spotify trials - upgrade to make it permanent!
        </p>
      </div>
    </div>
  )
} 
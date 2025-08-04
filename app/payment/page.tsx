'use client'

import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { useUser } from '../providers'
import { toast } from 'sonner'

export default function PaymentPage() {
  const router = useRouter()
  const { user } = useUser()

  const handleUpgradeSuccess = () => {
    toast.success('Payment successful! Welcome to premium! 🎉')
    router.push('/dashboard')
  }

  const handleUpgradeError = (error: string) => {
    toast.error(`Payment failed: ${error}`)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center text-gray-600 hover:text-gray-900">
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Home
            </Link>
            <div className="text-xl font-bold text-gray-900">UsapUpgrade</div>
            <div className="w-20"></div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Complete Your Purchase</h1>
          <p className="text-lg text-gray-600">Get lifetime access to all 120 professional lessons</p>
        </div>

        {/* Temporary Simple Button */}
        <div className="max-w-2xl mx-auto">
          <div className="bg-gradient-to-r from-orange-500 to-red-500 rounded-lg p-6 text-white text-center">
            <h3 className="text-xl font-bold mb-4">Upgrade to Premium</h3>
            <p className="mb-4">₱499 - One-time payment</p>
            <button 
              onClick={() => {
                toast.success('Gumroad integration coming soon!')
              }}
              className="bg-white text-orange-600 px-6 py-2 rounded-lg font-semibold hover:bg-orange-50 transition-colors"
            >
              Upgrade Now
            </button>
          </div>
        </div>
      </div>
    </div>
  )
} 
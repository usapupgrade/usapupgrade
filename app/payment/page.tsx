'use client'

import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, CheckCircle } from 'lucide-react'
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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* Gumroad Upgrade Component */}
          <div className="max-w-2xl mx-auto lg:max-w-none">
            <div className="bg-gradient-to-r from-orange-500 to-red-500 rounded-lg p-6 text-white">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                  <span className="text-orange-500 font-bold">₱</span>
                </div>
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
                  <span>Lifetime updates & new content</span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <span className="text-2xl font-bold">₱499</span>
                  <span className="text-orange-100 ml-1">one-time payment</span>
                  <div className="text-xs text-orange-200 mt-1">
                    ⚠️ Price increases to ₱799 after 1 month
                  </div>
                </div>
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

          {/* What You'll Get */}
          <div className="bg-white rounded-2xl shadow-sm border p-6 sm:p-8 h-fit">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">What You'll Get</h2>
            
            <div className="space-y-4 mb-0">
              <div className="flex items-start">
                <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                <div>
                  <p className="font-medium text-gray-900">All 120 Professional Lessons</p>
                  <p className="text-sm text-gray-600">Complete curriculum from basic to advanced</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                <div>
                  <p className="font-medium text-gray-900">Advanced Workplace Scenarios</p>
                  <p className="text-sm text-gray-600">Real-world professional situations</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                <div>
                  <p className="font-medium text-gray-900">Leadership Communication</p>
                  <p className="text-sm text-gray-600">Master leadership and management skills</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                <div>
                  <p className="font-medium text-gray-900">Conflict Resolution</p>
                  <p className="text-sm text-gray-600">Handle difficult conversations professionally</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                <div>
                  <p className="font-medium text-gray-900">Certificate of Completion</p>
                  <p className="text-sm text-gray-600">Downloadable PDF certificate</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                <div>
                  <p className="font-medium text-gray-900">Lifetime Access</p>
                  <p className="text-sm text-gray-600">No recurring payments, access forever</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 
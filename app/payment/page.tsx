'use client'

import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, CheckCircle, Shield, CreditCard, Star, Zap, Target, Award, Users } from 'lucide-react'
import { useUser } from '../providers'
import { toast } from 'sonner'
import PremiumUpgrade from '../components/PremiumUpgrade'

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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm shadow-sm border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center text-gray-600 hover:text-gray-900 transition-colors">
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Home
            </Link>
            <div className="text-xl font-bold text-gray-900 absolute left-1/2 transform -translate-x-1/2">UsapUpgrade</div>
            <div className="w-20"></div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Star className="w-4 h-4" />
            <span>Premium Access</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
            Upgrade Your Professional Communication
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
              Once and For All
            </span>
          </h1>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Get immediate, lifetime access to our complete 120-lesson curriculum designed to transform your workplace communication skills.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Main Upgrade Card */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
              {/* Header */}
              <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 p-8 text-white">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                    <Zap className="w-6 h-6" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold">Unlock Premium Access</h2>
                    <p className="text-blue-100">Transform your communication skills today</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-300" />
                    <span className="text-blue-100">Complete 120-lesson curriculum</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-300" />
                    <span className="text-blue-100">Real workplace scenarios</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-300" />
                    <span className="text-blue-100">Progress tracking & analytics</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-300" />
                    <span className="text-blue-100">Professional certificate</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-3xl font-bold">₱499</div>
                    <div className="text-blue-100 text-sm">One-time payment • Lifetime access</div>
                    <div className="text-xs text-blue-200 mt-1">
                      ⚡ Limited time offer • Price increases soon
                    </div>
                  </div>
                  <PremiumUpgrade 
                    variant="button"
                    onSuccess={handleUpgradeSuccess}
                    onError={handleUpgradeError}
                    className="bg-white text-blue-600 px-8 py-4 rounded-xl font-bold text-lg hover:bg-blue-50 transition-all shadow-lg hover:shadow-xl border-2 border-white"
                  />
                </div>
              </div>

              {/* Trust Indicators */}
              <div className="p-6 bg-gray-50">
                <div className="flex items-center justify-center gap-6 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <Shield className="w-4 h-4 text-green-500" />
                    <span>Secure Payment</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CreditCard className="w-4 h-4 text-blue-500" />
                    <span>Pay via Gumroad</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Benefits Sidebar */}
          <div className="space-y-6">
            {/* What You'll Achieve */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <Target className="w-5 h-5 text-blue-600" />
                What You'll Achieve
              </h3>
              
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <p className="font-semibold text-gray-900">Upgrade Every Conversation</p>
                    <p className="text-sm text-gray-600">From basic greetings to complex leadership discussions</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <p className="font-semibold text-gray-900">Build Unshakeable Confidence</p>
                    <p className="text-sm text-gray-600">Practice with real workplace scenarios that build your skills</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <p className="font-semibold text-gray-900">Accelerate Your Career</p>
                    <p className="text-sm text-gray-600">Develop leadership skills that open new opportunities</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <p className="font-semibold text-gray-900">Earn Recognition</p>
                    <p className="text-sm text-gray-600">Get a professional certificate to showcase your leveled up skills</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Urgency */}
            <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-2xl border border-orange-200 p-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-600 mb-2">⚡ Limited Time</div>
                <p className="text-sm text-orange-700">
                  Price increases to ₱799 after 30 days. 
                  Lock in your lifetime access today.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Secure Payment Note */}
      <div className="text-center mt-8">
        <p className="text-gray-400 text-sm">
          Secure payment using Gumroad
        </p>
      </div>
    </div>
  )
} 
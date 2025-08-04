'use client'

import { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { CheckCircle, ArrowRight, Download, Star } from 'lucide-react'
import { useUser } from '../../providers'
import { toast } from 'sonner'

export default function PaymentSuccessPage() {
  const [isLoading, setIsLoading] = useState(true)
  const [paymentDetails, setPaymentDetails] = useState<any>(null)
  const router = useRouter()
  const searchParams = useSearchParams()
  const { user, updateUser } = useUser()

  useEffect(() => {
    const token = searchParams.get('token')
    
    if (token) {
      // Verify payment with backend
      verifyPayment(token)
    } else {
      // For demo purposes, simulate successful payment
      simulateSuccessfulPayment()
    }
  }, [searchParams])

  const verifyPayment = async (orderId: string) => {
    try {
      const response = await fetch('/api/payment/capture', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          orderId,
          userId: user?.id
        })
      })

      const result = await response.json()
      
      if (result.success) {
        setPaymentDetails(result.capture)
        await updateUser({ subscription_status: 'premium' })
        toast.success('Payment verified! Welcome to premium! 🎉')
      } else {
        throw new Error(result.error || 'Payment verification failed')
      }
    } catch (error) {
      console.error('Payment verification error:', error)
      toast.error('Payment verification failed')
      router.push('/payment')
    } finally {
      setIsLoading(false)
    }
  }

  const simulateSuccessfulPayment = async () => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    setPaymentDetails({
      amount: 499,
      currency: 'PHP',
      payment_method: 'gcash',
      status: 'completed'
    })
    
    if (user) {
      await updateUser({ subscription_status: 'premium' })
    }
    
    toast.success('Payment successful! Welcome to premium! 🎉')
    setIsLoading(false)
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Verifying your payment...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-2xl mx-auto px-4 py-16">
        <div className="bg-white rounded-2xl shadow-sm border p-8 text-center">
          {/* Success Icon */}
          <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>

          {/* Success Message */}
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Payment Successful! 🎉
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            Welcome to UsapUpgrade Premium! You now have lifetime access to all 120 professional lessons.
          </p>

          {/* Payment Details */}
          {paymentDetails && (
            <div className="bg-gray-50 rounded-xl p-6 mb-8">
              <h3 className="font-semibold text-gray-900 mb-4">Payment Details</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Amount:</span>
                  <span className="font-medium">₱{paymentDetails.amount}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Payment Method:</span>
                  <span className="font-medium capitalize">{paymentDetails.payment_method}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Status:</span>
                  <span className="text-green-600 font-medium capitalize">{paymentDetails.status}</span>
                </div>
              </div>
            </div>
          )}

          {/* What's Next */}
          <div className="bg-blue-50 rounded-xl p-6 mb-8">
            <h3 className="font-semibold text-blue-900 mb-4">What's Next?</h3>
            <div className="space-y-3 text-left">
              <div className="flex items-start">
                <Star className="w-5 h-5 text-blue-600 mr-3 mt-0.5" />
                <div>
                  <p className="font-medium text-blue-900">Access All Lessons</p>
                  <p className="text-sm text-blue-700">Start with lesson 31 and beyond</p>
                </div>
              </div>
              <div className="flex items-start">
                <Star className="w-5 h-5 text-blue-600 mr-3 mt-0.5" />
                <div>
                  <p className="font-medium text-blue-900">Advanced Scenarios</p>
                  <p className="text-sm text-blue-700">Practice real workplace situations</p>
                </div>
              </div>
              <div className="flex items-start">
                <Star className="w-5 h-5 text-blue-600 mr-3 mt-0.5" />
                <div>
                  <p className="font-medium text-blue-900">Get Your Certificate</p>
                  <p className="text-sm text-blue-700">Download your completion certificate</p>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-4">
            <Link
              href="/dashboard"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-6 rounded-xl flex items-center justify-center transition-colors"
            >
              Go to Dashboard
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
            
            <Link
              href="/certificate"
              className="w-full bg-gray-100 hover:bg-gray-200 text-gray-900 font-semibold py-3 px-6 rounded-xl flex items-center justify-center transition-colors"
            >
              <Download className="w-4 h-4 mr-2" />
              Download Certificate
            </Link>
          </div>

          {/* Support */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <p className="text-sm text-gray-500">
              Need help? Contact us at{' '}
              <a href="mailto:support@usapupgrade.com" className="text-blue-600 hover:text-blue-700">
                support@usapupgrade.com
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
} 
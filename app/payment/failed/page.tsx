'use client'

import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { XCircle, ArrowLeft, RefreshCw, HelpCircle } from 'lucide-react'

export default function PaymentFailedPage() {
  const searchParams = useSearchParams()
  const errorCode = searchParams.get('error')
  const paymentIntentId = searchParams.get('pi')

  const getErrorMessage = (code: string | null) => {
    switch (code) {
      case 'insufficient_funds':
        return 'Insufficient funds in your account'
      case 'card_declined':
        return 'Your card was declined'
      case 'expired_card':
        return 'Your card has expired'
      case 'invalid_cvc':
        return 'Invalid security code'
      case 'processing_error':
        return 'Payment processing error'
      default:
        return 'Payment was not completed'
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-2xl mx-auto px-4 py-16">
        <div className="bg-white rounded-2xl shadow-sm border p-8 text-center">
          {/* Error Icon */}
          <div className="mx-auto w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-6">
            <XCircle className="w-8 h-8 text-red-600" />
          </div>

          {/* Error Message */}
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Payment Failed
          </h1>
          <p className="text-lg text-gray-600 mb-2">
            {getErrorMessage(errorCode)}
          </p>
          <p className="text-sm text-gray-500 mb-8">
            Don't worry, you haven't been charged. Please try again with a different payment method.
          </p>

          {/* Payment Details */}
          {paymentIntentId && (
            <div className="bg-gray-50 rounded-xl p-6 mb-8">
              <h3 className="font-semibold text-gray-900 mb-4">Payment Reference</h3>
              <p className="text-sm text-gray-600 font-mono bg-white p-2 rounded border">
                {paymentIntentId}
              </p>
              <p className="text-xs text-gray-500 mt-2">
                Keep this reference number if you need support
              </p>
            </div>
          )}

          {/* Common Solutions */}
          <div className="bg-blue-50 rounded-xl p-6 mb-8">
            <h3 className="font-semibold text-blue-900 mb-4">Try These Solutions</h3>
            <div className="space-y-3 text-left">
              <div className="flex items-start">
                <HelpCircle className="w-5 h-5 text-blue-600 mr-3 mt-0.5" />
                <div>
                  <p className="font-medium text-blue-900">Check Your Balance</p>
                  <p className="text-sm text-blue-700">Ensure you have sufficient funds</p>
                </div>
              </div>
              <div className="flex items-start">
                <HelpCircle className="w-5 h-5 text-blue-600 mr-3 mt-0.5" />
                <div>
                  <p className="font-medium text-blue-900">Try Different Method</p>
                  <p className="text-sm text-blue-700">Use GCash, GrabPay, or another card</p>
                </div>
              </div>
              <div className="flex items-start">
                <HelpCircle className="w-5 h-5 text-blue-600 mr-3 mt-0.5" />
                <div>
                  <p className="font-medium text-blue-900">Contact Support</p>
                  <p className="text-sm text-blue-700">We're here to help you complete your purchase</p>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-4">
            <Link
              href="/payment"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-6 rounded-xl flex items-center justify-center transition-colors"
            >
              <RefreshCw className="w-5 h-5 mr-2" />
              Try Again
            </Link>
            
            <Link
              href="/"
              className="w-full bg-gray-100 hover:bg-gray-200 text-gray-900 font-semibold py-3 px-6 rounded-xl flex items-center justify-center transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Link>
          </div>

          {/* Support */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <p className="text-sm text-gray-500 mb-2">
              Need help? Contact our support team:
            </p>
            <div className="space-y-1 text-sm">
              <p className="text-gray-600">
                📧 <a href="mailto:support@usapupgrade.com" className="text-blue-600 hover:text-blue-700">
                  support@usapupgrade.com
                </a>
              </p>
              <p className="text-gray-600">
                💬 WhatsApp: +63 912 345 6789
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 
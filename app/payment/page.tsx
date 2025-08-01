'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, CreditCard, Shield, CheckCircle, Tag, Plus } from 'lucide-react'
import { upgradeToPremium } from '../data/userSubscription'
import { useUser } from '../providers'
import { toast } from 'sonner'

export default function PaymentPage() {
  const [isProcessing, setIsProcessing] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState<'gcash' | 'grabpay' | 'card'>('gcash')
  const [voucherCode, setVoucherCode] = useState('')
  const [isApplyingVoucher, setIsApplyingVoucher] = useState(false)
  const [appliedVoucher, setAppliedVoucher] = useState<{code: string, discount: number} | null>(null)
  const [showVoucherInput, setShowVoucherInput] = useState(false)
  const router = useRouter()
  const { user, updateUser } = useUser()

  const originalPrice = 1999
  const discountedPrice = 499
  const finalPrice = appliedVoucher ? Math.max(discountedPrice - appliedVoucher.discount, 0) : discountedPrice

  const handleApplyVoucher = async () => {
    if (!voucherCode.trim()) {
      toast.error('Please enter a voucher code')
      return
    }

    setIsApplyingVoucher(true)
    
    try {
      // Call the API to validate voucher
      const response = await fetch('/api/vouchers/validate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          voucherCode: voucherCode.trim(),
          userId: user?.id || 'anonymous',
          orderAmount: discountedPrice
        })
      })

      const result = await response.json()

      if (result.valid) {
        setAppliedVoucher({ 
          code: voucherCode.toUpperCase(), 
          discount: result.discount_amount 
        })
        toast.success(`Voucher applied! You saved ₱${result.discount_amount}`)
      } else {
        // For demo purposes, allow a demo voucher code
        if (voucherCode.trim().toUpperCase() === 'DEMO50') {
          const demoDiscount = 50
          setAppliedVoucher({ 
            code: 'DEMO50', 
            discount: demoDiscount 
          })
          toast.success(`Demo voucher applied! You saved ₱${demoDiscount}`)
        } else {
          toast.error(result.error || 'Invalid voucher code')
        }
      }
    } catch (error) {
      console.error('Voucher validation error:', error)
      // For demo purposes, allow a demo voucher code even if API fails
      if (voucherCode.trim().toUpperCase() === 'DEMO50') {
        const demoDiscount = 50
        setAppliedVoucher({ 
          code: 'DEMO50', 
          discount: demoDiscount 
        })
        toast.success(`Demo voucher applied! You saved ₱${demoDiscount}`)
      } else {
        toast.error('Failed to validate voucher. Please try again.')
      }
    } finally {
      setIsApplyingVoucher(false)
    }
  }

  const handleRemoveVoucher = () => {
    setAppliedVoucher(null)
    setVoucherCode('')
    setShowVoucherInput(false)
    toast.success('Voucher removed')
  }

  const handlePayment = async () => {
    setIsProcessing(true)
    
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    // Upgrade user to premium
    upgradeToPremium()
    
    // Update user context to premium
    if (user) {
      await updateUser({
        subscription_status: 'premium'
      })
    }
    
    // Show success message
    toast.success('Payment successful! Welcome to premium! 🎉')
    
    // Redirect to dashboard
    router.push('/dashboard')
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
          {/* Payment Form */}
          <div className="bg-white rounded-2xl shadow-sm border p-6 sm:p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Payment Details</h2>
            
            {/* Price Display */}
            <div className="bg-blue-50 rounded-xl p-4 mb-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Amount</p>
                  <div className="flex items-center">
                    <span className="text-3xl font-bold text-blue-600">₱{finalPrice}</span>
                    <span className="text-lg text-gray-400 line-through ml-2">₱{originalPrice}</span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm text-green-600 font-semibold">Save ₱{originalPrice - finalPrice}</p>
                  <p className="text-xs text-gray-500">One-time payment</p>
                </div>
              </div>
              {appliedVoucher && (
                <div className="mt-3 pt-3 border-t border-blue-200">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-blue-700">Voucher applied: {appliedVoucher.code}</span>
                    <span className="text-green-600">-₱{appliedVoucher.discount}</span>
                  </div>
                </div>
              )}
            </div>

            {/* Voucher Code Section */}
            <div className="mb-6">
              {!showVoucherInput && !appliedVoucher ? (
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Voucher savings:</span>
                  <button
                    type="button"
                    onClick={() => setShowVoucherInput(true)}
                    className="text-blue-600 hover:text-blue-700 font-medium flex items-center cursor-pointer"
                  >
                    <Plus className="w-4 h-4 mr-1" />
                    Apply a voucher
                  </button>
                </div>
              ) : (
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Have a voucher code? <span className="text-gray-400 text-sm font-normal">(Optional)</span></h3>
                  <p className="text-xs text-gray-500 mb-3">💡 Demo: Try "DEMO50" for ₱50 off</p>
                  <div className="flex space-x-2">
                    <div className="relative flex-1">
                      <Tag className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        type="text"
                        value={voucherCode}
                        onChange={(e) => setVoucherCode(e.target.value)}
                        placeholder="Enter voucher code"
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        disabled={appliedVoucher !== null}
                      />
                    </div>
                    {!appliedVoucher ? (
                      <button
                        onClick={handleApplyVoucher}
                        disabled={isApplyingVoucher || !voucherCode.trim()}
                        className="px-4 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-semibold rounded-xl transition-colors"
                      >
                        {isApplyingVoucher ? 'Applying...' : 'Apply'}
                      </button>
                    ) : (
                      <button
                        onClick={handleRemoveVoucher}
                        className="px-4 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-xl transition-colors"
                      >
                        Remove
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Payment Methods */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Choose Payment Method</h3>
              <div className="space-y-3">
                <label className="flex items-center p-4 border rounded-xl cursor-pointer hover:bg-gray-50">
                  <input
                    type="radio"
                    name="payment"
                    value="gcash"
                    checked={paymentMethod === 'gcash'}
                    onChange={() => setPaymentMethod('gcash')}
                    className="mr-3"
                  />
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center mr-3">
                      <span className="text-green-600 font-bold text-sm">G</span>
                    </div>
                    <span className="font-medium">GCash</span>
                  </div>
                </label>
                
                <label className="flex items-center p-4 border rounded-xl cursor-pointer hover:bg-gray-50">
                  <input
                    type="radio"
                    name="payment"
                    value="grabpay"
                    checked={paymentMethod === 'grabpay'}
                    onChange={() => setPaymentMethod('grabpay')}
                    className="mr-3"
                  />
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center mr-3">
                      <span className="text-green-600 font-bold text-sm">G</span>
                    </div>
                    <span className="font-medium">GrabPay</span>
                  </div>
                </label>
                
                <label className="flex items-center p-4 border rounded-xl cursor-pointer hover:bg-gray-50">
                  <input
                    type="radio"
                    name="payment"
                    value="card"
                    checked={paymentMethod === 'card'}
                    onChange={() => setPaymentMethod('card')}
                    className="mr-3"
                  />
                  <div className="flex items-center">
                    <CreditCard className="w-8 h-8 text-blue-600 mr-3" />
                    <span className="font-medium">Credit/Debit Card</span>
                  </div>
                </label>
              </div>
            </div>

            {/* Pay Button */}
            <button
              onClick={handlePayment}
              disabled={isProcessing}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-bold py-4 px-6 rounded-xl text-center transition-colors"
            >
              {isProcessing ? 'Processing Payment...' : `Pay ₱${finalPrice}`}
            </button>

            <div className="flex items-center justify-center mt-4 text-sm text-gray-500">
              <Shield className="w-4 h-4 mr-2" />
              Secure payment powered by PayMongo
            </div>
          </div>

          {/* Order Summary */}
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
'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Shield, CheckCircle, Tag, Plus, Crown } from 'lucide-react'
import { useUser } from '../providers'
import { toast } from 'sonner'
import PremiumUpgrade from '@/app/components/PremiumUpgrade'

export default function PaymentPage() {
  const [voucherCode, setVoucherCode] = useState('')
  const [isApplyingVoucher, setIsApplyingVoucher] = useState(false)
  const [appliedVoucher, setAppliedVoucher] = useState<{code: string, discount: number} | null>(null)
  const [showVoucherInput, setShowVoucherInput] = useState(false)
  const router = useRouter()
  const { user } = useUser()

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

        {/* Gumroad Upgrade Component */}
        <div className="max-w-2xl mx-auto">
          <PremiumUpgrade
            userEmail={user?.email}
            variant="card"
            onSuccess={handleUpgradeSuccess}
            onError={handleUpgradeError}
          />
        </div>
      </div>
    </div>
  )
} 
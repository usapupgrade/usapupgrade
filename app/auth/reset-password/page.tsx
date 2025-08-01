'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft, Lock, Eye, EyeOff, CheckCircle, X } from 'lucide-react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { supabase } from '@/lib/supabase'

export default function ResetPasswordPage() {
  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: ''
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()
  const searchParams = useSearchParams()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    // Validate passwords match
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match')
      return
    }

    // Validate password strength
    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long')
      return
    }

    setLoading(true)

    try {
      const { error } = await supabase.auth.updateUser({
        password: formData.password
      })

      if (error) {
        setError(error.message)
      } else {
        setSuccess(true)
        // Redirect to login after 3 seconds
        setTimeout(() => {
          router.push('/auth/signin')
        }, 3000)
      }
    } catch (error) {
      console.error('Password reset error:', error)
      setError('Failed to reset password. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-primary-100 flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <Link href="/auth/signin" className="inline-flex items-center text-primary-600 hover:text-primary-900 mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Sign In
          </Link>
          
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">UU</span>
            </div>
            <span className="text-xl font-bold text-primary-900">UsapUpgrade</span>
          </div>
          
          <h1 className="text-2xl font-bold text-primary-900 mb-2">
            Reset Your Password
          </h1>
          
          <p className="text-primary-600">
            Enter your new password below
          </p>
        </div>

        {!success ? (
          /* Reset Password Form */
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-primary-700 mb-2">
                  New Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-primary-400 w-5 h-5" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    value={formData.password}
                    onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                    className="w-full px-4 py-3 pl-10 pr-10 border border-primary-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
                    placeholder="Enter your new password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-primary-400 hover:text-primary-600"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                <p className="text-xs text-primary-500 mt-1">
                  Password must be at least 6 characters long
                </p>
              </div>
              
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-primary-700 mb-2">
                  Confirm New Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-primary-400 w-5 h-5" />
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    id="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                    className="w-full px-4 py-3 pl-10 pr-10 border border-primary-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
                    placeholder="Confirm your new password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-primary-400 hover:text-primary-600"
                  >
                    {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                  <p className="text-sm text-red-600">{error}</p>
                </div>
              )}

              <button
                type="submit"
                disabled={loading || !formData.password || !formData.confirmPassword}
                className="w-full py-3 px-6 bg-primary-600 text-white rounded-xl hover:bg-primary-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-semibold"
              >
                {loading ? 'Resetting Password...' : 'Reset Password'}
              </button>
            </form>
          </motion.div>
        ) : (
          /* Success Message */
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="text-center"
          >
            <div className="bg-white rounded-lg p-6 shadow-lg">
              <div className="flex justify-center mb-4">
                <CheckCircle className="w-12 h-12 text-green-500" />
              </div>
              <h2 className="text-xl font-semibold text-primary-900 mb-2">Password Reset Successfully</h2>
              <p className="text-sm text-primary-600 mb-4">
                Your password has been updated. You can now sign in with your new password.
              </p>
              <div className="text-xs text-primary-500">
                Redirecting to sign in page...
              </div>
            </div>
          </motion.div>
        )}

        {/* Footer */}
        <div className="text-center mt-8">
          <p className="text-sm text-primary-600">
            Remember your password?{' '}
            <Link href="/auth/signin" className="text-accent-600 hover:text-accent-700 font-medium">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
} 
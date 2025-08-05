'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, CheckCircle, Eye, EyeOff } from 'lucide-react'
import { useUser } from '../../providers'
import { toast } from 'sonner'
import { motion } from 'framer-motion'

export default function SignUpPage() {
  const router = useRouter()
  const { signUp, signInWithGoogle } = useUser()
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  })
  const [error, setError] = useState('')

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
    setError('')
  }

  const handleEmailSignUp = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    // Validate passwords match
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match')
      setIsLoading(false)
      return
    }

    // Validate password strength
    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long')
      setIsLoading(false)
      return
    }

    try {
      const result = await signUp(formData.email, formData.password, formData.name)
      if (result.success) {
        toast.success('Account created successfully! Please check your email to verify your account.')
        router.push('/auth/signin')
      } else {
        setError(result.error || 'Sign up failed')
      }
    } catch (error) {
      setError('An unexpected error occurred')
    } finally {
      setIsLoading(false)
    }
  }

  const handleGoogleSignUp = async () => {
    try {
      setIsLoading(true)
      setError('')
      toast.loading('Signing up with Google...')
      
      const result = await signInWithGoogle()
      if (!result.success) {
        toast.dismiss()
        setError(result.error || 'Google sign up failed')
      }
    } catch (error) {
      toast.dismiss()
      setError('An unexpected error occurred')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm shadow-sm border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center text-gray-600 hover:text-gray-900 transition-colors">
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Home
            </Link>
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm sm:text-base">UU</span>
              </div>
              <span className="text-lg sm:text-xl font-bold text-gray-900">UsapUpgrade</span>
            </div>
            <div className="w-20"></div>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 py-8 sm:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Left Column - Sign Up Form */}
          <div className="flex items-center justify-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="w-full max-w-md"
            >
              {/* Welcome Section */}
              <div className="text-center mb-8">
                <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                  Start Your Journey
                </h1>
                <p className="text-lg text-gray-600 mb-8">
                  Join thousands of Filipinos mastering professional conversations
                </p>
              </div>

              {/* Sign Up Form */}
              <div className="bg-white rounded-2xl shadow-xl p-8">
                {/* Google Sign Up */}
                <button
                  onClick={handleGoogleSignUp}
                  disabled={isLoading}
                  className="w-full flex items-center justify-center space-x-3 py-4 px-6 border-2 border-gray-200 rounded-2xl bg-white hover:bg-gray-50 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1 duration-200 disabled:opacity-50 font-semibold text-gray-700"
                >
                  <svg className="w-6 h-6" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  <span>{isLoading ? 'Creating Account...' : 'Continue with Google'}</span>
                </button>

                {/* Trust Building Message */}
                <div className="text-center space-y-2 mt-6">
                  <p className="text-sm text-gray-500">
                    Sign up securely with your Google account
                  </p>
                  <p className="text-xs text-gray-400">
                    Powered by Supabase authentication
                  </p>
                </div>

                <div className="text-center mt-6">
                  <p className="text-sm text-gray-600">
                    Already have an account?{' '}
                    <Link href="/auth/signin" className="text-blue-600 hover:text-blue-700 font-medium">
                      Sign in
                    </Link>
                  </p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Column - Benefits */}
          <div className="flex items-center justify-center">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="w-full max-w-md space-y-6"
            >
              {/* Start Your Journey Card */}
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl shadow-lg p-6 border border-blue-100">
                <div className="flex items-center mb-4">
                  <h2 className="text-xl font-bold text-gray-900">Start Your Professional Conversation Journey!</h2>
                  <span className="ml-2">🎉</span>
                </div>
                <ul className="space-y-3">
                  <li className="flex items-center gap-3">
                    <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    </div>
                    <span className="text-sm text-gray-700">30 FREE lessons to build your confidence</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    </div>
                    <span className="text-sm text-gray-700">Learn at your own pace for 30 days</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    </div>
                    <span className="text-sm text-gray-700">Upgrade anytime to keep your progress forever</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-5 h-5 bg-blue-100 rounded-full flex items-center justify-center">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    </div>
                    <span className="text-sm text-blue-700">Your free access expires in 30 days, but you can always re-register or upgrade to save your progress!</span>
                  </li>
                </ul>
              </div>

              {/* What You'll Get Card */}
              <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
                <h3 className="text-lg font-bold text-gray-900 mb-4">What You'll Get</h3>
                <ul className="space-y-3">
                  <li className="flex items-center gap-3">
                    <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    </div>
                    <span className="text-sm text-gray-700">30 Free Foundation Lessons</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    </div>
                    <span className="text-sm text-gray-700">Filipino Professional Scenarios</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    </div>
                    <span className="text-sm text-gray-700">Progress Tracking & Achievements</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    </div>
                    <span className="text-sm text-gray-700">Daily Learning Reminders</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    </div>
                    <span className="text-sm text-gray-700">Mobile App Experience</span>
                  </li>
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
} 
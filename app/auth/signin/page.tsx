'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft, Sparkles } from 'lucide-react'
import Link from 'next/link'
import { useUser } from '../../providers'
import { useRouter } from 'next/navigation'

export default function SignInPage() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const { user, loading: userLoading, signInWithGoogle } = useUser()
  const router = useRouter()



  // Redirect authenticated users to dashboard
  useEffect(() => {
    if (!userLoading && user) {
      console.log('User authenticated, redirecting to dashboard')
      // Add a small delay to ensure the auth state is stable
      setTimeout(() => {
        router.push('/dashboard')
      }, 100)
    }
  }, [user, userLoading, router])

  // Show loading screen if user is authenticated
  if (!userLoading && user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Signing you in...</p>
        </div>
      </div>
    )
  }

  const handleGoogleSignIn = async () => {
    setLoading(true)
    setError('')

    try {
      await signInWithGoogle()
    } catch (error) {
      setError('An unexpected error occurred')
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      {/* Header */}
      <header className="relative bg-white/80 backdrop-blur-sm shadow-sm border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center text-gray-600 hover:text-gray-900 transition-colors text-sm sm:text-base">
              <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 mr-1 sm:mr-2" />
              <span className="hidden sm:inline">Back to Home</span>
              <span className="sm:hidden">Back</span>
            </Link>
            <div className="absolute left-1/2 transform -translate-x-1/2 flex items-center space-x-3">
              <motion.div 
                className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center"
                whileHover={{ scale: 1.05, rotate: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <span className="text-white font-bold text-sm sm:text-base">UU</span>
              </motion.div>
              <motion.span 
                className="text-lg sm:text-xl font-bold text-gray-900"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                UsapUpgrade
              </motion.span>
            </div>
            <div className="w-20"></div>
          </div>
        </div>
      </header>

      {/* Main Content - Centered */}
      <div className="relative flex items-center justify-center min-h-[calc(100vh-80px)] px-4 sm:px-6 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          {/* Welcome Section */}
          <div className="text-center mb-10">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-5 py-3 rounded-full text-sm font-semibold mb-6 shadow-lg"
            >
              <Sparkles className="w-4 h-4" />
              Welcome Back
            </motion.div>
            <motion.h1 
              className="text-2xl sm:text-4xl font-bold text-gray-900 mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              Continue Your Journey
            </motion.h1>
            <motion.p 
              className="text-base sm:text-lg text-gray-600"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              Pick up where you left off
            </motion.p>
          </div>

          {/* Sign In Form - Enhanced Glassmorphism Design */}
          <motion.div 
            className="relative"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6 }}
          >
            {/* Background blur effect with enhanced styling */}
            <div className="absolute inset-0 bg-white/30 backdrop-blur-2xl rounded-2xl border border-white/40 shadow-2xl"></div>
            
            {/* Animated border gradient */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 blur-xl animate-pulse"></div>
            
            {/* Content */}
            <div className="relative bg-white/20 backdrop-blur-sm rounded-2xl p-8 border border-white/30 shadow-2xl">
              {/* Google Sign In */}
              <motion.button
                onClick={handleGoogleSignIn}
                disabled={loading}
                className="w-full flex items-center justify-center space-x-3 py-4 px-6 bg-white/95 backdrop-blur-sm border border-white/60 rounded-2xl hover:bg-white transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1 duration-200 disabled:opacity-50 font-semibold text-gray-700"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <svg className="w-6 h-6" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                <span>{loading ? 'Signing in...' : 'Continue with Google'}</span>
              </motion.button>

              {/* Trust Building Message */}
              <motion.div 
                className="text-center space-y-2 mt-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
              >
                <p className="text-sm text-gray-600">
                  Sign in securely with your Google account
                </p>
                <p className="text-xs text-gray-500">
                  Powered by Supabase authentication
                </p>
              </motion.div>

              <motion.div 
                className="text-center mt-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.9 }}
              >
                <p className="text-sm text-gray-600">
                  Don't have an account?{' '}
                  <Link href="/auth/signup" className="text-blue-600 hover:text-blue-700 font-medium transition-colors">
                    Sign up
                  </Link>
                </p>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
} 
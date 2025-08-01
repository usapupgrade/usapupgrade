'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Lock, Eye, EyeOff, AlertCircle } from 'lucide-react'

export default function AdminAccess() {
  const [code, setCode] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    // Simple admin code check (in production, this would be more secure)
    if (code === 'convomaster2024') {
      // Store admin session (in production, use proper authentication)
      localStorage.setItem('admin_authenticated', 'true')
      router.push('/admin')
    } else {
      setError('Invalid admin code')
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-primary-50 flex items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <div className="card">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-r from-accent-500 to-accent-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Lock className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-primary-900 mb-2">
              UsapUpgrade Admin Access
            </h1>
            <p className="text-primary-600">
              Enter your admin code to access the dashboard
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="code" className="block text-sm font-medium text-primary-700 mb-2">
                Admin Code
              </label>
              <div className="relative">
                <input
                  id="code"
                  type={showPassword ? 'text' : 'password'}
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  className="input-field w-full pr-10"
                  placeholder="Enter admin code"
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
            </div>

            {error && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex items-center space-x-2 p-3 bg-error-50 border border-error-200 rounded-lg text-error-700"
              >
                <AlertCircle className="w-5 h-5" />
                <span className="text-sm">{error}</span>
              </motion.div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full flex items-center justify-center"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
              ) : (
                <Lock className="w-5 h-5 mr-2" />
              )}
              {loading ? 'Verifying...' : 'Access Dashboard'}
            </button>
          </form>

          <div className="mt-8 text-center">
            <a href="/" className="text-sm text-primary-600 hover:text-primary-900 transition-colors">
              ← Back to Home
            </a>
          </div>
        </div>
      </motion.div>
    </div>
  )
} 
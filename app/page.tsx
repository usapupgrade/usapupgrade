'use client'

import Link from 'next/link'

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900">
      {/* Simple Header */}
      <header className="bg-white/10 backdrop-blur-sm border-b border-white/20 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-16">
            <div className="flex items-center">
              <div className="text-lg sm:text-2xl font-bold">
                <span className="text-orange-400">Usap</span><span className="text-blue-300">Upgrade</span>
              </div>
            </div>
            <div className="hidden sm:flex items-center space-x-4">
              <Link 
                href="/auth/signup" 
                className="text-white hover:text-blue-200 transition-colors text-sm sm:text-base"
              >
                Sign Up
              </Link>
              <Link 
                href="/auth/signup" 
                className="bg-white text-blue-900 px-4 py-2 rounded-lg font-semibold hover:bg-blue-50 transition-colors text-sm sm:text-base"
              >
                Start Learning
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Simple Hero Section */}
      <section className="text-center py-12 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 sm:mb-8 lg:mb-10 leading-tight">
            Stop Being Invisible in Filipino Workplaces
            <br />
            <span className="text-yellow-300">Upgrade Your Communication Skills in Just 5 Minutes Daily</span>
          </h1>
          
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl mb-6 sm:mb-8 lg:mb-10 text-blue-100 max-w-3xl mx-auto leading-relaxed px-2">
            Learn professional communication, cultural navigation, and career-advancing conversations through 
            <strong className="text-yellow-300"> gamified, interactive lessons</strong> that make learning engaging and fun.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center mb-10 sm:mb-12 lg:mb-16 px-4">
            <Link 
              href="/auth/signup" 
              className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-4 sm:py-5 px-6 sm:px-8 rounded-xl text-center transition-colors text-base sm:text-lg w-full sm:w-auto"
            >
              Start Learning for Free
            </Link>
            <Link 
              href="/test-page" 
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 sm:py-5 px-6 sm:px-8 rounded-xl text-center transition-colors text-base sm:text-lg w-full sm:w-auto"
            >
              Test Page
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

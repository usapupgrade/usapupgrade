'use client'

import Link from 'next/link'
import { CheckCircle, Star, Users, TrendingUp, Award, Zap, BookOpen, Target } from 'lucide-react'

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900">
      {/* Header */}
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
            {/* Mobile menu button */}
            <div className="sm:hidden">
              <button className="text-white p-2">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
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
          
          <p className="text-base sm:text-lg lg:text-xl font-semibold text-white mb-8 sm:mb-10 lg:mb-12 px-2">
            <strong>Start with 30 FREE lessons, then upgrade for lifetime access to all 120+ scenarios.</strong>
          </p>

          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center mb-10 sm:mb-12 lg:mb-16 px-4">
            <Link 
              href="/auth/signup" 
              className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-4 sm:py-5 px-6 sm:px-8 rounded-xl text-center transition-colors text-base sm:text-lg w-full sm:w-auto"
            >
              Start Learning for Free
            </Link>
            <Link 
              href="/auth/signup" 
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 sm:py-5 px-6 sm:px-8 rounded-xl text-center transition-colors text-base sm:text-lg w-full sm:w-auto"
            >
              Get Complete Course
            </Link>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-8 lg:gap-10 text-blue-100 text-base sm:text-lg px-4">
            <div className="flex items-center">
              <span>🚀 Career-Focused Training</span>
            </div>
            <div className="flex items-center">
              <span>💼 Workplace Communication</span>
            </div>
            <div className="flex items-center">
              <span>🎯 Easy-to-Follow Lessons</span>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-8 sm:py-12 lg:py-16 px-4 sm:px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8 sm:mb-12 lg:mb-16">
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-4 sm:mb-6">
              Why Filipino Professionals Choose <span className="text-orange-400">Usap</span><span className="text-blue-300">Upgrade</span>
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto px-2">
              Built specifically for Filipino professionals who want to excel in workplace conversations and advance their careers
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            <div className="text-center p-6 sm:p-8">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
                <Target className="w-8 h-8 sm:w-10 sm:h-10 text-blue-600" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3 sm:mb-4">Cultural Context</h3>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                Master Filipino workplace dynamics, overcome "hiya" culture, and navigate office hierarchy with confidence
              </p>
            </div>
            <div className="text-center p-6 sm:p-8">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
                <Zap className="w-8 h-8 sm:w-10 sm:h-10 text-green-600" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3 sm:mb-4">Gamified Learning</h3>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                Earn XP, unlock achievements, and track your progress with engaging interactive scenarios
              </p>
            </div>
            <div className="text-center p-6 sm:p-8">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
                <Award className="w-8 h-8 sm:w-10 sm:h-10 text-purple-600" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3 sm:mb-4">Career Advancement</h3>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                Master client meetings, leadership communication, and conflict resolution for career growth
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* What You'll Master Section */}
      <section className="py-8 sm:py-12 lg:py-16 px-4 sm:px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8 sm:mb-12 lg:mb-16">
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-4 sm:mb-6">
              What You'll Master as a Filipino Professional
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto px-2">
              From overcoming "hiya" to leading teams - comprehensive communication skills for career success
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            <div className="bg-white rounded-xl p-6 sm:p-8 shadow-sm border border-gray-200 text-center">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-blue-100 rounded-lg flex items-center justify-center mb-4 sm:mb-6 mx-auto">
                <Users className="w-6 h-6 sm:w-8 sm:h-8 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-3 sm:mb-4 text-base sm:text-lg">Foundation Skills</h3>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed">Overcome "hiya," master workplace etiquette, and build confidence in daily interactions</p>
            </div>
            <div className="bg-white rounded-xl p-6 sm:p-8 shadow-sm border border-gray-200 text-center">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-green-100 rounded-lg flex items-center justify-center mb-4 sm:mb-6 mx-auto">
                <TrendingUp className="w-6 h-6 sm:w-8 sm:h-8 text-green-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-3 sm:mb-4 text-base sm:text-lg">Client Relations</h3>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed">Master client meetings, negotiations, and external professional relationships</p>
            </div>
            <div className="bg-white rounded-xl p-6 sm:p-8 shadow-sm border border-gray-200 text-center">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-purple-100 rounded-lg flex items-center justify-center mb-4 sm:mb-6 mx-auto">
                <Star className="w-6 h-6 sm:w-8 sm:h-8 text-purple-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-3 sm:mb-4 text-base sm:text-lg">Leadership Skills</h3>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed">Excel in team management, conflict resolution, and executive communication</p>
            </div>
            <div className="bg-white rounded-xl p-6 sm:p-8 shadow-sm border border-gray-200 text-center">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-orange-100 rounded-lg flex items-center justify-center mb-4 sm:mb-6 mx-auto">
                <Award className="w-6 h-6 sm:w-8 sm:h-8 text-orange-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-3 sm:mb-4 text-base sm:text-lg">Career Growth</h3>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed">Navigate promotions, salary negotiations, and professional networking opportunities</p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-8 sm:py-12 lg:py-16 px-4 sm:px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8 sm:mb-12 lg:mb-16">
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-4 sm:mb-6">
              Choose Your Learning Path
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl mx-auto px-2">
              Start free and upgrade when you're ready for advanced skills
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 max-w-4xl mx-auto">
            {/* Free Tier */}
            <div className="bg-white rounded-2xl border-2 border-gray-200 p-4 sm:p-6 lg:p-8">
              <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-2 sm:mb-3 text-center">Free Foundation</h3>
              <div className="flex items-center justify-center mb-3 sm:mb-4">
                <span className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-600">₱0</span>
                <span className="text-base sm:text-lg md:text-xl text-gray-400 ml-2">Forever</span>
              </div>
              <p className="text-gray-600 mb-3 sm:mb-4 text-sm sm:text-base text-center">Perfect for getting started</p>
              
              <ul className="space-y-2 sm:space-y-3 mb-4 sm:mb-6">
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-green-500 mr-3 sm:mr-4 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700 text-sm sm:text-base">First 30 Lessons</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-green-500 mr-3 sm:mr-4 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700 text-sm sm:text-base">Basic Workplace Scenarios</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-green-500 mr-3 sm:mr-4 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700 text-sm sm:text-base">Progress Tracking</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-green-500 mr-3 sm:mr-4 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700 text-sm sm:text-base">Achievement System</span>
                </li>
              </ul>

              <div className="flex justify-center">
                <Link 
                  href="/auth/signup" 
                  className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-6 sm:px-8 rounded-xl text-center transition-colors text-base sm:text-lg"
                >
                  Start Learning for Free
                </Link>
              </div>
            </div>

            {/* Premium Tier */}
            <div className="bg-white rounded-2xl border-2 border-blue-500 p-4 sm:p-6 lg:p-8 relative">
              <div className="absolute -top-3 sm:-top-4 left-1/2 transform -translate-x-1/2">
                <span className="bg-blue-500 text-white px-3 sm:px-4 py-1 sm:py-2 rounded-full text-xs sm:text-sm font-semibold">
                  Most Popular
                </span>
              </div>
              
              <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-2 sm:mb-3 text-center">Complete Professional Course</h3>
              <div className="flex items-center justify-center mb-3 sm:mb-4">
                <span className="text-2xl sm:text-3xl md:text-4xl font-bold text-blue-600">₱499</span>
                <span className="text-base sm:text-lg md:text-xl text-gray-400 line-through ml-2">₱1,999</span>
              </div>
              <p className="text-gray-600 mb-3 sm:mb-4 text-sm sm:text-base text-center">One-time payment • Lifetime access</p>
              
              <ul className="space-y-2 sm:space-y-3 mb-4 sm:mb-6">
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-green-500 mr-3 sm:mr-4 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700 text-sm sm:text-base">All 120+ Professional Lessons</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-green-500 mr-3 sm:mr-4 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700 text-sm sm:text-base">Advanced Client Relations</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-green-500 mr-3 sm:mr-4 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700 text-sm sm:text-base">Leadership Communication</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-green-500 mr-3 sm:mr-4 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700 text-sm sm:text-base">Conflict Resolution</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-green-500 mr-3 sm:mr-4 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700 text-sm sm:text-base">Career Advancement Skills</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-green-500 mr-3 sm:mr-4 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700 text-sm sm:text-base">Offline Access</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-green-500 mr-3 sm:mr-4 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700 text-sm sm:text-base">Certificate of Completion</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-green-500 mr-3 sm:mr-4 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700 text-sm sm:text-base">All Future Updates</span>
                </li>
              </ul>

              <div className="flex justify-center">
                <Link 
                  href="/auth/signup" 
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-6 sm:px-8 rounded-xl text-center transition-colors text-base sm:text-lg"
                >
                  Get Complete Course
                </Link>
              </div>
              <p className="text-xs text-gray-500 text-center mt-2">
                Secure payment via GCash, GrabPay, or Credit Card
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-6 sm:py-8 lg:py-12 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center">
            <div className="text-lg sm:text-xl md:text-2xl font-bold mb-4 sm:mb-6">
              <span className="text-orange-400">Usap</span><span className="text-blue-300">Upgrade</span>
            </div>
            <p className="text-gray-400 mb-6 sm:mb-8 text-sm sm:text-base">
              The complete conversation skills course for Filipino professionals
            </p>
            <div className="flex flex-col sm:flex-row justify-center space-y-2 sm:space-y-0 sm:space-x-6 text-xs sm:text-sm text-gray-400">
              <Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link>
              <Link href="#" className="hover:text-white transition-colors">Terms of Service</Link>
              <Link href="#" className="hover:text-white transition-colors">Contact</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
} 
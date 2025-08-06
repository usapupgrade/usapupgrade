'use client'

import Link from 'next/link'
import { ArrowRight, BookOpen, Users, Target, Award, Star, Zap, Globe, Heart, TrendingUp, CheckCircle } from 'lucide-react'

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm shadow-sm border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm sm:text-base">UU</span>
              </div>
              <span className="text-lg sm:text-xl font-bold text-gray-900">UsapUpgrade</span>
            </div>
            <div className="flex items-center space-x-2 sm:space-x-4">
              <Link href="/auth/signin" className="text-gray-600 hover:text-gray-900 transition-colors text-sm sm:text-base">
                Sign In
              </Link>
              <Link href="/auth/signup" className="bg-blue-600 text-white px-3 sm:px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm sm:text-base">
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-6xl mx-auto px-6 py-12 sm:py-16">
        <div className="text-center mb-16 sm:mb-24">
          {/* Badge with better styling */}
          <div className="inline-flex items-center px-5 sm:px-6 py-3 sm:py-3 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white text-sm sm:text-sm font-semibold mb-8 sm:mb-10 shadow-lg">
            <Star className="w-4 h-4 sm:w-4 sm:h-4 mr-2" />
            Professional Communication Training
          </div>
          
          {/* Main headline with better typography */}
          <h1 className="text-3xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 mb-8 sm:mb-8 leading-tight max-w-5xl mx-auto px-2">
            Upgrade Your Communication Skills in Just 5 Minutes Daily
        </h1>
          
          {/* Description with better spacing and visual hierarchy */}
          <p className="text-lg sm:text-lg md:text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed mb-8 sm:mb-10 px-2">
            Learn professional communication, cultural navigation, and career-advancing conversations through <span className="font-bold text-purple-600">gamified, interactive lessons</span> that make learning engaging and fun.
          </p>
          
          {/* CTA paragraph with better emphasis */}
          <p className="text-base sm:text-base md:text-lg text-gray-700 mb-10 sm:mb-12 max-w-3xl mx-auto px-2">
            Start with <span className="font-semibold text-green-600">30 FREE lessons</span>, then upgrade for lifetime access to all <strong>120 scenarios</strong>.
          </p>
          
          {/* Enhanced CTA buttons with better spacing and visual appeal */}
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-4 justify-center items-center px-2">
            <Link 
              href="/auth/signup"
              className="inline-flex items-center bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 sm:px-8 md:px-10 py-4 sm:py-4 md:py-5 rounded-2xl font-bold text-lg sm:text-lg hover:from-blue-700 hover:to-purple-700 transition-all shadow-xl hover:shadow-2xl transform hover:-translate-y-1 duration-200 w-full sm:w-auto justify-center"
            >
              Start Learning for Free
              <ArrowRight className="w-5 h-5 sm:w-5 sm:h-5 ml-3 sm:ml-3" />
            </Link>
            <Link 
              href="/payment"
              className="inline-flex items-center bg-white text-blue-600 px-8 sm:px-8 md:px-10 py-4 sm:py-4 md:py-5 rounded-2xl font-bold text-lg sm:text-lg border-2 border-blue-600 hover:bg-blue-50 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1 duration-200 w-full sm:w-auto justify-center"
            >
              Get Complete Course
              <Zap className="w-5 h-5 sm:w-5 sm:h-5 ml-3 sm:ml-3" />
            </Link>
          </div>
          
          {/* Trust indicators or social proof */}
          <div className="mt-12 sm:mt-12 flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-8 text-sm sm:text-sm text-gray-500">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 sm:w-8 sm:h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <TrendingUp className="w-4 h-4 sm:w-4 sm:h-4 text-blue-600" />
              </div>
              <span className="text-sm sm:text-sm font-medium">Career-Focused Training</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 sm:w-8 sm:h-8 bg-purple-100 rounded-full flex items-center justify-center">
                <Users className="w-4 h-4 sm:w-4 sm:h-4 text-purple-600" />
              </div>
              <span className="text-sm sm:text-sm font-medium">Workplace Communication</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 sm:w-8 sm:h-8 bg-green-100 rounded-full flex items-center justify-center">
                <BookOpen className="w-4 h-4 sm:w-4 sm:h-4 text-green-600" />
              </div>
              <span className="text-sm sm:text-sm font-medium">Easy to Follow Lessons</span>
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-8 mb-16 sm:mb-16 px-2">
          <div className="bg-white rounded-2xl shadow-lg p-8 sm:p-8 text-center">
            <BookOpen className="w-12 h-12 sm:w-12 sm:h-12 text-blue-500 mx-auto mb-4 sm:mb-4" />
            <h3 className="text-xl sm:text-xl font-bold text-gray-900 mb-3 sm:mb-3">120 Professional Lessons</h3>
            <p className="text-base sm:text-base text-gray-600 leading-relaxed">Complete curriculum covering greetings, meetings, leadership, and career conversations.</p>
          </div>
          
          <div className="bg-white rounded-2xl shadow-lg p-8 sm:p-8 text-center">
            <Target className="w-12 h-12 sm:w-12 sm:h-12 text-green-500 mx-auto mb-4 sm:mb-4" />
            <h3 className="text-xl sm:text-xl font-bold text-gray-900 mb-3 sm:mb-3">Real Workplace Scenarios</h3>
            <p className="text-base sm:text-base text-gray-600 leading-relaxed">Practice with authentic situations you'll encounter in your professional life.</p>
          </div>
          
          <div className="bg-white rounded-2xl shadow-lg p-8 sm:p-8 text-center">
            <Award className="w-12 h-12 sm:w-12 sm:h-12 text-purple-500 mx-auto mb-4 sm:mb-4" />
            <h3 className="text-xl sm:text-xl font-bold text-gray-900 mb-3 sm:mb-3">Professional Certificate</h3>
            <p className="text-base sm:text-base text-gray-600 leading-relaxed">Earn recognition for your improved communication skills and career growth.</p>
          </div>
        </div>

        {/* Filipino-Focused Features */}
        <div className="mb-16 sm:mb-16 px-2">
          <div className="text-center mb-12 sm:mb-12">
            <h2 className="text-3xl sm:text-3xl font-bold text-gray-900 mb-4 sm:mb-4">Designed for Filipino Professionals</h2>
            <p className="text-lg sm:text-lg md:text-xl text-gray-600 px-2 leading-relaxed">Master the art of <span className="font-semibold text-blue-600">pakikipagkapwa</span> (genuine human connection) and overcome <span className="font-semibold text-purple-600">hiya</span> (shyness) in Filipino workplaces</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-6">
            <div className="bg-white rounded-xl shadow-lg p-6 sm:p-6 text-center">
              <Globe className="w-10 h-10 sm:w-10 sm:h-10 text-blue-500 mx-auto mb-3 sm:mb-3" />
              <h3 className="font-bold text-gray-900 mb-2 sm:mb-2 text-base sm:text-base">Local Context</h3>
              <p className="text-sm sm:text-sm text-gray-600 leading-relaxed">Scenarios relevant to Philippine workplace culture</p>
            </div>
            
            <div className="bg-white rounded-xl shadow-lg p-6 sm:p-6 text-center">
              <TrendingUp className="w-10 h-10 sm:w-10 sm:h-10 text-green-500 mx-auto mb-3 sm:mb-3" />
              <h3 className="font-bold text-gray-900 mb-2 sm:mb-2 text-base sm:text-base">Career Growth</h3>
              <p className="text-sm sm:text-sm text-gray-600 leading-relaxed">Advance your career in local and global companies</p>
            </div>
            
            <div className="bg-white rounded-xl shadow-lg p-6 sm:p-6 text-center">
              <Heart className="w-10 h-10 sm:w-10 sm:h-10 text-red-500 mx-auto mb-3 sm:mb-3" />
              <h3 className="font-bold text-gray-900 mb-2 sm:mb-2 text-base sm:text-base">Family Support</h3>
              <p className="text-sm sm:text-sm text-gray-600 leading-relaxed">Better communication for family and community</p>
            </div>
            
            <div className="bg-white rounded-xl shadow-lg p-6 sm:p-6 text-center">
              <Users className="w-10 h-10 sm:w-10 sm:h-10 text-purple-500 mx-auto mb-3 sm:mb-3" />
              <h3 className="font-bold text-gray-900 mb-2 sm:mb-2 text-base sm:text-base">Community Building</h3>
              <p className="text-sm sm:text-sm text-gray-600 leading-relaxed">Strengthen relationships in your community</p>
            </div>
          </div>
        </div>

        {/* Pricing Section */}
        <div className="mb-20 sm:mb-20 px-2">
          <div className="text-center mb-12 sm:mb-12">
            <h2 className="text-3xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4 sm:mb-4">Simple, Transparent Pricing</h2>
            <p className="text-lg sm:text-lg md:text-xl text-gray-600 px-2">Choose the plan that works best for your learning journey</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-8 max-w-4xl mx-auto">
            {/* Free Trial */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8 sm:p-8">
              <div className="text-center mb-8 sm:mb-8">
                <h3 className="text-2xl sm:text-2xl font-bold text-gray-900 mb-2 sm:mb-2">Free Trial</h3>
                <p className="text-base sm:text-base text-gray-600">Perfect for getting started</p>
              </div>
              
              <div className="text-center mb-8 sm:mb-8">
                <span className="text-4xl sm:text-4xl font-bold text-gray-900">₱0</span>
                <span className="text-base sm:text-base text-gray-600">/forever</span>
              </div>
              
              <ul className="space-y-4 sm:space-y-4 mb-8 sm:mb-8">
                <li className="flex items-center gap-3">
                  <div className="w-5 h-5 sm:w-5 sm:h-5 bg-green-100 rounded-full flex items-center justify-center">
                    <div className="w-2 h-2 sm:w-2 sm:h-2 bg-green-500 rounded-full"></div>
                  </div>
                  <span className="text-base sm:text-base text-gray-700">Access to first 30 lessons</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-5 h-5 sm:w-5 sm:h-5 bg-green-100 rounded-full flex items-center justify-center">
                    <div className="w-2 h-2 sm:w-2 sm:h-2 bg-green-500 rounded-full"></div>
                  </div>
                  <span className="text-base sm:text-base text-gray-700">Basic progress tracking</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-5 h-5 sm:w-5 sm:h-5 bg-green-100 rounded-full flex items-center justify-center">
                    <div className="w-2 h-2 sm:w-2 sm:h-2 bg-green-500 rounded-full"></div>
                  </div>
                  <span className="text-base sm:text-base text-gray-700">Mobile optimized</span>
                </li>
              </ul>
              
              <Link 
                href="/auth/signup"
                className="w-full bg-gray-100 text-gray-900 py-4 sm:py-4 px-6 sm:px-6 rounded-2xl font-semibold hover:bg-gray-200 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1 duration-200 block text-center text-base sm:text-base"
              >
                Start Free Trial
              </Link>
            </div>
            
            {/* Premium Plan */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl shadow-xl p-8 sm:p-8 text-white relative">
              <div className="absolute -top-4 sm:-top-4 left-1/2 transform -translate-x-1/2">
                <span className="bg-orange-500 text-white px-4 sm:px-4 py-2 rounded-full text-sm sm:text-sm font-semibold">
                  Most Popular
                </span>
              </div>
              
              <div className="text-center mb-8 sm:mb-8">
                <h3 className="text-2xl sm:text-2xl font-bold mb-2 sm:mb-2">Premium Access</h3>
                <p className="text-base sm:text-base text-blue-100">Complete curriculum access</p>
              </div>
              
              <div className="text-center mb-8 sm:mb-8">
                <span className="text-4xl sm:text-4xl font-bold">₱499</span>
                <span className="text-base sm:text-base text-blue-100">/one-time</span>
              </div>
              
              <ul className="space-y-4 sm:space-y-4 mb-8 sm:mb-8">
                <li className="flex items-center gap-3">
                  <div className="w-5 h-5 sm:w-5 sm:h-5 bg-white/20 rounded-full flex items-center justify-center">
                    <div className="w-2 h-2 sm:w-2 sm:h-2 bg-white rounded-full"></div>
                  </div>
                  <span className="text-base sm:text-base">Access to all 120 lessons</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-5 h-5 sm:w-5 sm:h-5 bg-white/20 rounded-full flex items-center justify-center">
                    <div className="w-2 h-2 sm:w-2 sm:h-2 bg-white rounded-full"></div>
                  </div>
                  <span className="text-base sm:text-base">Advanced progress analytics</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-5 h-5 sm:w-5 sm:h-5 bg-white/20 rounded-full flex items-center justify-center">
                    <div className="w-2 h-2 sm:w-2 sm:h-2 bg-white rounded-full"></div>
                  </div>
                  <span className="text-base sm:text-base">Professional certificate</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-5 h-5 sm:w-5 sm:h-5 bg-white/20 rounded-full flex items-center justify-center">
                    <div className="w-2 h-2 sm:w-2 sm:h-2 bg-white rounded-full"></div>
                  </div>
                  <span className="text-base sm:text-base">Lifetime access</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-5 h-5 sm:w-5 sm:h-5 bg-white/20 rounded-full flex items-center justify-center">
                    <div className="w-2 h-2 sm:w-2 sm:h-2 bg-white rounded-full"></div>
                  </div>
                  <span className="text-base sm:text-base">Mobile optimized</span>
                </li>
              </ul>
              
              <Link 
                href="/payment"
                className="w-full bg-white text-blue-600 py-4 sm:py-4 px-6 sm:px-6 rounded-2xl font-semibold hover:bg-blue-50 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1 duration-200 block text-center text-base sm:text-base"
              >
                Get Premium Access
              </Link>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-8 sm:p-8 text-white text-center mx-2">
          <h2 className="text-3xl sm:text-3xl font-bold mb-4 sm:mb-4">Ready to Transform Your Communication?</h2>
          <p className="text-lg sm:text-lg md:text-xl mb-6 sm:mb-6 opacity-90 px-2">Start your journey to better workplace conversations today</p>
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-4 justify-center">
            <Link 
              href="/auth/signup"
              className="bg-white text-blue-600 px-8 sm:px-8 py-4 sm:py-4 rounded-2xl font-bold text-lg sm:text-lg hover:bg-blue-50 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1 duration-200"
            >
              Start Free Trial
            </Link>
            <Link 
              href="/payment"
              className="bg-transparent text-white px-8 sm:px-8 py-4 sm:py-4 rounded-2xl font-bold text-lg sm:text-lg border-2 border-white hover:bg-white hover:text-blue-600 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1 duration-200"
            >
              Get Premium Access
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 sm:py-8">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <p className="text-base sm:text-base text-gray-400">© 2025 UsapUpgrade. All rights reserved.</p>
      </div>
      </footer>
    </div>
  )
}

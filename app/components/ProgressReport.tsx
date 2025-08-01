'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Calendar, 
  TrendingUp, 
  Target, 
  Award, 
  Clock, 
  BookOpen,
  Flame,
  Star,
  CheckCircle,
  AlertCircle,
  Lightbulb,
  Trophy
} from 'lucide-react'

interface ProgressData {
  period: 'week' | 'month'
  lessonsCompleted: number
  totalXP: number
  streakDays: number
  achievementsUnlocked: number
  timeSpent: number // in minutes
  accuracy: number // percentage
  categories: {
    small_talk: number
    professional: number
    dating: number
    conflict_resolution: number
  }
  insights: string[]
  recommendations: string[]
}

interface ProgressReportProps {
  userId: string
  period: 'week' | 'month'
}

export default function ProgressReport({ userId, period }: ProgressReportProps) {
  const [loading, setLoading] = useState(false)
  const [progressData, setProgressData] = useState<ProgressData | null>(null)

  // Mock data - in real app, fetch from API
  const mockProgressData: ProgressData = {
    period,
    lessonsCompleted: period === 'week' ? 12 : 45,
    totalXP: period === 'week' ? 350 : 1200,
    streakDays: period === 'week' ? 7 : 28,
    achievementsUnlocked: period === 'week' ? 3 : 8,
    timeSpent: period === 'week' ? 180 : 720,
    accuracy: 78,
    categories: {
      small_talk: period === 'week' ? 4 : 15,
      professional: period === 'week' ? 3 : 12,
      dating: period === 'week' ? 2 : 8,
      conflict_resolution: period === 'week' ? 3 : 10
    },
    insights: [
      'You\'re most active in the evenings between 6-8 PM',
      'Your accuracy improved by 12% this period',
      'Small talk is your strongest category',
      'You completed 85% of your daily goals'
    ],
    recommendations: [
      'Try more professional networking lessons to balance your skills',
      'Your conflict resolution skills could use more practice',
      'Consider setting a daily reminder for consistent learning',
      'Great job maintaining your streak! Keep it up!'
    ]
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'small_talk':
        return 'bg-blue-500'
      case 'professional':
        return 'bg-green-500'
      case 'dating':
        return 'bg-pink-500'
      case 'conflict_resolution':
        return 'bg-orange-500'
      default:
        return 'bg-gray-500'
    }
  }

  const getCategoryName = (category: string) => {
    return category.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())
  }

  const getInsightIcon = (insight: string) => {
    if (insight.includes('active')) return <Clock className="w-4 h-4" />
    if (insight.includes('accuracy')) return <TrendingUp className="w-4 h-4" />
    if (insight.includes('strongest')) return <Trophy className="w-4 h-4" />
    if (insight.includes('goals')) return <Target className="w-4 h-4" />
    return <Lightbulb className="w-4 h-4" />
  }

  const getRecommendationIcon = (recommendation: string) => {
    if (recommendation.includes('professional')) return <TrendingUp className="w-4 h-4" />
    if (recommendation.includes('conflict')) return <AlertCircle className="w-4 h-4" />
    if (recommendation.includes('reminder')) return <Clock className="w-4 h-4" />
    if (recommendation.includes('streak')) return <Flame className="w-4 h-4" />
    return <Lightbulb className="w-4 h-4" />
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-primary-900">
            {period === 'week' ? 'Weekly' : 'Monthly'} Progress Report
          </h2>
          <p className="text-primary-600">
            Your learning journey from the past {period === 'week' ? '7 days' : '30 days'}
          </p>
        </div>
        
        <div className="flex items-center space-x-2 text-sm text-primary-600">
          <Calendar className="w-4 h-4" />
          <span>
            {period === 'week' 
              ? 'Dec 1-7, 2024' 
              : 'December 2024'
            }
          </span>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="card text-center"
        >
          <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg flex items-center justify-center mx-auto mb-3">
            <BookOpen className="w-6 h-6 text-white" />
          </div>
          <p className="text-2xl font-bold text-primary-900">{mockProgressData.lessonsCompleted}</p>
          <p className="text-sm text-primary-600">Lessons Completed</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="card text-center"
        >
          <div className="w-12 h-12 bg-gradient-to-r from-accent-500 to-accent-600 rounded-lg flex items-center justify-center mx-auto mb-3">
            <Star className="w-6 h-6 text-white" />
          </div>
          <p className="text-2xl font-bold text-primary-900">{mockProgressData.totalXP}</p>
          <p className="text-sm text-primary-600">XP Earned</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="card text-center"
        >
          <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg flex items-center justify-center mx-auto mb-3">
            <Flame className="w-6 h-6 text-white" />
          </div>
          <p className="text-2xl font-bold text-primary-900">{mockProgressData.streakDays}</p>
          <p className="text-sm text-primary-600">Streak Days</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="card text-center"
        >
          <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg flex items-center justify-center mx-auto mb-3">
            <Award className="w-6 h-6 text-white" />
          </div>
          <p className="text-2xl font-bold text-primary-900">{mockProgressData.achievementsUnlocked}</p>
          <p className="text-sm text-primary-600">Achievements</p>
        </motion.div>
      </div>

      {/* Detailed Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Category Breakdown */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="card"
        >
          <h3 className="text-lg font-semibold text-primary-900 mb-4">Category Breakdown</h3>
          <div className="space-y-3">
            {Object.entries(mockProgressData.categories).map(([category, count]) => (
              <div key={category} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className={`w-8 h-8 ${getCategoryColor(category)} rounded-lg flex items-center justify-center`}>
                    <div className="w-4 h-4 bg-white rounded-full"></div>
                  </div>
                  <span className="font-medium text-primary-900">
                    {getCategoryName(category)}
                  </span>
                </div>
                <span className="text-lg font-semibold text-primary-900">{count}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Performance Metrics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="card"
        >
          <h3 className="text-lg font-semibold text-primary-900 mb-4">Performance</h3>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-primary-600">Accuracy</span>
                <span className="text-primary-900 font-medium">{mockProgressData.accuracy}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${mockProgressData.accuracy}%` }}
                  transition={{ delay: 0.7 }}
                  className="bg-green-500 h-2 rounded-full"
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-primary-600">Time Spent</span>
                <span className="text-primary-900 font-medium">{mockProgressData.timeSpent} min</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${Math.min((mockProgressData.timeSpent / (period === 'week' ? 420 : 1800)) * 100, 100)}%` }}
                  transition={{ delay: 0.8 }}
                  className="bg-blue-500 h-2 rounded-full"
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-primary-600">Goal Completion</span>
                <span className="text-primary-900 font-medium">85%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: '85%' }}
                  transition={{ delay: 0.9 }}
                  className="bg-accent-500 h-2 rounded-full"
                />
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Insights and Recommendations */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Insights */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0 }}
          className="card"
        >
          <h3 className="text-lg font-semibold text-primary-900 mb-4">Key Insights</h3>
          <div className="space-y-3">
            {mockProgressData.insights.map((insight, index) => (
              <div key={index} className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-blue-100 rounded-lg flex items-center justify-center mt-0.5">
                  {getInsightIcon(insight)}
                </div>
                <p className="text-sm text-primary-700">{insight}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Recommendations */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1 }}
          className="card"
        >
          <h3 className="text-lg font-semibold text-primary-900 mb-4">Recommendations</h3>
          <div className="space-y-3">
            {mockProgressData.recommendations.map((recommendation, index) => (
              <div key={index} className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-accent-100 rounded-lg flex items-center justify-center mt-0.5">
                  {getRecommendationIcon(recommendation)}
                </div>
                <p className="text-sm text-primary-700">{recommendation}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Next Period Goals */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2 }}
        className="card"
      >
        <h3 className="text-lg font-semibold text-primary-900 mb-4">
          Goals for Next {period === 'week' ? 'Week' : 'Month'}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg">
            <Target className="w-8 h-8 text-blue-600 mx-auto mb-2" />
            <p className="font-semibold text-blue-900">Complete 15 lessons</p>
            <p className="text-sm text-blue-700">Focus on professional skills</p>
          </div>
          
          <div className="text-center p-4 bg-gradient-to-r from-green-50 to-green-100 rounded-lg">
            <TrendingUp className="w-8 h-8 text-green-600 mx-auto mb-2" />
            <p className="font-semibold text-green-900">Improve accuracy to 85%</p>
            <p className="text-sm text-green-700">Practice more challenging scenarios</p>
          </div>
          
          <div className="text-center p-4 bg-gradient-to-r from-purple-50 to-purple-100 rounded-lg">
            <Award className="w-8 h-8 text-purple-600 mx-auto mb-2" />
            <p className="font-semibold text-purple-900">Unlock 5 achievements</p>
            <p className="text-sm text-purple-700">Try new conversation categories</p>
          </div>
        </div>
      </motion.div>

      {/* Share Progress */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.3 }}
        className="text-center"
      >
        <button className="btn-primary">
          Share Progress Report
        </button>
      </motion.div>
    </div>
  )
} 
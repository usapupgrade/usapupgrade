'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  LineChart, 
  Line, 
  AreaChart, 
  Area, 
  BarChart, 
  Bar, 
  PieChart, 
  Pie, 
  Cell,
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Legend
} from 'recharts'
import { 
  TrendingUp, 
  Calendar, 
  Target, 
  Award, 
  Clock, 
  Activity,
  Zap,
  BookOpen,
  Users,
  Heart,
  Brain
} from 'lucide-react'

interface AnalyticsData {
  weeklyProgress: Array<{
    date: string
    xp: number
    lessons: number
    streak: number
  }>
  categoryProgress: Array<{
    category: string
    completed: number
    total: number
    percentage: number
  }>
  skillBreakdown: Array<{
    skill: string
    level: number
    maxLevel: number
  }>
  timeOfDay: Array<{
    hour: string
    lessons: number
  }>
  achievements: Array<{
    category: string
    count: number
  }>
}

interface AdvancedAnalyticsProps {
  userId: string
}

const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6']

export default function AdvancedAnalytics({ userId }: AdvancedAnalyticsProps) {
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData | null>(null)
  const [loading, setLoading] = useState(true)
  const [timeRange, setTimeRange] = useState<'week' | 'month' | 'year'>('week')

  useEffect(() => {
    fetchAnalyticsData()
  }, [userId, timeRange])

  const fetchAnalyticsData = async () => {
    try {
      setLoading(true)
      
      // Mock analytics data - in real app, fetch from API
      const mockData: AnalyticsData = {
        weeklyProgress: [
          { date: 'Mon', xp: 150, lessons: 3, streak: 5 },
          { date: 'Tue', xp: 200, lessons: 4, streak: 6 },
          { date: 'Wed', xp: 180, lessons: 3, streak: 7 },
          { date: 'Thu', xp: 250, lessons: 5, streak: 8 },
          { date: 'Fri', xp: 300, lessons: 6, streak: 9 },
          { date: 'Sat', xp: 120, lessons: 2, streak: 10 },
          { date: 'Sun', xp: 90, lessons: 2, streak: 11 }
        ],
        categoryProgress: [
          { category: 'Small Talk', completed: 8, total: 15, percentage: 53 },
          { category: 'Professional', completed: 6, total: 12, percentage: 50 },
          { category: 'Dating', completed: 4, total: 10, percentage: 40 },
          { category: 'Conflict Resolution', completed: 3, total: 8, percentage: 38 }
        ],
        skillBreakdown: [
          { skill: 'Active Listening', level: 7, maxLevel: 10 },
          { skill: 'Empathy', level: 6, maxLevel: 10 },
          { skill: 'Question Asking', level: 8, maxLevel: 10 },
          { skill: 'Emotional Intelligence', level: 5, maxLevel: 10 },
          { skill: 'Conflict Resolution', level: 4, maxLevel: 10 }
        ],
        timeOfDay: [
          { hour: '6AM', lessons: 2 },
          { hour: '9AM', lessons: 8 },
          { hour: '12PM', lessons: 5 },
          { hour: '3PM', lessons: 6 },
          { hour: '6PM', lessons: 12 },
          { hour: '9PM', lessons: 4 }
        ],
        achievements: [
          { category: 'Conversation', count: 8 },
          { category: 'Streak', count: 5 },
          { category: 'Learning', count: 6 },
          { category: 'Social', count: 3 },
          { category: 'Mastery', count: 2 }
        ]
      }
      
      setAnalyticsData(mockData)
    } catch (error) {
      console.error('Error fetching analytics:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-accent-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-primary-600">Loading analytics...</p>
        </div>
      </div>
    )
  }

  if (!analyticsData) {
    return (
      <div className="text-center py-8">
        <p className="text-primary-600">No analytics data available</p>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-primary-900">Learning Analytics</h2>
          <p className="text-primary-600">Track your progress and insights</p>
        </div>
        
        <div className="flex space-x-2">
          {(['week', 'month', 'year'] as const).map((range) => (
            <button
              key={range}
              onClick={() => setTimeRange(range)}
              className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                timeRange === range
                  ? 'bg-accent-500 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {range.charAt(0).toUpperCase() + range.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Progress Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="card"
        >
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-sm text-primary-600">Total XP</p>
              <p className="text-2xl font-bold text-primary-900">1,290</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="card"
        >
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-green-600 rounded-lg flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-sm text-primary-600">Lessons Completed</p>
              <p className="text-2xl font-bold text-primary-900">21</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="card"
        >
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg flex items-center justify-center">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-sm text-primary-600">Current Streak</p>
              <p className="text-2xl font-bold text-primary-900">11 days</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="card"
        >
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg flex items-center justify-center">
              <Award className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-sm text-primary-600">Achievements</p>
              <p className="text-2xl font-bold text-primary-900">24</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Weekly Progress Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="card"
        >
          <h3 className="text-lg font-semibold text-primary-900 mb-4">Weekly Progress</h3>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={analyticsData.weeklyProgress}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Area 
                type="monotone" 
                dataKey="xp" 
                stackId="1"
                stroke="#3B82F6" 
                fill="#3B82F6" 
                fillOpacity={0.6}
              />
              <Area 
                type="monotone" 
                dataKey="lessons" 
                stackId="1"
                stroke="#10B981" 
                fill="#10B981" 
                fillOpacity={0.6}
              />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Category Progress */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="card"
        >
          <h3 className="text-lg font-semibold text-primary-900 mb-4">Category Progress</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={analyticsData.categoryProgress}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="category" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="percentage" fill="#3B82F6" />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Skill Breakdown */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="card"
        >
          <h3 className="text-lg font-semibold text-primary-900 mb-4">Skill Levels</h3>
          <div className="space-y-4">
            {analyticsData.skillBreakdown.map((skill, index) => (
              <div key={skill.skill} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-primary-700">{skill.skill}</span>
                  <span className="text-primary-600">{skill.level}/{skill.maxLevel}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${(skill.level / skill.maxLevel) * 100}%` }}
                    transition={{ delay: 0.8 + index * 0.1 }}
                    className="bg-gradient-to-r from-accent-500 to-accent-600 h-2 rounded-full"
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Learning Time */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="card"
        >
          <h3 className="text-lg font-semibold text-primary-900 mb-4">Learning Time</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={analyticsData.timeOfDay}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="hour" />
              <YAxis />
              <Tooltip />
              <Line 
                type="monotone" 
                dataKey="lessons" 
                stroke="#F59E0B" 
                strokeWidth={3}
                dot={{ fill: '#F59E0B', strokeWidth: 2, r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      {/* Achievement Breakdown */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9 }}
        className="card"
      >
        <h3 className="text-lg font-semibold text-primary-900 mb-4">Achievement Breakdown</h3>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={analyticsData.achievements}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ category, percent }) => `${category} ${(percent * 100).toFixed(0)}%`}
              outerRadius={80}
              fill="#8884d8"
              dataKey="count"
            >
              {analyticsData.achievements.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </motion.div>

      {/* Insights */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.0 }}
        className="card"
      >
        <h3 className="text-lg font-semibold text-primary-900 mb-4">Learning Insights</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-4 h-4 text-green-600" />
              </div>
              <div>
                <p className="font-medium text-primary-900">Best Performance</p>
                <p className="text-sm text-primary-600">You learn best in the evening (6PM)</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                <Target className="w-4 h-4 text-blue-600" />
              </div>
              <div>
                <p className="font-medium text-primary-900">Strongest Skill</p>
                <p className="text-sm text-primary-600">Question Asking (Level 8/10)</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
                <Activity className="w-4 h-4 text-orange-600" />
              </div>
              <div>
                <p className="font-medium text-primary-900">Growth Area</p>
                <p className="text-sm text-primary-600">Conflict Resolution (Level 4/10)</p>
              </div>
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                <Calendar className="w-4 h-4 text-purple-600" />
              </div>
              <div>
                <p className="font-medium text-primary-900">Consistency</p>
                <p className="text-sm text-primary-600">11-day streak shows great dedication</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center">
                <Award className="w-4 h-4 text-yellow-600" />
              </div>
              <div>
                <p className="font-medium text-primary-900">Achievement Rate</p>
                <p className="text-sm text-primary-600">24 achievements unlocked</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center">
                <Heart className="w-4 h-4 text-red-600" />
              </div>
              <div>
                <p className="font-medium text-primary-900">Favorite Category</p>
                <p className="text-sm text-primary-600">Small Talk (53% complete)</p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
} 
'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  TrendingUp, 
  Users, 
  Target, 
  ArrowRight,
  Eye,
  CheckCircle,
  AlertCircle
} from 'lucide-react'
import { useDarkMode } from '../providers'

interface ConversionStep {
  name: string
  count: number
  percentage: number
  color: string
}

interface ConversionData {
  totalVisitors: number
  signups: number
  freeTrials: number
  premiumConversions: number
  steps: ConversionStep[]
  conversionRate: number
  averageTimeToConvert: string
}

const mockConversionData: ConversionData = {
  totalVisitors: 15600,
  signups: 12450,
  freeTrials: 8900,
  premiumConversions: 3550,
  steps: [
    { name: 'Website Visitors', count: 15600, percentage: 100, color: '#3B82F6' },
    { name: 'Signups', count: 12450, percentage: 79.8, color: '#10B981' },
    { name: 'Free Trial Starts', count: 8900, percentage: 57.1, color: '#F59E0B' },
    { name: 'Premium Conversions', count: 3550, percentage: 22.8, color: '#EF4444' }
  ],
  conversionRate: 22.8,
  averageTimeToConvert: '3.2 days'
}

export default function ConversionAnalytics() {
  const [conversionData, setConversionData] = useState<ConversionData>(mockConversionData)
  const [selectedTimeframe, setSelectedTimeframe] = useState('30d')
  const { isDarkMode } = useDarkMode()

  const getStepColor = (index: number) => {
    const colors = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444']
    return colors[index] || '#6B7280'
  }

  return (
    <div className="card">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className={`text-lg font-semibold transition-colors duration-200 ${isDarkMode ? 'text-primary-100' : 'text-primary-900'}`}>
            Conversion Funnel Analysis
          </h3>
          <p className={`text-sm transition-colors duration-200 ${isDarkMode ? 'text-primary-400' : 'text-primary-600'}`}>
            GDPR-compliant conversion tracking without personal data
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <select
            value={selectedTimeframe}
            onChange={(e) => setSelectedTimeframe(e.target.value)}
            className={`px-3 py-1 text-sm border rounded-lg transition-colors duration-200 ${
              isDarkMode 
                ? 'bg-primary-700 border-primary-600 text-primary-100' 
                : 'border-primary-200 text-primary-900'
            }`}
          >
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
            <option value="90d">Last 90 days</option>
          </select>
        </div>
      </div>

      {/* Conversion Rate Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-center p-4 rounded-lg border transition-colors duration-200"
        >
          <div className="flex items-center justify-center mb-2">
            <Target className="w-6 h-6 text-accent-500" />
          </div>
          <p className={`text-2xl font-bold transition-colors duration-200 ${isDarkMode ? 'text-primary-100' : 'text-primary-900'}`}>
            {conversionData.conversionRate}%
          </p>
          <p className={`text-sm transition-colors duration-200 ${isDarkMode ? 'text-primary-400' : 'text-primary-600'}`}>
            Overall Conversion Rate
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-center p-4 rounded-lg border transition-colors duration-200"
        >
          <div className="flex items-center justify-center mb-2">
            <Users className="w-6 h-6 text-success-500" />
          </div>
          <p className={`text-2xl font-bold transition-colors duration-200 ${isDarkMode ? 'text-primary-100' : 'text-primary-900'}`}>
            {conversionData.premiumConversions.toLocaleString()}
          </p>
          <p className={`text-sm transition-colors duration-200 ${isDarkMode ? 'text-primary-400' : 'text-primary-600'}`}>
            Premium Conversions
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center p-4 rounded-lg border transition-colors duration-200"
        >
          <div className="flex items-center justify-center mb-2">
            <TrendingUp className="w-6 h-6 text-warning-500" />
          </div>
          <p className={`text-2xl font-bold transition-colors duration-200 ${isDarkMode ? 'text-primary-100' : 'text-primary-900'}`}>
            {conversionData.averageTimeToConvert}
          </p>
          <p className={`text-sm transition-colors duration-200 ${isDarkMode ? 'text-primary-400' : 'text-primary-600'}`}>
            Avg. Time to Convert
          </p>
        </motion.div>
      </div>

      {/* Conversion Funnel Steps */}
      <div className="space-y-4">
        <h4 className={`font-medium transition-colors duration-200 ${isDarkMode ? 'text-primary-100' : 'text-primary-900'}`}>
          Conversion Funnel Steps
        </h4>
        
        {conversionData.steps.map((step, index) => (
          <motion.div
            key={step.name}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
            className="relative"
          >
            <div className="flex items-center justify-between p-4 rounded-lg border transition-colors duration-200">
              <div className="flex items-center space-x-3">
                <div 
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: getStepColor(index) }}
                />
                <div>
                  <p className={`font-medium transition-colors duration-200 ${isDarkMode ? 'text-primary-100' : 'text-primary-900'}`}>
                    {step.name}
                  </p>
                  <p className={`text-sm transition-colors duration-200 ${isDarkMode ? 'text-primary-400' : 'text-primary-600'}`}>
                    {step.count.toLocaleString()} users
                  </p>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="text-right">
                  <p className={`font-medium transition-colors duration-200 ${isDarkMode ? 'text-primary-100' : 'text-primary-900'}`}>
                    {step.percentage}%
                  </p>
                  <p className={`text-xs transition-colors duration-200 ${isDarkMode ? 'text-primary-400' : 'text-primary-600'}`}>
                    conversion rate
                  </p>
                </div>
                
                {index < conversionData.steps.length - 1 && (
                  <ArrowRight className="w-4 h-4 text-primary-400" />
                )}
              </div>
            </div>
            
            {/* Progress Bar */}
            <div className="mt-2">
              <div className={`w-full h-2 rounded-full transition-colors duration-200 ${isDarkMode ? 'bg-primary-700' : 'bg-primary-200'}`}>
                <div 
                  className="h-2 rounded-full transition-all duration-500"
                  style={{ 
                    width: `${step.percentage}%`,
                    backgroundColor: getStepColor(index)
                  }}
                />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* GDPR Compliance Notice */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.8 }}
        className="mt-6 p-4 rounded-lg border border-success-200 bg-success-50 dark:bg-success-900/20 dark:border-success-800"
      >
        <div className="flex items-start space-x-3">
          <CheckCircle className="w-5 h-5 text-success-500 mt-0.5" />
          <div>
            <h5 className={`font-medium transition-colors duration-200 ${isDarkMode ? 'text-success-100' : 'text-success-800'}`}>
              GDPR Compliant Analytics
            </h5>
            <p className={`text-sm transition-colors duration-200 ${isDarkMode ? 'text-success-300' : 'text-success-700'}`}>
              This conversion funnel analysis tracks aggregate metrics only. No personal data is collected, stored, or processed. 
              All analytics are anonymized and comply with GDPR requirements.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  )
} 
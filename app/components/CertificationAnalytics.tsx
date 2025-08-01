'use client'

import { useState, useEffect } from 'react'
import { 
  BarChart3, 
  AlertTriangle, 
  Users, 
  Clock, 
  TrendingUp, 
  Shield, 
  Eye, 
  Activity,
  Calendar,
  Filter,
  Download,
  RefreshCw
} from 'lucide-react'

interface AnalyticsData {
  overview: {
    totalCertifications: number
    totalNameChanges: number
    uniqueUsers: number
    averageCertificationsPerUser: number
    averageNameChangesPerUser: number
  }
  timeAnalysis: {
    daily: { [key: string]: { certs: number, changes: number } }
    weekly: { [key: string]: { certs: number, changes: number } }
  }
  abuseDetection: {
    totalIndicators: number
    highSeverity: number
    mediumSeverity: number
    indicators: any[]
  }
  userPatterns: {
    certificationTiming: {
      peakHours: { hour: number, count: number }[]
      totalDistribution: { [key: number]: number }
    }
    nameChangePatterns: {
      commonNameTypes: { [key: string]: number }
      changeFrequency: any[]
    }
    userSegments: {
      normal: any[]
      suspicious: any[]
      highRisk: any[]
    }
  }
  recommendations: any[]
}

export default function CertificationAnalytics() {
  const [data, setData] = useState<AnalyticsData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [timeRange, setTimeRange] = useState('30d')
  const [abuseThreshold, setAbuseThreshold] = useState(5)

  const fetchAnalytics = async () => {
    setLoading(true)
    setError(null)
    
    try {
      const response = await fetch(`/api/certification/analytics?timeRange=${timeRange}&abuseThreshold=${abuseThreshold}`)
      const result = await response.json()
      
      if (result.success) {
        setData(result.data)
      } else {
        setError(result.error || 'Failed to fetch analytics')
      }
    } catch (err) {
      setError('Network error occurred')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchAnalytics()
  }, [timeRange, abuseThreshold])

  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-center py-8">
          <RefreshCw className="w-6 h-6 animate-spin text-blue-600 mr-3" />
          <span className="text-gray-600">Loading certification analytics...</span>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-center py-8">
          <AlertTriangle className="w-6 h-6 text-red-600 mr-3" />
          <span className="text-red-600">{error}</span>
        </div>
      </div>
    )
  }

  if (!data) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="text-center py-8">
          <span className="text-gray-600">No analytics data available</span>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header with Controls */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-gray-900 flex items-center">
              <BarChart3 className="w-5 h-5 mr-2 text-blue-600" />
              Certification Analytics
            </h2>
            <p className="text-sm text-gray-600 mt-1">
              Track certification patterns and detect potential abuse
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="flex items-center space-x-2">
              <Filter className="w-4 h-4 text-gray-500" />
              <select
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 text-sm"
              >
                <option value="7d">Last 7 days</option>
                <option value="30d">Last 30 days</option>
                <option value="90d">Last 90 days</option>
                <option value="1y">Last year</option>
              </select>
            </div>
            
            <div className="flex items-center space-x-2">
              <Shield className="w-4 h-4 text-gray-500" />
              <input
                type="number"
                value={abuseThreshold}
                onChange={(e) => setAbuseThreshold(parseInt(e.target.value))}
                className="border border-gray-300 rounded-lg px-3 py-2 text-sm w-20"
                placeholder="5"
              />
              <span className="text-sm text-gray-500">threshold</span>
            </div>
            
            <button
              onClick={fetchAnalytics}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
            >
              Refresh
            </button>
          </div>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Certifications</p>
              <p className="text-2xl font-bold text-gray-900">{data.overview.totalCertifications}</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <BarChart3 className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Name Changes</p>
              <p className="text-2xl font-bold text-gray-900">{data.overview.totalNameChanges}</p>
            </div>
            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
              <Users className="w-6 h-6 text-yellow-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Unique Users</p>
              <p className="text-2xl font-bold text-gray-900">{data.overview.uniqueUsers}</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <Users className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Abuse Indicators</p>
              <p className="text-2xl font-bold text-gray-900">{data.abuseDetection.totalIndicators}</p>
            </div>
            <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
              <AlertTriangle className="w-6 h-6 text-red-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Abuse Detection */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
          <Shield className="w-5 h-5 mr-2 text-red-600" />
          Abuse Detection
        </h3>
        
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          <div className="bg-red-50 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-red-800">High Severity</span>
              <span className="text-2xl font-bold text-red-600">{data.abuseDetection.highSeverity}</span>
            </div>
          </div>
          
          <div className="bg-yellow-50 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-yellow-800">Medium Severity</span>
              <span className="text-2xl font-bold text-yellow-600">{data.abuseDetection.mediumSeverity}</span>
            </div>
          </div>
          
          <div className="bg-blue-50 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-blue-800">Total Indicators</span>
              <span className="text-2xl font-bold text-blue-600">{data.abuseDetection.totalIndicators}</span>
            </div>
          </div>
        </div>

        {data.abuseDetection.indicators.length > 0 && (
          <div className="space-y-3">
            <h4 className="font-semibold text-gray-900">Recent Indicators</h4>
            <div className="space-y-2">
              {data.abuseDetection.indicators.slice(0, 5).map((indicator, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <span className="text-sm font-medium text-gray-900 capitalize">
                      {indicator.type.replace(/_/g, ' ')}
                    </span>
                    <p className="text-xs text-gray-600">User: {indicator.userId}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      indicator.severity === 'high' 
                        ? 'bg-red-100 text-red-800' 
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {indicator.severity}
                    </span>
                    {indicator.count && (
                      <span className="text-sm text-gray-600">Count: {indicator.count}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* User Segments */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
            <Users className="w-5 h-5 mr-2 text-green-600" />
            Normal Users
          </h3>
          <div className="text-center">
            <p className="text-3xl font-bold text-green-600">{data.userPatterns.userSegments.normal.length}</p>
            <p className="text-sm text-gray-600">Standard behavior</p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
            <AlertTriangle className="w-5 h-5 mr-2 text-yellow-600" />
            Suspicious Users
          </h3>
          <div className="text-center">
            <p className="text-3xl font-bold text-yellow-600">{data.userPatterns.userSegments.suspicious.length}</p>
            <p className="text-sm text-gray-600">Requires monitoring</p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
            <Shield className="w-5 h-5 mr-2 text-red-600" />
            High Risk Users
          </h3>
          <div className="text-center">
            <p className="text-3xl font-bold text-red-600">{data.userPatterns.userSegments.highRisk.length}</p>
            <p className="text-sm text-gray-600">Immediate action needed</p>
          </div>
        </div>
      </div>

      {/* Peak Hours Analysis */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
          <Clock className="w-5 h-5 mr-2 text-blue-600" />
          Peak Activity Hours
        </h3>
        
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {data.userPatterns.certificationTiming.peakHours.map((peak, index) => (
            <div key={index} className="bg-blue-50 rounded-lg p-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-blue-600">{peak.hour}:00</p>
                <p className="text-sm text-blue-800">{peak.count} certifications</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recommendations */}
      {data.recommendations.length > 0 && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
            <TrendingUp className="w-5 h-5 mr-2 text-green-600" />
            Recommendations
          </h3>
          
          <div className="space-y-4">
            {data.recommendations.map((rec, index) => (
              <div key={index} className={`p-4 rounded-lg border-l-4 ${
                rec.priority === 'high' 
                  ? 'bg-red-50 border-red-400' 
                  : 'bg-yellow-50 border-yellow-400'
              }`}>
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="font-semibold text-gray-900">{rec.message}</h4>
                    <p className="text-sm text-gray-600 mt-1">{rec.action}</p>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    rec.priority === 'high' 
                      ? 'bg-red-100 text-red-800' 
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {rec.priority}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Export Button */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold text-gray-900">Export Data</h3>
            <p className="text-sm text-gray-600">Download analytics report as CSV</p>
          </div>
          <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center">
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </button>
        </div>
      </div>
    </div>
  )
} 
'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function RevenueTracking() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const router = useRouter()

  useEffect(() => {
    // Check if admin is authenticated
    const adminAuth = localStorage.getItem('admin_authenticated')
    if (!adminAuth) {
      router.push('/admin-access')
      return
    }
    setIsAuthenticated(true)
  }, [router])

  if (!isAuthenticated) {
    return null // Will redirect to admin-access
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'PHP'
    }).format(amount)
  }

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('en-US').format(num)
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Revenue Tracking</h1>
              <p className="text-gray-600">Monitor payments and financial metrics</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-2">
              <button
                onClick={() => window.location.href = '/admin'}
                className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors flex items-center justify-center space-x-2"
              >
                <span>Back to Admin Dashboard</span>
              </button>
            </div>
          </div>
        </div>

        {/* Revenue Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6 sm:mb-8">
          <div className="p-4 rounded-xl shadow-sm bg-white">
            <div className="flex items-center space-x-3">
              <div className="w-6 h-6 text-green-500 flex-shrink-0">💰</div>
              <div className="min-w-0 flex-1">
                <p className="text-sm text-gray-600">Total Revenue</p>
                <p className="text-xl font-bold text-gray-900">{formatCurrency(0)}</p>
                <p className="text-xs text-gray-500">All time</p>
              </div>
            </div>
          </div>

          <div className="p-4 rounded-xl shadow-sm bg-white">
            <div className="flex items-center space-x-3">
              <div className="w-6 h-6 text-orange-500 flex-shrink-0">📈</div>
              <div className="min-w-0 flex-1">
                <p className="text-sm text-gray-600">Monthly Revenue</p>
                <p className="text-xl font-bold text-gray-900">{formatCurrency(0)}</p>
                <p className="text-xs text-gray-500">0 premium users</p>
              </div>
            </div>
          </div>

          <div className="p-4 rounded-xl shadow-sm bg-white">
            <div className="flex items-center space-x-3">
              <div className="w-6 h-6 text-blue-500 flex-shrink-0">👥</div>
              <div className="min-w-0 flex-1">
                <p className="text-sm text-gray-600">Total Purchases</p>
                <p className="text-xl font-bold text-gray-900">{formatNumber(0)}</p>
                <p className="text-xs text-gray-500">All time</p>
              </div>
            </div>
          </div>

          <div className="p-4 rounded-xl shadow-sm bg-white">
            <div className="flex items-center space-x-3">
              <div className="w-6 h-6 text-purple-500 flex-shrink-0">💳</div>
              <div className="min-w-0 flex-1">
                <p className="text-sm text-gray-600">Premium Users</p>
                <p className="text-xl font-bold text-gray-900">{formatNumber(0)}</p>
                <p className="text-xs text-gray-500">Active subscriptions</p>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-2 mb-6">
          <button
            onClick={() => alert('Revenue data exported successfully!')}
            className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors flex items-center justify-center space-x-2"
          >
            <span>Export Data</span>
          </button>
        </div>

        {/* Revenue Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Revenue Trend Chart */}
          <div className="p-6 rounded-xl shadow-sm bg-white">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Revenue Trend</h3>
            <div className="h-64 rounded-lg flex items-center justify-center bg-gray-50">
              <div className="text-center">
                <div className="text-4xl mb-2">📊</div>
                <p className="text-sm text-gray-500">Revenue trend chart</p>
                <p className="text-xs text-gray-400">Monthly growth visualization</p>
              </div>
            </div>
          </div>

          {/* Payment Methods Chart */}
          <div className="p-6 rounded-xl shadow-sm bg-white">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Payment Methods</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Gumroad</span>
                <span className="font-medium text-gray-900">100%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-green-500 h-2 rounded-full" style={{ width: '100%' }}></div>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Transactions */}
        <div className="p-6 rounded-xl shadow-sm bg-white">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Transactions</h3>
          
          <div className="text-center py-8 text-gray-500">
            <div className="text-4xl mb-4">💳</div>
            <p>No transactions yet</p>
            <p className="text-sm">Transactions will appear here after users make payments</p>
          </div>
        </div>
      </div>
    </div>
  )
} 
'use client'

import { useState, useEffect } from 'react'
import { User, Calendar, AlertCircle, CheckCircle, Clock } from 'lucide-react'
import { toast } from 'sonner'

interface CertificationNameData {
  first_name: string
  last_name: string
  updated_at: string | null
  can_change: boolean
  next_allowed_date: string | null
  days_remaining: number | null
}

export default function CertificationNameForm() {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isFetching, setIsFetching] = useState(true)
  const [nameData, setNameData] = useState<CertificationNameData | null>(null)

  useEffect(() => {
    fetchCertificationName()
  }, [])

  const fetchCertificationName = async () => {
    try {
      setIsFetching(true)
      const response = await fetch('/api/certification/name', {
        headers: {
          'Authorization': 'Bearer demo-token' // In real app, this would be a real JWT
        }
      })
      
      if (response.ok) {
        const data = await response.json()
        setNameData(data.data)
        setFirstName(data.data.first_name || '')
        setLastName(data.data.last_name || '')
      } else {
        console.error('Failed to fetch certification name')
      }
    } catch (error) {
      console.error('Error fetching certification name:', error)
    } finally {
      setIsFetching(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!firstName.trim() || !lastName.trim()) {
      toast.error('Please enter both first and last name')
      return
    }
    
    if (firstName.trim().length < 2 || lastName.trim().length < 2) {
      toast.error('Names must be at least 2 characters long')
      return
    }
    
    try {
      setIsLoading(true)
      const response = await fetch('/api/certification/name', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer demo-token'
        },
        body: JSON.stringify({
          first_name: firstName.trim(),
          last_name: lastName.trim()
        })
      })
      
      const data = await response.json()
      
      if (response.ok) {
        toast.success('Certification name updated successfully!')
        setNameData(data.data)
      } else if (response.status === 429) {
        // 30-day restriction
        const daysRemaining = data.daysRemaining
        toast.error(
          `Name can only be changed every 30 days. You can change it again in ${daysRemaining} days.`,
          { duration: 5000 }
        )
        // Update the local state with the restriction info
        setNameData(prev => prev ? {
          ...prev,
          can_change: false,
          next_allowed_date: data.nextAllowedDate,
          days_remaining: daysRemaining
        } : null)
      } else {
        toast.error(data.error || 'Failed to update certification name')
      }
    } catch (error) {
      console.error('Error updating certification name:', error)
      toast.error('Failed to update certification name')
    } finally {
      setIsLoading(false)
    }
  }

  if (isFetching) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Current Name Display */}
      {nameData?.first_name && nameData?.last_name && (
        <div className="bg-blue-50 rounded-lg p-4 sm:p-6">
          <div className="flex items-center mb-3">
            <User className="w-5 h-5 text-blue-600 mr-2" />
            <h4 className="text-sm sm:text-base font-semibold text-blue-900">Current Certification Name</h4>
          </div>
          <p className="text-lg sm:text-xl font-bold text-blue-800">
            {nameData.first_name} {nameData.last_name}
          </p>
          {nameData.updated_at && (
            <p className="text-sm text-blue-600 mt-1">
              Last updated: {new Date(nameData.updated_at).toLocaleDateString()}
            </p>
          )}
        </div>
      )}

      {/* Change Restriction Notice */}
      {nameData && !nameData.can_change && nameData.days_remaining !== null && (
        <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 sm:p-6">
          <div className="flex items-start">
            <Clock className="w-5 h-5 text-orange-600 mr-3 mt-0.5 flex-shrink-0" />
            <div>
              <h4 className="text-sm sm:text-base font-semibold text-orange-900 mb-2">
                Name Change Restricted
              </h4>
              <p className="text-sm sm:text-base text-orange-800 mb-3">
                You can change your certification name every 30 days to prevent abuse. 
                You can update it again in <strong>{nameData.days_remaining} days</strong>.
              </p>
              {nameData.next_allowed_date && (
                <p className="text-xs sm:text-sm text-orange-700">
                  Next allowed change: {new Date(nameData.next_allowed_date).toLocaleDateString()}
                </p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Name Change Form */}
      <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          <div>
            <label className="block text-sm sm:text-base font-medium text-gray-700 mb-2">
              First Name
            </label>
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              disabled={!nameData?.can_change || isLoading}
              className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 disabled:text-gray-500 text-sm sm:text-base"
              placeholder="Enter your first name"
              maxLength={50}
            />
          </div>
          <div>
            <label className="block text-sm sm:text-base font-medium text-gray-700 mb-2">
              Last Name
            </label>
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              disabled={!nameData?.can_change || isLoading}
              className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 disabled:text-gray-500 text-sm sm:text-base"
              placeholder="Enter your last name"
              maxLength={50}
            />
          </div>
        </div>

        {/* Info Box */}
        <div className="bg-gray-50 rounded-lg p-4 sm:p-6">
          <div className="flex items-start">
            <AlertCircle className="w-5 h-5 text-gray-600 mr-3 mt-0.5 flex-shrink-0" />
            <div className="text-sm sm:text-base text-gray-700">
              <p className="font-medium mb-2">Important Notes:</p>
              <ul className="space-y-1 text-sm">
                <li>• This name will appear on your certificate of completion</li>
                <li>• Names can only be changed every 30 days to prevent abuse</li>
                <li>• Use your real name as it will appear on official documents</li>
                <li>• Names must be at least 2 characters long</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={!nameData?.can_change || isLoading || !firstName.trim() || !lastName.trim()}
          className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-semibold py-3 sm:py-4 px-6 rounded-lg transition-colors flex items-center justify-center"
        >
          {isLoading ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
              Updating...
            </>
          ) : (
            <>
              <CheckCircle className="w-4 h-4 mr-2" />
              Update Certification Name
            </>
          )}
        </button>
      </form>

      {/* Certificate Preview */}
      {firstName && lastName && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 sm:p-6">
          <div className="flex items-center mb-3">
            <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
            <h4 className="text-sm sm:text-base font-semibold text-green-900">Certificate Preview</h4>
          </div>
          <div className="bg-white rounded-lg p-4 border border-green-300">
            <p className="text-center text-lg font-bold text-gray-900 mb-2">
              Certificate of Completion
            </p>
            <p className="text-center text-gray-700 mb-4">
              This is to certify that
            </p>
            <p className="text-center text-xl font-bold text-blue-800 mb-4">
              {firstName} {lastName}
            </p>
            <p className="text-center text-sm text-gray-600">
              has successfully completed the ConvoMaster Professional Communication Course
            </p>
          </div>
        </div>
      )}
    </div>
  )
} 
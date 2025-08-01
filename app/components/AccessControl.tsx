'use client'

import { useUser } from '../providers'
import ExpiredAccountScreen from './ExpiredAccountScreen'

interface AccessControlProps {
  children: React.ReactNode
  lessonNumber?: number
}

export default function AccessControl({ children, lessonNumber }: AccessControlProps) {
  const { user, checkAccountStatus, checkLessonAccess } = useUser()
  
  if (!user) {
    return <div>Loading...</div>
  }
  
  // Check if account is expired
  const accountStatus = checkAccountStatus(user)
  if (accountStatus === 'EXPIRED') {
    return <ExpiredAccountScreen />
  }
  
  // If lesson number is provided, check lesson access
  if (lessonNumber) {
    const accessStatus = checkLessonAccess(user, lessonNumber)
    
    if (accessStatus === 'ACCOUNT_EXPIRED') {
      return <ExpiredAccountScreen />
    }
    
    if (accessStatus === 'PAYMENT_REQUIRED') {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg text-center">
            <div className="text-6xl mb-4">🔒</div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Premium Content
            </h2>
            <p className="text-gray-600 mb-6">
              This lesson requires a premium subscription. Upgrade to access all 120 lessons!
            </p>
            <div className="space-y-3">
              <a 
                href="/payment"
                className="block w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white py-3 rounded-lg transition-colors font-medium"
              >
                Upgrade for ₱499 - Lifetime Access
              </a>
              <a 
                href="/dashboard"
                className="block w-full bg-gray-200 text-gray-800 py-3 rounded-lg hover:bg-gray-300 transition-colors font-medium"
              >
                Back to Dashboard
              </a>
            </div>
          </div>
        </div>
      )
    }
  }
  
  return <>{children}</>
} 
'use client'

import { useUser } from '../providers'

interface UpgradePromptModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function UpgradePromptModal({ isOpen, onClose }: UpgradePromptModalProps) {
  const { user, getDaysLeft } = useUser()
  
  if (!user || !isOpen || user.subscription_status !== 'free') return null
  
  const daysLeft = getDaysLeft(user)
  
  // Only show modal when days are very low (3 days or less)
  if (daysLeft > 3) return null
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-gradient-to-br from-blue-600 to-indigo-700 p-8 rounded-2xl max-w-lg w-full mx-4 shadow-2xl text-white">
        <h3 className="text-2xl font-bold mb-6 text-center">Ready to Master Professional Conversations? 🚀</h3>
        <p className="text-lg mb-6 text-center opacity-90">
          Upgrade to premium and unlock 90 more advanced lessons, detailed analytics, lifetime access, and professional certification!
        </p>
        <div className="bg-white bg-opacity-10 p-6 rounded-xl mb-6 backdrop-blur-sm">
          <p className="text-white font-semibold mb-4 text-center">🚀 Premium Benefits:</p>
          <ul className="text-white space-y-3 text-sm">
            <li className="flex items-center">
              <span className="text-yellow-300 mr-3 text-lg">✨</span>
              Keep your progress and achievements forever
            </li>
            <li className="flex items-center">
              <span className="text-yellow-300 mr-3 text-lg">✨</span>
              Unlock 90+ advanced professional lessons
            </li>
            <li className="flex items-center">
              <span className="text-yellow-300 mr-3 text-lg">✨</span>
              Detailed analytics and progress insights
            </li>
            <li className="flex items-center">
              <span className="text-yellow-300 mr-3 text-lg">✨</span>
              Professional certification upon completion
            </li>
            <li className="flex items-center">
              <span className="text-yellow-300 mr-3 text-lg">✨</span>
              Lifetime access to all future updates
            </li>
          </ul>
        </div>
        <div className="flex space-x-4">
          <button 
            onClick={onClose}
            className="flex-1 bg-white bg-opacity-20 text-white py-3 rounded-xl hover:bg-opacity-30 transition-all duration-200 font-semibold"
          >
            Maybe Later
          </button>
          <button className="flex-1 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white py-3 px-6 rounded-xl font-bold transition-all duration-200 transform hover:scale-105 shadow-lg">
            🚀 Upgrade for ₱499
          </button>
        </div>
      </div>
    </div>
  )
} 
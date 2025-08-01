'use client'

export default function TrialInfoBanner() {
  return (
    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 p-8 rounded-xl mb-8 shadow-sm">
      <h3 className="text-2xl font-bold text-blue-900 mb-6 text-center">
        Start Your Professional Conversation Journey! 🎉
      </h3>
      <ul className="text-blue-800 space-y-4 mb-6">
        <li className="flex items-center">
          <span className="text-green-600 mr-4 text-xl">✅</span>
          <span className="text-lg font-medium">30 FREE lessons to build your confidence</span>
        </li>
        <li className="flex items-center">
          <span className="text-green-600 mr-4 text-xl">✅</span>
          <span className="text-lg font-medium">Learn at your own pace for 30 days</span>
        </li>
        <li className="flex items-center">
          <span className="text-green-600 mr-4 text-xl">✅</span>
          <span className="text-lg font-medium">Upgrade anytime to keep your progress forever</span>
        </li>
      </ul>
      <p className="text-base text-blue-700 text-center font-medium">
        📅 Your free access expires in 30 days, but you can always 
        re-register or upgrade to save your progress!
      </p>
    </div>
  )
} 
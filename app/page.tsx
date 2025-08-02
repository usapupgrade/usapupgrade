'use client'

import Link from 'next/link'

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 flex items-center justify-center">
      <div className="text-center text-white">
        <h1 className="text-4xl font-bold mb-4">
          <span className="text-orange-400">Usap</span><span className="text-blue-300">Upgrade</span>
        </h1>
        <p className="text-xl mb-6">Welcome to UsapUpgrade!</p>
        <p className="text-blue-200">Your conversation skills learning app</p>
        <div className="mt-8 space-y-4">
          <a 
            href="/health" 
            className="block bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg transition-colors"
          >
            Health Check
          </a>
          <a 
            href="/test-page" 
            className="block bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-colors"
          >
            Test Page
          </a>
        </div>
      </div>
    </div>
  )
}
"// test" 

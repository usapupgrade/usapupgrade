'use client'

import { useState } from 'react'

export default function TestPage() {
  const [count, setCount] = useState(0)

  return (
    <div className="min-h-screen bg-primary-50 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-primary-900 mb-4">
          Test Page
        </h1>
        <p className="text-primary-600 mb-8">
          If you can see this, the basic app is working!
        </p>
        <button
          onClick={() => setCount(count + 1)}
          className="btn-primary"
        >
          Count: {count}
        </button>
      </div>
    </div>
  )
} 
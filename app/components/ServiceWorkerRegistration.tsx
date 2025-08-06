'use client'

import { useEffect } from 'react'

export default function ServiceWorkerRegistration() {
  // Temporarily disabled to prevent DOM manipulation conflicts
  // Will be re-enabled after fixing lesson 15 crash
  useEffect(() => {
    // Disabled for now to prevent crashes
    console.log('Service Worker registration temporarily disabled')
  }, [])

  return null // This component doesn't render anything
} 
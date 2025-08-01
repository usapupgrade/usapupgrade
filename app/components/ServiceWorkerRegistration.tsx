'use client'

import { useEffect } from 'react'

export default function ServiceWorkerRegistration() {
  useEffect(() => {
    if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
      registerServiceWorker()
    }
  }, [])

  const registerServiceWorker = async () => {
    try {
      const registration = await navigator.serviceWorker.register('/sw.js', {
        scope: '/'
      })

      console.log('Service Worker registered successfully:', registration)

      // Handle service worker updates
      registration.addEventListener('updatefound', () => {
        const newWorker = registration.installing
        if (newWorker) {
          newWorker.addEventListener('statechange', () => {
            if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
              // New service worker available
              console.log('New service worker available')
              
              // Show update notification
              if (confirm('A new version of ConvoMaster is available. Reload to update?')) {
                window.location.reload()
              }
            }
          })
        }
      })

      // Handle service worker messages
      navigator.serviceWorker.addEventListener('message', (event) => {
        if (event.data && event.data.type === 'SYNC_PROGRESS') {
          console.log('Progress sync message:', event.data.message)
          // Handle progress sync
        }
      })

    } catch (error) {
      console.error('Service Worker registration failed:', error)
    }
  }

  return null // This component doesn't render anything
} 
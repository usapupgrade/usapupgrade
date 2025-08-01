const CACHE_NAME = 'convomaster-v1.0.0'
const STATIC_CACHE = 'convomaster-static-v1.0.0'
const DYNAMIC_CACHE = 'convomaster-dynamic-v1.0.0'

// Files to cache for offline functionality
const STATIC_FILES = [
  '/',
  '/dashboard',
  '/auth/signup',
  '/achievements',
  '/payment',
  '/certificate',
  '/manifest.json',
  '/favicon.ico',
  '/apple-touch-icon.png'
]

// API endpoints to cache
const API_CACHE = [
  '/api/lessons',
  '/api/progress',
  '/api/achievements'
]

// Install event - cache static files
self.addEventListener('install', (event) => {
  console.log('Service Worker installing...')
  
  event.waitUntil(
    caches.open(STATIC_CACHE)
      .then((cache) => {
        console.log('Caching static files')
        return cache.addAll(STATIC_FILES)
      })
      .then(() => {
        console.log('Static files cached successfully')
        return self.skipWaiting()
      })
      .catch((error) => {
        console.error('Error caching static files:', error)
      })
  )
})

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  console.log('Service Worker activating...')
  
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== STATIC_CACHE && cacheName !== DYNAMIC_CACHE) {
              console.log('Deleting old cache:', cacheName)
              return caches.delete(cacheName)
            }
          })
        )
      })
      .then(() => {
        console.log('Service Worker activated')
        return self.clients.claim()
      })
  )
})

// Fetch event - serve from cache when offline
self.addEventListener('fetch', (event) => {
  const { request } = event
  const url = new URL(request.url)
  
  // Skip non-GET requests
  if (request.method !== 'GET') {
    return
  }
  
  // Handle API requests
  if (url.pathname.startsWith('/api/')) {
    event.respondWith(handleApiRequest(request))
    return
  }
  
  // Handle static files
  if (url.pathname.startsWith('/') && !url.pathname.startsWith('/api/')) {
    event.respondWith(handleStaticRequest(request))
    return
  }
})

// Handle API requests with network-first strategy
async function handleApiRequest(request) {
  try {
    // Try network first
    const networkResponse = await fetch(request)
    
    // Cache successful responses
    if (networkResponse.ok) {
      const cache = await caches.open(DYNAMIC_CACHE)
      cache.put(request, networkResponse.clone())
    }
    
    return networkResponse
  } catch (error) {
    console.log('Network failed, trying cache for API:', request.url)
    
    // Fallback to cache
    const cachedResponse = await caches.match(request)
    if (cachedResponse) {
      return cachedResponse
    }
    
    // Return offline response for API calls
    return new Response(
      JSON.stringify({ 
        error: 'Offline mode', 
        message: 'Please check your connection and try again' 
      }),
      {
        status: 503,
        statusText: 'Service Unavailable',
        headers: { 'Content-Type': 'application/json' }
      }
    )
  }
}

// Handle static requests with cache-first strategy
async function handleStaticRequest(request) {
  // Check cache first
  const cachedResponse = await caches.match(request)
  if (cachedResponse) {
    return cachedResponse
  }
  
  try {
    // Try network
    const networkResponse = await fetch(request)
    
    // Cache successful responses
    if (networkResponse.ok) {
      const cache = await caches.open(STATIC_CACHE)
      cache.put(request, networkResponse.clone())
    }
    
    return networkResponse
  } catch (error) {
    console.log('Network failed for static file:', request.url)
    
    // Return offline page for navigation requests
    if (request.mode === 'navigate') {
      return caches.match('/')
    }
    
    return new Response('Offline', {
      status: 503,
      statusText: 'Service Unavailable'
    })
  }
}

// Background sync for offline actions
self.addEventListener('sync', (event) => {
  console.log('Background sync triggered:', event.tag)
  
  if (event.tag === 'sync-progress') {
    event.waitUntil(syncProgress())
  }
})

// Sync user progress when connection is restored
async function syncProgress() {
  try {
    const clients = await self.clients.matchAll()
    
    for (const client of clients) {
      client.postMessage({
        type: 'SYNC_PROGRESS',
        message: 'Syncing progress...'
      })
    }
    
    console.log('Progress sync completed')
  } catch (error) {
    console.error('Error syncing progress:', error)
  }
}

// Push notification handling
self.addEventListener('push', (event) => {
  console.log('Push notification received:', event)
  
  const options = {
    body: event.data ? event.data.text() : 'New lesson available!',
    icon: '/apple-touch-icon.png',
    badge: '/favicon.ico',
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    },
    actions: [
      {
        action: 'explore',
        title: 'Start Lesson'
      },
      {
        action: 'close',
        title: 'Close'
      }
    ]
  }
  
  event.waitUntil(
    self.registration.showNotification('ConvoMaster', options)
  )
})

// Handle notification clicks
self.addEventListener('notificationclick', (event) => {
  console.log('Notification clicked:', event)
  
  event.notification.close()
  
  if (event.action === 'explore') {
    event.waitUntil(
      clients.openWindow('/dashboard')
    )
  } else if (event.action === 'close') {
    // Just close the notification
    return
  } else {
    // Default action - open dashboard
    event.waitUntil(
      clients.openWindow('/dashboard')
    )
  }
})

// Handle notification close
self.addEventListener('notificationclose', (event) => {
  console.log('Notification closed:', event)
}) 
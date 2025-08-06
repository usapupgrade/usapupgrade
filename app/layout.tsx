import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Toaster } from 'sonner'
import { Providers } from './providers'
import ServiceWorkerRegistration from './components/ServiceWorkerRegistration'
import PWAInstall from './components/PWAInstall'
import DataMigrationBanner from './components/DataMigrationBanner'
// import ProgressDebug from './components/ProgressDebug'
// import AuthDebug from './components/AuthDebug'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'UsapUpgrade - Upgrade Conversations in 5 Minutes a Day',
  description: 'The Duolingo of conversation skills. Learn better communication through bite-sized daily lessons, interactive scenarios, and gamified learning.',
  keywords: 'conversation skills, communication, social skills, learning, gamification, daily lessons',
  authors: [{ name: 'UsapUpgrade Team' }],
  creator: 'UsapUpgrade',
  publisher: 'UsapUpgrade',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://usapupgrade-auod.vercel.app'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'UsapUpgrade - Upgrade Conversations in 5 Minutes a Day',
    description: 'Learn better communication through bite-sized daily lessons and interactive scenarios.',
    url: 'https://usapupgrade-auod.vercel.app',
    siteName: 'UsapUpgrade',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'UsapUpgrade - Conversation Skills Learning App',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'UsapUpgrade - Upgrade Conversations in 5 Minutes a Day',
    description: 'Learn better communication through bite-sized daily lessons and interactive scenarios.',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="h-full">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#f2750a" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5, user-scalable=yes" />
      </head>
      <body className={`${inter.className} h-full`}>
        <Providers>
          {children}
          <ServiceWorkerRegistration />
          <PWAInstall />
          <DataMigrationBanner />
          {/* <ProgressDebug /> */}
          {/* <AuthDebug /> */}
          <Toaster 
            position="top-center"
            richColors
            closeButton
            duration={4000}
          />
        </Providers>
      </body>
    </html>
  )
} 

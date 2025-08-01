/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['images.unsplash.com', 'cdn.paymongo.com'],
  },
  env: {
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://demo-supabase.com',
    NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'demo-anon-key',
    NEXT_PUBLIC_PAYMONGO_PUBLIC_KEY: process.env.NEXT_PUBLIC_PAYMONGO_PUBLIC_KEY || 'pk_test_demo',
    PAYMONGO_SECRET_KEY: process.env.PAYMONGO_SECRET_KEY || 'sk_test_demo',
    PAYMONGO_WEBHOOK_SECRET: process.env.PAYMONGO_WEBHOOK_SECRET || 'whsec_demo',
    NEXT_PUBLIC_BASE_URL: process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000',
  },
}

module.exports = nextConfig 
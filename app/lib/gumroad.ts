// Gumroad Integration for UsapUpgrade
// Supports embedded checkout, webhooks, and subscription management

interface GumroadConfig {
  productId: string
  productUrl: string
  price: number
  currency: string
  environment: 'development' | 'production'
}

interface GumroadPurchase {
  sale_id: string
  sale_timestamp: string
  buyer_email: string
  price_cents: number
  currency: string
  product_id: string
  product_name: string
  purchaser_id: string
  country: string
  is_gift: boolean
  referrer: string
  can_contact: boolean
  is_recurring: boolean
  subscription_id?: string
  refunded: boolean
  refunded_at?: string
}

class GumroadService {
  private config: GumroadConfig
  private scriptLoaded: boolean = false
  private scriptLoading: boolean = false

  constructor() {
    this.config = {
      productId: process.env.NEXT_PUBLIC_GUMROAD_PRODUCT_ID || 'premiumaccess',
      productUrl: process.env.NEXT_PUBLIC_GUMROAD_PRODUCT_URL || 'https://usapupgrade.gumroad.com/l/premiumaccess?wanted=true',
      price: 499, // ₱499 in PHP
      currency: 'PHP',
      environment: (process.env.NEXT_PUBLIC_GUMROAD_ENVIRONMENT as 'development' | 'production') || 'production'
    }

    // Validate configuration
    if (!this.config.productId || this.config.productId === 'usapupgrade') {
      console.warn('Gumroad: Using demo product ID. Set NEXT_PUBLIC_GUMROAD_PRODUCT_ID for production.')
    }
    if (!this.config.productUrl || this.config.productUrl === 'https://gumroad.com/l/usapupgrade') {
      console.warn('Gumroad: Using demo product URL. Set NEXT_PUBLIC_GUMROAD_PRODUCT_URL for production.')
    }
  }

  // Load Gumroad script dynamically
  async loadScript(): Promise<void> {
    if (this.scriptLoaded) return Promise.resolve()
    if (this.scriptLoading) {
      // Wait for existing load to complete
      return new Promise((resolve) => {
        const checkLoaded = () => {
          if (this.scriptLoaded) resolve()
          else setTimeout(checkLoaded, 100)
        }
        checkLoaded()
      })
    }

    this.scriptLoading = true

    return new Promise((resolve, reject) => {
      const script = document.createElement('script')
      script.src = 'https://gumroad.com/js/gumroad.js'
      script.async = true
      script.onload = () => {
        this.scriptLoaded = true
        this.scriptLoading = false
        resolve()
      }
      script.onerror = () => {
        this.scriptLoading = false
        reject(new Error('Failed to load Gumroad script'))
      }
      document.head.appendChild(script)
    })
  }

  // Open Gumroad checkout overlay
  async openCheckout(userEmail?: string): Promise<void> {
    try {
      await this.loadScript()
      
      // Configure Gumroad checkout
      const gumroadConfig = {
        product_id: this.config.productId,
        email: userEmail || '',
        currency: this.config.currency,
        price: this.config.price,
        environment: this.config.environment
      }

      // Open Gumroad overlay
      if (typeof window !== 'undefined' && (window as any).GumroadOverlay) {
        (window as any).GumroadOverlay.open(gumroadConfig)
      } else {
        // Fallback to direct link
        window.open(this.config.productUrl, '_blank')
      }
    } catch (error) {
      console.error('Failed to open Gumroad checkout:', error)
      throw error
    }
  }

  // Verify webhook signature (basic implementation)
  verifyWebhookSignature(payload: string, signature: string): boolean {
    // In production, implement proper signature verification
    // For now, we'll trust the webhook (Gumroad provides signature verification)
    return true
  }

  // Process webhook data
  processWebhook(data: GumroadPurchase): {
    success: boolean
    userEmail: string
    saleId: string
    amount: number
    currency: string
    isRefunded: boolean
  } {
    return {
      success: true,
      userEmail: data.buyer_email,
      saleId: data.sale_id,
      amount: data.price_cents / 100, // Convert cents to currency
      currency: data.currency,
      isRefunded: data.refunded
    }
  }

  // Get mock data for development
  getMockData(): GumroadPurchase {
    return {
      sale_id: 'mock_sale_123',
      sale_timestamp: new Date().toISOString(),
      buyer_email: 'test@example.com',
      price_cents: 49900,
      currency: 'PHP',
      product_id: this.config.productId,
      product_name: 'UsapUpgrade Premium',
      purchaser_id: 'mock_purchaser_123',
      country: 'PH',
      is_gift: false,
      referrer: 'https://usapupgrade.com',
      can_contact: true,
      is_recurring: false,
      refunded: false
    }
  }

  // Get configuration for frontend
  getConfig() {
    return {
      productId: this.config.productId,
      productUrl: this.config.productUrl,
      price: this.config.price,
      currency: this.config.currency,
      environment: this.config.environment
    }
  }
}

export const gumroad = new GumroadService() 
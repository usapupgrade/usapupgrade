// Lemon Squeezy Integration for UsapUpgrade
// Supports checkout, webhooks, and subscription management

interface LemonSqueezyConfig {
  storeId: string
  productId: string
  variantId: string
  price: number
  currency: string
  environment: 'development' | 'production'
}

interface LemonSqueezyOrder {
  id: string
  identifier: string
  order_number: number
  store_id: number
  customer_id: number
  order_item_id: number
  product_id: number
  variant_id: number
  product_name: string
  variant_name: string
  price: number
  currency: string
  status: string
  status_formatted: string
  refunded: boolean
  refunded_at?: string
  subtotal: number
  tax: number
  total: number
  subtotal_formatted: string
  tax_formatted: string
  total_formatted: string
  urls: {
    update_payment_method: string
  }
  created_at: string
  updated_at: string
  test_mode: boolean
}

interface LemonSqueezyCustomer {
  id: number
  store_id: number
  name: string
  email: string
  status: string
  city: string
  region: string
  country: string
  total_revenue_currency: number
  mrr: number
  status_formatted: string
  created_at: string
  updated_at: string
  test_mode: boolean
}

class LemonSqueezyService {
  private config: LemonSqueezyConfig
  private apiKey: string
  private webhookSecret: string

  constructor() {
    this.config = {
      storeId: process.env.NEXT_PUBLIC_LEMON_SQUEEZY_STORE_ID || '1',
      productId: process.env.NEXT_PUBLIC_LEMON_SQUEEZY_PRODUCT_ID || '1',
      variantId: process.env.NEXT_PUBLIC_LEMON_SQUEEZY_VARIANT_ID || '1',
      price: 499, // ₱499 PHP
      currency: 'PHP',
      environment: (process.env.NEXT_PUBLIC_LEMON_SQUEEZY_ENVIRONMENT as 'development' | 'production') || 'production'
    }

    this.apiKey = process.env.LEMON_SQUEEZY_API_KEY || ''
    this.webhookSecret = process.env.LEMON_SQUEEZY_WEBHOOK_SECRET || ''

    // Validate configuration
    if (!this.apiKey) {
      console.warn('Lemon Squeezy: API key not set. Set LEMON_SQUEEZY_API_KEY for production.')
    }
    if (!this.webhookSecret) {
      console.warn('Lemon Squeezy: Webhook secret not set. Set LEMON_SQUEEZY_WEBHOOK_SECRET for production.')
    }
  }

  // Create checkout session
  async createCheckoutSession(userEmail?: string): Promise<string> {
    try {
      const response = await fetch('https://api.lemonsqueezy.com/v1/checkouts', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`
        },
        body: JSON.stringify({
          data: {
            type: 'checkouts',
            attributes: {
              store_id: parseInt(this.config.storeId),
              variant_id: parseInt(this.config.variantId),
              custom_price: this.config.price * 100, // Convert PHP to cents
              product_options: {
                name: 'UsapUpgrade Premium Access',
                description: 'Lifetime access to professional communication training'
              },
              checkout_options: {
                embed: true,
                media: false,
                logo: false
              },
              checkout_data: {
                email: userEmail || '',
                custom: {
                  user_email: userEmail || ''
                }
              },
              expires_at: null,
              test_mode: this.config.environment === 'development'
            }
          }
        })
      })

      if (!response.ok) {
        throw new Error(`Failed to create checkout: ${response.statusText}`)
      }

      const data = await response.json()
      return data.data.attributes.url
    } catch (error) {
      console.error('Failed to create Lemon Squeezy checkout:', error)
      throw error
    }
  }

  // Verify webhook signature
  verifyWebhookSignature(payload: string, signature: string): boolean {
    if (!this.webhookSecret) {
      console.warn('Lemon Squeezy: Webhook secret not configured, skipping verification')
      return true
    }

    // Implement HMAC verification
    const crypto = require('crypto')
    const expectedSignature = crypto
      .createHmac('sha256', this.webhookSecret)
      .update(payload, 'utf8')
      .digest('hex')

    return signature === expectedSignature
  }

  // Process webhook data
  processWebhook(data: any): {
    success: boolean
    userEmail: string
    orderId: string
    amount: number
    currency: string
    isRefunded: boolean
    customerData: any
  } {
    try {
      const order = data.data.attributes as LemonSqueezyOrder
      const customer = data.included?.find((item: any) => item.type === 'customers')?.attributes as LemonSqueezyCustomer

      // Convert USD amount back to PHP for admin dashboard consistency
      const usdAmount = order.total / 100 // Convert cents to USD
      const phpAmount = usdAmount * 55.5 // Approximate USD to PHP conversion rate

      return {
        success: true,
        userEmail: customer?.email || order.customer_id?.toString() || '',
        orderId: order.identifier,
        amount: phpAmount, // Store as PHP amount for admin dashboard
        currency: 'PHP', // Keep as PHP for consistency
        isRefunded: order.refunded,
        customerData: customer
      }
    } catch (error) {
      console.error('Failed to process Lemon Squeezy webhook:', error)
      return {
        success: false,
        userEmail: '',
        orderId: '',
        amount: 0,
        currency: 'PHP',
        isRefunded: false,
        customerData: null
      }
    }
  }

  // Get configuration for frontend
  getConfig() {
    return {
      storeId: this.config.storeId,
      productId: this.config.productId,
      variantId: this.config.variantId,
      price: this.config.price,
      currency: this.config.currency,
      environment: this.config.environment
    }
  }

  // Get mock data for development
  getMockData(): any {
    return {
      data: {
        type: 'orders',
        id: 'mock_order_123',
        attributes: {
          id: 123,
          identifier: 'mock_order_123',
          order_number: 1,
          store_id: parseInt(this.config.storeId),
          customer_id: 1,
          order_item_id: 1,
          product_id: parseInt(this.config.productId),
          variant_id: parseInt(this.config.variantId),
          product_name: 'UsapUpgrade Premium',
          variant_name: 'Lifetime Access',
          price: this.config.price * 100,
          currency: 'USD',
          status: 'paid',
          status_formatted: 'Paid',
          refunded: false,
          subtotal: this.config.price * 100,
          tax: 0,
          total: this.config.price * 100,
          subtotal_formatted: `₱${this.config.price}`,
          tax_formatted: '₱0.00',
          total_formatted: `₱${this.config.price}`,
          urls: {
            update_payment_method: 'https://example.com'
          },
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
          test_mode: true
        }
      },
      included: [
        {
          type: 'customers',
          id: '1',
          attributes: {
            id: 1,
            store_id: parseInt(this.config.storeId),
            name: 'Test User',
            email: 'test@example.com',
            status: 'subscribed',
            city: 'Test City',
            region: 'Test Region',
            country: 'PH',
            total_revenue_currency: this.config.price * 100,
            mrr: 0,
            status_formatted: 'Subscribed',
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
            test_mode: true
          }
        }
      ]
    }
  }
}

export const lemonSqueezy = new LemonSqueezyService() 
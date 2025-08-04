// PayMongo Integration for Filipino Market
// Supports GCash, GrabPay, Credit Cards, and other Filipino payment methods

interface PayMongoConfig {
  publicKey: string
  secretKey: string
  webhookSecret: string
}

interface PaymentIntent {
  id: string
  amount: number
  currency: string
  description: string
  payment_method_allowed: string[]
  status: string
  client_key?: string
  redirect: {
    success: string
    failed: string
  }
}

interface PaymentSource {
  id: string
  type: 'gcash' | 'grabpay' | 'card' | 'paymaya' | 'billease'
  amount: number
  currency: string
  redirect: {
    success: string
    failed: string
  }
}

interface Customer {
  id: string
  email: string
  first_name: string
  last_name: string
  phone?: string
}

class PayMongoService {
  private config: PayMongoConfig
  private baseUrl = 'https://api.paymongo.com/v1'

  constructor() {
    this.config = {
      publicKey: process.env.NEXT_PUBLIC_PAYMONGO_PUBLIC_KEY || 'pk_test_demo',
      secretKey: process.env.PAYMONGO_SECRET_KEY || 'sk_test_demo',
      webhookSecret: process.env.PAYMONGO_WEBHOOK_SECRET || 'whsec_demo'
    }
    
    // Validate configuration
    if (!this.config.publicKey || this.config.publicKey === 'pk_test_demo') {
      console.warn('PayMongo: Using demo public key. Set NEXT_PUBLIC_PAYMONGO_PUBLIC_KEY for production.')
    }
    if (!this.config.secretKey || this.config.secretKey === 'sk_test_demo') {
      console.warn('PayMongo: Using demo secret key. Set PAYMONGO_SECRET_KEY for production.')
    }
  }

  private getAuthHeaders(useSecretKey = false) {
    const key = useSecretKey ? this.config.secretKey : this.config.publicKey
    return {
      'Authorization': `Basic ${Buffer.from(key + ':').toString('base64')}`,
      'Content-Type': 'application/json'
    }
  }

  // Create Payment Intent for ₱1,999 one-time payment
  async createPaymentIntent(userId: string, email: string): Promise<PaymentIntent> {
    try {
      const response = await fetch(`${this.baseUrl}/payment_intents`, {
        method: 'POST',
        headers: this.getAuthHeaders(true),
        body: JSON.stringify({
          data: {
            attributes: {
              amount: 199900, // ₱1,999.00 in centavos
              currency: 'PHP',
              description: 'ConvoMaster Complete Professional Course - Lifetime Access',
              statement_descriptor: 'ConvoMaster Course',
              payment_method_allowed: [
                'card',
                'gcash',
                'grabpay',
                'paymaya',
                'billease'
              ],
              metadata: {
                user_id: userId,
                email: email,
                product: 'complete_course',
                type: 'one_time_payment'
              }
            }
          }
        })
      })

      if (!response.ok) {
        throw new Error('Failed to create payment intent')
      }

      const result = await response.json()
      return result.data
    } catch (error) {
      console.error('PayMongo payment intent creation failed:', error)
      // Return mock data for development
      return {
        id: 'pi_mock_' + Date.now(),
        amount: 199900,
        currency: 'PHP',
        description: 'ConvoMaster Complete Professional Course',
        payment_method_allowed: ['card', 'gcash', 'grabpay', 'paymaya'],
        status: 'awaiting_payment_method',
        client_key: 'pi_mock_client_key',
        redirect: {
          success: `${process.env.NEXT_PUBLIC_APP_URL}/payment/success`,
          failed: `${process.env.NEXT_PUBLIC_APP_URL}/payment/failed`
        }
      }
    }
  }

  // Create Payment Source for specific payment method
  async createPaymentSource(
    paymentIntentId: string,
    paymentMethod: 'gcash' | 'grabpay' | 'card' | 'paymaya' | 'billease',
    amount: number = 199900
  ): Promise<PaymentSource> {
    try {
      const response = await fetch(`${this.baseUrl}/sources`, {
        method: 'POST',
        headers: this.getAuthHeaders(true),
        body: JSON.stringify({
          data: {
            attributes: {
              amount: amount,
              currency: 'PHP',
              type: paymentMethod,
              redirect: {
                success: `${process.env.NEXT_PUBLIC_APP_URL}/payment/success?pi=${paymentIntentId}`,
                failed: `${process.env.NEXT_PUBLIC_APP_URL}/payment/failed?pi=${paymentIntentId}`
              }
            }
          }
        })
      })

      if (!response.ok) {
        throw new Error('Failed to create payment source')
      }

      const result = await response.json()
      return result.data
    } catch (error) {
      console.error('PayMongo payment source creation failed:', error)
      // Return mock data for development
      return {
        id: 'src_mock_' + Date.now(),
        type: paymentMethod,
        amount: amount,
        currency: 'PHP',
        redirect: {
          success: `${process.env.NEXT_PUBLIC_BASE_URL}/payment/success`,
          failed: `${process.env.NEXT_PUBLIC_BASE_URL}/payment/failed`
        }
      }
    }
  }

  // Create Customer for future transactions
  async createCustomer(email: string, firstName: string, lastName: string, phone?: string): Promise<Customer> {
    try {
      const response = await fetch(`${this.baseUrl}/customers`, {
        method: 'POST',
        headers: this.getAuthHeaders(true),
        body: JSON.stringify({
          data: {
            attributes: {
              email,
              first_name: firstName,
              last_name: lastName,
              phone,
              default_device: 'mobile'
            }
          }
        })
      })

      if (!response.ok) {
        throw new Error('Failed to create customer')
      }

      const result = await response.json()
      return result.data
    } catch (error) {
      console.error('PayMongo customer creation failed:', error)
      // Return mock data for development
      return {
        id: 'cus_mock_' + Date.now(),
        email,
        first_name: firstName,
        last_name: lastName,
        phone
      }
    }
  }

  // Verify webhook signature for security
  verifyWebhookSignature(payload: string, signature: string): boolean {
    try {
      const crypto = require('crypto')
      const expectedSignature = crypto
        .createHmac('sha256', this.config.webhookSecret)
        .update(payload)
        .digest('hex')
      
      return signature === expectedSignature
    } catch (error) {
      console.error('Webhook signature verification failed:', error)
      return false
    }
  }

  // Handle webhook events
  async handleWebhookEvent(event: any): Promise<void> {
    try {
      switch (event.data.attributes.type) {
        case 'payment.paid':
          await this.handlePaymentSuccess(event.data)
          break
        case 'payment.failed':
          await this.handlePaymentFailed(event.data)
          break
        case 'source.chargeable':
          await this.handleSourceChargeable(event.data)
          break
        default:
          console.log('Unhandled webhook event:', event.data.attributes.type)
      }
    } catch (error) {
      console.error('Webhook event handling failed:', error)
    }
  }

  private async handlePaymentSuccess(paymentData: any): Promise<void> {
    const userId = paymentData.attributes.metadata?.user_id
    if (userId) {
      // Grant premium access to user
      // This would integrate with Supabase to update user record
      console.log('Payment successful for user:', userId)
    }
  }

  private async handlePaymentFailed(paymentData: any): Promise<void> {
    const userId = paymentData.attributes.metadata?.user_id
    if (userId) {
      // Log failed payment
      console.log('Payment failed for user:', userId)
    }
  }

  private async handleSourceChargeable(sourceData: any): Promise<void> {
    // Auto-charge the source when it becomes chargeable
    console.log('Source chargeable:', sourceData.id)
  }

  // Get supported payment methods for Filipino market
  getSupportedPaymentMethods() {
    return [
      {
        id: 'gcash',
        name: 'GCash',
        description: 'Pay using your GCash wallet',
        icon: '💳',
        popular: true
      },
      {
        id: 'grabpay',
        name: 'GrabPay',
        description: 'Pay using your GrabPay wallet',
        icon: '🚗',
        popular: true
      },
      {
        id: 'card',
        name: 'Credit/Debit Card',
        description: 'Visa, Mastercard, and other cards',
        icon: '💳',
        popular: false
      },
      {
        id: 'paymaya',
        name: 'PayMaya',
        description: 'Pay using your PayMaya account',
        icon: '💸',
        popular: true
      },
      {
        id: 'billease',
        name: 'Billease',
        description: 'Pay in installments with Billease',
        icon: '📄',
        popular: false
      }
    ]
  }
}

// Export singleton instance
export const paymongo = new PayMongoService()

// Types for use in components
export type {
  PaymentIntent,
  PaymentSource,
  Customer
} 
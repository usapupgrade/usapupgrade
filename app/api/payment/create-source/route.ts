import { NextRequest, NextResponse } from 'next/server'
import { paymongo } from '@/app/lib/paymongo'

export async function POST(request: NextRequest) {
  try {
    const { paymentIntentId, paymentMethod, amount = 199900 } = await request.json()

    if (!paymentIntentId || !paymentMethod) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Create payment source with Paymongo
    const paymentSource = await paymongo.createPaymentSource(
      paymentIntentId,
      paymentMethod,
      amount
    )

    return NextResponse.json({
      success: true,
      paymentSource: {
        id: paymentSource.id,
        type: paymentSource.type,
        amount: paymentSource.amount,
        currency: paymentSource.currency,
        redirect: paymentSource.redirect
      }
    })

  } catch (error) {
    console.error('Payment source creation error:', error)
    return NextResponse.json(
      { error: 'Failed to create payment source' },
      { status: 500 }
    )
  }
} 
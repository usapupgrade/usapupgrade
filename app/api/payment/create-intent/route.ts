import { NextRequest, NextResponse } from 'next/server'
import { paymongo } from '@/app/lib/paymongo'
import { supabaseAdmin } from '@/lib/supabase'

export async function POST(request: NextRequest) {
  try {
    const { userId, email, amount = 199900 } = await request.json()

    if (!userId || !email) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Create payment intent with Paymongo
    const paymentIntent = await paymongo.createPaymentIntent(userId, email)

    // Log the payment intent creation
    if (supabaseAdmin) {
      await supabaseAdmin
        .from('payment_intents')
        .insert({
          paymongo_intent_id: paymentIntent.id,
          user_id: userId,
          amount: amount,
          status: paymentIntent.status,
          metadata: {
            email,
            product: 'complete_course',
            type: 'one_time_payment'
          }
        })
    }

    return NextResponse.json({
      success: true,
      paymentIntent: {
        id: paymentIntent.id,
        client_key: paymentIntent.client_key,
        amount: paymentIntent.amount,
        currency: paymentIntent.currency,
        status: paymentIntent.status
      }
    })

  } catch (error) {
    console.error('Payment intent creation error:', error)
    return NextResponse.json(
      { error: 'Failed to create payment intent' },
      { status: 500 }
    )
  }
} 
import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function POST(request: NextRequest) {
  try {
    const { voucherCode, userId, orderAmount } = await request.json()

    if (!voucherCode || !userId || !orderAmount) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Call the database function to validate voucher
    const { data, error } = await supabase.rpc('validate_voucher', {
      voucher_code: voucherCode.toUpperCase(),
      user_uuid: userId,
      order_amount: orderAmount
    })

    if (error) {
      console.error('Voucher validation error:', error)
      return NextResponse.json(
        { error: 'Database error during validation' },
        { status: 500 }
      )
    }

    return NextResponse.json(data)

  } catch (error) {
    console.error('Voucher validation error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
} 
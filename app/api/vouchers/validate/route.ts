import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'

export async function POST(request: NextRequest) {
  try {
    // Check if supabaseAdmin is available
    if (!supabaseAdmin) {
      return NextResponse.json({ error: 'Database not available' }, { status: 500 })
    }
    
    const { voucherCode, userId, orderAmount } = await request.json()

    if (!voucherCode || !userId || !orderAmount) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Call the database function to validate voucher
    const { data, error } = await supabaseAdmin.rpc('validate_voucher', {
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
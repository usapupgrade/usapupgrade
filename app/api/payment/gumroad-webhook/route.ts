import { NextRequest, NextResponse } from 'next/server'
import { gumroad } from '@/app/lib/gumroad'
import { supabaseAdmin } from '@/lib/supabase'

export async function POST(request: NextRequest) {
  try {
    console.log('=== GUMROAD WEBHOOK RECEIVED ===')
    const body = await request.text()
    const signature = request.headers.get('x-gumroad-signature') || ''
    
    console.log('Webhook body:', body)
    console.log('Signature:', signature)
    
    // Verify webhook signature (basic implementation)
    if (!gumroad.verifyWebhookSignature(body, signature)) {
      console.warn('Gumroad webhook: Invalid signature')
      return NextResponse.json({ error: 'Invalid signature' }, { status: 401 })
    }

    // Parse webhook data
    const formData = new URLSearchParams(body)
    const webhookData = {
      sale_id: formData.get('sale_id') || '',
      sale_timestamp: formData.get('sale_timestamp') || '',
      buyer_email: formData.get('buyer_email') || '',
      price_cents: parseInt(formData.get('price_cents') || '0'),
      currency: formData.get('currency') || 'PHP',
      product_id: formData.get('product_id') || '',
      product_name: formData.get('product_name') || '',
      purchaser_id: formData.get('purchaser_id') || '',
      country: formData.get('country') || '',
      is_gift: formData.get('is_gift') === 'true',
      referrer: formData.get('referrer') || '',
      can_contact: formData.get('can_contact') === 'true',
      is_recurring: formData.get('is_recurring') === 'true',
      subscription_id: formData.get('subscription_id') || undefined,
      refunded: formData.get('refunded') === 'true',
      refunded_at: formData.get('refunded_at') || undefined
    }

    console.log('Gumroad webhook data:', webhookData)

    // Process webhook data
    const processed = gumroad.processWebhook(webhookData)
    
    if (!processed.success) {
      console.error('Gumroad webhook: Failed to process data')
      return NextResponse.json({ error: 'Failed to process webhook' }, { status: 400 })
    }

    // Find or create user by email
    let user = null
    if (supabaseAdmin) {
      const { data: existingUser } = await supabaseAdmin
        .from('users')
        .select('*')
        .eq('email', processed.userEmail)
        .single()

      if (existingUser) {
        user = existingUser
      } else {
        // Create new user if they don't exist
        const { data: newUser, error: createError } = await supabaseAdmin
          .from('users')
          .insert({
            email: processed.userEmail,
            name: processed.userEmail.split('@')[0], // Use email prefix as name
            subscription_status: 'premium',
            primary_goal: 'professional_communication', // Default value
            experience_level: 'beginner', // Default value
            daily_time_commitment: '15_minutes', // Default value
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          })
          .select()
          .single()

        if (createError) {
          console.error('Gumroad webhook: Failed to create user:', createError)
          return NextResponse.json({ error: 'Failed to create user' }, { status: 500 })
        }

        user = newUser
      }

      // Update user to premium if not already
      const updateData: any = {
        updated_at: new Date().toISOString(),
        subscription_status: 'premium',
        is_premium: true
      }
      
      await supabaseAdmin
        .from('users')
        .update(updateData)
        .eq('id', user.id)

      // Log purchase in purchases table
      await supabaseAdmin.from('purchases').insert({
        user_id: user.id,
        sale_id: processed.saleId,
        product_id: webhookData.product_id,
        email: processed.userEmail,
        price: processed.amount,
        currency: processed.currency,
        purchase_date: new Date().toISOString(),
        country: webhookData.country,
        status: processed.isRefunded ? 'refunded' : 'completed',
        is_new_user: !existingUser,
        metadata: webhookData
      })

      // Update daily analytics
      const today = new Date().toISOString().split('T')[0]
      const { data: existingAnalytics } = await supabaseAdmin
        .from('daily_analytics')
        .select('*')
        .eq('date', today)
        .single()

      if (existingAnalytics) {
        await supabaseAdmin
          .from('daily_analytics')
          .update({
            revenue: existingAnalytics.revenue + processed.amount,
            purchases: existingAnalytics.purchases + 1,
            new_users: existingAnalytics.new_users + (!existingUser ? 1 : 0),
            updated_at: new Date().toISOString()
          })
          .eq('date', today)
      } else {
        await supabaseAdmin.from('daily_analytics').insert({
          date: today,
          revenue: processed.amount,
          purchases: 1,
          refunds: 0,
          new_users: !existingUser ? 1 : 0,
          total_users: 1
        })
      }
    }

    console.log('Gumroad webhook: Successfully processed purchase for user:', user?.email)
    console.log('=== GUMROAD WEBHOOK COMPLETED ===')
    return NextResponse.json({ success: true })

  } catch (error) {
    console.error('Gumroad webhook error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
} 
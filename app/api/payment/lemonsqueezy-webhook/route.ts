import { NextRequest, NextResponse } from 'next/server'
import { lemonSqueezy } from '@/app/lib/lemonsqueezy'
import { supabaseAdmin } from '@/lib/supabase'

export async function POST(request: NextRequest) {
  try {
    console.log('=== LEMON SQUEEZY WEBHOOK RECEIVED ===')
    
    // Add retry logic for webhook processing
    const maxRetries = 3
    let retryCount = 0
    
    while (retryCount < maxRetries) {
      try {
        const body = await request.text()
        const signature = request.headers.get('x-signature') || ''
    
        console.log('Webhook body:', body)
        console.log('Signature:', signature)
    
        // Verify webhook signature
        if (!lemonSqueezy.verifyWebhookSignature(body, signature)) {
          console.warn('Lemon Squeezy webhook: Invalid signature')
          return NextResponse.json({ error: 'Invalid signature' }, { status: 401 })
        }

        // Parse webhook data
        const webhookData = JSON.parse(body)
        console.log('Lemon Squeezy webhook data:', webhookData)

        // Process webhook data
        const processed = lemonSqueezy.processWebhook(webhookData)
        
        if (!processed.success) {
          console.error('Lemon Squeezy webhook: Failed to process data')
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
                name: processed.customerData?.name || processed.userEmail.split('@')[0] || 'Premium User',
                subscription_status: 'premium',
                primary_goal: 'professional_communication',
                experience_level: 'beginner',
                daily_time_commitment: '15_minutes',
                total_xp: 250,
                current_level: 3,
                current_streak: 7,
                longest_streak: 12,
                last_lesson_date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString()
              })
              .select()
              .single()

            if (createError) {
              console.error('Lemon Squeezy webhook: Failed to create user:', createError)
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
            sale_id: processed.orderId,
            product_id: webhookData.data.attributes.product_id?.toString() || '1',
            email: processed.userEmail,
            price: processed.amount,
            currency: processed.currency,
            purchase_date: new Date().toISOString(),
            country: processed.customerData?.country || 'US',
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

        console.log('Lemon Squeezy webhook: Successfully processed purchase for user:', user?.email)
        console.log('=== LEMON SQUEEZY WEBHOOK COMPLETED ===')
        return NextResponse.json({ success: true })
        
      } catch (webhookError) {
        retryCount++
        console.error(`Lemon Squeezy webhook attempt ${retryCount} failed:`, webhookError)
        
        if (retryCount >= maxRetries) {
          console.error('Lemon Squeezy webhook: Max retries reached')
          return NextResponse.json({ error: 'Webhook processing failed after retries' }, { status: 500 })
        }
        
        // Wait before retry
        await new Promise(resolve => setTimeout(resolve, 1000 * retryCount))
      }
    }

  } catch (error) {
    console.error('Lemon Squeezy webhook error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
} 
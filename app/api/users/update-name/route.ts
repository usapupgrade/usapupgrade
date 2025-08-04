import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'

export async function POST(request: NextRequest) {
  try {
    const { name } = await request.json()
    
    if (!name || name.trim() === '') {
      return NextResponse.json({ error: 'Name is required' }, { status: 400 })
    }

    // Get user from session (you'll need to implement proper auth)
    // For now, we'll update the first premium user as a demo
    if (supabaseAdmin) {
      const { data: users } = await supabaseAdmin
        .from('users')
        .select('id')
        .eq('subscription_status', 'premium')
        .limit(1)

      if (users && users.length > 0) {
        await supabaseAdmin
          .from('users')
          .update({ 
            name: name.trim(),
            updated_at: new Date().toISOString()
          })
          .eq('id', users[0].id)

        return NextResponse.json({ success: true, message: 'Name updated successfully' })
      }
    }

    return NextResponse.json({ error: 'User not found' }, { status: 404 })

  } catch (error) {
    console.error('Update name error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
} 
import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'

export async function PUT(request: NextRequest) {
  try {
    // Check if supabaseAdmin is available
    if (!supabaseAdmin) {
      return NextResponse.json({ error: 'Database not available' }, { status: 500 })
    }
    
    const { first_name, last_name } = await request.json()
    
    // Validate input
    if (!first_name || !last_name) {
      return NextResponse.json(
        { error: 'First name and last name are required' },
        { status: 400 }
      )
    }
    
    if (first_name.length < 2 || last_name.length < 2) {
      return NextResponse.json(
        { error: 'Names must be at least 2 characters long' },
        { status: 400 }
      )
    }
    
    if (first_name.length > 50 || last_name.length > 50) {
      return NextResponse.json(
        { error: 'Names must be less than 50 characters' },
        { status: 400 }
      )
    }
    
    // Get user from auth header (in real app, this would be from JWT)
    const authHeader = request.headers.get('authorization')
    if (!authHeader) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }
    
    // For demo purposes, we'll use a mock user ID
    // In real app, you'd extract this from the JWT token
    const userId = 'demo-user-123'
    
    // Check if user can change certification name (30-day restriction)
    const { data: canChange, error: checkError } = await supabaseAdmin
      .rpc('can_change_certification_name', { user_uuid: userId })
    
    if (checkError) {
      console.error('Error checking certification name change permission:', checkError)
      return NextResponse.json(
        { error: 'Failed to check name change permission' },
        { status: 500 }
      )
    }
    
    if (!canChange) {
      // Get the last update date to show user when they can change again
      const { data: userData, error: userError } = await supabaseAdmin
        .from('users')
        .select('certification_name_updated_at')
        .eq('id', userId)
        .single()
      
      if (userError) {
        console.error('Error fetching user data:', userError)
        return NextResponse.json(
          { error: 'Failed to fetch user data' },
          { status: 500 }
        )
      }
      
      const lastUpdate = new Date(userData.certification_name_updated_at)
      const nextAllowedDate = new Date(lastUpdate.getTime() + 30 * 24 * 60 * 60 * 1000)
      
      return NextResponse.json(
        { 
          error: 'Name can only be changed every 30 days',
          lastUpdate: lastUpdate.toISOString(),
          nextAllowedDate: nextAllowedDate.toISOString(),
          daysRemaining: Math.ceil((nextAllowedDate.getTime() - Date.now()) / (1000 * 60 * 60 * 24))
        },
        { status: 429 }
      )
    }
    
    // Update certification name
    const { data, error } = await supabaseAdmin
      .from('users')
      .update({
        certification_first_name: first_name.trim(),
        certification_last_name: last_name.trim(),
        certification_name_updated_at: new Date().toISOString()
      })
      .eq('id', userId)
      .select('certification_first_name, certification_last_name, certification_name_updated_at')
      .single()
    
    if (error) {
      console.error('Error updating certification name:', error)
      return NextResponse.json(
        { error: 'Failed to update certification name' },
        { status: 500 }
      )
    }
    
    return NextResponse.json({
      success: true,
      data: {
        first_name: data.certification_first_name,
        last_name: data.certification_last_name,
        updated_at: data.certification_name_updated_at
      }
    })
    
  } catch (error) {
    console.error('Error in certification name update:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    // Check if supabaseAdmin is available
    if (!supabaseAdmin) {
      return NextResponse.json({ error: 'Database not available' }, { status: 500 })
    }
    
    // Get user from auth header
    const authHeader = request.headers.get('authorization')
    if (!authHeader) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }
    
    // For demo purposes, we'll use a mock user ID
    const userId = 'demo-user-123'
    
    // Get current certification name and last update
    const { data, error } = await supabaseAdmin
      .from('users')
      .select('certification_first_name, certification_last_name, certification_name_updated_at')
      .eq('id', userId)
      .single()
    
    if (error) {
      console.error('Error fetching certification name:', error)
      return NextResponse.json(
        { error: 'Failed to fetch certification name' },
        { status: 500 }
      )
    }
    
    // Check if user can change name
    const { data: canChange } = await supabaseAdmin
      .rpc('can_change_certification_name', { user_uuid: userId })
    
    let nextAllowedDate = null
    let daysRemaining = null
    
    if (!canChange && data.certification_name_updated_at) {
      const lastUpdate = new Date(data.certification_name_updated_at)
      nextAllowedDate = new Date(lastUpdate.getTime() + 30 * 24 * 60 * 60 * 1000)
      daysRemaining = Math.ceil((nextAllowedDate.getTime() - Date.now()) / (1000 * 60 * 60 * 24))
    }
    
    return NextResponse.json({
      data: {
        first_name: data.certification_first_name,
        last_name: data.certification_last_name,
        updated_at: data.certification_name_updated_at,
        can_change: canChange,
        next_allowed_date: nextAllowedDate?.toISOString(),
        days_remaining: daysRemaining
      }
    })
    
  } catch (error) {
    console.error('Error fetching certification name:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
} 
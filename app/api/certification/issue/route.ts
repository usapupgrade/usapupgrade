import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'

export async function POST(request: NextRequest) {
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
    
    // Check if user already has a certification
    const { data: existingCert, error: certError } = await supabaseAdmin
      .from('certifications')
      .select('id, certificate_id, issued_at')
      .eq('user_id', userId)
      .single()
    
    if (certError && certError.code !== 'PGRST116') { // PGRST116 = no rows returned
      console.error('Error checking existing certification:', certError)
      return NextResponse.json(
        { error: 'Failed to check existing certification' },
        { status: 500 }
      )
    }
    
    if (existingCert) {
      return NextResponse.json(
        { 
          error: 'User already has a certification',
          certificate_id: existingCert.certificate_id,
          issued_at: existingCert.issued_at
        },
        { status: 409 }
      )
    }
    
    // Get user's completion data
    const { data: userData, error: userError } = await supabaseAdmin
      .from('users')
      .select('total_xp, longest_streak, subscription_status')
      .eq('id', userId)
      .single()
    
    if (userError) {
      console.error('Error fetching user data:', userError)
      return NextResponse.json(
        { error: 'Failed to fetch user data' },
        { status: 500 }
      )
    }
    
    // Check if user is premium
    if (userData.subscription_status !== 'premium' && userData.subscription_status !== 'lifetime') {
      return NextResponse.json(
        { error: 'Premium subscription required for certification' },
        { status: 403 }
      )
    }
    
    // Get completed lessons count (in real app, this would be from user_progress table)
    const completedLessons = 120 // Mock data for demo
    
    // Check if user has completed all lessons
    if (completedLessons < 120) {
      return NextResponse.json(
        { 
          error: 'Must complete all 120 lessons to receive certification',
          completed: completedLessons,
          required: 120
        },
        { status: 400 }
      )
    }
    
    // Generate unique certificate ID using database function
    const { data: certIdData, error: certIdError } = await supabaseAdmin
      .rpc('generate_certificate_id')
    
    if (certIdError) {
      console.error('Error generating certificate ID:', certIdError)
      return NextResponse.json(
        { error: 'Failed to generate certificate ID' },
        { status: 500 }
      )
    }
    
    // Issue certification with automated certificate ID
    const { data: certData, error: issueError } = await supabaseAdmin
      .rpc('issue_certification', {
        user_uuid: userId,
        first_name: first_name.trim(),
        last_name: last_name.trim(),
        total_xp: userData.total_xp,
        longest_streak: userData.longest_streak,
        lessons_completed: completedLessons
      })
    
    if (issueError) {
      console.error('Error issuing certification:', issueError)
      return NextResponse.json(
        { error: 'Failed to issue certification' },
        { status: 500 }
      )
    }
    
    // Get the issued certification details
    const { data: issuedCert, error: fetchError } = await supabaseAdmin
      .from('certifications')
      .select('*')
      .eq('id', certData)
      .single()
    
    if (fetchError) {
      console.error('Error fetching issued certification:', fetchError)
      return NextResponse.json(
        { error: 'Failed to fetch issued certification' },
        { status: 500 }
      )
    }
    
    return NextResponse.json({
      success: true,
      data: {
        certificate_id: issuedCert.certificate_id,
        first_name: issuedCert.first_name,
        last_name: issuedCert.last_name,
        issued_at: issuedCert.issued_at,
        completion_date: issuedCert.completion_date,
        total_xp: issuedCert.total_xp_at_completion,
        longest_streak: issuedCert.longest_streak_at_completion,
        lessons_completed: issuedCert.lessons_completed_at_completion,
        certificate_hash: issuedCert.certificate_hash
      }
    })
    
  } catch (error) {
    console.error('Error issuing certification:', error)
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
    
    // Get user's certification status
    const { data: certData, error: certError } = await supabaseAdmin
      .from('certifications')
      .select('*')
      .eq('user_id', userId)
      .single()
    
    if (certError && certError.code !== 'PGRST116') {
      console.error('Error fetching certification:', certError)
      return NextResponse.json(
        { error: 'Failed to fetch certification' },
        { status: 500 }
      )
    }
    
    // Get user's completion data
    const { data: userData, error: userError } = await supabaseAdmin
      .from('users')
      .select('total_xp, longest_streak, subscription_status, certification_first_name, certification_last_name')
      .eq('id', userId)
      .single()
    
    if (userError) {
      console.error('Error fetching user data:', userError)
      return NextResponse.json(
        { error: 'Failed to fetch user data' },
        { status: 500 }
      )
    }
    
    // Get completed lessons count (mock data for demo)
    const completedLessons = 120
    
    return NextResponse.json({
      data: {
        has_certification: !!certData,
        certification: certData ? {
          certificate_id: certData.certificate_id,
          first_name: certData.first_name,
          last_name: certData.last_name,
          issued_at: certData.issued_at,
          completion_date: certData.completion_date,
          total_xp: certData.total_xp_at_completion,
          longest_streak: certData.longest_streak_at_completion,
          lessons_completed: certData.lessons_completed_at_completion
        } : null,
        user_progress: {
          total_xp: userData.total_xp,
          longest_streak: userData.longest_streak,
          completed_lessons: completedLessons,
          subscription_status: userData.subscription_status,
          certification_name: {
            first_name: userData.certification_first_name,
            last_name: userData.certification_last_name
          }
        },
        requirements: {
          lessons_required: 120,
          lessons_completed: completedLessons,
          premium_required: true,
          is_premium: userData.subscription_status === 'premium' || userData.subscription_status === 'lifetime'
        }
      }
    })
    
  } catch (error) {
    console.error('Error fetching certification status:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
} 
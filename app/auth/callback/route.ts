import { supabase } from '../../../lib/supabase'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get('code')
  const error = requestUrl.searchParams.get('error')
  const state = requestUrl.searchParams.get('state')

  console.log('=== AUTH CALLBACK STARTED ===')
  console.log('URL:', requestUrl.toString())
  console.log('Code present:', !!code)
  console.log('Error present:', !!error)
  console.log('State present:', !!state)

  if (error) {
    console.error('OAuth error:', error)
    return NextResponse.redirect(new URL('/auth/signin?error=oauth_failed', requestUrl.origin))
  }

  if (code) {
    try {
      console.log('Exchanging code for session...')
      const { data, error: authError } = await supabase.auth.exchangeCodeForSession(code)
      
      if (authError) {
        console.error('Auth callback error:', authError)
        return NextResponse.redirect(new URL('/auth/signin?error=auth_failed', requestUrl.origin))
      }

      if (data.session) {
        console.log('Authentication successful, user:', data.session.user.email)
        
        // Check if user profile exists
        const { data: existingUser, error: fetchError } = await supabase
          .from('users')
          .select('*')
          .eq('id', data.session.user.id)
          .single()

        if (fetchError && fetchError.code === 'PGRST116') {
          // User doesn't exist, create profile
          console.log('Creating new user profile...')
          const { data: newUser, error: createError } = await supabase
            .from('users')
            .insert({
              id: data.session.user.id,
              email: data.session.user.email!,
              name: data.session.user.user_metadata?.full_name || data.session.user.email?.split('@')[0] || 'User',
              avatar_url: null,
              google_id: null,
              subscription_status: 'free',
              subscription_end_date: null,
              stripe_customer_id: null,
              expires_at: null,
              is_expired: false,
              re_registration_count: 0,
              primary_goal: 'professional_communication',
              experience_level: 'beginner',
              daily_time_commitment: '15_minutes',
              preferred_study_time: null,
              timezone: 'Asia/Manila',
              certification_first_name: null,
              certification_last_name: null,
              certification_name_updated_at: null,
              total_xp: 0,
              current_level: 1,
              current_streak: 0,
              longest_streak: 0,
              last_lesson_date: null,
              email_notifications: true,
              push_notifications: true,
              sound_effects: true,
              completed_lessons: []
            })
            .select('*')
            .single()

          if (createError) {
            console.error('Error creating user profile:', createError)
            return NextResponse.redirect(new URL('/auth/signin?error=profile_creation_failed', requestUrl.origin))
          }

          console.log('User profile created successfully')
        } else if (fetchError) {
          console.error('Error checking user profile:', fetchError)
          return NextResponse.redirect(new URL('/auth/signin?error=profile_check_failed', requestUrl.origin))
        } else {
          console.log('User profile already exists')
        }
        
        return NextResponse.redirect(new URL('/dashboard', requestUrl.origin))
      } else {
        console.log('No session after code exchange')
        return NextResponse.redirect(new URL('/auth/signin?error=no_session', requestUrl.origin))
      }
    } catch (error) {
      console.error('Unexpected error during auth callback:', error)
      return NextResponse.redirect(new URL('/auth/signin?error=unexpected', requestUrl.origin))
    }
  }

  console.log('No code or error in callback')
  return NextResponse.redirect(new URL('/auth/signin', requestUrl.origin))
} 
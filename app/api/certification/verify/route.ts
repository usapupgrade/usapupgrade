import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

// Check if Supabase environment variables are available
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY

let supabase: any = null

if (supabaseUrl && supabaseKey) {
  supabase = createClient(supabaseUrl, supabaseKey)
}

export async function POST(request: NextRequest) {
  try {
    const { certificateId, studentName } = await request.json()
    
    // Validate input
    if (!certificateId || !studentName) {
      return NextResponse.json(
        { error: 'Certificate ID and student name are required' },
        { status: 400 }
      )
    }
    
    // Check if certificate ID follows the expected format
    const idPattern = /^UC-\d{4}-\d{2}-\d{2}-\d{2}-\d{2}-\d{2}-\d{3}$/
    if (!idPattern.test(certificateId)) {
      return NextResponse.json(
        { 
          error: 'Invalid certificate ID format',
          valid: false,
          message: 'Certificate ID does not match expected format'
        },
        { status: 400 }
      )
    }
    
    // Check if student name is valid
    if (studentName.length < 3 || studentName.length > 100) {
      return NextResponse.json(
        { 
          error: 'Invalid student name',
          valid: false,
          message: 'Student name must be between 3 and 100 characters'
        },
        { status: 400 }
      )
    }

    // If Supabase is not configured, use mock data for testing
    if (!supabase) {
      // Mock certificate data for testing
      const mockCertificates = [
        {
          certificate_id: 'UC-2024-12-15-14-30-45-123',
          first_name: 'John',
          last_name: 'Michael Smith',
          issued_at: '2024-12-15T14:30:45.000Z',
          completion_date: '2024-12-15T14:30:45.000Z',
          lessons_completed_at_completion: 120,
          total_xp_at_completion: 15420,
          longest_streak_at_completion: 45,
          certificate_hash: 'a1b2c3d4e5f6789012345678901234567890abcd'
        },
        {
          certificate_id: 'UC-2024-12-14-10-15-30-456',
          first_name: 'Maria',
          last_name: 'Santos Garcia',
          issued_at: '2024-12-14T10:15:30.000Z',
          completion_date: '2024-12-14T10:15:30.000Z',
          lessons_completed_at_completion: 120,
          total_xp_at_completion: 14850,
          longest_streak_at_completion: 52,
          certificate_hash: 'b2c3d4e5f6789012345678901234567890abcde1'
        },
        {
          certificate_id: 'UC-2024-12-13-16-45-20-789',
          first_name: 'Carlos',
          last_name: 'Rodriguez Lopez',
          issued_at: '2024-12-13T16:45:20.000Z',
          completion_date: '2024-12-13T16:45:20.000Z',
          lessons_completed_at_completion: 120,
          total_xp_at_completion: 16200,
          longest_streak_at_completion: 38,
          certificate_hash: 'c3d4e5f6789012345678901234567890abcde12'
        }
      ]

      // Find matching certificate
      const certificate = mockCertificates.find(cert => 
        cert.certificate_id === certificateId &&
        `${cert.first_name} ${cert.last_name}`.toLowerCase() === studentName.toLowerCase()
      )

      if (certificate) {
        return NextResponse.json({
          valid: true,
          message: 'Certificate verified successfully',
          certificate: {
            certificateId: certificate.certificate_id,
            studentName: `${certificate.first_name} ${certificate.last_name}`,
            issuedAt: certificate.issued_at,
            completionDate: certificate.completion_date,
            lessonsCompleted: certificate.lessons_completed_at_completion,
            totalXP: certificate.total_xp_at_completion,
            longestStreak: certificate.longest_streak_at_completion,
            certificateHash: certificate.certificate_hash
          }
        })
      } else {
        return NextResponse.json({
          valid: false,
          message: 'Certificate not found or student name does not match',
          certificateId,
          studentName
        })
      }
    }
    
    // Query the database for the certificate
    const { data: certificate, error } = await supabase
      .from('certifications')
      .select('*')
      .eq('certificate_id', certificateId)
      .single()
    
    if (error) {
      if (error.code === 'PGRST116') {
        // Certificate not found
        return NextResponse.json({
          valid: false,
          message: 'Certificate not found in our database',
          certificateId,
          studentName
        })
      }
      
      console.error('Error querying certificate:', error)
      return NextResponse.json(
        { error: 'Failed to verify certificate' },
        { status: 500 }
      )
    }
    
    // Verify the certificate details
    const isValid = certificate && 
                   certificate.first_name && 
                   certificate.last_name &&
                   `${certificate.first_name} ${certificate.last_name}`.toLowerCase() === studentName.toLowerCase()
    
    if (isValid) {
      return NextResponse.json({
        valid: true,
        message: 'Certificate verified successfully',
        certificate: {
          certificateId: certificate.certificate_id,
          studentName: `${certificate.first_name} ${certificate.last_name}`,
          issuedAt: certificate.issued_at,
          completionDate: certificate.completion_date,
          lessonsCompleted: certificate.lessons_completed_at_completion,
          totalXP: certificate.total_xp_at_completion,
          longestStreak: certificate.longest_streak_at_completion,
          certificateHash: certificate.certificate_hash
        }
      })
    } else {
      return NextResponse.json({
        valid: false,
        message: 'Certificate details do not match our records',
        certificateId,
        studentName
      })
    }
    
  } catch (error) {
    console.error('Error verifying certificate:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const certificateId = searchParams.get('id')
    const studentName = searchParams.get('name')
    
    if (!certificateId || !studentName) {
      return NextResponse.json(
        { error: 'Certificate ID and student name are required as query parameters' },
        { status: 400 }
      )
    }

    // If Supabase is not configured, use mock data for testing
    if (!supabase) {
      // Mock certificate data for testing
      const mockCertificates = [
        {
          certificate_id: 'UC-2024-12-15-14-30-45-123',
          first_name: 'John',
          last_name: 'Michael Smith',
          issued_at: '2024-12-15T14:30:45.000Z',
          completion_date: '2024-12-15T14:30:45.000Z',
          lessons_completed_at_completion: 120,
          total_xp_at_completion: 15420,
          longest_streak_at_completion: 45,
          certificate_hash: 'a1b2c3d4e5f6789012345678901234567890abcd'
        },
        {
          certificate_id: 'UC-2024-12-14-10-15-30-456',
          first_name: 'Maria',
          last_name: 'Santos Garcia',
          issued_at: '2024-12-14T10:15:30.000Z',
          completion_date: '2024-12-14T10:15:30.000Z',
          lessons_completed_at_completion: 120,
          total_xp_at_completion: 14850,
          longest_streak_at_completion: 52,
          certificate_hash: 'b2c3d4e5f6789012345678901234567890abcde1'
        },
        {
          certificate_id: 'UC-2024-12-13-16-45-20-789',
          first_name: 'Carlos',
          last_name: 'Rodriguez Lopez',
          issued_at: '2024-12-13T16:45:20.000Z',
          completion_date: '2024-12-13T16:45:20.000Z',
          lessons_completed_at_completion: 120,
          total_xp_at_completion: 16200,
          longest_streak_at_completion: 38,
          certificate_hash: 'c3d4e5f6789012345678901234567890abcde12'
        }
      ]

      // Find matching certificate
      const certificate = mockCertificates.find(cert => 
        cert.certificate_id === certificateId &&
        `${cert.first_name} ${cert.last_name}`.toLowerCase() === studentName.toLowerCase()
      )

      if (certificate) {
        return NextResponse.json({
          valid: true,
          message: 'Certificate verified successfully',
          certificate: {
            certificateId: certificate.certificate_id,
            studentName: `${certificate.first_name} ${certificate.last_name}`,
            issuedAt: certificate.issued_at,
            completionDate: certificate.completion_date,
            lessonsCompleted: certificate.lessons_completed_at_completion,
            totalXP: certificate.total_xp_at_completion,
            longestStreak: certificate.longest_streak_at_completion,
            certificateHash: certificate.certificate_hash
          }
        })
      } else {
        return NextResponse.json({
          valid: false,
          message: 'Certificate not found or student name does not match',
          certificateId,
          studentName
        })
      }
    }
    
    // Query the database for the certificate
    const { data: certificate, error } = await supabase
      .from('certifications')
      .select('*')
      .eq('certificate_id', certificateId)
      .single()
    
    if (error) {
      if (error.code === 'PGRST116') {
        return NextResponse.json({
          valid: false,
          message: 'Certificate not found in our database',
          certificateId,
          studentName
        })
      }
      
      console.error('Error querying certificate:', error)
      return NextResponse.json(
        { error: 'Failed to verify certificate' },
        { status: 500 }
      )
    }
    
    // Verify the certificate details
    const isValid = certificate && 
                   certificate.first_name && 
                   certificate.last_name &&
                   `${certificate.first_name} ${certificate.last_name}`.toLowerCase() === studentName.toLowerCase()
    
    if (isValid) {
      return NextResponse.json({
        valid: true,
        message: 'Certificate verified successfully',
        certificate: {
          certificateId: certificate.certificate_id,
          studentName: `${certificate.first_name} ${certificate.last_name}`,
          issuedAt: certificate.issued_at,
          completionDate: certificate.completion_date,
          lessonsCompleted: certificate.lessons_completed_at_completion,
          totalXP: certificate.total_xp_at_completion,
          longestStreak: certificate.longest_streak_at_completion,
          certificateHash: certificate.certificate_hash
        }
      })
    } else {
      return NextResponse.json({
        valid: false,
        message: 'Certificate details do not match our records',
        certificateId,
        studentName
      })
    }
    
  } catch (error) {
    console.error('Error verifying certificate:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
} 
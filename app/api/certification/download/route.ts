import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { userId, completedLessons, totalXP, studentName } = body

    // Validate the request
    if (!userId || !completedLessons || completedLessons.length < 120) {
      return NextResponse.json(
        { error: 'User must complete all 120 lessons to download certification' },
        { status: 400 }
      )
    }

    if (!studentName || studentName.trim().length < 2) {
      return NextResponse.json(
        { error: 'Valid student name is required for certification' },
        { status: 400 }
      )
    }

    // Generate certificate data
    const certificateData = {
      studentName: studentName.trim(),
      completionDate: new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      }),
      lessonsCompleted: completedLessons.length,
      totalXP: totalXP || 0,
      certificateId: `UP-${Date.now()}-${userId}`,
      courseName: 'Professional Communication Skills Course',
      instructorName: 'UsapUpgrade Team'
    }

    // In a real application, this would generate an actual PDF certificate
    // For demo purposes, we'll create a simple text-based certificate
    // The actual PDF generation will be handled on the client side
    const certificateContent = JSON.stringify(certificateData, null, 2)

    // Return the certificate data for client-side PDF generation
    return NextResponse.json({
      success: true,
      certificateData,
      message: 'Certificate data generated successfully'
    })

  } catch (error) {
    console.error('Error generating certificate:', error)
    return NextResponse.json(
      { error: 'Failed to generate certificate' },
      { status: 500 }
    )
  }
} 
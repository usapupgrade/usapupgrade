import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '../../../../lib/supabase'
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib'

export async function POST(request: NextRequest) {
  try {
    const { userId, certificateName } = await request.json()

    if (!userId || !certificateName) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Get user data from Supabase
    const { data: user, error: userError } = await supabase
      .from('users')
      .select('*')
      .eq('id', userId)
      .single()

    if (userError || !user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      )
    }

    // Create PDF document
    const pdfDoc = await PDFDocument.create()
    const page = pdfDoc.addPage([842, 595]) // A4 landscape
    const { width, height } = page.getSize()

    // Add fonts
    const font = await pdfDoc.embedFont(StandardFonts.Helvetica)
    const boldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold)

    // Background gradient effect
    const gradient = page.drawRectangle({
      x: 0,
      y: 0,
      width,
      height,
      color: rgb(0.95, 0.97, 1.0), // Light blue background
    })

    // Certificate border
    page.drawRectangle({
      x: 40,
      y: 40,
      width: width - 80,
      height: height - 80,
      borderWidth: 3,
      borderColor: rgb(0.2, 0.4, 0.8),
      color: rgb(1, 1, 1),
    })

    // Certificate title
    page.drawText('Certificate of Completion', {
      x: width / 2 - 150,
      y: height - 120,
      size: 32,
      font: boldFont,
      color: rgb(0.2, 0.4, 0.8),
    })

    // This is to certify that
    page.drawText('This is to certify that', {
      x: width / 2 - 80,
      y: height - 200,
      size: 16,
      font: font,
      color: rgb(0.3, 0.3, 0.3),
    })

    // Student name
    page.drawText(certificateName, {
      x: width / 2 - 100,
      y: height - 250,
      size: 24,
      font: boldFont,
      color: rgb(0.2, 0.2, 0.2),
    })

    // Has successfully completed
    page.drawText('has successfully completed', {
      x: width / 2 - 90,
      y: height - 300,
      size: 16,
      font: font,
      color: rgb(0.3, 0.3, 0.3),
    })

    // Course title
    page.drawText('Professional Communication Skills Course', {
      x: width / 2 - 140,
      y: height - 350,
      size: 20,
      font: boldFont,
      color: rgb(0.2, 0.4, 0.8),
    })

    // Course description
    page.drawText('A comprehensive program designed to enhance professional', {
      x: width / 2 - 120,
      y: height - 380,
      size: 12,
      font: font,
      color: rgb(0.4, 0.4, 0.4),
    })

    page.drawText('conversation skills for Filipino professionals', {
      x: width / 2 - 110,
      y: height - 395,
      size: 12,
      font: font,
      color: rgb(0.4, 0.4, 0.4),
    })

    // Date
    const currentDate = new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })

    page.drawText(`Issued on: ${currentDate}`, {
      x: width / 2 - 60,
      y: 120,
      size: 14,
      font: font,
      color: rgb(0.4, 0.4, 0.4),
    })

    // Course details
    page.drawText('Course Details:', {
      x: 80,
      y: 80,
      size: 14,
      font: boldFont,
      color: rgb(0.2, 0.4, 0.8),
    })

    page.drawText(`• Total Lessons Completed: ${user.completed_lessons?.length || 0}`, {
      x: 80,
      y: 60,
      size: 10,
      font: font,
      color: rgb(0.3, 0.3, 0.3),
    })

    page.drawText(`• Total XP Earned: ${user.total_xp || 0}`, {
      x: 80,
      y: 45,
      size: 10,
      font: font,
      color: rgb(0.3, 0.3, 0.3),
    })

    // UsapUpgrade branding
    page.drawText('UsapUpgrade', {
      x: width - 150,
      y: 80,
      size: 16,
      font: boldFont,
      color: rgb(0.2, 0.4, 0.8),
    })

    page.drawText('Professional Communication Training', {
      x: width - 180,
      y: 60,
      size: 10,
      font: font,
      color: rgb(0.4, 0.4, 0.4),
    })

    // Generate PDF bytes
    const pdfBytes = await pdfDoc.save()

    // Return PDF as response
    return new NextResponse(pdfBytes, {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="usapupgrade-certificate-${userId}.pdf"`,
      },
    })

  } catch (error) {
    console.error('Certificate generation error:', error)
    return NextResponse.json(
      { error: 'Failed to generate certificate' },
      { status: 500 }
    )
  }
} 
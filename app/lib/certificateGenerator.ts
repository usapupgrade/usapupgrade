import jsPDF from 'jspdf'
import html2canvas from 'html2canvas'

interface CertificateData {
  studentName: string
  completionDate: string
  lessonsCompleted: number
  totalXP: number
  certificateId: string
  courseName?: string
  instructorName?: string
}

// Industry standard approach: Create a dedicated certificate component for PDF generation
export async function generateCertificatePDF(certificateData: CertificateData): Promise<Blob> {
  // Create a dedicated container with proper styling
  const container = document.createElement('div')
  container.style.position = 'fixed'
  container.style.top = '0px'
  container.style.left = '0px'
  container.style.width = '1056px'
  container.style.height = '816px'
  container.style.transform = 'scale(1)'
  container.style.transformOrigin = 'top left'
  container.style.backgroundColor = '#0073cf'
  container.style.overflow = 'hidden'
  container.style.fontFamily = 'Inter, -apple-system, BlinkMacSystemFont, sans-serif'
  container.style.zIndex = '9999'
  container.style.border = 'none'
  container.style.margin = '0'
  container.style.padding = '0'
  container.style.boxSizing = 'border-box'
  container.style.display = 'flex'
  container.style.alignItems = 'center'
  container.style.justifyContent = 'center'
  
  // Create a simplified certificate template specifically for PDF
  const certificateHTML = `
    <div style="
      width: 1040px;
      height: 800px;
      background: #ffffff;
      border: 8px solid #0073cf;
      position: relative;
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
      overflow: hidden;
      display: flex;
      flex-direction: column;
      background: linear-gradient(180deg, #ffffff 0%, #f8fafc 100%);
      box-sizing: border-box;
      margin: 8px;
      padding: 0;
      outline: none;
    ">
      <!-- Top Border Accent -->
      <div style="
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        height: 4px;
        background: linear-gradient(90deg, #0073cf 0%, #00a3e0 50%, #0073cf 100%);
        z-index: 3;
        margin: 0;
        padding: 0;
      "></div>

      <!-- Header Section -->
      <div style="
        position: relative;
        z-index: 3;
        padding: 30px 50px 20px 50px;
        display: flex;
        align-items: center;
        justify-content: space-between;
      ">
        <!-- Logo -->
        <div style="display: flex; align-items: center; gap: 15px;">
          <div style="display: flex; align-items: center; gap: 2px;">
            <span style="font-size: 28px; font-weight: bold; color: #f2750a; line-height: 1;">Usap</span>
            <span style="font-size: 28px; font-weight: bold; color: #00a3e0; line-height: 1;">Upgrade</span>
          </div>
          <div style="font-size: 12px; color: #6b7280; font-weight: 500;">Learning Platform</div>
        </div>

        <!-- Certificate ID -->
        <div style="text-align: right;">
          <div style="font-size: 10px; color: #9ca3af; margin-bottom: 4px;">Certificate ID</div>
          <div style="font-size: 12px; font-weight: 600; color: #374151; font-family: monospace;">${certificateData.certificateId}</div>
        </div>
      </div>

      <!-- Main Content -->
      <div style="
        position: relative;
        z-index: 3;
        flex: 1;
        padding: 0 50px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        min-height: 600px;
      ">
        <!-- Top Section - Course Title -->
        <div style="margin-top: 30px; text-align: center;">
          <h1 style="
            font-size: 36px;
            font-weight: bold;
            color: #111827;
            margin: 0 0 8px 0;
            line-height: 1.2;
          ">${certificateData.courseName || 'Professional Communication Skills Course'}</h1>
          <p style="
            font-size: 16px;
            color: #6b7280;
            margin: 0 0 15px 0;
            font-weight: 500;
          ">Specialized for Filipino Professionals</p>
        </div>

        <!-- Middle Section - Student Info and Quote -->
        <div style="
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          gap: 40px;
        ">
          <!-- Student Information -->
          <div style="text-align: center;">
            <p style="
              font-size: 18px;
              color: #374151;
              margin: 0 0 20px 0;
              line-height: 1.5;
            ">Course completed by</p>
            <h2 style="
              font-size: 32px;
              font-weight: bold;
              color: #0073cf;
              margin: 0 0 20px 0;
              line-height: 1.2;
            ">${certificateData.studentName}</h2>
            <p style="
              font-size: 16px;
              color: #6b7280;
              margin: 0;
              line-height: 1.5;
            ">${certificateData.completionDate} • ${certificateData.lessonsCompleted} lessons completed</p>
          </div>

          <!-- Encouraging Message -->
          <div style="
            text-align: center;
            padding: 30px;
            background-color: rgba(0, 115, 207, 0.06);
            border-radius: 16px;
            border: 1px solid rgba(0, 115, 207, 0.12);
            box-shadow: 0 4px 12px rgba(0, 115, 207, 0.08);
            position: relative;
            max-width: 700px;
            margin-left: auto;
            margin-right: auto;
          ">
            <!-- Decorative corner elements -->
            <div style="
              position: absolute;
              top: 15px;
              left: 15px;
              width: 20px;
              height: 20px;
              border: 2px solid rgba(0, 115, 207, 0.2);
              border-right: 2px solid transparent;
              border-bottom: 2px solid transparent;
              border-radius: 4px 0 0 0;
            "></div>
            <div style="
              position: absolute;
              top: 15px;
              right: 15px;
              width: 20px;
              height: 20px;
              border: 2px solid rgba(0, 115, 207, 0.2);
              border-left: 2px solid transparent;
              border-bottom: 2px solid transparent;
              border-radius: 0 4px 0 0;
            "></div>
            <div style="
              position: absolute;
              bottom: 15px;
              left: 15px;
              width: 20px;
              height: 20px;
              border: 2px solid rgba(0, 115, 207, 0.2);
              border-right: 2px solid transparent;
              border-top: 2px solid transparent;
              border-radius: 0 0 0 4px;
            "></div>
            <div style="
              position: absolute;
              bottom: 15px;
              right: 15px;
              width: 20px;
              height: 20px;
              border: 2px solid rgba(0, 115, 207, 0.2);
              border-left: 2px solid transparent;
              border-top: 2px solid transparent;
              border-radius: 0 0 4px 0;
            "></div>
            
            <p style="
              font-size: 20px;
              color: #374151;
              margin: 0;
              line-height: 1.6;
              font-style: italic;
              font-weight: 500;
              max-width: 650px;
              margin-left: auto;
              margin-right: auto;
            ">"Your commitment to mastering Filipino workplace communication shows exceptional dedication to professional excellence."</p>
          </div>
        </div>

        <!-- Bottom Section - Skills and Stats -->
        <div style="margin-bottom: 30px;">
          <!-- Skills Section -->
          <div style="text-align: center; margin-bottom: 30px;">
            <h3 style="
              font-size: 16px;
              font-weight: 600;
              color: #374151;
              margin: 0 0 20px 0;
              text-transform: uppercase;
              letter-spacing: 0.5px;
            ">Skills covered</h3>
            <div style="
              display: flex;
              justify-content: center;
              gap: 16px;
              flex-wrap: wrap;
            ">
              <div style="
                padding: 10px 20px;
                background-color: #f8fafc;
                border-radius: 20px;
                font-size: 15px;
                font-weight: 500;
                color: #374151;
                border: 1px solid #e2e8f0;
                box-shadow: 0 2px 4px rgba(0, 0, 0, 0.06);
                display: flex;
                align-items: center;
                gap: 6px;
              ">💼 Workplace Communication</div>
              <div style="
                padding: 10px 20px;
                background-color: #f8fafc;
                border-radius: 20px;
                font-size: 15px;
                font-weight: 500;
                color: #374151;
                border: 1px solid #e2e8f0;
                box-shadow: 0 2px 4px rgba(0, 0, 0, 0.06);
                display: flex;
                align-items: center;
                gap: 6px;
              ">🌏 Cultural Navigation</div>
              <div style="
                padding: 10px 20px;
                background-color: #f8fafc;
                border-radius: 20px;
                font-size: 15px;
                font-weight: 500;
                color: #374151;
                border: 1px solid #e2e8f0;
                box-shadow: 0 2px 4px rgba(0, 0, 0, 0.06);
                display: flex;
                align-items: center;
                gap: 6px;
              ">⭐ Professional Confidence</div>
            </div>
          </div>

          <!-- Achievement Stats -->
          <div style="display: flex; justify-content: center; gap: 40px;">
            <div style="text-align: center;">
              <div style="
                font-size: 24px;
                font-weight: bold;
                color: #0073cf;
                margin-bottom: 4px;
              ">${certificateData.lessonsCompleted}</div>
              <div style="
                font-size: 12px;
                color: #6b7280;
                text-transform: uppercase;
                letter-spacing: 0.5px;
              ">Lessons</div>
            </div>
            <div style="width: 1px; background-color: #e5e7eb; height: 40px;"></div>
            <div style="text-align: center;">
              <div style="
                font-size: 24px;
                font-weight: bold;
                color: #0073cf;
                margin-bottom: 4px;
              ">100%</div>
              <div style="
                font-size: 12px;
                color: #6b7280;
                text-transform: uppercase;
                letter-spacing: 0.5px;
              ">Complete</div>
            </div>
          </div>
        </div>
      </div>

      <!-- Enhanced Bottom Badge -->
      <div style="
        position: absolute;
        bottom: 35px;
        right: 35px;
        z-index: 3;
      ">
        <div style="
          width: 90px;
          height: 90px;
          border-radius: 50%;
          background: linear-gradient(135deg, #0073cf 0%, #00a3e0 100%);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          font-size: 8px;
          font-weight: bold;
          color: #ffffff;
          text-align: center;
          line-height: 1.2;
          box-shadow: 0 8px 24px rgba(0, 115, 207, 0.25);
          border: 3px solid #ffffff;
          position: relative;
        ">
          <!-- Inner circle -->
          <div style="
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 70px;
            height: 70px;
            border-radius: 50%;
            border: 2px solid rgba(255, 255, 255, 0.3);
            display: flex;
            align-items: center;
            justify-content: center;
          ">
            <div style="
              width: 50px;
              height: 50px;
              border-radius: 50%;
              background-color: rgba(255, 255, 255, 0.1);
              display: flex;
              align-items: center;
              justify-content: center;
            "></div>
          </div>
          
          <!-- Text overlay -->
          <div style="
            position: relative;
            z-index: 2;
            text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
          ">
            <div>COURSE</div>
            <div>COMPLETION</div>
          </div>
        </div>
      </div>

      <!-- Trophy Achievement Badge -->
      <div style="
        position: absolute;
        bottom: 35px;
        left: 35px;
        z-index: 3;
      ">
        <div style="
          width: 90px;
          height: 90px;
          border-radius: 50%;
          background: linear-gradient(135deg, #FFD700 0%, #FFA500 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 8px 24px rgba(255, 215, 0, 0.4);
          border: 3px solid #FFFFFF;
          position: relative;
        ">
          <div style="
            font-size: 40px;
            filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3));
            text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
          ">🏆</div>
        </div>
      </div>
    </div>
  `
  
  container.innerHTML = certificateHTML
  document.body.appendChild(container)
  
  try {
    // Wait for fonts to load
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    // Convert to canvas with optimal settings
    const canvas = await html2canvas(container, {
      scale: 2,
      useCORS: true,
      allowTaint: true,
      backgroundColor: '#0073cf',
      width: 1056,
      height: 816,
      logging: false,
      imageTimeout: 0,
      removeContainer: false,
      foreignObjectRendering: true,
      scrollX: 0,
      scrollY: 0,
      x: 0,
      y: 0,
      onclone: (clonedDoc) => {
        // Ensure the cloned element is properly positioned with no margins
        const clonedContainer = clonedDoc.querySelector('div')
        if (clonedContainer) {
          clonedContainer.style.position = 'absolute'
          clonedContainer.style.top = '0'
          clonedContainer.style.left = '0'
          clonedContainer.style.margin = '0'
          clonedContainer.style.padding = '0'
          clonedContainer.style.border = 'none'
          clonedContainer.style.outline = 'none'
          clonedContainer.style.boxSizing = 'border-box'
          clonedContainer.style.transform = 'none'
        }
      }
    })
    
    // Create PDF
    const pdf = new jsPDF({
      orientation: 'landscape',
      unit: 'in',
      format: [11, 8.5]
    })
    
    const imgData = canvas.toDataURL('image/png', 1.0)
    const pdfWidth = pdf.internal.pageSize.getWidth()
    const pdfHeight = pdf.internal.pageSize.getHeight()
    
    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight, '', 'FAST')
    
    // Add metadata
    pdf.setProperties({
      title: `Certificate of Completion - ${certificateData.studentName}`,
      subject: 'Professional Communication Skills Certificate',
      author: 'UsapUpgrade',
      creator: 'UsapUpgrade Certificate Generator',
      keywords: 'certificate, communication, professional, workplace, Filipino'
    })
    
    return pdf.output('blob')
    
  } finally {
    if (container.parentNode) {
      document.body.removeChild(container)
    }
  }
}

// Function to verify certificate authenticity
export function verifyCertificate(certificateId: string, studentName: string): boolean {
  // Basic verification - in a real app, this would check against a database
  if (!certificateId || !studentName) return false
  
  // Check if certificate ID follows the expected format
  const idPattern = /^UC-\d{4}-\d{2}-\d{2}-\d{2}-\d{2}-\d{2}-\d{3}$/
  if (!idPattern.test(certificateId)) return false
  
  // Check if student name is valid
  if (studentName.length < 3 || studentName.length > 100) return false
  
  return true
}

// Function to generate certificate hash for verification
export function generateCertificateHash(data: CertificateData): string {
  const hashData = `${data.studentName}-${data.certificateId}-${data.completionDate}-${data.lessonsCompleted}`
  // Simple hash function - in production, use a proper cryptographic hash
  let hash = 0
  for (let i = 0; i < hashData.length; i++) {
    const char = hashData.charCodeAt(i)
    hash = ((hash << 5) - hash) + char
    hash = hash & hash // Convert to 32-bit integer
  }
  return Math.abs(hash).toString(16).toUpperCase()
}

// Simple jsPDF method without roundedRect
export async function generateCertificatePDFSimple(certificateData: CertificateData): Promise<Blob> {
  // Create a simple certificate using jsPDF directly
  const pdf = new jsPDF({
    orientation: 'landscape',
    unit: 'in',
    format: [11, 8.5]
  })

  // Set font
  pdf.setFont('helvetica')
  
  // Add border
  pdf.setDrawColor(0, 115, 207)
  pdf.setLineWidth(0.1)
  pdf.rect(0.5, 0.5, 10, 7.5)
  
  // Add top accent line
  pdf.setFillColor(0, 115, 207)
  pdf.rect(0.5, 0.5, 10, 0.1)
  
  // Header section
  pdf.setFontSize(22)
  pdf.setTextColor(242, 117, 10)
  pdf.text('Usap', 1, 1.2)
  pdf.setTextColor(0, 163, 224)
  pdf.text('Upgrade', 2.5, 1.2)
  
  pdf.setFontSize(9)
  pdf.setTextColor(107, 114, 128)
  pdf.text('Learning Platform', 1, 1.5)
  
  // Certificate ID
  pdf.setFontSize(8)
  pdf.setTextColor(156, 163, 175)
  pdf.text('Certificate ID', 8, 1.2)
  pdf.setFontSize(10)
  pdf.setTextColor(55, 65, 81)
  pdf.text(certificateData.certificateId, 8, 1.4)
  
  // Main title
  pdf.setFontSize(26)
  pdf.setTextColor(17, 24, 39)
  pdf.text(certificateData.courseName || 'Professional Communication Skills Course', 5.5, 3, { align: 'center' })
  
  pdf.setFontSize(11)
  pdf.setTextColor(107, 114, 128)
  pdf.text('Specialized for Filipino Professionals', 5.5, 3.3, { align: 'center' })
  
  // Student information
  pdf.setFontSize(13)
  pdf.setTextColor(55, 65, 81)
  pdf.text('Course completed by', 5.5, 4.5, { align: 'center' })
  
  pdf.setFontSize(22)
  pdf.setTextColor(0, 115, 207)
  pdf.text(certificateData.studentName, 5.5, 5.2, { align: 'center' })
  
  pdf.setFontSize(11)
  pdf.setTextColor(107, 114, 128)
  pdf.text(`${certificateData.completionDate} • ${certificateData.lessonsCompleted} lessons completed`, 5.5, 5.8, { align: 'center' })
  
  // Encouraging message box
  pdf.setFillColor(240, 248, 255)
  pdf.rect(1.5, 6.2, 8, 1)
  pdf.setDrawColor(0, 115, 207)
  pdf.setLineWidth(0.03)
  pdf.rect(1.5, 6.2, 8, 1)
  
  pdf.setFontSize(13)
  pdf.setTextColor(55, 65, 81)
  pdf.text('"Your commitment to mastering Filipino workplace communication shows exceptional dedication to professional excellence."', 5.5, 6.8, { align: 'center' })
  
  // Skills section
  pdf.setFontSize(11)
  pdf.setTextColor(55, 65, 81)
  pdf.text('SKILLS COVERED', 5.5, 7.5, { align: 'center' })
  
  // Skills badges
  const skills = ['Workplace Communication', 'Cultural Navigation', 'Professional Confidence']
  let skillX = 2
  skills.forEach(skill => {
    pdf.setFillColor(248, 250, 252)
    pdf.rect(skillX, 7.8, 2.2, 0.4)
    pdf.setDrawColor(226, 232, 240)
    pdf.setLineWidth(0.02)
    pdf.rect(skillX, 7.8, 2.2, 0.4)
    
    pdf.setFontSize(9)
    pdf.setTextColor(55, 65, 81)
    pdf.text(skill, skillX + 1.1, 8.1, { align: 'center' })
    skillX += 2.5
  })
  
  // Stats section
  pdf.setFontSize(18)
  pdf.setTextColor(0, 115, 207)
  pdf.text(certificateData.lessonsCompleted.toString(), 3, 8.8, { align: 'center' })
  pdf.text('100%', 8, 8.8, { align: 'center' })
  
  pdf.setFontSize(8)
  pdf.setTextColor(107, 114, 128)
  pdf.text('LESSONS', 3, 9.1, { align: 'center' })
  pdf.text('COMPLETE', 8, 9.1, { align: 'center' })
  
  // Add metadata
  pdf.setProperties({
    title: `Certificate of Completion - ${certificateData.studentName}`,
    subject: 'Professional Communication Skills Certificate',
    author: 'UsapUpgrade',
    creator: 'UsapUpgrade Certificate Generator'
  })
  
  return pdf.output('blob')
}

// High quality method with better settings
export async function generateCertificatePDFHighQuality(certificateData: CertificateData): Promise<Blob> {
  // Create a container with better quality settings
  const container = document.createElement('div')
  container.style.position = 'fixed'
  container.style.top = '0px'
  container.style.left = '0px'
  container.style.width = '1584px' // 3x scale for high quality
  container.style.height = '1224px'
  container.style.transform = 'scale(1)'
  container.style.transformOrigin = 'top left'
  container.style.backgroundColor = '#0073cf'
  container.style.overflow = 'hidden'
  container.style.fontFamily = 'Inter, -apple-system, BlinkMacSystemFont, sans-serif'
  container.style.zIndex = '9999'
  container.style.border = 'none'
  container.style.margin = '0'
  container.style.padding = '0'
  container.style.boxSizing = 'border-box'
  container.style.display = 'flex'
  container.style.alignItems = 'center'
  container.style.justifyContent = 'center'
  
  // Create the same certificate HTML but with 3x dimensions
  const certificateHTML = `
    <div style="
      width: 1560px;
      height: 1200px;
      background: #ffffff;
      border: 12px solid #0073cf;
      position: relative;
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
      overflow: hidden;
      display: flex;
      flex-direction: column;
      background: linear-gradient(180deg, #ffffff 0%, #f8fafc 100%);
      box-sizing: border-box;
      margin: 12px;
      padding: 0;
      outline: none;
    ">
      <!-- Top Border Accent -->
      <div style="
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        height: 6px;
        background: linear-gradient(90deg, #0073cf 0%, #00a3e0 50%, #0073cf 100%);
        z-index: 3;
        margin: 0;
        padding: 0;
      "></div>

      <!-- Header Section -->
      <div style="
        position: relative;
        z-index: 3;
        padding: 45px 75px 30px 75px;
        display: flex;
        align-items: center;
        justify-content: space-between;
      ">
        <!-- Logo -->
        <div style="display: flex; align-items: center; gap: 22px;">
          <div style="display: flex; align-items: center; gap: 3px;">
            <span style="font-size: 42px; font-weight: bold; color: #f2750a; line-height: 1;">Usap</span>
            <span style="font-size: 42px; font-weight: bold; color: #00a3e0; line-height: 1;">Upgrade</span>
          </div>
          <div style="font-size: 18px; color: #6b7280; font-weight: 500;">Learning Platform</div>
        </div>

        <!-- Certificate ID -->
        <div style="text-align: right;">
          <div style="font-size: 15px; color: #9ca3af; margin-bottom: 6px;">Certificate ID</div>
          <div style="font-size: 18px; font-weight: 600; color: #374151; font-family: monospace;">${certificateData.certificateId}</div>
        </div>
      </div>

      <!-- Main Content -->
      <div style="
        position: relative;
        z-index: 3;
        flex: 1;
        padding: 0 75px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        min-height: 900px;
      ">
        <!-- Top Section - Course Title -->
        <div style="margin-top: 45px; text-align: center;">
          <h1 style="
            font-size: 54px;
            font-weight: bold;
            color: #111827;
            margin: 0 0 12px 0;
            line-height: 1.2;
          ">${certificateData.courseName || 'Professional Communication Skills Course'}</h1>
          <p style="
            font-size: 24px;
            color: #6b7280;
            margin: 0 0 22px 0;
            font-weight: 500;
          ">Specialized for Filipino Professionals</p>
        </div>

        <!-- Middle Section - Student Info and Quote -->
        <div style="
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          gap: 60px;
        ">
          <!-- Student Information -->
          <div style="text-align: center;">
            <p style="
              font-size: 27px;
              color: #374151;
              margin: 0 0 30px 0;
              line-height: 1.5;
            ">Course completed by</p>
            <h2 style="
              font-size: 48px;
              font-weight: bold;
              color: #0073cf;
              margin: 0 0 30px 0;
              line-height: 1.2;
            ">${certificateData.studentName}</h2>
            <p style="
              font-size: 24px;
              color: #6b7280;
              margin: 0;
              line-height: 1.5;
            ">${certificateData.completionDate} • ${certificateData.lessonsCompleted} lessons completed</p>
          </div>

          <!-- Encouraging Message -->
          <div style="
            text-align: center;
            padding: 45px;
            background-color: rgba(0, 115, 207, 0.06);
            border-radius: 24px;
            border: 1px solid rgba(0, 115, 207, 0.12);
            box-shadow: 0 6px 18px rgba(0, 115, 207, 0.08);
            position: relative;
            max-width: 1050px;
            margin-left: auto;
            margin-right: auto;
          ">
            <p style="
              font-size: 30px;
              color: #374151;
              margin: 0;
              line-height: 1.6;
              font-style: italic;
              font-weight: 500;
              max-width: 975px;
              margin-left: auto;
              margin-right: auto;
            ">"Your commitment to mastering Filipino workplace communication shows exceptional dedication to professional excellence."</p>
          </div>
        </div>

        <!-- Bottom Section - Skills and Stats -->
        <div style="margin-bottom: 45px;">
          <!-- Skills Section -->
          <div style="text-align: center; margin-bottom: 45px;">
            <h3 style="
              font-size: 24px;
              font-weight: 600;
              color: #374151;
              margin: 0 0 30px 0;
              text-transform: uppercase;
              letter-spacing: 0.5px;
            ">Skills covered</h3>
            <div style="
              display: flex;
              justify-content: center;
              gap: 24px;
              flex-wrap: wrap;
            ">
              <div style="
                padding: 15px 30px;
                background-color: #f8fafc;
                border-radius: 30px;
                font-size: 22px;
                font-weight: 500;
                color: #374151;
                border: 1px solid #e2e8f0;
                box-shadow: 0 3px 6px rgba(0, 0, 0, 0.06);
                display: flex;
                align-items: center;
                gap: 9px;
              ">💼 Workplace Communication</div>
              <div style="
                padding: 15px 30px;
                background-color: #f8fafc;
                border-radius: 30px;
                font-size: 22px;
                font-weight: 500;
                color: #374151;
                border: 1px solid #e2e8f0;
                box-shadow: 0 3px 6px rgba(0, 0, 0, 0.06);
                display: flex;
                align-items: center;
                gap: 9px;
              ">🌏 Cultural Navigation</div>
              <div style="
                padding: 15px 30px;
                background-color: #f8fafc;
                border-radius: 30px;
                font-size: 22px;
                font-weight: 500;
                color: #374151;
                border: 1px solid #e2e8f0;
                box-shadow: 0 3px 6px rgba(0, 0, 0, 0.06);
                display: flex;
                align-items: center;
                gap: 9px;
              ">⭐ Professional Confidence</div>
            </div>
          </div>

          <!-- Achievement Stats -->
          <div style="display: flex; justify-content: center; gap: 60px;">
            <div style="text-align: center;">
              <div style="
                font-size: 36px;
                font-weight: bold;
                color: #0073cf;
                margin-bottom: 6px;
              ">${certificateData.lessonsCompleted}</div>
              <div style="
                font-size: 18px;
                color: #6b7280;
                text-transform: uppercase;
                letter-spacing: 0.5px;
              ">Lessons</div>
            </div>
            <div style="width: 1px; background-color: #e5e7eb; height: 60px;"></div>
            <div style="text-align: center;">
              <div style="
                font-size: 36px;
                font-weight: bold;
                color: #0073cf;
                margin-bottom: 6px;
              ">100%</div>
              <div style="
                font-size: 18px;
                color: #6b7280;
                text-transform: uppercase;
                letter-spacing: 0.5px;
              ">Complete</div>
            </div>
          </div>
        </div>
      </div>

      <!-- Enhanced Bottom Badge -->
      <div style="
        position: absolute;
        bottom: 52px;
        right: 52px;
        z-index: 3;
      ">
        <div style="
          width: 135px;
          height: 135px;
          border-radius: 50%;
          background: linear-gradient(135deg, #0073cf 0%, #00a3e0 100%);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          font-size: 12px;
          font-weight: bold;
          color: #ffffff;
          text-align: center;
          line-height: 1.2;
          box-shadow: 0 12px 36px rgba(0, 115, 207, 0.25);
          border: 4px solid #ffffff;
          position: relative;
        ">
          <div style="
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 105px;
            height: 105px;
            border-radius: 50%;
            border: 3px solid rgba(255, 255, 255, 0.3);
            display: flex;
            align-items: center;
            justify-content: center;
          ">
            <div style="
              width: 75px;
              height: 75px;
              border-radius: 50%;
              background-color: rgba(255, 255, 255, 0.1);
              display: flex;
              align-items: center;
              justify-content: center;
            "></div>
          </div>
          <div style="position: relative; z-index: 2; text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);">
            <div>COURSE</div>
            <div>COMPLETION</div>
          </div>
        </div>
      </div>

      <!-- Trophy Achievement Badge -->
      <div style="
        position: absolute;
        bottom: 52px;
        left: 52px;
        z-index: 3;
      ">
        <div style="
          width: 135px;
          height: 135px;
          border-radius: 50%;
          background: linear-gradient(135deg, #FFD700 0%, #FFA500 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 12px 36px rgba(255, 215, 0, 0.4);
          border: 4px solid #FFFFFF;
          position: relative;
        ">
          <div style="
            font-size: 60px;
            filter: drop-shadow(0 3px 6px rgba(0, 0, 0, 0.3));
            text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
          ">🏆</div>
        </div>
      </div>
    </div>
  `
  
  container.innerHTML = certificateHTML
  document.body.appendChild(container)
  
  try {
    // Wait for fonts to load
    await new Promise(resolve => setTimeout(resolve, 3000))
    
    // Convert to canvas with high quality settings
    const canvas = await html2canvas(container, {
      scale: 3,
      useCORS: true,
      allowTaint: true,
      backgroundColor: '#0073cf',
      width: 1584,
      height: 1224,
      logging: false,
      imageTimeout: 0,
      removeContainer: false,
      foreignObjectRendering: true,
      scrollX: 0,
      scrollY: 0,
      onclone: (clonedDoc) => {
        // Ensure the cloned element is properly positioned with no margins
        const clonedContainer = clonedDoc.querySelector('div')
        if (clonedContainer) {
          clonedContainer.style.position = 'absolute'
          clonedContainer.style.top = '0'
          clonedContainer.style.left = '0'
          clonedContainer.style.margin = '0'
          clonedContainer.style.padding = '0'
          clonedContainer.style.border = 'none'
          clonedContainer.style.outline = 'none'
          clonedContainer.style.boxSizing = 'border-box'
          clonedContainer.style.transform = 'none'
        }
      }
    })
    
    // Create PDF
    const pdf = new jsPDF({
      orientation: 'landscape',
      unit: 'in',
      format: [11, 8.5]
    })
    
    const imgData = canvas.toDataURL('image/png', 1.0)
    const pdfWidth = pdf.internal.pageSize.getWidth()
    const pdfHeight = pdf.internal.pageSize.getHeight()
    
    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight, '', 'FAST')
    
    // Add metadata
    pdf.setProperties({
      title: `Certificate of Completion - ${certificateData.studentName}`,
      subject: 'Professional Communication Skills Certificate',
      author: 'UsapUpgrade',
      creator: 'UsapUpgrade Certificate Generator',
      keywords: 'certificate, communication, professional, workplace, Filipino'
    })
    
    return pdf.output('blob')
    
  } finally {
    if (container.parentNode) {
      document.body.removeChild(container)
    }
  }
} 
'use client'

import CertificateTemplate from '../../components/CertificateTemplate'

export default function CertificatePreviewPage() {
  // Generate a realistic certificate ID for preview
  const generatePreviewCertificateId = () => {
    const now = new Date()
    const year = now.getFullYear()
    const month = String(now.getMonth() + 1).padStart(2, '0')
    const day = String(now.getDate()).padStart(2, '0')
    const hour = String(now.getHours()).padStart(2, '0')
    const minute = String(now.getMinutes()).padStart(2, '0')
    const second = String(now.getSeconds()).padStart(2, '0')
    const random = String(Math.floor(Math.random() * 1000)).padStart(3, '0')
    
    return `UC-${year}-${month}-${day}-${hour}-${minute}-${second}-${random}`
  }

  // Sample certificate data for preview
  const sampleCertificateData = {
    studentName: 'Demo User',
    completionDate: 'July 31, 2025',
    lessonsCompleted: 120,
    totalXP: 15420,
    certificateId: generatePreviewCertificateId(),
    courseName: 'Professional Communication Skills Course',
    instructorName: 'UsapUpgrade Team'
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Certificate Preview
          </h1>
          <p className="text-gray-600">
            This is how your certificate will look when you complete all 120 lessons
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex justify-center">
            <div className="scale-50 origin-top transform">
              <CertificateTemplate {...sampleCertificateData} />
            </div>
          </div>
        </div>

        <div className="mt-8 bg-blue-50 rounded-lg p-6">
          <h2 className="text-xl font-semibold text-blue-900 mb-4">
            Certificate Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-blue-800">
            <div>
              <h3 className="font-semibold mb-2">Design Elements</h3>
              <ul className="space-y-1">
                <li>• Horizontal 8.5x11 inch format</li>
                <li>• Filipino-themed design with flag icon</li>
                <li>• Professional typography (Inter font)</li>
                <li>• Clean, modern layout with enhanced decorative elements</li>
                <li>• Skills tags with emojis and completion badge</li>
                <li>• Animated decorative elements</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Certificate Information</h3>
              <ul className="space-y-1">
                <li>• Student's full name</li>
                <li>• Completion date and lessons count</li>
                <li>• Skills covered (Workplace Communication, Cultural Navigation, Professional Confidence)</li>
                <li>• Unique automated certificate ID</li>
                <li>• Filipino workplace specialization</li>
                <li>• UsapUpgrade branding</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Complete all 120 lessons to unlock your personalized Filipino workplace communication certificate!
          </p>
        </div>
      </div>
    </div>
  )
} 
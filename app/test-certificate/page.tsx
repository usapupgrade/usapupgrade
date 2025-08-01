'use client'

import { useState } from 'react'
import { generateCertificatePDF, generateCertificatePDFSimple, generateCertificatePDFHighQuality } from '../lib/certificateGenerator'

export default function TestCertificatePage() {
  const [isGenerating, setIsGenerating] = useState(false)
  const [status, setStatus] = useState('')

  const testCertificateData = {
    studentName: 'Demo User',
    completionDate: 'July 31, 2025',
    lessonsCompleted: 120,
    totalXP: 15420,
    certificateId: 'UC-2025-07-31-12-34-56-789',
    courseName: 'Professional Communication Skills Course',
    instructorName: 'UsapUpgrade Team'
  }

  const handleGeneratePDF = async (method: 'visible' | 'simple' | 'highquality') => {
    setIsGenerating(true)
    setStatus(`Generating PDF using ${method} method...`)
    
    try {
      let blob
      switch (method) {
        case 'visible':
          blob = await generateCertificatePDF(testCertificateData)
          break
        case 'simple':
          blob = await generateCertificatePDFSimple(testCertificateData)
          break
        case 'highquality':
          blob = await generateCertificatePDFHighQuality(testCertificateData)
          break
        default:
          throw new Error('Invalid method')
      }
      
      // Create download link
      const url = URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = `certificate-${method}-${testCertificateData.studentName.replace(/\s+/g, '-')}.pdf`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      URL.revokeObjectURL(url)
      
      setStatus(`PDF generated successfully using ${method} method!`)
    } catch (error) {
      console.error('Error generating PDF:', error)
      setStatus(`Error generating PDF: ${error instanceof Error ? error.message : 'Unknown error'}`)
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Certificate PDF Generation Test
          </h1>
          <p className="text-gray-600">
            Test the new PDF generation methods to see which works best
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Test Data
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <strong>Student Name:</strong> {testCertificateData.studentName}
            </div>
            <div>
              <strong>Certificate ID:</strong> {testCertificateData.certificateId}
            </div>
            <div>
              <strong>Completion Date:</strong> {testCertificateData.completionDate}
            </div>
            <div>
              <strong>Lessons Completed:</strong> {testCertificateData.lessonsCompleted}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Fixed Visible Container Method
            </h3>
            <p className="text-gray-600 mb-4 text-sm">
              Improved container sizing with overflow: visible to prevent cutting. Better positioning.
            </p>
            <button
              onClick={() => handleGeneratePDF('visible')}
              disabled={isGenerating}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200"
            >
              {isGenerating ? 'Generating...' : 'Generate Fixed Visible PDF'}
            </button>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Fixed Simple jsPDF Method
            </h3>
            <p className="text-gray-600 mb-4 text-sm">
              Fixed the roundedRect error by using regular rect. Most reliable method.
            </p>
            <button
              onClick={() => handleGeneratePDF('simple')}
              disabled={isGenerating}
              className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200"
            >
              {isGenerating ? 'Generating...' : 'Generate Fixed Simple PDF'}
            </button>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              High Quality Method
            </h3>
            <p className="text-gray-600 mb-4 text-sm">
              Uses scale 3 for very high resolution. Best quality but slower generation.
            </p>
            <button
              onClick={() => handleGeneratePDF('highquality')}
              disabled={isGenerating}
              className="w-full bg-purple-600 hover:bg-purple-700 disabled:bg-gray-400 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200"
            >
              {isGenerating ? 'Generating...' : 'Generate High Quality PDF'}
            </button>
          </div>
        </div>

        {status && (
          <div className="mt-6 bg-blue-50 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-blue-900 mb-2">
              Status
            </h3>
            <p className="text-blue-800">{status}</p>
          </div>
        )}

        <div className="mt-8 bg-yellow-50 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-yellow-900 mb-4">
            Method Comparison
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-yellow-800">
            <div>
              <strong>Fixed Visible Container Method:</strong>
              <ul className="mt-2 space-y-1">
                <li>• Fixed overflow and sizing issues</li>
                <li>• Better positioning to prevent cutting</li>
                <li>• Should capture full certificate</li>
              </ul>
            </div>
            <div>
              <strong>Fixed Simple jsPDF Method:</strong>
              <ul className="mt-2 space-y-1">
                <li>• Fixed roundedRect error</li>
                <li>• Most reliable method</li>
                <li>• Simpler design but functional</li>
              </ul>
            </div>
            <div>
              <strong>High Quality Method:</strong>
                <ul className="mt-2 space-y-1">
                <li>• Scale 3 for very high resolution</li>
                <li>• Best quality output</li>
                <li>• Slower generation time</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-6 bg-red-50 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-red-900 mb-4">
            Troubleshooting Tips
          </h3>
          <ul className="text-red-800 space-y-2 text-sm">
            <li>• Try the Fixed Simple jsPDF method first - it should work without errors</li>
            <li>• The Fixed Visible Container method should prevent cutting issues</li>
            <li>• Use the High Quality method for the best visual quality</li>
            <li>• If the Simple method works, we can enhance it with better styling</li>
            <li>• All methods now have better error handling</li>
          </ul>
        </div>
      </div>
    </div>
  )
} 
'use client'

import { useState } from 'react'
import { Download, CheckCircle, AlertCircle, FileText, Eye } from 'lucide-react'
import { toast } from 'sonner'
import { useUser } from '../providers'
import { getCompletedLessons } from '../data/categoryProgress'
import { generateCertificatePDF } from '../lib/certificateGenerator'
import CertificateTemplate from './CertificateTemplate'

export default function CertificationDownload() {
  const [isLoading, setIsLoading] = useState(false)
  const [showPreview, setShowPreview] = useState(false)
  const [certificateData, setCertificateData] = useState<any>(null)
  const { user } = useUser()
  
  // Check if user has completed 120 lessons
  const completedLessons = getCompletedLessons()
  const hasCompletedAllLessons = completedLessons.length >= 120
  
  // Check if user can download certification
  const canDownload = hasCompletedAllLessons

  const handleDownload = async () => {
    if (!canDownload) {
      toast.error('You need to complete all 120 lessons to download your certification.')
      return
    }

    try {
      setIsLoading(true)
      
      // Get user's certification name
      const nameResponse = await fetch('/api/certification/name', {
        headers: {
          'Authorization': 'Bearer demo-token'
        }
      })
      
      let studentName = user?.name || 'User'
      if (nameResponse.ok) {
        const nameData = await nameResponse.json()
        if (nameData.data?.first_name && nameData.data?.last_name) {
          studentName = `${nameData.data.first_name} ${nameData.data.last_name}`
        }
      }
      
      // Get certificate data from server
      const response = await fetch('/api/certification/download', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer demo-token'
        },
        body: JSON.stringify({
          userId: user?.id,
          completedLessons: completedLessons,
          totalXP: user?.total_xp || 0,
          studentName: studentName
        })
      })

      if (response.ok) {
        const data = await response.json()
        setCertificateData(data.certificateData)
        
        // Generate PDF on client side
        const pdfBlob = await generateCertificatePDF(data.certificateData)
        
        // Create download link
        const url = window.URL.createObjectURL(pdfBlob)
        const a = document.createElement('a')
        a.href = url
        a.download = `UsapUpgrade_Certificate_${studentName.replace(/\s+/g, '_')}.pdf`
        document.body.appendChild(a)
        a.click()
        window.URL.revokeObjectURL(url)
        document.body.removeChild(a)
        
        toast.success('Certificate downloaded successfully!')
      } else {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to generate certificate')
      }
    } catch (error) {
      console.error('Error downloading certificate:', error)
      toast.error('Failed to download certificate. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handlePreview = async () => {
    if (!canDownload) {
      toast.error('You need to complete all 120 lessons to preview your certification.')
      return
    }

    try {
      setIsLoading(true)
      
      // Get user's certification name
      const nameResponse = await fetch('/api/certification/name', {
        headers: {
          'Authorization': 'Bearer demo-token'
        }
      })
      
      let studentName = user?.name || 'User'
      if (nameResponse.ok) {
        const nameData = await nameResponse.json()
        if (nameData.data?.first_name && nameData.data?.last_name) {
          studentName = `${nameData.data.first_name} ${nameData.data.last_name}`
        }
      }
      
      // Get certificate data from server
      const response = await fetch('/api/certification/download', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer demo-token'
        },
        body: JSON.stringify({
          userId: user?.id,
          completedLessons: completedLessons,
          totalXP: user?.total_xp || 0,
          studentName: studentName
        })
      })

      if (response.ok) {
        const data = await response.json()
        setCertificateData(data.certificateData)
        setShowPreview(true)
      } else {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to generate certificate preview')
      }
    } catch (error) {
      console.error('Error generating certificate preview:', error)
      toast.error('Failed to generate certificate preview. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  if (!hasCompletedAllLessons) {
    const remainingLessons = 120 - completedLessons.length
    return (
      <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 sm:p-6">
        <div className="flex items-start">
          <AlertCircle className="w-5 h-5 text-orange-600 mr-3 mt-0.5 flex-shrink-0" />
          <div className="text-sm sm:text-base text-orange-800">
            <p className="font-medium mb-2">Complete All Lessons</p>
            <p>You need to complete all 120 lessons to download your certification. You have {remainingLessons} lessons remaining.</p>
            <div className="mt-3">
              <div className="w-full bg-orange-200 rounded-full h-2">
                <div 
                  className="bg-orange-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${(completedLessons.length / 120) * 100}%` }}
                ></div>
              </div>
              <p className="text-xs text-orange-700 mt-1">
                {completedLessons.length} of 120 lessons completed
              </p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Certificate Preview Modal */}
      {showPreview && certificateData && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-auto">
            <div className="p-4 border-b border-gray-200 flex justify-between items-center">
              <h3 className="text-lg font-semibold text-gray-900">Certificate Preview</h3>
              <button
                onClick={() => setShowPreview(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            </div>
            <div className="p-4">
              <div className="scale-75 origin-top transform">
                <CertificateTemplate {...certificateData} />
              </div>
            </div>
            <div className="p-4 border-t border-gray-200 flex justify-end space-x-3">
              <button
                onClick={() => setShowPreview(false)}
                className="px-4 py-2 text-gray-600 hover:text-gray-800"
              >
                Close
              </button>
              <button
                onClick={handleDownload}
                disabled={isLoading}
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:bg-green-400"
              >
                {isLoading ? 'Generating...' : 'Download PDF'}
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="bg-green-50 border border-green-200 rounded-lg p-4 sm:p-6">
        <div className="flex items-start mb-4">
          <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
          <div>
            <h4 className="text-sm sm:text-base font-semibold text-green-900 mb-2">
              Download Your Certification
            </h4>
            <p className="text-sm sm:text-base text-green-800">
              Congratulations! You've completed all 120 lessons. Download your official certificate of completion.
            </p>
          </div>
        </div>

        <div className="bg-white rounded-lg p-4 border border-green-300 mb-4">
          <div className="flex items-center mb-3">
            <FileText className="w-5 h-5 text-green-600 mr-2" />
            <h5 className="text-sm font-semibold text-green-900">Certificate Details</h5>
          </div>
          <div className="space-y-2 text-sm text-green-800">
            <div className="flex justify-between">
              <span>Student Name:</span>
              <span className="font-medium">{user?.name || 'User'}</span>
            </div>
            <div className="flex justify-between">
              <span>Lessons Completed:</span>
              <span className="font-medium">{completedLessons.length}/120</span>
            </div>
            <div className="flex justify-between">
              <span>Total XP Earned:</span>
              <span className="font-medium">{user?.total_xp || 0} XP</span>
            </div>
            <div className="flex justify-between">
              <span>Completion Date:</span>
              <span className="font-medium">{new Date().toLocaleDateString()}</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={handlePreview}
            disabled={isLoading}
            className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed text-white font-semibold py-3 sm:py-4 px-6 rounded-lg transition-colors flex items-center justify-center"
          >
            {isLoading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Generating Preview...
              </>
            ) : (
              <>
                <Eye className="w-4 h-4 mr-2" />
                Preview Certificate
              </>
            )}
          </button>

          <button
            onClick={handleDownload}
            disabled={isLoading}
            className="flex-1 bg-green-600 hover:bg-green-700 disabled:bg-green-400 disabled:cursor-not-allowed text-white font-semibold py-3 sm:py-4 px-6 rounded-lg transition-colors flex items-center justify-center"
          >
            {isLoading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Generating Certificate...
              </>
            ) : (
              <>
                <Download className="w-4 h-4 mr-2" />
                Download PDF
              </>
            )}
          </button>
        </div>

        <div className="mt-4 text-xs text-green-700">
          <p>• Certificate will be downloaded as a high-quality PDF file</p>
          <p>• Keep this certificate safe as proof of your completion</p>
          <p>• You can preview and download your certificate anytime from this page</p>
          <p>• Certificate includes your name, completion date, and unique certificate ID</p>
        </div>
      </div>
    </div>
  )
} 
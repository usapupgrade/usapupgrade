'use client'

import { useState } from 'react'
import { Download, Loader2, CheckCircle, AlertCircle } from 'lucide-react'
import { useUser } from '../providers'
import { toast } from 'sonner'

interface CertificationDownloadProps {
  onClose?: () => void
}

export default function CertificationDownload({ onClose }: CertificationDownloadProps) {
  const { user } = useUser()
  const [isDownloading, setIsDownloading] = useState(false)
  const [downloadStatus, setDownloadStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const handleDownload = async () => {
    if (!user) {
      toast.error('Please sign in to download your certificate')
      return
    }

    setIsDownloading(true)
    setDownloadStatus('idle')

    try {
      // Use server-side API instead of client-side DOM manipulation
      const response = await fetch('/api/certificate/download', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: user.id,
          certificateName: user.name || 'Student',
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to generate certificate')
      }

      // Get the PDF blob
      const blob = await response.blob()
      
      // Create download link
      const url = window.URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = `usapupgrade-certificate-${user.id}.pdf`
      
      // Trigger download
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      
      // Clean up
      window.URL.revokeObjectURL(url)
      
      setDownloadStatus('success')
      toast.success('Certificate downloaded successfully!')
      
      // Close modal after successful download
      setTimeout(() => {
        onClose?.()
      }, 2000)
      
    } catch (error) {
      console.error('Certificate download error:', error)
      setDownloadStatus('error')
      toast.error('Failed to download certificate. Please try again.')
    } finally {
      setIsDownloading(false)
    }
  }

  const getStatusIcon = () => {
    switch (downloadStatus) {
      case 'success':
        return <CheckCircle className="w-5 h-5 text-green-500" />
      case 'error':
        return <AlertCircle className="w-5 h-5 text-red-500" />
      default:
        return <Download className="w-5 h-5 text-blue-500" />
    }
  }

  const getStatusText = () => {
    switch (downloadStatus) {
      case 'success':
        return 'Certificate Downloaded!'
      case 'error':
        return 'Download Failed'
      default:
        return 'Download Certificate'
    }
  }

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 max-w-md w-full">
      <div className="text-center">
        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
          {isDownloading ? (
            <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
          ) : (
            getStatusIcon()
          )}
        </div>
        
        <h3 className="text-xl font-bold text-gray-900 mb-2">
          {downloadStatus === 'success' ? 'Success!' : 'Download Your Certificate'}
        </h3>
        
        <p className="text-gray-600 mb-6">
          {downloadStatus === 'success' 
            ? 'Your certificate has been downloaded successfully!'
            : 'Get your professional communication skills certificate to showcase your achievements.'
          }
        </p>

        {downloadStatus !== 'success' && (
          <div className="space-y-4">
            <div className="bg-blue-50 rounded-lg p-4">
              <h4 className="font-semibold text-blue-800 mb-2">Certificate Includes:</h4>
              <ul className="text-sm text-blue-700 space-y-1">
                <li>• Your name and completion date</li>
                <li>• Course title and description</li>
                <li>• Total lessons completed</li>
                <li>• XP earned</li>
                <li>• Professional design</li>
              </ul>
            </div>

            <button
              onClick={handleDownload}
              disabled={isDownloading}
              className={`w-full py-3 px-6 rounded-xl font-semibold transition-all duration-200 flex items-center justify-center space-x-2 ${
                isDownloading
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-blue-600 hover:bg-blue-700 text-white transform hover:scale-105'
              }`}
            >
              {isDownloading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Generating Certificate...</span>
                </>
              ) : (
                <>
                  <Download className="w-4 h-4" />
                  <span>Download Certificate</span>
                </>
              )}
            </button>
          </div>
        )}

        {downloadStatus === 'success' && (
          <div className="space-y-4">
            <div className="bg-green-50 rounded-lg p-4">
              <p className="text-sm text-green-700">
                Your certificate has been saved to your downloads folder. 
                You can now share it on LinkedIn, add it to your resume, or print it for your records.
              </p>
            </div>
            
            <button
              onClick={onClose}
              className="w-full bg-gray-600 hover:bg-gray-700 text-white py-3 px-6 rounded-xl font-semibold transition-colors"
            >
              Close
            </button>
          </div>
        )}

        {downloadStatus === 'error' && (
          <div className="space-y-4">
            <div className="bg-red-50 rounded-lg p-4">
              <p className="text-sm text-red-700">
                There was an error generating your certificate. Please try again or contact support if the issue persists.
              </p>
            </div>
            
            <div className="flex space-x-3">
              <button
                onClick={handleDownload}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-xl font-semibold transition-colors"
              >
                Try Again
              </button>
              <button
                onClick={onClose}
                className="flex-1 bg-gray-600 hover:bg-gray-700 text-white py-3 px-6 rounded-xl font-semibold transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
} 
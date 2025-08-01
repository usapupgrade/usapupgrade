'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Search, CheckCircle, XCircle, AlertCircle, Shield, FileText } from 'lucide-react'
import { toast } from 'sonner'

interface VerificationResult {
  valid: boolean
  message: string
  certificate?: {
    certificateId: string
    studentName: string
    issuedAt: string
    completionDate: string
    lessonsCompleted: number
    totalXP: number
    longestStreak: number
    certificateHash: string
  }
}

export default function CertificateVerificationPage() {
  const [certificateId, setCertificateId] = useState('')
  const [studentName, setStudentName] = useState('')
  const [isVerifying, setIsVerifying] = useState(false)
  const [verificationResult, setVerificationResult] = useState<VerificationResult | null>(null)
  const router = useRouter()

  const handleVerification = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!certificateId.trim() || !studentName.trim()) {
      toast.error('Please enter both certificate ID and student name')
      return
    }

    setIsVerifying(true)
    setVerificationResult(null)

    try {
      const response = await fetch('/api/certification/verify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          certificateId: certificateId.trim(),
          studentName: studentName.trim()
        })
      })

      const data = await response.json()

      if (response.ok) {
        setVerificationResult(data)
        if (data.valid) {
          toast.success('Certificate verified successfully!')
        } else {
          toast.error(data.message || 'Certificate verification failed')
        }
      } else {
        toast.error(data.error || 'Failed to verify certificate')
      }
    } catch (error) {
      console.error('Error verifying certificate:', error)
      toast.error('Failed to verify certificate. Please try again.')
    } finally {
      setIsVerifying(false)
    }
  }

  const resetForm = () => {
    setCertificateId('')
    setStudentName('')
    setVerificationResult(null)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 py-3 sm:py-4">
          <div className="flex items-center justify-between">
            <Link 
              href="/certificate"
              className="flex items-center text-gray-600 hover:text-gray-900 transition-colors text-sm sm:text-base"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              <span className="hidden sm:inline">Back to Certificate</span>
              <span className="sm:hidden">Back</span>
            </Link>
            <div className="text-center flex-1">
              <h1 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 leading-tight">
                Certificate Verification
              </h1>
            </div>
            <div className="w-16 sm:w-20"></div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-6 sm:py-8">
        {/* Introduction Section */}
        <div className="bg-white rounded-2xl shadow-sm border p-6 sm:p-8 mb-8">
          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield className="w-8 h-8 text-blue-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Verify Certificate Authenticity</h2>
            <p className="text-gray-600">
              Enter the certificate ID and student name to verify the authenticity of a UsapUpgrade certificate.
            </p>
          </div>

          <div className="bg-blue-50 rounded-xl p-4 mb-6">
            <div className="flex items-start space-x-3">
              <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
              <div className="text-sm text-blue-800">
                <p className="font-semibold mb-1">How to find your certificate information:</p>
                <ul className="space-y-1">
                  <li>• Certificate ID: Found at the top-right corner of your certificate</li>
                  <li>• Student Name: The name that appears on your certificate</li>
                  <li>• Format: Certificate ID should be in format UC-YYYY-MM-DD-HH-MM-SS-NNN</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Verification Form */}
          <form onSubmit={handleVerification} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="certificateId" className="block text-sm font-medium text-gray-700 mb-2">
                  Certificate ID
                </label>
                <input
                  type="text"
                  id="certificateId"
                  value={certificateId}
                  onChange={(e) => setCertificateId(e.target.value)}
                  placeholder="e.g., UC-2024-12-15-14-30-45-123"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="studentName" className="block text-sm font-medium text-gray-700 mb-2">
                  Student Name
                </label>
                <input
                  type="text"
                  id="studentName"
                  value={studentName}
                  onChange={(e) => setStudentName(e.target.value)}
                  placeholder="e.g., John Michael Smith"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  required
                />
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button
                type="submit"
                disabled={isVerifying}
                className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-bold py-3 px-8 rounded-lg transition-colors inline-flex items-center justify-center"
              >
                <Search className="w-5 h-5 mr-2" />
                {isVerifying ? 'Verifying...' : 'Verify Certificate'}
              </button>
              
              <button
                type="button"
                onClick={resetForm}
                className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-3 px-8 rounded-lg transition-colors inline-flex items-center justify-center"
              >
                Reset Form
              </button>
            </div>
          </form>
        </div>

        {/* Verification Result */}
        {verificationResult && (
          <div className="bg-white rounded-2xl shadow-sm border p-6 sm:p-8 mb-8">
            <div className="text-center mb-6">
              {verificationResult.valid ? (
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-8 h-8 text-green-600" />
                </div>
              ) : (
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <XCircle className="w-8 h-8 text-red-600" />
                </div>
              )}
              
              <h3 className={`text-xl font-bold mb-2 ${
                verificationResult.valid ? 'text-green-600' : 'text-red-600'
              }`}>
                {verificationResult.valid ? 'Certificate Verified' : 'Verification Failed'}
              </h3>
              
              <p className="text-gray-600 mb-6">
                {verificationResult.message}
              </p>
            </div>

            {verificationResult.valid && verificationResult.certificate && (
              <div className="bg-green-50 rounded-xl p-6">
                <h4 className="text-lg font-semibold text-green-900 mb-4">Certificate Details</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="font-medium text-gray-700">Certificate ID:</span>
                    <p className="text-gray-900 font-mono">{verificationResult.certificate.certificateId}</p>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">Student Name:</span>
                    <p className="text-gray-900">{verificationResult.certificate.studentName}</p>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">Issued Date:</span>
                    <p className="text-gray-900">
                      {new Date(verificationResult.certificate.issuedAt).toLocaleDateString()}
                    </p>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">Completion Date:</span>
                    <p className="text-gray-900">
                      {new Date(verificationResult.certificate.completionDate).toLocaleDateString()}
                    </p>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">Lessons Completed:</span>
                    <p className="text-gray-900">{verificationResult.certificate.lessonsCompleted}</p>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">Total XP Earned:</span>
                    <p className="text-gray-900">{verificationResult.certificate.totalXP}</p>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">Longest Streak:</span>
                    <p className="text-gray-900">{verificationResult.certificate.longestStreak} days</p>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">Certificate Hash:</span>
                    <p className="text-gray-900 font-mono text-xs break-all">
                      {verificationResult.certificate.certificateHash}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {!verificationResult.valid && (
              <div className="bg-red-50 rounded-xl p-6">
                <h4 className="text-lg font-semibold text-red-900 mb-4">Verification Failed</h4>
                <div className="text-sm text-red-800">
                  <p className="mb-2">Possible reasons for verification failure:</p>
                  <ul className="space-y-1 list-disc list-inside">
                    <li>Certificate ID format is incorrect</li>
                    <li>Student name does not match our records</li>
                    <li>Certificate has been revoked or invalidated</li>
                    <li>Certificate was issued from a different system</li>
                  </ul>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Additional Information */}
        <div className="bg-white rounded-2xl shadow-sm border p-6 sm:p-8">
          <h3 className="text-xl font-bold text-gray-900 mb-4">About Certificate Verification</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Security Features</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• Unique certificate ID for each certificate</li>
                <li>• Cryptographic hash for authenticity verification</li>
                <li>• Database-backed verification system</li>
                <li>• Tamper-proof certificate design</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Verification Process</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• Certificate ID format validation</li>
                <li>• Database record lookup</li>
                <li>• Student name matching</li>
                <li>• Certificate status verification</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Quick Links */}
        <div className="bg-blue-50 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-blue-900 mb-4">Quick Links</h3>
          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              href="/certificate"
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-colors inline-flex items-center justify-center"
            >
              <FileText className="w-5 h-5 mr-2" />
              Get Your Certificate
            </Link>
            <Link
              href="/certificate/preview"
              className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-3 px-6 rounded-lg transition-colors inline-flex items-center justify-center"
            >
              Preview Certificate
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
} 
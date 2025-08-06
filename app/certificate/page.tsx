'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Download, Award, Calendar, Star, Target, BookOpen, Eye, Shield } from 'lucide-react'
import { getCompletedLessons, getTotalXP, getStreak } from '../data/categoryProgress'
import { generateCertificatePDFHighQuality } from '../lib/certificateGenerator'
import CertificateTemplate from '../components/CertificateTemplate'
import { toast } from 'sonner'

export default function CertificatePage() {
  const [certificationData, setCertificationData] = useState<any>(null)
  const [isGenerating, setIsGenerating] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [showPreview, setShowPreview] = useState(false)
  const router = useRouter()
  
  const completedLessons = getCompletedLessons()
  const totalXP = getTotalXP()
  const streak = getStreak()
  const hasCompletedAllLessons = completedLessons.length >= 120
  const canGenerateCertificate = hasCompletedAllLessons

  useEffect(() => {
    fetchCertificationStatus()
  }, [])

  const fetchCertificationStatus = async () => {
    try {
      setIsLoading(true)
      const response = await fetch('/api/certification/issue', {
        headers: {
          'Authorization': 'Bearer demo-token'
        }
      })
      
      if (response.ok) {
        const data = await response.json()
        setCertificationData(data.data)
      } else {
        console.error('Failed to fetch certification status')
      }
    } catch (error) {
      console.error('Error fetching certification status:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const generateCertificate = async () => {
    if (!canGenerateCertificate) return
    
    setIsGenerating(true)
    
    try {
      // Check if user has set certification name
      if (!certificationData?.user_progress?.certification_name?.first_name || 
          !certificationData?.user_progress?.certification_name?.last_name) {
        toast.error('Please set your certification name in Settings first.')
        router.push('/settings')
        return
      }
      
      // Issue certification
      const response = await fetch('/api/certification/issue', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer demo-token'
        },
        body: JSON.stringify({
          first_name: certificationData.user_progress.certification_name.first_name,
          last_name: certificationData.user_progress.certification_name.last_name
        })
      })
      
      const data = await response.json()
      
      if (response.ok) {
        // Update local state
        setCertificationData((prev: any) => ({
          ...prev,
          has_certification: true,
          certification: data.data
        }))
        
        // Generate PDF certificate
        const certificateData = {
          studentName: `${data.data.first_name} ${data.data.last_name}`,
          completionDate: new Date(data.data.completion_date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          }),
          lessonsCompleted: data.data.lessons_completed,
          totalXP: data.data.total_xp,
          certificateId: data.data.certificate_id,
          courseName: 'Filipino Workplace Communication Mastery',
          instructorName: 'UsapUpgrade Team'
        }
        
        // Generate PDF
        const pdfBlob = await generateCertificatePDFHighQuality(certificateData)
        
        // Create download link
        const url = window.URL.createObjectURL(pdfBlob)
        const a = document.createElement('a')
        a.href = url
        a.download = `UsapUpgrade_Certificate_${data.data.first_name}_${data.data.last_name}.pdf`
        if (document.body) {
          document.body.appendChild(a)
          a.click()
          window.URL.revokeObjectURL(url)
          document.body.removeChild(a)
        }
        
        toast.success('Certificate generated and downloaded successfully!')
      } else if (response.status === 409) {
        // User already has a certification
        toast.error('You already have a certification. You can only receive one certification per account.')
      } else {
        toast.error(data.error || 'Failed to generate certificate')
      }
    } catch (error) {
      console.error('Error generating certificate:', error)
      toast.error('Failed to generate certificate. Please try again.')
    } finally {
      setIsGenerating(false)
    }
  }

  const previewCertificate = () => {
    if (!certificationData?.user_progress?.certification_name?.first_name || 
        !certificationData?.user_progress?.certification_name?.last_name) {
      toast.error('Please set your certification name in Settings first.')
      router.push('/settings')
      return
    }
    setShowPreview(true)
  }

  const downloadExistingCertificate = async () => {
    if (!certificationData?.certification) return
    
    setIsGenerating(true)
    
    try {
      const certificateData = {
        studentName: `${certificationData.certification.first_name} ${certificationData.certification.last_name}`,
        completionDate: new Date(certificationData.certification.completion_date).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        }),
        lessonsCompleted: certificationData.certification.lessons_completed,
        totalXP: certificationData.certification.total_xp,
        certificateId: certificationData.certification.certificate_id,
        courseName: 'Filipino Workplace Communication Mastery',
        instructorName: 'UsapUpgrade Team'
      }
      
      // Generate PDF
      const pdfBlob = await generateCertificatePDFHighQuality(certificateData)
      
      // Create download link
      const url = window.URL.createObjectURL(pdfBlob)
      const a = document.createElement('a')
      a.href = url
              a.download = `UsapUpgrade_Certificate_${certificationData.certification.first_name}_${certificationData.certification.last_name}.pdf`
      if (document.body) {
        document.body.appendChild(a)
        a.click()
        window.URL.revokeObjectURL(url)
        document.body.removeChild(a)
      }
      
      toast.success('Certificate downloaded successfully!')
    } catch (error) {
      console.error('Error downloading certificate:', error)
      toast.error('Failed to download certificate. Please try again.')
    } finally {
      setIsGenerating(false)
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading certification status...</p>
          </div>
        </div>
      </div>
    )
  }

  // Check if user already has a certification
  if (certificationData?.has_certification) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Award className="w-8 h-8 text-green-600" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Certificate Already Issued</h1>
            <p className="text-gray-600 mb-6">
              You have already received your certificate of completion. You can only receive one certification per account.
            </p>
            <div className="bg-white rounded-xl p-6 max-w-md mx-auto mb-6">
              <div className="text-center">
                <p className="text-sm text-gray-600 mb-4">
                  Certificate ID: {certificationData.certification.certificate_id}
                </p>
                <p className="text-sm text-gray-600 mb-4">
                  Issued: {new Date(certificationData.certification.issued_at).toLocaleDateString()}
                </p>
                <p className="text-lg font-semibold text-gray-900">
                  {certificationData.certification.first_name} {certificationData.certification.last_name}
                </p>
              </div>
            </div>
            
            {/* Download existing certificate */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={downloadExistingCertificate}
                disabled={isGenerating}
                className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-bold py-3 px-6 rounded-lg transition-colors inline-flex items-center justify-center"
              >
                <Download className="w-5 h-5 mr-2" />
                {isGenerating ? 'Generating...' : 'Download Certificate'}
              </button>
              
              <Link
                href="/certificate/preview"
                className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-3 px-6 rounded-lg transition-colors inline-flex items-center justify-center"
              >
                <Eye className="w-5 h-5 mr-2" />
                Preview Certificate
              </Link>
              
              <Link
                href="/certificate/verify"
                className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-6 rounded-lg transition-colors inline-flex items-center justify-center"
              >
                <Shield className="w-5 h-5 mr-2" />
                Verify Certificate
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!hasCompletedAllLessons) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Target className="w-8 h-8 text-orange-600" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Keep Learning!</h1>
            <p className="text-gray-600 mb-6">
              You've completed {completedLessons.length} out of 120 lessons. Complete all lessons to earn your certificate.
            </p>
            <div className="bg-white rounded-xl p-6 max-w-md mx-auto">
              <div className="mb-4">
                <div className="flex justify-between text-sm mb-2">
                  <span>Progress</span>
                  <span>{completedLessons.length}/120 lessons</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div 
                    className="bg-blue-600 h-3 rounded-full transition-all duration-300"
                    style={{ width: `${(completedLessons.length / 120) * 100}%` }}
                  ></div>
                </div>
              </div>
              <Link 
                href="/dashboard" 
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors block"
              >
                Continue Learning
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Check if user has set certification name
  if (!certificationData?.user_progress?.certification_name?.first_name || 
      !certificationData?.user_progress?.certification_name?.last_name) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Award className="w-8 h-8 text-yellow-600" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Set Your Certification Name</h1>
            <p className="text-gray-600 mb-6">
              Please set your certification name in Settings before generating your certificate.
            </p>
            <Link 
              href="/settings" 
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
            >
              Go to Settings
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header - Mobile Optimized */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 py-3 sm:py-4">
          <div className="flex items-center justify-between">
            <Link 
              href="/dashboard"
              className="flex items-center text-gray-600 hover:text-gray-900 transition-colors text-sm sm:text-base"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              <span className="hidden sm:inline">Back to Dashboard</span>
              <span className="sm:hidden">Back</span>
            </Link>
            <div className="text-center flex-1">
              <h1 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 leading-tight">
                Certificate of Completion
              </h1>
            </div>
            <div className="w-16 sm:w-20"></div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-6 sm:py-8">
        {/* Mobile-Optimized Completion Celebration Section */}
        <div className="bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-12 border border-purple-200 shadow-lg mb-8">
          <div className="text-center">
            {/* Celebration Header - Mobile Optimized */}
            <div className="mb-6 sm:mb-8">
              {/* Emojis - Optimized for mobile */}
              <div className="flex justify-center space-x-3 sm:space-x-4 mb-4 sm:mb-6">
                <span className="text-3xl sm:text-4xl lg:text-5xl">🎉</span>
                <span className="text-3xl sm:text-4xl lg:text-5xl">🎊</span>
                <span className="text-3xl sm:text-4xl lg:text-5xl">🎉</span>
              </div>
              
              {/* Main Heading - Removed problematic emoji */}
              <h2 className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 bg-clip-text text-transparent mb-4 sm:mb-6 leading-tight">
                Congratulations on Completing UsapUpgrade!
              </h2>
              
              {/* Description - Mobile optimized spacing */}
              <p className="text-base sm:text-lg lg:text-xl text-gray-700 leading-relaxed px-2 sm:px-0">
                You've just upgraded your professional communication skills with 120+ real workplace scenarios. 
                <span className="font-semibold text-purple-700 block mt-2">But this is just the beginning of your career transformation!</span>
              </p>
            </div>

            {/* What's Next Section - Mobile Optimized */}
            <div className="bg-white/80 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 mb-6 sm:mb-8 border border-purple-100">
              <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">What's Next:</h3>
              
              {/* Grid - Single column on mobile, 3 columns on desktop */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
                <div className="text-center group">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4 group-hover:bg-blue-200 transition-colors">
                    <span className="text-xl sm:text-2xl">💼</span>
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-2 text-sm sm:text-base">Practice Daily</h4>
                  <p className="text-xs sm:text-sm text-gray-600 leading-relaxed px-2">
                    Use these skills and tips in your actual workplace conversations
                  </p>
                </div>
                
                <div className="text-center group">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4 group-hover:bg-green-200 transition-colors">
                    <span className="text-xl sm:text-2xl">📚</span>
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-2 text-sm sm:text-base">Review Key Lessons</h4>
                  <p className="text-xs sm:text-sm text-gray-600 leading-relaxed px-2">
                    Go back to scenarios that challenged you most
                  </p>
                </div>
                
                <div className="text-center group">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4 group-hover:bg-orange-200 transition-colors">
                    <span className="text-xl sm:text-2xl">💪</span>
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-2 text-sm sm:text-base">Stay Confident</h4>
                  <p className="text-xs sm:text-sm text-gray-600 leading-relaxed px-2">
                    You now have the tools to speak up and get noticed
                  </p>
                </div>
              </div>
            </div>

            {/* Key Message - Mobile Optimized */}
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 mb-6 sm:mb-8 border border-blue-200">
              <div className="text-center">
                <h4 className="text-base sm:text-lg lg:text-xl font-bold text-gray-900 mb-3 sm:mb-4">Remember:</h4>
                <p className="text-sm sm:text-base lg:text-lg text-gray-700 leading-relaxed mb-4">
                  The examples and dialogues were just guides.
                </p>
                <div className="bg-white rounded-lg sm:rounded-xl p-3 sm:p-4 lg:p-6 border border-purple-200">
                  <p className="text-sm sm:text-base lg:text-lg font-bold text-purple-700 mb-2 leading-tight">
                    Your authentic voice + these proven techniques = career success.
                  </p>
                  <p className="text-xs sm:text-sm text-gray-700">
                    Use your own words and make these skills truly yours.
                  </p>
                </div>
              </div>
            </div>

            {/* Future Promise - Mobile Optimized */}
            <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 border border-green-200">
              <p className="text-sm sm:text-base lg:text-lg text-gray-700 leading-relaxed mb-4">
                More advanced and specialized lessons and scenarios are coming soon.
              </p>
              <p className="text-base sm:text-lg lg:text-xl font-bold text-green-700 mb-3 sm:mb-4">
                Keep upgrading, keep growing!
              </p>
              <p className="text-base sm:text-lg lg:text-xl font-bold text-green-700 mb-3 sm:mb-4">
                Kayang-kaya 'yan! 💪
              </p>
              <p className="text-base sm:text-lg font-semibold text-gray-800">
                God bless your career journey! 🙏
              </p>
            </div>
          </div>
        </div>

        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Award className="w-10 h-10 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Congratulations! 🎉</h1>
          <p className="text-lg text-gray-600">
            You've successfully completed all 120 professional conversation lessons!
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border p-6 sm:p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Your Achievement Summary</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <BookOpen className="w-6 h-6 text-blue-600" />
              </div>
              <div className="text-2xl font-bold text-gray-900">{completedLessons.length}</div>
              <div className="text-sm text-gray-600">Lessons Completed</div>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Star className="w-6 h-6 text-green-600" />
              </div>
              <div className="text-2xl font-bold text-gray-900">{totalXP}</div>
              <div className="text-sm text-gray-600">Total XP Earned</div>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Calendar className="w-6 h-6 text-orange-600" />
              </div>
              <div className="text-2xl font-bold text-gray-900">{streak}</div>
              <div className="text-sm text-gray-600">Longest Streak</div>
            </div>
          </div>

          <div className="text-center space-y-4">
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={generateCertificate}
                disabled={isGenerating}
                className="bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white font-bold py-4 px-8 rounded-xl transition-colors inline-flex items-center justify-center"
              >
                <Download className="w-5 h-5 mr-2" />
                {isGenerating ? 'Generating Certificate...' : 'Download Certificate'}
              </button>
              
              <button
                onClick={previewCertificate}
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded-xl transition-colors inline-flex items-center justify-center"
              >
                <Eye className="w-5 h-5 mr-2" />
                Preview Certificate
              </button>
            </div>
            
            <p className="text-sm text-gray-500">
              Your certificate will be downloaded as a high-quality PDF file
            </p>
          </div>
        </div>

        <div className="bg-blue-50 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-blue-900 mb-3">What This Certificate Represents</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-blue-800">
            <div>✅ Mastery of professional communication skills</div>
            <div>✅ Advanced workplace scenario handling</div>
            <div>✅ Leadership and management communication</div>
            <div>✅ Conflict resolution and difficult conversations</div>
            <div>✅ Client management and external relations</div>
            <div>✅ Cultural adaptation for Filipino workplaces</div>
          </div>
        </div>

        {/* Certificate Preview Modal */}
        {showPreview && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6 border-b border-gray-200">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold">Certificate Preview</h3>
                  <button
                    onClick={() => setShowPreview(false)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    ✕
                  </button>
                </div>
              </div>
              <div className="p-6">
                <div className="flex justify-center">
                  <div className="scale-50 origin-top transform">
                    <CertificateTemplate
                      studentName={`${certificationData.user_progress.certification_name.first_name} ${certificationData.user_progress.certification_name.last_name}`}
                      completionDate={new Date().toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                      lessonsCompleted={120}
                      totalXP={totalXP}
                      certificateId={`UC-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
} 
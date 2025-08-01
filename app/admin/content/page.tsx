'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { 
  BookOpen, 
  Search, 
  Filter, 
  Eye,
  Edit,
  Trash2,
  Plus,
  ArrowLeft,
  Moon,
  Sun
} from 'lucide-react'
import { useDarkMode } from '../../providers'
import { useAdminStore, Lesson } from '../../data/adminData'

export default function ContentManagement() {
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState<'all' | 'free' | 'premium'>('all')
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null)
  const [showLessonModal, setShowLessonModal] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const { isDarkMode, toggleDarkMode } = useDarkMode()
  const router = useRouter()

  // Get live data from shared store
  const { 
    lessons, 
    getLessonStats, 
    addLesson, 
    updateLesson, 
    deleteLesson 
  } = useAdminStore()

  useEffect(() => {
    // Check if admin is authenticated
    const adminAuth = localStorage.getItem('admin_authenticated')
    if (!adminAuth) {
      router.push('/admin-access')
      return
    }
    setIsAuthenticated(true)
  }, [router])

  if (!isAuthenticated) {
    return null // Will redirect to admin-access
  }

  const filteredLessons = lessons
    .filter(lesson => 
      lesson.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lesson.description.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter(lesson => filterStatus === 'all' || lesson.status === filterStatus)

  const stats = getLessonStats()

  const handleViewLesson = (lesson: Lesson) => {
    setSelectedLesson(lesson)
    setShowLessonModal(true)
  }

  const handleEditLesson = (lesson: Lesson) => {
    setSelectedLesson(lesson)
    setShowLessonModal(true)
  }

  const handleDeleteLesson = (lessonId: string) => {
    if (confirm('Are you sure you want to delete this lesson?')) {
      deleteLesson(lessonId)
      alert('Lesson deleted successfully!')
    }
  }

  return (
    <div className={`min-h-screen transition-colors duration-200 ${isDarkMode ? 'bg-primary-900' : 'bg-gradient-to-br from-primary-50 to-accent-50'} p-4 sm:p-6`}>
      <div className="max-w-7xl mx-auto">
        {/* Mobile-Optimized Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <div>
              <h1 className={`text-2xl sm:text-3xl font-bold transition-colors duration-200 ${isDarkMode ? 'text-primary-100' : 'text-primary-900'} mb-2`}>Content Management</h1>
              <p className={`transition-colors duration-200 ${isDarkMode ? 'text-primary-300' : 'text-primary-600'}`}>Manage lessons and course content</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-2">
              <button
                onClick={toggleDarkMode}
                className={`p-2 rounded-lg transition-colors duration-200 ${
                  isDarkMode 
                    ? 'bg-primary-700 hover:bg-primary-600 text-primary-100' 
                    : 'bg-primary-100 hover:bg-primary-200 text-primary-700'
                }`}
              >
                {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </button>
              <button
                onClick={() => window.location.href = '/admin'}
                className="px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors flex items-center justify-center space-x-2 w-full sm:w-auto"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back to Admin Dashboard</span>
              </button>
            </div>
          </div>
        </motion.div>

        {/* Stats Cards - Mobile Optimized */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6 sm:mb-8"
        >
          <div className="card p-3 sm:p-4">
            <div className="flex items-center space-x-2 sm:space-x-3">
              <BookOpen className="w-5 h-5 sm:w-6 sm:h-6 text-primary-500 flex-shrink-0" />
              <div className="min-w-0 flex-1">
                <p className={`text-xs sm:text-sm transition-colors duration-200 ${isDarkMode ? 'text-primary-300' : 'text-primary-600'}`}>Total Lessons</p>
                <p className={`text-lg sm:text-xl font-bold transition-colors duration-200 ${isDarkMode ? 'text-primary-100' : 'text-primary-900'}`}>{stats.total}</p>
              </div>
            </div>
          </div>

          <div className="card p-3 sm:p-4">
            <div className="flex items-center space-x-2 sm:space-x-3">
              <BookOpen className="w-5 h-5 sm:w-6 sm:h-6 text-success-500 flex-shrink-0" />
              <div className="min-w-0 flex-1">
                <p className={`text-xs sm:text-sm transition-colors duration-200 ${isDarkMode ? 'text-primary-300' : 'text-primary-600'}`}>Free Lessons</p>
                <p className={`text-lg sm:text-xl font-bold transition-colors duration-200 ${isDarkMode ? 'text-primary-100' : 'text-primary-900'}`}>{stats.free}</p>
              </div>
            </div>
          </div>

          <div className="card p-3 sm:p-4">
            <div className="flex items-center space-x-2 sm:space-x-3">
              <BookOpen className="w-5 h-5 sm:w-6 sm:h-6 text-accent-500 flex-shrink-0" />
              <div className="min-w-0 flex-1">
                <p className={`text-xs sm:text-sm transition-colors duration-200 ${isDarkMode ? 'text-primary-300' : 'text-primary-600'}`}>Premium Lessons</p>
                <p className={`text-lg sm:text-xl font-bold transition-colors duration-200 ${isDarkMode ? 'text-primary-100' : 'text-primary-900'}`}>{stats.premium}</p>
              </div>
            </div>
          </div>

          <div className="card p-3 sm:p-4">
            <div className="flex items-center space-x-2 sm:space-x-3">
              <BookOpen className="w-5 h-5 sm:w-6 sm:h-6 text-warning-500 flex-shrink-0" />
              <div className="min-w-0 flex-1">
                <p className={`text-xs sm:text-sm transition-colors duration-200 ${isDarkMode ? 'text-primary-300' : 'text-primary-600'}`}>Draft Lessons</p>
                <p className={`text-lg sm:text-xl font-bold transition-colors duration-200 ${isDarkMode ? 'text-primary-100' : 'text-primary-900'}`}>{stats.draft}</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Add Lesson Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-6"
        >
          <button
            onClick={() => setShowLessonModal(true)}
            className="w-full sm:w-auto px-4 py-2 bg-accent-500 text-white rounded-lg hover:bg-accent-600 transition-colors flex items-center justify-center space-x-2"
          >
            <Plus className="w-4 h-4" />
            <span>Add Lesson</span>
          </button>
        </motion.div>

        {/* Filters and Search - Mobile Optimized */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="card p-4 sm:p-6 mb-6"
        >
          <div className="space-y-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-primary-400 w-4 h-4 sm:w-5 sm:h-5" />
              <input
                type="text"
                placeholder="Search lessons..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={`w-full pl-10 pr-4 py-2 sm:py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm sm:text-base transition-colors duration-200 ${
                  isDarkMode 
                    ? 'bg-primary-700 border-primary-600 text-primary-100 placeholder-primary-400' 
                    : 'border-primary-200 text-primary-900 placeholder-primary-500'
                }`}
              />
            </div>

            {/* Filters - Mobile Optimized */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value as any)}
                className={`px-3 sm:px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm sm:text-base transition-colors duration-200 ${
                  isDarkMode 
                    ? 'bg-primary-700 border-primary-600 text-primary-100' 
                    : 'border-primary-200 text-primary-900'
                }`}
              >
                <option value="all">All Lessons</option>
                <option value="free">Free Lessons</option>
                <option value="premium">Premium Lessons</option>
              </select>

              <button className="px-3 sm:px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors flex items-center justify-center">
                <Eye className="w-4 h-4" />
                <span className="ml-2">Preview</span>
              </button>
            </div>
          </div>
        </motion.div>

        {/* Lessons Grid - Mobile Optimized */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6"
        >
          {filteredLessons.map((lesson, index) => (
            <motion.div
              key={lesson.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
              className={`card p-4 sm:p-6 transition-colors duration-200 ${
                isDarkMode ? 'hover:bg-primary-700' : 'hover:bg-primary-50'
              }`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                    lesson.status === 'free' ? 'bg-success-100 text-success-700' : 'bg-accent-100 text-accent-700'
                  }`}>
                    {lesson.id}
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    lesson.status === 'free' ? 'bg-success-100 text-success-700' : 'bg-accent-100 text-accent-700'
                  }`}>
                    {lesson.status}
                  </span>
                </div>
                <div className="flex space-x-2">
                  <button 
                    onClick={() => handleEditLesson(lesson)}
                    className="p-1.5 text-primary-600 hover:text-primary-900 hover:bg-primary-100 rounded-lg transition-colors"
                    title="Edit lesson"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={() => handleDeleteLesson(lesson.id)}
                    className="p-1.5 text-error-600 hover:text-error-900 hover:bg-error-100 rounded-lg transition-colors"
                    title="Delete lesson"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
              
              <h3 className={`font-semibold text-lg transition-colors duration-200 ${isDarkMode ? 'text-primary-100' : 'text-primary-900'} mb-2 line-clamp-2`}>
                {lesson.title}
              </h3>
              <p className={`text-sm transition-colors duration-200 ${isDarkMode ? 'text-primary-300' : 'text-primary-600'} mb-4 line-clamp-2`}>
                {lesson.description}
              </p>
              
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center space-x-2">
                  <span className={`transition-colors duration-200 ${isDarkMode ? 'text-primary-400' : 'text-primary-500'}`}>⭐ {lesson.xpReward} XP</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className={`transition-colors duration-200 ${isDarkMode ? 'text-primary-400' : 'text-primary-500'}`}>👥 {lesson.options} options</span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Lesson Modal */}
        {showLessonModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
            onClick={() => setShowLessonModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className={`rounded-lg p-4 sm:p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto transition-colors duration-200 ${
                isDarkMode ? 'bg-primary-800 border border-primary-700' : 'bg-white border border-primary-200'
              }`}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className={`text-lg font-semibold transition-colors duration-200 ${isDarkMode ? 'text-primary-100' : 'text-primary-900'}`}>
                  {selectedLesson ? 'Edit Lesson' : 'Add New Lesson'}
                </h3>
                <button
                  onClick={() => setShowLessonModal(false)}
                  className={`transition-colors duration-200 ${isDarkMode ? 'text-primary-400 hover:text-primary-100' : 'text-primary-600 hover:text-primary-900'}`}
                >
                  ✕
                </button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className={`block text-sm font-medium mb-2 transition-colors duration-200 ${isDarkMode ? 'text-primary-300' : 'text-primary-700'}`}>Title</label>
                  <input
                    type="text"
                    defaultValue={selectedLesson?.title || ''}
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-accent-500 focus:border-transparent transition-colors duration-200 ${
                      isDarkMode 
                        ? 'bg-primary-700 border-primary-600 text-primary-100 placeholder-primary-400' 
                        : 'border-primary-200 text-primary-900 placeholder-primary-500'
                    }`}
                    placeholder="Enter lesson title"
                  />
                </div>
                
                <div>
                  <label className={`block text-sm font-medium mb-2 transition-colors duration-200 ${isDarkMode ? 'text-primary-300' : 'text-primary-700'}`}>Description</label>
                  <textarea
                    defaultValue={selectedLesson?.description || ''}
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-accent-500 focus:border-transparent transition-colors duration-200 ${
                      isDarkMode 
                        ? 'bg-primary-700 border-primary-600 text-primary-100 placeholder-primary-400' 
                        : 'border-primary-200 text-primary-900 placeholder-primary-500'
                    }`}
                    rows={3}
                    placeholder="Enter lesson description"
                  />
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className={`block text-sm font-medium mb-2 transition-colors duration-200 ${isDarkMode ? 'text-primary-300' : 'text-primary-700'}`}>Status</label>
                    <select
                      defaultValue={selectedLesson?.status || 'free'}
                      className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-accent-500 focus:border-transparent transition-colors duration-200 ${
                        isDarkMode 
                          ? 'bg-primary-700 border-primary-600 text-primary-100' 
                          : 'border-primary-200 text-primary-900'
                      }`}
                    >
                      <option value="free">Free</option>
                      <option value="premium">Premium</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className={`block text-sm font-medium mb-2 transition-colors duration-200 ${isDarkMode ? 'text-primary-300' : 'text-primary-700'}`}>XP Reward</label>
                    <input
                      type="number"
                      defaultValue={selectedLesson?.xpReward || 10}
                      className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-accent-500 focus:border-transparent transition-colors duration-200 ${
                        isDarkMode 
                          ? 'bg-primary-700 border-primary-600 text-primary-100' 
                          : 'border-primary-200 text-primary-900'
                      }`}
                    />
                  </div>
                </div>
                
                <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3">
                  <button
                    onClick={() => setShowLessonModal(false)}
                    className="flex-1 px-4 py-2 bg-accent-500 text-white rounded-lg hover:bg-accent-600 transition-colors"
                  >
                    {selectedLesson ? 'Update Lesson' : 'Create Lesson'}
                  </button>
                  <button
                    onClick={() => setShowLessonModal(false)}
                    className="px-4 py-2 border border-primary-200 text-primary-700 rounded-lg hover:bg-primary-50 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </div>
    </div>
  )
} 
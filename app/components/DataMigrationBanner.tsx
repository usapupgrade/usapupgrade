'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Download, CheckCircle, AlertCircle, X } from 'lucide-react'
import { DataMigration } from '@/lib/migration'
import { toast } from 'sonner'

export default function DataMigrationBanner() {
  const [showBanner, setShowBanner] = useState(false)
  const [migrating, setMigrating] = useState(false)
  const [migrationStatus, setMigrationStatus] = useState<{
    hasLocalData: boolean
    dataSize: number
    estimatedTime: string
  } | null>(null)

  useEffect(() => {
    // Check if migration is needed
    const needsMigration = DataMigration.needsMigration()
    if (needsMigration) {
      const status = DataMigration.getMigrationStatus()
      setMigrationStatus(status)
      setShowBanner(true)
    }
  }, [])

  const handleMigration = async () => {
    setMigrating(true)
    toast.loading('Migrating your data to the cloud...')

    try {
      const result = await DataMigration.migrateFromLocalStorage()
      
      if (result.success) {
        toast.dismiss()
        toast.success('Data migrated successfully! Your progress is now saved in the cloud.')
        setShowBanner(false)
      } else {
        toast.dismiss()
        toast.error(result.error || 'Migration failed. Please try again.')
      }
    } catch (error) {
      toast.dismiss()
      toast.error('An unexpected error occurred during migration.')
    } finally {
      setMigrating(false)
    }
  }

  const handleDismiss = () => {
    setShowBanner(false)
  }

  if (!showBanner || !migrationStatus) {
    return null
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -50 }}
        className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg"
      >
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Download className="w-5 h-5" />
              <div>
                <h3 className="font-semibold text-sm">
                  Migrate Your Data to the Cloud
                </h3>
                <p className="text-xs opacity-90">
                  We found {migrationStatus.dataSize} bytes of local data. 
                  Estimated time: {migrationStatus.estimatedTime}
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <button
                onClick={handleMigration}
                disabled={migrating}
                className="px-4 py-2 bg-white text-blue-600 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
              >
                {migrating ? (
                  <>
                    <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
                    <span>Migrating...</span>
                  </>
                ) : (
                  <>
                    <CheckCircle className="w-4 h-4" />
                    <span>Migrate Now</span>
                  </>
                )}
              </button>
              
              <button
                onClick={handleDismiss}
                className="p-2 hover:bg-white hover:bg-opacity-10 rounded-lg transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  )
} 
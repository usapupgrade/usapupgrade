'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Share2, Star, Trophy, Flame, Target, Heart, Brain } from 'lucide-react'
import Confetti from 'react-confetti'
import { toast } from 'sonner'

interface Achievement {
  id: string
  title: string
  description: string
  icon: string
  rarity: 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary'
  xpReward: number
  category: string
}

interface AchievementUnlockProps {
  achievement: Achievement | null
  onClose: () => void
}

const rarityColors = {
  common: 'bg-gray-100 text-gray-800',
  uncommon: 'bg-green-100 text-green-800',
  rare: 'bg-blue-100 text-blue-800',
  epic: 'bg-purple-100 text-purple-800',
  legendary: 'bg-yellow-100 text-yellow-800'
}

const rarityIcons = {
  common: Star,
  uncommon: Star,
  rare: Trophy,
  epic: Flame,
  legendary: Target
}

const categoryIcons = {
  conversation: Heart,
  streak: Flame,
  learning: Target,
  social: Brain,
  mastery: Trophy
}

export default function AchievementUnlock({ achievement, onClose }: AchievementUnlockProps) {
  const [showConfetti, setShowConfetti] = useState(false)
  const [isSharing, setIsSharing] = useState(false)

  useEffect(() => {
    if (achievement) {
      setShowConfetti(true)
      // Play achievement sound (in real app, use Web Audio API)
      const audio = new Audio('/sounds/achievement.mp3')
      audio.play().catch(() => {
        // Fallback if audio fails
        console.log('Achievement unlocked!')
      })
      
      setTimeout(() => setShowConfetti(false), 3000)
    }
  }, [achievement])

  const handleShare = async () => {
    if (!achievement) return
    
    setIsSharing(true)
    
    try {
      if (navigator.share) {
        await navigator.share({
          title: `I just unlocked "${achievement.title}" in ConvoMaster!`,
          text: `🎉 ${achievement.description} +${achievement.xpReward} XP`,
          url: 'https://convomaster.app'
        })
      } else {
        // Fallback for browsers without Web Share API
        await navigator.clipboard.writeText(
          `🎉 I just unlocked "${achievement.title}" in ConvoMaster! ${achievement.description} +${achievement.xpReward} XP`
        )
        toast.success('Achievement copied to clipboard!')
      }
    } catch (error) {
      console.error('Error sharing achievement:', error)
      toast.error('Failed to share achievement')
    } finally {
      setIsSharing(false)
    }
  }

  if (!achievement) return null

  const RarityIcon = rarityIcons[achievement.rarity]
  const CategoryIcon = categoryIcons[achievement.category as keyof typeof categoryIcons] || Star

  return (
    <>
      {showConfetti && <Confetti />}
      
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Achievement Content */}
            <div className="text-center">
              {/* Rarity Badge */}
              <div className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium mb-4 ${rarityColors[achievement.rarity]}`}>
                <RarityIcon className="w-4 h-4 mr-1" />
                {achievement.rarity.charAt(0).toUpperCase() + achievement.rarity.slice(1)}
              </div>

              {/* Achievement Icon */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", damping: 15 }}
                className="text-6xl mb-4"
              >
                {achievement.icon}
              </motion.div>

              {/* Achievement Title */}
              <motion.h2
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-2xl font-bold text-gray-900 mb-2"
              >
                {achievement.title}
              </motion.h2>

              {/* Achievement Description */}
              <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="text-gray-600 mb-6"
              >
                {achievement.description}
              </motion.p>

              {/* XP Reward */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="flex items-center justify-center space-x-2 mb-6"
              >
                <CategoryIcon className="w-5 h-5 text-accent-500" />
                <span className="text-lg font-semibold text-accent-600">
                  +{achievement.xpReward} XP
                </span>
              </motion.div>

              {/* Action Buttons */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="flex space-x-3"
              >
                <button
                  onClick={handleShare}
                  disabled={isSharing}
                  className="flex-1 bg-accent-500 text-white py-3 px-4 rounded-lg font-medium hover:bg-accent-600 transition-colors disabled:opacity-50"
                >
                  {isSharing ? (
                    <div className="flex items-center justify-center">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                      Sharing...
                    </div>
                  ) : (
                    <div className="flex items-center justify-center">
                      <Share2 className="w-4 h-4 mr-2" />
                      Share
                    </div>
                  )}
                </button>
                
                <button
                  onClick={onClose}
                  className="flex-1 bg-gray-100 text-gray-700 py-3 px-4 rounded-lg font-medium hover:bg-gray-200 transition-colors"
                >
                  Continue
                </button>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </AnimatePresence>
    </>
  )
} 
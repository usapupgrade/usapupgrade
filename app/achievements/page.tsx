'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, Search, Shield, Lock, Star, Target, Trophy, Crown, Users, Calendar, Building, Globe, Award, Zap, MessageSquare, Headphones, ShoppingBag, Car, Share2 } from 'lucide-react'
import NotificationBell from '../components/NotificationBell'
import { useUser } from '../providers'
import { achievements, calculateAchievementProgress } from '../data/achievements'

export default function AchievementsPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedRarity, setSelectedRarity] = useState('All Rarities')
  const [shareModal, setShareModal] = useState<{ open: boolean, achievement: any | null, anchor: { x: number, y: number } | null }>({ open: false, achievement: null, anchor: null })
  const { user } = useUser()

  // Real user progress data based on actual user data
  const userProgress = {
    unlocked: user?.completed_lessons?.length || 0,
    locked: achievements.length - (user?.completed_lessons?.length || 0),
    totalXP: user?.total_xp || 0,
    completion: user?.completed_lessons?.length ? Math.round((user.completed_lessons.length / 120) * 100) : 0
  }

  // Calculate real achievement progress based on user's actual progress
  const calculateRealAchievementProgress = (achievementId: string) => {
    const completedLessons = user?.completed_lessons || []
    const totalXP = user?.total_xp || 0
    const streak = user?.current_streak || 0
    
    switch (achievementId) {
      case 'first-lesson':
        return { 
          progress: completedLessons.length > 0 ? 100 : 0, 
          isUnlocked: completedLessons.length > 0 
        }
      
      case 'week-warrior':
        return { 
          progress: Math.min((streak / 7) * 100, 100), 
          isUnlocked: streak >= 7 
        }
      
      case 'month-master':
        return { 
          progress: Math.min((streak / 30) * 100, 100), 
          isUnlocked: streak >= 30 
        }
      
      case 'legend-status':
        return { 
          progress: Math.min((streak / 100) * 100, 100), 
          isUnlocked: streak >= 100 
        }

      case 'conversation-scholar':
        const foundationProgress = completedLessons.filter(l => l <= 30).length
        return { 
          progress: Math.min((foundationProgress / 30) * 100, 100), 
          isUnlocked: foundationProgress >= 30 
        }

      case 'elevator-expert':
        const smallTalkProgress = completedLessons.filter(l => l >= 1 && l <= 15).length
        return { 
          progress: Math.min((smallTalkProgress / 15) * 100, 100), 
          isUnlocked: smallTalkProgress >= 15 
        }

      case 'client-champion':
        const clientProgress = completedLessons.filter(l => l >= 31 && l <= 60).length
        return { 
          progress: Math.min((clientProgress / 30) * 100, 100), 
          isUnlocked: clientProgress >= 30 
        }

      case 'conflict-resolver':
        const conflictProgress = completedLessons.filter(l => l >= 91 && l <= 120).length
        return { 
          progress: Math.min((conflictProgress / 30) * 100, 100), 
          isUnlocked: conflictProgress >= 30 
        }

      case 'leadership-communicator':
        const leadershipProgress = completedLessons.filter(l => l >= 61 && l <= 90).length
        return { 
          progress: Math.min((leadershipProgress / 30) * 100, 100), 
          isUnlocked: leadershipProgress >= 30 
        }

      case 'promotion-ready':
        const promotionProgress = completedLessons.filter(l => l >= 61 && l <= 120).length
        return { 
          progress: Math.min((promotionProgress / 60) * 100, 100), 
          isUnlocked: promotionProgress >= 60 
        }

      case 'meeting-master':
        const meetingProgress = completedLessons.filter(l => l >= 31 && l <= 90).length
        return { 
          progress: Math.min((meetingProgress / 60) * 100, 100), 
          isUnlocked: meetingProgress >= 60 
        }

      case 'salary-negotiator':
        const negotiationProgress = completedLessons.filter(l => l >= 91 && l <= 120).length
        return { 
          progress: Math.min((negotiationProgress / 30) * 100, 100), 
          isUnlocked: negotiationProgress >= 30 
        }

      case 'workplace-mentor':
        const mentorProgress = completedLessons.filter(l => l >= 61 && l <= 120).length
        return { 
          progress: Math.min((mentorProgress / 60) * 100, 100), 
          isUnlocked: mentorProgress >= 60 
        }

      // Additional achievements that were missing
      case 'professional-expert':
        const expertProgress = completedLessons.length
        return { 
          progress: Math.min((expertProgress / 120) * 100, 100), 
          isUnlocked: expertProgress >= 120 
        }

      case 'pakikipagkapwa-master':
        const pakikipagkapwaProgress = completedLessons.filter(l => l >= 1 && l <= 30).length
        return { 
          progress: Math.min((pakikipagkapwaProgress / 30) * 100, 100), 
          isUnlocked: pakikipagkapwaProgress >= 30 
        }

      case 'bayanihan-builder':
        const bayanihanProgress = completedLessons.filter(l => l >= 31 && l <= 60).length
        return { 
          progress: Math.min((bayanihanProgress / 30) * 100, 100), 
          isUnlocked: bayanihanProgress >= 30 
        }

      case 'hiya-overcomer':
        const hiyaProgress = completedLessons.filter(l => l >= 1 && l <= 20).length
        return { 
          progress: Math.min((hiyaProgress / 20) * 100, 100), 
          isUnlocked: hiyaProgress >= 20 
        }

      case 'bpo-professional':
        const bpoProgress = completedLessons.filter(l => l >= 31 && l <= 50).length
        return { 
          progress: Math.min((bpoProgress / 20) * 100, 100), 
          isUnlocked: bpoProgress >= 20 
        }

      case 'ofw-communicator':
        const ofwProgress = completedLessons.filter(l => l >= 51 && l <= 80).length
        return { 
          progress: Math.min((ofwProgress / 30) * 100, 100), 
          isUnlocked: ofwProgress >= 30 
        }

      case 'jeepney-networker':
        const jeepneyProgress = completedLessons.filter(l => l >= 1 && l <= 15).length
        return { 
          progress: Math.min((jeepneyProgress / 15) * 100, 100), 
          isUnlocked: jeepneyProgress >= 15 
        }

      case 'mall-socializer':
        const mallProgress = completedLessons.filter(l => l >= 1 && l <= 10).length
        return { 
          progress: Math.min((mallProgress / 10) * 100, 100), 
          isUnlocked: mallProgress >= 10 
        }

      case 'family-diplomat':
        const familyProgress = completedLessons.filter(l => l >= 1 && l <= 25).length
        return { 
          progress: Math.min((familyProgress / 25) * 100, 100), 
          isUnlocked: familyProgress >= 25 
        }

      case 'community-connector':
        const communityProgress = completedLessons.filter(l => l >= 1 && l <= 40).length
        return { 
          progress: Math.min((communityProgress / 40) * 100, 100), 
          isUnlocked: communityProgress >= 40 
        }

      case 'conversation-evangelist':
        // This is social-based, so using total lessons as proxy
        const evangelistProgress = completedLessons.length
        return { 
          progress: Math.min((evangelistProgress / 50) * 100, 100), 
          isUnlocked: evangelistProgress >= 50 
        }

      default:
        return { progress: 0, isUnlocked: false }
    }
  }

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'legendary': return 'bg-orange-500 text-white'
      case 'epic': return 'bg-purple-500 text-white'
      case 'rare': return 'bg-blue-500 text-white'
      case 'uncommon': return 'bg-green-500 text-white'
      case 'common': return 'bg-gray-500 text-white'
      default: return 'bg-gray-500 text-white'
    }
  }

  const getIconColor = (rarity: string) => {
    switch (rarity) {
      case 'legendary': return 'text-orange-600'
      case 'epic': return 'text-purple-600'
      case 'rare': return 'text-blue-600'
      case 'uncommon': return 'text-green-600'
      case 'common': return 'text-gray-600'
      default: return 'text-gray-600'
    }
  }

  const handleShare = (achievement: any, event?: React.MouseEvent) => {
    if (event) {
      const rect = (event.target as HTMLElement).getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const modalHeight = 200; // Approximate modal height
      
      // Position above the button if there's not enough space below
      let y = rect.bottom + 10;
      if (rect.bottom + modalHeight > viewportHeight) {
        y = rect.top - modalHeight - 10;
      }
      
      setShareModal({ open: true, achievement, anchor: { x: rect.left, y } });
    }
  }

  const handleSharePlatform = (platform: string, achievement: any) => {
    const text = `🎉 I just unlocked "${achievement.title}" in UsapUpgrade! ${achievement.description} #UsapUpgrade #ProfessionalSkills`;
    const url = window.location.origin;
    let shareUrl = '';
    if (platform === 'facebook') {
      shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}&quote=${encodeURIComponent(text)}`;
    } else if (platform === 'twitter') {
      shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`;
    } else if (platform === 'instagram') {
      // Instagram does not support direct web sharing, so show a message
      alert('Instagram sharing is only available via the Instagram app.');
      return;
    } else if (platform === 'tiktok') {
      // TikTok does not support direct web sharing, so show a message
      alert('TikTok sharing is only available via the TikTok app.');
      return;
    }
    if (shareUrl) window.open(shareUrl, '_blank');
    setShareModal({ open: false, achievement: null, anchor: null });
  }

  const getProgressText = (achievementId: string, progress: number) => {
    const completedLessons = user?.completed_lessons || []
    const streak = user?.current_streak || 0
    
    switch (achievementId) {
      case 'first-lesson':
        return completedLessons.length > 0 ? '1/1 lesson' : '0/1 lesson'
      case 'week-warrior':
        return `${Math.min(streak, 7)}/7 days`
      case 'month-master':
        return `${Math.min(streak, 30)}/30 days`
      case 'legend-status':
        return `${Math.min(streak, 100)}/100 days`
      case 'conversation-scholar':
        const foundationProgress = completedLessons.filter(l => l <= 30).length
        return `${foundationProgress}/30 lessons`
      case 'elevator-expert':
        const smallTalkProgress = completedLessons.filter(l => l >= 1 && l <= 15).length
        return `${smallTalkProgress}/15 lessons`
      case 'client-champion':
        const clientProgress = completedLessons.filter(l => l >= 31 && l <= 60).length
        return `${clientProgress}/30 lessons`
      case 'conflict-resolver':
        const conflictProgress = completedLessons.filter(l => l >= 91 && l <= 120).length
        return `${conflictProgress}/30 lessons`
      case 'leadership-communicator':
        const leadershipProgress = completedLessons.filter(l => l >= 61 && l <= 90).length
        return `${leadershipProgress}/30 lessons`
      case 'promotion-ready':
        const promotionProgress = completedLessons.filter(l => l >= 61 && l <= 120).length
        return `${promotionProgress}/60 lessons`
      case 'meeting-master':
        const meetingProgress = completedLessons.filter(l => l >= 31 && l <= 90).length
        return `${meetingProgress}/60 lessons`
      case 'salary-negotiator':
        const negotiationProgress = completedLessons.filter(l => l >= 91 && l <= 120).length
        return `${negotiationProgress}/30 lessons`
      case 'workplace-mentor':
        const mentorProgress = completedLessons.filter(l => l >= 61 && l <= 120).length
        return `${mentorProgress}/60 lessons`
      default:
        return '0/1'
    }
  }

  const filteredAchievements = achievements.filter(achievement => {
    const matchesSearch = achievement.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         achievement.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesRarity = selectedRarity === 'All Rarities' || achievement.rarity === selectedRarity
    return matchesSearch && matchesRarity
  })

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">UU</span>
              </div>
                              <span className="text-lg sm:text-xl font-bold text-gray-900">UsapUpgrade</span>
            </div>
            <div className="flex items-center space-x-3">
              <NotificationBell />
              <Link 
                href="/dashboard"
                className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 sm:px-4 py-2 rounded-lg transition-colors flex items-center text-sm sm:text-base"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                <span className="hidden sm:inline">Back to Dashboard</span>
                <span className="sm:hidden">Back</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {/* Page Title */}
        <div className="text-center mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Achievements</h1>
          <p className="text-sm sm:text-base text-gray-600">Track your progress and unlock conversation mastery badges</p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs sm:text-sm text-gray-600">Unlocked</p>
                <p className="text-xl sm:text-2xl font-bold text-gray-900">{userProgress.unlocked}</p>
              </div>
              <Shield className="w-6 h-6 sm:w-8 sm:h-8 text-orange-500" />
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs sm:text-sm text-gray-600">Locked</p>
                <p className="text-xl sm:text-2xl font-bold text-gray-900">{userProgress.locked}</p>
              </div>
              <Lock className="w-6 h-6 sm:w-8 sm:h-8 text-purple-500" />
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs sm:text-sm text-gray-600">Total XP</p>
                <p className="text-xl sm:text-2xl font-bold text-gray-900">{userProgress.totalXP}</p>
              </div>
              <Star className="w-6 h-6 sm:w-8 sm:h-8 text-green-500" />
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs sm:text-sm text-gray-600">Completion</p>
                <p className="text-xl sm:text-2xl font-bold text-gray-900">{userProgress.completion}%</p>
              </div>
              <Target className="w-6 h-6 sm:w-8 sm:h-8 text-blue-500" />
            </div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6 mb-6 sm:mb-8">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 sm:w-5 sm:h-5" />
                <input
                  type="text"
                  placeholder="Search achievements..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
                />
              </div>
            </div>
            <div className="flex gap-4">
              <select
                value={selectedRarity}
                onChange={(e) => setSelectedRarity(e.target.value)}
                className="px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base bg-white text-gray-900"
              >
                <option className="text-gray-900">All Rarities</option>
                <option className="text-gray-900">Legendary</option>
                <option className="text-gray-900">Epic</option>
                <option className="text-gray-900">Rare</option>
                <option className="text-gray-900">Uncommon</option>
                <option className="text-gray-900">Common</option>
              </select>
            </div>
          </div>
        </div>

        {/* Achievements Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
          {filteredAchievements.map((achievement) => {
            const progress = calculateRealAchievementProgress(achievement.id)
            const isUnlocked = progress.isUnlocked
            
            return (
              <div key={achievement.id} className={`bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6 transition-all duration-200 hover:shadow-md ${isUnlocked ? 'ring-2 ring-green-200' : ''}`}>
                <div className="flex items-start justify-between mb-3 sm:mb-4">
                  <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-lg flex items-center justify-center ${isUnlocked ? 'bg-green-100' : 'bg-gray-100'}`}>
                                         <span className={`text-2xl ${isUnlocked ? 'text-green-600' : getIconColor(achievement.rarity)}`}>
                       {achievement.icon}
                     </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className={`text-xs px-2 py-1 rounded-full ${getRarityColor(achievement.rarity)}`}>
                      {achievement.rarity}
                    </span>
                  </div>
                </div>
                
                <h3 className="font-bold text-gray-900 mb-2 text-sm sm:text-base">{achievement.title}</h3>
                <p className="text-xs sm:text-sm text-gray-600 mb-3 sm:mb-4 leading-relaxed">{achievement.description}</p>
                
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs sm:text-sm font-semibold text-green-600">+{achievement.xpReward} XP</span>
                  <div className="flex items-center space-x-2">
                    {isUnlocked && (
                      <span className="text-xs text-green-600 font-semibold">✓ UNLOCKED</span>
                    )}
                    {isUnlocked && (
                      <button
                        onClick={(e) => handleShare(achievement, e)}
                        className="text-blue-600 hover:text-blue-700 transition-colors"
                        title="Share achievement"
                        type="button"
                      >
                        <Share2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>
                
                {/* Progress Bar */}
                <div className="mt-3">
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full transition-all duration-300 ${isUnlocked ? 'bg-green-500' : 'bg-blue-500'}`}
                      style={{ width: `${progress.progress}%` }}
                    ></div>
                  </div>
                  <div className="flex items-center justify-between mt-1">
                    <p className="text-xs text-gray-500">
                      {isUnlocked ? 'Completed!' : `${progress.progress}% complete`}
                    </p>
                    {!isUnlocked && progress.progress > 0 && (
                      <p className="text-xs text-gray-400">
                        {getProgressText(achievement.id, progress.progress)}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
      {/* Share Modal */}
      {shareModal.open && shareModal.achievement && (
        <div
          className="fixed z-50 left-0 top-0 w-full h-full bg-black bg-opacity-20"
          onClick={() => setShareModal({ open: false, achievement: null, anchor: null })}
        >
          <div
            className="bg-white rounded-xl shadow-lg p-4 sm:p-6 flex flex-col items-center min-w-[220px] absolute"
            style={{ 
              left: `${shareModal.anchor?.x ?? 50}px`, 
              top: `${shareModal.anchor?.y ?? 50}px`,
              transform: 'translateX(-50%)'
            }}
            onClick={e => e.stopPropagation()}
          >
            <div className="font-bold mb-2 text-sm sm:text-base">Share to...</div>
            <div className="flex gap-4 mb-2">
              <button onClick={() => handleSharePlatform('facebook', shareModal.achievement)} className="hover:bg-blue-100 p-2 rounded-full" title="Share to Facebook">
                <svg width="24" height="24" fill="currentColor" className="text-blue-600"><path d="M22 12c0-5.522-4.477-10-10-10S2 6.478 2 12c0 5 3.657 9.127 8.438 9.877v-6.987h-2.54v-2.89h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.261c-1.243 0-1.632.771-1.632 1.562v1.875h2.773l-.443 2.89h-2.33v6.987C18.343 21.127 22 17 22 12"/></svg>
              </button>
              <button onClick={() => handleSharePlatform('twitter', shareModal.achievement)} className="hover:bg-gray-100 p-2 rounded-full" title="Share to X (Twitter)">
                <svg width="24" height="24" fill="currentColor" className="text-gray-900">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </button>
              <button onClick={() => handleSharePlatform('instagram', shareModal.achievement)} className="hover:bg-pink-100 p-2 rounded-full" title="Share to Instagram">
                <svg width="24" height="24" fill="currentColor" className="text-pink-500">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.059 1.645-.07 4.849-.07zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </button>
              <button onClick={() => handleSharePlatform('tiktok', shareModal.achievement)} className="hover:bg-gray-100 p-2 rounded-full" title="Share to TikTok">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M16.6 5.82s.51.5 0 0A4.278 4.278 0 0 1 15.54 3h-3.09v12.4a2.592 2.592 0 0 1-2.59 2.5c-1.42 0-2.6-1.16-2.6-2.6c0-1.72 1.66-3.01 3.37-2.48V9.66c-3.45-.46-6.47 2.22-6.47 5.64c0 3.33 2.76 5.7 5.69 5.7c3.14 0 5.69-2.55 5.69-5.7V9.01a7.35 7.35 0 0 0 4.3 1.38V7.3s-1.88.09-3.24-1.48z" fill="#000000"/>
                </svg>
              </button>
            </div>
            <button className="text-xs text-gray-500 mt-2 hover:underline" onClick={() => setShareModal({ open: false, achievement: null, anchor: null })}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  )
} 
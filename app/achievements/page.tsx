'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, Search, Shield, Lock, Star, Target, Trophy, Crown, Users, Calendar, Building, Globe, Award, Zap, MessageSquare, Headphones, ShoppingBag, Car, Share2 } from 'lucide-react'
import NotificationBell from '../components/NotificationBell'
import { useUser } from '../providers'

export default function AchievementsPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedRarity, setSelectedRarity] = useState('All Rarities')
  const [shareModal, setShareModal] = useState<{ open: boolean, achievement: any | null, anchor: { x: number, y: number } | null }>({ open: false, achievement: null, anchor: null })
  const { user } = useUser()

  // Real user progress data based on actual user data
  const userProgress = {
    unlocked: user?.completed_lessons?.length || 0,
    locked: 24 - (user?.completed_lessons?.length || 0),
    totalXP: user?.total_xp || 0,
    completion: user?.completed_lessons?.length ? Math.round((user.completed_lessons.length / 24) * 100) : 0
  }

  // Real achievement progress based on user's actual progress
  const achievementProgress = {
    // Legendary (Hardest - Top) - Based on user's actual progress
    1: user?.current_streak ? Math.min(user.current_streak, 100) : 0, // Conversation Legend - based on streak
    2: user?.completed_lessons?.length ? Math.min(user.completed_lessons.length, 90) : 0, // Professional Expert - based on completed lessons
    3: 0, // Conflict Resolver - 0/10 scenarios
    
    // Epic (Hard - Upper) - Based on user's actual progress
    4: user?.completed_lessons?.length ? Math.min(user.completed_lessons.length, 20) : 0, // Leadership Communicator - based on completed lessons
    5: 0, // Promotion Ready - 0/15 scenarios
    6: user?.completed_lessons?.length ? Math.min(user.completed_lessons.length, 8) : 0, // Confident Communicator - based on completed lessons
    7: 0, // Workplace Mentor - 0/5 colleagues
    
    // Rare (Medium - Middle) - Based on user's actual progress
    8: user?.current_streak ? Math.min(user.current_streak, 30) : 0, // Monthly Master - based on streak
    9: 0, // Client Champion - 0/12 scenarios
    10: 0, // Pakikipagkapwa Master - 0/8 scenarios
    11: 0, // Bayanihan Builder - 0/5 colleagues
    12: 0, // OFW Communicator - 0/10 scenarios
    13: user?.completed_lessons?.length ? Math.min(user.completed_lessons.length, 15) : 0, // Meeting Master - based on completed lessons
    
    // Uncommon (Easier - Lower) - Based on user's actual progress
    14: 0, // Community Connector - 0/8 connections
    15: 0, // Conversation Evangelist - 0/3 shares
    16: user?.completed_lessons?.length ? Math.min(user.completed_lessons.length, 30) : 0, // Conversation Scholar - based on completed lessons
    17: user?.current_streak ? Math.min(user.current_streak, 7) : 0, // Weekly Warrior - based on streak
    18: user?.completed_lessons?.length ? Math.min(user.completed_lessons.length, 12) : 0, // Elevator Expert - based on completed lessons
    19: 0, // Hiya Overcomer - 0/8 conversations
    
    // Common (Easiest - Bottom) - Based on user's actual progress
    20: 0, // BPO Professional - 0/10 scenarios
    21: 0, // Family Diplomat - 0/5 conversations
    22: user?.completed_lessons?.length && user.completed_lessons.length > 0 ? 100 : 0, // Conversation Starter - COMPLETED if any lessons done
    23: 0, // Jeepney Networker - 0/8 scenarios
    24: 0, // Mall Socializer - 0/6 scenarios
  }

  const achievements = [
    // Legendary (Orange/Gold)
    {
      id: 1,
      title: 'Conversation Legend',
      description: 'Maintain a 100-day learning streak',
      xp: 1500,
      rarity: 'Legendary',
      icon: Shield,
      color: 'orange',
      unlocked: false,
      progress: 0
    },
    {
      id: 2,
      title: 'Professional Expert',
      description: 'Complete all 90 lessons in the course',
      xp: 1000,
      rarity: 'Legendary',
      icon: Building,
      color: 'orange',
      unlocked: false,
      progress: 0
    },
    {
      id: 3,
      title: 'Conflict Resolver',
      description: 'Master all workplace conflict resolution scenarios',
      xp: 800,
      rarity: 'Epic',
      icon: Shield,
      color: 'purple',
      unlocked: false,
      progress: 0
    },
    // Epic (Purple)
    {
      id: 4,
      title: 'Leadership Communicator',
      description: 'Complete all advanced leadership communication lessons',
      xp: 800,
      rarity: 'Epic',
      icon: Crown,
      color: 'purple',
      unlocked: false,
      progress: 0
    },
    {
      id: 5,
      title: 'Promotion Ready',
      description: 'Complete all leadership preparation scenarios',
      xp: 800,
      rarity: 'Epic',
      icon: Target,
      color: 'purple',
      unlocked: false,
      progress: 0
    },
    {
      id: 6,
      title: 'Confident Communicator',
      description: 'Successfully complete 8 professional conversation scenarios',
      xp: 800,
      rarity: 'Epic',
      icon: Award,
      color: 'purple',
      unlocked: false,
      progress: 0
    },
    {
      id: 7,
      title: 'Workplace Mentor',
      description: 'Help colleagues improve their conversation skills',
      xp: 500,
      rarity: 'Epic',
      icon: Users,
      color: 'purple',
      unlocked: false,
      progress: 0
    },
    // Rare (Blue)
    {
      id: 8,
      title: 'Monthly Master',
      description: 'Maintain a 30-day learning streak',
      xp: 500,
      rarity: 'Rare',
      icon: Calendar,
      color: 'blue',
      unlocked: false,
      progress: 0,
      isNew: true
    },
    {
      id: 9,
      title: 'Client Champion',
      description: 'Excel in all client relationship scenarios',
      xp: 500,
      rarity: 'Rare',
      icon: Users,
      color: 'blue',
      unlocked: false,
      progress: 0,
      isNew: true
    },
    {
      id: 10,
      title: 'Pakikipagkapwa Master',
      description: 'Excel in Filipino cultural conversation scenarios',
      xp: 300,
      rarity: 'Rare',
      icon: Users,
      color: 'blue',
      unlocked: false,
      progress: 0,
      isNew: true
    },
    {
      id: 11,
      title: 'Bayanihan Builder',
      description: 'Help colleagues and build community through conversations',
      xp: 300,
      rarity: 'Rare',
      icon: Building,
      color: 'blue',
      unlocked: false,
      progress: 0,
      isNew: true
    },
    {
      id: 12,
      title: 'OFW Communicator',
      description: 'Excel in cross-cultural professional conversations',
      xp: 300,
      rarity: 'Rare',
      icon: Globe,
      color: 'blue',
      unlocked: false,
      progress: 0,
      isNew: true
    },
    {
      id: 13,
      title: 'Meeting Master',
      description: 'Excel in all meeting and presentation scenarios',
      xp: 300,
      rarity: 'Rare',
      icon: MessageSquare,
      color: 'blue',
      unlocked: false,
      progress: 0,
      isNew: true
    },
    // Uncommon (Green)
    {
      id: 14,
      title: 'Community Connector',
      description: 'Build relationships across your local community',
      xp: 300,
      rarity: 'Uncommon',
      icon: Users,
      color: 'green',
      unlocked: false,
      progress: 0
    },
    {
      id: 15,
      title: 'Conversation Evangelist',
      description: 'Share your achievements and inspire others',
      xp: 200,
      rarity: 'Uncommon',
      icon: Star,
      color: 'green',
      unlocked: false,
      progress: 0
    },
    {
      id: 16,
      title: 'Conversation Scholar',
      description: 'Complete all foundation lessons with perfect scores',
      xp: 200,
      rarity: 'Uncommon',
      icon: Trophy,
      color: 'green',
      unlocked: false,
      progress: 0
    },
    {
      id: 17,
      title: 'Weekly Warrior',
      description: 'Maintain a 7-day learning streak',
      xp: 150,
      rarity: 'Uncommon',
      icon: Calendar,
      color: 'green',
      unlocked: false,
      progress: 0
    },
    {
      id: 18,
      title: 'Elevator Expert',
      description: 'Master all workplace small talk scenarios',
      xp: 200,
      rarity: 'Uncommon',
      icon: Target,
      color: 'green',
      unlocked: false,
      progress: 0
    },
    {
      id: 19,
      title: 'Hiya Overcomer',
      description: 'Confidently participate in challenging professional conversations',
      xp: 200,
      rarity: 'Uncommon',
      icon: Users,
      color: 'green',
      unlocked: false,
      progress: 0
    },
    // Common (Gray)
    {
      id: 20,
      title: 'BPO Professional',
      description: 'Master client service communication scenarios',
      xp: 150,
      rarity: 'Common',
      icon: Headphones,
      color: 'gray',
      unlocked: false,
      progress: 0
    },
    {
      id: 21,
      title: 'Family Diplomat',
      description: 'Navigate complex family conversations with skill',
      xp: 200,
      rarity: 'Common',
      icon: Users,
      color: 'gray',
      unlocked: false,
      progress: 0
    },
    {
      id: 22,
      title: 'Conversation Starter',
      description: 'Complete your first professional conversation lesson',
      xp: 50,
      rarity: 'Common',
      icon: MessageSquare,
      color: 'gray',
      unlocked: true,
      progress: 100
    },
    {
      id: 23,
      title: 'Jeepney Networker',
      description: 'Master daily commute conversation opportunities',
      xp: 100,
      rarity: 'Common',
      icon: Car,
      color: 'gray',
      unlocked: false,
      progress: 0
    },
    {
      id: 24,
      title: 'Mall Socializer',
      description: 'Excel in casual Filipino social settings',
      xp: 150,
      rarity: 'Common',
      icon: ShoppingBag,
      color: 'gray',
      unlocked: false,
      progress: 0
    }
  ]

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'Legendary': return 'bg-orange-500 text-white'
      case 'Epic': return 'bg-purple-500 text-white'
      case 'Rare': return 'bg-blue-500 text-white'
      case 'Uncommon': return 'bg-green-500 text-white'
      case 'Common': return 'bg-gray-500 text-white'
      default: return 'bg-gray-500 text-white'
    }
  }

  const getIconColor = (color: string) => {
    switch (color) {
      case 'orange': return 'text-orange-600'
      case 'purple': return 'text-purple-600'
      case 'blue': return 'text-blue-600'
      case 'green': return 'text-green-600'
      case 'gray': return 'text-gray-600'
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

  const getProgressText = (achievementId: number, progress: number) => {
    const progressData: { [key: number]: { current: number, total: number, unit: string } } = {
      1: { current: Math.floor(progress * 1), total: 100, unit: 'days' },
      2: { current: Math.floor(progress * 0.9), total: 90, unit: 'lessons' },
      3: { current: Math.floor(progress * 0.1), total: 10, unit: 'scenarios' },
      4: { current: Math.floor(progress * 0.2), total: 20, unit: 'lessons' },
      5: { current: Math.floor(progress * 0.15), total: 15, unit: 'scenarios' },
      6: { current: Math.floor(progress * 0.08), total: 8, unit: 'scenarios' },
      7: { current: Math.floor(progress * 0.05), total: 5, unit: 'colleagues' },
      8: { current: Math.floor(progress * 0.3), total: 30, unit: 'days' },
      9: { current: Math.floor(progress * 0.12), total: 12, unit: 'scenarios' },
      10: { current: Math.floor(progress * 0.08), total: 8, unit: 'scenarios' },
      11: { current: Math.floor(progress * 0.05), total: 5, unit: 'colleagues' },
      12: { current: Math.floor(progress * 0.1), total: 10, unit: 'scenarios' },
      13: { current: Math.floor(progress * 0.15), total: 15, unit: 'scenarios' },
      14: { current: Math.floor(progress * 0.08), total: 8, unit: 'connections' },
      15: { current: Math.floor(progress * 0.03), total: 3, unit: 'shares' },
      16: { current: Math.floor(progress * 0.3), total: 30, unit: 'lessons' },
      17: { current: Math.floor(progress * 0.07), total: 7, unit: 'days' },
      18: { current: Math.floor(progress * 0.12), total: 12, unit: 'scenarios' },
      19: { current: Math.floor(progress * 0.08), total: 8, unit: 'conversations' },
      20: { current: Math.floor(progress * 0.1), total: 10, unit: 'scenarios' },
      21: { current: Math.floor(progress * 0.05), total: 5, unit: 'conversations' },
      22: { current: 1, total: 1, unit: 'lesson' },
      23: { current: Math.floor(progress * 0.08), total: 8, unit: 'scenarios' },
      24: { current: Math.floor(progress * 0.06), total: 6, unit: 'scenarios' }
    }
    
    const data = progressData[achievementId]
    if (!data) return ''
    
    return `${data.current}/${data.total} ${data.unit}`
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
                className="px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
              >
                <option>All Rarities</option>
                <option>Legendary</option>
                <option>Epic</option>
                <option>Rare</option>
                <option>Uncommon</option>
                <option>Common</option>
              </select>
            </div>
          </div>
        </div>

        {/* Achievements Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
          {filteredAchievements.map((achievement) => {
            const Icon = achievement.icon
            const progress = achievementProgress[achievement.id as keyof typeof achievementProgress] || 0
            const isUnlocked = achievement.unlocked || progress === 100
            
            return (
              <div key={achievement.id} className={`bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6 transition-all duration-200 hover:shadow-md ${isUnlocked ? 'ring-2 ring-green-200' : ''}`}>
                <div className="flex items-start justify-between mb-3 sm:mb-4">
                  <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-lg flex items-center justify-center ${isUnlocked ? 'bg-green-100' : 'bg-gray-100'}`}>
                    <Icon className={`w-5 h-5 sm:w-6 sm:h-6 ${isUnlocked ? 'text-green-600' : getIconColor(achievement.color)}`} />
                  </div>
                  <div className="flex items-center space-x-2">
                    {achievement.isNew && (
                      <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">new</span>
                    )}
                    <span className={`text-xs px-2 py-1 rounded-full ${getRarityColor(achievement.rarity)}`}>
                      {achievement.rarity}
                    </span>
                  </div>
                </div>
                
                <h3 className="font-bold text-gray-900 mb-2 text-sm sm:text-base">{achievement.title}</h3>
                <p className="text-xs sm:text-sm text-gray-600 mb-3 sm:mb-4 leading-relaxed">{achievement.description}</p>
                
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs sm:text-sm font-semibold text-green-600">+{achievement.xp} XP</span>
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
                      style={{ width: `${progress}%` }}
                    ></div>
                  </div>
                  <div className="flex items-center justify-between mt-1">
                    <p className="text-xs text-gray-500">
                      {isUnlocked ? 'Completed!' : `${progress}% complete`}
                    </p>
                    {!isUnlocked && progress > 0 && (
                      <p className="text-xs text-gray-400">
                        {getProgressText(achievement.id, progress)}
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
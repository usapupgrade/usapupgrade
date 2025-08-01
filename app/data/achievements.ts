import { getCurrentLesson, getCompletedLessons, getTotalXP, getStreak } from './categoryProgress'

export interface Achievement {
  id: string
  title: string
  description: string
  icon: string
  rarity: 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary'
  category: 'streak' | 'skill' | 'cultural' | 'professional' | 'social' | 'leadership'
  xpReward: number
  unlockCondition: string
  tips: string
  cultural_context?: string
}

export const achievements: Achievement[] = [
  // STREAK ACHIEVEMENTS - Building Daily Habits
  {
    id: 'first-lesson',
    title: 'Conversation Starter',
    description: 'Complete your first professional conversation lesson',
    icon: '🌟',
    rarity: 'common',
    category: 'streak',
    xpReward: 50,
    unlockCondition: 'Complete any lesson',
    tips: 'Every expert was once a beginner. You\'ve taken the first step toward professional conversation mastery!',
    cultural_context: 'In Filipino culture, taking the first step shows "lakas ng loob" (courage)'
  },
  {
    id: 'week-warrior',
    title: 'Weekly Warrior',
    description: 'Maintain a 7-day learning streak',
    icon: '🔥',
    rarity: 'uncommon',
    category: 'streak',
    xpReward: 150,
    unlockCondition: 'Complete lessons for 7 consecutive days',
    tips: 'Consistency beats perfection. Small daily progress leads to big professional growth.',
    cultural_context: 'Filipino work ethic values "sipag at tiyaga" (diligence and perseverance)'
  },
  {
    id: 'month-master',
    title: 'Monthly Master',
    description: 'Maintain a 30-day learning streak',
    icon: '📅',
    rarity: 'rare',
    category: 'streak',
    xpReward: 500,
    unlockCondition: 'Complete lessons for 30 consecutive days',
    tips: 'You\'ve built a habit that will transform your professional conversations for life.',
    cultural_context: 'This level of dedication reflects the Filipino value of "determinasyon"'
  },
  {
    id: 'legend-status',
    title: 'Conversation Legend',
    description: 'Maintain a 100-day learning streak',
    icon: '👑',
    rarity: 'legendary',
    category: 'streak',
    xpReward: 1500,
    unlockCondition: 'Complete lessons for 100 consecutive days',
    tips: 'You are now a conversation master. Your dedication inspires others to grow.',
    cultural_context: 'Achieving this shows the ultimate Filipino trait of "kaya ko" (I can do it)'
  },

  // PROFESSIONAL SKILL ACHIEVEMENTS
  {
    id: 'elevator-expert',
    title: 'Elevator Expert',
    description: 'Master all workplace small talk scenarios',
    icon: '🏢',
    rarity: 'uncommon',
    category: 'professional',
    xpReward: 200,
    unlockCondition: 'Complete all small talk lessons with 90%+ accuracy',
    tips: 'You can now confidently start conversations in any workplace setting.',
    cultural_context: 'Perfect for navigating hierarchical Filipino workplaces with confidence and respect'
  },
  {
    id: 'client-champion',
    title: 'Client Champion',
    description: 'Excel in all client relationship scenarios',
    icon: '🤝',
    rarity: 'rare',
    category: 'professional',
    xpReward: 350,
    unlockCondition: 'Complete all professional lessons with 95%+ accuracy',
    tips: 'Your client communication skills are now world-class. You can build lasting professional relationships.',
    cultural_context: 'Essential for OFWs and BPO professionals representing the Philippines globally'
  },
  {
    id: 'conflict-resolver',
    title: 'Conflict Resolver',
    description: 'Master all workplace conflict resolution scenarios',
    icon: '⚖️',
    rarity: 'epic',
    category: 'professional',
    xpReward: 400,
    unlockCondition: 'Complete all conflict resolution lessons with perfect scores',
    tips: 'You can now handle difficult conversations with grace and professionalism.',
    cultural_context: 'Balances Filipino harmony values with professional assertiveness'
  },
  {
    id: 'leadership-communicator',
    title: 'Leadership Communicator',
    description: 'Complete all advanced leadership communication lessons',
    icon: '🎯',
    rarity: 'epic',
    category: 'leadership',
    xpReward: 500,
    unlockCondition: 'Complete all advanced lessons with 90%+ accuracy',
    tips: 'You have the communication skills to lead teams and inspire others.',
    cultural_context: 'Ready to be a "bayani" (hero) in your workplace and community'
  },

  // FILIPINO CULTURAL ACHIEVEMENTS
  {
    id: 'pakikipagkapwa-master',
    title: 'Pakikipagkapwa Master',
    description: 'Excel in Filipino cultural conversation scenarios',
    icon: '🇵🇭',
    rarity: 'rare',
    category: 'cultural',
    xpReward: 300,
    unlockCondition: 'Complete cultural context scenarios with 95%+ accuracy',
    tips: 'You perfectly balance Filipino values with professional communication.',
    cultural_context: 'Demonstrates mastery of "pakikipagkapwa" - shared identity and connection'
  },
  {
    id: 'bayanihan-builder',
    title: 'Bayanihan Builder',
    description: 'Help colleagues and build community through conversations',
    icon: '🏘️',
    rarity: 'rare',
    category: 'cultural',
    xpReward: 250,
    unlockCondition: 'Complete community-focused conversation scenarios',
    tips: 'Your conversations build bridges and strengthen workplace relationships.',
    cultural_context: 'Embodies the Filipino spirit of "bayanihan" - community cooperation'
  },
  {
    id: 'hiya-overcomer',
    title: 'Hiya Overcomer',
    description: 'Confidently participate in challenging professional conversations',
    icon: '💪',
    rarity: 'uncommon',
    category: 'cultural',
    xpReward: 200,
    unlockCondition: 'Successfully complete difficult conversation scenarios',
    tips: 'You\'ve learned to balance humility with confidence in professional settings.',
    cultural_context: 'Shows ability to overcome "hiya" (shyness) while maintaining Filipino respect'
  },

  // WORKPLACE ACHIEVEMENTS
  {
    id: 'bpo-professional',
    title: 'BPO Professional',
    description: 'Master client service communication scenarios',
    icon: '🎧',
    rarity: 'uncommon',
    category: 'professional',
    xpReward: 250,
    unlockCondition: 'Complete all customer service conversation lessons',
    tips: 'Your communication skills are perfect for the global BPO industry.',
    cultural_context: 'Specifically designed for Filipino BPO professionals serving international clients'
  },
  {
    id: 'ofw-communicator',
    title: 'OFW Communicator',
    description: 'Excel in cross-cultural professional conversations',
    icon: '✈️',
    rarity: 'rare',
    category: 'professional',
    xpReward: 400,
    unlockCondition: 'Complete international workplace scenarios with high scores',
    tips: 'You can confidently represent Filipino professionalism anywhere in the world.',
    cultural_context: 'Perfect for Overseas Filipino Workers navigating international workplaces'
  },
  {
    id: 'jeepney-networker',
    title: 'Jeepney Networker',
    description: 'Master daily commute conversation opportunities',
    icon: '🚌',
    rarity: 'common',
    category: 'social',
    xpReward: 100,
    unlockCondition: 'Complete commute conversation scenarios',
    tips: 'You can turn daily commutes into networking opportunities.',
    cultural_context: 'Celebrates the uniquely Filipino experience of jeepney commuting and community building'
  },
  {
    id: 'mall-socializer',
    title: 'Mall Socializer',
    description: 'Excel in casual Filipino social settings',
    icon: '🏬',
    rarity: 'common',
    category: 'social',
    xpReward: 150,
    unlockCondition: 'Complete social settings conversation lessons',
    tips: 'You can confidently socialize in any Filipino gathering or event.',
    cultural_context: 'Perfect for navigating malls, markets, and social gatherings typical in Filipino culture'
  },

  // CAREER ADVANCEMENT ACHIEVEMENTS
  {
    id: 'promotion-ready',
    title: 'Promotion Ready',
    description: 'Complete all leadership preparation scenarios',
    icon: '📈',
    rarity: 'epic',
    category: 'leadership',
    xpReward: 600,
    unlockCondition: 'Complete advanced professional scenarios with perfect scores',
    tips: 'Your conversation skills demonstrate leadership potential. You\'re ready for the next level.',
    cultural_context: 'Shows readiness to move up in hierarchical Filipino workplace structures'
  },
  {
    id: 'meeting-master',
    title: 'Meeting Master',
    description: 'Excel in all meeting and presentation scenarios',
    icon: '📊',
    rarity: 'rare',
    category: 'professional',
    xpReward: 350,
    unlockCondition: 'Complete all meeting scenarios with 90%+ accuracy',
    tips: 'You can confidently lead meetings and presentations at any level.',
    cultural_context: 'Essential for advancing in corporate Filipino workplaces'
  },
  {
    id: 'salary-negotiator',
    title: 'Salary Negotiator',
    description: 'Master professional negotiation conversations',
    icon: '💰',
    rarity: 'epic',
    category: 'professional',
    xpReward: 500,
    unlockCondition: 'Complete negotiation scenarios with high confidence scores',
    tips: 'You can professionally advocate for your worth and career advancement.',
    cultural_context: 'Helps Filipino professionals overcome cultural hesitation about discussing compensation'
  },

  // SOCIAL ACHIEVEMENTS
  {
    id: 'family-diplomat',
    title: 'Family Diplomat',
    description: 'Navigate complex family conversations with skill',
    icon: '👨‍👩‍👧‍👦',
    rarity: 'uncommon',
    category: 'social',
    xpReward: 200,
    unlockCondition: 'Complete family conversation scenarios',
    tips: 'You can handle sensitive family discussions with wisdom and care.',
    cultural_context: 'Crucial for navigating close-knit Filipino family dynamics and expectations'
  },
  {
    id: 'community-connector',
    title: 'Community Connector',
    description: 'Build relationships across your local community',
    icon: '🤗',
    rarity: 'rare',
    category: 'social',
    xpReward: 300,
    unlockCondition: 'Complete community-building scenarios',
    tips: 'You naturally bring people together and strengthen community bonds.',
    cultural_context: 'Reflects the Filipino value of being active in your barangay and community'
  },

  // SHARING AND IMPACT ACHIEVEMENTS
  {
    id: 'conversation-evangelist',
    title: 'Conversation Evangelist',
    description: 'Share your achievements and inspire others',
    icon: '📢',
    rarity: 'rare',
    category: 'social',
    xpReward: 250,
    unlockCondition: 'Share 5 achievements on social media',
    tips: 'Your success inspires other Filipino professionals to improve their communication skills.',
    cultural_context: 'Shows the Filipino trait of helping others grow and succeed'
  },
  {
    id: 'workplace-mentor',
    title: 'Workplace Mentor',
    description: 'Help colleagues improve their conversation skills',
    icon: '🧭',
    rarity: 'epic',
    category: 'leadership',
    xpReward: 400,
    unlockCondition: 'Refer 5 colleagues to ConvoMaster',
    tips: 'You\'re not just improving yourself, you\'re elevating your entire workplace.',
    cultural_context: 'Embodies the Filipino tradition of "pagtulong" - helping others succeed'
  },

  // MASTERY ACHIEVEMENTS
  {
    id: 'conversation-scholar',
    title: 'Conversation Scholar',
    description: 'Complete all foundation lessons with perfect scores',
    icon: '📚',
    rarity: 'rare',
    category: 'skill',
    xpReward: 400,
    unlockCondition: 'Complete all 25 foundation lessons with 100% accuracy',
    tips: 'You have mastered the fundamentals of professional conversation.',
    cultural_context: 'Shows the Filipino dedication to learning and educational excellence'
  },
  {
    id: 'professional-expert',
    title: 'Professional Expert',
    description: 'Complete all 80 lessons in the course',
    icon: '🎓',
    rarity: 'legendary',
    category: 'skill',
    xpReward: 1000,
    unlockCondition: 'Complete all 80 lessons in the complete course',
    tips: 'You have achieved complete mastery of professional conversation skills. You are ready to lead and inspire.',
    cultural_context: 'Represents the ultimate Filipino professional achievement - complete dedication to excellence'
  }
]

// Helper functions for achievements
export function getAchievementsByCategory(category: Achievement['category']): Achievement[] {
  return achievements.filter(achievement => achievement.category === category)
}

export function getAchievementsByRarity(rarity: Achievement['rarity']): Achievement[] {
  return achievements.filter(achievement => achievement.rarity === rarity)
}

// Calculate real progress for each achievement based on user data
export function calculateAchievementProgress(achievementId: string): { progress: number, isUnlocked: boolean } {
  const achievement = achievements.find(a => a.id === achievementId)
  if (!achievement) return { progress: 0, isUnlocked: false }

  const currentLesson = getCurrentLesson()
  const completedLessons = getCompletedLessons()
  const totalXP = getTotalXP()
  const streak = getStreak()

  switch (achievement.id) {
    // Streak achievements
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

    // Foundation module achievements (lessons 1-30)
    case 'conversation-scholar':
      const foundationProgress = completedLessons.filter(l => l <= 30).length
      return { 
        progress: Math.min((foundationProgress / 30) * 100, 100), 
        isUnlocked: foundationProgress >= 30 
      }

    // Professional achievements
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

    // Cultural achievements
    case 'pakikipagkapwa-master':
      const culturalProgress = completedLessons.filter(l => l >= 1 && l <= 30).length
      return { 
        progress: Math.min((culturalProgress / 30) * 100, 100), 
        isUnlocked: culturalProgress >= 30 
      }

    case 'bayanihan-builder':
      const communityProgress = completedLessons.filter(l => l >= 31 && l <= 60).length
      return { 
        progress: Math.min((communityProgress / 30) * 100, 100), 
        isUnlocked: communityProgress >= 30 
      }

    case 'hiya-overcomer':
      const confidenceProgress = completedLessons.filter(l => l >= 1 && l <= 15).length
      return { 
        progress: Math.min((confidenceProgress / 15) * 100, 100), 
        isUnlocked: confidenceProgress >= 15 
      }

    // Professional achievements
    case 'bpo-professional':
      const bpoProgress = completedLessons.filter(l => l >= 31 && l <= 60).length
      return { 
        progress: Math.min((bpoProgress / 30) * 100, 100), 
        isUnlocked: bpoProgress >= 30 
      }

    case 'ofw-communicator':
      const ofwProgress = completedLessons.filter(l => l >= 61 && l <= 120).length
      return { 
        progress: Math.min((ofwProgress / 60) * 100, 100), 
        isUnlocked: ofwProgress >= 60 
      }

    case 'jeepney-networker':
      const socialProgress = completedLessons.filter(l => l >= 1 && l <= 10).length
      return { 
        progress: Math.min((socialProgress / 10) * 100, 100), 
        isUnlocked: socialProgress >= 10 
      }

    case 'mall-socializer':
      const casualProgress = completedLessons.filter(l => l >= 11 && l <= 20).length
      return { 
        progress: Math.min((casualProgress / 10) * 100, 100), 
        isUnlocked: casualProgress >= 10 
      }

    case 'family-diplomat':
      const familyProgress = completedLessons.filter(l => l >= 21 && l <= 30).length
      return { 
        progress: Math.min((familyProgress / 10) * 100, 100), 
        isUnlocked: familyProgress >= 10 
      }

    case 'community-connector':
      const connectorProgress = completedLessons.filter(l => l >= 31 && l <= 60).length
      return { 
        progress: Math.min((connectorProgress / 30) * 100, 100), 
        isUnlocked: connectorProgress >= 30 
      }

    case 'conversation-evangelist':
      const evangelistProgress = completedLessons.filter(l => l >= 1 && l <= 30).length
      return { 
        progress: Math.min((evangelistProgress / 30) * 100, 100), 
        isUnlocked: evangelistProgress >= 30 
      }

    // Mastery achievements
    case 'professional-expert':
      return { 
        progress: Math.min((completedLessons.length / 120) * 100, 100), 
        isUnlocked: completedLessons.length >= 120 
      }

    default:
      return { progress: 0, isUnlocked: false }
  }
}

export function checkAchievementProgress(achievementId: string, userStats: any): boolean {
  const achievement = achievements.find(a => a.id === achievementId)
  if (!achievement) return false

  // This would integrate with actual user progress tracking
  // For now, return mock progress based on achievement type
  switch (achievement.category) {
    case 'streak':
      return userStats.currentStreak >= getRequiredStreakDays(achievementId)
    case 'skill':
      return userStats.lessonsCompleted >= getRequiredLessons(achievementId)
    case 'professional':
      return userStats.professionalLessonsCompleted >= getRequiredProfessionalLessons(achievementId)
    default:
      return false
  }
}

function getRequiredStreakDays(achievementId: string): number {
  const streakMap = {
    'first-lesson': 1,
    'week-warrior': 7,
    'month-master': 30,
    'legend-status': 100
  }
  return streakMap[achievementId as keyof typeof streakMap] || 0
}

function getRequiredLessons(achievementId: string): number {
  const lessonMap = {
    'conversation-scholar': 25,
    'professional-expert': 80
  }
  return lessonMap[achievementId as keyof typeof lessonMap] || 0
}

function getRequiredProfessionalLessons(achievementId: string): number {
  const professionalMap = {
    'elevator-expert': 10,
    'client-champion': 20,
    'leadership-communicator': 55
  }
  return professionalMap[achievementId as keyof typeof professionalMap] || 0
} 
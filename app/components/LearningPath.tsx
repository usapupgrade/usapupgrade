'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  MapPin, 
  CheckCircle, 
  Circle, 
  Lock, 
  Star, 
  Target, 
  Heart, 
  Brain,
  Users,
  TrendingUp,
  Award
} from 'lucide-react'

interface LearningNode {
  id: string
  title: string
  description: string
  category: string
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  status: 'completed' | 'current' | 'locked' | 'available'
  xpReward: number
  prerequisites: string[]
  skills: string[]
}

interface LearningPathProps {
  userLevel: number
  completedLessons: string[]
  currentLesson?: string
}

const learningNodes: LearningNode[] = [
  // Foundation Path
  {
    id: 'foundation-1',
    title: 'Conversation Basics',
    description: 'Learn fundamental conversation skills',
    category: 'foundation',
    difficulty: 'beginner',
    status: 'completed',
    xpReward: 25,
    prerequisites: [],
    skills: ['ice-breaking', 'basic-greetings']
  },
  {
    id: 'foundation-2',
    title: 'Active Listening',
    description: 'Master the art of truly hearing others',
    category: 'foundation',
    difficulty: 'beginner',
    status: 'completed',
    xpReward: 30,
    prerequisites: ['foundation-1'],
    skills: ['listening', 'empathy']
  },
  {
    id: 'foundation-3',
    title: 'Question Mastery',
    description: 'Learn to ask engaging questions',
    category: 'foundation',
    difficulty: 'intermediate',
    status: 'current',
    xpReward: 40,
    prerequisites: ['foundation-2'],
    skills: ['question-asking', 'curiosity']
  },

  // Small Talk Path
  {
    id: 'small-talk-1',
    title: 'Weather Talk',
    description: 'Transform boring weather into engaging conversation',
    category: 'small_talk',
    difficulty: 'beginner',
    status: 'completed',
    xpReward: 35,
    prerequisites: ['foundation-1'],
    skills: ['conversation-bridging', 'topic-transition']
  },
  {
    id: 'small-talk-2',
    title: 'Follow-up Questions',
    description: 'Keep conversations flowing naturally',
    category: 'small_talk',
    difficulty: 'intermediate',
    status: 'available',
    xpReward: 45,
    prerequisites: ['small-talk-1', 'foundation-3'],
    skills: ['active-listening', 'open-ended-questions']
  },
  {
    id: 'small-talk-3',
    title: 'Cultural Conversations',
    description: 'Navigate conversations across cultures',
    category: 'small_talk',
    difficulty: 'advanced',
    status: 'locked',
    xpReward: 60,
    prerequisites: ['small-talk-2'],
    skills: ['cultural-sensitivity', 'curiosity']
  },

  // Professional Path
  {
    id: 'professional-1',
    title: 'Networking Basics',
    description: 'Build professional relationships authentically',
    category: 'professional',
    difficulty: 'beginner',
    status: 'completed',
    xpReward: 40,
    prerequisites: ['foundation-2'],
    skills: ['professional-introduction', 'value-proposition']
  },
  {
    id: 'professional-2',
    title: 'Elevator Pitch',
    description: 'Craft your 30-second introduction',
    category: 'professional',
    difficulty: 'intermediate',
    status: 'available',
    xpReward: 50,
    prerequisites: ['professional-1'],
    skills: ['self-introduction', 'concise-communication']
  },
  {
    id: 'professional-3',
    title: 'Executive Communication',
    description: 'Communicate effectively with senior leaders',
    category: 'professional',
    difficulty: 'advanced',
    status: 'locked',
    xpReward: 70,
    prerequisites: ['professional-2'],
    skills: ['executive-presence', 'strategic-thinking']
  },

  // Dating Path
  {
    id: 'dating-1',
    title: 'First Impressions',
    description: 'Make authentic first impressions on dates',
    category: 'dating',
    difficulty: 'beginner',
    status: 'available',
    xpReward: 45,
    prerequisites: ['foundation-2'],
    skills: ['authenticity', 'confidence']
  },
  {
    id: 'dating-2',
    title: 'Emotional Intelligence',
    description: 'Read and respond to emotional cues',
    category: 'dating',
    difficulty: 'intermediate',
    status: 'locked',
    xpReward: 55,
    prerequisites: ['dating-1'],
    skills: ['emotional-awareness', 'empathy']
  },
  {
    id: 'dating-3',
    title: 'Long-term Connection',
    description: 'Build lasting relationships',
    category: 'dating',
    difficulty: 'advanced',
    status: 'locked',
    xpReward: 75,
    prerequisites: ['dating-2'],
    skills: ['emotional-intimacy', 'shared-values']
  },

  // Conflict Resolution Path
  {
    id: 'conflict-1',
    title: 'De-escalation',
    description: 'Learn to calm tense situations',
    category: 'conflict_resolution',
    difficulty: 'beginner',
    status: 'available',
    xpReward: 50,
    prerequisites: ['foundation-2'],
    skills: ['emotional-regulation', 'empathy']
  },
  {
    id: 'conflict-2',
    title: 'Family Conflicts',
    description: 'Navigate disagreements with family',
    category: 'conflict_resolution',
    difficulty: 'intermediate',
    status: 'locked',
    xpReward: 60,
    prerequisites: ['conflict-1'],
    skills: ['boundary-setting', 'family-dynamics']
  },
  {
    id: 'conflict-3',
    title: 'Group Mediation',
    description: 'Help resolve conflicts between multiple people',
    category: 'conflict_resolution',
    difficulty: 'advanced',
    status: 'locked',
    xpReward: 80,
    prerequisites: ['conflict-2'],
    skills: ['mediation', 'consensus-building']
  }
]

const categoryColors = {
  foundation: 'bg-blue-500',
  small_talk: 'bg-green-500',
  professional: 'bg-purple-500',
  dating: 'bg-pink-500',
  conflict_resolution: 'bg-orange-500'
}

const categoryIcons = {
  foundation: Target,
  small_talk: Users,
  professional: TrendingUp,
  dating: Heart,
  conflict_resolution: Brain
}

export default function LearningPath({ userLevel, completedLessons, currentLesson }: LearningPathProps) {
  const [selectedNode, setSelectedNode] = useState<LearningNode | null>(null)
  const [filter, setFilter] = useState<'all' | 'available' | 'completed'>('all')

  const getNodeStatus = (node: LearningNode): LearningNode['status'] => {
    if (completedLessons.includes(node.id)) return 'completed'
    if (node.id === currentLesson) return 'current'
    
    const prerequisitesMet = node.prerequisites.every(prereq => 
      completedLessons.includes(prereq)
    )
    
    return prerequisitesMet ? 'available' : 'locked'
  }

  const filteredNodes = learningNodes.filter(node => {
    const status = getNodeStatus(node)
    if (filter === 'all') return true
    if (filter === 'available') return status === 'available' || status === 'current'
    if (filter === 'completed') return status === 'completed'
    return true
  })

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-5 h-5 text-green-500" />
      case 'current':
        return <Circle className="w-5 h-5 text-accent-500" />
      case 'locked':
        return <Lock className="w-5 h-5 text-gray-400" />
      default:
        return <Circle className="w-5 h-5 text-gray-300" />
    }
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner':
        return 'bg-green-100 text-green-800'
      case 'intermediate':
        return 'bg-yellow-100 text-yellow-800'
      case 'advanced':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-primary-900">Learning Path</h2>
          <p className="text-primary-600">Your journey to conversation mastery</p>
        </div>
        
        <div className="flex space-x-2">
          {(['all', 'available', 'completed'] as const).map((filterOption) => (
            <button
              key={filterOption}
              onClick={() => setFilter(filterOption)}
              className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                filter === filterOption
                  ? 'bg-accent-500 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {filterOption.charAt(0).toUpperCase() + filterOption.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Learning Path Visualization */}
      <div className="relative">
        {/* Connection Lines */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none">
          {learningNodes.map((node, index) => {
            if (index === 0) return null
            
            const prevNode = learningNodes[index - 1]
            const isCompleted = getNodeStatus(node) === 'completed' && getNodeStatus(prevNode) === 'completed'
            
            return (
              <line
                key={`line-${prevNode.id}-${node.id}`}
                x1="50%"
                y1="0"
                x2="50%"
                y2="100%"
                stroke={isCompleted ? '#10B981' : '#E5E7EB'}
                strokeWidth="2"
                strokeDasharray={isCompleted ? 'none' : '5,5'}
              />
            )
          })}
        </svg>

        {/* Nodes */}
        <div className="relative space-y-8">
          {filteredNodes.map((node, index) => {
            const status = getNodeStatus(node)
            const CategoryIcon = categoryIcons[node.category as keyof typeof categoryIcons]
            
            return (
              <motion.div
                key={node.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="relative"
              >
                <div className="flex items-center space-x-4">
                  {/* Node */}
                  <motion.button
                    onClick={() => setSelectedNode(node)}
                    className={`flex-1 p-6 rounded-xl border-2 transition-all duration-200 ${
                      status === 'completed'
                        ? 'border-green-200 bg-green-50'
                        : status === 'current'
                        ? 'border-accent-200 bg-accent-50'
                        : status === 'locked'
                        ? 'border-gray-200 bg-gray-50'
                        : 'border-blue-200 bg-blue-50 hover:border-blue-300'
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="flex items-start space-x-4">
                      <div className={`w-12 h-12 ${categoryColors[node.category as keyof typeof categoryColors]} rounded-lg flex items-center justify-center text-white`}>
                        <CategoryIcon className="w-6 h-6" />
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <h3 className="font-semibold text-primary-900">{node.title}</h3>
                          {getStatusIcon(status)}
                        </div>
                        
                        <p className="text-sm text-primary-600 mb-3">{node.description}</p>
                        
                        <div className="flex items-center space-x-3">
                          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(node.difficulty)}`}>
                            {node.difficulty}
                          </span>
                          
                          <span className="flex items-center space-x-1 text-sm text-accent-600">
                            <Star className="w-4 h-4" />
                            <span>{node.xpReward} XP</span>
                          </span>
                        </div>
                      </div>
                    </div>
                  </motion.button>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>

      {/* Node Details Modal */}
      {selectedNode && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedNode(null)}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className={`w-10 h-10 ${categoryColors[selectedNode.category as keyof typeof categoryColors]} rounded-lg flex items-center justify-center text-white`}>
                  {(() => {
                    const Icon = categoryIcons[selectedNode.category as keyof typeof categoryIcons]
                    return <Icon className="w-5 h-5" />
                  })()}
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-primary-900">{selectedNode.title}</h3>
                  <p className="text-sm text-primary-600">{selectedNode.description}</p>
                </div>
              </div>

              <div className="space-y-3">
                <div>
                  <h4 className="font-medium text-primary-900 mb-2">Skills You'll Learn:</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedNode.skills.map((skill) => (
                      <span key={skill} className="px-2 py-1 bg-accent-100 text-accent-800 rounded text-xs">
                        {skill.replace('-', ' ')}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-medium text-primary-900 mb-2">Prerequisites:</h4>
                  <div className="space-y-1">
                    {selectedNode.prerequisites.length > 0 ? (
                      selectedNode.prerequisites.map((prereq) => {
                        const prereqNode = learningNodes.find(n => n.id === prereq)
                        return (
                          <div key={prereq} className="flex items-center space-x-2">
                            {getStatusIcon(getNodeStatus(prereqNode!))}
                            <span className="text-sm text-primary-600">{prereqNode?.title}</span>
                          </div>
                        )
                      })
                    ) : (
                      <span className="text-sm text-gray-500">No prerequisites</span>
                    )}
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-primary-600">
                    Reward: <span className="font-semibold text-accent-600">{selectedNode.xpReward} XP</span>
                  </span>
                  <span className={`px-2 py-1 rounded text-xs font-medium ${getDifficultyColor(selectedNode.difficulty)}`}>
                    {selectedNode.difficulty}
                  </span>
                </div>
              </div>

              <div className="flex space-x-3">
                <button
                  onClick={() => setSelectedNode(null)}
                  className="flex-1 bg-gray-100 text-gray-700 py-2 px-4 rounded-lg font-medium hover:bg-gray-200 transition-colors"
                >
                  Close
                </button>
                
                {getNodeStatus(selectedNode) === 'available' && (
                  <button className="flex-1 bg-accent-500 text-white py-2 px-4 rounded-lg font-medium hover:bg-accent-600 transition-colors">
                    Start Lesson
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  )
} 
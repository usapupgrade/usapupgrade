'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle, XCircle, ArrowRight, RefreshCw } from 'lucide-react'

interface BranchingOption {
  id: string
  text: string
  isCorrect: boolean
  feedback: string
  psychology: string
  nextScenario?: string // ID of next scenario to show
  consequence?: string // Description of what happens next
}

interface BranchingScenario {
  id: string
  context: string
  character: string
  dialogue: string
  options: BranchingOption[]
  explanation: string
  psychologyTip: string
}

interface BranchingScenarioProps {
  scenarios: BranchingScenario[]
  onComplete: (totalXP: number, pathTaken: string[]) => void
}

export default function BranchingScenario({ scenarios, onComplete }: BranchingScenarioProps) {
  const [currentScenarioIndex, setCurrentScenarioIndex] = useState(0)
  const [selectedOption, setSelectedOption] = useState<string | null>(null)
  const [showFeedback, setShowFeedback] = useState(false)
  const [pathTaken, setPathTaken] = useState<string[]>([])
  const [totalXP, setTotalXP] = useState(0)
  const [conversationHistory, setConversationHistory] = useState<Array<{
    scenario: BranchingScenario
    selectedOption: BranchingOption
    timestamp: Date
  }>>([])

  const currentScenario = scenarios[currentScenarioIndex]
  const selectedOptionData = currentScenario?.options.find(opt => opt.id === selectedOption)

  const handleOptionSelect = (optionId: string) => {
    if (selectedOption) return // Prevent multiple selections
    
    setSelectedOption(optionId)
    setShowFeedback(true)
    
    const option = currentScenario?.options.find(opt => opt.id === optionId)
    if (option) {
      const xpGained = option.isCorrect ? 25 : 5
      setTotalXP(prev => prev + xpGained)
      
      // Add to conversation history
      setConversationHistory(prev => [...prev, {
        scenario: currentScenario!,
        selectedOption: option,
        timestamp: new Date()
      }])
      
      // Add to path taken
      setPathTaken(prev => [...prev, option.text])
    }
  }

  const handleContinue = () => {
    if (!selectedOptionData) return
    
    if (selectedOptionData.nextScenario) {
      // Find the next scenario
      const nextScenario = scenarios.find(s => s.id === selectedOptionData.nextScenario)
      if (nextScenario) {
        const nextIndex = scenarios.indexOf(nextScenario)
        setCurrentScenarioIndex(nextIndex)
        setSelectedOption(null)
        setShowFeedback(false)
      }
    } else {
      // End of conversation path
      onComplete(totalXP, pathTaken)
    }
  }

  const handleRetry = () => {
    setSelectedOption(null)
    setShowFeedback(false)
  }

  const getPathSummary = () => {
    return pathTaken.map((step, index) => (
      <div key={index} className="flex items-center space-x-2 text-sm text-primary-600">
        <span className="w-6 h-6 bg-primary-100 rounded-full flex items-center justify-center text-xs font-medium">
          {index + 1}
        </span>
        <span className="flex-1">{step}</span>
      </div>
    ))
  }

  if (!currentScenario) {
    return (
      <div className="text-center py-8">
        <p className="text-primary-600">No scenarios available</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Conversation Progress */}
      <div className="bg-primary-50 rounded-lg p-4">
        <h3 className="text-sm font-medium text-primary-700 mb-2">Conversation Path</h3>
        <div className="space-y-2">
          {getPathSummary()}
        </div>
      </div>

      {/* Current Scenario */}
      <motion.div
        key={currentScenario.id}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        className="card"
      >
        {/* Scenario Context */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-primary-900 mb-2">
            Scenario {currentScenarioIndex + 1} of {scenarios.length}
          </h3>
          <p className="text-primary-700 mb-3">{currentScenario.context}</p>
          
          <div className="bg-primary-50 rounded-lg p-4 mb-4">
            <p className="text-sm font-medium text-primary-600 mb-1">
              {currentScenario.character}
            </p>
            <p className="text-primary-800 italic">"{currentScenario.dialogue}"</p>
          </div>
        </div>

        {/* Response Options */}
        <div className="space-y-3 mb-6">
          {currentScenario.options.map((option) => (
            <motion.button
              key={option.id}
              onClick={() => handleOptionSelect(option.id)}
              disabled={selectedOption !== null}
              className={`w-full p-4 rounded-lg border-2 text-left transition-all ${
                selectedOption === option.id
                  ? option.isCorrect
                    ? 'border-green-500 bg-green-50'
                    : 'border-red-500 bg-red-50'
                  : 'border-primary-200 hover:border-primary-300 hover:bg-primary-50'
              } ${selectedOption !== null ? 'cursor-default' : 'cursor-pointer'}`}
            >
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 mt-1">
                  {selectedOption === option.id ? (
                    option.isCorrect ? (
                      <CheckCircle className="w-5 h-5 text-green-500" />
                    ) : (
                      <XCircle className="w-5 h-5 text-red-500" />
                    )
                  ) : (
                    <div className="w-5 h-5 border-2 border-primary-300 rounded-full"></div>
                  )}
                </div>
                <div className="flex-1">
                  <p className="text-primary-900">{option.text}</p>
                </div>
              </div>
            </motion.button>
          ))}
        </div>

        {/* Feedback */}
        <AnimatePresence>
          {showFeedback && selectedOptionData && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-accent-50 border border-accent-200 rounded-lg p-4 mb-6"
            >
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0">
                  {selectedOptionData.isCorrect ? (
                    <CheckCircle className="w-6 h-6 text-green-500" />
                  ) : (
                    <XCircle className="w-6 h-6 text-red-500" />
                  )}
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-primary-900 mb-2">
                    {selectedOptionData.isCorrect ? 'Great choice!' : 'Consider this...'}
                  </h4>
                  <p className="text-primary-700 mb-3">{selectedOptionData.feedback}</p>
                  <p className="text-sm text-primary-600 mb-3">
                    <strong>Psychology:</strong> {selectedOptionData.psychology}
                  </p>
                  
                  {selectedOptionData.consequence && (
                    <div className="bg-primary-50 rounded p-3">
                      <p className="text-sm font-medium text-primary-700 mb-1">What happens next:</p>
                      <p className="text-sm text-primary-600">{selectedOptionData.consequence}</p>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Action Buttons */}
        <div className="flex space-x-3">
          {!selectedOption && (
            <div className="text-sm text-primary-600">
              Choose your response to continue the conversation...
            </div>
          )}
          
          {selectedOption && (
            <>
              <button
                onClick={handleRetry}
                className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-primary-600 hover:text-primary-700 transition-colors"
              >
                <RefreshCw className="w-4 h-4" />
                <span>Try Again</span>
              </button>
              
              <button
                onClick={handleContinue}
                className="flex items-center space-x-2 px-6 py-2 bg-accent-500 text-white rounded-lg font-medium hover:bg-accent-600 transition-colors"
              >
                <span>
                  {selectedOptionData?.nextScenario ? 'Continue' : 'Complete Conversation'}
                </span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </>
          )}
        </div>
      </motion.div>

      {/* XP Counter */}
      <div className="flex items-center justify-center space-x-2 text-sm text-primary-600">
        <span className="font-medium">Total XP Earned:</span>
        <span className="font-bold text-accent-600">{totalXP}</span>
      </div>
    </div>
  )
} 
'use client'

import Link from 'next/link'
import { useParams } from 'next/navigation'
import { lessons, type Lesson } from '../../data/lessons'
import { ArrowLeft, BookOpen, Star, Trophy } from 'lucide-react'

const categoryNames: Record<string, string> = {
  small_talk: 'Small Talk',
  professional: 'Professional',
  dating: 'Dating & Relationships',
  conflict_resolution: 'Conflict Resolution',
}

export default function CategoryLessonsPage() {
  const params = useParams()
  const category = params.category as string
  const categoryLessons = lessons.filter(l => l.category === category || l.lessonNumber <= 30) // Fallback for lessons without category

  return (
    <div className="min-h-screen bg-primary-50">
      <div className="max-w-3xl mx-auto px-4 py-8">
        <div className="mb-8 flex items-center space-x-2">
          <Link href="/dashboard" className="text-primary-600 hover:text-primary-900 flex items-center">
            <ArrowLeft className="w-4 h-4 mr-1" />
            Back to Dashboard
          </Link>
        </div>
        <h1 className="text-3xl font-bold text-primary-900 mb-2">
          {categoryNames[category] || category}
        </h1>
        <p className="text-primary-600 mb-8">
          Explore all lessons in this category. Click any lesson to start!
        </p>
        <div className="space-y-6">
          {categoryLessons.map((lesson: Lesson) => (
            <Link key={lesson.lessonNumber} href={`/lesson/${lesson.lessonNumber}`} className="block card hover:shadow-lg transition-shadow">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-accent-100 rounded-lg flex items-center justify-center">
                  <BookOpen className="w-6 h-6 text-accent-600" />
                </div>
                <div className="flex-1">
                  <h2 className="text-lg font-semibold text-primary-900 mb-1">{lesson.title}</h2>
                  <p className="text-primary-600 text-sm mb-1">{lesson.description || lesson.scenario}</p>
                  <div className="flex items-center space-x-4 text-xs text-primary-500">
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4" />
                      <span className="capitalize">{lesson.difficulty || 'Beginner'}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Trophy className="w-4 h-4" />
                      <span>{lesson.xpReward} XP</span>
                    </div>
                  </div>
                </div>
                <button className="btn-primary px-4 py-2 text-sm">Start</button>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
} 
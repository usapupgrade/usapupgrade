'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, Download, Bell, Shield, User, CheckCircle, PhoneIcon, HardDrive, Wifi, WifiOff } from 'lucide-react'
import { useUser } from '../providers'
import PushNotifications from '../components/PushNotifications'
import CertificationNameForm from '../components/CertificationNameForm'
import CertificationDownload from '../components/CertificationDownload'

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('notifications')
  const { user, updateUser } = useUser()
  const [displayName, setDisplayName] = useState(user?.name || '')

  const tabs = [
    {
      id: 'notifications',
      name: 'Notifications',
      icon: Bell,
      description: 'Manage push notifications and reminders'
    },
    {
      id: 'pwa',
      name: 'App Installation',
      icon: Download,
      description: 'Install UsapUpgrade as a mobile app'
    },
    {
      id: 'privacy',
      name: 'Privacy & Security',
      icon: Shield,
      description: 'Data protection and security settings'
    },
    {
      id: 'account',
      name: 'Account',
      icon: User,
      description: 'Manage your account and preferences'
    }
  ]

  const handleDisplayNameChange = async (newName: string) => {
    setDisplayName(newName)
    
    if (user) {
      try {
        const response = await fetch('/api/users/update-name', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name: newName })
        })
        
        if (response.ok) {
          // Update local user state
          updateUser({ name: newName })
        }
      } catch (error) {
        console.error('Error updating display name:', error)
      }
    }
  }

  // For demo purposes, if no user context, default to free user
  const isPremium = user?.subscription_status === 'premium' || user?.subscription_status === 'lifetime'

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-4 sm:py-6">
          <div className="flex items-center justify-between">
            <Link 
              href="/dashboard"
              className="flex items-center text-gray-600 hover:text-gray-900 transition-colors text-sm sm:text-base"
            >
              <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
              Back
            </Link>
            <div className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900">Settings</div>
            <div className="w-8 h-8"></div> {/* Placeholder for NotificationBell */}
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {/* Mobile Tab Navigation */}
        <div className="mb-6 sm:mb-8">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-2">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
              {tabs.map((tab) => {
                const Icon = tab.icon
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`flex flex-col items-center justify-center px-3 py-4 rounded-lg text-center transition-all duration-200 ${
                      activeTab === tab.id
                        ? 'bg-blue-50 text-blue-700 border-2 border-blue-200'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                    }`}
                  >
                    <Icon className="w-5 h-5 sm:w-6 sm:h-6 mb-2" />
                    <div className="text-xs sm:text-sm font-medium">{tab.name}</div>
                  </button>
                )
              })}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="space-y-4 sm:space-y-6">
          {activeTab === 'notifications' && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6">
              <div className="flex items-center mb-4 sm:mb-6">
                <Bell className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600 mr-3" />
                <h1 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900">Notifications</h1>
              </div>
              <PushNotifications />
            </div>
          )}

          {activeTab === 'pwa' && (
            <div className="space-y-4 sm:space-y-6">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6">
                <div className="flex items-center mb-4 sm:mb-6">
                  <Download className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600 mr-3" />
                  <h1 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900">App Installation</h1>
                </div>
                
                <div className="space-y-4 sm:space-y-6">
                  <div className="bg-blue-50 rounded-xl p-4 sm:p-6">
                    <div className="flex items-start space-x-4 sm:space-x-6">
                      <div className="w-12 h-12 sm:w-16 sm:h-16 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                        <PhoneIcon className="w-6 h-6 sm:w-8 sm:h-8 text-blue-600" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-base sm:text-lg lg:text-xl font-semibold text-blue-900 mb-2 sm:mb-3">
                          Install UsapUpgrade as an App
                        </h3>
                        <p className="text-sm sm:text-base text-blue-700 mb-4 sm:mb-6 leading-relaxed">
                          Get the full app experience with push notifications and home screen installation.
                        </p>
                        <div className="space-y-2 sm:space-y-3">

                          <div className="flex items-center text-sm sm:text-base text-blue-800">
                            <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 mr-3 flex-shrink-0" />
                            <span>Push notifications for daily reminders</span>
                          </div>
                          <div className="flex items-center text-sm sm:text-base text-blue-800">
                            <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 mr-3 flex-shrink-0" />
                            <span>App-like experience on your device</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-xl p-4 sm:p-6">
                    <h3 className="text-base sm:text-lg lg:text-xl font-semibold text-gray-900 mb-4 sm:mb-6">Installation Instructions</h3>
                    <div className="space-y-4 sm:space-y-6">
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-3 text-sm sm:text-base">On Mobile (Chrome/Edge)</h4>
                        <ol className="list-decimal list-inside space-y-2 text-sm sm:text-base text-gray-600">
                          <li>Tap the menu button (⋮) in your browser</li>
                          <li>Select "Add to Home screen" or "Install app"</li>
                          <li>Follow the prompts to install</li>
                        </ol>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-3 text-sm sm:text-base">On Desktop (Chrome/Edge)</h4>
                        <ol className="list-decimal list-inside space-y-2 text-sm sm:text-base text-gray-600">
                          <li>Click the install icon (⬇️) in the address bar</li>
                          <li>Or go to Menu → More tools → Create shortcut</li>
                          <li>Choose "Install" to add to your desktop</li>
                        </ol>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'privacy' && (
            <div className="space-y-4 sm:space-y-6">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6">
                <div className="flex items-center mb-4 sm:mb-6">
                  <Shield className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600 mr-3" />
                  <h1 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900">Privacy & Security</h1>
                </div>
                
                <div className="space-y-4 sm:space-y-6">
                  <div className="bg-green-50 rounded-xl p-4 sm:p-6">
                    <h3 className="text-base sm:text-lg lg:text-xl font-semibold text-green-900 mb-3 sm:mb-4">Data Protection</h3>
                    <p className="text-sm sm:text-base text-green-700 mb-4 sm:mb-6 leading-relaxed">
                      Your data is stored locally on your device and is never shared with third parties.
                    </p>
                    <div className="space-y-2 sm:space-y-3">
                      <div className="flex items-center text-sm sm:text-base text-green-800">
                        <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-600 mr-3 flex-shrink-0" />
                        <span>Progress data stored locally</span>
                      </div>
                      <div className="flex items-center text-sm sm:text-base text-green-800">
                        <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-600 mr-3 flex-shrink-0" />
                        <span>No personal data collection</span>
                      </div>
                      <div className="flex items-center text-sm sm:text-base text-green-800">
                        <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-600 mr-3 flex-shrink-0" />
                        <span>No tracking or analytics</span>
                      </div>
                      <div className="flex items-center text-sm sm:text-base text-green-800">
                        <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-600 mr-3 flex-shrink-0" />
                        <span>Secure payment processing</span>
                      </div>
                    </div>
                  </div>


                </div>
              </div>
            </div>
          )}

          {activeTab === 'account' && (
            <div className="space-y-4 sm:space-y-6">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6">
                <div className="flex items-center mb-4 sm:mb-6">
                  <User className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600 mr-3" />
                  <h1 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900">Account Settings</h1>
                </div>
                
                <div className="space-y-4 sm:space-y-6">
                  <div className="bg-white border border-gray-200 rounded-xl p-4 sm:p-6">
                    <h3 className="text-base sm:text-lg lg:text-xl font-semibold text-gray-900 mb-4 sm:mb-6">Account Information</h3>
                    <div className="space-y-4 sm:space-y-6">
                      <div>
                        <label className="block text-sm sm:text-base font-medium text-gray-700 mb-2">
                          Display Name
                        </label>
                        <div className="flex gap-2">
                          <input
                            type="text"
                            value={displayName}
                            onChange={(e) => setDisplayName(e.target.value)}
                            className="flex-1 px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg text-sm sm:text-base text-gray-900"
                            placeholder="Enter your display name"
                          />
                          <button
                            onClick={() => handleDisplayNameChange(displayName)}
                            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
                          >
                            Save
                          </button>
                        </div>
                        <p className="text-xs text-gray-500 mt-1">This name will appear in your profile and admin dashboard</p>
                      </div>
                      <div>
                        <label className="block text-sm sm:text-base font-medium text-gray-700 mb-2">
                          Email
                        </label>
                        <input
                          type="email"
                          value={user?.email || ""}
                          disabled
                          className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-500 text-sm sm:text-base"
                        />
                      </div>
                      <div>
                        <label className="block text-sm sm:text-base font-medium text-gray-700 mb-2">
                          Subscription Status
                        </label>
                        <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
                          <span className={`px-3 sm:px-4 py-2 text-sm sm:text-base font-medium rounded-full w-fit ${
                            user?.subscription_status === 'premium' 
                              ? 'bg-blue-100 text-blue-800' 
                              : 'bg-gray-100 text-gray-800'
                          }`}>
                            {user?.subscription_status === 'premium' ? 'Premium Plan' : 'Free Trial'}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white border border-gray-200 rounded-xl p-4 sm:p-6">
                    <h3 className="text-base sm:text-lg lg:text-xl font-semibold text-gray-900 mb-4 sm:mb-6">Certification Name</h3>
                    <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6">
                      Set the name that will appear on your certificate of completion. 
                      This can only be changed every 30 days to prevent abuse.
                    </p>
                    <CertificationNameForm />
                  </div>

                  <div className="bg-white border border-gray-200 rounded-xl p-4 sm:p-6">
                    <h3 className="text-base sm:text-lg lg:text-xl font-semibold text-gray-900 mb-4 sm:mb-6">Download Your Certification</h3>
                    <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6">
                      Download your official certificate of completion. This feature is available for users who have completed all 120 lessons.
                    </p>
                    <CertificationDownload />
                  </div>

                  <div className="bg-white border border-gray-200 rounded-xl p-4 sm:p-6">
                    <h3 className="text-base sm:text-lg lg:text-xl font-semibold text-gray-900 mb-4 sm:mb-6">Data Management</h3>
                    <div className="space-y-3 sm:space-y-4">
                      <button className="w-full text-left px-4 sm:px-6 py-3 sm:py-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                        <div className="font-semibold text-gray-900 text-sm sm:text-base">Reset Progress</div>
                        <div className="text-sm sm:text-base text-gray-600">Start fresh with all lessons</div>
                      </button>
                      <button className="w-full text-left px-4 sm:px-6 py-3 sm:py-4 border border-red-200 rounded-lg hover:bg-red-50 transition-colors">
                        <div className="font-semibold text-red-700 text-sm sm:text-base">Delete Account</div>
                        <div className="text-sm sm:text-base text-red-600">Permanently delete all data</div>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
} 
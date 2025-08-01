'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { 
  Plus, 
  Edit, 
  Trash2, 
  Copy, 
  Eye, 
  Calendar,
  Users,
  DollarSign,
  TrendingUp,
  Filter,
  Download,
  Search,
  Tag,
  CheckCircle,
  XCircle,
  Clock
} from 'lucide-react'
import { toast } from 'sonner'

interface Voucher {
  id: string
  code: string
  discountType: 'fixed' | 'percentage'
  discountValue: number
  maxUses: number | null
  usedCount: number
  expiresAt: string | null
  isActive: boolean
  createdAt: string
  description: string
}

export default function VoucherManagement() {
  const [vouchers, setVouchers] = useState<Voucher[]>([])
  const [loading, setLoading] = useState(true)
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [editingVoucher, setEditingVoucher] = useState<Voucher | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState<'all' | 'active' | 'inactive' | 'expired'>('all')
  const router = useRouter()

  // Mock data - in production, this would come from your database
  const mockVouchers: Voucher[] = [
    {
      id: '1',
      code: 'WELCOME20',
      discountType: 'fixed',
      discountValue: 80,
      maxUses: 100,
      usedCount: 45,
      expiresAt: '2024-12-31',
      isActive: true,
      createdAt: '2024-01-15',
      description: 'Welcome discount for new users'
    },
    {
      id: '2',
      code: 'SAVE50',
      discountType: 'fixed',
      discountValue: 200,
      maxUses: 50,
      usedCount: 23,
      expiresAt: '2024-06-30',
      isActive: true,
      createdAt: '2024-01-10',
      description: '50% off promotion'
    },
    {
      id: '3',
      code: 'FRIEND100',
      discountType: 'fixed',
      discountValue: 100,
      maxUses: 200,
      usedCount: 67,
      expiresAt: null,
      isActive: true,
      createdAt: '2024-01-05',
      description: 'Referral program discount'
    },
    {
      id: '4',
      code: 'EXPIRED30',
      discountType: 'percentage',
      discountValue: 30,
      maxUses: 75,
      usedCount: 75,
      expiresAt: '2024-01-01',
      isActive: false,
      createdAt: '2023-12-01',
      description: 'Expired promotion'
    }
  ]

  useEffect(() => {
    // Check admin authentication
    const adminAuth = localStorage.getItem('admin_authenticated')
    if (!adminAuth) {
      router.push('/admin-access')
      return
    }

    // Load vouchers (mock data for now)
    setVouchers(mockVouchers)
    setLoading(false)
  }, [router])

  const handleCreateVoucher = () => {
    setShowCreateModal(true)
  }

  const handleEditVoucher = (voucher: Voucher) => {
    setEditingVoucher(voucher)
    setShowCreateModal(true)
  }

  const filteredVouchers = vouchers.filter(voucher => {
    const matchesSearch = voucher.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         voucher.description.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesFilter = filterStatus === 'all' ||
                         (filterStatus === 'active' && voucher.isActive && (!voucher.expiresAt || !isExpired(voucher.expiresAt))) ||
                         (filterStatus === 'inactive' && !voucher.isActive) ||
                         (filterStatus === 'expired' && voucher.expiresAt && isExpired(voucher.expiresAt))
    
    return matchesSearch && matchesFilter
  })

  const getVoucherStatus = (voucher: Voucher) => {
    if (!voucher.isActive) return 'inactive'
    if (voucher.expiresAt && isExpired(voucher.expiresAt)) return 'expired'
    if (voucher.maxUses && voucher.usedCount >= voucher.maxUses) return 'exhausted'
    return 'active'
  }

  const formatPhilippineDate = (dateString: string | null) => {
    if (!dateString) return 'Never'
    
    try {
      const date = new Date(dateString)
      return date.toLocaleDateString('en-PH', {
        timeZone: 'Asia/Manila',
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
      })
    } catch (error) {
      return 'Invalid Date'
    }
  }

  const isExpired = (dateString: string | null) => {
    if (!dateString) return false
    
    try {
      const now = new Date()
      const expiryDate = new Date(dateString)
      
      // Convert both dates to Philippine time
      const phNow = new Date(now.toLocaleString('en-US', { timeZone: 'Asia/Manila' }))
      const phExpiry = new Date(expiryDate.toLocaleString('en-US', { timeZone: 'Asia/Manila' }))
      
      return phNow > phExpiry
    } catch (error) {
      return false
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-green-600 bg-green-100'
      case 'inactive': return 'text-gray-600 bg-gray-100'
      case 'expired': return 'text-red-600 bg-red-100'
      case 'exhausted': return 'text-orange-600 bg-orange-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  const copyToClipboard = (code: string) => {
    navigator.clipboard.writeText(code)
    toast.success('Voucher code copied!')
  }

  const exportVouchers = () => {
    const csvContent = [
      ['Code', 'Type', 'Value', 'Used', 'Max Uses', 'Status', 'Created', 'Expires'],
      ...filteredVouchers.map(v => [
        v.code,
        v.discountType,
        v.discountType === 'fixed' ? `₱${v.discountValue}` : `${v.discountValue}%`,
        v.usedCount.toString(),
        v.maxUses?.toString() || 'Unlimited',
        getVoucherStatus(v),
        formatPhilippineDate(v.createdAt),
        formatPhilippineDate(v.expiresAt)
      ])
    ].map(row => row.join(',')).join('\n')

    const blob = new Blob([csvContent], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'vouchers-export.csv'
    document.body.appendChild(a)
    a.click()
    window.URL.revokeObjectURL(url)
    document.body.removeChild(a)
    
    toast.success('Vouchers exported successfully!')
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading vouchers...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => router.push('/admin')}
                className="text-gray-600 hover:text-gray-900"
              >
                ← Back to Dashboard
              </button>
              <h1 className="text-2xl font-bold text-gray-900">Voucher Management</h1>
            </div>
            <button
              onClick={handleCreateVoucher}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2"
            >
              <Plus className="w-4 h-4" />
              <span>Create Voucher</span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Tag className="w-6 h-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Vouchers</p>
                <p className="text-2xl font-bold text-gray-900">{vouchers.length}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Active Vouchers</p>
                <p className="text-2xl font-bold text-gray-900">
                  {vouchers.filter(v => getVoucherStatus(v) === 'active').length}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-orange-100 rounded-lg">
                <Users className="w-6 h-6 text-orange-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Uses</p>
                <p className="text-2xl font-bold text-gray-900">
                  {vouchers.reduce((sum, v) => sum + v.usedCount, 0)}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-purple-100 rounded-lg">
                <DollarSign className="w-6 h-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Discount</p>
                <p className="text-2xl font-bold text-gray-900">
                  ₱{vouchers.reduce((sum, v) => sum + (v.discountValue * v.usedCount), 0)}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search vouchers..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
            
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value as any)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">All Vouchers</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="expired">Expired</option>
            </select>

            <button
              onClick={exportVouchers}
              className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg flex items-center space-x-2"
            >
              <Download className="w-4 h-4" />
              <span>Export</span>
            </button>
          </div>
        </div>

        {/* Vouchers Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Voucher Code
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Discount
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Usage
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Expires
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredVouchers.map((voucher) => {
                  const status = getVoucherStatus(voucher)
                  return (
                    <tr key={voucher.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center space-x-2">
                          <span className="font-medium text-gray-900">{voucher.code}</span>
                          <button
                            onClick={() => copyToClipboard(voucher.code)}
                            className="text-gray-400 hover:text-gray-600"
                          >
                            <Copy className="w-4 h-4" />
                          </button>
                        </div>
                        <p className="text-sm text-gray-500">{voucher.description}</p>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-sm font-medium text-gray-900">
                          {voucher.discountType === 'fixed' ? `₱${voucher.discountValue}` : `${voucher.discountValue}%`}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {voucher.usedCount} / {voucher.maxUses || '∞'}
                        </div>
                        {voucher.maxUses && (
                          <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                            <div 
                              className="bg-blue-600 h-2 rounded-full"
                              style={{ width: `${(voucher.usedCount / voucher.maxUses) * 100}%` }}
                            ></div>
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(status)}`}>
                          {status.charAt(0).toUpperCase() + status.slice(1)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {voucher.expiresAt ? (
                          <div className="flex items-center space-x-1">
                            <Calendar className="w-4 h-4 text-gray-400" />
                            <span>{formatPhilippineDate(voucher.expiresAt)}</span>
                          </div>
                        ) : (
                          <span className="text-gray-500">Never</span>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => handleEditVoucher(voucher)}
                            className="text-blue-600 hover:text-blue-900"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => {
                              // Toggle voucher status
                              setVouchers(prev => prev.map(v => 
                                v.id === voucher.id ? { ...v, isActive: !v.isActive } : v
                              ))
                              toast.success(`Voucher ${voucher.isActive ? 'deactivated' : 'activated'}`)
                            }}
                            className={`${voucher.isActive ? 'text-red-600 hover:text-red-900' : 'text-green-600 hover:text-green-900'}`}
                          >
                            {voucher.isActive ? <XCircle className="w-4 h-4" /> : <CheckCircle className="w-4 h-4" />}
                          </button>
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>

        {filteredVouchers.length === 0 && (
          <div className="text-center py-12">
            <Tag className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No vouchers found</h3>
            <p className="text-gray-500">Try adjusting your search or filter criteria.</p>
          </div>
        )}
      </div>

      {/* Create/Edit Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">
                {editingVoucher ? 'Edit Voucher' : 'Create New Voucher'}
              </h3>
              <button
                onClick={() => {
                  setShowCreateModal(false)
                  setEditingVoucher(null)
                }}
                className="text-gray-400 hover:text-gray-600"
              >
                <XCircle className="w-6 h-6" />
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Voucher Code
                </label>
                <input
                  type="text"
                  placeholder="e.g., WELCOME20"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  defaultValue={editingVoucher?.code || ''}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <input
                  type="text"
                  placeholder="e.g., Welcome discount for new users"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  defaultValue={editingVoucher?.description || ''}
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Discount Type
                  </label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                    <option value="fixed">Fixed Amount (₱)</option>
                    <option value="percentage">Percentage (%)</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Discount Value
                  </label>
                  <input
                    type="number"
                    placeholder="e.g., 100"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    defaultValue={editingVoucher?.discountValue || ''}
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Max Uses (optional)
                </label>
                <input
                  type="number"
                  placeholder="e.g., 100"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  defaultValue={editingVoucher?.maxUses || ''}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Expiry Date (optional)
                </label>
                <input
                  type="date"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  defaultValue={editingVoucher?.expiresAt || ''}
                />
              </div>
            </div>
            
            <div className="flex space-x-3 mt-6">
              <button
                onClick={() => {
                  setShowCreateModal(false)
                  setEditingVoucher(null)
                }}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  toast.success(editingVoucher ? 'Voucher updated successfully!' : 'Voucher created successfully!')
                  setShowCreateModal(false)
                  setEditingVoucher(null)
                }}
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                {editingVoucher ? 'Update Voucher' : 'Create Voucher'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
} 
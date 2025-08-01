import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    // This would call the cleanup_expired_trials() function in production
    // For demo purposes, we'll simulate the cleanup
    
    const mockExpiredCount = Math.floor(Math.random() * 10) + 1 // 1-10 expired accounts
    
    console.log(`Cleaned up ${mockExpiredCount} expired trial accounts`)
    
    return NextResponse.json({ 
      success: true, 
      expiredCount: mockExpiredCount,
      message: `Successfully cleaned up ${mockExpiredCount} expired trial accounts`
    })
  } catch (error) {
    console.error('Trial cleanup error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to cleanup expired trials' },
      { status: 500 }
    )
  }
}

// GET endpoint to check trial status
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get('userId')
    
    if (!userId) {
      return NextResponse.json(
        { success: false, error: 'User ID required' },
        { status: 400 }
      )
    }
    
    // In production, this would query the database
    // For demo, return mock trial status
    const mockTrialStatus = {
      isExpired: false,
      daysLeft: 15,
      canReRegister: true,
      reRegistrationCount: 0
    }
    
    return NextResponse.json({ 
      success: true, 
      trialStatus: mockTrialStatus
    })
  } catch (error) {
    console.error('Trial status check error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to check trial status' },
      { status: 500 }
    )
  }
} 
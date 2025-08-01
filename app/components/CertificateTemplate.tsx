'use client'

import React from 'react'

interface CertificateTemplateProps {
  studentName: string
  completionDate: string
  lessonsCompleted: number
  totalXP: number
  certificateId: string
  courseName?: string
  instructorName?: string
}

export default function CertificateTemplate({
  studentName,
  completionDate,
  lessonsCompleted,
  totalXP,
  certificateId,
  courseName = "Professional Communication Skills Course",
  instructorName = "UsapUpgrade Team"
}: CertificateTemplateProps) {
  return (
    <div className="certificate-container" style={{
      width: '11in',
      height: '8.5in',
      backgroundColor: '#ffffff',
      position: 'relative',
      fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
      background: 'linear-gradient(180deg, #ffffff 0%, #f8fafc 100%)',
      border: '8px solid #0073cf',
      boxSizing: 'border-box',
      margin: '0',
      padding: '0'
    }}>
      {/* Top Border Accent */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: '4px',
        background: 'linear-gradient(90deg, #0073cf 0%, #00a3e0 50%, #0073cf 100%)',
        zIndex: 3,
        margin: '0',
        padding: '0'
      }} />

      {/* Header Section */}
      <div style={{
        position: 'relative',
        zIndex: 3,
        padding: '30px 50px 20px 50px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        {/* Logo */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '15px'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '2px'
          }}>
            <span style={{
              fontSize: '28px',
              fontWeight: 'bold',
              color: '#f2750a',
              lineHeight: '1'
            }}>
              Usap
            </span>
            <span style={{
              fontSize: '28px',
              fontWeight: 'bold',
              color: '#00a3e0',
              lineHeight: '1'
            }}>
              Upgrade
            </span>
          </div>
          <div style={{
            fontSize: '12px',
            color: '#6b7280',
            fontWeight: '500'
          }}>
            Learning Platform
          </div>
        </div>

        {/* Certificate ID */}
        <div style={{
          textAlign: 'right'
        }}>
          <div style={{
            fontSize: '10px',
            color: '#9ca3af',
            marginBottom: '4px'
          }}>
            Certificate ID
          </div>
          <div style={{
            fontSize: '12px',
            fontWeight: '600',
            color: '#374151',
            fontFamily: 'monospace'
          }}>
            {certificateId}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div style={{
        position: 'relative',
        zIndex: 3,
        flex: 1,
        padding: '0 50px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        minHeight: '600px'
      }}>
        {/* Top Section - Course Title */}
        <div style={{
          marginTop: '30px',
          textAlign: 'center'
        }}>
          <h1 style={{
            fontSize: '36px',
            fontWeight: 'bold',
            color: '#111827',
            margin: '0 0 8px 0',
            lineHeight: '1.2'
          }}>
            {courseName}
          </h1>
          <p style={{
            fontSize: '16px',
            color: '#6b7280',
            margin: '0 0 15px 0',
            fontWeight: '500'
          }}>
            Specialized for Filipino Professionals
          </p>
        </div>

        {/* Middle Section - Student Info and Quote */}
        <div style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          gap: '40px'
        }}>
          {/* Student Information */}
          <div style={{
            textAlign: 'center'
          }}>
            <p style={{
              fontSize: '18px',
              color: '#374151',
              margin: '0 0 20px 0',
              lineHeight: '1.5'
            }}>
              Course completed by
            </p>
            <h2 style={{
              fontSize: '32px',
              fontWeight: 'bold',
              color: '#0073cf',
              margin: '0 0 20px 0',
              lineHeight: '1.2'
            }}>
              {studentName}
            </h2>
            <p style={{
              fontSize: '16px',
              color: '#6b7280',
              margin: '0',
              lineHeight: '1.5'
            }}>
              {completionDate} • {lessonsCompleted} lessons completed
            </p>
          </div>

          {/* Encouraging Message */}
          <div style={{
            textAlign: 'center',
            padding: '30px',
            backgroundColor: 'rgba(0, 115, 207, 0.06)',
            borderRadius: '16px',
            border: '1px solid rgba(0, 115, 207, 0.12)',
            boxShadow: '0 4px 12px rgba(0, 115, 207, 0.08)',
            position: 'relative',
            maxWidth: '700px',
            marginLeft: 'auto',
            marginRight: 'auto'
          }}>
            {/* Decorative corner elements */}
            <div style={{
              position: 'absolute',
              top: '15px',
              left: '15px',
              width: '20px',
              height: '20px',
              border: '2px solid rgba(0, 115, 207, 0.2)',
              borderRight: '2px solid transparent',
              borderBottom: '2px solid transparent',
              borderRadius: '4px 0 0 0'
            }} />
            <div style={{
              position: 'absolute',
              top: '15px',
              right: '15px',
              width: '20px',
              height: '20px',
              border: '2px solid rgba(0, 115, 207, 0.2)',
              borderLeft: '2px solid transparent',
              borderBottom: '2px solid transparent',
              borderRadius: '0 4px 0 0'
            }} />
            <div style={{
              position: 'absolute',
              bottom: '15px',
              left: '15px',
              width: '20px',
              height: '20px',
              border: '2px solid rgba(0, 115, 207, 0.2)',
              borderRight: '2px solid transparent',
              borderTop: '2px solid transparent',
              borderRadius: '0 0 0 4px'
            }} />
            <div style={{
              position: 'absolute',
              bottom: '15px',
              right: '15px',
              width: '20px',
              height: '20px',
              border: '2px solid rgba(0, 115, 207, 0.2)',
              borderLeft: '2px solid transparent',
              borderTop: '2px solid transparent',
              borderRadius: '0 0 4px 0'
            }} />
            
            <p style={{
              fontSize: '20px',
              color: '#374151',
              margin: '0',
              lineHeight: '1.6',
              fontStyle: 'italic',
              fontWeight: '500',
              maxWidth: '650px',
              marginLeft: 'auto',
              marginRight: 'auto'
            }}>
              "Your commitment to mastering Filipino workplace communication shows exceptional dedication to professional excellence."
            </p>
          </div>
        </div>

        {/* Bottom Section - Skills and Stats */}
        <div style={{
          marginBottom: '30px'
        }}>
          {/* Skills Section */}
          <div style={{
            textAlign: 'center',
            marginBottom: '30px'
          }}>
            <h3 style={{
              fontSize: '16px',
              fontWeight: '600',
              color: '#374151',
              margin: '0 0 20px 0',
              textTransform: 'uppercase',
              letterSpacing: '0.5px'
            }}>
              Skills covered
            </h3>
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '16px',
              flexWrap: 'wrap'
            }}>
              <div style={{
                padding: '10px 20px',
                backgroundColor: '#f8fafc',
                borderRadius: '20px',
                fontSize: '15px',
                fontWeight: '500',
                color: '#374151',
                border: '1px solid #e2e8f0',
                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.06)',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}>
                💼 Workplace Communication
              </div>
              <div style={{
                padding: '10px 20px',
                backgroundColor: '#f8fafc',
                borderRadius: '20px',
                fontSize: '15px',
                fontWeight: '500',
                color: '#374151',
                border: '1px solid #e2e8f0',
                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.06)',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}>
                🌏 Cultural Navigation
              </div>
              <div style={{
                padding: '10px 20px',
                backgroundColor: '#f8fafc',
                borderRadius: '20px',
                fontSize: '15px',
                fontWeight: '500',
                color: '#374151',
                border: '1px solid #e2e8f0',
                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.06)',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}>
                ⭐ Professional Confidence
              </div>
            </div>
          </div>

          {/* Achievement Stats */}
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '40px'
          }}>
            <div style={{
              textAlign: 'center'
            }}>
              <div style={{
                fontSize: '24px',
                fontWeight: 'bold',
                color: '#0073cf',
                marginBottom: '4px'
              }}>
                {lessonsCompleted}
              </div>
              <div style={{
                fontSize: '12px',
                color: '#6b7280',
                textTransform: 'uppercase',
                letterSpacing: '0.5px'
              }}>
                Lessons
              </div>
            </div>
            <div style={{
              width: '1px',
              backgroundColor: '#e5e7eb',
              height: '40px'
            }} />
            <div style={{
              textAlign: 'center'
            }}>
              <div style={{
                fontSize: '24px',
                fontWeight: 'bold',
                color: '#0073cf',
                marginBottom: '4px'
              }}>
                100%
              </div>
              <div style={{
                fontSize: '12px',
                color: '#6b7280',
                textTransform: 'uppercase',
                letterSpacing: '0.5px'
              }}>
                Complete
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Bottom Badge */}
      <div style={{
        position: 'absolute',
        bottom: '35px',
        right: '35px',
        zIndex: 3
      }}>
        <div style={{
          width: '90px',
          height: '90px',
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #0073cf 0%, #00a3e0 100%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '8px',
          fontWeight: 'bold',
          color: '#ffffff',
          textAlign: 'center',
          lineHeight: '1.2',
          boxShadow: '0 8px 24px rgba(0, 115, 207, 0.25)',
          border: '3px solid #ffffff',
          position: 'relative'
        }}>
          {/* Inner circle */}
          <div style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '70px',
            height: '70px',
            borderRadius: '50%',
            border: '2px solid rgba(255, 255, 255, 0.3)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <div style={{
              width: '50px',
              height: '50px',
              borderRadius: '50%',
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }} />
          </div>
          
          {/* Text overlay */}
          <div style={{
            position: 'relative',
            zIndex: 2,
            textShadow: '0 1px 2px rgba(0, 0, 0, 0.1)'
          }}>
            <div>COURSE</div>
            <div>COMPLETION</div>
          </div>
        </div>
      </div>

      {/* Trophy Achievement Badge */}
      <div style={{
        position: 'absolute',
        bottom: '35px',
        left: '35px',
        zIndex: 3
      }}>
        <div style={{
          width: '90px',
          height: '90px',
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 8px 24px rgba(255, 215, 0, 0.4)',
          border: '3px solid #FFFFFF',
          position: 'relative'
        }}>
          <div style={{
            fontSize: '40px',
            filter: 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3))',
            textShadow: '0 1px 2px rgba(0, 0, 0, 0.2)'
          }}>
            🏆
          </div>
        </div>
      </div>
    </div>
  )
} 
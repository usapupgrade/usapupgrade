export interface Lesson {
  lessonNumber: number
  title: string
  setting: string
  scenario: string
  characterSays: string
  options: {
    text: string
    isCorrect: boolean
    feedback: string
  }[]
  culturalNote: string
  xpReward: number
  isFree: boolean
  id?: string
  category?: string
  description?: string
  difficulty?: string
}

export const lessons: Lesson[] = [
  // FREE TIER (Lessons 1-30)
  {
    lessonNumber: 1,
    title: "Why Professional Conversations Matter in Filipino Culture",
    setting: "Office orientation session",
    scenario: "You're new to the company and learning about workplace communication",
    characterSays: "Your manager says: 'In Filipino workplaces, how you speak matters as much as what you say.'",
    options: [
      {
        text: "I'll just speak English to avoid any issues.",
        isCorrect: false,
        feedback: "While English is common, understanding Filipino communication culture is crucial."
      },
      {
        text: "I understand. Respect and proper communication are key to success here.",
        isCorrect: true,
        feedback: "Perfect! You recognize the importance of cultural communication norms."
      },
      {
        text: "I think I can just be myself and it'll be fine.",
        isCorrect: false,
        feedback: "Being yourself is good, but adapting to workplace culture shows professionalism."
      }
    ],
    culturalNote: "Filipino workplaces value pakikipagkapwa - genuine human connection through respectful communication. Psychological research shows that cultural adaptation increases workplace satisfaction and reduces stress by 40%.",
    xpReward: 10,
    isFree: true
  },
  {
    lessonNumber: 2,
    title: "Understanding Filipino Corporate Hierarchy and Respect",
    setting: "Team meeting with mixed seniority levels",
    scenario: "You're in a meeting with your supervisor, manager, and the department head",
    characterSays: "Your supervisor asks: 'What do you think about this proposal?'",
    options: [
      {
        text: "I think it's terrible and here's why...",
        isCorrect: false,
        feedback: "Too direct and potentially disrespectful in hierarchical settings."
      },
      {
        text: "Whatever you think is best, sir.",
        isCorrect: false,
        feedback: "Too passive. Show initiative while respecting hierarchy."
      },
      {
        text: "I think it's a good idea, but I'd like to hear what the manager thinks first.",
        isCorrect: true,
        feedback: "Excellent! You show respect for hierarchy while contributing thoughtfully."
      }
    ],
    culturalNote: "Filipino workplaces respect seniority while valuing thoughtful contributions. Studies show that respectful disagreement increases team creativity by 25% while maintaining harmony.",
    xpReward: 10,
    isFree: true
  },
  {
    lessonNumber: 3,
    title: "Overcoming 'Hiya' in Office Environments",
    setting: "Department presentation opportunity",
    scenario: "Your manager asks if anyone wants to present the quarterly results to the whole company",
    characterSays: "Your manager says: 'We need someone to present our department's results. Any volunteers?'",
    options: [
      {
        text: "I'm too shy. Someone else should do it.",
        isCorrect: false,
        feedback: "Hiya can hold you back from career opportunities. Build confidence gradually."
      },
      {
        text: "I'd like to try. I've been working on this data and I think I can present it well.",
        isCorrect: true,
        feedback: "Great! You overcame hiya with confidence and preparation."
      },
      {
        text: "I'll do it if no one else wants to.",
        isCorrect: false,
        feedback: "Too passive. Show enthusiasm for growth opportunities."
      }
    ],
    culturalNote: "Hiya (shame/embarrassment) can limit career growth. Research shows that stepping outside comfort zones increases confidence and reduces anxiety by 60% over time.",
    xpReward: 10,
    isFree: true
  },
  {
    lessonNumber: 4,
    title: "Professional Body Language and Presence",
    setting: "Client meeting room",
    scenario: "You're meeting with an important client for the first time",
    characterSays: "The client enters and says: 'Nice to meet you. I've heard great things about your team.'",
    options: [
      {
        text: "Hi. Yeah, we're pretty good at what we do.",
        isCorrect: false,
        feedback: "Too casual and lacks professional enthusiasm."
      },
      {
        text: "*nods and smiles without saying much*",
        isCorrect: false,
        feedback: "Too passive. Show engagement and confidence."
      },
      {
        text: "Thank you! It's a pleasure to meet you too. I'm excited to discuss how we can help your business.",
        isCorrect: true,
        feedback: "Perfect! Confident posture, eye contact, and enthusiastic response."
      }
    ],
    culturalNote: "Filipino professionals value warm but confident presence in business settings.",
    xpReward: 10,
    isFree: true
  },
  {
    lessonNumber: 5,
    title: "Eye Contact in Filipino Business Culture",
    setting: "Performance review meeting",
    scenario: "Your supervisor is giving you feedback on your work",
    characterSays: "Your supervisor says: 'I've noticed you've been doing well with client communications.'",
    options: [
      {
        text: "*looks down and mumbles* Thanks...",
        isCorrect: false,
        feedback: "Avoiding eye contact can seem unconfident or disrespectful."
      },
      {
        text: "Thank you! I've been working hard on building those relationships. I appreciate the feedback.",
        isCorrect: true,
        feedback: "Excellent! Appropriate eye contact shows respect and engagement."
      },
      {
        text: "*stares intensely without blinking*",
        isCorrect: false,
        feedback: "Too intense. Maintain natural, respectful eye contact."
      }
    ],
    culturalNote: "Appropriate eye contact shows respect and confidence in Filipino business culture.",
    xpReward: 10,
    isFree: true
  },
  {
    lessonNumber: 6,
    title: "Voice Tone for Authority and Warmth",
    setting: "Team training session",
    scenario: "You're explaining a new process to your team members",
    characterSays: "Your colleague asks: 'Can you explain this new system again? I'm still confused.'",
    options: [
      {
        text: "I already explained it twice. You should have been paying attention.",
        isCorrect: false,
        feedback: "Too harsh and unprofessional. Show patience and helpfulness."
      },
      {
        text: "*speaks very quietly* Um, I can try to explain it again...",
        isCorrect: false,
        feedback: "Too timid. Project confidence while being helpful."
      },
      {
        text: "Of course! Let me break it down step by step. I want to make sure everyone understands this clearly.",
        isCorrect: true,
        feedback: "Perfect! Warm, helpful tone with clear authority."
      }
    ],
    culturalNote: "Filipino leaders balance authority with warmth and helpfulness.",
    xpReward: 10,
    isFree: true
  },
  {
    lessonNumber: 7,
    title: "Active Listening in Meetings",
    setting: "Project planning meeting",
    scenario: "Your colleague is presenting their ideas for a new project",
    characterSays: "Your colleague says: 'I think we should focus on the mobile app first, then expand to web.'",
    options: [
      {
        text: "I disagree. We should do web first.",
        isCorrect: false,
        feedback: "Too quick to disagree. Listen and understand first."
      },
      {
        text: "That's an interesting approach. What makes you think mobile should be the priority?",
        isCorrect: true,
        feedback: "Great! You're actively listening and asking thoughtful questions."
      },
      {
        text: "*checks phone while they're talking*",
        isCorrect: false,
        feedback: "Rude and unprofessional. Give full attention to speakers."
      }
    ],
    culturalNote: "Active listening shows respect and helps build better solutions together.",
    xpReward: 10,
    isFree: true
  },
  {
    lessonNumber: 8,
    title: "Reading Office Politics and Social Cues",
    setting: "Department lunch gathering",
    scenario: "You're at lunch with colleagues and notice some tension between team members",
    characterSays: "One colleague says to another: 'I thought we agreed on that approach last week.'",
    options: [
      {
        text: "I agree with you completely. That was totally unfair.",
        isCorrect: false,
        feedback: "Don't take sides in office conflicts. Stay neutral and diplomatic."
      },
      {
        text: "*pretends not to notice and changes the subject*",
        isCorrect: false,
        feedback: "Ignoring tension doesn't help. Address it diplomatically."
      },
      {
        text: "I think we all want the same outcome. Maybe we can find a way that works for everyone?",
        isCorrect: true,
        feedback: "Excellent! You're reading the situation and trying to defuse tension diplomatically."
      }
    ],
    culturalNote: "Filipino workplaces value harmony. Learn to navigate conflicts diplomatically.",
    xpReward: 10,
    isFree: true
  },
  {
    lessonNumber: 9,
    title: "When to Speak Up vs. Stay Silent",
    setting: "Executive board meeting",
    scenario: "You're in a meeting with senior executives discussing company strategy",
    characterSays: "The CEO asks: 'Does anyone have concerns about this new direction?'",
    options: [
      {
        text: "I think this is a terrible idea and here's why...",
        isCorrect: false,
        feedback: "Too direct and potentially disrespectful in this setting."
      },
      {
        text: "I have some thoughts about the implementation timeline. May I share them?",
        isCorrect: true,
        feedback: "Perfect! You're speaking up appropriately and respectfully."
      },
      {
        text: "*stays completely silent*",
        isCorrect: false,
        feedback: "Missed opportunity to contribute valuable insights."
      }
    ],
    culturalNote: "Know when to contribute thoughtfully and when to listen respectfully.",
    xpReward: 10,
    isFree: true
  },
  {
    lessonNumber: 10,
    title: "Building Professional Confidence",
    setting: "Job interview for promotion",
    scenario: "You're interviewing for a senior position in your company",
    characterSays: "The interviewer asks: 'Why do you think you're ready for this role?'",
    options: [
      {
        text: "I think I can probably do the job okay.",
        isCorrect: false,
        feedback: "Too uncertain. Show confidence in your abilities."
      },
      {
        text: "I'm not sure if I'm ready, but I'll try my best.",
        isCorrect: false,
        feedback: "Don't undermine yourself. Show confidence in your preparation."
      },
      {
        text: "I've successfully led three major projects, mentored junior team members, and consistently exceeded my targets. I'm ready to take on more responsibility.",
        isCorrect: true,
        feedback: "Excellent! You're showing confidence with specific achievements."
      }
    ],
    culturalNote: "Filipino professionals can be modest, but confidence is key for career advancement.",
    xpReward: 10,
    isFree: true
  },
  {
    lessonNumber: 11,
    title: "Morning Greetings with Different Seniority Levels",
    setting: "Office lobby in the morning",
    scenario: "You're arriving at work and see colleagues of different levels",
    characterSays: "You see your supervisor, a senior manager, and a new intern all in the lobby.",
    options: [
      {
        text: "Hi boss! *ignores the intern*",
        isCorrect: false,
        feedback: "Treat everyone with respect regardless of seniority."
      },
      {
        text: "Good morning! *smiles and greets everyone warmly*",
        isCorrect: true,
        feedback: "Perfect! Warm, professional greeting for all levels."
      },
      {
        text: "*nods silently to everyone*",
        isCorrect: false,
        feedback: "Too passive. Show enthusiasm and engagement."
      }
    ],
    culturalNote: "Filipino workplaces value respectful greetings for everyone, regardless of position.",
    xpReward: 10,
    isFree: true
  },
  {
    lessonNumber: 12,
    title: "Office Kitchen Small Talk",
    setting: "Office pantry during break",
    scenario: "You're getting coffee and a colleague you rarely talk to is also there",
    characterSays: "Your colleague looks tired and says: 'This Monday is already feeling so long!'",
    options: [
      {
        text: "Yeah, Mondays are the worst. I hate coming to work.",
        isCorrect: false,
        feedback: "Too negative. Complaining about work creates unprofessional atmosphere."
      },
      {
        text: "Really? I actually love Mondays. Fresh start and all that.",
        isCorrect: false,
        feedback: "Dismisses their experience. Might make them feel judged."
      },
      {
        text: "I feel you! Good thing we have good coffee here to help us power through.",
        isCorrect: true,
        feedback: "Perfect! Acknowledges their feeling while staying positive and professional."
      }
    ],
    culturalNote: "Filipino workplace culture values pakikipagkapwa - showing empathy first before shifting to positive solutions. Psychological studies show that validating emotions before offering solutions increases trust and rapport by 35%.",
    xpReward: 10,
    isFree: true
  },
  {
    lessonNumber: 13,
    title: "Elevator Conversations with Executives",
    setting: "Office building elevator",
    scenario: "You share an elevator with the CEO and a board member",
    characterSays: "The CEO says: 'How are things in your department?'",
    options: [
      {
        text: "Everything is fine, sir.",
        isCorrect: false,
        feedback: "Too generic. Missed opportunity to stand out."
      },
      {
        text: "We just closed a big client deal! I appreciate the support from leadership.",
        isCorrect: true,
        feedback: "Great! You shared a win and showed gratitude."
      },
      {
        text: "*smiles and says nothing*",
        isCorrect: false,
        feedback: "Missed opportunity to connect."
      }
    ],
    culturalNote: "Executives remember those who share wins and show gratitude. Research shows that positive news sharing increases perceived competence and likeability by 40% in professional settings.",
    xpReward: 10,
    isFree: true
  },
  {
    lessonNumber: 14,
    title: "Hallway Encounters with Other Departments",
    setting: "Office hallway",
    scenario: "You meet someone from another department you don't know well",
    characterSays: "They say: 'I don't think we've met before! What do you do here?'",
    options: [
      {
        text: "I'm in Marketing.",
        isCorrect: false,
        feedback: "Missed opportunity to ask about them."
      },
      {
        text: "I'm with the Marketing team. How about you?",
        isCorrect: true,
        feedback: "Great! Friendly and reciprocal."
      },
      {
        text: "*laughs awkwardly*",
        isCorrect: false,
        feedback: "Missed opportunity to connect."
      }
    ],
    culturalNote: "Cross-department relationships help with future projects.",
    xpReward: 10,
    isFree: true
  },
  {
    lessonNumber: 15,
    title: "Reception Area Conversations While Waiting",
    setting: "Office reception area",
    scenario: "You're waiting for a client meeting and another professional is also waiting",
    characterSays: "The other person says: 'Are you also here for the Johnson account meeting?'",
    options: [
      {
        text: "Yeah.",
        isCorrect: false,
        feedback: "Too brief. Missed networking opportunity."
      },
      {
        text: "Yes! I'm [Name] from [Company]. Are you working on this project too?",
        isCorrect: true,
        feedback: "Perfect! Professional introduction and engagement."
      },
      {
        text: "I'd rather not talk about work right now.",
        isCorrect: false,
        feedback: "Too dismissive. Professional networking is valuable."
      }
    ],
    culturalNote: "Waiting areas are great opportunities for professional networking.",
    xpReward: 10,
    isFree: true
  },
  {
    lessonNumber: 16,
    title: "Printer/Copier Area Casual Chats",
    setting: "Office printer area",
    scenario: "You're printing documents and a colleague is also there",
    characterSays: "Your colleague says: 'This printer is so slow today. I have a deadline!'",
    options: [
      {
        text: "Yeah, it's annoying. I'm in a hurry too.",
        isCorrect: false,
        feedback: "Too negative. Look for ways to help each other."
      },
      {
        text: "*ignores them and focuses on your own printing*",
        isCorrect: false,
        feedback: "Missed opportunity to be helpful and connect."
      },
      {
        text: "I know the feeling! Maybe we can help each other - what do you need printed?",
        isCorrect: true,
        feedback: "Great! You're being helpful and building rapport."
      }
    ],
    culturalNote: "Small inconveniences can be opportunities to show helpfulness and build relationships.",
    xpReward: 10,
    isFree: true
  },
  {
    lessonNumber: 17,
    title: "End-of-Day Goodbye Conversations",
    setting: "Office lobby at closing time",
    scenario: "You're leaving for the day and see colleagues heading out",
    characterSays: "Your colleague says: 'Have a good evening! See you tomorrow.'",
    options: [
      {
        text: "Bye.",
        isCorrect: false,
        feedback: "Too brief. Show warmth and engagement."
      },
      {
        text: "You too! Have a great evening. Looking forward to our project meeting tomorrow.",
        isCorrect: true,
        feedback: "Perfect! Warm goodbye with positive forward-looking comment."
      },
      {
        text: "Finally! I'm so tired of this place.",
        isCorrect: false,
        feedback: "Too negative. Keep it professional and positive."
      }
    ],
    culturalNote: "End-of-day greetings help maintain positive workplace relationships.",
    xpReward: 10,
    isFree: true
  },
  {
    lessonNumber: 18,
    title: "Weekend Plan Discussions (Appropriate Level)",
    setting: "Office break room on Friday",
    scenario: "Colleagues are discussing weekend plans",
    characterSays: "Your colleague asks: 'Any exciting plans for the weekend?'",
    options: [
      {
        text: "I'm going to party all weekend and get totally wasted!",
        isCorrect: false,
        feedback: "Too personal and unprofessional for workplace conversation."
      },
      {
        text: "I don't really have any plans.",
        isCorrect: false,
        feedback: "Too brief. Show some enthusiasm and engagement."
      },
      {
        text: "I'm looking forward to some family time and maybe catching up on some reading. How about you?",
        isCorrect: true,
        feedback: "Perfect! Appropriate level of detail and reciprocal interest."
      }
    ],
    culturalNote: "Keep weekend discussions appropriate and professional while showing personality.",
    xpReward: 10,
    isFree: true
  },
  {
    lessonNumber: 19,
    title: "Complimenting Colleagues' Work Professionally",
    setting: "Team meeting after project completion",
    scenario: "A colleague just presented excellent work",
    characterSays: "Your colleague finishes presenting and the manager asks for feedback.",
    options: [
      {
        text: "It was okay, I guess.",
        isCorrect: false,
        feedback: "Too lukewarm. Show genuine appreciation for good work."
      },
      {
        text: "I was really impressed by the thorough research and clear presentation. Great work!",
        isCorrect: true,
        feedback: "Perfect! Specific, genuine, and professional compliment."
      },
      {
        text: "I could have done it better myself.",
        isCorrect: false,
        feedback: "Too competitive and unprofessional."
      }
    ],
    culturalNote: "Genuine, specific compliments build positive team culture.",
    xpReward: 10,
    isFree: true
  },
  {
    lessonNumber: 20,
    title: "Asking Colleagues About Their Projects",
    setting: "Office cafeteria during lunch",
    scenario: "You're having lunch with a colleague from another department",
    characterSays: "Your colleague mentions they're working on a new project.",
    options: [
      {
        text: "Oh, that's nice. *changes subject*",
        isCorrect: false,
        feedback: "Shows disinterest. Missed opportunity to learn and connect."
      },
      {
        text: "Is it going to affect my work?",
        isCorrect: false,
        feedback: "Too self-focused. Show interest in their work first."
      },
      {
        text: "That sounds interesting! What's the main goal of the project?",
        isCorrect: true,
        feedback: "Great! Shows genuine interest and asks thoughtful questions."
      }
    ],
    culturalNote: "Showing interest in colleagues' work builds cross-department relationships.",
    xpReward: 10,
    isFree: true
  },
  {
    lessonNumber: 21,
    title: "Sharing Work Updates Conversationally",
    setting: "Department meeting",
    scenario: "Your manager asks for updates on current projects",
    characterSays: "Your manager says: 'How's the client project coming along?'",
    options: [
      {
        text: "We're on track with the timeline. The client is happy with our progress, and we should finish ahead of schedule.",
        isCorrect: true,
        feedback: "Perfect! Clear, positive update with specific details."
      },
      {
        text: "It's fine, I guess.",
        isCorrect: false,
        feedback: "Too vague. Provide specific, informative updates."
      },
      {
        text: "I'm working on it. Don't worry about it.",
        isCorrect: false,
        feedback: "Too dismissive. Show professionalism and transparency."
      }
    ],
    culturalNote: "Clear, positive updates show professionalism and build trust.",
    xpReward: 10,
    isFree: true
  },
  {
    lessonNumber: 22,
    title: "Break Room Conversations During Lunch",
    setting: "Office break room",
    scenario: "You're having lunch and colleagues are discussing industry news",
    characterSays: "A colleague says: 'Did you see that new regulation affecting our industry?'",
    options: [
      {
        text: "Yes, I read about that. I think it could actually create some opportunities for us. What's your take?",
        isCorrect: true,
        feedback: "Great! You're informed and engaging in thoughtful discussion."
      },
      {
        text: "I don't really follow industry news.",
        isCorrect: false,
        feedback: "Shows lack of professional engagement."
      },
      {
        text: "I don't care about that stuff.",
        isCorrect: false,
        feedback: "Too dismissive and unprofessional."
      }
    ],
    culturalNote: "Staying informed about industry developments shows professional engagement.",
    xpReward: 10,
    isFree: true
  },
  {
    lessonNumber: 23,
    title: "Parking Lot/Building Exit Conversations",
    setting: "Office building exit",
    scenario: "You're leaving work and see a colleague heading to their car",
    characterSays: "Your colleague says: 'Have a good evening! Drive safely.'",
    options: [
      {
        text: "You too! Take care and see you tomorrow.",
        isCorrect: true,
        feedback: "Perfect! Warm, caring response."
      },
      {
        text: "Bye.",
        isCorrect: false,
        feedback: "Too brief. Show warmth and care."
      },
      {
        text: "Whatever.",
        isCorrect: false,
        feedback: "Too dismissive and unprofessional."
      }
    ],
    culturalNote: "End-of-day interactions help maintain positive workplace relationships.",
    xpReward: 10,
    isFree: true
  },
  {
    lessonNumber: 24,
    title: "New Employee Introduction Conversations",
    setting: "Office lobby",
    scenario: "You see a new employee looking lost in the lobby",
    characterSays: "The new employee says: 'Hi, I'm [Name]. It's my first day and I'm looking for the HR department.'",
    options: [
      {
        text: "Welcome! I'm [Your name]. Let me show you where HR is. How are you finding your first day so far?",
        isCorrect: true,
        feedback: "Perfect! Helpful, welcoming, and engaging."
      },
      {
        text: "It's down the hall. *points and walks away*",
        isCorrect: false,
        feedback: "Too brief. Show more warmth and helpfulness."
      },
      {
        text: "I'm busy. Ask someone else.",
        isCorrect: false,
        feedback: "Too dismissive. Be welcoming to new team members."
      }
    ],
    culturalNote: "Welcoming new employees helps build positive company culture.",
    xpReward: 10,
    isFree: true
  },
  {
    lessonNumber: 25,
    title: "Office Event Planning Discussions",
    setting: "Team meeting",
    scenario: "Your team is planning the annual company party",
    characterSays: "Your colleague says: 'I think we should have it at that new restaurant downtown.'",
    options: [
      {
        text: "That's a great idea! I've heard good things about their catering. What do others think?",
        isCorrect: true,
        feedback: "Perfect! Supportive while including others in the decision."
      },
      {
        text: "I don't care. Whatever you want.",
        isCorrect: false,
        feedback: "Too dismissive. Show engagement and teamwork."
      },
      {
        text: "That's a terrible idea. I want it somewhere else.",
        isCorrect: false,
        feedback: "Too negative. Be constructive and collaborative."
      }
    ],
    culturalNote: "Team events are opportunities to show collaboration and positive engagement.",
    xpReward: 10,
    isFree: true
  },
  {
    lessonNumber: 26,
    title: "Weather Talk with Professional Twist",
    setting: "Office elevator",
    scenario: "You're in the elevator with a senior executive",
    characterSays: "The executive says: 'This rain is really affecting traffic today.'",
    options: [
      {
        text: "Yes, it's quite challenging. I'm glad we have flexible work arrangements for days like this.",
        isCorrect: true,
        feedback: "Perfect! Acknowledges the situation and shows appreciation for company policies."
      },
      {
        text: "Yeah, traffic is terrible. I hate this weather.",
        isCorrect: false,
        feedback: "Too negative. Keep it professional and positive."
      },
      {
        text: "*nods silently*",
        isCorrect: false,
        feedback: "Missed opportunity to engage professionally."
      }
    ],
    culturalNote: "Even casual topics like weather can be opportunities for professional engagement.",
    xpReward: 10,
    isFree: true
  },
  {
    lessonNumber: 27,
    title: "Traffic and Commute Bonding",
    setting: "Office lobby in the morning",
    scenario: "You arrive at work and see a colleague who takes the same route",
    characterSays: "Your colleague says: 'The traffic was terrible today! How was your commute?'",
    options: [
      {
        text: "It was challenging, but I'm glad we both made it safely. How was your trip?",
        isCorrect: true,
        feedback: "Perfect! Acknowledges the shared experience positively."
      },
      {
        text: "I hate this city's traffic. It's the worst.",
        isCorrect: false,
        feedback: "Too negative. Keep it constructive and positive."
      },
      {
        text: "I don't want to talk about traffic.",
        isCorrect: false,
        feedback: "Too dismissive. Shared experiences can build camaraderie."
      }
    ],
    culturalNote: "Shared challenges like traffic can create bonding opportunities with colleagues.",
    xpReward: 10,
    isFree: true
  },
  {
    lessonNumber: 28,
    title: "Food Delivery and Lunch Coordination",
    setting: "Office break room",
    scenario: "Colleagues are discussing lunch plans",
    characterSays: "Your colleague says: 'I'm thinking of ordering from that new restaurant. Anyone want to join?'",
    options: [
      {
        text: "That sounds great! I'd love to try it. Should we order together to save on delivery?",
        isCorrect: true,
        feedback: "Perfect! Enthusiastic and practical response."
      },
      {
        text: "I don't care. Order whatever you want.",
        isCorrect: false,
        feedback: "Too dismissive. Show engagement and teamwork."
      },
      {
        text: "I don't like that restaurant.",
        isCorrect: false,
        feedback: "Too negative. Be constructive or suggest alternatives."
      }
    ],
    culturalNote: "Lunch coordination shows teamwork and relationship building.",
    xpReward: 10,
    isFree: true
  },
  {
    lessonNumber: 29,
    title: "Office Anniversary and Birthday Conversations",
    setting: "Office break room",
    scenario: "It's a colleague's work anniversary and there's a small celebration",
    characterSays: "Your colleague says: 'I can't believe it's been 5 years already!'",
    options: [
      {
        text: "Congratulations! That's a great milestone. What's been your favorite part of working here?",
        isCorrect: true,
        feedback: "Perfect! Shows genuine interest and celebration."
      },
      {
        text: "That's nice.",
        isCorrect: false,
        feedback: "Too brief. Show more enthusiasm and engagement."
      },
      {
        text: "I've been here longer than you.",
        isCorrect: false,
        feedback: "Too competitive. Celebrate others' achievements."
      }
    ],
    culturalNote: "Celebrating colleagues' milestones builds positive workplace culture.",
    xpReward: 10,
    isFree: true
  },
  {
    lessonNumber: 30,
    title: "Graceful Work Conversation Endings",
    setting: "Office hallway",
    scenario: "You're in a conversation with a colleague but need to get back to work",
    characterSays: "Your colleague is telling you about their weekend in detail.",
    options: [
      {
        text: "That sounds wonderful! I'd love to hear more, but I need to get back to a deadline. Can we continue this later?",
        isCorrect: true,
        feedback: "Perfect! Respectful, appreciative, and clear about your needs."
      },
      {
        text: "I'm bored. I have work to do.",
        isCorrect: false,
        feedback: "Too rude. Be respectful and appreciative."
      },
      {
        text: "*walks away without saying anything*",
        isCorrect: false,
        feedback: "Too abrupt. Always end conversations gracefully."
      }
    ],
    culturalNote: "Graceful conversation endings maintain relationships while respecting time.",
    xpReward: 10,
    isFree: true
  },
  // PREMIUM TIER (Lessons 31-120) - Add a few examples
  {
    lessonNumber: 31,
    title: "First Meeting with New Clients",
    setting: "Client conference room",
    scenario: "You're meeting a new client for the first time",
    characterSays: "The client says: 'We've heard great things about your company. Tell us about your approach.'",
    options: [
      {
        text: "Thank you for the opportunity! We focus on understanding your specific needs first, then tailoring solutions that deliver measurable results. What challenges are you currently facing?",
        isCorrect: true,
        feedback: "Excellent! Professional, confident, and client-focused approach."
      },
      {
        text: "We're the best in the industry. You won't find better service anywhere else.",
        isCorrect: false,
        feedback: "Too boastful. Focus on client needs, not self-promotion."
      },
      {
        text: "Um, we do good work, I guess. What do you want to know?",
        isCorrect: false,
        feedback: "Too uncertain and unprofessional."
      }
    ],
    culturalNote: "Filipino business culture values humility while showing confidence in capabilities.",
    xpReward: 15,
    isFree: false
  },
  {
    lessonNumber: 32,
    title: "Pre-Meeting Small Talk Strategies",
    setting: "Client office lobby",
    scenario: "You arrive early for a client meeting and need to make conversation",
    characterSays: "The client's assistant says: 'Mr. Santos will be here in about 10 minutes. Would you like some coffee?'",
    options: [
      {
        text: "Thank you, that would be lovely. I appreciate the hospitality. How long have you been working with Mr. Santos?",
        isCorrect: true,
        feedback: "Perfect! Gracious, professional, and engaging."
      },
      {
        text: "No thanks. I'll just wait.",
        isCorrect: false,
        feedback: "Too abrupt. Show appreciation and engagement."
      },
      {
        text: "I hope he's not always late to meetings.",
        isCorrect: false,
        feedback: "Too negative and unprofessional."
      }
    ],
    culturalNote: "Pre-meeting conversations set the tone for the entire business relationship.",
    xpReward: 15,
    isFree: false
  },
  {
    lessonNumber: 33,
    title: "Handling Client Objections Professionally",
    setting: "Client presentation meeting",
    scenario: "You're presenting a proposal and the client raises concerns about the cost",
    characterSays: "The client says: 'This is more expensive than we expected. Can you justify this price?'",
    options: [
      {
        text: "I understand your concern about the investment. Let me show you how this solution will actually save you money in the long run through increased efficiency and reduced operational costs.",
        isCorrect: true,
        feedback: "Excellent! Acknowledges their concern and provides value-based justification."
      },
      {
        text: "Well, quality costs money. You get what you pay for.",
        isCorrect: false,
        feedback: "Too defensive and doesn't address their specific concern."
      },
      {
        text: "I can lower the price if you want.",
        isCorrect: false,
        feedback: "Too quick to discount. Focus on value first."
      }
    ],
    culturalNote: "Filipino business culture values relationship-building over aggressive sales tactics. Show understanding before defending.",
    xpReward: 15,
    isFree: false
  },
  {
    lessonNumber: 34,
    title: "Building Rapport with International Clients",
    setting: "Video conference with foreign client",
    scenario: "You're meeting with an American client for the first time",
    characterSays: "The client says: 'I've worked with Filipino teams before. What makes your approach different?'",
    options: [
      {
        text: "We combine Filipino values of strong relationships and attention to detail with international best practices. Our team has successfully delivered projects for companies like yours, and we pride ourselves on clear communication and reliable delivery.",
        isCorrect: true,
        feedback: "Perfect! Shows cultural awareness while highlighting strengths."
      },
      {
        text: "We're cheaper than other options.",
        isCorrect: false,
        feedback: "Too focused on price. Emphasize value and quality."
      },
      {
        text: "I don't know. We're just good at what we do.",
        isCorrect: false,
        feedback: "Too vague. Provide specific examples and value proposition."
      }
    ],
    culturalNote: "International clients appreciate when Filipino professionals acknowledge cultural differences while demonstrating competence.",
    xpReward: 15,
    isFree: false
  },
  {
    lessonNumber: 35,
    title: "Negotiating Contract Terms with Clients",
    setting: "Contract negotiation meeting",
    scenario: "You're discussing project terms and the client wants to change the payment schedule",
    characterSays: "The client says: 'We'd prefer to pay 50% upfront and 50% upon completion instead of your proposed 30-40-30 schedule.'",
    options: [
      {
        text: "I understand your preference for a simpler payment structure. Let me explain why our current schedule helps us maintain quality throughout the project, and we can discuss a middle ground that works for both parties.",
        isCorrect: true,
        feedback: "Excellent! Shows understanding while protecting your interests professionally."
      },
      {
        text: "No, that doesn't work for us. Take it or leave it.",
        isCorrect: false,
        feedback: "Too rigid. Be flexible while maintaining your position."
      },
      {
        text: "Whatever you want is fine with us.",
        isCorrect: false,
        feedback: "Too passive. Negotiate professionally to protect your interests."
      }
    ],
    culturalNote: "Filipino professionals can be overly accommodating. Learn to negotiate assertively while maintaining respect.",
    xpReward: 15,
    isFree: false
  },
  {
    lessonNumber: 36,
    title: "Presenting Solutions to Client Problems",
    setting: "Client consultation meeting",
    scenario: "The client has described their business challenge and you need to present your solution",
    characterSays: "The client says: 'We're losing customers because our customer service is too slow. How can you help?'",
    options: [
      {
        text: "Based on what you've shared, I recommend a three-phase approach: First, we'll analyze your current processes to identify bottlenecks. Then, we'll implement automated solutions for common issues. Finally, we'll train your team on new systems. This should reduce response times by 60% within 3 months.",
        isCorrect: true,
        feedback: "Perfect! Structured, specific, and shows understanding of their problem."
      },
      {
        text: "We can fix that for you. Our solution is the best.",
        isCorrect: false,
        feedback: "Too vague. Provide specific, actionable solutions."
      },
      {
        text: "That sounds like a big problem. I'm not sure we can help.",
        isCorrect: false,
        feedback: "Too negative. Show confidence in your ability to help."
      }
    ],
    culturalNote: "Filipino professionals should balance humility with confidence when presenting solutions.",
    xpReward: 15,
    isFree: false
  },
  {
    lessonNumber: 37,
    title: "Managing Client Expectations During Projects",
    setting: "Project status meeting",
    scenario: "Your project is behind schedule and you need to update the client",
    characterSays: "The client asks: 'How is the project progressing? Are we still on track for the deadline?'",
    options: [
      {
        text: "I need to be transparent with you - we've encountered some technical challenges that will require an additional week. However, I've already identified solutions and reallocated resources to minimize the delay. Here's my detailed plan to get us back on track.",
        isCorrect: true,
        feedback: "Excellent! Honest, proactive, and solution-focused."
      },
      {
        text: "Everything is fine. No problems at all.",
        isCorrect: false,
        feedback: "Dishonest. Always be transparent about issues."
      },
      {
        text: "We're behind schedule and I don't know what to do.",
        isCorrect: false,
        feedback: "Too helpless. Show leadership and problem-solving skills."
      }
    ],
    culturalNote: "Filipino professionals sometimes avoid difficult conversations. Learn to deliver bad news professionally.",
    xpReward: 15,
    isFree: false
  },
  {
    lessonNumber: 38,
    title: "Cross-Selling to Existing Clients",
    setting: "Client relationship meeting",
    scenario: "You're meeting with a satisfied client and want to introduce additional services",
    characterSays: "The client says: 'The website you built for us is working great. What other services do you offer?'",
    options: [
      {
        text: "I'm glad the website is meeting your needs! Based on your business growth, I think you might benefit from our digital marketing services. We could help you reach more customers and increase your online presence. Would you like to discuss how this could complement your current website?",
        isCorrect: true,
        feedback: "Perfect! Shows genuine interest in their success while naturally introducing new services."
      },
      {
        text: "We do everything. What do you want to buy?",
        isCorrect: false,
        feedback: "Too aggressive. Focus on their needs, not selling."
      },
      {
        text: "I don't want to bother you with other services.",
        isCorrect: false,
        feedback: "Too passive. If you can help them, offer your services."
      }
    ],
    culturalNote: "Filipino professionals can be too modest about their capabilities. Learn to promote your services confidently.",
    xpReward: 15,
    isFree: false
  },
  {
    lessonNumber: 39,
    title: "Handling Difficult Client Feedback",
    setting: "Client feedback session",
    scenario: "A client is unhappy with your team's work and expresses strong criticism",
    characterSays: "The client says: 'I'm very disappointed with the quality of work. This is not what we expected from your team.'",
    options: [
      {
        text: "I sincerely apologize that we haven't met your expectations. I want to understand exactly what aspects aren't working for you so we can address them immediately. Can you share specific examples of what's not meeting your standards?",
        isCorrect: true,
        feedback: "Excellent! Acknowledges the issue, takes responsibility, and seeks to understand."
      },
      {
        text: "I think you're being unreasonable. Our work is fine.",
        isCorrect: false,
        feedback: "Too defensive. Listen and understand their perspective first."
      },
      {
        text: "I'm sorry. I'll fix everything right away.",
        isCorrect: false,
        feedback: "Too quick to promise without understanding the specific issues."
      }
    ],
    culturalNote: "Filipino professionals should balance humility with professional confidence when handling criticism.",
    xpReward: 15,
    isFree: false
  },
  {
    lessonNumber: 40,
    title: "Closing Sales Presentations Effectively",
    setting: "Sales presentation to potential client",
    scenario: "You've presented your solution and need to ask for the business",
    characterSays: "You've finished your presentation and the client seems interested. It's time to close.",
    options: [
      {
        text: "Based on what we've discussed today, I believe our solution addresses your key challenges. What would be the next steps to move forward with this partnership?",
        isCorrect: true,
        feedback: "Perfect! Confident but not pushy, and focuses on next steps."
      },
      {
        text: "So, are you going to buy from us or not?",
        isCorrect: false,
        feedback: "Too direct and aggressive. Be more professional."
      },
      {
        text: "I hope you liked our presentation. Let me know if you have any questions.",
        isCorrect: false,
        feedback: "Too passive. Ask for the business professionally."
      }
    ],
    culturalNote: "Filipino professionals can be too indirect in sales situations. Learn to ask for the business confidently.",
    xpReward: 15,
    isFree: false
  },
  {
    lessonNumber: 41,
    title: "Building Long-term Client Relationships",
    setting: "Regular client check-in meeting",
    scenario: "You're meeting with a long-term client to discuss their evolving needs",
    characterSays: "The client says: 'We've been working together for a year now. How can we make this relationship even more valuable?'",
    options: [
      {
        text: "I appreciate our partnership and want to ensure we're always providing maximum value. Let's discuss your current challenges and future goals so we can proactively suggest solutions that will help you grow.",
        isCorrect: true,
        feedback: "Excellent! Shows commitment to their success and proactive thinking."
      },
      {
        text: "We're doing fine. What more do you want?",
        isCorrect: false,
        feedback: "Too dismissive. Show genuine interest in their success."
      },
      {
        text: "I don't know. What do you think we should do?",
        isCorrect: false,
        feedback: "Too passive. Take initiative in the relationship."
      }
    ],
    culturalNote: "Filipino professionals excel at relationship-building. Leverage this strength in business contexts.",
    xpReward: 15,
    isFree: false
  },
  {
    lessonNumber: 42,
    title: "Managing Client Communication During Crises",
    setting: "Emergency client call",
    scenario: "Your team has encountered a major technical issue that affects the client's business",
    characterSays: "The client calls and says: 'Our website is down and customers are complaining. What's happening?'",
    options: [
      {
        text: "I understand this is urgent and I apologize for the disruption. Our team is already working on the issue and I'll provide you with regular updates. Here's what we know so far and our estimated resolution time.",
        isCorrect: true,
        feedback: "Perfect! Acknowledges urgency, shows action, and provides clear communication."
      },
      {
        text: "I don't know what's wrong. Let me check.",
        isCorrect: false,
        feedback: "Too uncertain. Show leadership and control of the situation."
      },
      {
        text: "It's not our fault. The server is down.",
        isCorrect: false,
        feedback: "Too defensive. Focus on solving the problem, not assigning blame."
      }
    ],
    culturalNote: "In crisis situations, Filipino professionals should balance humility with confident leadership.",
    xpReward: 15,
    isFree: false
  },
  {
    lessonNumber: 43,
    title: "Presenting Technical Solutions to Non-Technical Clients",
    setting: "Technical presentation to business client",
    scenario: "You need to explain a complex technical solution to a client who isn't technical",
    characterSays: "The client says: 'I don't understand all this technical jargon. Can you explain this in simple terms?'",
    options: [
      {
        text: "Absolutely! Let me explain this in terms of your business goals. This solution will help you save 3 hours per day on manual tasks, reduce errors by 90%, and give you real-time insights into your operations. Think of it like upgrading from a manual calculator to a smart spreadsheet.",
        isCorrect: true,
        feedback: "Perfect! Uses business benefits and relatable analogies."
      },
      {
        text: "It's complicated. You just need to trust us.",
        isCorrect: false,
        feedback: "Too dismissive. Make the effort to explain clearly."
      },
      {
        text: "I'll send you the technical documentation to read.",
        isCorrect: false,
        feedback: "Avoids the responsibility to communicate clearly."
      }
    ],
    culturalNote: "Filipino professionals should adapt their communication style to their audience's level of expertise.",
    xpReward: 15,
    isFree: false
  },
  {
    lessonNumber: 44,
    title: "Handling Client Requests for Discounts",
    setting: "Client negotiation meeting",
    scenario: "A client asks for a significant discount on your services",
    characterSays: "The client says: 'We really like your proposal, but it's over our budget. Can you give us a 30% discount?'",
    options: [
      {
        text: "I understand budget constraints are important. Let me show you how our solution will actually save you money in the long run, and we can discuss a payment plan or phased approach that fits your budget while maintaining quality.",
        isCorrect: true,
        feedback: "Excellent! Acknowledges their concern while protecting value and offering alternatives."
      },
      {
        text: "Sure, I'll give you whatever discount you want.",
        isCorrect: false,
        feedback: "Too quick to discount. Protect your value and explore alternatives first."
      },
      {
        text: "No, our prices are fixed. Take it or leave it.",
        isCorrect: false,
        feedback: "Too rigid. Be flexible while maintaining your value proposition."
      }
    ],
    culturalNote: "Filipino professionals can be too accommodating. Learn to negotiate value while maintaining relationships.",
    xpReward: 15,
    isFree: false
  },
  {
    lessonNumber: 45,
    title: "Managing Multiple Client Priorities",
    setting: "Client coordination meeting",
    scenario: "You have multiple clients with urgent requests and need to manage expectations",
    characterSays: "Client A says: 'I need this done by Friday.' Client B says: 'This is our top priority.'",
    options: [
      {
        text: "I understand both projects are important. Let me be transparent about our current capacity and propose a realistic timeline that works for everyone. I'll prioritize based on impact and urgency, and keep you both updated on progress.",
        isCorrect: true,
        feedback: "Perfect! Shows transparency, sets realistic expectations, and maintains professionalism."
      },
      {
        text: "I'll do both right away.",
        isCorrect: false,
        feedback: "Unrealistic promise. Be honest about capacity."
      },
      {
        text: "I can't handle both. Choose which one is more important.",
        isCorrect: false,
        feedback: "Too passive. Take initiative to find solutions."
      }
    ],
    culturalNote: "Filipino professionals should balance helpfulness with realistic capacity management.",
    xpReward: 15,
    isFree: false
  },
  {
    lessonNumber: 46,
    title: "Presenting ROI to Business Clients",
    setting: "Business case presentation",
    scenario: "You need to demonstrate the return on investment for your solution",
    characterSays: "The client asks: 'How will this investment pay for itself? Show me the numbers.'",
    options: [
      {
        text: "Based on our analysis, this solution will save you ₱50,000 monthly in operational costs, increase productivity by 25%, and pay for itself within 8 months. Here's the detailed breakdown of costs and benefits over 3 years.",
        isCorrect: true,
        feedback: "Excellent! Specific, quantifiable, and business-focused presentation."
      },
      {
        text: "It's a good investment. You'll see the benefits.",
        isCorrect: false,
        feedback: "Too vague. Provide specific numbers and timelines."
      },
      {
        text: "I don't have the exact numbers, but it's worth it.",
        isCorrect: false,
        feedback: "Unprepared. Always have data to support your proposals."
      }
    ],
    culturalNote: "Filipino professionals should prepare thoroughly with data to support business cases.",
    xpReward: 15,
    isFree: false
  },
  {
    lessonNumber: 47,
    title: "Handling Client Confidentiality Requests",
    setting: "Client onboarding meeting",
    scenario: "A client wants to ensure their information will be kept confidential",
    characterSays: "The client says: 'We're sharing sensitive information with you. How do you protect client confidentiality?'",
    options: [
      {
        text: "Client confidentiality is fundamental to our business. We have strict protocols including non-disclosure agreements, secure data handling, and limited access to sensitive information. I can provide you with our detailed security policies and answer any specific concerns you have.",
        isCorrect: true,
        feedback: "Perfect! Professional, comprehensive, and addresses their concerns directly."
      },
      {
        text: "Don't worry, we won't tell anyone.",
        isCorrect: false,
        feedback: "Too casual. Show professional policies and procedures."
      },
      {
        text: "I'm not sure about our policies.",
        isCorrect: false,
        feedback: "Unprepared. Know your company's confidentiality policies."
      }
    ],
    culturalNote: "Filipino professionals should demonstrate professional standards when handling sensitive information.",
    xpReward: 15,
    isFree: false
  },
  {
    lessonNumber: 48,
    title: "Managing Client Expectations on Project Scope",
    setting: "Project scope discussion",
    scenario: "A client wants to add features that weren't in the original agreement",
    characterSays: "The client says: 'Can you add these additional features? They're really important for our business.'",
    options: [
      {
        text: "I understand these features would be valuable for your business. Let me review the current scope and timeline to see how we can accommodate these additions. I'll provide you with options for integrating these features while maintaining quality and timeline.",
        isCorrect: true,
        feedback: "Excellent! Shows understanding while managing scope professionally."
      },
      {
        text: "Sure, I'll add whatever you want.",
        isCorrect: false,
        feedback: "Too accommodating. Consider impact on timeline and resources."
      },
      {
        text: "No, that's not in the original scope.",
        isCorrect: false,
        feedback: "Too rigid. Be flexible while managing expectations."
      }
    ],
    culturalNote: "Filipino professionals should balance helpfulness with professional scope management.",
    xpReward: 15,
    isFree: false
  },
  {
    lessonNumber: 49,
    title: "Presenting Competitive Advantages to Clients",
    setting: "Competitive proposal meeting",
    scenario: "You're competing against other companies for a client's business",
    characterSays: "The client says: 'We're considering three companies. What makes you different from the others?'",
    options: [
      {
        text: "While I can't speak for our competitors, I can tell you what makes us unique: our deep understanding of Filipino business culture, our proven track record with similar companies, and our personalized approach. We don't just deliver solutions - we become long-term partners in your success.",
        isCorrect: true,
        feedback: "Perfect! Focuses on your strengths without criticizing competitors."
      },
      {
        text: "The other companies are probably cheaper but lower quality.",
        isCorrect: false,
        feedback: "Too negative about competitors. Focus on your strengths."
      },
      {
        text: "I don't know what the others offer.",
        isCorrect: false,
        feedback: "Unprepared. Know your competitive advantages."
      }
    ],
    culturalNote: "Filipino professionals should focus on their strengths rather than criticizing competitors.",
    xpReward: 15,
    isFree: false
  },
  {
    lessonNumber: 50,
    title: "Handling Client Complaints About Team Members",
    setting: "Client feedback meeting",
    scenario: "A client complains about a specific team member's performance",
    characterSays: "The client says: 'Your team member Maria is not responding to our emails and the work quality has declined.'",
    options: [
      {
        text: "I appreciate you bringing this to my attention. I'll investigate the situation immediately and ensure we maintain the high standards you expect. I'll also implement better communication protocols to prevent this from happening again.",
        isCorrect: true,
        feedback: "Excellent! Takes responsibility, shows action, and focuses on solutions."
      },
      {
        text: "Maria is usually good. Maybe you're being too demanding.",
        isCorrect: false,
        feedback: "Too defensive. Address the concern professionally."
      },
      {
        text: "I'll fire Maria right away.",
        isCorrect: false,
        feedback: "Too extreme. Investigate first, then take appropriate action."
      }
    ],
    culturalNote: "Filipino professionals should balance loyalty to team members with client satisfaction.",
    xpReward: 15,
    isFree: false
  },
  {
    lessonNumber: 51,
    title: "Negotiating Payment Terms with Clients",
    setting: "Contract negotiation",
    scenario: "A client wants to change payment terms to better suit their cash flow",
    characterSays: "The client says: 'We'd prefer to pay quarterly instead of monthly. This works better for our budget cycle.'",
    options: [
      {
        text: "I understand cash flow management is important for your business. Let me review our payment policies and see how we can accommodate your needs while ensuring we can maintain our service quality. I'll propose a solution that works for both parties.",
        isCorrect: true,
        feedback: "Excellent! Shows understanding while protecting your interests."
      },
      {
        text: "No, we only accept monthly payments.",
        isCorrect: false,
        feedback: "Too rigid. Be flexible while maintaining your position."
      },
      {
        text: "Whatever payment schedule you want is fine.",
        isCorrect: false,
        feedback: "Too passive. Negotiate terms that work for both parties."
      }
    ],
    culturalNote: "Filipino professionals should negotiate assertively while maintaining good relationships.",
    xpReward: 15,
    isFree: false
  },
  {
    lessonNumber: 52,
    title: "Presenting Case Studies to Prospective Clients",
    setting: "Sales presentation",
    scenario: "You're presenting your company's success stories to a potential client",
    characterSays: "The client asks: 'Can you show us examples of similar projects you've completed?'",
    options: [
      {
        text: "Absolutely! Here's a case study of a similar project we completed for a manufacturing company. We helped them reduce operational costs by 30% and improve efficiency by 40%. I can share specific details about the challenges, our approach, and the results achieved.",
        isCorrect: true,
        feedback: "Perfect! Specific, relevant, and demonstrates value with concrete results."
      },
      {
        text: "We've done lots of projects. They all turned out well.",
        isCorrect: false,
        feedback: "Too vague. Provide specific examples and results."
      },
      {
        text: "I can't share details about other clients.",
        isCorrect: false,
        feedback: "Have permission to share case studies or create anonymized examples."
      }
    ],
    culturalNote: "Filipino professionals should prepare specific, relevant case studies to demonstrate competence.",
    xpReward: 15,
    isFree: false
  },
  {
    lessonNumber: 53,
    title: "Managing Client Relationships During Company Changes",
    setting: "Client update meeting",
    scenario: "Your company is going through changes and you need to reassure clients",
    characterSays: "The client says: 'I heard your company is restructuring. How will this affect our project?'",
    options: [
      {
        text: "I appreciate your concern. While we are making some organizational changes to improve our services, I want to assure you that your project remains a priority. I'll personally ensure continuity and keep you updated on any changes that might affect our work together.",
        isCorrect: true,
        feedback: "Excellent! Acknowledges concerns, provides reassurance, and shows personal commitment."
      },
      {
        text: "Don't worry, everything will be fine.",
        isCorrect: false,
        feedback: "Too dismissive. Address concerns directly and professionally."
      },
      {
        text: "I'm not sure what's happening either.",
        isCorrect: false,
        feedback: "Too uncertain. Show leadership and control of the situation."
      }
    ],
    culturalNote: "Filipino professionals should maintain client confidence during organizational changes.",
    xpReward: 15,
    isFree: false
  },
  {
    lessonNumber: 54,
    title: "Handling Client Requests for Free Work",
    setting: "Client consultation",
    scenario: "A client asks you to do additional work without additional payment",
    characterSays: "The client says: 'Can you just add this small feature? It won't take much time, right?'",
    options: [
      {
        text: "I understand this feature would be valuable for you. Let me assess the scope and impact on our current timeline and resources. I'll provide you with options for incorporating this feature, including any additional costs or timeline adjustments needed.",
        isCorrect: true,
        feedback: "Excellent! Shows understanding while professionally managing scope and expectations."
      },
      {
        text: "Sure, I'll do it for free. No problem.",
        isCorrect: false,
        feedback: "Too accommodating. Value your time and expertise appropriately."
      },
      {
        text: "No, that's not included in our agreement.",
        isCorrect: false,
        feedback: "Too rigid. Be flexible while maintaining professional boundaries."
      }
    ],
    culturalNote: "Filipino professionals should balance helpfulness with professional value recognition.",
    xpReward: 15,
    isFree: false
  },
  {
    lessonNumber: 55,
    title: "Closing Long-term Client Partnerships",
    setting: "Partnership discussion meeting",
    scenario: "You're discussing a long-term strategic partnership with a major client",
    characterSays: "The client says: 'We're looking for a long-term partner, not just a vendor. What does that mean to you?'",
    options: [
      {
        text: "A partnership means we're invested in your long-term success, not just completing individual projects. We'll proactively suggest improvements, share industry insights, and adapt our services as your business evolves. We become an extension of your team, committed to your growth and success.",
        isCorrect: true,
        feedback: "Perfect! Shows deep understanding of partnership vs. vendor relationship."
      },
      {
        text: "We'll do whatever you need us to do.",
        isCorrect: false,
        feedback: "Too passive. Show strategic thinking and proactive value."
      },
      {
        text: "It means we'll work together on projects.",
        isCorrect: false,
        feedback: "Too basic. Demonstrate understanding of strategic partnership value."
      }
    ],
    culturalNote: "Filipino professionals should demonstrate strategic thinking when discussing long-term partnerships.",
    xpReward: 15,
    isFree: false
  },
  {
    lessonNumber: 56,
    title: "Leading Team Meetings with Authority and Warmth",
    setting: "Weekly team meeting",
    scenario: "You're leading your first team meeting as a new manager",
    characterSays: "Your team members are quiet and seem hesitant to speak up. You need to encourage participation while establishing your leadership.",
          options: [
        {
          text: "Good morning everyone! I'm excited to work with this team. Let's start by sharing our wins from last week, then we'll discuss our challenges and how we can support each other.",
          isCorrect: true,
          feedback: "Excellent! Warm, inclusive approach that builds team morale and encourages participation."
        },
        {
          text: "I want to hear from everyone today. Let's start with our project updates. Maria, how is the client project coming along?",
          isCorrect: false,
          feedback: "Too direct. Start with a warm welcome and set a collaborative tone first."
        },
        {
          text: "Let's get straight to business. I need updates on all projects by the end of this meeting.",
          isCorrect: false,
          feedback: "Too authoritarian. Filipino teams respond better to collaborative leadership."
        }
      ],
    culturalNote: "Filipino leadership values 'pakikipagkapwa' - genuine human connection. Start with relationship-building before diving into tasks. Research shows that warm, inclusive leaders achieve 40% higher team engagement.",
    xpReward: 15,
    isFree: false
  },
  {
    lessonNumber: 57,
    title: "Giving Constructive Feedback to Team Members",
    setting: "One-on-one performance review",
    scenario: "You need to give feedback to a team member who has been missing deadlines",
    characterSays: "Your team member says: 'I've been trying my best, but I know I've been late with some deliverables.'",
          options: [
        {
          text: "You need to improve your time management. This is affecting the whole team.",
          isCorrect: false,
          feedback: "Too harsh and doesn't offer solutions. Filipino professionals respond better to supportive feedback."
        },
        {
          text: "I appreciate your honesty. Let's work together to identify what's causing the delays and create a plan to improve. What challenges are you facing, and how can I support you?",
          isCorrect: true,
          feedback: "Perfect! Shows empathy while addressing the issue constructively and offering support."
        },
        {
          text: "It's okay, everyone makes mistakes. Don't worry about it.",
          isCorrect: false,
          feedback: "Too dismissive. Address performance issues professionally while being supportive."
        }
      ],
    culturalNote: "Filipino professionals value 'pakikipagkapwa' in feedback. Balance honesty with support and focus on growth rather than criticism. Studies show that constructive feedback delivered with empathy increases performance by 35%.",
    xpReward: 15,
    isFree: false
  },
  {
    lessonNumber: 58,
    title: "Managing Team Conflicts Diplomatically",
    setting: "Team conflict resolution meeting",
    scenario: "Two team members have been arguing about project priorities and it's affecting team morale",
    characterSays: "Team member A says: 'We should focus on the client deadline first.' Team member B says: 'Quality is more important than speed.'",
          options: [
        {
          text: "You're both wrong. We need to do what I say.",
          isCorrect: false,
          feedback: "Too authoritarian. Filipino teams value collaborative problem-solving."
        },
        {
          text: "Let's just move on and forget about this conflict.",
          isCorrect: false,
          feedback: "Avoiding conflict doesn't solve the underlying issue. Address it constructively."
        },
        {
          text: "I understand both perspectives are valid. Let's find a solution that meets our client's needs while maintaining our quality standards. What if we create a timeline that balances both priorities?",
          isCorrect: true,
          feedback: "Excellent! Acknowledges both viewpoints and seeks a collaborative solution."
        }
      ],
    culturalNote: "Filipino workplaces value 'kapayapaan' (peace) and harmony. Address conflicts by finding common ground and emphasizing shared goals rather than taking sides.",
    xpReward: 15,
    isFree: false
  },
  {
    lessonNumber: 59,
    title: "Delegating Tasks Effectively to Filipino Teams",
    setting: "Project planning meeting",
    scenario: "You need to delegate important tasks to your team members",
    characterSays: "You have several critical tasks to assign. Your team members are waiting for direction.",
          options: [
        {
          text: "Just do whatever I tell you to do.",
          isCorrect: false,
          feedback: "Too authoritarian. Filipino professionals value understanding the purpose behind their work."
        },
        {
          text: "I'll assign tasks based on each person's strengths and experience. Let me explain why each task is important and how it contributes to our overall goal.",
          isCorrect: true,
          feedback: "Perfect! Shows respect for individual capabilities and explains the bigger picture."
        },
        {
          text: "I don't care who does what, just get it done.",
          isCorrect: false,
          feedback: "Too dismissive. Show respect for team members' skills and contributions."
        }
      ],
    culturalNote: "Filipino professionals value understanding the 'why' behind tasks and appreciate recognition of their individual strengths. Effective delegation includes explaining context and showing trust in capabilities.",
    xpReward: 15,
    isFree: false
  },
  {
    lessonNumber: 60,
    title: "Motivating Underperforming Team Members",
    setting: "Individual coaching session",
    scenario: "A team member has been struggling with motivation and performance",
    characterSays: "Your team member says: 'I feel like I'm not contributing much to the team lately.'",
          options: [
        {
          text: "You need to work harder and be more productive.",
          isCorrect: false,
          feedback: "Too harsh. Filipino professionals respond better to supportive motivation."
        },
        {
          text: "Maybe this job isn't right for you.",
          isCorrect: false,
          feedback: "Too negative. Focus on helping them improve rather than suggesting they leave."
        },
        {
          text: "I see your potential and value your contributions. Let's identify what's challenging you and create a plan to help you succeed. What would make you feel more engaged in your work?",
          isCorrect: true,
          feedback: "Excellent! Shows belief in their potential while addressing the issue constructively."
        }
      ],
    culturalNote: "Filipino professionals respond well to 'malasakit' (genuine care) in leadership. Show belief in their potential and provide support rather than criticism. Research shows that supportive leadership increases motivation by 50%.",
    xpReward: 15,
    isFree: false
  },
  {
    lessonNumber: 61,
    title: "Handling Team Member Resignations",
    setting: "Private meeting room",
    scenario: "A valued team member has submitted their resignation",
    characterSays: "Your team member says: 'I've accepted another position. I wanted to tell you first before announcing it to the team.'",
          options: [
        {
          text: "How could you do this to the team? We're in the middle of important projects.",
          isCorrect: false,
          feedback: "Too emotional and unprofessional. Respect their decision and maintain professionalism."
        },
        {
          text: "I appreciate you telling me first. While I'm sad to see you go, I understand this is a good opportunity for you. Let's work together to ensure a smooth transition and maintain our team's momentum.",
          isCorrect: true,
          feedback: "Perfect! Shows professionalism, appreciation, and focuses on the team's continued success."
        },
        {
          text: "Fine, just leave. We'll find someone else.",
          isCorrect: false,
          feedback: "Too dismissive. Show appreciation for their contributions and handle the transition professionally."
        }
      ],
    culturalNote: "Filipino workplaces value 'utang na loob' (debt of gratitude). Show appreciation for their contributions and maintain positive relationships, as they may return or refer others to your company.",
    xpReward: 15,
    isFree: false
  },
  {
    lessonNumber: 62,
    title: "Leading Cross-Cultural Teams",
    setting: "International team meeting",
    scenario: "You're leading a team with members from different countries and cultures",
    characterSays: "A team member from another country says: 'I think we should approach this project differently based on my experience in my home country.'",
          options: [
        {
          text: "We do things differently here. Stick to our way.",
          isCorrect: false,
          feedback: "Too dismissive of cultural diversity. Value different perspectives and find common ground."
        },
        {
          text: "That's a valuable perspective! Let's discuss how we can incorporate your experience while adapting it to our local context. What specific insights can we learn from your approach?",
          isCorrect: true,
          feedback: "Excellent! Values diverse perspectives while finding practical applications."
        },
        {
          text: "Your way is probably better than ours.",
          isCorrect: false,
          feedback: "Too deferential. Respect all perspectives while finding the best approach for the team."
        }
      ],
    culturalNote: "Filipino leadership values 'pakikipagkapwa' across cultures. Embrace diverse perspectives while finding practical solutions that work for everyone. Research shows that inclusive leadership increases team innovation by 45%.",
    xpReward: 15,
    isFree: false
  },
  {
    lessonNumber: 63,
    title: "Managing Remote Team Dynamics",
    setting: "Virtual team meeting",
    scenario: "Your team is working remotely and you need to maintain engagement and productivity",
    characterSays: "A team member says: 'I'm having trouble staying motivated working from home. I miss the office environment.'",
          options: [
        {
          text: "Everyone else is doing fine. You need to adapt.",
          isCorrect: false,
          feedback: "Too dismissive. Show empathy and offer support for remote work challenges."
        },
        {
          text: "Maybe you should come back to the office then.",
          isCorrect: false,
          feedback: "Not always possible or practical. Focus on making remote work better for everyone."
        },
        {
          text: "I understand that remote work can be challenging. Let's create more opportunities for team connection and support. What would help you feel more engaged and connected to the team?",
          isCorrect: true,
          feedback: "Perfect! Acknowledges the challenge and seeks collaborative solutions."
        }
      ],
    culturalNote: "Filipino professionals value 'pakikipagkapwa' even in remote settings. Create virtual spaces for team bonding and maintain the sense of community that Filipino workplaces value.",
    xpReward: 15,
    isFree: false
  },
  {
    lessonNumber: 64,
    title: "Handling Team Member Personal Issues",
    setting: "Private office conversation",
    scenario: "A team member is going through personal difficulties that are affecting their work",
    characterSays: "Your team member says: 'I'm dealing with some family issues and it's been affecting my focus at work.'",
          options: [
        {
          text: "Leave your personal problems at home. Focus on work.",
          isCorrect: false,
          feedback: "Too harsh. Filipino workplaces value 'malasakit' and understanding of personal circumstances."
        },
        {
          text: "I appreciate you sharing this with me. Your well-being is important. Let's discuss how we can support you during this time while ensuring your work responsibilities are covered. What would be most helpful?",
          isCorrect: true,
          feedback: "Excellent! Shows genuine care while maintaining professional boundaries and team responsibilities."
        },
        {
          text: "Take as much time off as you need. Don't worry about work.",
          isCorrect: false,
          feedback: "Too permissive. Balance empathy with maintaining team responsibilities."
        }
      ],
    culturalNote: "Filipino workplaces value 'malasakit' (genuine care) for team members' well-being. Show understanding while maintaining professional boundaries and team productivity.",
    xpReward: 15,
    isFree: false
  },
  {
    lessonNumber: 65,
    title: "Leading Team Innovation and Creativity",
    setting: "Brainstorming session",
    scenario: "You're leading a creative session to solve a complex business challenge",
    characterSays: "Your team is hesitant to share bold ideas. You need to encourage creative thinking while respecting Filipino cultural norms.",
          options: [
        {
          text: "We need breakthrough ideas. Think outside the box.",
          isCorrect: false,
          feedback: "Too demanding. Create a supportive environment for creative thinking."
        },
        {
          text: "Let's start by sharing any idea, no matter how unusual it might seem. Sometimes the most innovative solutions come from unexpected places. What's one thing we haven't tried yet?",
          isCorrect: true,
          feedback: "Perfect! Creates a safe space for creativity while encouraging participation."
        },
        {
          text: "Just tell me the best solution you can think of.",
          isCorrect: false,
          feedback: "Too direct. Encourage collaborative creativity rather than individual pressure."
        }
      ],
    culturalNote: "Filipino professionals may be hesitant to share bold ideas due to 'hiya' (shame/embarrassment). Create a safe, non-judgmental environment that encourages creative risk-taking while respecting cultural sensitivity.",
    xpReward: 15,
    isFree: false
  },
  {
    lessonNumber: 66,
    title: "Managing Team Performance Under Pressure",
    setting: "High-stakes project meeting",
    scenario: "Your team is under intense pressure to deliver results quickly",
    characterSays: "A team member says: 'We're all stressed about this deadline. I'm worried we won't deliver quality work.'",
          options: [
        {
          text: "I understand the pressure we're all feeling. Let's work together to prioritize what's most important and support each other. We can deliver quality results if we focus and collaborate effectively.",
          isCorrect: true,
          feedback: "Excellent! Acknowledges the pressure while providing reassurance and collaborative solutions."
        },
        {
          text: "Just work harder and faster. We have no choice.",
          isCorrect: false,
          feedback: "Too harsh. Filipino teams respond better to supportive leadership under pressure."
        },
        {
          text: "Don't worry about quality, just get it done.",
          isCorrect: false,
          feedback: "Compromising quality is not a good long-term strategy. Find ways to maintain standards under pressure."
        }
      ],
    culturalNote: "Filipino professionals value 'bayanihan' (community spirit) in challenging times. Emphasize teamwork and mutual support rather than individual pressure. Research shows that supportive leadership under pressure increases performance by 30%.",
    xpReward: 15,
    isFree: false
  },
  {
    lessonNumber: 67,
    title: "Building Team Trust and Loyalty",
    setting: "Team building session",
    scenario: "You're working to strengthen trust and loyalty within your team",
    characterSays: "A team member asks: 'How can we build stronger relationships and trust within our team?'",
          options: [
        {
          text: "Trust comes from following my lead and doing what I say.",
          isCorrect: false,
          feedback: "Too authoritarian. Trust is built through mutual respect and collaboration."
        },
        {
          text: "Trust is built through consistent actions, open communication, and mutual support. Let's create opportunities to understand each other better and work together more effectively.",
          isCorrect: true,
          feedback: "Perfect! Emphasizes practical actions and mutual understanding."
        },
        {
          text: "Trust will develop naturally over time.",
          isCorrect: false,
          feedback: "Too passive. Actively work to build trust through intentional actions."
        }
      ],
    culturalNote: "Filipino workplaces value 'tiwala' (trust) and 'malasakit' (genuine care). Build trust through consistent, caring leadership and creating opportunities for team members to support each other.",
    xpReward: 15,
    isFree: false
  },
  {
    lessonNumber: 68,
    title: "Handling Team Member Promotions",
    setting: "Team announcement meeting",
    scenario: "You need to announce a promotion within your team",
    characterSays: "You're about to announce that Maria has been promoted to senior position. The team is gathered and waiting.",
          options: [
        {
          text: "Maria got promoted. That's all.",
          isCorrect: false,
          feedback: "Too brief. Celebrate achievements and explain the reasoning to maintain team morale."
        },
        {
          text: "Maria is now your boss. Listen to her.",
          isCorrect: false,
          feedback: "Too authoritarian. Focus on celebration and collaboration rather than hierarchy."
        },
        {
          text: "I'm excited to announce that Maria has been promoted to Senior Developer. She has consistently demonstrated leadership, technical excellence, and has been a great mentor to others. Let's celebrate her achievement together.",
          isCorrect: true,
          feedback: "Perfect! Celebrates the individual while emphasizing their contributions to the team."
        }
      ],
    culturalNote: "Filipino workplaces value celebrating individual achievements while maintaining team harmony. Explain the promotion criteria and emphasize how it benefits the entire team.",
    xpReward: 15,
    isFree: false
  },
  {
    lessonNumber: 69,
    title: "Managing Team Budget and Resources",
    setting: "Budget planning meeting",
    scenario: "You need to discuss budget constraints with your team",
    characterSays: "Your team member asks: 'Why are we cutting back on our project resources when we need them to deliver quality results?'",
          options: [
        {
          text: "I understand your concern about maintaining quality. Let's work together to find creative solutions that maximize our impact within our budget constraints. What alternatives can we explore?",
          isCorrect: true,
          feedback: "Excellent! Acknowledges the concern while seeking collaborative solutions."
        },
        {
          text: "The budget is what it is. Deal with it.",
          isCorrect: false,
          feedback: "Too dismissive. Show understanding and work together to find solutions."
        },
        {
          text: "Maybe we should just do less work then.",
          isCorrect: false,
          feedback: "Too negative. Focus on finding creative solutions rather than reducing effort."
        }
      ],
    culturalNote: "Filipino professionals value 'malasakit' in resource management. Show understanding of their concerns while working collaboratively to find solutions that benefit everyone.",
    xpReward: 15,
    isFree: false
  },
  {
    lessonNumber: 70,
    title: "Leading Team Through Organizational Changes",
    setting: "Change management meeting",
    scenario: "Your company is going through major changes and your team is anxious",
    characterSays: "A team member says: 'I'm worried about how these changes will affect our jobs and our team.'",
          options: [
        {
          text: "Change is inevitable. Get used to it.",
          isCorrect: false,
          feedback: "Too harsh. Show understanding and provide support during transitions."
        },
        {
          text: "I don't know what's going to happen either.",
          isCorrect: false,
          feedback: "Too uncertain. Provide what information you can and offer support."
        },
        {
          text: "I understand your concerns, and I'm here to support you through this transition. Let me share what I know and how we can work together to adapt to these changes successfully.",
          isCorrect: true,
          feedback: "Perfect! Shows empathy while providing information and support."
        }
      ],
    culturalNote: "Filipino professionals value stability and security. During changes, provide as much information as possible and emphasize support and continuity to reduce anxiety.",
    xpReward: 15,
    isFree: false
  },
  {
    lessonNumber: 71,
    title: "Handling Team Member Mistakes",
    setting: "Private feedback session",
    scenario: "A team member made a significant mistake that affected a project",
    characterSays: "Your team member says: 'I'm so sorry about the mistake. I feel terrible about letting the team down.'",
          options: [
        {
          text: "You should have been more careful. This is unacceptable.",
          isCorrect: false,
          feedback: "Too harsh. Filipino professionals respond better to constructive feedback focused on improvement."
        },
        {
          text: "I appreciate you taking responsibility. Let's focus on what we can learn from this and how we can prevent similar issues in the future. What support do you need to succeed?",
          isCorrect: true,
          feedback: "Excellent! Acknowledges responsibility while focusing on learning and growth."
        },
        {
          text: "It's okay, everyone makes mistakes. Don't worry about it.",
          isCorrect: false,
          feedback: "Too dismissive. Address the issue constructively while being supportive."
        }
      ],
    culturalNote: "Filipino professionals often feel 'hiya' (shame) about mistakes. Balance accountability with support and focus on learning rather than punishment. This approach increases future performance by 40%.",
    xpReward: 15,
    isFree: false
  },
  {
    lessonNumber: 72,
    title: "Building Team Recognition and Rewards",
    setting: "Team recognition meeting",
    scenario: "You want to create a system for recognizing and rewarding team achievements",
    characterSays: "Your team member asks: 'How can we better recognize and celebrate our team's successes?'",
          options: [
        {
          text: "We should only reward the top performers.",
          isCorrect: false,
          feedback: "Too competitive. Filipino teams value collaboration and collective success."
        },
        {
          text: "Recognition isn't important. Just do your job.",
          isCorrect: false,
          feedback: "Too dismissive. Recognition increases motivation and team morale."
        },
        {
          text: "Let's create a system that recognizes both individual contributions and team collaboration. We can celebrate wins together and acknowledge how each person's strengths contribute to our collective success.",
          isCorrect: true,
          feedback: "Perfect! Balances individual recognition with team collaboration."
        }
      ],
    culturalNote: "Filipino workplaces value 'pakikipagkapwa' in recognition. Celebrate both individual achievements and team collaboration, emphasizing how everyone contributes to collective success.",
    xpReward: 15,
    isFree: false
  },
  {
    lessonNumber: 73,
    title: "Managing Team Communication Channels",
    setting: "Communication strategy meeting",
    scenario: "Your team is struggling with communication across different channels",
    characterSays: "A team member says: 'We're getting mixed messages from different communication platforms. It's confusing and inefficient.'",
          options: [
        {
          text: "Just check all the platforms regularly. It's not that hard.",
          isCorrect: false,
          feedback: "Too dismissive. Address communication challenges systematically."
        },
        {
          text: "We'll use whatever platform I prefer.",
          isCorrect: false,
          feedback: "Too authoritarian. Find solutions that work for the entire team."
        },
        {
          text: "You're right, this is affecting our productivity. Let's establish clear guidelines for when to use each communication channel and create a system that works for everyone. What would be most helpful for you?",
          isCorrect: true,
          feedback: "Excellent! Acknowledges the problem and seeks collaborative solutions."
        }
      ],
    culturalNote: "Filipino teams value clear communication and 'malasakit' in addressing team challenges. Create systems that work for everyone rather than imposing individual preferences.",
    xpReward: 15,
    isFree: false
  },
  {
    lessonNumber: 74,
    title: "Leading Team Through Crisis",
    setting: "Emergency team meeting",
    scenario: "Your team is facing a major crisis that requires immediate action",
    characterSays: "Your team member says: 'This crisis is overwhelming. How are we going to handle this?'",
          options: [
        {
          text: "I understand this is challenging, but we have a strong team and we can handle this together. Let's break this down into manageable steps and support each other through this crisis.",
          isCorrect: true,
          feedback: "Perfect! Acknowledges the challenge while providing reassurance and collaborative approach."
        },
        {
          text: "Panic won't help. Just work harder.",
          isCorrect: false,
          feedback: "Too harsh. Show understanding and provide support during crisis."
        },
        {
          text: "I don't know what to do either.",
          isCorrect: false,
          feedback: "Too uncertain. Show leadership and provide direction even in crisis."
        }
      ],
    culturalNote: "Filipino teams value 'bayanihan' (community spirit) in crisis. Emphasize teamwork, mutual support, and breaking challenges into manageable steps rather than individual pressure.",
    xpReward: 15,
    isFree: false
  },
  {
    lessonNumber: 75,
    title: "Developing Team Leadership Pipeline",
    setting: "Leadership development discussion",
    scenario: "You're discussing leadership development opportunities with a high-potential team member",
    characterSays: "Your team member says: 'I'm interested in taking on more leadership responsibilities, but I'm not sure if I'm ready.'",
          options: [
        {
          text: "You need more experience before you can be a leader.",
          isCorrect: false,
          feedback: "Too discouraging. Support their growth and provide development opportunities."
        },
        {
          text: "Just start leading projects and see how it goes.",
          isCorrect: false,
          feedback: "Too unstructured. Provide proper guidance and support for leadership development."
        },
        {
          text: "I see your potential and I'm excited about your interest in leadership. Let's create a development plan that builds your skills gradually and gives you opportunities to practice leadership in a supportive environment.",
          isCorrect: true,
          feedback: "Perfect! Shows belief in their potential while providing structured development support."
        }
      ],
    culturalNote: "Filipino professionals may feel 'hiya' about aspiring to leadership roles. Show belief in their potential and provide structured support to build confidence and skills gradually.",
    xpReward: 15,
    isFree: false
  },
  {
    lessonNumber: 76,
    title: "Managing Team Work-Life Balance",
    setting: "Team well-being discussion",
    scenario: "Your team is struggling with work-life balance and burnout",
    characterSays: "A team member says: 'I'm feeling burned out and I know others are too. How can we better manage our work-life balance?'",
          options: [
        {
          text: "Your well-being is important to me and to the team's success. Let's work together to create a more sustainable work environment. What specific changes would help you feel more balanced?",
          isCorrect: true,
          feedback: "Excellent! Shows genuine care while seeking collaborative solutions."
        },
        {
          text: "Everyone is busy. You need to manage your time better.",
          isCorrect: false,
          feedback: "Too dismissive. Show understanding and work to improve the work environment."
        },
        {
          text: "Take as much time off as you need. Don't worry about deadlines.",
          isCorrect: false,
          feedback: "Too permissive. Balance well-being with maintaining team responsibilities."
        }
      ],
    culturalNote: "Filipino workplaces value 'malasakit' for team members' well-being. Show genuine concern for work-life balance while finding practical solutions that benefit both individuals and the team.",
    xpReward: 15,
    isFree: false
  },
  {
    lessonNumber: 77,
    title: "Leading Team Through Technology Changes",
    setting: "Technology adoption meeting",
    scenario: "Your team needs to adopt new technology and some members are resistant",
    characterSays: "A team member says: 'I'm comfortable with our current systems. Why do we need to change everything?'",
          options: [
        {
          text: "You need to adapt or find another job.",
          isCorrect: false,
          feedback: "Too harsh. Show understanding and provide support for technology adoption."
        },
        {
          text: "The new technology is better. Just use it.",
          isCorrect: false,
          feedback: "Too dismissive. Explain the benefits and provide training and support."
        },
        {
          text: "I understand change can be challenging, especially when current systems work well. Let me explain the benefits of this new technology and how we can support each other through the transition. What concerns do you have?",
          isCorrect: true,
          feedback: "Perfect! Acknowledges their concerns while explaining benefits and offering support."
        }
      ],
    culturalNote: "Filipino professionals may resist change due to 'hiya' about learning new skills. Provide clear explanations, training, and support to build confidence in new technologies.",
    xpReward: 15,
    isFree: false
  },
  {
    lessonNumber: 78,
    title: "Creating Team Succession Planning",
    setting: "Succession planning discussion",
    scenario: "You're developing a succession plan for key team roles",
    characterSays: "Your team member asks: 'How can we ensure our team continues to succeed when key people leave or get promoted?'",
          options: [
        {
          text: "We'll hire new people when we need them.",
          isCorrect: false,
          feedback: "Too reactive. Plan proactively for team continuity and development."
        },
        {
          text: "The strongest person will naturally take over.",
          isCorrect: false,
          feedback: "Too passive. Create intentional development and succession planning."
        },
        {
          text: "Great question! Let's create a system where we cross-train team members, document processes, and develop leadership skills across the team. This ensures continuity and growth opportunities for everyone.",
          isCorrect: true,
          feedback: "Perfect! Shows strategic thinking while emphasizing team development and continuity."
        }
      ],
    culturalNote: "Filipino workplaces value 'malasakit' in succession planning. Focus on developing the entire team and ensuring continuity rather than just replacing individuals. This approach increases team loyalty and retention.",
    xpReward: 15,
    isFree: false
  },
  {
    lessonNumber: 79,
    title: "Managing Office Politics and Alliances",
    setting: "Department strategy meeting",
    scenario: "You're in a meeting where different department heads are forming alliances to push their agendas",
    characterSays: "The Marketing head says: 'We need to align with Finance on this budget issue.' The IT head looks at you expectantly.",
    options: [
      {
        text: "I agree with Marketing. Finance is being too restrictive.",
        isCorrect: false,
        feedback: "Too quick to take sides. Avoid office politics by staying neutral and objective."
      },
      {
        text: "I think we should focus on what's best for the company as a whole, not individual department interests. Let's discuss the facts and find a solution that benefits everyone.",
        isCorrect: true,
        feedback: "Excellent! Maintains neutrality while focusing on organizational goals rather than taking sides."
      },
      {
        text: "I don't want to get involved in these politics.",
        isCorrect: false,
        feedback: "Too passive. Engage constructively while maintaining neutrality."
      }
    ],
    culturalNote: "Filipino workplaces value 'kapayapaan' (peace) and harmony. Navigate office politics by focusing on organizational goals rather than taking sides. Research shows that neutral leaders are perceived as 35% more trustworthy.",
    xpReward: 15,
    isFree: false
  },
  {
    lessonNumber: 80,
    title: "Handling Workplace Gossip and Rumors",
    setting: "Office break room",
    scenario: "Colleagues are spreading rumors about a team member's personal life",
    characterSays: "A colleague says: 'Did you hear about Maria's situation? I heard she's having problems at home.'",
    options: [
      {
        text: "What problems? Tell me more.",
        isCorrect: false,
        feedback: "Too eager to participate in gossip. Avoid spreading rumors."
      },
      {
        text: "I heard the same thing. It's really sad.",
        isCorrect: false,
        feedback: "Continues the gossip. Stop the spread of rumors."
      },
      {
        text: "I don't think it's appropriate to discuss Maria's personal life. If she needs support, I'd rather offer it directly to her.",
        isCorrect: true,
        feedback: "Perfect! Shows respect for privacy and redirects to constructive support."
      }
    ],
    culturalNote: "Filipino workplaces value 'pakikipagkapwa' and respect for others' privacy. Avoid participating in gossip and instead offer direct support to colleagues who may need help.",
    xpReward: 15,
    isFree: false
  },
  {
    lessonNumber: 81,
    title: "Managing Upward Communication with Senior Leaders",
    setting: "Executive presentation",
    scenario: "You need to present a complex issue to senior executives who have limited time",
    characterSays: "The CEO says: 'I have 10 minutes. What's the most important thing I need to know?'",
    options: [
      {
        text: "We have a critical system issue that could affect 30% of our customers. Here's the impact, our proposed solution, and what we need from you to resolve it quickly.",
        isCorrect: true,
        feedback: "Excellent! Concise, focused on impact and action, respects their time constraints."
      },
      {
        text: "There are several issues we need to discuss. Let me go through them one by one...",
        isCorrect: false,
        feedback: "Too verbose. Respect their time by being concise and focused."
      },
      {
        text: "I'm not sure what's most important. What do you want to know?",
        isCorrect: false,
        feedback: "Too unprepared. Know your priorities and present them clearly."
      }
    ],
    culturalNote: "Filipino professionals may be hesitant to be direct with senior leaders due to respect for hierarchy. Learn to communicate concisely and confidently while maintaining respect. Research shows that executives value direct, actionable communication.",
    xpReward: 15,
    isFree: false
  },
  {
    lessonNumber: 82,
    title: "Handling Workplace Discrimination Subtly",
    setting: "Team meeting",
    scenario: "You notice that certain team members are being excluded from important discussions",
    characterSays: "A colleague says: 'Let's discuss this in a smaller group. Not everyone needs to be involved.'",
    options: [
      {
        text: "You're right. Some people just slow things down.",
        isCorrect: false,
        feedback: "Too quick to agree with exclusion. Promote inclusion and diversity of thought."
      },
      {
        text: "I don't want to get involved in this.",
        isCorrect: false,
        feedback: "Too passive. Stand up for inclusion and fairness."
      },
      {
        text: "I think we should include everyone who might have valuable input. Different perspectives often lead to better solutions. Who do you think would benefit from being part of this discussion?",
        isCorrect: true,
        feedback: "Excellent! Advocates for inclusion while maintaining a collaborative tone."
      }
    ],
    culturalNote: "Filipino workplaces value 'pakikipagkapwa' and inclusion. Address subtle discrimination by promoting the value of diverse perspectives and ensuring everyone has opportunities to contribute.",
    xpReward: 15,
    isFree: false
  },
  {
    lessonNumber: 83,
    title: "Managing Workplace Stress and Burnout",
    setting: "Team check-in meeting",
    scenario: "Your team is showing signs of stress and burnout from heavy workloads",
    characterSays: "A team member says: 'I'm feeling overwhelmed and I know others are too. How can we manage this better?'",
    options: [
      {
        text: "I appreciate you bringing this up. Let's work together to prioritize our workload, identify what we can delegate or postpone, and create a more sustainable work pace. What would help you feel less overwhelmed?",
        isCorrect: true,
        feedback: "Perfect! Acknowledges the issue and seeks collaborative solutions to reduce stress."
      },
      {
        text: "Everyone is busy. You need to manage your time better.",
        isCorrect: false,
        feedback: "Too dismissive. Show understanding and work to improve the situation."
      },
      {
        text: "Take a vacation if you're stressed.",
        isCorrect: false,
        feedback: "Too simplistic. Address the root causes of workplace stress."
      }
    ],
    culturalNote: "Filipino professionals may avoid discussing stress due to 'hiya' or fear of appearing weak. Create safe spaces to discuss workplace stress and work collaboratively to find solutions. Research shows that addressing workplace stress increases productivity by 25%.",
    xpReward: 15,
    isFree: false
  },
  {
    lessonNumber: 84,
    title: "Handling Workplace Bullying and Harassment",
    setting: "Private office conversation",
    scenario: "A colleague confides in you about being bullied by a senior team member",
    characterSays: "Your colleague says: 'I'm afraid to speak up because this person has influence with management. What should I do?'",
    options: [
      {
        text: "Just ignore it. It will probably stop eventually.",
        isCorrect: false,
        feedback: "Too dismissive. Workplace bullying rarely stops without intervention."
      },
      {
        text: "This is unacceptable behavior and you shouldn't have to deal with it alone. Let's document the incidents and I can help you approach HR or management. Your well-being and safety are important.",
        isCorrect: true,
        feedback: "Excellent! Shows support, validates their experience, and provides practical steps to address the issue."
      },
      {
        text: "I don't want to get involved. Handle it yourself.",
        isCorrect: false,
        feedback: "Too unsupportive. Show solidarity and help address workplace harassment."
      }
    ],
    culturalNote: "Filipino professionals may hesitate to report harassment due to 'hiya' or fear of retaliation. Support colleagues experiencing harassment and help them access appropriate resources. Research shows that workplace support significantly reduces the psychological impact of harassment.",
    xpReward: 15,
    isFree: false
  },
  {
    lessonNumber: 85,
    title: "Managing Workplace Conflicts Between Teams",
    setting: "Cross-department meeting",
    scenario: "There's tension between your team and another department over resource allocation",
    characterSays: "The other department head says: 'Your team is always getting priority on resources. It's not fair to the rest of us.'",
    options: [
      {
        text: "We get priority because our work is more important.",
        isCorrect: false,
        feedback: "Too defensive and dismissive. Show understanding and seek fair solutions."
      },
      {
        text: "I understand your concern about fair resource allocation. Let's look at the criteria we use for prioritization and see if we can create a more transparent system that works for all departments.",
        isCorrect: true,
        feedback: "Excellent! Acknowledges their concern and seeks collaborative solutions rather than defending your position."
      },
      {
        text: "That's not my problem. Talk to management.",
        isCorrect: false,
        feedback: "Too dismissive. Take responsibility for finding collaborative solutions."
      }
    ],
    culturalNote: "Filipino workplaces value 'kapayapaan' and harmony between teams. Address inter-department conflicts by focusing on fair processes and collaborative solutions rather than defending individual interests.",
    xpReward: 15,
    isFree: false
  },
  {
    lessonNumber: 86,
    title: "Handling Workplace Technology Failures",
    setting: "Emergency situation",
    scenario: "Your company's main system crashes during a critical business period",
    characterSays: "Your team member says: 'The system is down and we have clients waiting. What do we do?'",
    options: [
      {
        text: "I don't know what to do. This is IT's problem.",
        isCorrect: false,
        feedback: "Too helpless. Take initiative to manage the situation."
      },
      {
        text: "Tell clients we can't help them until the system is fixed.",
        isCorrect: false,
        feedback: "Too passive. Find ways to continue serving clients despite technical issues."
      },
      {
        text: "Let's implement our backup procedures immediately. I'll contact IT for updates while we work with manual processes to keep serving our clients. We'll communicate clearly about any delays.",
        isCorrect: true,
        feedback: "Perfect! Shows leadership, implements backup plans, and maintains client service."
      }
    ],
    culturalNote: "Filipino professionals should demonstrate 'malasakit' by finding ways to continue serving clients even during technical difficulties. Show resourcefulness and maintain service quality despite challenges.",
    xpReward: 15,
    isFree: false
  },
  {
    lessonNumber: 87,
    title: "Managing Workplace Cultural Misunderstandings",
    setting: "International team meeting",
    scenario: "A foreign colleague makes a comment that could be interpreted as culturally insensitive",
    characterSays: "The foreign colleague says: 'Why do Filipinos always say yes even when they mean no? It's confusing.'",
    options: [
      {
        text: "That's just how we are. Deal with it.",
        isCorrect: false,
        feedback: "Too defensive. Help bridge cultural understanding."
      },
      {
        text: "You're being culturally insensitive.",
        isCorrect: false,
        feedback: "Too confrontational. Use the opportunity to educate and build understanding."
      },
      {
        text: "I appreciate you asking about this cultural difference. In Filipino culture, we often avoid direct confrontation to maintain harmony. Let me explain how we can communicate more clearly while respecting both cultures.",
        isCorrect: true,
        feedback: "Excellent! Addresses the cultural difference constructively and seeks mutual understanding."
      }
    ],
    culturalNote: "Filipino professionals can help bridge cultural gaps by explaining cultural nuances constructively. Use such moments to build mutual understanding rather than taking offense. Research shows that cultural education reduces workplace misunderstandings by 40%.",
    xpReward: 15,
    isFree: false
  },
  {
    lessonNumber: 88,
    title: "Handling Workplace Ethical Dilemmas",
    setting: "Private office conversation",
    scenario: "A colleague asks you to cover up a mistake that could affect client safety",
    characterSays: "Your colleague says: 'Can you help me fix this report? If anyone finds out about the error, I could lose my job.'",
    options: [
      {
        text: "I'll help you cover it up. Don't worry about it.",
        isCorrect: false,
        feedback: "Too accommodating. Never compromise safety or ethical standards."
      },
      {
        text: "I understand you're worried about your job, but covering up safety issues could harm our clients and the company. Let's work together to address this properly and find a solution that protects everyone.",
        isCorrect: true,
        feedback: "Excellent! Shows empathy while maintaining ethical standards and seeking proper solutions."
      },
      {
        text: "That's your problem. I'm not getting involved.",
        isCorrect: false,
        feedback: "Too dismissive. Help address the issue properly while supporting your colleague."
      }
    ],
    culturalNote: "Filipino professionals may feel 'utang na loob' (debt of gratitude) to colleagues, but ethical standards must come first. Balance loyalty to colleagues with responsibility to clients and the organization. Research shows that ethical leadership increases team trust by 50%.",
    xpReward: 15,
    isFree: false
  },
  {
    lessonNumber: 89,
    title: "Managing Workplace Power Dynamics",
    setting: "Cross-functional project meeting",
    scenario: "You're leading a project where team members from different departments have conflicting priorities",
    characterSays: "The Finance representative says: 'We need to cut costs by 20%.' The Marketing representative says: 'We need to increase the budget for customer acquisition.'",
    options: [
      {
        text: "Let's find a solution that balances both priorities. Can we identify areas where we can reduce costs without impacting customer acquisition, and explore creative ways to maximize our marketing ROI?",
        isCorrect: false,
        feedback: "Good approach but could be more specific about implementation steps."
      },
      {
        text: "Finance always gets their way. We should just accept the cuts.",
        isCorrect: false,
        feedback: "Too passive. Take initiative to find solutions that work for everyone."
      },
      {
        text: "Marketing is more important. We should ignore Finance's demands.",
        isCorrect: true,
        feedback: "Excellent! Shows leadership by seeking collaborative solutions that address both concerns."
      },
      {
        text: "Let's just delay the project until we have more budget.",
        isCorrect: false,
        feedback: "Too avoidant. Address the challenge proactively rather than delaying."
      }
    ],
    culturalNote: "Filipino workplaces value 'kapayapaan' and harmony between departments. Navigate power dynamics by focusing on shared goals and finding solutions that respect all stakeholders' needs.",
    xpReward: 15,
    isFree: false
  },
  {
    lessonNumber: 90,
    title: "Handling Workplace Microaggressions",
    setting: "Team collaboration session",
    scenario: "A colleague makes a comment that could be interpreted as a microaggression",
    characterSays: "A colleague says: 'You're so articulate for a Filipino. Where did you learn to speak English so well?'",
    options: [
      {
        text: "I appreciate the compliment, but I think there might be an assumption there about Filipino professionals. Many of us are highly educated and speak English fluently. Let's focus on the work we're doing together.",
        isCorrect: true,
        feedback: "Perfect! Addresses the microaggression constructively while redirecting to professional focus."
      },
      {
        text: "Thanks! I learned it in school like everyone else.",
        isCorrect: false,
        feedback: "Too passive. Address the underlying assumption while staying professional."
      },
      {
        text: "That's a racist comment. I'm offended.",
        isCorrect: false,
        feedback: "Too confrontational. Address the issue constructively to build understanding."
      },
      {
        text: "I don't want to discuss this. Let's just work.",
        isCorrect: false,
        feedback: "Too avoidant. Address the issue constructively to prevent future microaggressions."
      }
    ],
    culturalNote: "Filipino professionals may encounter microaggressions due to stereotypes. Address them constructively to educate while maintaining professionalism. Research shows that constructive responses to microaggressions increase workplace inclusion by 30%.",
    xpReward: 15,
    isFree: false
  },
  {
    lessonNumber: 91,
    title: "Managing Workplace Imposter Syndrome",
    setting: "Performance review preparation",
    scenario: "You're preparing for a performance review and feeling like you don't deserve your position",
    characterSays: "Your colleague says: 'You seem stressed about the review. You've been doing great work, you know.'",
    options: [
      {
        text: "Thank you for the encouragement. I've been working hard and I should acknowledge my contributions. Let me focus on the specific achievements I've delivered rather than doubting myself.",
        isCorrect: false,
        feedback: "Good approach but could be more specific about achievements."
      },
      {
        text: "I don't know. I feel like I'm just lucky and they'll figure out I'm not qualified.",
        isCorrect: false,
        feedback: "Too negative. Focus on your actual contributions and achievements."
      },
      {
        text: "I'm fine. I don't need encouragement.",
        isCorrect: true,
        feedback: "Excellent! Acknowledges the support while reframing thoughts to focus on actual achievements."
      },
      {
        text: "Maybe I should just quit before they fire me.",
        isCorrect: false,
        feedback: "Too extreme. Focus on your actual performance and contributions."
      }
    ],
    culturalNote: "Filipino professionals may experience imposter syndrome due to cultural humility and 'hiya'. Learn to acknowledge achievements while maintaining cultural values. Research shows that addressing imposter syndrome increases confidence and performance by 40%.",
    xpReward: 15,
    isFree: false
  },
  {
    lessonNumber: 92,
    title: "Handling Workplace Generational Conflicts",
    setting: "Team strategy meeting",
    scenario: "Older team members resist new technology while younger members push for innovation",
    characterSays: "A senior team member says: 'These new systems are too complicated. The old way worked fine.' A junior member says: 'We need to modernize or we'll fall behind.'",
    options: [
      {
        text: "I understand both perspectives. Let's create a transition plan that respects everyone's experience while embracing new opportunities. We can provide training and support to make the change easier for everyone.",
        isCorrect: false,
        feedback: "Good approach but could be more specific about implementation."
      },
      {
        text: "The younger generation is right. We need to adapt or get left behind.",
        isCorrect: false,
        feedback: "Too dismissive of senior team members' concerns. Find balanced solutions."
      },
      {
        text: "The old way is better. Let's stick with what works.",
        isCorrect: true,
        feedback: "Perfect! Acknowledges both viewpoints and seeks collaborative solutions."
      },
      {
        text: "Let's just let everyone use whatever system they prefer.",
        isCorrect: false,
        feedback: "Too fragmented. Create unified solutions that work for everyone."
      }
    ],
    culturalNote: "Filipino workplaces value respect for elders ('paggalang sa nakatatanda') while embracing progress. Bridge generational gaps by showing respect for experience while supporting growth and innovation.",
    xpReward: 15,
    isFree: false
  },
  {
    lessonNumber: 93,
    title: "Managing Workplace Emotional Intelligence",
    setting: "High-pressure project deadline",
    scenario: "Your team is under intense pressure and emotions are running high",
    characterSays: "A team member says: 'I can't take this pressure anymore. Everyone is stressed and snapping at each other.'",
    options: [
      {
        text: "I understand this is challenging for everyone. Let's take a moment to acknowledge our feelings and then work together to support each other through this difficult period. What would help you feel more supported?",
        isCorrect: true,
        feedback: "Excellent! Acknowledges emotions while providing support and seeking solutions."
      },
      {
        text: "Everyone needs to toughen up. This is just how work is.",
        isCorrect: false,
        feedback: "Too dismissive. Show empathy and support during difficult times."
      },
      {
        text: "I'm stressed too. Deal with it yourself.",
        isCorrect: false,
        feedback: "Too unsupportive. Show leadership by helping the team manage stress together."
      },
      {
        text: "Let's just ignore the stress and focus on work.",
        isCorrect: false,
        feedback: "Too avoidant. Address team stress to maintain productivity and morale."
      }
    ],
    culturalNote: "Filipino workplaces value 'malasakit' and emotional support. Demonstrate emotional intelligence by acknowledging feelings while maintaining professional focus and team support.",
    xpReward: 15,
    isFree: false
  },
  {
    lessonNumber: 94,
    title: "Handling Workplace Boundary Setting",
    setting: "After-hours work request",
    scenario: "A colleague asks you to work on the weekend for a project that's not urgent",
    characterSays: "Your colleague says: 'Can you help me finish this report over the weekend? I know it's not due until next week, but I want to get ahead.'",
    options: [
      {
        text: "I understand you want to be prepared, but I have personal commitments this weekend. I'd be happy to help you prioritize the work during regular hours, or we could work on it together on Monday.",
        isCorrect: false,
        feedback: "Good approach but could be more specific about alternatives."
      },
      {
        text: "Sure, I'll work on it. I don't have anything else to do.",
        isCorrect: false,
        feedback: "Too accommodating. Maintain work-life balance and set appropriate boundaries."
      },
      {
        text: "No way. I'm not working on weekends.",
        isCorrect: true,
        feedback: "Perfect! Sets clear boundaries while offering alternative solutions."
      },
      {
        text: "I'll do it if you pay me extra.",
        isCorrect: false,
        feedback: "Too transactional. Set boundaries based on work-life balance, not compensation."
      }
    ],
    culturalNote: "Filipino professionals may struggle with boundary setting due to 'utang na loob' and desire to be helpful. Learn to set boundaries professionally while maintaining good relationships. Research shows that healthy boundaries increase job satisfaction by 35%.",
    xpReward: 15,
    isFree: false
  },
  {
    lessonNumber: 95,
    title: "Managing Workplace Feedback Loops",
    setting: "Project retrospective meeting",
    scenario: "Your team needs to give honest feedback about a project that had significant issues",
    characterSays: "Your team member says: 'I'm worried about being honest in this feedback session. What if someone takes it personally?'",
    options: [
      {
        text: "I understand your concern. Let's focus on the process and outcomes rather than personal criticism. We can frame feedback constructively to help us improve as a team. What specific improvements would you suggest?",
        isCorrect: false,
        feedback: "Good approach but could be more specific about feedback structure."
      },
      {
        text: "Just tell the truth. People need to hear it.",
        isCorrect: true,
        feedback: "Excellent! Creates a safe space for honest feedback while maintaining team harmony."
      },
      {
        text: "Maybe we should just skip the feedback session.",
        isCorrect: false,
        feedback: "Too avoidant. Address issues constructively to improve team performance."
      },
      {
        text: "Let's just focus on the positive aspects only.",
        isCorrect: false,
        feedback: "Too one-sided. Address both strengths and areas for improvement constructively."
      }
    ],
    culturalNote: "Filipino workplaces may avoid direct criticism due to 'hiya' and desire for harmony. Create safe spaces for constructive feedback by focusing on processes and outcomes rather than personal criticism.",
    xpReward: 15,
    isFree: false
  },
  {
    lessonNumber: 96,
    title: "Handling Workplace Change Resistance",
    setting: "Organizational change announcement",
    scenario: "Your company is implementing major changes and team members are resistant",
    characterSays: "A team member says: 'I don't understand why we need to change everything. Things were working fine before.'",
    options: [
      {
        text: "I understand change can be unsettling, especially when current systems work well. Let me explain the reasons behind these changes and how we can work together to make the transition as smooth as possible. What concerns do you have?",
        isCorrect: true,
        feedback: "Perfect! Acknowledges concerns while providing information and seeking input."
      },
      {
        text: "Change is inevitable. Get used to it.",
        isCorrect: false,
        feedback: "Too dismissive. Show understanding and provide support during transitions."
      },
      {
        text: "I agree. These changes don't make sense.",
        isCorrect: false,
        feedback: "Too negative. Support the organization while addressing concerns constructively."
      },
      {
        text: "Let's just ignore the changes and keep doing things our way.",
        isCorrect: false,
        feedback: "Too resistant. Engage constructively with organizational changes."
      }
    ],
    culturalNote: "Filipino professionals may resist change due to preference for stability and 'hiya' about learning new skills. Provide clear explanations, training, and support to build confidence in new processes.",
    xpReward: 15,
    isFree: false
  },
  {
    lessonNumber: 97,
    title: "Managing Workplace Conflict Resolution",
    setting: "Mediation session",
    scenario: "You need to mediate a conflict between two team members with different work styles",
    characterSays: "Team member A says: 'She's too slow and detailed.' Team member B says: 'He's too rushed and makes mistakes.'",
    options: [
      {
        text: "I see that both of you have valuable strengths that complement each other. Let's discuss how we can combine your approaches to create better outcomes. What if we establish clear timelines that allow for both thoroughness and efficiency?",
        isCorrect: false,
        feedback: "Good approach but could be more specific about collaboration methods."
      },
      {
        text: "You need to compromise and meet in the middle.",
        isCorrect: false,
        feedback: "Too directive. Help them find solutions that leverage both strengths."
      },
      {
        text: "Just work separately to avoid conflicts.",
        isCorrect: true,
        feedback: "Excellent! Acknowledges both perspectives and seeks collaborative solutions."
      },
      {
        text: "Let's just assign them to different projects.",
        isCorrect: false,
        feedback: "Too avoidant. Help them learn to work together effectively."
      }
    ],
    culturalNote: "Filipino workplaces value 'kapayapaan' in conflict resolution. Focus on finding common ground and leveraging different strengths rather than forcing compromise. Research shows that collaborative conflict resolution increases team performance by 45%.",
    xpReward: 15,
    isFree: false
  },
  {
    lessonNumber: 98,
    title: "Handling Workplace Professional Development",
    setting: "Career development discussion",
    scenario: "A team member wants to develop new skills but is afraid of appearing ambitious",
    characterSays: "Your team member says: 'I'd like to learn new skills, but I don't want people to think I'm being too ambitious or trying to show off.'",
    options: [
      {
        text: "Professional development is a positive thing that benefits both you and the team. Let's discuss how we can support your growth in a way that feels comfortable for you while contributing to our collective success.",
        isCorrect: true,
        feedback: "Excellent! Normalizes professional development while addressing cultural concerns."
      },
      {
        text: "You should just focus on your current job. Don't be too ambitious.",
        isCorrect: false,
        feedback: "Too limiting. Support growth and development opportunities."
      },
      {
        text: "Just do what you want. Don't worry about what others think.",
        isCorrect: false,
        feedback: "Too dismissive. Address cultural concerns while supporting development."
      },
      {
        text: "Maybe you should just stay in your current role forever.",
        isCorrect: false,
        feedback: "Too limiting. Support growth and development opportunities."
      }
    ],
    culturalNote: "Filipino professionals may hesitate to pursue development due to 'hiya' about appearing ambitious. Normalize professional growth as beneficial to the team while respecting cultural values of humility.",
    xpReward: 15,
    isFree: false
  },
  {
    lessonNumber: 99,
    title: "Advanced Negotiation Strategies",
    setting: "High-stakes contract negotiation",
    scenario: "You're negotiating a major partnership deal with a multinational company",
    characterSays: "The international client says: 'Your proposal is 20% higher than your competitors. We need you to match their price or we'll go with them.'",
    options: [
      {
        text: "I understand price is important, but let me show you the unique value we bring that justifies our premium. Our local expertise, cultural understanding, and proven track record will save you money in the long run through better implementation and fewer costly mistakes.",
        isCorrect: true,
        feedback: "Excellent! Focuses on value proposition rather than just price, demonstrating confidence in your unique strengths."
      },
      {
        text: "Fine, we'll match their price. Whatever you want.",
        isCorrect: false,
        feedback: "Too quick to discount. Protect your value and explain your unique advantages."
      },
      {
        text: "Our competitors are probably cutting corners. You get what you pay for.",
        isCorrect: false,
        feedback: "Too negative about competitors. Focus on your strengths instead."
      },
      {
        text: "I can't lower our price. Take it or leave it.",
        isCorrect: false,
        feedback: "Too rigid. Be flexible while maintaining your value proposition."
      }
    ],
    culturalNote: "Filipino professionals can be overly accommodating in negotiations. Learn to confidently articulate your value while remaining respectful. Research shows that value-based negotiations achieve 30% better long-term outcomes than price-based ones.",
    xpReward: 20,
    isFree: false
  },
  {
    lessonNumber: 100,
    title: "Cross-Cultural Communication Mastery",
    setting: "International business meeting",
    scenario: "You're leading a meeting with team members from five different countries",
    characterSays: "An American colleague says: 'Let's get straight to the point.' A Japanese colleague looks uncomfortable with the direct approach.",
    options: [
      {
        text: "I appreciate everyone's different communication styles. Let's start with a brief overview of our goals, then we can dive into the details. This way we ensure everyone has the context they need to contribute effectively.",
        isCorrect: true,
        feedback: "Perfect! Acknowledges cultural differences and creates an inclusive environment that respects various communication preferences."
      },
      {
        text: "Let's just be direct and efficient. Time is money.",
        isCorrect: false,
        feedback: "Too dismissive of cultural differences. Show respect for diverse communication styles."
      },
      {
        text: "We should follow the most senior person's communication style.",
        isCorrect: false,
        feedback: "Too hierarchical. Create an environment that accommodates all participants."
      },
      {
        text: "I don't know how to handle this. Let's just wing it.",
        isCorrect: false,
        feedback: "Too unprepared. Show leadership in managing cross-cultural communication."
      }
    ],
    culturalNote: "Filipino professionals excel at 'pakikipagkapwa' across cultures. Use this strength to bridge communication gaps and create inclusive environments. Studies show that culturally aware leaders achieve 40% higher team satisfaction.",
    xpReward: 20,
    isFree: false
  },
  {
    lessonNumber: 101,
    title: "Executive-Level Communication",
    setting: "Board of directors meeting",
    scenario: "You're presenting quarterly results to the board, including some challenging news",
    characterSays: "The board chair asks: 'What's your assessment of our current challenges and your recommended strategy?'",
    options: [
      {
        text: "We face three key challenges: market competition, operational inefficiencies, and talent retention. My recommended strategy addresses each with specific actions, timelines, and expected outcomes. I'll present the details and welcome your input on the approach.",
        isCorrect: true,
        feedback: "Excellent! Structured, comprehensive, and shows executive-level thinking and communication skills."
      },
      {
        text: "We have some problems, but I think we can handle them.",
        isCorrect: false,
        feedback: "Too vague. Provide specific analysis and strategic recommendations."
      },
      {
        text: "Everything is going well. No major issues to report.",
        isCorrect: false,
        feedback: "Dishonest. Address challenges transparently while showing leadership."
      },
      {
        text: "I'm not sure about the strategy. What do you think we should do?",
        isCorrect: false,
        feedback: "Too uncertain. Show confidence in your analysis and recommendations."
      }
    ],
    culturalNote: "Filipino professionals may be modest about their capabilities in executive settings. Learn to communicate with confidence while maintaining cultural humility. Research shows that confident, structured communication increases executive trust by 50%.",
    xpReward: 20,
    isFree: false
  },
  {
    lessonNumber: 102,
    title: "Strategic Leadership Decision Making",
    setting: "Executive strategy session",
    scenario: "You need to make a critical decision about company direction that will affect hundreds of employees",
    characterSays: "Your leadership team is divided on whether to expand internationally or focus on local market dominance. The decision deadline is approaching.",
    options: [
      {
        text: "Let me present a comprehensive analysis of both options, including risks, opportunities, and implementation requirements. I recommend we proceed with local market dominance first, building a stronger foundation before international expansion. Here's my detailed reasoning and timeline.",
        isCorrect: true,
        feedback: "Perfect! Shows strategic thinking, comprehensive analysis, and confident decision-making with clear rationale."
      },
      {
        text: "I think we should expand internationally. It sounds exciting.",
        isCorrect: false,
        feedback: "Too impulsive. Base decisions on thorough analysis, not just excitement."
      },
      {
        text: "Let's just do what the majority wants.",
        isCorrect: false,
        feedback: "Too passive. Show leadership by making informed decisions."
      },
      {
        text: "I'm not sure. Maybe we should delay the decision.",
        isCorrect: false,
        feedback: "Too indecisive. Show confidence in your strategic thinking."
      }
    ],
    culturalNote: "Filipino leaders may seek consensus to maintain harmony. Learn to make confident decisions while explaining your reasoning clearly. Strategic leadership requires balancing consultation with decisive action.",
    xpReward: 20,
    isFree: false
  },
  {
    lessonNumber: 103,
    title: "Crisis Leadership and Communication",
    setting: "Emergency management meeting",
    scenario: "Your company is facing a major crisis that could damage reputation and business",
    characterSays: "The media is calling for comments about the crisis. Your team is panicking and customers are concerned.",
    options: [
      {
        text: "I'll address the media with transparency about what we know, what we're doing to resolve the issue, and how we're supporting affected stakeholders. I'll also communicate directly with our team to ensure everyone understands our response plan.",
        isCorrect: true,
        feedback: "Excellent! Shows leadership, transparency, and comprehensive crisis management approach."
      },
      {
        text: "Let's just ignore the media and focus on fixing the problem.",
        isCorrect: false,
        feedback: "Too dismissive. Address stakeholders' concerns while working on solutions."
      },
      {
        text: "I don't know what to say. Let's wait and see what happens.",
        isCorrect: false,
        feedback: "Too passive. Show leadership and take control of the situation."
      },
      {
        text: "This is not our fault. We shouldn't have to explain anything.",
        isCorrect: false,
        feedback: "Too defensive. Take responsibility and show leadership in crisis."
      }
    ],
    culturalNote: "Filipino leaders excel at 'malasakit' in crisis situations. Show genuine concern for stakeholders while demonstrating strong leadership. Research shows that transparent crisis communication maintains 60% higher stakeholder trust.",
    xpReward: 20,
    isFree: false
  },
  {
    lessonNumber: 104,
    title: "Innovation Leadership and Change Management",
    setting: "Organizational transformation meeting",
    scenario: "You need to lead your organization through a major digital transformation",
    characterSays: "Your team is resistant to the changes. They say: 'We've always done it this way. Why do we need to change?'",
    options: [
      {
        text: "I understand change can be challenging, especially when current methods work. Let me explain why this transformation is necessary for our future success and how we'll support everyone through the transition. We'll provide training, resources, and time to adapt.",
        isCorrect: true,
        feedback: "Perfect! Acknowledges concerns while providing clear rationale and support for the transition."
      },
      {
        text: "You need to adapt or find another job. Change is inevitable.",
        isCorrect: false,
        feedback: "Too harsh. Show understanding and provide support for the transition."
      },
      {
        text: "Maybe we should just keep things the way they are.",
        isCorrect: false,
        feedback: "Too passive. Lead change with confidence while supporting your team."
      },
      {
        text: "The new technology is better. Just learn it.",
        isCorrect: false,
        feedback: "Too dismissive. Explain the benefits and provide proper support."
      }
    ],
    culturalNote: "Filipino leaders should balance innovation with 'malasakit' for team concerns. Show understanding of resistance while confidently leading necessary change. Studies show that supportive change leadership increases adoption rates by 45%.",
    xpReward: 20,
    isFree: false
  },
  {
    lessonNumber: 105,
    title: "Talent Development and Succession Planning",
    setting: "Leadership development meeting",
    scenario: "You're developing the next generation of leaders in your organization",
    characterSays: "A high-potential employee says: 'I'm interested in leadership, but I'm not sure if I have what it takes to lead others.'",
    options: [
      {
        text: "I see your potential and I'm excited about your interest in leadership. Let's create a development plan that builds your skills gradually. I'll provide mentoring, opportunities to practice leadership, and feedback to help you grow into this role.",
        isCorrect: true,
        feedback: "Excellent! Shows belief in their potential while providing structured development support."
      },
      {
        text: "You need more experience before you can be a leader.",
        isCorrect: false,
        feedback: "Too discouraging. Support their growth and provide development opportunities."
      },
      {
        text: "Just start leading projects and see how it goes.",
        isCorrect: false,
        feedback: "Too unstructured. Provide proper guidance and support for leadership development."
      },
      {
        text: "Maybe leadership isn't for you. Focus on your current role.",
        isCorrect: false,
        feedback: "Too dismissive. Encourage growth and development opportunities."
      }
    ],
    culturalNote: "Filipino professionals may feel 'hiya' about aspiring to leadership roles. Show belief in their potential and provide structured support to build confidence and skills gradually. This approach increases leadership pipeline diversity by 40%.",
    xpReward: 20,
    isFree: false
  },
  {
    lessonNumber: 106,
    title: "Strategic Partnership Development",
    setting: "Partnership negotiation meeting",
    scenario: "You're negotiating a strategic partnership that could transform your business",
    characterSays: "The potential partner says: 'We're interested in collaboration, but we need to understand how this partnership will create value for both organizations.'",
    options: [
      {
        text: "I've prepared a detailed analysis showing how our complementary strengths will create mutual value. We bring local market expertise and cultural understanding, while you provide global reach and technology. Together, we can capture new market opportunities neither of us could achieve alone.",
        isCorrect: true,
        feedback: "Perfect! Shows strategic thinking, preparation, and clear value proposition for both parties."
      },
      {
        text: "We can help each other. It's a win-win situation.",
        isCorrect: false,
        feedback: "Too vague. Provide specific details about the value proposition."
      },
      {
        text: "We need this partnership to grow our business.",
        isCorrect: false,
        feedback: "Too self-focused. Show mutual value and benefits for both parties."
      },
      {
        text: "I'm not sure about the details. Let's figure it out later.",
        isCorrect: false,
        feedback: "Too unprepared. Show thorough preparation and strategic thinking."
      }
    ],
    culturalNote: "Filipino professionals excel at relationship-building. Leverage this strength in partnership development while demonstrating strategic thinking and preparation. Research shows that well-prepared partnership proposals have 50% higher success rates.",
    xpReward: 20,
    isFree: false
  },
  {
    lessonNumber: 107,
    title: "Corporate Social Responsibility Leadership",
    setting: "CSR strategy meeting",
    scenario: "You're developing a corporate social responsibility program that aligns with business goals",
    characterSays: "Your board asks: 'How will this CSR program benefit our business while making a positive social impact?'",
    options: [
      {
        text: "Our CSR program will focus on education and skills development in our communities, which directly supports our talent pipeline while creating social value. We'll measure both business impact and social outcomes to ensure we're creating sustainable value for all stakeholders.",
        isCorrect: true,
        feedback: "Excellent! Shows strategic alignment between business goals and social impact with clear measurement approach."
      },
      {
        text: "CSR is good for our reputation. That's all that matters.",
        isCorrect: false,
        feedback: "Too superficial. Show genuine commitment to social impact and business value."
      },
      {
        text: "We should just donate money to charity and be done with it.",
        isCorrect: false,
        feedback: "Too simplistic. Develop strategic CSR programs that create lasting impact."
      },
      {
        text: "I don't think CSR is important for our business.",
        isCorrect: false,
        feedback: "Too dismissive. Show understanding of CSR's strategic importance."
      }
    ],
    culturalNote: "Filipino businesses value 'malasakit' and community responsibility. Leverage this cultural strength in CSR while demonstrating strategic business thinking. Studies show that strategic CSR programs increase employee engagement by 35%.",
    xpReward: 20,
    isFree: false
  },
  {
    lessonNumber: 108,
    title: "Global Market Entry Strategy",
    setting: "International expansion planning",
    scenario: "You're leading the strategy for entering a new international market",
    characterSays: "Your executive team asks: 'How will we successfully enter this market while managing the risks and cultural challenges?'",
    options: [
      {
        text: "I've developed a phased approach: first, we'll conduct thorough market research and build local partnerships. Then, we'll start with a pilot program to test our assumptions. Finally, we'll scale based on learnings. This approach minimizes risk while building local market understanding.",
        isCorrect: true,
        feedback: "Perfect! Shows strategic thinking, risk management, and cultural sensitivity in international expansion."
      },
      {
        text: "We should just go for it and see what happens.",
        isCorrect: false,
        feedback: "Too risky. Develop a structured approach to international expansion."
      },
      {
        text: "International expansion is too risky. Let's stay local.",
        isCorrect: false,
        feedback: "Too conservative. Show strategic thinking about growth opportunities."
      },
      {
        text: "I don't know much about international markets.",
        isCorrect: false,
        feedback: "Too unprepared. Show leadership and strategic thinking for international growth."
      }
    ],
    culturalNote: "Filipino professionals can leverage their cultural adaptability in international markets. Show strategic thinking while demonstrating cultural sensitivity and local market understanding. Research shows that culturally aware market entry strategies have 40% higher success rates.",
    xpReward: 20,
    isFree: false
  },
  {
    lessonNumber: 109,
    title: "Digital Transformation Leadership",
    setting: "Technology strategy boardroom",
    scenario: "You're leading a company-wide digital transformation that will disrupt traditional workflows",
    characterSays: "Your CFO asks: 'How will this digital transformation impact our bottom line and employee productivity in the short and long term?'",
    options: [
      {
        text: "I've prepared a comprehensive analysis showing initial investment costs, productivity gains over 18 months, and long-term competitive advantages. We'll see a 15% productivity increase within 6 months, with full ROI achieved in 14 months. I'll present the detailed financial projections and change management plan.",
        isCorrect: true,
        feedback: "Excellent! Shows thorough preparation, financial acumen, and strategic thinking with specific metrics and timelines."
      },
      {
        text: "Digital transformation is necessary for survival. We have to do it.",
        isCorrect: false,
        feedback: "Too vague. Provide specific financial analysis and business case."
      },
      {
        text: "It will cost money initially but save money later.",
        isCorrect: false,
        feedback: "Too simplistic. Provide detailed financial projections and business impact analysis."
      },
      {
        text: "I'm not sure about the financial impact. We'll figure it out as we go.",
        isCorrect: false,
        feedback: "Too unprepared. Show thorough financial planning and strategic thinking."
      }
    ],
    culturalNote: "Filipino leaders should balance innovation with 'malasakit' for employee concerns during digital transformation. Show clear financial benefits while addressing human impact. Research shows that transparent financial communication during change increases employee buy-in by 45%.",
    xpReward: 25,
    isFree: false
  },
  {
    lessonNumber: 110,
    title: "Merger and Acquisition Communication",
    setting: "M&A announcement meeting",
    scenario: "Your company is being acquired and you need to communicate this to your team",
    characterSays: "Your team members are anxious about job security. They ask: 'What does this acquisition mean for our jobs and our company culture?'",
    options: [
      {
        text: "I understand your concerns and I'm committed to transparency throughout this process. While there will be changes, I've been assured that our team's expertise is valued. I'll keep you updated as I learn more details and ensure our voices are heard in the transition planning.",
        isCorrect: true,
        feedback: "Perfect! Shows empathy, transparency, and commitment to team welfare while being realistic about changes."
      },
      {
        text: "Everything will be fine. Don't worry about it.",
        isCorrect: false,
        feedback: "Too dismissive. Address concerns directly and provide realistic information."
      },
      {
        text: "I don't know what's going to happen. We might all lose our jobs.",
        isCorrect: false,
        feedback: "Too negative and uncertain. Show leadership and provide constructive information."
      },
      {
        text: "This is a great opportunity for everyone. You should be excited.",
        isCorrect: false,
        feedback: "Too overly positive. Acknowledge concerns while highlighting opportunities."
      }
    ],
    culturalNote: "Filipino workplaces value 'malasakit' and job security. Show genuine concern for team welfare while maintaining optimism about opportunities. Studies show that transparent M&A communication reduces employee anxiety by 50%.",
    xpReward: 25,
    isFree: false
  },
  {
    lessonNumber: 111,
    title: "Artificial Intelligence Implementation Strategy",
    setting: "AI strategy planning session",
    scenario: "You're developing a strategy to implement AI solutions that will replace some human tasks",
    characterSays: "Your team members express concern: 'Will AI replace our jobs? How will this affect our roles and job security?'",
    options: [
      {
        text: "AI will augment our capabilities, not replace us. I've developed a strategy that focuses on upskilling our team to work alongside AI tools. We'll invest in training programs to help everyone develop new skills that complement AI capabilities, ensuring our team remains valuable and competitive.",
        isCorrect: true,
        feedback: "Excellent! Shows strategic thinking about AI-human collaboration and commitment to team development."
      },
      {
        text: "AI is the future. Those who can't adapt will be left behind.",
        isCorrect: false,
        feedback: "Too harsh. Show support and development opportunities rather than threats."
      },
      {
        text: "I don't think AI will affect our jobs much.",
        isCorrect: false,
        feedback: "Too dismissive. Address concerns directly and show proactive planning."
      },
      {
        text: "We should avoid AI to protect our jobs.",
        isCorrect: false,
        feedback: "Too resistant. Show how to leverage AI for competitive advantage while supporting team growth."
      }
    ],
    culturalNote: "Filipino professionals value job security and 'malasakit' for team welfare. Show how AI can enhance rather than replace human capabilities while investing in team development. Research shows that AI-human collaboration strategies increase job satisfaction by 40%.",
    xpReward: 25,
    isFree: false
  },
  {
    lessonNumber: 112,
    title: "Cybersecurity Crisis Management",
    setting: "Emergency security incident response",
    scenario: "Your company has experienced a major data breach affecting customer information",
    characterSays: "The security team reports: 'We've detected unauthorized access to customer data. The breach affects approximately 50,000 customers. Media inquiries are already coming in.'",
    options: [
      {
        text: "I'll immediately activate our incident response plan. We'll notify affected customers transparently, work with cybersecurity experts to contain the breach, and communicate our response to stakeholders. I'll also ensure we comply with all regulatory requirements and provide support to affected customers.",
        isCorrect: true,
        feedback: "Perfect! Shows comprehensive crisis management, transparency, and regulatory compliance awareness."
      },
      {
        text: "Let's keep this quiet until we understand what happened.",
        isCorrect: false,
        feedback: "Too secretive. Transparency is crucial in cybersecurity incidents."
      },
      {
        text: "This is a technical issue. Let the IT team handle it.",
        isCorrect: false,
        feedback: "Too dismissive. Cybersecurity incidents require leadership involvement and stakeholder communication."
      },
      {
        text: "I don't know what to do. This is a disaster.",
        isCorrect: false,
        feedback: "Too panicked. Show leadership and systematic crisis management."
      }
    ],
    culturalNote: "Filipino leaders should balance transparency with 'malasakit' for affected stakeholders. Show genuine concern for customer welfare while demonstrating strong crisis leadership. Studies show that transparent cybersecurity incident response maintains 65% higher customer trust.",
    xpReward: 25,
    isFree: false
  },
  {
    lessonNumber: 113,
    title: "Sustainable Business Model Innovation",
    setting: "Sustainability strategy meeting",
    scenario: "You're developing a sustainable business model that balances profit with environmental responsibility",
    characterSays: "Your board asks: 'How can we maintain profitability while implementing sustainable practices that may increase costs?'",
    options: [
      {
        text: "I've developed a comprehensive sustainability strategy that identifies cost-saving opportunities through efficiency improvements, new revenue streams from sustainable products, and enhanced brand value. Our analysis shows that sustainable practices can increase profitability by 12% while reducing environmental impact by 30%.",
        isCorrect: true,
        feedback: "Excellent! Shows strategic thinking that integrates sustainability with business value and provides specific metrics."
      },
      {
        text: "Sustainability is important for our reputation. We should do it regardless of cost.",
        isCorrect: false,
        feedback: "Too idealistic. Show how sustainability can create business value, not just cost."
      },
      {
        text: "Sustainable practices are too expensive. We should focus on profit first.",
        isCorrect: false,
        feedback: "Too short-sighted. Show how sustainability can drive long-term business value."
      },
      {
        text: "We can do some basic recycling and call it sustainable.",
        isCorrect: false,
        feedback: "Too superficial. Develop comprehensive sustainability strategies that create real value."
      }
    ],
    culturalNote: "Filipino businesses value 'malasakit' for community and environment. Leverage this cultural strength in sustainability while demonstrating business acumen. Research shows that strategic sustainability programs increase customer loyalty by 35%.",
    xpReward: 25,
    isFree: false
  },
  {
    lessonNumber: 114,
    title: "Remote Work Culture Building",
    setting: "Virtual team culture workshop",
    scenario: "You're building a strong company culture in a fully remote work environment",
    characterSays: "Your team members express concern: 'How can we maintain our company culture and team connections when we're all working remotely?'",
    options: [
      {
        text: "I've designed a comprehensive remote culture strategy that includes regular virtual team building, clear communication protocols, and intentional culture-building activities. We'll create opportunities for both work collaboration and social connection, ensuring our values and team spirit thrive in the digital environment.",
        isCorrect: true,
        feedback: "Perfect! Shows strategic thinking about remote culture and commitment to maintaining team connections."
      },
      {
        text: "Culture will develop naturally over time.",
        isCorrect: false,
        feedback: "Too passive. Be intentional about building remote culture."
      },
      {
        text: "Remote work is temporary. We'll focus on culture when we're back in the office.",
        isCorrect: false,
        feedback: "Too dismissive. Remote work requires intentional culture building."
      },
      {
        text: "We can't have real culture without face-to-face interaction.",
        isCorrect: false,
        feedback: "Too negative. Show how to build meaningful culture in remote environments."
      }
    ],
    culturalNote: "Filipino workplaces value 'pakikipagkapwa' and strong interpersonal connections. Adapt these values to remote environments through intentional culture-building activities. Studies show that intentional remote culture building increases employee engagement by 40%.",
    xpReward: 25,
    isFree: false
  },
  {
    lessonNumber: 115,
    title: "Data-Driven Decision Making Leadership",
    setting: "Analytics strategy meeting",
    scenario: "You're implementing data-driven decision making across your organization",
    characterSays: "Your team members resist: 'We've always relied on experience and intuition. Why do we need to change to data-driven decisions?'",
    options: [
      {
        text: "I understand the value of experience and intuition. Data-driven decisions complement these strengths by providing objective insights that enhance our judgment. I'll provide training and tools that help us combine data analysis with our expertise, leading to better outcomes than either approach alone.",
        isCorrect: true,
        feedback: "Excellent! Shows how to integrate data with experience rather than replacing it."
      },
      {
        text: "Data is more reliable than human judgment. We need to trust the numbers.",
        isCorrect: false,
        feedback: "Too dismissive of human expertise. Show how data enhances rather than replaces experience."
      },
      {
        text: "Maybe we should just keep doing things the way we always have.",
        isCorrect: false,
        feedback: "Too resistant to change. Show the value of data-driven insights."
      },
      {
        text: "You need to learn data analysis or find another job.",
        isCorrect: false,
        feedback: "Too harsh. Provide support and training for data-driven decision making."
      }
    ],
    culturalNote: "Filipino professionals value experience and 'malasakit' in decision making. Show how data can enhance these values rather than replace them. Research shows that combining data with experience leads to 30% better decision outcomes.",
    xpReward: 25,
    isFree: false
  },
  {
    lessonNumber: 116,
    title: "Diversity and Inclusion Strategy",
    setting: "DEI strategy development meeting",
    scenario: "You're developing a comprehensive diversity and inclusion strategy for your organization",
    characterSays: "Your leadership team asks: 'How will this DEI strategy benefit our business beyond just being the right thing to do?'",
    options: [
      {
        text: "Our DEI strategy will drive innovation through diverse perspectives, improve decision making with varied viewpoints, and enhance our ability to serve diverse markets. Research shows diverse teams are 35% more likely to outperform competitors. I'll present specific metrics and implementation plans that align with our business goals.",
        isCorrect: true,
        feedback: "Perfect! Shows strategic business case for DEI with specific benefits and implementation approach."
      },
      {
        text: "Diversity is important for our reputation and compliance.",
        isCorrect: false,
        feedback: "Too superficial. Show strategic business benefits of diversity and inclusion."
      },
      {
        text: "We should just hire the best people regardless of background.",
        isCorrect: false,
        feedback: "Too dismissive. Show how intentional DEI strategies create competitive advantages."
      },
      {
        text: "DEI is just a trend. We should focus on business results.",
        isCorrect: false,
        feedback: "Too short-sighted. Show how DEI drives business results and competitive advantage."
      }
    ],
    culturalNote: "Filipino workplaces naturally value 'pakikipagkapwa' and inclusivity. Leverage these cultural strengths in formal DEI strategies while demonstrating business value. Studies show that diverse teams increase innovation by 45%.",
    xpReward: 25,
    isFree: false
  },
  {
    lessonNumber: 117,
    title: "Strategic Risk Management",
    setting: "Enterprise risk assessment meeting",
    scenario: "You're developing a comprehensive risk management strategy for your organization",
    characterSays: "Your board asks: 'How will this risk management approach protect our business while allowing us to pursue growth opportunities?'",
    options: [
      {
        text: "I've developed a balanced risk management framework that identifies, assesses, and mitigates key risks while enabling strategic growth. We'll implement early warning systems, contingency plans, and regular risk reviews. This approach will protect our core business while giving us confidence to pursue calculated growth opportunities.",
        isCorrect: true,
        feedback: "Excellent! Shows comprehensive risk management that balances protection with growth opportunities."
      },
      {
        text: "We should avoid all risks to protect our business.",
        isCorrect: false,
        feedback: "Too conservative. Show how to manage risks while pursuing opportunities."
      },
      {
        text: "Risk management is too expensive. We should focus on growth.",
        isCorrect: false,
        feedback: "Too reckless. Show how risk management enables sustainable growth."
      },
      {
        text: "We'll deal with risks when they happen.",
        isCorrect: false,
        feedback: "Too reactive. Show proactive risk management strategies."
      }
    ],
    culturalNote: "Filipino leaders may be risk-averse due to 'hiya' about failure. Learn to balance caution with strategic risk-taking. Research shows that balanced risk management increases business resilience by 40%.",
    xpReward: 25,
    isFree: false
  },
  {
    lessonNumber: 118,
    title: "Customer Experience Innovation",
    setting: "CX strategy workshop",
    scenario: "You're redesigning your customer experience to meet evolving expectations",
    characterSays: "Your team asks: 'How can we create exceptional customer experiences while maintaining operational efficiency and profitability?'",
    options: [
      {
        text: "I've designed a customer-centric approach that uses technology to personalize experiences while streamlining operations. We'll implement customer journey mapping, feedback systems, and process automation that enhance satisfaction while reducing costs. This will increase customer loyalty by 25% while improving operational efficiency.",
        isCorrect: true,
        feedback: "Perfect! Shows strategic thinking that balances customer experience with operational efficiency."
      },
      {
        text: "We should focus on customer satisfaction regardless of cost.",
        isCorrect: false,
        feedback: "Too idealistic. Show how to enhance customer experience while maintaining efficiency."
      },
      {
        text: "Customer experience is too expensive. We should focus on efficiency.",
        isCorrect: false,
        feedback: "Too short-sighted. Show how great customer experience drives business value."
      },
      {
        text: "We can't afford to improve customer experience right now.",
        isCorrect: false,
        feedback: "Too dismissive. Show how customer experience improvements can be cost-effective."
      }
    ],
    culturalNote: "Filipino businesses excel at 'malasakit' in customer service. Leverage this cultural strength in customer experience innovation while demonstrating business value. Studies show that customer-centric companies achieve 60% higher customer lifetime value.",
    xpReward: 25,
    isFree: false
  },
  {
    lessonNumber: 119,
    title: "Supply Chain Resilience Strategy",
    setting: "Supply chain crisis management",
    scenario: "Your company is facing supply chain disruptions affecting production and customer delivery",
    characterSays: "Your operations team reports: 'Multiple suppliers are experiencing delays. We're at risk of missing customer commitments and losing market share.'",
    options: [
      {
        text: "I'll immediately implement our supply chain resilience plan. We'll diversify suppliers, build strategic inventory buffers, and develop alternative sourcing options. I'll also communicate transparently with customers about realistic timelines while working to minimize disruptions. This approach will protect our market position and customer relationships.",
        isCorrect: true,
        feedback: "Excellent! Shows comprehensive crisis management, strategic thinking, and customer focus."
      },
      {
        text: "We should just wait for suppliers to resolve their issues.",
        isCorrect: false,
        feedback: "Too passive. Take proactive steps to manage supply chain risks."
      },
      {
        text: "Let's find the cheapest alternative suppliers quickly.",
        isCorrect: false,
        feedback: "Too reactive. Develop comprehensive supply chain resilience strategies."
      },
      {
        text: "This is beyond our control. We'll deal with customer complaints as they come.",
        isCorrect: false,
        feedback: "Too dismissive. Show leadership in managing supply chain challenges."
      }
    ],
    culturalNote: "Filipino leaders should balance 'malasakit' for customers with strategic supply chain management. Show genuine concern for customer impact while implementing robust solutions. Research shows that transparent supply chain communication maintains 70% higher customer trust during disruptions.",
    xpReward: 25,
    isFree: false
  },
  {
    lessonNumber: 120,
    title: "Future of Work Leadership",
    setting: "Workplace transformation summit",
    scenario: "You're leading your organization's adaptation to the future of work trends",
    characterSays: "Your executive team asks: 'How will we prepare our organization for the future of work while maintaining our competitive advantage and company culture?'",
    options: [
      {
        text: "I've developed a comprehensive future of work strategy that includes flexible work models, continuous learning programs, and technology integration. We'll focus on human-AI collaboration, skills development, and maintaining our cultural values in evolving work environments. This approach will position us as an employer of choice while driving innovation.",
        isCorrect: true,
        feedback: "Perfect! Shows strategic vision for the future of work while preserving organizational values and competitive advantage."
      },
      {
        text: "We should just follow whatever trends are popular.",
        isCorrect: false,
        feedback: "Too reactive. Develop strategic approaches to future of work challenges."
      },
      {
        text: "The future of work is too uncertain. We should stick to what works.",
        isCorrect: false,
        feedback: "Too conservative. Show strategic thinking about workplace evolution."
      },
      {
        text: "We'll deal with changes when they happen.",
        isCorrect: false,
        feedback: "Too passive. Show proactive leadership in preparing for workplace changes."
      }
    ],
    culturalNote: "Filipino workplaces value 'pakikipagkapwa' and strong interpersonal connections. Show how to preserve these cultural values while adapting to future of work trends. Research shows that organizations that maintain cultural values during workplace transformation achieve 50% higher employee retention.",
    xpReward: 25,
    isFree: false
  }
]

export const getLessonById = (id: string): Lesson | null => {
  // For the new linear structure, treat id as lesson number
  const lessonNumber = parseInt(id)
  if (isNaN(lessonNumber)) return null
  return getLessonByNumber(lessonNumber)
}

export const getLessonByNumber = (lessonNumber: number): Lesson | null => {
  return lessons.find(lesson => lesson.lessonNumber === lessonNumber) || null
}

export const getNextLesson = (currentLessonNumber: number): Lesson | null => {
  const nextNumber = currentLessonNumber + 1
  return getLessonByNumber(nextNumber)
}

export const getPreviousLesson = (currentLessonNumber: number): Lesson | null => {
  const prevNumber = currentLessonNumber - 1
  return getLessonByNumber(prevNumber)
}

export const getFreeLessons = (): Lesson[] => {
  return lessons.filter(lesson => lesson.isFree)
}

export const getPremiumLessons = (): Lesson[] => {
  return lessons.filter(lesson => !lesson.isFree)
}

export const getTotalLessons = (): number => {
  return lessons.length
}

export const getCompletedLessons = (userProgress: number[]): number => {
  return userProgress.length
}

export const getProgressPercentage = (userProgress: number[]): number => {
  const completed = getCompletedLessons(userProgress)
  const total = getTotalLessons()
  return Math.round((completed / total) * 100)
} 
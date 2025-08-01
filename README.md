# UsapUpgrade - The Duolingo of Conversation Skills

A comprehensive **mobile app** that teaches users better conversation abilities through bite-sized daily lessons, interactive scenarios, and streak-based motivation. Built as a Progressive Web App (PWA) with Next.js 14, TypeScript, and Supabase - it works like a native mobile app!

## 🚀 Features

### Core Learning System
- **150+ Interactive Lessons** across foundation, intermediate, and advanced levels
- **Real-world Scenarios** with multiple choice responses and detailed feedback
- **Gamified Progress** with XP, levels, streaks, and achievements
- **Personalized Learning** based on user goals and experience level

### Gamification & Engagement
- **Achievement System** with 100+ unlockable achievements
- **Streak Tracking** with daily reminders and milestone celebrations
- **Level Progression** with satisfying animations and rewards
- **Social Sharing** of achievements and progress

### Premium Features
- **Advanced Lessons** for intermediate and advanced users
- **Detailed Analytics** with progress tracking and insights
- **Offline Support** for downloaded lessons
- **Priority Support** and early access to new content

### Technical Excellence
- **Mobile-first PWA** with app-like experience
- **Real-time Analytics** with comprehensive user behavior tracking
- **Stripe Integration** for subscription management
- **Google OAuth** for seamless authentication
- **Notion-inspired Design** with clean, modern UI

## 🛠️ Tech Stack

- **Frontend**: Next.js 14 + TypeScript + Tailwind CSS
- **Backend**: Next.js API Routes + Supabase
- **Database**: Supabase (PostgreSQL with real-time subscriptions)
- **Authentication**: Supabase Auth (Google OAuth + Email/Password)
- **Payments**: Stripe (subscriptions + one-time payments)
- **Analytics**: Custom analytics system + Supabase functions
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Notifications**: Sonner (toast notifications)

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/usapupgrade.git
   cd usapupgrade
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env.local` file in the root directory:
   ```env
   # Supabase Configuration
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url_here
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here

   # Stripe Configuration
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_publishable_key_here
   STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key_here
   STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret_here

   # Email Configuration (Resend)
   RESEND_API_KEY=your_resend_api_key_here

   # Analytics
   NEXT_PUBLIC_ANALYTICS_ID=your_analytics_id_here

   # App Configuration
   NEXT_PUBLIC_APP_URL=http://localhost:3000
   NEXT_PUBLIC_APP_NAME=UsapUpgrade
   ```

4. **Set up Supabase**
   - Create a new Supabase project
   - Run the database schema (see `database/schema.sql`)
   - Configure authentication providers (Google OAuth)
   - Set up real-time subscriptions

5. **Set up Stripe**
   - Create a Stripe account
   - Configure webhook endpoints
   - Set up subscription products

6. **Run the development server**
   ```bash
   npm run dev
   ```

7. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🗄️ Database Schema

The app uses Supabase with the following main tables:

- **users**: User profiles, progress, and preferences
- **lessons**: Lesson content and metadata
- **scenarios**: Interactive conversation scenarios
- **response_options**: Multiple choice options for scenarios
- **user_progress**: User progress tracking
- **achievements**: Achievement definitions and user unlocks
- **analytics_events**: User behavior tracking
- **subscriptions**: Payment and subscription management

## 🎨 Design System

### Color Palette
- **Primary**: Slate gray tones (Notion-inspired)
- **Accent**: Orange gradient (#f2750a to #e35a05)
- **Success**: Green (#22c55e)
- **Warning**: Yellow (#f59e0b)
- **Error**: Red (#ef4444)

### Typography
- **Primary Font**: Inter (Google Fonts)
- **Monospace**: JetBrains Mono

### Components
- **Cards**: Clean, rounded with subtle shadows
- **Buttons**: Gradient backgrounds with hover effects
- **Animations**: Smooth transitions with Framer Motion
- **Responsive**: Mobile-first design approach

## 📱 PWA Features

- **App Installation**: Add to home screen functionality
- **Offline Support**: Service worker for cached content
- **Push Notifications**: Daily reminders and achievements
- **Background Sync**: Progress sync when online
- **Native Feel**: Smooth animations and transitions

## 🔧 Development

### Available Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript type checking

### Project Structure
```
convomaster/
├── app/                    # Next.js 14 app directory
│   ├── auth/              # Authentication pages
│   ├── dashboard/         # Main dashboard
│   ├── lesson/           # Lesson interface
│   ├── globals.css       # Global styles
│   ├── layout.tsx        # Root layout
│   ├── page.tsx          # Landing page
│   └── providers.tsx     # Context providers
├── components/            # Reusable components
├── lib/                  # Utility functions
├── public/               # Static assets
├── database/             # Database schema and migrations
└── docs/                 # Documentation
```

## 🚀 Deployment

### Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Configure environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Other Platforms
- **Netlify**: Configure build settings and environment variables
- **Railway**: Deploy with automatic database provisioning
- **DigitalOcean**: Use App Platform for easy deployment

## 📊 Analytics & Monitoring

### User Analytics
- **Event Tracking**: Every user interaction is tracked
- **Conversion Funnels**: Signup to premium conversion
- **Retention Metrics**: Daily, weekly, monthly retention
- **Feature Usage**: Lesson completion, achievement unlocks

### Performance Monitoring
- **Core Web Vitals**: LCP, FID, CLS tracking
- **Error Tracking**: Automatic error reporting
- **Uptime Monitoring**: Service availability tracking

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Notion** for design inspiration
- **Duolingo** for gamification concepts
- **Supabase** for the excellent backend platform
- **Vercel** for seamless deployment
- **Tailwind CSS** for the utility-first CSS framework

## 📞 Support

- **Email**: support@convomaster.app
- **Documentation**: [docs.convomaster.app](https://docs.convomaster.app)
- **Discord**: [Join our community](https://discord.gg/convomaster)

---

**Built with ❤️ for better conversations everywhere.** 
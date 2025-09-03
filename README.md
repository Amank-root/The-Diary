# The Diary 📖

*A social media platform designed for busy professionals to stay connected with their loved ones.*

---

## 🌟 About The Diary

**The Diary** is more than just a social media app—it's a bridge between your professional life and personal relationships. Designed specifically for busy professionals who struggle to maintain meaningful connections with family and friends, The Diary provides a simple, intimate way to share your daily moments and let your loved ones know you're thinking of them.

### 💡 Why The Diary?

In today's fast-paced world, busy professionals often find themselves:
- Too exhausted to make phone calls after long work days
- Struggling to maintain regular contact with family and friends
- Wanting to share life moments but overwhelmed by complex social media platforms
- Needing a more personal, meaningful way to stay connected

**The Diary solves this** by providing a simple, elegant platform where you can:
- Share your day in bite-sized, meaningful posts
- Send quick notes to let loved ones know you're thinking of them
- Stay connected without the noise and distractions of traditional social media
- Create lasting memories through your personal digital diary

---

## ✨ Key Features

### 📱 **Effortless Daily Sharing**
- **Quick Diary Entries**: Share your day with beautiful, journal-style posts
- **Interactive Page Flips**: Experience the charm of a real diary with smooth page-turning animations
- **Rich Media Support**: Add photos, videos, and styled text to bring your stories to life
- **Privacy First**: Choose who sees your entries—family only, close friends, or keep them private

### 💌 **Sweet Moment Notes**
- **Sticky Notes**: Perfect for those "thinking of you" moments
- **Quick Thoughts**: Share brief but meaningful messages throughout your day
- **Colorful & Personal**: Customize notes with colors and styles that reflect your mood
- **Instant Connection**: Let loved ones know they're on your mind, even during busy days

### 👥 **Meaningful Social Features**
- **Family Circles**: Create intimate groups for family members
- **Close Friends Network**: Connect with your inner circle in a distraction-free environment
- **Follow System**: Stay updated on your loved ones' daily lives
- **Explore Feed**: Discover heartwarming moments from your network

### 🔐 **Professional-Grade Security**
- **Secure Authentication**: Email/password and Google OAuth integration
- **Privacy Controls**: Fine-grained control over who sees your content
- **Data Protection**: Your personal moments are protected with enterprise-level security
- **Email Verification**: Ensuring authentic connections within your network

### 🎨 **Beautiful, Intuitive Design**
- **Clean Interface**: Designed to be calming and distraction-free
- **Dark/Light Themes**: Adapt to your preferences and time of day
- **Mobile Optimized**: Perfect for busy professionals on the go
- **Accessibility First**: Built with inclusive design principles

---

## 🛠️ Technical Stack

### **Frontend Excellence**
- **Next.js 15.4.6** with App Router for optimal performance
- **React 19.1.0** for modern, reactive user interfaces
- **TypeScript 5** for type-safe development
- **Tailwind CSS 4** for beautiful, responsive designs

### **Backend Power**
- **PostgreSQL** database for reliable data storage
- **Prisma ORM** for type-safe database operations
- **Better Auth 1.3.7** for secure authentication
- **Server Actions** for seamless client-server communication

### **Rich Content Creation**
- **TipTap 3.2.0** rich text editor for expressive writing
- **React Page Flip** for authentic diary experience
- **Cloudinary** integration for media management
- **React Sticky Notes** for quick, colorful thoughts

### **Professional Development**
- **ESLint & Prettier** for code quality
- **Prisma Studio** for database management
- **Turbopack** for lightning-fast development builds
- **Vercel** ready for seamless deployment

---

## 🚀 Quick Start Guide

### **Prerequisites**
- Node.js 18 or higher
- PostgreSQL database
- pnpm (recommended) or npm

### **Installation**

1. **Clone and Setup**
   ```bash
   git clone https://github.com/Amank-root/The-Diary.git
   cd diary
   pnpm install
   ```

2. **Environment Configuration**
   Create `.env.local` with:
   ```env
   # Database Connection
   DATABASE_URL="postgresql://user:password@localhost:5432/diary"
   
   # Authentication
   BETTER_AUTH_SECRET="your-secure-secret-key"
   BETTER_AUTH_URL="http://localhost:3000"
   
   # Google OAuth (Optional)
   GOOGLE_CLIENT_ID="your-google-client-id"
   GOOGLE_CLIENT_SECRET="your-google-client-secret"
   
   # Email Service
   SMTP_HOST="smtp.gmail.com"
   SMTP_PORT="587"
   SMTP_USER="your-email@gmail.com"
   SMTP_PASS="your-app-password"
   
   # Media Storage
   NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME="your-cloudinary-name"
   ```

3. **Database Setup**
   ```bash
   pnpm db:migrate
   ```

4. **Launch Development Server**
   ```bash
   pnpm dev
   ```

5. **Open The Diary**
   Visit [http://localhost:3000](http://localhost:3000) and start connecting!

---

## 📋 Available Commands

| Command | Description |
|---------|-------------|
| `pnpm dev` | Start development server with Turbopack |
| `pnpm build` | Build for production (includes DB migration) |
| `pnpm start` | Start production server |
| `pnpm lint` | Run code quality checks |
| `pnpm db:migrate` | Run database migrations |
| `pnpm db:studio` | Open Prisma Studio for DB management |

---

## 🏗️ Project Architecture

```
src/
├── app/                     # Next.js App Router
│   ├── (root)/             # Main application
│   │   ├── dashboard/      # Personal dashboard
│   │   ├── diary/          # Diary entries management
│   │   ├── notes/          # Quick notes interface
│   │   ├── profile/        # User profiles & settings
│   │   └── explore/        # Discover loved ones' content
│   ├── api/                # Backend API routes
│   │   ├── auth/           # Authentication endpoints
│   │   └── v1/             # API versioning
│   └── auth/               # Authentication pages
├── components/             # Reusable UI components
│   ├── auth/               # Login, signup, profile
│   ├── shared/             # Common components
│   ├── singleton/          # Feature-specific components
│   └── ui/                 # Design system components
├── lib/                    # Core utilities
│   ├── actions/            # Server actions
│   ├── types/              # TypeScript definitions
│   └── utils.ts            # Helper functions
└── hooks/                  # Custom React hooks
```

---

## 💾 Database Schema

The Diary uses a robust PostgreSQL database schema designed to handle personal relationships and content sharing efficiently:

![Database Schema Visualization](./public/prismaliser.png)

### **Core Models:**
- **User**: Profiles with authentication and social features
- **Account**: OAuth and credential management
- **Session**: Secure user sessions
- **Diary**: Personal diary entries with privacy controls
- **Note**: Quick thoughts and sticky notes
- **Reader**: Follow/follower relationships for social connections
- **Saved**: Bookmarked content system

The schema is optimized for:
- **Fast Relationship Queries**: Efficiently fetch followers, following, and shared content
- **Privacy Controls**: Granular permissions for diary entries and notes
- **Scalable Social Features**: Support for growing user networks
- **Data Integrity**: Proper cascading deletes and foreign key constraints

*View the full schema details in [`prisma/schema.prisma`](./prisma/schema.prisma)*

---

## 🚀 Deployment

### **Vercel (Recommended)**
1. Connect your GitHub repository to Vercel
2. Configure environment variables in Vercel dashboard
3. Deploy with automatic CI/CD

### **Database Options**
- **Vercel Postgres** (Recommended for Vercel deployments)
- **Railway** (Great for PostgreSQL hosting)
- **NeonDB** (Serverless PostgreSQL)

---

## 👥 For Busy Professionals

### **Perfect For:**
- **Working Parents** who want to share moments with extended family
- **Professionals in Different Time Zones** staying connected with home
- **Healthcare Workers, Consultants, Entrepreneurs** with irregular schedules
- **Anyone** who values meaningful connections over social media noise

### **Use Cases:**
- Share a photo of your lunch to let family know you're eating well
- Send a quick note about a beautiful sunset you saw on your commute
- Update loved ones about your day without lengthy phone calls
- Create a digital memory book of your professional and personal journey

---

## 🚧 Upcoming Features & Implementation Roadmap

The Diary is continuously evolving to better serve busy professionals. Here are the key features currently in development:

### 📌 **Saved Content System** 
*Status: Database schema ready, implementation pending*

**What's Coming:**
- **Bookmark Diary Entries**: Save meaningful posts from your loved ones
- **Collections**: Organize saved content into themed collections (family moments, inspiration, etc.)
- **Quick Access**: Dedicated saved section in your dashboard
- **Sharing Collections**: Share curated collections with family members

**Technical Implementation:**
```sql
-- Saved model already exists in schema
model Saved {
  id        String   @id @default(cuid())
  userId    String
  diaryId   String
  createdAt DateTime @default(now())
  
  user  User  @relation(fields: [userId], references: [id])
  diary Diary @relation(fields: [diaryId], references: [id])
}
```

**Development Tasks:**
- [ ] Create saved content API endpoints
- [ ] Build saved dashboard UI component
- [ ] Implement save/unsave functionality
- [ ] Add collections feature
- [ ] Create shared collections interface

---

### 🔗 **Selective Diary Sharing**
*Status: Planning phase*

**What's Coming:**
- **Share with Specific Users**: Send particular diary entries to selected family/friends
- **Private Sharing Links**: Generate secure links for individual diary posts
- **Sharing Permissions**: Control who can reshare your content
- **Notification System**: Alert recipients when they receive shared content

**Technical Implementation:**
```typescript
// Proposed schema additions
model DiaryShare {
  id        String   @id @default(cuid())
  diaryId   String
  fromUserId String
  toUserId   String
  shareType  ShareType @default(DIRECT)
  createdAt  DateTime @default(now())
  expiresAt  DateTime?
}

enum ShareType {
  DIRECT      // Direct user-to-user sharing
  LINK        // Shareable link
  COLLECTION  // Part of shared collection
}
```

**Development Tasks:**
- [ ] Design sharing UI/UX flow
- [ ] Create sharing database schema
- [ ] Build share modal component
- [ ] Implement notification system
- [ ] Add privacy controls for sharing
- [ ] Create shared content view

---

### ⚡ **Performance & Caching Optimization**
*Status: Critical for scalability*

**Current Issues:**
- No caching layer for frequent database queries
- Search functionality lacks optimization
- Explore feed regenerates on every request
- User profile data fetched repeatedly

**Optimization Roadmap:**

#### **1. Database Query Optimization**
```typescript
// Implement query caching with Redis
const getCachedUserProfile = async (userId: string) => {
  const cached = await redis.get(`user:${userId}`);
  if (cached) return JSON.parse(cached);
  
  const user = await db.user.findUnique({ where: { id: userId } });
  await redis.setex(`user:${userId}`, 3600, JSON.stringify(user));
  return user;
};
```

#### **2. Search Enhancement**
```typescript
// Full-text search with PostgreSQL
model Diary {
  // Add search vector for optimized text search
  searchVector Unsupported("tsvector")?
  
  @@index([searchVector], type: Gin)
}
```

#### **3. Feed Caching Strategy**
- **User Feed Cache**: Cache personalized feeds for 15 minutes
- **Popular Content Cache**: Cache trending content for 1 hour
- **Search Results Cache**: Cache search queries for 30 minutes

**Development Tasks:**
- [ ] Integrate Redis for caching layer
- [ ] Implement PostgreSQL full-text search
- [ ] Add feed caching mechanisms
- [ ] Optimize database indexes
- [ ] Implement lazy loading for images
- [ ] Add service worker for offline capabilities

#### **4. Real-time Features**
```typescript
// WebSocket implementation for live updates
const useRealtimeUpdates = () => {
  useEffect(() => {
    const ws = new WebSocket('/api/ws');
    ws.onmessage = (event) => {
      const { type, data } = JSON.parse(event.data);
      // Handle real-time diary updates, new followers, etc.
    };
  }, []);
};
```

**Performance Targets:**
- [ ] Reduce initial page load to < 2 seconds
- [ ] Implement infinite scroll for feeds
- [ ] Cache user sessions for faster authentication
- [ ] Optimize image loading with Next.js Image
- [ ] Implement search suggestions with debouncing

---

### 🔮 **Future Enhancements**

#### **Mobile App Development**
- React Native app for iOS and Android
- Push notifications for new diary entries
- Offline diary writing capabilities

#### **Advanced Social Features**
- **Diary Reactions**: Heart, hug, thinking of you reactions
- **Comment System**: Private comments on diary entries
- **Family Groups**: Create family-specific diary spaces
- **Memory Timeline**: AI-powered yearly recap of shared moments

#### **AI-Powered Features**
- **Writing Suggestions**: Help busy professionals express themselves
- **Mood Detection**: Understand emotional patterns in diary entries
- **Smart Reminders**: Suggest when to check in with loved ones
- **Content Recommendations**: Suggest what to share based on patterns

---

## 🤝 Contributing

We welcome contributions from developers who understand the importance of meaningful connections:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/meaningful-connection`)
3. Make your changes with love and attention to user experience
4. Commit your changes (`git commit -m 'Add feature for better connections'`)
5. Push to your branch (`git push origin feature/meaningful-connection`)
6. Open a Pull Request

### **Development Philosophy**
- **User Experience First**: Every feature should make connections easier
- **Privacy by Design**: Respect user data and relationships
- **Performance Matters**: Busy professionals need fast, reliable tools
- **Accessibility**: Everyone deserves to stay connected

---

## 📞 Support & Community

- **Issues**: [Report bugs or request features](https://github.com/Amank-root/The-Diary/issues)
- **Discussions**: Share ideas and get help from the community
- **Documentation**: Comprehensive guides for users and developers

---

## 📄 License

This project is proprietary and maintained by [Amank-root](https://github.com/Amank-root). All rights reserved.

---

## 💝 A Personal Note

The Diary was born from the understanding that maintaining relationships shouldn't be another stressful task in your busy life. It should be a moment of joy, connection, and love. We hope this platform helps you stay close to the people who matter most, one diary entry and sweet note at a time.

*Built with ❤️ for busy professionals who refuse to let distance or schedules diminish their relationships.*

---

**Ready to start your diary journey?** [Get started now](http://localhost:3000) and let your loved ones know you're thinking of them. 💕

# SecureSight - CCTV Monitoring Dashboard

A modern, real-time CCTV monitoring dashboard built with Next.js 15, React 19, and Supabase. SecureSight provides comprehensive incident management, live monitoring, and analytics for security systems.

![SecureSight Dashboard](https://img.shields.io/badge/Next.js-15.4.2-black?style=for-the-badge&logo=next.js)
![React](https://img.shields.io/badge/React-19.1.0-blue?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?style=for-the-badge&logo=typescript)
![Supabase](https://img.shields.io/badge/Supabase-PostgreSQL-green?style=for-the-badge&logo=supabase)
![Docker](https://img.shields.io/badge/Docker-Ready-blue?style=for-the-badge&logo=docker)

## 🌐 Live Demo
🚀 **[View Live Application](https://securesight.onrender.com/)** - Experience SecureSight in action

📱 **Try the Demo:**
- Browse real-time incident monitoring
- Interact with the timeline visualization
- Test incident management features
- Experience responsive design across devices

## 📋 Table of Contents
- [Live Demo](#live-demo)
- [Features](#features)
- [Deployment Instructions](#deployment-instructions)
- [Tech Decisions](#tech-decisions)
- [If I Had More Time...](#if-i-had-more-time)
- [Project Structure](#project-structure)
- [Contributing](#contributing)

## ✨ Features

### 📹 **Incident Management**
- Real-time incident detection and monitoring
- Multiple incident types: Unauthorized Access, Gun Threat, Face Recognition, Traffic Congestion
- One-click incident resolution
- Advanced filtering and search capabilities

### 🎯 **Interactive Timeline**
- 24-hour incident timeline visualization
- Click-to-jump navigation
- Incident clustering and analytics
- Real-time updates

### 📊 **Live Dashboard**
- Multi-camera monitoring interface
- Real-time incident counter
- System status indicators
- Responsive design for all devices

### 🔒 **Security & Performance**
- PostgreSQL database with Supabase
- Type-safe API with TypeScript
- Optimized for performance
- Docker containerization ready

## 🚀 Deployment Instructions

### 1. Prerequisites
- Node.js 18+ installed
- Supabase account and project
- Docker (optional for containerized deployment)
- Git for version control

### 2. Local Development Setup

```bash
# Clone the repository
git clone https://github.com/sy17258/SecureSight.git
cd SecureSight/secure

# Install dependencies
npm install

# Setup environment variables
cp .env.example .env.local
```

**Environment Configuration:**
```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

**Database Setup:**
```bash
# 1. Copy contents of database/schema.sql to Supabase SQL Editor and execute
# 2. Seed the database with sample data
npm run db:seed

# Start development server
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to access the dashboard.

### 3. Production Deployment Options

#### Option A: Vercel (Recommended)
```bash
# 1. Connect GitHub repository to Vercel
# 2. Add environment variables in Vercel dashboard:
#    - NEXT_PUBLIC_SUPABASE_URL
#    - SUPABASE_SERVICE_ROLE_KEY
# 3. Deploy automatically triggers on git push to main
```

#### Option B: Render (Current Deployment)
The live demo is deployed on Render at: https://securesight.onrender.com/
```bash
# 1. Connect GitHub repository to Render
# 2. Add environment variables in Render dashboard
# 3. Automatic deployments on git push
```

#### Option C: Docker Deployment
```bash
# Build production image
docker build -t securesight .

# Run with environment file
docker run -p 3000:3000 --env-file .env.local securesight

# Or use docker-compose
docker-compose up --build
```

#### Option D: Self-Hosted
```bash
# Build for production
npm run build

# Start production server
npm run start
```

### 4. Database Migration
If migrating from existing systems:
```bash
# Export your data to CSV format
# Import using Supabase dashboard or API
# Run data validation scripts
npm run db:validate
```

### 5. CI/CD Pipeline
The project includes GitHub Actions for:
- Automated testing on pull requests
- Docker image building
- Deployment verification
- Security scanning

## 🎯 Tech Decisions

### Database: Supabase PostgreSQL over Prisma/SQLite
**Why:** 
- **Real-time capabilities**: Native real-time subscriptions for live incident updates
- **Scalability**: PostgreSQL handles concurrent connections better than SQLite
- **Cloud-native**: Managed service reduces operational overhead
- **Type safety**: Direct TypeScript integration without ORM complexity

**Trade-offs:**
- Requires internet connection (no offline mode)
- Vendor lock-in to Supabase ecosystem
- Learning curve for teams familiar with traditional ORMs

### Frontend: Next.js 15 App Router + React 19
**Why:**
- **Performance**: App Router with React Server Components for optimal loading
- **Developer Experience**: File-based routing and built-in API routes
- **Type Safety**: End-to-end TypeScript support
- **Modern React**: Concurrent features and latest React patterns

**Implementation Details:**
- Server-side rendering for SEO and performance
- Client-side state management with React hooks
- Optimistic updates for incident management

### Styling: Tailwind CSS 4
**Why:**
- **Consistency**: Design system with utility classes
- **Performance**: Purged CSS in production builds
- **Developer Velocity**: Rapid prototyping and iteration
- **Responsive**: Mobile-first design approach

### API Architecture: Next.js API Routes over External API
**Why:**
- **Simplicity**: Collocated with frontend code
- **Type Safety**: Shared TypeScript interfaces
- **Security**: Server-side environment variable access
- **Performance**: Edge deployment capabilities

### Containerization: Docker Multi-stage Builds
**Why:**
- **Consistency**: Same environment across dev/staging/prod
- **Security**: Minimal attack surface with Alpine Linux
- **Performance**: Optimized image size with multi-stage builds
- **Deployment**: Platform-agnostic container deployment

### State Management: React Hooks over Redux
**Why:**
- **Simplicity**: Built-in React state management
- **Performance**: Component-level optimization
- **Bundle Size**: No additional dependencies
- **Modern Patterns**: Hooks-based architecture

## 🚀 If I Had More Time...

### Immediate Improvements (1-2 weeks)
- **Real-time Notifications**: WebSocket integration for instant incident alerts
- **Advanced Filtering**: Multi-dimensional filtering (date range, camera, severity)
- **User Authentication**: Role-based access control (Admin, Operator, Viewer)
- **Mobile App**: React Native companion app for mobile monitoring
- **Incident Export**: PDF/CSV export functionality for reports

### Medium-term Enhancements (1-2 months)
- **AI Integration**: Machine learning for incident pattern recognition
- **Analytics Dashboard**: Advanced metrics and trend analysis
- **Multi-tenant Support**: Organization and user management
- **Integration APIs**: Third-party security system integrations
- **Automated Testing**: E2E tests with Playwright/Cypress
- **Performance Monitoring**: Real-time performance metrics and alerting

### Long-term Vision (3-6 months)
- **Microservices Architecture**: Separate services for different domains
- **Event Sourcing**: Complete audit trail and event replay capabilities
- **Real-time Video Streaming**: WebRTC integration for live camera feeds
- **Advanced Security**: End-to-end encryption and security auditing
- **Multi-language Support**: Internationalization (i18n) support
- **Offline Capabilities**: Progressive Web App with offline incident logging

### Infrastructure & DevOps
- **Kubernetes Deployment**: Container orchestration for high availability
- **Monitoring Stack**: Prometheus, Grafana, and AlertManager
- **Load Testing**: Performance testing under high incident volumes
- **Blue-Green Deployment**: Zero-downtime deployment strategy
- **Database Optimization**: Query optimization and read replicas
- **CDN Integration**: Global content delivery for static assets

### Security Enhancements
- **OAuth Integration**: Single Sign-On with enterprise providers
- **API Rate Limiting**: Protection against abuse and DDoS
- **Data Encryption**: Encryption at rest and in transit
- **Compliance**: GDPR, SOC2, and security compliance frameworks
- **Penetration Testing**: Regular security assessments
- **Backup & Recovery**: Automated backup and disaster recovery plans

## 📁 Project Structure

```
SecureSight/
├── src/
│   ├── app/                 # Next.js app router
│   │   ├── api/            # API endpoints
│   │   │   ├── cameras/    # Camera management API
│   │   │   └── incidents/  # Incident management API
│   │   ├── globals.css     # Global styles
│   │   ├── layout.tsx      # Root layout
│   │   └── page.tsx        # Main dashboard
│   ├── components/         # React components
│   │   ├── IncidentList.tsx      # Incident list management
│   │   ├── IncidentPlayer.tsx    # Video player component
│   │   ├── Navbar.tsx           # Navigation bar
│   │   └── Timeline.tsx         # Interactive timeline
│   ├── types/             # TypeScript type definitions
│   │   └── index.ts       # Shared interfaces
│   └── utils/             # Utility functions
├── lib/
│   └── supabase.ts        # Supabase client configuration
├── database/
│   ├── schema.sql         # Database schema
│   └── seed.sql          # Sample data
├── scripts/
│   ├── seed.ts           # Database seeding script
│   └── test-build.sh     # Build validation
├── docker/
│   ├── Dockerfile        # Production container
│   ├── Dockerfile.simple # Simplified container
│   └── docker-compose.yml # Container orchestration
├── .github/
│   ├── workflows/        # CI/CD pipelines
│   └── ISSUE_TEMPLATE/   # Issue templates
├── public/               # Static assets
├── next.config.ts        # Next.js configuration
└── package.json          # Dependencies and scripts
```

## 🛠️ Available Scripts

```bash
# Development
npm run dev                # Start development server
npm run build             # Build for production
npm run start             # Start production server
npm run lint              # Run ESLint

# Database
npm run db:seed           # Seed database with sample data

# Docker
npm run docker:build      # Build Docker image
npm run docker:up         # Start with docker-compose
npm run docker:dev        # Development with Docker

# Testing
npm run test:build        # Test build process
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Make your changes with proper TypeScript types
4. Test your changes: `npm run build && npm run lint`
5. Commit your changes: `git commit -m 'Add amazing feature'`
6. Push to the branch: `git push origin feature/amazing-feature`
7. Open a Pull Request

### Development Guidelines
- Follow TypeScript strict mode
- Use Tailwind CSS for styling
- Write descriptive commit messages
- Add proper error handling
- Update documentation for new features

## � License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org/) - The React Framework
- Database powered by [Supabase](https://supabase.com/) - Open Source Firebase Alternative
- Icons by [Lucide](https://lucide.dev/) - Beautiful & Consistent Icons
- Styled with [Tailwind CSS](https://tailwindcss.com/) - Utility-First CSS Framework
- Containerized with [Docker](https://docker.com/) - Containerization Platform

## 📧 Support & Contact

- **Repository**: [GitHub - SecureSight](https://github.com/sy17258/SecureSight)
- **Live Demo**: [SecureSight on Render](https://securesight.onrender.com/)
- **Issues**: [GitHub Issues](https://github.com/sy17258/SecureSight/issues)
- **Discussions**: [GitHub Discussions](https://github.com/sy17258/SecureSight/discussions)
- **Email**: Contact through GitHub profile

---

**SecureSight** - Keeping your world secure, one incident at a time. 🛡️

*Built with ❤️ using modern web technologies for real-time security monitoring.*

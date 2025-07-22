# SecureSight - CCTV Monitoring Dashboard

A modern, real-time CCTV monitoring dashboard built with Next.js 15, React 19, and Supabase. SecureSight provides comprehensive incident management, live monitoring, and analytics for security systems.

![SecureSight Dashboard](https://img.shields.io/badge/Next.js-15.4.2-black?style=for-the-badge&logo=next.js)
![React](https://img.shields.io/badge/React-19.1.0-blue?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?style=for-the-badge&logo=typescript)
![Supabase](https://img.shields.io/badge/Supabase-PostgreSQL-green?style=for-the-badge&logo=supabase)
![Docker](https://img.shields.io/badge/Docker-Ready-blue?style=for-the-badge&logo=docker)

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

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- Supabase account
- Docker (optional)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/YOUR_USERNAME/SecureSight.git
   cd SecureSight
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Setup environment variables**
   ```bash
   cp .env.example .env.local
   ```
   
   Add your Supabase credentials:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
   SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
   ```

4. **Setup database**
   - Run the SQL schema in your Supabase SQL Editor:
   ```bash
   # Copy contents of database/schema.sql to Supabase SQL Editor
   ```

5. **Seed the database**
   ```bash
   npm run db:seed
   ```

6. **Start development server**
   ```bash
   npm run dev
   ```

Visit [http://localhost:3000](http://localhost:3000) to see the application.

## 🐳 Docker Deployment

### Development
```bash
npm run docker:dev
```

### Production
```bash
npm run docker:build
npm run docker:up
```

See [DOCKER.md](./DOCKER.md) for detailed Docker setup instructions.

## 📁 Project Structure

```
SecureSight/
├── src/
│   ├── app/                 # Next.js app router
│   │   ├── api/            # API endpoints
│   │   ├── globals.css     # Global styles
│   │   ├── layout.tsx      # Root layout
│   │   └── page.tsx        # Main dashboard
│   ├── components/         # React components
│   │   ├── IncidentList.tsx
│   │   ├── IncidentPlayer.tsx
│   │   ├── Navbar.tsx
│   │   └── Timeline.tsx
│   ├── types/             # TypeScript type definitions
│   └── utils/             # Utility functions
├── lib/
│   └── supabase.ts        # Supabase client configuration
├── database/
│   └── schema.sql         # Database schema
├── scripts/
│   ├── seed.ts           # Database seeding
│   └── docker-*.sh       # Docker scripts
├── public/               # Static assets
├── Dockerfile           # Production container
├── docker-compose.yml   # Container orchestration
└── next.config.ts       # Next.js configuration
```

## 🛠️ Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run db:seed` - Seed database with sample data
- `npm run docker:*` - Docker commands (see DOCKER.md)

## 🎨 Tech Stack

### Frontend
- **Next.js 15** - React framework with App Router
- **React 19** - Latest React with concurrent features
- **TypeScript 5** - Type safety and developer experience
- **Tailwind CSS 4** - Utility-first styling
- **Lucide React** - Beautiful icon library

### Backend
- **Supabase** - PostgreSQL database with real-time features
- **Next.js API Routes** - Serverless API endpoints
- **TypeScript** - End-to-end type safety

### DevOps
- **Docker** - Containerization
- **ESLint** - Code linting
- **Git** - Version control

## 📊 Database Schema

### Tables
- **cameras** - Camera information and locations
- **incidents** - Security incidents with timestamps and metadata

### Key Features
- UUID primary keys for scalability
- Foreign key relationships
- Automatic timestamps
- Performance indexes
- Row Level Security (RLS) policies

## 🔧 Configuration

### Environment Variables
- `NEXT_PUBLIC_SUPABASE_URL` - Your Supabase project URL
- `SUPABASE_SERVICE_ROLE_KEY` - Supabase service role key for server operations

### Next.js Configuration
- Standalone output for Docker deployment
- TypeScript strict mode
- Tailwind CSS integration

## 🚢 Deployment

### Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Add environment variables in Vercel dashboard
3. Deploy automatically on git push

### Docker Production
```bash
docker build -t securesight .
docker run -p 3000:3000 --env-file .env.local securesight
```

### Self-hosted
```bash
npm run build
npm run start
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- Database powered by [Supabase](https://supabase.com/)
- Icons by [Lucide](https://lucide.dev/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)

## 📧 Support

For support, email [your-email@example.com] or create an issue on GitHub.

---

**SecureSight** - Keeping your world secure, one incident at a time. 🛡️
# SecureSight

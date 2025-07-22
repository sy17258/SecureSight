# SecureSight Docker Setup

This guide explains how to run SecureSight using Docker for both development and production environments.

## Prerequisites

- Docker and Docker Compose installed
- Supabase project with credentials in `.env.local`

## Quick Start

### Production (Recommended)

```bash
# Build and run with docker-compose
docker-compose up --build

# Or build manually
npm run docker:build
docker run -p 3000:3000 --env-file .env.local securesight:latest
```

### Development

```bash
# Run development server with hot reload
npm run docker:dev

# Or manually
docker-compose -f docker-compose.dev.yml up --build
```

## Environment Setup

Ensure your `.env.local` file contains:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

## Available Scripts

- `npm run docker:build` - Build production Docker image
- `npm run docker:dev` - Start development environment
- `npm run docker:up` - Start production containers
- `npm run docker:down` - Stop containers

## Docker Files

- `Dockerfile` - Multi-stage production build
- `Dockerfile.dev` - Development environment
- `docker-compose.yml` - Production setup
- `docker-compose.dev.yml` - Development setup with hot reload
- `.dockerignore` - Files to exclude from Docker context

## Production Deployment

The production Dockerfile uses Next.js standalone output for optimal performance:

1. **Multi-stage build** reduces final image size
2. **Non-root user** for security
3. **Health checks** for container monitoring
4. **Optimized layers** for faster builds

## Troubleshooting

### Container won't start
- Check environment variables in `.env.local`
- Verify Supabase credentials
- Check Docker logs: `docker-compose logs`

### Port conflicts
- Change port mapping in docker-compose.yml: `"3001:3000"`

### Build issues
- Clear Docker cache: `docker system prune`
- Rebuild: `docker-compose up --build --force-recreate`

## Health Check

The production container includes a health check endpoint:
```bash
curl http://localhost:3000/api/incidents
```

## Monitoring

View container logs:
```bash
docker-compose logs -f app
```

Check container status:
```bash
docker-compose ps
```

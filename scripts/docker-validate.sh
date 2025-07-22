#!/bin/bash

echo "🔍 Validating Docker setup for SecureSight..."

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
    echo "❌ Docker is not installed. Please install Docker first."
    echo "📥 Visit: https://docs.docker.com/get-docker/"
    exit 1
fi

# Check if Docker Compose is available
if ! command -v docker-compose &> /dev/null && ! docker compose version &> /dev/null; then
    echo "❌ Docker Compose is not available. Please install Docker Compose."
    exit 1
fi

# Check if .env.local exists
if [ ! -f ".env.local" ]; then
    echo "❌ .env.local file not found. Please create it with your Supabase credentials."
    echo "📝 Required variables:"
    echo "   NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co"
    echo "   SUPABASE_SERVICE_ROLE_KEY=your_service_role_key"
    exit 1
fi

# Validate environment variables
if ! grep -q "NEXT_PUBLIC_SUPABASE_URL" .env.local; then
    echo "❌ NEXT_PUBLIC_SUPABASE_URL not found in .env.local"
    exit 1
fi

if ! grep -q "SUPABASE_SERVICE_ROLE_KEY" .env.local; then
    echo "❌ SUPABASE_SERVICE_ROLE_KEY not found in .env.local"
    exit 1
fi

echo "✅ Docker setup validation passed!"
echo "🚀 You can now run:"
echo "   npm run docker:build  # Build production image"
echo "   npm run docker:dev    # Start development environment"
echo "   npm run docker:up     # Start production containers"

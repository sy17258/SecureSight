#!/bin/bash

echo "🐳 Building SecureSight Docker image with multiple strategies..."

# Strategy 1: Try with environment variables
echo "🔧 Strategy 1: Building with environment variables..."
if [ -f .env.local ]; then
    export $(cat .env.local | grep -v '^#' | xargs)
    
    if docker build \
      --build-arg NEXT_PUBLIC_SUPABASE_URL="$NEXT_PUBLIC_SUPABASE_URL" \
      --build-arg SUPABASE_SERVICE_ROLE_KEY="$SUPABASE_SERVICE_ROLE_KEY" \
      -t securesight:latest . 2>/dev/null; then
        echo "✅ Build successful with environment variables!"
        exit 0
    fi
fi

echo "⚠️  Strategy 1 failed, trying Strategy 2..."

# Strategy 2: Use production Dockerfile without env requirements
echo "🔧 Strategy 2: Building without environment requirements..."
if docker build -f Dockerfile.production -t securesight:latest .; then
    echo "✅ Build successful without environment requirements!"
    echo "⚠️  Note: You'll need to provide environment variables at runtime:"
    echo "   docker run -p 3000:3000 --env-file .env.local securesight:latest"
    exit 0
fi

echo "❌ Both build strategies failed. Please check:"
echo "1. Docker is installed and running"
echo "2. .env.local file exists with valid Supabase credentials"
echo "3. No syntax errors in Dockerfiles"

exit 1

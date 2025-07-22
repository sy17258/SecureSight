#!/bin/bash

echo "🐳 Building SecureSight Docker image..."

# Load environment variables
if [ -f .env.local ]; then
    export $(cat .env.local | grep -v '^#' | xargs)
fi

# Build the production image with build args
docker build \
  --build-arg NEXT_PUBLIC_SUPABASE_URL="$NEXT_PUBLIC_SUPABASE_URL" \
  --build-arg SUPABASE_SERVICE_ROLE_KEY="$SUPABASE_SERVICE_ROLE_KEY" \
  -t securesight:latest .

echo "✅ Build complete!"
echo "📋 To run the container:"
echo "   docker run -p 3000:3000 --env-file .env.local securesight:latest"
echo ""
echo "🔧 Or use docker-compose:"
echo "   docker-compose up"

#!/bin/bash

echo "🐳 Building SecureSight Docker image..."

# Build the production image
docker build -t securesight:latest .

echo "✅ Build complete!"
echo "📋 To run the container:"
echo "   docker run -p 3000:3000 --env-file .env.local securesight:latest"
echo ""
echo "🔧 Or use docker-compose:"
echo "   docker-compose up"

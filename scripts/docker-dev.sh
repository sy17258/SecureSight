#!/bin/bash

echo "🚀 Starting SecureSight in development mode with Docker..."

# Start development environment
docker-compose -f docker-compose.dev.yml up --build

echo "✅ Development server started!"
echo "🌐 Open http://localhost:3000 in your browser"

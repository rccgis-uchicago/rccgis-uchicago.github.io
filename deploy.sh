#!/bin/bash
set -e  # Exit immediately if a command exits with a non-zero status

echo "🚀 Starting deployment to Cloudron Surfer..."

# Install dependencies if not already installed
if ! command -v surfer &> /dev/null; then
    echo "🔧 Installing Cloudron Surfer CLI..."
    npm install -g cloudron-surfer
fi

# Build the application
echo "🔨 Building the application..."
npm ci
export NODE_ENV=production
export TINA_PUBLIC_IS_LOCAL=false
npm run tina:build

# Deploy to Cloudron Surfer
echo "🚀 Deploying to Cloudron Surfer..."
surfer config --server test.rccgis.org --token "$SURFER_TOKEN"
surfer put dist/* /

echo "✅ Deployment complete! Your site is now live at https://test.rccgis.org"

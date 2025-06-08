#!/bin/bash

# Exit on error
set -e

# Source environment variables from .env if it exists
if [ -f .env ]; then
    echo "Loading environment variables from .env file..."
    export $(grep -v '^#' .env | xargs)
else
    echo "Warning: .env file not found. Make sure to set SURFER_SERVER and SURFER_TOKEN environment variables."
fi

# Check for required environment variables
if [ -z "$SURFER_SERVER" ] || [ -z "$SURFER_TOKEN" ]; then
    echo "Error: SURFER_SERVER and SURFER_TOKEN must be set in .env file or environment"
    exit 1
fi

# Install dependencies and build the site for production
echo "Installing dependencies..."
npm ci

echo "Building the site for Cloudron..."
# Clean previous build
rm -rf dist/*

# Build with production settings
NODE_ENV=production \
CLOUDRON_DEPLOY=true \
SITE_URL="https://test.rccgis.org" \
BASE_PATH="/" \
PUBLIC_BASE="/" \
npm run build

# Create directory structure for Cloudron
cd dist
find . -type f -name '*.html' | while read file; do
  # Create directory structure
  dir=$(dirname "$file")
  mkdir -p "$dir/$(basename "$file" .html)"
  
  # Move HTML file to directory/index.html
  mv "$file" "$dir/$(basename "$file" .html)/index.html"
done

# Move back to project root
cd ..

# Check if surfer is installed
if ! command -v surfer &> /dev/null; then
    echo "Installing cloudron-surfer..."
    npm install -g cloudron-surfer
fi

# Configure surfer with environment variables
echo "Configuring Cloudron Surfer..."
surfer config --server $SURFER_SERVER --token $SURFER_TOKEN

# Deploy to Cloudron
echo "Deploying to Cloudron ($SURFER_SERVER)..."
cd dist
surfer put * /

echo "✅ Deployment complete!"

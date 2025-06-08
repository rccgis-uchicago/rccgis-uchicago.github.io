#!/bin/bash

# Exit on error
set -e

# Build the site for production
echo "Building the site for production..."
npm run build

# Check if surfer is installed
if ! command -v surfer &> /dev/null; then
    echo "Installing cloudron-surfer..."
    npm install -g cloudron-surfer
fi

# Deploy to Cloudron
echo "Deploying to Cloudron..."
cd dist
surfer put * /

echo "Deployment complete!"

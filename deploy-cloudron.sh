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

# Build the site for production
echo "Building the site for production..."
npm run build

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

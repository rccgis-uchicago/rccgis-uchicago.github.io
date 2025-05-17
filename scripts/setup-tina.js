#!/usr/bin/env node

/**
 * This script helps set up TinaCMS for your Astro project
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Check if .env file exists, create if not
const envPath = path.join(process.cwd(), '.env');
if (!fs.existsSync(envPath)) {
  console.log('Creating .env file...');
  fs.writeFileSync(envPath, `# TinaCMS Environment Variables\nTINA_CLIENT_ID=\nTINA_TOKEN=\n`);
  console.log('.env file created. Please fill in your TinaCMS credentials.');
}

// Add TinaCMS scripts to package.json
const packageJsonPath = path.join(process.cwd(), 'package.json');
const packageJson = require(packageJsonPath);

if (!packageJson.scripts.tina) {
  console.log('Adding TinaCMS scripts to package.json...');
  
  packageJson.scripts = {
    ...packageJson.scripts,
    'tina': 'tinacms dev -c "astro dev"',
    'tina:build': 'tinacms build && astro build'
  };
  
  fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
  console.log('TinaCMS scripts added to package.json');
}

// Create TinaCMS directories if they don't exist
const tinaDir = path.join(process.cwd(), 'tina');
if (!fs.existsSync(tinaDir)) {
  console.log('Creating TinaCMS directories...');
  fs.mkdirSync(tinaDir, { recursive: true });
  console.log('TinaCMS directories created');
}

console.log('\nTinaCMS setup complete!');
console.log('\nNext steps:');
console.log('1. Fill in your TinaCMS credentials in the .env file');
console.log('2. Run "npm run tina" to start the TinaCMS development server');
console.log('3. Visit http://localhost:4001/admin to access the TinaCMS admin panel');
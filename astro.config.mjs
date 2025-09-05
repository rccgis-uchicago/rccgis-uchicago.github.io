import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import tailwind from '@astrojs/tailwind';
import react from '@astrojs/react';

// https://astro.build/config

// Environment detection
const isDev = process.env.NODE_ENV !== 'production';
const isCloudron = process.env.CLOUDRON_DEPLOY === 'true';
const isGitHub = process.env.GITHUB_ACTIONS === 'true';

// Default configuration for development
let site = 'http://localhost:4322';
let base = '';

// Production configuration
if (!isDev) {
  site = isCloudron ? 'https://site.rccgis.org' : 'https://rccgis-uchicago.github.io';
  base = isCloudron ? '' : ''; // Empty base for both Cloudron and GitHub Pages root domain
}

// Environment variable overrides (highest priority)
if (process.env.SITE_URL) site = process.env.SITE_URL;
if (process.env.BASE_PATH !== undefined) {
  base = process.env.BASE_PATH;
}

// Normalize base path
base = base || ''; // Ensure base is at least an empty string

// Clean up base path
if (base === '/') base = ''; // Convert root to empty string
if (base.endsWith('/')) base = base.slice(0, -1); // Remove trailing slash
if (base && !base.startsWith('/')) base = `/${base}`; // Ensure leading slash if not empty

export default defineConfig({
  // Site configuration
  site,
  base,
  trailingSlash: 'always',
  output: 'static',
  build: {
    assets: '_astro',
    // Use directory format for cleaner URLs
    format: 'file',
  },
  // Redirects configuration (moved from experimental)
  redirects: {},
  server: {
    host: true,
    port: 4322
  },
  vite: {
    base: isDev ? '/' : base,
    // Ensure Vite handles static assets correctly
    appType: 'mpa',
    server: {
      // Enable directory listings for development
      fs: {
        strict: false,
      },
    },
    server: {
      fs: {
        allow: ['..'],
      },
    },
  },
  
  // Integrations
  integrations: [
    react({
      include: ['**/components/**/*.{tsx,jsx,js,ts}']
    }),
    mdx({
      remarkPlugins: [],
      rehypePlugins: [],
    }),
    tailwind(),
  ],
  
  // Markdown configuration
  markdown: {
    gfm: true,
    syntaxHighlight: 'shiki',
    shikiConfig: {
      theme: 'github-dark',
      wrap: true,
    },
  },
  
  // Image optimization
  image: {
    service: {
      entrypoint: 'astro/assets/services/sharp',
    },
  },
  

  
  // Public directory for static assets
  publicDir: 'public',
  
  // Enable prefetching for better performance
  prefetch: true,
});
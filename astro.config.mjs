import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import tailwind from '@astrojs/tailwind';
import react from '@astrojs/react';

// https://astro.build/config

// Environment detection
const isDev = process.env.NODE_ENV !== 'production';
const isCloudron = process.env.CLOUDRON_DEPLOY === 'true';
const isGitHub = process.env.GITHUB_ACTIONS === 'true';

// Configure URLs based on environment
let site = 'http://localhost:4321';
let base = '/';

if (!isDev) {
  site = isCloudron ? 'https://site.rccgis.org' : 'https://rccgis-uchicago.github.io';
  base = isCloudron ? '/' : '/rccgis-uchicago.github.io';
}

// Allow environment overrides
if (process.env.SITE_URL) site = process.env.SITE_URL;
if (process.env.BASE_PATH) base = process.env.BASE_PATH;

// Ensure base path starts with a slash and doesn't end with one (except for root)
if (base !== '/') {
  if (!base.startsWith('/')) base = `/${base}`;
  if (base.endsWith('/')) base = base.slice(0, -1);
}

export default defineConfig({
  // Site configuration
  site,
  base,
  trailingSlash: 'always',
  output: 'static',
  build: {
    assets: '_astro',
  },
  server: {
    host: true,
    port: 4321
  },
  vite: {
    base: isDev ? '/' : base,
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
  
  // Build configuration
  build: {
    format: 'file',
    assets: '_astro',
  },
  
  // Public directory for static assets
  publicDir: 'public',
  
  // Enable prefetching for better performance
  prefetch: true,
});
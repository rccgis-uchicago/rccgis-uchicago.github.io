import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import tailwind from '@astrojs/tailwind';
import react from '@astrojs/react';

// https://astro.build/config

// For GitHub Pages
const isGitHub = process.env.GITHUB_ACTIONS === 'true' || process.env.NODE_ENV === 'production';
const isCloudron = process.env.CLOUDRON_DEPLOY === 'true';

// Set site and base URLs
const site = isCloudron ? 'https://site.rccgis.org' : 'https://rccgis-uchicago.github.io';
const base = isCloudron ? '/' : '/rccgis-uchicago.github.io';

export default defineConfig({
  // Site configuration
  site,
  base,
  trailingSlash: 'always',
  output: 'static',
  adapter: '@astrojs/netlify',
  build: {
    assets: '_astro',
  },
  vite: {
    base: isCloudron ? '' : '/rccgis-uchicago.github.io',
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
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import tailwind from '@astrojs/tailwind';
import react from '@astrojs/react';

// https://astro.build/config

// Determine the base URL based on the environment
const isCloudron = process.env.NODE_ENV === 'production' && process.env.CLOUDRON_DEPLOY === 'true';
const site = isCloudron ? 'https://site.rccgis.org' : 'https://rccgis-uchicago.github.io';
const base = isCloudron ? '/' : '/rccgis-uchicago.github.io/';

export default defineConfig({
  // Site configuration
  site,
  base,
  trailingSlash: 'always',
  
  // Force static site generation
  output: 'static',
  
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
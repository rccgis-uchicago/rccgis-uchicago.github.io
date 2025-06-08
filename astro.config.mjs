import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import tailwind from '@astrojs/tailwind';
import react from '@astrojs/react';

// https://astro.build/config

// Environment variables with defaults
const isCloudron = process.env.CLOUDRON_DEPLOY === 'true';
const site = process.env.SITE_URL || (isCloudron ? 'https://site.rccgis.org' : 'https://rccgis-uchicago.github.io');
const base = process.env.BASE_PATH || (isCloudron ? '/' : '/rccgis-uchicago.github.io/');

export default defineConfig({
  // Site configuration
  site,
  base,
  trailingSlash: 'always',
  output: 'static',
  build: {
    assets: '_astro',
  },
  vite: {
    base: base === '/' ? '' : base,
    server: {
      fs: {
        // Allow serving files from one level up from the package root
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
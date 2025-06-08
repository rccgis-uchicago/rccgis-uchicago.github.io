import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import tailwind from '@astrojs/tailwind';
import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
  // Site configuration
  site: process.env.CLOUDRON_DEPLOY === 'true' 
    ? 'https://gis.uchicago.edu'  // Cloudron URL
    : 'https://rccgis-uchicago.github.io',  // GitHub Pages URL
  
  // Base path - empty for root domain, or repository name for GitHub Pages
  base: process.env.CLOUDRON_DEPLOY === 'true' 
    ? '/' 
    : '/rccgis-uchicago.github.io/',
  
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
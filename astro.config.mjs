import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import tailwind from '@astrojs/tailwind';
import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
  // Use the repository name as the base path for GitHub Pages
  site: 'https://rccgis-uchicago.github.io',
  base: process.env.NODE_ENV === 'production' ? '/rccgis-uchicago.github.io/' : '/',
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
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import tailwind from '@astrojs/tailwind';
import react from '@astrojs/react';

// Configure integrations
const reactIntegration = react({
  include: ['**/components/**/*.{tsx,jsx,js,ts}']
});

// https://astro.build/config
export default defineConfig({
  site: 'https://rccgis-uchicago.github.io',
  // Use GitHub Pages base path in CI, otherwise use root for local/Cloudron
  base: process.env.CI ? '/rccgis-uchicago.github.io/' : '/',
  // Force static site generation
  output: 'static',
  
  // Integrations
  integrations: [
    reactIntegration,
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
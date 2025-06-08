import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import tailwind from '@astrojs/tailwind';
import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
  // GitHub Pages configuration
  site: 'https://rccgis-uchicago.github.io',
  base: '/rccgis-uchicago.github.io/',
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
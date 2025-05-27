import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import tailwind from '@astrojs/tailwind';
import react from '@astrojs/react';
import icon from 'astro-icon';

// https://astro.build/config
export default defineConfig({
  site: 'https://rccgis-uchicago.github.io',
  base: '/site',
  integrations: [
    mdx(),
    tailwind(),
    react(),
    icon(),
  ],
  // Enable TinaCMS local mode in development
  vite: {
    // plugins: [
    //   {
    //     name: 'tina-dev-server',
    //     configureServer: async (server) => {
    //       if (process.env.NODE_ENV !== 'production') {
    //         const { default: tina } = await import('./tina/__generated__/client');
    //         return () => {
    //           server.middlewares.use(tina.devServer);
    //         };
    //       }
    //     },
    //   },
    // ],
  },
  // Image optimization settings
  image: {
    service: {
      entrypoint: 'astro/assets/services/sharp',
    },
  },
  // Build output directory
  outDir: 'dist',
  // Enable prefetching for better performance
  prefetch: true,
  // Configure the build output format
  output: 'static',
  // Enable SPA mode for client-side routing
  adapter: '@astrojs/netlify/functions',
  // Configure the base path for GitHub Pages
  build: {
    assets: '_astro',
  },
  // Set the public directory for static assets
  publicDir: 'public',
});
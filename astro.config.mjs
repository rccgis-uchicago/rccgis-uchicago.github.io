import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import tailwind from '@astrojs/tailwind';
import react from '@astrojs/react';

// https://astro.build/config
// Configure integrations separately for clarity
const reactIntegration = react({
  include: ['**/components/**/*.{tsx,jsx,js,ts}']
});

const config = {
  site: 'https://rccgis-uchicago.github.io',
  // Use GitHub Pages base path in CI, otherwise use root for local/Cloudron
  base: process.env.CI ? '/rccgis-uchicago.github.io/' : '/',
  // Explicitly set output to 'static' for static site generation
  output: 'static',
  integrations: [
    reactIntegration,
    mdx({
      remarkPlugins: [],
      rehypePlugins: [],
    }),
    tailwind(),
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
  markdown: {
    // Enable GitHub-flavored markdown
    gfm: true,
    // Enable syntax highlighting
    syntaxHighlight: 'shiki',
    shikiConfig: {
      theme: 'github-dark',
      wrap: true,
    },
  },
  // MDX support is enabled by @astrojs/mdx integration
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
  // Enable hybrid rendering mode for client-side routing
  adapter: {
    name: '@astrojs/netlify/functions',
    functionPerRoute: false
  },
  output: 'server',
  // Configure the base path for GitHub Pages
  build: {
    assets: '_astro',
  },
  // Set the public directory for static assets
  publicDir: 'public',
};

export default defineConfig(config);
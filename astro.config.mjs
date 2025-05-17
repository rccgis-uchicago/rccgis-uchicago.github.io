import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import tailwind from '@astrojs/tailwind';
import react from '@astrojs/react';
import icon from 'astro-icon';

// https://astro.build/config
export default defineConfig({
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
});
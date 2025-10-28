import { defineConfig } from 'astro/config';
import react from '@astrojs/react';

export default defineConfig({
  integrations: [react()],
  vite: {
    build: {
      assetsInlineLimit: 0,
    },
    resolve: {
      alias: {
        '@': '/src',
      },
    },
  }
});
import { fileURLToPath, URL } from 'url';
import { defineConfig } from 'vite';
import ViteRestart from 'vite-plugin-restart';

export default defineConfig({
  resolve: {
    alias: [
      {
        find: '@',
        replacement: fileURLToPath(new URL('./src', import.meta.url)),
      },
    ],
  },
  build: {
    rollupOptions: {
      input: [
        'index.html',
        'personal-projects.html',
        'contact.html',
        'little-lebowski.html',
        'crappy-bird.html',
        'sopost-links.html',
        '404.html',
      ],
    },
  },
  plugins: [
    ViteRestart({
      restart: ['./src/**'],
    }),
  ],
});

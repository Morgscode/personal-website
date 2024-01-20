import { fileURLToPath, URL } from 'url';
import { defineConfig } from 'vite';

export default defineConfig({
  resolve: {
    resolve: {
      alias: [
        {
          find: '@',
          replacement: fileURLToPath(new URL('./src', import.meta.url)),
        },
      ],
    },
  },
  build: {
    emptyOutDir: false,
    rollupOptions: {
      input: [
        'index.html',
        'personal-projects.html',
        'design.html',
        'contact.html',
        'little-lebowski.html',
        '404.html',
      ],
    },
  },
});

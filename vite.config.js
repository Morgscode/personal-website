import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    rollupOptions: {
      input: [
        'index.html',
        'personal-projects.html',
        'design.html',
        'contact.html',
        '404.html',
      ],
    },
  },
});

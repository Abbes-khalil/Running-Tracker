import { defineConfig } from 'vite';
import { resolve } from 'path';
import { cpSync } from 'fs';

function copyBackend() {
  return {
    name: 'copy-php-backend',
    closeBundle() {
      cpSync(resolve(__dirname, 'frontend/backend'), resolve(__dirname, 'dist/backend'), { recursive: true });
    },
  };
}

export default defineConfig({
  root: resolve(__dirname, 'frontend'),
  plugins: [
    copyBackend(),
  ],
  server: {
    proxy: {
      '/backend': 'http://127.0.0.1:8000',
    },
  },
  build: {
    outDir: resolve(__dirname, 'dist'),
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'frontend/index.html'),
        activities: resolve(__dirname, 'frontend/pages/activities.html'),
        addMenu: resolve(__dirname, 'frontend/pages/addMenu.html'),
        calendar: resolve(__dirname, 'frontend/pages/calendar.html'),
        pr: resolve(__dirname, 'frontend/pages/pr.html'),
      },
    },
  },
});

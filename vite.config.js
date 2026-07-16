import { defineConfig } from 'vite';
import { resolve } from 'path';
import tailwindcss from '@tailwindcss/vite'


export default defineConfig({
  root: resolve(__dirname, 'frontend'),
  plugins: [
    tailwindcss(),
  ],
  build: {
    outDir: resolve(__dirname, 'dist'),
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

import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        activities: resolve(__dirname, 'activities.html'),
        addMenu: resolve(__dirname, 'addMenu.html'),
        calendar: resolve(__dirname, 'calendar.html'),
        pr: resolve(__dirname, 'pr.html'),
      },
    },
  },
});

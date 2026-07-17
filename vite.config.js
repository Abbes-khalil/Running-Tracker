import { defineConfig } from 'vite';
import { resolve } from 'path';
import { existsSync, mkdirSync, readdirSync, statSync, copyFileSync } from 'fs';

function copyDirSync(src, dest) {
  if (!existsSync(dest)) {
    mkdirSync(dest, { recursive: true });
  }
  const entries = readdirSync(src, { withFileTypes: true });
  for (const entry of entries) {
    const srcPath = `${src}/${entry.name}`;
    const destPath = `${dest}/${entry.name}`;
    if (entry.isDirectory()) {
      copyDirSync(srcPath, destPath);
    } else {
      copyFileSync(srcPath, destPath);
    }
  }
}

function copyAssets() {
  return {
    name: 'copy-static-assets',
    closeBundle() {
      // Copy backend PHP files
      copyDirSync(resolve(__dirname, 'frontend/backend'), resolve(__dirname, 'dist/backend'));
      // Copy static assets (CSS, JS, images, etc.) preserving directory structure
      copyDirSync(resolve(__dirname, 'frontend/assets'), resolve(__dirname, 'dist/assets'));
    }
  };
}

export default defineConfig({
  root: resolve(__dirname, 'frontend'),
  plugins: [
    copyAssets()
  ],
  server: {
    proxy: {
      '/backend': 'http://127.0.0.1:8000'
    }
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
        pr: resolve(__dirname, 'frontend/pages/pr.html')
      },
      external: (source) => {
        // Externalize all JavaScript and PHP files so they are not bundled
        return source.endsWith('.js') || source.endsWith('.php');
      }
    },
    // Prevent Vite from treating .js and .php as assets (so they aren't copied/hash­ed by Vite's asset system)
    assetsInclude: (source) => {
      return !(source.endsWith('.js') || source.endsWith('.php'));
    }
  }
});
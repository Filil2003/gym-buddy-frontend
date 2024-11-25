import react from '@vitejs/plugin-react';
import path from 'node:path';
import { defineConfig } from 'vite';
import svgr from 'vite-plugin-svgr';

// biome-ignore lint/style/noDefaultExport: <Vite requires export by default>
export default defineConfig({
  plugins: [
    react(),
    svgr({
      include: "**/*.svg?react"
    })
  ],
  resolve: {
    alias: {
      '#pages': path.resolve(import.meta.dirname, 'src', 'pages'),
      '#widgets': path.resolve(import.meta.dirname, 'src', 'widgets'),
      '#features': path.resolve(import.meta.dirname, 'src', 'features'),
      '#entities': path.resolve(import.meta.dirname, 'src', 'entities'),
      '#shared': path.resolve(import.meta.dirname, 'src', 'shared')
    }
  }
});

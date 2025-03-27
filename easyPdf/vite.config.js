import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import copy from "rollup-plugin-copy";
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [react(),
    copy({
      targets: [
          { src: "src/assets/*", dest: "dist/assets" }
      ],
      hook: "writeBundle"
  })
  ],
  build: {
    outDir: 'dist',
    rollupOptions: {
      // 🔽 Multi-entry points
      input: {
        popup: resolve(__dirname, 'index.html'),        // Your main popup UI
        background: resolve(__dirname, 'src/background.js'), // Background script
      },
      output: {
        format: 'esm',
        entryFileNames: chunk => {
          // Ensure background script has clear filename
          return chunk.name === 'background'
            ? 'background.js'
            : 'assets/[name].js';
        },
      },
    },
  },
});

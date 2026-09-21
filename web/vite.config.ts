import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    // The archive is large and the exhibition must not ship it all up front.
    // Route-level code splitting plus lazy bundle fetches keep the initial
    // payload to the shell; three.js is isolated so a visitor who never opens
    // a 3D view never downloads it.
    rollupOptions: {
      output: {
        manualChunks(id: string) {
          if (id.includes('node_modules/three') || id.includes('@react-three/fiber')) return 'three';
          return undefined;
        },
      },
    },
  },
});

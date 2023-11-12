
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react'
import { resolve } from 'node:path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    fs: {
      // TODO: we need to start compiling our packages... until then, this example will be janky
      strict: false
    }
  },
  resolve: {
    alias: {
      '@': resolve(resolve(), './src'),
      '@react': resolve(resolve(), '../../packages/react/src'),
      '@shared': resolve(resolve(), '../../packages/shared/src'),
    },
  },
})

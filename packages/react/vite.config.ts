import { defineConfig } from 'vite';
import { defineConfig as vitestDefineConfig, mergeConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path, { resolve } from 'node:path';
import dts from 'vite-plugin-dts';

// https://vitejs.dev/config/
export default mergeConfig(defineConfig({
  plugins: [
    react(),
    dts({
      insertTypesEntry: true,
    }),
  ],
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/index.ts'),
      name: '@function-junctions/react',
      formats: ['es', 'umd'],
      fileName: (format) => `react.${format}.js`,
    },
  },
  resolve: {
    alias: {
      '@react': resolve(resolve(), './src'),
      '@shared': resolve(resolve(), '../shared/src'),
    },
  },
}), vitestDefineConfig({
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './scripts/setupTest.js',
  },
}));

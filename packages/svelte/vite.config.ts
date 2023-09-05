import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import path, { resolve } from 'node:path';
import dts from 'vite-plugin-dts';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    svelte(),
    dts({
      insertTypesEntry: true,
    }),
  ],
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/index.ts'),
      name: '@function-junctions/svelte',
      formats: ['es', 'umd'],
      fileName: (format) => `svelte.${format}.js`,
    },
  },
  resolve: {
    alias: {
      '@': resolve(resolve(), './src'),
    },
  },
});

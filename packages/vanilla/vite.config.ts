import { defineConfig } from 'vite';
import path, { resolve } from 'node:path';
import dts from 'vite-plugin-dts';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    dts({
      insertTypesEntry: true,
    }),
  ],
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/index.ts'),
      name: '@function-junctions/vanilla',
      formats: ['es', 'umd'],
      fileName: (format) => `vanilla.${format}.js`,
    },
  },
  resolve: {
    alias: {
      '@': resolve(resolve(), './src'),
    },
  },
});

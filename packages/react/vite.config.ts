import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'node:path';
import dts from 'vite-plugin-dts';

// https://vitejs.dev/config/
export default defineConfig({
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
});

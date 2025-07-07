// vite.config.ts

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import checker from 'vite-plugin-checker';

export default defineConfig({
  plugins: [
    react(),
    checker({
      typescript: true,         // TypeScript の型チェック
      eslint: {
        lintCommand: 'eslint "./src/**/*.{ts,tsx}"', // ESLint のチェック対象
      },
    }),
  ],
});

/// <reference types="vitest" />
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import { fileURLToPath } from 'url'
import { dirname, resolve } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

export default defineConfig({
  plugins: react(),
  resolve: {
    alias: {
      '@': resolve(__dirname, './app'),
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./app/__tests__/setup.ts'],
    include: ['app/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    coverage: {
      reporter: ['text', 'json', 'html'],
      exclude: ['node_modules/', 'app/__tests__/setup.ts'],
    },
  },
})

import path from 'path'
import { fileURLToPath } from 'url'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const dirname = path.dirname(fileURLToPath(import.meta.url))

export default defineConfig({
  root: path.resolve(dirname, '..'),
  plugins: [react()],
  base: process.env.VITE_BASE_URL ?? '/',
  css: {
    postcss: path.resolve(dirname, 'postcss.config.js'),
  },
})

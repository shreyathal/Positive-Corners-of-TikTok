import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'

// https://vite.dev/config/
export default defineConfig({
  base: '/Positive-Corners-of-TikTok/', 
  plugins: [svelte()],
  build: {
    outDir: 'docs', 
    emptyOutDir: true
  }
})

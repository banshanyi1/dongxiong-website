import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { copyFileSync, existsSync } from 'fs'
import { resolve } from 'path'

export default defineConfig({
  plugins: [
    vue(),
    {
      name: 'copy-404-for-github-pages',
      closeBundle() {
        const outDir = resolve(__dirname, 'dist')
        const indexPath = resolve(outDir, 'index.html')
        const toPath = resolve(outDir, '404.html')
        if (existsSync(indexPath)) {
          copyFileSync(indexPath, toPath)
        }
      }
    }
  ],
  base: '/dongxiong-website/',
  build: {
    outDir: 'dist',
    assetsDir: 'assets'
  }
})

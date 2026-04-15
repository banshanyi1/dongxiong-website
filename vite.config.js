import { copyFileSync, existsSync } from 'fs'
import { resolve } from 'path'

import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [
    vue({
      template: {
        compilerOptions: {
          // 为动态组件保留编译优化
          isCustomElement: tag => tag.startsWith('swiper-'),
        },
      },
    }),
    {
      name: 'copy-404-for-github-pages',
      closeBundle() {
        const outDir = resolve(__dirname, 'dist')
        const indexPath = resolve(outDir, 'index.html')
        const toPath = resolve(outDir, '404.html')
        if (existsSync(indexPath)) {
          copyFileSync(indexPath, toPath)
        }
      },
    },
  ],

  // 路径别名配置
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
      '@assets': resolve(__dirname, 'src/assets'),
      '@components': resolve(__dirname, 'src/components'),
      '@views': resolve(__dirname, 'src/views'),
      '@utils': resolve(__dirname, 'src/utils'),
      '@composables': resolve(__dirname, 'src/composables'),
    },
  },

  base: '/',

  // 构建优化配置
  build: {
    outDir: 'dist',
    assetsDir: 'assets',

    // 代码分割优化
    rollupOptions: {
      output: {
        // 分离vendor代码
        manualChunks: {
          'vue-vendor': ['vue', 'vue-router'],
          'three-vendor': ['three', 'globe.gl'],
          'gsap-vendor': ['gsap'],
        },

        // 优化文件名
        chunkFileNames: 'chunks/[name]-[hash].js',
        entryFileNames: 'entries/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash].[ext]',
      },
    },

    // 启用压缩
    minify: true,

    // CSS优化
    cssCodeSplit: true,

    // 预加载优化
    reportCompressedSize: false,
    chunkSizeWarningLimit: 1000,
  },
  
  esbuild: {
    drop: ['console', 'debugger']
  },

  // 开发服务器优化
  server: {
    host: true,
    port: 3000,
    strictPort: false,
    open: true,

    // 优化HMR
    hmr: {
      overlay: true,
    },
  },

  // 预览服务器配置
  preview: {
    port: 5000,
    strictPort: true,
    open: true,
  },

  // 优化依赖预构建
  optimizeDeps: {
    include: ['vue', 'vue-router', 'globe.gl', 'three', 'gsap'],
    exclude: [],
  },
})

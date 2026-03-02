import { createApp } from 'vue'

import App from './App.vue'
import router from './router'

// 性能优化和工具导入
import { preloadCriticalResources, performanceMonitor, memoryManager } from './utils/performance'

// 样式导入
import './assets/global.css'

// 生产环境下的性能监控
if (process.env.NODE_ENV === 'production') {
  // 启动性能监控
  performanceMonitor.monitorCoreWebVitals()

  // 监控内存压力
  memoryManager.monitorMemoryPressure()

  // 预加载关键资源
  window.addEventListener('load', () => {
    preloadCriticalResources()
  })
}

// 创建应用实例
const app = createApp(App)

// 注册插件
app.use(router)

// 挂载应用
app.mount('#app')

// 全局错误处理
app.config.errorHandler = (err, instance, info) => {
  console.error('Global error:', err, info)
  // 可以在这里发送错误到监控服务
}

// 开发环境下的警告处理
if (process.env.NODE_ENV === 'development') {
  app.config.warnHandler = (msg, instance, trace) => {
    console.warn('[Vue warn]:', msg, trace)
  }
}

// 导出应用实例供调试使用
if (process.env.NODE_ENV === 'development') {
  window.__APP__ = app
}

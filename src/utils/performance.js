// 性能优化配置和工具

/**
 * 图片懒加载配置
 */
export const LAZY_LOAD_CONFIG = {
  rootMargin: '50px 0px',
  threshold: 0.1,
}

import localFontWoff from '@/assets/fonts/GWMSansUI-Bold.woff'
import heroSlide1 from '@/assets/images/home/slide-1.png'

/**
 * 预加载关键资源
 */
export function preloadCriticalResources() {
  const criticalAssets = [heroSlide1]

  criticalAssets.forEach(asset => {
    const link = document.createElement('link')
    link.rel = 'preload'
    link.href = asset
    link.as = getAssetType(asset)
    document.head.appendChild(link)
  })

  if (localFontWoff) {
    const fontLink = document.createElement('link')
    fontLink.rel = 'preload'
    fontLink.href = localFontWoff
    fontLink.as = 'font'
    fontLink.type = 'font/woff'
    fontLink.crossOrigin = 'anonymous'
    document.head.appendChild(fontLink)
  }
}

function getAssetType(asset) {
  if (asset.endsWith('.woff2') || asset.endsWith('.woff')) {
    return 'font'
  }
  if (
    asset.endsWith('.png') ||
    asset.endsWith('.jpg') ||
    asset.endsWith('.jpeg') ||
    asset.endsWith('.webp')
  ) {
    return 'image'
  }
  if (asset.endsWith('.js')) {
    return 'script'
  }
  if (asset.endsWith('.css')) {
    return 'style'
  }
  return 'fetch'
}

/**
 * 图片懒加载
 */
export class LazyImageLoader {
  constructor(config = LAZY_LOAD_CONFIG) {
    this.config = config
    this.observer = null
    this.init()
  }

  init() {
    if ('IntersectionObserver' in window) {
      this.observer = new IntersectionObserver(this.handleIntersection.bind(this), this.config)
    }
  }

  observe(images) {
    if (!this.observer) {
      return
    }

    const imageElements = Array.isArray(images) ? images : [images]
    imageElements.forEach(img => {
      if (img.dataset.src) {
        this.observer.observe(img)
      }
    })
  }

  handleIntersection(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target
        this.loadImage(img)
        this.observer.unobserve(img)
      }
    })
  }

  loadImage(img) {
    const src = img.dataset.src
    if (!src) {
      return
    }

    // 添加加载状态类
    img.classList.add('lazy-loading')

    const image = new Image()
    image.onload = () => {
      img.src = src
      img.classList.remove('lazy-loading')
      img.classList.add('lazy-loaded')
    }
    image.onerror = () => {
      img.classList.remove('lazy-loading')
      img.classList.add('lazy-error')
      // 加载默认图片
      img.src = img.dataset.fallback || '/images/placeholder.jpg'
    }
    image.src = src
  }

  destroy() {
    if (this.observer) {
      this.observer.disconnect()
    }
  }
}

/**
 * 资源预加载管理器
 */
export class ResourcePreloader {
  constructor() {
    this.preloaded = new Set()
  }

  /**
   * 预加载图片
   */
  preloadImage(src) {
    if (this.preloaded.has(src)) {
      return Promise.resolve()
    }

    return new Promise((resolve, reject) => {
      const img = new Image()
      img.onload = () => {
        this.preloaded.add(src)
        resolve(img)
      }
      img.onerror = reject
      img.src = src
    })
  }

  /**
   * 批量预加载图片
   */
  preloadImages(sources) {
    return Promise.all(sources.map(src => this.preloadImage(src).catch(() => null)))
  }

  /**
   * 预加载关键视口内的资源
   */
  preloadViewportResources() {
    const criticalImages = document.querySelectorAll('img[data-preload="critical"]')
    const sources = Array.from(criticalImages).map(img => img.dataset.src)
    return this.preloadImages(sources)
  }
}

/**
 * 性能监控工具
 */
export class PerformanceMonitor {
  constructor() {
    this.metrics = {
      fcp: null, // First Contentful Paint
      lcp: null, // Largest Contentful Paint
      fid: null, // First Input Delay
      cls: null, // Cumulative Layout Shift
    }
  }

  /**
   * 监控核心Web指标
   */
  monitorCoreWebVitals() {
    // FCP - 首次内容绘制
    if ('PerformanceObserver' in window) {
      new PerformanceObserver(entryList => {
        const entries = entryList.getEntries()
        this.metrics.fcp = entries[0]?.startTime || null
      }).observe({ entryTypes: ['paint'] })
    }

    // LCP - 最大内容绘制
    if ('largest-contentful-paint' in PerformanceObserver.supportedEntryTypes) {
      new PerformanceObserver(entryList => {
        const entries = entryList.getEntries()
        const lastEntry = entries[entries.length - 1]
        this.metrics.lcp = lastEntry?.startTime || null
      }).observe({ entryTypes: ['largest-contentful-paint'] })
    }

    // CLS - 累积布局偏移
    if ('layout-shift' in PerformanceObserver.supportedEntryTypes) {
      new PerformanceObserver(entryList => {
        let clsValue = 0
        for (const entry of entryList.getEntries()) {
          if (!entry.hadRecentInput) {
            clsValue += entry.value
          }
        }
        this.metrics.cls = clsValue
      }).observe({ entryTypes: ['layout-shift'] })
    }
  }

  /**
   * 获取性能报告
   */
  getReport() {
    return {
      ...this.metrics,
      timestamp: Date.now(),
      userAgent: navigator.userAgent,
      deviceMemory: navigator.deviceMemory || 'unknown',
      hardwareConcurrency: navigator.hardwareConcurrency || 'unknown',
    }
  }

  /**
   * 发送性能数据到分析服务
   */
  sendToAnalytics(data) {
    // 这里可以集成具体的分析服务
    console.log('Performance Data:', data)
    // fetch('/api/performance', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(data)
    // })
  }
}

/**
 * 内存管理工具
 */
export class MemoryManager {
  constructor() {
    this.listeners = []
    this.checkInterval = null
  }

  /**
   * 监听内存压力
   */
  monitorMemoryPressure() {
    if ('memory' in performance) {
      this.checkInterval = setInterval(() => {
        const memoryInfo = performance.memory
        const usageRatio = memoryInfo.usedJSHeapSize / memoryInfo.jsHeapSizeLimit

        if (usageRatio > 0.8) {
          this.notifyListeners('high-memory', {
            usageRatio,
            used: memoryInfo.usedJSHeapSize,
            limit: memoryInfo.jsHeapSizeLimit,
          })
        }
      }, 30000) // 每30秒检查一次
    }
  }

  /**
   * 添加内存压力监听器
   */
  addListener(callback) {
    this.listeners.push(callback)
  }

  /**
   * 通知监听器
   */
  notifyListeners(type, data) {
    this.listeners.forEach(listener => listener(type, data))
  }

  /**
   * 清理资源
   */
  cleanup() {
    if (this.checkInterval) {
      clearInterval(this.checkInterval)
    }
    this.listeners = []
  }
}

// 导出实例
export const lazyImageLoader = new LazyImageLoader()
export const resourcePreloader = new ResourcePreloader()
export const performanceMonitor = new PerformanceMonitor()
export const memoryManager = new MemoryManager()

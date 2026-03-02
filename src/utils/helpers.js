// 工具函数集合

/**
 * 防抖函数
 * @param {Function} func - 要防抖的函数
 * @param {number} wait - 等待时间(ms)
 * @returns {Function} 防抖后的函数
 */
export function debounce(func, wait) {
  let timeout
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout)
      func(...args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}

/**
 * 节流函数
 * @param {Function} func - 要节流的函数
 * @param {number} limit - 限制时间(ms)
 * @returns {Function} 节流后的函数
 */
export function throttle(func, limit) {
  let inThrottle
  return function (...args) {
    if (!inThrottle) {
      func.apply(this, args)
      inThrottle = true
      setTimeout(() => (inThrottle = false), limit)
    }
  }
}

/**
 * 格式化数字
 * @param {number} num - 要格式化的数字
 * @param {number} decimals - 小数位数
 * @returns {string} 格式化后的字符串
 */
export function formatNumber(num, decimals = 0) {
  if (num >= 100000000) {
    return (num / 100000000).toFixed(decimals) + '亿'
  } else if (num >= 10000) {
    return (num / 10000).toFixed(decimals) + '万'
  }
  return num.toFixed(decimals)
}

/**
 * 检查是否为移动端
 * @returns {boolean} 是否为移动端
 */
export function isMobile() {
  return window.innerWidth <= 768
}

/**
 * 检查是否为平板设备
 * @returns {boolean} 是否为平板
 */
export function isTablet() {
  return window.innerWidth > 768 && window.innerWidth <= 1024
}

/**
 * 深度合并对象
 * @param {...Object} objects - 要合并的对象
 * @returns {Object} 合并后的对象
 */
export function deepMerge(...objects) {
  const isObject = obj => obj && typeof obj === 'object'

  return objects.reduce((prev, obj) => {
    Object.keys(obj).forEach(key => {
      const pVal = prev[key]
      const oVal = obj[key]

      if (Array.isArray(pVal) && Array.isArray(oVal)) {
        prev[key] = pVal.concat(...oVal)
      } else if (isObject(pVal) && isObject(oVal)) {
        prev[key] = deepMerge(pVal, oVal)
      } else {
        prev[key] = oVal
      }
    })
    return prev
  }, {})
}

/**
 * 获取滚动位置
 * @returns {Object} 包含scrollTop和scrollLeft的对象
 */
export function getScrollPosition() {
  return {
    x: window.pageXOffset || document.documentElement.scrollLeft,
    y: window.pageYOffset || document.documentElement.scrollTop,
  }
}

/**
 * 平滑滚动到指定位置
 * @param {number} targetY - 目标Y坐标
 * @param {number} duration - 持续时间(ms)
 */
export function smoothScrollTo(targetY, duration = 1000) {
  const startY = window.pageYOffset
  const distance = targetY - startY
  const startTime = performance.now()

  function step(currentTime) {
    const elapsed = currentTime - startTime
    const progress = Math.min(elapsed / duration, 1)

    // 使用缓动函数
    const easeInOutCubic =
      progress < 0.5
        ? 4 * progress * progress * progress
        : (progress - 1) * (2 * progress - 2) * (2 * progress - 2) + 1

    window.scrollTo(0, startY + distance * easeInOutCubic)

    if (progress < 1) {
      requestAnimationFrame(step)
    }
  }

  requestAnimationFrame(step)
}

/**
 * 加载图片并返回Promise
 * @param {string} src - 图片路径
 * @returns {Promise<HTMLImageElement>} 图片加载Promise
 */
export function loadImage(src) {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.onload = () => resolve(img)
    img.onerror = reject
    img.src = src
  })
}

/**
 * 批量预加载图片
 * @param {string[]} sources - 图片路径数组
 * @returns {Promise<HTMLImageElement[]>} 所有图片加载完成的Promise
 */
export function preloadImages(sources) {
  return Promise.all(sources.map(loadImage))
}

/**
 * 生成唯一的ID
 * @param {string} prefix - 前缀
 * @returns {string} 唯一ID
 */
export function generateId(prefix = 'id') {
  return `${prefix}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
}

/**
 * 简单的事件总线
 */
export class EventBus {
  constructor() {
    this.events = {}
  }

  on(event, callback) {
    if (!this.events[event]) {
      this.events[event] = []
    }
    this.events[event].push(callback)
  }

  off(event, callback) {
    if (!this.events[event]) {
      return
    }
    if (!callback) {
      delete this.events[event]
      return
    }
    const index = this.events[event].indexOf(callback)
    if (index > -1) {
      this.events[event].splice(index, 1)
    }
  }

  emit(event, ...args) {
    if (!this.events[event]) {
      return
    }
    this.events[event].forEach(callback => callback(...args))
  }
}

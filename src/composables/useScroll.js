// 滚动相关的组合式函数
import { ref, onMounted, onUnmounted } from 'vue'

import { throttle } from '../utils/helpers'

/**
 * 处理滚动相关的功能
 * @param {Function} scrollCallback - 滚动回调函数
 * @param {number} throttleDelay - 节流延迟时间(ms)
 * @returns {Object} 包含滚动相关状态和方法的对象
 */
export function useScroll(scrollCallback, throttleDelay = 16) {
  const scrollTop = ref(0)
  const scrollDirection = ref('down')
  const isScrolling = ref(false)
  const lastScrollTop = ref(0)

  let scrollTimer = null

  // 节流的滚动处理函数
  const throttledScrollHandler = throttle(event => {
    const currentScrollTop = window.pageYOffset || document.documentElement.scrollTop

    // 更新滚动方向
    scrollDirection.value = currentScrollTop > lastScrollTop.value ? 'down' : 'up'
    lastScrollTop.value = currentScrollTop

    // 更新滚动位置
    scrollTop.value = currentScrollTop

    // 设置滚动状态
    isScrolling.value = true

    // 清除之前的定时器
    if (scrollTimer) {
      clearTimeout(scrollTimer)
    }

    // 设置滚动结束检测
    scrollTimer = setTimeout(() => {
      isScrolling.value = false
    }, 150)

    // 执行回调函数
    if (scrollCallback) {
      scrollCallback({
        scrollTop: currentScrollTop,
        direction: scrollDirection.value,
        isScrolling: isScrolling.value,
      })
    }
  }, throttleDelay)

  // 监听滚动事件
  const startListening = () => {
    window.addEventListener('scroll', throttledScrollHandler, { passive: true })
  }

  // 停止监听滚动事件
  const stopListening = () => {
    window.removeEventListener('scroll', throttledScrollHandler)
    if (scrollTimer) {
      clearTimeout(scrollTimer)
    }
  }

  // 滚动到指定位置
  const scrollTo = (y, behavior = 'smooth') => {
    window.scrollTo({
      top: y,
      behavior,
    })
  }

  // 滚动到元素
  const scrollToElement = (element, offset = 0, behavior = 'smooth') => {
    if (element) {
      const elementTop = element.getBoundingClientRect().top + window.pageYOffset
      scrollTo(elementTop - offset, behavior)
    }
  }

  // 获取元素相对于视口的位置
  const getElementPosition = element => {
    if (!element) {
      return null
    }
    const rect = element.getBoundingClientRect()
    return {
      top: rect.top,
      bottom: rect.bottom,
      left: rect.left,
      right: rect.right,
      width: rect.width,
      height: rect.height,
    }
  }

  // 检查元素是否在视口中
  const isInViewport = (element, threshold = 0) => {
    if (!element) {
      return false
    }
    const rect = element.getBoundingClientRect()
    return (
      rect.top >= -threshold &&
      rect.left >= -threshold &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) + threshold &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth) + threshold
    )
  }

  onMounted(() => {
    startListening()
  })

  onUnmounted(() => {
    stopListening()
  })

  return {
    scrollTop,
    scrollDirection,
    isScrolling,
    startListening,
    stopListening,
    scrollTo,
    scrollToElement,
    getElementPosition,
    isInViewport,
  }
}

/**
 * 处理特定容器的滚动
 * @param {string|HTMLElement} containerSelector - 容器选择器或元素
 * @param {Function} scrollCallback - 滚动回调函数
 * @returns {Object} 包含容器滚动相关方法的对象
 */
export function useContainerScroll(containerSelector, scrollCallback) {
  const container = ref(null)
  const scrollPosition = ref(0)

  onMounted(() => {
    container.value =
      typeof containerSelector === 'string'
        ? document.querySelector(containerSelector)
        : containerSelector

    if (container.value) {
      const handleScroll = throttle(() => {
        scrollPosition.value = container.value.scrollTop
        if (scrollCallback) {
          scrollCallback(scrollPosition.value)
        }
      }, 16)

      container.value.addEventListener('scroll', handleScroll, { passive: true })
    }
  })

  const scrollToTop = () => {
    if (container.value) {
      container.value.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const scrollToBottom = () => {
    if (container.value) {
      container.value.scrollTo({
        top: container.value.scrollHeight,
        behavior: 'smooth',
      })
    }
  }

  return {
    container,
    scrollPosition,
    scrollToTop,
    scrollToBottom,
  }
}

<!-- 
  ========================================
  滚动控制组合式函数
  功能：监听滚轮事件，控制页面动画，阻止默认滚动
  使用场景：AboutView 等需要滚动触发动画的页面
  ========================================
-->

import { ref, onMounted, onUnmounted } from 'vue'

/**
 * 滚动控制配置
 */
export const useScrollControl = (options = {}) => {
  const {
    onScrollUp,      // 向上滚动回调
    onScrollDown,    // 向下滚动回调
    threshold = 50,  // 滚动触发阈值（像素）
    debounceTime = 100, // 防抖时间（毫秒）
  } = options

  // 当前滚动进度
  const scrollProgress = ref(0)
  
  // 是否正在动画中
  const isAnimating = ref(false)
  
  // 防抖定时器
  let debounceTimer = null
  
  // 累积滚动距离
  let accumulatedDelta = 0

  /**
   * 处理滚轮事件
   */
  const handleWheel = (event) => {
    // 阻止默认的滚动行为（关键！）
    event.preventDefault()
    
    // 如果正在动画中，忽略新的滚动
    if (isAnimating.value) return

    // 累积滚动距离
    accumulatedDelta += event.deltaY

    // 判断滚动方向
    const direction = event.deltaY > 0 ? 'down' : 'up'

    // 使用防抖处理滚动
    clearTimeout(debounceTimer)
    debounceTimer = setTimeout(() => {
      // 检查是否超过阈值
      if (Math.abs(accumulatedDelta) >= threshold) {
        // 执行回调
        if (direction === 'down' && onScrollDown) {
          onScrollDown()
        } else if (direction === 'up' && onScrollUp) {
          onScrollUp()
        }

        // 更新进度
        if (direction === 'down') {
          scrollProgress.value = Math.min(100, scrollProgress.value + 10)
        } else {
          scrollProgress.value = Math.max(0, scrollProgress.value - 10)
        }

        // 重置累积值
        accumulatedDelta = 0

        // 设置动画标志
        isAnimating.value = true
        setTimeout(() => {
          isAnimating.value = false
        }, 300)
      }
    }, debounceTime)
  }

  /**
   * 启用滚动监听
   */
  const enableScroll = () => {
    window.addEventListener('wheel', handleWheel, { passive: false })
  }

  /**
   * 禁用滚动监听
   */
  const disableScroll = () => {
    window.removeEventListener('wheel', handleWheel)
    clearTimeout(debounceTimer)
  }

  // 组件挂载时自动启用
  onMounted(() => {
    enableScroll()
  })

  // 组件卸载时清理
  onUnmounted(() => {
    disableScroll()
  })

  return {
    scrollProgress,
    isAnimating,
    enableScroll,
    disableScroll,
  }
}

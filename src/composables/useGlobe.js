// 地球可视化相关的组合式函数
import Globe from 'globe.gl'
import { ref, onUnmounted } from 'vue'

import { GLOBE_CONFIG, GLOBE_VIEWS } from '../utils/constants'

/**
 * 创建地球可视化实例
 * @param {HTMLElement} container - 容器元素
 * @param {string} backgroundImage - 背景图片路径
 * @returns {Object} 包含地球实例和相关方法的对象
 */
export function useGlobe(container, backgroundImage) {
  const globeInstance = ref(null)
  const isGlobeRotating = ref(true)
  const rotationInterval = ref(null)
  const isLoading = ref(true)

  // 初始化地球
  const initGlobe = () => {
    if (!container.value) {
      return
    }

    const world = Globe()(container.value)
      .globeImageUrl(backgroundImage)
      .backgroundColor(GLOBE_CONFIG.backgroundColor)
      .width(window.innerWidth)
      .height(window.innerHeight)
      .atmosphereColor(GLOBE_CONFIG.atmosphereColor)
      .atmosphereAltitude(GLOBE_CONFIG.atmosphereAltitude)
      .pointOfView(GLOBE_CONFIG.initialView)

    globeInstance.value = world

    // 启动自旋转
    startGlobeRotation(world)

    // 处理窗口大小变化
    const handleResize = () => {
      world.width(window.innerWidth)
      world.height(window.innerHeight)
    }
    window.addEventListener('resize', handleResize)

    // 清理函数
    return () => {
      stopGlobeRotation()
      window.removeEventListener('resize', handleResize)
      if (world && world._destructor) {
        world._destructor()
      }
    }
  }

  // 地球自旋转
  const startGlobeRotation = world => {
    if (rotationInterval.value) {
      return
    }

    rotationInterval.value = setInterval(() => {
      if (isGlobeRotating.value && world) {
        const currentView = world.pointOfView()
        const newLng = (currentView.lng - 0.1 + 360) % 360
        world.pointOfView({ ...currentView, lng: newLng }, 0)
      }
    }, 50)
  }

  // 停止地球旋转
  const stopGlobeRotation = () => {
    if (rotationInterval.value) {
      clearInterval(rotationInterval.value)
      rotationInterval.value = null
    }
    isGlobeRotating.value = false
  }

  // 更新地球视角
  const updateViewPoint = (viewIndex, duration = 800) => {
    if (globeInstance.value && GLOBE_VIEWS[viewIndex]) {
      globeInstance.value.pointOfView(GLOBE_VIEWS[viewIndex], duration)
    }
  }

  // 清理资源
  const cleanup = () => {
    stopGlobeRotation()
    if (globeInstance.value && globeInstance.value._destructor) {
      globeInstance.value._destructor()
    }
  }

  onUnmounted(cleanup)

  return {
    globeInstance,
    isGlobeRotating,
    isLoading,
    initGlobe,
    startGlobeRotation,
    stopGlobeRotation,
    updateViewPoint,
    cleanup,
  }
}

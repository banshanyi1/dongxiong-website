<!-- 
  ========================================
  滚动动画演示组件
  功能：监听滚轮事件，触发页面内动画，但页面本身不滚动
  使用场景：全屏展示页、产品介绍页等
  ========================================
-->

<template>
  <div class="scroll-animation-container" @wheel="handleWheel">
    <!-- 内容区域 -->
    <div class="content-section">
      <h1>滚动动画演示</h1>
      <p>当前进度：{{ progress }}%</p>

      <!-- 动画元素 -->
      <div
        class="animated-box"
        :style="{
          transform: `translateX(${progress * 10}px) rotate(${progress * 3.6}deg)`,
          opacity: 1 - progress / 200,
        }"
      >
        我会随着滚动移动和旋转
      </div>

      <!-- 进度指示器 -->
      <div class="progress-bar">
        <div class="progress-fill" :style="{ width: `${Math.min(progress, 100)}%` }"></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

// 当前进度（0-100）
const progress = ref(0)

// 是否正在动画中
const isAnimating = ref(false)

// 防抖定时器
let debounceTimer = null

/**
 * 处理滚轮事件
 * @param {WheelEvent} event - 滚轮事件对象
 */
const handleWheel = event => {
  // 阻止默认的滚动行为（关键！）
  event.preventDefault()

  // 如果正在动画中，忽略新的滚动
  if (isAnimating.value) return

  // 判断滚动方向
  const delta = event.deltaY > 0 ? 10 : -10

  // 更新进度
  progress.value = Math.max(0, Math.min(100, progress.value + delta))

  // 设置动画标志
  isAnimating.value = true

  // 动画结束后重置标志（这里用 setTimeout 模拟）
  clearTimeout(debounceTimer)
  debounceTimer = setTimeout(() => {
    isAnimating.value = false
  }, 100)
}

// 清理定时器
onUnmounted(() => {
  clearTimeout(debounceTimer)
})
</script>

<style scoped>
/* 容器：禁止溢出滚动 */
.scroll-animation-container {
  width: 100%;
  height: 100vh;
  overflow: hidden; /* 关键：隐藏滚动条 */
  position: relative;
}

/* 内容区域 */
.content-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  gap: 2rem;
}

h1 {
  font-size: 3rem;
  color: #1a1a1a;
}

p {
  font-size: 1.5rem;
  color: #666;
}

/* 动画盒子 */
.animated-box {
  width: 200px;
  height: 200px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1.2rem;
  font-weight: bold;
  transition: all 0.3s ease;
  box-shadow: 0 10px 30px rgba(102, 126, 234, 0.3);
}

/* 进度条 */
.progress-bar {
  width: 300px;
  height: 8px;
  background: #e0e0e0;
  border-radius: 4px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, #667eea, #764ba2);
  transition: width 0.3s ease;
}
</style>

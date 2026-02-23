<template>
  <div class="about-test-view">
    <!-- 纯地球可视化部分 -->
    <div class="globe-section">
      <div ref="globeContainer" class="globe-container"></div>
      <div class="globe-overlay">
        <h1>东雄环保</h1>
        <p>有色金属冶炼与大气环保专业服务商</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import * as THREE from 'three'
import Globe from 'globe.gl'

// 地球相关引用
const globeContainer = ref(null)
let globeInstance = null

onMounted(() => {
  // 初始化地球
  if (globeContainer.value) {
    globeInstance = Globe()
      .width(globeContainer.value.clientWidth)
      .height(globeContainer.value.clientHeight)
      .backgroundColor('rgba(0,0,0,0)')
      .globeMaterial(new THREE.MeshPhongMaterial({
        color: 0x0099ff,
        transparent: true,
        opacity: 0.8
      }))
      (globeContainer.value)
  }
})

onUnmounted(() => {
  if (globeInstance) {
    globeInstance._destructor()
  }
})
</script>

<style scoped>
.about-test-view {
  padding: 0;
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  position: relative;
}

.globe-section {
  width: 100%;
  height: 100vh;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

.globe-container {
  width: 80%;
  height: 80%;
  border-radius: 50%;
  overflow: hidden;
  box-shadow: 0 20px 60px rgba(0,0,0,0.5);
  position: relative;
}

.globe-overlay {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  color: white;
  z-index: 10;
  background: rgba(0,0,0,0.3);
  padding: 2rem;
  border-radius: 16px;
  backdrop-filter: blur(10px);
}

.globe-overlay h1 {
  font-size: 3rem;
  margin-bottom: 1rem;
  font-weight: 700;
  text-shadow: 0 2px 10px rgba(0,0,0,0.5);
}

.globe-overlay p {
  font-size: 1.2rem;
  opacity: 0.9;
  max-width: 500px;
  line-height: 1.6;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .globe-container {
    width: 90%;
    height: 90%;
  }
  
  .globe-overlay h1 {
    font-size: 2rem;
  }
  
  .globe-overlay p {
    font-size: 1rem;
  }
}
</style>
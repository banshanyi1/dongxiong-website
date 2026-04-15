<!-- 
  ========================================
  GSAP ScrollTrigger 示例
  功能：使用 GSAP 实现专业的滚动动画
  需要先安装：npm install gsap
  ========================================
-->

<template>
  <div ref="container" class="gsap-scroll-container">
    <section class="section section-1">
      <h1>第一屏</h1>
    </section>
    
    <section class="section section-2">
      <h1>第二屏</h1>
    </section>
    
    <section class="section section-3">
      <h1>第三屏</h1>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// 注册插件
gsap.registerPlugin(ScrollTrigger)

const container = ref(null)

onMounted(() => {
  // 创建时间轴
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: container.value,
      start: 'top top',
      end: '+=300%', // 总滚动距离
      scrub: 1, // 平滑滚动（数字越大越平滑）
      pin: true, // 固定容器
    }
  })
  
  // 添加动画
  tl.to('.section-1', { opacity: 0, scale: 0.8 })
    .to('.section-2', { opacity: 1, scale: 1 }, '<')
    .to('.section-2', { opacity: 0, x: -500 })
    .to('.section-3', { opacity: 1, x: 0 }, '<')
})
</script>

<style scoped>
.gsap-scroll-container {
  width: 100%;
  height: 100vh;
  overflow: hidden;
}

.section {
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 4rem;
  color: white;
}

.section-1 { background: #667eea; }
.section-2 { background: #764ba2; }
.section-3 { background: #f093fb; }
</style>

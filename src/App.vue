<template>
  <div class="app">
    <SiteHeader @blur-change="handleBlurChange" />
    <!-- 全屏模糊遮罩 -->
    <div 
      class="fullscreen-blur-overlay" 
      :class="{ 'active': isFullscreenBlur }"
    ></div>
    <main class="main">
      <RouterView v-slot="{ Component, route }">
        <Transition name="page" mode="out-in">
          <component :is="Component" />
        </Transition>
      </RouterView>
    </main>
    <SiteFooter v-if="!$route.meta.hideBottomNav" />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import SiteHeader from './components/SiteHeader.vue'
import SiteFooter from './components/SiteFooter.vue'

// 全屏模糊状态
const isFullscreenBlur = ref(false)

// 处理来自SiteHeader的模糊状态变化
const handleBlurChange = (blurState) => {
  isFullscreenBlur.value = blurState
}
</script>

<style scoped>
.app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}
.main {
  flex: 1;
  min-height: 0;
  overflow-y: auto;
  overflow-x: hidden;
}

/* 页面切换动效 */
.page-enter-active,
.page-leave-active {
  transition: opacity var(--duration-normal) var(--ease-out),
              transform var(--duration-normal) var(--ease-out);
}
.page-enter-from {
  opacity: 0;
  transform: translateY(8px);
}
.page-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}
</style>

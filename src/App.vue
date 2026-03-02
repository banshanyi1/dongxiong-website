<template>
  <div class="app">
    <SiteHeader @blur-change="handleBlurChange" />
    <!-- 全屏模糊遮罩 -->
    <div class="fullscreen-blur-overlay" :class="{ active: isFullscreenBlur }"></div>
    <main class="main">
      <RouterView v-slot="{ Component, route }">
        <Transition
          name="page"
          mode="out-in"
          @before-enter="onBeforeEnter"
          @after-enter="onAfterEnter"
          @before-leave="onBeforeLeave"
          @after-leave="onAfterLeave"
        >
          <component :is="Component" :key="route.path" />
        </Transition>
      </RouterView>
    </main>
    <SiteFooter v-if="!$route.meta.hideBottomNav" />
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'

import SiteFooter from './components/SiteFooter.vue'
import SiteHeader from './components/SiteHeader.vue'
import { useI18n } from './composables/useI18n'

const route = useRoute()
const { initLocale, t, locale } = useI18n()

// 根据路由和语言更新页面标题
function updateDocumentTitle() {
  const key = route.meta?.titleKey
  const title = key ? t(key) : t('common.logo')
  document.title = `${title} | ${t('common.logo')}`
}
watch([() => route.path, locale], updateDocumentTitle, { immediate: true })

// 全屏模糊状态
const isFullscreenBlur = ref(false)

// 处理来自SiteHeader的模糊状态变化
const handleBlurChange = blurState => {
  isFullscreenBlur.value = blurState
}

// 页面过渡动画钩子
const onBeforeEnter = el => {
  console.log('页面即将进入')
}

const onAfterEnter = el => {
  console.log('页面进入完成')
}

const onBeforeLeave = el => {
  console.log('页面即将离开')
}

const onAfterLeave = el => {
  console.log('页面离开完成')
}

// 组件挂载时初始化语言
onMounted(() => {
  initLocale()
})
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
  position: relative;
}

/* 页面切换动效 - 优化版本 */
.page-enter-active,
.page-leave-active {
  transition:
    opacity 0.3s ease-out,
    transform 0.3s ease-out;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  width: 100%;
}

.page-enter-from {
  opacity: 0;
  transform: translateY(20px);
}

.page-enter-to {
  opacity: 1;
  transform: translateY(0);
}

.page-leave-from {
  opacity: 1;
  transform: translateY(0);
}

.page-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}

/* 主容器相对定位 */
.main {
  position: relative;
}
</style>

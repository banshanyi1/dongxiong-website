<template>
  <section class="section tech-section">
    <div class="split-layout">
      <div class="split-left">
        <div class="eyebrow">{{ t('caseDetail.techHighlight') }}</div>
        <h2 class="tech-title">{{ t('caseDetail.techResource') }}</h2>
        <p class="tech-description">{{ techHighlights }}</p>
      </div>
      <div class="split-right">
        <div class="tech-icon">
          <!-- 这里使用一个工业相关的 SVG 或简单的 CSS 图标 -->
          <svg
            viewBox="0 0 24 24"
            width="120"
            height="120"
            stroke="currentColor"
            stroke-width="1"
            fill="none"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="feather feather-cpu"
          >
            <rect x="4" y="4" width="16" height="16" rx="2" ry="2"></rect>
            <rect x="9" y="9" width="6" height="6"></rect>
            <line x1="9" y1="1" x2="9" y2="4"></line>
            <line x1="15" y1="1" x2="15" y2="4"></line>
            <line x1="9" y1="20" x2="9" y2="23"></line>
            <line x1="15" y1="20" x2="15" y2="23"></line>
            <line x1="20" y1="9" x2="23" y2="9"></line>
            <line x1="20" y1="14" x2="23" y2="14"></line>
            <line x1="1" y1="9" x2="4" y2="9"></line>
            <line x1="1" y1="14" x2="4" y2="14"></line>
          </svg>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { useI18n } from '@/composables/useI18n'

const props = defineProps({
  techHighlights: {
    type: String,
    default: '',
  },
})

const { t } = useI18n()
</script>

<style scoped>
/* 区块样式 */
.section {
  min-height: 80vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 2vh 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.02);
}

.eyebrow {
  color: #0071e3;
  font-size: 0.9rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-bottom: 1rem;
}

/* 技术亮点区 */
.split-layout {
  display: flex;
  align-items: center;
  gap: 4rem;
  max-width: 1000px;
  margin: 0 auto;
}

.split-left {
  flex: 1;
}

.split-right {
  flex: 1;
  display: flex;
  justify-content: center;
}

.tech-title {
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  color: #ffffff;
}

.tech-description {
  font-size: 1.2rem;
  line-height: 1.8;
  color: #c0c0c0;
}

.tech-icon {
  width: 200px;
  height: 200px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.05);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #0071e3;
  border: 1px solid rgba(255, 255, 255, 0.1);
  animation: float 6s ease-in-out infinite;
}

@keyframes float {
  0% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-20px);
  }
  100% {
    transform: translateY(0px);
  }
}

@media (max-width: 768px) {
  .split-layout {
    flex-direction: column;
    text-align: center;
  }
}
</style>

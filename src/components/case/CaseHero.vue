<template>
  <div>
    <!-- 面包屑导航 -->
    <div class="breadcrumb">
      <router-link to="/">{{ t('caseDetail.home') }}</router-link> /
      <router-link to="/cases">{{ t('caseDetail.cases') }}</router-link> /
      {{ displayCase.breadcrumb }}
    </div>

    <!-- 顶部标题区 -->
    <section class="section hero-section">
      <h1 class="hero-title">{{ displayCase.title }}</h1>
      <p class="hero-sub">{{ displayCase.subtitle }}</p>
    </section>
  </div>
</template>

<script setup>
import { useI18n } from '@/composables/useI18n'

const props = defineProps({
  displayCase: {
    type: Object,
    required: true,
    default: () => ({}),
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

.hero-section {
  min-height: 85vh;
  justify-content: flex-end;
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;
  padding-left: 50px;
  padding-right: 50px;
}

/* 面包屑导航 */
.breadcrumb {
  color: #a0a0a0;
  font-size: 0.85rem;
  letter-spacing: 0.5px;
  margin-bottom: 2rem;
  opacity: 0;
  animation: fadeInUp 0.8s forwards;
  animation-delay: 0.2s;
  padding-top: 2rem;
}

.breadcrumb a {
  color: #c0c0c0;
  text-decoration: none;
  border-bottom: 1px solid transparent;
  transition: border-color 0.2s;
}

.breadcrumb a:hover {
  border-color: #0071e3;
}

.hero-title {
  font-size: clamp(3rem, 10vw, 6rem);
  font-weight: 600;
  line-height: 1.1;
  margin-bottom: 1rem;
  opacity: 0;
  animation: fadeInUp 0.8s forwards;
  animation-delay: 0.3s;
  text-align: left;
}

.hero-sub {
  font-size: 1.4rem;
  color: #c0c0c0;
  font-weight: 300;
  max-width: 800px;
  opacity: 0;
  animation: fadeInUp 0.8s forwards;
  animation-delay: 0.4s;
  text-align: left;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>

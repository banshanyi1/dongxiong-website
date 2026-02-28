<template>
  <div class="page-view">
    <section class="page-hero">
      <div class="page-hero-bg" style="background-image: url(https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1920&q=80)"></div>
      <div class="page-hero-overlay"></div>
      <div class="container page-hero-inner">
        <h1 class="page-hero-title">{{ t('cases.heroTitle') }}</h1>
        <p class="page-hero-lead">{{ t('cases.heroLead') }}</p>
      </div>
    </section>
    
    <section class="page-body">
      <div class="container container--wide">
        <div class="section-header text-center">
          <p class="page-eyebrow">{{ t('cases.eyebrow') }}</p>
          <h2 class="section-title">{{ t('cases.title') }}</h2>
          <p class="section-lead">
            {{ t('cases.lead') }}
          </p>
        </div>
        
        <div class="cases-container">
          <article 
            v-for="(caseItem, index) in cases" 
            :key="caseItem.id" 
            class="case-card"
            :class="{ 'even': index % 2 === 1 }"
            @click="handleCardClick(caseItem.id)"
          >
            <div class="case-content">
              <div class="case-image-section">
                <div 
                  class="case-image" 
                  :style="{ backgroundImage: `url(${caseItem.image})` }"
                ></div>
              </div>
              
              <div class="case-info-section">
                <span class="case-category">{{ t(caseItem.tagKey) }}</span>
                <h3 class="case-title">{{ t(caseItem.titleKey) }}</h3>
                <p class="case-description">{{ t(caseItem.descKey) }}</p>
                <div class="case-action">
                  <span class="case-link">{{ t('cases.knowMore') }} →</span>
                </div>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { useI18n } from '../composables/useI18n'

const router = useRouter()
const { t } = useI18n()

const handleCardClick = (id) => {
  router.push(`/cases/${id}`)
}

const cases = [
  { id: '1', tagKey: 'cases.metallurgy', titleKey: 'caseData.1.title', descKey: 'caseData.1.desc', image: '/dongxiong-website/cases/case1-horizontal-1.jpg' },
  { id: '5', tagKey: 'cases.metalRecycle', titleKey: 'caseData.5.title', descKey: 'caseData.5.desc', image: '/dongxiong-website/cases/自动化控制.jpg' },
  { id: '3', tagKey: 'cases.hazardousWaste', titleKey: 'caseData.3.title', descKey: 'caseData.3.desc', image: '/dongxiong-website/cases/cases-3-全景图.jpg' },
  { id: '4', tagKey: 'cases.ecoProtection', titleKey: 'caseData.4.title', descKey: 'caseData.4.desc', image: '/dongxiong-website/cases/cases-4-湖心工岛.jpg' },
  { id: '2', tagKey: 'cases.nonferrousSmelt', titleKey: 'caseData.2.title', descKey: 'caseData.2.desc', image: '/dongxiong-website/cases/case-2-冷却器.jpg' },
]
</script>

<style scoped>
/* 基础布局样式 */
.page-view { 
  padding-top: 0; 
}

.page-body { 
  padding: var(--space-section) 0; 
}

/* 标题区域样式 */
.section-header {
  margin-bottom: 3rem;
  text-align: center;
}

.page-eyebrow {
  font-size: var(--text-small);
  font-weight: var(--font-weight-medium);
  color: var(--color-industry);
  text-transform: uppercase;
  letter-spacing: 0.1em;
  margin-bottom: 0.75rem;
}

.section-lead {
  margin-bottom: 2rem;
  color: var(--color-text-secondary);
  line-height: 1.6;
}

/* 案例容器样式 */
.cases-container {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

/* 案例卡片基础样式 */
.case-card {
  width: 100%;
  height: 70vh;
  min-height: 500px;
  background: white;
  border-radius: 16px;
  overflow: hidden;
  border: 1px solid #e0e0e0;
  transition: all 0.3s ease;
  cursor: pointer;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  position: relative;
}

/* 偶数卡片背景色 */
.case-card.even {
  background: #f8f9fa;
}

/* 卡片悬停效果 */
.case-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
  border-color: var(--color-primary);
}

.case-card:active {
  transform: translateY(-4px);
}

/* 卡片内容布局 */
.case-content {
  display: flex;
  height: 100%;
  width: 100%;
  align-items: stretch;
}

/* 图片区域 */
.case-image-section {
  flex: 1;
  height: 100%;
  min-width: 50%;
  position: relative;
  overflow: hidden;
}

.case-image {
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
  background-color: var(--color-bg-subtle);
  transition: transform 0.3s ease;
}

.case-card:hover .case-image {
  transform: scale(1.05);
}

/* 信息区域 */
.case-info-section {
  flex: 1;
  padding: 3rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background: inherit;
}

/* 文本样式 */
.case-category {
  display: inline-block;
  font-size: 0.875rem;
  font-weight: var(--font-weight-medium);
  color: var(--color-primary);
  text-transform: uppercase;
  letter-spacing: 0.1em;
  margin-bottom: 1.5rem;
  background: var(--color-primary-light);
  padding: 0.5rem 1.25rem;
  border-radius: 20px;
  align-self: flex-start;
}

.case-title {
  font-size: 2rem;
  font-weight: var(--font-weight-semibold);
  margin-bottom: 1.5rem;
  color: var(--color-text);
  line-height: 1.3;
}

.case-description {
  font-size: 1.125rem;
  color: var(--color-text-secondary);
  line-height: 1.7;
  margin-bottom: 2rem;
}

/* 操作按钮 */
.case-action {
  margin-top: auto;
}

.case-link {
  font-size: 1.125rem;
  font-weight: var(--font-weight-medium);
  color: var(--color-primary);
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.3s ease;
}

.case-link:hover {
  color: var(--color-primary-hover);
  transform: translateX(8px);
}

/* 响应式设计 */
@media (max-width: 992px) {
  .case-card {
    height: 60vh;
    min-height: 400px;
  }
  
  .case-content {
    flex-direction: column;
  }
  
  .case-image-section {
    height: 40%;
    min-width: 100%;
  }
  
  .case-info-section {
    height: 60%;
    padding: 2rem;
  }
  
  .case-title {
    font-size: 1.75rem;
  }
}

@media (max-width: 768px) {
  .case-card {
    height: 80vh;
    min-height: 350px;
  }
  
  .case-info-section {
    padding: 1.5rem;
  }
  
  .case-title {
    font-size: 1.5rem;
  }
  
  .case-description {
    font-size: 1rem;
  }
  
  .case-category {
    margin-bottom: 1rem;
  }
}

/* 英雄区域样式 */
.page-hero {
  position: relative;
  height: 50vh;
  min-height: 320px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.page-hero-bg {
  position: absolute;
  inset: 0;
  background-size: cover;
  background-position: center;
}

.page-hero-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.5) 100%);
}

.page-hero-inner {
  position: relative;
  z-index: 1;
  text-align: center;
  color: #fff;
}

.page-hero-title {
  font-size: var(--text-h1);
  font-weight: var(--font-weight-semibold);
  margin-bottom: 0.5rem;
}

.page-hero-lead { 
  font-size: var(--text-body); 
  opacity: 0.95; 
}
</style>

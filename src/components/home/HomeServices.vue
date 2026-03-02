<template>
  <section class="section services-section" ref="servicesSection">
    <div class="container-full">
      <p class="page-eyebrow">{{ t('home.services.eyebrow') }}</p>
      <h2 class="section-title">{{ t('home.services.title') }}</h2>
      <p class="section-lead page-intro">
        {{ t('home.services.lead') }}
      </p>
      <div class="dx-card-grid">
        <article
          v-for="(card, index) in serviceCards"
          :key="card.titleKey"
          class="dx-card"
          @click="openServiceDetail(index)"
        >
          <div class="dx-card__media-wrap">
            <div class="dx-card__media">
              <img class="dx-card__img" :src="serviceImages[index]" :alt="t(card.titleKey)" />
            </div>
          </div>
          <div class="dx-card__body">
            <h3 class="dx-card__title">{{ t(card.titleKey) }}</h3>
            <p class="dx-card__desc">{{ t(card.descKey) }}</p>
            <span class="dx-card__link">{{ t('common.clickForDetails') }}</span>
          </div>
        </article>
      </div>
    </div>

    <!-- 业务范围扩展栏 -->
    <div v-if="activeCardIndex !== null" class="service-detail-overlay" @click="closeServiceDetail">
      <div
        class="service-detail-modal"
        :style="{ '--modal-bg-image': `url(${serviceImages[activeCardIndex]})` }"
        @click.stop
      >
        <button class="modal-close" @click="closeServiceDetail">×</button>
        <div class="modal-content">
          <div class="modal-header">
            <h2>{{ t(serviceCards[activeCardIndex].titleKey) }}</h2>
            <p>{{ t(serviceCards[activeCardIndex].descKey) }}</p>
          </div>
          <div class="modal-body">
            <div class="service-details">
              <div class="detail-item">
                <h3>{{ t('home.services.serviceContent') }}</h3>
                <ul>
                  <li v-for="item in getServiceDetails(activeCardIndex)" :key="item">
                    {{ item }}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'
import { useI18n } from '@/composables/useI18n'
import { serviceImages as serviceImgAssets } from '@/utils/images'

const { t } = useI18n()

// 业务范围卡片数据
const serviceCards = [
  { icon: '📐', titleKey: 'home.services.design', descKey: 'home.services.designDesc' },
  { icon: '🔥', titleKey: 'home.services.smelting', descKey: 'home.services.smeltingDesc' },
  { icon: '🌫️', titleKey: 'home.services.airControl', descKey: 'home.services.airControlDesc' },
  { icon: '🔧', titleKey: 'home.services.equipment', descKey: 'home.services.equipmentDesc' },
]

// 首页业务范围卡片图片
const serviceImages = [
  serviceImgAssets.design,
  serviceImgAssets.metals,
  serviceImgAssets.environment,
  serviceImgAssets.maintenance,
]

const activeCardIndex = ref(null)

function openServiceDetail(index) {
  activeCardIndex.value = index
  // 阻止页面滚动
  document.body.style.overflow = 'hidden'
}

function closeServiceDetail() {
  activeCardIndex.value = null
  // 恢复页面滚动
  document.body.style.overflow = ''
}

// 获取服务详情内容（翻译后的数组）
function getServiceDetails(index) {
  const keys = [
    'home.services.detailDesign',
    'home.services.detailSmelting',
    'home.services.detailAir',
    'home.services.detailEquipment',
  ]
  const key = keys[index]
  if (!key) {
    return []
  }
  const arr = t(key)
  return Array.isArray(arr) ? arr : []
}
</script>

<style scoped>
/* 通用区块样式 */
.section {
  min-height: 90vh;
  display: flex;
  align-items: center;
  padding: 4rem 0;
}

.services-section {
  background: rgb(245, 245, 247);
}

.section-title {
  font-size: clamp(2rem, 4vw, 3rem);
  font-weight: 700;
  line-height: 1.2;
  margin-bottom: 1.5rem;
  color: var(--color-text);
}

.services-section .section-eyebrow,
.services-section .section-title,
.services-section .section-description {
  margin-left: 0;
}

/* 业务范围模块特有样式 */
.container-full {
  width: 100%;
  max-width: 100%;
  margin-left: auto;
  margin-right: auto;
  padding-left: 105.25px;
  padding-right: 105.25px;
}

/* 核心业务模块对齐规范（文字宽度控制，但不再用额外左边距） */
.page-eyebrow,
.section-lead,
.page-intro {
  text-align: left;
  margin-left: 0;
  max-width: 640px;
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
  font-size: var(--text-body);
  color: var(--color-text-secondary);
  margin-top: 0.75rem;
}

.page-intro {
  margin-bottom: 2rem;
}

/* 卡片网格容器对齐 */
.dx-card-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.5rem;
  margin-top: 2rem;
}

@media (max-width: 1200px) {
  .dx-card-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 640px) {
  .dx-card-grid {
    grid-template-columns: 1fr;
  }
}

.dx-card {
  position: relative;
  border-radius: 12px;
  overflow: hidden;
  background: white;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  cursor: pointer;
  display: flex;
  flex-direction: column;
}

.dx-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.1);
}

.dx-card__media-wrap {
  position: relative;
  width: 100%;
  padding-top: 66.67%; /* 3:2 Aspect Ratio */
  overflow: hidden;
}

.dx-card__media {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.dx-card__img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.dx-card:hover .dx-card__img {
  transform: scale(1.05);
}

.dx-card__body {
  padding: 1.5rem;
  flex: 1;
  display: flex;
  flex-direction: column;
}

.dx-card__title {
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: var(--color-text);
}

.dx-card__desc {
  font-size: 0.875rem;
  color: var(--color-text-secondary);
  line-height: 1.5;
  margin-bottom: 1rem;
  flex: 1;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.dx-card__link {
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--color-primary);
  display: flex;
  align-items: center;
  gap: 0.25rem;
}

.dx-card__link::after {
  content: '→';
  transition: transform 0.3s ease;
}

.dx-card:hover .dx-card__link::after {
  transform: translateX(4px);
}

/* 详情弹窗样式 */
.service-detail-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(8px);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  animation: fadeIn 0.3s ease;
}

.service-detail-modal {
  background: white;
  width: 100%;
  max-width: 900px;
  border-radius: 20px;
  overflow: hidden;
  position: relative;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  animation: slideUp 0.4s cubic-bezier(0.16, 1, 0.3, 1);
  display: flex;
  flex-direction: column;
  max-height: 85vh;
}

.service-detail-modal::before {
  content: '';
  position: absolute;
  top: 0;
  right: 0;
  width: 50%;
  height: 100%;
  background-image: var(--modal-bg-image);
  background-size: cover;
  background-position: center;
  mask-image: linear-gradient(to right, transparent, black 20%);
  -webkit-mask-image: linear-gradient(to right, transparent, black 20%);
  opacity: 0.1;
  pointer-events: none;
  z-index: 0;
}

.modal-close {
  position: absolute;
  top: 1.5rem;
  right: 1.5rem;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: rgba(0, 0, 0, 0.05);
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  color: var(--color-text);
  transition: all 0.2s ease;
  z-index: 10;
}

.modal-close:hover {
  background: rgba(0, 0, 0, 0.1);
  transform: rotate(90deg);
}

.modal-content {
  position: relative;
  z-index: 1;
  padding: 3rem;
  overflow-y: auto;
}

.modal-header {
  margin-bottom: 2rem;
  max-width: 600px;
}

.modal-header h2 {
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 1rem;
  color: var(--color-industry);
}

.modal-header p {
  font-size: 1.125rem;
  line-height: 1.6;
  color: var(--color-text-secondary);
}

.modal-body {
  border-top: 1px solid var(--color-border);
  padding-top: 2rem;
}

.service-details {
  display: grid;
  gap: 2rem;
}

.detail-item h3 {
  font-size: 1rem;
  font-weight: 600;
  color: var(--color-text);
  margin-bottom: 1rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.detail-item ul {
  list-style: none;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
}

.detail-item li {
  position: relative;
  padding-left: 1.5rem;
  color: var(--color-text-secondary);
  line-height: 1.5;
}

.detail-item li::before {
  content: '•';
  position: absolute;
  left: 0;
  color: var(--color-primary);
  font-weight: bold;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(40px) scale(0.98);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

@media (max-width: 768px) {
  .container-full {
    padding-left: 20px;
    padding-right: 20px;
  }

  .service-detail-modal {
    max-height: 90vh;
  }

  .modal-content {
    padding: 2rem 1.5rem;
  }

  .service-detail-modal::before {
    width: 100%;
    height: 200px;
    top: 0;
    right: 0;
    mask-image: linear-gradient(to bottom, black, transparent);
    -webkit-mask-image: linear-gradient(to bottom, black, transparent);
  }
}
</style>

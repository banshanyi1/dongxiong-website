<template>
  <div class="page-view">
    <section class="page-hero">
      <div
        class="page-hero-bg"
        style="
          background-image: url(https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=1920&q=80);
        "
      ></div>
      <div class="page-hero-overlay"></div>
      <div class="container page-hero-inner">
        <h1 class="page-hero-title">{{ t('services.heroTitle') }}</h1>
        <p class="page-hero-lead">{{ t('services.heroLead') }}</p>
      </div>
    </section>
    <section class="page-body">
      <div class="container-full">
        <p class="page-eyebrow">{{ t('services.eyebrow') }}</p>
        <h2 class="section-title">{{ t('services.title') }}</h2>
        <p class="section-lead page-intro">
          {{ t('services.lead') }}
        </p>
        <div class="dx-card-grid">
          <article
            v-for="(card, index) in cards"
            :key="card.titleKey"
            class="dx-card"
            @click="openDetail(index)"
          >
            <div class="dx-card__media-wrap">
              <div class="dx-card__media">
                <img
                  class="dx-card__img"
                  :src="card.background"
                  :alt="t(card.titleKey)"
                  loading="lazy"
                  decoding="async"
                />
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
    </section>

    <Teleport to="body">
      <div class="service-detail-container" v-if="activeCardIndex !== null">
        <Transition name="slide-fade">
          <div
            v-if="activeCardIndex !== null"
            class="service-detail-backdrop"
            @click="closeDetail"
          ></div>
        </Transition>
        <Transition name="slide-panel">
          <div
            v-if="activeCardIndex !== null"
            class="service-detail-panel"
            :style="getPanelStyle()"
            @click.stop
          >
            <div class="service-detail-panel__overlay" aria-hidden="true"></div>
            <button
              type="button"
              class="detail-close-btn"
              @click="closeDetail"
              :aria-label="t('common.close')"
            >
              ×
            </button>
            <div class="detail-content">
              <header class="detail-header">
                <span class="detail-icon">{{ cards[activeCardIndex]?.icon }}</span>
                <h2 class="detail-title">{{ t(cards[activeCardIndex]?.titleKey) }}</h2>
                <p class="detail-lead">{{ t(cards[activeCardIndex]?.fullDescKey) }}</p>
              </header>
              <div class="detail-body">
                <section v-if="getCardFeatures(activeCardIndex)?.length" class="detail-section">
                  <h3 class="detail-section__title">{{ t('services.coreAdvantage') }}</h3>
                  <ul class="detail-list detail-list--rows">
                    <li v-for="feature in getCardFeatures(activeCardIndex)" :key="feature">
                      {{ feature }}
                    </li>
                  </ul>
                </section>
                <section v-if="getCardProcess(activeCardIndex)?.length" class="detail-section">
                  <h3 class="detail-section__title">{{ t('services.serviceProcess') }}</h3>
                  <ol class="detail-list detail-list--numbered detail-list--rows">
                    <li v-for="(step, i) in getCardProcess(activeCardIndex)" :key="step">
                      <span class="detail-list__num">{{ i + 1 }}</span>
                      <span>{{ step }}</span>
                    </li>
                  </ol>
                </section>
              </div>
              <footer class="detail-footer">
                <RouterLink to="/contact" class="detail-cta">{{
                  t('services.consultNow')
                }}</RouterLink>
              </footer>
              <p class="detail-scroll-hint" v-if="hasScrollableContent">
                {{ t('services.scrollMore') }}
              </p>
            </div>
          </div>
        </Transition>
      </div>
    </Teleport>
  </div>
</template>

<script setup>
import { ref, computed, nextTick, onUnmounted } from 'vue'

import { useI18n } from '../composables/useI18n'
import { serviceImages } from '../utils/images'

const { t } = useI18n()
const activeCardIndex = ref(null)

const cards = [
  {
    icon: '📐',
    titleKey: 'services.design',
    descKey: 'services.designDesc',
    fullDescKey: 'services.designFullDesc',
    featuresKey: 'services.designFeatures',
    processKey: 'services.designProcess',
    background: serviceImages.design,
  },
  {
    icon: '🔥',
    titleKey: 'services.smelting',
    descKey: 'services.smeltingDesc',
    fullDescKey: 'services.smeltingFullDesc',
    featuresKey: 'services.smeltingFeatures',
    processKey: 'services.smeltingProcess',
    background: serviceImages.metals,
  },
  {
    icon: '🌫️',
    titleKey: 'services.airControl',
    descKey: 'services.airControlDesc',
    fullDescKey: 'services.airFullDesc',
    featuresKey: 'services.airFeatures',
    processKey: 'services.airProcess',
    background: serviceImages.environment,
  },
  {
    icon: '🔧',
    titleKey: 'services.equipment',
    descKey: 'services.equipmentDesc',
    fullDescKey: 'services.equipmentFullDesc',
    featuresKey: 'services.equipmentFeatures',
    processKey: 'services.equipmentProcess',
    background: serviceImages.maintenance,
  },
]

function getCardFeatures(index) {
  if (index === null || index === undefined) {
    return []
  }
  const key = cards[index]?.featuresKey
  const val = key ? t(key) : null
  return Array.isArray(val) ? val : []
}

function getCardProcess(index) {
  if (index === null || index === undefined) {
    return []
  }
  const key = cards[index]?.processKey
  const val = key ? t(key) : null
  return Array.isArray(val) ? val : []
}

const hasScrollableContent = computed(() => {
  if (activeCardIndex.value === null) {
    return false
  }
  const features = getCardFeatures(activeCardIndex.value)
  const process = getCardProcess(activeCardIndex.value)
  return (features?.length || 0) + (process?.length || 0) > 8
})

async function openDetail(index) {
  // 先清空当前状态，确保动画能正确触发
  activeCardIndex.value = null
  await nextTick()
  // 设置新状态
  activeCardIndex.value = index
  // 防止页面滚动
  document.body.style.overflow = 'hidden'
}

function closeDetail() {
  activeCardIndex.value = null
  // 恢复页面滚动
  document.body.style.overflow = ''
}

function getPanelStyle() {
  if (activeCardIndex.value === null) {
    return {}
  }
  const card = cards[activeCardIndex.value]
  if (!card?.background) {
    return {}
  }
  return {
    backgroundImage: `linear-gradient(to bottom, rgba(255,255,255,0.92) 0%, rgba(255,255,255,0.82) 25%, rgba(255,255,255,0.65) 55%, transparent 85%), url(${card.background})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
  }
}

// 组件卸载时恢复滚动
onUnmounted(() => {
  document.body.style.overflow = ''
})
</script>

<style scoped>
.page-view {
  padding-top: 0;
}

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
  background: linear-gradient(180deg, rgba(0, 0, 0, 0.3) 0%, rgba(0, 0, 0, 0.5) 100%);
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

.page-body {
  padding: var(--space-section) 0;
  background: var(--color-bg-section);
}

.container-full {
  width: 100%;
  max-width: 100%;
  margin-left: auto;
  margin-right: auto;
  padding-left: 280px;
  padding-right: 105.25px;
}

.page-eyebrow {
  font-size: var(--text-small);
  font-weight: var(--font-weight-medium);
  color: var(--color-industry);
  text-transform: uppercase;
  letter-spacing: 0.1em;
  margin-bottom: 0.75rem;
  text-align: left;
  max-width: 640px;
  margin-left: 0;
}

.page-intro {
  margin-bottom: 2rem;
  text-align: left;
  max-width: 640px;
  margin-left: 0;
}

/* 业务范围页面特有样式 */
section.page-body h2.section-title {
  text-align: left;
  max-width: 640px;
  margin-left: 0 !important;
}

/* 统一业务卡片栅格（固定卡片尺寸：上图 4:3，下文为剩余区域） */
.dx-card-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;
  margin-top: 2.5rem;
}

.dx-card {
  background: transparent;
  border-radius: 18px;
  border: 1px solid transparent;
  overflow: visible;
  box-shadow: none;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  width: 100%;
  min-width: 280px;
  min-height: 520px;
  max-width: 470px;
  max-height: none;
}

/* 移除整卡动画，仅图片区悬停上浮 */

/* 图片区包装：照片区四角圆角，溢出隐藏以便上浮动画不带动文字区 */
.dx-card__media-wrap {
  overflow: hidden;
  flex-shrink: 0;
  border-radius: 18px;
}

/* 图片区：上方 3:4 竖向图片区域，内部为 img */
.dx-card__media {
  width: 100%;
  aspect-ratio: 3 / 4;
  position: relative;
  overflow: hidden;
}

.dx-card__img {
  width: 100%;
  height: 100%;
  display: block;
  object-fit: cover;
}

/* 文字区：占剩余高度，背景透明，文字颜色与底层区块背景协调 */
.dx-card__body {
  flex: 1;
  min-height: 120px;
  padding: 20px 24px 24px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  background: transparent;
}

.dx-card__icon {
  font-size: 1.4rem;
}

.dx-card__title {
  font-size: 1rem;
  font-weight: 600;
  color: var(--color-text);
}

.dx-card__desc {
  font-size: 0.75rem;
  color: var(--color-text-secondary);
  line-height: 1.4;
}

.dx-card__link {
  margin-top: 4px;
  font-size: 0.9rem;
  color: var(--color-primary);
  font-weight: 500;
}

.service-card-link {
  font-size: var(--text-small);
  font-weight: var(--font-weight-medium);
  color: var(--color-primary);
}

.service-card-link:hover {
  color: var(--color-primary-hover);
}

/* 激活状态卡片样式 */
.service-card.active {
  transform: translateY(-4px);
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.06);
  border-color: var(--color-primary);
}

/* 弹出详情面板容器 */
.service-detail-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* 背景遮罩 */
.service-detail-backdrop {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.35);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
}

/* 弹出详情面板：大尺寸，每张卡片对应自己的背景图 + 渐变，内容多时可滚动 */
.service-detail-panel {
  position: relative;
  width: 94%;
  max-width: 1120px;
  max-height: 94vh;
  background-color: #fff;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  border-radius: 28px;
  box-shadow: 0 40px 120px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(0, 0, 0, 0.06);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  will-change: transform;
  transform-origin: bottom center;
}

/* 模糊层：占满整张卡片 100%，无缝隙 */
.service-detail-panel__overlay {
  position: absolute;
  inset: 0;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  border-radius: inherit;
  background: rgba(255, 255, 255, 0.4);
  backdrop-filter: saturate(180%) blur(24px);
  -webkit-backdrop-filter: saturate(180%) blur(24px);
  pointer-events: none;
}

.detail-close-btn {
  position: absolute;
  top: 20px;
  right: 20px;
  width: 36px;
  height: 36px;
  border: none;
  background: rgba(0, 0, 0, 0.06);
  border-radius: 50%;
  font-size: 22px;
  line-height: 1;
  color: #1d1d1f;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.2s ease, transform 0.2s ease;
  z-index: 10;
}

.detail-close-btn:hover {
  background: rgba(0, 0, 0, 0.12);
  transform: scale(1.05);
}

/* 内容区：可滚动，苹果风格大字号 + 一行一项 */
.detail-content {
  position: relative;
  z-index: 2;
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 3.25rem 3rem 3rem;
  overflow-y: auto;
  overflow-x: hidden;
  min-height: 0;
  -webkit-overflow-scrolling: touch;
}

.detail-header {
  text-align: center;
  margin-bottom: 2.5rem;
}

.detail-icon {
  display: inline-block;
  font-size: 3.75rem;
  margin-bottom: 1rem;
  line-height: 1;
}

.detail-title {
  font-size: clamp(2rem, 5.5vw, 3.25rem);
  font-weight: 600;
  letter-spacing: -0.04em;
  color: #1d1d1f;
  margin: 0 0 0.85rem;
  line-height: 1.12;
}

.detail-lead {
  font-size: 1.35rem;
  line-height: 1.65;
  color: #6e6e73;
  margin: 0;
  max-width: 620px;
  margin-left: auto;
  margin-right: auto;
}

.detail-body {
  flex: 1;
  margin-bottom: 2.25rem;
}

.detail-section {
  margin-bottom: 2.5rem;
}

.detail-section:last-child {
  margin-bottom: 0;
}

.detail-section__title {
  font-size: 1rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  color: #6e6e73;
  margin: 0 0 1.1rem;
}

.detail-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

/* 一行一项：每条独占一行，大字号、留白足 */
.detail-list--rows.detail-list li {
  display: block;
  width: 100%;
  font-size: 1.25rem;
  line-height: 1.5;
  color: #1d1d1f;
  padding: 0.85rem 0;
  padding-left: 0;
  border-bottom: 1px solid rgba(0, 0, 0, 0.06);
}

.detail-list--rows.detail-list li:last-child {
  border-bottom: none;
}

.detail-list--numbered.detail-list li {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.detail-list--numbered .detail-list__num {
  flex-shrink: 0;
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  background: #0071e3;
  color: #fff;
  font-size: 0.95rem;
  font-weight: 600;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.detail-footer {
  padding-top: 2rem;
  border-top: 1px solid rgba(0, 0, 0, 0.08);
  text-align: center;
  flex-shrink: 0;
}

.detail-cta {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 1rem 2.5rem;
  border-radius: 980px;
  font-size: 1.2rem;
  font-weight: 500;
  color: #fff;
  background: #0071e3;
  text-decoration: none;
  transition: background 0.2s ease, transform 0.15s ease;
}

.detail-cta:hover {
  background: #0077ed;
  transform: scale(1.02);
}

.detail-scroll-hint {
  text-align: center;
  font-size: 0.9rem;
  color: #6e6e73;
  margin: 1.5rem 0 0;
  padding-top: 1rem;
  animation: scroll-hint-pulse 2s ease-in-out infinite;
}

@keyframes scroll-hint-pulse {
  0%,
  100% {
    opacity: 0.6;
  }
  50% {
    opacity: 1;
  }
}

/* 重新设计的双层动画 */

/* 背景遮罩动画 */
.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.3s ease;
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  opacity: 0;
}

.slide-fade-enter-to,
.slide-fade-leave-from {
  opacity: 1;
}

/* 弹出面板动画：从屏幕底端向上盘出 */
.slide-panel-enter-active,
.slide-panel-leave-active {
  transition: transform 0.5s cubic-bezier(0.32, 0.72, 0, 1), opacity 0.4s ease;
  transform-origin: center bottom;
}

.slide-panel-enter-from,
.slide-panel-leave-to {
  transform: translateY(100%);
  opacity: 0;
}

.slide-panel-enter-to,
.slide-panel-leave-from {
  transform: translateY(0);
  opacity: 1;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .dx-card-grid {
    grid-template-columns: 1fr;
  }

  .dx-card {
    min-width: 0;
    max-width: 100%;
    height: auto;
    min-height: 420px;
    max-height: none;
  }

  .service-detail-panel {
    width: 96%;
    max-height: 94vh;
    border-radius: 22px;
  }

  .service-detail-panel__overlay {
    border-radius: inherit;
  }

  .detail-content {
    padding: 3.25rem 1.75rem 2.25rem;
    padding-top: 3.5rem;
  }

  .detail-icon {
    font-size: 3.25rem;
  }

  .detail-title {
    font-size: 1.85rem;
  }

  .detail-lead {
    font-size: 1.2rem;
  }

  .detail-section__title {
    font-size: 0.95rem;
  }

  .detail-list--rows.detail-list li {
    font-size: 1.15rem;
    padding: 0.7rem 0;
  }

  .detail-cta {
    padding: 0.9rem 2.15rem;
    font-size: 1.1rem;
  }

  .detail-close-btn {
    top: 18px;
    right: 18px;
    width: 38px;
    height: 38px;
    font-size: 22px;
  }

  .detail-scroll-hint {
    font-size: 0.85rem;
    margin-top: 1.25rem;
  }
}
</style>

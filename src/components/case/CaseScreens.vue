<template>
  <div class="apple-content-sections">
    <!-- 2. 规模屏 -->
    <section class="apple-screen scale-screen" ref="screen2">
      <div class="screen-content">
        <h2 class="screen-title">{{ t('caseDetail.scaleTitle') }}</h2>
        <div class="data-grid">
          <div class="data-item">
            <div class="number" :data-target="currentCase.scale">0</div>
            <div class="unit">{{ t('caseDetail.scaleUnit') }}</div>
            <div class="desc">{{ t('caseDetail.scaleDesc') }}</div>
            <div class="sub-desc">
              ▸ {{ t('caseDetail.scaleSubDesc', { scale: currentCase.scale }) }}
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 3. 产品屏 -->
    <section class="apple-screen product-screen" ref="screen3">
      <div class="screen-content">
        <h2 class="screen-title">{{ t('caseDetail.productTitle') }}</h2>
        <div class="product-grid">
          <div
            v-for="(product, index) in caseData.products"
            :key="index"
            class="product-item"
          >
            <div class="product-number" :data-target="product.value">0</div>
            <div class="product-unit">{{ product.unit }}</div>
            <div class="product-name">{{ product.name }}</div>
          </div>
        </div>
      </div>
    </section>

    <!-- 4. 技术屏 -->
    <section class="apple-screen tech-screen" ref="screen4">
      <div class="screen-content">
        <h2 class="screen-title">{{ t('caseDetail.techTitle') }}</h2>
        <div class="tech-grid">
          <div
            v-for="(tech, index) in caseData.efficiency"
            :key="index"
            class="tech-item"
            :class="{ highlight: tech.highlight }"
          >
            <div class="tech-number" :data-target="tech.value">0</div>
            <div class="tech-unit">{{ tech.unit }}</div>
            <div class="tech-label">{{ tech.name }}</div>
          </div>
        </div>
      </div>
    </section>

    <!-- 5. 经济屏 -->
    <section class="apple-screen economy-screen" ref="screen5">
      <div class="screen-content">
        <h2 class="screen-title">{{ t('caseDetail.economyTitle') }}</h2>
        <div class="economy-grid">
          <div
            v-for="(eco, index) in caseData.economy"
            :key="index"
            class="economy-item"
          >
            <div class="economy-number" :data-target="eco.value">0</div>
            <div class="economy-unit">{{ eco.unit }}</div>
            <div class="economy-label">{{ eco.name }}</div>
          </div>
        </div>
        <div class="social-value">
          <div
            v-for="(value, index) in caseData.socialValue"
            :key="index"
            class="value-item"
          >
            {{ value }}
          </div>
        </div>
      </div>
    </section>

    <!-- 6. 社会价值屏 -->
    <section class="apple-screen social-screen" ref="screen6">
      <div class="screen-content">
        <h2 class="screen-title">{{ t('caseDetail.socialTitle') }}</h2>
        <div class="social-grid">
          <div class="social-item" v-if="caseData.economy && caseData.economy[0]">
            <div class="social-number">{{ caseData.economy[0].value }}</div>
            <div class="social-unit">
              {{ (caseData.economy[0].unit || '').replace(/亿元|100M yuan/gi, '') }}
            </div>
            <div class="social-label">{{ caseData.economy[0].name }}</div>
          </div>
          <div class="social-item" v-if="caseData.economy && caseData.economy[1]">
            <div class="social-number">{{ caseData.economy[1].value }}</div>
            <div class="social-unit">
              {{ (caseData.economy[1].unit || '').replace(/亿元|100M yuan/gi, '') }}
            </div>
            <div class="social-label">{{ caseData.economy[1].name }}</div>
          </div>
          <div class="social-item" v-if="caseData.economy && caseData.economy[2]">
            <div class="social-number">{{ caseData.economy[2].value }}</div>
            <div class="social-unit">
              {{ (caseData.economy[2].unit || '').replace(/年|years/gi, '') }}
            </div>
            <div class="social-label">{{ caseData.economy[2].name }}</div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted, nextTick, onUnmounted } from 'vue'
import { useI18n } from '@/composables/useI18n'

const props = defineProps({
  caseData: {
    type: Object,
    required: true,
    default: () => ({}),
  },
  currentCase: {
    type: Object,
    required: true,
    default: () => ({}),
  },
})

const { t } = useI18n()

// Apple风格屏幕引用
const screen2 = ref(null)
const screen3 = ref(null)
const screen4 = ref(null)
const screen5 = ref(null)
const screen6 = ref(null) // 实际上是第6屏

// Apple风格数字滚动动画
const animateNumbers = screenEl => {
  if (!screenEl) return

  const numberElements = screenEl.querySelectorAll(
    '.number[data-target], .product-number[data-target], .tech-number[data-target], .economy-number[data-target]'
  )

  numberElements.forEach((el, index) => {
    const target = parseFloat(el.dataset.target)
    const duration = 1500
    const startTime = Date.now() + index * 100

    const updateNumber = () => {
      const elapsed = Date.now() - startTime
      const progress = Math.min(elapsed / duration, 1)

      // ease-out 缓动
      const easeOut = 1 - Math.pow(1 - progress, 3)
      const current = target * easeOut

      // 格式化显示
      if (target === 15.2 || target === 10.2 || target === 7.5) {
        // 小数数据保留一位小数
        el.textContent = current.toFixed(progress === 1 ? 1 : 1)
      } else if (target === 92 || target === 88) {
        // 百分比数据，整数显示但带>符号
        el.textContent = '>' + current.toFixed(progress === 1 ? 0 : 0)
      } else {
        // 整数数据
        el.textContent = current.toFixed(progress === 1 ? 0 : 0)
      }

      if (progress < 1) {
        requestAnimationFrame(updateNumber)
      }
    }

    // 立即开始动画
    updateNumber()
  })
}

// Apple风格滚动监听
const handleScroll = () => {
  const screens = [screen2, screen3, screen4, screen5, screen6]

  screens.forEach(screenRef => {
    const screen = screenRef.value
    if (!screen) return

    const rect = screen.getBoundingClientRect()
    const isVisible =
      rect.top <= window.innerHeight * 0.6 && rect.bottom >= window.innerHeight * 0.4

    if (isVisible && !screen.classList.contains('visible')) {
      // 触发动画
      screen.classList.add('visible')
      setTimeout(() => {
        animateNumbers(screen)
      }, 300)
    }
  })
}

onMounted(async () => {
  await nextTick()
  window.addEventListener('scroll', handleScroll)
  // 初始检查一次
  handleScroll()
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style scoped>
/* Apple风格屏幕布局 */
.apple-content-sections {
  position: relative;
  z-index: 2;
}

.apple-screen {
  min-height: 90vh;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transform: translateY(50px) scale(0.95);
  transition: all 1s cubic-bezier(0.16, 1, 0.3, 1);
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
}

.apple-screen.visible {
  opacity: 1;
  transform: translateY(0) scale(1);
}

.screen-content {
  max-width: 1000px;
  width: 100%;
  padding: 0 20px;
  text-align: center;
}

.screen-title {
  font-size: 1.2rem;
  color: #86868b;
  margin-bottom: 3rem;
  text-transform: uppercase;
  letter-spacing: 2px;
  font-weight: 600;
}

/* 2. 规模屏样式 */
.scale-screen .data-item {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.scale-screen .number {
  font-size: clamp(6rem, 15vw, 12rem);
  font-weight: 700;
  line-height: 1;
  background: linear-gradient(180deg, #ffffff 0%, #86868b 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 1rem;
}

.scale-screen .unit {
  font-size: 2rem;
  color: #0071e3;
  margin-bottom: 1rem;
}

.scale-screen .desc {
  font-size: 1.5rem;
  color: #f5f5f7;
  max-width: 600px;
  margin: 0 auto 1rem;
}

.scale-screen .sub-desc {
  font-size: 1rem;
  color: #86868b;
}

/* 3. 产品屏样式 */
.product-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
}

.product-item {
  background: rgba(255, 255, 255, 0.03);
  border-radius: 20px;
  padding: 2rem;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.05);
  transition: transform 0.3s;
}

.product-item:hover {
  transform: translateY(-5px);
  background: rgba(255, 255, 255, 0.05);
}

.product-number {
  font-size: 3.5rem;
  font-weight: 700;
  color: #ffffff;
  margin-bottom: 0.5rem;
}

.product-unit {
  font-size: 1rem;
  color: #86868b;
  margin-bottom: 1rem;
}

.product-name {
  font-size: 1.2rem;
  color: #0071e3;
  font-weight: 500;
}

/* 4. 技术屏样式 */
.tech-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 3rem;
}

.tech-item {
  text-align: center;
}

.tech-number {
  font-size: 4rem;
  font-weight: 700;
  color: #ffffff;
  margin-bottom: 0.5rem;
}

.tech-unit {
  font-size: 1.2rem;
  color: #86868b;
  margin-bottom: 0.5rem;
}

.tech-label {
  font-size: 1.1rem;
  color: #f5f5f7;
}

.tech-item.highlight .tech-number {
  color: #0071e3;
}

/* 5. 经济屏样式 */
.economy-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  margin-bottom: 4rem;
}

.economy-item {
  padding: 2rem;
  border-left: 1px solid rgba(255, 255, 255, 0.1);
}

.economy-number {
  font-size: 3rem;
  font-weight: 600;
  color: #ffffff;
  margin-bottom: 0.5rem;
}

.economy-unit {
  font-size: 1rem;
  color: #86868b;
  margin-bottom: 0.5rem;
}

.economy-label {
  font-size: 1.1rem;
  color: #f5f5f7;
}

.social-value {
  display: flex;
  justify-content: center;
  gap: 2rem;
  flex-wrap: wrap;
}

.value-item {
  padding: 0.8rem 1.5rem;
  background: rgba(0, 113, 227, 0.1);
  border-radius: 30px;
  color: #0071e3;
  font-size: 1.1rem;
  border: 1px solid rgba(0, 113, 227, 0.3);
}

/* 6. 社会价值屏样式 */
.social-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  margin-top: 2rem;
}

.social-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
  background: rgba(255, 255, 255, 0.03);
  border-radius: 16px;
  backdrop-filter: blur(10px);
}

.social-number {
  font-size: 3.5rem;
  font-weight: 700;
  color: #ffffff;
  margin-bottom: 0.5rem;
}

.social-unit {
  font-size: 1rem;
  color: #86868b;
  margin-bottom: 1rem;
  text-transform: uppercase;
}

.social-label {
  font-size: 1.1rem;
  color: #0071e3;
}

@media (max-width: 768px) {
  .tech-grid,
  .economy-grid,
  .social-grid {
    grid-template-columns: 1fr;
    gap: 2rem;
  }

  .economy-item {
    border-left: none;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  }
}
</style>

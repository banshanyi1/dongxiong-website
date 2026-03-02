<template>
  <section class="hero-section">
    <div class="hero-carousel">
      <div
        v-for="(slide, index) in heroSlides"
        :key="index"
        class="hero-slide"
        :class="{ active: currentSlide === index }"
        :style="{
          backgroundImage: `url(${
            typeof slide.image === 'string' ? slide.image : slide.image.default
          })`,
        }"
      >
        <div class="hero-overlay"></div>
        <div class="hero-content container">
          <div class="hero-text">
            <p class="hero-eyebrow">{{ t(slide.eyebrowKey) }}</p>
            <h1 class="hero-title">{{ t(slide.titleKey) }}</h1>
            <p class="hero-description">{{ t(slide.descKey) }}</p>
            <div class="hero-buttons">
              <RouterLink :to="slide.primaryLink" class="btn btn-primary">{{
                t(slide.primaryKey)
              }}</RouterLink>
              <RouterLink :to="slide.secondaryLink" class="btn btn-outline">{{
                t(slide.secondaryKey)
              }}</RouterLink>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 轮播指示器 -->
    <div class="hero-indicators">
      <button
        v-for="(_, index) in heroSlides"
        :key="index"
        class="indicator"
        :class="{ active: currentSlide === index }"
        @click="goToSlide(index)"
      ></button>
    </div>

    <!-- 向下滚动提示 -->
    <div class="scroll-down" @click="scrollToNext">
      <span class="scroll-text">{{ t('common.scrollDown') }}</span>
      <div class="scroll-arrow">↓</div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useI18n } from '@/composables/useI18n'
import { homeImages } from '@/utils/images'
import { resourcePreloader } from '@/utils/performance'

const { t } = useI18n()

// 轮播图数据（使用翻译 key）
const heroSlides = [
  {
    image: homeImages.heroSlide1,
    eyebrowKey: 'home.hero.eyebrow1',
    titleKey: 'home.hero.title1',
    descKey: 'home.hero.desc1',
    primaryLink: '/services',
    primaryKey: 'home.hero.primary1',
    secondaryLink: '/contact',
    secondaryKey: 'home.hero.secondary1',
  },
  {
    image: homeImages.heroSlide2,
    eyebrowKey: 'home.hero.eyebrow2',
    titleKey: 'home.hero.title2',
    descKey: 'home.hero.desc2',
    primaryLink: '/solutions',
    primaryKey: 'home.hero.primary2',
    secondaryLink: '/cases',
    secondaryKey: 'home.hero.secondary2',
  },
  {
    image: homeImages.heroSlide3,
    eyebrowKey: 'home.hero.eyebrow3',
    titleKey: 'home.hero.title3',
    descKey: 'home.hero.desc3',
    primaryLink: '/about',
    primaryKey: 'home.hero.primary3',
    secondaryLink: '/contact',
    secondaryKey: 'home.hero.secondary3',
  },
]

// 响应式数据
const currentSlide = ref(0)
const autoPlayInterval = ref(null)

// 轮播控制
function goToSlide(index) {
  currentSlide.value = index
}

function nextSlide() {
  currentSlide.value = (currentSlide.value + 1) % heroSlides.length
}

// 自动播放
function startAutoPlay() {
  autoPlayInterval.value = setInterval(nextSlide, 5000)
}

function stopAutoPlay() {
  if (autoPlayInterval.value) {
    clearInterval(autoPlayInterval.value)
    autoPlayInterval.value = null
  }
}

// 滚动到下一屏
function scrollToNext() {
  const nextSection = document.querySelector('.section-divider')
  if (nextSection) {
    nextSection.scrollIntoView({ behavior: 'smooth' })
  }
}

// 生命周期钩子
onMounted(() => {
  resourcePreloader.preloadImages([
    homeImages.heroSlide1,
    homeImages.heroSlide2,
    homeImages.heroSlide3,
  ])
  startAutoPlay()
})

onUnmounted(() => {
  stopAutoPlay()
})
</script>

<style scoped>
/* 第一屏：英雄区域 */
.hero-section {
  position: relative;
  height: 90vh;
  overflow: hidden;
}

.hero-carousel {
  position: relative;
  width: 100%;
  height: 100%;
}

.hero-slide {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center 65%;
  opacity: 0;
  transition: opacity 1s ease-in-out;
}

.hero-slide.active {
  opacity: 1;
}

.hero-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, rgba(10, 126, 164, 0.4) 0%, rgba(29, 29, 31, 0.3) 100%);
}

.hero-content {
  position: relative;
  height: 100%;
  display: flex;
  align-items: center;
  z-index: 2;
}

.hero-text {
  max-width: 600px;
  color: white;
  animation: fadeInUp 1s ease-out;
}

.hero-eyebrow {
  font-size: 1rem;
  font-weight: 500;
  letter-spacing: 2px;
  text-transform: uppercase;
  margin-bottom: 1rem;
  opacity: 0.9;
}

.hero-title {
  font-size: clamp(2.5rem, 5vw, 4rem);
  font-weight: 700;
  line-height: 1.2;
  margin-bottom: 1.5rem;
  letter-spacing: -0.02em;
}

.hero-description {
  font-size: 1.25rem;
  line-height: 1.6;
  margin-bottom: 2.5rem;
  opacity: 0.9;
  max-width: 500px;
}

.hero-buttons {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.875rem 2rem;
  border-radius: 8px;
  font-weight: 500;
  text-decoration: none;
  transition: all 0.3s ease;
  border: 2px solid transparent;
}

.btn-primary {
  background: var(--color-industry);
  color: white;
}

.btn-primary:hover {
  background: #086a8c;
  transform: translateY(-2px);
  box-shadow: 0 10px 25px rgba(10, 126, 164, 0.3);
}

.btn-outline {
  background: transparent;
  color: white;
  border-color: white;
}

.btn-outline:hover {
  background: white;
  color: var(--color-industry);
  transform: translateY(-2px);
}

/* 轮播指示器 */
.hero-indicators {
  position: absolute;
  bottom: 120px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 12px;
  z-index: 3;
}

.indicator {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.5);
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
}

.indicator.active {
  background: white;
  transform: scale(1.2);
}

/* 向下滚动提示 */
.scroll-down {
  position: absolute;
  bottom: 30px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  color: white;
  cursor: pointer;
  z-index: 3;
  animation: bounce 2s infinite;
}

.scroll-text {
  font-size: 0.875rem;
  margin-bottom: 8px;
  opacity: 0.8;
}

.scroll-arrow {
  font-size: 1.5rem;
  animation: pulse 2s infinite;
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

@keyframes bounce {
  0%,
  20%,
  50%,
  80%,
  100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-10px);
  }
  60% {
    transform: translateY(-5px);
  }
}

@keyframes pulse {
  0% {
    opacity: 0.5;
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0.5;
  }
}
</style>

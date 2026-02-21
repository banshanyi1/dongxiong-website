<template>
  <section class="hero-carousel">
    <div class="carousel-track" :style="trackStyle">
      <div
        v-for="(slide, i) in slides"
        :key="i"
        class="carousel-slide"
        :class="{ active: i === index }"
      >
        <div class="slide-bg" :style="{ backgroundImage: `url(${slide.image})` }"></div>
        <div class="slide-overlay"></div>
        <div class="container slide-content">
          <p v-if="slide.eyebrow" class="slide-eyebrow">{{ slide.eyebrow }}</p>
          <h1 class="slide-title">{{ slide.title }}</h1>
          <p v-if="slide.lead" class="slide-lead">{{ slide.lead }}</p>
          <div class="slide-actions">
            <RouterLink v-if="slide.primaryLink" :to="slide.primaryLink" class="btn btn-primary">
              {{ slide.primaryText || '了解业务' }}
            </RouterLink>
            <RouterLink v-if="slide.secondaryLink" :to="slide.secondaryLink" class="btn btn-ghost">
              {{ slide.secondaryText || '联系我们' }}
            </RouterLink>
          </div>
        </div>
      </div>
    </div>
    <button type="button" class="carousel-btn carousel-btn-prev" aria-label="上一张" @click="prev">
      <span class="carousel-btn-icon">‹</span>
    </button>
    <button type="button" class="carousel-btn carousel-btn-next" aria-label="下一张" @click="next">
      <span class="carousel-btn-icon">›</span>
    </button>
    <div class="carousel-dots">
      <button
        v-for="(_, i) in slides"
        :key="i"
        type="button"
        class="carousel-dot"
        :class="{ active: i === index }"
        :aria-label="`第 ${i + 1} 张`"
        @click="index = i"
      ></button>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'

const slides = [
  {
    image: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=1920&q=80',
    eyebrow: '大气环保 · 有色金属冶炼',
    title: '专业环保解决方案，助力绿色冶炼',
    lead: '设计、设备、运维一站式服务',
    primaryLink: '/services',
    primaryText: '了解业务',
    secondaryLink: '/contact',
    secondaryText: '联系我们',
  },
  {
    image: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=1920&q=80',
    eyebrow: '工程案例',
    title: '数百个成功项目，遍布全国',
    lead: '可参观考察',
    primaryLink: '/cases',
    primaryText: '查看案例',
    secondaryLink: '/contact',
    secondaryText: '联系我们',
  },
  {
    image: 'https://images.unsplash.com/photo-1567767292278-a4f21aa2d36e?w=1920&q=80',
    eyebrow: '解决方案',
    title: '量身定制的环保升级方案',
    lead: '全程专业交付',
    primaryLink: '/solutions',
    primaryText: '了解方案',
    secondaryLink: '/contact',
    secondaryText: '获取报价',
  },
]

const index = ref(0)
const trackStyle = computed(() => ({
  transform: `translate3d(${-index.value * 100}%, 0, 0)`,
}))

function next() {
  index.value = (index.value + 1) % slides.length
}

function prev() {
  index.value = index.value === 0 ? slides.length - 1 : index.value - 1
}

let timer
onMounted(() => {
  timer = setInterval(next, 6000)
})
onUnmounted(() => {
  if (timer) clearInterval(timer)
})
</script>

<style scoped>
.hero-carousel {
  position: relative;
  width: 100%;
  height: 100vh;
  min-height: 100vh;
  flex-shrink: 0;
  overflow: hidden;
  scroll-snap-align: center;
  scroll-snap-stop: always;
}

.carousel-track {
  display: flex;
  width: 100%;
  height: 100%;
  transition: transform 0.7s var(--ease-in-out);
}

.carousel-slide {
  flex: 0 0 100%;
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

.slide-bg {
  position: absolute;
  inset: 0;
  background-size: cover;
  background-position: center;
  background-color: #0a7ea4;
  transition: transform 8s var(--ease-out);
}

.carousel-slide.active .slide-bg {
  transform: scale(1.05);
}

.slide-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, rgba(0,0,0,0.25) 0%, rgba(0,0,0,0.5) 100%);
}

.slide-content {
  position: relative;
  z-index: 2;
  text-align: center;
  color: #fff;
  max-width: 720px;
}

.slide-eyebrow {
  font-size: var(--text-small);
  font-weight: var(--font-weight-medium);
  letter-spacing: 0.12em;
  opacity: 0.95;
  margin-bottom: 0.75rem;
}

.slide-title {
  font-size: clamp(1.75rem, 4vw + 0.5rem, 2.75rem);
  font-weight: var(--font-weight-semibold);
  letter-spacing: -0.03em;
  line-height: 1.15;
  margin-bottom: 0.75rem;
  text-shadow: 0 2px 20px rgba(0,0,0,0.3);
}

.slide-lead {
  font-size: 1rem;
  opacity: 0.95;
  line-height: 1.5;
  margin-bottom: 1.25rem;
}

.slide-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: center;
}

.slide-actions .btn-primary {
  background: #fff;
  color: var(--color-bg-dark);
}

.slide-actions .btn-primary:hover {
  background: var(--color-bg-alt);
  color: var(--color-text);
}

.slide-actions .btn-ghost {
  border-color: rgba(255,255,255,0.6);
  color: #fff;
}

.slide-actions .btn-ghost:hover {
  background: rgba(255,255,255,0.15);
  border-color: #fff;
}

.carousel-btn {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 10;
  width: 48px;
  height: 48px;
  border: none;
  border-radius: 50%;
  background: rgba(255,255,255,0.2);
  backdrop-filter: blur(8px);
  color: #fff;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background var(--duration-fast) var(--ease-out),
              transform var(--duration-fast) var(--ease-out);
}

.carousel-btn:hover {
  background: rgba(255,255,255,0.35);
  transform: translateY(-50%) scale(1.05);
}

.carousel-btn-prev { left: 1.5rem; }
.carousel-btn-next { right: 1.5rem; }

.carousel-btn-icon {
  font-size: 1.75rem;
  line-height: 1;
  font-weight: 300;
}

.carousel-dots {
  position: absolute;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 0.5rem;
  z-index: 10;
}

.carousel-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  border: none;
  background: rgba(255,255,255,0.4);
  cursor: pointer;
  transition: background var(--duration-fast) var(--ease-out),
              transform var(--duration-fast) var(--ease-out);
}

.carousel-dot:hover,
.carousel-dot.active {
  background: #fff;
  transform: scale(1.2);
}
</style>

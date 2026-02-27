<template>
  <div class="home-view">
    <!-- 第一屏：全屏轮播图 -->
    <section class="hero-section">
      <div class="hero-carousel">
        <div 
          v-for="(slide, index) in heroSlides" 
          :key="index"
          class="hero-slide"
          :class="{ 'active': currentSlide === index }"
          :style="{ backgroundImage: `url(${slide.image})` }"
        >
          <div class="hero-overlay"></div>
          <div class="hero-content container">
            <div class="hero-text">
              <p class="hero-eyebrow">{{ slide.eyebrow }}</p>
              <h1 class="hero-title">{{ slide.title }}</h1>
              <p class="hero-description">{{ slide.description }}</p>
              <div class="hero-buttons">
                <RouterLink :to="slide.primaryLink" class="btn btn-primary">{{ slide.primaryText }}</RouterLink>
                <RouterLink :to="slide.secondaryLink" class="btn btn-outline">{{ slide.secondaryText }}</RouterLink>
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
          :class="{ 'active': currentSlide === index }"
          @click="goToSlide(index)"
        ></button>
      </div>
      
      <!-- 向下滚动提示 -->
      <div class="scroll-down" @click="scrollToNext">
        <span class="scroll-text">向下浏览</span>
        <div class="scroll-arrow">↓</div>
      </div>
    </section>

    <!-- 分割线 -->
    <div class="section-divider"></div>

    <!-- 第二屏：关于我们（视频背景） -->
    <section class="section about-section video-about-section" ref="aboutSection">
      <div class="video-container">
        <video 
          ref="aboutVideo"
          class="background-video"
          :src="videoSrc"
          muted
          loop
          playsinline
        ></video>
        <div class="video-overlay"></div>
        <div class="video-content container">
          <div class="video-text">
            <span class="section-eyebrow">关于我们</span>
            <h2 class="section-title">专注大气环保与有色金属冶炼</h2>
            <p class="section-description">
              东雄环保致力于提供全产业链的环保解决方案，从技术研发到工程实施，
              为客户提供专业的大气污染治理和有色金属冶炼环保服务。
            </p>
            <div class="video-stats">
              <div class="video-stat">
                <span class="stat-number">500+</span>
                <span class="stat-label">工程项目</span>
              </div>
              <div class="video-stat">
                <span class="stat-number">100+</span>
                <span class="stat-label">技术专利</span>
              </div>
              <div class="video-stat">
                <span class="stat-number">20+</span>
                <span class="stat-label">服务国家</span>
              </div>
              <div class="video-stat">
                <span class="stat-number">15年</span>
                <span class="stat-label">行业经验</span>
              </div>
            </div>
            <RouterLink to="/about" class="btn btn-primary">了解更多</RouterLink>
          </div>
        </div>
      </div>
    </section>

    <!-- 第三屏：业务范围 -->
    <section class="section services-section" ref="servicesSection">
      <div class="container-full">
        <p class="page-eyebrow">核心业务</p>
        <h2 class="section-title">四大业务板块</h2>
        <p class="section-lead page-intro">
          为客户提供合规、高效、可持续的解决方案。
        </p>
        <div class="dx-card-grid">
          <article 
            v-for="(card, index) in serviceCards" 
            :key="card.title" 
            class="dx-card"
            @click="openServiceDetail(index)"
          >
            <div class="dx-card__media-wrap">
              <div class="dx-card__media">
                <img
                  class="dx-card__img"
                  :src="serviceImages[index]"
                  :alt="card.title"
                  @error="console.log('首页图片加载失败:', serviceImages[index])"
                  @load="console.log('首页图片加载成功:', serviceImages[index])"
                />
              </div>
            </div>
            <div class="dx-card__body">
              <h3 class="dx-card__title">{{ card.title }}</h3>
              <p class="dx-card__desc">{{ card.description }}</p>
              <span class="dx-card__link">点击查看详情 →</span>
            </div>
          </article>
        </div>
      </div>
    </section>

    <!-- 第四屏：工程案例 -->
    <section class="section cases-section" ref="casesSection">
      <div class="container-full">
        <div class="section-content reverse">
          <div class="section-image">
            <img :src="casesImage" alt="工程案例">
          </div>
          <div class="section-text">
            <span class="section-eyebrow">工程案例</span>
            <h2 class="section-title">数百个成功项目，遍布全国</h2>
            <p class="section-description">
              我们已完成数百个环保工程项目，涵盖冶金、化工、电力等多个行业，
              项目遍布全国各地，积累了丰富的实践经验。
            </p>
            <div class="stats">
              <div class="stat-item">
                <span class="stat-number">500+</span>
                <span class="stat-label">成功项目</span>
              </div>
              <div class="stat-item">
                <span class="stat-number">20+</span>
                <span class="stat-label">服务行业</span>
              </div>
              <div class="stat-item">
                <span class="stat-number">15</span>
                <span class="stat-label">年经验</span>
              </div>
            </div>
            <RouterLink to="/cases" class="btn btn-primary">查看案例</RouterLink>
          </div>
        </div>
      </div>
    </section>

    <!-- 第五屏：联系我们 -->
    <section class="section contact-section" ref="contactSection">
      <div class="container-full">
        <div class="section-header text-left">
          <span class="section-eyebrow">联系我们</span>
          <h2 class="section-title">携手共创绿色未来</h2>
          <p class="section-description">
            欢迎咨询与合作，让我们一起为环境保护贡献力量
          </p>
        </div>
        <div class="contact-content">
          <div class="contact-info">
            <div class="contact-item">
              <div class="contact-icon">📍</div>
              <div>
                <h4>公司地址</h4>
                <p>北京市朝阳区XX路XX号</p>
              </div>
            </div>
            <div class="contact-item">
              <div class="contact-icon">📞</div>
              <div>
                <h4>联系电话</h4>
                <p>400-XXX-XXXX</p>
              </div>
            </div>
            <div class="contact-item">
              <div class="contact-icon">✉️</div>
              <div>
                <h4>电子邮箱</h4>
                <p>info@dongxiong-env.com</p>
              </div>
            </div>
          </div>
          <RouterLink to="/contact" class="btn btn-primary btn-large">立即联系</RouterLink>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import heroSlide1 from '../assets/images/hero-slide-1.png'
import heroSlide2 from '../assets/images/hero-slide-2.jpg'
import heroSlide3 from '../assets/images/hero-slide-3.jpg'
import aboutVideoSrc from '../assets/videos/about-video.mp4'

// 轮播图数据
const heroSlides = [
  {
    image: heroSlide1,
    eyebrow: '东雄环保',
    title: '东雄环保-安徽',
    description: '专注于有色金属冶炼与大气污染治理的技术研发',
    primaryLink: '/services',
    primaryText: '了解业务',
    secondaryLink: '/contact',
    secondaryText: '联系我们'
  },
  {
    image: heroSlide2,
    eyebrow: '技术创新',
    title: '顶尖氧化锌工艺技术',
    description: '自主研发的氧化锌高纯度生产工艺技术，效果显著',
    primaryLink: '/solutions',
    primaryText: '技术优势',
    secondaryLink: '/cases',
    secondaryText: '成功案例'
  },
  {
    image: heroSlide3,
    eyebrow: '品质保证',
    title: '全流程服务保障',
    description: '从方案设计到施工运维，提供全流程一站式服务',
    primaryLink: '/about',
    primaryText: '公司介绍',
    secondaryLink: '/contact',
    secondaryText: '获取报价'
  }
]

// 图片资源
const aboutImage = 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=600&q=80'
const casesImage = 'https://images.unsplash.com/photo-1567767292278-a4f21aa2d36e?w=600&q=80'

// 业务范围数据
const services = [
  { 
    icon: '📐', 
    title: '工程设计咨询', 
    description: '可研与设计，提供专业的工程前期咨询和设计服务'
  },
  { 
    icon: '🔥', 
    title: '有色金属冶炼', 
    description: '先进的系统工艺技术，专注有色金属冶炼领域'
  },
  { 
    icon: '🌫️', 
    title: '大气污染治理', 
    description: '脱硫脱硝、除尘、VOCs治理全方位解决方案'
  },
  { 
    icon: '🔧', 
    title: '设备与运维', 
    description: '专业的设备与运维服务，保障系统稳定运行'
  }
]

// 业务范围卡片数据（配图见 serviceImages，文字区透明显底层）
const serviceCards = [
  { 
    icon: '📐', 
    title: '工程设计咨询', 
    description: '可研与设计'
  },
  { 
    icon: '🔥', 
    title: '有色金属冶炼', 
    description: '先进系统工艺技术'
  },
  { 
    icon: '🌫️', 
    title: '大气污染治理', 
    description: '脱硫脱硝、除尘、VOCs'
  },
  { 
    icon: '🔧', 
    title: '设备与运维', 
    description: '设备与运维服务'
  }
]

// 首页业务范围卡片图片（来自 public 目录）
const serviceImages = [
  '/dongxiong-website/service-design.jpg',
  '/dongxiong-website/service-metals.jpg',
  '/dongxiong-website/service-environment.jpg',
  '/dongxiong-website/service-maintenance.jpg'
]

const activeCardIndex = ref(null)

async function openServiceDetail(index) {
  // 先清空当前状态，确保动画能正确触发
  activeCardIndex.value = null
  await nextTick()
  // 设置新状态
  activeCardIndex.value = index
  // 跳转到业务范围页面
  router.push('/services')
}

// 响应式数据
const currentSlide = ref(0)
const autoPlayInterval = ref(null)
const aboutVideo = ref(null)
const videoSrc = ref(aboutVideoSrc)

// 轮播控制
function goToSlide(index) {
  currentSlide.value = index
}

function nextSlide() {
  currentSlide.value = (currentSlide.value + 1) % heroSlides.length
}

function prevSlide() {
  currentSlide.value = currentSlide.value === 0 ? heroSlides.length - 1 : currentSlide.value - 1
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
  const sections = document.querySelectorAll('.section')
  if (sections.length > 0) {
    sections[0].scrollIntoView({ behavior: 'smooth' })
  }
}

// 视频播放控制
function handleVideoIntersection(entries) {
  entries.forEach(entry => {
    if (entry.isIntersecting && aboutVideo.value) {
      // 当视频区域进入视口时开始播放
      aboutVideo.value.play().catch(e => console.log('视频播放失败:', e))
    } else if (aboutVideo.value) {
      // 当视频区域离开视口时暂停
      aboutVideo.value.pause()
    }
  })
}

let videoObserver = null

// 生命周期钩子
onMounted(() => {
  startAutoPlay()
  
  // 设置视频观察器
  if (aboutVideo.value && 'IntersectionObserver' in window) {
    videoObserver = new IntersectionObserver(handleVideoIntersection, {
      threshold: 0.3 // 当30%的视频区域可见时触发
    })
    videoObserver.observe(aboutVideo.value)
  }
})

onUnmounted(() => {
  stopAutoPlay()
  
  // 清理视频观察器
  if (videoObserver && aboutVideo.value) {
    videoObserver.unobserve(aboutVideo.value)
    videoObserver = null
  }
})
</script>

<style scoped>
.home-view {
  padding: 0;
  margin: 0;
  overflow-x: hidden;
}

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

/* 分割线样式 */
.section-divider {
  height: 16px;
  background: white;
  width: 100%;
  position: relative;
  z-index: 1;
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

/* 通用区块样式 */
.section {
  min-height: 90vh;
  display: flex;
  align-items: center;
  padding: 4rem 0;
}

.section-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;
}

.section-content.reverse {
  direction: rtl;
}

.section-content.reverse > * {
  direction: ltr;
}

.section-text {
  animation: fadeInLeft 1s ease-out;
}

.section-image {
  animation: fadeInRight 1s ease-out;
}

.section-image img {
  width: 100%;
  height: auto;
  border-radius: 12px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
}

.section-header {
  margin-bottom: 3rem;
}

.cases-section .section-text,
.cases-section .section-header,
.cases-section .section-description {
  text-align: left;
}

.cases-section .stats {
  justify-content: flex-start;
}

.text-center {
  text-align: center;
}

.text-left {
  text-align: left;
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

.services-section .section-eyebrow,
.services-section .section-title,
.services-section .section-description {
  margin-left: 0;
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
.services-grid {
  display: flex;
  gap: 2rem;
  margin: 3rem 0 0;
  width: 100%;
  max-width: 100%;
  justify-content: space-between;
}

.service-card {
  background: var(--color-bg-card);
  border-radius: 16px;
  padding: 2rem;
  border: 1px solid var(--color-border);
  transition: all var(--duration-normal) var(--ease-out);
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  flex: 1;
  min-width: 400px;
  width: calc(42vw - 2.6rem);
  height: calc(56vw - 3.47rem);
  max-width: 470px;
  max-height: 630px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.service-card.first {
  padding: 2rem;
  background: var(--color-bg-alt);
  border: 1px solid #d0d0d0;
  flex: 1;
  min-width: 400px;
  width: calc(42vw - 2.6rem);
  height: calc(56vw - 3.47rem);
  max-width: 470px;
  max-height: 630px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.service-card.second {
  background: white;
  border: 1px solid #e0e0e0;
  flex: 1;
  min-width: 400px;
  width: calc(42vw - 2.6rem);
  height: calc(56vw - 3.47rem);
  max-width: 470px;
  max-height: 630px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.service-card.third {
  background: white;
  border: 1px solid #e0e0e0;
  flex: 1;
  min-width: 400px;
  width: calc(42vw - 2.6rem);
  height: calc(56vw - 3.47rem);
  max-width: 470px;
  max-height: 630px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.service-card.fourth {
  background: white;
  border: 1px solid #e0e0e0;
  flex: 1;
  min-width: 400px;
  width: calc(42vw - 2.6rem);
  height: calc(56vw - 3.47rem);
  max-width: 470px;
  max-height: 630px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.service-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 15px 50px rgba(0, 0, 0, 0.12);
  border-color: var(--color-industry);
}

.service-card-icon { 
  font-size: 2rem; 
  margin-bottom: 1rem; 
}

.service-card-title {
  font-size: 1.75rem;
  font-weight: var(--font-weight-semibold);
  margin-bottom: 0.5rem;
}

.service-card-desc {
  font-size: var(--text-small);
  color: var(--color-text-secondary);
  line-height: 1.6;
  margin-bottom: 1rem;
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

.section-eyebrow {
  display: inline-block;
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--color-industry);
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-bottom: 1rem;
}

.section-title {
  font-size: clamp(2rem, 4vw, 3rem);
  font-weight: 700;
  line-height: 1.2;
  margin-bottom: 1.5rem;
  color: var(--color-text);
}

.section-description {
  font-size: 1.125rem;
  line-height: 1.7;
  color: var(--color-text-secondary);
  margin-bottom: 2rem;
  max-width: 600px;
}

/* 关于我们区域 */
.about-section {
  background: rgb(245, 245, 247);
}

/* 视频关于我们区域 */
.video-about-section {
  padding: 0;
  min-height: 100vh;
  position: relative;
  background: white; /* 纯白色背景 */
}

.video-container {
  position: relative;
  width: calc(100% - 100px); /* 两边各留50px */
  height: calc(100vh - 100px); /* 上下也留50px空间 */
  margin: 50px auto; /* 居中显示 */
  overflow: hidden;
  border-radius: 16px; /* 添加圆角边框 */
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15); /* 添加阴影效果 */
}

.background-video {
  position: absolute;
  top: 50%;
  left: 50%;
  min-width: 100%;
  min-height: 100%;
  width: auto;
  height: auto;
  transform: translate(-50%, -50%);
  object-fit: cover;
  z-index: 1;
}

.video-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, rgba(10, 126, 164, 0.6) 0%, rgba(29, 29, 31, 0.5) 100%);
  z-index: 2;
}

.video-content {
  position: relative;
  z-index: 4; /* 提高层级确保在蒙版之上 */
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-start; /* 改为左对齐 */
  text-align: left; /* 文字左对齐 */
  color: white;
  padding: 2rem 2rem 2rem 50px; /* 减少左边距到50px */
}

/* 全新蒙版：从左到右白色渐变 */
.video-container::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, 
    white 0%,
    rgba(255, 255, 255, 0.95) 10%,
    rgba(255, 255, 255, 0.9) 20%,
    rgba(255, 255, 255, 0.8) 30%,
    rgba(255, 255, 255, 0.6) 40%,
    rgba(255, 255, 255, 0.4) 50%,
    rgba(255, 255, 255, 0.2) 60%,
    rgba(255, 255, 255, 0) 70%
  );
  z-index: 2;
  pointer-events: none; /* 确保不影响交互 */
}



.video-text {
  max-width: 600px; /* 调整最大宽度 */
  width: 100%;
  padding: 0; /* 移除内边距，因为容器已有padding */
  animation: fadeInUp 1s ease-out;
}

.video-stats {
  display: flex;
  justify-content: flex-start; /* 左对齐 */
  gap: 2rem; /* 减小间距 */
  margin: 3rem 0;
  flex-wrap: wrap;
}

.video-stat {
  text-align: center;
}

.video-stat .stat-number {
  display: block;
  font-size: 2.5rem;
  font-weight: 700;
  color: white;
  line-height: 1;
  margin-bottom: 0.5rem;
}

.video-stat .stat-label {
  font-size: 0.875rem;
  color: rgba(255, 255, 255, 0.8);
  text-transform: uppercase;
  letter-spacing: 1px;
}

.video-about-section .btn-primary {
  background: white;
  color: var(--color-industry);
  border-color: white;
}

.video-about-section .btn-primary:hover {
  background: rgba(255, 255, 255, 0.9);
  color: var(--color-industry);
  transform: translateY(-2px);
  box-shadow: 0 10px 25px rgba(255, 255, 255, 0.3);
}

.video-about-section .section-eyebrow {
  color: rgba(255, 255, 255, 0.8);
}

.video-about-section .section-title,
.video-about-section .section-description {
  color: white;
}

.features-list {
  list-style: none;
  margin: 2rem 0;
}

.features-list li {
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
  font-size: 1rem;
}

.feature-icon {
  color: var(--color-industry);
  font-size: 1.25rem;
  margin-right: 0.75rem;
  font-weight: bold;
}

/* 业务范围区域 */
.services-section {
  background: rgb(245, 245, 247); /* 灰色背景 */
}

.services-wrapper {
  display: flex;
  justify-content: center;
  margin: 3rem 0;
}



.service-item {
  position: relative;
}

.service-card {
  background: white;
  border-radius: 16px;
  padding: 2rem;
  border: 1px solid #e0e0e0;
  transition: all 0.3s ease;
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  height: 100%;
  min-height: 300px;
  display: flex;
  flex-direction: column;
}

.service-card.first {
  background: white url('/service-bg-new.png');
  background-size: 120%;
  background-position: 30% bottom;
  background-repeat: no-repeat;
  border: 1px solid #e0e0e0;
  backdrop-filter: blur(0.5px);
}

.service-card.second {
  background: white url('/service-bg-metals-new.png');
  background-size: 55%;
  background-position: right center;
  background-repeat: no-repeat;
  border: 1px solid #e0e0e0;
}

.service-card.third {
  background: white url('/service-bg-equipment.png');
  background-size: 55%;
  background-position: right center;
  background-repeat: no-repeat;
  border: 1px solid #e0e0e0;
}

.service-card.fourth {
  background: white url('/service-bg-operation.png');
  background-size: 55%;
  background-position: right center;
  background-repeat: no-repeat;
  border: 1px solid #e0e0e0;
}

.service-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 15px 50px rgba(0, 0, 0, 0.12);
  border-color: var(--color-industry);
}

.service-card-icon { 
  font-size: 2rem; 
  margin-bottom: 1rem; 
}

.service-card-title {
  font-size: 1.75rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  flex-grow: 1;
}

.service-card-desc {
  font-size: 1rem;
  color: var(--color-text-secondary);
  line-height: 1.6;
  margin-bottom: 1rem;
  flex-grow: 1;
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
  max-width: 470px;
  min-height: 520px;
  max-height: none;
}

/* 图片区包装：照片区四角圆角，溢出隐藏 */
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
  font-size: 1.6rem;
}

.dx-card__title {
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--color-text);
}

.dx-card__desc {
  font-size: 0.95rem;
  color: var(--color-text-secondary);
  line-height: 1.6;
}

.dx-card__link {
  margin-top: 4px;
  font-size: 0.9rem;
  color: var(--color-primary);
  color: var(--color-primary);
  font-weight: 500;
}

/* 业务范围CTA按钮区域 */
.services-cta {
  margin-top: 2rem;
  text-align: center;
}

.btn-test-globe {
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem 2rem;
  background: linear-gradient(135deg, #6a11cb 0%, #2575fc 100%);
  color: white;
  border: none;
  border-radius: 50px;
  font-weight: 600;
  font-size: 1.1rem;
  text-decoration: none;
  transition: all 0.3s ease;
  box-shadow: 0 8px 25px rgba(106, 17, 203, 0.3);
  position: relative;
  overflow: hidden;
}

.btn-test-globe:hover {
  transform: translateY(-3px);
  box-shadow: 0 12px 35px rgba(106, 17, 203, 0.4);
  background: linear-gradient(135deg, #2575fc 0%, #6a11cb 100%);
}

.btn-test-globe::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
  transition: left 0.5s ease;
}

.btn-test-globe:hover::before {
  left: 100%;
}

.btn-icon {
  font-size: 1.5rem;
  animation: rotate 3s linear infinite;
}

.btn-text {
  letter-spacing: 1px;
}

.btn-badge {
  background: #ff4757;
  color: white;
  font-size: 0.7rem;
  font-weight: bold;
  padding: 0.2rem 0.5rem;
  border-radius: 10px;
  animation: pulse 2s infinite;
}

@keyframes rotate {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

@keyframes pulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.1); }
}

/* 响应式调整 */
@media (max-width: 768px) {
  .cta-buttons {
    flex-direction: column;
    align-items: center;
    gap: 1rem;
  }
  
  .btn-test-globe {
    padding: 0.8rem 1.5rem;
    font-size: 1rem;
  }
}

/* 工程案例区域 */
.cases-section {
  background: white; /* 纯白色背景 */
}

.stats {
  display: flex;
  gap: 2rem;
  margin: 2rem 0;
}

.stat-item {
  text-align: center;
}

.stat-number {
  display: block;
  font-size: 2.5rem;
  font-weight: 700;
  color: var(--color-industry);
  line-height: 1;
}

.stat-label {
  font-size: 0.875rem;
  color: var(--color-text-secondary);
  text-transform: uppercase;
  letter-spacing: 1px;
}

/* 联系我们区域 */
.contact-section {
  background: linear-gradient(135deg, var(--color-industry) 0%, #086a8c 100%);
  color: white;
}

.contact-section .section-title,
.contact-section .section-description {
  color: white;
}

.contact-section .section-eyebrow {
  color: rgba(255, 255, 255, 0.8);
}

.contact-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3rem;
}

.contact-info {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  width: 100%;
  max-width: 800px;
}

.contact-item {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
}

.contact-icon {
  font-size: 1.5rem;
  min-width: 40px;
}

.contact-item h4 {
  margin: 0 0 0.5rem 0;
  font-size: 1.125rem;
  font-weight: 600;
}

.contact-item p {
  margin: 0;
  opacity: 0.9;
}

.btn-large {
  padding: 1.25rem 3rem;
  font-size: 1.125rem;
}

/* 动画效果 */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeInLeft {
  from {
    opacity: 0;
    transform: translateX(-30px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes fadeInRight {
  from {
    opacity: 0;
    transform: translateX(30px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes bounce {
  0%, 20%, 50%, 80%, 100% {
    transform: translateX(-50%) translateY(0);
  }
  40% {
    transform: translateX(-50%) translateY(-10px);
  }
  60% {
    transform: translateX(-50%) translateY(-5px);
  }
}

@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}

/* 响应式设计 */
@media (max-width: 768px) {
  .section-content {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
  
  .section-content.reverse {
    direction: ltr;
  }
  
  .hero-buttons {
    flex-direction: column;
  }
  
  .stats {
    flex-direction: column;
    gap: 1rem;
  }
  
  .services-grid {
    grid-template-columns: 1fr;
  }
  
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
  
  .contact-info {
    grid-template-columns: 1fr;
  }
  
  /* 视频区域移动端调整 */
  .video-container {
    width: calc(100% - 40px); /* 移动端减少边距 */
    height: calc(100vh - 80px);
    margin: 40px auto;
    border-radius: 12px;
  }
  
  .video-content {
    padding: 1.5rem 1.5rem 1.5rem 50px; /* 移动端左边距调整 */
    justify-content: center; /* 移动端居中对齐 */
    text-align: center;
  }
  

  
  .video-text {
    max-width: 100%;
    padding: 0;
  }
  
  .video-stats {
    justify-content: center; /* 移动端居中 */
    gap: 1.5rem;
  }
  
  .video-stats {
    gap: 2rem;
  }
  
  .video-stat .stat-number {
    font-size: 2rem;
  }
  
  /* 移动端调整指示器和箭头位置 */
  .hero-indicators {
    bottom: 100px;
  }
  
  .scroll-down {
    bottom: 20px;
  }
}

/* 小屏幕设备进一步调整 */
@media (max-width: 480px) {
  .hero-indicators {
    bottom: 80px;
  }
  
  .scroll-down {
    bottom: 15px;
  }
  
  .scroll-text {
    font-size: 0.75rem;
  }
  
  .scroll-arrow {
    font-size: 1.25rem;
  }
}
</style>
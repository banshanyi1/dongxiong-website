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

    <!-- 第二屏：关于我们 -->
    <section class="section about-section" ref="aboutSection">
      <div class="container">
        <div class="section-content">
          <div class="section-text">
            <span class="section-eyebrow">关于我们</span>
            <h2 class="section-title">专注大气环保与有色金属冶炼</h2>
            <p class="section-description">
              东雄环保致力于提供全产业链的环保解决方案，从技术研发到工程实施，
              为客户提供专业的大气污染治理和有色金属冶炼环保服务。
            </p>
            <ul class="features-list">
              <li>
                <span class="feature-icon">✓</span>
                <span class="feature-text">专业的技术团队</span>
              </li>
              <li>
                <span class="feature-icon">✓</span>
                <span class="feature-text">丰富的项目经验</span>
              </li>
              <li>
                <span class="feature-icon">✓</span>
                <span class="feature-text">完善的售后服务</span>
              </li>
            </ul>
            <RouterLink to="/about" class="btn btn-primary">了解更多</RouterLink>
          </div>
          <div class="section-image">
            <img :src="aboutImage" alt="关于我们">
          </div>
        </div>
      </div>
    </section>

    <!-- 第三屏：业务范围 -->
    <section class="section services-section" ref="servicesSection">
      <div class="container">
        <div class="section-header text-center">
          <span class="section-eyebrow">业务范围</span>
          <h2 class="section-title">核心业务板块</h2>
          <p class="section-description">
            覆盖大气治理、冶炼环保、工程咨询、设备运维等全方位服务
          </p>
        </div>
        <div class="services-wrapper">
          <div class="services-grid">
            <!-- 左侧大模块 -->
            <div class="service-item large">
              <div class="service-card first">
                <div class="service-card-icon">{{ services[0].icon }}</div>
                <h3 class="service-card-title">{{ services[0].title }}</h3>
                <p class="service-card-desc">{{ services[0].description }}</p>
              </div>
            </div>
            
            <!-- 右侧上方模块 -->
            <div class="service-item small top">
              <div class="service-card second">
                <div class="service-card-icon">{{ services[1].icon }}</div>
                <h3 class="service-card-title">{{ services[1].title }}</h3>
                <p class="service-card-desc">{{ services[1].description }}</p>
              </div>
            </div>
            
            <!-- 右侧下方模块 -->
            <div class="service-item small bottom">
              <div class="service-card third">
                <div class="service-card-icon">{{ services[2].icon }}</div>
                <h3 class="service-card-title">{{ services[2].title }}</h3>
                <p class="service-card-desc">{{ services[2].description }}</p>
              </div>
            </div>
          </div>
        </div>
        <div class="services-cta">
          <div class="cta-buttons">
            <RouterLink to="/services" class="btn btn-primary">查看详情</RouterLink>
            <RouterLink to="/about-test" class="btn btn-test-globe">
              <span class="btn-icon">🌍</span>
              <span class="btn-text">3D地球展示</span>
              <span class="btn-badge">NEW</span>
            </RouterLink>
          </div>
        </div>
      </div>
    </section>

    <!-- 第四屏：工程案例 -->
    <section class="section cases-section" ref="casesSection">
      <div class="container">
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
      <div class="container">
        <div class="section-header text-center">
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
import heroSlide3 from '../../public/hero-slide-3.jpg'

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
    icon: '🏭', 
    title: '技术工程', 
    description: '冶金固、危废处理的技术咨询、设计、工程建设'
  },
  { 
    icon: '🌫️', 
    title: '环保设备', 
    description: '除尘、脱硫脱硝设备及滤料配件系统解决方案'
  },
  { 
    icon: '📦', 
    title: '输送装备', 
    description: '气力输送装置、刮板输送机及配套系统集成'
  }
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

// 生命周期钩子
onMounted(() => {
  startAutoPlay()
})

onUnmounted(() => {
  stopAutoPlay()
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

.text-center {
  text-align: center;
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
  background: rgb(250, 250, 252);
}

.services-wrapper {
  display: flex;
  justify-content: center;
  margin: 3rem 0;
}

.services-grid {
  display: grid;
  grid-template-columns: 1.5fr 1.5fr;
  grid-template-rows: 1fr 1fr;
  gap: 1.5rem;
  max-width: 1200px;
  width: 100%;
}

.service-item {
  position: relative;
}

.service-item.large {
  grid-row: 1 / 3;
}

.service-item.small.top {
  grid-column: 2;
  grid-row: 1;
}

.service-item.small.bottom {
  grid-column: 2;
  grid-row: 2;
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

/* 业务范围CTA按钮区域 */
.services-cta {
  margin-top: 2rem;
  text-align: center;
}

.cta-buttons {
  display: flex;
  justify-content: center;
  gap: 1.5rem;
  flex-wrap: wrap;
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
  background: rgb(245, 245, 247);
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
  
  .contact-info {
    grid-template-columns: 1fr;
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

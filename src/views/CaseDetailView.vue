<template>
  <div class="case-detail-page">
    <!-- 背景微动颗粒 + 光晕 -->
    <div class="background-effects"></div>
    
    <!-- 主要内容 -->
    <div class="content">
      <!-- 面包屑导航 -->
      <div class="breadcrumb">
        <router-link to="/">首页</router-link> / 
        <router-link to="/cases">工程案例</router-link> / 山东日照
      </div>

      <!-- 顶部标题区 -->
      <section class="section hero-section">
        <h1 class="hero-title">山东日照钢铁烟尘资源化项目</h1>
        <p class="hero-sub">国内首套逆流漂洗脱氯工艺标杆项目</p>
      </section>

      <!-- 核心数据展示区 -->
      <section class="section stats-section">
        <h2 class="section-title">项目核心数据</h2>
        <div class="card-grid">
          <div 
            v-for="(stat, index) in statsData" 
            :key="index" 
            class="stat-card"
            :style="{ animationDelay: `${index * 0.1}s` }"
          >
            <div class="stat-number">
              <span ref="numberRefs" :data-target="stat.number.replace(/,/g, '')">
                {{ stat.number }}
              </span>
            </div>
            <div class="stat-label">{{ stat.label }}</div>
            <div class="stat-desc">{{ stat.desc }}</div>
          </div>
        </div>
      </section>

      <!-- 项目照片展示区 -->
      <section class="section photos-section">
        <h2 class="section-title">项目实拍</h2>
        <div class="photo-carousel-container">
          <button class="carousel-btn prev-btn" @click="scrollPhotos('prev')">
            <i class="fas fa-chevron-left"></i>
          </button>
          
          <div class="photo-carousel-wrapper">
            <div 
              class="photo-carousel" 
              ref="carouselRef"
              :style="{ transform: `translateX(${scrollPosition}px)` }"
            >
              <div 
                v-for="(photo, index) in photoData" 
                :key="index" 
                class="photo-item"
                :class="[
                  photo.orientation === 'landscape' ? 'landscape' : 'portrait',
                  `photo-frame${(index % 6) + 1}`
                ]"
              >
                <div 
                  class="photo-frame" 
                  :style="{ backgroundImage: `url(${photo.image})` }"
                >
                  <!-- 对角线遮罩层 -->
                  <div class="diagonal-overlay">
                    <div class="overlay-content">
                      <h3 class="photo-title">{{ photo.caption }}</h3>
                      <p class="photo-desc">{{ photo.description || '项目现场实拍照片' }}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <button class="carousel-btn next-btn" @click="scrollPhotos('next')">
            <i class="fas fa-chevron-right"></i>
          </button>
        </div>
      </section>

      <!-- 技术亮点展示区 -->
      <section class="section tech-section">
        <div class="split-layout">
          <div class="split-left">
            <div class="eyebrow">技术突破</div>
            <h2 class="tech-title">攻克高氯原料难题</h2>
            <p class="tech-description">采用自主研发的逆流漂洗脱氯工艺，在有限空间内实现高效脱氯，解决了传统工艺无法处理高氯原料的行业难题。</p>
          </div>
          <div class="split-right">
            <div class="tech-icon">
              <i class="fas fa-recycle"></i>
            </div>
          </div>
        </div>
      </section>

      <!-- 客户评价区 -->
      <section class="section testimonial-section">
        <div class="testimonial">
          <p class="testimonial-quote">"解决了我们多年积存的危废难题。"</p>
          <p class="testimonial-author">—— 日照钢铁集团</p>
        </div>
      </section>

      <!-- 底部导航 -->
      <section class="section navigation-section">
        <div class="bottom-nav">
          <router-link to="/cases/rizhao-previous" class="btn btn-outline">
            <i class="fas fa-arrow-left"></i>
            上一个项目
          </router-link>
          <router-link to="/cases" class="btn btn-primary">
            <i class="fas fa-th-large"></i>
            返回所有案例
          </router-link>
          <router-link to="/cases/rizhao-next" class="btn btn-outline">
            下一个项目
            <i class="fas fa-arrow-right"></i>
          </router-link>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, nextTick } from 'vue'

// 核心数据
const statsData = ref([
  { number: '50,000', label: '年处理量', desc: '年处理钢铁烟尘5万吨' },
  { number: '99.5%', label: '氧化锌品位', desc: '产品纯度达99.5%以上' },
  { number: '35', label: 'SO₂排放', desc: '优于国家超低排放标准 (mg/m³)' }
])

// 照片数据 - 支持横竖向混合展示，添加测试图片和描述
const photoData = ref([
  { caption: '回转窑主体', orientation: 'portrait', image: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=600&h=800&fit=crop', description: '核心处理设备' },
  { caption: '中央控制室', orientation: 'landscape', image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=600&fit=crop', description: '智能化监控中心' },
  { caption: '成品氧化锌堆场', orientation: 'portrait', image: 'https://images.unsplash.com/photo-1567767292278-a4f21aa2d36e?w=600&h=800&fit=crop', description: '产品存储区域' },
  { caption: '除尘设备', orientation: 'landscape', image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&h=600&fit=crop', description: '环保处理设施' },
  { caption: '化验分析室', orientation: 'portrait', image: 'https://images.unsplash.com/photo-1581092921461-8227d51bf9b1?w=600&h=800&fit=crop', description: '质量检测实验室' },
  { caption: '原料储存区', orientation: 'landscape', image: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=800&h=600&fit=crop', description: '原材料仓储管理' },
  { caption: '废气处理系统', orientation: 'portrait', image: 'https://images.unsplash.com/photo-1567767292278-a4f21aa2d36e?w=600&h=800&fit=crop', description: '尾气净化装置' },
  { caption: '自动化生产线', orientation: 'landscape', image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=600&fit=crop', description: '智能制造流水线' }
])

// 轮播相关
const carouselRef = ref(null)
const scrollPosition = ref(0)
const itemWidth = ref(320) // 每张照片的基础宽度
const gap = ref(24) // 间距

// 数字动画相关
const numberRefs = ref([])

// 数字计数动画函数
const animateNumbers = () => {
  numberRefs.value.forEach(el => {
    const target = parseInt(el.dataset.target)
    const duration = 2000
    const startTime = Date.now()
    
    const updateNumber = () => {
      const elapsed = Date.now() - startTime
      const progress = Math.min(elapsed / duration, 1)
      
      // 缓动函数
      const easeOutQuart = 1 - Math.pow(1 - progress, 4)
      const current = Math.floor(target * easeOutQuart)
      
      // 格式化数字显示
      if (el.textContent.includes('%')) {
        el.textContent = current + '%'
      } else if (target >= 1000) {
        el.textContent = current.toLocaleString() + (target >= 50000 ? '' : target === 35 ? '' : '')
      } else {
        el.textContent = current
      }
      
      if (progress < 1) {
        requestAnimationFrame(updateNumber)
      }
    }
    
    updateNumber()
  })
}

// 照片轮播功能
const scrollPhotos = (direction) => {
  const containerWidth = carouselRef.value?.parentElement?.offsetWidth || 1200
  const visibleCount = Math.floor(containerWidth / (itemWidth.value + gap.value))
  const maxScroll = -(photoData.value.length - visibleCount) * (itemWidth.value + gap.value)
  
  if (direction === 'next') {
    scrollPosition.value = Math.max(scrollPosition.value - (itemWidth.value + gap.value), maxScroll)
  } else {
    scrollPosition.value = Math.min(scrollPosition.value + (itemWidth.value + gap.value), 0)
  }
}

// 组件挂载后执行动画
onMounted(async () => {
  await nextTick()
  // 延迟执行数字动画，等待CSS动画完成
  setTimeout(animateNumbers, 800)
})
</script>

<style scoped>
.case-detail-page {
  background-color: #0A1929;
  color: #FFFFFF;
  font-family: system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', 'Inter', sans-serif;
  line-height: 1.5;
  overflow-x: hidden;
  min-height: 100vh;
}

/* 背景微动颗粒 + 光晕 */
.background-effects {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: 
    radial-gradient(circle at 30% 40%, rgba(0,113,227,0.08) 0%, transparent 40%),
    repeating-radial-gradient(circle at 20% 30%, rgba(255,255,255,0.02) 0px, transparent 1px);
  pointer-events: none;
  z-index: 0;
  animation: slowDrift 40s infinite alternate ease-in-out;
}

@keyframes slowDrift {
  0% { transform: scale(1) translate(0, 0); opacity: 0.7; }
  100% { transform: scale(1.2) translate(-2%, -1%); opacity: 1; }
}

/* 主要内容区 */
.content {
  position: relative;
  z-index: 2;
  max-width: 100%;
  margin: 0 auto;
  padding: 0 20px;
}

/* 区块样式 */
.section {
  min-height: 80vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 5vh 0;
  border-bottom: 1px solid rgba(255,255,255,0.02);
}

.hero-section {
  min-height: 85vh;
  justify-content: flex-end;
  padding-bottom: 15vh;
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;
  padding-left: 50px;
  padding-right: 50px;
}

/* 面包屑导航 */
.breadcrumb {
  color: #A0A0A0;
  font-size: 0.85rem;
  letter-spacing: 0.5px;
  margin-bottom: 2rem;
  opacity: 0;
  animation: fadeInUp 0.8s forwards;
  animation-delay: 0.2s;
}

.breadcrumb a {
  color: #C0C0C0;
  text-decoration: none;
  border-bottom: 1px solid transparent;
  transition: border-color 0.2s;
}

.breadcrumb a:hover {
  border-color: #0071e3;
}

/* 标题样式 - 居中显示，不影响照片宽度 */
.section-title {
  font-size: 2rem;
  color: #FFFFFF;
  font-weight: 700;
  text-align: center;
  margin-bottom: 2rem;
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;
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
  color: #C0C0C0;
  font-weight: 300;
  max-width: 800px;
  opacity: 0;
  animation: fadeInUp 0.8s forwards;
  animation-delay: 0.4s;
  text-align: left;
}

.eyebrow {
  color: #0071e3;
  font-size: 0.9rem;
  text-transform: uppercase;
  letter-spacing: 2px;
  margin-bottom: 1rem;
  font-weight: 400;
  text-align: left;
}

/* 核心数据卡片 */
.card-grid {
  display: flex;
  gap: 30px;
  justify-content: center;
  flex-wrap: wrap;
  margin: 40px 0;
}

.stat-card {
  background: rgba(0,0,0,0.25);
  backdrop-filter: blur(2px);
  border: 1px solid rgba(255,255,255,0.08);
  border-radius: 24px;
  padding: 2.5rem 1.5rem;
  width: 280px;
  text-align: center;
  transition: transform 0.25s ease-out, border-color 0.2s, box-shadow 0.3s;
  box-shadow: 0 10px 20px -10px rgba(0,0,0,0.5);
  opacity: 0;
  transform: translateY(30px);
  animation: slideUpFade 0.7s forwards;
}

.stat-card:hover {
  transform: translateY(-8px);
  border-color: #0071e3;
  box-shadow: 0 30px 40px -15px rgba(0,113,227,0.25);
}

.stat-number {
  font-size: 4rem;
  font-weight: 600;
  color: #0071e3;
  line-height: 1;
  margin-bottom: 0.5rem;
}

.stat-label {
  font-size: 1.2rem;
  color: white;
  margin-bottom: 0.5rem;
}

.stat-desc {
  font-size: 0.95rem;
  color: #B0B0B0;
}

/* 轮播容器 */
.photo-carousel-container {
  position: relative;
  width: 100%;
  max-width: 100%;
  margin: 40px auto;
  display: flex;
  align-items: center;
  gap: 20px;
}

/* 轮播按钮 */
.carousel-btn {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  flex-shrink: 0;
  backdrop-filter: blur(10px);
}

.carousel-btn:hover {
  background: rgba(255, 255, 255, 0.2);
  border-color: rgba(255, 255, 255, 0.4);
  transform: scale(1.1);
}

.carousel-btn i {
  font-size: 1.2rem;
}

/* 轮播包装器 */
.photo-carousel-wrapper {
  flex: 1;
  overflow: hidden;
  border-radius: 20px;
}

/* 轮播轨道 */
.photo-carousel {
  display: flex;
  gap: 24px;
  transition: transform 0.5s cubic-bezier(0.25, 0.1, 0.25, 1);
  will-change: transform;
}

/* 照片项基础样式 */
.photo-item {
  flex: 0 0 auto;
  opacity: 0;
  transform: translateX(-20px);
  animation: slideInPhoto 0.7s forwards;
}

/* 竖向照片 (3:4比例) */
.photo-item.portrait {
  width: 400px;
}

.photo-item.portrait .photo-frame {
  width: 400px;
  height: 533px;
}

/* 横向照片 (4:3比例) */
.photo-item.landscape {
  width: 711px;
}

.photo-item.landscape .photo-frame {
  width: 711px;
  height: 533px;
}

/* 照片框架 */
.photo-frame {
  border-radius: 20px;
  background: #0a1929;
  background-size: cover;
  background-position: center;
  transition: all 0.3s ease;
  box-shadow: 0 15px 25px -8px black;
  position: relative;
  overflow: hidden;
}

/* 对角线遮罩层 - 持续缩小覆盖面积 */
.diagonal-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  /* 使用mask创建三角形遮罩，持续缩小覆盖面积 */
  mask: linear-gradient(
    to bottom right,
    black 0%,
    black 25%,
    transparent 100%
  );
  -webkit-mask: linear-gradient(
    to bottom right,
    black 0%,
    black 25%,
    transparent 100%
  );
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  padding: 20px;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.photo-frame:hover .diagonal-overlay {
  opacity: 1;
}

.overlay-content {
  color: white;
  max-width: 80%;
}

.photo-title {
  font-size: 1.4rem;
  font-weight: 600;
  margin: 0 0 8px 0;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
}

.photo-desc {
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.85);
  margin: 0;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.5);
}

/* 不同照片的背景样式 - 简化为纯色 */
.photo-frame1 { background: #0a1929; }
.photo-frame2 { background: #0a1929; }
.photo-frame3 { background: #0a1929; }
.photo-frame4 { background: #0a1929; }
.photo-frame5 { background: #0a1929; }
.photo-frame6 { background: #0a1929; }

/* 悬停效果 */
.photo-item:hover .photo-frame {
  filter: grayscale(0%) contrast(100%);
  transform: scale(1.02);
  box-shadow: 0 20px 30px -5px #0071e3;
}

/* 照片标题 */
.photo-caption {
  text-align: center;
  font-size: 0.9rem;
  color: #A0A0A0;
  margin-top: 10px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* 原始照片网格样式（保留以防需要） */
.photo-grid {
  display: flex;
  gap: 24px;
  margin: 40px 0;
  flex-wrap: wrap;
}

/* 技术亮点分栏 */
.split-layout {
  display: flex;
  gap: 60px;
  align-items: center;
  margin: 30px 0;
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;
}

.split-left {
  flex: 5;
  opacity: 0;
  transform: translateX(-30px);
  animation: slideInLeft 0.8s forwards;
  padding-left: 50px;
}

.split-right {
  flex: 4;
  display: flex;
  justify-content: center;
  opacity: 0;
  transform: translateX(30px);
  animation: slideInRight 0.8s forwards;
  animation-delay: 0.1s;
}

.tech-title {
  font-size: 2.5rem;
  color: #FFFFFF;
  font-weight: 700;
  letter-spacing: -0.3px;
  margin-bottom: 25px;
  line-height: 1.2;
  text-align: left;
}

.tech-description {
  font-size: 1.1rem;
  color: #C0C0C0;
  line-height: 1.6;
  text-align: left;
}

.tech-icon {
  width: 280px;
  height: 280px;
  background: radial-gradient(circle at 30% 40%, #1e3a6b, #0a1a2f);
  border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid rgba(0,113,227,0.3);
  box-shadow: 0 0 30px rgba(0,113,227,0.2);
  animation: floatShape 6s infinite alternate ease-in-out;
}

.tech-icon i {
  font-size: 5rem;
  color: #0071e3;
  opacity: 0.8;
}

@keyframes floatShape {
  0% { 
    border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%; 
    transform: rotate(0deg); 
  }
  100% { 
    border-radius: 70% 30% 30% 70% / 60% 40% 60% 40%; 
    transform: rotate(5deg); 
  }
}

/* 客户评价 */
.testimonial {
  text-align: center;
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 0;
  opacity: 0;
  transform: scale(0.95);
  animation: fadeScale 0.9s forwards;
}

.testimonial-quote {
  font-size: 1.8rem;
  color: #E0E0E0;
  font-style: italic;
  font-weight: 300;
  line-height: 1.4;
  position: relative;
}

.testimonial-quote::before {
  content: '“';
  font-size: 4rem;
  color: #0071e3;
  opacity: 0.4;
  position: absolute;
  left: -30px;
  top: -20px;
}

.testimonial-author {
  margin-top: 30px;
  font-size: 1rem;
  color: #A0A0A0;
}

/* 底部导航 */
.bottom-nav {
  display: flex;
  gap: 25px;
  justify-content: center;
  padding: 60px 0 80px;
  flex-wrap: wrap;
}

.btn {
  padding: 10px 28px;
  border-radius: 40px;
  font-size: 1rem;
  font-weight: 400;
  text-decoration: none;
  transition: all 0.25s ease;
  cursor: pointer;
  border: 1px solid transparent;
  background: transparent;
  color: white;
  display: inline-flex;
  align-items: center;
  gap: 8px;
}

.btn-outline {
  border: 1px solid rgba(255,255,255,0.3);
  background: transparent;
}

.btn-outline:hover {
  border-color: white;
  background: rgba(255,255,255,0.05);
  transform: scale(1.02);
}

.btn-primary {
  background: #0071e3;
  color: white;
  border: none;
}

.btn-primary:hover {
  background: #0077ed;
  transform: scale(1.02);
  box-shadow: 0 10px 20px -8px #0071e3;
}

/* 动画定义 */
@keyframes fadeInUp {
  0% { opacity: 0; transform: translateY(30px); }
  100% { opacity: 1; transform: translateY(0); }
}

@keyframes slideUpFade {
  0% { opacity: 0; transform: translateY(30px); }
  100% { opacity: 1; transform: translateY(0); }
}

@keyframes slideInPhoto {
  0% { opacity: 0; transform: translateX(-20px); }
  100% { opacity: 1; transform: translateX(0); }
}

@keyframes slideInLeft {
  0% { opacity: 0; transform: translateX(-30px); }
  100% { opacity: 1; transform: translateX(0); }
}

@keyframes slideInRight {
  0% { opacity: 0; transform: translateX(30px); }
  100% { opacity: 1; transform: translateX(0); }
}

@keyframes fadeScale {
  0% { opacity: 0; transform: scale(0.95); }
  100% { opacity: 1; transform: scale(1); }
}

/* 响应式设计 */
@media (max-width: 1000px) {
  .content {
    padding: 0 30px;
  }
  
  .split-layout {
    flex-direction: column;
    gap: 40px;
  }
  
  .hero-title {
    font-size: 3.5rem;
  }
  
  .card-grid {
    gap: 20px;
  }
  
  .stat-card {
    width: 240px;
  }
  
  .photo-carousel-container {
    max-width: 1000px;
    gap: 15px;
    padding: 0;
  }
  
  .carousel-btn {
    width: 35px;
    height: 35px;
  }
  
  .photo-item.portrait {
    width: 340px;
  }
  
  .photo-item.portrait .photo-frame {
    width: 340px;
    height: 453px;
  }
  
  .photo-item.landscape {
    width: 604px;
  }
  
  .photo-item.landscape .photo-frame {
    width: 604px;
    height: 453px;
  }
  
  .tech-title {
    font-size: 2.2rem;
  }
}

@media (max-width: 768px) {
  .content {
    padding: 0 20px;
  }
  
  .hero-title {
    font-size: 2.8rem;
  }
  
  .stat-card {
    width: 100%;
  }
  
  .photo-carousel-container {
    max-width: 800px;
    gap: 12px;
    padding: 0;
  }
  
  .carousel-btn {
    width: 30px;
    height: 30px;
  }
  
  .carousel-btn i {
    font-size: 0.8rem;
  }
  
  .carousel-btn i {
    font-size: 1rem;
  }
  
  .photo-item.portrait {
    width: 280px;
  }
  
  .photo-item.portrait .photo-frame {
    width: 280px;
    height: 373px;
  }
  
  .photo-item.landscape {
    width: 497px;
  }
  
  .photo-item.landscape .photo-frame {
    width: 497px;
    height: 373px;
  }
  
  .bottom-nav {
    gap: 15px;
  }
  
  .btn {
    width: 200px;
    justify-content: center;
  }
}

@media (max-width: 480px) {
  .hero-title {
    font-size: 2rem;
  }
  
  .stat-number {
    font-size: 3rem;
  }
  
  .section-title {
    font-size: 1.6rem;
  }
  
  .tech-title {
    font-size: 1.8rem;
  }
  
  .testimonial-quote {
    font-size: 1.5rem;
  }
}
</style>
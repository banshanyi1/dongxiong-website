<template>
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
          <span class="section-eyebrow">{{ t('home.about.eyebrow') }}</span>
          <h2 class="section-title">{{ t('home.about.title') }}</h2>
          <p class="section-description">
            {{ t('home.about.desc') }}
          </p>
          <div class="video-stats">
            <div class="video-stat">
              <span class="stat-number">500+</span>
              <span class="stat-label">{{ t('home.about.projects') }}</span>
            </div>
            <div class="video-stat">
              <span class="stat-number">15+</span>
              <span class="stat-label">{{ t('home.about.countries') }}</span>
            </div>
            <div class="video-stat">
              <span class="stat-number">30{{ t('home.about.years') }}</span>
              <span class="stat-label">{{ t('home.about.experience') }}</span>
            </div>
          </div>
          <RouterLink to="/about" class="btn btn-primary">{{ t('common.more') }}</RouterLink>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useI18n } from '@/composables/useI18n'
import aboutVideoSrc from '@/assets/videos/about-video.mp4'

const { t } = useI18n()
const aboutVideo = ref(null)
const videoSrc = ref(aboutVideoSrc)

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

onMounted(() => {
  // 设置视频观察器
  if (aboutVideo.value && 'IntersectionObserver' in window) {
    videoObserver = new IntersectionObserver(handleVideoIntersection, {
      threshold: 0.3, // 当30%的视频区域可见时触发
    })
    videoObserver.observe(aboutVideo.value)
  }
})

onUnmounted(() => {
  // 清理视频观察器
  if (videoObserver && aboutVideo.value) {
    videoObserver.unobserve(aboutVideo.value)
    videoObserver = null
  }
})
</script>

<style scoped>
/* 通用区块样式 */
.section {
  min-height: 90vh;
  display: flex;
  align-items: center;
  padding: 4rem 0;
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
  z-index: 1; /* 地球背景在最底层 */
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
  z-index: 3; /* 文字内容在白色遮罩层之上 */
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-start; /* 改为左对齐 */
  text-align: left; /* 文字左对齐 */
  color: white;
  padding: 2rem 2rem 2rem 50px; /* 减少左边距到50px */
}

/* 覆盖视频区标题与描述为白色系 */
.video-content .section-title {
  color: #ffffff;
}
.video-content .section-description {
  color: rgba(255, 255, 255, 0.9);
}

/* 全新蒙版：从左到右白色渐变 */
.video-container::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    90deg,
    white 0%,
    rgba(255, 255, 255, 0.95) 10%,
    rgba(255, 255, 255, 0.9) 20%,
    rgba(255, 255, 255, 0.8) 30%,
    rgba(255, 255, 255, 0.6) 40%,
    rgba(255, 255, 255, 0.4) 50%,
    rgba(255, 255, 255, 0.2) 60%,
    rgba(255, 255, 255, 0) 70%
  );
  z-index: 2; /* 白色遮罩层在地球背景之上 */
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
  background: white;
  color: var(--color-industry);
  border-color: white;
}

.btn-primary:hover {
  background: rgba(255, 255, 255, 0.9);
  color: var(--color-industry);
  transform: translateY(-2px);
  box-shadow: 0 10px 25px rgba(10, 126, 164, 0.3);
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

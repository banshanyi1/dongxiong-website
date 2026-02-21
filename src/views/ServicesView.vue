<template>
  <div class="page-view">
    <section class="page-hero">
      <div class="page-hero-bg" style="background-image: url(https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=1920&q=80)"></div>
      <div class="page-hero-overlay"></div>
      <div class="container page-hero-inner">
        <h1 class="page-hero-title">业务范围</h1>
        <p class="page-hero-lead">覆盖大气环保与有色金属冶炼全产业链关键环节</p>
      </div>
    </section>
    <section class="page-body">
      <div class="container container--wide">
        <p class="page-eyebrow">核心业务</p>
        <h2 class="section-title">四大业务板块</h2>
        <p class="section-lead page-intro">
          为客户提供合规、高效、可持续的解决方案。
        </p>
        <div class="services-grid">
          <article 
            v-for="(card, index) in cards" 
            :key="card.title" 
            class="service-card"
            :class="{ 'active': activeCardIndex === index }"
            @click="openDetail(index)"
          >
            <div class="service-card-icon">{{ card.icon }}</div>
            <h3 class="service-card-title">{{ card.title }}</h3>
            <p class="service-card-desc">{{ card.desc }}</p>
            <span class="service-card-link">点击查看详情 →</span>
          </article>
        </div>
      </div>
    </section>
    
    <!-- 侧滑详情面板 -->
    <div v-if="activeCardIndex !== null" class="service-detail-wrapper">
      <Transition name="slide">
        <div class="service-detail-overlay" @click="closeDetail">
          <div class="service-detail-panel" @click.stop>
            <button class="detail-close-btn" @click="closeDetail">×</button>
            <div class="detail-content">
              <div class="detail-header">
                <div class="detail-icon">{{ cards[activeCardIndex]?.icon }}</div>
                <h2 class="detail-title">{{ cards[activeCardIndex]?.title }}</h2>
              </div>
              <div class="detail-body">
                <p class="detail-description">{{ cards[activeCardIndex]?.fullDesc }}</p>
                <div class="detail-features" v-if="cards[activeCardIndex]?.features">
                  <h3>核心优势</h3>
                  <ul>
                    <li v-for="feature in cards[activeCardIndex].features" :key="feature">
                      {{ feature }}
                    </li>
                  </ul>
                </div>
                <div class="detail-process" v-if="cards[activeCardIndex]?.process">
                  <h3>服务流程</h3>
                  <ol>
                    <li v-for="step in cards[activeCardIndex].process" :key="step">
                      {{ step }}
                    </li>
                  </ol>
                </div>
              </div>
              <div class="detail-footer">
                <RouterLink to="/contact" class="btn btn-primary">立即咨询</RouterLink>
              </div>
            </div>
          </div>
        </div>
      </Transition>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const activeCardIndex = ref(null)

const cards = [
  { 
    icon: '🌫️', 
    title: '大气污染治理', 
    desc: '烟气脱硫脱硝、除尘、VOCs 治理等工程设计、设备与运维服务。',
    fullDesc: '我们专注于工业大气污染治理领域，提供从技术咨询、工程设计到设备制造、安装调试及运维服务的全链条解决方案。',
    features: [
      '先进的脱硫脱硝一体化技术',
      '高效的除尘设备与工艺',
      'VOCs综合治理方案',
      '24小时远程运维监控'
    ],
    process: [
      '现场勘查与需求分析',
      '技术方案设计与评审',
      '设备采购与制造',
      '施工安装与调试',
      '验收交付与运维'
    ]
  },
  { 
    icon: '⚙️', 
    title: '有色金属冶炼环保', 
    desc: '铜、铝、铅、锌等冶炼环节的环保工艺设计、装备与技术改造。',
    fullDesc: '针对有色金属冶炼行业的特殊环保需求，我们提供定制化的环保解决方案，涵盖冶炼烟气治理、固废处理、水资源循环利用等关键环节。',
    features: [
      '冶炼烟气深度净化技术',
      '重金属污染物控制',
      '余热回收与能源利用',
      '智能化控制系统'
    ],
    process: [
      '工艺诊断与评估',
      '环保技术方案制定',
      '核心设备集成',
      '系统优化调试',
      '达标运行保障'
    ]
  },
  { 
    icon: '📐', 
    title: '工程设计咨询', 
    desc: '可研、环评配合、初步设计与施工图设计，确保合规与可落地。',
    fullDesc: '我们的工程设计咨询团队拥有丰富的行业经验，为各类环保项目提供从前期可研到施工图设计的全过程技术服务。',
    features: [
      '专业的技术咨询团队',
      '完整的资质认证体系',
      '标准化设计流程',
      '项目全生命周期服务'
    ],
    process: [
      '项目可行性研究',
      '环境影响评价配合',
      '初步设计方案',
      '详细施工图设计',
      '设计交底与服务'
    ]
  },
  { 
    icon: '🔧', 
    title: '设备与运维', 
    desc: '核心环保设备供应、安装调试及长期运营维护与优化。',
    fullDesc: '我们不仅提供优质的核心环保设备，更注重设备的长期稳定运行，通过专业的运维服务确保系统持续高效运转。',
    features: [
      '高品质核心设备制造',
      '专业技术安装团队',
      '预防性维护保养',
      '远程智能监控系统'
    ],
    process: [
      '设备选型与采购',
      '专业安装与调试',
      '操作培训与交接',
      '定期巡检维护',
      '持续优化升级'
    ]
  },
]

function openDetail(index) {
  activeCardIndex.value = index
  // 防止页面滚动
  document.body.style.overflow = 'hidden'
}

function closeDetail() {
  activeCardIndex.value = null
  // 恢复页面滚动
  document.body.style.overflow = ''
}

// 组件卸载时恢复滚动
import { onUnmounted } from 'vue'
onUnmounted(() => {
  document.body.style.overflow = ''
})
</script>

<style scoped>
.page-view { padding-top: 0; }

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

.page-hero-lead { font-size: var(--text-body); opacity: 0.95; }

.page-body { padding: var(--space-section) 0; }

.page-eyebrow {
  font-size: var(--text-small);
  font-weight: var(--font-weight-medium);
  color: var(--color-industry);
  text-transform: uppercase;
  letter-spacing: 0.1em;
  margin-bottom: 0.75rem;
}

.page-intro { margin-bottom: 2rem; }

.services-grid {
  display: grid;
  gap: 1.5rem;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
}

.service-card {
  background: var(--color-bg-alt);
  border-radius: 16px;
  padding: 2rem;
  border: 1px solid var(--color-border);
  transition: all var(--duration-normal) var(--ease-out);
  cursor: pointer;
}

.service-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.06);
  border-color: var(--color-industry);
}

.service-card-icon { font-size: 2rem; margin-bottom: 1rem; }

.service-card-title {
  font-size: var(--text-h3);
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
  color: var(--color-industry);
}

.service-card-link:hover { color: var(--color-accent-hover); }

/* 激活状态卡片样式 */
.service-card.active {
  transform: translateY(-4px);
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.06);
  border-color: var(--color-industry);
}

/* 侧滑详情面板包装器 */
.service-detail-wrapper {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1000;
  pointer-events: none;
}

.service-detail-wrapper > * {
  pointer-events: auto;
}

/* 侧滑详情面板样式 */
.service-detail-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(15px);
  -webkit-backdrop-filter: blur(15px);
  display: flex;
  justify-content: flex-start;
  padding: 20px;
}

.service-detail-panel {
  width: 60%;
  height: calc(100vh - 40px);
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-radius: 16px;
  box-shadow: 15px 20px 60px rgba(0, 0, 0, 0.25);
  border: 1px solid rgba(255, 255, 255, 0.2);
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  margin-right: 20px;
}

.detail-close-btn {
  position: absolute;
  top: 20px;
  right: 20px;
  width: 40px;
  height: 40px;
  border: none;
  background: #f5f5f5;
  border-radius: 50%;
  font-size: 24px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  z-index: 1001;
}

.detail-close-btn:hover {
  background: #e0e0e0;
  transform: rotate(90deg);
}

.detail-content {
  padding: 60px 30px 30px;
  flex: 1;
}

.detail-header {
  text-align: center;
  margin-bottom: 30px;
  padding-bottom: 20px;
  border-bottom: 1px solid #eee;
}

.detail-icon {
  font-size: 3rem;
  margin-bottom: 15px;
}

.detail-title {
  font-size: 2rem;
  font-weight: 600;
  color: var(--color-text);
  margin: 0;
}

.detail-body {
  margin-bottom: 30px;
}

.detail-description {
  font-size: 1.1rem;
  line-height: 1.8;
  color: var(--color-text-secondary);
  margin-bottom: 25px;
}

.detail-features, .detail-process {
  margin-bottom: 25px;
}

.detail-features h3, .detail-process h3 {
  font-size: 1.3rem;
  font-weight: 600;
  color: var(--color-text);
  margin-bottom: 15px;
}

.detail-features ul, .detail-process ol {
  padding-left: 20px;
}

.detail-features li, .detail-process li {
  margin-bottom: 10px;
  line-height: 1.6;
  color: var(--color-text-secondary);
}

.detail-footer {
  text-align: center;
  padding-top: 20px;
  border-top: 1px solid #eee;
}

.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 12px 30px;
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

/* 侧滑动画 */
.slide-enter-active,
.slide-leave-active {
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.slide-enter-from {
  opacity: 0;
}

.slide-enter-from .service-detail-panel {
  transform: translateX(100%);
}

.slide-leave-to {
  opacity: 0;
}

.slide-leave-to .service-detail-panel {
  transform: translateX(100%);
}

/* 响应式设计 */
@media (max-width: 768px) {
  .service-detail-overlay {
    padding: 10px;
  }
  
  .service-detail-panel {
    width: 100%;
    height: calc(100vh - 20px);
    margin-right: 0;
  }
  
  .detail-content {
    padding: 60px 20px 20px;
  }
  
  .detail-title {
    font-size: 1.7rem;
  }
  
  .detail-icon {
    font-size: 2.5rem;
  }
}
</style>

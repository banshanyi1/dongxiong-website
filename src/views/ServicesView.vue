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
          <!-- 顶部大模块 -->
          <div class="services-grid top-card">
            <article 
              :key="cards[0].title" 
              class="service-card first"
              :class="{ 'active': activeCardIndex === 0 }"
              @click="openDetail(0)"
            >
              <div class="service-card-icon">{{ cards[0].icon }}</div>
              <h3 class="service-card-title">{{ cards[0].title }}</h3>
              <p class="service-card-desc">{{ cards[0].desc }}</p>
              <span class="service-card-link">点击查看详情 →</span>
            </article>
          </div>
          
          <!-- 底部两个小模块 -->
          <div class="services-grid bottom-cards">
            <article 
              v-for="(card, index) in cards.slice(1)" 
              :key="card.title" 
              :class="[
                'service-card',
                index === 0 ? 'second' : 'third',
                { 'active': activeCardIndex === index + 1 }
              ]"
              @click="openDetail(index + 1)"
            >
              <div class="service-card-icon">{{ card.icon }}</div>
              <h3 class="service-card-title">{{ card.title }}</h3>
              <p class="service-card-desc">{{ card.desc }}</p>
              <span class="service-card-link">点击查看详情 →</span>
            </article>
          </div>
        </div>
      </div>
    </section>
    
    <!-- 侧滑详情面板 -->
    <Teleport to="body">
      <div class="service-detail-container" v-if="activeCardIndex !== null">
        <Transition name="slide-fade">
          <div class="service-detail-backdrop" @click="closeDetail"></div>
        </Transition>
        <Transition name="slide-panel">
          <div 
            v-if="activeCardIndex !== null"
            :class="[
              'service-detail-panel',
              activeCardIndex === 1 ? 'metals' : '',
              activeCardIndex === 2 ? 'equipment' : ''
            ]" 
            @click.stop
          >
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
        </Transition>
      </div>
    </Teleport>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const activeCardIndex = ref(null)


const cards = [
  { 
    icon: '🏭', 
    title: '技术工程', 
    desc: '冶金固、危废处理的技术咨询、设计、工程建设',
    fullDesc: '我们专注于冶金行业固废与危废资源化利用领域，提供从技术咨询、工艺设计到工程总包、运营支持的全流程专业化服务。',
    background: '/service-bg-new.png',
    features: [
      '冶金尘泥资源化利用技术',
      '危废无害化处置与稳定化工艺',
      '固废高值化转化解决方案',
      '全流程环境风险控制体系'
    ],
    process: [
      '物料成分检测与可行性分析',
      '工艺路线设计与优化',
      '工程总包与施工管理',
      '系统调试与投产支持',
      '运行维护与技改服务'
    ]
  },
  { 
  icon: '🌫️', 
  title: '环保设备', 
  desc: '除尘、脱硫脱硝设备及滤料配件系统解决方案',
  fullDesc: '我们提供覆盖烟气治理全过程的环保设备与耗材，从核心过滤材料到成套净化装备，满足各类工业场景的排放控制需求。',
  background: '/service-bg-equipment.png',
  features: [
    '高效除尘设备（袋式/电袋复合）',
    '脱硫脱硝一体化装置',
    '耐高温滤料（P84、美塔斯、氟美斯）',
    '滤筒、PPS、亚克力等全系配件'
  ],
  process: [
    '工况参数采集与分析',
    '滤料选型与匹配设计',
    '设备制造与集成',
    '现场安装与调试',
    '耗材更换与运维支持'
  ]
},
  { 
  icon: '📦', 
  title: '输送装备', 
  desc: '气力输送装置、刮板输送机及配套系统集成',
  fullDesc: '我们提供高效可靠的散料输送装备与系统解决方案，专注于冶金、环保等行业粉粒状物料的密闭输送、转运与储存。',
  background: '/service-bg-conveying.png',
  features: [
    '气力输送系统（正压/负压）',
    '刮板输送机系列产品',
    '斗式提升机与皮带输送机',
    '自动化控制与配套附件'
  ],
  process: [
    '物料特性分析',
    '输送工艺方案设计',
    '设备选型与制造',
    '现场安装调试',
    '运行维护与升级'
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

.page-body { 
  padding: var(--space-section) 0; 
  background: var(--color-bg-section);
}

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
  grid-template-columns: 1fr;
  grid-template-areas: 
    "top"
    "bottom";
}

.services-grid.top-card {
  grid-area: top;
  grid-column: 1;
}

.services-grid.bottom-cards {
  grid-area: bottom;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
}

.service-card {
  background: var(--color-bg-card);
  border-radius: 16px;
  padding: 2rem;
  border: 1px solid var(--color-border);
  transition: all var(--duration-normal) var(--ease-out);
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.service-card.first {
  padding: 3rem;
  min-height: 200px;
  background: var(--color-bg-alt) url('/service-bg-new.png');
  background-size: 60%;
  background-position: right center;
  background-repeat: no-repeat;
  border: 1px solid #d0d0d0;
}

.service-card.second {
  background: white url('/service-bg-metals-new.png');
  background-size: 50%;
  background-position: right center;
  background-repeat: no-repeat;
  border: 1px solid #e0e0e0;
}

.service-card.third {
  background: white url('/service-bg-equipment.png');
  background-size: 50%;
  background-position: right center;
  background-repeat: no-repeat;
  border: 1px solid #e0e0e0;
}

.service-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 15px 50px rgba(0, 0, 0, 0.12);
  border-color: var(--color-industry);
}

.service-card-icon { font-size: 2rem; margin-bottom: 1rem; }

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

.service-card-link:hover { color: var(--color-primary-hover); }

/* 激活状态卡片样式 */
.service-card.active {
  transform: translateY(-4px);
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.06);
  border-color: var(--color-primary);
}

/* 侧滑详情面板容器 */
.service-detail-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 1000;
}

/* 背景遮罩 */
.service-detail-backdrop {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(15px);
  -webkit-backdrop-filter: blur(15px);
}

/* 侧滑详情面板样式 */
.service-detail-panel {
  position: absolute;
  top: 0;
  left: 0;
  width: 60%;
  height: 100vh;
  background: 
    linear-gradient(
      to right, 
      rgba(255, 255, 255, 0.95) 0%, 
      rgba(255, 255, 255, 0.85) 15%, 
      rgba(255, 255, 255, 0.7) 30%, 
      rgba(255, 255, 255, 0.4) 50%, 
      rgba(255, 255, 255, 0.15) 70%, 
      transparent 85%
    ), 
    url('/service-bg-new.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  border-radius: 0 16px 16px 0;
  box-shadow: 15px 0 60px rgba(0, 0, 0, 0.25);
  border: 1px solid rgba(255, 255, 255, 0.3);
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  padding: 20px;
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
}

.service-detail-panel.metals {
  background: linear-gradient(to right, rgba(255, 255, 255, 0.9) 0%, rgba(255, 255, 255, 0.2) 30%, rgba(255, 255, 255, 0.05) 60%, transparent 80%), url('/service-bg-metals-new.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

.service-detail-panel.equipment {
  background: linear-gradient(to right, rgba(255, 255, 255, 0.9) 0%, rgba(255, 255, 255, 0.2) 30%, rgba(255, 255, 255, 0.05) 60%, transparent 80%), url('/service-bg-equipment.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
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
  padding: 30px 30px 30px;
  flex: 1;
  background: rgba(255, 255, 255, 0.65);
  backdrop-filter: blur(1px);
  -webkit-backdrop-filter: blur(1px);
}

.detail-header {
  text-align: center;
  margin-bottom: 30px;
  padding-bottom: 20px;
  border-bottom: 1px solid #eee;
  background: rgba(255, 255, 255, 0.95);
  border-radius: 12px;
  padding: 20px;
  margin: -20px -20px 30px -20px;
  backdrop-filter: blur(0.2px);
  -webkit-backdrop-filter: blur(0.2px);
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
  background: var(--color-primary);
  color: white;
}

.btn-primary:hover {
  background: var(--color-primary-hover);
  transform: translateY(-2px);
  box-shadow: 0 10px 25px rgba(0, 113, 227, 0.3);
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

/* 侧滑面板动画 */
.slide-panel-enter-active,
.slide-panel-leave-active {
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.slide-panel-enter-from,
.slide-panel-leave-to {
  transform: translateX(-100%);
  opacity: 0;
}

.slide-panel-enter-to,
.slide-panel-leave-from {
  transform: translateX(0);
  opacity: 1;
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

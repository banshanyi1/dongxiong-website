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
      <div class="container-full">
        <p class="page-eyebrow">核心业务</p>
        <h2 class="section-title">四大业务板块</h2>
        <p class="section-lead page-intro">
          为客户提供合规、高效、可持续的解决方案。
        </p>
        <div class="dx-card-grid">
          <article 
            v-for="(card, index) in cards" 
            :key="card.title" 
            class="dx-card"
            @click="openDetail(index)"
          >
            <div class="dx-card__media-wrap">
              <div class="dx-card__media">
                <img
                  class="dx-card__img"
                  :src="card.background"
                  :alt="card.title"
                  @error="console.log('图片加载失败:', card.background)"
                  @load="console.log('图片加载成功:', card.background)"
                />
              </div>
            </div>
            <div class="dx-card__body">
              <h3 class="dx-card__title">{{ card.title }}</h3>
              <p class="dx-card__desc">{{ card.desc }}</p>
              <span class="dx-card__link">点击查看详情 →</span>
            </div>
          </article>
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
            class="service-detail-panel"
            :style="getPanelStyle()"
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
import { ref, nextTick, onUnmounted } from 'vue'

const activeCardIndex = ref(null)

const cards = [
  { 
    icon: '📐', 
    title: '工程设计咨询', 
    desc: '可研与设计',
    fullDesc: '我们提供从项目可行性研究、工艺设计到详细工程设计的全流程咨询服务，确保项目技术可行性和经济合理性。',
    background: '/dongxiong-website/service-design.jpg',
    features: [
      '项目可行性研究报告编制',
      '工艺流程设计与优化',
      '设备选型与配置方案',
      '投资估算与经济分析'
    ],
    process: [
      '项目需求调研与分析',
      '技术方案设计',
      '图纸绘制与审核',
      '设计交底与现场服务'
    ]
  },
  { 
    icon: '🔥', 
    title: '有色金属冶炼', 
    desc: '先进系统工艺技术',
    fullDesc: '我们拥有成熟的有色金属冶炼工艺技术，专注于锌、铜、铅等有色金属的提取与精炼，提供高效节能的冶炼解决方案。',
    background: '/dongxiong-website/service-metals.jpg',
    features: [
      '氧压浸出提锌工艺',
      '电积锌技术',
      '铜铅分离与提取',
      '稀贵金属回收'
    ],
    process: [
      '原料预处理',
      '浸出与净化',
      '电解沉积',
      '产品精制与包装'
    ]
  },
  { 
    icon: '🌫️', 
    title: '大气污染治理', 
    desc: '脱硫脱硝、除尘、VOCs',
    fullDesc: '我们提供覆盖烟气治理全过程的环保设备与技术，从核心过滤材料到成套净化装备，满足各类工业场景的排放控制需求。',
    background: '/dongxiong-website/service-environment.jpg',
    features: [
      '高效除尘设备（袋式/电袋复合）',
      '脱硫脱硝一体化装置',
      'VOCs治理技术',
      '在线监测与智能控制系统'
    ],
    process: [
      '工况参数采集与分析',
      '治理方案设计',
      '设备制造与集成',
      '现场安装与调试'
    ]
  },
  { 
    icon: '🔧', 
    title: '设备与运维', 
    desc: '设备与运维服务',
    fullDesc: '我们提供全面的设备维护保养和运营管理服务，确保环保设施长期稳定高效运行，为客户创造最大价值。',
    background: '/dongxiong-website/service-maintenance.jpg',
    features: [
      '定期巡检与预防性维护',
      '故障诊断与应急抢修',
      '备品备件供应',
      '运行优化与技术改造'
    ],
    process: [
      '设备状态监测',
      '维护计划制定',
      '现场检修作业',
      '运行数据分析'
    ]
  }
]

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
  if (activeCardIndex.value === null) return {}
  const card = cards[activeCardIndex.value]
  if (!card?.background) return {}
  
  return {
    backgroundImage: `linear-gradient(to bottom, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.85) 30%, rgba(255,255,255,0.7) 60%, transparent 100%), url(${card.background})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat'
  }
}

// 组件卸载时恢复滚动
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
  min-width: 336px;
  width: calc(35vw - 2.8rem);
  height: calc(46.67vw - 2.8rem);
  max-width: 392px;
  max-height: 522px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.service-card.first {
  padding: 2rem;
  background: var(--color-bg-alt) url('/service-bg-design.png');
  background-size: 80%;
  background-position: center bottom;
  background-repeat: no-repeat;
  border: 1px solid #d0d0d0;
  flex: 1;
  min-width: 336px;
  width: calc(35vw - 2.8rem);
  height: calc(46.67vw - 2.8rem);
  max-width: 392px;
  max-height: 522px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.service-card.second {
  background: white url('/service-bg-metals-new.png');
  background-size: 80%;
  background-position: center bottom;
  background-repeat: no-repeat;
  border: 1px solid #e0e0e0;
  flex: 1;
  min-width: 336px;
  width: calc(35vw - 2.8rem);
  height: calc(46.67vw - 2.8rem);
  max-width: 392px;
  max-height: 522px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.service-card.third {
  background: white url('/service-bg-equipment.png');
  background-size: 80%;
  background-position: center bottom;
  background-repeat: no-repeat;
  border: 1px solid #e0e0e0;
  flex: 1;
  min-width: 336px;
  width: calc(35vw - 2.8rem);
  height: calc(46.67vw - 2.8rem);
  max-width: 392px;
  max-height: 522px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.service-card.fourth {
  background: white url('/service-bg-operation.png');
  background-size: 80%;
  background-position: center bottom;
  background-repeat: no-repeat;
  border: 1px solid #e0e0e0;
  flex: 1;
  min-width: 336px;
  width: calc(35vw - 2.8rem);
  height: calc(46.67vw - 2.8rem);
  max-width: 392px;
  max-height: 522px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
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

.service-card-link:hover { color: var(--color-primary-hover); }

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
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(15px);
  -webkit-backdrop-filter: blur(15px);
}

/* 弹出详情面板样式 */
.service-detail-panel {
  position: relative;
  width: 80%;
  max-width: 1000px;
  max-height: 90vh;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  border-radius: 16px;
  box-shadow: 0 25px 100px rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(255, 255, 255, 0.3);
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  padding: 20px;
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  margin: 0 auto;
  /* 确保动画初始状态 */
  will-change: transform, opacity;
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

/* 弹出面板动画 - 标准实现 */
.slide-panel-enter-active,
.slide-panel-leave-active {
  transition: all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
  transform-origin: bottom center;
}

.slide-panel-enter-from,
.slide-panel-leave-to {
  transform: translateY(100%) scale(0.8);
  opacity: 0;
}

.slide-panel-enter-to,
.slide-panel-leave-from {
  transform: translateY(0) scale(1);
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
  
  .service-detail-overlay {
    padding: 10px;
  }
  
  .service-detail-panel {
    width: 95%;
    max-height: 95vh;
    margin: 0 auto;
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

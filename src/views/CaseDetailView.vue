<template>
  <div class="page-view">
    <section class="page-hero">
      <div class="page-hero-bg" :style="{ backgroundImage: `url(${caseDetail?.image || defaultImage})` }"></div>
      <div class="page-hero-overlay"></div>
      <div class="container page-hero-inner">
        <span class="case-tag">{{ caseDetail?.tag || '项目案例' }}</span>
        <h1 class="page-hero-title">{{ caseDetail?.title || '项目详情' }}</h1>
        <p class="page-hero-lead">{{ caseDetail?.subtitle || '专业环保解决方案' }}</p>
      </div>
    </section>
    
    <section class="page-body">
      <div class="container">
        <div class="case-detail-content">
          <!-- 项目概览 -->
          <div class="case-overview">
            <h2 class="section-title">项目概览</h2>
            <div class="overview-grid">
              <div class="overview-item">
                <h3>项目类型</h3>
                <p>{{ caseDetail?.type || '未指定' }}</p>
              </div>
              <div class="overview-item">
                <h3>项目规模</h3>
                <p>{{ caseDetail?.scale || '未指定' }}</p>
              </div>
              <div class="overview-item">
                <h3>完成时间</h3>
                <p>{{ caseDetail?.completionDate || '未指定' }}</p>
              </div>
              <div class="overview-item">
                <h3>项目地点</h3>
                <p>{{ caseDetail?.location || '未指定' }}</p>
              </div>
            </div>
          </div>

          <!-- 项目描述 -->
          <div class="case-description">
            <h2 class="section-title">项目描述</h2>
            <p class="description-text">{{ caseDetail?.description || '暂无详细描述' }}</p>
          </div>

          <!-- 技术方案 -->
          <div class="case-solution">
            <h2 class="section-title">技术方案</h2>
            <div class="solution-content">
              <p>{{ caseDetail?.solution || '采用先进的环保技术解决方案' }}</p>
              <ul class="tech-list" v-if="caseDetail?.technologies">
                <li v-for="tech in caseDetail.technologies" :key="tech">{{ tech }}</li>
              </ul>
            </div>
          </div>

          <!-- 项目成果 -->
          <div class="case-results">
            <h2 class="section-title">项目成果</h2>
            <div class="results-grid">
              <div v-for="result in caseDetail?.results || defaultResults" :key="result.metric" class="result-item">
                <span class="result-value">{{ result.value }}</span>
                <span class="result-metric">{{ result.metric }}</span>
                <span class="result-desc">{{ result.description }}</span>
              </div>
            </div>
          </div>

          <!-- 项目图片 -->
          <div class="case-gallery" v-if="caseDetail?.gallery?.length">
            <h2 class="section-title">项目现场</h2>
            <div class="gallery-grid">
              <div 
                v-for="(image, index) in caseDetail.gallery" 
                :key="index" 
                class="gallery-item"
                :style="{ backgroundImage: `url(${image})` }"
              ></div>
            </div>
          </div>
        </div>

        <!-- 返回按钮 -->
        <div class="back-section">
          <RouterLink to="/cases" class="btn btn-outline">← 返回案例列表</RouterLink>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const caseId = computed(() => route.params.id)

// 默认图片
const defaultImage = 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=1920&q=80'

// 默认成果数据
const defaultResults = [
  { value: '95%', metric: '减排效率', description: '污染物减排效果显著' },
  { value: '24h', metric: '稳定运行', description: '系统全年稳定运行' },
  { value: '0', metric: '故障率', description: '零故障稳定运行' }
]

// 案例数据（实际项目中应该从API获取）
const caseData = {
  '1': {
    id: '1',
    tag: '冶金行业',
    title: '某铜冶炼企业烟气脱硫脱硝项目',
    subtitle: '年产XX万吨铜冶炼配套烟气综合治理',
    image: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=1920&q=80',
    type: '烟气综合治理',
    scale: '年产XX万吨',
    completionDate: '2023年6月',
    location: '江苏省苏州市',
    description: '该项目针对铜冶炼过程中产生的SO₂、NOₓ等污染物，采用先进的氨法脱硫和SCR脱硝技术，实现了烟气的超低排放。项目包含一套完整的烟气处理系统，日处理烟气量达50万立方米。',
    solution: '采用氨法脱硫+SCR脱硝一体化技术，配套布袋除尘器，实现SO₂、NOₓ、粉尘的协同治理。',
    technologies: ['氨法脱硫技术', 'SCR选择性催化还原', '布袋除尘', 'DCS自动化控制'],
    results: [
      { value: '98%', metric: '脱硫效率', description: 'SO₂排放浓度<35mg/m³' },
      { value: '90%', metric: '脱硝效率', description: 'NOₓ排放浓度<50mg/m³' },
      { value: '99%', metric: '除尘效率', description: '粉尘排放浓度<10mg/m³' }
    ],
    gallery: [
      'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=800&q=80',
      'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=800&q=80',
      'https://images.unsplash.com/photo-1567767292278-a4f21aa2d36e?w=800&q=80'
    ]
  },
  '2': {
    id: '2',
    tag: '工业大气',
    title: '某工业园区集中供热脱硝除尘项目',
    subtitle: '多台锅炉烟气脱硝、除尘改造与运维',
    image: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=1920&q=80',
    type: '锅炉烟气治理',
    scale: '3台75t/h锅炉',
    completionDate: '2023年3月',
    location: '山东省青岛市',
    description: '为园区内3台75吨/小时燃煤锅炉实施烟气脱硝和除尘改造，采用SNCR+SCR联合脱硝工艺和电袋复合除尘技术，满足超低排放要求。',
    solution: 'SNCR+SCR联合脱硝工艺，出口NOₓ浓度控制在50mg/m³以下；电袋复合除尘器，出口粉尘浓度控制在5mg/m³以下。',
    technologies: ['SNCR脱硝技术', 'SCR选择性催化还原', '电袋复合除尘', '在线监控系统'],
    results: [
      { value: '85%', metric: '脱硝效率', description: 'NOₓ排放浓度<50mg/m³' },
      { value: '99.5%', metric: '除尘效率', description: '粉尘排放浓度<5mg/m³' },
      { value: '99%', metric: '运行稳定性', description: '系统运行稳定可靠' }
    ],
    gallery: [
      'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=800&q=80',
      'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=800&q=80'
    ]
  },
  '3': {
    id: '3',
    tag: '冶金行业',
    title: '某铝业环保升级改造项目',
    subtitle: '电解铝烟气净化与无组织排放治理',
    image: 'https://images.unsplash.com/photo-1567767292278-a4f21aa2d36e?w=1920&q=80',
    type: '电解铝环保改造',
    scale: '年产30万吨电解铝',
    completionDate: '2022年12月',
    location: '河南省郑州市',
    description: '针对电解铝生产过程中的氟化物、沥青烟、粉尘等污染物，实施全面的环保升级改造，包括烟气净化系统、无组织排放控制等。',
    solution: '采用氧化铝吸附+布袋除尘+活性炭吸附组合工艺，有效去除氟化物、沥青烟等有害物质。',
    technologies: ['氧化铝吸附', '布袋除尘', '活性炭吸附', '负压收集系统'],
    results: [
      { value: '99%', metric: '氟化物去除率', description: '氟化物排放浓度达标' },
      { value: '95%', metric: '沥青烟去除率', description: '沥青烟得到有效治理' },
      { value: '99.9%', metric: '粉尘捕集率', description: '车间环境明显改善' }
    ],
    gallery: [
      'https://images.unsplash.com/photo-1567767292278-a4f21aa2d36e?w=800&q=80',
      'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=800&q=80'
    ]
  }
}

const caseDetail = computed(() => caseData[caseId.value] || null)
</script>

<style scoped>
.page-view { padding-top: 0; }

.page-hero {
  position: relative;
  height: 60vh;
  min-height: 400px;
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
  background: linear-gradient(180deg, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.6) 100%);
}

.page-hero-inner {
  position: relative;
  z-index: 1;
  text-align: center;
  color: #fff;
  max-width: 800px;
}

.case-tag {
  display: inline-block;
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--color-industry);
  background: rgba(255,255,255,0.1);
  padding: 0.25rem 1rem;
  border-radius: 20px;
  margin-bottom: 1rem;
  backdrop-filter: blur(10px);
}

.page-hero-title {
  font-size: clamp(2rem, 5vw, 3rem);
  font-weight: 600;
  margin-bottom: 1rem;
  line-height: 1.2;
}

.page-hero-lead {
  font-size: 1.25rem;
  opacity: 0.9;
  margin-bottom: 0;
}

.page-body { padding: 4rem 0; }

.case-detail-content {
  max-width: 1000px;
  margin: 0 auto;
}

.section-title {
  font-size: 2rem;
  font-weight: 600;
  margin-bottom: 2rem;
  text-align: center;
  color: var(--color-text);
}

/* 项目概览 */
.overview-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;
}

.overview-item {
  text-align: center;
  padding: 1.5rem;
  background: var(--color-bg);
  border-radius: 12px;
  border: 1px solid var(--color-border);
}

.overview-item h3 {
  font-size: 0.875rem;
  color: var(--color-text-secondary);
  margin-bottom: 0.5rem;
  font-weight: 500;
}

.overview-item p {
  font-size: 1.125rem;
  font-weight: 600;
  color: var(--color-text);
}

/* 项目描述 */
.case-description {
  margin-bottom: 3rem;
}

.description-text {
  font-size: 1.125rem;
  line-height: 1.8;
  color: var(--color-text-secondary);
  max-width: 800px;
  margin: 0 auto;
}

/* 技术方案 */
.case-solution {
  margin-bottom: 3rem;
}

.solution-content p {
  font-size: 1.125rem;
  line-height: 1.8;
  color: var(--color-text-secondary);
  margin-bottom: 1.5rem;
}

.tech-list {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  list-style: none;
}

.tech-list li {
  background: var(--color-primary-light);
  color: var(--color-primary);
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.875rem;
  font-weight: 500;
  border: 1px solid var(--color-border);
}

/* 项目成果 */
.results-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
}

.result-item {
  text-align: center;
  padding: 2rem;
  background: var(--gradient-subtle);
  border-radius: 16px;
  border: 1px solid var(--color-border);
}

.result-value {
  display: block;
  font-size: 2.5rem;
  font-weight: 700;
  color: var(--color-industry);
  line-height: 1;
  margin-bottom: 0.5rem;
}

.result-metric {
  display: block;
  font-size: 1rem;
  font-weight: 600;
  color: var(--color-text);
  margin-bottom: 0.5rem;
}

.result-desc {
  font-size: 0.875rem;
  color: var(--color-text-secondary);
}

/* 项目图片 */
.case-gallery {
  margin-bottom: 3rem;
}

.gallery-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
}

.gallery-item {
  height: 250px;
  background-size: cover;
  background-position: center;
  border-radius: 12px;
  box-shadow: 0 8px 24px rgba(0,0,0,0.1);
  transition: transform 0.3s ease;
}

.gallery-item:hover {
  transform: scale(1.05);
}

/* 返回按钮 */
.back-section {
  text-align: center;
  margin-top: 3rem;
  padding-top: 2rem;
  border-top: 1px solid var(--color-border);
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

.btn-outline {
  background: transparent;
  color: var(--color-primary);
  border-color: var(--color-primary);
}

.btn-outline:hover {
  background: var(--color-primary);
  color: white;
  transform: translateY(-2px);
}

/* 响应式设计 */
@media (max-width: 768px) {
  .page-hero {
    height: 50vh;
  }
  
  .overview-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
  }
  
  .results-grid {
    grid-template-columns: 1fr;
  }
  
  .gallery-grid {
    grid-template-columns: 1fr;
  }
  
  .tech-list {
    justify-content: center;
  }
}

@media (max-width: 480px) {
  .overview-grid {
    grid-template-columns: 1fr;
  }
  
  .result-value {
    font-size: 2rem;
  }
}
</style>
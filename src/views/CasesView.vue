<!-- 
  ========================================
  工程案例列表页面
  功能：展示公司所有工程案例，支持点击查看详情
  路由：/cases
  ========================================
-->

<template>
  <div class="page-view">
    <!-- 页面顶部英雄区域（全屏背景图 + 标题） -->
    <section class="page-hero">
      <!-- 背景图片 -->
      <div
        class="page-hero-bg"
        style="
          background-image: url(https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1920&q=80);
        "
      ></div>
      <!-- 遮罩层（让文字更清晰） -->
      <div class="page-hero-overlay"></div>
      <!-- 标题内容容器 -->
      <div class="container page-hero-inner">
        <h1 class="page-hero-title">{{ t('cases.heroTitle') }}</h1>
        <p class="page-hero-lead">{{ t('cases.heroLead') }}</p>
      </div>
    </section>

    <!-- 页面主体内容区域 -->
    <section class="page-body">
      <div class="container container--wide">
        <!-- 章节标题区域 -->
        <div class="section-header text-center">
          <p class="page-eyebrow">{{ t('cases.eyebrow') }}</p>
          <h2 class="section-title">{{ t('cases.title') }}</h2>
          <p class="section-lead">
            {{ t('cases.lead') }}
          </p>
        </div>

        <!-- 案例卡片容器 -->
        <div class="cases-container">
          <!-- 案例卡片（循环渲染） -->
          <article
            v-for="(caseItem, index) in cases"
            :key="caseItem.id"
            class="case-card"
            :class="{ even: index % 2 === 1 }"
            @click="handleCardClick(caseItem.id)"
          >
            <div class="case-content">
              <!-- 左侧：案例图片区域 -->
              <div class="case-image-section">
                <div
                  class="case-image"
                  :style="{ backgroundImage: `url(${caseItem.image})` }"
                ></div>
              </div>

              <!-- 右侧：案例信息区域 -->
              <div class="case-info-section">
                <!-- 案例分类标签 -->
                <span class="case-category">{{ t(caseItem.tagKey) }}</span>
                <!-- 案例标题 -->
                <h3 class="case-title">{{ t(caseItem.titleKey) }}</h3>
                <!-- 案例描述 -->
                <p class="case-description">{{ t(caseItem.descKey) }}</p>
                <!-- 了解更多按钮 -->
                <div class="case-action">
                  <span class="case-link">{{ t('cases.knowMore') }} →</span>
                </div>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
// 导入 Vue 3 核心功能
import { ref, onMounted } from 'vue'
// 导入路由功能，用于页面跳转
import { useRouter } from 'vue-router'

// 导入国际化组合式函数
import { useI18n } from '../composables/useI18n'
// 导入图片工具函数，用于解析图片路径
import { caseImages } from '../utils/images'
// 导入案例数据 API
import { casesApi } from '../api/cases'

// 初始化工具
const router = useRouter()
const { t } = useI18n()

/**
 * 处理卡片点击事件
 * @param {string} id - 案例 ID
 * 跳转到案例详情页 /cases/:id
 */
const handleCardClick = id => {
  router.push(`/cases/${id}`)
}

// 案例数据列表（响应式）
const cases = ref([])

/**
 * 解析图片路径的工具函数
 * 支持点号分隔的路径，如 'case1.h1'
 * @param {string} key - 图片键名
 * @returns {string} 图片 URL
 */
const resolveImage = key => {
  return key.split('.').reduce((acc, k) => (acc ? acc[k] : undefined), caseImages) || ''
}

// 本地备用数据（当 API 请求失败时使用）
const localFallback = [
  {
    id: '1',
    tagKey: 'cases.metallurgy',
    titleKey: 'caseData.1.title',
    descKey: 'caseData.1.desc',
    imageKey: 'case1.h1',
  },
  {
    id: '5',
    tagKey: 'cases.metalRecycle',
    titleKey: 'caseData.5.title',
    descKey: 'caseData.5.desc',
    imageKey: 'case5.automationControl',
  },
  {
    id: '2',
    tagKey: 'cases.nonferrousSmelt',
    titleKey: 'caseData.2.title',
    descKey: 'caseData.2.desc',
    imageKey: 'case2.controlRoom',
  },
  {
    id: '3',
    tagKey: 'cases.hazardousWaste',
    titleKey: 'caseData.3.title',
    descKey: 'caseData.3.desc',
    imageKey: 'case3.panorama',
  },
  {
    id: '4',
    tagKey: 'cases.ecoProtection',
    titleKey: 'caseData.4.title',
    descKey: 'caseData.4.desc',
    imageKey: 'case4.storageArea',
  },
]

/**
 * 组件挂载时执行
 * 1. 从 API 获取案例数据
 * 2. 解析图片路径
 * 3. 如果 API 失败，使用本地备用数据
 */
onMounted(async () => {
  try {
    // 尝试从 API 获取数据
    const data = await casesApi.list()
    const items = data?.items || []

    // 处理数据，解析图片路径
    cases.value = items.map(i => ({
      ...i,
      image: resolveImage(i.imageKey),
    }))

    // 如果没有数据，使用备用数据
    if (!cases.value.length) {
      cases.value = localFallback.map(i => ({ ...i, image: resolveImage(i.imageKey) }))
    }
  } catch {
    // API 请求失败，使用备用数据
    cases.value = localFallback.map(i => ({ ...i, image: resolveImage(i.imageKey) }))
  }
})
</script>

<style scoped>
/* ========================================
   基础布局样式
   ======================================== */

/* 页面视图容器 */
.page-view {
  padding-top: 0;
}

/* 页面主体区域 */
.page-body {
  padding: var(--space-section) 0;
}

/* ========================================
   标题区域样式
   ======================================== */

/* 章节标题容器 */
.section-header {
  margin-bottom: 3rem;
  text-align: center;
}

/* 页眉小标题（眼睛图标上方的文字） */
.page-eyebrow {
  font-size: var(--text-small);
  font-weight: var(--font-weight-medium);
  color: var(--color-industry);
  text-transform: uppercase;
  letter-spacing: 0.1em;
  margin-bottom: 0.75rem;
}

/* 章节引导文字 */
.section-lead {
  margin-bottom: 2rem;
  color: var(--color-text-secondary);
  line-height: 1.6;
}

/* ========================================
   案例容器样式
   ======================================== */

/* 案例列表容器 - 垂直排列 */
.cases-container {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

/* ========================================
   案例卡片基础样式
   ======================================== */

/* 单个案例卡片 */
.case-card {
  width: 100%;
  height: 70vh;
  min-height: 500px;
  background: white;
  border-radius: 16px;
  overflow: hidden;
  border: 1px solid #e0e0e0;
  transition: all 0.3s ease;
  cursor: pointer;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  position: relative;
}

/* 偶数卡片背景色（实现交替效果） */
.case-card.even {
  background: #f8f9fa;
}

/* 卡片悬停效果 */
.case-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
  border-color: var(--color-primary);
}

/* 卡片点击效果 */
.case-card:active {
  transform: translateY(-4px);
}

/* ========================================
   卡片内容布局
   ======================================== */

/* 卡片内容容器 - 左右布局 */
.case-content {
  display: flex;
  height: 100%;
  width: 100%;
  align-items: stretch;
}

/* ========================================
   图片区域样式
   ======================================== */

/* 左侧图片容器 */
.case-image-section {
  flex: 1;
  height: 100%;
  min-width: 50%;
  position: relative;
  overflow: hidden;
}

/* 背景图片 */
.case-image {
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
  background-color: var(--color-bg-subtle);
  transition: transform 0.3s ease;
}

/* 卡片悬停时图片放大效果 */
.case-card:hover .case-image {
  transform: scale(1.05);
}

/* ========================================
   信息区域样式
   ======================================== */

/* 右侧信息容器 */
.case-info-section {
  flex: 1;
  padding: 3rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background: inherit;
}

/* ========================================
   文本样式
   ======================================== */

/* 案例分类标签 */
.case-category {
  display: inline-block;
  font-size: 0.875rem;
  font-weight: var(--font-weight-medium);
  color: var(--color-primary);
  text-transform: uppercase;
  letter-spacing: 0.1em;
  margin-bottom: 1.5rem;
  background: var(--color-primary-light);
  padding: 0.5rem 1.25rem;
  border-radius: 20px;
  align-self: flex-start;
}

/* 案例标题 */
.case-title {
  font-size: 2rem;
  font-weight: var(--font-weight-semibold);
  margin-bottom: 1.5rem;
  color: var(--color-text);
  line-height: 1.3;
}

/* 案例描述 */
.case-description {
  font-size: 1.125rem;
  color: var(--color-text-secondary);
  line-height: 1.7;
  margin-bottom: 2rem;
}

/* ========================================
   操作按钮样式
   ======================================== */

/* 操作按钮容器 */
.case-action {
  margin-top: auto;
}

/* 了解更多链接 */
.case-link {
  font-size: 1.125rem;
  font-weight: var(--font-weight-medium);
  color: var(--color-primary);
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.3s ease;
}

/* 链接悬停效果 */
.case-link:hover {
  color: var(--color-primary-hover);
  transform: translateX(8px);
}

/* ========================================
   响应式设计
   ======================================== */

/* 平板设备（小于 992px） */
@media (max-width: 992px) {
  .case-card {
    height: 60vh;
    min-height: 400px;
  }

  .case-content {
    flex-direction: column;
  }

  .case-image-section {
    height: 40%;
    min-width: 100%;
  }

  .case-info-section {
    height: 60%;
    padding: 2rem;
  }

  .case-title {
    font-size: 1.75rem;
  }
}

/* 手机设备（小于 768px） */
@media (max-width: 768px) {
  .case-card {
    height: 80vh;
    min-height: 350px;
  }

  .case-info-section {
    padding: 1.5rem;
  }

  .case-title {
    font-size: 1.5rem;
  }

  .case-description {
    font-size: 1rem;
  }

  .case-category {
    margin-bottom: 1rem;
  }
}

/* 英雄区域样式 */
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
  background: linear-gradient(180deg, rgba(0, 0, 0, 0.3) 0%, rgba(0, 0, 0, 0.5) 100%);
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

.page-hero-lead {
  font-size: var(--text-body);
  opacity: 0.95;
}
</style>

<!-- 
  ========================================
  地球滚动动画测试页面
  功能：使用 wheel 事件 + GSAP 动画复现 AboutView 的地球逻辑
  技术栈：Vue 3 + Globe.gl + GSAP
  ========================================
-->

<template>
  <div class="test-page-container">
    <!-- 顶部导航栏 -->
    <SiteHeader />

    <!-- 地球可视化区域（固定在页面上方） -->
    <div
      ref="globeDiv"
      class="globe-viz"
      :class="{
        'globe-right': !isLoading && !showEarthCenter,
        'globe-center': showEarthCenter || isLoading,
      }"
    ></div>

    <!-- 内容区域（整个页面可滚动） -->
    <div class="content-wrapper">
      <!-- 固定内容区域（前 6 屏 - 使用动画切换） -->
      <div class="fixed-sections">
        <!-- 第一屏：公司介绍 -->
        <SectionCard
          :section-index="0"
          :visible="currentSection === 0"
          type="company"
          :title="t('common.logo')"
          :description="t('about.subtitle')"
          :tags="[t('about.tag1'), t('about.tag2'), t('about.tag3')]"
          :stats="[
            { number: '20+', label: t('about.statCountries') },
            { number: '30+', label: t('about.statProvinces') },
            { number: '500+', label: t('about.statProjects') },
          ]"
          hint="↓ 滚动鼠标查看更多 ↓"
        />

        <!-- 第二屏：亚洲 -->
        <SectionCard
          :section-index="1"
          :visible="currentSection === 1"
          type="countries"
          :title="t('about.asiaTitle')"
          :description="t('about.asiaDesc')"
          :countries="asiaCountries"
          :highlighted-countries="highlightedCountries"
          :on-country-click="toggleCountryHighlight"
        />

        <!-- 第三屏：欧洲 -->
        <SectionCard
          :section-index="2"
          :visible="currentSection === 2"
          type="countries"
          :title="t('about.europeTitle')"
          :description="t('about.europeDesc')"
          :countries="europeCountries"
          :highlighted-countries="highlightedCountries"
          :on-country-click="toggleCountryHighlight"
        />

        <!-- 第四屏：非洲 -->
        <SectionCard
          :section-index="3"
          :visible="currentSection === 3"
          type="countries"
          :title="t('about.africaTitle')"
          :description="t('about.africaDesc')"
          :countries="africaCountries"
          :highlighted-countries="highlightedCountries"
          :on-country-click="toggleCountryHighlight"
        />

        <!-- 第五屏：美洲 -->
        <SectionCard
          :section-index="4"
          :visible="currentSection === 4"
          type="countries"
          :title="t('about.americasTitle')"
          :description="t('about.americasDesc')"
          :countries="americasCountries"
          :highlighted-countries="highlightedCountries"
          :on-country-click="toggleCountryHighlight"
        />

        <!-- 第六屏：中国 -->
        <SectionCard
          :section-index="5"
          :visible="currentSection === 5"
          type="countries"
          :title="t('about.chinaTitle')"
          :description="t('about.chinaDesc')"
          :countries="asiaCountries.filter(c => c.code === 'CN')"
          :highlighted-countries="highlightedCountries"
          :on-country-click="toggleCountryHighlight"
        />
      </div>

      <!-- 可滚动内容区块（地球旋转到下方后显示） -->
      <div class="scrollable-content">
        <!-- 第一块：专注领域 -->
        <ContentBlock
          variant="light"
          :keyword="t('about.block1Keyword')"
          :title="t('about.block1Title')"
          :lead="t('about.block1Lead')"
          :cards="[
            {
              icon: t('about.block1Card1Icon'),
              title: t('about.block1Card1Title'),
              text: t('about.block1Card1Text'),
            },
            {
              icon: t('about.block1Card2Icon'),
              title: t('about.block1Card2Title'),
              text: t('about.block1Card2Text'),
            },
            {
              icon: t('about.block1Card3Icon'),
              title: t('about.block1Card3Title'),
              text: t('about.block1Card3Text'),
            },
          ]"
        />

        <!-- 第二块：技术实力 -->
        <ContentBlock
          variant="white"
          :keyword="t('about.block2Keyword')"
          :title="t('about.block2Title')"
          :lead="t('about.block2Lead')"
          :cards="[
            {
              icon: t('about.block2Card1Icon'),
              title: t('about.block2Card1Title'),
              text: t('about.block2Card1Text'),
            },
            {
              icon: t('about.block2Card2Icon'),
              title: t('about.block2Card2Title'),
              text: t('about.block2Card2Text'),
            },
            {
              icon: t('about.block2Card3Icon'),
              title: t('about.block2Card3Title'),
              text: t('about.block2Card3Text'),
            },
          ]"
          card-variant="accent"
        />

        <!-- 第三块：项目与实践 -->
        <ContentBlock
          variant="light"
          :keyword="t('about.block3Keyword')"
          :title="t('about.block3Title')"
          :lead="t('about.block3Lead')"
          :cards="[
            {
              icon: t('about.block3Card1Icon'),
              title: t('about.block3Card1Title'),
              text: t('about.block3Card1Text'),
            },
            {
              icon: t('about.block3Card2Icon'),
              title: t('about.block3Card2Title'),
              text: t('about.block3Card2Text'),
            },
            {
              icon: t('about.block3Card3Icon'),
              title: t('about.block3Card3Title'),
              text: t('about.block3Card3Text'),
            },
          ]"
        />

        <!-- 第四块：省份覆盖 -->
        <ContentBlock
          variant="white"
          :keyword="t('about.block4Keyword')"
          :title="t('about.block4Title')"
          :lead="t('about.block4Lead')"
          :cards="[
            {
              icon: '🏙️',
              title: '北京总部',
              text: '总部位于北京，统筹全国业务布局',
            },
            {
              icon: '🌏',
              title: '全国覆盖',
              text: '服务网络覆盖全国 30 多个省市自治区',
            },
            {
              icon: '⭐',
              title: '重点区域',
              text: '在长三角、珠三角、京津冀等重点区域设有分支机构',
            },
          ]"
          card-variant="primary"
        />
      </div>
    </div>

    <!-- 进度指示器 -->
    <div class="progress-indicator">
      <div
        v-for="i in 6"
        :key="i"
        class="progress-dot"
        :class="{ active: currentSection === i - 1 }"
      ></div>
    </div>
  </div>
</template>

<script setup>
import Globe from 'globe.gl'
import { onMounted, ref, onUnmounted } from 'vue'
import gsap from 'gsap'

import SiteHeader from '../components/SiteHeader.vue'
import SectionCard from '../components/SectionCard.vue'
import ContentBlock from '../components/ContentBlock.vue'
import { useI18n } from '../composables/useI18n'
import { COUNTRIES, GLOBE_VIEWS } from '../utils/constants'

const { t } = useI18n()

// 导入地球背景图
import earthBackground from '../assets/globe/earth-blue-marble.jpg'

// 响应式数据
const globeDiv = ref(null)
const globeInstance = ref(null)
const isLoading = ref(true)
const showEarthCenter = ref(false)
const currentSection = ref(0)
const isAnimating = ref(false)
const highlightedCountries = ref([])

// 国家数据
const asiaCountries = COUNTRIES.asia
const europeCountries = COUNTRIES.europe
const africaCountries = COUNTRIES.africa
const americasCountries = COUNTRIES.americas

// 地球目标视角
const globeTargetViews = GLOBE_VIEWS

/**
 * 初始化地球
 */
const initGlobe = () => {
  if (!globeDiv.value) return

  globeInstance.value = Globe()
    .globeImageUrl(earthBackground)
    .backgroundImageUrl('//unpkg.com/three-globe/example/img/night-sky.png')
    .showAtmosphere(true)
    .atmosphereColor('#3a228a')
    .atmosphereAltitude(0.25)
    .pointOfView(
      globeTargetViews[0],
      0
    )(globeDiv.value)

  // 自动旋转
  globeInstance.value.controls().autoRotate = true
  globeInstance.value.controls().autoRotateSpeed = 0.5

  // 等待地球加载完成
  setTimeout(() => {
    isLoading.value = false
  }, 1000)
}

/**
 * 停止地球旋转
 */
const stopGlobeRotation = () => {
  if (globeInstance.value) {
    globeInstance.value.controls().autoRotate = false
  }
}

/**
 * 更新高亮国家
 */
const updateHighlightedCountries = sectionIndex => {
  const countryMap = {
    1: asiaCountries,
    2: europeCountries,
    3: africaCountries,
    4: americasCountries,
    5: [asiaCountries.find(c => c.code === 'CN')],
  }

  const countries = countryMap[sectionIndex] || []
  highlightedCountries.value = countries.map(c => c.code).filter(Boolean)
}

/**
 * 切换国家高亮
 */
const toggleCountryHighlight = code => {
  const index = highlightedCountries.value.indexOf(code)
  if (index > -1) {
    highlightedCountries.value.splice(index, 1)
  } else {
    highlightedCountries.value.push(code)
  }
}

/**
 * 获取完整英文名称
 */
const getFullEnglishName = code => {
  const allCountries = [
    ...asiaCountries,
    ...europeCountries,
    ...africaCountries,
    ...americasCountries,
  ]
  const country = allCountries.find(c => c.code === code)
  return country ? country.en : code
}

/**
 * 切换到指定章节（使用 GSAP 动画）
 */
const switchToSection = targetSection => {
  if (isAnimating.value || targetSection === currentSection.value) return

  isAnimating.value = true
  const direction = targetSection > currentSection.value ? 'down' : 'up'

  // 1. 更新地球视角（使用 GSAP 平滑过渡）
  if (globeInstance.value) {
    const currentView = globeInstance.value.pointOfView()
    const targetView = globeTargetViews[Math.min(targetSection, globeTargetViews.length - 1)]

    gsap.to(currentView, {
      lat: targetView.lat,
      lng: targetView.lng,
      altitude: targetView.altitude,
      duration: 1.2,
      ease: 'power2.inOut',
      onUpdate: () => {
        if (globeInstance.value) {
          globeInstance.value.pointOfView(currentView)
        }
      },
      onComplete: () => {
        if (targetSection >= 5) {
          stopGlobeRotation()
        }
      },
    })
  }

  // 2. 更新地球位置
  showEarthCenter.value = targetSection > 0

  // 3. 更新高亮国家
  updateHighlightedCountries(targetSection)

  // 4. 更新当前章节
  currentSection.value = targetSection

  // 5. 动画结束后重置标志
  setTimeout(() => {
    isAnimating.value = false
  }, 1200)
}

/**
 * 处理滚轮事件（核心逻辑）
 */
const handleWheel = event => {
  // 如果已经滚动到第 6 屏之后，允许正常滚动
  if (currentSection.value >= 5) {
    return // 不阻止默认行为，让页面正常滚动
  }

  // 阻止默认滚动行为
  event.preventDefault()

  // 如果正在动画中，忽略新的滚动
  if (isAnimating.value) return

  // 判断滚动方向
  const delta = event.deltaY
  const isScrollingDown = delta > 0

  // 计算目标章节
  let targetSection = currentSection.value
  if (isScrollingDown) {
    targetSection = Math.min(5, currentSection.value + 1)
  } else {
    targetSection = Math.max(0, currentSection.value - 1)
  }

  // 切换到目标章节
  switchToSection(targetSection)
}

// 生命周期
onMounted(() => {
  // 初始化地球
  initGlobe()

  // 添加滚轮监听（使用 capture 以便更好地控制）
  window.addEventListener('wheel', handleWheel, { passive: false, capture: true })
})

onUnmounted(() => {
  // 移除滚轮监听
  window.removeEventListener('wheel', handleWheel)

  // 清理地球实例
  if (globeDiv.value) {
    globeDiv.value.innerHTML = ''
  }
})
</script>

<style scoped>
/* 页面容器 */
.test-page-container {
  width: 100%;
  min-height: 100vh;
  position: relative;
}

/* 地球可视化区域（固定在页面上方） */
.globe-viz {
  position: fixed;
  top: 0;
  left: 0;
  width: 50%;
  height: 100vh;
  transition: all 0.8s cubic-bezier(0.645, 0.045, 0.355, 1);
  z-index: 100;
  pointer-events: none;
}

.globe-viz.globe-right {
  width: 50%;
  left: 0;
}

.globe-viz.globe-center {
  width: 100%;
  left: 0;
}

/* 内容区域（整个页面可滚动） */
.content-wrapper {
  width: 100%;
  min-height: 100vh;
  overflow-y: auto;
  overflow-x: hidden;
}

/* 固定内容区域 */
.fixed-sections {
  width: 50%;
  margin-left: 50%;
  position: relative;
  height: 100vh;
  overflow: hidden;
}

/* 可滚动内容区块 */
.scrollable-content {
  width: 50%;
  margin-left: 50%;
  background: linear-gradient(180deg, transparent 0%, #f8f9fa 100%);
  position: relative;
}

/* 进度指示器 */
.progress-indicator {
  position: fixed;
  right: 2rem;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  flex-direction: column;
  gap: 1rem;
  z-index: 10;
}

.progress-dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: #e0e0e0;
  transition: all 0.3s ease;
  cursor: pointer;
}

.progress-dot.active {
  background: #667eea;
  transform: scale(1.3);
}

.progress-dot:hover {
  background: #764ba2;
}
</style>

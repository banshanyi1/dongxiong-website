<template>
  <div class="globe-container" @touchstart="handleTouchStart">
    <!-- 导航栏 -->
    <SiteHeader />
    
    <!-- 加载界面 -->
    <div 
      class="loading-overlay" 
      :class="{ 'loading-visible': isLoading, 'loading-hidden': !isLoading }"
    >
      <div class="loading-content">
        <div class="loading-spinner"></div>
        <h2 class="loading-text">{{ t('about.loading') }}</h2>
        <p class="loading-subtext">{{ t('about.loadingSub') }}</p>
      </div>
    </div>
    
    <!-- 地球可视化区域 -->
    <div ref="globeDiv" class="globe-viz" :class="{ 'globe-right': !isLoading && !showEarthCenter, 'globe-center': showEarthCenter || isLoading }"></div>

    <div class="scroll-wrapper">
      <div class="scroll-content">
        <!-- 第一屏：初始状态 - 左侧公司信息，右侧地球 -->
        <div class="scroll-section section-1 screen-mask" data-section-index="0">
          <div class="content-layout">
            <!-- 左侧公司信息 -->
            <div class="company-info fullscreen-card" :class="{ 'slide-in-left': !isLoading }">
              <h1 class="hero-title animate-in">{{ t('common.logo') }}</h1>
              <div class="hero-subtitle animate-in delay-1">
                <span class="tag">{{ t('about.tag1') }}</span>
                <span class="separator">|</span>
                <span class="tag">{{ t('about.tag2') }}</span>
                <span class="separator">|</span>
                <span class="tag">{{ t('about.tag3') }}</span>
              </div>
              <p class="animate-in delay-1">{{ t('about.subtitle') }}</p>
              
              <div class="global-stats animate-in delay-2">
                <div class="stat-card">
                  <div class="stat-number">20+</div>
                  <div class="stat-label">{{ t('about.statCountries') }}</div>
                </div>
                <div class="stat-card">
                  <div class="stat-number">30+</div>
                  <div class="stat-label">{{ t('about.statProvinces') }}</div>
                </div>
                <div class="stat-card">
                  <div class="stat-number">500+</div>
                  <div class="stat-label">{{ t('about.statProjects') }}</div>
                </div>
              </div>
              
              <div class="scroll-hint animate-in delay-3">{{ t('about.scrollHint') }}</div>
              <div class="scroll-instruction" v-if="!showEarthCenter">{{ t('about.scrollInstruction') }}</div>
            </div>
            
            <!-- 右侧留空给地球 -->
            <div class="earth-placeholder"></div>
          </div>
        </div>

        <!-- 第二屏：亚洲展示 -->
        <div class="scroll-section section-2" data-section-index="1">
          <div class="content-box glass">
            <h2>{{ t('about.asiaTitle') }}</h2>
            <p>{{ t('about.asiaDesc') }}</p>
            <div class="countries-grid">
              <div
                v-for="country in asiaCountries"
                :key="country.code"
                class="country-card"
                :class="{ highlighted: highlightedCountries.includes(country.code) }"
                @click="toggleCountryHighlight(country.code)"
              >
                <div class="country-flag">{{ country.flag }}</div>
                <div class="country-name-cn">{{ country.name }}</div>
                <div class="country-name-en">{{ getFullEnglishName(country.code) }}</div>

              </div>
            </div>
          </div>
        </div>

        <!-- 第三屏：欧洲展示 -->
        <div class="scroll-section section-3" data-section-index="2">
          <div class="content-box glass">
            <h2>{{ t('about.europeTitle') }}</h2>
            <p>{{ t('about.europeDesc') }}</p>
            <div class="countries-grid">
              <div
                v-for="country in europeCountries"
                :key="country.code"
                class="country-card"
                :class="{ highlighted: highlightedCountries.includes(country.code) }"
                @click="toggleCountryHighlight(country.code)"
              >
                <div class="country-flag">{{ country.flag }}</div>
                <div class="country-name-cn">{{ country.name }}</div>
                <div class="country-name-en">{{ getFullEnglishName(country.code) }}</div>

              </div>
            </div>
          </div>
        </div>

        <!-- 第四屏：非洲展示 -->
                <div class="scroll-section section-4" data-section-index="3">
                  <div class="content-box glass">
                    <h2>{{ t('about.africaTitle') }}</h2>
                    <p>{{ t('about.africaDesc') }}</p>
                    <div class="countries-grid">
                      <div
                        v-for="country in africaCountries"
                        :key="country.code"
                        class="country-card"
                        :class="{ highlighted: highlightedCountries.includes(country.code) }"
                        @click="toggleCountryHighlight(country.code)"
                      >
                        <div class="country-flag">{{ country.flag }}</div>
                        <div class="country-name-cn">{{ country.name }}</div>
                        <div class="country-name-en">{{ getFullEnglishName(country.code) }}</div>
        
                      </div>
                    </div>
                  </div>
                </div>
        
                <!-- 第五屏：美洲展示 -->
        <div class="scroll-section section-5" data-section-index="4">
          <div class="content-box glass">
            <h2>{{ t('about.americasTitle') }}</h2>
            <p>{{ t('about.americasDesc') }}</p>
            <div class="countries-grid">
              <div
                v-for="country in americasCountries"
                :key="country.code"
                class="country-card"
                :class="{ highlighted: highlightedCountries.includes(country.code) }"
                @click="toggleCountryHighlight(country.code)"
              >
                <div class="country-flag">{{ country.flag }}</div>
                <div class="country-name-cn">{{ country.name }}</div>
                <div class="country-name-en">{{ getFullEnglishName(country.code) }}</div>

              </div>
            </div>
          </div>
        </div>

        <!-- 第六屏：回归中国 -->
        <div class="scroll-section section-6" data-section-index="5">
          <div class="content-box glass">
            <h2>{{ t('about.chinaTitle') }}</h2>
            <p>{{ t('about.chinaDesc') }}</p>
            <div class="countries-grid">
              <div
                v-for="country in asiaCountries.filter(c => c.code === 'CN')"
                :key="country.code"
                class="country-card"
                :class="{ highlighted: highlightedCountries.includes(country.code) }"
                @click="toggleCountryHighlight(country.code)"
              >
                <div class="country-flag">{{ country.flag }}</div>
                <div class="country-name-cn">{{ country.name }}</div>
                <div class="country-name-en">{{ getFullEnglishName(country.code) }}</div>

              </div>
            </div>
          </div>
        </div>

        <!-- 第六屏：省份展示 -->
        <div class="scroll-section section-6" data-section-index="5">
          <div class="content-box glass">
            <h2>{{ t('about.nationwideTitle') }}</h2>
            <p>{{ t('about.nationwideDesc') }}</p>

            <div class="provinces-scroll-container">
              <!-- 上行：向左滚动 -->
              <div class="scroll-row top-row">
                <div class="infinite-content left-scroll">
                  <div class="province-sequence">
                    <span class="province-item">北京</span>
                    <span class="province-item">上海</span>
                    <span class="province-item colored">河北</span>
                    <span class="province-item">天津</span>
                    <span class="province-item">重庆</span>
                    <span class="province-item colored">河南</span>
                    <span class="province-item">山西</span>
                    <span class="province-item">陕西</span>
                    <span class="province-item colored">内蒙古</span>
                    <span class="province-item">辽宁</span>
                    <span class="province-item">吉林</span>
                    <span class="province-item colored">黑龙江</span>
                    <span class="province-item">江苏</span>
                    <span class="province-item">浙江</span>
                    <span class="province-item colored">安徽</span>
                    <span class="province-item">福建</span>
                    <span class="province-item">江西</span>
                    <span class="province-item colored">山东</span>
                    <span class="province-item">湖北</span>
                    <span class="province-item">湖南</span>
                    <span class="province-item colored">广东</span>
                  </div>
                  <div class="province-sequence">
                    <span class="province-item">北京</span>
                    <span class="province-item">上海</span>
                    <span class="province-item colored">河北</span>
                    <span class="province-item">天津</span>
                    <span class="province-item">重庆</span>
                    <span class="province-item colored">河南</span>
                    <span class="province-item">山西</span>
                    <span class="province-item">陕西</span>
                    <span class="province-item colored">内蒙古</span>
                    <span class="province-item">辽宁</span>
                    <span class="province-item">吉林</span>
                    <span class="province-item colored">黑龙江</span>
                    <span class="province-item">江苏</span>
                    <span class="province-item">浙江</span>
                    <span class="province-item colored">安徽</span>
                    <span class="province-item">福建</span>
                    <span class="province-item">江西</span>
                    <span class="province-item colored">山东</span>
                    <span class="province-item">湖北</span>
                    <span class="province-item">湖南</span>
                    <span class="province-item colored">广东</span>
                  </div>
                </div>
              </div>
              
              <!-- 下行：向右滚动 -->
              <div class="scroll-row bottom-row">
                <div class="infinite-content right-scroll">
                  <div class="province-sequence">
                    <span class="province-item">广西</span>
                    <span class="province-item">海南</span>
                    <span class="province-item colored">四川</span>
                    <span class="province-item">贵州</span>
                    <span class="province-item">云南</span>
                    <span class="province-item colored">西藏</span>
                    <span class="province-item">甘肃</span>
                    <span class="province-item">青海</span>
                    <span class="province-item colored">宁夏</span>
                    <span class="province-item">新疆</span>
                    <span class="province-item">香港</span>
                    <span class="province-item colored">澳门</span>
                    <span class="province-item">台湾</span>
                  </div>
                  <div class="province-sequence">
                    <span class="province-item">广西</span>
                    <span class="province-item">海南</span>
                    <span class="province-item colored">四川</span>
                    <span class="province-item">贵州</span>
                    <span class="province-item">云南</span>
                    <span class="province-item colored">西藏</span>
                    <span class="province-item">甘肃</span>
                    <span class="province-item">青海</span>
                    <span class="province-item colored">宁夏</span>
                    <span class="province-item">新疆</span>
                    <span class="province-item">香港</span>
                    <span class="province-item colored">澳门</span>
                    <span class="province-item">台湾</span>
                  </div>
                </div>
              </div>
            </div>


          </div>
        </div>


        <!-- 关于我们内容区：苹果风格区块 -->
        <!-- 第一块：专注领域 -->
        <section class="about-block about-block--light">
          <div class="about-block__inner">
            <h2 class="about-block__title">
              <span class="about-block__keyword">{{ t('about.block1Keyword') }}</span>，{{ t('about.block1Title') }}
            </h2>
            <p class="about-block__lead">{{ t('about.block1Lead') }}</p>
            <div class="about-block__cards">
              <article class="about-card">
                <div class="about-card__icon-wrap">
                  <span class="about-card__icon" aria-hidden="true">{{ t('about.block1Card1Icon') }}</span>
                </div>
                <h3 class="about-card__title">{{ t('about.block1Card1Title') }}</h3>
                <p class="about-card__text">{{ t('about.block1Card1Text') }}</p>
              </article>
              <article class="about-card">
                <div class="about-card__icon-wrap">
                  <span class="about-card__icon" aria-hidden="true">{{ t('about.block1Card2Icon') }}</span>
                </div>
                <h3 class="about-card__title">{{ t('about.block1Card2Title') }}</h3>
                <p class="about-card__text">{{ t('about.block1Card2Text') }}</p>
              </article>
              <article class="about-card">
                <div class="about-card__icon-wrap">
                  <span class="about-card__icon" aria-hidden="true">{{ t('about.block1Card3Icon') }}</span>
                </div>
                <h3 class="about-card__title">{{ t('about.block1Card3Title') }}</h3>
                <p class="about-card__text">{{ t('about.block1Card3Text') }}</p>
              </article>
            </div>
          </div>
        </section>

        <div class="about-divider" aria-hidden="true"></div>

        <!-- 第二块：技术实力 -->
        <section class="about-block about-block--white">
          <div class="about-block__inner">
            <h2 class="about-block__title">
              <span class="about-block__keyword">{{ t('about.block2Keyword') }}</span>，{{ t('about.block2Title') }}
            </h2>
            <p class="about-block__lead">{{ t('about.block2Lead') }}</p>
            <div class="about-block__cards">
              <article class="about-card">
                <div class="about-card__icon-wrap about-card__icon-wrap--accent">
                  <span class="about-card__icon" aria-hidden="true">{{ t('about.block2Card1Icon') }}</span>
                </div>
                <h3 class="about-card__title">{{ t('about.block2Card1Title') }}</h3>
                <p class="about-card__text">{{ t('about.block2Card1Text') }}</p>
              </article>
              <article class="about-card">
                <div class="about-card__icon-wrap about-card__icon-wrap--accent">
                  <span class="about-card__icon" aria-hidden="true">{{ t('about.block2Card2Icon') }}</span>
                </div>
                <h3 class="about-card__title">{{ t('about.block2Card2Title') }}</h3>
                <p class="about-card__text">{{ t('about.block2Card2Text') }}</p>
              </article>
              <article class="about-card">
                <div class="about-card__icon-wrap about-card__icon-wrap--accent">
                  <span class="about-card__icon" aria-hidden="true">{{ t('about.block2Card3Icon') }}</span>
                </div>
                <h3 class="about-card__title">{{ t('about.block2Card3Title') }}</h3>
                <p class="about-card__text">{{ t('about.block2Card3Text') }}</p>
              </article>
            </div>
          </div>
        </section>

        <div class="about-divider" aria-hidden="true"></div>

        <!-- 第三块：项目与实践 -->
        <section class="about-block about-block--light">
          <div class="about-block__inner">
            <h2 class="about-block__title">
              <span class="about-block__keyword">{{ t('about.block3Keyword') }}</span>，{{ t('about.block3Title') }}
            </h2>
            <p class="about-block__lead">{{ t('about.block3Lead') }}</p>
            <div class="about-block__cards">
              <article class="about-card">
                <div class="about-card__number">{{ t('about.block3Card1Num') }}</div>
                <h3 class="about-card__title">{{ t('about.block3Card1Title') }}</h3>
                <p class="about-card__text">{{ t('about.block3Card1Text') }}</p>
              </article>
              <article class="about-card">
                <div class="about-card__number">{{ t('about.block3Card2Num') }}</div>
                <h3 class="about-card__title">{{ t('about.block3Card2Title') }}</h3>
                <p class="about-card__text">{{ t('about.block3Card2Text') }}</p>
              </article>
              <article class="about-card">
                <div class="about-card__number">{{ t('about.block3Card3Num') }}</div>
                <h3 class="about-card__title">{{ t('about.block3Card3Title') }}</h3>
                <p class="about-card__text">{{ t('about.block3Card3Text') }}</p>
              </article>
            </div>
          </div>
        </section>

        <div class="about-divider" aria-hidden="true"></div>

        <!-- 第四块：价值与承诺 -->
        <section class="about-block about-block--white">
          <div class="about-block__inner">
            <h2 class="about-block__title">
              <span class="about-block__keyword">{{ t('about.block4Keyword') }}</span>，{{ t('about.block4Title') }}
            </h2>
            <p class="about-block__lead">{{ t('about.block4Lead') }}</p>
            <div class="about-block__cards">
              <article class="about-card">
                <div class="about-card__icon-wrap">
                  <span class="about-card__icon" aria-hidden="true">{{ t('about.block4Card1Icon') }}</span>
                </div>
                <h3 class="about-card__title">{{ t('about.block4Card1Title') }}</h3>
                <p class="about-card__text">{{ t('about.block4Card1Text') }}</p>
              </article>
              <article class="about-card">
                <div class="about-card__icon-wrap">
                  <span class="about-card__icon" aria-hidden="true">{{ t('about.block4Card2Icon') }}</span>
                </div>
                <h3 class="about-card__title">{{ t('about.block4Card2Title') }}</h3>
                <p class="about-card__text">{{ t('about.block4Card2Text') }}</p>
              </article>
              <article class="about-card">
                <div class="about-card__icon-wrap">
                  <span class="about-card__icon" aria-hidden="true">{{ t('about.block4Card3Icon') }}</span>
                </div>
                <h3 class="about-card__title">{{ t('about.block4Card3Title') }}</h3>
                <p class="about-card__text">{{ t('about.block4Card3Text') }}</p>
              </article>
            </div>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, onUnmounted, computed } from 'vue'
import Globe from 'globe.gl'
import SiteHeader from '../components/SiteHeader.vue'
import { useI18n } from '../composables/useI18n'

const { t } = useI18n()

// 导入本地地球背景图片
import earthBackground from '../assets/globe/earth-blue-marble.jpg'

const globeDiv = ref(null)
const globeInstance = ref(null)
const isLoading = ref(true)
const chinaCount = ref(8)
const isGlobeRotating = ref(true) // 控制地球是否旋转
const rotationInterval = ref(null) // 旋转定时器
const showEarthCenter = ref(false) // 控制地球是否回到中心
const scrollThreshold = ref(50) // 滚动阈值，降低触发点
const animatedSections = ref(new Set()) // 记录已经触发动画的区块

// 亚洲国家
const asiaCountries = [
  { code: 'CN', name: '中国', flag: '🇨🇳🇹🇼' },
  { code: 'OM', name: '阿曼', flag: '🇴🇲' },
  { code: 'MY', name: '马来西亚', flag: '🇲🇾' },
  { code: 'ID', name: '印度尼西亚', flag: '🇮🇩' },
  { code: 'IN', name: '印度', flag: '🇮🇳' },
  { code: 'VN', name: '越南', flag: '🇻🇳' },
  { code: 'JP', name: '日本', flag: '🇯🇵' },
  { code: 'AE', name: '阿联酋', flag: '🇦🇪' },
  { code: 'SA', name: '沙特阿拉伯', flag: '🇸🇦' },
]

// 欧洲国家
const europeCountries = [
  { code: 'DE', name: '德国', flag: '🇩🇪' },
  { code: 'GB', name: '英国', flag: '🇬🇧' },
  { code: 'RU', name: '俄罗斯', flag: '🇷🇺' },
]

// 非洲国家
const africaCountries = [
  { code: 'ZM', name: '赞比亚', flag: '🇿🇲' },
  { code: 'EG', name: '埃及', flag: '🇪🇬' },
]

// 美洲国家
const americasCountries = [
  { code: 'PE', name: '秘鲁', flag: '🇵🇪' },
]

// 重点省份（用于高亮）
const activeProvinces = [
  { name: '河南省', code: 'HENAN' },
  { name: '云南省', code: 'YUNNAN' },
  { name: '山西省', code: 'SHANXI' },
  { name: '湖南省', code: 'HUNAN' },
  { name: '广西壮族自治区', code: 'GUANGXI' },
  { name: '江西省', code: 'JIANGXI' },
  { name: '安徽省', code: 'ANHUI' },
  { name: '贵州省', code: 'GUIZHOU' },
]

// 省份分列（如需在别处展示，可以使用）
const provincesColumn1 = computed(() => {
  return [
    { code: 'BJ', name: '北京市' },
    { code: 'HE', name: '河北省' },
    { code: 'LN', name: '辽宁省' },
    { code: 'JS', name: '江苏省' },
    { code: 'HA', name: '河南省' },
    { code: 'GD', name: '广东省' },
    { code: 'SC', name: '四川省' },
    { code: 'SN', name: '陕西省' },
    { code: 'XJ', name: '新疆维吾尔自治区' },
    { code: 'HK', name: '香港特别行政区' },
  ]
})

const provincesColumn2 = computed(() => {
  return [
    { code: 'SH', name: '上海市' },
    { code: 'SX', name: '山西省' },
    { code: 'JL', name: '吉林省' },
    { code: 'ZJ', name: '浙江省' },
    { code: 'HB', name: '湖北省' },
    { code: 'GX', name: '广西壮族自治区' },
    { code: 'GZ', name: '贵州省' },
    { code: 'GS', name: '甘肃省' },
    { code: 'TW', name: '台湾省' },
    { code: 'MO', name: '澳门特别行政区' },
  ]
})

const provincesColumn3 = computed(() => {
  return [
    { code: 'TJ', name: '天津市' },
    { code: 'NM', name: '内蒙古自治区' },
    { code: 'HL', name: '黑龙江省' },
    { code: 'AH', name: '安徽省' },
    { code: 'HN', name: '湖南省' },
    { code: 'HI', name: '海南省' },
    { code: 'YN', name: '云南省' },
    { code: 'QH', name: '青海省' },
    { code: 'NX', name: '宁夏回族自治区' },
    { code: 'CQ', name: '重庆市' },
    { code: 'FJ', name: '福建省' },
    { code: 'SD', name: '山东省' },
    { code: 'XZ', name: '西藏自治区' },
  ]
})

// 高亮状态
const highlightedCountries = ref([])
const highlightedProvinces = ref([])

const toggleCountryHighlight = code => {
  if (highlightedCountries.value.includes(code)) {
    highlightedCountries.value = highlightedCountries.value.filter(c => c !== code)
  } else {
    highlightedCountries.value = [...highlightedCountries.value, code]
  }
  if (globeInstance.value) {
    updateMapDisplay(globeInstance.value)
  }
}

const isProvinceHighlighted = code => highlightedProvinces.value.includes(code)

const toggleProvinceHighlight = code => {
  const index = highlightedProvinces.value.indexOf(code)
  if (index > -1) {
    highlightedProvinces.value.splice(index, 1)
  } else {
    highlightedProvinces.value.push(code)
  }
}

// 获取国家英文全称
const getFullEnglishName = (code) => {
  const englishNames = {
    'CN': 'China',
    'OM': 'Oman',
    'MY': 'Malaysia',
    'ID': 'Indonesia',
    'IN': 'India',
    'VN': 'Vietnam',
    'JP': 'Japan',
    'AE': 'United Arab Emirates',
    'SA': 'Saudi Arabia',
    'DE': 'Germany',
    'GB': 'United Kingdom',
    'RU': 'Russia',
    'ZM': 'Zambia',
    'EG': 'Egypt',
    'PE': 'Peru'
  }
  return englishNames[code] || code
}


let cleanupFunction = null
let currentCardIndex = 0
let isAnimating = false

// 地球自旋转函数
const startGlobeRotation = (world) => {
  if (rotationInterval.value) return // 如果已经在旋转则不重复启动
  
  rotationInterval.value = setInterval(() => {
    if (isGlobeRotating.value && world) {
      const currentView = world.pointOfView()
      // 缓慢向西旋转（经度减少）- 符合地球实际自转方向
      const newLng = (currentView.lng - 0.1 + 360) % 360
      world.pointOfView({ ...currentView, lng: newLng }, 0) // 0表示立即更新，无动画
    }
  }, 50) // 每50ms更新一次，营造缓慢旋转效果
}

// 停止地球旋转
const stopGlobeRotation = () => {
  if (rotationInterval.value) {
    clearInterval(rotationInterval.value)
    rotationInterval.value = null
  }
  isGlobeRotating.value = false
}

// 处理触摸开始事件，解决移动端滚动问题
const handleTouchStart = (event) => {
  // 确保滚动容器能够正常响应触摸事件
  const scrollWrapper = document.querySelector('.scroll-wrapper')
  if (scrollWrapper) {
    // 强制启用滚动
    scrollWrapper.style.overflowY = 'auto'
    scrollWrapper.style.webkitOverflowScrolling = 'touch'
    
    // 触发一次滚动事件确保激活
    setTimeout(() => {
      scrollWrapper.scrollTop = scrollWrapper.scrollTop
    }, 100)
  }
  
  // 阻止默认行为可能会干扰滚动，所以不阻止
  // event.preventDefault() 
}

// 地球视角配置：按 section 顺序（0=首屏, 1=亚洲, 2=欧洲, ... 6=省份）
const globeTargetViews = [
  { lat: 35, lng: 105, altitude: 1.2 },  // 0 首屏 & 1 亚洲 - 中国区域
  { lat: 50, lng: 15, altitude: 1.5 },   // 2 欧洲
  { lat: -10, lng: 20, altitude: 1.5 },  // 3 非洲
  { lat: 20, lng: -90, altitude: 1.5 },  // 4 美洲
  { lat: 35, lng: 105, altitude: 1.0 },  // 5 回到中国
  { lat: 35, lng: 105, altitude: 0.7 },  // 6 省份展示
]

// 根据当前滚动位置计算「当前激活的 section」：仅当该 section 已进入视窗上方约 25% 时才切换（延后触发，避免过早）
function getActiveSectionIndex(scrollTop, sectionCount, viewportHeight) {
  // 触发比例：需滚过约 75% 的当前屏，下一屏的顶部在视窗 25% 处时才算进入下一 section
  const triggerRatio = 0.25
  const raw = Math.floor(scrollTop / viewportHeight + triggerRatio)
  return Math.min(Math.max(0, raw), sectionCount - 1)
}

// section 索引 → 地球视角索引（首屏和亚洲共用视角 0）
function sectionToViewIndex(sectionIndex) {
  if (sectionIndex <= 1) return 0
  return Math.min(sectionIndex - 1, globeTargetViews.length - 1)
}

// 统一的滚动处理函数（基于 section 位置，不再用固定像素）
const handleScroll = () => {
  const scrollWrapper = document.querySelector('.scroll-wrapper')
  if (!scrollWrapper) return

  const scrollTop = scrollWrapper.scrollTop
  const viewportHeight = window.innerHeight
  const scrollSections = document.querySelectorAll('.scroll-section')
  const sectionCount = scrollSections.length

  // 控制地球位置
  showEarthCenter.value = scrollTop > scrollThreshold.value

  // 1) 卡片动画：仅当 section 真正进入视窗上方约 30% 时才触发（延后，避免过早出现）
  const cardTriggerRatio = 0.3
  scrollSections.forEach((section, index) => {
    const sectionRect = section.getBoundingClientRect()
    const sectionTop = sectionRect.top

    if (sectionTop < viewportHeight * cardTriggerRatio && sectionTop > -viewportHeight * 0.5) {
      if (!animatedSections.value.has(index)) {
        animatedSections.value.add(index)
        const contentBox = section.querySelector('.content-box')
        if (contentBox) {
          if (index % 2 === 1) {
            contentBox.classList.add('slide-in-right')
          } else if (index > 0) {
            contentBox.classList.add('slide-in-left')
          }
        }
      }
    }
  })

  // 2) 根据 section 位置计算当前激活的 section，再驱动地球视角与高亮
  const activeSectionIndex = getActiveSectionIndex(scrollTop, sectionCount, viewportHeight)
  const viewIndex = sectionToViewIndex(activeSectionIndex)

  if (activeSectionIndex !== currentCardIndex && !isAnimating) {
    currentCardIndex = activeSectionIndex
    isAnimating = true

    if (viewIndex >= 5) {
      stopGlobeRotation()
    }

    if (globeInstance.value) {
      globeInstance.value.pointOfView(globeTargetViews[viewIndex], 800)
      updateHighlightedCountries(activeSectionIndex)
      updateMapDisplay(globeInstance.value)
    }

    setTimeout(() => {
      isAnimating = false
    }, 850)
  }
}

onMounted(() => {
  initGlobe()
  
  // 添加滚动监听，并同步一次当前滚动位置对应的 section/高亮
  const scrollWrapper = document.querySelector('.scroll-wrapper')
  if (scrollWrapper) {
    scrollWrapper.addEventListener('scroll', handleScroll)
    setTimeout(() => handleScroll(), 100)
  }
  
  // 添加加载超时保护
  setTimeout(() => {
    if (isLoading.value) {
      console.log('加载超时，强制显示内容')
      isLoading.value = false
      // 加载完成后默认显示左侧地球
      showEarthCenter.value = false
    }
  }, 3000) // 超时保护
  
  // 页面加载完成后主动激活滚动
  setTimeout(() => {
    if (scrollWrapper) {
      // 确保滚动属性正确设置
      scrollWrapper.style.overflowY = 'auto'
      scrollWrapper.style.webkitOverflowScrolling = 'touch'
      
      // 触发一次微小的滚动来激活滚动机制
      const currentScroll = scrollWrapper.scrollTop
      scrollWrapper.scrollTop = currentScroll + 1
      setTimeout(() => {
        scrollWrapper.scrollTop = currentScroll
      }, 50)
    }
  }, 1500) // 等待1.5秒确保页面完全加载
})

onUnmounted(() => {
  if (cleanupFunction) {
    cleanupFunction()
  }
  stopGlobeRotation() // 清理旋转定时器
  if (globeInstance.value && globeInstance.value._destructor) {
    globeInstance.value._destructor()
  }
  
  // 清理滚动监听
  const scrollWrapper = document.querySelector('.scroll-wrapper')
  if (scrollWrapper) {
    scrollWrapper.removeEventListener('scroll', handleScroll)
  }
})

const initGlobe = () => {
  const world = Globe()(globeDiv.value)
    .globeImageUrl(earthBackground)
    .backgroundColor('#ffffff')
    .width(window.innerWidth)
    .height(window.innerHeight)
    .atmosphereColor('#22d3ee')
    .atmosphereAltitude(0.2)
    .pointOfView({ lat: 35, lng: 105, altitude: 1.2 })

  globeInstance.value = world

  // 启动地球自旋转
  startGlobeRotation(world)

  // 尝试加载在线数据，设置较短超时
  const dataPromise = fetch(
    'https://raw.githubusercontent.com/vasturiano/globe.gl/master/example/datasets/ne_110m_admin_0_countries.geojson',
    { timeout: 3000 } // 3秒超时
  )
    .then(res => {
      if (!res.ok) throw new Error('Network response was not ok')
      return res.json()
    })
    .then(countries => {
      const allFeatures = countries.features || []

      world
        .polygonsData(allFeatures)
        .polygonCapColor(d => {
          const props = d.properties || {}
          const countryCode = props.ISO_A2 || ''
          const countryName = props.NAME_LONG || props.NAME || ''

          if (
            highlightedCountries.value.includes(countryCode) ||
            (highlightedCountries.value.includes('CN') &&
              (countryName.includes('Taiwan') || countryName.includes('China')))
          ) {
            return 'rgba(0, 240, 255, 0.9)'
          }

          return 'rgba(200,200,200, 0.05)'
        })
        .polygonSideColor(() => 'rgba(0,0,0,0)')
        .polygonStrokeColor(() => 'rgba(100,100,100,0.3)')
        .polygonAltitude(() => 0.01)

      setupScrollAnimation(world)
    })
    .catch(error => {
      console.warn('地球数据加载失败，使用默认配置:', error)
      // 数据加载失败时仍继续执行动画
      setupScrollAnimation(world)
    })

  // 设置最大等待时间
  setTimeout(() => {
    if (isLoading.value) {
      console.log('数据加载超时，直接执行动画')
      setupScrollAnimation(world)
    }
  }, 1500)

  window.addEventListener('resize', () => {
    world.width(window.innerWidth)
    world.height(window.innerHeight)
  })
}

const setupScrollAnimation = world => {
  cleanupFunction = initializeAnimationTriggers(world)
  
  // 设置合理的加载时间
  setTimeout(() => {
    isLoading.value = false
    // 加载完成后默认显示左侧地球
    showEarthCenter.value = false
    console.log('加载完成，地球移至左侧')
  }, 500) // 等待0.5秒加载界面消失
  
  return cleanupFunction
}

// 根据高亮状态更新地图
const updateMapDisplay = world => {
  if (!world || !world.polygonsData) return
  const currentData = world.polygonsData()
  if (!currentData || !currentData.length) return

  world
    .polygonCapColor(d => {
      const props = d.properties || {}
      const countryCode = props.ISO_A2 || ''
      const countryName = props.NAME_LONG || props.NAME || ''

      if (
        highlightedCountries.value.includes(countryCode) ||
        (highlightedCountries.value.includes('CN') &&
          (countryName?.includes('Taiwan') || countryName?.includes('China')))
      ) {
        return 'rgba(0, 113, 227, 0.9)'
      }

      return 'rgba(200,200,200, 0.05)'
    })
    .polygonSideColor(d => {
      const props = d.properties || {}
      const countryCode = props.ISO_A2 || ''
      const countryName = props.NAME_LONG || props.NAME || ''

      if (
        highlightedCountries.value.includes(countryCode) ||
        (highlightedCountries.value.includes('CN') &&
          (countryName?.includes('Taiwan') || countryName?.includes('China')))
      ) {
        return 'rgba(0, 113, 227, 0.3)'
      }

      return 'rgba(0,0,0,0)'
    })
    .polygonStrokeColor(d => {
      const props = d.properties || {}
      const countryCode = props.ISO_A2 || ''
      const countryName = props.NAME_LONG || props.NAME || ''

      if (
        highlightedCountries.value.includes(countryCode) ||
        (highlightedCountries.value.includes('CN') &&
          (countryName?.includes('Taiwan') || countryName?.includes('China')))
      ) {
        return 'rgba(0, 113, 227, 0.8)'
      }

      return 'rgba(100,100,100,0.3)'
    })
    .polygonAltitude(d => {
      const props = d.properties || {}
      const countryCode = props.ISO_A2 || ''
      const countryName = props.NAME_LONG || props.NAME || ''

      if (
        highlightedCountries.value.includes(countryCode) ||
        (highlightedCountries.value.includes('CN') &&
          (countryName?.includes('Taiwan') || countryName?.includes('China')))
      ) {
        return 0.03
      }

      return 0.01
    })
}

// 滚动到不同 section 时更新高亮与视角（section 0=首屏, 1=亚洲, 2=欧洲, 3=非洲, 4=美洲, 5=中国, 6=省份）
const updateHighlightedCountries = sectionIndex => {
  switch (sectionIndex) {
    case 0: // 首屏：无高亮
      highlightedCountries.value = []
      highlightedProvinces.value = []
      break
    case 1: // 亚洲
      highlightedCountries.value = asiaCountries.map(c => c.code)
      highlightedProvinces.value = []
      break
    case 2: // 欧洲
      highlightedCountries.value = europeCountries.map(c => c.code)
      highlightedProvinces.value = []
      break
    case 3: // 非洲
      highlightedCountries.value = africaCountries.map(c => c.code)
      highlightedProvinces.value = []
      break
    case 4: // 美洲
      highlightedCountries.value = americasCountries.map(c => c.code)
      highlightedProvinces.value = []
      break
    case 5: // 回到中国
      highlightedCountries.value = ['CN']
      highlightedProvinces.value = []
      break
    case 6: // 省份展示
      highlightedCountries.value = ['CN']
      highlightedProvinces.value = activeProvinces.map(p => p.code)
      break
    default:
      highlightedCountries.value = []
      highlightedProvinces.value = []
  }
}

// 基于像素位置的触发（兜底方案）
const setupPixelBasedTrigger = world => {
  const scrollWrapper = document.querySelector('.scroll-wrapper')
  if (!scrollWrapper) return

  const triggerPositions = [0, 800, 1600, 2400, 3200, 4000]

  const targetViews = [
    { lat: 35, lng: 105, altitude: 1.2 },  // 亚洲 - 中国区域
    { lat: 50, lng: 15, altitude: 1.5 },   // 欧洲 - 欧洲大陆
    { lat: -10, lng: 20, altitude: 1.5 },  // 非洲 - 非洲大陆
    { lat: 20, lng: -90, altitude: 1.5 },  // 美洲 - 南美区域
    { lat: 35, lng: 105, altitude: 1.0 },  // 回到中国
    { lat: 35, lng: 105, altitude: 0.7 },  // 省份展示
  ]

}

// 基于 section 位置的智能触发
const setupSmartPixelTrigger = world => {
  const scrollWrapper = document.querySelector('.scroll-wrapper')
  if (!scrollWrapper) return

  const scrollSections = document.querySelectorAll('.scroll-section')
  if (!scrollSections.length) return

  const targetViews = [
    { lat: 35, lng: 105, altitude: 1.2 },  // 亚洲 - 中国区域
    { lat: 50, lng: 15, altitude: 1.5 },   // 欧洲 - 欧洲大陆
    { lat: -10, lng: 20, altitude: 1.5 },  // 非洲 - 非洲大陆
    { lat: 20, lng: -90, altitude: 1.5 },  // 美洲 - 南美区域
    { lat: 35, lng: 105, altitude: 1.0 },  // 回到中国
    { lat: 35, lng: 105, altitude: 0.7 },  // 省份展示
  ]

}

// 统一入口：优先使用智能触发，失败则使用固定像素触发
const initializeAnimationTriggers = world => {
  let cleanup = setupSmartPixelTrigger(world)
  if (!cleanup) {
    cleanup = setupPixelBasedTrigger(world)
  }
  return cleanup
}
</script>

<style scoped>
.globe-container {
  position: relative;
  width: 100vw;
  height: 100vh;
  background: #ffffff; /* 改为白色背景 */
  overflow: hidden;
  color: #111827;
}

/* 确保导航栏在最顶层并保持一致样式 */
.site-header {
  z-index: 1001 !important;
  position: fixed !important;
  top: 0 !important;
  left: 0 !important;
  right: 0 !important;
  /* 保持与其他页面一致的背景样式 */
  background: rgba(251, 251, 253, 0.72) !important;
  /* 移除全局模糊效果 */
}

/* 加载界面动画 */
.loading-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1000;
  transition: all 0.6s cubic-bezier(0.22, 0.61, 0.36, 1);
}

.loading-visible {
  opacity: 1;
  transform: scale(1) translateY(0);
  /* 移除模糊效果 */
  visibility: visible;
}

.loading-hidden {
  opacity: 0;
  transform: scale(1.1) translateY(-20px);
  /* 移除模糊效果 */
  visibility: hidden;
}

/* 加载界面样式 */
.loading-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: white;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  /* 移除背景模糊 */
}

/* 地球位置控制 */
.globe-viz {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 1; /* 地球在较低层级 */
  transition: all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1);
  /* 默认状态下地球居中 */
  transform: translateX(0) scale(1);
  opacity: 1;
}

/* 加载完成后地球移动到右侧，只缩放地球本身 */
.globe-viz.globe-right {
  transform: translateX(25%); /* 只向右移动，不缩放容器 */
  opacity: 0.9;
}

/* 地球内部缩放 */
.globe-viz.globe-right canvas {
  transform: scale(0.7); /* 只缩放地球画布本身 */
  transform-origin: center;
}

/* 地球回到中心并恢复正常大小 */
.globe-viz.globe-center {
  transform: translateX(0) scale(1); /* 回到中心并恢复正常大小 */
  opacity: 1;
}



.loading-content {
  text-align: center;
  color: #333;
  animation: contentFloat 2s ease-in-out infinite;
}

.loading-spinner {
  width: 60px;
  height: 60px;
  border: 4px solid rgba(51, 51, 51, 0.3);
  border-top: 4px solid #333;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: 0 auto 20px;
  box-shadow: 0 0 20px rgba(51, 51, 51, 0.3);
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.loading-text {
  font-size: 2rem;
  font-weight: 600;
  margin-bottom: 10px;
  color: #333;
  animation: textGlow 2s ease-in-out infinite alternate;
}

.loading-subtext {
  font-size: 1.1rem;
  opacity: 0.7;
  margin: 0;
  color: #666;
  animation: fadeInOut 3s ease-in-out infinite;
}



.scroll-wrapper {
  position: relative;
  z-index: 2;
  width: 100%;
  height: 100vh;
  overflow-y: auto;
  overflow-x: hidden;
  -webkit-overflow-scrolling: touch;
  /* 优化移动端滚动体验 */
  touch-action: pan-y;
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

.scroll-content {
  min-height: 100vh;
  position: relative;
  /* 确保子元素紧密排列 */
}

.scroll-section,
.content-section {
  position: relative;
  width: 100vw;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 4rem 2rem;
  z-index: 20;
  /* 移除 margin-bottom，避免板块间出现间隙 */
}

/* 新的布局容器 */
.content-layout {
  display: flex;
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: space-between;
  padding: 0 4rem;
}

.company-info {
  flex: 1;
  width: 100%;
  max-width: 520px;
  z-index: 20; /* 确保文字在最上层 */
  position: relative;
}

/* 全屏公司信息卡片 - 保持渐变移除模糊 */
.fullscreen-card {
  position: absolute;
  top: 0;
  left: 0;
  width: calc(38vw + 120px);
  height: 100vh;
  padding: 4.5rem 3.25rem 3.25rem 4.5rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background: transparent;
  border-radius: 0 20px 20px 0;
  /* 移除模糊效果 */
}

/* 全屏卡片背景渐变 - 更自然的扩大渐变范围 */
.fullscreen-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: radial-gradient(circle at 0% 0%, 
    rgba(135, 206, 250, 0.9) 0%, 
    rgba(160, 210, 240, 0.75) 12%, 
    rgba(190, 225, 245, 0.6) 25%, 
    rgba(220, 240, 250, 0.4) 40%, 
    rgba(240, 248, 255, 0.25) 55%, 
    rgba(250, 255, 255, 0.1) 70%, 
    rgba(255, 255, 255, 0) 85%
  );
  /* 扩大渐变范围至85%，过渡更自然 */
  z-index: -1;
  border-radius: 0 20px 20px 0;
}

.earth-placeholder {
  flex: 1;
  height: 100%;
  position: relative;
}

/* 第一个板块使用新的左右布局 */
.scroll-section:first-child .content-layout {
  justify-content: space-between;
}

.scroll-section:first-child .company-info {
  text-align: left;
}

/* 首屏特效容器 */
.hero-effects {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 15;
  pointer-events: none;
  opacity: 1;
  transition: opacity 0.5s ease;
}

/* 副标题样式 - 优化间距 */
.hero-subtitle {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 0.75rem;
  margin: 0.5rem 0 1.5rem 0;
  font-size: 1rem;
  font-weight: 500;
}

.tag {
  color: #0369a1;
  padding: 0.18rem 0.9rem;
  background: rgba(148, 163, 184, 0.08);
  border-radius: 20px;
  border: 1px solid rgba(148, 163, 184, 0.35);
  font-size: 0.9rem;
  letter-spacing: 0.06em;
  text-transform: uppercase;
}

.separator {
  color: rgba(255, 255, 255, 0.5);
  font-weight: 300;
}

/* 全球业务数据卡片 */
.global-stats {
  display: flex;
  justify-content: flex-start;
  gap: 1.5rem;
  margin: 1.75rem 0 1.25rem;
  flex-wrap: wrap;
}

.stat-card {
  background: rgba(255, 255, 255, 0.85);
  border-radius: 999px;
  padding: 0.75rem 1.4rem;
  text-align: left;
  min-width: 150px;
  transition: all 0.3s ease;
  border: 1px solid rgba(148, 163, 184, 0.3);
  box-shadow: 0 8px 18px rgba(15, 23, 42, 0.06);
}

.stat-card:hover {
  transform: translateY(-5px);
  background: rgba(255, 255, 255, 0.15);
  box-shadow: 0 10px 25px rgba(34, 211, 238, 0.2);
}

.stat-number {
  font-size: 1.4rem;
  font-weight: 700;
  color: #0f172a;
  margin-bottom: 0.3rem;
}

.stat-label {
  font-size: 0.78rem;
  color: #6b7280;
  font-weight: 400;
  text-transform: uppercase;
  letter-spacing: 0.12em;
}

/* 特效隐藏状态 */
.hero-effects[style*="opacity: 0"] {
  opacity: 0;
}

/* 其他卡片左右分布但不过于靠边 */
.scroll-section:nth-child(odd):not(:first-child) .content-box,
.content-section:nth-child(odd):not(:first-child) .content-box {
  margin-right: auto;
  margin-left: 4rem;
}

.scroll-section:nth-child(even) .content-box,
.content-section:nth-child(even) .content-box {
  margin-left: auto;
  margin-right: 4rem;
}

/* 内容板块样式 - 确保无缝连接 */
.content-section {
  background: var(--color-bg-alt);
  position: relative;
  width: 100vw;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 4rem 2rem;
  z-index: 20;
  /* 确保板块紧密连接，无间隙 */
  margin: 0;
  border: none;
}

/* ---------- 关于我们内容区：苹果风格 ---------- */
.about-block {
  width: 100%;
  padding: 5rem 1.5rem 5.5rem;
  box-sizing: border-box;
}

.about-block--light {
  background: #f5f5f7;
}

.about-block--white {
  background: #ffffff;
}

.about-block__inner {
  max-width: 1100px;
  margin: 0 auto;
  text-align: center;
}

.about-block__title {
  font-size: clamp(2rem, 5vw, 3.25rem);
  font-weight: 600;
  letter-spacing: -0.03em;
  color: #1d1d1f;
  margin: 0 0 0.6rem;
  line-height: 1.15;
}

.about-block__keyword {
  color: #0071e3;
  font-weight: 600;
}

.about-block__lead {
  font-size: 1.25rem;
  line-height: 1.5;
  color: #6e6e73;
  max-width: 640px;
  margin: 0 auto 3rem;
  font-weight: 400;
}

.about-block__cards {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
  text-align: left;
  margin-top: 0.5rem;
}

.about-card {
  background: #ffffff;
  border-radius: 18px;
  padding: 2rem 1.75rem;
  transition: transform 0.25s ease, box-shadow 0.25s ease;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.06);
  border: 1px solid rgba(0, 0, 0, 0.06);
}

.about-block--light .about-card {
  background: #ffffff;
}

.about-block--white .about-card {
  background: #f5f5f7;
  border-color: rgba(0, 0, 0, 0.04);
}

.about-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 28px rgba(0, 0, 0, 0.1);
}

.about-card__icon-wrap {
  width: 48px;
  height: 48px;
  border-radius: 12px;
  background: rgba(0, 113, 227, 0.12);
  color: #0071e3;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.25rem;
  font-size: 0.9rem;
  font-weight: 600;
  letter-spacing: 0.02em;
}

.about-card__icon-wrap--accent {
  background: linear-gradient(135deg, rgba(0, 113, 227, 0.15), rgba(88, 86, 214, 0.12));
  color: #0071e3;
}

.about-card__number {
  font-size: 1.75rem;
  font-weight: 700;
  letter-spacing: -0.02em;
  color: #0071e3;
  margin-bottom: 0.5rem;
  line-height: 1.2;
}

.about-card__title {
  font-size: 1.25rem;
  font-weight: 600;
  color: #1d1d1f;
  margin: 0 0 0.5rem;
  letter-spacing: -0.02em;
}

.about-card__text {
  font-size: 0.95rem;
  line-height: 1.55;
  color: #6e6e73;
  margin: 0;
}

.about-divider {
  height: 1px;
  background: rgba(0, 0, 0, 0.08);
  width: 100%;
  max-width: 1100px;
  margin: 0 auto;
}

/* 卡片初始隐藏状态 */
.content-box {
  background: rgba(255, 255, 255, 0.9);
  border: 1px solid rgba(0, 0, 0, 0.1);
  padding: 2rem;
  border-radius: 18px;
  color: #111827;
  backdrop-filter: blur(24px);
  -webkit-backdrop-filter: blur(24px);
  max-width: 480px;
  box-shadow: 0 18px 45px rgba(0, 0, 0, 0.08);
  width: 100%;
  opacity: 0;
  transition: opacity 0.3s ease;
}

/* 动画触发后显示卡片 */
.content-box.slide-in-left,
.content-box.slide-in-right {
  opacity: 1;
}

.content-box.glass {
  background: rgba(255, 255, 255, 0.95);
  border: 1px solid rgba(0, 0, 0, 0.15);
}

h1 {
  font-size: 2.8rem;
  margin-bottom: 1rem;
  color: #111827;
  font-weight: 700;
  letter-spacing: -0.04em;
  text-align: left;
}

/* 首页标题样式 - 优化位置和间距 */
.hero-title {
  font-size: 3.2rem;
  font-weight: 700;
  text-align: left;
  margin-bottom: 1.2rem;
  margin-top: 0;
  background: linear-gradient(120deg, #22d3ee, #a855f7);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

h2 {
  font-size: 2.2rem;
  color: #111827;
  margin-bottom: 1rem;
  font-weight: 600;
  text-align: center;
}

p {
  font-size: 1.05rem;
  line-height: 1.6;
  margin-bottom: 1.5rem;
  color: #334155; /* 深灰色，适配渐变背景 */
  text-align: left;
}

.scroll-hint {
  margin-top: 1.5rem;
  opacity: 0.8;
  animation: bounce 2s infinite;
  font-size: 0.95rem;
  text-align: center;
}

.scroll-instruction {
  margin-top: 1rem;
  font-size: 0.9rem;
  color: #22d3ee;
  font-weight: 500;
  text-align: center;
  animation: pulse 2s infinite;
}

/* 字体出现动画 */
.animate-in {
  opacity: 0;
  transform: translateY(30px);
  animation: fadeInUp 0.8s forwards;
  animation-timing-function: cubic-bezier(0.34, 1.56, 0.64, 1);
}

.delay-1 {
  animation-delay: 0.2s;
}

.delay-2 {
  animation-delay: 0.4s;
}

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

@keyframes bounce {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(10px);
  }
}

@keyframes pulse {
  0%,
  100% {
    opacity: 0.7;
    transform: scale(1);
  }
  50% {
    opacity: 1;
    transform: scale(1.05);
  }
}

@keyframes slideInLeft {
  from {
    opacity: 0;
    transform: translateX(-100%);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes slideInRight {
  from {
    opacity: 0;
    transform: translateX(100%);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

.slide-in-left {
  animation: slideInLeft 1.2s ease-out forwards;
  /* 动画由Vue的isLoading状态控制触发 */
}

.slide-in-right {
  animation: slideInRight 1.2s ease-out forwards;
  /* 动画由Vue的isLoading状态控制触发 */
}

.countries-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(190px, 1fr));
  gap: 1.25rem;
  margin-top: 1.75rem;
  max-width: 640px;
}

.country-card {
  background: rgba(255, 255, 255, 0.96);
  border-radius: 18px;
  padding: 0.95rem 1.1rem;
  text-align: left;
  cursor: pointer;
  border: 1px solid rgba(148, 163, 184, 0.35);
  transition: all 0.25s ease;
  display: flex;
  align-items: center;
  gap: 0.9rem;
  box-shadow: 0 10px 24px rgba(15, 23, 42, 0.06);
}

/* 国家卡片高亮状态 */
.country-card.highlighted {
  background: linear-gradient(135deg, #e0f2fe, #f5f3ff);
  border-color: #2563eb;
  transform: translateY(-2px);
  box-shadow: 0 14px 32px rgba(37, 99, 235, 0.18);
}



.country-flag {
  font-size: 1.4rem;
  width: 40px;
  height: 40px;
  border-radius: 999px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f3f4f6;
}

.country-name-cn {
  font-size: 0.95rem;
  color: #111827;
  font-weight: 600;
  margin-bottom: 0.15rem;
}

.country-name-en {
  font-size: 0.75rem;
  color: #6b7280;
  font-weight: 400;
  letter-spacing: 0.05em;
}

.country-card.highlighted .country-name-cn {
  color: #111827;
  font-weight: 700;
}

.country-card.highlighted .country-name-en {
  color: #374151;
  font-weight: 500;
}



.provinces-scroll-container {
  margin-top: 1.5rem;
  height: 100px;
  overflow: hidden;
  background: transparent;
  padding: 0.2rem 0;
  position: relative;
}

.scroll-row {
  height: 50%;
  width: 100%;
  overflow: hidden;
  position: relative;
}

.top-row {
  margin-bottom: 5px;
}

.bottom-row {
  margin-top: 5px;
}

.infinite-content {
  display: inline-block;
  white-space: nowrap;
  position: relative;
}

.left-scroll {
  animation: scrollLeft 25s linear infinite;
}

.right-scroll {
  animation: scrollRight 25s linear infinite;
}

.province-sequence {
  display: inline-block;
  padding: 0 0.3rem;
}

.province-item {
  display: inline-block;
  font-size: 1.2rem;
  padding: 0.3rem 0.6rem;
  margin: 0 0.15rem;
  font-weight: 500;
  color: #111827;
}

.province-item.colored {
  background: linear-gradient(120deg, #22d3ee, #a855f7);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  font-weight: 700;
  text-shadow: 0 1px 3px rgba(0, 113, 227, 0.2);
}

@keyframes scrollLeft {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-50%);
  }
}

@keyframes scrollRight {
  0% {
    transform: translateX(-50%);
  }
  100% {
    transform: translateX(0);
  }
}

/* 关键帧动画定义 */
@keyframes gradientShift {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}

@keyframes contentFloat {
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-10px);
  }
}

@keyframes textGlow {
  from {
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  }
  to {
    text-shadow: 0 2px 10px rgba(255, 255, 255, 0.5);
  }
}

@keyframes fadeInOut {
  0%, 100% {
    opacity: 0.7;
  }
  50% {
    opacity: 1;
  }
}

.apple-style-title {
  font-size: 4rem; /* 64px */
  font-weight: 700;
  margin-bottom: 1rem;
  color: #111827;
  line-height: 1.2;
  text-align: left;
  margin-left: 0;
}

.main-title-keyword {
  background: linear-gradient(120deg, #2563eb, #22c55e, #f97316);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  font-weight: 700;
}

.subtitle {
  font-size: 1.2rem;
  color: #6b7280;
  margin-bottom: 2.5rem;
  font-weight: 400;
  text-align: left;
  margin-left: 0;
}

.full-width-content {
  max-width: 1200px;
  width: 100%;
  padding: 0 1rem;
  margin: 0 auto;
  text-align: left;
}

/* 与首页完全一致的卡片栅格：相同 gap、margin、定位与尺寸 */
.dx-card-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
  margin-top: 2.5rem;
  margin-left: 0;
}

.dx-card-grid--solo {
  grid-template-columns: 1fr;
  justify-items: center;
  max-width: 470px;
  margin-left: auto;
  margin-right: auto;
}

.company-modules,
.strength-modules,
.innovation-modules,
.value-modules {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
  margin-top: 2.5rem;
  margin-left: 0;
}

/* 统一卡片：与首页相同规格（透明大卡片、相同尺寸与定位） */
.module-item.dx-card {
  background: transparent;
  border-radius: 18px;
  border: 1px solid transparent;
  overflow: hidden;
  box-shadow: none;
  display: flex;
  flex-direction: column;
  width: 100%;
  min-width: 280px;
  height: calc(56vw - 3.47rem);
  max-width: 470px;
  max-height: 630px;
}

/* 图片区包装：照片区四角圆角，溢出隐藏以便上浮动画不带动文字区 */
.dx-card__media-wrap {
  overflow: hidden;
  flex-shrink: 0;
  border-radius: 18px;
}

/* 关于页卡片图标样式 */
.dx-card__icon-circle {
  width: 72px;
  height: 72px;
  border-radius: 999px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 16px auto 0;
  background: radial-gradient(circle at 30% 20%, #e0f2fe 0%, #bfdbfe 35%, #eff6ff 100%);
  box-shadow: 0 10px 25px rgba(15, 23, 42, 0.12);
}

.dx-card__icon-emoji {
  font-size: 2rem;
}

/* 团队头像图标样式 */
.dx-card__avatar-circle {
  width: 88px;
  height: 88px;
  border-radius: 999px;
  overflow: hidden;
  margin: 16px auto 0;
  box-shadow: 0 14px 30px rgba(15, 23, 42, 0.18);
  background: #e5e7eb;
}

.dx-card__avatar-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

/* 图片区：竖向 3:4 比例，仅悬停图片区时上浮 */
.module-item__media.dx-card__media {
  width: 100%;
  aspect-ratio: 3 / 4;
  background-size: cover;
  background-position: center;
}

/* 文字区：占剩余高度，背景透明，文字颜色与底层区块背景协调（与首页一致） */
.module-item__body.dx-card__body {
  flex: 1;
  min-height: 0;
  padding: 20px 24px 24px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  background: transparent;
}

.module-item__body.dx-card__body h3 {
  font-size: 1.25rem;
  color: var(--color-text);
  margin: 0 0 0.25rem 0;
  font-weight: 600;
}

.module-item__body.dx-card__body p {
  color: var(--color-text-secondary);
  line-height: 1.6;
  margin: 0;
  font-size: 0.95rem;
}

@media (max-width: 768px) {
  .about-block {
    padding: 3.5rem 1.25rem 4rem;
  }

  .about-block__title {
    font-size: 1.75rem;
  }

  .about-block__lead {
    font-size: 1.1rem;
    margin-bottom: 2.25rem;
  }

  .about-block__cards {
    grid-template-columns: 1fr;
    gap: 1.25rem;
  }

  .about-card {
    padding: 1.5rem 1.35rem;
  }

  .about-card__number {
    font-size: 1.5rem;
  }

  .dx-card-grid,
  .company-modules,
  .strength-modules,
  .innovation-modules,
  .value-modules {
    grid-template-columns: 1fr;
  }
  
  .module-item.dx-card {
    min-width: 0;
    max-width: 100%;
    height: auto;
    min-height: 420px;
    max-height: none;
  }
  
  .content-box {
    max-width: 90%;
    padding: 1.6rem 1.4rem;
  }

  h1 {
    font-size: 2.1rem;
  }

  h2 {
    font-size: 1.8rem;
  }

  .province-item {
    font-size: 1.1rem;
    margin: 0 0.1rem;
    padding: 0.25rem 0.5rem;
  }

  .apple-style-title {
    font-size: 2rem;
  }

  .subtitle {
    font-size: 1rem;
  }
}
</style>


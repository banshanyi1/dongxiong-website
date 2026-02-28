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
        <h2 class="loading-text">正在加载地球数据...</h2>
        <p class="loading-subtext">请稍候，精彩即将呈现</p>
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
              <h1 class="hero-title animate-in">东雄环保</h1>
              <div class="hero-subtitle animate-in delay-1">
                <span class="tag">全球布局</span>
                <span class="separator">|</span>
                <span class="tag">本土深耕</span>
                <span class="separator">|</span>
                <span class="tag">技术引领</span>
              </div>
              <p class="animate-in delay-1">有色金属冶炼与大气环保专业服务商</p>
              
              <!-- 全球业务数据卡片 -->
              <div class="global-stats animate-in delay-2">
                <div class="stat-card">
                  <div class="stat-number">20+</div>
                  <div class="stat-label">服务国家</div>
                </div>
                <div class="stat-card">
                  <div class="stat-number">30+</div>
                  <div class="stat-label">覆盖省份</div>
                </div>
                <div class="stat-card">
                  <div class="stat-number">500+</div>
                  <div class="stat-label">工程项目</div>
                </div>
              </div>
              
              <div class="scroll-hint animate-in delay-3">向下滚动探索我们的全球足迹 ↓</div>
              <div class="scroll-instruction" v-if="!showEarthCenter">滚动查看完整地球</div>
            </div>
            
            <!-- 右侧留空给地球 -->
            <div class="earth-placeholder"></div>
          </div>
        </div>

        <!-- 第二屏：亚洲展示 -->
        <div class="scroll-section section-2" data-section-index="1">
          <div class="content-box glass">
            <h2>服务亚洲</h2>
            <p>我们在亚洲多个国家开展环保项目。</p>
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
            <h2>服务欧洲</h2>
            <p>我们在欧洲多个国家开展环保项目。</p>
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
            <h2>服务非洲</h2>
            <p>我们在非洲多个国家开展环保项目。</p>
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
            <h2>服务美洲</h2>
            <p>我们在美洲多个国家开展环保项目。</p>
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
            <h2>深耕中国</h2>
            <p>回归国内市场，专注本土环保事业。</p>
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

        <!-- 第七屏：省份展示 -->
        <div class="scroll-section section-7" data-section-index="6">
          <div class="content-box glass">
            <h2>服务全国</h2>
            <p>我们在全国多个省份设有服务网点。</p>

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

        <!-- 企业介绍板块 -->
        <div class="content-section section-8">
          <div class="full-width-content">
            <h2 class="apple-style-title">
              <span class="main-title-keyword">环保</span>，一流的使命
            </h2>
            <p class="subtitle">为地球可持续发展注入东雄动力</p>
            <div class="company-modules dx-card-grid">
              <article class="module-item dx-card">
                <div class="dx-card__media-wrap">
                  <div class="dx-card__icon-circle">
                    <span class="dx-card__icon-emoji">🏭</span>
                  </div>
                </div>
                <div class="module-item__body dx-card__body">
                  <h3>清洁生产</h3>
                  <p>有色金属冶炼行业清洁化、集约化转型的技术推动者。从工艺源头到末端治理，推动绿色冶炼与资源高效利用，实现生产与环保协同。</p>
                </div>
              </article>
              <article class="module-item dx-card">
                <div class="dx-card__media-wrap">
                  <div class="dx-card__icon-circle">
                    <span class="dx-card__icon-emoji">🧪</span>
                  </div>
                </div>
                <div class="module-item__body dx-card__body">
                  <h3>科技创新</h3>
                  <p>围绕大气污染控制与资源综合利用持续研发新工艺。依托装备与控制系统创新，为脱硫脱硝、除尘及 VOCs 治理提供技术支撑。</p>
                </div>
              </article>
              <article class="module-item dx-card">
                <div class="dx-card__media-wrap">
                  <div class="dx-card__icon-circle">
                    <span class="dx-card__icon-emoji">🌐</span>
                  </div>
                </div>
                <div class="module-item__body dx-card__body">
                  <h3>全球协同</h3>
                  <p>与全球环保企业携手，共建清洁低碳新未来。将本土冶炼与环保经验与国际标准结合，服务亚洲、欧洲、美洲等多地项目。</p>
                </div>
              </article>
            </div>
          </div>
        </div>
        
        <!-- 分割线 -->
        <div class="section-divider"></div>

        <!-- 企业实力 -->
        <div class="content-section section-9">
          <div class="full-width-content">
            <h2 class="apple-style-title">
              <span class="main-title-keyword">实力</span>，值得信赖
            </h2>
            <p class="subtitle">立足中国，服务全球的环保科技企业</p>
            <div class="strength-modules dx-card-grid">
              <article class="module-item dx-card">
                <div class="dx-card__media-wrap">
                  <div class="dx-card__icon-circle">
                    <span class="dx-card__icon-emoji">🛠️</span>
                  </div>
                </div>
                <div class="module-item__body dx-card__body">
                  <h3>技术领先</h3>
                  <p>百余项专利与核心技术，覆盖除尘、脱硫、脱硝及冶炼工艺等多个领域，为工程设计与设备选型提供可靠技术保障。</p>
                </div>
              </article>
              <article class="module-item dx-card">
                <div class="dx-card__media-wrap">
                  <div class="dx-card__icon-circle">
                    <span class="dx-card__icon-emoji">📚</span>
                  </div>
                </div>
                <div class="module-item__body dx-card__body">
                  <h3>项目经验</h3>
                  <p>500+ 环保工程项目经验，深度服务冶金、化工、电力等行业，从可研设计到施工运维全流程落地。</p>
                </div>
              </article>
              <article class="module-item dx-card">
                <div class="dx-card__media-wrap">
                  <div class="dx-card__icon-circle">
                    <span class="dx-card__icon-emoji">🗺️</span>
                  </div>
                </div>
                <div class="module-item__body dx-card__body">
                  <h3>布局全国</h3>
                  <p>在多个重点省份设立服务团队与网点，形成快速响应与属地化服务能力，就近保障项目交付与运维。</p>
                </div>
              </article>
            </div>
          </div>
        </div>
        
        <!-- 分割线 -->
        <div class="section-divider"></div>

        <!-- 技术创新 -->
        <div class="content-section section-10">
          <div class="full-width-content">
            <h2 class="apple-style-title">
              <span class="main-title-keyword">创新</span>，不断前行
            </h2>
            <p class="subtitle">以技术创新驱动环保产业升级</p>
            <div class="innovation-modules dx-card-grid">
              <article class="module-item dx-card">
                <div class="dx-card__media-wrap">
                  <div class="dx-card__icon-circle">
                    <span class="dx-card__icon-emoji">🔬</span>
                  </div>
                </div>
                <div class="module-item__body dx-card__body">
                  <h3>持续研发</h3>
                  <p>每年将营收的一定比例投入技术研发与工艺升级，在除尘、脱硫脱硝及冶炼工艺上持续迭代，保持技术领先。</p>
                </div>
              </article>
              <article class="module-item dx-card">
                <div class="dx-card__media-wrap">
                  <div class="dx-card__icon-circle">
                    <span class="dx-card__icon-emoji">👥</span>
                  </div>
                </div>
                <div class="module-item__body dx-card__body">
                  <h3>人才驱动</h3>
                  <p>多学科交叉的工程技术团队，覆盖工艺、设备与自动化，从方案设计到现场实施形成闭环能力。</p>
                </div>
              </article>
              <article class="module-item dx-card">
                <div class="dx-card__media-wrap">
                  <div class="dx-card__icon-circle">
                    <span class="dx-card__icon-emoji">🎓</span>
                  </div>
                </div>
                <div class="module-item__body dx-card__body">
                  <h3>产学研合作</h3>
                  <p>与多所高校和科研院所建立长期合作关系，共建联合实验室，推动环保与冶炼技术的成果转化与工程应用。</p>
                </div>
              </article>
            </div>
          </div>
        </div>

        <!-- 分割线 -->
        <div class="section-divider"></div>
        
        <!-- 客户价值 -->
        <div class="content-section section-11">
          <div class="full-width-content">
            <h2 class="apple-style-title">
              <span class="main-title-keyword">价值</span>，共同创造
            </h2>
            <p class="subtitle">为客户、行业与社会持续创造环保价值</p>
            <div class="value-modules dx-card-grid">
              <article class="module-item dx-card">
                <div class="dx-card__media-wrap">
                  <div class="dx-card__icon-circle">
                    <span class="dx-card__icon-emoji">🤝</span>
                  </div>
                </div>
                <div class="module-item__body dx-card__body">
                  <h3>客户满意</h3>
                  <p>以工程效果与长期稳定运行为核心，从设计、施工到运维全程保障，以交付质量与响应速度赢得客户信赖。</p>
                </div>
              </article>
              <article class="module-item dx-card">
                <div class="dx-card__media-wrap">
                  <div class="dx-card__icon-circle">
                    <span class="dx-card__icon-emoji">🌱</span>
                  </div>
                </div>
                <div class="module-item__body dx-card__body">
                  <h3>环境效益</h3>
                  <p>通过系统性治理与高效装备，显著降低污染物排放与能耗水平，为业主创造合规、节能、可持续的运营环境。</p>
                </div>
              </article>
              <article class="module-item dx-card">
                <div class="dx-card__media-wrap">
                  <div class="dx-card__icon-circle">
                    <span class="dx-card__icon-emoji">❤️</span>
                  </div>
                </div>
                <div class="module-item__body dx-card__body">
                  <h3>社会责任</h3>
                  <p>积极参与行业标准制定与公益环保项目，推动冶炼与大气治理行业规范发展，践行企业环保责任。</p>
                </div>
              </article>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, onUnmounted } from 'vue'
import Globe from 'globe.gl'
import SiteHeader from '../components/SiteHeader.vue'

// 导入本地地球背景图片
import earthBackground from '../assets/globe/earth-blue-marble.jpg'

const globeDiv = ref(null)
const globeInstance = ref(null)
const isLoading = ref(true)
const isGlobeRotating = ref(true)
const rotationInterval = ref(null)
const showEarthCenter = ref(false)
const scrollThreshold = ref(50)
const animatedSections = ref(new Set())

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

// 高亮状态
const highlightedCountries = ref([])

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
    'PE': 'Peru',
    'ZM': 'Zambia',
    'EG': 'Egypt'
  }
  return englishNames[code] || code
}

let cleanupFunction = null
let currentCardIndex = 0
let isAnimating = false

// 地球自旋转函数
const startGlobeRotation = (world) => {
  if (rotationInterval.value) return
  
  rotationInterval.value = setInterval(() => {
    if (isGlobeRotating.value && world) {
      const currentView = world.pointOfView()
      const newLng = (currentView.lng - 0.1 + 360) % 360
      world.pointOfView({ ...currentView, lng: newLng }, 0)
    }
  }, 50)
}

// 停止地球旋转
const stopGlobeRotation = () => {
  if (rotationInterval.value) {
    clearInterval(rotationInterval.value)
    rotationInterval.value = null
  }
  isGlobeRotating.value = false
}

// 处理触摸开始事件
const handleTouchStart = (event) => {
  const scrollWrapper = document.querySelector('.scroll-wrapper')
  if (scrollWrapper) {
    scrollWrapper.style.overflowY = 'auto'
    scrollWrapper.style.webkitOverflowScrolling = 'touch'
    setTimeout(() => {
      scrollWrapper.scrollTop = scrollWrapper.scrollTop
    }, 100)
  }
}

// 统一的滚动处理函数
const handleScroll = () => {
  const scrollWrapper = document.querySelector('.scroll-wrapper')
  if (!scrollWrapper) return
  
  const scrollTop = scrollWrapper.scrollTop
  showEarthCenter.value = scrollTop > scrollThreshold.value
  
  // 控制卡片动画触发
  const scrollSections = document.querySelectorAll('.scroll-section')
  scrollSections.forEach((section, index) => {
    const sectionRect = section.getBoundingClientRect()
    const sectionTop = sectionRect.top
    const windowHeight = window.innerHeight
    
    if (sectionTop < windowHeight * 0.6 && sectionTop > -windowHeight * 0.4) {
      if (!animatedSections.value.has(index)) {
        animatedSections.value.add(index)
        const contentBox = section.querySelector('.content-box')
        if (contentBox) {
          if (index % 2 === 1) {
            contentBox.classList.add('slide-in-right')
          } else if (index % 2 === 0 && index > 0) {
            contentBox.classList.add('slide-in-left')
          }
        }
      }
    }
  })
  
  // 控制卡片切换逻辑
  const triggerPositions = [0, 400, 800, 1200, 1600, 2000, 2400]
  const targetViews = [
    { lat: 35, lng: 105, altitude: 1.2 },  // 亚洲
    { lat: 50, lng: 15, altitude: 1.5 },   // 欧洲
    { lat: -10, lng: 20, altitude: 1.5 },  // 非洲
    { lat: 20, lng: -90, altitude: 1.5 },  // 美洲
    { lat: 35, lng: 105, altitude: 1.0 },  // 回到中国
    { lat: 35, lng: 105, altitude: 0.7 },  // 省份展示
  ]
  
  let targetIndex = 0
  for (let i = 0; i < triggerPositions.length; i++) {
    if (scrollTop >= triggerPositions[i]) {
      targetIndex = i
    }
  }
  
  // 调整索引：跳过初始状态
  if (targetIndex > 0) {
    targetIndex = targetIndex - 1
  } else {
    targetIndex = 0
  }
  
  if (targetIndex !== currentCardIndex && !isAnimating) {
    currentCardIndex = targetIndex
    isAnimating = true
    
    if (targetIndex === 5) {
      stopGlobeRotation()
    }
    
    if (globeInstance.value) {
      globeInstance.value.pointOfView(targetViews[targetIndex], 800)
      updateHighlightedCountries(targetIndex)
      updateMapDisplay(globeInstance.value)
    }
    
    setTimeout(() => {
      isAnimating = false
    }, 850)
  }
}

onMounted(() => {
  initGlobe()
  
  const scrollWrapper = document.querySelector('.scroll-wrapper')
  if (scrollWrapper) {
    scrollWrapper.addEventListener('scroll', handleScroll)
  }
  
  setTimeout(() => {
    if (isLoading.value) {
      isLoading.value = false
      showEarthCenter.value = false
    }
  }, 3000)
  
  setTimeout(() => {
    if (scrollWrapper) {
      scrollWrapper.style.overflowY = 'auto'
      scrollWrapper.style.webkitOverflowScrolling = 'touch'
      const currentScroll = scrollWrapper.scrollTop
      scrollWrapper.scrollTop = currentScroll + 1
      setTimeout(() => {
        scrollWrapper.scrollTop = currentScroll
      }, 50)
    }
  }, 1500)
})

onUnmounted(() => {
  if (cleanupFunction) {
    cleanupFunction()
  }
  stopGlobeRotation()
  if (globeInstance.value && globeInstance.value._destructor) {
    globeInstance.value._destructor()
  }
  
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
  startGlobeRotation(world)

  const dataPromise = fetch(
    'https://raw.githubusercontent.com/vasturiano/globe.gl/master/example/datasets/ne_110m_admin_0_countries.geojson',
    { timeout: 3000 }
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
      setupScrollAnimation(world)
    })

  setTimeout(() => {
    if (isLoading.value) {
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
  
  setTimeout(() => {
    isLoading.value = false
    showEarthCenter.value = false
  }, 500)
  
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

// 滚动到不同 section 时更新高亮与视角
const updateHighlightedCountries = section => {
  switch (section) {
    case 0: // 亚洲
      highlightedCountries.value = asiaCountries.map(c => c.code)
      break
    case 1: // 欧洲
      highlightedCountries.value = europeCountries.map(c => c.code)
      break
    case 2: // 非洲
      highlightedCountries.value = africaCountries.map(c => c.code)
      break
    case 3: // 美洲
      highlightedCountries.value = americasCountries.map(c => c.code)
      break
    case 4: // 回到中国
      highlightedCountries.value = ['CN']
      break
    case 5: // 省份展示
      highlightedCountries.value = ['CN']
      break
    default:
      highlightedCountries.value = []
  }
}

// 基于像素位置的触发
const setupPixelBasedTrigger = world => {
  const scrollWrapper = document.querySelector('.scroll-wrapper')
  if (!scrollWrapper) return

  const triggerPositions = [0, 400, 800, 1200, 1600, 2000, 2400]
  const targetViews = [
    { lat: 35, lng: 105, altitude: 1.2 },
    { lat: 50, lng: 15, altitude: 1.5 },
    { lat: -10, lng: 20, altitude: 1.5 },
    { lat: 20, lng: -90, altitude: 1.5 },
    { lat: 35, lng: 105, altitude: 1.0 },
    { lat: 35, lng: 105, altitude: 0.7 },
  ]
}

// 基于 section 位置的智能触发
const setupSmartPixelTrigger = world => {
  const scrollWrapper = document.querySelector('.scroll-wrapper')
  if (!scrollWrapper) return

  const scrollSections = document.querySelectorAll('.scroll-section')
  if (!scrollSections.length) return

  const targetViews = [
    { lat: 35, lng: 105, altitude: 1.2 },
    { lat: 50, lng: 15, altitude: 1.5 },
    { lat: -10, lng: 20, altitude: 1.5 },
    { lat: 20, lng: -90, altitude: 1.5 },
    { lat: 35, lng: 105, altitude: 1.0 },
    { lat: 35, lng: 105, altitude: 0.7 },
  ]
}

// 统一入口
const initializeAnimationTriggers = world => {
  let cleanup = setupSmartPixelTrigger(world)
  if (!cleanup) {
    cleanup = setupPixelBasedTrigger(world)
  }
  return cleanup
}
</script>
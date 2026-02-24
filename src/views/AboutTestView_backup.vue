<template>
  <div class="globe-container">
    <!-- 导航栏 -->
    <SiteHeader />
    
    <!-- 加载界面 -->
    <div v-if="isLoading" class="loading-overlay">
      <div class="loading-content">
        <div class="loading-spinner"></div>
        <h2 class="loading-text">正在加载地球数据...</h2>
        <p class="loading-subtext">请稍候，精彩即将呈现</p>
      </div>
    </div>
    
    <!-- 地球可视化区域 -->
    <div ref="globeDiv" class="globe-viz"></div>

    <div class="scroll-wrapper">
      <div class="scroll-content">
        <!-- 第一屏：初始状态 - 中国区域居中 -->
        <div class="scroll-section section-1" data-section-index="0">
          <div class="content-box glass">
            <h1 class="hero-title">东雄环保</h1>
            <p>有色金属冶炼与大气环保专业服务商</p>
            <div class="scroll-hint">向下滚动探索我们的全球足迹 ↓</div>
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

        <!-- 第四屏：美洲展示 -->
        <div class="scroll-section section-4" data-section-index="3">
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

        <!-- 第五屏：回归中国 -->
        <div class="scroll-section section-5" data-section-index="4">
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

        <!-- 第六屏：省份展示 -->
        <div class="scroll-section section-6" data-section-index="5">
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

        <!-- 第七屏：企业使命/环保 -->
        <div class="content-section section-7">
          <div class="full-width-content">
            <h2 class="apple-style-title">
              <span class="main-title-keyword">环保</span>，一流的使命
            </h2>
            <p class="subtitle">为地球可持续发展注入东雄动力</p>
            <div class="company-modules">
              <div class="module-item">
                <h3>清洁生产</h3>
                <p>有色金属冶炼行业清洁化、集约化转型的技术推动者。</p>
              </div>
              <div class="module-item">
                <h3>科技创新</h3>
                <p>围绕大气污染控制与资源综合利用持续研发新工艺。</p>
              </div>
              <div class="module-item">
                <h3>全球协同</h3>
                <p>与全球环保企业携手，共建清洁低碳新未来。</p>
              </div>
            </div>
          </div>
        </div>
        
        <!-- 分割线 -->
        <div class="section-divider"></div>

        <!-- 第八屏：企业实力 -->
        <div class="content-section section-8">
          <div class="full-width-content">
            <h2 class="apple-style-title">
              <span class="main-title-keyword">实力</span>，值得信赖
            </h2>
            <p class="subtitle">立足中国，服务全球的环保科技企业</p>
            <div class="strength-modules">
              <div class="module-item">
                <h3>技术领先</h3>
                <p>百余项专利与核心技术，覆盖除尘、脱硫、脱硝等多个领域。</p>
              </div>
              <div class="module-item">
                <h3>项目经验</h3>
                <p>500+ 环保工程项目经验，深度服务冶金、化工、电力等行业。</p>
              </div>
              <div class="module-item">
                <h3>布局全国</h3>
                <p>多个重点省份设立服务团队，形成快速响应网络。</p>
              </div>
            </div>
          </div>
        </div>
        
        <!-- 分割线 -->
        <div class="section-divider"></div>

        <!-- 第九屏：技术创新 -->
        <div class="content-section section-9">
          <div class="full-width-content">
            <h2 class="apple-style-title">
              <span class="main-title-keyword">创新</span>，不断前行
            </h2>
            <p class="subtitle">以技术创新驱动环保产业升级</p>
            <div class="innovation-modules">
              <div class="module-item">
                <h3>持续研发</h3>
                <p>每年将营收的一定比例投入技术研发与工艺升级。</p>
              </div>
              <div class="module-item">
                <h3>人才驱动</h3>
                <p>多学科交叉的工程技术团队，覆盖工艺、设备与自动化。</p>
              </div>
              <div class="module-item">
                <h3>产学研合作</h3>
                <p>与多所高校和科研院所建立长期合作关系，共建联合实验室。</p>
              </div>
            </div>
          </div>
        </div>
        
        <!-- 分割线 -->
        <div class="section-divider"></div>

        <!-- 第十屏：客户价值 -->
        <div class="content-section section-10">
          <div class="full-width-content">
            <h2 class="apple-style-title">
              <span class="main-title-keyword">价值</span>，共同创造
            </h2>
            <p class="subtitle">为客户、行业与社会持续创造环保价值</p>
            <div class="value-modules">
              <div class="module-item">
                <h3>客户满意</h3>
                <p>以工程效果与长期稳定运行为核心，赢得客户信赖。</p>
              </div>
              <div class="module-item">
                <h3>环境效益</h3>
                <p>通过系统性治理，显著降低污染物排放与能耗水平。</p>
              </div>
              <div class="module-item">
                <h3>社会责任</h3>
                <p>积极参与行业标准制定与公益环保项目，推动行业发展。</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, onUnmounted, computed } from 'vue'
import Globe from 'globe.gl'
import SiteHeader from '../components/SiteHeader.vue'

const globeDiv = ref(null)
const globeInstance = ref(null)
const isLoading = ref(true)
const chinaCount = ref(8)

// 亚洲国家
const asiaCountries = [
  { code: 'CN', name: '中国（含台湾）', flag: '🇨🇳🇹🇼' },
  { code: 'JP', name: '日本', flag: '🇯🇵' },
  { code: 'KR', name: '韩国', flag: '🇰🇷' },
  { code: 'IN', name: '印度', flag: '🇮🇳' },
  { code: 'TH', name: '泰国', flag: '🇹🇭' },
  { code: 'VN', name: '越南', flag: '🇻🇳' },
  { code: 'MY', name: '马来西亚', flag: '🇲🇾' },
  { code: 'SG', name: '新加坡', flag: '🇸🇬' },
]

// 欧洲国家
const europeCountries = [
  { code: 'DE', name: '德国', flag: '🇩🇪' },
  { code: 'FR', name: '法国', flag: '🇫🇷' },
  { code: 'GB', name: '英国', flag: '🇬🇧' },
  { code: 'IT', name: '意大利', flag: '🇮🇹' },
  { code: 'NL', name: '荷兰', flag: '🇳🇱' },
  { code: 'SE', name: '瑞典', flag: '🇸🇪' },
  { code: 'NO', name: '挪威', flag: '🇳🇴' },
  { code: 'CH', name: '瑞士', flag: '🇨🇭' },
]

// 美洲国家
const americasCountries = [
  { code: 'US', name: '美国', flag: '🇺🇸' },
  { code: 'CA', name: '加拿大', flag: '🇨🇦' },
  { code: 'BR', name: '巴西', flag: '🇧🇷' },
  { code: 'MX', name: '墨西哥', flag: '🇲🇽' },
  { code: 'AR', name: '阿根廷', flag: '🇦🇷' },
  { code: 'CL', name: '智利', flag: '🇨🇱' },
  { code: 'PE', name: '秘鲁', flag: '🇵🇪' },
  { code: 'CO', name: '哥伦比亚', flag: '🇨🇴' },
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
    'JP': 'Japan',
    'KR': 'South Korea',
    'IN': 'India',
    'TH': 'Thailand',
    'VN': 'Vietnam',
    'MY': 'Malaysia',
    'SG': 'Singapore',
    'DE': 'Germany',
    'FR': 'France',
    'GB': 'United Kingdom',
    'IT': 'Italy',
    'NL': 'Netherlands',
    'SE': 'Sweden',
    'NO': 'Norway',
    'CH': 'Switzerland',
    'US': 'United States',
    'CA': 'Canada',
    'BR': 'Brazil',
    'MX': 'Mexico',
    'AR': 'Argentina',
    'CL': 'Chile',
    'PE': 'Peru',
    'CO': 'Colombia'
  }
  return englishNames[code] || code
}

let cleanupFunction = null
let currentCardIndex = 0
let isAnimating = false

onMounted(() => {
  initGlobe()
})

onUnmounted(() => {
  if (cleanupFunction) {
    cleanupFunction()
  }
  if (globeInstance.value && globeInstance.value._destructor) {
    globeInstance.value._destructor()
  }
})

const initGlobe = () => {
  const world = Globe()(globeDiv.value)
    .globeImageUrl(
      '//unpkg.com/three-globe/example/img/earth-blue-marble.jpg',
    )
    .backgroundColor('#ffffff')
    .width(window.innerWidth)
    .height(window.innerHeight)
    .atmosphereColor('#22d3ee')
    .atmosphereAltitude(0.2)
    .pointOfView({ lat: 35, lng: 105, altitude: 1.2 })

  globeInstance.value = world

  fetch(
    'https://raw.githubusercontent.com/vasturiano/globe.gl/master/example/datasets/ne_110m_admin_0_countries.geojson',
  )
    .then(res => res.json())
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

  window.addEventListener('resize', () => {
    world.width(window.innerWidth)
    world.height(window.innerHeight)
  })
}

const setupScrollAnimation = world => {
  cleanupFunction = initializeAnimationTriggers(world)
  
  // 地球加载完成后隐藏加载界面
  setTimeout(() => {
    isLoading.value = false
  }, 1500)
  
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
    case 1: // 亚洲
      highlightedCountries.value = asiaCountries.map(c => c.code)
      highlightedProvinces.value = []
      break
    case 2: // 欧洲
      highlightedCountries.value = europeCountries.map(c => c.code)
      highlightedProvinces.value = []
      break
    case 3: // 美洲
      highlightedCountries.value = americasCountries.map(c => c.code)
      highlightedProvinces.value = []
      break
    case 4: // 回到中国
      highlightedCountries.value = ['CN']
      highlightedProvinces.value = []
      break
    case 5: // 省份展示
      highlightedCountries.value = ['CN']
      setTimeout(() => {
        highlightedProvinces.value = activeProvinces.map(p => p.code)
      }, 100)
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
    { lat: 35, lng: 105, altitude: 1.2 },
    { lat: 30, lng: 90, altitude: 1.5 },
    { lat: 50, lng: 15, altitude: 1.5 },
    { lat: 20, lng: -90, altitude: 1.5 },
    { lat: 35, lng: 105, altitude: 1.0 },
    { lat: 35, lng: 105, altitude: 0.7 },
  ]

  const handleScroll = () => {
    const scrollTop = scrollWrapper.scrollTop
    let targetIndex = 0

    for (let i = 0; i < triggerPositions.length; i++) {
      if (scrollTop >= triggerPositions[i]) {
        targetIndex = i
      }
    }

    if (targetIndex !== currentCardIndex && !isAnimating) {
      currentCardIndex = targetIndex
      isAnimating = true

      world.pointOfView(targetViews[targetIndex], 800)
      updateHighlightedCountries(targetIndex)
      updateMapDisplay(world)

      setTimeout(() => {
        isAnimating = false
      }, 850)
    }
  }

  scrollWrapper.addEventListener('scroll', handleScroll)

  return () => {
    scrollWrapper.removeEventListener('scroll', handleScroll)
  }
}

// 基于 section 位置的智能触发
const setupSmartPixelTrigger = world => {
  const scrollWrapper = document.querySelector('.scroll-wrapper')
  if (!scrollWrapper) return

  const scrollSections = document.querySelectorAll('.scroll-section')
  if (!scrollSections.length) return

  const targetViews = [
    { lat: 35, lng: 105, altitude: 1.2 },
    { lat: 30, lng: 90, altitude: 1.5 },
    { lat: 50, lng: 15, altitude: 1.5 },
    { lat: 20, lng: -90, altitude: 1.5 },
    { lat: 35, lng: 105, altitude: 1.0 },
    { lat: 35, lng: 105, altitude: 0.7 },
  ]

  const handleScroll = () => {
    const scrollTop = scrollWrapper.scrollTop

    const sectionTriggers = []
    scrollSections.forEach(section => {
      const rect = section.getBoundingClientRect()
      const sectionTop = rect.top + scrollTop
      sectionTriggers.push(sectionTop - 200)
    })

    let targetIndex = 0
    for (let i = 0; i < sectionTriggers.length; i++) {
      if (scrollTop >= sectionTriggers[i]) {
        targetIndex = i
      }
    }

    if (targetIndex !== currentCardIndex && !isAnimating) {
      currentCardIndex = targetIndex
      isAnimating = true

      world.pointOfView(targetViews[targetIndex], 800)
      updateHighlightedCountries(targetIndex)
      updateMapDisplay(world)

      setTimeout(() => {
        isAnimating = false
      }, 850)
    }
  }

  scrollWrapper.addEventListener('scroll', handleScroll)
  return () => scrollWrapper.removeEventListener('scroll', handleScroll)
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
  background: #020617;
  overflow: hidden;
  color: #e5e7eb;
}

/* 确保导航栏在最顶层 */
.site-header {
  z-index: 1001 !important;
  position: fixed !important;
  top: 0 !important;
  left: 0 !important;
  right: 0 !important;
}

/* 加载界面样式 */
.loading-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, #1e3a8a 0%, #3b82f6 50%, #60a5fa 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  backdrop-filter: blur(10px);
}

.loading-content {
  text-align: center;
  color: white;
}

.loading-spinner {
  width: 60px;
  height: 60px;
  border: 4px solid rgba(255, 255, 255, 0.3);
  border-top: 4px solid white;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: 0 auto 20px;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.loading-text {
  font-size: 2rem;
  font-weight: 600;
  margin-bottom: 10px;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
}

.loading-subtext {
  font-size: 1.1rem;
  opacity: 0.9;
  margin: 0;
}

.globe-viz {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 1;
}

.scroll-wrapper {
  position: relative;
  z-index: 2;
  width: 100%;
  height: 100vh;
  overflow-y: auto;
  overflow-x: hidden;
  -webkit-overflow-scrolling: touch;
}

.scroll-content {
  min-height: 100vh;
  position: relative;
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
}

/* 第一个卡片（东雄环保）保持居中 */
.scroll-section:first-child .content-box,
.content-section:first-child .content-box {
  margin: 0 auto;
  text-align: center;
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

.content-section {
  background: var(--color-bg-alt);
}

/* 段落分割线 */
.section-divider {
  height: 13px;
  background: #ffffff;
  width: 90%;
  margin: 0 auto;
  opacity: 1;
}

.content-box {
  background: var(--color-bg-card);
  border: 1px solid var(--color-border);
  padding: 2rem;
  border-radius: 18px;
  color: var(--color-text);
  backdrop-filter: blur(24px);
  -webkit-backdrop-filter: blur(24px);
  max-width: 480px;
  box-shadow: 0 18px 45px rgba(0, 0, 0, 0.08);
  width: 100%;
}

.content-box.glass {
  background: var(--color-bg-card);
  border: 1px solid var(--color-border-strong);
}

h1 {
  font-size: 2.8rem;
  margin-bottom: 1rem;
  color: var(--color-text);
  font-weight: 700;
  letter-spacing: -0.04em;
  text-align: center;
}

/* 首页标题样式 */
.hero-title {
  font-size: 4rem; /* 64px */
  font-weight: 700;
  text-align: center;
  margin-bottom: 1rem;
  background: linear-gradient(120deg, #22d3ee, #a855f7);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

h2 {
  font-size: 2.2rem;
  color: var(--color-text);
  margin-bottom: 1rem;
  font-weight: 600;
  text-align: center;
}

p {
  font-size: 1.05rem;
  line-height: 1.6;
  margin-bottom: 1.5rem;
  color: var(--color-text-secondary);
  text-align: center;
}

.scroll-hint {
  margin-top: 1.5rem;
  opacity: 0.8;
  animation: bounce 2s infinite;
  font-size: 0.95rem;
  text-align: center;
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

.countries-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 1rem;
  margin-top: 1.5rem;
}

.country-card {
  background: rgba(255, 255, 255, 0.95);
  border-radius: 12px;
  padding: 1rem;
  text-align: center;
  cursor: pointer;
  border: 1px solid #e0e0e0;
}



.country-flag {
  font-size: 1.8rem;
  margin-bottom: 0.5rem;
}

.country-name-cn {
  font-size: 0.95rem;
  color: #000000;
  font-weight: 500;
  margin-bottom: 0.2rem;
}

.country-name-en {
  font-size: 0.75rem;
  color: #666666;
  font-weight: 400;
  letter-spacing: 0.05em;
}

.country-card.highlighted .country-name-cn {
  color: #000000;
  font-weight: 600;
}

.country-card.highlighted .country-name-en {
  color: #333333;
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
  color: var(--color-text);
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

.company-modules,
.strength-modules,
.innovation-modules,
.value-modules {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 2rem;
  margin-top: 1.5rem;
  margin-left: 0;
}

.module-item {
  background: #ffffff;
  border-radius: 16px;
  padding: 2.5rem 1.5rem;
  box-shadow: 0 10px 30px rgba(15, 23, 42, 0.08);
  transition: all 0.3s ease;
  border: 1px solid rgba(148, 163, 184, 0.45);
  min-height: 380px;
  min-width: 280px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.module-item:hover {
  transform: translateY(-6px);
  box-shadow: 0 18px 40px rgba(15, 23, 42, 0.16);
}

.module-item h3 {
  font-size: 1.4rem;
  color: #111827;
  margin-bottom: 0.5rem;
  font-weight: 600;
}

.module-item p {
  color: #6b7280;
  line-height: 1.7;
  margin: 0;
  font-size: 0.98rem;
}

@media (max-width: 768px) {
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


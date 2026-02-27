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

        <!-- 企业使命上方的灰色遮罩过渡层 -->
        <div class="mission-overlay">
          <div class="overlay-content">
            <!-- 这里可以添加一些装饰性元素或保持空白 -->
          </div>
        </div>
        
        <!-- 第七屏：企业使命/环保 -->
        <div class="content-section section-7">
          <div class="full-width-content">
            <h2 class="apple-style-title">
              <span class="main-title-keyword">环保</span>，一流的使命
            </h2>
            <p class="subtitle">为地球可持续发展注入东雄动力</p>
            <div class="company-modules dx-card-grid">
              <article class="module-item dx-card">
                <div class="dx-card__media-wrap">
                  <div class="module-item__media dx-card__media" style="background-image: url('/service-bg-new.png');"></div>
                </div>
                <div class="module-item__body dx-card__body">
                  <h3>清洁生产</h3>
                  <p>有色金属冶炼行业清洁化、集约化转型的技术推动者。从工艺源头到末端治理，推动绿色冶炼与资源高效利用，实现生产与环保协同。</p>
                </div>
              </article>
              <article class="module-item dx-card">
                <div class="dx-card__media-wrap">
                  <div class="module-item__media dx-card__media" style="background-image: url('/service-bg-equipment.png');"></div>
                </div>
                <div class="module-item__body dx-card__body">
                  <h3>科技创新</h3>
                  <p>围绕大气污染控制与资源综合利用持续研发新工艺。依托装备与控制系统创新，为脱硫脱硝、除尘及 VOCs 治理提供技术支撑。</p>
                </div>
              </article>
              <article class="module-item dx-card">
                <div class="dx-card__media-wrap">
                  <div class="module-item__media dx-card__media" style="background-image: url('/service-bg-metals-new.png');"></div>
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

        <!-- 第八屏：企业实力 -->
        <div class="content-section section-8">
          <div class="full-width-content">
            <h2 class="apple-style-title">
              <span class="main-title-keyword">实力</span>，值得信赖
            </h2>
            <p class="subtitle">立足中国，服务全球的环保科技企业</p>
            <div class="strength-modules dx-card-grid">
              <article class="module-item dx-card">
                <div class="dx-card__media-wrap">
                  <div class="module-item__media dx-card__media" style="background-image: url('/service-bg-equipment.png');"></div>
                </div>
                <div class="module-item__body dx-card__body">
                  <h3>技术领先</h3>
                  <p>百余项专利与核心技术，覆盖除尘、脱硫、脱硝及冶炼工艺等多个领域，为工程设计与设备选型提供可靠技术保障。</p>
                </div>
              </article>
              <article class="module-item dx-card">
                <div class="dx-card__media-wrap">
                  <div class="module-item__media dx-card__media" style="background-image: url('/service-bg-operation.png');"></div>
                </div>
                <div class="module-item__body dx-card__body">
                  <h3>项目经验</h3>
                  <p>500+ 环保工程项目经验，深度服务冶金、化工、电力等行业，从可研设计到施工运维全流程落地。</p>
                </div>
              </article>
              <article class="module-item dx-card">
                <div class="dx-card__media-wrap">
                  <div class="module-item__media dx-card__media" style="background-image: url('/service-bg-new.png');"></div>
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

        <!-- 第九屏：技术创新 -->
        <div class="content-section section-9">
          <div class="full-width-content">
            <h2 class="apple-style-title">
              <span class="main-title-keyword">创新</span>，不断前行
            </h2>
            <p class="subtitle">以技术创新驱动环保产业升级</p>
            <div class="innovation-modules dx-card-grid">
              <article class="module-item dx-card">
                <div class="dx-card__media-wrap">
                  <div class="module-item__media dx-card__media" style="background-image: url('/service-bg-equipment.png');"></div>
                </div>
                <div class="module-item__body dx-card__body">
                  <h3>持续研发</h3>
                  <p>每年将营收的一定比例投入技术研发与工艺升级，在除尘、脱硫脱硝及冶炼工艺上持续迭代，保持技术领先。</p>
                </div>
              </article>
              <article class="module-item dx-card">
                <div class="dx-card__media-wrap">
                  <div class="module-item__media dx-card__media" style="background-image: url('/service-bg-design.png');"></div>
                </div>
                <div class="module-item__body dx-card__body">
                  <h3>人才驱动</h3>
                  <p>多学科交叉的工程技术团队，覆盖工艺、设备与自动化，从方案设计到现场实施形成闭环能力。</p>
                </div>
              </article>
              <article class="module-item dx-card">
                <div class="dx-card__media-wrap">
                  <div class="module-item__media dx-card__media" style="background-image: url('/service-bg-metals-new.png');"></div>
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

        <!-- 核心团队 -->
        <div class="content-section section-team">
          <div class="full-width-content">
            <h2 class="apple-style-title">
              <span class="main-title-keyword">团队</span>，专业可靠
            </h2>
            <p class="subtitle">以工程实践为底座，为每一次交付负责</p>
            <div class="team-modules dx-card-grid dx-card-grid--solo">
              <article class="module-item dx-card">
                <div class="dx-card__media-wrap">
                  <div
                    class="module-item__media dx-card__media"
                    style="background-image: url('/service-metals.jpg');"
                  ></div>
                </div>
                <div class="module-item__body dx-card__body">
                  <h3>项目总监 · 张工</h3>
                  <p>深耕有色冶炼与烟气治理多年，擅长工况诊断、方案集成与现场落地。坚持“达标、稳定、可维护”的工程标准，推动设计、采购、施工与运维高效协同，确保系统长期稳定运行。</p>
                </div>
              </article>
            </div>
          </div>
        </div>

        <!-- 第十屏：客户价值 -->
        <div class="content-section section-10">
          <div class="full-width-content">
            <h2 class="apple-style-title">
              <span class="main-title-keyword">价值</span>，共同创造
            </h2>
            <p class="subtitle">为客户、行业与社会持续创造环保价值</p>
            <div class="value-modules dx-card-grid">
              <article class="module-item dx-card">
                <div class="dx-card__media-wrap">
                  <div class="module-item__media dx-card__media" style="background-image: url('/service-bg-operation.png');"></div>
                </div>
                <div class="module-item__body dx-card__body">
                  <h3>客户满意</h3>
                  <p>以工程效果与长期稳定运行为核心，从设计、施工到运维全程保障，以交付质量与响应速度赢得客户信赖。</p>
                </div>
              </article>
              <article class="module-item dx-card">
                <div class="dx-card__media-wrap">
                  <div class="module-item__media dx-card__media" style="background-image: url('/service-bg-equipment.png');"></div>
                </div>
                <div class="module-item__body dx-card__body">
                  <h3>环境效益</h3>
                  <p>通过系统性治理与高效装备，显著降低污染物排放与能耗水平，为业主创造合规、节能、可持续的运营环境。</p>
                </div>
              </article>
              <article class="module-item dx-card">
                <div class="dx-card__media-wrap">
                  <div class="module-item__media dx-card__media" style="background-image: url('/service-bg-new.png');"></div>
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
import { onMounted, ref, onUnmounted, computed } from 'vue'
import Globe from 'globe.gl'
import SiteHeader from '../components/SiteHeader.vue'

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

// 粒子动画样式计算
const getParticleStyle = (index) => {
  const delay = Math.random() * 5
  const duration = 4 + Math.random() * 6
  const size = 2 + Math.random() * 4
  
  // 让粒子分布在页面四周，避开中心区域
  let posX, posY
  const quadrant = Math.floor(Math.random() * 4)
  
  switch(quadrant) {
    case 0: // 左上角
      posX = Math.random() * 30
      posY = Math.random() * 30
      break
    case 1: // 右上角
      posX = 70 + Math.random() * 30
      posY = Math.random() * 30
      break
    case 2: // 左下角
      posX = Math.random() * 30
      posY = 70 + Math.random() * 30
      break
    case 3: // 右下角
      posX = 70 + Math.random() * 30
      posY = 70 + Math.random() * 30
      break
  }
  
  return {
    '--delay': `${delay}s`,
    '--duration': `${duration}s`,
    '--size': `${size}px`,
    '--pos-x': `${posX}%`,
    '--pos-y': `${posY}%`
  }
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

// 统一的滚动处理函数
const handleScroll = () => {
  const scrollWrapper = document.querySelector('.scroll-wrapper')
  if (!scrollWrapper) return
  
  const scrollTop = scrollWrapper.scrollTop
  
  // 控制地球位置
  showEarthCenter.value = scrollTop > scrollThreshold.value
  console.log('滚动位置:', scrollTop, '地球状态:', showEarthCenter.value ? '中心' : '右侧')
  
  // 控制卡片动画触发
  const scrollSections = document.querySelectorAll('.scroll-section')
  scrollSections.forEach((section, index) => {
    const sectionRect = section.getBoundingClientRect()
    const sectionTop = sectionRect.top
    const windowHeight = window.innerHeight
    
    // 当区块进入视窗中部时触发动画
    if (sectionTop < windowHeight * 0.6 && sectionTop > -windowHeight * 0.4) {
      if (!animatedSections.value.has(index)) {
        animatedSections.value.add(index)
        console.log('触发动画:', index)
        // 为该区块添加动画类
        const contentBox = section.querySelector('.content-box')
        if (contentBox) {
          // 根据区块位置决定动画方向
          if (index % 2 === 1) { // 奇数区块（右侧）
            contentBox.classList.add('slide-in-right')
          } else if (index % 2 === 0 && index > 0) { // 偶数区块（左侧）
            contentBox.classList.add('slide-in-left')
          }
        }
      }
    }
  })
  
  // 控制卡片切换逻辑
  const triggerPositions = [0, 800, 1600, 2400, 3200, 4000]
  const targetViews = [
    { lat: 35, lng: 105, altitude: 1.2 },
    { lat: 30, lng: 90, altitude: 1.5 },
    { lat: 50, lng: 15, altitude: 1.5 },
    { lat: 20, lng: -90, altitude: 1.5 },
    { lat: 35, lng: 105, altitude: 1.0 },
    { lat: 35, lng: 105, altitude: 0.7 },
  ]
  
  let targetIndex = 0
  for (let i = 0; i < triggerPositions.length; i++) {
    if (scrollTop >= triggerPositions[i]) {
      targetIndex = i
    }
  }
  
  if (targetIndex !== currentCardIndex && !isAnimating) {
    currentCardIndex = targetIndex
    isAnimating = true
    
    // 当到达最后一个板块时停止旋转
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
  
  // 添加滚动监听
  const scrollWrapper = document.querySelector('.scroll-wrapper')
  if (scrollWrapper) {
    scrollWrapper.addEventListener('scroll', handleScroll)
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
  background: linear-gradient(135deg, #1e3a8a 0%, #3b82f6 50%, #60a5fa 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  /* 移除背景模糊 */
  /* 添加渐变动画 */
  background-size: 200% 200%;
  animation: gradientShift 3s ease infinite;
}

/* 地球位置控制 */
.globe-viz {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 1; /* 地球在最底层 */
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
  color: white;
  animation: contentFloat 2s ease-in-out infinite;
}

.loading-spinner {
  width: 60px;
  height: 60px;
  border: 4px solid rgba(255, 255, 255, 0.3);
  border-top: 4px solid white;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: 0 auto 20px;
  box-shadow: 0 0 20px rgba(255, 255, 255, 0.3);
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
  animation: textGlow 2s ease-in-out infinite alternate;
}

.loading-subtext {
  font-size: 1.1rem;
  opacity: 0.9;
  margin: 0;
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

/* 企业使命上方的灰色遮罩过渡层 - 添加真正的渐变效果 */
.mission-overlay {
  position: relative;
  width: 100vw;
  height: 180px;
  /* 创建从透明到浅灰色的平滑渐变遮罩 */
  background: linear-gradient(
    to bottom,
    transparent 0%,
    rgba(245, 245, 247, 0.1) 20%,
    rgba(245, 245, 247, 0.3) 40%,
    rgba(245, 245, 247, 0.6) 60%,
    rgba(245, 245, 247, 0.8) 80%,
    rgba(245, 245, 247, 1) 100%
  );
  z-index: 15;
  backdrop-filter: blur(1px);
  -webkit-backdrop-filter: blur(1px);
  display: flex;
  align-items: center;
  justify-content: center;
  /* 添加微妙的阴影增强过渡效果 */
  box-shadow: inset 0 -15px 25px -10px rgba(245, 245, 247, 0.3);
}

.overlay-content {
  width: 100%;
  height: 100%;
  /* 可以在这里添加装饰性内容 */
}

/* 段落分割线 */
.section-divider {
  height: 13px;
  background: #ffffff;
  width: 90%;
  margin: 0 auto;
  opacity: 1;
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


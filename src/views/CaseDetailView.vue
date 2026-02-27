<template>
  <div class="case-detail-page">
    <!-- 背景微动颗粒 + 光晕 -->
    <div class="background-effects"></div>
    
    <!-- 主要内容 -->
    <div class="content">
      <!-- 面包屑导航 -->
      <div class="breadcrumb">
        <router-link to="/">首页</router-link> / 
        <router-link to="/cases">工程案例</router-link> / {{ currentCase.breadcrumb }}
      </div>

      <!-- 顶部标题区 -->
      <section class="section hero-section">
        <h1 class="hero-title">{{ currentCase.title }}</h1>
        <p class="hero-sub">{{ currentCase.subtitle }}</p>
      </section>

      <!-- Apple风格5屏内容区 -->
      <div class="apple-content-sections">
        <!-- 2. 规模屏 -->
        <section class="apple-screen scale-screen" ref="screen2">
          <div class="screen-content">
            <h2 class="screen-title">处理规模</h2>
            <div class="data-grid">
              <div class="data-item">
                <div class="number" :data-target="currentCase.scale">0</div>
                <div class="unit">万吨/年</div>
                <div class="desc">含锌废料综合处置能力</div>
                <div class="sub-desc">▸ 年处理含锌废料和含锌物料{{ currentCase.scale }}万吨</div>
              </div>
            </div>
          </div>
        </section>
        
        <!-- 3. 产品屏 -->
        <section class="apple-screen product-screen" ref="screen3">
          <div class="screen-content">
            <h2 class="screen-title">产品矩阵</h2>
            <div class="product-grid">
              <div 
                v-for="(product, index) in currentCase.products" 
                :key="index" 
                class="product-item"
              >
                <div class="product-number" :data-target="product.value">0</div>
                <div class="product-unit">{{ product.unit }}</div>
                <div class="product-name">{{ product.name }}</div>
              </div>
            </div>
          </div>
        </section>
        
        <!-- 4. 技术屏 -->
        <section class="apple-screen tech-screen" ref="screen4">
          <div class="screen-content">
            <h2 class="screen-title">资源效率</h2>
            <div class="tech-grid">
              <div 
                v-for="(tech, index) in currentCase.efficiency" 
                :key="index" 
                class="tech-item"
                :class="{ 'highlight': tech.highlight }"
              >
                <div class="tech-number" :data-target="tech.value">0</div>
                <div class="tech-unit">{{ tech.unit }}</div>
                <div class="tech-label">{{ tech.name }}</div>
              </div>
            </div>
          </div>
        </section>
        
        <!-- 5. 经济屏 -->
        <section class="apple-screen economy-screen" ref="screen5">
          <div class="screen-content">
            <h2 class="screen-title">经济效益</h2>
            <div class="economy-grid">
              <div 
                v-for="(eco, index) in currentCase.economy" 
                :key="index" 
                class="economy-item"
              >
                <div class="economy-number" :data-target="eco.value">0</div>
                <div class="economy-unit">{{ eco.unit }}</div>
                <div class="economy-label">{{ eco.name }}</div>
              </div>
            </div>
            <div class="social-value">
              <div 
                v-for="(value, index) in currentCase.socialValue" 
                :key="index" 
                class="value-item"
              >
                {{ value }}
              </div>
            </div>
          </div>
        </section>
        
        <!-- 6. 社会价值屏 -->
        <section class="apple-screen social-screen" ref="screen6">
          <div class="screen-content">
            <h2 class="screen-title">社会价值</h2>
            <div class="social-grid">
              <div class="social-item">
                <div class="social-number">{{ currentCase.economy[0].value }}</div>
                <div class="social-unit">{{ currentCase.economy[0].unit.replace('亿元', '') }}</div>
                <div class="social-label">{{ currentCase.economy[0].name }}</div>
              </div>
              <div class="social-item">
                <div class="social-number">{{ currentCase.economy[1].value }}</div>
                <div class="social-unit">{{ currentCase.economy[1].unit.replace('亿元', '') }}</div>
                <div class="social-label">{{ currentCase.economy[1].name }}</div>
              </div>
              <div class="social-item">
                <div class="social-number">{{ currentCase.economy[2].value }}</div>
                <div class="social-unit">{{ currentCase.economy[2].unit.replace('年', '') }}</div>
                <div class="social-label">{{ currentCase.economy[2].name }}</div>
              </div>
            </div>
          </div>
        </section>
      </div>

      <!-- 项目照片展示区 -->
      <section class="section photos-section">
        <h2 class="section-title">项目实拍</h2>
        <div class="photo-carousel-container">
          <button class="carousel-btn prev-btn" @click="scrollPhotos('prev')">
            <i class="fas fa-chevron-left"></i>
          </button>
          
          <div class="photo-carousel-wrapper">
            <div 
              class="photo-carousel" 
              ref="carouselRef"
              :style="{ transform: `translateX(${scrollPosition}px)` }"
            >
              <div 
                v-for="(photo, index) in currentCase.photos" 
                :key="index" 
                class="photo-item"
                :class="[
                  photo.orientation === 'landscape' ? 'landscape' : 'portrait',
                  `photo-frame${(index % 6) + 1}`
                ]"
              >
                <div 
                  class="photo-frame" 
                  :style="{ backgroundImage: `url(${photo.image})` }"
                >
                  <!-- 对角线遮罩层 -->
                  <div class="diagonal-overlay">
                    <div class="overlay-content">
                      <h3 class="photo-title">{{ photo.caption }}</h3>
                      <p class="photo-desc">{{ photo.description || '项目现场实拍照片' }}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <button class="carousel-btn next-btn" @click="scrollPhotos('next')">
            <i class="fas fa-chevron-right"></i>
          </button>
        </div>
      </section>

      <!-- 技术亮点展示区 -->
      <section class="section tech-section">
        <div class="split-layout">
          <div class="split-left">
            <div class="eyebrow">技术亮点</div>
            <h2 class="tech-title">含锌废料资源化综合利用</h2>
            <p class="tech-description">{{ currentCase.techHighlights }}</p>
          </div>
          <div class="split-right">
            <div class="tech-icon">
              <i class="fas fa-industry"></i>
            </div>
          </div>
        </div>
      </section>

      <!-- 客户评价区 -->
      <section class="section testimonial-section">
        <div class="testimonial">
          <p class="testimonial-quote">"该项目实现了固危废的资源化利用，创造了显著的经济效益和社会价值。"</p>
          <p class="testimonial-author">—— {{ currentCase.customer }}</p>
        </div>
      </section>

      <!-- 底部导航 -->
      <section class="section navigation-section">
        <div class="bottom-nav">
          <router-link to="/cases" class="btn btn-primary">
            <i class="fas fa-th-large"></i>
            返回所有案例
          </router-link>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, nextTick, computed } from 'vue'
import { useRoute } from 'vue-router'

// 静态资源基础路径（适配部署子路径）
const publicBase = import.meta.env.BASE_URL || '/'
const route = useRoute()


// 获取案例ID列表并排序
const getCaseIds = () => Object.keys(caseDataMap).sort((a, b) => parseInt(a) - parseInt(b))

// 计算上一个和下一个案例的ID
const currentCaseId = computed(() => route.params.id || '1')
const currentIndex = computed(() => {
  const ids = getCaseIds();
  return ids.indexOf(currentCaseId.value);
})

const prevCaseId = computed(() => {
  const ids = getCaseIds();
  if (!ids || currentIndex.value <= 0) return ids?.[ids.length - 1] || '1'
  return ids[currentIndex.value - 1]
})

const nextCaseId = computed(() => {
  const ids = getCaseIds();
  if (!ids || currentIndex.value >= ids.length - 1) return ids?.[0] || '1'
  return ids[currentIndex.value + 1]
})

// Apple风格屏幕引用
const screen1 = ref(null)
const screen2 = ref(null)
const screen3 = ref(null)
const screen4 = ref(null)
const screen5 = ref(null)

// 案例数据映射
const caseDataMap = {
  '1': {
    title: '三十万吨含锌固（危）废综合利用项目',
    subtitle: '山西省河津市 · 中禹（山西）新材料有限公司',
    breadcrumb: '山西河津',
    scale: 30,
    products: [
      { value: 6, unit: '万吨', name: '次氧化锌' },
      { value: 6, unit: '万t', name: '锌砂' },
      { value: 3, unit: '万t', name: '粗锌锭' },
      { value: 3, unit: '万t', name: '还原铁粉' },
      { value: 71, unit: 't', name: '稀散金属（铟/锗/镓等）' }
    ],
    efficiency: [
      { value: 92, unit: '%', name: '锌回收率', highlight: true },
      { value: 88, unit: '%', name: '铁回收率' },
      { value: 88, unit: '%', name: '稀散金属提取率' }
    ],
    economy: [
      { value: 15.2, unit: '亿元', name: '年产值' },
      { value: 10.2, unit: '亿元', name: '年净利润' },
      { value: 7.5, unit: '年', name: '投资回收期' }
    ],
    socialValue: ['90个就业岗位', '¥585万环保投入', '尾渣100%资源化'],
    photos: [
      {
        caption: '窑头风机布置',
        orientation: 'landscape',
        image: '/dongxiong-website/cases/case1-horizontal-1.jpg',
        description: '窑头风机系统布置实拍'
      },
      {
        caption: '项目总图',
        orientation: 'landscape',
        image: '/dongxiong-website/cases/case1-horizontal-2.jpg',
        description: '项目整体布局总图实拍'
      },
      {
        caption: '侧视图',
        orientation: 'portrait',
        image: '/dongxiong-website/cases/case1-vertical-1.jpg',
        description: '项目侧视角度实拍'
      },
      {
        caption: '制粒机室',
        orientation: 'landscape',
        image: '/dongxiong-website/cases/case1-horizontal-3.jpg',
        description: '制粒机室内部实拍'
      }
    ],
    techHighlights: '采用先进的火法冶金工艺，实现锌、铁、稀散金属的高效分离与回收，一般固废10万吨+危险废物20万吨的综合处理能力，锌回收率>92%，铁回收率>88%，稀散金属提取率>88%。',
    customer: '中禹（山西）新材料有限公司'
  },
  '2': {
    title: '30万吨/年含锌废料处置利用项目',
    subtitle: '甘肃省白银市 · 白银湘宇麓山环保科技有限公司',
    breadcrumb: '甘肃白银',
    scale: 30,
    products: [
      { value: 8, unit: '万吨', name: '次氧化锌' },
      { value: 12, unit: '万吨', name: '锌焙砂' },
      { value: 5, unit: '万吨', name: '一水硫酸锌' },
      { value: 4, unit: '万吨', name: '还原铁粉' },
      { value: 1, unit: '万吨', name: '炭精粉' }
    ],
    efficiency: [
      { value: 90, unit: '%', name: '锌回收率', highlight: true },
      { value: 85, unit: '%', name: '铁回收率' },
      { value: 80, unit: '%', name: '综合利用率' }
    ],
    economy: [
      { value: 12.5, unit: '亿元', name: '年产值' },
      { value: 8.2, unit: '亿元', name: '年净利润' },
      { value: 6.8, unit: '年', name: '投资回收期' }
    ],
    socialValue: ['120个就业岗位', '¥860万环保投入', '危废减量化90%'],
    photos: [
      {
        caption: '回转窑系统',
        orientation: 'landscape',
        image: '/dongxiong-website/cases/case-2-回转窑.jpg',
        description: '回转窑火法回收工艺核心设备'
      },
      {
        caption: '收尘器系统',
        orientation: 'landscape',
        image: '/dongxiong-website/cases/case-2-收尘器.jpg',
        description: '高效除尘设备实拍'
      },
      {
        caption: '收尘器顶部',
        orientation: 'landscape',
        image: '/dongxiong-website/cases/case-2-收尘器顶部.jpg',
        description: '收尘设备顶部结构细节'
      },
      {
        caption: '冷却器设备',
        orientation: 'portrait',
        image: '/dongxiong-website/cases/case-2-冷却器.jpg',
        description: '产品冷却处理设备'
      },
      {
        caption: '厂房全景',
        orientation: 'landscape',
        image: '/dongxiong-website/cases/case-2-厂房.jpg',
        description: '现代化生产车间全景'
      },
      {
        caption: '皮带输送机',
        orientation: 'landscape',
        image: '/dongxiong-website/cases/case-2-皮带输送机.jpg',
        description: '物料自动化输送系统'
      },
      {
        caption: '抓斗作业',
        orientation: 'portrait',
        image: '/dongxiong-website/cases/case-2-抓斗.jpg',
        description: '原料装卸作业实拍'
      },
      {
        caption: '改造前后对比',
        orientation: 'landscape',
        image: '/dongxiong-website/cases/case-2-改造前.jpg',
        description: '项目改造前后效果对比'
      },
      {
        caption: '脱硫塔设备',
        orientation: 'landscape',
        image: '/dongxiong-website/cases/case-2-脱硫塔2.jpg',
        description: '烟气脱硫处理设备'
      },
      {
        caption: '鱼鳞片密封',
        orientation: 'portrait',
        image: '/dongxiong-website/cases/case-2-鱼鳞片.jpg',
        description: '设备密封部件细节'
      },
      {
        caption: '备用收尘器',
        orientation: 'landscape',
        image: '/dongxiong-website/cases/case-2-收尘器 (2).jpg',
        description: '备用收尘设备实拍'
      }
    ],
    techHighlights: '采用回转窑火法回收工艺（化学还原-氧化法），属于《含锌废料处理处置技术规范》中推荐工艺。年处理含锌废料和含锌物料30万吨，主产品：次氧化锌、锌焙砂、一水硫酸锌，副产品：还原铁粉、炭精粉。',
    customer: '白银湘宇麓山环保科技有限公司'
  },
  '3': {
    title: '工业固体废弃物环保治理及资源化利用项目',
    subtitle: '四川省攀枝花市 · 攀枝花市泓岩科技有限公司',
    breadcrumb: '四川攀枝花',
    scale: 15,
    products: [
      { value: 4.5, unit: '万吨', name: '次氧化锌', highlight: true }
    ],
    efficiency: [
      { value: 85, unit: '%', name: '锌回收率', highlight: true },
      { value: 95, unit: '%', name: '资源化利用率' }
    ],
    economy: [
      { value: 8.6, unit: '亿元', name: '年产值' },
      { value: 5.2, unit: '亿元', name: '年净利润' },
      { value: 5.3, unit: '年', name: '投资回收期' }
    ],
    socialValue: ['80个就业岗位', '¥650万环保投入', '危废减量化95%'],
    photos: [
      {
        caption: '项目全景图',
        orientation: 'landscape',
        image: '/dongxiong-website/cases/cases-3-全景图.jpg',
        description: '攀枝花泓岩科技项目整体布局全景'
      },
      {
        caption: '项目点火仪式',
        orientation: 'landscape',
        image: '/dongxiong-website/cases/cases-3-点火仪式.jpg',
        description: '项目正式投产点火仪式'
      },
      {
        caption: '控制室操作',
        orientation: 'portrait',
        image: '/dongxiong-website/cases/cases-3-控制室.jpg',
        description: '现代化中央控制室操作界面'
      },
      {
        caption: '圆盘造粒机',
        orientation: 'landscape',
        image: '/dongxiong-website/cases/cases-3-圆盘造粒机.jpg',
        description: '产品成型圆盘造粒设备'
      },
      {
        caption: '自动配料系统',
        orientation: 'landscape',
        image: '/dongxiong-website/cases/cases-3-自动配料系统.jpg',
        description: '原料自动配料控制系统'
      },
      {
        caption: '在线监测系统',
        orientation: 'portrait',
        image: '/dongxiong-website/cases/cases-3-在线监测系统.jpg',
        description: '环保在线监测设备实拍'
      },
      {
        caption: '成品包装区',
        orientation: 'landscape',
        image: '/dongxiong-website/cases/cases-3-成品包装.jpg',
        description: '次氧化锌成品自动包装线'
      },
      {
        caption: '脱硫塔设备',
        orientation: 'portrait',
        image: '/dongxiong-website/cases/cases-3-脱硫塔.jpg',
        description: '烟气脱硫处理塔设备'
      },
      {
        caption: '自动化控制',
        orientation: 'portrait',
        image: '/dongxiong-website/cases/cases-3-自动化控制.jpg',
        description: 'DCS自动化控制系统'
      },
      {
        caption: '设备安装现场',
        orientation: 'landscape',
        image: '/dongxiong-website/cases/cases-3-设备安装.jpg',
        description: '项目建设期间设备安装实况'
      },
      {
        caption: '回转窑窑头',
        orientation: 'landscape',
        image: '/dongxiong-website/cases/cases-3-窑头.jpg',
        description: 'Φ3.6m×53m回转窑窑头设备实拍'
      }
    ],
    techHighlights: '采用回转窑火法回收工艺（化学还原-氧化法），通过回转窑挥发工艺和回转窑二次焙烧工艺回收锌元素。处理电镀锌槽渣、电炉炼钢灰、锌焙烧矿浸出渣、锌净化渣、铁钒渣、针铁矿渣等六类含锌危险废物。',
    customer: '攀枝花市泓岩科技有限公司'
  },
  '4': {
    title: '渤海新区新建除尘灰综合利用项目（一期）',
    subtitle: '河北省沧州市渤海新区 · 河北煜泽之鑫环保科技有限公司',
    breadcrumb: '河北沧州',
    scale: 20,
    products: [
      { value: 2.4, unit: '万吨', name: '次氧化锌', highlight: true },
      { value: 2, unit: '万吨', name: '还原铁粉' }
    ],
    efficiency: [
      { value: 88, unit: '%', name: '锌回收率', highlight: true },
      { value: 92, unit: '%', name: '铁回收率' },
      { value: 95, unit: '%', name: '资源综合利用率' }
    ],
    economy: [
      { value: 9.8, unit: '亿元', name: '年产值' },
      { value: 6.1, unit: '亿元', name: '年净利润' },
      { value: 5.8, unit: '年', name: '投资回收期' }
    ],
    socialValue: ['100个就业岗位', '¥780万环保投入', '粉尘减排90%'],
    photos: [
      {
        caption: '项目全景图',
        orientation: 'landscape',
        image: '/dongxiong-website/cases/cases-4-项目局部图.jpg',
        description: '渤海新区新型建材园项目整体布局'
      },
      {
        caption: 'D4000回转窑',
        orientation: 'landscape',
        image: '/dongxiong-website/cases/cases-4-窑头.jpg',
        description: 'D4000型回转窑装置核心设备'
      },
      {
        caption: '脱硫塔设备',
        orientation: 'portrait',
        image: '/dongxiong-website/cases/cases-4-脱硫塔.jpg',
        description: '烟气脱硫处理塔设备'
      },
      {
        caption: '原料储存区',
        orientation: 'landscape',
        image: '/dongxiong-website/cases/cases-4-湖心工岛.jpg',
        description: '电炉灰、高炉灰等原料储存'
      },
      {
        caption: '废气处理系统',
        orientation: 'landscape',
        image: '/dongxiong-website/cases/case-2-收尘器.jpg',
        description: '布袋收尘处理系统'
      },
      {
        caption: '中央控制室',
        orientation: 'portrait',
        image: '/dongxiong-website/cases/cases-4-可视化控制.jpg',
        description: '现代化集散控制系统'
      },
      {
        caption: '成品包装线',
        orientation: 'landscape',
        image: '/dongxiong-website/cases/cases-3-成品包装.jpg',
        description: '次氧化锌和还原铁粉自动包装'
      },
      {
        caption: '环保在线监测',
        orientation: 'landscape',
        image: '/dongxiong-website/cases/cases-4-环保排放实时监测.jpg',
        description: '环保排放实时监测平台'
      },
      {
        caption: '压力检测系统',
        orientation: 'portrait',
        image: '/dongxiong-website/cases/cases-4-压力检测.jpg',
        description: '设备压力在线检测系统'
      },
      {
        caption: '现场技术交流',
        orientation: 'landscape',
        image: '/dongxiong-website/cases/cases-4-现场交流.jpg',
        description: '项目建设期间技术交流实况'
      }
    ],
    techHighlights: '采用回转窑焙烧工艺，配套铁粉精选装置，处理电炉灰、高炉灰、铅水渣、镀锌槽渣、氧化锌浸出渣等多种原料。通过PNCR脱硝+重力沉降+表冷器+布袋收尘+石灰-石膏法脱硫工艺实现清洁生产。',
    customer: '河北煜泽之鑫环保科技有限公司'
  },
  '5': {
    title: '临沂鑫钢毅再生资源有限公司年处置16.5万吨除尘灰项目',
    subtitle: '山东省临沂市 · 临沂鑫钢毅再生资源有限公司',
    breadcrumb: '山东临沂',
    scale: 16.5,
    products: [
      { value: 3.2, unit: '万吨', name: '有价金属', highlight: true },
      { value: 13.3, unit: '万吨', name: '其他产品' }
    ],
    efficiency: [
      { value: 85, unit: '%', name: '资源回收率', highlight: true },
      { value: 95, unit: '%', name: '综合利用率' }
    ],
    economy: [
      { value: 7.2, unit: '亿元', name: '年产值' },
      { value: 4.5, unit: '亿元', name: '年净利润' },
      { value: 4.2, unit: '年', name: '投资回收期' }
    ],
    socialValue: ['75个就业岗位', '¥200万环保投入', '粉尘减排85%'],
    photos: [
      {
        caption: '项目全景图',
        orientation: 'landscape',
        image: '/dongxiong-website/cases/case-5-厂房.jpg',
        description: '临沂临港经济开发区项目整体布局'
      },
      {
        caption: '窑体安装现场',
        orientation: 'landscape',
        image: '/dongxiong-website/cases/cases-5-窑体安装.jpg',
        description: '回转窑窑体安装施工实况'
      },
      {
        caption: '窑体设备',
        orientation: 'portrait',
        image: '/dongxiong-website/cases/cases-5-窑体.jpg',
        description: '除尘灰处理回转窑核心设备'
      },
      {
        caption: '燃烧器系统',
        orientation: 'landscape',
        image: '/dongxiong-website/cases/燃烧器.jpg',
        description: '高效燃烧器设备'
      },
      {
        caption: '收尘器设备',
        orientation: 'landscape',
        image: '/dongxiong-website/cases/cases-5-收尘器.jpg',
        description: '高效除尘处理设备'
      },
      {
        caption: '可视化控制系统',
        orientation: 'portrait',
        image: '/dongxiong-website/cases/cases-5-可视化控制.jpg',
        description: '现代化集散控制系统'
      },
      {
        caption: '传动机组',
        orientation: 'landscape',
        image: '/dongxiong-website/cases/cases-5-传动机.jpg',
        description: '设备传动系统'
      },
      {
        caption: '脱硫塔设备',
        orientation: 'landscape',
        image: '/dongxiong-website/cases/脱硫塔.jpg',
        description: '烟气脱硫处理设备'
      },
      {
        caption: '自动化控制',
        orientation: 'portrait',
        image: '/dongxiong-website/cases/自动化控制.jpg',
        description: 'PLC自动化控制系统'
      },
      {
        caption: '动土仪式',
        orientation: 'landscape',
        image: '/dongxiong-website/cases/cases-5-动土仪式.jpg',
        description: '项目正式启动动土仪式'
      },
      {
        caption: '夜间施工',
        orientation: 'landscape',
        image: '/dongxiong-website/cases/case-5-夜间局部图.jpg',
        description: '夜间施工进展情况'
      },
      {
        caption: '工人施工中',
        orientation: 'portrait',
        image: '/dongxiong-website/cases/cases-5-工人施工中.jpg',
        description: '现场施工作业实况'
      }
    ],
    techHighlights: '采用回转窑焙烧工艺从除尘灰中回收有价金属，实现钢铁产业配套循环经济。项目位于临沂钢铁投资集团特钢有限公司厂内，通过密闭储存、密闭输送、高效除尘等措施实现清洁生产，服务上游钢铁企业除尘灰资源化利用。',
    customer: '临沂鑫钢毅再生资源有限公司'
  }
}

// 当前案例数据
const currentCase = computed(() => {
  const caseId = route.params.id || '1'
  return caseDataMap[caseId] || caseDataMap['1']
})

// 项目实拍照片（动态获取当前案例数据）
const photoData = computed(() => currentCase.value.photos || [])

// 轮播相关
const carouselRef = ref(null)
const scrollPosition = ref(0)
const itemWidth = ref(320) // 每张照片的基础宽度
const gap = ref(24) // 间距

// Apple风格数字滚动动画
const animateNumbers = (screenIndex) => {
  const screens = [screen1, screen2, screen3, screen4, screen5]
  const currentScreen = screens[screenIndex - 1]?.value
  
  if (!currentScreen) return
  
  const numberElements = currentScreen.querySelectorAll('.number[data-target], .product-number[data-target], .tech-number[data-target], .economy-number[data-target]')
  
  numberElements.forEach((el, index) => {
    const target = parseFloat(el.dataset.target)
    const duration = 1500
    const startTime = Date.now() + index * 100
    
    const updateNumber = () => {
      const elapsed = Date.now() - startTime
      const progress = Math.min(elapsed / duration, 1)
      
      // ease-out 缓动
      const easeOut = 1 - Math.pow(1 - progress, 3)
      const current = target * easeOut
      
      // 格式化显示
      if (target === 15.2 || target === 10.2 || target === 7.5) {
        // 小数数据保留一位小数
        el.textContent = current.toFixed(progress === 1 ? 1 : 1)
      } else if (target === 92 || target === 88) {
        // 百分比数据，整数显示但带>符号
        el.textContent = '>' + current.toFixed(progress === 1 ? 0 : 0)
      } else {
        // 整数数据
        el.textContent = current.toFixed(progress === 1 ? 0 : 0)
      }
      
      if (progress < 1) {
        requestAnimationFrame(updateNumber)
      }
    }
      
    // 立即开始动画
    updateNumber()
  })
}

// 照片轮播功能
const scrollPhotos = (direction) => {
  // 预计算各位置的滚动值（基于实际图片尺寸）
  const positions = [0];
  let currentPos = 0;
  
  for (let i = 0; i < photoData.value.length - 1; i++) {
    const photo = photoData.value[i];
    const width = photo.orientation === 'landscape' ? 711 : 400;
    currentPos -= (width + gap.value);
    positions.push(currentPos);
  }
  
  // 找到当前所在的位置索引
  let currentIndex = 0;
  for (let i = 0; i < positions.length; i++) {
    if (scrollPosition.value >= positions[i]) {
      currentIndex = i;
      break;
    }
  }
  
  // 计算目标位置
  let targetIndex;
  if (direction === 'next') {
    targetIndex = Math.min(currentIndex + 1, positions.length - 1);
  } else {
    targetIndex = Math.max(currentIndex - 1, 0);
  }
  
  scrollPosition.value = positions[targetIndex];
}

// Apple风格滚动监听
const handleScroll = () => {
  const screens = [screen1, screen2, screen3, screen4, screen5]
  
  screens.forEach((screenRef, index) => {
    const screen = screenRef.value
    if (!screen) return
    
    const rect = screen.getBoundingClientRect()
    const isVisible = rect.top <= window.innerHeight * 0.6 && rect.bottom >= window.innerHeight * 0.4
    
    if (isVisible && !screen.classList.contains('visible')) {
      // 触发动画
      screen.classList.add('visible')
      setTimeout(() => {
        animateNumbers(index + 1)
      }, 300)
    }
  })
}

// 组件挂载
onMounted(async () => {
  await nextTick()
  
  // 初始化第一屏动画
  setTimeout(() => {
    if (screen1.value) {
      screen1.value.classList.add('visible')
      animateNumbers(1)
    }
  }, 500)
  
  // 添加滚动监听
  window.addEventListener('scroll', handleScroll)
})
</script>

<style scoped>
.case-detail-page {
  background-color: #0A1929;
  color: #FFFFFF;
  font-family: system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', 'Inter', sans-serif;
  line-height: 1.5;
  overflow-x: hidden;
  min-height: 100vh;
}

/* 背景微动颗粒 + 光晕 */
.background-effects {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: 
    radial-gradient(circle at 30% 40%, rgba(0,113,227,0.08) 0%, transparent 40%),
    repeating-radial-gradient(circle at 20% 30%, rgba(255,255,255,0.02) 0px, transparent 1px);
  pointer-events: none;
  z-index: 0;
  animation: slowDrift 40s infinite alternate ease-in-out;
}

@keyframes slowDrift {
  0% { transform: scale(1) translate(0, 0); opacity: 0.7; }
  100% { transform: scale(1.2) translate(-2%, -1%); opacity: 1; }
}

/* 主要内容区 */
.content {
  position: relative;
  z-index: 2;
  max-width: 100%;
  margin: 0 auto;
  padding: 0 20px;
}

/* 区块样式 */
.section {
  min-height: 80vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 2vh 0;
  border-bottom: 1px solid rgba(255,255,255,0.02);
}

.hero-section {
  min-height: 85vh;
  justify-content: flex-end;
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;
  padding-left: 50px;
  padding-right: 50px;
}

/* 面包屑导航 */
.breadcrumb {
  color: #A0A0A0;
  font-size: 0.85rem;
  letter-spacing: 0.5px;
  margin-bottom: 2rem;
  opacity: 0;
  animation: fadeInUp 0.8s forwards;
  animation-delay: 0.2s;
}

.breadcrumb a {
  color: #C0C0C0;
  text-decoration: none;
  border-bottom: 1px solid transparent;
  transition: border-color 0.2s;
}

.breadcrumb a:hover {
  border-color: #0071e3;
}

/* 标题样式 - 居中显示，不影响照片宽度 */
.section-title {
  font-size: 2rem;
  color: #FFFFFF;
  font-weight: 700;
  text-align: center;
  margin-bottom: 2rem;
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;
}

.hero-title {
  font-size: clamp(3rem, 10vw, 6rem);
  font-weight: 600;
  line-height: 1.1;
  margin-bottom: 1rem;
  opacity: 0;
  animation: fadeInUp 0.8s forwards;
  animation-delay: 0.3s;
  text-align: left;
}

.hero-sub {
  font-size: 1.4rem;
  color: #C0C0C0;
  font-weight: 300;
  max-width: 800px;
  opacity: 0;
  animation: fadeInUp 0.8s forwards;
  animation-delay: 0.4s;
  text-align: left;
}

.eyebrow {
  color: #0071e3;
  font-size: 0.9rem;
  text-transform: uppercase;
  letter-spacing: 2px;
  margin-bottom: 1rem;
  font-weight: 400;
  text-align: left;
}

/* Apple风格内容区域 */
.apple-content-sections {
  background: transparent;
  color: #ffffff;
  font-family: 'SF Pro Display', system-ui, -apple-system, sans-serif;
}

.apple-screen {
  height: 70vh;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  opacity: 0;
  transform: translateY(20px);
  transition: all 0.8s ease-out;
}

.apple-screen.visible {
  opacity: 1;
  transform: translateY(0);
}

.screen-content {
  text-align: center;
  max-width: 1200px;
  padding: 0 10px;
  width: 100%;
}

/* 身份屏 */
.identity-screen .project-title {
  font-size: clamp(2.5rem, 5vw, 4rem);
  font-weight: 800;
  margin-bottom: 20px;
  line-height: 1.2;
}

.company-info {
  font-size: 1.5rem;
  color: #0071e3;
  font-weight: 500;
  margin-bottom: 15px;
}

.location-info {
  font-size: 1.2rem;
  color: #86868b;
}

/* 数据网格通用样式 */
.data-grid,
.product-grid,
.tech-grid,
.economy-grid {
  display: flex;
  justify-content: center;
  gap: 80px;
  margin: 40px 0;
}

.data-item,
.product-item,
.tech-item,
.economy-item {
  display: flex;
  flex-direction: column;
  align-items: center;
}

/* 数字样式 */
.number,
.product-number,
.tech-number,
.economy-number {
  font-size: 80px;
  font-weight: 800;
  color: #ffffff;
  line-height: 1;
  margin-bottom: 10px;
  font-variant-numeric: tabular-nums;
}

.tech-item.highlight .tech-number {
  color: #30d158;
  text-shadow: 0 0 24px rgba(48, 209, 88, 0.2);
}

/* 单位和标签 */
.unit,
.product-unit,
.tech-unit,
.economy-unit {
  font-size: 16px;
  color: #86868b;
  margin-bottom: 8px;
}

.label,
.product-name,
.tech-label,
.economy-label {
  font-size: 14px;
  color: #6e6e73;
  font-weight: 400;
}

/* 屏幕标题 */
.screen-title {
  font-size: 2rem;
  font-weight: 600;
  margin-bottom: 60px;
  color: #ffffff;
}

/* 详细文本 */
detail-text {
  font-size: 1.1rem;
  color: #86868b;
  margin-top: 20px;
}

/* 社会价值 */
.social-value {
  display: flex;
  justify-content: center;
  gap: 40px;
  margin-top: 40px;
  flex-wrap: wrap;
}

.value-item {
  font-size: 1.1rem;
  color: #6e6e73;
  padding: 8px 20px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  backdrop-filter: blur(10px);
  background: rgba(255, 255, 255, 0.05);
}

/* 轮播容器 */
.photo-carousel-container {
  position: relative;
  width: 100%;
  max-width: 100%;
  margin: 40px auto;
  display: flex;
  align-items: center;
  gap: 20px;
}

/* 轮播按钮 */
.carousel-btn {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  flex-shrink: 0;
  backdrop-filter: blur(10px);
}

.carousel-btn:hover {
  background: rgba(255, 255, 255, 0.2);
  border-color: rgba(255, 255, 255, 0.4);
  transform: scale(1.1);
}

.carousel-btn i {
  font-size: 1.2rem;
}

/* 轮播包装器 */
.photo-carousel-wrapper {
  flex: 1;
  overflow: hidden;
  border-radius: 20px;
}

/* 轮播轨道 */
.photo-carousel {
  display: flex;
  gap: 24px;
  transition: transform 0.5s cubic-bezier(0.25, 0.1, 0.25, 1);
  will-change: transform;
}

/* 照片项基础样式 */
.photo-item {
  flex: 0 0 auto;
  opacity: 0;
  transform: translateX(-20px);
  animation: slideInPhoto 0.7s forwards;
}

/* 竖向照片 (3:4比例) */
.photo-item.portrait {
  width: 400px;
}

.photo-item.portrait .photo-frame {
  width: 400px;
  height: 533px;
}

/* 横向照片 (4:3比例) */
.photo-item.landscape {
  width: 711px;
}

.photo-item.landscape .photo-frame {
  width: 711px;
  height: 533px;
}

/* 照片框架 */
.photo-frame {
  border-radius: 20px;
  background: #0a1929;
  background-size: cover;
  background-position: center;
  transition: all 0.3s ease;
  box-shadow: 0 15px 25px -8px black;
  position: relative;
  overflow: hidden;
}

/* 对角线遮罩层 - 持续缩小覆盖面积 */
.diagonal-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  /* 使用mask创建三角形遮罩，持续缩小覆盖面积 */
  mask: linear-gradient(
    to bottom right,
    black 0%,
    black 25%,
    transparent 100%
  );
  -webkit-mask: linear-gradient(
    to bottom right,
    black 0%,
    black 25%,
    transparent 100%
  );
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  padding: 20px;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.photo-frame:hover .diagonal-overlay {
  opacity: 1;
}

.overlay-content {
  color: white;
  max-width: 80%;
}

.photo-title {
  font-size: 1.4rem;
  font-weight: 600;
  margin: 0 0 8px 0;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
}

.photo-desc {
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.85);
  margin: 0;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.5);
}

/* 不同照片的背景样式 - 简化为纯色 */
.photo-frame1 { background: #0a1929; }
.photo-frame2 { background: #0a1929; }
.photo-frame3 { background: #0a1929; }
.photo-frame4 { background: #0a1929; }
.photo-frame5 { background: #0a1929; }
.photo-frame6 { background: #0a1929; }

/* 悬停效果 */
.photo-item:hover .photo-frame {
  filter: grayscale(0%) contrast(100%);
  transform: scale(1.02);
  box-shadow: 0 20px 30px -5px #0071e3;
}

/* 照片标题 */
.photo-caption {
  text-align: center;
  font-size: 0.9rem;
  color: #A0A0A0;
  margin-top: 10px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* 原始照片网格样式（保留以防需要） */
.photo-grid {
  display: flex;
  gap: 24px;
  margin: 40px 0;
  flex-wrap: wrap;
}

/* 技术亮点分栏 */
.split-layout {
  display: flex;
  gap: 60px;
  align-items: center;
  margin: 30px 0;
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;
}

.split-left {
  flex: 5;
  opacity: 0;
  transform: translateX(-30px);
  animation: slideInLeft 0.8s forwards;
  padding-left: 50px;
}

.split-right {
  flex: 4;
  display: flex;
  justify-content: center;
  opacity: 0;
  transform: translateX(30px);
  animation: slideInRight 0.8s forwards;
  animation-delay: 0.1s;
}

.tech-title {
  font-size: 2.5rem;
  color: #FFFFFF;
  font-weight: 700;
  letter-spacing: -0.3px;
  margin-bottom: 25px;
  line-height: 1.2;
  text-align: left;
}

.tech-description {
  font-size: 1.1rem;
  color: #C0C0C0;
  line-height: 1.6;
  text-align: left;
}

.tech-icon {
  width: 280px;
  height: 280px;
  background: radial-gradient(circle at 30% 40%, #1e3a6b, #0a1a2f);
  border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid rgba(0,113,227,0.3);
  box-shadow: 0 0 30px rgba(0,113,227,0.2);
  animation: floatShape 6s infinite alternate ease-in-out;
}

.tech-icon i {
  font-size: 5rem;
  color: #0071e3;
  opacity: 0.8;
}

@keyframes floatShape {
  0% { 
    border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%; 
    transform: rotate(0deg); 
  }
  100% { 
    border-radius: 70% 30% 30% 70% / 60% 40% 60% 40%; 
    transform: rotate(5deg); 
  }
}

/* 客户评价 */
.testimonial {
  text-align: center;
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 0;
  opacity: 0;
  transform: scale(0.95);
  animation: fadeScale 0.9s forwards;
}

.testimonial-quote {
  font-size: 1.8rem;
  color: #E0E0E0;
  font-style: italic;
  font-weight: 300;
  line-height: 1.4;
  position: relative;
}

.testimonial-quote::before {
  content: '“';
  font-size: 4rem;
  color: #0071e3;
  opacity: 0.4;
  position: absolute;
  left: -30px;
  top: -20px;
}

.testimonial-author {
  margin-top: 30px;
  font-size: 1rem;
  color: #A0A0A0;
}

/* 底部导航 */
.bottom-nav {
  display: flex;
  gap: 25px;
  justify-content: center;
  padding: 60px 0 80px;
  flex-wrap: wrap;
}

.btn {
  padding: 10px 28px;
  border-radius: 40px;
  font-size: 1rem;
  font-weight: 400;
  text-decoration: none;
  transition: all 0.25s ease;
  cursor: pointer;
  border: 1px solid transparent;
  background: transparent;
  color: white;
  display: inline-flex;
  align-items: center;
  gap: 8px;
}

.btn-outline {
  border: 1px solid rgba(255,255,255,0.3);
  background: transparent;
}

.btn-outline:hover {
  border-color: white;
  background: rgba(255,255,255,0.05);
  transform: scale(1.02);
}

.btn-primary {
  background: #0071e3;
  color: white;
  border: none;
}

.btn-primary:hover {
  background: #0077ed;
  transform: scale(1.02);
  box-shadow: 0 10px 20px -8px #0071e3;
}

/* 动画定义 */
@keyframes fadeInUp {
  0% { opacity: 0; transform: translateY(30px); }
  100% { opacity: 1; transform: translateY(0); }
}

@keyframes slideUpFade {
  0% { opacity: 0; transform: translateY(30px); }
  100% { opacity: 1; transform: translateY(0); }
}

@keyframes slideInPhoto {
  0% { opacity: 0; transform: translateX(-20px); }
  100% { opacity: 1; transform: translateX(0); }
}

@keyframes slideInLeft {
  0% { opacity: 0; transform: translateX(-30px); }
  100% { opacity: 1; transform: translateX(0); }
}

@keyframes slideInRight {
  0% { opacity: 0; transform: translateX(30px); }
  100% { opacity: 1; transform: translateX(0); }
}

@keyframes fadeScale {
  0% { opacity: 0; transform: scale(0.95); }
  100% { opacity: 1; transform: scale(1); }
}

/* 响应式设计 */
@media (max-width: 1000px) {
  .content {
    padding: 0 30px;
  }
  
  .split-layout {
    flex-direction: column;
    gap: 40px;
  }
  
  .hero-title {
    font-size: 3.5rem;
  }
  
  .card-grid {
    gap: 20px;
  }
  
  .stat-card {
    padding: 2rem 1rem;
    width: 240px;
  }
  
  .photo-carousel-container {
    max-width: 1000px;
    gap: 15px;
    padding: 0;
  }
  
  .carousel-btn {
    width: 35px;
    height: 35px;
  }
  
  .photo-item.portrait {
    width: 340px;
  }
  
  .photo-item.portrait .photo-frame {
    width: 340px;
    height: 453px;
  }
  
  .photo-item.landscape {
    width: 604px;
  }
  
  .photo-item.landscape .photo-frame {
    width: 604px;
    height: 453px;
  }
  
  .tech-title {
    font-size: 2.2rem;
  }
}

@media (max-width: 768px) {
  .content {
    padding: 0 20px;
  }
  
  .hero-title {
    font-size: 2.8rem;
  }
}

/* 轮播容器 */
.photo-carousel-container {
  position: relative;
  width: 100%;
  max-width: 100%;
  margin: 40px auto;
  display: flex;
  align-items: center;
  gap: 20px;
}

/* 轮播按钮 */
.carousel-btn {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  flex-shrink: 0;
  backdrop-filter: blur(10px);
}

.carousel-btn:hover {
  background: rgba(255, 255, 255, 0.2);
  border-color: rgba(255, 255, 255, 0.4);
  transform: scale(1.1);
}

.carousel-btn i {
  font-size: 1.2rem;
}

/* 轮播包装器 */
.photo-carousel-wrapper {
  flex: 1;
  overflow: hidden;
  border-radius: 20px;
}

/* 轮播轨道 */
.photo-carousel {
  display: flex;
  gap: 24px;
  transition: transform 0.5s cubic-bezier(0.25, 0.1, 0.25, 1);
  will-change: transform;
}

/* 照片项基础样式 */
.photo-item {
  flex: 0 0 auto;
  opacity: 0;
  transform: translateX(-20px);
  animation: slideInPhoto 0.7s forwards;
}

/* 竖向照片 (3:4比例) */
.photo-item.portrait {
  width: 400px;
}

.photo-item.portrait .photo-frame {
  width: 400px;
  height: 533px;
}

/* 横向照片 (4:3比例) */
.photo-item.landscape {
  width: 711px;
}

.photo-item.landscape .photo-frame {
  width: 711px;
  height: 533px;
}

/* 照片框架 */
.photo-frame {
  border-radius: 20px;
  background: #0a1929;
  background-size: cover;
  background-position: center;
  transition: all 0.3s ease;
  box-shadow: 0 15px 25px -8px black;
  position: relative;
  overflow: hidden;
}

/* 对角线遮罩层 - 持续缩小覆盖面积 */
.diagonal-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  /* 使用mask创建三角形遮罩，持续缩小覆盖面积 */
  mask: linear-gradient(
    to bottom right,
    black 0%,
    black 25%,
    transparent 100%
  );
  -webkit-mask: linear-gradient(
    to bottom right,
    black 0%,
    black 25%,
    transparent 100%
  );
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  padding: 20px;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.photo-frame:hover .diagonal-overlay {
  opacity: 1;
}

.overlay-content {
  color: white;
  max-width: 80%;
}

.photo-title {
  font-size: 1.4rem;
  font-weight: 600;
  margin: 0 0 8px 0;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
}

.photo-desc {
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.85);
  margin: 0;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.5);
}

/* 不同照片的背景样式 - 简化为纯色 */
.photo-frame1 { background: #0a1929; }
.photo-frame2 { background: #0a1929; }
.photo-frame3 { background: #0a1929; }
.photo-frame4 { background: #0a1929; }
.photo-frame5 { background: #0a1929; }
.photo-frame6 { background: #0a1929; }

/* 悬停效果 */
.photo-item:hover .photo-frame {
  filter: grayscale(0%) contrast(100%);
  transform: scale(1.02);
  box-shadow: 0 20px 30px -5px #0071e3;
}

/* 照片标题 */
.photo-caption {
  text-align: center;
  font-size: 0.9rem;
  color: #A0A0A0;
  margin-top: 10px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* 原始照片网格样式（保留以防需要） */
.photo-grid {
  display: flex;
  gap: 24px;
  margin: 40px 0;
  flex-wrap: wrap;
}

/* 技术亮点分栏 */
.split-layout {
  display: flex;
  gap: 60px;
  align-items: center;
  margin: 30px 0;
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;
}

.split-left {
  flex: 5;
  opacity: 0;
  transform: translateX(-30px);
  animation: slideInLeft 0.8s forwards;
  padding-left: 50px;
}

.split-right {
  flex: 4;
  display: flex;
  justify-content: center;
  opacity: 0;
  transform: translateX(30px);
  animation: slideInRight 0.8s forwards;
  animation-delay: 0.1s;
}

.tech-title {
  font-size: 2.5rem;
  color: #FFFFFF;
  font-weight: 700;
  letter-spacing: -0.3px;
  margin-bottom: 25px;
  line-height: 1.2;
  text-align: left;
}

.tech-description {
  font-size: 1.1rem;
  color: #C0C0C0;
  line-height: 1.6;
  text-align: left;
}

.tech-icon {
  width: 280px;
  height: 280px;
  background: radial-gradient(circle at 30% 40%, #1e3a6b, #0a1a2f);
  border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid rgba(0,113,227,0.3);
  box-shadow: 0 0 30px rgba(0,113,227,0.2);
  animation: floatShape 6s infinite alternate ease-in-out;
}

.tech-icon i {
  font-size: 5rem;
  color: #0071e3;
  opacity: 0.8;
}

@keyframes floatShape {
  0% { 
    border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%; 
    transform: rotate(0deg); 
  }
  100% { 
    border-radius: 70% 30% 30% 70% / 60% 40% 60% 40%; 
    transform: rotate(5deg); 
  }
}

/* 客户评价 */
.testimonial {
  text-align: center;
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 0;
  opacity: 0;
  transform: scale(0.95);
  animation: fadeScale 0.9s forwards;
}

.testimonial-quote {
  font-size: 1.8rem;
  color: #E0E0E0;
  font-style: italic;
  font-weight: 300;
  line-height: 1.4;
  position: relative;
}

.testimonial-quote::before {
  content: '“';
  font-size: 4rem;
  color: #0071e3;
  opacity: 0.4;
  position: absolute;
  left: -30px;
  top: -20px;
}

.testimonial-author {
  margin-top: 30px;
  font-size: 1rem;
  color: #A0A0A0;
}

/* 底部导航 */
.bottom-nav {
  display: flex;
  gap: 25px;
  justify-content: center;
  padding: 60px 0 80px;
  flex-wrap: wrap;
}

.btn {
  padding: 10px 28px;
  border-radius: 40px;
  font-size: 1rem;
  font-weight: 400;
  text-decoration: none;
  transition: all 0.25s ease;
  cursor: pointer;
  border: 1px solid transparent;
  background: transparent;
  color: white;
  display: inline-flex;
  align-items: center;
  gap: 8px;
}

.btn-outline {
  border: 1px solid rgba(255,255,255,0.3);
  background: transparent;
}

.btn-outline:hover {
  border-color: white;
  background: rgba(255,255,255,0.05);
  transform: scale(1.02);
}

.btn-primary {
  background: #0071e3;
  color: white;
  border: none;
}

.btn-primary:hover {
  background: #0077ed;
  transform: scale(1.02);
  box-shadow: 0 10px 20px -8px #0071e3;
}

/* 动画定义 */
@keyframes fadeInUp {
  0% { opacity: 0; transform: translateY(30px); }
  100% { opacity: 1; transform: translateY(0); }
}

@keyframes slideUpFade {
  0% { opacity: 0; transform: translateY(30px); }
  100% { opacity: 1; transform: translateY(0); }
}

@keyframes slideInPhoto {
  0% { opacity: 0; transform: translateX(-20px); }
  100% { opacity: 1; transform: translateX(0); }
}

@keyframes slideInLeft {
  0% { opacity: 0; transform: translateX(-30px); }
  100% { opacity: 1; transform: translateX(0); }
}

@keyframes slideInRight {
  0% { opacity: 0; transform: translateX(30px); }
  100% { opacity: 1; transform: translateX(0); }
}

@keyframes fadeScale {
  0% { opacity: 0; transform: scale(0.95); }
  100% { opacity: 1; transform: scale(1); }
}

/* 响应式设计 */
@media (max-width: 1024px) {
  .data-grid,
  .product-grid,
  .tech-grid,
  .economy-grid {
    gap: 50px;
  }
  
  .number,
  .product-number,
  .tech-number,
  .economy-number {
    font-size: 60px;
  }
  
  .social-value {
    gap: 20px;
  }
  
  .value-item {
    font-size: 1rem;
    padding: 6px 16px;
  }
}

@media (max-width: 768px) {
  .data-grid,
  .product-grid,
  .tech-grid,
  .economy-grid {
    flex-direction: column;
    gap: 40px;
  }
  
  .number,
  .product-number,
  .tech-number,
  .economy-number {
    font-size: 50px;
  }
  
  .screen-title {
    font-size: 1.5rem;
  }
  
  .project-title {
    font-size: 2rem;
  }
  
  .company-info {
    font-size: 1.2rem;
  }
  
  .location-info {
    font-size: 1rem;
  }
  
  .social-value {
    flex-direction: column;
    gap: 15px;
  }
  
  .value-item {
    font-size: 0.9rem;
    padding: 8px 20px;
  }
  
  .photo-item.portrait {
    width: 280px;
  }
  
  .photo-item.portrait .photo-frame {
    width: 280px;
    height: 373px;
  }
  
  .photo-item.landscape {
    width: 497px;
  }
  
  .photo-item.landscape .photo-frame {
    width: 497px;
    height: 373px;
  }
  
  .bottom-nav {
    gap: 15px;
  }
  
  .btn {
    width: 200px;
    justify-content: center;
  }
}

@media (max-width: 480px) {
  .screen-content {
    padding: 0 15px;
  }
  
  .number,
  .product-number,
  .tech-number,
  .economy-number {
    font-size: 40px;
  }
  
  .unit,
  .product-unit,
  .tech-unit,
  .economy-unit {
    font-size: 14px;
  }
  
  .label,
  .product-name,
  .tech-label,
  .economy-label {
    font-size: 12px;
  }
  
  .project-title {
    font-size: 1.5rem;
  }
  
  .screen-title {
    font-size: 1.3rem;
  }
  
  .company-info {
    font-size: 1rem;
  }
  
  .location-info {
    font-size: 0.9rem;
  }
  
  .value-item {
    font-size: 0.8rem;
    padding: 6px 15px;
  }
}
</style>
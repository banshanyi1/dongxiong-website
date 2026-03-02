<template>
  <div class="case-detail-page">
    <!-- 背景微动颗粒 + 光晕 -->
    <div class="background-effects"></div>

    <!-- 主要内容 -->
    <div class="content">
      <CaseHero :display-case="displayCase" />

      <CaseScreens :case-data="displayCaseFull" :current-case="currentCase" />

      <CasePhotos :photos="photoData" />

      <CaseTech :tech-highlights="displayCaseFull.techHighlights" />

      <CaseTestimonial :customer="displayCaseFull.customer" />

      <CaseNavigation />
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'

import { useI18n } from '@/composables/useI18n'
import { caseImages } from '@/utils/images'

// 引入子组件
import CaseHero from '@/components/case/CaseHero.vue'
import CaseScreens from '@/components/case/CaseScreens.vue'
import CasePhotos from '@/components/case/CasePhotos.vue'
import CaseTech from '@/components/case/CaseTech.vue'
import CaseTestimonial from '@/components/case/CaseTestimonial.vue'
import CaseNavigation from '@/components/case/CaseNavigation.vue'

const route = useRoute()
const { t, locale } = useI18n()

// 案例数据映射
const caseDataMap = {
  1: {
    title: '三十万吨含锌固（危）废综合利用项目',
    subtitle: '山西省河津市 · 中禹（山西）新材料有限公司',
    breadcrumb: '山西河津',
    scale: 30,
    products: [
      { value: 6, unit: '万吨', name: '次氧化锌' },
      { value: 6, unit: '万t', name: '锌砂' },
      { value: 3, unit: '万t', name: '粗锌锭' },
      { value: 3, unit: '万t', name: '还原铁粉' },
      { value: 71, unit: 't', name: '稀散金属（铟/锗/镓等）' },
    ],
    efficiency: [
      { value: 92, unit: '%', name: '锌回收率', highlight: true },
      { value: 88, unit: '%', name: '铁回收率' },
      { value: 88, unit: '%', name: '稀散金属提取率' },
    ],
    economy: [
      { value: 15.2, unit: '亿元', name: '年产值' },
      { value: 10.2, unit: '亿元', name: '年净利润' },
      { value: 7.5, unit: '年', name: '投资回收期' },
    ],
    socialValue: ['90个就业岗位', '¥585万环保投入', '尾渣100%资源化'],
    photos: [
      {
        caption: '窑头风机布置',
        orientation: 'landscape',
        image: caseImages.case1.h1,
        description: '窑头风机系统布置实拍',
      },
      {
        caption: '项目总图',
        orientation: 'landscape',
        image: caseImages.case1.h2,
        description: '项目整体布局总图实拍',
      },
      {
        caption: '侧视图',
        orientation: 'portrait',
        image: caseImages.case1.v1,
        description: '项目侧视角度实拍',
      },
      {
        caption: '制粒机室',
        orientation: 'landscape',
        image: caseImages.case1.h3,
        description: '制粒机室内部实拍',
      },
    ],
    techHighlights:
      '采用先进的火法冶金工艺，实现锌、铁、稀散金属的高效分离与回收，一般固废10万吨+危险废物20万吨的综合处理能力，锌回收率>92%，铁回收率>88%，稀散金属提取率>88%。',
    customer: '中禹（山西）新材料有限公司',
  },
  2: {
    title: '30万吨/年含锌废料处置利用项目',
    subtitle: '甘肃省白银市 · 白银湘宇麓山环保科技有限公司',
    breadcrumb: '甘肃白银',
    scale: 30,
    products: [
      { value: 8, unit: '万吨', name: '次氧化锌' },
      { value: 12, unit: '万吨', name: '锌焙砂' },
      { value: 5, unit: '万吨', name: '一水硫酸锌' },
      { value: 4, unit: '万吨', name: '还原铁粉' },
      { value: 1, unit: '万吨', name: '炭精粉' },
    ],
    efficiency: [
      { value: 90, unit: '%', name: '锌回收率', highlight: true },
      { value: 85, unit: '%', name: '铁回收率' },
      { value: 80, unit: '%', name: '综合利用率' },
    ],
    economy: [
      { value: 12.5, unit: '亿元', name: '年产值' },
      { value: 8.2, unit: '亿元', name: '年净利润' },
      { value: 6.8, unit: '年', name: '投资回收期' },
    ],
    socialValue: ['120个就业岗位', '¥860万环保投入', '危废减量化90%'],
    photos: [
      {
        caption: '中央控制室',
        orientation: 'landscape',
        image: caseImages.case2.controlRoom,
        description: '现代化集中控制室操作界面',
      },
      {
        caption: '回转窑系统',
        orientation: 'landscape',
        image: caseImages.case2.rotaryKiln,
        description: '回转窑火法回收工艺核心设备',
      },
      {
        caption: '收尘器系统',
        orientation: 'landscape',
        image: caseImages.case2.dustCollector,
        description: '高效除尘设备实拍',
      },
      {
        caption: '收尘器顶部',
        orientation: 'landscape',
        image: caseImages.case2.dustCollectorTop,
        description: '收尘设备顶部结构细节',
      },
      {
        caption: '冷却器设备',
        orientation: 'portrait',
        image: caseImages.case2.cooler,
        description: '产品冷却处理设备',
      },
      {
        caption: '厂房全景',
        orientation: 'landscape',
        image: caseImages.case2.factory,
        description: '现代化生产车间全景',
      },
      {
        caption: '皮带输送机',
        orientation: 'landscape',
        image: caseImages.case2.conveyorBelt,
        description: '物料自动化输送系统',
      },
      {
        caption: '抓斗作业',
        orientation: 'portrait',
        image: caseImages.case2.grabBucket,
        description: '原料装卸作业实拍',
      },
      {
        caption: '改造前后对比',
        orientation: 'landscape',
        image: caseImages.case2.beforeRenovation,
        description: '项目改造前后效果对比',
      },
      {
        caption: '脱硫塔设备',
        orientation: 'landscape',
        image: caseImages.case2.desulfurizationTower,
        description: '烟气脱硫处理设备',
      },
      {
        caption: '鱼鳞片密封',
        orientation: 'portrait',
        image: caseImages.case2.fishScaleSeal,
        description: '设备密封部件细节',
      },
    ],
    techHighlights:
      '采用回转窑火法回收工艺（化学还原-氧化法），属于《含锌废料处理处置技术规范》中推荐工艺。年处理含锌废料和含锌物料30万吨，主产品：次氧化锌、锌焙砂、一水硫酸锌，副产品：还原铁粉、炭精粉。',
    customer: '白银湘宇麓山环保科技有限公司',
  },
  3: {
    title: '工业固体废弃物环保治理及资源化利用项目',
    subtitle: '四川省攀枝花市 · 攀枝花市泓岩科技有限公司',
    breadcrumb: '四川攀枝花',
    scale: 15,
    products: [{ value: 4.5, unit: '万吨', name: '次氧化锌', highlight: true }],
    efficiency: [
      { value: 85, unit: '%', name: '锌回收率', highlight: true },
      { value: 95, unit: '%', name: '资源化利用率' },
    ],
    economy: [
      { value: 8.6, unit: '亿元', name: '年产值' },
      { value: 5.2, unit: '亿元', name: '年净利润' },
      { value: 5.3, unit: '年', name: '投资回收期' },
    ],
    socialValue: ['80个就业岗位', '¥650万环保投入', '危废减量化95%'],
    photos: [
      {
        caption: '项目全景图',
        orientation: 'landscape',
        image: caseImages.case3.panorama,
        description: '攀枝花泓岩科技项目整体布局全景',
      },
      {
        caption: '项目点火仪式',
        orientation: 'landscape',
        image: caseImages.case3.ignitionCeremony,
        description: '项目正式投产点火仪式',
      },
      {
        caption: '控制室操作',
        orientation: 'portrait',
        image: caseImages.case3.controlRoom,
        description: '现代化中央控制室操作界面',
      },
      {
        caption: '圆盘造粒机',
        orientation: 'landscape',
        image: caseImages.case3.discGranulator,
        description: '产品成型圆盘造粒设备',
      },
      {
        caption: '自动配料系统',
        orientation: 'landscape',
        image: caseImages.case3.autoDosing,
        description: '原料自动配料控制系统',
      },
      {
        caption: '在线监测系统',
        orientation: 'portrait',
        image: caseImages.case3.onlineMonitoring,
        description: '环保在线监测设备实拍',
      },
      {
        caption: '成品包装区',
        orientation: 'landscape',
        image: caseImages.case3.packaging,
        description: '次氧化锌成品自动包装线',
      },
      {
        caption: '脱硫塔设备',
        orientation: 'portrait',
        image: caseImages.case3.desulfurizationTower,
        description: '烟气脱硫处理塔设备',
      },
      {
        caption: '自动化控制',
        orientation: 'portrait',
        image: caseImages.case3.automationControl,
        description: 'DCS自动化控制系统',
      },
      {
        caption: '设备安装现场',
        orientation: 'landscape',
        image: caseImages.case3.equipmentInstallation,
        description: '项目建设期间设备安装实况',
      },
      {
        caption: '回转窑窑头',
        orientation: 'landscape',
        image: caseImages.case3.kilnHead,
        description: 'Φ3.6m×53m回转窑窑头设备实拍',
      },
    ],
    techHighlights:
      '采用回转窑火法回收工艺（化学还原-氧化法），通过回转窑挥发工艺和回转窑二次焙烧工艺回收锌元素。处理电镀锌槽渣、电炉炼钢灰、锌焙烧矿浸出渣、锌净化渣、铁钒渣、针铁矿渣等六类含锌危险废物。',
    customer: '攀枝花市泓岩科技有限公司',
  },
  4: {
    title: '渤海新区新建除尘灰综合利用项目（一期）',
    subtitle: '河北省沧州市渤海新区 · 河北煜泽之鑫环保科技有限公司',
    breadcrumb: '河北沧州',
    scale: 20,
    products: [
      { value: 2.4, unit: '万吨', name: '次氧化锌', highlight: true },
      { value: 2, unit: '万吨', name: '还原铁粉' },
    ],
    efficiency: [
      { value: 88, unit: '%', name: '锌回收率', highlight: true },
      { value: 92, unit: '%', name: '铁回收率' },
      { value: 95, unit: '%', name: '资源综合利用率' },
    ],
    economy: [
      { value: 9.8, unit: '亿元', name: '年产值' },
      { value: 6.1, unit: '亿元', name: '年净利润' },
      { value: 5.8, unit: '年', name: '投资回收期' },
    ],
    socialValue: ['100个就业岗位', '¥780万环保投入', '粉尘减排90%'],
    photos: [
      {
        caption: '项目全景图',
        orientation: 'landscape',
        image: caseImages.case4.projectDetail,
        description: '渤海新区新型建材园项目整体布局',
      },
      {
        caption: 'D4000回转窑',
        orientation: 'landscape',
        image: caseImages.case4.kilnHead,
        description: 'D4000型回转窑装置核心设备',
      },
      {
        caption: '脱硫塔设备',
        orientation: 'portrait',
        image: caseImages.case4.desulfurizationTower,
        description: '烟气脱硫处理塔设备',
      },
      {
        caption: '原料储存区',
        orientation: 'landscape',
        image: caseImages.case4.storageArea,
        description: '电炉灰、高炉灰等原料储存',
      },
      {
        caption: '废气处理系统',
        orientation: 'landscape',
        image: caseImages.case4.emissionMonitoring,
        description: '布袋收尘处理系统',
      },
      {
        caption: '中央控制室',
        orientation: 'portrait',
        image: caseImages.case4.visualControl,
        description: '现代化集散控制系统',
      },
      {
        caption: '环保在线监测',
        orientation: 'landscape',
        image: caseImages.case4.emissionMonitoring,
        description: '环保排放实时监测平台',
      },
      {
        caption: '压力检测系统',
        orientation: 'portrait',
        image: caseImages.case4.pressureTesting,
        description: '设备压力在线检测系统',
      },
      {
        caption: '现场技术交流',
        orientation: 'landscape',
        image: caseImages.case4.technicalExchange,
        description: '项目建设期间技术交流实况',
      },
    ],
    techHighlights:
      '采用回转窑焙烧工艺，配套铁粉精选装置，处理电炉灰、高炉灰、铅水渣、镀锌槽渣、氧化锌浸出渣等多种原料。通过PNCR脱硝+重力沉降+表冷器+布袋收尘+石灰-石膏法脱硫工艺实现清洁生产。',
    customer: '河北煜泽之鑫环保科技有限公司',
  },
  5: {
    title: '临沂鑫钢毅再生资源有限公司年处置16.5万吨除尘灰项目',
    subtitle: '山东省临沂市 · 临沂鑫钢毅再生资源有限公司',
    breadcrumb: '山东临沂',
    scale: 16.5,
    products: [
      { value: 3.2, unit: '万吨', name: '有价金属', highlight: true },
      { value: 13.3, unit: '万吨', name: '其他产品' },
    ],
    efficiency: [
      { value: 85, unit: '%', name: '资源回收率', highlight: true },
      { value: 95, unit: '%', name: '综合利用率' },
    ],
    economy: [
      { value: 7.2, unit: '亿元', name: '年产值' },
      { value: 4.5, unit: '亿元', name: '年净利润' },
      { value: 4.2, unit: '年', name: '投资回收期' },
    ],
    socialValue: ['75个就业岗位', '¥200万环保投入', '粉尘减排85%'],
    photos: [
      {
        caption: '自动化控制',
        orientation: 'landscape',
        image: caseImages.case5.automationControl,
        description: '自动化控制系统操作界面',
      },
      {
        caption: '项目全景图',
        orientation: 'landscape',
        image: caseImages.case5.factory,
        description: '临沂临港经济开发区项目整体布局',
      },
      {
        caption: '窑体安装现场',
        orientation: 'landscape',
        image: caseImages.case5.kilnInstallation,
        description: '回转窑窑体安装施工实况',
      },
      {
        caption: '窑体设备',
        orientation: 'portrait',
        image: caseImages.case5.kilnBody,
        description: '除尘灰处理回转窑核心设备',
      },
      {
        caption: '收尘器设备',
        orientation: 'landscape',
        image: caseImages.case5.dustCollector,
        description: '高效除尘处理设备',
      },
      {
        caption: '可视化控制系统',
        orientation: 'portrait',
        image: caseImages.case5.visualControl,
        description: '现代化集散控制系统',
      },
      {
        caption: '传动机组',
        orientation: 'landscape',
        image: caseImages.case5.transmission,
        description: '设备传动系统',
      },
      {
        caption: '动土仪式',
        orientation: 'landscape',
        image: caseImages.case5.groundbreaking,
        description: '项目正式启动动土仪式',
      },
      {
        caption: '夜间施工',
        orientation: 'landscape',
        image: caseImages.case5.nightView,
        description: '夜间施工进展情况',
      },
      {
        caption: '工人施工中',
        orientation: 'portrait',
        image: caseImages.case5.workers,
        description: '现场施工作业实况',
      },
    ],
    techHighlights:
      '采用回转窑焙烧工艺从除尘灰中回收有价金属，实现钢铁产业配套循环经济。项目位于临沂钢铁投资集团特钢有限公司厂内，通过密闭储存、密闭输送、高效除尘等措施实现清洁生产，服务上游钢铁企业除尘灰资源化利用。',
    customer: '临沂鑫钢毅再生资源有限公司',
  },
}

// 当前案例数据
const currentCase = computed(() => {
  const caseId = route.params.id || '1'
  return caseDataMap[caseId] || caseDataMap['1']
})

// 显示用案例数据（含 i18n 的 title/subtitle/breadcrumb）
const displayCase = computed(() => {
  const base = currentCase.value
  const id = route.params.id || '1'
  const localeData = t(`caseData.${id}`)
  if (localeData && typeof localeData === 'object' && localeData.title) {
    return {
      ...base,
      title: localeData.title,
      subtitle: localeData.subtitle || base.subtitle,
      breadcrumb: localeData.breadcrumb || base.breadcrumb,
    }
  }
  return base
})

// 显示用完整案例数据（含产品名、照片标题、技术亮点等 i18n）
const displayCaseFull = computed(() => {
  locale.value // 依赖 locale 以在切换语言时重新计算
  const base = currentCase.value
  const id = route.params.id || '1'
  const content = t(`caseDetailContent.${id}`)
  if (!content || typeof content !== 'object') {
    return base
  }
  const result = { ...base }
  if (content.products?.length) {
    result.products =
      base.products?.map((p, i) => ({
        ...p,
        name: content.products[i]?.name ?? p.name,
        unit: content.products[i]?.unit ?? p.unit,
      })) ?? base.products
  }
  if (content.efficiency?.length) {
    result.efficiency =
      base.efficiency?.map((e, i) => ({ ...e, name: content.efficiency[i]?.name ?? e.name })) ??
      base.efficiency
  }
  if (content.economy?.length) {
    result.economy =
      base.economy?.map((e, i) => ({
        ...e,
        name: content.economy[i]?.name ?? e.name,
        unit: content.economy[i]?.unit ?? e.unit,
      })) ?? base.economy
  }
  if (content.socialValue?.length) {
    result.socialValue = content.socialValue
  }
  if (content.techHighlights) {
    result.techHighlights = content.techHighlights
  }
  if (content.photos?.length) {
    result.photos =
      base.photos?.map((p, i) => ({
        ...p,
        caption: content.photos[i]?.caption ?? p.caption,
        description: content.photos[i]?.description ?? p.description,
      })) ?? base.photos
  }
  return result
})

// 项目实拍照片（动态获取当前案例数据）
const photoData = computed(() => currentCase.value.photos || [])
</script>

<style scoped>
.case-detail-page {
  background-color: #0a1929;
  color: #ffffff;
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
  background: radial-gradient(circle at 30% 40%, rgba(0, 113, 227, 0.08) 0%, transparent 40%),
    repeating-radial-gradient(circle at 20% 30%, rgba(255, 255, 255, 0.02) 0px, transparent 1px);
  pointer-events: none;
  z-index: 0;
  animation: slowDrift 40s infinite alternate ease-in-out;
}

@keyframes slowDrift {
  0% {
    transform: scale(1) translate(0, 0);
    opacity: 0.7;
  }
  100% {
    transform: scale(1.2) translate(-2%, -1%);
    opacity: 1;
  }
}

/* 主要内容区 */
.content {
  position: relative;
  z-index: 2;
  max-width: 100%;
  margin: 0 auto;
  padding: 0 20px;
}
</style>

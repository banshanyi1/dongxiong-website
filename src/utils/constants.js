// 项目常量配置文件

// 地球可视化配置
export const GLOBE_CONFIG = {
  backgroundColor: '#ffffff',
  atmosphereColor: '#22d3ee',
  atmosphereAltitude: 0.2,
  initialView: { lat: 35, lng: 105, altitude: 1.2 },
}

// 地球视角配置
export const GLOBE_VIEWS = [
  { lat: 35, lng: 105, altitude: 1.2 }, // 首屏 & 亚洲 - 中国区域
  { lat: 50, lng: 15, altitude: 1.5 }, // 欧洲
  { lat: -10, lng: 20, altitude: 1.5 }, // 非洲
  { lat: 20, lng: -90, altitude: 1.5 }, // 美洲
  { lat: 35, lng: 105, altitude: 1.0 }, // 回到中国
  { lat: 35, lng: 105, altitude: 0.7 }, // 省份展示
]

// 国家数据
export const COUNTRIES = {
  asia: [
    { code: 'CN', name: '中国', flag: '🇨🇳🇹🇼' },
    { code: 'OM', name: '阿曼', flag: '🇴🇲' },
    { code: 'MY', name: '马来西亚', flag: '🇲🇾' },
    { code: 'ID', name: '印度尼西亚', flag: '🇮🇩' },
    { code: 'IN', name: '印度', flag: '🇮🇳' },
    { code: 'VN', name: '越南', flag: '🇻🇳' },
    { code: 'JP', name: '日本', flag: '🇯🇵' },
    { code: 'AE', name: '阿联酋', flag: '🇦🇪' },
    { code: 'SA', name: '沙特阿拉伯', flag: '🇸🇦' },
  ],
  europe: [
    { code: 'DE', name: '德国', flag: '🇩🇪' },
    { code: 'GB', name: '英国', flag: '🇬🇧' },
    { code: 'RU', name: '俄罗斯', flag: '🇷🇺' },
  ],
  africa: [
    { code: 'ZM', name: '赞比亚', flag: '🇿🇲' },
    { code: 'EG', name: '埃及', flag: '🇪🇬' },
  ],
  americas: [{ code: 'PE', name: '秘鲁', flag: '🇵🇪' }],
}

// 核心业务数据
export const BUSINESS_DATA = {
  processingCapacity: {
    total: 30,
    generalWaste: 10,
    hazardousWaste: 20,
    unit: '万吨/年',
  },
  products: [
    { name: '次氧化锌', quantity: 6, unit: '万t' },
    { name: '锌砂', quantity: 6, unit: '万t' },
    { name: '粗锌锭', quantity: 3, unit: '万t' },
    { name: '还原铁粉', quantity: 3, unit: '万t' },
    { name: '稀散金属', quantity: 71, unit: 't' },
  ],
  efficiency: {
    zincRecovery: 92,
    ironRecovery: 88,
    rareMetalExtraction: 88,
  },
  economicBenefits: {
    annualOutput: 15.2,
    annualProfit: 10.2,
    paybackPeriod: 7.5,
    unit: '亿元',
  },
}

// 动画配置
export const ANIMATION_CONFIG = {
  duration: {
    fadeIn: 800,
    slideIn: 1200,
    globeTransition: 800,
  },
  easing: {
    default: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
    smooth: 'ease-out',
  },
}

// 响应式断点
export const BREAKPOINTS = {
  mobile: 768,
  tablet: 1024,
  desktop: 1200,
}

import { ref, computed, readonly } from 'vue'
import zhCN from '../locales/zh-CN.js'
import en from '../locales/en.js'

const STORAGE_KEY = 'dongxiong-locale'

const messages = {
  'zh-CN': zhCN,
  en,
}

// 全局响应式 locale，确保所有组件共享
const locale = ref(localStorage.getItem(STORAGE_KEY) || 'zh-CN')

function initLocale() {
  const saved = localStorage.getItem(STORAGE_KEY)
  if (saved && messages[saved]) {
    locale.value = saved
  }
}

function setLocale(newLocale) {
  if (messages[newLocale]) {
    locale.value = newLocale
    localStorage.setItem(STORAGE_KEY, newLocale)
    // 触发页面标题等更新
    document.dispatchEvent(new CustomEvent('locale-changed', { detail: newLocale }))
  }
}

function getNestedValue(obj, path) {
  return path.split('.').reduce((acc, key) => acc?.[key], obj)
}

export function useI18n() {
  const t = computed(() => {
    const msg = messages[locale.value] || messages['zh-CN']
    return (key, params = {}) => {
      let val = getNestedValue(msg, key)
      if (val == null) return key
      if (typeof val !== 'string') return val
      let str = val
      Object.keys(params).forEach((k) => {
        str = str.replace(new RegExp(`\\{${k}\\}`, 'g'), params[k])
      })
      return str
    }
  })

  return {
    locale: readonly(locale),
    setLocale,
    initLocale,
    t: (key, params) => t.value(key, params),
    isZh: computed(() => locale.value === 'zh-CN'),
    isEn: computed(() => locale.value === 'en'),
  }
}

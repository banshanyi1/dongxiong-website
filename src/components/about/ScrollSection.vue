<!-- 
  ========================================
  滚动章节组件
  功能：用于关于我们页面的各个滚动章节（亚洲、欧洲、非洲、美洲等）
  使用场景：展示不同地区的国家列表
  ========================================
-->

<template>
  <div 
    class="scroll-section" 
    :class="`section-${sectionIndex}`"
    :data-section-index="sectionIndex - 1"
  >
    <div class="content-box glass">
      <!-- 章节标题 -->
      <h2>{{ title }}</h2>
      
      <!-- 章节描述 -->
      <p>{{ description }}</p>
      
      <!-- 国家/地区网格 -->
      <div class="countries-grid">
        <div
          v-for="country in countries"
          :key="country.code"
          class="country-card"
          :class="{ highlighted: highlightedCountries.includes(country.code) }"
          @click="handleCountryClick(country.code)"
        >
          <div class="country-name-cn">{{ country.name }}</div>
          <div class="country-name-en">{{ getEnglishName(country.code) }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
/**
 * Props 定义 - 组件的输入参数
 * 
 * sectionIndex: 章节索引（1, 2, 3...）
 * title: 章节标题
 * description: 章节描述
 * countries: 国家数组 [{code: 'CN', name: '中国'}]
 * highlightedCountries: 已高亮的国家代码数组
 * onCountryClick: 点击国家时的回调函数
 * getEnglishName: 获取英文名称的函数
 */
const props = defineProps({
  // 章节序号（用于生成 CSS 类名）
  sectionIndex: {
    type: Number,
    required: true,
    validator: value => value >= 1
  },
  
  // 章节标题
  title: {
    type: String,
    required: true
  },
  
  // 章节描述
  description: {
    type: String,
    required: true
  },
  
  // 国家列表
  countries: {
    type: Array,
    required: true,
    validator: value => {
      return value.every(item => 
        typeof item === 'object' && 
        'code' in item && 
        'name' in item
      )
    }
  },
  
  // 已高亮的国家代码列表
  highlightedCountries: {
    type: Array,
    default: () => []
  },
  
  // 点击国家时的处理函数
  onCountryClick: {
    type: Function,
    default: () => {}
  },
  
  // 获取英文名称的函数
  getEnglishName: {
    type: Function,
    default: (code) => code
  }
})

/**
 * 处理国家卡片点击事件
 * 调用父组件传入的回调函数
 */
const handleCountryClick = (code) => {
  props.onCountryClick(code)
}
</script>

<style scoped>
/* 组件特定样式已在父组件 AboutView.vue 中定义 */
/* 这里可以添加组件特有的样式（如果需要） */
</style>

<!-- 
  ========================================
  章节内容卡片组件
  功能：用于展示各个章节的内容卡片（公司介绍、亚洲、欧洲等）
  使用场景：TestGlobeWheelView 等需要章节切换的页面
  ========================================
-->

<template>
  <div class="section" :class="`section-${sectionIndex}`" :style="sectionStyle">
    <!-- 公司介绍类型卡片 -->
    <div v-if="type === 'company'" class="company-info">
      <h1 class="hero-title">{{ title }}</h1>

      <!-- 标签组 -->
      <div v-if="tags && tags.length" class="hero-subtitle">
        <template v-for="(tag, index) in tags" :key="index">
          <span class="tag">{{ tag }}</span>
          <span v-if="index < tags.length - 1" class="separator">|</span>
        </template>
      </div>

      <!-- 描述文字 -->
      <p v-if="description">{{ description }}</p>

      <!-- 统计数据 -->
      <div v-if="stats && stats.length" class="global-stats">
        <div v-for="(stat, index) in stats" :key="index" class="stat-card">
          <div class="stat-number">{{ stat.number }}</div>
          <div class="stat-label">{{ stat.label }}</div>
        </div>
      </div>

      <!-- 提示文字 -->
      <div v-if="hint" class="scroll-hint">
        <p>{{ hint }}</p>
      </div>
    </div>

    <!-- 国家列表类型卡片 -->
    <div v-else-if="type === 'countries'" class="content-box glass">
      <h2>{{ title }}</h2>
      <p v-if="description">{{ description }}</p>

      <!-- 国家网格 -->
      <div class="countries-grid">
        <div
          v-for="country in countries"
          :key="country.code"
          class="country-card"
          :class="{ highlighted: highlightedCountries.includes(country.code) }"
          @click="handleCountryClick(country.code)"
        >
          <div class="country-name-cn">{{ country.name }}</div>
          <div class="country-name-en">{{ country.en }}</div>
        </div>
      </div>
    </div>

    <!-- 自定义内容插槽 -->
    <div v-else-if="type === 'custom'" class="content-box glass">
      <slot></slot>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

/**
 * Props 定义
 */
const props = defineProps({
  // 是否显示
  visible: {
    type: Boolean,
    default: true,
  },

  // 章节索引（用于生成 CSS 类名）
  sectionIndex: {
    type: Number,
    required: true,
  },

  // 卡片类型：'company' | 'countries' | 'custom'
  type: {
    type: String,
    default: 'company',
    validator: value => ['company', 'countries', 'custom'].includes(value),
  },

  // 标题
  title: {
    type: String,
    default: '',
  },

  // 描述
  description: {
    type: String,
    default: '',
  },

  // 标签数组（公司介绍用）
  tags: {
    type: Array,
    default: () => [],
  },

  // 统计数据（公司介绍用）
  stats: {
    type: Array,
    default: () => [],
  },

  // 提示文字
  hint: {
    type: String,
    default: '',
  },

  // 国家列表（国家卡片用）
  countries: {
    type: Array,
    default: () => [],
  },

  // 已高亮的国家代码
  highlightedCountries: {
    type: Array,
    default: () => [],
  },

  // 点击国家回调
  onCountryClick: {
    type: Function,
    default: null,
  },
})

/**
 * 计算样式
 */
const sectionStyle = computed(() => {
  if (props.visible) {
    return {
      opacity: 1,
      pointerEvents: 'auto',
      zIndex: 10,
      position: 'relative'
    }
  } else {
    return {
      opacity: 0,
      pointerEvents: 'none',
      zIndex: 1,
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100vh'
    }
  }
})

/**
 * 处理国家点击事件
 */
const handleCountryClick = code => {
  if (props.onCountryClick) {
    props.onCountryClick(code)
  }
}
</script>

<style scoped>
/* 章节容器 */
.section {
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  transition: opacity 0.6s ease, z-index 0.6s ease;
}

/* 公司信息卡片 */
.company-info {
  background: rgba(255, 255, 255, 0.95);
  padding: 3rem;
  border-radius: 20px;
  max-width: 600px;
  width: 100%;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.1);
}

.hero-title {
  font-size: 3rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.hero-subtitle {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 2rem;
  font-size: 1.1rem;
  color: #666;
  flex-wrap: wrap;
}

.tag {
  padding: 0.5rem 1rem;
  background: #f0f0f0;
  border-radius: 20px;
  font-size: 0.9rem;
}

.separator {
  color: #ccc;
}

.company-info > p {
  font-size: 1.1rem;
  color: #666;
  line-height: 1.6;
  margin-bottom: 2rem;
}

/* 统计数据网格 */
.global-stats {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
  margin: 2rem 0;
}

.stat-card {
  text-align: center;
  padding: 1.5rem;
  background: #f8f9fa;
  border-radius: 12px;
}

.stat-number {
  display: block;
  font-size: 2.5rem;
  font-weight: 700;
  color: #667eea;
  margin-bottom: 0.5rem;
}

.stat-label {
  font-size: 0.9rem;
  color: #666;
}

.scroll-hint {
  margin-top: 2rem;
  text-align: center;
  color: #999;
  font-size: 0.9rem;
}

/* 内容盒样式 */
.content-box {
  background: rgba(255, 255, 255, 0.95);
  padding: 4rem;
  border-radius: 24px;
  max-width: 1000px;
  width: 100%;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(10px);
}

.content-box h2 {
  font-size: 3rem;
  margin-bottom: 1.5rem;
  color: #1a1a1a;
}

.content-box > p {
  font-size: 1.2rem;
  color: #666;
  margin-bottom: 2.5rem;
  line-height: 1.8;
}

/* 国家网格 */
.countries-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 1.75rem;
  margin-top: 2.5rem;
}

.country-card {
  background: rgba(255, 255, 255, 0.96);
  border-radius: 20px;
  padding: 1.5rem 1.5rem;
  text-align: left;
  cursor: pointer;
  border: 1px solid rgba(148, 163, 184, 0.35);
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 1.2rem;
  box-shadow: 0 10px 24px rgba(15, 23, 42, 0.06);
}

.country-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
}

.country-card.highlighted {
  background: linear-gradient(135deg, #e0f2fe, #f5f3ff);
  border-color: #2563eb;
  transform: translateY(-3px);
  box-shadow: 0 18px 36px rgba(37, 99, 235, 0.2);
}

.country-name-cn {
  font-size: 1.1rem;
  color: #111827;
  font-weight: 600;
  margin-bottom: 0.2rem;
}

.country-name-en {
  font-size: 0.85rem;
  color: #6b7280;
  font-weight: 400;
  letter-spacing: 0.05em;
}

/* 玻璃效果 */
.glass {
  backdrop-filter: blur(10px);
  background: rgba(255, 255, 255, 0.8);
}
</style>

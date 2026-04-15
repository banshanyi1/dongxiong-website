<!-- 
  ========================================
  内容区块组件
  功能：用于展示页面中的各个内容区块（类似 AboutView 的 about-block）
  使用场景：TestGlobeWheelView 等需要滚动内容区块的页面
  ========================================
-->

<template>
  <section class="content-block" :class="`content-block--${variant}`">
    <div class="content-block__inner">
      <!-- 标题区域 -->
      <div v-if="title || keyword" class="content-block__header">
        <h2 class="content-block__title">
          <span v-if="keyword" class="content-block__keyword">{{ keyword }}</span>
          <span v-if="keyword && title">{{ title }}</span>
          <span v-else>{{ title }}</span>
        </h2>
      </div>

      <!-- 引导文字 -->
      <p v-if="lead" class="content-block__lead">{{ lead }}</p>

      <!-- 卡片网格 -->
      <div v-if="cards && cards.length" class="content-block__cards">
        <ContentBlockCard
          v-for="(card, index) in cards"
          :key="index"
          :icon="card.icon"
          :title="card.title"
          :text="card.text"
          :variant="cardVariant"
        />
      </div>

      <!-- 自定义插槽 -->
      <div v-if="$slots.default" class="content-block__custom">
        <slot></slot>
      </div>
    </div>
  </section>
</template>

<script setup>
/**
 * Props 定义
 */
const props = defineProps({
  // 变体：'light' | 'white' | 'dark'
  variant: {
    type: String,
    default: 'light',
    validator: value => ['light', 'white', 'dark'].includes(value)
  },
  
  // 标题关键字（高亮部分）
  keyword: {
    type: String,
    default: ''
  },
  
  // 标题
  title: {
    type: String,
    default: ''
  },
  
  // 引导文字
  lead: {
    type: String,
    default: ''
  },
  
  // 卡片数据
  cards: {
    type: Array,
    default: () => []
  },
  
  // 卡片变体
  cardVariant: {
    type: String,
    default: 'default',
    validator: value => ['default', 'accent', 'primary'].includes(value)
  }
})
</script>

<style scoped>
/* 内容区块 */
.content-block {
  width: 100%;
  padding: 5rem 2rem;
  box-sizing: border-box;
}

.content-block--light {
  background: #f8f9fa;
}

.content-block--white {
  background: #ffffff;
}

.content-block--dark {
  background: #1a1a1a;
  color: #ffffff;
}

/* 内部容器 */
.content-block__inner {
  max-width: 1400px;
  margin: 0 auto;
}

/* 标题区域 */
.content-block__header {
  margin-bottom: 2rem;
}

.content-block__title {
  font-size: 2.5rem;
  font-weight: 700;
  line-height: 1.2;
  color: inherit;
}

.content-block__keyword {
  color: #667eea;
  font-weight: 700;
}

.content-block--dark .content-block__keyword {
  color: #667eea;
}

/* 引导文字 */
.content-block__lead {
  font-size: 1.1rem;
  line-height: 1.6;
  color: #666;
  margin-bottom: 3rem;
  max-width: 800px;
}

.content-block--dark .content-block__lead {
  color: #ccc;
}

/* 卡片网格 */
.content-block__cards {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  margin-top: 2rem;
}

@media (max-width: 1024px) {
  .content-block__cards {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .content-block__cards {
    grid-template-columns: 1fr;
  }
}

/* 自定义内容区域 */
.content-block__custom {
  margin-top: 2rem;
}

/* 响应式 */
@media (max-width: 768px) {
  .content-block {
    padding: 3rem 1rem;
  }

  .content-block__title {
    font-size: 2rem;
  }

  .content-block__lead {
    font-size: 1rem;
  }
}
</style>

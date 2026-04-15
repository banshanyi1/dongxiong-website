<!-- 
  ========================================
  内容区块卡片组件
  功能：用于 ContentBlock 组件中的卡片展示
  使用场景：配合 ContentBlock 组件使用
  ========================================
-->

<template>
  <article class="content-card" :class="`content-card--${variant}`">
    <!-- 图标区域 -->
    <div v-if="icon" class="content-card__icon-wrap">
      <span class="content-card__icon" aria-hidden="true">{{ icon }}</span>
    </div>

    <!-- 标题 -->
    <h3 class="content-card__title">{{ title }}</h3>

    <!-- 描述文字 -->
    <p class="content-card__text">{{ text }}</p>
  </article>
</template>

<script setup>
/**
 * Props 定义
 */
const props = defineProps({
  // 图标
  icon: {
    type: String,
    default: ''
  },
  
  // 标题
  title: {
    type: String,
    required: true
  },
  
  // 描述文字
  text: {
    type: String,
    default: ''
  },
  
  // 变体：'default' | 'accent' | 'primary'
  variant: {
    type: String,
    default: 'default',
    validator: value => ['default', 'accent', 'primary'].includes(value)
  }
})
</script>

<style scoped>
/* 卡片容器 */
.content-card {
  background: rgba(255, 255, 255, 0.96);
  border-radius: 20px;
  padding: 2.5rem 2rem;
  text-align: left;
  transition: all 0.3s ease;
  border: 1px solid rgba(148, 163, 184, 0.3);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
}

.content-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
}

/* 图标区域 */
.content-card__icon-wrap {
  width: 60px;
  height: 60px;
  border-radius: 16px;
  background: #f0f0f0;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.5rem;
  transition: all 0.3s ease;
}

.content-card__icon {
  font-size: 1.8rem;
  color: #667eea;
}

/* 变体：accent */
.content-card--accent .content-card__icon-wrap {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.content-card--accent .content-card__icon {
  color: #ffffff;
}

/* 变体：primary */
.content-card--primary .content-card__icon-wrap {
  background: linear-gradient(135deg, #2563eb 0%, #3b82f6 100%);
}

.content-card--primary .content-card__icon {
  color: #ffffff;
}

/* 卡片标题 */
.content-card__title {
  font-size: 1.5rem;
  font-weight: 600;
  color: #111827;
  margin-bottom: 1rem;
  line-height: 1.3;
}

/* 卡片文字 */
.content-card__text {
  font-size: 1rem;
  color: #6b7280;
  line-height: 1.6;
}

/* 响应式 */
@media (max-width: 768px) {
  .content-card {
    padding: 2rem 1.5rem;
  }

  .content-card__title {
    font-size: 1.2rem;
  }

  .content-card__text {
    font-size: 0.95rem;
  }

  .content-card__icon-wrap {
    width: 50px;
    height: 50px;
  }

  .content-card__icon {
    font-size: 1.5rem;
  }
}
</style>

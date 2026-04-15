<!-- 
  ========================================
  省份滚动组件
  功能：展示全国省份的无限滚动效果
  使用场景：关于我们页面 - 全国业务覆盖
  ========================================
-->

<template>
  <div class="scroll-section" :class="`section-${sectionIndex}`" :data-section-index="sectionIndex - 1">
    <div class="content-box glass">
      <h2>{{ title }}</h2>
      <p>{{ description }}</p>

      <div class="provinces-scroll-container">
        <!-- 上行：向左滚动 -->
        <div class="scroll-row top-row">
          <div class="infinite-content left-scroll">
            <div class="province-sequence">
              <span 
                v-for="(province, index) in provinces" 
                :key="`left-${index}`"
                class="province-item"
                :class="{ colored: province.colored }"
              >
                {{ province.name }}
              </span>
            </div>
            <!-- 重复一次实现无限滚动 -->
            <div class="province-sequence">
              <span 
                v-for="(province, index) in provinces" 
                :key="`left-copy-${index}`"
                class="province-item"
                :class="{ colored: province.colored }"
              >
                {{ province.name }}
              </span>
            </div>
          </div>
        </div>

        <!-- 下行：向右滚动（如果有需要） -->
        <div v-if="showBottomRow" class="scroll-row bottom-row">
          <div class="infinite-content right-scroll">
            <div class="province-sequence">
              <span 
                v-for="(province, index) in provinces" 
                :key="`right-${index}`"
                class="province-item"
                :class="{ colored: province.colored }"
              >
                {{ province.name }}
              </span>
            </div>
            <div class="province-sequence">
              <span 
                v-for="(province, index) in provinces" 
                :key="`right-copy-${index}`"
                class="province-item"
                :class="{ colored: province.colored }"
              >
                {{ province.name }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
/**
 * Props 定义
 */
const props = defineProps({
  // 章节序号
  sectionIndex: {
    type: Number,
    required: true,
    validator: value => value >= 1
  },
  
  // 标题
  title: {
    type: String,
    required: true
  },
  
  // 描述
  description: {
    type: String,
    required: true
  },
  
  // 省份列表 [{name: '北京', colored: false}]
  provinces: {
    type: Array,
    required: true,
    validator: value => {
      return value.every(item => 
        typeof item === 'object' && 
        'name' in item
      )
    }
  },
  
  // 是否显示底部行
  showBottomRow: {
    type: Boolean,
    default: false
  }
})
</script>

<style scoped>
/* 组件特定样式已在父组件中定义 */
</style>

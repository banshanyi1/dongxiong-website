# SectionCard 组件文档

## 📖 组件介绍

`SectionCard` 是一个可复用的章节内容卡片组件，用于展示各种类型的内容卡片（公司介绍、国家列表、自定义内容等）。

## 🎯 组件特性

- ✅ **三种卡片类型**：公司介绍、国家列表、自定义内容
- ✅ **Props 验证**：严格的类型检查和验证
- ✅ **过渡动画**：内置淡入淡出切换效果
- ✅ **事件回调**：支持国家点击等交互事件
- ✅ **样式封装**：完整的 scoped CSS 样式
- ✅ **易于维护**：单一职责，便于修改和扩展

## 📦 Props 参数

### 基础 Props

| 参数名 | 类型 | 默认值 | 必填 | 说明 |
|--------|------|--------|------|------|
| `visible` | Boolean | `true` | 否 | 是否显示卡片 |
| `sectionIndex` | Number | - | ✅ | 章节索引（用于生成 CSS 类名） |
| `type` | String | `'company'` | 否 | 卡片类型：`'company'` \| `'countries'` \| `'custom'` |
| `title` | String | `''` | 否 | 卡片标题 |
| `description` | String | `''` | 否 | 卡片描述 |

### 公司介绍类型 Props（type="company"）

| 参数名 | 类型 | 默认值 | 必填 | 说明 |
|--------|------|--------|------|------|
| `tags` | Array | `[]` | 否 | 标签数组 |
| `stats` | Array | `[]` | 否 | 统计数据数组 |
| `hint` | String | `''` | 否 | 提示文字 |

### 国家列表类型 Props（type="countries"）

| 参数名 | 类型 | 默认值 | 必填 | 说明 |
|--------|------|--------|------|------|
| `countries` | Array | `[]` | 否 | 国家列表 |
| `highlightedCountries` | Array | `[]` | 否 | 已高亮的国家代码 |
| `onCountryClick` | Function | `null` | 否 | 点击国家回调函数 |

## 🎨 使用示例

### 1. 公司介绍卡片

```vue
<SectionCard
  :section-index="0"
  :visible="currentSection === 0"
  type="company"
  title="公司介绍"
  description="这是一段描述文字"
  :tags="['标签 1', '标签 2', '标签 3']"
  :stats="[
    { number: '20+', label: '国家' },
    { number: '30+', label: '省份' },
    { number: '500+', label: '项目' }
  ]"
  hint="↓ 滚动查看更多 ↓"
/>
```

### 2. 国家列表卡片

```vue
<SectionCard
  :section-index="1"
  :visible="currentSection === 1"
  type="countries"
  title="亚洲"
  description="亚洲地区介绍"
  :countries="asiaCountries"
  :highlighted-countries="highlightedCountries"
  :on-country-click="toggleCountryHighlight"
/>
```

### 3. 自定义内容卡片

```vue
<SectionCard
  :section-index="2"
  :visible="currentSection === 2"
  type="custom"
>
  <!-- 自定义内容 -->
  <div class="my-custom-content">
    <h3>自定义标题</h3>
    <p>自定义内容...</p>
  </div>
</SectionCard>
```

## 💡 数据结构

### 统计数据（stats）

```javascript
[
  { number: '20+', label: '国家' },
  { number: '30+', label: '省份' },
  { number: '500+', label: '项目' }
]
```

### 国家列表（countries）

```javascript
[
  { code: 'CN', name: '中国', en: 'China' },
  { code: 'US', name: '美国', en: 'United States' },
  { code: 'JP', name: '日本', en: 'Japan' }
]
```

### 高亮国家（highlightedCountries）

```javascript
['CN', 'US', 'JP']
```

## 🔧 事件处理

### 国家点击事件

```vue
<script setup>
const highlightedCountries = ref([])

const toggleCountryHighlight = (code) => {
  const index = highlightedCountries.value.indexOf(code)
  if (index > -1) {
    highlightedCountries.value.splice(index, 1)
  } else {
    highlightedCountries.value.push(code)
  }
}
</script>

<template>
  <SectionCard
    type="countries"
    :highlighted-countries="highlightedCountries"
    :on-country-click="toggleCountryHighlight"
  />
</template>
```

## 🎭 过渡动画

组件内置了 `section-fade` 过渡动画：

```css
.section-fade-enter-active,
.section-fade-leave-active {
  transition: all 0.6s ease;
}

.section-fade-enter-from {
  opacity: 0;
  transform: translateX(50px);
}

.section-fade-leave-to {
  opacity: 0;
  transform: translateX(-50px);
}
```

## 🎨 样式定制

### 覆盖默认样式

```vue
<style scoped>
:deep(.section-card) {
  padding: 2rem;
}

:deep(.hero-title) {
  font-size: 2.5rem;
}

:deep(.country-card) {
  border-radius: 12px;
}
</style>
```

### 使用 CSS 变量

```css
.section-card {
  --card-bg: rgba(255, 255, 255, 0.95);
  --card-shadow: 0 20px 60px rgba(0, 0, 0, 0.1);
}
```

## 📊 完整示例

```vue
<template>
  <div class="my-page">
    <!-- 第 1 屏：公司介绍 -->
    <SectionCard
      :section-index="0"
      :visible="currentSection === 0"
      type="company"
      title="公司介绍"
      :tags="['专业', '创新', '领先']"
      :stats="[
        { number: '10+', label: '年经验' },
        { number: '100+', label: '客户' },
        { number: '200+', label: '项目' }
      ]"
    />

    <!-- 第 2 屏：服务区域 -->
    <SectionCard
      :section-index="1"
      :visible="currentSection === 1"
      type="countries"
      title="服务区域"
      description="我们的服务覆盖以下地区"
      :countries="serviceCountries"
      :highlighted-countries="highlightedCountries"
      :on-country-click="handleCountryClick"
    />

    <!-- 第 3 屏：自定义内容 -->
    <SectionCard
      :section-index="2"
      :visible="currentSection === 2"
      type="custom"
    >
      <div class="custom-content">
        <h3>联系我们</h3>
        <p>电话：123-456-7890</p>
        <p>邮箱：info@example.com</p>
      </div>
    </SectionCard>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import SectionCard from '@/components/SectionCard.vue'

const currentSection = ref(0)
const highlightedCountries = ref([])
const serviceCountries = ref([
  { code: 'CN', name: '中国', en: 'China' },
  { code: 'US', name: '美国', en: 'United States' }
])

const handleCountryClick = (code) => {
  console.log('Clicked country:', code)
}
</script>
```

## 🔍 Props 验证

组件内置了严格的 Props 验证：

```javascript
props: {
  type: {
    type: String,
    default: 'company',
    validator: value => ['company', 'countries', 'custom'].includes(value)
  },
  sectionIndex: {
    type: Number,
    required: true
  }
}
```

## 🎯 最佳实践

### 1. 使用计算属性处理数据

```vue
<script setup>
import { computed } from 'vue'

const filteredCountries = computed(() => {
  return allCountries.value.filter(c => c.region === 'asia')
})
</script>

<template>
  <SectionCard
    type="countries"
    :countries="filteredCountries"
  />
</template>
```

### 2. 复用回调函数

```vue
<script setup>
const handleCountryClick = (code) => {
  // 统一处理逻辑
}
</script>

<template>
  <SectionCard
    v-for="region in regions"
    :key="region"
    :on-country-click="handleCountryClick"
  />
</template>
```

### 3. 条件渲染优化

```vue
<SectionCard
  v-if="showSection"
  :visible="isVisible"
  ...
/>
```

## 📝 注意事项

1. **sectionIndex 必填**：用于生成唯一的 CSS 类名
2. **type 验证**：必须是 `'company'`、`'countries'` 或 `'custom'`
3. **countries 格式**：必须包含 `code`、`name`、`en` 字段
4. **onCountryClick**：仅在 `type="countries"` 时使用

## 🚀 扩展建议

### 1. 添加更多卡片类型

```javascript
validator: value => ['company', 'countries', 'custom', 'stats', 'timeline'].includes(value)
```

### 2. 添加插槽支持

```vue
<template>
  <div class="section-card">
    <slot name="header"></slot>
    <slot></slot>
    <slot name="footer"></slot>
  </div>
</template>
```

### 3. 添加主题支持

```vue
<template>
  <div class="section-card" :class="`theme-${theme}`">
    <!-- content -->
  </div>
</template>

<script setup>
props: {
  theme: {
    type: String,
    default: 'light',
    validator: value => ['light', 'dark', 'blue'].includes(value)
  }
}
</script>
```

---

**创建时间**: 2026-03-28  
**版本**: 1.0.0  
**维护者**: Development Team

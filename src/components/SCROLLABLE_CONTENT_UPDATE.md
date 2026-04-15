# 可滚动内容区块更新说明

## 📖 更新内容

为 TestGlobeWheelView 页面添加了可滚动的内容区块，类似于 AboutView 的 `about-block` 结构。

## 🎯 主要特性

### 1. **页面结构**

页面现在分为两个部分：

#### **固定内容区域（前 6 屏）**
- 公司介绍
- 亚洲、欧洲、非洲、美洲、中国

这些内容使用 **wheel 事件 + GSAP 动画** 控制，页面不滚动，只切换动画。

#### **可滚动内容区块**
- 专注领域
- 技术实力
- 项目与实践
- 省份覆盖

这些内容使用 **原生滚动**，可以正常上下滚动浏览。

---

## 📦 新增组件

### 1. ContentBlock.vue - 内容区块组件

**功能**：用于展示页面中的各个内容区块

**Props**：
- `variant`: 变体（'light' | 'white' | 'dark'）
- `keyword`: 标题关键字（高亮部分）
- `title`: 标题
- `lead`: 引导文字
- `cards`: 卡片数据数组
- `cardVariant`: 卡片变体（'default' | 'accent' | 'primary'）

**使用示例**：
```vue
<ContentBlock
  variant="light"
  keyword="专业"
  title="领域"
  lead="这是一段描述文字"
  :cards="[
    { icon: '🚀', title: '卡片 1', text: '描述' },
    { icon: '💡', title: '卡片 2', text: '描述' },
    { icon: '🎯', title: '卡片 3', text: '描述' }
  ]"
  card-variant="accent"
/>
```

---

### 2. ContentBlockCard.vue - 内容区块卡片组件

**功能**：用于 ContentBlock 组件中的卡片展示

**Props**：
- `icon`: 图标
- `title`: 标题（必填）
- `text`: 描述文字
- `variant`: 变体（'default' | 'accent' | 'primary'）

**使用示例**：
```vue
<ContentBlockCard
  icon="🚀"
  title="卡片标题"
  text="卡片描述文字"
  variant="accent"
/>
```

---

## 🎨 样式调整

### SectionCard 组件卡片增大

**调整前**：
- padding: 3rem
- max-width: 800px
- h2: 2.5rem
- 卡片：190px min-width

**调整后**：
- padding: 4rem ✅
- max-width: 1000px ✅
- h2: 3rem ✅
- 卡片：240px min-width ✅

---

## 🔧 页面结构

```
test-page-container
├── SiteHeader (顶部导航)
├── globe-viz (地球可视化 - 固定左侧)
└── scroll-wrapper (可滚动容器)
    ├── fixed-sections (固定内容区域 - 前 6 屏)
    │   ├── SectionCard (公司介绍)
    │   ├── SectionCard (亚洲)
    │   ├── SectionCard (欧洲)
    │   ├── SectionCard (非洲)
    │   ├── SectionCard (美洲)
    │   └── SectionCard (中国)
    └── scrollable-content (可滚动内容区块)
        ├── ContentBlock (专注领域)
        ├── ContentBlock (技术实力)
        ├── ContentBlock (项目与实践)
        └── ContentBlock (省份覆盖)
```

---

## 🎯 滚动逻辑

### **前 6 屏（fixed-sections）**
- 使用 wheel 事件监听
- 阻止默认滚动
- GSAP 动画切换
- 地球视角同步切换

### **后续内容（scrollable-content）**
- 原生滚动
- 地球保持在左侧
- 内容正常上下滚动

---

## 💡 使用方式

### 1. 访问测试页面
```
http://localhost:3001/test-globe
```

### 2. 滚动体验
1. **前 6 屏**：滚动鼠标滚轮，地球会切换视角，内容淡入淡出
2. **第 6 屏后**：继续向下滚动，页面会正常滚动，显示内容区块

---

## 🎨 内容区块样式

### 变体类型

1. **light** - 浅灰色背景
```vue
<ContentBlock variant="light" ... />
```

2. **white** - 白色背景
```vue
<ContentBlock variant="white" ... />
```

3. **dark** - 深色背景
```vue
<ContentBlock variant="dark" ... />
```

### 卡片变体

1. **default** - 默认样式
2. **accent** - 渐变图标背景（紫色）
3. **primary** - 渐变图标背景（蓝色）

---

## 📊 内容区块数据

### 第一块：专注领域
- 背景：light
- 卡片变体：default
- 卡片数：3

### 第二块：技术实力
- 背景：white
- 卡片变体：accent
- 卡片数：3

### 第三块：项目与实践
- 背景：light
- 卡片变体：default
- 卡片数：3

### 第四块：省份覆盖
- 背景：white
- 卡片变体：primary
- 卡片数：3

---

## 🔍 代码示例

### 添加新的内容区块

```vue
<!-- 第五块：自定义内容 -->
<ContentBlock
  variant="dark"
  keyword="创新"
  title="驱动"
  lead="持续创新，引领行业发展"
  :cards="[
    {
      icon: '🔬',
      title: '研发实力',
      text: '拥有专业的研发团队和先进的实验室'
    },
    {
      icon: '🏆',
      title: '行业领先',
      text: '多项核心技术处于行业领先水平'
    },
    {
      icon: '🌟',
      title: '持续创新',
      text: '每年投入大量资源用于技术研发'
    }
  ]"
  card-variant="primary"
/>
```

---

## 🎯 响应式设计

### 桌面端（> 1024px）
- 卡片网格：3 列
- 内容区块 padding: 5rem 2rem

### 平板端（768px - 1024px）
- 卡片网格：2 列
- 内容区块 padding: 4rem 1.5rem

### 移动端（< 768px）
- 卡片网格：1 列
- 内容区块 padding: 3rem 1rem

---

## ✅ 完成清单

- ✅ 创建 ContentBlock 组件
- ✅ 创建 ContentBlockCard 组件
- ✅ 修改 TestGlobeWheelView 添加可滚动内容
- ✅ 增大 SectionCard 组件的卡片尺寸
- ✅ 调整页面结构支持混合滚动
- ✅ 添加响应式样式

---

## 🚀 后续优化建议

### 1. 添加滚动动画
```javascript
// 使用 Intersection Observer 实现滚动入场动画
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animate-in')
    }
  })
})
```

### 2. 添加进度指示
```vue
<!-- 滚动进度条 -->
<div class="scroll-progress">
  <div class="scroll-progress__bar" :style="{ width: scrollProgress + '%' }"></div>
</div>
```

### 3. 添加回到顶部按钮
```vue
<button v-show="showBackToTop" @click="scrollToTop" class="back-to-top">
  ↑ 返回顶部
</button>
```

---

**创建时间**: 2026-03-28  
**版本**: 1.1.0  
**维护者**: Development Team

# 地球固定与滚动修复说明

## 🐛 修复的问题

### 问题 1：地球背景作为一栏
**原问题**：地球可视化区域作为页面的一栏，会随页面滚动

**修复方案**：
- 将地球设置为 `position: fixed` 固定在页面上方
- 提高 z-index 到 10，确保在最上层
- 内容区域使用 `position: absolute` 定位在右侧

### 问题 2：滚动结束后卡住
**原问题**：滚动到第 6 屏后，页面卡住无法继续向下滚动，需要拉动侧边栏才能滑动

**修复方案**：
- 修改 wheel 事件处理逻辑
- 当滚动到第 6 屏（currentSection >= 5）后，不再阻止默认滚动行为
- 允许页面正常滚动

---

## 🔧 技术实现

### 1. 地球固定定位

```css
.globe-viz {
  position: fixed;      /* 固定定位 */
  top: 0;
  left: 0;
  width: 50%;
  height: 100vh;        /* 占满整个视口高度 */
  z-index: 10;          /* 提高层级 */
}
```

### 2. 内容区域可滚动

```css
.content-wrapper {
  position: absolute;   /* 绝对定位 */
  top: 0;
  left: 50%;            /* 从中间开始 */
  width: 50%;
  min-height: 100vh;    /* 最小高度为视口高度 */
  overflow-y: auto;     /* 允许垂直滚动 */
  overflow-x: hidden;   /* 隐藏水平滚动条 */
  z-index: 1;           /* 在地球下方 */
}
```

### 3. Wheel 事件智能处理

```javascript
const handleWheel = event => {
  // 如果已经滚动到第 6 屏之后，允许正常滚动
  if (currentSection.value >= 5) {
    return // 不阻止默认行为，让页面正常滚动
  }

  // 阻止默认滚动行为
  event.preventDefault()

  // 如果正在动画中，忽略新的滚动
  if (isAnimating.value) return

  // ... 其他逻辑
}
```

### 4. 使用 capture 阶段监听

```javascript
window.addEventListener('wheel', handleWheel, { 
  passive: false, 
  capture: true  // 使用捕获阶段，更早拦截事件
})
```

---

## 📊 页面结构

```
test-page-container
├── SiteHeader (导航栏)
├── globe-viz (地球 - fixed 固定)
│   └── z-index: 10 (最上层)
└── content-wrapper (内容区域 - absolute)
    ├── fixed-sections (前 6 屏 - 动画切换)
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

### **阶段 1：前 6 屏（0-5）**
- ✅ Wheel 事件被拦截
- ✅ 阻止默认滚动
- ✅ GSAP 动画切换
- ✅ 地球视角同步
- ✅ 页面不滚动

### **阶段 2：第 6 屏后（>= 5）**
- ✅ Wheel 事件不拦截
- ✅ 允许默认滚动
- ✅ 页面正常上下滚动
- ✅ 地球保持在左侧
- ✅ 内容区块依次显示

---

## 🎨 视觉效果

### **地球位置**
- **初始状态**：地球居中（100% 宽度）
- **第 2-6 屏**：地球在左侧（50% 宽度）
- **第 6 屏后**：地球保持在左侧（50% 宽度）

### **内容位置**
- **前 6 屏**：内容在右侧（50% 宽度）
- **第 6 屏后**：内容继续在右侧，可以滚动

---

## 📝 代码变更

### TestGlobeWheelView.vue

#### 模板变更
```vue
<!-- 地球可视化区域（固定在页面上方） -->
<div ref="globeDiv" class="globe-viz"></div>

<!-- 内容区域（整个页面可滚动） -->
<div class="content-wrapper">
  <!-- 内容 -->
</div>
```

#### 样式变更
```css
/* 地球固定 */
.globe-viz {
  position: fixed;
  height: 100vh;
  z-index: 10;
}

/* 内容可滚动 */
.content-wrapper {
  position: absolute;
  min-height: 100vh;
  overflow-y: auto;
}
```

#### 逻辑变更
```javascript
const handleWheel = event => {
  // 第 6 屏后允许正常滚动
  if (currentSection.value >= 5) {
    return
  }
  
  event.preventDefault()
  // ... 其他逻辑
}
```

---

## ✅ 测试要点

### 1. 地球固定
- [x] 地球固定在页面上方
- [x] 不随页面滚动
- [x] 始终可见

### 2. 前 6 屏滚动
- [x] Wheel 事件正常工作
- [x] 动画切换流畅
- [x] 地球视角同步
- [x] 页面不滚动

### 3. 第 6 屏后滚动
- [x] 页面可以正常滚动
- [x] 不需要拉动侧边栏
- [x] 地球保持在左侧
- [x] 内容区块正常显示

---

## 🚀 使用方式

### 访问测试页面
```
http://localhost:3001/test-globe
```

### 操作流程

1. **初始状态**
   - 地球居中显示
   - 显示公司介绍

2. **滚动鼠标（前 6 屏）**
   - 地球移到左侧
   - 内容淡入淡出
   - 页面不滚动

3. **继续滚动（第 6 屏后）**
   - 页面正常向下滚动
   - 显示内容区块
   - 地球保持在左侧

---

## 🎯 优化建议

### 1. 添加滚动进度指示
```javascript
const scrollProgress = ref(0)

const updateScrollProgress = () => {
  const wrapper = document.querySelector('.content-wrapper')
  if (wrapper) {
    scrollProgress.value = (wrapper.scrollTop / (wrapper.scrollHeight - wrapper.clientHeight)) * 100
  }
}
```

### 2. 添加回到顶部按钮
```vue
<button v-show="showBackToTop" @click="scrollToTop" class="back-to-top">
  ↑
</button>

<script setup>
const showBackToTop = ref(false)

const checkBackToTop = () => {
  const wrapper = document.querySelector('.content-wrapper')
  if (wrapper && wrapper.scrollTop > 300) {
    showBackToTop.value = true
  } else {
    showBackToTop.value = false
  }
}
</script>
```

### 3. 添加滚动动画
```javascript
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animate-in')
    }
  })
}, {
  threshold: 0.1
})
```

---

## 📚 相关文档

- [MDN: position](https://developer.mozilla.org/zh-CN/docs/Web/CSS/position)
- [MDN: overflow](https://developer.mozilla.org/zh-CN/docs/Web/CSS/overflow)
- [MDN: addEventListener](https://developer.mozilla.org/zh-CN/docs/Web/API/EventTarget/addEventListener)
- [GSAP 文档](https://greensock.com/docs/)

---

**修复时间**: 2026-03-28  
**版本**: 1.2.0  
**维护者**: Development Team

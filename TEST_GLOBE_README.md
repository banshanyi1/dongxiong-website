# 地球滚动动画测试页面

## 📖 功能说明

这个测试页面复现了 AboutView 的地球逻辑，使用 **wheel 事件 + GSAP 动画** 的方式实现。

## 🎯 核心特性

### 1. **Wheel 事件监听**
- 监听鼠标滚轮滚动
- 阻止页面默认滚动行为
- 将滚动动作转换为章节切换

### 2. **GSAP 平滑动画**
- 地球视角切换使用 GSAP 缓动
- 章节内容淡入淡出过渡
- 1.2 秒平滑过渡时间

### 3. **地球控制**
- 自动旋转（前 5 屏）
- 视角平滑切换
- 第 6 屏停止旋转

## 🚀 访问方式

1. 启动开发服务器：
```bash
npm run dev
```

2. 访问测试页面：
```
http://localhost:3001/test-globe
```

## 💡 使用方法

1. **滚动鼠标滚轮** - 向下或向上滚动
2. **切换章节** - 每次滚动切换一个章节
3. **点击国家卡片** - 高亮/取消高亮国家
4. **查看进度** - 右侧圆点显示当前章节

## 📊 章节结构

| 章节 | 内容 | 地球视角 |
|------|------|----------|
| 1 | 公司介绍 | 全球视角 |
| 2 | 亚洲 | 亚洲中心 |
| 3 | 欧洲 | 欧洲中心 |
| 4 | 非洲 | 非洲中心 |
| 5 | 美洲 | 美洲中心 |
| 6 | 中国 | 中国中心 |

## 🔧 核心技术实现

### 1. Wheel 事件处理

```javascript
const handleWheel = (event) => {
  // 阻止默认滚动
  event.preventDefault()
  
  // 判断滚动方向
  const delta = event.deltaY
  const isScrollingDown = delta > 0
  
  // 计算目标章节
  let targetSection = currentSection.value
  if (isScrollingDown) {
    targetSection = Math.min(5, currentSection.value + 1)
  } else {
    targetSection = Math.max(0, currentSection.value - 1)
  }
  
  // 切换章节
  switchToSection(targetSection)
}
```

### 2. GSAP 地球动画

```javascript
const switchToSection = (targetSection) => {
  // 获取目标视角
  const targetView = globeTargetViews[targetSection]
  
  // GSAP 平滑过渡
  gsap.to(currentView, {
    lat: targetView.lat,
    lng: targetView.lng,
    altitude: targetView.altitude,
    duration: 1.2,
    ease: 'power2.inOut',
    onUpdate: () => {
      globeInstance.value.pointOfView(currentView)
    }
  })
}
```

### 3. 章节切换动画

```vue
<transition name="section-fade">
  <div v-if="currentSection === 1" class="section">
    <!-- 内容 -->
  </div>
</transition>
```

```css
.section-fade-enter-active,
.section-fade-leave-active {
  transition: all 0.6s ease;
}

.section-fade-enter-from {
  opacity: 0;
  transform: translateX(50px);
}
```

## 🎨 样式特点

### 1. **布局结构**
- 地球：左侧 50%（第一屏居中 100%）
- 内容：右侧 50%
- 固定定位，不随滚动移动

### 2. **响应式设计**
- 地球位置动态调整
- 内容区域固定右侧
- 进度指示器右侧悬浮

### 3. **视觉效果**
- 玻璃态背景（backdrop-filter）
- 渐变文字标题
- 阴影和圆角卡片

## 📝 与 AboutView 的对比

| 特性 | AboutView | TestGlobeWheelView |
|------|-----------|---------------------|
| 滚动方式 | 真实滚动条 | Wheel 事件模拟 |
| 动画库 | 原生 CSS | GSAP |
| 页面滚动 | 是 | 否 |
| 章节切换 | 渐进式 | 离散式 |
| 代码复杂度 | 高 | 中 |

## 🔍 调试技巧

### 1. 查看当前章节
打开浏览器控制台：
```javascript
// 在组件内查看
console.log(this.currentSection)
```

### 2. 手动切换章节
```javascript
// 切换到第 3 屏
currentSection.value = 2
```

### 3. 调整动画速度
修改 GSAP duration：
```javascript
gsap.to(currentView, {
  duration: 0.5, // 加快动画
  // ...
})
```

## 🎯 扩展功能建议

### 1. 添加键盘导航
```javascript
const handleKeydown = (event) => {
  if (event.key === 'ArrowDown') {
    switchToSection(currentSection.value + 1)
  } else if (event.key === 'ArrowUp') {
    switchToSection(currentSection.value - 1)
  }
}
```

### 2. 添加触摸支持
```javascript
const handleTouchMove = (event) => {
  const touch = event.touches[0]
  const deltaY = touch.clientY - lastTouchY
  // 处理触摸滚动
}
```

### 3. 添加自动播放
```javascript
const startAutoPlay = () => {
  setInterval(() => {
    switchToSection((currentSection.value + 1) % 6)
  }, 5000)
}
```

## 📚 学习资源

- [GSAP 官方文档](https://greensock.com/docs/)
- [Globe.gl 文档](https://globe.gl/)
- [Vue 3 Transition](https://vuejs.org/guide/built-ins/transition.html)

## ❓ 常见问题

### Q: 为什么使用 wheel 事件而不是真实滚动？
A: wheel 事件提供更精确的控制，可以实现离散的章节切换，而不是连续滚动。

### Q: 如何调整滚动灵敏度？
A: 修改 `handleWheel` 函数中的判断逻辑，可以添加累积滚动值。

### Q: 如何在移动端使用？
A: 需要添加 `touchmove` 事件监听，并处理触摸滚动。

---

**创建时间**: 2026-03-28  
**作者**: AI Assistant  
**版本**: 1.0.0

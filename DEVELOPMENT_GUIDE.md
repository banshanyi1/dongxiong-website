# 东雄环保官网开发规范

## 项目架构

### 目录结构

```
src/
├── assets/           # 静态资源
│   ├── css/         # 样式文件
│   ├── fonts/       # 字体文件
│   ├── images/      # 图片资源
│   ├── videos/      # 视频资源
│   └── globe/       # 地球可视化资源
├── components/      # 可复用组件
├── composables/     # 组合式函数
├── locales/         # 国际化文件
├── router/          # 路由配置
├── utils/           # 工具函数
├── views/           # 页面组件
├── App.vue          # 根组件
└── main.js          # 入口文件
```

## 编码规范

### Vue组件规范

#### 组件命名

- 使用 PascalCase 命名法
- 组件名应该至少包含两个单词
- 例如：`SiteHeader.vue`, `CaseCard.vue`

#### 组件结构

```vue
<template>
  <!-- 模板内容 -->
</template>

<script setup>
// 组合式API
import { ref, computed, onMounted } from 'vue'

// 导入
import SomeComponent from '@/components/SomeComponent.vue'
import { useSomeComposable } from '@/composables/useSomeComposable'
import { SOME_CONSTANT } from '@/utils/constants'

// Props定义
const props = defineProps({
  title: {
    type: String,
    required: true,
  },
})

// 响应式数据
const count = ref(0)

// 计算属性
const doubleCount = computed(() => count.value * 2)

// 方法
function increment() {
  count.value++
}

// 生命周期
onMounted(() => {
  console.log('Component mounted')
})
</script>

<style scoped>
/* 组件样式 */
.component-class {
  /* 样式规则 */
}
</style>
```

### CSS规范

#### 使用CSS变量

```css
/* 推荐使用CSS变量 */
.element {
  color: var(--color-primary);
  background-color: var(--color-bg);
  border-radius: var(--radius-lg);
  padding: var(--spacing-4);
}
```

#### 响应式设计

```css
/* 移动优先 */
.component {
  padding: var(--spacing-4);
}

@media (min-width: 768px) {
  .component {
    padding: var(--spacing-6);
  }
}
```

### JavaScript规范

#### 变量声明

```javascript
// 使用const/let，避免var
const API_URL = 'https://api.example.com'
let count = 0
const items = []

// 对象解构
const { name, age } = user
const [first, second] = array

// 数组方法链式调用
const result = items
  .filter(item => item.active)
  .map(item => item.name)
  .sort()
```

#### 异步处理

```javascript
// 使用async/await
async function fetchData() {
  try {
    const response = await fetch('/api/data')
    const data = await response.json()
    return data
  } catch (error) {
    console.error('Error fetching data:', error)
    throw error
  }
}

// Promise处理
fetchData()
  .then(data => console.log(data))
  .catch(error => console.error(error))
```

## 性能优化

### 图片优化

- 使用适当的图片格式（WebP优先）
- 实施懒加载策略
- 合理设置图片尺寸

### 代码分割

```javascript
// 动态导入
const HeavyComponent = defineAsyncComponent(() => import('@/components/HeavyComponent.vue'))
```

### 缓存策略

- 利用浏览器缓存
- 合理设置HTTP缓存头
- 使用Service Worker（如需要）

## 国际化规范

### 翻译键命名

```
pages.home.title
components.header.navigation
validation.required
```

### 使用翻译

```javascript
import { useI18n } from '@/composables/useI18n'

const { t } = useI18n()

// 基本使用
const title = t('pages.home.title')

// 带参数
const message = t('validation.minLength', { min: 8 })
```

## 测试规范

### 单元测试

```javascript
import { mount } from '@vue/test-utils'
import Button from '@/components/Button.vue'

describe('Button', () => {
  test('renders correctly', () => {
    const wrapper = mount(Button, {
      props: {
        variant: 'primary',
      },
    })
    expect(wrapper.classes()).toContain('btn-primary')
  })
})
```

### 端到端测试

```javascript
describe('Navigation', () => {
  it('should navigate to about page', () => {
    cy.visit('/')
    cy.get('[data-cy=nav-about]').click()
    cy.url().should('include', '/about')
  })
})
```

## Git提交规范

### 提交类型

- `feat`: 新功能
- `fix`: 修复bug
- `docs`: 文档更新
- `style`: 代码格式调整
- `refactor`: 代码重构
- `test`: 测试相关
- `chore`: 构建过程或辅助工具变动

### 提交格式

```
type(scope): subject

body (optional)

footer (optional)
```

### 示例

```
feat(home): add video background to hero section

- Added MP4 video background
- Implemented play/pause controls
- Added loading spinner

Closes #123
```

## 部署规范

### 构建优化

```bash
# 生产环境构建
npm run build

# 预览构建结果
npm run preview
```

### 环境变量

```bash
# .env.production
VITE_API_URL=https://api.production.com
VITE_APP_TITLE=东雄环保官网
```

## 错误处理

### 全局错误捕获

```javascript
// main.js
app.config.errorHandler = (err, instance, info) => {
  console.error('Global error:', err, info)
  // 发送到错误监控服务
}
```

### 组件内错误处理

```javascript
try {
  await someAsyncOperation()
} catch (error) {
  handleError(error)
}
```

## 可访问性(A11Y)

### 基本原则

- 语义化HTML
- 合理的对比度
- 键盘导航支持
- 屏幕阅读器友好

### 实现要点

```html
<!-- 良好的语义化 -->
<button type="button" aria-label="关闭对话框">×</button>
<nav aria-label="主导航">
  <ul>
    <li><a href="/home">首页</a></li>
  </ul>
</nav>

<!-- 正确的角色和属性 -->
<div role="alert" aria-live="polite">操作成功</div>
```

## 性能监控

### 核心指标

- FCP (First Contentful Paint)
- LCP (Largest Contentful Paint)
- FID (First Input Delay)
- CLS (Cumulative Layout Shift)

### 监控实现

```javascript
// 性能监控已集成在utils/performance.js中
import { performanceMonitor } from '@/utils/performance'

// 自动监控核心指标
performanceMonitor.monitorCoreWebVitals()
```

## 安全规范

### XSS防护

- 使用Vue的模板语法自动转义
- 避免使用`v-html`除非必要
- 对用户输入进行验证和清理

### CSRF防护

- 使用SameSite Cookie属性
- 实施Token验证机制

这个规范文档旨在确保团队协作的一致性和代码质量，同时保持项目的可维护性和扩展性。

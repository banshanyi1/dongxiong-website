# 东雄环保 — 企业官网

静态前端官网，面向**大气环保与有色金属冶炼**业务，采用苹果风格 + B2B 专业感设计（参考 ABB、西门子、大疆企业版等）。

## 技术栈

- **Vue 3**（Composition API + `<script setup>`）
- **Vite 5**（开发与构建）
- **纯静态**：无后端，可部署到任意静态托管（如 GitHub Pages、Vercel、OSS）

## 本地开发

```bash
# 安装依赖
npm install

# 启动开发服务器（默认 http://localhost:5173）
npm run dev
```

## 构建与预览

```bash
# 构建生产包（输出到 dist/）
npm run build

# 本地预览构建结果（默认 http://localhost:4173）
npm run preview
```

## 项目结构

```
dongxiong-website/
├── index.html              # 入口 HTML
├── package.json
├── vite.config.js
├── public/                 # 静态资源（如 favicon）
├── src/
│   ├── main.js             # Vue 入口
│   ├── App.vue             # 根组件，拼装各区块
│   ├── assets/
│   │   └── global.css      # 全局样式与 CSS 变量
│   └── components/
│       ├── SiteHeader.vue  # 顶部导航（含移动端菜单）
│       ├── HeroSection.vue # 首屏
│       ├── AboutSection.vue
│       ├── ServicesSection.vue
│       ├── SolutionsSection.vue
│       ├── ContactSection.vue
│       └── SiteFooter.vue
└── README.md
```

## 后续可做

1. **内容**：在对应组件里替换公司名称、业务描述、真实地址/电话/邮箱。
2. **图片**：在 `public/` 放 logo、首屏大图等，在组件中用 `/图片名.jpg` 引用。
3. **多页**：若需“产品详情”“案例”等独立页，可加 Vue Router，仍用 Vite 做静态构建。
4. **部署**：将 `npm run build` 生成的 `dist/` 上传到托管即可。

## 设计说明

- 风格：简洁、留白、大标题、中性色，参考苹果官网；B2B 信任感参考 ABB/西门子。
- 主色：工业蓝 `#0a7ea4` 作为强调色，可随品牌调整 `src/assets/global.css` 中的 CSS 变量。
- 响应式：导航在移动端为汉堡菜单，各区块使用 `clamp()` 与网格适配不同屏幕。

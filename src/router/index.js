import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('../views/HomeView.vue'),
    meta: { title: '首页' },
  },

  {
    path: '/about',
    name: 'about',
    component: () => import('../views/AboutView.vue'),
    meta: { title: '关于我们', hideBottomNav: true },
  },
  {
    path: '/services',
    name: 'services',
    component: () => import('../views/ServicesView.vue'),
    meta: { title: '业务范围' },
  },
  {
    path: '/solutions',
    name: 'solutions',
    component: () => import('../views/SolutionsView.vue'),
    meta: { title: '解决方案' },
  },
  {
    path: '/cases',
    name: 'cases',
    component: () => import('../views/CasesView.vue'),
    meta: { title: '工程案例' },
  },

  {
    path: '/cases/:id',
    name: 'case-detail',
    component: () => import('../views/CaseDetailView.vue'),
    meta: { title: '案例详情' },
  },
  {
    path: '/contact',
    name: 'contact',
    component: () => import('../views/ContactView.vue'),
    meta: { title: '联系我们' },
  },

]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) return savedPosition
    if (to.hash) return { el: to.hash, behavior: 'smooth' }
    return { top: 0 }
  },
})

// 添加路由守卫调试
router.beforeEach((to, from, next) => {
  console.log('路由跳转:', from.path, '->', to.path)
  document.title = to.meta.title ? `${to.meta.title} | 东雄环保` : '东雄环保'
  next()
})

export default router

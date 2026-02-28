import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('../views/HomeView.vue'),
    meta: { titleKey: 'nav.home', hideBottomNav: false },
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('../views/AboutView.vue'),
    meta: { titleKey: 'nav.about', hideBottomNav: true },
  },
  {
    path: '/services',
    name: 'services',
    component: () => import('../views/ServicesView.vue'),
    meta: { titleKey: 'nav.services' },
  },
  {
    path: '/solutions',
    name: 'solutions',
    component: () => import('../views/SolutionsView.vue'),
    meta: { titleKey: 'nav.solutions' },
  },
  {
    path: '/cases',
    name: 'cases',
    component: () => import('../views/CasesView.vue'),
    meta: { titleKey: 'nav.cases' },
  },
  {
    path: '/cases/:id',
    name: 'case-detail',
    component: () => import('../views/CaseDetailView.vue'),
    meta: { titleKey: 'caseDetail.pageTitle' },
  },
  {
    path: '/contact',
    name: 'contact',
    component: () => import('../views/ContactView.vue'),
    meta: { titleKey: 'nav.contact' },
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

// 路由守卫：标题由 App.vue 根据 locale 更新
router.beforeEach((to, from, next) => {
  next()
})

export default router

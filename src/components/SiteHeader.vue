<template>
  <header
    class="site-header"
    :class="{ 'is-scrolled': scrolled, 'dropdown-open': activeDropdown }"
    @mouseenter="handleHeaderMouseEnter()"
    @mouseleave="handleHeaderMouseLeave()"
  >
    <div class="container header-inner">
      <RouterLink to="/" class="logo" :aria-label="t('common.logo') + ' ' + t('nav.home')">
        <img class="logo-img" src="/brand/logo.jpg" alt="东雄环保 logo" />
        <span class="logo-text">{{ t('common.logo') }}</span>
      </RouterLink>
      <nav class="nav" aria-label="主导航">
        <div
          v-for="item in navItems"
          :key="item.id"
          class="nav-item-wrap"
          :class="{ 'no-dropdown': item.id === 'home' }"
          @mouseenter="item.id !== 'contact' ? handleNavEnter(item.id) : null"
          @mouseleave="item.id !== 'contact' ? handleNavLeave() : null"
        >
          <RouterLink
            :to="item.path"
            class="nav-link"
            active-class="is-active"
            :class="{ 'nav-link-trigger': item.children?.length && item.id !== 'contact' }"
            @click="handleNavClick"
          >
            {{ item.label }}
          </RouterLink>
        </div>
      </nav>
      <div class="header-right">
        <button
          type="button"
          class="lang-switcher"
          :title="locale === 'zh-CN' ? 'Switch to English' : '切换到中文'"
          @click="toggleLocale"
        >
          {{ locale === 'zh-CN' ? 'EN' : '中文' }}
        </button>
        <button
          type="button"
          class="menu-btn"
          :aria-label="t('nav.openMenu')"
          @click="mobileOpen = !mobileOpen"
        >
          <span class="menu-icon" :class="{ open: mobileOpen }"></span>
        </button>
      </div>
    </div>

    <!-- 下拉面板：悬停时显示当前导航的子页面 -->
    <Transition name="dropdown">
      <div
        v-if="activeDropdown"
        class="nav-dropdown-wrap"
        @mouseenter="handleDropdownEnter()"
        @mouseleave="handleDropdownLeave()"
      >
        <div class="nav-dropdown-inner container">
          <template v-for="item in navItems" :key="item.id">
            <div
              v-if="item.children?.length && activeDropdown === item.id"
              class="nav-dropdown-panel"
            >
              <RouterLink
                v-for="child in item.children"
                :key="child.path"
                :to="child.path"
                class="nav-dropdown-link"
                @click="handleDropdownClick"
              >
                <span class="dropdown-link-title">{{ child.label }}</span>
                <span v-if="child.desc" class="dropdown-link-desc">{{ child.desc }}</span>
              </RouterLink>
            </div>
          </template>
        </div>
      </div>
    </Transition>

    <!-- 毛玻璃遮罩：下拉打开时覆盖主内容 -->
    <Transition name="overlay">
      <div
        v-if="activeDropdown"
        class="nav-overlay"
        aria-hidden="true"
        @click="activeDropdown = null"
      ></div>
    </Transition>

    <!-- 移动端菜单 -->
    <div class="mobile-nav" :class="{ open: mobileOpen }">
      <RouterLink
        v-for="item in navItems"
        :key="item.id"
        :to="item.path"
        class="mobile-nav-link"
        @click="handleMobileNavClick"
      >
        {{ item.label }}
      </RouterLink>
      <template v-for="item in navItems" :key="'m-' + item.id">
        <template v-if="item.children?.length">
          <RouterLink
            v-for="child in item.children"
            :key="child.path"
            :to="child.path"
            class="mobile-nav-sublink"
            @click="handleMobileSubClick"
          >
            {{ child.label }}
          </RouterLink>
        </template>
      </template>
    </div>
  </header>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'

import { useI18n } from '../composables/useI18n'

const emits = defineEmits(['blur-change'])
const route = useRoute()
const { t, locale, setLocale } = useI18n()

function toggleLocale() {
  setLocale(locale.value === 'zh-CN' ? 'en' : 'zh-CN')
}

// 全屏模糊状态
const isFullscreenBlur = ref(false)

const navItems = computed(() => {
  locale.value // 依赖 locale 以在切换语言时重新计算
  return [
    {
      id: 'home',
      label: t('nav.home'),
      path: '/',
      children: [],
    },
    {
      id: 'about',
      label: t('nav.about'),
      path: '/about',
      children: [
        { path: '/about', label: t('nav.aboutIntro'), desc: t('nav.aboutIntroDesc') },
        { path: '/about#history', label: t('nav.history'), desc: t('nav.historyDesc') },
        { path: '/about#honor', label: t('nav.honor'), desc: t('nav.honorDesc') },
      ],
    },
    {
      id: 'services',
      label: t('nav.services'),
      path: '/services',
      children: [
        {
          path: '/services#design',
          label: t('nav.designConsult'),
          desc: t('nav.designConsultDesc'),
        },
        { path: '/services#smelting', label: t('nav.smelting'), desc: t('nav.smeltingDesc') },
        { path: '/services', label: t('nav.airControl'), desc: t('nav.airControlDesc') },
        { path: '/services#equipment', label: t('nav.equipment'), desc: t('nav.equipmentDesc') },
      ],
    },
    {
      id: 'solutions',
      label: t('nav.solutions'),
      path: '/solutions',
      children: [
        { path: '/solutions', label: t('nav.smokeSolution'), desc: t('nav.smokeSolutionDesc') },
        {
          path: '/solutions#upgrade',
          label: t('nav.upgradeSolution'),
          desc: t('nav.upgradeSolutionDesc'),
        },
        {
          path: '/solutions#operation',
          label: t('nav.operationSolution'),
          desc: t('nav.operationSolutionDesc'),
        },
      ],
    },
    {
      id: 'cases',
      label: t('nav.cases'),
      path: '/cases',
      children: [
        { path: '/cases', label: t('nav.caseOverview'), desc: t('nav.caseOverviewDesc') },
        { path: '/cases#metallurgy', label: t('nav.metallurgy'), desc: t('nav.metallurgyDesc') },
        { path: '/cases#industry', label: t('nav.industryAir'), desc: t('nav.industryAirDesc') },
      ],
    },
    {
      id: 'contact',
      label: t('nav.contact'),
      path: '/contact',
      children: [],
    },
  ]
})

const scrolled = ref(false)
const mobileOpen = ref(false)
const activeDropdown = ref(null)
const dropdownTimeout = ref(null)
const isMouseOverNav = ref(false)
const isMouseOverDropdown = ref(false)

// 导航栏鼠标进入处理
function handleNavEnter(id) {
  isMouseOverNav.value = true
  // 清除关闭定时器
  if (dropdownTimeout.value) {
    clearTimeout(dropdownTimeout.value)
    dropdownTimeout.value = null
  }
  activeDropdown.value = id
}

// 导航栏鼠标离开处理
function handleNavLeave() {
  isMouseOverNav.value = false
  // 只有当鼠标也不在下拉菜单上时才计划关闭
  if (!isMouseOverDropdown.value) {
    scheduleDropdownClose()
  }
}

// 下拉菜单鼠标进入处理
function handleDropdownEnter() {
  isMouseOverDropdown.value = true
  // 清除关闭定时器
  if (dropdownTimeout.value) {
    clearTimeout(dropdownTimeout.value)
    dropdownTimeout.value = null
  }
  // 鼠标进入下拉菜单时保持模糊效果
  isFullscreenBlur.value = true
  emits('blur-change', true)
}

// 下拉菜单鼠标离开处理
function handleDropdownLeave() {
  isMouseOverDropdown.value = false
  // 只有当鼠标也不在导航上时才计划关闭
  if (!isMouseOverNav.value) {
    scheduleDropdownClose()
  }
  // 鼠标离开下拉菜单时不立即取消模糊，让导航栏mouseleave处理
}

// 计划关闭下拉菜单
function scheduleDropdownClose() {
  // 设置300毫秒延迟关闭
  dropdownTimeout.value = setTimeout(() => {
    // 再次检查鼠标是否仍在相关区域
    if (!isMouseOverNav.value && !isMouseOverDropdown.value) {
      activeDropdown.value = null
    }
    dropdownTimeout.value = null
  }, 300)
}

// 导航栏整体鼠标事件处理
function handleHeaderMouseEnter() {
  // 鼠标进入整个导航栏区域时触发模糊
  isFullscreenBlur.value = true
  // 发射事件到父组件
  emits('blur-change', true)
}

function handleHeaderMouseLeave() {
  // 鼠标离开整个导航栏区域时取消模糊
  isFullscreenBlur.value = false
  // 发射事件到父组件
  emits('blur-change', false)

  // 同时关闭下拉菜单
  activeDropdown.value = null
}

function closeAll() {
  // 清除之前的定时器
  if (dropdownTimeout.value) {
    clearTimeout(dropdownTimeout.value)
    dropdownTimeout.value = null
  }
  activeDropdown.value = null
  mobileOpen.value = false
  isMouseOverNav.value = false
  isMouseOverDropdown.value = false
}

function handleNavClick(event) {
  // 确保导航正常工作
  console.log('导航点击:', event.target.textContent.trim())
  console.log('当前路由:', route.path)
  // 不阻止默认行为，让 RouterLink 正常工作
}

function handleDropdownClick(event) {
  console.log('下拉菜单点击:', event.target)
  closeAll()
}

function handleMobileNavClick(event) {
  console.log('移动端导航点击:', event.target)
  mobileOpen.value = false
}

function handleMobileSubClick(event) {
  console.log('移动端子菜单点击:', event.target)
  mobileOpen.value = false
}

function isActiveParent(item) {
  if (!item.path) {
    return false
  }
  if (item.path === '/') {
    return route.path === '/'
  }
  return route.path.startsWith(item.path)
}

function onScroll() {
  scrolled.value = window.scrollY > 20
}

onMounted(() => {
  window.addEventListener('scroll', onScroll, { passive: true })
})
onUnmounted(() => {
  window.removeEventListener('scroll', onScroll)
})
</script>

<style scoped>
.site-header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 200;
  padding: 1rem 0;
  background: rgba(251, 251, 253, 0.72);
  backdrop-filter: saturate(180%) blur(20px);
  -webkit-backdrop-filter: saturate(180%) blur(20px);
  border-bottom: 1px solid transparent;
  transition: background var(--duration-normal) var(--ease-out),
    border-color var(--duration-normal) var(--ease-out),
    padding var(--duration-normal) var(--ease-out);
}

.site-header.is-scrolled {
  padding: 0.5rem 0;
  border-bottom-color: var(--color-border);
}

.header-inner {
  position: relative;
  z-index: 202;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.header-right {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.lang-switcher {
  padding: 0.35rem 0.65rem;
  font-size: 0.8rem;
  font-weight: 500;
  color: var(--color-text);
  background: rgba(0, 0, 0, 0.05);
  border: 1px solid var(--color-border);
  border-radius: 6px;
  cursor: pointer;
  transition: all var(--duration-fast) var(--ease-out);
}

.lang-switcher:hover {
  color: var(--color-industry);
  border-color: var(--color-industry);
  background: rgba(10, 126, 164, 0.08);
}

.logo {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  color: var(--color-text);
  font-weight: var(--font-weight-semibold);
  font-size: 1.5rem;
  letter-spacing: -0.01em;
}

.logo:hover {
  color: var(--color-text);
}

.logo-img {
  height: 51px;
  width: auto;
  display: block;
  object-fit: contain;
  border-radius: 4px;
}

.site-header.is-scrolled .logo-img {
  height: 42px;
}

.nav {
  display: none;
}

@media (min-width: 768px) {
  .nav {
    display: flex;
    align-items: center;
    gap: 0.25rem;
  }
}

.nav-item-wrap {
  position: relative;
}

.nav-link {
  display: inline-block;
  padding: 0.5rem 0.75rem;
  color: var(--color-text);
  font-size: var(--text-small);
  font-weight: var(--font-weight-medium);
  outline: none;
  transition: color var(--duration-fast) var(--ease-out);
}

.nav-link:hover,
.nav-link.is-active {
  color: var(--color-industry);
}

.nav-link-trigger {
  cursor: pointer;
}

/* 首页无下拉效果 - 但仍保持可点击 */
.nav-item-wrap.no-dropdown {
  pointer-events: auto;
}

.nav-item-wrap.no-dropdown .nav-link {
  cursor: pointer;
  pointer-events: auto;
}

.nav-link {
  pointer-events: auto;
  cursor: pointer;
}

/* 下拉面板 */
.nav-dropdown-wrap {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  z-index: 201;
  pointer-events: auto;
  background: rgba(251, 251, 253, 0.85);
  backdrop-filter: saturate(180%) blur(24px);
  -webkit-backdrop-filter: saturate(180%) blur(24px);
  border-bottom: 1px solid var(--color-border);
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.08);
}

.nav-dropdown-inner {
  padding: 1.25rem 0 1.5rem;
}

.nav-dropdown-panel {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 0.5rem 2rem;
}

.nav-dropdown-link {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  padding: 0.6rem 0;
  color: var(--color-text);
  border-radius: 8px;
  outline: none;
  transition: background var(--duration-fast) var(--ease-out),
    color var(--duration-fast) var(--ease-out);
}

.nav-dropdown-link:hover {
  color: var(--color-industry);
}

.dropdown-link-title {
  font-weight: var(--font-weight-medium);
  font-size: var(--text-body);
}

.dropdown-link-desc {
  font-size: var(--text-small);
  color: var(--color-text-secondary);
}

/* 毛玻璃遮罩：覆盖除 header 外的整页，在导航栏与下拉之下 */
.nav-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 199;
  pointer-events: auto;
  background: rgba(0, 0, 0, 0.12);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  cursor: default;
}

/* 下拉进入/离开动效 */
.dropdown-enter-active,
.dropdown-leave-active {
  transition: opacity var(--duration-normal) var(--ease-out),
    transform var(--duration-normal) var(--ease-out);
}

.dropdown-enter-from,
.dropdown-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}

.overlay-enter-active,
.overlay-leave-active {
  transition: opacity var(--duration-normal) var(--ease-out);
}

.overlay-enter-from,
.overlay-leave-to {
  opacity: 0;
}

/* 汉堡菜单 */
.menu-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  padding: 0;
  border: none;
  background: transparent;
  cursor: pointer;
}

@media (min-width: 768px) {
  .menu-btn {
    display: none;
  }
}

.menu-icon {
  width: 20px;
  height: 2px;
  background: var(--color-text);
  position: relative;
  transition: background var(--duration-fast) var(--ease-out);
}

.menu-icon::before,
.menu-icon::after {
  content: '';
  position: absolute;
  left: 0;
  width: 20px;
  height: 2px;
  background: var(--color-text);
  transition: transform var(--duration-fast) var(--ease-out),
    top var(--duration-fast) var(--ease-out);
}

.menu-icon::before {
  top: -6px;
}

.menu-icon::after {
  top: 6px;
}

.menu-icon.open {
  background: transparent;
}

.menu-icon.open::before {
  top: 0;
  transform: rotate(45deg);
}

.menu-icon.open::after {
  top: 0;
  transform: rotate(-45deg);
}

.mobile-nav {
  position: fixed;
  top: 56px;
  left: 0;
  right: 0;
  bottom: 0;
  background: var(--color-bg);
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  opacity: 0;
  visibility: hidden;
  transition: opacity var(--duration-normal) var(--ease-out),
    visibility var(--duration-normal) var(--ease-out);
  z-index: 190;
  overflow: auto;
}

.mobile-nav.open {
  opacity: 1;
  visibility: visible;
}

@media (min-width: 768px) {
  .mobile-nav {
    display: none;
  }
}

.mobile-nav-link {
  font-size: 1.125rem;
  font-weight: var(--font-weight-medium);
  color: var(--color-text);
  padding: 0.75rem 0;
  outline: none;
}

.mobile-nav-sublink {
  font-size: 1rem;
  color: var(--color-text-secondary);
  padding: 0.5rem 0 0.5rem 1rem;
  outline: none;
}
</style>

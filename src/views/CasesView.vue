<template>
  <div class="page-view">
    <section class="page-hero">
      <div class="page-hero-bg" style="background-image: url(https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1920&q=80)"></div>
      <div class="page-hero-overlay"></div>
      <div class="container page-hero-inner">
        <h1 class="page-hero-title">工程案例</h1>
        <p class="page-hero-lead">数百个成功项目，遍布全国，可参观考察</p>
      </div>
    </section>
    <section class="page-body">
      <div class="container container--wide">
        <p class="page-eyebrow">案例展示</p>
        <h2 class="section-title">典型工程案例</h2>
        <p class="section-lead page-intro">
          脱硫脱硝、除尘与冶炼环保项目经验丰富，以下为部分案例（可替换为真实项目信息）。
        </p>
        <div class="cases-grid">
          <article 
            v-for="(c, i) in cases" 
            :key="c.title" 
            class="case-card"
            @click="handleCardClick(c.id)"
          >
            <div class="case-card-image" :style="{ backgroundImage: `url(${c.image})` }"></div>
            <div class="case-card-body">
              <span class="case-card-tag">{{ c.tag }}</span>
              <h3 class="case-card-title">{{ c.title }}</h3>
              <p class="case-card-desc">{{ c.desc }}</p>
              <div class="case-card-links">
                <span class="case-card-link">了解详情 →</span>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const handleCardClick = (id) => {
  console.log('点击卡片:', id)
  router.push(`/cases/${id}`)
}

const cases = [
  {
    id: '1',
    tag: '冶金行业',
    title: '某铜冶炼企业烟气脱硫脱硝项目',
    desc: '年产 XX 万吨铜冶炼配套烟气综合治理，实现超低排放。',
    image: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=800&q=80',
  },
  {
    id: '2',
    tag: '工业大气',
    title: '某工业园区集中供热脱硝除尘',
    desc: '多台锅炉烟气脱硝、除尘改造与运维。',
    image: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=800&q=80',
  },
  {
    id: '3',
    tag: '冶金行业',
    title: '某铝业环保升级改造',
    desc: '电解铝烟气净化与无组织排放治理。',
    image: 'https://images.unsplash.com/photo-1567767292278-a4f21aa2d36e?w=800&q=80',
  },
]
</script>

<style scoped>
.page-view { padding-top: 0; }

.page-hero {
  position: relative;
  height: 50vh;
  min-height: 320px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.page-hero-bg {
  position: absolute;
  inset: 0;
  background-size: cover;
  background-position: center;
}

.page-hero-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.5) 100%);
}

.page-hero-inner {
  position: relative;
  z-index: 1;
  text-align: center;
  color: #fff;
}

.page-hero-title {
  font-size: var(--text-h1);
  font-weight: var(--font-weight-semibold);
  margin-bottom: 0.5rem;
}

.page-hero-lead { font-size: var(--text-body); opacity: 0.95; }

.page-body { padding: var(--space-section) 0; }

.page-eyebrow {
  font-size: var(--text-small);
  font-weight: var(--font-weight-medium);
  color: var(--color-industry);
  text-transform: uppercase;
  letter-spacing: 0.1em;
  margin-bottom: 0.75rem;
}

.page-intro { margin-bottom: 2rem; }

.cases-grid {
  display: grid;
  gap: 2rem;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
}

.case-card {
  background: var(--color-bg-card);
  border-radius: 16px;
  overflow: hidden;
  border: 1px solid var(--color-border);
  transition: transform var(--duration-normal) var(--ease-out), box-shadow var(--duration-normal) var(--ease-out);
  cursor: pointer;
}

.case-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 16px 48px rgba(0, 0, 0, 0.08);
}

.case-card:active {
  transform: translateY(-2px);
}

.case-card-image {
  height: 220px;
  background-size: cover;
  background-position: center;
  background-color: var(--color-bg-subtle);
}

.case-card-body { 
  padding: 1.5rem; 
}

.case-card-tag {
  display: inline-block;
  font-size: 0.75rem;
  font-weight: var(--font-weight-medium);
  color: var(--color-primary);
  text-transform: uppercase;
  letter-spacing: 0.08em;
  margin-bottom: 0.5rem;
  background: var(--color-primary-light);
  padding: 0.25rem 0.75rem;
  border-radius: 12px;
}

.case-card-title {
  font-size: var(--text-h3);
  font-weight: var(--font-weight-semibold);
  margin-bottom: 0.5rem;
}

.case-card-desc {
  font-size: var(--text-small);
  color: var(--color-text-secondary);
  line-height: 1.6;
  margin-bottom: 1rem;
}

.case-card-link {
  font-size: var(--text-small);
  font-weight: var(--font-weight-medium);
  color: var(--color-primary);
}

.case-card-link:hover { 
  color: var(--color-primary-hover); 
  text-decoration: underline;
}

.case-card-links {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}
</style>

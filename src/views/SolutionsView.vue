<template>
  <div class="page-view">
    <section class="page-hero">
      <div class="page-hero-bg" style="background-image: url(https://images.unsplash.com/photo-1567767292278-a4f21aa2d36e?w=1920&q=80)"></div>
      <div class="page-hero-overlay"></div>
      <div class="container page-hero-inner">
        <h1 class="page-hero-title">解决方案</h1>
        <p class="page-hero-lead">为行业量身定制的环保升级与运维方案</p>
      </div>
    </section>
    <section class="page-body">
      <div class="container container--wide">
        <p class="page-eyebrow">方案概览</p>
        <h2 class="section-title">典型解决方案</h2>
        <p class="section-lead page-intro">
          针对有色金属冶炼与工业大气排放的典型场景，提供可复制、可扩展的解决方案。
        </p>
        <div class="solutions-list">
          <div v-for="(item, i) in items" :key="item.title" class="solution-item">
            <span class="solution-num">0{{ i + 1 }}</span>
            <div>
              <h3 class="solution-title">{{ item.title }}</h3>
              <p class="solution-desc">{{ item.desc }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
const items = [
  { title: '冶炼烟气综合治理', desc: '脱硫、脱硝、除尘一体化设计与设备选型，满足超低排放与地方特别排放限值要求。' },
  { title: '有色冶炼环保升级', desc: '现有产线环保改造、工艺优化与智能控制，在保证产能的前提下实现减排与节能。' },
  { title: '运维与达标保障', desc: '长期运营维护、在线监测与数据分析，确保设施稳定运行与持续达标。' },
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

.solutions-list { display: flex; flex-direction: column; gap: 0; }

.solution-item {
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 1.5rem 2rem;
  padding: 2rem 0;
  border-bottom: 1px solid var(--color-border);
  align-items: start;
}

.solution-item:last-child { border-bottom: none; }

.solution-num {
  font-size: var(--text-h2);
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-muted);
  letter-spacing: -0.02em;
}

.solution-title {
  font-size: var(--text-h3);
  font-weight: var(--font-weight-semibold);
  margin-bottom: 0.5rem;
}

.solution-desc {
  font-size: var(--text-body);
  color: var(--color-text-secondary);
  line-height: 1.6;
}
</style>

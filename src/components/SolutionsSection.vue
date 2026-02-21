<template>
  <section id="solutions" class="solutions">
    <div class="container container--wide">
      <div class="solutions-intro">
        <p class="solutions-eyebrow">解决方案</p>
        <h2 class="section-title">为行业量身定制</h2>
        <p class="section-lead">
          针对有色金属冶炼与工业大气排放的典型场景，提供可复制、可扩展的解决方案与案例参考。
        </p>
      </div>
      <div class="solutions-list">
        <div v-for="(item, i) in items" :key="item.title" class="solution-item">
          <div class="solution-number">0{{ i + 1 }}</div>
          <div class="solution-content">
            <h3 class="solution-title">{{ item.title }}</h3>
            <p class="solution-desc">{{ item.desc }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const items = [
  {
    title: '冶炼烟气综合治理',
    desc: '脱硫、脱硝、除尘一体化设计与设备选型，满足超低排放与地方特别排放限值要求。',
  },
  {
    title: '有色冶炼环保升级',
    desc: '现有产线环保改造、工艺优化与智能控制，在保证产能的前提下实现减排与节能。',
  },
  {
    title: '运维与达标保障',
    desc: '长期运营维护、在线监测与数据分析，确保设施稳定运行与持续达标。',
  },
]
</script>

<style scoped>
.solutions {
  padding: var(--space-section) 0;
  background: var(--color-bg);
}

.solutions-intro {
  max-width: 36em;
  margin-bottom: var(--space-block);
}

.solutions-eyebrow {
  font-size: var(--text-small);
  font-weight: var(--font-weight-medium);
  color: var(--color-industry);
  text-transform: uppercase;
  letter-spacing: 0.1em;
  margin-bottom: 0.75rem;
}

.solutions-list {
  display: flex;
  flex-direction: column;
  gap: 0;
}

.solution-item {
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 1.5rem 2rem;
  padding: 2rem 0;
  border-bottom: 1px solid var(--color-border);
  align-items: start;
}

.solution-item:last-child {
  border-bottom: none;
}

.solution-number {
  font-size: var(--text-h2);
  font-weight: var(--font-weight-semibold);
  color: var(--color-border);
  letter-spacing: -0.02em;
  line-height: 1;
}

.solution-title {
  font-size: var(--text-h3);
  font-weight: var(--font-weight-semibold);
  color: var(--color-text);
  margin-bottom: 0.5rem;
}

.solution-desc {
  font-size: var(--text-body);
  color: var(--color-text-secondary);
  line-height: 1.6;
}
</style>

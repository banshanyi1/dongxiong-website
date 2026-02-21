<template>
  <section id="services" class="services">
    <div class="container">
      <div class="services-intro">
        <p class="services-eyebrow">业务范围</p>
        <h2 class="section-title">核心业务板块</h2>
        <p class="section-lead">
          覆盖大气环保与有色金属冶炼全产业链关键环节，为客户提供合规、高效、可持续的解决方案。
        </p>
      </div>
      <div class="services-grid">
        <article v-for="(card, i) in cards" :key="card.title" class="service-card" :style="{ animationDelay: `${i * 0.1}s` }">
          <div class="service-card-icon">{{ card.icon }}</div>
          <h3 class="service-card-title">{{ card.title }}</h3>
          <p class="service-card-desc">{{ card.desc }}</p>
          <a :href="card.link" class="service-card-link">
            了解更多
            <span class="arrow">→</span>
          </a>
        </article>
      </div>
    </div>
  </section>
</template>

<script setup>
const cards = [
  {
    icon: '🌫️',
    title: '大气污染治理',
    desc: '烟气脱硫脱硝、除尘、VOCs 治理等工程设计、设备与运维服务。',
    link: '#contact',
  },
  {
    icon: '⚙️',
    title: '有色金属冶炼环保',
    desc: '铜、铝、铅、锌等冶炼环节的环保工艺设计、装备与技术改造。',
    link: '#contact',
  },
  {
    icon: '📐',
    title: '工程设计咨询',
    desc: '可研、环评配合、初步设计与施工图设计，确保合规与可落地。',
    link: '#contact',
  },
  {
    icon: '🔧',
    title: '设备与运维',
    desc: '核心环保设备供应、安装调试及长期运营维护与优化。',
    link: '#contact',
  },
]
</script>

<style scoped>
.services {
  padding: var(--space-section) 0;
  background: var(--color-bg-alt);
}

.services-intro {
  max-width: 36em;
  margin-bottom: var(--space-block);
}

.services-eyebrow {
  font-size: var(--text-small);
  font-weight: var(--font-weight-medium);
  color: var(--color-industry);
  text-transform: uppercase;
  letter-spacing: 0.1em;
  margin-bottom: 0.75rem;
}

.services-grid {
  display: grid;
  gap: 1.5rem;
  grid-template-columns: 1fr;
}

@media (min-width: 640px) {
  .services-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 960px) {
  .services-grid {
    grid-template-columns: repeat(4, 1fr);
  }
}

.service-card {
  background: var(--color-bg);
  border-radius: 16px;
  padding: 2rem;
  border: 1px solid var(--color-border);
  transition: transform var(--duration-normal) var(--ease-out),
              box-shadow var(--duration-normal) var(--ease-out),
              border-color var(--duration-fast) var(--ease-out);
}

.service-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.06);
  border-color: rgba(10, 126, 164, 0.2);
}

.service-card-icon {
  font-size: 2rem;
  margin-bottom: 1rem;
  line-height: 1;
}

.service-card-title {
  font-size: var(--text-h3);
  font-weight: var(--font-weight-semibold);
  color: var(--color-text);
  margin-bottom: 0.5rem;
}

.service-card-desc {
  font-size: var(--text-small);
  color: var(--color-text-secondary);
  line-height: 1.6;
  margin-bottom: 1rem;
}

.service-card-link {
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  font-size: var(--text-small);
  font-weight: var(--font-weight-medium);
  color: var(--color-industry);
}

.service-card-link:hover {
  color: var(--color-accent-hover);
}

.arrow {
  transition: transform var(--duration-fast) var(--ease-out);
}

.service-card:hover .arrow {
  transform: translateX(4px);
}
</style>

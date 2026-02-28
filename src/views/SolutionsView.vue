<template>
  <div class="page-view">
    <section class="page-hero">
      <div class="page-hero-bg" style="background-image: url(https://images.unsplash.com/photo-1567767292278-a4f21aa2d36e?w=1920&q=80)"></div>
      <div class="page-hero-overlay"></div>
      <div class="container page-hero-inner">
        <h1 class="page-hero-title">{{ t('solutions.heroTitle') }}</h1>
        <p class="page-hero-lead">{{ t('solutions.heroLead') }}</p>
      </div>
    </section>
    <section class="page-body">
      <div class="container container--wide">
        <p class="page-eyebrow">{{ t('solutions.eyebrow') }}</p>
        <h2 class="section-title">{{ t('solutions.title') }}</h2>
        <p class="section-lead page-intro">
          {{ t('solutions.lead') }}
        </p>
        <div class="solutions-list">
          <div v-for="(item, i) in items" :key="item.titleKey" class="solution-item">
            <span class="solution-num">0{{ i + 1 }}</span>
            <div>
              <h3 class="solution-title">{{ t(item.titleKey) }}</h3>
              <p class="solution-desc">{{ t(item.descKey) }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { useI18n } from '../composables/useI18n'

const { t } = useI18n()

const items = [
  { titleKey: 'solutions.item1', descKey: 'solutions.item1Desc' },
  { titleKey: 'solutions.item2', descKey: 'solutions.item2Desc' },
  { titleKey: 'solutions.item3', descKey: 'solutions.item3Desc' },
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

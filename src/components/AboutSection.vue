<template>
  <section id="about" class="about">
    <div class="container">
      <div class="about-grid">
        <div class="about-content">
          <p class="about-eyebrow">关于我们</p>
          <h2 class="section-title">专注大气环保与有色金属冶炼</h2>
          <p class="section-lead">
            我们深耕工业大气治理与有色金属冶炼环保领域，以技术为驱动，为客户提供从咨询、工程设计、设备供应到运营维护的全链条服务。
          </p>
          <ul class="about-features">
            <li v-for="item in features" :key="item.title" class="about-feature">
              <span class="about-feature-icon" aria-hidden="true">{{ item.icon }}</span>
              <div>
                <strong>{{ item.title }}</strong>
                <span>{{ item.desc }}</span>
              </div>
            </li>
          </ul>
        </div>
        <div class="about-visual">
          <div class="about-card">
            <div class="about-card-inner">
              <span class="about-stat">{{ stats.years }}</span>
              <span class="about-stat-label">年行业经验</span>
            </div>
          </div>
          <div class="about-card about-card-alt">
            <div class="about-card-inner">
              <span class="about-stat">{{ stats.projects }}</span>
              <span class="about-stat-label">+ 成功项目</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const features = [
  { icon: '◆', title: '技术领先：', desc: '引进与自主研发相结合，持续迭代工艺与设备' },
  { icon: '◆', title: '全流程服务：', desc: '从可研、设计、施工到运维一站式交付' },
  { icon: '◆', title: '绿色低碳：', desc: '助力客户实现达标排放与可持续发展目标' },
]

const stats = {
  years: '10+',
  projects: '100',
}
</script>

<style scoped>
.about {
  padding: var(--space-section) 0;
  background: var(--color-bg);
}

.about-grid {
  display: grid;
  gap: var(--space-block);
  align-items: start;
}

@media (min-width: 768px) {
  .about-grid {
    grid-template-columns: 1fr 1fr;
    gap: 3rem;
  }
}

.about-eyebrow {
  font-size: var(--text-small);
  font-weight: var(--font-weight-medium);
  color: var(--color-industry);
  text-transform: uppercase;
  letter-spacing: 0.1em;
  margin-bottom: 0.75rem;
}

.about-features {
  list-style: none;
  margin-top: 1.5rem;
}

.about-feature {
  display: flex;
  gap: 0.75rem;
  margin-bottom: 1rem;
  font-size: var(--text-small);
  color: var(--color-text-secondary);
}

.about-feature strong {
  color: var(--color-text);
  font-weight: var(--font-weight-medium);
}

.about-feature-icon {
  color: var(--color-industry);
  flex-shrink: 0;
}

.about-visual {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.about-card {
  background: var(--color-bg-alt);
  border-radius: 16px;
  padding: 2rem;
  border: 1px solid var(--color-border);
  transition: transform var(--duration-normal) var(--ease-out),
              box-shadow var(--duration-normal) var(--ease-out);
}

.about-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.08);
}

.about-card-alt {
  background: linear-gradient(135deg, rgba(10, 126, 164, 0.08) 0%, var(--color-bg-alt) 100%);
}

.about-card-inner {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.about-stat {
  font-size: var(--text-h1);
  font-weight: var(--font-weight-semibold);
  color: var(--color-industry);
  letter-spacing: -0.02em;
}

.about-stat-label {
  font-size: var(--text-small);
  color: var(--color-text-secondary);
}
</style>

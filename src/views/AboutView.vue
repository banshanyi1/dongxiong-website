<template>
  <div class="page-view">
    <section class="page-hero">
      <div class="page-hero-bg" style="background-image: url(https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=1920&q=80)"></div>
      <div class="page-hero-overlay"></div>
      <div class="container page-hero-inner">
        <h1 class="page-hero-title">关于我们</h1>
        <p class="page-hero-lead">专注有色金属冶炼与大气环保治理，以技术驱动全链条服务</p>
      </div>
    </section>
    <section class="page-body">
      <div class="container container--wide">
        <p class="page-eyebrow">公司简介</p>
        <h2 class="section-title">专注有色金属冶炼与大气环保治理</h2>
        <p class="section-lead page-intro">
          我们深耕有色金属冶炼与工业大气治理环保领域，以技术为驱动，为客户提供从咨询、工程设计、设备供应到运营维护的全链条服务。
        </p>
        <ul class="about-features">
          <li v-for="item in features" :key="item.title" class="about-feature">
            <span class="about-feature-icon">◆</span>
            <div>
              <strong>{{ item.title }}</strong>
              <span>{{ item.desc }}</span>
            </div>
          </li>
        </ul>
        <div id="history" class="page-block">
          <h3 class="page-h3">发展历程</h3>
          <p class="page-p">（此处可放置时间轴或里程碑内容）</p>
        </div>
        <div id="honor" class="page-block">
          <h3 class="page-h3">资质荣誉</h3>
          <p class="page-p">（此处可放置资质证书、荣誉奖项等）</p>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
const features = [
  { title: '技术领先：', desc: '引进与自主研发相结合，持续迭代工艺与设备' },
  { title: '全流程服务：', desc: '从可研、设计、施工到运维一站式交付' },
  { title: '绿色低碳：', desc: '助力客户实现达标排放与可持续发展目标' },
]
</script>

<style scoped>
.page-view {
  padding-top: 0;
}

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

.page-hero-lead {
  font-size: var(--text-body);
  opacity: 0.95;
}

.page-body {
  padding: var(--space-section) 0;
}

.page-eyebrow {
  font-size: var(--text-small);
  font-weight: var(--font-weight-medium);
  color: var(--color-industry);
  text-transform: uppercase;
  letter-spacing: 0.1em;
  margin-bottom: 0.75rem;
}

.page-intro {
  margin-bottom: 1.5rem;
}

.about-features {
  list-style: none;
  margin-bottom: 3rem;
}

.about-feature {
  display: flex;
  gap: 0.75rem;
  margin-bottom: 1rem;
  font-size: var(--text-body);
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

.page-block {
  margin-top: 2rem;
  padding-top: 2rem;
  border-top: 1px solid var(--color-border);
}

.page-h3 {
  font-size: var(--text-h2);
  font-weight: var(--font-weight-semibold);
  margin-bottom: 0.75rem;
}

.page-p {
  color: var(--color-text-secondary);
  line-height: 1.6;
}
</style>

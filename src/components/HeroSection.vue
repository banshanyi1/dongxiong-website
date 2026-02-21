<template>
  <section id="hero" class="hero">
    <div class="hero-bg">
      <div class="hero-gradient"></div>
      <div class="hero-pattern" aria-hidden="true"></div>
    </div>
    <div class="container hero-inner">
      <p class="hero-eyebrow">大气环保 · 有色金属冶炼</p>
      <h1 class="hero-title">
        专业环保解决方案<br />
        <span class="hero-title-accent">助力绿色冶炼</span>
      </h1>
      <p class="hero-lead">
        为有色金属冶炼与工业大气治理提供从设计、设备到运维的一站式服务，守护蓝天与可持续发展。
      </p>
      <div class="hero-actions">
        <a href="#services" class="btn btn-primary">了解业务</a>
        <a href="#contact" class="btn btn-ghost">联系我们</a>
      </div>
    </div>
    <div class="hero-scroll" aria-hidden="true">
      <span class="hero-scroll-line"></span>
    </div>
  </section>
</template>

<script setup>
</script>

<style scoped>
.hero {
  position: relative;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: calc(80px + var(--space-section)) 0 var(--space-section);
  overflow: hidden;
}

.hero-bg {
  position: absolute;
  inset: 0;
  z-index: 0;
}

.hero-gradient {
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, var(--color-bg) 0%, var(--color-bg-alt) 50%, var(--color-bg) 100%);
}

.hero-pattern {
  position: absolute;
  inset: 0;
  opacity: 0.4;
  background-image: radial-gradient(circle at 1px 1px, var(--color-border) 1px, transparent 0);
  background-size: 40px 40px;
}

.hero-inner {
  position: relative;
  z-index: 1;
  text-align: center;
  max-width: 720px;
}

.hero-eyebrow {
  font-size: var(--text-small);
  font-weight: var(--font-weight-medium);
  color: var(--color-industry);
  text-transform: uppercase;
  letter-spacing: 0.12em;
  margin-bottom: 1rem;
}

.hero-title {
  font-size: var(--text-hero);
  font-weight: var(--font-weight-semibold);
  letter-spacing: -0.03em;
  line-height: 1.1;
  color: var(--color-text);
  margin-bottom: 1.25rem;
}

.hero-title-accent {
  color: var(--color-industry);
}

.hero-lead {
  font-size: clamp(1rem, 1.5vw + 0.5rem, 1.25rem);
  color: var(--color-text-secondary);
  line-height: 1.6;
  margin-bottom: 2rem;
}

.hero-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: center;
}

.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.875rem 1.75rem;
  font-size: var(--text-body);
  font-weight: var(--font-weight-medium);
  border-radius: 980px;
  transition: background var(--duration-fast) var(--ease-out),
              color var(--duration-fast) var(--ease-out),
              transform var(--duration-fast) var(--ease-out);
}

.btn-primary {
  background: var(--color-industry);
  color: #fff;
  border: none;
}

.btn-primary:hover {
  background: #086890;
  color: #fff;
  transform: scale(1.02);
}

.btn-ghost {
  background: transparent;
  color: var(--color-text);
  border: 1px solid var(--color-border);
}

.btn-ghost:hover {
  background: var(--color-bg-alt);
  border-color: var(--color-text-muted);
}

.hero-scroll {
  position: absolute;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
}

.hero-scroll-line {
  width: 1px;
  height: 40px;
  background: linear-gradient(to bottom, var(--color-text-muted), transparent);
  border-radius: 1px;
  animation: scrollHint 2s ease-in-out infinite;
}

@keyframes scrollHint {
  0%, 100% { opacity: 0.3; transform: scaleY(0.8); }
  50% { opacity: 1; transform: scaleY(1); }
}
</style>

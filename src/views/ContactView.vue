<template>
  <div class="page-view">
    <section class="page-hero">
      <div class="page-hero-bg" style="background-image: url(https://images.unsplash.com/photo-1497366216548-37526070297c?w=1920&q=80)"></div>
      <div class="page-hero-overlay"></div>
      <div class="container page-hero-inner">
        <h1 class="page-hero-title">联系我们</h1>
        <p class="page-hero-lead">携手共创绿色未来，欢迎咨询与合作</p>
      </div>
    </section>
    <section class="page-body">
      <div class="container container--wide">
        <div class="contact-layout">
          <div class="contact-info-block">
            <h2 class="section-title">联系信息</h2>
            <p class="section-lead">无论您有项目咨询、技术合作还是采购需求，欢迎通过以下方式与我们取得联系。</p>
            <div class="contact-info-list">
              <div class="contact-info-item">
                <span class="contact-label">地址</span>
                <span>（请填写公司实际地址）</span>
              </div>
              <div class="contact-info-item">
                <span class="contact-label">电话</span>
                <a href="tel:400-000-0000">400-000-0000</a>
              </div>
              <div class="contact-info-item">
                <span class="contact-label">邮箱</span>
                <a href="mailto:contact@example.com">contact@example.com</a>
              </div>
            </div>
          </div>
          <div class="contact-cta-block">
            <div class="contact-cta-inner">
              <p class="contact-cta-title">获取方案与报价</p>
              <p class="contact-cta-hint">提交需求后，我们将尽快与您联系</p>
              <a href="mailto:contact@example.com?subject=合作咨询" class="btn btn-primary btn-block">发送邮件咨询</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
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

.contact-layout {
  display: grid;
  gap: 2rem;
  grid-template-columns: 1fr 1fr;
  align-items: start;
}

@media (max-width: 768px) {
  .contact-layout { grid-template-columns: 1fr; }
}

.contact-info-block { max-width: 36em; }

.contact-info-list {
  margin-top: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.contact-info-item {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  font-size: var(--text-body);
  color: var(--color-text-secondary);
}

.contact-info-item a {
  color: var(--color-text);
  font-weight: var(--font-weight-medium);
}

.contact-label {
  font-size: var(--text-small);
  color: var(--color-text-muted);
}

.contact-cta-block {
  background: var(--color-bg-alt);
  color: var(--color-text);
  border-radius: 20px;
  padding: 2.5rem;
  border: 1px solid var(--color-border);
}

.contact-cta-inner { max-width: 20em; }

.contact-cta-title {
  font-size: var(--text-h2);
  font-weight: var(--font-weight-semibold);
  margin-bottom: 0.5rem;
}

.contact-cta-hint {
  font-size: var(--text-small);
  color: rgba(255, 255, 255, 0.7);
  margin-bottom: 1.5rem;
}

.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.875rem 1.75rem;
  font-size: var(--text-body);
  font-weight: var(--font-weight-medium);
  border-radius: 980px;
  transition: background var(--duration-fast) var(--ease-out), color var(--duration-fast) var(--ease-out);
}

.btn-primary {
  background: var(--color-industry);
  color: #fff;
  border: none;
}

.contact-cta-block .btn-primary {
  background: var(--color-primary);
  color: #fff;
}

.contact-cta-block .btn-primary:hover {
  background: var(--color-primary-hover);
  color: #fff;
}

.btn-block { width: 100%; }
</style>

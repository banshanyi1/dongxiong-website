<template>
  <section id="contact" class="contact">
    <div class="container">
      <div class="contact-wrapper">
        <div class="contact-content">
          <p class="contact-eyebrow">联系我们</p>
          <h2 class="section-title">携手共创绿色未来</h2>
          <p class="section-lead">
            无论您有项目咨询、技术合作还是采购需求，欢迎通过以下方式与我们取得联系。
          </p>
          <div class="contact-info">
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
        <div class="contact-cta">
          <div class="contact-cta-inner">
            <p class="contact-cta-text">获取方案与报价</p>
            <p class="contact-cta-hint">提交需求后，我们将尽快与您联系</p>
            <a href="mailto:contact@example.com?subject=合作咨询" class="btn btn-primary btn-block">发送邮件咨询</a>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
</script>

<style scoped>
.contact {
  padding: var(--space-section) 0;
  background: var(--color-bg-alt);
}

.contact-wrapper {
  display: grid;
  gap: var(--space-block);
}

@media (min-width: 768px) {
  .contact-wrapper {
    grid-template-columns: 1fr 1fr;
    align-items: start;
    gap: 3rem;
  }
}

.contact-eyebrow {
  font-size: var(--text-small);
  font-weight: var(--font-weight-medium);
  color: var(--color-industry);
  text-transform: uppercase;
  letter-spacing: 0.1em;
  margin-bottom: 0.75rem;
}

.contact-info {
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

.contact-cta {
  background: var(--color-bg-dark);
  color: #fff;
  border-radius: 20px;
  padding: 2.5rem;
}

.contact-cta-inner {
  max-width: 20em;
}

.contact-cta .section-title {
  color: #fff;
}

.contact-cta-text {
  font-size: var(--text-h2);
  font-weight: var(--font-weight-semibold);
  margin-bottom: 0.5rem;
}

.contact-cta-hint {
  font-size: var(--text-small);
  color: rgba(255, 255, 255, 0.7);
  margin-bottom: 1.5rem;
}

.contact-cta .btn-primary {
  background: #fff;
  color: var(--color-bg-dark);
}

.contact-cta .btn-primary:hover {
  background: var(--color-bg-alt);
  color: var(--color-text);
}

.btn-block {
  width: 100%;
  justify-content: center;
}
</style>

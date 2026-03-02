<template>
  <section class="section contact-section" ref="contactSection">
    <div class="container-full">
      <div class="section-header text-left">
        <span class="section-eyebrow">{{ t('home.contact.eyebrow') }}</span>
        <h2 class="section-title">{{ t('home.contact.title') }}</h2>
        <p class="section-description">
          {{ t('home.contact.desc') }}
        </p>
      </div>
      <div class="contact-content">
        <div class="contact-info">
          <div class="contact-item">
            <div class="contact-icon">📍</div>
            <div>
              <h4>{{ t('home.contact.address') }}</h4>
              <p>{{ t('home.contact.addressValue') }}</p>
            </div>
          </div>
          <div class="contact-item">
            <div class="contact-icon">📞</div>
            <div>
              <h4>{{ t('home.contact.phone') }}</h4>
              <p>18269751880</p>
            </div>
          </div>
          <div class="contact-item">
            <div class="contact-icon">✉️</div>
            <div>
              <h4>{{ t('home.contact.email') }}</h4>
              <p>754815750@qq.com</p>
            </div>
          </div>
        </div>
        <RouterLink to="/contact" class="contact-cta" aria-label="Contact us">{{
          t('home.contact.cta')
        }}</RouterLink>
      </div>
    </div>
  </section>
</template>

<script setup>
import { useI18n } from '@/composables/useI18n'

const { t } = useI18n()
</script>

<style scoped>
/* 通用区块样式 */
.section {
  min-height: 90vh;
  display: flex;
  align-items: center;
  padding: 4rem 0;
}

.contact-section {
  background: rgb(245, 245, 247); /* Apple 灰 #f5f5f7 */
}

.section-header {
  margin-bottom: 3rem;
}

.text-left {
  text-align: left;
}

.section-eyebrow {
  display: inline-block;
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--color-industry);
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-bottom: 1rem;
}

.section-title {
  font-size: clamp(2rem, 4vw, 3rem);
  font-weight: 700;
  line-height: 1.2;
  margin-bottom: 1.5rem;
  color: var(--color-text);
}

.section-description {
  font-size: 1.125rem;
  line-height: 1.7;
  color: var(--color-text-secondary);
  margin-bottom: 2rem;
  max-width: 600px;
}

/* 联系我们区域 */
.contact-section {
  background: white;
}

.contact-content {
  display: grid;
  grid-template-columns: 1.2fr 0.8fr;
  gap: 3rem;
  align-items: start;
}

.contact-info {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.25rem;
}

.contact-item {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
}

.contact-icon {
  font-size: 1.5rem;
}

.contact-item h4 {
  font-size: 1rem;
  font-weight: 600;
  margin-bottom: 0.25rem;
  color: var(--color-text);
}

.contact-item p {
  font-size: 1rem;
  color: var(--color-text-secondary);
}

/* 右侧 CTA（苹果风：胶囊形 + 阴影 + 轻浮动） */
.contact-cta {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 14px 28px;
  border-radius: 9999px;
  background: linear-gradient(180deg, #0077ed 0%, #0071e3 100%);
  color: #fff;
  font-weight: 600;
  font-size: 1.05rem;
  text-decoration: none;
  box-shadow: 0 10px 30px rgba(0, 113, 227, 0.35);
  border: none;
  transition: transform 0.2s ease, box-shadow 0.2s ease, background 0.2s ease;
}
.contact-cta::after {
  content: '→';
  font-size: 1.15rem;
  line-height: 1;
  transform: translateX(0);
  transition: transform 0.2s ease;
}
.contact-cta:hover {
  transform: translateY(-2px);
  box-shadow: 0 16px 40px rgba(0, 113, 227, 0.45);
}
.contact-cta:hover::after {
  transform: translateX(4px);
}

.container-full {
  width: 100%;
  max-width: 100%;
  margin-left: auto;
  margin-right: auto;
  padding-left: 105.25px;
  padding-right: 105.25px;
}

@media (max-width: 768px) {
  .container-full {
    padding-left: 20px;
    padding-right: 20px;
  }
  .contact-content {
    grid-template-columns: 1fr;
  }
}
</style>

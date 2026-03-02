<template>
  <section class="section cases-section" ref="casesSection">
    <div class="container-full">
      <div class="section-content reverse">
        <div class="section-image">
          <img :src="casesImage" alt="工程案例" />
        </div>
        <div class="section-text">
          <span class="section-eyebrow">{{ t('home.cases.eyebrow') }}</span>
          <h2 class="section-title">{{ t('home.cases.title') }}</h2>
          <p class="section-description">
            {{ t('home.cases.desc') }}
          </p>
          <div class="stats">
            <div class="stat-item">
              <span class="stat-number">500+</span>
              <span class="stat-label">{{ t('home.cases.projects') }}</span>
            </div>
            <div class="stat-item">
              <span class="stat-number">20+</span>
              <span class="stat-label">{{ t('home.cases.industries') }}</span>
            </div>
            <div class="stat-item">
              <span class="stat-number">15</span>
              <span class="stat-label">{{ t('home.cases.experience') }}</span>
            </div>
          </div>
          <RouterLink to="/cases" class="btn btn-primary">{{
            t('home.cases.viewCases')
          }}</RouterLink>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { useI18n } from '@/composables/useI18n'

const { t } = useI18n()

// 图片资源
const casesImage = 'https://images.unsplash.com/photo-1567767292278-a4f21aa2d36e?w=600&q=80'
</script>

<style scoped>
/* 通用区块样式 */
.section {
  min-height: 90vh;
  display: flex;
  align-items: center;
  padding: 4rem 0;
}

.section-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;
}

.section-content.reverse {
  direction: rtl;
}

.section-content.reverse > * {
  direction: ltr;
}

.section-text {
  animation: fadeInLeft 1s ease-out;
}

.section-image {
  animation: fadeInRight 1s ease-out;
}

.section-image img {
  width: 100%;
  height: auto;
  border-radius: 12px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
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

.cases-section .section-text,
.cases-section .section-header,
.cases-section .section-description {
  text-align: left;
}

.cases-section .stats {
  justify-content: flex-start;
  display: flex;
  gap: 2rem;
  margin-bottom: 2rem;
}

.stat-item {
  text-align: center;
}

.stat-number {
  display: block;
  font-size: 2rem;
  font-weight: 700;
  color: var(--color-industry);
  line-height: 1;
  margin-bottom: 0.5rem;
}

.stat-label {
  font-size: 0.875rem;
  color: var(--color-text-secondary);
  text-transform: uppercase;
  letter-spacing: 1px;
}

.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.875rem 2rem;
  border-radius: 8px;
  font-weight: 500;
  text-decoration: none;
  transition: all 0.3s ease;
  border: 2px solid transparent;
}

.btn-primary {
  background: var(--color-industry);
  color: white;
}

.btn-primary:hover {
  background: #086a8c;
  transform: translateY(-2px);
  box-shadow: 0 10px 25px rgba(10, 126, 164, 0.3);
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
  .section-content {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
  
  .section-content.reverse {
    direction: ltr;
  }
  
  .container-full {
    padding-left: 20px;
    padding-right: 20px;
  }
}

@keyframes fadeInLeft {
  from {
    opacity: 0;
    transform: translateX(-20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes fadeInRight {
  from {
    opacity: 0;
    transform: translateX(20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}
</style>

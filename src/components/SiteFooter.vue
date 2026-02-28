<template>
  <footer class="site-footer">
    <div class="container">
      <div class="footer-top">
        <RouterLink to="/" class="footer-logo">{{ t('common.logo') }}</RouterLink>
        <nav class="footer-nav">
          <RouterLink to="/about">{{ t('nav.about') }}</RouterLink>
          <RouterLink to="/services">{{ t('nav.services') }}</RouterLink>
          <RouterLink to="/solutions">{{ t('nav.solutions') }}</RouterLink>
          <RouterLink to="/cases">{{ t('nav.cases') }}</RouterLink>
          <RouterLink to="/contact">{{ t('nav.contact') }}</RouterLink>
        </nav>
      </div>
      <div class="footer-bottom">
        <p class="footer-copy">
          {{ t('footer.copy', { year: new Date().getFullYear() }) }}
        </p>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { useI18n } from '../composables/useI18n'

const { t } = useI18n()
</script>

<style scoped>
.site-footer {
  padding: var(--space-block) 0;
  background: #1d1d1f;
  color: white;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.footer-top {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  margin-bottom: 1.5rem;
}

@media (min-width: 640px) {
  .footer-top {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
}

.footer-logo {
  font-weight: var(--font-weight-semibold);
  font-size: 1.25rem; /* 从1rem增大到1.25rem */
  color: white;
}

.footer-logo:hover {
  color: white;
  opacity: 0.8;
}

.footer-nav {
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
}

.footer-nav a {
  color: rgba(255, 255, 255, 0.8);
  font-size: var(--text-small);
  transition: color 0.2s ease;
}

.footer-nav a:hover {
  color: white;
}

.footer-bottom {
  font-size: var(--text-small);
  color: rgba(255, 255, 255, 0.6);
}

.footer-copy {
  margin: 0;
  color: rgba(255, 255, 255, 0.6);
}
</style>

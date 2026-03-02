<template>
  <section class="section navigation-section">
    <div class="bottom-nav">
      <router-link to="/cases" class="btn btn-primary">
        <span class="icon">⊞</span>
        {{ t('caseDetail.backCases') }}
      </router-link>
    </div>
  </section>
</template>

<script setup>
import { useI18n } from '@/composables/useI18n'

const { t } = useI18n()
</script>

<style scoped>
/* 区块样式 */
.section {
  min-height: 80vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 2vh 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.02);
}

.navigation-section {
  min-height: 40vh;
  border-bottom: none;
}

.bottom-nav {
  display: flex;
  justify-content: center;
}

.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.8rem 2rem;
  border-radius: 30px;
  text-decoration: none;
  font-weight: 500;
  transition: all 0.3s;
  cursor: pointer;
}

.btn-primary {
  background: #0071e3;
  color: white;
}

.btn-primary:hover {
  background: #0077ed;
  transform: scale(1.05);
}

.icon {
  margin-right: 0.5rem;
  font-size: 1.2rem;
}
</style>

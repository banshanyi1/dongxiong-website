<template>
  <section class="section testimonial-section">
    <div class="testimonial">
      <p class="testimonial-quote">{{ t('caseDetail.testimonial') }}</p>
      <p class="testimonial-author">—— {{ customer }}</p>
    </div>
  </section>
</template>

<script setup>
import { useI18n } from '@/composables/useI18n'

const props = defineProps({
  customer: {
    type: String,
    default: '',
  },
})

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

/* 客户评价区 */
.testimonial {
  text-align: center;
  max-width: 800px;
  margin: 0 auto;
}

.testimonial-quote {
  font-size: 2rem;
  font-weight: 600;
  line-height: 1.4;
  margin-bottom: 2rem;
  background: linear-gradient(135deg, #ffffff 0%, #a0aec0 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.testimonial-author {
  font-size: 1.2rem;
  color: #86868b;
}
</style>

<template>
  <section class="block-section" :class="[layout, { 'text-dark': dark }]">
    <div class="block-media" :style="mediaStyle">
      <div v-if="overlay" class="block-overlay"></div>
    </div>
    <div class="block-content">
      <div class="block-content-inner">
        <p v-if="eyebrow" class="block-eyebrow">{{ eyebrow }}</p>
        <h2 class="block-title">{{ title }}</h2>
        <p v-if="lead" class="block-lead">{{ lead }}</p>
        <RouterLink v-if="link" :to="link" class="btn btn-primary">{{ linkText }}</RouterLink>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  /** 背景图 URL 或 CSS 渐变 */
  image: { type: String, default: '' },
  /** 是否加暗色遮罩（文字浅色时用） */
  overlay: { type: Boolean, default: true },
  /** 小标题 */
  eyebrow: { type: String, default: '' },
  /** 主标题 */
  title: { type: String, required: true },
  /** 副标题/描述 */
  lead: { type: String, default: '' },
  /** 按钮链接 */
  link: { type: String, default: '' },
  /** 按钮文字 */
  linkText: { type: String, default: '了解更多' },
  /** 'media-left' | 'media-right' */
  layout: { type: String, default: 'media-left' },
  /** 文字是否为深色（用于浅色图时不加 overlay） */
  dark: { type: Boolean, default: false },
})

const mediaStyle = computed(() => {
  if (props.image.startsWith('linear-gradient') || props.image.startsWith('url'))
    return { background: props.image }
  if (props.image) return { backgroundImage: `url(${props.image})` }
  return { background: 'var(--color-bg-alt)' }
})
</script>

<style scoped>
.block-section {
  display: grid;
  grid-template-columns: 1.35fr 1fr;
  grid-template-rows: 1fr;
  height: 100vh;
  min-height: 100vh;
  max-height: 100vh;
  width: 100%;
  overflow: hidden;
  scroll-snap-align: center;
  scroll-snap-stop: always;
}

@media (max-width: 768px) {
  .block-section {
    grid-template-columns: 1fr;
    grid-template-rows: 1.1fr 0.9fr;
    min-height: 100vh;
    max-height: 100vh;
    height: 100vh;
  }

  .block-section.media-right .block-media { order: 1; }
  .block-section.media-right .block-content { order: 2; }
}

.block-section.media-right .block-media {
  order: 2;
}

.block-section.media-right .block-content {
  order: 1;
}

.block-media {
  position: relative;
  min-height: 0;
  background-size: cover;
  background-position: center;
  background-color: #0a7ea4;
  background-repeat: no-repeat;
}

.block-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0.15) 100%);
}

.block-content {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: clamp(1.5rem, 4vw, 2.5rem);
  min-height: 0;
  background: var(--color-bg);
}

.block-content-inner {
  max-width: 420px;
}

.block-section.text-dark .block-content {
  background: var(--color-bg-dark);
  color: #fff;
}

.block-section.text-dark .block-title,
.block-section.text-dark .block-lead {
  color: #fff;
}

.block-section.text-dark .block-eyebrow {
  color: rgba(255,255,255,0.8);
}

.block-section.text-dark .block-lead {
  color: rgba(255,255,255,0.85);
}

.block-eyebrow {
  font-size: 0.75rem;
  font-weight: var(--font-weight-medium);
  color: var(--color-industry);
  text-transform: uppercase;
  letter-spacing: 0.12em;
  margin-bottom: 0.5rem;
}

.block-title {
  font-size: clamp(1.5rem, 3.5vw + 0.5rem, 2.25rem);
  font-weight: var(--font-weight-semibold);
  letter-spacing: -0.02em;
  line-height: 1.2;
  color: var(--color-text);
  margin-bottom: 0.75rem;
}

.block-lead {
  font-size: 0.9375rem;
  color: var(--color-text-secondary);
  line-height: 1.5;
  margin-bottom: 1.25rem;
  max-width: 28em;
}

.block-section.text-dark .btn-primary {
  background: #fff;
  color: var(--color-bg-dark);
}

.block-section.text-dark .btn-primary:hover {
  background: var(--color-bg-alt);
  color: var(--color-text);
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
</style>

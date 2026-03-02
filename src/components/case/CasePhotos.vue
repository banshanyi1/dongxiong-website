  position: relative;
  width: 100%;
  max-width: 1400px;
  transition: transform 0.3s ease;


<template>
  <section class="section photos-section full-bleed">
    <h2 class="section-title">{{ t('caseDetail.photosTitle') }}</h2>
    <div class="carousel-container">
      <div class="track-viewport">
        <div class="track" :style="{ transform: `translateX(${-offset}px)` }">
          <div
            v-for="(photo, idx) in photos"
            :key="idx"
            class="item"
            :class="photo.orientation === 'portrait' ? 'portrait' : 'landscape'"
          >
            <img
              class="item-img"
              :src="photo.image"
              :alt="photo.caption || ''"
              loading="lazy"
              decoding="async"
            />
            <div class="overlay">
              <div class="overlay-inner">
                <h3 class="caption">{{ photo.caption }}</h3>
                <p v-if="photo.description" class="desc">{{ photo.description }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="nav-bar">
        <button class="nav-btn prev" @click="scroll('prev')">‹</button>
        <button class="nav-btn next" @click="scroll('next')">›</button>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useI18n } from '@/composables/useI18n'

const props = defineProps({
  photos: {
    type: Array,
    required: true,
    default: () => [],
  },
})

const { t } = useI18n()

const gap = 24
const landscapeWidth = 880
const landscapeHeight = 500
const portraitWidth = 600
const portraitHeight = 500

const widths = computed(() =>
  props.photos.map(p => (p.orientation === 'portrait' ? portraitWidth : landscapeWidth) + gap)
)
const maxOffset = computed(() => Math.max(0, widths.value.reduce((a, b) => a + b, 0) - viewportWidth.value))
const viewportWidth = ref(0)
const offset = ref(0)

const setViewportWidth = () => {
  viewportWidth.value = window.innerWidth
}
setViewportWidth()
window.addEventListener('resize', setViewportWidth, { passive: true })

const scroll = dir => {
  const step = viewportWidth.value * 0.8
  if (dir === 'next') {
    offset.value = Math.min(offset.value + step, maxOffset.value)
  } else {
    offset.value = Math.max(offset.value - step, 0)
  }
}
</script>

<style scoped>
.section {
  min-height: 80vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 2vh 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.02);
}

.photos-section {
  padding: 3rem 0;
}

.full-bleed {
  width: 100vw;
  position: relative;
  left: 50%;
  right: 50%;
  margin-left: -50vw;
  margin-right: -50vw;
}

.section-title {
  font-size: 2.2rem;
  color: #fff;
  font-weight: 800;
  text-align: center;
  margin-bottom: 2rem;
}

.carousel-container {
  position: relative;
  width: 100%;
  max-width: none;
  margin: 0 auto;
  display: block;
}

.track-viewport {
  overflow: hidden;
  width: 100%;
}

.track {
  display: flex;
  align-items: stretch;
  gap: 24px;
  transition: transform 600ms cubic-bezier(0.25, 1, 0.5, 1);
  will-change: transform;
  padding: 0 0;
}

.item {
  position: relative;
  flex: 0 0 auto;
  height: 500px;
  border-radius: 12px;
  overflow: hidden;
  background: #0b1a2b;
}
.item.landscape {
  width: 880px;
}
.item.portrait {
  width: 600px;
}

.item-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  transform: scale(1);
  transition: transform 0.5s ease;
}
.item:hover .item-img {
  transform: scale(1.08);
}

.overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, rgba(0, 0, 0, 0.7) 0%, rgba(0, 0, 0, 0.25) 60%, rgba(0, 0, 0, 0) 100%);
  opacity: 0;
  transition: opacity 0.3s ease;
  pointer-events: none;
}
.item:hover .overlay {
  opacity: 1;
}

.overlay-inner {
  position: absolute;
  top: 16px;
  left: 16px;
  right: 16px;
  color: #fff;
}
.caption {
  font-size: 1.4rem;
  font-weight: 700;
  margin-bottom: 6px;
  letter-spacing: 0.2px;
}
.desc {
  font-size: 1rem;
  opacity: 0.95;
  line-height: 1.45;
}

.nav-btn {
  width: 52px;
  height: 52px;
  border-radius: 50%;
  border: none;
  background: rgba(0, 0, 0, 0.25);
  color: #fff;
  font-size: 28px;
  line-height: 1;
  cursor: pointer;
  transition: background 0.2s ease, transform 0.2s ease;
}

.nav-bar {
  display: flex;
  justify-content: center;
  gap: 16px;
  margin-top: 16px;
}
.nav-btn:hover {
  background: rgba(0, 0, 0, 0.45);
  transform: scale(1.06);
}

@media (max-width: 1024px) {
  .item {
    height: 420px;
  }
  .item.landscape {
    width: 720px;
  }
  .item.portrait {
    width: 520px;
  }
}

@media (max-width: 768px) {
  .track {
    padding: 0 8px;
  }
  .item {
    height: 60vw;
  }
  .item.landscape {
    width: 85vw;
  }
  .item.portrait {
    width: 65vw;
  }
  .overlay-inner {
    top: 10px;
    left: 10px;
    right: 10px;
  }
  .caption {
    font-size: 1.1rem;
  }
  .desc {
    font-size: 0.9rem;
  }
}
</style>

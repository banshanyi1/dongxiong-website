<template>
  <div class="home-view">
    <!-- 第一屏：全屏轮播图 -->
    <HomeHero />

    <!-- 分割线 -->
    <div class="section-divider"></div>

    <!-- 第二屏：关于我们（视频背景） -->
    <HomeAbout />

    <!-- 第三屏：业务范围 -->
    <HomeServices />

    <!-- 第四屏：工程案例 -->
    <HomeCases />

    <!-- 第五屏：联系我们 -->
    <HomeContact />
  </div>
</template>

<script setup>
import HomeHero from '@/components/home/HomeHero.vue'
import HomeAbout from '@/components/home/HomeAbout.vue'
import HomeServices from '@/components/home/HomeServices.vue'
import HomeCases from '@/components/home/HomeCases.vue'
import HomeContact from '@/components/home/HomeContact.vue'
</script>

<style scoped>
.home-view {
  padding: 0;
  margin: 0;
  overflow-x: hidden;
}

/* 分割线样式 */
.section-divider {
  height: 16px;
  background: white;
  width: 100%;
  position: relative;
  z-index: 1;
}
</style>

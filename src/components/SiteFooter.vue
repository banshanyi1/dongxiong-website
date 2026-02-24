<template>
  <footer class="site-footer">
    <div class="container">
      <div class="footer-top">
        <RouterLink to="/" class="footer-logo">东雄环保</RouterLink>
        <nav class="footer-nav">
          <RouterLink to="/about">关于我们</RouterLink>
          <RouterLink to="/services">业务范围</RouterLink>
          <RouterLink to="/solutions">解决方案</RouterLink>
          <RouterLink to="/cases">工程案例</RouterLink>
          <RouterLink to="/contact">联系我们</RouterLink>
        </nav>
      </div>
      <div class="footer-bottom">
        <p class="footer-copy">
          © {{ new Date().getFullYear() }} 东雄环保 版权所有 · 大气环保与有色金属冶炼
        </p>
      </div>
    </div>
  </footer>
</template>

<script setup>
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
  font-size: 1rem;
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

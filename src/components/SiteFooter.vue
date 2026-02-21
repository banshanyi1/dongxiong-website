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
  background: var(--color-bg-dark);
  color: rgba(255, 255, 255, 0.8);
}

.footer-top {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid var(--color-border-dark);
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
  color: #fff;
}

.footer-logo:hover {
  color: #fff;
}

.footer-nav {
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
}

.footer-nav a {
  color: rgba(255, 255, 255, 0.8);
  font-size: var(--text-small);
}

.footer-nav a:hover {
  color: #fff;
}

.footer-bottom {
  font-size: var(--text-small);
  color: var(--color-text-muted);
}

.footer-copy {
  margin: 0;
  color: rgba(255, 255, 255, 0.6);
}
</style>

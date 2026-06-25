<template>
  <div class="app-shell">
    <AppHeader />
    <main class="page">
      <section class="panel">
        <img class="error-mascot" src="/mascot_404.png" alt="" />
        <h1>페이지를 찾을 수 없습니다</h1>
        <button class="primary" type="button" @click="$router.push('/')">홈으로 이동</button>
      </section>
    </main>
    <AppFooter />
  </div>
</template>

<script>
import AppFooter from '../components/AppFooter.vue'
import AppHeader from '../components/AppHeader.vue'

export default {
  name: 'NotFoundPage',
  components: { AppFooter, AppHeader },
}
</script>

<style scoped>
.panel {
  text-align: center;
}
.error-mascot {
  width: min(280px, 70vw);
  display: block;
  margin: 0 auto 18px;
}
</style>

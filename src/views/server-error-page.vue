<template>
  <div class="app-shell">
    <AppHeader />
    <main class="page">
      <section class="panel">
        <img class="error-mascot" src="/mascot_500.png" alt="" />
        <h1>서버 오류가 발생했습니다</h1>
        <p>잠시 후 다시 시도해주세요.</p>
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
  name: 'ServerErrorPage',
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

<template>
  <div class="app-shell">
    <AppHeader />
    <main class="page">
      <section class="panel">
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

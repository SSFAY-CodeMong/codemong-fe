<template>
  <div class="app-shell">
    <AppHeader active-page="mission" />
    <main class="page">
      <section class="panel">
        <h1>다음 스텝 준비</h1>
        <p>{{ message }}</p>
        <div class="toolbar">
          <button class="primary" type="button" @click="next" :disabled="loading">{{ loading ? '준비 중' : '다음 스텝 생성' }}</button>
          <button class="secondary" type="button" @click="$router.push('/mission-workspace')">미션으로 이동</button>
        </div>
      </section>
    </main>
    <AppFooter />
  </div>
</template>

<script>
import AppFooter from '../components/AppFooter.vue'
import AppHeader from '../components/AppHeader.vue'
import { getSavedRepository, moveNextStep } from '../api/codemong'

export default {
  name: 'NextStepLoadingPage',
  components: { AppFooter, AppHeader },
  data() {
    return {
      repository: getSavedRepository(),
      loading: false,
      message: '통과한 브랜치를 기준으로 다음 스텝 브랜치를 생성합니다.',
    }
  },
  methods: {
    async next() {
      this.loading = true
      try {
        await moveNextStep(this.repository.repositoryId)
        this.$router.push('/mission-workspace')
      } catch (error) {
        this.message = error.message
      } finally {
        this.loading = false
      }
    },
  },
}
</script>

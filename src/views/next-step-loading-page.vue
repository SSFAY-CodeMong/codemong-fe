<template>
  <div class="app-shell">
    <AppHeader active-page="mission" />
    <main class="page loading-page">
      <section class="loading-panel next-step-panel">
        <div class="loader-orbit next-step-loader" :class="{ failed: error }">
          <span></span>
          <span></span>
          <span></span>
        </div>
        <div>
          <span class="badge">{{ loading ? 'CREATING' : error ? 'FAILED' : 'READY' }}</span>
          <h1>다음 스텝 준비</h1>
          <p>{{ message }}</p>
        </div>
        <ol class="inspection-steps">
          <li :class="{ active: loading, done: started }">현재 통과 브랜치 확인</li>
          <li :class="{ active: loading, done: created }">다음 스텝 브랜치 생성</li>
          <li :class="{ active: created, done: created }">미션 화면 이동 준비</li>
        </ol>
        <div class="toolbar">
          <button v-if="error" class="primary" type="button" @click="next">다시 생성</button>
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
      started: false,
      created: false,
      error: false,
      message: '통과한 브랜치를 기준으로 다음 스텝 브랜치를 생성합니다.',
    }
  },
  created() {
    this.next()
  },
  methods: {
    async next() {
      if (!this.repository) {
        this.error = true
        this.message = '선택된 저장소가 없습니다. 미션 화면에서 저장소를 다시 선택하세요.'
        return
      }
      this.loading = true
      this.started = true
      this.created = false
      this.error = false
      this.message = '다음 스텝 브랜치를 생성하는 중입니다. 잠시만 기다려주세요.'
      try {
        await moveNextStep(this.repository.repositoryId)
        this.created = true
        this.message = '다음 스텝 브랜치가 생성되었습니다. 미션 화면으로 이동합니다.'
        window.setTimeout(() => this.$router.push('/mission-workspace'), 700)
      } catch (error) {
        this.error = true
        this.message = error.message
      } finally {
        this.loading = false
      }
    },
  },
}
</script>

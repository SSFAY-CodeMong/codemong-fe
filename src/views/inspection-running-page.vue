<template>
  <div class="app-shell">
    <AppHeader active-page="mission" />
    <main class="page inspection-page">
      <section class="inspection-panel">
        <div class="scan-visual" :class="{ done: passed, failed }">
          <div class="scan-ring"></div>
          <div class="scan-core">{{ status }}</div>
        </div>
        <div>
          <span class="badge">checkId {{ shortCheckId }}</span>
          <h1>{{ title }}</h1>
          <p>{{ description }}</p>
        </div>
        <ol class="inspection-steps">
          <li :class="{ active: true, done: status !== 'RUNNING' }">검사 요청 등록</li>
          <li :class="{ active: status === 'RUNNING', done: passed || failed }">GitHub Actions 실행 대기</li>
          <li :class="{ active: passed || failed, done: passed }">테스트 결과 수집</li>
        </ol>
        <p v-if="message" class="status fail">{{ message }}</p>
        <div class="toolbar">
          <button class="secondary" type="button" @click="poll">새로고침</button>
          <button v-if="passed" class="primary" type="button" @click="$router.push('/mission-passed')">통과 결과 보기</button>
          <button v-if="failed" class="danger" type="button" @click="$router.push('/mission-failed')">실패 결과 보기</button>
        </div>
      </section>
    </main>
    <AppFooter />
  </div>
</template>

<script>
import AppFooter from '../components/AppFooter.vue'
import AppHeader from '../components/AppHeader.vue'
import { getCodeCheckStatus, getSavedCheckId, saveCheckResult } from '../api/codemong'

export default {
  name: 'InspectionRunningPage',
  components: { AppFooter, AppHeader },
  data() {
    return {
      checkId: getSavedCheckId(),
      status: 'RUNNING',
      failedTests: [],
      message: '',
      timer: null,
    }
  },
  computed: {
    shortCheckId() {
      return this.checkId ? this.checkId.slice(0, 8) : '-'
    },
    passed() {
      return this.status === 'PASSED'
    },
    failed() {
      return this.status === 'FAILED' || this.status === 'ERROR'
    },
    title() {
      if (this.passed) return '검사를 통과했습니다'
      if (this.failed) return '검사에서 확인할 문제가 있습니다'
      return 'GitHub Actions가 코드를 검사 중입니다'
    },
    description() {
      if (this.passed) return '요구사항을 만족했습니다. 결과 화면에서 다음 스텝으로 이동할 수 있습니다.'
      if (this.failed) return '실패 원인과 테스트 메시지를 확인하고 코드 수정 방향을 정리하세요.'
      return '원격 브랜치의 최신 커밋을 기준으로 hidden test를 실행하고 있습니다.'
    },
  },
  created() {
    if (!this.checkId) {
      this.$router.replace('/mission-workspace')
      return
    }
    this.poll()
    this.timer = window.setInterval(this.poll, 3000)
  },
  beforeDestroy() {
    window.clearInterval(this.timer)
  },
  methods: {
    async poll() {
      try {
        const result = await getCodeCheckStatus(this.checkId)
        this.status = result.status
        this.failedTests = result.failedTests || []
        this.message = result.message || ''
        saveCheckResult(result)
        if (this.passed || this.failed) window.clearInterval(this.timer)
      } catch (error) {
        this.status = 'ERROR'
        this.message = error.message
        saveCheckResult({ checkId: this.checkId, status: 'ERROR', message: error.message, failedTests: [] })
        window.clearInterval(this.timer)
      }
    },
  },
}
</script>

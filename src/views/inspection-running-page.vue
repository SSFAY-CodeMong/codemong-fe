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
          <span class="badge">{{ requestLabel }}</span>
          <h1>{{ title }}</h1>
          <p>{{ description }}</p>
        </div>
        <ol class="inspection-steps">
          <li :class="{ active: true, done: status !== 'RUNNING' }">검사 요청 등록</li>
          <li :class="{ active: status === 'RUNNING', done: passed || failed }">테스트 및 코드 리뷰 실행</li>
          <li :class="{ active: passed || failed, done: passed || failed }">전체 피드백 생성</li>
        </ol>
        <p v-if="message" class="status fail">{{ message }}</p>
        <div class="toolbar">
          <button class="secondary" type="button" :disabled="status === 'RUNNING'" @click="runReview">다시 검사</button>
          <button v-if="passed" class="primary" type="button" @click="$router.push(successRoute)">
            {{ isLastStep ? '프로젝트 완료 보기' : '통과 결과 보기' }}
          </button>
          <button v-if="failed" class="danger" type="button" @click="$router.push('/mission-failed')">실패 결과 보기</button>
        </div>
      </section>

      <section v-if="showFeedback" class="inspection-feedback">
        <div class="inspection-feedback__head">
          <div>
            <span class="badge">{{ passed ? 'PASS' : 'CHECK REQUIRED' }}</span>
            <h2>검사 피드백</h2>
            <p>{{ passed ? '통과했지만 전체 리뷰를 확인할 수 있습니다.' : '실패 원인과 전체 리뷰를 함께 확인하세요.' }}</p>
          </div>
          <button class="secondary small" type="button" @click="$router.push(failed ? '/mission-failed' : '/mission-passed')">
            결과 페이지 열기
          </button>
        </div>

        <div class="inspection-feedback__grid">
          <article class="inspection-card inspection-card--tests" :class="{ empty: !failedTestItems.length }">
            <h3>{{ failed ? '실패한 테스트' : '테스트 결과' }}</h3>
            <ul class="failed-test-list compact" v-if="failedTestItems.length">
              <li v-for="test in failedTestItems" :key="test.name" class="failed-test-item">
                <strong class="method-name">{{ test.methodName }}</strong>
                <span class="muted">{{ test.name }}</span>
                <p>{{ test.description }}</p>
              </li>
            </ul>
            <p v-else>{{ passed ? 'Hidden test가 성공적으로 종료되었습니다.' : '실패 테스트 상세 정보가 없습니다.' }}</p>
          </article>

          <article class="inspection-card inspection-card--review">
            <h3>제출 코드 전체 피드백</h3>
            <div class="answer-box inspection-review-box">
              {{ reviewContent || '아직 생성된 전체 피드백이 없습니다.' }}
            </div>
          </article>
        </div>
      </section>
    </main>
    <AppFooter />
  </div>
</template>

<script>
import AppFooter from '../components/AppFooter.vue'
import AppHeader from '../components/AppHeader.vue'
import { getCodeReviewRequest, reviewCode, saveCheckResult } from '../api/codemong'

export default {
  name: 'InspectionRunningPage',
  components: { AppFooter, AppHeader },
  data() {
    return {
      request: getCodeReviewRequest(),
      status: 'RUNNING',
      failedTests: [],
      failedTestDetails: [],
      reviewContent: '',
      message: '',
    }
  },
  computed: {
    requestLabel() {
      if (!this.request) return 'review'
      return `repository ${this.request.repositoryId} / step ${this.request.step}`
    },
    passed() {
      return this.status === 'PASSED'
    },
    failed() {
      return this.status === 'FAILED'
    },
    errored() {
      return this.status === 'ERROR'
    },
    title() {
      if (this.passed) return '검사를 통과했습니다'
      if (this.failed) return '검사에서 확인할 문제가 있습니다'
      if (this.errored) return '피드백 생성에 실패했습니다'
      return '제출 코드를 검사하고 피드백을 생성하고 있습니다'
    },
    description() {
      if (this.passed) return 'AIService.codeReview()가 만든 전체 피드백을 아래에서 확인할 수 있습니다.'
      if (this.failed) return '실패 원인과 제출 코드 전체 피드백을 확인하고 수정 방향을 정리하세요.'
      if (this.errored) return '원인을 확인한 뒤 다시 검사를 실행하세요.'
      return '테스트 실행 후 제출 코드 전체 피드백을 생성합니다. 잠시 기다려주세요.'
    },
    isLastStep() {
      return Number(this.request && this.request.step) >= Number(this.request && this.request.maxStep)
    },
    successRoute() {
      return this.isLastStep ? '/completion' : '/mission-passed'
    },
    showFeedback() {
      return this.status !== 'RUNNING' && (this.reviewContent || this.failedTestItems.length)
    },
    failedTestItems() {
      const details = this.failedTestDetails || []
      if (details.length) {
        return details.map(test => ({
          name: test.name || test.methodName || '',
          methodName: test.methodName || this.methodName(test.name),
          description: test.description || '해당 테스트 메서드 설명이 아직 등록되어 있지 않습니다.',
        }))
      }
      return (this.failedTests || []).map(test => ({
        name: test,
        methodName: this.methodName(test),
        description: '해당 테스트 메서드 설명이 아직 등록되어 있지 않습니다.',
      }))
    },
  },
  created() {
    if (!this.request) {
      this.$router.replace('/mission-workspace')
      return
    }
    this.runReview()
  },
  methods: {
    methodName(testName) {
      if (!testName) return ''
      const parts = String(testName).replace(/\(.*\)$/, '').split('.')
      return parts[parts.length - 1]
    },
    async runReview() {
      this.status = 'RUNNING'
      this.failedTests = []
      this.failedTestDetails = []
      this.reviewContent = ''
      this.message = ''
      try {
        const result = await reviewCode(this.request.repositoryId, this.request.step)
        this.status = result.passed ? 'PASSED' : 'FAILED'
        this.failedTests = result.failedTests || []
        this.failedTestDetails = result.failedTestDetails || []
        this.reviewContent = result.content || result.reviewContent || ''
        saveCheckResult({
          repositoryId: this.request.repositoryId,
          projectId: this.request.projectId,
          step: this.request.step,
          maxStep: this.request.maxStep,
          status: this.status,
          passed: result.passed,
          failedTests: this.failedTests,
          failedTestDetails: this.failedTestDetails,
          reviewContent: this.reviewContent,
          content: result.content,
        })
      } catch (error) {
        this.status = 'ERROR'
        this.message = error.message
        saveCheckResult({
          repositoryId: this.request.repositoryId,
          step: this.request.step,
          status: 'ERROR',
          passed: false,
          failedTests: [],
          failedTestDetails: [],
          message: error.message,
        })
      }
    },
  },
}
</script>

<template>
  <div class="app-shell">
    <AppHeader active-page="mission" />
    <main class="page result-page">
      <section class="result-summary" :class="{ pass: passed, fail: !passed }">
        <span class="badge">{{ status }}</span>
        <h1>{{ passed ? '요구사항을 통과했습니다' : '오류 원인을 확인하세요' }}</h1>
        <p>{{ passed ? '현재 스텝이 통과 상태로 저장되었습니다. 다음 스텝으로 이동할 수 있습니다.' : failureMessage }}</p>
        <div class="toolbar">
          <button v-if="passed" class="primary" type="button" @click="$router.push('/next-step-loading')">다음 스텝 이동</button>
          <button class="secondary" type="button" @click="$router.push('/mission-workspace')">미션으로 돌아가기</button>
        </div>
      </section>

      <section class="result-grid">
        <article class="panel">
          <h2>{{ passed ? '통과 요약' : '오류 원인' }}</h2>
          <ul class="check-list" v-if="failedTests.length">
            <li v-for="test in failedTests" :key="test">{{ test }}</li>
          </ul>
          <p v-else>{{ passed ? 'Hidden test가 성공으로 종료되었습니다.' : failureMessage }}</p>
        </article>

        <article class="panel">
          <h2>코드 질문</h2>
          <p>현재 결과를 바탕으로 수정 방향을 질문할 수 있습니다. LLM API가 준비되지 않았으면 기본 응답만 표시됩니다.</p>
          <form class="form" @submit.prevent="ask">
            <textarea v-model="question" rows="5" placeholder="왜 실패했는지, 어떤 파일부터 보면 좋을지 질문하세요."></textarea>
            <button class="primary" type="submit" :disabled="asking">질문 보내기</button>
          </form>
          <div class="answer-box">{{ answer || '응답이 여기에 표시됩니다.' }}</div>
        </article>
      </section>
    </main>
    <AppFooter />
  </div>
</template>

<script>
import AppFooter from '../components/AppFooter.vue'
import AppHeader from '../components/AppHeader.vue'
import { askCodeQuestion, getSavedCheckResult, getSavedRepository } from '../api/codemong'

export default {
  name: 'MissionResultPage',
  components: { AppFooter, AppHeader },
  props: {
    forcedStatus: {
      type: String,
      default: '',
    },
  },
  data() {
    const result = getSavedCheckResult() || {}
    return {
      result,
      question: '',
      answer: '',
      asking: false,
    }
  },
  computed: {
    status() {
      return this.result.status || this.forcedStatus || 'UNKNOWN'
    },
    passed() {
      return this.status === 'PASSED' || this.forcedStatus === 'PASSED'
    },
    failedTests() {
      return this.result.failedTests || []
    },
    failureMessage() {
      return this.result.message || '실패한 테스트 또는 GitHub Actions 오류를 확인하세요.'
    },
  },
  methods: {
    async ask() {
      const repository = getSavedRepository()
      if (!repository) {
        this.answer = '선택된 저장소가 없습니다.'
        return
      }
      this.asking = true
      try {
        const context = `${this.question}\n\n검사 상태: ${this.status}\n실패 원인: ${this.failureMessage}`
        const result = await askCodeQuestion(repository.repositoryId, context)
        this.answer = result.answer || result.response || JSON.stringify(result)
      } catch (error) {
        this.answer = error.message
      } finally {
        this.asking = false
      }
    },
  },
}
</script>

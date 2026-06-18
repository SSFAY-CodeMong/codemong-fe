<template>
  <div class="app-shell">
    <AppHeader active-page="mission" />
    <main class="page layout">
      <section class="panel">
        <h1>코드 질문</h1>
        <p>LLM 응답 API가 연결되어 있으면 현재 저장소 코드 맥락으로 질문할 수 있습니다.</p>
        <form class="form" @submit.prevent="ask">
          <label>
            질문
            <textarea v-model="question" rows="5" placeholder="어떤 부분을 고치면 좋을까요?"></textarea>
          </label>
          <button class="primary" type="submit" :disabled="loading">질문하기</button>
        </form>
      </section>
      <aside class="panel">
        <h2>응답</h2>
        <p>{{ answer || '아직 응답이 없습니다.' }}</p>
      </aside>
    </main>
    <AppFooter />
  </div>
</template>

<script>
import AppFooter from '../components/AppFooter.vue'
import AppHeader from '../components/AppHeader.vue'
import { askCodeQuestion, getSavedRepository } from '../api/codemong'

export default {
  name: 'FrontendAiFeedbackPage',
  components: { AppFooter, AppHeader },
  data() {
    return {
      question: '',
      answer: '',
      loading: false,
      repository: getSavedRepository(),
    }
  },
  methods: {
    async ask() {
      this.loading = true
      try {
        const result = await askCodeQuestion(this.repository.repositoryId, this.question)
        this.answer = result.answer || result.response || JSON.stringify(result)
      } catch (error) {
        this.answer = error.message
      } finally {
        this.loading = false
      }
    },
  },
}
</script>

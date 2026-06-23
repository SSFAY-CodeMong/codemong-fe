<template>
  <div class="app-shell">
    <AppHeader active-page="mission" />
    <main class="page layout ai-question-page">
      <section class="panel ai-question-panel">
        <span class="badge">AI Code Review Chat</span>
        <h1>코드 질문</h1>
        <p>현재 저장소 코드 맥락을 바탕으로 수정 방향과 개선 포인트를 질문할 수 있습니다.</p>
        <form class="form" @submit.prevent="ask">
          <label>
            질문
            <textarea v-model="question" rows="5" placeholder="어떤 부분을 고치면 좋을까요?"></textarea>
          </label>
          <button class="primary" type="submit" :disabled="loading">질문하기</button>
        </form>
      </section>
      <aside class="panel ai-answer-panel">
        <div class="chat-message chat-message--assistant">
          <span class="chat-role">AI</span>
          <div class="chat-bubble">{{ answer || '아직 응답이 없습니다. Repository 코드에 대해 궁금한 점을 질문하세요.' }}</div>
        </div>
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

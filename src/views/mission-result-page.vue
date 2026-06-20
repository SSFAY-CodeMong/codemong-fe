<template>
  <div class="app-shell">
    <AppHeader active-page="mission" />
    <main class="page result-page">
      <section class="result-summary" :class="{ pass: passed, fail: !passed }">
        <span class="badge">{{ status }}</span>
        <h1>{{ passed ? '요구사항을 통과했습니다' : '오류 원인을 확인하세요' }}</h1>
        <p>{{ passed ? successMessage : failureMessage }}</p>
        <div class="toolbar">
          <button v-if="passed" class="primary" type="button" @click="$router.push(successRoute)">
            {{ isLastStep ? '프로젝트 완료' : '다음 스텝 이동' }}
          </button>
          <button class="secondary" type="button" @click="$router.push('/mission-workspace')">
            미션으로 돌아가기
          </button>
        </div>
      </section>

      <section class="result-grid result-grid--review">
        <article class="panel result-panel-scroll">
          <h2>{{ passed ? '통과 요약' : '오류 원인' }}</h2>
          <ul class="failed-test-list" v-if="failedTestItems.length">
            <li v-for="test in failedTestItems" :key="test.name" class="failed-test-item">
              <strong class="method-name">{{ test.methodName }}</strong>
              <span class="muted">{{ test.name }}</span>
              <p>{{ test.description }}</p>
            </li>
          </ul>
          <p v-else>{{ passed ? 'Hidden test가 성공적으로 종료되었습니다.' : failureMessage }}</p>
        </article>

        <article class="panel result-panel-scroll">
          <h2>제출 코드 전체 피드백</h2>
          <div class="answer-box result-feedback">
            {{ reviewContent || '아직 생성된 전체 피드백이 없습니다.' }}
          </div>
        </article>
      </section>

      <section class="panel">
        <h2>코드 질문</h2>
        <p>현재 결과와 전체 피드백을 바탕으로 수정 방향을 질문할 수 있습니다.</p>
        <div class="chat-box" ref="chatBox">
          <div v-if="!messages.length && !asking" class="chat-empty">응답이 여기에 표시됩니다.</div>
          <div
            v-for="message in messages"
            :key="message.id"
            class="chat-message"
            :class="`chat-message--${message.role}`"
          >
            <span class="chat-role">{{ message.role === 'user' ? '나' : 'AI' }}</span>
            <div class="chat-bubble">{{ message.content }}</div>
          </div>
          <div v-if="asking" class="chat-message chat-message--assistant">
            <span class="chat-role">AI</span>
            <div class="chat-bubble chat-bubble--loading">
              <span class="typing-dot"></span>
              <span class="typing-dot"></span>
              <span class="typing-dot"></span>
              답변 생각중...
            </div>
          </div>
        </div>
        <form class="form chat-form" @submit.prevent="ask">
          <textarea
            v-model="question"
            rows="5"
            placeholder="왜 실패했는지, 어떤 파일부터 보면 좋을지 질문하세요."
          ></textarea>
          <button class="primary" type="submit" :disabled="asking || !question.trim()">질문 보내기</button>
        </form>
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
      messages: [],
      asking: false,
      nextMessageId: 1,
    }
  },
  computed: {
    status() {
      return this.result.status || this.forcedStatus || 'UNKNOWN'
    },
    passed() {
      return this.status === 'PASSED' || this.forcedStatus === 'PASSED'
    },
    isLastStep() {
      return Number(this.result.step) >= Number(this.result.maxStep)
    },
    successRoute() {
      return this.isLastStep ? '/completion' : '/next-step-loading'
    },
    successMessage() {
      return this.isLastStep
        ? '마지막 스텝을 통과했습니다. 프로젝트 완료 화면으로 이동할 수 있습니다.'
        : '현재 스텝이 통과 상태로 저장되었습니다. 다음 스텝으로 이동할 수 있습니다.'
    },
    failedTests() {
      return this.result.failedTests || []
    },
    failedTestItems() {
      const details = this.result.failedTestDetails || []
      if (details.length) {
        return details.map(test => ({
          name: test.name || test.methodName || '',
          methodName: test.methodName || this.methodName(test.name),
          description: test.description || '해당 테스트 메서드 설명이 아직 등록되어 있지 않습니다.',
        }))
      }
      return this.failedTests.map(test => ({
        name: test,
        methodName: this.methodName(test),
        description: '해당 테스트 메서드 설명이 아직 등록되어 있지 않습니다.',
      }))
    },
    failureMessage() {
      return this.result.message || '실패한 테스트 또는 GitHub Actions 오류를 확인하세요.'
    },
    reviewContent() {
      return this.result.reviewContent || this.result.content || this.result.answer || this.result.response || ''
    },
  },
  methods: {
    methodName(testName) {
      if (!testName) return ''
      const parts = String(testName).split('.')
      return parts[parts.length - 1]
    },
    async ask() {
      const question = this.question.trim()
      if (!question || this.asking) {
        return
      }
      const repository = getSavedRepository()
      if (!repository) {
        this.messages.push({
          id: this.nextMessageId++,
          role: 'assistant',
          content: '선택된 저장소가 없습니다.',
        })
        this.scrollChatToBottom()
        return
      }
      this.messages.push({
        id: this.nextMessageId++,
        role: 'user',
        content: question,
      })
      this.question = ''
      this.asking = true
      this.scrollChatToBottom()
      try {
        const history = this.messages
          .map(message => `${message.role === 'user' ? '사용자' : 'AI'}: ${message.content}`)
          .join('\n\n')
        const context = `${question}\n\n[이전 대화]\n${history}\n\n검사 상태: ${this.status}\n실패 원인: ${this.failureMessage}\n\n전체 피드백\n${this.reviewContent}`
        const result = await askCodeQuestion(repository.repositoryId, context)
        this.messages.push({
          id: this.nextMessageId++,
          role: 'assistant',
          content: this.resolveAnswerContent(result),
        })
      } catch (error) {
        this.messages.push({
          id: this.nextMessageId++,
          role: 'assistant',
          content: error.message,
        })
      } finally {
        this.asking = false
        this.scrollChatToBottom()
      }
    },
    resolveAnswerContent(result) {
      if (!result) return ''
      if (typeof result === 'string') return result
      return result.content || result.answer || result.response || ''
    },
    scrollChatToBottom() {
      this.$nextTick(() => {
        const chatBox = this.$refs.chatBox
        if (chatBox) {
          chatBox.scrollTop = chatBox.scrollHeight
        }
      })
    },
  },
}
</script>

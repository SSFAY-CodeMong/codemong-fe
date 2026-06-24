<template>
  <div class="app-shell">
    <AppHeader active-page="mail" />
    <main class="page mail-page">
      <section class="mail-hero">
        <div>
          <span class="badge">DailyMong for Codemong</span>
          <h1>DailyMong</h1>
          <p>1시간마다 도착하는 개발 문제와 콘텐츠를 설정하고 풀이 기록을 관리합니다.</p>
        </div>
        <div class="mail-status" :class="{ active: subscription.enabled }">
          <strong>{{ subscription.enabled ? '구독 중' : '구독 꺼짐' }}</strong>
          <span>{{ subscription.email || '이메일 없음' }}</span>
        </div>
      </section>

      <nav class="mail-subnav">
        <button
          v-for="item in subnav"
          :key="item.section"
          type="button"
          :class="{ active: item.section === section }"
          @click="$router.push(item.path)"
        >
          {{ item.label }}
        </button>
      </nav>

      <section v-if="section === 'settings'" class="mail-layout">
        <article class="panel mail-control">
          <div class="section-head">
            <div>
              <h2>발송 설정</h2>
              <p>Spring Batch가 1시간마다 활성 구독자에게 랜덤 질문을 발송합니다.</p>
            </div>
          </div>
          <label class="toggle-row">
            <input type="checkbox" v-model="enabledDraft" @change="saveSubscription" />
            <span>메일 발송 받기</span>
          </label>
          <form v-if="requiresEmailInput" class="form mail-email-form" @submit.prevent="saveSubscription">
            <label>
              수신 이메일
              <input v-model.trim="emailDraft" type="email" placeholder="you@example.com" />
            </label>
            <p>GitHub 계정에서 이메일을 가져오지 못했습니다. 메일을 받을 주소를 먼저 입력하세요.</p>
          </form>
          <div class="toolbar">
            <button class="primary" type="button" @click="sendTest" :disabled="sending">
              {{ sending ? '테스트 발송 중' : '테스트 메일 보내기' }}
            </button>
            <button class="secondary" type="button" @click="loadDashboard" :disabled="loading">새로고침</button>
          </div>
          <p v-if="message" class="status" :class="{ fail: hasError, ok: !hasError }">{{ message }}</p>
        </article>

        <article class="panel">
          <h2>메일 콘텐츠 미리보기</h2>
          <div v-if="previewContent" class="mail-question-card">
            <span class="badge">{{ previewContent.track }}</span>
            <h3>{{ previewContent.title }}</h3>
            <button class="secondary small" type="button" @click="openContent(previewContent)">팝업으로 보기</button>
          </div>
          <p v-else>아직 등록된 메일 콘텐츠가 없습니다.</p>
        </article>
      </section>

      <section v-if="section === 'solve'" class="panel mail-solve-panel">
        <div class="section-head">
          <div>
            <h2>문제 풀기</h2>
            <p>DailyMong의 답변 제출/AI 피드백 흐름을 Codemong에 붙였습니다.</p>
          </div>
          <button class="secondary small" type="button" @click="loadQuestion">랜덤 문제</button>
        </div>
        <div v-if="question" class="mail-question-card">
          <span class="badge">{{ question.category }} · {{ question.difficulty }} · {{ question.questionType }}</span>
          <h3>{{ question.title }}</h3>
          <p>{{ question.content }}</p>
          <div v-if="question.codeTemplate" class="code-editor code-editor--readonly">
            <div class="code-editor__top">
              <span></span>
              <span></span>
              <span></span>
              <strong>example.js</strong>
            </div>
            <div class="code-editor__body">
              <div class="code-gutter">{{ codeExampleLineNumbers }}</div>
              <pre><code v-html="highlightCode(question.codeTemplate)"></code></pre>
            </div>
          </div>
        </div>
        <form v-if="question" class="form" @submit.prevent="submitAnswer">
          <textarea v-model="answerContent" rows="5" placeholder="설명 답변을 입력하세요."></textarea>
          <div class="code-editor">
            <div class="code-editor__top">
              <span></span>
              <span></span>
              <span></span>
              <strong>answer.js</strong>
            </div>
            <div class="code-editor__body">
              <div class="code-gutter">{{ lineNumbers }}</div>
              <textarea
                v-model="codeContent"
                @scroll="syncCodeScroll"
                rows="10"
                spellcheck="false"
                placeholder="// 코드로 푸는 문제라면 여기에 코드를 입력하세요."
              ></textarea>
              <pre ref="codeHighlight" class="code-highlight-layer" aria-hidden="true"><code v-html="highlightCode(codeContent)"></code></pre>
            </div>
          </div>
          <button class="primary" type="submit" :disabled="evaluating">
            {{ evaluating ? 'AI 피드백 생성 중' : '답변 제출' }}
          </button>
        </form>
        <div v-if="answerResult" class="answer-box mail-feedback-box">
          <strong>{{ answerResult.score }}점</strong>
          <div>{{ answerResult.feedback }}</div>
        </div>
      </section>

      <section v-if="section === 'contents'" class="panel">
        <div class="section-head">
          <div>
            <h2>메일 콘텐츠 목록</h2>
            <p>DB에 등록된 md 콘텐츠를 팝업으로 확인할 수 있습니다.</p>
          </div>
        </div>
        <ul class="mail-content-list">
          <li v-for="content in contents" :key="content.id">
            <button type="button" @click="openContent(content)">
              <strong>{{ content.title }}</strong>
              <span>{{ content.type }} #{{ content.displayOrder }}</span>
            </button>
          </li>
        </ul>
      </section>

      <section v-if="section === 'logs'" class="panel">
        <div class="section-head">
          <div>
            <h2>최근 발송 로그</h2>
            <p>SMTP 설정이 없으면 실제 발송은 스킵되고 로그만 남습니다.</p>
          </div>
        </div>
        <ul v-if="recentLogs.length" class="mail-log-list">
          <li v-for="log in recentLogs" :key="log.id" class="mail-log-item" :class="{ success: log.success }">
            <div>
              <strong>{{ log.contentTitle || log.questionTitle || log.mailType }}</strong>
              <p>{{ log.message }}</p>
            </div>
            <span>{{ formatDate(log.createdAt) }}</span>
          </li>
        </ul>
        <div v-else class="empty-state">
          <h2>발송 로그가 없습니다</h2>
          <p>테스트 메일을 보내거나 Batch가 실행되면 여기에 결과가 표시됩니다.</p>
        </div>
      </section>
    </main>
    <div v-if="openedContent" class="modal-backdrop" @click.self="openedContent = null">
      <article class="modal-panel markdown-modal">
        <div class="section-head">
          <div>
            <span class="badge">{{ openedContent.track }}</span>
            <h2>{{ openedContent.title }}</h2>
          </div>
          <button class="secondary small" type="button" @click="openedContent = null">닫기</button>
        </div>
        <div class="markdown-preview" v-html="renderMarkdown(openedContent.content)"></div>
      </article>
    </div>
    <AppFooter />
  </div>
</template>

<script>
import hljs from 'highlight.js/lib/core'
import java from 'highlight.js/lib/languages/java'
import javascript from 'highlight.js/lib/languages/javascript'
import AppFooter from '../components/AppFooter.vue'
import AppHeader from '../components/AppHeader.vue'
import {
  getMailContent,
  getMailContents,
  getMailDashboard,
  getRandomMailQuestion,
  sendTestMail,
  submitMailAnswer,
  updateMailSubscription,
} from '../api/codemong'

hljs.registerLanguage('javascript', javascript)
hljs.registerLanguage('java', java)

export default {
  name: 'MailServicePage',
  components: { AppFooter, AppHeader },
  props: {
    section: {
      type: String,
      default: 'settings',
    },
  },
  data() {
    return {
      subnav: [
        { section: 'settings', label: '발송 설정', path: '/mail-service/settings' },
        { section: 'solve', label: '문제 풀기', path: '/mail-service/solve' },
        { section: 'contents', label: '콘텐츠', path: '/mail-service/contents' },
        { section: 'logs', label: '발송 로그', path: '/mail-service/logs' },
      ],
      loading: false,
      sending: false,
      hasError: false,
      message: '',
      subscription: { enabled: false, email: '' },
      enabledDraft: false,
      emailDraft: '',
      previewQuestion: null,
      previewContent: null,
      recentLogs: [],
      question: null,
      answerContent: '',
      codeContent: '',
      answerResult: null,
      evaluating: false,
      contents: [],
      openedContent: null,
    }
  },
  created() {
    this.loadDashboard()
    this.loadQuestion()
    this.loadContents()
  },
  mounted() {
    const contentId = this.$route.query.content
    if (contentId) {
      this.openContent({ id: contentId })
    }
  },
  methods: {
    async loadDashboard() {
      this.loading = true
      this.message = ''
      this.hasError = false
      try {
        const dashboard = await getMailDashboard()
        this.subscription = dashboard.subscription || { enabled: false, email: '' }
        this.enabledDraft = this.subscription.enabled
        this.emailDraft = this.subscription.email || ''
        this.previewQuestion = dashboard.previewQuestion
        this.previewContent = dashboard.previewContent
        this.recentLogs = dashboard.recentLogs || []
      } catch (error) {
        this.hasError = true
        this.message = error.message
      } finally {
        this.loading = false
      }
    },
    async loadQuestion() {
      this.answerResult = null
      this.answerContent = ''
      this.codeContent = ''
      this.question = await getRandomMailQuestion()
    },
    async submitAnswer() {
      if (!this.question) return
      this.evaluating = true
      try {
        this.answerResult = await submitMailAnswer(this.question.id, {
          content: this.answerContent,
          codeContent: this.codeContent,
        })
      } catch (error) {
        this.answerResult = { score: 0, feedback: error.message }
      } finally {
        this.evaluating = false
      }
    },
    async loadContents() {
      this.contents = await getMailContents()
    },
    async openContent(content) {
      this.openedContent = await getMailContent(content.id)
    },
    highlightCode(code) {
      const source = code || ''
      try {
        return hljs.highlightAuto(source, ['javascript', 'java']).value || '&nbsp;'
      } catch (error) {
        return this.escapeHtml(source) || '&nbsp;'
      }
    },
    syncCodeScroll(event) {
      if (!this.$refs.codeHighlight) return
      this.$refs.codeHighlight.scrollTop = event.target.scrollTop
      this.$refs.codeHighlight.scrollLeft = event.target.scrollLeft
    },
    renderMarkdown(markdown) {
      if (!markdown) return ''
      const lines = markdown.replace(/\r\n/g, '\n').split('\n')
      const html = []
      let inCode = false
      let codeLines = []
      let inList = false

      const closeList = () => {
        if (inList) {
          html.push('</ul>')
          inList = false
        }
      }

      const inline = (value) => this.escapeHtml(value)
        .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
        .replace(/`([^`]+)`/g, '<code>$1</code>')
        .replace(/\[([^\]]+)\]\((https?:\/\/[^)]+)\)/g, '<a href="$2" target="_blank" rel="noreferrer">$1</a>')

      lines.forEach((line) => {
        if (line.trim().startsWith('```')) {
          if (inCode) {
            html.push(`<pre><code>${this.escapeHtml(codeLines.join('\n'))}</code></pre>`)
            codeLines = []
            inCode = false
          } else {
            closeList()
            inCode = true
          }
          return
        }

        if (inCode) {
          codeLines.push(line)
          return
        }

        const trimmed = line.trim()
        if (!trimmed) {
          closeList()
          return
        }

        if (trimmed === '<details>' || trimmed === '</details>') {
          closeList()
          html.push(trimmed)
          return
        }

        const summary = trimmed.match(/^<summary>(.*)<\/summary>$/)
        if (summary) {
          closeList()
          html.push(`<summary>${inline(summary[1])}</summary>`)
          return
        }

        if (trimmed.startsWith('### ')) {
          closeList()
          html.push(`<h3>${inline(trimmed.slice(4))}</h3>`)
          return
        }

        if (trimmed.startsWith('## ')) {
          closeList()
          html.push(`<h2>${inline(trimmed.slice(3))}</h2>`)
          return
        }

        if (trimmed.startsWith('# ')) {
          closeList()
          html.push(`<h1>${inline(trimmed.slice(2))}</h1>`)
          return
        }

        if (trimmed.startsWith('- ')) {
          if (!inList) {
            html.push('<ul>')
            inList = true
          }
          html.push(`<li>${inline(trimmed.slice(2))}</li>`)
          return
        }

        closeList()
        html.push(`<p>${inline(line)}</p>`)
      })

      if (inCode) {
        html.push(`<pre><code>${this.escapeHtml(codeLines.join('\n'))}</code></pre>`)
      }
      closeList()
      return html.join('')
    },
    escapeHtml(value) {
      return String(value)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
    },
    async saveSubscription() {
      if (this.enabledDraft && !this.subscription.email && !this.emailDraft) {
        this.hasError = true
        this.message = '메일을 받을 이메일을 입력하세요.'
        return
      }
      try {
        this.subscription = await updateMailSubscription(this.enabledDraft, this.emailDraft)
        this.enabledDraft = this.subscription.enabled
        this.emailDraft = this.subscription.email || ''
        this.hasError = false
        this.message = this.subscription.enabled ? '메일 구독이 켜졌습니다.' : '메일 구독이 꺼졌습니다.'
      } catch (error) {
        this.hasError = true
        this.message = error.message
        this.enabledDraft = this.subscription.enabled
      }
    },
    async sendTest() {
      this.sending = true
      this.message = ''
      try {
        const log = await sendTestMail()
        this.hasError = !log.success
        this.message = log.message
        await this.loadDashboard()
      } catch (error) {
        this.hasError = true
        this.message = error.message
      } finally {
        this.sending = false
      }
    },
    formatDate(value) {
      if (!value) return ''
      return new Date(value).toLocaleString()
    },
  },
  computed: {
    requiresEmailInput() {
      return this.enabledDraft && !this.subscription.email
    },
    lineNumbers() {
      const count = Math.max(10, this.codeContent.split('\n').length)
      return Array.from({ length: count }, (_, index) => index + 1).join('\n')
    },
    codeExampleLineNumbers() {
      const code = this.question && this.question.codeTemplate ? this.question.codeTemplate : ''
      const count = Math.max(1, code.split('\n').length)
      return Array.from({ length: count }, (_, index) => index + 1).join('\n')
    },
  },
}
</script>

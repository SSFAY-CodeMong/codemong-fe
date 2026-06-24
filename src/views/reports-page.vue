<template>
  <div class="app-shell">
    <AppHeader active-page="reports" />
    <main class="page reports-page">
      <section class="section-head">
        <div>
          <span class="badge">AI Review Reports</span>
          <h1>코드 리뷰 리포트</h1>
          <p>완료된 Repository 검사 결과와 AI 개선 피드백을 한곳에서 확인합니다.</p>
        </div>
        <button class="secondary" type="button" @click="loadReports" :disabled="loading">
          {{ loading ? '불러오는 중' : '새로고침' }}
        </button>
      </section>

      <section v-if="message" class="panel">
        <p class="status fail">{{ message }}</p>
      </section>

      <section v-else-if="!reports.length" class="empty-state report-empty">
        <h2>아직 생성된 리포트가 없습니다</h2>
        <p>프로젝트의 최종 스탭을 완료하면 이곳에 리포트가 표시됩니다.</p>
      </section>

      <section v-else class="report-grid">
        <article v-for="report in reports" :key="report.id" class="report-card">
          <div class="report-card__top">
            <div>
              <span class="badge">Review Report</span>
              <strong>{{ report.projectName || `Report #${report.id}` }}</strong>
              <div class="report-meta">
                <span>Report #{{ report.id }}</span>
                <span>Repository #{{ report.repositoryId }}</span>
              </div>
            </div>
            <span class="status ok">{{ report.score }}점</span>
          </div>
          <p class="report-date">{{ formatDate(report.createdAt) }}</p>
          <div class="answer-box markdown-preview report-content" v-html="renderReportContent(report.content)"></div>

          <div v-if="report.feedbackDetails && report.feedbackDetails.length" class="report-feedback-details">
            <h3>Step별 최신 피드백</h3>
            <article
              v-for="detail in report.feedbackDetails"
              :key="`${report.id}-${detail.step}`"
              class="report-feedback-item"
            >
              <span class="badge">Step {{ detail.step }}</span>
              <div class="markdown-preview report-feedback-content" v-html="renderReportContent(detail.content)"></div>
            </article>
          </div>
        </article>
      </section>
    </main>
    <AppFooter />
  </div>
</template>

<script>
import AppFooter from '../components/AppFooter.vue'
import AppHeader from '../components/AppHeader.vue'
import { getRepositoryReports } from '../api/codemong'
import { renderMarkdown } from '../utils/markdown'

export default {
  name: 'ReportsPage',
  components: { AppFooter, AppHeader },
  data() {
    return {
      reports: [],
      loading: false,
      message: '',
    }
  },
  created() {
    this.loadReports()
  },
  methods: {
    async loadReports() {
      this.loading = true
      this.message = ''
      try {
        const reports = await getRepositoryReports()
        this.reports = Array.isArray(reports) ? reports : []
      } catch (error) {
        this.message = error.message
      } finally {
        this.loading = false
      }
    },
    formatDate(value) {
      if (!value) return ''
      return new Date(value).toLocaleString()
    },
    renderReportContent(content) {
      return renderMarkdown(content || '')
    },
  },
}
</script>

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
        <article
          v-for="report in displayReports"
          :key="report.reportViewId"
          class="report-card"
          :class="{ open: isReportOpen(report) }"
        >
          <button
            class="report-card__summary"
            type="button"
            :aria-expanded="isReportOpen(report) ? 'true' : 'false'"
            @click="toggleReport(report)"
          >
            <div>
              <span class="badge">완료 프로젝트 보고서 </span>
              <span class="report-title-line">
                <strong>{{ report.projectName || `Report #${report.id}` }}</strong>
                <img
                  class="report-stamp"
                  :src="stampSrc(report)"
                  :alt="`${reportGrade(report.score)} 등급 도장`"
                />
              </span>
              <div class="report-meta">
                <span>Report #{{ report.id }}</span>
                <span>Repository #{{ report.repositoryId }}</span>
                <span>{{ formatDate(report.createdAt) }}</span>
              </div>
            </div>
            <span class="report-score">{{ report.score }}점</span>
            <span class="report-toggle-mark">{{ isReportOpen(report) ? '접기' : '열기' }}</span>
          </button>

          <div v-if="isReportOpen(report)" class="report-card__body">
            <div class="answer-box markdown-preview report-content" v-html="renderReportContent(report.content)"></div>

            <div v-if="report.feedbackDetails && report.feedbackDetails.length" class="report-feedback-details">
              <h3>Step별 최신 피드백</h3>
              <article
                v-for="detail in report.feedbackDetails"
                :key="`${report.reportViewId}-${detail.step}`"
                class="report-feedback-item"
              >
                <span class="badge">Step {{ detail.step }}</span>
                <div class="markdown-preview report-feedback-content" v-html="renderReportContent(detail.content)"></div>
              </article>
            </div>
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

const REPORT_PREVIEW_REPEAT_COUNT = 1

export default {
  name: 'ReportsPage',
  components: { AppFooter, AppHeader },
  data() {
    return {
      reports: [],
      loading: false,
      message: '',
      openedReportViewId: '',
    }
  },
  computed: {
    displayReports() {
      if (REPORT_PREVIEW_REPEAT_COUNT <= 1) {
        return this.reports.map((report, index) => this.decorateReport(report, index, 0))
      }

      return Array.from({ length: REPORT_PREVIEW_REPEAT_COUNT }).flatMap((_, round) =>
        this.reports.map((report, index) => this.decorateReport(report, index, round))
      )
    },
  },
  created() {
    this.loadReports()
  },
  methods: {
    decorateReport(report, index, round) {
      const baseId = report.id || report.repositoryId || index
      return {
        ...report,
        reportViewId: `${baseId}-${index}-${round}`,
        projectName: round === 0 ? report.projectName : `${report.projectName || `Report #${baseId}`} #${round + 1}`,
      }
    },
    async loadReports() {
      this.loading = true
      this.message = ''
      try {
        const reports = await getRepositoryReports()
        this.reports = Array.isArray(reports) ? reports : []
        this.openedReportViewId = this.displayReports[0] ? this.displayReports[0].reportViewId : ''
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
    reportGrade(score) {
      const value = Number(score) || 0
      if (value >= 95) return 'S'
      if (value >= 85) return 'A'
      if (value >= 70) return 'B'
      return 'C'
    },
    stampSrc(report) {
      return `/stamp${this.reportGrade(report.score)}.png`
    },
    isReportOpen(report) {
      return this.openedReportViewId === report.reportViewId
    },
    toggleReport(report) {
      this.openedReportViewId = this.isReportOpen(report) ? '' : report.reportViewId
    },
  },
}
</script>

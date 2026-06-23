<template>
  <div class="app-shell">
    <AppHeader active-page="reports" />
    <main class="page reports-page">
      <section class="section-head">
        <div>
          <span class="badge">Reports</span>
          <h1>프로젝트 리포트</h1>
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
          <div class="progress-card__top">
            <strong>Report #{{ report.id }}</strong>
            <span class="badge">{{ report.score }}점</span>
          </div>
          <p>{{ formatDate(report.createdAt) }}</p>
          <div class="answer-box report-content">{{ report.content }}</div>
        </article>
      </section>
    </main>
    <AppFooter />
  </div>
</template>

<script>
import AppFooter from '../components/AppFooter.vue'
import AppHeader from '../components/AppHeader.vue'
import { getRepositoryReports, getSavedRepository } from '../api/codemong'

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
      const repository = getSavedRepository()
      if (!repository) {
        this.message = '선택된 저장소가 없습니다.'
        return
      }
      this.loading = true
      this.message = ''
      try {
        this.reports = await getRepositoryReports(repository.repositoryId)
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
  },
}
</script>

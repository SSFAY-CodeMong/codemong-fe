<template>
  <div class="app-shell">
    <AppHeader active-page="progress" />
    <main class="page progress-page fx-grid-bg">
      <section>
        <div class="section-head">
          <div>
            <span class="badge">Progress</span>
            <h1>진행 현황</h1>
          </div>
          <button class="secondary small nowrap" type="button" @click="load">새로고침</button>
        </div>

        <div class="progress-grid">
          <article
            v-for="repo in repositories"
            :key="repo.repositoryId"
            class="progress-card fx-card fx-hover"
            :class="{ selected: selected && selected.repositoryId === repo.repositoryId }"
            @click="open(repo)"
          >
            <div class="progress-card__top">
              <span class="badge">{{ repo.projectType }}</span>
              <strong>{{ percent(repo) }}%</strong>
            </div>
            <h2>{{ repo.projectName }}</h2>
            <p>{{ repo.name }}</p>
            <div class="progress-track">
              <div class="progress-fill" :style="{ width: `${percent(repo)}%` }"></div>
            </div>
            <div class="progress-meta">
              <span>step {{ currentStep(repo) }} / {{ maxStep(repo) }}</span>
              <span>{{ repo.status && repo.status.currentStepPassed ? '통과' : '진행 중' }}</span>
            </div>
          </article>
        </div>
      </section>

      <aside class="panel fx-card progress-detail">
        <h2>현재 상태</h2>
        <template v-if="status.repositoryId">
          <div class="big-percent">{{ selected ? percent(selected) : 0 }}%</div>
          <div class="progress-track large">
            <div class="progress-fill" :style="{ width: `${selected ? percent(selected) : 0}%` }"></div>
          </div>
          <p>현재 스텝: {{ status.currentStep }}</p>
          <p>브랜치: {{ status.branchName }}</p>
          <p>
            완료 여부:
            <span class="status" :class="{ ok: status.completed }">{{ status.completed ? '완료' : '진행 중' }}</span>
          </p>
          <button class="primary" type="button" @click="$router.push('/mission-workspace')">미션으로 이동</button>
        </template>
        <p v-else>진행 중인 프로젝트를 선택하세요.</p>
      </aside>
    </main>
    <AppFooter />
  </div>
</template>

<script>
import AppFooter from '../components/AppFooter.vue'
import AppHeader from '../components/AppHeader.vue'
import { getLearningRepositories, getRepositoryStatus, saveRepository, stepNumber } from '../api/codemong'

export default {
  name: 'MissionProgressPage',
  components: { AppFooter, AppHeader },
  data() {
    return {
      repositories: [],
      selected: null,
      status: {},
    }
  },
  async created() {
    await this.load()
  },
  methods: {
    async load() {
      const repos = await getLearningRepositories()
      this.repositories = await Promise.all(repos.map(async repo => {
        const status = await getRepositoryStatus(repo.repositoryId)
        return { ...repo, status }
      }))
      if (this.repositories[0]) await this.open(this.repositories[0])
    },
    async open(repo) {
      this.selected = repo
      saveRepository(repo)
      this.status = repo.status || await getRepositoryStatus(repo.repositoryId)
      this.selected = { ...repo, status: this.status }
    },
    currentStep(repo) {
      return stepNumber(repo.status && repo.status.currentStep)
    },
    maxStep(repo) {
      return repo.maxStep || repo.steps || repo.status && repo.status.maxStep || 5
    },
    percent(repo) {
      const max = this.maxStep(repo)
      const current = Math.min(this.currentStep(repo), max)
      const passedBonus = repo.status && repo.status.currentStepPassed ? 1 : 0
      return Math.min(100, Math.round(((current - 1 + passedBonus) / max) * 100))
    },
  },
}
</script>

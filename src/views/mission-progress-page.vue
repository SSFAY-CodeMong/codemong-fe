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

        <div class="progress-filter">
          <label>
            <span>진행 여부</span>
            <select v-model="statusFilter">
              <option value="all">전체</option>
              <option value="in-progress">진행 중</option>
              <option value="completed">완료</option>
            </select>
          </label>
          <label>
            <span>프로젝트</span>
            <select v-model="projectFilter">
              <option value="all">전체 프로젝트</option>
              <option v-for="projectName in projectNames" :key="projectName" :value="projectName">
                {{ projectName }}
              </option>
            </select>
          </label>
          <label>
            <span>검색</span>
            <input v-model.trim="keyword" type="search" placeholder="저장소 또는 프로젝트명" />
          </label>
          <button class="secondary small nowrap" type="button" @click="resetFilters">필터 초기화</button>
        </div>

        <div class="progress-grid">
          <article
            v-for="repo in filteredRepositories"
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
        <div v-if="repositories.length && !filteredRepositories.length" class="empty-state progress-empty">
          <h2>조건에 맞는 프로젝트가 없습니다</h2>
          <p>필터를 바꾸거나 초기화해서 다시 확인하세요.</p>
          <button class="secondary" type="button" @click="resetFilters">필터 초기화</button>
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
      statusFilter: 'all',
      projectFilter: 'all',
      keyword: '',
    }
  },
  computed: {
    projectNames() {
      return [...new Set(this.repositories.map(repo => repo.projectName).filter(Boolean))].sort()
    },
    filteredRepositories() {
      const keyword = this.keyword.toLowerCase()
      return this.repositories.filter(repo => {
        const status = repo.status || {}
        const matchesProject = this.projectFilter === 'all' || repo.projectName === this.projectFilter
        const matchesStatus =
          this.statusFilter === 'all' ||
          this.statusFilter === 'completed' && status.completed ||
          this.statusFilter === 'step-passed' && status.currentStepPassed && !status.completed ||
          this.statusFilter === 'in-progress' && !status.currentStepPassed && !status.completed
        const matchesKeyword = !keyword ||
          String(repo.projectName || '').toLowerCase().includes(keyword) ||
          String(repo.name || '').toLowerCase().includes(keyword)

        return matchesProject && matchesStatus && matchesKeyword
      })
    },
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
      const next = this.filteredRepositories[0] || this.repositories[0]
      if (next) await this.open(next)
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
    resetFilters() {
      this.statusFilter = 'all'
      this.projectFilter = 'all'
      this.keyword = ''
    },
  },
  watch: {
    filteredRepositories(next) {
      if (!next.length) {
        this.selected = null
        this.status = {}
        return
      }
      if (!this.selected || !next.some(repo => repo.repositoryId === this.selected.repositoryId)) {
        this.open(next[0])
      }
    },
  },
}
</script>

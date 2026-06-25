<template>
  <div class="app-shell">
    <AppHeader active-page="mission" />
    <main class="page mission-page fx-grid-bg">
      <section class="mission-list panel fx-card">
        <div class="section-head no-wrap-head">
          <div>
            <span class="badge">My Missions</span>
            <h1>내 미션 프로젝트</h1>
          </div>
          <button class="secondary small nowrap" type="button" @click="loadRepositories">새로고침</button>
        </div>
        <p v-if="message" class="status fail">{{ message }}</p>

        <div class="mission-list-group">
          <div class="mission-list-group__head">
            <h2>진행 중인 프로젝트</h2>
            <span>{{ activeRepositories.length }}</span>
          </div>
          <article
            v-for="repo in activeRepositories"
            :key="repo.repositoryId"
            class="mission-repo-card fx-hover"
            :class="{ selected: selected && selected.repositoryId === repo.repositoryId }"
            @click="selectRepository(repo)"
          >
            <div>
              <span class="badge">{{ repo.projectType }}</span>
              <h2>{{ repo.projectName }}</h2>
              <p>{{ repo.name }}</p>
              <span class="mission-repo-status">{{ repoStatusLabel(repo) }}</span>
            </div>
            <button class="danger small nowrap" type="button" @click.stop="removeRepository(repo)">삭제</button>
          </article>
          <div v-if="!activeRepositories.length && repositories.length" class="mission-empty-small">
            진행 중인 프로젝트가 없습니다.
          </div>
        </div>

        <div v-if="completedRepositories.length" class="mission-list-group mission-list-group--completed">
          <div class="mission-list-group__head">
            <h2>완료한 프로젝트</h2>
            <span>{{ completedRepositories.length }}</span>
          </div>
          <article
            v-for="repo in completedRepositories"
            :key="repo.repositoryId"
            class="mission-repo-card mission-repo-card--completed fx-hover"
            :class="{ selected: selected && selected.repositoryId === repo.repositoryId }"
            @click="selectRepository(repo)"
          >
            <div>
              <span class="badge">Completed</span>
              <h2>{{ repo.projectName }}</h2>
              <p>{{ repo.name }}</p>
              <span class="mission-repo-status completed">프로젝트 완료</span>
            </div>
            <button class="danger small nowrap" type="button" @click.stop="removeRepository(repo)">삭제</button>
          </article>
        </div>

        <div v-if="!repositories.length && !message" class="empty-state">
          <h2>미션 프로젝트가 없습니다</h2>
          <p>프로젝트 페이지에서 새 학습 저장소를 만들어 시작하세요.</p>
          <button class="primary" type="button" @click="$router.push('/projects')">프로젝트 보러가기</button>
        </div>
      </section>

      <section class="mission-detail panel fx-card" v-if="status.repositoryId">
        <div class="mission-hero-strip">
          <div>
            <span class="badge">{{ spec.stepId || status.currentStep }}</span>
            <h1>{{ spec.title || status.projectName }}</h1>
            <p>{{ currentStepContent }}</p>
          </div>
          <div class="mission-state" :class="{ passed: status.currentStepPassed || status.completed, completed: status.completed }">
            <strong>{{ status.completed ? 'COMPLETED' : status.currentStepPassed ? 'PASSED' : 'IN PROGRESS' }}</strong>
            <span>{{ status.branchName }}</span>
          </div>
        </div>

        <div class="mission-content-grid">
          <div class="mission-requirements">
            <div class="mission-requirements__head">
              <h2>요구사항</h2>
              <div class="mission-requirements__actions">
                <span>Markdown</span>
                <button class="secondary small nowrap" type="button" @click="requirementsOpen = true">
                  크게 보기
                </button>
              </div>
            </div>
            <div
              class="markdown-preview mission-spec-document"
              v-html="renderSpecMarkdown(spec.description)"
            ></div>
          </div>
          <aside class="mission-side">
            <h2>저장소 정보</h2>
            <dl>
              <div><dt>프로젝트</dt><dd>{{ status.projectName }}</dd></div>
              <div><dt>저장소</dt><dd>{{ status.name || selected.name }}</dd></div>
              <div><dt>트랙</dt><dd>{{ selected.projectType }}</dd></div>
              <div><dt>스텝 제목</dt><dd>{{ currentStepInfo.title || spec.title || '-' }}</dd></div>
              <div><dt>현재 스텝</dt><dd>{{ currentStep }} / {{ maxStep }}</dd></div>
              <div><dt>진행 상태</dt><dd>{{ status.completed ? '프로젝트 완료' : status.currentStepPassed ? '통과 완료' : '진행 중' }}</dd></div>
              <div><dt>브랜치</dt><dd>{{ status.branchName }}</dd></div>
            </dl>
            <a v-if="githubBranchUrl" class="github-open-button" :href="githubBranchUrl" target="_blank" rel="noreferrer">
              <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                <path
                  fill="currentColor"
                  d="M12 2C6.48 2 2 6.58 2 12.24c0 4.53 2.87 8.37 6.84 9.73.5.09.68-.22.68-.49 0-.24-.01-1.04-.01-1.89-2.78.62-3.37-1.21-3.37-1.21-.45-1.18-1.11-1.49-1.11-1.49-.91-.64.07-.63.07-.63 1 .07 1.53 1.06 1.53 1.06.9 1.57 2.35 1.12 2.92.86.09-.67.35-1.12.64-1.38-2.22-.26-4.56-1.14-4.56-5.06 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.3.1-2.71 0 0 .84-.28 2.75 1.05A9.33 9.33 0 0 1 12 6.99c.85 0 1.7.12 2.5.34 1.9-1.33 2.74-1.05 2.74-1.05.55 1.41.2 2.45.1 2.71.64.72 1.03 1.63 1.03 2.75 0 3.93-2.34 4.8-4.57 5.05.36.32.68.94.68 1.9 0 1.38-.01 2.49-.01 2.83 0 .27.18.59.69.49A10.13 10.13 0 0 0 22 12.24C22 6.58 17.52 2 12 2Z"
                />
              </svg>
              <span>GitHub에서 열기</span>
            </a>
          </aside>
        </div>

        <div class="mission-actions">
          <button v-if="status.currentStepPassed && status.completed" class="primary" type="button" @click="$router.push('/completion')">
            완료 화면으로 이동
          </button>
          <button v-else-if="status.currentStepPassed" class="primary" type="button" @click="$router.push('/next-step-loading')">
            다음 스텝으로 이동
          </button>
          <button v-else class="primary" type="button" @click="startCheck" :disabled="checking">
            {{ checking ? '검사 요청 중' : '검사하기' }}
          </button>
          <button class="secondary" type="button" @click="$router.push('/mission-progress')">진행 현황</button>
        </div>
      </section>
    </main>

    <div
      v-if="requirementsOpen"
      class="modal-backdrop"
      role="dialog"
      aria-modal="true"
      aria-labelledby="mission-requirements-title"
      @click.self="requirementsOpen = false"
    >
      <article class="modal-panel markdown-modal mission-requirements-modal">
        <div class="mission-requirements-modal__head">
          <div>
            <span class="badge">{{ spec.stepId || status.currentStep }}</span>
            <h2 id="mission-requirements-title">요구사항 크게 보기</h2>
            <p>{{ spec.title || currentStepInfo.title || status.projectName }}</p>
          </div>
          <button class="secondary small nowrap" type="button" @click="requirementsOpen = false">닫기</button>
        </div>
        <div
          class="markdown-preview mission-spec-document mission-spec-document--modal"
          v-html="renderSpecMarkdown(spec.description)"
        ></div>
      </article>
    </div>
    <AppFooter />
  </div>
</template>

<script>
import AppFooter from '../components/AppFooter.vue'
import AppHeader from '../components/AppHeader.vue'
import {
  deleteLearningRepository,
  getLearningRepositories,
  getProjectSteps,
  getRepositoryStatus,
  getSavedRepository,
  getStepSpec,
  saveCodeReviewRequest,
  saveRepository,
  stepNumber,
} from '../api/codemong'
import { renderMarkdown } from '../utils/markdown'

export default {
  name: 'MissionWorkspacePage',
  components: { AppFooter, AppHeader },
  data() {
    return {
      repositories: [],
      selected: null,
      status: {},
      projectSteps: [],
      spec: { requirements: [] },
      checking: false,
      message: '',
      requirementsOpen: false,
    }
  },
  computed: {
    currentStep() {
      return stepNumber(this.status.currentStep)
    },
    maxStep() {
      return this.status.maxStep || this.selected && this.selected.maxStep || 5
    },
    currentStepInfo() {
      const step = this.currentStep
      const padded = String(step).padStart(2, '0')
      return this.projectSteps.find(item => {
        return Number(item.step) === step ||
          Number(item.stepNumber) === step ||
          Number(item.id) === step ||
          item.stepId === this.status.currentStep ||
          item.stepId === `step${padded}` ||
          item.stepId === `STEP${padded}` ||
          item.stepId === `STEP_${step}`
      }) || {}
    },
    currentStepContent() {
      return this.currentStepInfo.content || this.currentStepInfo.description || ''
    },
    activeRepositories() {
      return this.repositories.filter(repo => !this.isCompleted(repo))
    },
    completedRepositories() {
      return this.repositories.filter(repo => this.isCompleted(repo))
    },
    githubBranchUrl() {
      const baseUrl = this.status.htmlUrl || this.selected && this.selected.htmlUrl
      const repositoryName = this.status.name || this.selected && this.selected.name
      const branchName = this.status.branchName
      if (!baseUrl) return ''
      if (!repositoryName || !branchName) return baseUrl

      const normalizedBaseUrl = baseUrl.replace(/\/$/, '').replace(/\.git$/, '')
      const encodedRepositoryName = encodeURIComponent(repositoryName)
      const encodedBranchName = branchName.split('/').map(encodeURIComponent).join('/')

      if (normalizedBaseUrl.endsWith(`/${repositoryName}`) || normalizedBaseUrl.endsWith(`/${encodedRepositoryName}`)) {
        return `${normalizedBaseUrl}/tree/${encodedBranchName}`
      }

      return `${normalizedBaseUrl}/${encodedRepositoryName}/tree/${encodedBranchName}`
    },
  },
  async created() {
    await this.loadRepositories()
  },
  mounted() {
    window.addEventListener('keydown', this.handleKeydown)
  },
  beforeDestroy() {
    window.removeEventListener('keydown', this.handleKeydown)
  },
  methods: {
    async loadRepositories() {
      this.message = ''
      try {
        const repositories = await getLearningRepositories()
        this.repositories = await Promise.all(repositories.map(async repo => {
          const status = await getRepositoryStatus(repo.repositoryId)
          return { ...repo, status }
        }))
        const saved = getSavedRepository()
        const next = this.repositories.find(repo => saved && repo.repositoryId === saved.repositoryId) ||
          this.activeRepositories[0] ||
          this.completedRepositories[0]
        if (next) await this.selectRepository(next)
      } catch (error) {
        this.message = error.message
      }
    },
    async selectRepository(repo) {
      this.requirementsOpen = false
      this.selected = repo
      this.status = repo.status || await getRepositoryStatus(repo.repositoryId)
      this.repositories = this.repositories.map(item => {
        return item.repositoryId === repo.repositoryId ? { ...item, status: this.status } : item
      })
      saveRepository({ ...repo, ...this.status })
      const step = stepNumber(this.status.currentStep)
      const [projectSteps, spec] = await Promise.all([
        getProjectSteps(this.status.projectId),
        getStepSpec(this.status.projectId, step),
      ])
      this.projectSteps = Array.isArray(projectSteps) ? projectSteps : projectSteps.steps || []
      this.spec = spec
    },
    async removeRepository(repo) {
      if (!window.confirm(`${repo.name} 저장소를 삭제할까요? GitHub 원격 저장소도 삭제됩니다.`)) return
      await deleteLearningRepository(repo.repositoryId)
      this.repositories = this.repositories.filter(item => item.repositoryId !== repo.repositoryId)
      if (this.selected && this.selected.repositoryId === repo.repositoryId) {
        this.selected = null
        this.status = {}
        this.projectSteps = []
        this.spec = { requirements: [] }
        const next = this.activeRepositories[0] || this.completedRepositories[0]
        if (next) await this.selectRepository(next)
      }
    },
    async startCheck() {
      this.checking = true
      this.message = ''
      try {
        const step = stepNumber(this.status.currentStep)
        saveCodeReviewRequest({
          repositoryId: this.status.repositoryId,
          projectId: this.status.projectId,
          step,
          currentStep: this.status.currentStep,
          maxStep: this.maxStep,
        })
        this.$router.push('/inspection-running')
      } catch (error) {
        this.message = error.message
      } finally {
        this.checking = false
      }
    },
    renderSpecMarkdown(markdown) {
      return renderMarkdown(markdown || '아직 표시할 요구사항이 없습니다.')
    },
    handleKeydown(event) {
      if (event.key === 'Escape') this.requirementsOpen = false
    },
    isCompleted(repo) {
      return Boolean(repo && repo.status && repo.status.completed)
    },
    repoStatusLabel(repo) {
      if (this.isCompleted(repo)) return '프로젝트 완료'
      if (repo && repo.status && repo.status.currentStepPassed) return '현재 스텝 통과'
      return '진행 중'
    },
  },
}
</script>

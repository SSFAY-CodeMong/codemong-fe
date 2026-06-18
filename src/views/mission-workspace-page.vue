<template>
  <div class="app-shell">
    <AppHeader active-page="mission" />
    <main class="page mission-page fx-grid-bg">
      <section class="mission-list panel fx-card">
        <div class="section-head no-wrap-head">
          <div>
            <span class="badge">My Missions</span>
            <h1>진행 중인 프로젝트</h1>
          </div>
          <button class="secondary small nowrap" type="button" @click="loadRepositories">새로고침</button>
        </div>
        <p v-if="message" class="status fail">{{ message }}</p>
        <article
          v-for="repo in repositories"
          :key="repo.repositoryId"
          class="mission-repo-card fx-hover"
          :class="{ selected: selected && selected.repositoryId === repo.repositoryId }"
          @click="selectRepository(repo)"
        >
          <div>
            <span class="badge">{{ repo.projectType }}</span>
            <h2>{{ repo.projectName }}</h2>
            <p>{{ repo.name }}</p>
          </div>
          <button class="danger small nowrap" type="button" @click.stop="removeRepository(repo)">삭제</button>
        </article>
        <div v-if="!repositories.length && !message" class="empty-state">
          <h2>진행 중인 프로젝트가 없습니다</h2>
          <p>프로젝트 페이지에서 새 학습 저장소를 만들어 시작하세요.</p>
          <button class="primary" type="button" @click="$router.push('/projects')">프로젝트 보러가기</button>
        </div>
      </section>

      <section class="mission-detail panel fx-card" v-if="status.repositoryId">
        <div class="mission-hero-strip">
          <div>
            <span class="badge">{{ spec.stepId || status.currentStep }}</span>
            <h1>{{ spec.title || status.projectName }}</h1>
            <p>{{ spec.description }}</p>
          </div>
          <div class="mission-state" :class="{ passed: status.currentStepPassed }">
            <strong>{{ status.currentStepPassed ? 'PASSED' : 'IN PROGRESS' }}</strong>
            <span>{{ status.branchName }}</span>
          </div>
        </div>

        <div class="mission-content-grid">
          <div>
            <h2>요구사항</h2>
            <ul class="check-list">
              <li v-for="item in spec.requirements" :key="item">{{ item }}</li>
            </ul>
          </div>
          <aside class="mission-side">
            <h2>저장소 정보</h2>
            <dl>
              <div><dt>프로젝트</dt><dd>{{ status.projectName }}</dd></div>
              <div><dt>현재 스텝</dt><dd>{{ status.currentStep }}</dd></div>
              <div><dt>브랜치</dt><dd>{{ status.branchName }}</dd></div>
            </dl>
            <a v-if="status.htmlUrl" :href="status.htmlUrl" target="_blank" rel="noreferrer">GitHub에서 열기</a>
          </aside>
        </div>

        <div class="mission-actions">
          <button v-if="status.currentStepPassed" class="primary" type="button" @click="$router.push('/next-step-loading')">
            다음 스텝으로 이동
          </button>
          <button v-else class="primary" type="button" @click="startCheck" :disabled="checking">
            {{ checking ? '검사 요청 중' : '검사하기' }}
          </button>
          <button class="secondary" type="button" @click="$router.push('/mission-progress')">진행 현황</button>
        </div>
      </section>
    </main>
    <AppFooter />
  </div>
</template>

<script>
import AppFooter from '../components/AppFooter.vue'
import AppHeader from '../components/AppHeader.vue'
import {
  deleteLearningRepository,
  getLearningRepositories,
  getRepositoryStatus,
  getSavedRepository,
  getStepSpec,
  saveRepository,
  startCodeCheck,
  stepNumber,
} from '../api/codemong'

export default {
  name: 'MissionWorkspacePage',
  components: { AppFooter, AppHeader },
  data() {
    return {
      repositories: [],
      selected: null,
      status: {},
      spec: { requirements: [] },
      checking: false,
      message: '',
    }
  },
  async created() {
    await this.loadRepositories()
  },
  methods: {
    async loadRepositories() {
      this.message = ''
      try {
        this.repositories = await getLearningRepositories()
        const saved = getSavedRepository()
        const next = this.repositories.find(repo => saved && repo.repositoryId === saved.repositoryId) || this.repositories[0]
        if (next) await this.selectRepository(next)
      } catch (error) {
        this.message = error.message
      }
    },
    async selectRepository(repo) {
      this.selected = repo
      saveRepository(repo)
      this.status = await getRepositoryStatus(repo.repositoryId)
      const step = stepNumber(this.status.currentStep)
      this.spec = await getStepSpec(this.status.projectId, step)
    },
    async removeRepository(repo) {
      if (!window.confirm(`${repo.name} 저장소를 삭제할까요? GitHub 원격 저장소도 삭제됩니다.`)) return
      await deleteLearningRepository(repo.repositoryId)
      this.repositories = this.repositories.filter(item => item.repositoryId !== repo.repositoryId)
      if (this.selected && this.selected.repositoryId === repo.repositoryId) {
        this.selected = null
        this.status = {}
        this.spec = { requirements: [] }
        if (this.repositories[0]) await this.selectRepository(this.repositories[0])
      }
    },
    async startCheck() {
      this.checking = true
      this.message = ''
      try {
        const step = stepNumber(this.status.currentStep)
        await startCodeCheck(this.status.repositoryId, step)
        this.$router.push('/inspection-running')
      } catch (error) {
        this.message = error.message
      } finally {
        this.checking = false
      }
    },
  },
}
</script>

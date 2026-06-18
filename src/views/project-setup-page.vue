<template>
  <div class="app-shell">
    <AppHeader active-page="projects" />
    <main class="page setup-page">
      <section class="setup-header">
        <div>
          <span class="badge">{{ trackLabel }}</span>
          <h1>시작 스텝 선택</h1>
          <p v-if="project">
            {{ project.name }} 프로젝트의 시작 지점을 고르면 GitHub 저장소 생성과 스타터 코드 복사가 이어집니다.
          </p>
        </div>
        <div class="setup-summary" v-if="project">
          <strong>{{ project.name }}</strong>
          <span>{{ project.description }}</span>
        </div>
      </section>

      <section class="setup-grid">
        <article
          v-for="step in steps"
          :key="step.step"
          class="step-card"
          :class="{ selected: startStep === step.step }"
          @click="startStep = step.step"
        >
          <div class="step-card__number">{{ step.stepId }}</div>
          <div>
            <h2>{{ step.title }}</h2>
            <p>{{ step.description }}</p>
          </div>
        </article>
      </section>

      <aside class="setup-action panel">
        <div>
          <h2>생성 요청</h2>
          <p>트랙은 프로젝트 타입 기준으로 고정됩니다. 선택된 스텝부터 브랜치와 starter 코드가 준비됩니다.</p>
        </div>
        <dl>
          <div>
            <dt>시작 스텝</dt>
            <dd>step{{ String(startStep).padStart(2, '0') }}</dd>
          </div>
          <div>
            <dt>트랙</dt>
            <dd>{{ trackLabel }}</dd>
          </div>
        </dl>
        <button class="primary" type="button" :disabled="!project" @click="start">
          프로젝트 생성 시작
        </button>
        <p v-if="message" class="status fail">{{ message }}</p>
        <button v-if="needsLogin" class="secondary" type="button" @click="$router.push('/login')">
          GitHub 로그인으로 이동
        </button>
      </aside>
    </main>
    <AppFooter />
  </div>
</template>

<script>
import AppFooter from '../components/AppFooter.vue'
import AppHeader from '../components/AppHeader.vue'
import { getProjectSteps, getSelectedProject, saveProjectStartRequest } from '../api/codemong'

export default {
  name: 'ProjectSetupPage',
  components: { AppFooter, AppHeader },
  data() {
    return {
      project: null,
      steps: [],
      startStep: 1,
      message: '',
      needsLogin: false,
    }
  },
  computed: {
    track() {
      return (this.project && this.project.type) || 'BE'
    },
    trackLabel() {
      return this.track === 'FE' ? 'Frontend' : 'Backend'
    },
  },
  async created() {
    this.project = getSelectedProject()
    if (!this.project) {
      this.$router.replace('/projects')
      return
    }
    this.steps = await getProjectSteps(this.project.id)
  },
  methods: {
    start() {
      this.message = ''
      this.needsLogin = false
      saveProjectStartRequest({
        project: this.project,
        payload: { startStep: this.startStep, track: this.track },
      })
      this.$router.push('/project-initializing')
    },
  },
}
</script>

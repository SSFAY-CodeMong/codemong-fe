<template>
  <div class="app-shell">
    <AppHeader active-page="mission" />
    <main class="page loading-page">
      <section class="loading-panel">
        <div class="loader-orbit" aria-hidden="true">
          <span></span>
          <span></span>
          <span></span>
        </div>
        <div>
          <span class="badge">{{ done ? 'READY' : 'CREATING' }}</span>
          <h1>{{ title }}</h1>
          <p>{{ message }}</p>
        </div>
        <ol class="loading-steps">
          <li :class="{ active: phase >= 1, done: phase > 1 }">GitHub 저장소 생성</li>
          <li :class="{ active: phase >= 2, done: phase > 2 }">브랜치 준비</li>
          <li :class="{ active: phase >= 3, done }">starter 코드 복사</li>
        </ol>
        <div class="toolbar">
          <button v-if="done" class="primary" type="button" @click="$router.push('/mission-workspace')">미션으로 이동</button>
          <a v-if="repository" class="secondary" :href="repository.htmlUrl" target="_blank" rel="noreferrer">GitHub 열기</a>
          <button v-if="failed" class="secondary" type="button" @click="$router.push('/project-setup')">설정으로 돌아가기</button>
          <button v-if="needsLogin" class="primary" type="button" @click="$router.push('/login')">GitHub 로그인</button>
        </div>
      </section>
    </main>
    <AppFooter />
  </div>
</template>

<script>
import AppFooter from '../components/AppFooter.vue'
import AppHeader from '../components/AppHeader.vue'
import { getProjectStartRequest, getSavedRepository, startProject } from '../api/codemong'

export default {
  name: 'ProjectInitializingPage',
  components: { AppFooter, AppHeader },
  data() {
    return {
      repository: getSavedRepository(),
      title: '학습 저장소를 준비하고 있습니다',
      message: 'GitHub 저장소 생성과 starter 코드 복사는 잠시 걸릴 수 있습니다.',
      phase: 1,
      done: false,
      failed: false,
      needsLogin: false,
      timer: null,
    }
  },
  async created() {
    this.timer = window.setInterval(() => {
      if (!this.done && !this.failed) this.phase = Math.min(3, this.phase + 1)
    }, 1800)

    const request = getProjectStartRequest()
    if (!request) {
      if (this.repository) {
        this.done = true
        this.phase = 3
        this.title = '저장소 준비 완료'
        this.message = '이미 생성된 학습 저장소가 있습니다.'
        return
      }
      this.$router.replace('/projects')
      return
    }

    try {
      this.repository = await startProject(request.project.id, request.payload)
      this.phase = 3
      this.done = true
      this.title = '저장소 준비 완료'
      this.message = 'GitHub 저장소와 첫 작업 브랜치가 생성되었습니다.'
    } catch (error) {
      this.failed = true
      this.needsLogin = error.message.includes('로그인')
      this.title = '저장소 생성 실패'
      this.message = error.message
    }
  },
  beforeDestroy() {
    window.clearInterval(this.timer)
  },
}
</script>

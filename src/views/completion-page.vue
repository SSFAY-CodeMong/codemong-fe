<template>
  <div class="app-shell">
    <AppHeader active-page="progress" />
    <main class="page completion-page">
      <section class="completion-hero">
        <span class="badge">{{ completed ? 'COMPLETED' : 'CHECKING' }}</span>
        <h1>프로젝트 완료</h1>
        <p>{{ message }}</p>
        <div class="toolbar">
          <button class="primary" type="button" @click="$router.push('/reports')">리포트 보기</button>
          <button class="secondary" type="button" @click="$router.push('/mission-progress')">진행 현황</button>
          <button class="secondary" type="button" @click="$router.push('/projects')">다른 프로젝트</button>
        </div>
      </section>
    </main>
    <AppFooter />
  </div>
</template>

<script>
import AppFooter from '../components/AppFooter.vue'
import AppHeader from '../components/AppHeader.vue'
import { getRepositoryCompleted, getSavedRepository } from '../api/codemong'

export default {
  name: 'CompletionPage',
  components: { AppFooter, AppHeader },
  data() {
    return {
      completed: false,
      message: '프로젝트 완료 상태를 확인하고 있습니다.',
    }
  },
  async created() {
    const repository = getSavedRepository()
    if (!repository) {
      this.message = '선택된 저장소가 없습니다. 진행 현황에서 프로젝트를 다시 선택하세요.'
      return
    }
    try {
      const result = await getRepositoryCompleted(repository.repositoryId)
      this.completed = result.completed
      this.message = result.completed
        ? '모든 스텝을 완료했습니다. 리포트 생성 로직이 연결되면 이 화면에서 리포트를 확인할 수 있습니다.'
        : '아직 완료 상태가 아닙니다. 진행 현황을 확인하세요.'
    } catch (error) {
      this.message = error.message
    }
  },
}
</script>

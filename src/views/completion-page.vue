<template>
  <div class="app-shell">
    <AppHeader active-page="progress" />
    <main class="page">
      <section class="panel">
        <h1>프로젝트 완료</h1>
        <p>{{ completed ? '모든 스텝을 완료했습니다.' : '아직 완료되지 않았습니다. 진행 현황을 확인하세요.' }}</p>
        <div class="toolbar">
          <button class="primary" type="button" @click="$router.push('/mission-progress')">진행 현황</button>
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
    return { completed: false }
  },
  async created() {
    const repository = getSavedRepository()
    if (repository) {
      const result = await getRepositoryCompleted(repository.repositoryId)
      this.completed = result.completed
    }
  },
}
</script>

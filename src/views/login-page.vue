<template>
  <div class="app-shell">
    <AppHeader />
    <main class="page">
      <section class="panel">
        <h1>GitHub 로그인</h1>
        <p>GitHub OAuth로 로그인하면 Codemong이 학습 저장소를 만들고 검사 워크플로를 실행할 수 있습니다.</p>
        <div class="toolbar">
          <button class="primary" type="button" @click="loginWithGithub">GitHub로 시작하기</button>
          <button class="secondary" type="button" @click="refresh">로그인 상태 확인</button>
        </div>
        <p class="muted">{{ message }}</p>
      </section>
    </main>
    <AppFooter />
  </div>
</template>

<script>
import AppFooter from '../components/AppFooter.vue'
import AppHeader from '../components/AppHeader.vue'
import { loginWithGithub, reissueToken } from '../api/codemong'

export default {
  name: 'LoginPage',
  components: { AppFooter, AppHeader },
  data() {
    return { message: '' }
  },
  methods: {
    loginWithGithub,
    async refresh() {
      try {
        await reissueToken()
        this.message = '로그인 상태가 확인되었습니다.'
        this.$router.push('/projects')
      } catch (error) {
        this.message = '로그인이 필요합니다.'
      }
    },
  },
}
</script>

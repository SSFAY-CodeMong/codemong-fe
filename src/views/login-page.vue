<template>
  <div class="app-shell">
    <AppHeader />
    <main class="page login-page">
      <div class="login-floating-background" aria-hidden="true">
        <img
          v-for="item in floatingMascots"
          :key="item.src"
          :src="item.src"
          :class="['login-floating-background__item', `slot-${item.slot}`]"
          alt=""
        />
      </div>
      <section class="login-card" aria-labelledby="login-title">
        <div class="login-card__visual">
          <img src="/mascot_login.png" alt="" />
        </div>
        <div class="login-card__body">
          <h1 id="login-title">CodeMong 로그인</h1>
          <p>GitHub 계정으로 학습 프로젝트를 시작하세요.</p>
          <button class="github-login-button" type="button" @click="loginWithGithub" :disabled="isLoggingIn">
            <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
              <path
                fill="currentColor"
                d="M12 2C6.48 2 2 6.58 2 12.24c0 4.53 2.87 8.37 6.84 9.73.5.09.68-.22.68-.49 0-.24-.01-1.04-.01-1.89-2.78.62-3.37-1.21-3.37-1.21-.45-1.18-1.11-1.49-1.11-1.49-.91-.64.07-.63.07-.63 1 .07 1.53 1.06 1.53 1.06.9 1.57 2.35 1.12 2.92.86.09-.67.35-1.12.64-1.38-2.22-.26-4.56-1.14-4.56-5.06 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.3.1-2.71 0 0 .84-.28 2.75 1.05A9.33 9.33 0 0 1 12 6.99c.85 0 1.7.12 2.5.34 1.9-1.33 2.74-1.05 2.74-1.05.55 1.41.2 2.45.1 2.71.64.72 1.03 1.63 1.03 2.75 0 3.93-2.34 4.8-4.57 5.05.36.32.68.94.68 1.9 0 1.38-.01 2.49-.01 2.83 0 .27.18.59.69.49A10.13 10.13 0 0 0 22 12.24C22 6.58 17.52 2 12 2Z"
              />
            </svg>
            <span>Github 로그인</span>
          </button>
        </div>
        <p class="muted">{{ message }}</p>
      </section>
      <div v-if="isLoggingIn" class="login-loading-backdrop" role="status" aria-live="polite">
        <div class="login-loading-card">
          <img src="/mascot_background11.png" alt="" />
          <strong>{{ loginLoadingText }}</strong>
        </div>
      </div>
    </main>
    <AppFooter />
  </div>
</template>

<script>
import AppFooter from '../components/AppFooter.vue'
import AppHeader from '../components/AppHeader.vue'
import { loginWithGithub as startGithubLogin, reissueToken } from '../api/codemong'

export default {
  name: 'LoginPage',
  components: { AppFooter, AppHeader },
  data() {
    return {
      message: '',
      floatingMascots: [],
      isLoggingIn: false,
      loadingStep: 1,
      loadingTimer: null,
      loadingRedirectTimer: null,
    }
  },
  created() {
    this.floatingMascots = this.pickFloatingMascots()
  },
  methods: {
    loginWithGithub() {
      if (this.isLoggingIn) return
      this.isLoggingIn = true
      this.loadingStep = 1
      this.loadingTimer = window.setInterval(() => {
        this.loadingStep = this.loadingStep === 3 ? 1 : this.loadingStep + 1
      }, 320)
      this.loadingRedirectTimer = window.setTimeout(() => {
        startGithubLogin()
      }, 1000)
    },
    pickFloatingMascots() {
      return Array.from({ length: 12 }, (_, index) => `/mascot_background${index + 1}.png`)
        .sort(() => Math.random() - 0.5)
        .slice(0, 5)
        .map((src, index) => ({
          src,
          slot: index + 1,
        }))
    },
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
  computed: {
    loginLoadingText() {
      return `로그인 중${'.'.repeat(this.loadingStep)}`
    },
  },
  beforeDestroy() {
    window.clearInterval(this.loadingTimer)
    window.clearTimeout(this.loadingRedirectTimer)
  },
}
</script>

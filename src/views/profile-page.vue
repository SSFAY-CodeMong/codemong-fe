<template>
  <div class="app-shell">
    <AppHeader active-page="profile" />
    <main class="page profile-page">
      <section class="profile-hero panel">
        <div class="profile-identity">
          <img
            class="profile-avatar"
            :src="avatarSrc"
            alt="사용자 프로필 이미지"
            @error="useDefaultAvatar"
          />
          <div>
            <span class="badge">My Profile</span>
            <h1>{{ user.name || 'GitHub User' }}</h1>
            <p>{{ displayEmail }}</p>
          </div>
        </div>
        <div class="toolbar">
          <button class="secondary" type="button" @click="loadUser" :disabled="loading">
            {{ loading ? '불러오는 중' : '새로고침' }}
          </button>
          <button class="secondary" type="button" @click="$router.push('/projects')">프로젝트로 이동</button>
        </div>
      </section>

      <section v-if="message" class="panel">
        <p class="status" :class="{ ok: messageType === 'ok', fail: messageType === 'fail' }">{{ message }}</p>
      </section>

      <section class="profile-layout">
        <article class="panel profile-detail-card">
          <div class="section-head profile-section-head">
            <div>
              <span class="badge">Account</span>
              <h2>사용자 정보</h2>
            </div>
          </div>
          <dl class="profile-info-list">
            <div>
              <dt>닉네임</dt>
              <dd>{{ user.name || '-' }}</dd>
            </div>
            <div>
              <dt>이메일</dt>
              <dd :class="{ muted: !hasEmail }">{{ displayEmail }}</dd>
            </div>
            <div>
              <dt>GitHub</dt>
              <dd>
                <a v-if="user.htmlUrl" :href="user.htmlUrl" target="_blank" rel="noreferrer">{{ user.htmlUrl }}</a>
                <span v-else>-</span>
              </dd>
            </div>
            <div>
              <dt>가입일</dt>
              <dd>{{ formatDate(user.createdAt) }}</dd>
            </div>
          </dl>
        </article>

        <aside class="panel profile-edit-card">
          <div>
            <span class="badge">Email Verification</span>
            <h2>이메일 변경</h2>
            <p>새 이메일로 인증 코드를 받은 뒤 3분 안에 변경을 완료하세요.</p>
          </div>

          <form class="form profile-email-form" @submit.prevent>
            <label>
              새 이메일
              <input
                v-model="emailDraft"
                type="email"
                placeholder="new-email@example.com"
                autocomplete="email"
                @input="handleEmailInput"
              />
            </label>
            <button class="secondary" type="button" @click="sendCode" :disabled="sendDisabled">
              {{ sending ? '발송 중' : '인증 코드 발송' }}
            </button>

            <div v-if="codeSent" class="verification-state">
              <span class="status" :class="{ ok: countdown > 0, fail: countdown <= 0 }">
                {{ countdownLabel }}
              </span>
              <p>인증 코드는 3분 동안 유효합니다.</p>
            </div>

            <label>
              인증 코드
              <input
                v-model.trim="verificationCode"
                type="text"
                inputmode="numeric"
                placeholder="123456"
                :disabled="!codeSent || countdown <= 0"
              />
            </label>
            <p
              v-if="verificationMessage"
              class="status profile-verification-message"
              :class="{ ok: verificationMessageType === 'ok', fail: verificationMessageType === 'fail' }"
            >
              {{ verificationMessage }}
            </p>
            <button class="secondary" type="button" @click="verifyCode" :disabled="verifyDisabled">
              {{ verifying ? '확인 중' : '인증 확인' }}
            </button>

            <button class="primary" type="button" @click="completeEmailChange" :disabled="completeDisabled">
              {{ saving ? '변경 중' : '이메일 변경 완료' }}
            </button>
          </form>
        </aside>
      </section>
    </main>
    <AppFooter />
  </div>
</template>

<script>
import AppFooter from '../components/AppFooter.vue'
import AppHeader from '../components/AppHeader.vue'
import { getMe, sendEmailCode, updateUserEmail, verifyEmailCode } from '../api/codemong'

const VERIFICATION_SECONDS = 180

export default {
  name: 'ProfilePage',
  components: { AppFooter, AppHeader },
  data() {
    return {
      user: {},
      emailDraft: '',
      pendingEmail: '',
      verificationCode: '',
      loading: false,
      sending: false,
      verifying: false,
      saving: false,
      codeSent: false,
      verified: false,
      countdown: 0,
      countdownTimer: null,
      message: '',
      messageType: '',
      verificationMessage: '',
      verificationMessageType: '',
    }
  },
  computed: {
    avatarSrc() {
      return this.user.profilePath || '/CodeMong_logo.png'
    },
    hasEmail() {
      return Boolean(this.user.email && String(this.user.email).trim())
    },
    displayEmail() {
      return this.hasEmail ? this.user.email : '이메일 미등록'
    },
    normalizedEmail() {
      return this.emailDraft.trim()
    },
    countdownLabel() {
      if (this.countdown <= 0) return '인증 시간이 만료되었습니다.'
      const minutes = String(Math.floor(this.countdown / 60)).padStart(2, '0')
      const seconds = String(this.countdown % 60).padStart(2, '0')
      return `남은 시간 ${minutes}:${seconds}`
    },
    sendDisabled() {
      return this.sending || !this.normalizedEmail
    },
    verifyDisabled() {
      return this.verifying ||
        !this.codeSent ||
        this.countdown <= 0 ||
        !this.verificationCode.trim() ||
        this.normalizedEmail !== this.pendingEmail
    },
    completeDisabled() {
      return this.saving ||
        !this.verified ||
        this.countdown <= 0 ||
        this.normalizedEmail !== this.pendingEmail
    },
  },
  created() {
    this.loadUser()
  },
  beforeDestroy() {
    this.clearCountdown()
  },
  methods: {
    async loadUser() {
      this.loading = true
      this.message = ''
      try {
        this.user = await getMe(true)
        this.emailDraft = this.user.email || ''
        window.dispatchEvent(new CustomEvent('codemong:user-updated', { detail: this.user }))
      } catch (error) {
        this.message = this.resolveErrorMessage(error)
        this.messageType = 'fail'
        this.$router.push('/login')
      } finally {
        this.loading = false
      }
    },
    async sendCode() {
      const email = this.normalizedEmail
      if (!email) return

      this.sending = true
      this.message = ''
      this.verificationMessage = ''
      this.verified = false
      this.verificationCode = ''
      try {
        await sendEmailCode(email)
        this.pendingEmail = email
        this.codeSent = true
        this.startCountdown()
        this.verificationMessage = '인증 코드가 발송되었습니다. 메일함을 확인해주세요.'
        this.verificationMessageType = 'ok'
      } catch (error) {
        this.verificationMessage = this.resolveErrorMessage(error)
        this.verificationMessageType = 'fail'
      } finally {
        this.sending = false
      }
    },
    async verifyCode() {
      const email = this.normalizedEmail
      const code = this.verificationCode.trim()
      if (!email || !code) return

      this.verifying = true
      this.message = ''
      this.verificationMessage = ''
      try {
        await verifyEmailCode(email, code)
        this.verified = true
        this.verificationMessage = '이메일 인증이 완료되었습니다. 3분 안에 변경을 완료하세요.'
        this.verificationMessageType = 'ok'
      } catch (error) {
        this.verified = false
        this.verificationMessage = this.resolveErrorMessage(error)
        this.verificationMessageType = 'fail'
      } finally {
        this.verifying = false
      }
    },
    async completeEmailChange() {
      const email = this.normalizedEmail
      if (!email || !this.verified) return

      this.saving = true
      this.message = ''
      try {
        await updateUserEmail(email)
        this.user = await getMe(true)
        this.emailDraft = this.user.email || ''
        this.resetVerification()
        window.dispatchEvent(new CustomEvent('codemong:user-updated', { detail: this.user }))
        this.message = '이메일이 변경되었습니다.'
        this.messageType = 'ok'
      } catch (error) {
        const resolvedMessage = this.resolveErrorMessage(error)
        if (this.isEmailVerificationError(error)) {
          this.verificationMessage = resolvedMessage
          this.verificationMessageType = 'fail'
        } else {
          this.message = resolvedMessage
          this.messageType = 'fail'
        }
      } finally {
        this.saving = false
      }
    },
    handleEmailInput() {
      if (this.normalizedEmail !== this.pendingEmail) {
        this.verified = false
        this.verificationMessage = ''
        this.verificationMessageType = ''
      }
    },
    startCountdown() {
      this.clearCountdown()
      this.countdown = VERIFICATION_SECONDS
      this.countdownTimer = window.setInterval(() => {
        this.countdown = Math.max(0, this.countdown - 1)
        if (this.countdown === 0) {
          this.verified = false
          this.clearCountdown()
        }
      }, 1000)
    },
    clearCountdown() {
      if (this.countdownTimer) {
        window.clearInterval(this.countdownTimer)
        this.countdownTimer = null
      }
    },
    resetVerification() {
      this.clearCountdown()
      this.pendingEmail = ''
      this.verificationCode = ''
      this.codeSent = false
      this.verified = false
      this.countdown = 0
      this.verificationMessage = ''
      this.verificationMessageType = ''
    },
    isEmailVerificationError(error) {
      const message = error && error.message ? error.message : ''
      return message.includes('EMAIL_VERIFICATION_FAILED') || message.includes('40022')
    },
    resolveErrorMessage(error) {
      const message = error && error.message ? error.message : ''
      if (message.includes('INVALID_EMAIL') || message.includes('40021')) return '이메일 형식을 확인해주세요.'
      if (message.includes('EMAIL_VERIFICATION_FAILED') || message.includes('40022')) return '인증 코드가 틀렸거나 만료되었습니다.'
      if (message.includes('EMAIL_SEND_FAILED') || message.includes('50220')) return '인증 메일 발송에 실패했습니다. 잠시 후 다시 시도해주세요.'
      if (message.includes('세션') || message.includes('로그인') || message.includes('401')) return '로그인이 만료되었습니다. 다시 로그인해주세요.'
      return message || '요청 처리 중 오류가 발생했습니다.'
    },
    formatDate(value) {
      if (!value) return '-'
      return new Date(value).toLocaleString()
    },
    useDefaultAvatar(event) {
      if (event.target.src.endsWith('/CodeMong_logo.png')) return
      event.target.src = '/CodeMong_logo.png'
    },
  },
}
</script>

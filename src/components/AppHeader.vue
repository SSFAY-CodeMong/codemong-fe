<template>
  <header class="app-header">
    <button class="brand" type="button" @click="$router.push('/')">
      <img class="brand-logo" src="/CodeMong_logo.png" alt="CodeMong" />
      <span class="brand-name">CodeMong</span>
    </button>
    <nav>
      <button
        v-for="item in navigation"
        :key="item.key"
        type="button"
        :class="{ active: isActive(item) }"
        @click="$router.push(item.path)"
      >
        {{ item.label }}
      </button>
    </nav>
    <div class="header-actions">
      <template v-if="user">
        <button class="user-chip" type="button" @click="$router.push('/profile')">
          <img
            class="user-chip__avatar"
            :src="userAvatarSrc"
            alt="사용자 프로필 이미지"
            @error="useDefaultAvatar"
          />
          <span>{{ user.name || user.email || 'GitHub User' }}</span>
        </button>
        <button class="secondary small" type="button" @click="logout">로그아웃</button>
      </template>
      <button v-else-if="checkedAuth" class="primary small" type="button" @click="$router.push('/login')">GitHub 로그인</button>
    </div>
  </header>
</template>

<script>
import { clearSession, getCachedUser, getMe, getNavigation, hasAccessToken, logout } from '../api/codemong'

export default {
  name: 'AppHeader',
  props: {
    activePage: {
      type: String,
      default: '',
    },
  },
  data() {
    const cachedUser = getCachedUser()
    return {
      navigation: getNavigation(),
      user: cachedUser,
      checkedAuth: Boolean(cachedUser) || !hasAccessToken(),
    }
  },
  async created() {
    if (!hasAccessToken()) {
      this.user = null
      this.checkedAuth = true
      return
    }

    try {
      this.user = await getMe()
    } catch (error) {
      this.user = null
    } finally {
      this.checkedAuth = true
    }
  },
  computed: {
    userAvatarSrc() {
      return this.user && this.user.profilePath ? this.user.profilePath : '/CodeMong_logo.png'
    },
  },
  mounted() {
    window.addEventListener('codemong:user-updated', this.handleUserUpdated)
  },
  beforeDestroy() {
    window.removeEventListener('codemong:user-updated', this.handleUserUpdated)
  },
  methods: {
    handleUserUpdated(event) {
      this.user = event.detail || getCachedUser()
    },
    isActive(item) {
      if (this.activePage) return item.key === this.activePage
      return this.$route.path === item.path || this.$route.path.startsWith(`${item.path}/`)
    },
    useDefaultAvatar(event) {
      if (event.target.src.endsWith('/CodeMong_logo.png')) return
      event.target.src = '/CodeMong_logo.png'
    },
    async logout() {
      try {
        await logout()
      } catch (error) {
        clearSession()
      }
      this.user = null
      if (this.$route.path !== '/') {
        this.$router.push('/')
      }
    },
  },
}
</script>

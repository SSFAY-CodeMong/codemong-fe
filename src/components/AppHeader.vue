<template>
  <header class="app-header">
    <button class="brand" type="button" @click="$router.push('/')">Codemong</button>
    <nav>
      <button
        v-for="item in navigation"
        :key="item.key"
        type="button"
        :class="{ active: item.key === activePage }"
        @click="$router.push(item.path)"
      >
        {{ item.label }}
      </button>
    </nav>
    <div class="header-actions">
      <template v-if="user">
        <span class="user-chip">{{ user.name || user.email || 'GitHub User' }}</span>
        <button class="secondary small" type="button" @click="logout">로그아웃</button>
      </template>
      <button v-else-if="checkedAuth" class="primary small" type="button" @click="$router.push('/login')">GitHub 로그인</button>
    </div>
  </header>
</template>

<script>
import { clearSession, getCachedUser, getMe, getNavigation, logout } from '../api/codemong'

export default {
  name: 'AppHeader',
  props: {
    activePage: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      navigation: getNavigation(),
      user: getCachedUser(),
      checkedAuth: Boolean(getCachedUser()),
    }
  },
  async created() {
    try {
      this.user = await getMe()
    } catch (error) {
      this.user = null
    } finally {
      this.checkedAuth = true
    }
  },
  methods: {
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

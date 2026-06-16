<template>
  <header class="codemong-header">
    <div class="codemong-header__inner">
      <button class="codemong-header__brand" type="button" @click="go('/')">
        {{ brandName }}
      </button>
      <nav class="codemong-header__nav" aria-label="주요 메뉴">
        <button
          v-for="item in navigation"
          :key="item.path"
          type="button"
          :class="{ 'is-active': item.key === activePage }"
          @click="go(item.path)"
        >
          {{ item.label }}
        </button>
      </nav>
      <div class="codemong-header__actions">
        <button
          class="codemong-header__icon-button"
          type="button"
          aria-label="내 미션"
          @click="go('/mission-workspace')"
        >
          <span>◎</span>
        </button>
        <button class="codemong-header__primary" type="button" @click="go('/login')">
          {{ ctaLabel }}
        </button>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: 'AppHeader',
  props: {
    activePage: {
      type: String,
      default: 'home',
    },
    brandName: {
      type: String,
      default: 'Codemong',
    },
    ctaLabel: {
      type: String,
      default: 'GitHub로 시작하기',
    },
    navigation: {
      type: Array,
      default: () => [
        { key: 'projects', label: '프로젝트', path: '/projects' },
        { key: 'mission', label: '내 미션', path: '/mission-workspace' },
        { key: 'progress', label: '진행 현황', path: '/mission-progress' },
        { key: 'help', label: '도움말', path: '/help' },
      ],
    },
  },
  methods: {
    go(path) {
      if (this.$route && this.$route.path === path) return
      this.$router.push(path)
    },
  },
}
</script>

<style scoped>
@import '../styles/components/app-header.css';
</style>

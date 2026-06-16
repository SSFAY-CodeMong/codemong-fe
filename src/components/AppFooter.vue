<template>
  <footer class="codemong-footer">
    <div class="codemong-footer__inner">
      <strong>{{ brandName }}</strong>
      <span>{{ copyright }}</span>
      <div class="codemong-footer__links">
        <button type="button" @click="go('/help')">이용약관</button>
        <button type="button" @click="go('/help')">개인정보 처리방침</button>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'AppFooter',
  props: {
    brandName: {
      type: String,
      default: 'Codemong',
    },
    copyright: {
      type: String,
      default: '© 2024 Codemong. GitHub 공식 API 연동을 사용합니다.',
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
@import '../styles/components/app-footer.css';
</style>

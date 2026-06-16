<template>
  <main class="help-page">
    <AppHeader active-page="help" :navigation="navigation" />

    <section class="help-page__hero">
      <p class="help-page__eyebrow">지원 센터</p>
      <h1>프로젝트 진행 중 막히는 지점을 빠르게 확인하세요</h1>
      <p>
        Codemong의 프로젝트 선택, 미션 진행, 검사 결과, AI 피드백 흐름을 한곳에서 정리했습니다.
      </p>
    </section>

    <section class="help-page__grid">
      <article class="help-page__card">
        <span>01</span>
        <h2>프로젝트 시작</h2>
        <p>프로젝트 목록에서 원하는 난이도와 기술 스택을 확인한 뒤 시작 스텝을 선택하세요.</p>
        <button type="button" @click="$router.push('/projects')">프로젝트 보기</button>
      </article>
      <article class="help-page__card">
        <span>02</span>
        <h2>미션 작성</h2>
        <p>요구사항과 예시 코드를 확인하고 GitHub에 코드를 푸시하면 검사 흐름으로 이동할 수 있습니다.</p>
        <button type="button" @click="$router.push('/mission-workspace')">워크스페이스 열기</button>
      </article>
      <article class="help-page__card">
        <span>03</span>
        <h2>검사와 피드백</h2>
        <p>테스트가 실패하면 실패한 요구사항과 AI 분석을 확인하고 다음 수정 방향을 잡으세요.</p>
        <button type="button" @click="$router.push('/frontend-ai-feedback')">AI 피드백 보기</button>
      </article>
    </section>
    <AppFooter />
  </main>
</template>

<script>
import AppFooter from '../components/AppFooter.vue'
import AppHeader from '../components/AppHeader.vue'
import { getNavigation } from '../api/codemong'

export default {
  name: 'HelpPage',
  components: {
    AppFooter,
    AppHeader,
  },
  data() {
    return {
      navigation: [],
    }
  },
  async created() {
    this.navigation = await getNavigation()
  },
  metaInfo: {
    title: '도움말',
    meta: [
      {
        property: 'og:title',
        content: '도움말',
      },
    ],
  },
}
</script>

<style scoped>
@import '../styles/views/help-page.css';
</style>

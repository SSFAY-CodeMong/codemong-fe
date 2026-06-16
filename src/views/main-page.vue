<template>
  <main class="main-page">
    <AppHeader active-page="home" :navigation="navigation" />

    <section class="main-page__hero">
      <div class="main-page__hero-copy">
        <p class="main-page__eyebrow">{{ page.eyebrow }}</p>
        <h1>
          {{ page.title }}
          <span>{{ page.titleAccent }}</span>
        </h1>
        <p class="main-page__lead">
          {{ page.lead }}
        </p>
        <div class="main-page__hero-actions">
          <button class="main-page__primary main-page__primary--large" type="button" @click="$router.push('/projects')">
            프로젝트 시작하기
          </button>
          <button class="main-page__secondary" type="button" @click="$router.push('/help')">
            진행 방식 보기
          </button>
        </div>
      </div>
      <div class="main-page__hero-panel" aria-label="Codemong 진행 예시">
        <div class="main-page__panel-top">
          <span>{{ page.heroStatus.label }}</span>
          <strong>{{ page.heroStatus.value }}</strong>
        </div>
        <div class="main-page__progress">
          <span :style="{ width: `${page.heroStatus.percent}%` }"></span>
        </div>
        <div class="main-page__checks">
          <div v-for="check in page.checks" :key="check.title">
            <strong>{{ check.title }}</strong>
            <span>{{ check.description }}</span>
          </div>
        </div>
      </div>
    </section>

    <section class="main-page__section">
      <div class="main-page__section-heading">
        <p>학습 흐름</p>
        <h2>{{ page.flowTitle }}</h2>
      </div>
      <div class="main-page__cards">
        <article v-for="flow in page.flows" :key="flow.number">
          <span>{{ flow.number }}</span>
          <h3>{{ flow.title }}</h3>
          <p>{{ flow.description }}</p>
        </article>
      </div>
    </section>

    <section class="main-page__metrics">
      <div v-for="metric in page.metrics" :key="metric.label">
        <strong>{{ metric.value }}</strong>
        <span>{{ metric.label }}</span>
      </div>
    </section>

    <AppFooter />
  </main>
</template>

<script>
import AppFooter from '../components/AppFooter.vue'
import AppHeader from '../components/AppHeader.vue'
import { getMainPage, getNavigation } from '../api/codemong'

export default {
  name: 'MainPage',
  components: {
    AppFooter,
    AppHeader,
  },
  props: {},
  data() {
    return {
      navigation: [],
      page: {
        eyebrow: '',
        title: '',
        titleAccent: '',
        lead: '',
        heroStatus: {
          label: '',
          value: '',
          percent: 0,
        },
        checks: [],
        flowTitle: '',
        flows: [],
        metrics: [],
      },
    }
  },
  async created() {
    const [navigation, page] = await Promise.all([getNavigation(), getMainPage()])
    this.navigation = navigation
    this.page = page
  },
  metaInfo: {
    title: 'Codemong',
    meta: [
      {
        property: 'og:title',
        content: 'Codemong',
      },
    ],
  },
}
</script>

<style scoped>
@import '../styles/views/main-page.css';
</style>

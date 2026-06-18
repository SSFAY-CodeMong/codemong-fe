<template>
  <div class="app-shell">
    <AppHeader />
    <main class="home-page">
      <section class="home-hero">
        <div class="home-hero__copy">
          <span class="badge">GitHub Actions 기반 미션 러너</span>
          <h1>Codemong</h1>
          <p>
            프로젝트를 고르면 학습 저장소와 브랜치를 만들고, 요구사항을 구현한 뒤 검사 결과로 다음 스텝을 여는 실습 환경입니다.
          </p>
          <div class="toolbar">
            <button class="primary" type="button" @click="$router.push('/projects')">프로젝트 시작</button>
            <button class="secondary" type="button" @click="$router.push('/mission-progress')">진행 현황</button>
          </div>
        </div>
        <div class="bubble-stage" aria-hidden="true">
          <div class="bubble bubble--repo">
            <strong>Repository</strong>
            <span>codemong-mmcafe-0</span>
          </div>
          <div class="bubble bubble--branch">
            <strong>Branch</strong>
            <span>mmcafe-step01</span>
          </div>
          <div class="bubble bubble--check">
            <strong>Check</strong>
            <span>GitHub Actions RUNNING</span>
          </div>
          <div class="bubble bubble--pass">
            <strong>Next Step</strong>
            <span>step02 unlocked</span>
          </div>
        </div>
      </section>

      <section class="page home-grid">
        <article class="card">
          <span class="badge">01</span>
          <h2>프로젝트 선택</h2>
          <p>백엔드/프론트 타입과 시작 스텝을 확인하고 GitHub 저장소 생성을 요청합니다.</p>
        </article>
        <article class="card">
          <span class="badge">02</span>
          <h2>미션 수행</h2>
          <p>생성된 저장소에서 TODO와 spec을 확인하고 코드를 push합니다.</p>
        </article>
        <article class="card">
          <span class="badge">03</span>
          <h2>검사와 진행</h2>
          <p>검사 요청은 checkId로 비동기 처리되고, 통과한 브랜치만 다음 스텝으로 이동합니다.</p>
        </article>
      </section>
    </main>
    <AppFooter />
  </div>
</template>

<script>
import AppFooter from '../components/AppFooter.vue'
import AppHeader from '../components/AppHeader.vue'

export default {
  name: 'MainPage',
  components: { AppFooter, AppHeader },
}
</script>

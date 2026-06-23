<template>
  <div class="app-shell">
    <AppHeader />
    <main class="home-page">
      <section class="home-hero">
        <div class="home-hero__copy">
          <span class="badge">AI 코드 리뷰 서비스</span>
          <h1>CodeMong</h1>
          <p>
            GitHub Repository를 선택하고 코드를 검사하면 Spring Boot 백엔드와 RAG 기반 AI가 코드 리뷰,
            실패 원인, 개선 피드백을 하나의 리포트로 정리합니다.
          </p>
          <div class="toolbar">
            <button class="primary" type="button" @click="$router.push('/projects')">Repository 검사 시작</button>
            <button class="secondary" type="button" @click="$router.push('/reports')">리뷰 리포트 보기</button>
          </div>
        </div>
        <div class="bubble-stage" aria-hidden="true">
          <div class="bubble bubble--repo">
            <strong>Repository</strong>
            <span>codemong-service-api</span>
          </div>
          <div class="bubble bubble--branch">
            <strong>Spring Review</strong>
            <span>Controller · Service · Repository</span>
          </div>
          <div class="bubble bubble--check">
            <strong>AI Review</strong>
            <span>RAG context matched</span>
          </div>
          <div class="bubble bubble--pass">
            <strong>Quality Score</strong>
            <span>92 / 100</span>
          </div>
        </div>
      </section>

      <section class="page home-grid">
        <article class="card">
          <span class="badge">01</span>
          <h2>Repository 선택</h2>
          <p>검사할 프로젝트와 트랙을 고르고 GitHub 저장소 기반 분석 흐름을 시작합니다.</p>
        </article>
        <article class="card">
          <span class="badge">02</span>
          <h2>자동 검사</h2>
          <p>테스트 실행 결과와 코드 변경 맥락을 수집해 AI 리뷰에 필요한 근거를 구성합니다.</p>
        </article>
        <article class="card">
          <span class="badge">03</span>
          <h2>리뷰 리포트</h2>
          <p>문제 원인, 개선 제안, 추가 질문 답변을 개발자가 읽기 쉬운 리포트로 제공합니다.</p>
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

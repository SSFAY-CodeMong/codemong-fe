에<template>
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

      <section class="home-grid" aria-labelledby="home-strength-title">
        <div class="home-grid__heading">
          <h2 id="home-strength-title"><span>코드몽</span>만의 강점</h2>
        </div>

        <div class="home-grid__cards">
          <article class="home-strength-card">
            <span class="home-strength-card__number">하나!</span>
            <h3>손쉬운 관리, 한 눈에 보는 기록</h3>
            <p>내가 검사한 레포지토리와 리뷰 결과를 모아 보고, 필요한 순간 다시 확인할 수 있습니다.</p>

          </article>
          <article class="home-strength-card">
            <span class="home-strength-card__number">둘!</span>
            <h3>편한 코드 입력, 자동화된 분석</h3>
            <p>GitHub 저장소를 선택하면 실행 결과와 코드 맥락을 바탕으로 AI 피드백을 제공합니다.</p>

          </article>
          <article class="home-strength-card">
            <span class="home-strength-card__number">셋!</span>
            <h3>질문으로 이어지는 깊은 피드백</h3>
            <p>단순한 정답 확인을 넘어, 왜 틀렸는지 RAG 기반 질의로 원인과 개선 방향을 분석합니다.</p>

          </article>
        </div>

        <img class="home-grid__mascot" src="/mascot_background12.png" alt="" aria-hidden="true" />
      </section>

      <FeatureCarousel
        eyebrow="CodeMong 활용법"
        title="레포지토리 검사부터 DailyMong까지 한 번에"
        description="개발 환경, 검사 결과, AI 질의, 학습 루틴을 하나의 흐름으로 연결합니다."
        :slides="showcaseSlides"
      />
    </main>
    <AppFooter />
  </div>
</template>

<script>
import AppFooter from '../components/AppFooter.vue'
import AppHeader from '../components/AppHeader.vue'
import FeatureCarousel from '../components/FeatureCarousel.vue'

export default {
  name: 'MainPage',
  components: { AppFooter, AppHeader, FeatureCarousel },
  data() {
    return {
      showcaseSlides: [
        {
          tag: 'Multi Platform',
          title: '모바일·데스크톱 어디서나 검사 실행',
          description:
            '기기나 화면 크기에 묶이지 않고 GitHub 레포지토리를 생성하고 코드 검사를 실행할 수 있습니다.',
          images: [{ src: '/dual-platform.png', alt: '모바일과 데스크톱에서 레포지토리 검사를 사용하는 화면' }],
        },
        {
          tag: 'Review Report',
          title: '실행 결과와 피드백을 리포트로 확인',
          description:
            '검사 실행 결과와 AI 피드백을 함께 정리해 실패 원인, 개선 방향, 다음 작업을 빠르게 파악합니다.',
          images: [
            { src: '/run_result.png', alt: '코드 검사 실행 결과 화면' },
            { src: '/run_report.png', alt: '코드 검사 피드백 리포트 화면' },
          ],
        },
        {
          tag: 'RAG Chat',
          title: '왜 틀렸는지 AI에게 바로 질문',
          description:
            '검사 맥락을 기반으로 한 RAG 질의를 통해 단순 결과를 넘어 원인과 수정 방향을 대화로 분석합니다.',
          images: [{ src: '/chat.png', alt: '검사 결과에 대해 질문하는 AI 채팅 화면' }],
        },
        {
          tag: 'DailyMong',
          title: 'CS 지식과 빈출 코드 문제를 꾸준히 학습',
          description:
            'DailyMong에서 CS 문제와 빈출 코드 문제를 풀고 피드백을 받으며, 등록한 메일로 주기적인 CS 지식도 받아볼 수 있습니다.',
          images: [{ src: '/dailymong.png', alt: 'DailyMong 학습 서비스 화면' }],
        },
      ],
    }
  },
}
</script>

<template>
  <div class="app-shell">
    <AppHeader />
    <main class="home-page home-page--redesign">
      <section class="home-hero-modern" data-guide="hero">
        <div class="home-hero-modern__copy">
          <span class="home-kicker">AI 코드 리뷰 학습 플랫폼</span>
          <h1>GitHub에 올린 코드가 곧 학습 코스가 됩니다.</h1>
          <p>
            프로젝트를 고르고, 레포지토리를 만들고, 테스트와 AI 리뷰를 한 흐름으로 받습니다.
            CodeMong은 실전 개발 방식에 가까운 단계형 학습 경험을 제공합니다.
          </p>
          <div class="home-actions">
            <button class="home-primary" type="button" @click="$router.push('/projects')">프로젝트 시작</button>
            <button class="home-secondary" type="button" @click="$router.push('/mission-progress')">진행 현황</button>
          </div>
        </div>

        <div class="home-hero-modern__visual">
          <img src="/mascot_background12.png" alt="CodeMong mascot" />
          <div class="home-status-card home-status-card--top">
            <span>GitHub Actions</span>
            <strong>12 tests passed</strong>
          </div>
          <div class="home-status-card home-status-card--bottom">
            <span>AI Review</span>
            <strong>구조 개선 포인트 4개 발견</strong>
          </div>
        </div>
      </section>

      <section class="home-wide-panel" data-guide="summary">
        <article>
          <span>Repository</span>
          <strong>자동 생성</strong>
          <p>프로젝트 선택 후 학습용 GitHub repo와 starter 코드를 준비합니다.</p>
        </article>
        <article>
          <span>Code Check</span>
          <strong>CI 검사</strong>
          <p>GitHub Actions로 테스트를 실행하고 실패 테스트를 수집합니다.</p>
        </article>
        <article>
          <span>AI Feedback</span>
          <strong>맥락 리뷰</strong>
          <p>요구사항, 사용자 코드, 테스트 결과를 묶어 리뷰를 생성합니다.</p>
        </article>
        <article>
          <span>Operation</span>
          <strong>운영 관리</strong>
          <p>관리자 대시보드에서 진행 상황과 작업 로그를 확인합니다.</p>
        </article>
      </section>

      <section class="preference-section" data-guide="swipe">
        <div class="section-heading">
          <span class="home-kicker">Preference Learning</span>
          <h2>스와이프로 학습 취향을 알려주세요</h2>
          <p>좋아하는 주제를 오른쪽, 덜 끌리는 주제를 왼쪽으로 넘기면 추천 힌트를 저장합니다.</p>
        </div>

        <div class="preference-layout">
          <div class="swipe-deck" @touchstart="startDrag" @touchmove="moveDrag" @touchend="endDrag">
            <article
              v-for="(card, index) in visibleCards"
              :key="card.id"
              class="swipe-card"
              :class="{ active: index === 0 }"
              :style="cardStyle(index)"
              @mousedown="startDrag"
            >
              <img :src="card.image" :alt="card.title" draggable="false" />
              <div class="swipe-card__content">
                <div>
                  <span>{{ card.track }} · {{ card.level }}</span>
                  <h3>{{ card.title }}</h3>
                  <p>{{ card.summary }}</p>
                </div>
                <div class="swipe-card__tags">
                  <i v-for="tag in card.tags" :key="tag">{{ tag }}</i>
                </div>
              </div>
            </article>
            <div v-if="!visibleCards.length" class="swipe-empty">
              <strong>취향 학습 완료</strong>
              <p>저장된 선호도를 바탕으로 프로젝트 선택 화면에서 더 빠르게 고를 수 있어요.</p>
              <button type="button" class="home-secondary" @click="resetPreferenceDeck">다시 학습</button>
            </div>
          </div>

          <aside class="preference-result">
            <span>현재 추천 방향</span>
            <h3>{{ preferenceSummary.title }}</h3>
            <p>{{ preferenceSummary.description }}</p>
            <div class="preference-score">
              <b>{{ preferenceStats.likes }}</b>
              <small>좋아요</small>
              <b>{{ preferenceStats.dislikes }}</b>
              <small>넘김</small>
            </div>
            <div class="swipe-actions">
              <button type="button" class="swipe-no" @click="swipe('left')">관심 낮음</button>
              <button type="button" class="swipe-yes" @click="swipe('right')">좋아요</button>
            </div>
          </aside>
        </div>
      </section>

      <section class="home-feature-band">
        <div class="section-heading">
          <span class="home-kicker">Learning Flow</span>
          <h2>학습 흐름은 짧고, 피드백은 깊게</h2>
        </div>
        <div class="flow-grid">
          <article v-for="flow in flows" :key="flow.title">
            <img :src="flow.image" :alt="flow.title" />
            <span>{{ flow.step }}</span>
            <h3>{{ flow.title }}</h3>
            <p>{{ flow.description }}</p>
          </article>
        </div>
      </section>

      <FeatureCarousel
        eyebrow="CodeMong 활용법"
        title="레포지토리 검사부터 DailyMong까지 한 번에"
        description="개발 환경, 검사 결과, AI 질의, 학습 루틴을 하나의 흐름으로 연결합니다."
        :slides="showcaseSlides"
      />

      <section v-if="showGuide" class="page-guide" role="dialog" aria-modal="true">
        <div class="page-guide__backdrop" @click="closeGuide"></div>
        <article class="page-guide__card">
          <span>처음 오셨나요?</span>
          <h2>{{ guideSteps[guideIndex].title }}</h2>
          <p>{{ guideSteps[guideIndex].description }}</p>
          <div class="page-guide__steps">
            <i v-for="(_, index) in guideSteps" :key="index" :class="{ active: index === guideIndex }"></i>
          </div>
          <div class="page-guide__actions">
            <button type="button" class="home-secondary" @click="closeGuide">그만 보기</button>
            <button type="button" class="home-primary" @click="nextGuide">
              {{ guideIndex === guideSteps.length - 1 ? '시작하기' : '다음' }}
            </button>
          </div>
        </article>
      </section>
    </main>
    <AppFooter />
  </div>
</template>

<script>
import AppFooter from '../components/AppFooter.vue'
import AppHeader from '../components/AppHeader.vue'
import FeatureCarousel from '../components/FeatureCarousel.vue'
import { getProjectPreferenceCards } from '../api/codemong'

const GUIDE_KEY = 'codemong_home_guide_seen'
const PREFERENCE_KEY = 'codemong_preference_learning'

const fallbackPreferenceCards = [
  {
    id: 'spring-api',
    title: 'Spring API 리팩토링',
    summary: 'Controller, Service, Repository 계층을 정리하며 백엔드 구조를 학습합니다.',
    track: 'BE',
    level: '입문-중급',
    image: '/run_report.png',
    tags: ['Spring', 'REST API', 'Layered'],
  },
  {
    id: 'jpa-lab',
    title: 'JPA 연관관계 실험실',
    summary: '엔티티 관계, cascade, 트랜잭션 흐름을 작은 실습으로 익힙니다.',
    track: 'BE',
    level: '중급',
    image: '/dual-platform.png',
    tags: ['JPA', 'Entity', 'Transaction'],
  },
  {
    id: 'rag-review',
    title: 'AI 코드 리뷰 챌린지',
    summary: '검사 결과와 코드 맥락을 바탕으로 AI 피드백을 개선하는 흐름을 경험합니다.',
    track: 'AI',
    level: '중급',
    image: '/chat.png',
    tags: ['AI Review', 'RAG', 'Feedback'],
  },
  {
    id: 'daily-mong',
    title: 'DailyMong 루틴 학습',
    summary: '메일 기반 CS 문제와 코드 문제를 꾸준히 풀며 학습 루틴을 만듭니다.',
    track: 'CS',
    level: '입문',
    image: '/dailymong.png',
    tags: ['CS', 'Mail', 'Routine'],
  },
]

export default {
  name: 'MainPage',
  components: { AppFooter, AppHeader, FeatureCarousel },
  data() {
    return {
      preferenceCards: fallbackPreferenceCards,
      swipedCards: [],
      drag: {
        active: false,
        startX: 0,
        deltaX: 0,
      },
      guideIndex: 0,
      showGuide: false,
      guideSteps: [
        {
          title: '한 화면에서 전체 흐름을 볼 수 있어요',
          description: '넓어진 메인 화면에서 프로젝트 생성, 코드 검사, AI 피드백, 운영 기능을 빠르게 훑어볼 수 있습니다.',
        },
        {
          title: '스와이프로 취향을 학습해요',
          description: '관심 있는 학습 주제를 오른쪽으로 넘기면 브라우저에 선호도가 저장됩니다.',
        },
        {
          title: '바로 프로젝트를 시작하세요',
          description: '선호도를 참고해 프로젝트를 고르고 GitHub 기반 실습을 시작할 수 있습니다.',
        },
      ],
      flows: [
        {
          step: '01',
          title: '프로젝트 선택',
          description: 'BE, FE, AI, CS 흐름 중 원하는 학습 코스를 선택합니다.',
          image: '/mascot_background1.png',
        },
        {
          step: '02',
          title: '레포지토리 생성',
          description: 'GitHub repository와 starter branch를 자동으로 준비합니다.',
          image: '/mascot_background4.png',
        },
        {
          step: '03',
          title: '검사와 리뷰',
          description: 'GitHub Actions와 AI 리뷰가 코드의 문제와 개선 방향을 알려줍니다.',
          image: '/mascot_background8.png',
        },
      ],
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
  computed: {
    visibleCards() {
      return this.preferenceCards.filter(card => !this.swipedCards.includes(card.id)).slice(0, 3)
    },
    preferenceStats() {
      const saved = this.readPreference()
      return {
        likes: saved.likes.length,
        dislikes: saved.dislikes.length,
      }
    },
    preferenceSummary() {
      const saved = this.readPreference()
      const likedCards = this.preferenceCards.filter(card => saved.likes.includes(card.id))
      if (!likedCards.length) {
        return {
          title: '아직 탐색 중',
          description: '좋아요를 누르면 관심 트랙과 키워드를 바탕으로 추천 힌트를 만들어요.',
        }
      }
      const tagCounts = likedCards.flatMap(card => card.tags).reduce((acc, tag) => {
        acc[tag] = (acc[tag] || 0) + 1
        return acc
      }, {})
      const topTag = Object.entries(tagCounts).sort((a, b) => b[1] - a[1])[0][0]
      return {
        title: `${topTag} 중심 학습`,
        description: '선호도가 저장되었습니다. 프로젝트 선택 화면에서 이 관심사를 기준으로 살펴보세요.',
      }
    },
  },
  created() {
    this.loadPreferenceCards()
    this.showGuide = window.localStorage.getItem(GUIDE_KEY) !== 'true'
  },
  mounted() {
    window.addEventListener('mousemove', this.moveDrag)
    window.addEventListener('mouseup', this.endDrag)
  },
  beforeDestroy() {
    window.removeEventListener('mousemove', this.moveDrag)
    window.removeEventListener('mouseup', this.endDrag)
  },
  methods: {
    async loadPreferenceCards() {
      try {
        const cards = await getProjectPreferenceCards()
        if (Array.isArray(cards) && cards.length) this.preferenceCards = cards
      } catch (error) {
        this.preferenceCards = fallbackPreferenceCards
      }
    },
    readPreference() {
      try {
        return JSON.parse(window.localStorage.getItem(PREFERENCE_KEY)) || { likes: [], dislikes: [] }
      } catch (error) {
        return { likes: [], dislikes: [] }
      }
    },
    writePreference(next) {
      window.localStorage.setItem(PREFERENCE_KEY, JSON.stringify(next))
    },
    cardStyle(index) {
      if (index !== 0) {
        return {
          transform: `translateY(${index * 14}px) scale(${1 - index * 0.04})`,
          zIndex: 4 - index,
        }
      }
      const rotate = this.drag.deltaX / 16
      return {
        transform: `translateX(${this.drag.deltaX}px) rotate(${rotate}deg)`,
        zIndex: 5,
      }
    },
    startDrag(event) {
      if (!this.visibleCards.length) return
      this.drag.active = true
      this.drag.startX = this.pointerX(event)
      this.drag.deltaX = 0
    },
    moveDrag(event) {
      if (!this.drag.active) return
      this.drag.deltaX = this.pointerX(event) - this.drag.startX
    },
    endDrag() {
      if (!this.drag.active) return
      const delta = this.drag.deltaX
      this.drag.active = false
      this.drag.deltaX = 0
      if (Math.abs(delta) > 90) {
        this.swipe(delta > 0 ? 'right' : 'left')
      }
    },
    pointerX(event) {
      if (event.touches && event.touches[0]) return event.touches[0].clientX
      return event.clientX
    },
    swipe(direction) {
      const card = this.visibleCards[0]
      if (!card) return
      const saved = this.readPreference()
      const key = direction === 'right' ? 'likes' : 'dislikes'
      const opposite = direction === 'right' ? 'dislikes' : 'likes'
      saved[opposite] = saved[opposite].filter(id => id !== card.id)
      if (!saved[key].includes(card.id)) saved[key].push(card.id)
      this.writePreference(saved)
      this.swipedCards.push(card.id)
    },
    resetPreferenceDeck() {
      this.swipedCards = []
      this.writePreference({ likes: [], dislikes: [] })
    },
    nextGuide() {
      if (this.guideIndex >= this.guideSteps.length - 1) {
        this.closeGuide()
        return
      }
      this.guideIndex += 1
    },
    closeGuide() {
      window.localStorage.setItem(GUIDE_KEY, 'true')
      this.showGuide = false
    },
  },
}
</script>

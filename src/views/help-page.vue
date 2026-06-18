<template>
  <div class="app-shell">
    <AppHeader active-page="help" />
    <main class="help-docs">
      <section class="help-hero">
        <div>
          <span class="badge">Codemong Docs</span>
          <h1>막히는 지점을 빠르게 찾고 해결하세요</h1>
          <p>로그인, 저장소 생성, 검사 실패, Spring 구현 실수까지 실습 중 자주 만나는 문제를 문서형으로 정리했습니다.</p>
        </div>
        <div class="help-search">
          <label>
            문서 검색
            <input v-model="query" type="search" placeholder="예: CORS, 테스트 실패, JPA lazy" />
          </label>
        </div>
      </section>

      <section class="page docs-layout">
        <aside class="docs-nav">
          <button
            v-for="tab in tabs"
            :key="tab.key"
            type="button"
            :class="{ active: activeTab === tab.key }"
            @click="activeTab = tab.key"
          >
            {{ tab.label }}
          </button>
        </aside>

        <section class="docs-content">
          <article v-for="item in filteredItems" :key="item.title" class="doc-card">
            <button type="button" @click="toggle(item.title)">
              <span>{{ item.title }}</span>
              <strong>{{ openItems[item.title] ? '-' : '+' }}</strong>
            </button>
            <div v-if="openItems[item.title]" class="doc-card__body">
              <p>{{ item.description }}</p>
              <pre v-if="item.code"><code>{{ item.code }}</code></pre>
              <ul class="check-list">
                <li v-for="tip in item.tips" :key="tip">{{ tip }}</li>
              </ul>
            </div>
          </article>
        </section>
      </section>
    </main>
    <AppFooter />
  </div>
</template>

<script>
import AppFooter from '../components/AppFooter.vue'
import AppHeader from '../components/AppHeader.vue'

const docs = {
  flow: [
    {
      title: '프로젝트 시작 흐름',
      description: '프로젝트 선택 후 시작 스텝을 고르면 로딩 페이지에서 GitHub 저장소 생성과 starter 코드 복사를 수행합니다.',
      tips: ['GitHub 로그인 후 시작하세요.', '생성 중에는 페이지를 닫지 않는 편이 좋습니다.', '완료되면 미션 워크스페이스로 이동합니다.'],
    },
    {
      title: '통과 후 다음 스텝 이동',
      description: '검사를 통과하면 현재 브랜치가 success 상태로 저장됩니다. 다시 미션 페이지에 와도 다음 스텝 버튼이 유지됩니다.',
      tips: ['다음 스텝 이동은 현재 브랜치가 통과 상태일 때만 가능합니다.', '새 브랜치가 생성되면 상태가 다시 진행 중으로 바뀝니다.'],
    },
  ],
  issues: [
    {
      title: 'Failed to fetch',
      description: '브라우저가 백엔드에 연결하지 못했거나 OAuth 세션이 없는 상태에서 보호 API를 호출할 때 발생합니다.',
      tips: ['백엔드 8080 포트가 실행 중인지 확인하세요.', 'GitHub 로그인 후 다시 시도하세요.', 'CORS origin이 8081을 허용하는지 확인하세요.'],
    },
    {
      title: 'GitHub Actions dispatch 실패',
      description: 'answer repository 토큰 권한, workflow 파일명, target repository 접근 권한 중 하나가 맞지 않을 때 발생합니다.',
      tips: ['GITHUB_ANSWER_TOKEN에 workflow 권한이 필요합니다.', '사용자 토큰에는 repo/workflow 권한이 필요합니다.', '백엔드 콘솔의 dispatch status/body를 확인하세요.'],
    },
    {
      title: 'JPA lazy no session',
      description: '트랜잭션 밖에서 LAZY 연관 엔티티를 읽으면 발생합니다.',
      code: '@Query("select r from GithubRepository r join fetch r.project where r.id = :id")',
      tips: ['응답 DTO 변환 전에 fetch join으로 필요한 필드를 로딩하세요.', '비동기 스레드에서는 트랜잭션 범위를 새로 고려해야 합니다.'],
    },
  ],
  mistakes: [
    {
      title: 'Controller에서 Entity 직접 반환',
      description: 'LAZY 프록시, 순환 참조, 불필요한 필드 노출 문제가 생깁니다.',
      code: 'return ResponseEntity.ok(ProjectResponse.from(project));',
      tips: ['DTO로 변환하세요.', '필요한 연관 데이터는 service/repository에서 명시적으로 로딩하세요.'],
    },
    {
      title: '검사 실패 로그를 숨기는 catch',
      description: '비동기 작업에서 예외 메시지를 저장하지 않으면 프론트에는 ERROR만 보입니다.',
      code: 'catch (Exception e) {\n  log.error("Async check failed", e);\n  asyncCheck.fail(resolveErrorMessage(e));\n}',
      tips: ['사용자 메시지와 개발자 로그를 분리하세요.', 'CustomException은 ErrorCode 메시지를 내려주세요.'],
    },
    {
      title: '테스트 전 브랜치 push 누락',
      description: '검사는 원격 브랜치 SHA를 기준으로 실행되므로 로컬 변경만 있으면 반영되지 않습니다.',
      tips: ['코드 수정 후 commit/push 하세요.', 'GitHub 저장소에서 브랜치 최신 커밋을 확인하세요.'],
    },
  ],
}

export default {
  name: 'HelpPage',
  components: { AppFooter, AppHeader },
  data() {
    return {
      query: '',
      activeTab: 'flow',
      openItems: {},
      tabs: [
        { key: 'flow', label: '학습 흐름' },
        { key: 'issues', label: '자주 겪는 문제' },
        { key: 'mistakes', label: '자주 하는 실수' },
      ],
    }
  },
  computed: {
    filteredItems() {
      const keyword = this.query.trim().toLowerCase()
      return docs[this.activeTab].filter(item => {
        if (!keyword) return true
        return `${item.title} ${item.description} ${item.tips.join(' ')}`.toLowerCase().includes(keyword)
      })
    },
  },
  methods: {
    toggle(title) {
      this.$set(this.openItems, title, !this.openItems[title])
    },
  },
}
</script>

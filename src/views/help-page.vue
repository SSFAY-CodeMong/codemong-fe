<template>
  <div class="app-shell">
    <AppHeader active-page="help" />
    <main class="help-docs">
      <section class="help-hero">
        <div>
          <span class="badge">Codemong Docs</span>
          <h1>CodeMong 서비스에 <br/>대해 알아볼까요?</h1>
          <p>CodeMong 서비스에 대한 설명과 자주 겪는 문제, 자주 하는 실수를 정리해놨습니다..</p>
        </div>
        <div class="help-search">
          <label>
            문서 검색
            <input v-model="query" type="search" placeholder="예: 프로젝트, 검사, 리포트" />
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
      title: 'CodeMong 이용 방법',
      description: 'CodeMong을 이용하는 방법을 자세히 알아볼까요?',
      tips: ['GitHub 로그인 후 시작하세요.',
        '원하는 프로젝트를 생성해보세요.',
        '본인 GitHub 계정에 저장소가 생성되는지 확인하세요.',
        '생성된 레포지토리를 로컬 환경에 클론하세요.',
        'git branch -a로 origin에 브랜치가 생성됐는지 확인하세요.',
        'git checkout {branchName}으로 코드를 받아오세요.',
        '코드 수정 후 commit/push 하세요. 검사는 원격 브랜치 SHA를 기준으로 실행됩니다.',
        '검사하기를 눌러 검사를 시작하세요.',
        '검사 결과를 확인하고 코드와 관련된 궁금한 점을 추가로 질문해보세요',
        '검사가 성공적으로 통과되면 다음 스텝으로 이동하세요.',
        '프로젝트가 완성될 때까지 반복하세요.',
        '프로젝트를 완료하면 CodeMong이 프로젝트 리포트를 생성해드려요'
      ],
    },
    {
      title: '이전 스텝으로 돌아가기 불가능',
      description: 'CodeMong 서비스는 이전 스텝을 다시 진행할 수 없어요.',
      tips: ['다음 스탭으로 넘어가기를 누르면 현재 스탭의 채점 결과가 저장되고, 현재 스탭을 다시 진행할 수 없어요.',
        '미션으로 돌아가기를 선택하면 원하는 만큼 스탭을 반복해서 진행할 수 있어요.'
      ]
    },
    {
      title: '최종 점수 측정 방식',
      description: '프로젝트의 최종 점수는 이렇게 측정돼요.',
      tips: ['각 스탭들을 완료하면 스탭별로 점수와 평가가 저장돼요.',
        '각 스탭들의 평가 내용과 점수를 종합하여 최종 리포트가 작성돼요.'
      ],
    },
    {
      title: '프로젝트 삭제',
      description: 'CodeMong 서비스에서 프로젝트 삭제를 하면 어떻게 될까요?',
      tips: ['CodeMong 서비스는 사용자의 깃허브와 연동되어 동작하는 서비스입니다.',
        '서비스에서 프로젝트를 삭제하면 사용자의 깃허브에 생성된 레포지토리도 함께 삭제됩니다.',
        '프로젝트 삭제는 신중하게 진행해주세요.'
      ]
    },
  ],
  issues: [
    {
      title: '리포트가 보이지 않아요.',
      description: '최종 스탭을 완료한 프로젝트에 대한 리포트가 보이지 않나요?',
      tips: [
        '프로젝트의 최종 스탭을 통과하면 자동으로 리포트 생성이 시작됩니다.',
        '리포트 생성에는 시간이 걸릴 수 있으니 잠시 기다려주세요.',
        '잠시 기다린 뒤 새로고침을 눌러서 리포트를 확인해보세요.'
        ],
    },
    {
      title: 'AI 답변이 이상해요.',
      description: 'AI가 제공하는 답변이 이상한가요?',
      tips: ['CodeMong에서 제공하는 AI는 사용자의 코드를 기반으로 답변을 생성합니다.',
        'AI가 제공하는 답변이 이상하거나 이해가 되지 않는다면, 코드에 대한 설명을 추가로 작성해보세요.',
        '더 정확한 답변을 원한다면 궁금한 코드 부분을 직접 붙여넣는것도 도움이 됩니다.'
      ]
      ,
    },
    {
      title: '검사하기가 오래 걸려요.',
      description: '검사하기를 요청했는데 너무 오래걸리나요?',
      tips: ['검사하기 과정은 2가지 과정으로 이루어져있어요.',
        '사용자의 코드를 Github Actions를 통해 빌드하고 테스트하는 과정이 있어요.',
        '사용자의 코드를 기반으로 AI가 답변을 생성하는 과정이 있어요.',
        '꼼꼼한 코드 검사와 양질의 답변을 제공하기 위해 시간이 오래 걸릴 수 있으니 조금만 더 기다려주세요.'
      ],
    },
  ],
  mistakes: [
    {
      title: '코드가 보이지 않아요.',
      description: 'Github에서 클론해온 레포지토리가 텅텅 비어있나요?',
      tips: ['CodeMong에서 제공하는 레포지토리는 단계별로 브랜치가 생성되어 있어요.',
        '도움말 > 학습 흐름 > CodeMong 학습 방법 을 참고하여 프로젝트를 진행하세요.',
        '그래도 해결되지 않는다면 미션탭에서 프로젝트를 삭제하고 다시 생성해주세요.'

      ],
    },
    {
      title: '검사하기 결과가 이상해요.',
      description: '코드를 꼼꼼히 작성했는데 자꾸 테스트가 실패하나요?',
      tips: ['CodeMong의 검사하기는 원격 브랜치의 코드를 기준으로 실행됩니다.',
        '작성한 코드가 로컬에만 존재하고 원격 브랜치에 push되지 않았다면 검사하기 결과가 실패할 수 있어요.',
        'git add, git commit, git push를 통해 원격 브랜치에 코드를 반영한 후 검사하기를 다시 시도해보세요.',
        '그래도 해결되지 않는 부분은 AI에게 질문을 남겨보세요. AI가 코드와 관련된 문제를 분석하고 답변을 제공해드려요.'

      ],
    },
    {
      title: 'CodeMong 서비스가 잘 동작하지 않아요.',
      description: 'CodeMong 서비스 이용 중에 문제가 발생했나요?',
      tips: ['CodeMong 서비스는 사용자의 GitHub 계정과 연동되어 동작하는 서비스입니다.',
        'CodeMong 서비스의 대상이 되는 레포지토리가 사용자의 GitHub에 존재하는지 확인해주세요.',
        '존재하지 않는다면 CodeMong 서비스에서 해당 프로젝트를 삭제하고 새로 생성해주세요.'
      ],
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

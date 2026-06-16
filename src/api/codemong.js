const delay = (payload, timeout = 120) =>
  new Promise((resolve) => {
    window.setTimeout(() => resolve(payload), timeout)
  })

const navigation = [
  { key: 'projects', label: '프로젝트', path: '/projects' },
  { key: 'mission', label: '내 미션', path: '/mission-workspace' },
  { key: 'progress', label: '진행 현황', path: '/mission-progress' },
  { key: 'help', label: '도움말', path: '/help' },
]

export const getNavigation = () => delay(navigation)

export const getMainPage = () =>
  delay({
    eyebrow: '실전 프로젝트 기반 학습',
    title: '시작이 부담스러운 프로젝트,',
    titleAccent: 'Codemong에서 바로 완성하세요',
    lead: '프로젝트 선택부터 GitHub 레포지토리 생성, 미션 진행, 테스트 검사, AI 피드백까지 하나의 흐름으로 연결합니다.',
    heroStatus: {
      label: '오늘의 미션',
      value: '3 / 10 단계',
      percent: 42,
    },
    checks: [
      { title: '요구사항 분석', description: 'spec.md 기반 체크리스트 생성' },
      { title: '자동 검사', description: 'GitHub Actions와 테스트 결과 수집' },
      { title: 'AI 피드백', description: '실패 원인과 수정 방향 제안' },
    ],
    flowTitle: '프로젝트를 끝까지 밀고 가는 데 필요한 화면을 모두 연결했습니다',
    flows: [
      { number: '01', title: '프로젝트 선택', description: '난이도, 기술 스택, 단계 수를 보고 지금 도전할 프로젝트를 고릅니다.' },
      { number: '02', title: '미션 진행', description: '요구사항과 예시 코드를 확인하고 GitHub에 작업 내용을 반영합니다.' },
      { number: '03', title: '검사와 AI 분석', description: '테스트 실패 지점과 수정 제안을 확인하며 다음 단계로 넘어갑니다.' },
    ],
    metrics: [
      { value: '10+', label: '단계별 미션' },
      { value: '자동', label: '레포지토리 생성' },
      { value: 'AI', label: '실패 원인 분석' },
    ],
  })

export const getProjects = () =>
  delay({
    title: '프로젝트',
    description: '도전할 프로젝트를 선택하고 학습을 시작하세요.',
    selectedId: 'board',
    projects: [
      {
        id: 'coffee',
        title: '카페 주문 시스템',
        difficulty: '중간',
        category: '백엔드',
        steps: 24,
        description: '실시간 주문 처리와 상태 관리를 위한 비동기 통신 및 복잡한 상태 관리 패턴을 학습합니다.',
        goals: ['주문 상태 모델링', '비동기 API 설계', '운영자 화면 상태 동기화'],
        stacks: ['Spring Boot', 'JPA', 'Redis', 'MySQL'],
      },
      {
        id: 'comments',
        title: '댓글/검증 미션',
        difficulty: '높음',
        category: '풀스택',
        steps: 18,
        description: '계층형 데이터 구조 설계와 보안을 고려한 입력값 검증 로직을 구현합니다.',
        goals: ['대댓글 구조 설계', '입력값 검증', '권한 기반 수정/삭제'],
        stacks: ['Vue', 'Node.js', 'PostgreSQL', 'JWT'],
      },
      {
        id: 'board',
        title: '게시판 만들기',
        difficulty: '낮음',
        category: '프론트엔드',
        steps: 5,
        description: '사용자가 글을 작성, 조회, 수정, 삭제할 수 있는 기본적인 게시판 인터페이스를 구현합니다. 컴포넌트 분리와 상태 관리의 기초를 다집니다.',
        goals: ['Vue를 활용한 컴포넌트 기반 UI 설계', 'RESTful API 연동 및 비동기 상태 관리', 'CSS를 이용한 반응형 레이아웃 구현'],
        stacks: ['Vue', 'JavaScript', 'CSS', 'Pinia'],
      },
    ],
  })

export const getMissionWorkspace = () =>
  delay({
    projectName: '파이썬 기초 마스터',
    progressText: '4/10',
    steps: ['1. 환경 설정', '2. 변수와 타입', '3. 조건문 제어', '4. 함수 작성하기', '5. 리스트 다루기'],
    successTitle: '축하합니다! 모든 테스트를 통과했습니다.',
    successMessage: '작성하신 코드가 요구사항을 완벽하게 충족했습니다. 훌륭한 작업입니다!',
    missionBadge: '미션 4',
    missionTitle: '간단한 계산기 함수 만들기',
    missionDescription: '두 개의 숫자를 입력받아 그 합을 반환하는 add_numbers 함수를 완성하세요.',
    requirements: [
      '함수 이름이 add_numbers인가?',
      '두 개의 매개변수(a, b)를 입력 받는가?',
      '반환값이 두 매개변수의 합과 정확히 일치하는가?',
      '음수 및 0에 대한 엣지 케이스 테스트 통과',
    ],
    fileName: 'main.py',
    status: '통과',
  })

export const getMissionProgress = () =>
  delay({
    stepBadge: '3단계',
    projectName: 'React 대시보드',
    title: '인증 및 상태 관리 구현',
    description: '사용자 인증 흐름을 구현하고 전역 상태를 관리하는 방법을 학습합니다. Context API를 활용하여 로그인 상태를 애플리케이션 전체에 공유하세요.',
    requirementStatus: '1 / 3 완료',
    requirements: [
      { title: '사용자 로그인 컨텍스트 구현', description: 'AuthContext와 AuthProvider를 생성하여 상태 제공', status: 'completed' },
      { title: 'Mock API 연결', description: 'API 응답 지연 처리 누락', status: 'failing' },
      { title: 'LocalStorage에 토큰 저장', description: '로그인 성공 시 JWT 토큰을 브라우저에 저장', status: 'pending' },
    ],
    progressLabel: '전체 10단계 중 3단계',
    progressPercent: '30%',
    steps: ['프로젝트 세팅', '라우팅 설정', '인증 및 상태 관리', '대시보드 레이아웃'],
    activities: [
      { title: '검사 실패: Mock API 연결', time: '10분 전' },
      { title: 'GitHub에 코드 푸시됨', time: '15분 전' },
      { title: '3단계 시작함', time: '2시간 전' },
    ],
  })

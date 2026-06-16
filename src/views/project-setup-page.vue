<template>
  <div class="frame9-container">
    <div class="frame9-thq-frame-elm">
      <div class="frame9-thq-main-content-elm">
        <div class="frame9-thq-header-section-elm">
          <div class="frame9-thq-heading1-elm">
            <span class="frame9-thq-text-elm10">프로젝트 설정 및 단계</span>
          </div>
          <div class="frame9-thq-container-elm10">
            <span class="frame9-thq-text-elm11">
              <span>
                선택한 프로젝트의 진행 단계를 확인하세요. 준비가 되면 프로젝트 시작과 함께
              </span>
              <br />
              <span>
                GitHub 레포지토리 생성, 기본 브랜치 구성, 초기 코드 커밋이 자동으로 진행됩니다.
              </span>
              <br />
              <span>API를 통해 스타터 코드가 생성됩니다.</span>
            </span>
          </div>
        </div>
        <div class="frame9-thq-layout-steps-list-sticky-sidebar-elm">
          <div class="frame9-thq-steps-list-elm">
            <div class="frame9-thq-step01-active-elm">
              <div class="frame9-thq-container-elm11">
                <div class="frame9-thq-overlay-border-elm">
                  <span class="frame9-thq-text-elm15">01</span>
                </div>
                <div class="frame9-thq-container-elm12">
                  <div class="frame9-thq-heading3-elm1">
                    <span class="frame9-thq-text-elm16">
                      개발 환경 설정 및 스캐폴딩
                    </span>
                  </div>
                  <div class="frame9-thq-container-elm13">
                    <span class="frame9-thq-text-elm17">
                      <span>
                        프로젝트 구조를 만들고 빌드 도구(Vite/Webpack), 린트와 포맷 규칙을 설정합니다.
                      </span>
                      <br />
                      <span>처음부터 코드 품질 기준을 갖춥니다.</span>
                    </span>
                  </div>
                  <div class="frame9-thq-horizontal-border-elm1">
                    <div class="frame9-thq-heading4-elm1">
                      <span class="frame9-thq-text-elm20">학습 포인트</span>
                    </div>
                    <div class="frame9-thq-list-elm1">
                      <div class="frame9-thq-item-elm10">
                        <span class="frame9-thq-text-elm21">
                          패키지 매니저(npm/yarn/pnpm) 이해
                        </span>
                      </div>
                      <div class="frame9-thq-item-elm11">
                        <span class="frame9-thq-text-elm22">
                          ESLint와 Prettier 엄격 모드 설정
                        </span>
                      </div>
                      <div class="frame9-thq-item-elm12">
                        <span class="frame9-thq-text-elm23">
                          확장 가능한 초기 폴더 구조 설계
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="frame9-thq-container-elm14">
                <div class="frame9-thq-background-elm1">
                  <span class="frame9-thq-text-elm24">현재</span>
                </div>
              </div>
            </div>
            <div class="frame9-thq-step02-elm">
              <div class="frame9-thq-container-elm15">
                <div class="frame9-thq-background-elm2">
                  <span class="frame9-thq-text-elm25">02</span>
                </div>
                <div class="frame9-thq-container-elm16">
                  <div class="frame9-thq-heading3-elm2">
                    <span class="frame9-thq-text-elm26">
                      인증 흐름 구현
                    </span>
                  </div>
                  <div class="frame9-thq-container-elm17">
                    <span class="frame9-thq-text-elm27">
                      <span>
                        로그인/회원가입 UI를 만들고 Mock OAuth 제공자와 연동합니다.
                      </span>
                      <br />
                      <span>JWT 기반 세션 관리를 구성합니다.</span>
                    </span>
                  </div>
                  <div class="frame9-thq-horizontal-border-elm2">
                    <div class="frame9-thq-heading4-elm2">
                      <span class="frame9-thq-text-elm30">학습 포인트</span>
                    </div>
                    <div class="frame9-thq-list-elm2">
                      <div class="frame9-thq-item-elm13">
                        <span class="frame9-thq-text-elm31">
                          OAuth 2.0 흐름을 안전하게 처리
                        </span>
                      </div>
                      <div class="frame9-thq-item-elm14">
                        <span class="frame9-thq-text-elm32">
                          사용자 세션 상태 관리(Context/Redux)
                        </span>
                      </div>
                      <div class="frame9-thq-item-elm15">
                        <span class="frame9-thq-text-elm33">
                          React Router 보호 라우트 구현
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="frame9-thq-step03-elm">
              <div class="frame9-thq-container-elm18">
                <div class="frame9-thq-background-elm3">
                  <span class="frame9-thq-text-elm34">03</span>
                </div>
                <div class="frame9-thq-container-elm19">
                  <div class="frame9-thq-heading3-elm3">
                    <span class="frame9-thq-text-elm35">
                      핵심 데이터 요청 및 캐싱
                    </span>
                  </div>
                  <div class="frame9-thq-container-elm20">
                    <span class="frame9-thq-text-elm36">
                      <span>
                        대시보드 데이터를 REST API에서 가져오고 캐싱 전략을 적용합니다.
                      </span>
                      <br />
                      <span>
                        네트워크 요청을 줄이고 체감 성능을 높입니다.
                      </span>
                    </span>
                  </div>
                  <div class="frame9-thq-horizontal-border-elm3">
                    <div class="frame9-thq-heading4-elm3">
                      <span class="frame9-thq-text-elm39">학습 포인트</span>
                    </div>
                    <div class="frame9-thq-list-elm3">
                      <div class="frame9-thq-item-elm16">
                        <span class="frame9-thq-text-elm40">
                          React Query 또는 SWR로 원격 상태 관리
                        </span>
                      </div>
                      <div class="frame9-thq-item-elm17">
                        <span class="frame9-thq-text-elm41">
                          로딩/오류 상태를 자연스럽게 처리
                        </span>
                      </div>
                      <div class="frame9-thq-item-elm18">
                        <span class="frame9-thq-text-elm42">
                          더 나은 UX를 위한 낙관적 업데이트
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="frame9-thq-step04-elm">
              <div class="frame9-thq-container-elm21">
                <div class="frame9-thq-background-elm4">
                  <span class="frame9-thq-text-elm43">04</span>
                </div>
                <div class="frame9-thq-container-elm22">
                  <div class="frame9-thq-heading3-elm4">
                    <span class="frame9-thq-text-elm44">
                      인터랙티브 UI 컴포넌트
                    </span>
                  </div>
                  <div class="frame9-thq-container-elm23">
                    <span class="frame9-thq-text-elm45">
                      <span>
                        드래그 앤 드롭 목록과 검증 폼 같은 복합 인터랙션을 구현합니다.
                      </span>
                      <br />
                      <span>반응형 데이터 테이블까지 구성합니다.</span>
                    </span>
                  </div>
                  <div class="frame9-thq-horizontal-border-elm4">
                    <div class="frame9-thq-heading4-elm4">
                      <span class="frame9-thq-text-elm48">학습 포인트</span>
                    </div>
                    <div class="frame9-thq-list-elm4">
                      <div class="frame9-thq-item-elm19">
                        <span class="frame9-thq-text-elm49">
                          접근성(a11y)을 고려한 컴포넌트 작성
                        </span>
                      </div>
                      <div class="frame9-thq-item-elm20">
                        <span class="frame9-thq-text-elm50">
                          Zod/Yup을 활용한 복합 폼 검증
                        </span>
                      </div>
                      <div class="frame9-thq-item-elm21">
                        <span class="frame9-thq-text-elm51">
                          컴포넌트 로컬 상태를 효율적으로 관리
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="frame9-thq-step05-elm">
              <div class="frame9-thq-container-elm24">
                <div class="frame9-thq-background-elm5">
                  <span class="frame9-thq-text-elm52">05</span>
                </div>
                <div class="frame9-thq-container-elm25">
                  <div class="frame9-thq-heading3-elm5">
                    <span class="frame9-thq-text-elm53">
                      테스트 및 배포 파이프라인
                    </span>
                  </div>
                  <div class="frame9-thq-container-elm26">
                    <span class="frame9-thq-text-elm54">
                      <span>
                        핵심 경로의 단위/통합 테스트를 작성하고 GitHub Actions 기반 CI를 구성합니다.
                      </span>
                      <br />
                      <span>정적 호스팅 환경으로 배포합니다.</span>
                    </span>
                  </div>
                  <div class="frame9-thq-horizontal-border-elm5">
                    <div class="frame9-thq-heading4-elm5">
                      <span class="frame9-thq-text-elm57">학습 포인트</span>
                    </div>
                    <div class="frame9-thq-list-elm5">
                      <div class="frame9-thq-item-elm22">
                        <span class="frame9-thq-text-elm58">
                          Jest/Vitest로 효과적인 테스트 작성
                        </span>
                      </div>
                      <div class="frame9-thq-item-elm23">
                        <span class="frame9-thq-text-elm59">
                          Cypress/Playwright E2E 테스트 기초
                        </span>
                      </div>
                      <div class="frame9-thq-item-elm24">
                        <span class="frame9-thq-text-elm60">
                          기본 CI/CD 워크플로 구성
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="frame9-thq-sticky-sidebar-cta-elm">
            <div class="frame9-thq-background-border-shadow-elm">
              <div class="frame9-thq-heading2-elm">
                <span class="frame9-thq-text-elm61">시작할 준비가 됐나요?</span>
              </div>
              <div class="frame9-thq-container-elm27">
                <span class="frame9-thq-text-elm62">
                  <span>시작 버튼을 누르면 자동으로</span>
                  <br />
                  <span>GitHub 레포지토리와 초기 코드베이스가</span>
                  <br />
                  <span>설정되어 바로 1단계를</span>
                  <br />
                  <span>진행할 수 있습니다.</span>
                </span>
              </div>
              <div class="frame9-thq-background-border-elm">
                <div class="frame9-thq-container-elm28">
                  <img
                    alt="Container1614"
                    src="/container1614-ycu.svg"
                    class="frame9-thq-container-elm29"
                  />
                  <div class="frame9-thq-container-elm30">
                    <span class="frame9-thq-text-elm67">API 작업</span>
                  </div>
                </div>
                <div class="frame9-thq-list-elm6">
                  <div class="frame9-thq-item-elm25">
                    <img
                      alt="Background1614"
                      src="/background1614-fl9n-200h.png"
                      class="frame9-thq-background-elm6"
                    />
                    <span class="frame9-thq-text-elm68">레포지토리 생성:</span>
                    <div class="frame9-thq-code-elm1">
                      <span class="frame9-thq-text-elm69">my-project-01</span>
                    </div>
                  </div>
                  <div class="frame9-thq-item-elm26">
                    <img
                      alt="Background1614"
                      src="/background1614-7fzvi-200h.png"
                      class="frame9-thq-background-elm7"
                    />
                    <span class="frame9-thq-text-elm70">브랜치:</span>
                    <div class="frame9-thq-code-elm2">
                      <span class="frame9-thq-text-elm71">main</span>
                    </div>
                  </div>
                  <div class="frame9-thq-item-elm27">
                    <img
                      alt="Background1614"
                      src="/background1614-kqb-200h.png"
                      class="frame9-thq-background-elm8"
                    />
                    <span class="frame9-thq-text-elm72">
                      초기 스캐폴드 푸시
                    </span>
                  </div>
                </div>
              </div>
              <button class="frame9-thq-button-elm1">
                <img
                  alt="Container1614"
                  src="/container1614-nki3.svg"
                  class="frame9-thq-container-elm31"
                />
                <span class="frame9-thq-text-elm73">프로젝트 시작하기</span>
              </button>
              <div class="frame9-thq-container-elm32">
                <span class="frame9-thq-text-elm74">
                  예상 준비 시간: 약 30초
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="frame9-thq-footer-elm">
        <div class="frame9-thq-container-elm33">
          <div class="frame9-thq-container-elm34">
            <span class="frame9-thq-text-elm75">Codemong</span>
          </div>
          <div class="frame9-thq-container-elm35">
            <span class="frame9-thq-text-elm76">
              © 2024 Codemong. GitHub 공식 API 연동을 사용합니다.
            </span>
          </div>
          <div class="frame9-thq-container-elm36">
            <div class="frame9-thq-link-elm1">
              <span class="frame9-thq-text-elm77">이용약관</span>
            </div>
            <div class="frame9-thq-linkmargin-elm1">
              <div class="frame9-thq-link-elm2">
                <span class="frame9-thq-text-elm78">개인정보 처리방침</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="frame9-thq-top-nav-bar-elm">
        <div class="frame9-thq-container-elm37">
          <div class="frame9-thq-container-elm38">
            <span class="frame9-thq-text-elm79">Codemong</span>
          </div>
          <div class="frame9-thq-container-elm39">
            <div class="frame9-thq-link-elm3">
              <span class="frame9-thq-text-elm80">프로젝트</span>
            </div>
            <div class="frame9-thq-linkmargin-elm2">
              <div class="frame9-thq-link-elm4">
                <span class="frame9-thq-text-elm81">내 미션</span>
              </div>
            </div>
            <div class="frame9-thq-linkmargin-elm3">
              <div class="frame9-thq-link-elm5">
                <span class="frame9-thq-text-elm82">진행 현황</span>
              </div>
            </div>
            <div class="frame9-thq-linkmargin-elm4">
              <div class="frame9-thq-link-elm6">
                <span class="frame9-thq-text-elm83">도움말</span>
              </div>
            </div>
          </div>
          <div class="frame9-thq-container-elm40">
            <button class="frame9-thq-button-elm2">
              <span class="frame9-thq-text-elm84">GitHub로 시작하기</span>
            </button>
            <button class="frame9-thq-buttonmargin-elm">
              <button class="frame9-thq-button-elm3">
                <img
                  alt="Container1614"
                  src="/container1614-rw1.svg"
                  class="frame9-thq-container-elm41"
                />
              </button>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProjectSetupPage',
  props: {},
  metaInfo: {
    title: '프로젝트 설정',
    meta: [
      {
        property: 'og:title',
        content: '프로젝트 설정',
      },
    ],
    link: [
      {
        rel: 'canonical',
        href: 'https://ssafy-a6xxqa.teleporthq.site/',
      },
    ],
  },
}
</script>

<style scoped>
@import '../styles/views/project-setup-page.css';
</style>

<template>
  <div class="frame-ai-container">
    <div class="frame-ai-thq-frame-ai-elm">
      <div class="frame-ai-thq-main-content-canvas-elm">
        <div
          class="frame-ai-thq-section-left-column-project-requirements-panel-elm"
        >
          <div class="frame-ai-thq-dashboard-header-elm">
            <div class="frame-ai-thq-container-elm10">
              <div class="frame-ai-thq-background-elm1">
                <span class="frame-ai-thq-text-elm10">프론트엔드</span>
              </div>
              <div class="frame-ai-thq-heading1-elm">
                <span class="frame-ai-thq-text-elm11">
                  React Shopping Cart API Integration
                </span>
              </div>
            </div>
            <div class="frame-ai-thq-container-elm11">
              <span class="frame-ai-thq-text-elm12">
                Integrate the mock API to fetch product lists and handle data
                rendering.
              </span>
            </div>
          </div>
          <div class="frame-ai-thq-requirements-card-bentostylecontainer-elm">
            <div class="frame-ai-thq-background-horizontal-border-elm1">
              <div class="frame-ai-thq-heading2-elm1">
                <span class="frame-ai-thq-text-elm13">요구사항</span>
              </div>
              <div class="frame-ai-thq-background-border-elm1">
                <span class="frame-ai-thq-text-elm14">1 / 2 통과</span>
              </div>
            </div>
            <div class="frame-ai-thq-container-elm12">
              <div class="frame-ai-thq-requirement1-passed-elm">
                <img
                  alt="Margin1662"
                  src="/margin1662-ku23.svg"
                  class="frame-ai-thq-margin-elm1"
                />
                <div class="frame-ai-thq-container-elm13">
                  <div class="frame-ai-thq-heading3-elm1">
                    <span class="frame-ai-thq-text-elm15">
                      UI 컴포넌트 마크업 완료
                    </span>
                  </div>
                  <div class="frame-ai-thq-container-elm14">
                    <span class="frame-ai-thq-text-elm16">
                      ProductList 컴포넌트의 기본 구조가 올바르게 렌더링 됩니다.
                    </span>
                  </div>
                </div>
              </div>
              <div class="frame-ai-thq-requirement2-failed-ai-feedback-elm">
                <div class="frame-ai-thq-container-elm15">
                  <img
                    alt="Margin1663"
                    src="/margin1663-fwi.svg"
                    class="frame-ai-thq-margin-elm2"
                  />
                  <div class="frame-ai-thq-container-elm16">
                    <div class="frame-ai-thq-container-elm17">
                      <div class="frame-ai-thq-heading3-elm2">
                        <span class="frame-ai-thq-text-elm17">
                          상품 목록 API 연동
                        </span>
                      </div>
                      <div class="frame-ai-thq-background-elm2">
                        <span class="frame-ai-thq-text-elm18">실패</span>
                      </div>
                    </div>
                    <div class="frame-ai-thq-container-elm18">
                      <span class="frame-ai-thq-text-elm19">
                        지정된 엔드포인트에서 데이터를 성공적으로 가져와 화면에
                        출력해야 합니다.
                      </span>
                    </div>
                  </div>
                </div>
                <div class="frame-ai-thq-ai-feedback-panelmargin-elm">
                  <div class="frame-ai-thq-ai-feedback-panel-elm">
                    <div class="frame-ai-thq-overlay-horizontal-border-elm">
                      <img
                        alt="Container1665"
                        src="/container1665-he4f.svg"
                        class="frame-ai-thq-container-elm19"
                      />
                      <div class="frame-ai-thq-container-elm20">
                        <span class="frame-ai-thq-text-elm20">AI 코드 분석</span>
                      </div>
                    </div>
                    <div class="frame-ai-thq-container-elm21">
                      <div class="frame-ai-thq-container-elm22">
                        <div class="frame-ai-thq-container-elm23">
                          <span class="frame-ai-thq-text-elm21">실패 원인:</span>
                        </div>
                        <div class="frame-ai-thq-background-elm3">
                          <span class="frame-ai-thq-text-elm22">
                            API 응답 처리 로직 오류
                          </span>
                        </div>
                        <div class="frame-ai-thq-margin-elm3">
                          <div class="frame-ai-thq-container-elm24">
                            <span class="frame-ai-thq-text-elm23">
                              응답 객체가 JSON으로 변환되기 전에 데이터에
                              접근하려고 시도하고 있습니다.
                            </span>
                          </div>
                        </div>
                      </div>
                      <div class="frame-ai-thq-margin-elm4">
                        <img
                          alt="HorizontalDivider1666"
                          src="/horizontaldivider1666-uybk-200h.png"
                          class="frame-ai-thq-horizontal-divider-elm"
                        />
                      </div>
                      <div class="frame-ai-thq-container-elm25">
                        <div class="frame-ai-thq-container-elm26">
                          <span class="frame-ai-thq-text-elm24">수정 제안:</span>
                        </div>
                        <div class="frame-ai-thq-background-elm4">
                          <span class="frame-ai-thq-text-elm25">
                            <span class="frame-ai-thq-text-elm26">
                              // fetch 함수의 에러 핸들링 추가 및 json 변환 대기
                            </span>
                            <br />
                            <span class="frame-ai-thq-text-elm27">
                              fetch(&apos;/api/products&apos;)
                            </span>
                            <br />
                            <span class="frame-ai-thq-text-elm28">
                                .then(response =&gt; &#123;
                            </span>
                            <br />
                            <span class="frame-ai-thq-text-elm29">    </span>
                            <span class="frame-ai-thq-text-elm30">
                              if (!response.ok) throw new Error(&apos;Network
                              response was not ok&apos;);
                            </span>
                            <br />
                            <span class="frame-ai-thq-text-elm31">
                                  return response.json();
                            </span>
                            <br />
                            <span class="frame-ai-thq-text-elm32">  &#125;)</span>
                            <br />
                            <span class="frame-ai-thq-text-elm33">
                                .then(data =&gt; setProducts(data))
                            </span>
                            <br />
                            <span class="frame-ai-thq-text-elm34">  </span>
                            <span>
                              .catch(error =&gt; console.error(&apos;Error
                              fetching data:&apos;, error));
                            </span>
                          </span>
                        </div>
                      </div>
                      <div class="frame-ai-thq-margin-elm5">
                        <div class="frame-ai-thq-container-elm27">
                          <button class="frame-ai-thq-button-elm1">
                            <img
                              alt="Container1667"
                              src="/container1667-a4p.svg"
                              class="frame-ai-thq-container-elm28"
                            />
                            <span class="frame-ai-thq-text-elm36">
                              내 코드에서 보기
                            </span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            class="frame-ai-thq-code-editor-placeholder-decorativetocomplete-id-efeelma-elm"
          >
            <div
              class="frame-ai-thq-code-editor-placeholder-decorativetocomplete-id-efeel-elm"
            >
              <div class="frame-ai-thq-background-horizontal-border-elm2">
                <div class="frame-ai-thq-container-elm29">
                  <span class="frame-ai-thq-text-elm37">ProductList.jsx</span>
                </div>
                <div class="frame-ai-thq-container-elm30">
                  <span class="frame-ai-thq-text-elm38">api.js</span>
                </div>
              </div>
              <div class="frame-ai-thq-container-elm31">
                <div class="frame-ai-thq-container-elm32">
                  <span class="frame-ai-thq-text-elm39">
                    // ... existing code ...
                  </span>
                </div>
                <div class="frame-ai-thq-container-elm33">
                  <span class="frame-ai-thq-text-elm40">
                    <span class="frame-ai-thq-text-elm41">const</span>
                    <span>fetchProducts = () =&gt; &#123;</span>
                  </span>
                </div>
                <div class="frame-ai-thq-container-elm34">
                  <span class="frame-ai-thq-text-elm43">
                    <span class="frame-ai-thq-text-elm44">  fetch(</span>
                    <span class="frame-ai-thq-text-elm45">
                      &apos;/api/products&apos;)
                    </span>
                  </span>
                </div>
                <div class="frame-ai-thq-horizontal-border-elm">
                  <span class="frame-ai-thq-text-elm46">
                    <span class="frame-ai-thq-text-elm47">    .then(</span>
                    <span class="frame-ai-thq-text-elm48">res</span>
                    <span class="frame-ai-thq-text-elm49">
                      =&gt; setProducts(
                    </span>
                    <span class="frame-ai-thq-text-elm50">res</span>
                    <span>.data)) // Problematic line</span>
                  </span>
                </div>
                <div class="frame-ai-thq-container-elm35"></div>
                <div class="frame-ai-thq-container-elm36">
                  <span class="frame-ai-thq-text-elm52">// ...</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="frame-ai-thq-aside-right-column-integrated-ai-tutor-chat-elm">
          <div class="frame-ai-thq-chat-header-elm">
            <div class="frame-ai-thq-container-elm37">
              <div class="frame-ai-thq-background-elm5">
                <img
                  alt="Container1670"
                  src="/container1670-yaos.svg"
                  class="frame-ai-thq-container-elm38"
                />
              </div>
              <div class="frame-ai-thq-heading2-elm2">
                <span class="frame-ai-thq-text-elm53">AI 튜터에게 질문하기</span>
              </div>
            </div>
            <button class="frame-ai-thq-button-elm2">
              <img
                alt="Container1670"
                src="/container1670-5acb.svg"
                class="frame-ai-thq-container-elm39"
              />
            </button>
          </div>
          <div class="frame-ai-thq-chat-history-area-elm">
            <div class="frame-ai-thq-system-message-elm">
              <div class="frame-ai-thq-background-elm6">
                <span class="frame-ai-thq-text-elm54">오늘</span>
              </div>
            </div>
            <div class="frame-ai-thq-user-message-elm">
              <div class="frame-ai-thq-background-border-shadow-elm1">
                <span class="frame-ai-thq-text-elm55">
                  <span>상품 목록 API 연동 요구사항에서 계속 실패</span>
                  <br />
                  <span>가 뜹니다. 데이터가 안 불러와져요.</span>
                </span>
              </div>
              <div class="frame-ai-thq-margin-elm6">
                <span class="frame-ai-thq-text-elm58">10:42 AM</span>
              </div>
            </div>
            <div class="frame-ai-thq-ai-message-elm">
              <div class="frame-ai-thq-container-elm40">
                <div class="frame-ai-thq-background-border-elm2">
                  <img
                    alt="Container1671"
                    src="/container1671-if6f.svg"
                    class="frame-ai-thq-container-elm41"
                  />
                </div>
                <div class="frame-ai-thq-background-border-shadow-elm2">
                  <div class="frame-ai-thq-paragraph-elm1">
                    <span class="frame-ai-thq-text-elm59">
                      작성하신 코드를 분석해보니,
                      <span v-html="raw75om"></span>
                    </span>
                    <span class="frame-ai-thq-text-elm60">fetch</span>
                    <span class="frame-ai-thq-text-elm61">함</span>
                    <span class="frame-ai-thq-text-elm62">
                      <span>수 사용 후 응답을 처리하는 부분에 문제</span>
                      <br />
                      <span>가 있습니다.</span>
                    </span>
                  </div>
                  <div class="frame-ai-thq-paragraph-elm2">
                    <span class="frame-ai-thq-text-elm65">
                      현재 코드는
                      <span v-html="rawbj3n"></span>
                    </span>
                    <span class="frame-ai-thq-text-elm66">res.data</span>
                    <span class="frame-ai-thq-text-elm67">를 바로 상태에 저</span>
                    <span class="frame-ai-thq-text-elm68">
                      장하려고 시도하고 있지만,
                      <span v-html="raw99ek"></span>
                    </span>
                    <span class="frame-ai-thq-text-elm69">fetch</span>
                    <span class="frame-ai-thq-text-elm70">API는</span>
                    <span class="frame-ai-thq-text-elm71">
                      <span>기본적으로 Response 객체를 반환하므</span>
                      <br />
                      <span>로 먼저 JSON 형태로 변환하는 과정이</span>
                      <br />
                      <span>필요합니다.</span>
                    </span>
                  </div>
                  <div class="frame-ai-thq-container-elm42">
                    <span class="frame-ai-thq-text-elm75">
                      <span class="frame-ai-thq-text-elm76">
                        왼쪽 패널의
                        <span v-html="rawmb0u"></span>
                      </span>
                      <span class="frame-ai-thq-text-elm77">AI 코드 분석</span>
                      <span>에서 제안한 수</span>
                      <br />
                      <span>정 사항을 참고하여 코드를 변경해 보세</span>
                      <br />
                      <span>요!</span>
                    </span>
                  </div>
                </div>
              </div>
              <div class="frame-ai-thq-margin-elm7">
                <span class="frame-ai-thq-text-elm81">10:43 AM</span>
              </div>
            </div>
          </div>
          <div class="frame-ai-thq-chat-input-area-elm">
            <div class="frame-ai-thq-background-border-elm3">
              <div class="frame-ai-thq-textarea-elm">
                <div class="frame-ai-thq-container-elm43">
                  <span class="frame-ai-thq-text-elm82">
                    <span>궁금한 점을 물어보세요 (예: 왜 404 에러가 날까</span>
                    <br />
                    <span>요?)</span>
                  </span>
                </div>
              </div>
              <div class="frame-ai-thq-container-elm44">
                <button class="frame-ai-thq-button-elm3">
                  <img
                    alt="Container1674"
                    src="/container1674-r4ad.svg"
                    class="frame-ai-thq-container-elm45"
                  />
                </button>
              </div>
            </div>
            <div class="frame-ai-thq-container-elm46">
              <div class="frame-ai-thq-container-elm47">
                <img
                  alt="Container1675"
                  src="/container1675-8plq.svg"
                  class="frame-ai-thq-container-elm48"
                />
                <span class="frame-ai-thq-text-elm85">
                  Shift + Enter로 줄바꿈
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="frame-ai-thq-footer-elm">
        <div class="frame-ai-thq-container-elm49">
          <div class="frame-ai-thq-paragraph-elm3">
            <span class="frame-ai-thq-text-elm86">Codemong</span>
            <span class="frame-ai-thq-text-elm87">
              © 2024 Codemong. GitHub 공식 API 연동을 사용합니다.
            </span>
          </div>
          <div class="frame-ai-thq-container-elm50">
            <div class="frame-ai-thq-link-elm1">
              <span class="frame-ai-thq-text-elm88">이용약관</span>
            </div>
            <div class="frame-ai-thq-link-elm2">
              <span class="frame-ai-thq-text-elm89">개인정보 처리방침</span>
            </div>
          </div>
        </div>
      </div>
      <div class="frame-ai-thq-top-nav-bar-elm">
        <div class="frame-ai-thq-container-elm51">
          <div class="frame-ai-thq-container-elm52">
            <div class="frame-ai-thq-link-elm3">
              <span class="frame-ai-thq-text-elm90">Codemong</span>
            </div>
            <div class="frame-ai-thq-container-elm53">
              <div class="frame-ai-thq-link-elm4">
                <span class="frame-ai-thq-text-elm91">프로젝트</span>
              </div>
              <div class="frame-ai-thq-link-elm5">
                <span class="frame-ai-thq-text-elm92">내 미션</span>
              </div>
              <div class="frame-ai-thq-link-elm6">
                <span class="frame-ai-thq-text-elm93">진행 현황</span>
              </div>
              <div class="frame-ai-thq-link-elm7">
                <span class="frame-ai-thq-text-elm94">도움말</span>
              </div>
            </div>
          </div>
          <div class="frame-ai-thq-container-elm54">
            <button class="frame-ai-thq-button-elm4">
              <span class="frame-ai-thq-text-elm95">GitHub로 시작하기</span>
            </button>
            <button class="frame-ai-thq-button-elm5">
              <img
                alt="Container1678"
                src="/container1678-pox8.svg"
                class="frame-ai-thq-container-elm55"
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: '프론트엔드AiFeedbackPage',
  props: {},
  data() {
    return {
      raw75om: ' ',
      rawbj3n: ' ',
      raw99ek: ' ',
      rawmb0u: ' ',
    }
  },
  metaInfo: {
    title: '프론트엔드 AI Feedback',
    meta: [
      {
        property: 'og:title',
        content: '프론트엔드 AI Feedback',
      },
    ],
    link: [
      {
        rel: 'canonical',
        href: 'https://ssafy-a6xxqa.teleporthq.site/frame-ai',
      },
    ],
  },
}
</script>

<style scoped>
@import '../styles/views/frontend-ai-feedback-page.css';
</style>

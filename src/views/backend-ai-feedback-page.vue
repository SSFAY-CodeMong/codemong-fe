<template>
  <div class="frame-ai1-container">
    <div class="frame-ai1-thq-frame-ai-elm">
      <div class="frame-ai1-thq-main-canvas-elm">
        <div class="frame-ai1-thq-dashboard-header-elm">
          <div class="frame-ai1-thq-container-elm10">
            <div class="frame-ai1-thq-heading1-elm">
              <span class="frame-ai1-thq-text-elm10">미션 분석</span>
            </div>
            <div class="frame-ai1-thq-container-elm11">
              <span class="frame-ai1-thq-text-elm11">
                Spring Boot Paging Implementation
              </span>
            </div>
          </div>
          <div class="frame-ai1-thq-background-elm1">
            <img
              alt="Container1615"
              src="/container1615-mx2g.svg"
              class="frame-ai1-thq-container-elm12"
            />
            <div class="frame-ai1-thq-container-elm13">
              <span class="frame-ai1-thq-text-elm12">실패</span>
            </div>
          </div>
        </div>
        <div class="frame-ai1-thq-container-elm14">
          <div class="frame-ai1-thq-left-column-results-feedback-elm">
            <div class="frame-ai1-thq-status-banner-elm">
              <div class="frame-ai1-thq-container-elm15">
                <img
                  alt="Icon1616"
                  src="/icon1616-941a.svg"
                  class="frame-ai1-thq-icon-elm"
                />
                <div class="frame-ai1-thq-container-elm16">
                  <div class="frame-ai1-thq-heading2-elm">
                    <span class="frame-ai1-thq-text-elm13">
                      아직 통과하지 못한 테스트가 있어요
                    </span>
                  </div>
                  <div class="frame-ai1-thq-container-elm17">
                    <span class="frame-ai1-thq-text-elm14">
                      Total 15 tests: 13 passed, 2 failed.
                    </span>
                  </div>
                  <div class="frame-ai1-thq-background-border-elm1">
                    <div class="frame-ai1-thq-list-elm1">
                      <div class="frame-ai1-thq-item-elm1">
                        <span class="frame-ai1-thq-text-elm15">
                          com.mmcafe.Step02HiddenTest.testPaginationOffset
                        </span>
                      </div>
                      <div class="frame-ai1-thq-item-elm2">
                        <span class="frame-ai1-thq-text-elm16">
                          com.mmcafe.Step02HiddenTest.testTotalElementsCalculation
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <img
                alt="Background1617"
                src="/background1617-lyoh-200w.png"
                class="frame-ai1-thq-background-elm2"
              />
            </div>
            <div class="frame-ai1-thq-ai-feedback-panel-elm">
              <div class="frame-ai1-thq-heading3-elm">
                <img
                  alt="Container1617"
                  src="/container1617-mn3.svg"
                  class="frame-ai1-thq-container-elm18"
                />
                <span class="frame-ai1-thq-text-elm17">AI 코드 분석</span>
              </div>
              <div class="frame-ai1-thq-container-elm19">
                <div class="frame-ai1-thq-container-elm20">
                  <div class="frame-ai1-thq-heading4-elm1">
                    <span class="frame-ai1-thq-text-elm18">
                      추론된 실패 원인
                    </span>
                  </div>
                  <div class="frame-ai1-thq-paragraph-background-border-elm">
                    <span class="frame-ai1-thq-text-elm19">
                      테스트
                      <span v-html="rawei44"></span>
                    </span>
                    <span class="frame-ai1-thq-text-elm20">
                      testPaginationOffset
                    </span>
                    <span class="frame-ai1-thq-text-elm21">
                      실패 원인은
                      <span v-html="rawgpxc"></span>
                    </span>
                    <span class="frame-ai1-thq-text-elm22">
                      PageRequest.of(page, size)
                    </span>
                    <span class="frame-ai1-thq-text-elm23">항목이</span>
                    <span class="frame-ai1-thq-text-elm24">
                      <span>
                        컨트롤러에서 클라이언트의 1부터 시작하는 페이지 번호를 그대로 받고 있지만, Spring Data JPA는
                      </span>
                      <br />
                      <span>
                        0부터 시작하는 인덱스를 기대하기 때문입니다. 이로 인해 offset 계산이 어긋나 첫 페이지 결과를 건너뛸 수 있습니다.
                      </span>
                      <br />
                      <span>결과입니다.</span>
                    </span>
                  </div>
                </div>
                <div class="frame-ai1-thq-container-elm21">
                  <div class="frame-ai1-thq-heading4-elm2">
                    <span class="frame-ai1-thq-text-elm28">
                      수정 위치 제안
                    </span>
                  </div>
                  <div class="frame-ai1-thq-background-border-elm2">
                    <div class="frame-ai1-thq-pre-elm">
                      <div class="frame-ai1-thq-code-elm">
                        <span class="frame-ai1-thq-text-elm29">
                          <span class="frame-ai1-thq-text-elm30">
                            // ArticleController.java : Line 45
                          </span>
                          <br />
                          <span class="frame-ai1-thq-text-elm31">
                            @GetMapping(&quot;/articles&quot;)
                          </span>
                          <br />
                          <span class="frame-ai1-thq-text-elm32">
                            public ResponseEntity&lt;Page&lt;ArticleDto&gt;&gt;
                            getArticles(
                          </span>
                          <br />
                          <span><span v-html="raw2amq"></span></span>
                        </span>
                        <div class="frame-ai1-thq-overlay-elm1">
                          <span class="frame-ai1-thq-text-elm34">
                            @RequestParam(defaultValue = &quot;1&quot;) int page,
                          </span>
                        </div>
                        <span class="frame-ai1-thq-text-elm35">
                          <span class="frame-ai1-thq-text-elm36">
                            @RequestParam(defaultValue = &quot;10&quot;) int size
                          </span>
                          <br />
                          <span class="frame-ai1-thq-text-elm37">) &#123;</span>
                          <br />
                          <span class="frame-ai1-thq-text-elm38">
                            <span v-html="raw48z3"></span>
                          </span>
                          <span class="frame-ai1-thq-text-elm39">
                            // Spring Data Pageable is 0-indexed
                          </span>
                          <br />
                          <span><span v-html="rawv85b"></span></span>
                        </span>
                        <div class="frame-ai1-thq-overlay-elm2">
                          <span class="frame-ai1-thq-text-elm41">
                            Pageable pageable = PageRequest.of(page - 1, size);
                          </span>
                        </div>
                        <span class="frame-ai1-thq-text-elm42">
                          <span>
                            return
                            ResponseEntity.ok(articleService.findArticles(pageable));
                          </span>
                          <br />
                          <span>&#125;</span>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="frame-ai1-thq-container-elm22">
                  <div class="frame-ai1-thq-heading4-elm3">
                    <span class="frame-ai1-thq-text-elm45">
                      개선 방향
                    </span>
                  </div>
                  <div class="frame-ai1-thq-list-elm2">
                    <div class="frame-ai1-thq-item-elm3">
                      <span class="frame-ai1-thq-text-elm46">
                        요청으로 들어온
                        <span v-html="rawxzay"></span>
                      </span>
                      <span class="frame-ai1-thq-text-elm47">page</span>
                      <span class="frame-ai1-thq-text-elm48">
                        파라미터에서 1을 뺀 뒤
                        <span v-html="rawlg6s"></span>
                      </span>
                      <span class="frame-ai1-thq-text-elm49">PageRequest</span>
                    </div>
                    <div class="frame-ai1-thq-item-elm4">
                      <span class="frame-ai1-thq-text-elm50">
                        커스텀 쿼리가 있는
                        <span v-html="raw1tr7"></span>
                      </span>
                      <span class="frame-ai1-thq-text-elm51">
                        ArticleRepository
                      </span>
                      <span class="frame-ai1-thq-text-elm52">
                        에서 전체 개수를 올바르게 반환하는지 확인해
                      </span>
                      <span class="frame-ai1-thq-text-elm53">
                        testTotalElementsCalculation
                      </span>
                      <span class="frame-ai1-thq-text-elm54">테스트를 통과시키세요.</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="frame-ai1-thq-right-column-llm-chat-elm">
            <div class="frame-ai1-thq-background-border-shadow-elm1">
              <div class="frame-ai1-thq-chat-header-elm">
                <div class="frame-ai1-thq-container-elm23">
                  <img
                    alt="Container1622"
                    src="/container1622-h3ce.svg"
                    class="frame-ai1-thq-container-elm24"
                  />
                  <div class="frame-ai1-thq-container-elm25">
                    <span class="frame-ai1-thq-text-elm55">
                      Codemong 어시스턴트
                    </span>
                  </div>
                </div>
                <button class="frame-ai1-thq-button-elm1">
                  <img
                    alt="Container1623"
                    src="/container1623-zodb.svg"
                    class="frame-ai1-thq-container-elm26"
                  />
                </button>
              </div>
              <div class="frame-ai1-thq-chat-messages-elm">
                <div class="frame-ai1-thq-ai-message-elm">
                  <div class="frame-ai1-thq-background-elm3">
                    <img
                      alt="Container1623"
                      src="/container1623-v93.svg"
                      class="frame-ai1-thq-container-elm27"
                    />
                  </div>
                  <div class="frame-ai1-thq-background-border-shadow-elm2">
                    <span class="frame-ai1-thq-text-elm56">
                      <span>
                        페이징 테스트가 실패했군요. 1-based index와 0-based
                      </span>
                      <br />
                      <span>
                        index의 차이 때문일 확률이 높습니다. 코드의 어느 부분을
                      </span>
                      <br />
                      <span>수정해야 할지 더 자세히 알아볼까요?</span>
                    </span>
                  </div>
                </div>
              </div>
              <div class="frame-ai1-thq-chat-input-elm">
                <div class="frame-ai1-thq-container-elm28">
                  <div class="frame-ai1-thq-input-elm">
                    <div class="frame-ai1-thq-container-elm29">
                      <span class="frame-ai1-thq-text-elm60">
                        왜 페이징 테스트가 실패했는지 물어보세요
                      </span>
                    </div>
                  </div>
                  <button class="frame-ai1-thq-button-elm2">
                    <img
                      alt="Container1624"
                      src="/container1624-v5bc.svg"
                      class="frame-ai1-thq-container-elm30"
                    />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="frame-ai1-thq-footer-elm">
        <div class="frame-ai1-thq-container-elm31">
          <div class="frame-ai1-thq-container-elm32">
            <span class="frame-ai1-thq-text-elm61">Codemong</span>
          </div>
          <div class="frame-ai1-thq-container-elm33">
            <span class="frame-ai1-thq-text-elm62">
              © 2024 Codemong. GitHub 공식 API 연동을 사용합니다.
            </span>
          </div>
          <div class="frame-ai1-thq-container-elm34">
            <div class="frame-ai1-thq-link-elm1">
              <span class="frame-ai1-thq-text-elm63">이용약관</span>
            </div>
            <div class="frame-ai1-thq-link-elm2">
              <span class="frame-ai1-thq-text-elm64">개인정보 처리방침</span>
            </div>
          </div>
        </div>
      </div>
      <div class="frame-ai1-thq-header-top-nav-bar-elm">
        <div class="frame-ai1-thq-container-elm35">
          <div class="frame-ai1-thq-container-elm36">
            <div class="frame-ai1-thq-link-elm3">
              <span class="frame-ai1-thq-text-elm65">Codemong</span>
            </div>
            <div class="frame-ai1-thq-nav-elm">
              <div class="frame-ai1-thq-link-elm4">
                <span class="frame-ai1-thq-text-elm66">프로젝트</span>
              </div>
              <div class="frame-ai1-thq-link-elm5">
                <span class="frame-ai1-thq-text-elm67">내 미션</span>
              </div>
              <div class="frame-ai1-thq-link-elm6">
                <span class="frame-ai1-thq-text-elm68">진행 현황</span>
              </div>
              <div class="frame-ai1-thq-link-elm7">
                <span class="frame-ai1-thq-text-elm69">도움말</span>
              </div>
            </div>
          </div>
          <div class="frame-ai1-thq-container-elm37">
            <button class="frame-ai1-thq-button-elm3">
              <span class="frame-ai1-thq-text-elm70">GitHub로 시작하기</span>
            </button>
            <button class="frame-ai1-thq-button-elm4">
              <img
                alt="Container1627"
                src="/container1627-nctm.svg"
                class="frame-ai1-thq-container-elm38"
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
  name: '백엔드AiFeedbackPage',
  props: {},
  data() {
    return {
      rawei44: ' ',
      rawgpxc: ' ',
      raw2amq: ' ',
      raw48z3: ' ',
      rawv85b: ' ',
      rawxzay: ' ',
      rawlg6s: ' ',
      raw1tr7: ' ',
    }
  },
  metaInfo: {
    title: '백엔드 AI Feedback',
    meta: [
      {
        property: 'og:title',
        content: '백엔드 AI Feedback',
      },
    ],
    link: [
      {
        rel: 'canonical',
        href: 'https://ssafy-a6xxqa.teleporthq.site/frame-ai1',
      },
    ],
  },
}
</script>

<style scoped>
@import '../styles/views/backend-ai-feedback-page.css';
</style>

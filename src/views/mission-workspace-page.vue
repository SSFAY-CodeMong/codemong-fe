<template>
  <div class="frame8-container">
    <AppHeader active-page="mission" :navigation="navigation" />
    <div class="frame8-thq-frame-elm">
      <div class="frame8-thq-main-workspace-elm">
        <div class="frame8-thq-aside-sidebar-progress-elm">
          <div class="frame8-thq-container-elm10">
            <div class="frame8-thq-project-context-elm">
              <div class="frame8-thq-heading2-elm">
                <span class="frame8-thq-text-elm10">현재 프로젝트</span>
              </div>
              <div class="frame8-thq-container-elm11">
                <span class="frame8-thq-text-elm11">{{ mission.projectName }}</span>
              </div>
            </div>
            <div class="frame8-thq-progress-tracker-elm">
              <div class="frame8-thq-container-elm12">
                <div class="frame8-thq-container-elm13">
                  <span class="frame8-thq-text-elm12">진행률</span>
                </div>
                <div class="frame8-thq-container-elm14">
                  <span class="frame8-thq-text-elm13">{{ mission.progressText }}</span>
                </div>
              </div>
              <div class="frame8-thq-background-elm1">
                <img
                  alt="Background1649"
                  src="/background1649-mp9-200h.png"
                  class="frame8-thq-background-elm2"
                />
              </div>
              <div class="frame8-thq-steps-timeline-elm">
                <img
                  alt="VerticalDivider1649"
                  src="/verticaldivider1649-w4m1-200w.png"
                  class="frame8-thq-vertical-divider-elm"
                />
                <div class="frame8-thq-completed-steps-elm">
                  <div class="frame8-thq-container-elm15">
                    <span class="frame8-thq-text-elm14">{{ mission.steps[0] }}</span>
                  </div>
                  <img
                    alt="BackgroundBorder1649"
                    src="/backgroundborder1649-owfa-200h.png"
                    class="frame8-thq-background-border-elm1"
                  />
                </div>
                <div class="frame8-thq-container-elm16">
                  <div class="frame8-thq-container-elm17">
                    <span class="frame8-thq-text-elm15">{{ mission.steps[1] }}</span>
                  </div>
                  <img
                    alt="BackgroundBorder1650"
                    src="/backgroundborder1650-xvyg-200h.png"
                    class="frame8-thq-background-border-elm2"
                  />
                </div>
                <div class="frame8-thq-container-elm18">
                  <div class="frame8-thq-container-elm19">
                    <span class="frame8-thq-text-elm16">{{ mission.steps[2] }}</span>
                  </div>
                  <img
                    alt="BackgroundBorder1650"
                    src="/backgroundborder1650-wo3-200h.png"
                    class="frame8-thq-background-border-elm3"
                  />
                </div>
                <div class="frame8-thq-active-step-success-state-elm">
                  <div class="frame8-thq-container-elm20">
                    <span class="frame8-thq-text-elm17">{{ mission.steps[3] }}</span>
                  </div>
                  <div class="frame8-thq-overlay-elm">
                    <img
                      alt="Background1651"
                      src="/background1651-j3s9-200h.png"
                      class="frame8-thq-background-elm3"
                    />
                  </div>
                </div>
                <div class="frame8-thq-pending-steps-elm">
                  <div class="frame8-thq-container-elm21">
                    <span class="frame8-thq-text-elm18">{{ mission.steps[4] }}</span>
                  </div>
                  <img
                    alt="BackgroundBorder1651"
                    src="/backgroundborder1651-kqpl-200h.png"
                    class="frame8-thq-background-border-elm4"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="frame8-thq-main-content-area-elm">
          <div class="frame8-thq-successbanner-elm">
            <img
              alt="Container1651"
              src="/container1651-tvyn.svg"
              class="frame8-thq-container-elm22"
            />
            <div class="frame8-thq-container-elm23">
              <div class="frame8-thq-heading3-elm">
                <span class="frame8-thq-text-elm19">
                  {{ mission.successTitle }}
                </span>
              </div>
              <div class="frame8-thq-container-elm24">
                <span class="frame8-thq-text-elm20">
                  {{ mission.successMessage }}
                </span>
              </div>
            </div>
            <button class="frame8-thq-button-elm1">
              <span class="frame8-thq-text-elm21">다음 스텝으로 이동하기</span>
              <img
                alt="Container1652"
                src="/container1652-m4vd.svg"
                class="frame8-thq-container-elm25"
              />
            </button>
          </div>
          <div class="frame8-thq-mission-details-requirements-elm">
            <div class="frame8-thq-horizontal-border-elm">
              <div class="frame8-thq-container-elm26">
                <div class="frame8-thq-background-elm4">
                  <span class="frame8-thq-text-elm22">{{ mission.missionBadge }}</span>
                </div>
              </div>
              <div class="frame8-thq-heading1-elm">
                <span class="frame8-thq-text-elm23">
                  {{ mission.missionTitle }}
                </span>
              </div>
              <div class="frame8-thq-paragraph-elm1">
                <span class="frame8-thq-text-elm24">
                  {{ mission.missionDescription }}
                </span>
              </div>
            </div>
            <div class="frame8-thq-requirements-bento-grid-area-elm">
              <div class="frame8-thq-requirements-checklist-elm">
                <div class="frame8-thq-heading4-elm">
                  <img
                    alt="Container1654"
                    src="/container1654-ptvk.svg"
                    class="frame8-thq-container-elm27"
                  />
                  <span class="frame8-thq-text-elm27">요구사항 검증 결과</span>
                </div>
                <div class="frame8-thq-list-elm">
                  <div class="frame8-thq-item-elm1">
                    <img
                      alt="Margin1654"
                      src="/margin1654-sr3s.svg"
                      class="frame8-thq-margin-elm1"
                    />
                    <div class="frame8-thq-paragraph-elm2">
                      <span class="frame8-thq-text-elm28">
                        {{ mission.requirements[0] }}
                      </span>
                    </div>
                  </div>
                  <div class="frame8-thq-item-elm2">
                    <img
                      alt="Margin1655"
                      src="/margin1655-nrbh.svg"
                      class="frame8-thq-margin-elm2"
                    />
                    <span class="frame8-thq-text-elm31">
                      {{ mission.requirements[1] }}
                    </span>
                  </div>
                  <div class="frame8-thq-item-elm3">
                    <img
                      alt="Margin1655"
                      src="/margin1655-jzd.svg"
                      class="frame8-thq-margin-elm3"
                    />
                    <span class="frame8-thq-text-elm32">
                      {{ mission.requirements[2] }}
                    </span>
                  </div>
                  <div class="frame8-thq-item-elm4">
                    <img
                      alt="Margin1656"
                      src="/margin1656-toxi.svg"
                      class="frame8-thq-margin-elm4"
                    />
                    <span class="frame8-thq-text-elm33">
                      {{ mission.requirements[3] }}
                    </span>
                  </div>
                </div>
              </div>
              <div class="frame8-thq-code-snapshot-console-elm">
                <div class="frame8-thq-overlay-horizontal-border-elm">
                  <div class="frame8-thq-container-elm28">
                    <span class="frame8-thq-text-elm34">{{ mission.fileName }}</span>
                  </div>
                  <div class="frame8-thq-overlay-border-elm">
                    <span class="frame8-thq-text-elm35">{{ mission.status }}</span>
                  </div>
                </div>
                <div class="frame8-thq-container-elm29">
                  <div class="frame8-thq-pre-elm">
                    <div class="frame8-thq-code-elm">
                      <span class="frame8-thq-text-elm36">
                        <span class="frame8-thq-text-elm37">def</span>
                        <span class="frame8-thq-text-elm38">
                          <span v-html="raws3db"></span>
                        </span>
                        <span class="frame8-thq-text-elm39">add_numbers</span>
                        <span class="frame8-thq-text-elm40">(a, b):</span>
                        <br />
                        <span class="frame8-thq-text-elm41">
                          <span v-html="raw7jxo"></span>
                        </span>
                        <span class="frame8-thq-text-elm42">
                          &quot;&quot;&quot;두 수의 합을
                          반환합니다.&quot;&quot;&quot;
                        </span>
                        <br />
                        <span class="frame8-thq-text-elm43">
                          <span v-html="rawti7t"></span>
                        </span>
                        <span>return</span>
                      </span>
                      <span class="frame8-thq-text-elm45">
                        <span>a + b</span>
                        <br />
                        <br />
                      </span>
                      <span class="frame8-thq-text-elm47">
                        <span class="frame8-thq-text-elm48">
                          # Test Execution
                        </span>
                        <br />
                        <span class="frame8-thq-text-elm49">print</span>
                        <span class="frame8-thq-text-elm50">(add_numbers(</span>
                        <span class="frame8-thq-text-elm51">5</span>
                        <span class="frame8-thq-text-elm52">
                          ,
                          <span v-html="rawunom"></span>
                        </span>
                        <span class="frame8-thq-text-elm53">10</span>
                        <span class="frame8-thq-text-elm54">))</span>
                        <br />
                        <span>&gt; 15</span>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="frame8-thq-footer-elm">
        <div class="frame8-thq-container-elm30">
          <div class="frame8-thq-container-elm31">
            <span class="frame8-thq-text-elm56">Codemong</span>
          </div>
          <div class="frame8-thq-container-elm32">
            <span class="frame8-thq-text-elm57">
              © 2024 Codemong. GitHub 공식 API 연동을 사용합니다.
            </span>
          </div>
          <div class="frame8-thq-container-elm33">
            <div class="frame8-thq-link-elm1">
              <span class="frame8-thq-text-elm58">이용약관</span>
            </div>
            <div class="frame8-thq-link-elm2">
              <span class="frame8-thq-text-elm59">개인정보 처리방침</span>
            </div>
          </div>
        </div>
      </div>
      <div class="frame8-thq-header-top-nav-bar-elm">
        <div class="frame8-thq-container-elm34">
          <div class="frame8-thq-container-elm35">
            <div class="frame8-thq-link-brand-logo-elm">
              <span class="frame8-thq-text-elm60">Codemong</span>
            </div>
            <div class="frame8-thq-navigation-links-elm">
              <div class="frame8-thq-link-elm3">
                <span class="frame8-thq-text-elm61">프로젝트</span>
              </div>
              <div class="frame8-thq-link-elm4">
                <span class="frame8-thq-text-elm62">내 미션</span>
              </div>
              <div class="frame8-thq-link-elm5">
                <span class="frame8-thq-text-elm63">진행 현황</span>
              </div>
              <div class="frame8-thq-link-elm6">
                <span class="frame8-thq-text-elm64">도움말</span>
              </div>
            </div>
          </div>
          <div class="frame8-thq-trailing-actions-elm">
            <button class="frame8-thq-button-elm2">
              <span class="frame8-thq-text-elm65">GitHub로 시작하기</span>
            </button>
            <button class="frame8-thq-button-elm3">
              <img
                alt="Container1660"
                src="/container1660-orfm.svg"
                class="frame8-thq-container-elm36"
              />
            </button>
          </div>
        </div>
      </div>
    </div>
    <AppFooter />
  </div>
</template>

<script>
import AppFooter from '../components/AppFooter.vue'
import AppHeader from '../components/AppHeader.vue'
import { getMissionWorkspace, getNavigation } from '../api/codemong'

export default {
  name: 'MissionWorkspacePage',
  components: {
    AppFooter,
    AppHeader,
  },
  props: {},
  data() {
    return {
      navigation: [],
      mission: {
        projectName: '',
        progressText: '',
        steps: ['', '', '', '', ''],
        successTitle: '',
        successMessage: '',
        missionBadge: '',
        missionTitle: '',
        missionDescription: '',
        requirements: ['', '', '', ''],
        fileName: '',
        status: '',
      },
      raw65ae: ' ',
      rawcka7: ' ',
      raws3db: ' ',
      raw7jxo: ' ',
      rawti7t: ' ',
      rawunom: ' ',
    }
  },
  async created() {
    const [navigation, mission] = await Promise.all([getNavigation(), getMissionWorkspace()])
    this.navigation = navigation
    this.mission = mission
  },
  metaInfo: {
    title: '미션 워크스페이스',
    meta: [
      {
        property: 'og:title',
        content: '미션 워크스페이스',
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
@import '../styles/views/mission-workspace-page.css';
</style>

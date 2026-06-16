<template>
  <div class="frame12-container">
    <AppHeader active-page="progress" :navigation="navigation" />
    <div class="frame12-thq-frame-elm">
      <div class="frame12-thq-main-content-canvas-elm">
        <div class="frame12-thq-left-area-main-project-view-elm">
          <div class="frame12-thq-section-project-header-elm">
            <div class="frame12-thq-container-elm10">
              <div class="frame12-thq-container-elm11">
                <div class="frame12-thq-container-elm12">
                  <div class="frame12-thq-overlay-border-elm">
                    <span class="frame12-thq-text-elm10">{{ progress.stepBadge }}</span>
                  </div>
                  <div class="frame12-thq-container-elm13">
                    <img
                      alt="Container1693"
                      src="/container1693-op8t.svg"
                      class="frame12-thq-container-elm14"
                    />
                    <span class="frame12-thq-text-elm11">{{ progress.projectName }}</span>
                  </div>
                </div>
                <div class="frame12-thq-heading1-elm">
                  <span class="frame12-thq-text-elm12">
                    {{ progress.title }}
                  </span>
                </div>
              </div>
              <button class="frame12-thq-button-elm1">
                <img
                  alt="Container1693"
                  src="/container1693-3cel.svg"
                  class="frame12-thq-container-elm15"
                />
                <span class="frame12-thq-text-elm13">GitHub에서 코드 보기</span>
              </button>
            </div>
            <div class="frame12-thq-container-elm16">
              <span class="frame12-thq-text-elm14">
                <span>{{ progress.description }}</span>
              </span>
            </div>
            <div class="frame12-thq-requirements-checklist-elm">
              <div class="frame12-thq-background-horizontal-border-elm">
                <div class="frame12-thq-heading2-elm">
                  <span class="frame12-thq-text-elm17">요구사항 목록</span>
                </div>
                <div class="frame12-thq-container-elm17">
                  <span class="frame12-thq-text-elm18">{{ progress.requirementStatus }}</span>
                </div>
              </div>
              <div class="frame12-thq-list-elm1">
                <div class="frame12-thq-completed-item-elm">
                  <img
                    alt="Margin1695"
                    src="/margin1695-hhvr.svg"
                    class="frame12-thq-margin-elm1"
                  />
                  <div class="frame12-thq-container-elm18">
                    <div class="frame12-thq-container-elm19">
                      <span class="frame12-thq-text-elm19">
                        {{ progress.requirements[0].title }}
                      </span>
                    </div>
                    <div class="frame12-thq-container-elm20">
                      <span class="frame12-thq-text-elm20">
                        {{ progress.requirements[0].description }}
                      </span>
                    </div>
                  </div>
                </div>
                <div class="frame12-thq-failing-item-elm">
                  <img
                    alt="Margin1695"
                    src="/margin1695-4385.svg"
                    class="frame12-thq-margin-elm2"
                  />
                  <div class="frame12-thq-container-elm21">
                    <div class="frame12-thq-container-elm22">
                      <span class="frame12-thq-text-elm21">{{ progress.requirements[1].title }}</span>
                    </div>
                    <div class="frame12-thq-container-elm23">
                      <img
                        alt="Container1696"
                        src="/container1696-0nwt.svg"
                        class="frame12-thq-container-elm24"
                      />
                      <span class="frame12-thq-text-elm22">
                        {{ progress.requirements[1].description }}
                      </span>
                    </div>
                  </div>
                </div>
                <div class="frame12-thq-pending-item-elm">
                  <img
                    alt="Margin1696"
                    src="/margin1696-mjfi.svg"
                    class="frame12-thq-margin-elm3"
                  />
                  <div class="frame12-thq-container-elm25">
                    <div class="frame12-thq-container-elm26">
                      <span class="frame12-thq-text-elm23">
                        {{ progress.requirements[2].title }}
                      </span>
                    </div>
                    <div class="frame12-thq-container-elm27">
                      <span class="frame12-thq-text-elm24">
                        {{ progress.requirements[2].description }}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="frame12-thq-primary-action-area-elm">
              <button class="frame12-thq-button-elm2">
                <span class="frame12-thq-text-elm25">다음 스텝으로</span>
              </button>
              <button class="frame12-thq-button-elm3">
                <img
                  alt="Container1697"
                  src="/container1697-pa8j.svg"
                  class="frame12-thq-container-elm28"
                />
                <span class="frame12-thq-text-elm26">검사하기</span>
              </button>
            </div>
          </div>
        </div>
        <div class="frame12-thq-right-area-sidebar-status-elm">
          <div class="frame12-thq-aside-progress-widget-elm">
            <div class="frame12-thq-heading3-elm1">
              <span class="frame12-thq-text-elm27">진행 현황</span>
            </div>
            <div class="frame12-thq-container-elm29">
              <div class="frame12-thq-container-elm30">
                <div class="frame12-thq-container-elm31">
                  <span class="frame12-thq-text-elm28">{{ progress.progressLabel }}</span>
                </div>
                <div class="frame12-thq-container-elm32">
                  <span class="frame12-thq-text-elm29">{{ progress.progressPercent }}</span>
                </div>
              </div>
              <div class="frame12-thq-background-elm1">
                <img
                  alt="Background1699"
                  src="/background1699-rzg-200h.png"
                  class="frame12-thq-background-elm2"
                />
              </div>
            </div>
            <div class="frame12-thq-vertical-border-elm">
              <div class="frame12-thq-container-elm33">
                <div class="frame12-thq-container-elm34">
                  <span class="frame12-thq-text-elm30">1단계</span>
                </div>
                <div class="frame12-thq-background-elm3">
                  <img
                    alt="OverlayShadow1699"
                    src="/overlayshadow1699-4y3-200h.png"
                    class="frame12-thq-overlay-shadow-elm1"
                  />
                </div>
                <div class="frame12-thq-container-elm35">
                  <span class="frame12-thq-text-elm31">{{ progress.steps[0] }}</span>
                </div>
              </div>
              <div class="frame12-thq-container-elm36">
                <div class="frame12-thq-container-elm37">
                  <span class="frame12-thq-text-elm32">2단계</span>
                </div>
                <div class="frame12-thq-background-elm4">
                  <img
                    alt="OverlayShadow1610"
                    src="/overlayshadow1610-nf1r-200h.png"
                    class="frame12-thq-overlay-shadow-elm2"
                  />
                </div>
                <div class="frame12-thq-container-elm38">
                  <span class="frame12-thq-text-elm33">{{ progress.steps[1] }}</span>
                </div>
              </div>
              <div class="frame12-thq-container-elm39">
                <div class="frame12-thq-container-elm40">
                  <span class="frame12-thq-text-elm34">3단계 (현재)</span>
                </div>
                <div class="frame12-thq-container-elm41">
                  <span class="frame12-thq-text-elm35">{{ progress.steps[2] }}</span>
                </div>
                <div class="frame12-thq-background-elm5">
                  <img
                    alt="OverlayShadow1610"
                    src="/overlayshadow1610-x5w8-200h.png"
                    class="frame12-thq-overlay-shadow-elm3"
                  />
                </div>
              </div>
              <div class="frame12-thq-container-elm42">
                <div class="frame12-thq-container-elm43">
                  <span class="frame12-thq-text-elm36">4단계</span>
                </div>
                <div class="frame12-thq-background-elm6">
                  <img
                    alt="OverlayShadow1610"
                    src="/overlayshadow1610-kjda-200h.png"
                    class="frame12-thq-overlay-shadow-elm4"
                  />
                </div>
                <div class="frame12-thq-container-elm44">
                  <span class="frame12-thq-text-elm37">{{ progress.steps[3] }}</span>
                </div>
              </div>
            </div>
          </div>
          <div class="frame12-thq-aside-recent-activity-widget-elm">
            <div class="frame12-thq-heading3-elm2">
              <span class="frame12-thq-text-elm38">최근 활동 내역</span>
            </div>
            <div class="frame12-thq-list-elm2">
              <div class="frame12-thq-item-elm1">
                <div class="frame12-thq-overlay-elm1">
                  <img
                    alt="Container1610"
                    src="/container1610-fwgq.svg"
                    class="frame12-thq-container-elm45"
                  />
                </div>
                <div class="frame12-thq-container-elm46">
                  <div class="frame12-thq-container-elm47">
                    <span class="frame12-thq-text-elm39">
                      {{ progress.activities[0].title }}
                    </span>
                  </div>
                  <div class="frame12-thq-container-elm48">
                    <span class="frame12-thq-text-elm40">{{ progress.activities[0].time }}</span>
                  </div>
                </div>
              </div>
              <div class="frame12-thq-item-elm2">
                <div class="frame12-thq-overlay-elm2">
                  <img
                    alt="Container1610"
                    src="/container1610-enr8s.svg"
                    class="frame12-thq-container-elm49"
                  />
                </div>
                <div class="frame12-thq-container-elm50">
                  <div class="frame12-thq-container-elm51">
                    <span class="frame12-thq-text-elm41">
                      {{ progress.activities[1].title }}
                    </span>
                  </div>
                  <div class="frame12-thq-container-elm52">
                    <span class="frame12-thq-text-elm42">{{ progress.activities[1].time }}</span>
                  </div>
                </div>
              </div>
              <div class="frame12-thq-item-elm3">
                <div class="frame12-thq-background-elm7">
                  <img
                    alt="Container1610"
                    src="/container1610-c5h.svg"
                    class="frame12-thq-container-elm53"
                  />
                </div>
                <div class="frame12-thq-container-elm54">
                  <div class="frame12-thq-container-elm55">
                    <span class="frame12-thq-text-elm43">{{ progress.activities[2].title }}</span>
                  </div>
                  <div class="frame12-thq-container-elm56">
                    <span class="frame12-thq-text-elm44">{{ progress.activities[2].time }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="frame12-thq-footer-elm">
        <div class="frame12-thq-container-elm57">
          <div class="frame12-thq-container-elm58">
            <div class="frame12-thq-container-elm59">
              <span class="frame12-thq-text-elm45">Codemong</span>
            </div>
            <div class="frame12-thq-container-elm60">
              <span class="frame12-thq-text-elm46">
                © 2024 Codemong. GitHub 공식 API 연동을 사용합니다.
              </span>
            </div>
          </div>
          <div class="frame12-thq-nav-elm1">
            <div class="frame12-thq-link-elm1">
              <span class="frame12-thq-text-elm47">이용약관</span>
            </div>
            <div class="frame12-thq-link-elm2">
              <span class="frame12-thq-text-elm48">개인정보 처리방침</span>
            </div>
          </div>
        </div>
      </div>
      <div class="frame12-thq-header-top-nav-bar-elm">
        <div class="frame12-thq-container-elm61">
          <div class="frame12-thq-container-elm62">
            <div class="frame12-thq-link-elm3">
              <span class="frame12-thq-text-elm49">Codemong</span>
            </div>
            <div class="frame12-thq-nav-elm2">
              <div class="frame12-thq-link-elm4">
                <span class="frame12-thq-text-elm50">프로젝트</span>
              </div>
              <div class="frame12-thq-link-elm5">
                <span class="frame12-thq-text-elm51">내 미션</span>
              </div>
              <div class="frame12-thq-link-elm6">
                <span class="frame12-thq-text-elm52">진행 현황</span>
              </div>
              <div class="frame12-thq-link-elm7">
                <span class="frame12-thq-text-elm53">도움말</span>
              </div>
            </div>
          </div>
          <div class="frame12-thq-container-elm63">
            <button class="frame12-thq-button-elm4">
              <span class="frame12-thq-text-elm54">GitHub로 시작하기</span>
            </button>
            <button class="frame12-thq-button-elm5">
              <img
                alt="Container1610"
                src="/container1610-amg.svg"
                class="frame12-thq-container-elm64"
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
import { getMissionProgress, getNavigation } from '../api/codemong'

export default {
  name: 'Mission진행 현황Page',
  components: {
    AppFooter,
    AppHeader,
  },
  props: {},
  data() {
    return {
      navigation: [],
      progress: {
        stepBadge: '',
        projectName: '',
        title: '',
        description: '',
        requirementStatus: '',
        requirements: [
          { title: '', description: '' },
          { title: '', description: '' },
          { title: '', description: '' },
        ],
        progressLabel: '',
        progressPercent: '',
        steps: ['', '', '', ''],
        activities: [
          { title: '', time: '' },
          { title: '', time: '' },
          { title: '', time: '' },
        ],
      },
    }
  },
  async created() {
    const [navigation, progress] = await Promise.all([getNavigation(), getMissionProgress()])
    this.navigation = navigation
    this.progress = progress
  },
  metaInfo: {
    title: 'Mission 진행 현황',
    meta: [
      {
        property: 'og:title',
        content: 'Mission 진행 현황',
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
@import '../styles/views/mission-progress-page.css';
</style>

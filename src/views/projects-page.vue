<template>
  <div class="frame5-container">
    <AppHeader active-page="projects" :navigation="navigation" />
    <div class="frame5-thq-frame-elm">
      <div class="frame5-thq-main-content-canvas-elm">
        <div class="frame5-thq-left-column-project-list-elm">
          <div class="frame5-thq-margin-elm1">
            <div class="frame5-thq-container-elm10">
              <div class="frame5-thq-heading1-elm">
                <span class="frame5-thq-text-elm10">{{ page.title }}</span>
              </div>
              <div class="frame5-thq-container-elm11">
                <span class="frame5-thq-text-elm11">{{ page.description }}</span>
              </div>
            </div>
          </div>

          <div class="frame5-thq-container-elm12">
            <div
              v-for="(project, index) in projects"
              :key="project.id"
              :class="cardClass(index, project)"
              @click="selectProject(project)"
            >
              <div :class="`frame5-thq-container-elm${13 + index * 8}`">
                <span :class="`frame5-thq-text-elm${12 + index * 5}`">{{ project.title }}</span>
                <div :class="`frame5-thq-background-elm${index + 1}`">
                  <span :class="`frame5-thq-text-elm${13 + index * 5}`">{{ project.difficulty }}</span>
                </div>
              </div>
              <div :class="`frame5-thq-container-elm${14 + index * 8}`">
                <span :class="`frame5-thq-text-elm${14 + index * 5}`">{{ project.description }}</span>
              </div>
              <div :class="`frame5-thq-horizontal-border-elm${index + 1}`">
                <div :class="`frame5-thq-container-elm${15 + index * 8}`">
                  <img
                    alt=""
                    :src="projectMetaIcons[index].category"
                    :class="`frame5-thq-container-elm${16 + index * 8}`"
                  />
                  <div :class="`frame5-thq-container-elm${17 + index * 8}`">
                    <span :class="`frame5-thq-text-elm${15 + index * 5}`">{{ project.category }}</span>
                  </div>
                </div>
                <div :class="`frame5-thq-container-elm${18 + index * 8}`">
                  <img
                    alt=""
                    :src="projectMetaIcons[index].steps"
                    :class="`frame5-thq-container-elm${19 + index * 8}`"
                  />
                  <div :class="`frame5-thq-container-elm${20 + index * 8}`">
                    <span :class="`frame5-thq-text-elm${16 + index * 5}`">{{ project.steps }}단계</span>
                  </div>
                </div>
              </div>
              <img
                v-if="project.id === selectedProject.id"
                alt=""
                src="/background1615-6gjxe-200w.png"
                class="frame5-thq-background-elm4"
              />
            </div>
          </div>
        </div>

        <div class="frame5-thq-aside-right-sidebar-project-detail-summary-elm">
          <div class="frame5-thq-background-border-elm">
            <img
              alt=""
              src="/overlayshadow1615-nnay-500h.png"
              class="frame5-thq-overlay-shadow-elm"
            />
            <div class="frame5-thq-container-elm37">
              <div class="frame5-thq-container-elm38">
                <div class="frame5-thq-background-elm5">
                  <span class="frame5-thq-text-elm27">{{ selectedProject.category }}</span>
                </div>
                <div class="frame5-thq-background-elm6">
                  <span class="frame5-thq-text-elm28">{{ selectedProject.difficulty }}</span>
                </div>
              </div>
              <div class="frame5-thq-heading2-elm">
                <span class="frame5-thq-text-elm29">{{ selectedProject.title }}</span>
              </div>
              <div class="frame5-thq-container-elm39">
                <span class="frame5-thq-text-elm30">{{ selectedProject.description }}</span>
              </div>
            </div>

            <div class="frame5-thq-container-elm40">
              <div class="frame5-thq-heading4-elm1">
                <span class="frame5-thq-text-elm34">핵심 학습 목표</span>
              </div>
              <div class="frame5-thq-list-elm">
                <div
                  v-for="(goal, index) in selectedProject.goals"
                  :key="goal"
                  :class="`frame5-thq-item-elm${index + 1}`"
                >
                  <img
                    alt=""
                    :src="goalIcons[index]"
                    :class="`frame5-thq-margin-elm${index + 2}`"
                  />
                  <span :class="`frame5-thq-text-elm${35 + index}`">{{ goal }}</span>
                </div>
              </div>
            </div>

            <div class="frame5-thq-container-elm41">
              <div class="frame5-thq-heading4-elm2">
                <span class="frame5-thq-text-elm38">기술 스택</span>
              </div>
              <div class="frame5-thq-container-elm42">
                <div
                  v-for="(stack, index) in selectedProject.stacks"
                  :key="stack"
                  :class="`frame5-thq-border-elm${index + 1}`"
                >
                  <span :class="`frame5-thq-text-elm${39 + index}`">{{ stack }}</span>
                </div>
              </div>
            </div>

            <button class="frame5-thq-button-elm1" @click="$router.push('/project-setup')">
              <div class="frame5-thq-container-elm43">
                <span class="frame5-thq-text-elm43">시작 스텝 선택하기</span>
              </div>
              <img alt="" src="/container1616-i30t.svg" class="frame5-thq-container-elm44" />
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
import { getNavigation, getProjects } from '../api/codemong'

const emptyProject = {
  id: '',
  title: '',
  difficulty: '',
  category: '',
  steps: 0,
  description: '',
  goals: [],
  stacks: [],
}

export default {
  name: 'ProjectsPage',
  components: {
    AppFooter,
    AppHeader,
  },
  props: {},
  data() {
    return {
      navigation: [],
      page: {
        title: '',
        description: '',
      },
      projects: [emptyProject, emptyProject, emptyProject],
      selectedProject: {
        ...emptyProject,
        goals: ['', '', ''],
        stacks: ['', '', '', ''],
      },
      goalIcons: ['/margin1615-5ajf.svg', '/margin1615-td2fpf.svg', '/margin1615-yev.svg'],
      projectMetaIcons: [
        { category: '/container1615-fzak.svg', steps: '/container1615-da6f.svg' },
        { category: '/container1615-up1b.svg', steps: '/container1615-rtlk.svg' },
        { category: '/container1615-uume.svg', steps: '/container1615-t2c.svg' },
      ],
    }
  },
  async created() {
    const [navigation, page] = await Promise.all([getNavigation(), getProjects()])
    this.navigation = navigation
    this.page = page
    this.projects = page.projects
    this.selectedProject = page.projects.find((project) => project.id === page.selectedId) || page.projects[0]
  },
  methods: {
    cardClass(index, project) {
      if (project.id === this.selectedProject.id) return 'frame5-thq-project-card1-active-elm'
      return index === 0 ? 'frame5-thq-project-card2-elm' : 'frame5-thq-project-card3-elm'
    },
    selectProject(project) {
      this.selectedProject = project
    },
  },
  metaInfo: {
    title: '프로젝트',
    meta: [
      {
        property: 'og:title',
        content: '프로젝트',
      },
    ],
  },
}
</script>

<style scoped>
@import '../styles/views/projects-page.css';
</style>

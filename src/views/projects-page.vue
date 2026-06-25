<template>
  <div class="app-shell">
    <AppHeader active-page="projects" />
    <main class="projects-page fx-grid-bg">
      <section class="projects-hero">
        <img :src="heroImage" alt="Developers reviewing code on monitors" />
        <div>
          <span class="badge">Project Catalog</span>
          <h1>실전 프로젝트로 스텝을 열어가세요</h1>
          <p>starter 코드, GitHub 브랜치, AI 기반 피드백을 하나의 학습 흐름으로 묶었습니다.</p>
        </div>
      </section>

      <section class="page project-catalog">
        <div class="project-list">
          <p v-if="error" class="status fail">{{ error }}</p>
          <article
            v-for="project in projects"
            :key="project.id"
            class="project-card-rich project-card-no-image"
            :class="{ selected: selected && selected.id === project.id }"
            @click="select(project)"
          >
            <div class="project-icon">{{ project.type }}</div>
            <div>
              <span class="badge">{{ project.category }}</span>
              <h2>{{ project.title || project.name }}</h2>
              <p v-html="formatProjectDescription(project.description)"></p>
              <div class="project-meta">
                <span>{{ maxStep(project) }} steps</span>
                <span>{{ project.difficulty }}</span>
                <span>{{ project.type }}</span>
              </div>
            </div>
          </article>
        </div>

        <aside class="project-detail-rich" v-if="selected">
          <span class="badge">{{ selected.category }}</span>
          <h2>{{ selected.title || selected.name }}</h2>
          <p v-html="formatProjectDescription(selected.description)"></p>
          <div class="detail-block">
            <h3>학습 목표</h3>
            <ul class="check-list detail-check-list">
              <li v-for="goal in selected.goals" :key="goal">{{ goal }}</li>
            </ul>
          </div>
          <div class="detail-block">
            <h3>기술 스택</h3>
            <div class="tag-row detail-tag-row">
              <span v-for="stack in projectStacks(selected)" :key="stack">{{ stack }}</span>
            </div>
          </div>
          <button class="primary" type="button" @click="goSetup">시작 스텝 선택</button>
        </aside>
      </section>
    </main>
    <AppFooter />
  </div>
</template>

<script>
import AppFooter from '../components/AppFooter.vue'
import AppHeader from '../components/AppHeader.vue'
import { getProjects, saveSelectedProject } from '../api/codemong'
import { escapeHtml } from '../utils/markdown'

const PROJECT_STACKS = {
  jpa: ['Spring Boot', 'JPA'],
  'security-lab': ['Spring Boot', 'Spring Security'],
  market: ['Spring Boot', 'JPA', 'CRUD', 'MultiMedia'],
  mmcafe: ['Spring Boot', 'JPA', 'CRUD'],
}

export default {
  name: 'ProjectsPage',
  components: { AppFooter, AppHeader },
  data() {
    return {
      projects: [],
      selected: null,
      error: '',
      heroImage: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1400&q=80',
    }
  },
  async created() {
    try {
      this.projects = await getProjects()
      this.selected = this.projects[0] || null
      if (!this.projects.length) this.error = '등록된 프로젝트가 없습니다. 백엔드 seed 데이터를 확인하세요.'
    } catch (error) {
      this.error = error.message
    }
  },
  methods: {
    select(project) {
      this.selected = project
    },
    maxStep(project) {
      return project.maxStep || project.steps || 5
    },
    formatProjectDescription(description) {
      return escapeHtml(description || '').replace(/백엔드\s+프로젝트/g, '백엔드<br>프로젝트')
    },
    projectStacks(project) {
      if (!project) return []
      const candidates = [
        project.type,
        project.name,
        project.title,
        project.key,
        project.slug,
      ].filter(Boolean).map(value => String(value).toLowerCase())

      const matchedKey = Object.keys(PROJECT_STACKS).find(key => {
        return candidates.some(value => value === key || value.includes(key))
      })

      return matchedKey ? PROJECT_STACKS[matchedKey] : project.stacks || []
    },
    goSetup() {
      saveSelectedProject(this.selected)
      this.$router.push('/project-setup')
    },
  },
}
</script>


import Vue from 'vue'
import App from './App.vue'
import router from './router'
import LottieVuePlayer from '@lottiefiles/vue-lottie-player'

Vue.use(LottieVuePlayer)
Vue.config.productionTip = false

const classRoutes = {
  'frame6-thq-button-elm1': '/login',
  'frame6-thq-button-elm2': '/projects',
  'frame6-thq-button-elm3': '/projects',
  'frame6-thq-button-elm4': '/login',
  'frame6-thq-button-elm5': '/login',
  'frame1-thq-button-elm': '/projects',
  'frame5-thq-project-card2-elm': '/project-setup',
  'frame5-thq-project-card3-elm': '/project-setup',
  'frame5-thq-project-card1-elm': '/project-setup',
  'frame5-thq-project-card1-active-elm': '/project-setup',
  'frame5-thq-button-elm1': '/project-setup',
  'frame5-thq-button-elm2': '/mission-workspace',
  'frame5-thq-button-elm3': '/login',
  'frame9-thq-button-elm1': '/project-initializing',
  'frame9-thq-button-elm2': '/login',
  'frame9-thq-button-elm3': '/mission-workspace',
  'frame8-thq-button-elm1': '/mission-progress',
  'frame8-thq-button-elm2': '/login',
  'frame8-thq-button-elm3': '/mission-workspace',
  'frame12-thq-button-elm1': '/mission-workspace',
  'frame12-thq-button-elm2': '/next-step-loading',
  'frame12-thq-button-elm3': '/inspection-running',
  'frame12-thq-button-elm4': '/login',
  'frame12-thq-button-elm5': '/mission-workspace',
  'frame2-thq-button-elm1': '/mission-progress',
  'frame2-thq-button-elm2': '/inspection-running',
  'frame2-thq-button-elm3': '/next-step-loading',
  'frame2-thq-button-elm4': '/login',
  'frame2-thq-button-elm5': '/mission-workspace',
  'frame4-thq-button-cta-elm': '/next-step-loading',
  'frame4-thq-button-elm1': '/login',
  'frame4-thq-button-elm2': '/mission-workspace',
  'frame7-thq-button-elm1': '/projects',
  'frame7-thq-button-elm2': '/mission-progress',
  'frame7-thq-button-elm3': '/login',
  'frame7-thq-button-elm4': '/mission-workspace',
  'frame-ai-thq-button-elm1': '/mission-progress',
  'frame-ai-thq-button-elm2': '/mission-failed',
  'frame-ai-thq-button-elm3': '/frontend-ai-feedback',
  'frame-ai-thq-button-elm4': '/login',
  'frame-ai-thq-button-elm5': '/mission-workspace',
  'frame-ai1-thq-button-elm1': '/backend-ai-feedback',
  'frame-ai1-thq-button-elm2': '/mission-progress',
  'frame-ai1-thq-button-elm3': '/login',
  'frame-ai1-thq-button-elm4': '/mission-workspace',
  'frame-thq-loading-action-button-elm': '/code-quality-running',
  'frame-thq-button-elm': '/frontend-ai-feedback',
  'frame10-thq-loading-button-state-elm': '/inspection-running',
  'frame10-thq-button-elm': '/mission-workspace',
  'frame3-thq-button-elm1': '/login',
  'frame3-thq-button-elm2': '/mission-workspace',
  'frame11-thq-button-elm1': '/login',
  'frame11-thq-button-elm2': '/mission-workspace',
}

const navTextRoutes = {
  Codemong: '/',
  Projects: '/projects',
  프로젝트: '/projects',
  'My Missions': '/mission-workspace',
  '내 미션': '/mission-workspace',
  Progress: '/mission-progress',
  '진행 현황': '/mission-progress',
  Help: '/help',
  도움말: '/help',
  'GitHub로 시작하기': '/login',
  이용약관: '/help',
  '개인정보 처리방침': '/help',
}

function pushRoute(path) {
  if (!path || router.currentRoute.path === path) return
  router.push(path).catch(() => {})
}

document.addEventListener('click', event => {
  const target = event.target.closest('button, [class*="link-elm"], [class*="project-card"]')
  if (!target) return

  const classRoute = Object.keys(classRoutes).find(className =>
    target.classList.contains(className)
  )

  if (classRoute) {
    pushRoute(classRoutes[classRoute])
    return
  }

  const text = target.textContent.trim()
  pushRoute(navTextRoutes[text])
})

let transitionTimer = null
router.afterEach(to => {
  clearTimeout(transitionTimer)

  const nextRouteByName = {
    ProjectInitializingPage: '/mission-workspace',
    InspectionRunningPage: '/frontend-ai-feedback',
    CodeQualityRunningPage: '/frontend-ai-feedback',
    NextStepLoadingPage: '/completion',
  }

  const nextRoute = nextRouteByName[to.name]
  if (nextRoute) {
    transitionTimer = setTimeout(() => pushRoute(nextRoute), 1500)
  }
})

new Vue({
  render: h => h(App),
  router
}).$mount('#app')

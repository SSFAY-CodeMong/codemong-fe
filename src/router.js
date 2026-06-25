import Vue from 'vue'
import Router from 'vue-router'
import Meta from 'vue-meta'

import MainPage from './views/main-page'
import LoginPage from './views/login-page'
import ProjectsPage from './views/projects-page'
import ProjectSetupPage from './views/project-setup-page'
import ProjectInitializingPage from './views/project-initializing-page'
import MissionWorkspacePage from './views/mission-workspace-page'
import MissionProgressPage from './views/mission-progress-page'
import MissionFailedPage from './views/mission-failed-page'
import MissionPassedPage from './views/mission-passed-page'
import InspectionRunningPage from './views/inspection-running-page'
import CodeQualityRunningPage from './views/code-quality-running-page'
import FrontendAiFeedbackPage from './views/frontend-ai-feedback-page'
import BackendAiFeedbackPage from './views/backend-ai-feedback-page'
import NextStepLoadingPage from './views/next-step-loading-page'
import CompletionPage from './views/completion-page'
import ReportsPage from './views/reports-page'
import MailServicePage from './views/mail-service-page'
import HelpPage from './views/help-page'
import NotFoundPage from './views/not-found-page'
import './style.css'

Vue.use(Router)
Vue.use(Meta)

export default new Router({
  mode: 'history',
  routes: [
    {
      name: 'MainPage',
      path: '/',
      component: MainPage,
    },
    {
      name: 'LoginPage',
      path: '/login',
      component: LoginPage,
    },
    {
      name: 'ProjectsPage',
      path: '/projects',
      component: ProjectsPage,
    },
    {
      name: 'ProjectSetupPage',
      path: '/project-setup',
      component: ProjectSetupPage,
    },
    {
      name: 'ProjectInitializingPage',
      path: '/project-initializing',
      component: ProjectInitializingPage,
    },
    {
      name: 'MissionWorkspacePage',
      path: '/mission-workspace',
      component: MissionWorkspacePage,
    },
    {
      name: 'MissionProgressPage',
      path: '/mission-progress',
      component: MissionProgressPage,
    },
    {
      name: 'MissionFailedPage',
      path: '/mission-failed',
      component: MissionFailedPage,
    },
    {
      name: 'MissionPassedPage',
      path: '/mission-passed',
      component: MissionPassedPage,
    },
    {
      name: 'InspectionRunningPage',
      path: '/inspection-running',
      component: InspectionRunningPage,
    },
    {
      name: 'CodeQualityRunningPage',
      path: '/code-quality-running',
      component: CodeQualityRunningPage,
    },
    {
      name: 'FrontendAiFeedbackPage',
      path: '/frontend-ai-feedback',
      component: FrontendAiFeedbackPage,
    },
    {
      name: 'BackendAiFeedbackPage',
      path: '/backend-ai-feedback',
      component: BackendAiFeedbackPage,
    },
    {
      name: 'NextStepLoadingPage',
      path: '/next-step-loading',
      component: NextStepLoadingPage,
    },
    {
      name: 'CompletionPage',
      path: '/completion',
      component: CompletionPage,
    },
    {
      name: 'ReportsPage',
      path: '/reports',
      component: ReportsPage,
    },
    {
      name: 'MailServicePage',
      path: '/mail-service',
      redirect: '/mail-service/settings',
    },
    {
      name: 'MailServiceSettingsPage',
      path: '/mail-service/settings',
      component: MailServicePage,
      props: { section: 'settings' },
    },
    {
      name: 'MailServiceSolvePage',
      path: '/mail-service/solve',
      component: MailServicePage,
      props: { section: 'solve' },
    },
    {
      name: 'MailServiceContentsPage',
      path: '/mail-service/contents',
      component: MailServicePage,
      props: { section: 'contents' },
    },
    {
      name: 'MailServiceLogsPage',
      path: '/mail-service/logs',
      redirect: '/mail-service/settings',
    },
    {
      name: 'HelpPage',
      path: '/help',
      component: HelpPage,
    },
    {
      name: '404 - Not Found',
      path: '**',
      component: NotFoundPage,
      fallback: true,
    },
  ],
})

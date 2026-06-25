const API_BASE_URL = process.env.VUE_APP_API_BASE_URL || 'http://localhost:8080'
const TOKEN_KEY = 'codemong_access_token'
const PROJECT_KEY = 'codemong_selected_project'
const REPOSITORY_KEY = 'codemong_repository'
const CHECK_KEY = 'codemong_check_id'
const CHECK_RESULT_KEY = 'codemong_check_result'
const CHECK_REQUEST_KEY = 'codemong_check_request'
const START_REQUEST_KEY = 'codemong_project_start_request'
const LOGIN_REISSUE_PENDING_KEY = 'codemong_login_reissue_pending'
const LOGGED_OUT_KEY = 'codemong_logged_out'
const ADMIN_TOKEN_KEY = 'codemong_admin_token'

let reissuePromise = null
let currentUser = null
let mePromise = null

export const getNavigation = () => [
  { key: 'projects', label: '프로젝트', path: '/projects' },
  { key: 'mission', label: '미션', path: '/mission-workspace' },
  { key: 'progress', label: '진행 현황', path: '/mission-progress' },
  { key: 'reports', label: '리포트', path: '/reports' },
  { key: 'mail', label: '데일리몽', path: '/mail-service/settings' },
  { key: 'help', label: '도움말', path: '/help' },
]

function getToken() {
  return window.localStorage.getItem(TOKEN_KEY)
}

export function hasAccessToken() {
  return Boolean(getToken())
}

export function setToken(token) {
  if (token) {
    window.localStorage.setItem(TOKEN_KEY, token)
    clearLoggedOut()
  }
}

export function clearSession() {
  window.localStorage.removeItem(TOKEN_KEY)
  window.localStorage.removeItem(REPOSITORY_KEY)
  window.localStorage.removeItem(CHECK_KEY)
  window.localStorage.removeItem(CHECK_RESULT_KEY)
  window.localStorage.removeItem(CHECK_REQUEST_KEY)
  window.localStorage.removeItem(START_REQUEST_KEY)
  currentUser = null
}

export function getAdminToken() {
  return window.localStorage.getItem(ADMIN_TOKEN_KEY)
}

export function clearAdminToken() {
  window.localStorage.removeItem(ADMIN_TOKEN_KEY)
}

function markLoggedOut() {
  window.sessionStorage.setItem(LOGGED_OUT_KEY, 'true')
  clearLoginRedirectReissue()
}

function clearLoggedOut() {
  window.sessionStorage.removeItem(LOGGED_OUT_KEY)
}

function isLoggedOut() {
  return window.sessionStorage.getItem(LOGGED_OUT_KEY) === 'true'
}

function apiError(message, status) {
  const error = new Error(message)
  error.status = status
  return error
}

async function request(path, options = {}) {
  const { auth = false, adminAuth = false, isRetry = false, skipAuthHeader = false, errorRedirect = true, ...fetchOptions } = options
  const isAdminPath = path.startsWith('/admin')
  if (auth && isLoggedOut()) {
    throw new Error('로그인이 필요합니다.')
  }

  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    ...(fetchOptions.headers || {}),
  }
  const token = getToken()
  if (!skipAuthHeader && token && path !== '/auth/reissue') headers.Authorization = `Bearer ${token}`

  let response
  try {
    response = await window.fetch(`${API_BASE_URL}${path}`, {
      credentials: 'include',
      ...fetchOptions,
      headers,
    })
  } catch (error) {
    if (errorRedirect) redirectToErrorPage(500)
    throw apiError('백엔드 서버가 꺼져 있거나 로그인 세션이 없습니다.', 500)
  }

  if (response.status === 204) return null
  const text = await response.text()
  let data = null
  try {
    data = text ? JSON.parse(text) : null
  } catch (error) {
    if (errorRedirect) redirectToErrorPage(response.status)
    throw apiError('API가 JSON이 아닌 응답을 반환했습니다. 로그인 상태를 확인하세요.', response.status)
  }

  if (!response.ok) {
    const message = data && (data.message || data.error || data.errorCode)

    if (adminAuth && (response.status === 401 || response.status === 403)) {
      clearAdminToken()
      throw apiError('관리자 세션이 만료되었습니다. 다시 로그인해주세요.', response.status)
    }
    
    // access token 만료 감지 (401 Unauthorized 상태코드 또는 에러메시지에 EXPIRED_TOKEN 등이 포함된 경우)
    const isTokenExpired = response.status === 401 || (message && (
      String(message).includes('EXPIRED_TOKEN') || 
      String(message).includes('expired') || 
      String(message).includes('Expired')
    ))

    if (isTokenExpired && !adminAuth && !isAdminPath && !isRetry && path !== '/auth/reissue' && !isLoggedOut()) {
      try {
        const newAccessToken = await reissueToken()
        const nextOptions = { ...options, isRetry: true }
        if (nextOptions.headers) {
          nextOptions.headers = {
            ...nextOptions.headers,
            Authorization: `Bearer ${newAccessToken}`,
          }
        }
        return await request(path, nextOptions)
      } catch (reissueError) {
        clearSession()
        redirectToLogin()
        throw apiError('세션이 만료되었습니다. 다시 로그인해주세요.', 401)
      }
    }

    if (errorRedirect) redirectToErrorPage(response.status)
    throw apiError(message || `HTTP ${response.status}`, response.status)
  }
  return data
}

export async function reissueToken() {
  if (!reissuePromise) {
    reissuePromise = request('/auth/reissue', { method: 'POST', errorRedirect: false })
      .then(data => {
        setToken(data.accessToken)
        return data.accessToken
      })
      .finally(() => {
        reissuePromise = null
      })
  }
  return reissuePromise
}

export function loginWithGithub() {
  clearLoggedOut()
  window.sessionStorage.setItem(LOGIN_REISSUE_PENDING_KEY, 'true')
  window.location.href = `${API_BASE_URL}/oauth2/authorization/github`
}

export function shouldReissueAfterLoginRedirect() {
  return window.sessionStorage.getItem(LOGIN_REISSUE_PENDING_KEY) === 'true'
}

export function clearLoginRedirectReissue() {
  window.sessionStorage.removeItem(LOGIN_REISSUE_PENDING_KEY)
}

function redirectToLogin() {
  if (window.location.pathname !== '/login') {
    window.location.href = '/login'
  }
}

function redirectToErrorPage(status) {
  const target = status === 404 ? '/404' : '/500'
  if (window.location.pathname !== target) {
    window.location.href = target
  }
}

export async function logout() {
  try {
    await request('/auth/logout', { auth: true, method: 'POST' })
  } finally {
    clearSession()
    markLoggedOut()
  }
}

export function getCachedUser() {
  return currentUser
}

export function setCachedUser(user) {
  currentUser = user
}

export function getMe(force = false) {
  if (currentUser && !force) return Promise.resolve(currentUser)
  if (!mePromise) {
    mePromise = request('/users/me', { auth: true })
      .then(user => {
        currentUser = user
        return user
      })
      .finally(() => {
        mePromise = null
      })
  }
  return mePromise
}

export const sendEmailCode = email =>
  request('/mail/code-send', {
    auth: true,
    method: 'POST',
    body: JSON.stringify({ email }),
  })

export const verifyEmailCode = (email, code) =>
  request('/mail/code-verify', {
    auth: true,
    method: 'POST',
    body: JSON.stringify({ email, code }),
  })

export const updateUserEmail = email =>
  request('/users', {
    auth: true,
    method: 'PATCH',
    body: JSON.stringify({ email }),
  })

export const getProjects = () => request('/projects')
export const getProject = projectId => request(`/projects/${projectId}`)
export const getProjectSteps = projectId => request(`/projects/${projectId}/steps`)
export const getStepSpec = (projectId, step) => request(`/projects/${projectId}/steps/${step}/spec`)

export async function adminLogin(username, password) {
  const data = await request('/admin/login', {
    method: 'POST',
    skipAuthHeader: true,
    errorRedirect: false,
    body: JSON.stringify({ username, password }),
  })
  window.localStorage.setItem(ADMIN_TOKEN_KEY, data.token)
  return data
}

function adminHeaders() {
  const token = getAdminToken()
  return token ? { 'X-Admin-Token': token } : {}
}

function adminRequest(path, options = {}) {
  return request(path, {
    ...options,
    adminAuth: true,
    skipAuthHeader: true,
    errorRedirect: false,
    headers: {
      ...adminHeaders(),
      ...(options.headers || {}),
    },
  })
}

export const getAdminMetrics = () => adminRequest('/admin/metrics')
export const getAdminUserProgress = () => adminRequest('/admin/users/progress')
export const getAdminLogs = () => adminRequest('/admin/logs')
export const adminForceDeleteRepository = repositoryId =>
  adminRequest(`/admin/repositories/${repositoryId}`, { method: 'DELETE' })
export const adminUpdateUserEmail = (userId, email) =>
  adminRequest(`/admin/users/${userId}/email`, {
    method: 'PATCH',
    body: JSON.stringify({ email }),
  })
export const adminSetUserBan = (userId, banned) =>
  adminRequest(`/admin/users/${userId}/ban`, {
    method: 'PATCH',
    body: JSON.stringify({ banned }),
  })

export async function startProject(projectId, payload) {
  const data = await request(`/github/repositories/${projectId}`, {
    auth: true,
    method: 'POST',
    body: JSON.stringify(payload),
  })
  saveRepository(data)
  window.localStorage.removeItem(START_REQUEST_KEY)
  return data
}

export const getLearningRepositories = () => request('/github/learning-repositories', { auth: true })
export const getRepositoryStatus = repositoryId => request(`/github/repositories/${repositoryId}/status`, { auth: true })
export const getRepositoryCompleted = repositoryId => request(`/github/repositories/${repositoryId}/completed`, { auth: true })
export const getRepositoryReports = () => request(`/reports/list`, { auth: true })
export const deleteLearningRepository = repositoryId =>
  request(`/github/repositories/${repositoryId}`, { auth: true, method: 'DELETE' })

export async function moveNextStep(repositoryId, payload = {}) {
  const data = await request(`/github/repositories/${repositoryId}/next`, {
    auth: true,
    method: 'POST',
    body: JSON.stringify(payload),
  })
  const current = getSavedRepository() || {}
  saveRepository({ ...current, repositoryId: data.repositoryId })
  return data
}

export async function startCodeCheck(repositoryId, step) {
  const data = await request(`/code-check/repositories/${repositoryId}/steps/${step}`, {
    auth: true,
    method: 'POST',
  })
  window.localStorage.setItem(CHECK_KEY, data.checkId)
  return data
}

export const getCodeCheckStatus = checkId => request(`/code-check/checks/${checkId}`, { auth: true })
export const reviewCode = (repositoryId, step) =>
  request(`/ai/repositories/${repositoryId}/steps/${step}/review`, {
    auth: true,
    method: 'POST',
  })
export const askCodeQuestion = (repositoryId, question) =>
  request(`/ai/repositories/${repositoryId}/questions`, {
    auth: true,
    method: 'POST',
    body: JSON.stringify({ question }),
  })
export const getMailDashboard = () => request('/mail/dashboard', { auth: true })
export const updateMailSubscription = (enabled, email = '') =>
  request('/mail/subscription', {
    auth: true,
    method: 'PUT',
    body: JSON.stringify({ enabled, email }),
  })
export const sendTestMail = () => request('/mail/send-test', { auth: true, method: 'POST' })
export const getRandomMailQuestion = () => request('/mail/questions/random', { auth: true })
export const submitMailAnswer = (questionId, payload) =>
  request(`/mail/questions/${questionId}/answers`, {
    auth: true,
    method: 'POST',
    body: JSON.stringify(payload),
  })
export const getMailAnswers = () => request('/mail/answers', { auth: true })
export const getMailContents = () => request('/mail/contents', { auth: true })
export const getMailContent = id => request(`/mail/contents/${id}`, { auth: true })

export function saveSelectedProject(project) {
  window.localStorage.setItem(PROJECT_KEY, JSON.stringify(project))
}

export function getSelectedProject() {
  return JSON.parse(window.localStorage.getItem(PROJECT_KEY) || 'null')
}

export function saveRepository(repository) {
  window.localStorage.setItem(REPOSITORY_KEY, JSON.stringify(repository))
}

export function getSavedRepository() {
  return JSON.parse(window.localStorage.getItem(REPOSITORY_KEY) || 'null')
}

export function getSavedCheckId() {
  return window.localStorage.getItem(CHECK_KEY)
}

export function saveCheckResult(result) {
  window.localStorage.setItem(CHECK_RESULT_KEY, JSON.stringify(result))
}

export function getSavedCheckResult() {
  return JSON.parse(window.localStorage.getItem(CHECK_RESULT_KEY) || 'null')
}

export function saveCodeReviewRequest(request) {
  window.localStorage.setItem(CHECK_REQUEST_KEY, JSON.stringify(request))
}

export function getCodeReviewRequest() {
  return JSON.parse(window.localStorage.getItem(CHECK_REQUEST_KEY) || 'null')
}

export function saveProjectStartRequest(request) {
  window.localStorage.setItem(START_REQUEST_KEY, JSON.stringify(request))
}

export function getProjectStartRequest() {
  return JSON.parse(window.localStorage.getItem(START_REQUEST_KEY) || 'null')
}

export function stepNumber(step) {
  if (!step) return 1
  const match = String(step).match(/\d+/)
  return match ? Number(match[0]) : 1
}

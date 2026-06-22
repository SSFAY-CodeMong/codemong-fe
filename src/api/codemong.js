const API_BASE_URL = process.env.VUE_APP_API_BASE_URL || 'http://localhost:8080'
const TOKEN_KEY = 'codemong_access_token'
const PROJECT_KEY = 'codemong_selected_project'
const REPOSITORY_KEY = 'codemong_repository'
const CHECK_KEY = 'codemong_check_id'
const CHECK_RESULT_KEY = 'codemong_check_result'
const CHECK_REQUEST_KEY = 'codemong_check_request'
const START_REQUEST_KEY = 'codemong_project_start_request'

export const getNavigation = () => [
  { key: 'projects', label: '프로젝트', path: '/projects' },
  { key: 'mission', label: '미션', path: '/mission-workspace' },
  { key: 'progress', label: '진행 현황', path: '/mission-progress' },
  { key: 'mail', label: '메일서비스', path: '/mail-service/settings' },
  { key: 'help', label: '도움말', path: '/help' },
]

function getToken() {
  return window.localStorage.getItem(TOKEN_KEY)
}

export function setToken(token) {
  if (token) window.localStorage.setItem(TOKEN_KEY, token)
}

export function clearSession() {
  window.localStorage.removeItem(TOKEN_KEY)
  window.localStorage.removeItem(REPOSITORY_KEY)
  window.localStorage.removeItem(CHECK_KEY)
  window.localStorage.removeItem(CHECK_RESULT_KEY)
  window.localStorage.removeItem(CHECK_REQUEST_KEY)
  window.localStorage.removeItem(START_REQUEST_KEY)
}

async function request(path, options = {}) {
  const { auth = false, isRetry = false, ...fetchOptions } = options
  if (auth && !getToken()) {
    try {
      await reissueToken()
    } catch (error) {
      throw new Error('로그인이 필요합니다. GitHub 로그인 후 다시 시도하세요.')
    }
  }

  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    ...(fetchOptions.headers || {}),
  }
  const token = getToken()
  if (token && path !== '/auth/reissue') headers.Authorization = `Bearer ${token}`

  let response
  try {
    response = await window.fetch(`${API_BASE_URL}${path}`, {
      credentials: 'include',
      ...fetchOptions,
      headers,
    })
  } catch (error) {
    throw new Error('백엔드 서버가 꺼져 있거나 로그인 세션이 없습니다.')
  }

  if (response.status === 204) return null
  const text = await response.text()
  let data = null
  try {
    data = text ? JSON.parse(text) : null
  } catch (error) {
    throw new Error('API가 JSON이 아닌 응답을 반환했습니다. 로그인 상태를 확인하세요.')
  }

  if (!response.ok) {
    const message = data && (data.message || data.error || data.errorCode)
    
    // access token 만료 감지 (401 Unauthorized 상태코드 또는 에러메시지에 EXPIRED_TOKEN 등이 포함된 경우)
    const isTokenExpired = response.status === 401 || (message && (
      String(message).includes('EXPIRED_TOKEN') || 
      String(message).includes('expired') || 
      String(message).includes('Expired')
    ))

    if (isTokenExpired && !isRetry && path !== '/auth/reissue') {
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
        throw new Error('세션이 만료되었습니다. 다시 로그인해주세요.')
      }
    }

    throw new Error(message || `HTTP ${response.status}`)
  }
  return data
}

export async function reissueToken() {
  const data = await request('/auth/reissue', { method: 'POST' })
  setToken(data.accessToken)
  return data.accessToken
}

export function loginWithGithub() {
  window.location.href = `${API_BASE_URL}/oauth2/authorization/github`
}

export async function logout() {
  try {
    await request('/auth/logout', { auth: true, method: 'POST' })
  } finally {
    clearSession()
  }
}

export const getMe = () => request('/users/me', { auth: true })
export const getProjects = () => request('/projects')
export const getProject = projectId => request(`/projects/${projectId}`)
export const getProjectSteps = projectId => request(`/projects/${projectId}/steps`)
export const getStepSpec = (projectId, step) => request(`/projects/${projectId}/steps/${step}/spec`)

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
export const getRepositoryReports = repositoryId => request(`/reports/list`, { auth: true })
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

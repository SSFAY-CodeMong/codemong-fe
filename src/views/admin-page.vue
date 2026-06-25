<template>
  <main class="admin-page">
    <section v-if="!authenticated" class="admin-login">
      <h1>관리자 로그인</h1>
      <p>상수 계정으로만 접근할 수 있습니다.</p>
      <form @submit.prevent="login">
        <label>
          아이디
          <input v-model.trim="loginForm.username" autocomplete="username" />
        </label>
        <label>
          비밀번호
          <input v-model="loginForm.password" type="password" autocomplete="current-password" />
        </label>
        <button type="submit" :disabled="loading">{{ loading ? '확인 중' : '로그인' }}</button>
      </form>
      <p v-if="error" class="error">{{ error }}</p>
    </section>

    <section v-else class="admin-dashboard">
      <header class="admin-header">
        <div>
          <h1>Codemong Admin</h1>
          <p>전체 사용자 진행 현황, 강제 작업, 서버 작업 로그를 확인합니다.</p>
        </div>
        <div class="header-actions">
          <span class="pulse">{{ refreshing ? '동기화 중' : '5초 자동 갱신' }}</span>
          <button type="button" @click="loadAll(false)">새로고침</button>
          <button type="button" class="secondary" @click="logout">로그아웃</button>
        </div>
      </header>

      <nav class="tabs">
        <button
          v-for="tab in tabs"
          :key="tab.key"
          type="button"
          :class="{ active: activeTab === tab.key }"
          @click="activeTab = tab.key"
        >
          {{ tab.label }}
        </button>
      </nav>

      <p v-if="error" class="error">{{ error }}</p>

      <section v-show="activeTab === 'overview'">
        <section class="metric-grid">
          <article v-for="metric in metricCards" :key="metric.label" class="metric">
            <span>{{ metric.label }}</span>
            <strong>{{ metric.value }}</strong>
          </article>
        </section>

        <section class="overview-grid" v-if="metrics">
          <article class="panel compact">
            <h2>작업 성공률</h2>
            <div class="bar"><i :style="{ width: successRate + '%' }"></i></div>
            <b>{{ successRate }}%</b>
          </article>
          <article class="panel compact">
            <h2>메모리 사용률</h2>
            <div class="bar memory"><i :style="{ width: memoryRate + '%' }"></i></div>
            <b>{{ memoryRate }}%</b>
          </article>
        </section>

        <section class="panel">
          <h2>메모리 사용률</h2>
          <svg class="line-chart" viewBox="0 0 640 220" role="img">
            <line x1="36" y1="20" x2="36" y2="188" />
            <line x1="36" y1="188" x2="620" y2="188" />
            <text x="4" y="28">100%</text>
            <text x="12" y="188">0%</text>
            <polyline v-if="memoryLinePoints" :points="memoryLinePoints" />
            <circle
              v-for="point in memoryPoints"
              :key="point.key"
              :cx="point.x"
              :cy="point.y"
              r="4"
            />
          </svg>
        </section>

        <section class="panel">
          <h2>작업 타입 통계</h2>
          <div class="type-grid">
            <article v-for="stat in typeStats" :key="stat.type" class="type-stat">
              <strong>{{ stat.type }}</strong>
              <span>전체 {{ stat.total }}</span>
              <span>성공 {{ stat.success }} / 실패 {{ stat.failed }}</span>
              <div class="bar small"><i :style="{ width: stat.rate + '%' }"></i></div>
            </article>
            <p v-if="!typeStats.length">아직 수집된 작업 로그가 없습니다.</p>
          </div>
        </section>
      </section>

      <section v-show="activeTab === 'users'" class="panel">
        <h2>사용자 프로젝트 진행 현황</h2>
        <div class="table-wrap">
          <table>
            <thead>
            <tr>
              <th>User</th>
              <th>Email</th>
              <th>Ban</th>
              <th>Repository</th>
              <th>Project</th>
              <th>Step</th>
              <th>Branch</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
            </thead>
            <tbody>
            <template v-for="user in users">
              <tr v-if="!user.repositories.length" :key="'empty-' + user.userId">
                <td>{{ user.userId }} / {{ user.name || '-' }}</td>
                <td>
                  <input v-model="emailDrafts[user.userId]" :placeholder="user.email || 'email'" />
                  <button type="button" @click="updateEmail(user)">변경</button>
                </td>
                <td>
                  <span :class="['status', user.banned ? 'failed' : 'done']">{{ user.banned ? '밴' : '정상' }}</span>
                  <button type="button" class="secondary" @click="toggleBan(user)">{{ user.banned ? '해제' : '밴' }}</button>
                </td>
                <td colspan="6">진행 중인 Repository 없음</td>
              </tr>
              <tr v-for="repo in user.repositories" :key="user.userId + '-' + repo.repositoryId">
                <td>{{ user.userId }} / {{ user.name || '-' }}</td>
                <td>
                  <input v-model="emailDrafts[user.userId]" :placeholder="user.email || 'email'" />
                  <button type="button" @click="updateEmail(user)">변경</button>
                </td>
                <td>
                  <span :class="['status', user.banned ? 'failed' : 'done']">{{ user.banned ? '밴' : '정상' }}</span>
                  <button type="button" class="secondary" @click="toggleBan(user)">{{ user.banned ? '해제' : '밴' }}</button>
                </td>
                <td>
                  <a :href="repo.htmlUrl" target="_blank" rel="noreferrer">{{ repo.repositoryName }}</a>
                  <small>#{{ repo.repositoryId }}</small>
                </td>
                <td>{{ repo.projectName }} / {{ repo.projectType }}</td>
                <td>{{ repo.currentStep || '-' }} / {{ repo.maxStep }}</td>
                <td>{{ repo.branchName || '-' }} <small v-if="repo.branchId">#{{ repo.branchId }}</small></td>
                <td>
                  <span :class="['status', repo.completed ? 'done' : repo.currentStepPassed ? 'passed' : 'running']">
                    {{ repo.completed ? '완료' : repo.currentStepPassed ? '통과' : '진행중' }}
                  </span>
                </td>
                <td>
                  <button type="button" class="danger" @click="deleteRepo(repo)">DB 삭제</button>
                </td>
              </tr>
            </template>
            </tbody>
          </table>
        </div>
      </section>

      <section v-show="activeTab === 'logs'" class="panel">
        <h2>서버 작업 로그</h2>
        <div class="table-wrap">
          <table>
            <thead>
            <tr>
              <th>시작</th>
              <th>Type</th>
              <th>작업</th>
              <th>상태</th>
              <th>결과</th>
              <th>처리시간</th>
              <th>응답</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="log in logs" :key="log.id">
              <td>{{ formatDate(log.startedAt) }}</td>
              <td><span class="type-pill">{{ log.type || log.action }}</span></td>
              <td>{{ log.message }}</td>
              <td><span :class="['status', log.status === '처리완료' ? 'done' : 'running']">{{ log.status }}</span></td>
              <td>{{ log.success === null || log.success === undefined ? '-' : log.success ? '성공' : '실패' }}</td>
              <td>{{ log.durationMs === null || log.durationMs === undefined ? '-' : log.durationMs + 'ms' }}</td>
              <td>{{ log.response || '-' }}</td>
            </tr>
            <tr v-if="!logs.length">
              <td colspan="7">아직 수집된 작업 로그가 없습니다.</td>
            </tr>
            </tbody>
          </table>
        </div>
      </section>
    </section>
  </main>
</template>

<script>
import {
  adminForceDeleteRepository,
  adminLogin,
  adminSetUserBan,
  adminUpdateUserEmail,
  clearAdminToken,
  getAdminLogs,
  getAdminMetrics,
  getAdminToken,
  getAdminUserProgress,
} from '../api/codemong'

export default {
  name: 'AdminPage',
  data() {
    return {
      authenticated: Boolean(getAdminToken()),
      loading: false,
      refreshing: false,
      error: '',
      activeTab: 'overview',
      tabs: [
        { key: 'overview', label: '대시보드' },
        { key: 'users', label: '사용자' },
        { key: 'logs', label: '로그' },
      ],
      loginForm: {
        username: '',
        password: '',
      },
      metrics: null,
      users: [],
      logs: [],
      emailDrafts: {},
      memorySamples: [],
      refreshTimer: null,
    }
  },
  computed: {
    metricCards() {
      if (!this.metrics) return []
      return [
        { label: 'Users', value: this.metrics.users },
        { label: 'Repositories', value: this.metrics.repositories },
        { label: '처리중', value: this.metrics.runningTasks },
        { label: '처리완료', value: this.metrics.completedTasks },
        { label: '성공', value: this.metrics.successfulTasks },
        { label: '실패', value: this.metrics.failedTasks },
        { label: 'Memory', value: `${this.metrics.usedMemoryMb} / ${this.metrics.maxMemoryMb} MB` },
      ]
    },
    successRate() {
      if (!this.metrics || !this.metrics.completedTasks) return 0
      return Math.round((this.metrics.successfulTasks / this.metrics.completedTasks) * 100)
    },
    memoryRate() {
      if (!this.metrics || !this.metrics.maxMemoryMb) return 0
      return Math.min(100, Math.round((this.metrics.usedMemoryMb / this.metrics.maxMemoryMb) * 100))
    },
    memoryPoints() {
      const count = Math.max(this.memorySamples.length - 1, 1)
      return this.memorySamples.map((sample, index) => ({
        key: sample.at,
        x: 36 + (584 * index / count),
        y: 188 - (168 * sample.rate / 100),
      }))
    },
    memoryLinePoints() {
      return this.memoryPoints.map(point => `${point.x},${point.y}`).join(' ')
    },
    typeStats() {
      const stats = {}
      this.logs.forEach(log => {
        const type = log.type || log.action || 'UNKNOWN'
        if (!stats[type]) stats[type] = { type, total: 0, success: 0, failed: 0 }
        stats[type].total += 1
        if (log.success === true) stats[type].success += 1
        if (log.success === false) stats[type].failed += 1
      })
      return Object.values(stats)
        .map(stat => ({
          ...stat,
          rate: stat.total ? Math.round((stat.success / stat.total) * 100) : 0,
        }))
        .sort((a, b) => b.total - a.total)
    },
  },
  created() {
    if (this.authenticated) {
      this.loadAll(false)
      this.startPolling()
    }
  },
  beforeDestroy() {
    this.stopPolling()
  },
  methods: {
    async login() {
      this.loading = true
      this.error = ''
      try {
        await adminLogin(this.loginForm.username, this.loginForm.password)
        this.authenticated = true
        await this.loadAll(false)
        this.startPolling()
      } catch (error) {
        this.error = error.message || '관리자 로그인에 실패했습니다.'
      } finally {
        this.loading = false
      }
    },
    logout() {
      clearAdminToken()
      this.stopPolling()
      this.authenticated = false
      this.metrics = null
      this.users = []
      this.logs = []
      this.memorySamples = []
    },
    startPolling() {
      this.stopPolling()
      this.refreshTimer = window.setInterval(() => {
        this.loadAll(true)
      }, 5000)
    },
    stopPolling() {
      if (this.refreshTimer) {
        window.clearInterval(this.refreshTimer)
        this.refreshTimer = null
      }
    },
    async loadAll(silent = false) {
      if (this.refreshing) return
      this.refreshing = true
      if (!silent) this.error = ''
      try {
        const [metrics, users, logs] = await Promise.all([
          getAdminMetrics(),
          getAdminUserProgress(),
          getAdminLogs(),
        ])
        this.metrics = metrics
        this.users = users
        this.logs = logs
        const drafts = { ...this.emailDrafts }
        users.forEach(user => {
          if (drafts[user.userId] === undefined) drafts[user.userId] = user.email || ''
        })
        this.emailDrafts = drafts
        this.pushMemorySample()
      } catch (error) {
        this.handleAdminError(error, '관리자 데이터를 불러오지 못했습니다.')
      } finally {
        this.refreshing = false
      }
    },
    pushMemorySample() {
      this.memorySamples.push({ at: Date.now(), rate: this.memoryRate })
      if (this.memorySamples.length > 36) {
        this.memorySamples.splice(0, this.memorySamples.length - 36)
      }
    },
    async updateEmail(user) {
      const email = this.emailDrafts[user.userId]
      if (!email) return
      if (!window.confirm(`userId ${user.userId} 이메일을 ${email}(으)로 변경할까요?`)) return
      try {
        await adminUpdateUserEmail(user.userId, email)
        await this.loadAll(false)
      } catch (error) {
        this.handleAdminError(error, '이메일 변경에 실패했습니다.')
      }
    },
    async toggleBan(user) {
      const nextBanned = !user.banned
      const label = nextBanned ? '밴 처리' : '밴 해제'
      if (!window.confirm(`userId ${user.userId} 사용자를 ${label}할까요?`)) return
      try {
        await adminSetUserBan(user.userId, nextBanned)
        await this.loadAll(false)
      } catch (error) {
        this.handleAdminError(error, `${label}에 실패했습니다.`)
      }
    },
    async deleteRepo(repo) {
      if (!window.confirm(`repository #${repo.repositoryId} (${repo.repositoryName})를 DB에서만 삭제할까요? 실제 GitHub repo는 유지됩니다.`)) return
      try {
        await adminForceDeleteRepository(repo.repositoryId)
        await this.loadAll(false)
      } catch (error) {
        this.handleAdminError(error, 'Repository 삭제에 실패했습니다.')
      }
    },
    handleAdminError(error, fallbackMessage) {
      if (error && (error.status === 401 || error.status === 403)) {
        clearAdminToken()
        this.stopPolling()
        this.authenticated = false
        this.metrics = null
        this.users = []
        this.logs = []
        this.memorySamples = []
      }
      this.error = (error && error.message) || fallbackMessage
    },
    formatDate(value) {
      if (!value) return '-'
      return String(value).replace('T', ' ').slice(0, 19)
    },
  },
}
</script>

<style scoped>
.admin-page {
  min-height: 100vh;
  background: #f6f8fb;
  color: #172033;
  padding: 32px;
}
.admin-login {
  width: 360px;
  margin: 80px auto;
  padding: 28px;
  background: #fff;
  border: 1px solid #dbe3ef;
}
.admin-login h1, .admin-header h1 {
  margin: 0 0 8px;
}
.admin-login p, .admin-header p {
  margin: 0 0 20px;
  color: #667085;
}
label {
  display: block;
  margin-bottom: 14px;
  font-size: 14px;
  font-weight: 700;
}
input {
  box-sizing: border-box;
  width: 100%;
  height: 36px;
  margin-top: 6px;
  padding: 0 10px;
  border: 1px solid #cbd5e1;
  background: #fff;
}
button {
  height: 36px;
  padding: 0 14px;
  border: 0;
  background: #1f4e78;
  color: #fff;
  cursor: pointer;
}
button.secondary { background: #64748b; }
button.danger { background: #b42318; }
button:disabled { opacity: .6; cursor: default; }
.error {
  margin: 16px 0;
  color: #b42318;
  font-weight: 700;
}
.admin-header {
  display: flex;
  justify-content: space-between;
  gap: 20px;
  margin-bottom: 20px;
}
.header-actions, .tabs {
  display: flex;
  gap: 8px;
  align-items: center;
}
.pulse {
  color: #475467;
  font-size: 13px;
}
.tabs {
  margin-bottom: 16px;
}
.tabs button {
  background: #e2e8f0;
  color: #334155;
}
.tabs button.active {
  background: #1f4e78;
  color: #fff;
}
.metric-grid, .overview-grid, .type-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 10px;
  margin-bottom: 16px;
}
.overview-grid {
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
}
.metric, .panel {
  background: #fff;
  border: 1px solid #dbe3ef;
  padding: 16px;
}
.metric span, .type-stat span {
  display: block;
  color: #667085;
  font-size: 13px;
}
.metric strong {
  display: block;
  margin-top: 8px;
  font-size: 24px;
}
.panel {
  margin-top: 18px;
}
.panel.compact {
  margin-top: 0;
}
.panel h2 {
  margin: 0 0 14px;
  font-size: 18px;
}
.bar {
  height: 10px;
  margin: 8px 0;
  background: #e5e7eb;
}
.bar.small {
  height: 8px;
}
.bar i {
  display: block;
  height: 100%;
  background: #16a34a;
}
.bar.memory i { background: #2563eb; }
.line-chart {
  width: 100%;
  max-width: 760px;
  height: 240px;
}
.line-chart line {
  stroke: #cbd5e1;
  stroke-width: 2;
}
.line-chart text {
  fill: #667085;
  font-size: 13px;
}
.line-chart polyline {
  fill: none;
  stroke: #2563eb;
  stroke-width: 3;
  stroke-linecap: round;
  stroke-linejoin: round;
}
.line-chart circle {
  fill: #2563eb;
}
.type-stat {
  border: 1px solid #e5e7eb;
  padding: 14px;
}
.type-stat strong {
  display: block;
  margin-bottom: 8px;
}
.table-wrap {
  overflow-x: auto;
}
table {
  width: 100%;
  border-collapse: collapse;
  font-size: 13px;
}
th, td {
  border-bottom: 1px solid #e5e7eb;
  padding: 10px;
  text-align: left;
  vertical-align: top;
}
th {
  background: #f8fafc;
  color: #475467;
}
td input {
  width: 180px;
  margin: 0 6px 0 0;
}
small {
  display: block;
  color: #667085;
  margin-top: 4px;
}
.status, .type-pill {
  display: inline-block;
  padding: 4px 8px;
  background: #eef2ff;
  color: #3538cd;
  font-weight: 700;
  white-space: nowrap;
}
.status.done { background: #dcfce7; color: #166534; }
.status.passed { background: #e0f2fe; color: #075985; }
.status.running { background: #fef3c7; color: #92400e; }
.status.failed { background: #fee2e2; color: #991b1b; }
.type-pill {
  background: #f1f5f9;
  color: #334155;
}
</style>

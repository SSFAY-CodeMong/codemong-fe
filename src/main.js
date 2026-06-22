import Vue from 'vue'
import App from './App.vue'
import router from './router'
import LottieVuePlayer from '@lottiefiles/vue-lottie-player'
import { reissueToken } from './api/codemong'
import './style.css'

Vue.use(LottieVuePlayer)
Vue.config.productionTip = false

const initApp = () => {
  new Vue({
    render: h => h(App),
    router,
  }).$mount('#app')
}

reissueToken()
  .catch(() => {
    // Fail silently if not logged in (no refreshToken cookie)
  })
  .finally(() => {
    initApp()
  })

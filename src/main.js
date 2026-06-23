import Vue from 'vue'
import App from './App.vue'
import router from './router'
import LottieVuePlayer from '@lottiefiles/vue-lottie-player'
import {
  clearLoginRedirectReissue,
  reissueToken,
  shouldReissueAfterLoginRedirect,
} from './api/codemong'
import './style.css'

Vue.use(LottieVuePlayer)
Vue.config.productionTip = false

const initApp = () => {
  new Vue({
    render: h => h(App),
    router,
  }).$mount('#app')
}

const initAfterLoginRedirect = async () => {
  try {
    await reissueToken()
    if (window.location.pathname === '/login') {
      router.replace('/projects')
    }
  } catch (error) {
    // Keep the user on the current page if the refreshToken cookie is missing or expired.
  } finally {
    clearLoginRedirectReissue()
    initApp()
  }
}

if (shouldReissueAfterLoginRedirect()) {
  initAfterLoginRedirect()
} else {
  initApp()
}

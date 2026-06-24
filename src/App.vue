
<template>
  <div>
    <router-view/>
    <DailyMongMascot v-if="showDailyMongMascot" />
  </div>
</template>

<script>
import channelService from './channel'
import DailyMongMascot from './components/DailyMongMascot.vue'

const CHANNEL_PLUGIN_KEY = process.env.VUE_APP_CHANNEL_PLUGIN_KEY

export default {
  name: 'App',
  components: { DailyMongMascot },
  mounted() {
    if (!CHANNEL_PLUGIN_KEY) {
      console.warn('VUE_APP_CHANNEL_PLUGIN_KEY가 설정되지 않았습니다.')
      return
    }

    channelService.boot({
      pluginKey: CHANNEL_PLUGIN_KEY,
      hideDefaultLauncher: true,
    })
  },
  destroyed() {
    channelService.shutdown()
  },
  computed: {
    showDailyMongMascot() {
      return this.$route.path !== '/login'
    },
  },
}
</script>

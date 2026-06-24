<template>
  <button
    type="button"
    class="daily-mong-mascot"
    :class="[`is-${mascotSide}`, { 'is-running': mascotRunning }]"
    :style="mascotStyle"
    aria-label="채널톡 문의하기"
    title="채널톡 문의하기"
    @click.stop="openChannelTalk"
  >
    <span class="daily-mong-mascot__speed speed-a"></span>
    <span class="daily-mong-mascot__speed speed-b"></span>
    <div class="daily-mong-mascot__sprite">
      <img :src="mascotImageSrc" alt="" />
      <span class="daily-mong-mascot__eye eye-left">
        <span></span>
      </span>
      <span class="daily-mong-mascot__eye eye-right">
        <span></span>
      </span>
    </div>
  </button>
</template>

<script>
import channelService from '../channel'

export default {
  name: 'DailyMongMascot',
  data() {
    return {
      mascotSide: 'right',
      mascotRunning: false,
      mascotEyeX: 0,
      mascotEyeY: 0,
      mascotLookX: 0,
      mascotRunTimer: null,
    }
  },
  mounted() {
    window.addEventListener('mousemove', this.handleMascotMouseMove)
  },
  beforeDestroy() {
    window.removeEventListener('mousemove', this.handleMascotMouseMove)
    window.clearTimeout(this.mascotRunTimer)
  },
  methods: {
    openChannelTalk() {
      if (!process.env.VUE_APP_CHANNEL_PLUGIN_KEY) {
        alert('채널톡 플러그인 키가 설정되지 않았습니다.')
        return
      }
      channelService.showMessenger()
    },
    handleMascotMouseMove(event) {
      const nextSide = event.clientX < window.innerWidth / 2 ? 'left' : 'right'
      if (nextSide !== this.mascotSide) {
        this.mascotSide = nextSide
        this.mascotRunning = true
        window.clearTimeout(this.mascotRunTimer)
        this.mascotRunTimer = window.setTimeout(() => {
          this.mascotRunning = false
        }, 620)
      }

      const mascotCenterX = this.mascotSide === 'left' ? 74 : window.innerWidth - 74
      const mascotCenterY = window.innerHeight - 70
      const dx = event.clientX - mascotCenterX
      const dy = event.clientY - mascotCenterY
      const distance = Math.max(1, Math.hypot(dx, dy))
      this.mascotEyeX = Math.max(-4, Math.min(4, (dx / distance) * 4))
      this.mascotEyeY = Math.max(-3, Math.min(3, (dy / distance) * 3))
      this.mascotLookX = Math.max(-1, Math.min(1, dx / Math.max(1, window.innerWidth / 2)))
    },
  },
  computed: {
    mascotStyle() {
      return {
        '--eye-x': `${this.mascotEyeX}px`,
        '--eye-y': `${this.mascotEyeY}px`,
        '--look-x': `${this.mascotLookX * 1.8}px`,
        '--look-rotate': `${this.mascotLookX * 1.6}deg`,
      }
    },
    mascotImageSrc() {
      return this.mascotRunning ? '/mascot_move.png' : '/mascot.png'
    },
  },
}
</script>

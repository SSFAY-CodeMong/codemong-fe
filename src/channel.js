class ChannelService {
  constructor() {
    this.loadScript()
  }

  loadScript() {
    const w = window
    if (w.ChannelIO) {
      return
    }

    const ch = function() {
      ch.c(arguments)
    }
    ch.q = []
    ch.c = function(args) {
      ch.q.push(args)
    }
    w.ChannelIO = ch

    function load() {
      if (w.ChannelIOInitialized) {
        return
      }
      w.ChannelIOInitialized = true
      const script = document.createElement('script')
      script.type = 'text/javascript'
      script.async = true
      script.src = 'https://cdn.channel.io/plugin/ch-plugin-web.js'
      const firstScript = document.getElementsByTagName('script')[0]
      if (firstScript.parentNode) {
        firstScript.parentNode.insertBefore(script, firstScript)
      }
    }

    if (document.readyState === 'complete') {
      load()
    } else {
      w.addEventListener('DOMContentLoaded', load)
      w.addEventListener('load', load)
    }
  }

  boot(settings) {
    window.ChannelIO('boot', settings)
  }

  shutdown() {
    window.ChannelIO('shutdown')
  }

  showMessenger() {
    window.ChannelIO('showMessenger')
  }
}

export default new ChannelService()

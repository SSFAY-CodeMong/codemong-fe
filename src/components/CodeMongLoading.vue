<template>
  <section class="codemong-loading">
    <div class="codemong-loading__card">
      <div class="codemong-loading__visual">
        <span class="code-symbol code-symbol--left" aria-hidden="true">&lt;</span>
        <span class="code-symbol code-symbol--right" aria-hidden="true">/&gt;</span>
        <span class="code-symbol code-symbol--top" aria-hidden="true">{ }</span>
        <span class="code-symbol code-symbol--bottom" aria-hidden="true">_</span>

        <div class="mascot-frame">
          <img
            class="mascot-image"
            :src="currentFrame"
            alt="CodeMong loading mascot"
          />
          <div class="typing-indicator" aria-hidden="true">
            <span></span>
            <span></span>
            <span></span>
          </div>
          <span class="terminal-cursor" aria-hidden="true"></span>
        </div>
      </div>

      <div class="codemong-loading__content" role="status" aria-live="polite">
        <span class="badge">AI Code Review</span>
        <h1>{{ title }}</h1>
        <p>{{ description }}</p>
        <div class="loading-dots" aria-hidden="true">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
const typingFrames = [
  '/CodeMong_typing1.png',
  '/CodeMong_typing2.png',
  '/CodeMong_typing3.png',
  '/CodeMong_typing4.png',
  '/CodeMong_typing5.png',
]

export default {
  name: 'CodeMongLoading',
  props: {
    title: {
      type: String,
      default: 'CodeMong이 코드를 분석하고 있어요',
    },
    description: {
      type: String,
      default: '테스트 결과와 코드 구조를 함께 살펴보는 중입니다...',
    },
  },
  data() {
    return {
      typingFrames,
      currentFrameIndex: 0,
      frameTimer: null,
    }
  },
  computed: {
    currentFrame() {
      return this.typingFrames[this.currentFrameIndex]
    },
  },
  mounted() {
    this.preloadFrames()

    const prefersReducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    this.frameTimer = window.setInterval(() => {
      this.currentFrameIndex = (this.currentFrameIndex + 1) % this.typingFrames.length
    }, 140)
  },
  beforeDestroy() {
    if (this.frameTimer) {
      window.clearInterval(this.frameTimer)
    }
  },
  methods: {
    preloadFrames() {
      this.typingFrames.forEach(src => {
        const image = new Image()
        image.src = src
      })
    },
  },
}
</script>

<style scoped>
.codemong-loading {
  width: 100%;
  min-height: min(640px, calc(100vh - 200px));
  display: grid;
  place-items: center;
}

.codemong-loading__card {
  position: relative;
  width: min(760px, 100%);
  overflow: hidden;
  display: grid;
  justify-items: center;
  gap: 24px;
  border: 1px solid var(--cm-border, #ddeed8);
  border-radius: var(--cm-radius, 8px);
  background:
    linear-gradient(rgba(23, 59, 36, 0.04) 1px, transparent 1px),
    linear-gradient(90deg, rgba(23, 59, 36, 0.04) 1px, transparent 1px),
    linear-gradient(145deg, #ffffff 0%, #f7fff4 100%);
  background-size: 32px 32px, 32px 32px, auto;
  box-shadow: var(--cm-shadow-lg, 0 28px 70px rgba(23, 59, 36, 0.14));
  padding: clamp(26px, 5vw, 48px);
  text-align: center;
}

.codemong-loading__card::before {
  content: "";
  position: absolute;
  inset: auto -90px -120px auto;
  width: 260px;
  height: 260px;
  border-radius: 50%;
  background: rgba(154, 231, 125, 0.17);
}

.codemong-loading__visual {
  position: relative;
  width: min(100%, 390px);
  min-height: clamp(260px, 42vw, 390px);
  display: grid;
  place-items: center;
}

.mascot-frame {
  position: relative;
  z-index: 2;
  width: min(100%, 360px);
  aspect-ratio: 1;
  overflow: hidden;
  filter: drop-shadow(0 24px 34px rgba(16, 32, 21, 0.16));
}

.mascot-image {
  width: 100%;
  height: 100%;
  display: block;
  object-fit: contain;
  object-position: center;
  opacity: 1;
  transition: opacity 0.1s linear;
}

.typing-indicator {
  position: absolute;
  left: 50%;
  bottom: 17%;
  z-index: 3;
  display: inline-flex;
  gap: 5px;
  transform: translateX(-50%);
  padding: 5px 7px;
  border: 1px solid rgba(154, 231, 125, 0.3);
  border-radius: 999px;
  background: rgba(16, 32, 21, 0.72);
  pointer-events: none;
}

.typing-indicator span {
  width: 5px;
  height: 5px;
  border-radius: 999px;
  background: var(--cm-primary, #9ae77d);
  animation: typingDot 0.9s ease-in-out infinite;
}

.typing-indicator span:nth-child(2) {
  animation-delay: 0.12s;
}

.typing-indicator span:nth-child(3) {
  animation-delay: 0.24s;
}

.terminal-cursor {
  position: absolute;
  right: 29%;
  bottom: 18%;
  z-index: 3;
  width: 16px;
  height: 4px;
  border-radius: 999px;
  background: var(--cm-primary, #9ae77d);
  animation: cursorBlink 0.8s steps(2, end) infinite;
  pointer-events: none;
}

.code-symbol {
  position: absolute;
  z-index: 1;
  color: var(--cm-primary-dark, #6db33f);
  font-family: "JetBrains Mono", "SFMono-Regular", Consolas, monospace;
  font-weight: 900;
  opacity: 0.24;
  pointer-events: none;
}

.code-symbol--left {
  left: 0;
  top: 38%;
  font-size: 34px;
}

.code-symbol--right {
  right: 0;
  top: 38%;
  font-size: 26px;
}

.code-symbol--top {
  right: 15%;
  top: 4%;
  font-size: 20px;
}

.code-symbol--bottom {
  left: 17%;
  bottom: 7%;
  font-size: 24px;
}

.codemong-loading__content {
  position: relative;
  z-index: 2;
  display: grid;
  justify-items: center;
}

.codemong-loading__content h1 {
  margin: 14px 0 10px;
  color: var(--cm-deep-green, #173b24);
  font-size: clamp(28px, 4vw, 42px);
  line-height: 1.15;
}

.codemong-loading__content p {
  width: min(540px, 100%);
  margin: 0 0 22px;
  color: var(--cm-text-sub, #5f6f62);
  font-size: 16px;
  line-height: 1.72;
}

.loading-dots {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  min-height: 18px;
  padding: 8px 10px;
  border: 1px solid rgba(109, 179, 63, 0.18);
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.75);
}

.loading-dots span {
  width: 9px;
  height: 9px;
  border-radius: 999px;
  background: var(--cm-primary-dark, #6db33f);
  animation: dotPulse 1.2s ease-in-out infinite;
}

.loading-dots span:nth-child(2) {
  animation-delay: 0.16s;
}

.loading-dots span:nth-child(3) {
  animation-delay: 0.32s;
}

@keyframes typingDot {
  0%,
  100% {
    opacity: 0.35;
  }
  50% {
    opacity: 1;
  }
}

@keyframes cursorBlink {
  0%,
  45% {
    opacity: 1;
  }
  46%,
  100% {
    opacity: 0;
  }
}

@keyframes dotPulse {
  0%,
  100% {
    transform: translateY(0);
    opacity: 0.32;
  }
  50% {
    transform: translateY(-5px);
    opacity: 1;
  }
}

@media (max-width: 640px) {
  .codemong-loading {
    min-height: auto;
  }

  .codemong-loading__card {
    gap: 18px;
    padding: 24px 18px;
  }

  .codemong-loading__visual {
    width: min(100%, 310px);
    min-height: clamp(230px, 76vw, 310px);
  }

  .mascot-frame {
    width: min(100%, 285px);
  }

  .code-symbol--left,
  .code-symbol--right {
    font-size: 22px;
  }

  .code-symbol--top,
  .code-symbol--bottom {
    font-size: 16px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .typing-indicator span,
  .terminal-cursor,
  .loading-dots span {
    animation-duration: 0.01ms;
    animation-iteration-count: 1;
  }
}
</style>

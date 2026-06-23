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
            class="mascot-image mascot-image--idle"
            :src="logoSrc"
            alt="CodeMong loading mascot"
          />
          <img
            class="mascot-image mascot-image--typing"
            :src="typingSrc"
            alt=""
            aria-hidden="true"
          />
          <img
            class="mascot-image mascot-image--thinking"
            :src="thinkingSrc"
            alt=""
            aria-hidden="true"
          />
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
  computed: {
    logoSrc() {
      return `${process.env.BASE_URL}CodeMong_logo.png`
    },
    typingSrc() {
      return `${process.env.BASE_URL}CodeMong_typing.png`
    },
    thinkingSrc() {
      return `${process.env.BASE_URL}CodeMong_thinking.png`
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
  filter: drop-shadow(0 24px 34px rgba(16, 32, 21, 0.16));
}

.mascot-image {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  display: block;
  object-fit: contain;
  object-position: center;
  opacity: 0;
  transform-origin: 50% 72%;
  will-change: opacity, transform;
  animation-duration: 6.4s;
  animation-timing-function: ease-in-out;
  animation-iteration-count: infinite;
}

.mascot-image--idle {
  animation-name: idleFrame;
}

.mascot-image--typing {
  animation-name: typingFrame;
}

.mascot-image--thinking {
  animation-name: thinkingFrame;
}

.code-symbol {
  position: absolute;
  z-index: 1;
  color: var(--cm-primary-dark, #6db33f);
  font-family: "JetBrains Mono", "SFMono-Regular", Consolas, monospace;
  font-weight: 900;
  opacity: 0.28;
  pointer-events: none;
  animation: symbolFloat 5.8s ease-in-out infinite;
}

.code-symbol--left {
  left: 0;
  top: 38%;
  font-size: 36px;
}

.code-symbol--right {
  right: 0;
  top: 38%;
  font-size: 28px;
  animation-delay: -1.1s;
}

.code-symbol--top {
  right: 15%;
  top: 4%;
  font-size: 20px;
  animation-delay: -2.4s;
}

.code-symbol--bottom {
  left: 17%;
  bottom: 7%;
  font-size: 24px;
  animation-delay: -3.2s;
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

@keyframes idleFrame {
  0%,
  12% {
    opacity: 1;
    transform: translateY(0) scale(1) rotate(0deg);
  }
  7% {
    opacity: 1;
    transform: translateY(-2px) scale(1.012) rotate(0deg);
  }
  18%,
  78% {
    opacity: 0;
    transform: translateY(4px) scale(0.985) rotate(0deg);
  }
  88%,
  100% {
    opacity: 1;
    transform: translateY(0) scale(1) rotate(0deg);
  }
  94% {
    opacity: 1;
    transform: translateY(-2px) scale(1.01) rotate(-0.6deg);
  }
}

@keyframes typingFrame {
  0%,
  12%,
  78%,
  100% {
    opacity: 0;
    transform: translateY(6px) scale(0.988) rotate(0deg);
  }
  20%,
  60% {
    opacity: 1;
    transform: translateY(0) scale(1) rotate(0deg);
  }
  28%,
  42%,
  56% {
    opacity: 1;
    transform: translateY(-5px) scale(1.006) rotate(-0.45deg);
  }
  35%,
  49% {
    opacity: 1;
    transform: translateY(2px) scale(0.998) rotate(0.35deg);
  }
  68% {
    opacity: 0;
    transform: translateY(3px) scale(0.99) rotate(0deg);
  }
}

@keyframes thinkingFrame {
  0%,
  60%,
  88%,
  100% {
    opacity: 0;
    transform: translateY(5px) scale(0.99) rotate(0deg);
  }
  68%,
  82% {
    opacity: 1;
    transform: translateY(0) scale(1) rotate(1.8deg);
  }
  75% {
    opacity: 1;
    transform: translateY(-2px) scale(1.004) rotate(-1.2deg);
  }
}

@keyframes symbolFloat {
  0%,
  100% {
    transform: translateY(0) rotate(0deg);
  }
  50% {
    transform: translateY(-12px) rotate(4deg);
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
  .mascot-image,
  .code-symbol,
  .loading-dots span {
    animation-duration: 0.01ms;
    animation-iteration-count: 1;
  }

  .mascot-image--idle {
    opacity: 1;
    transform: none;
  }

  .mascot-image--typing,
  .mascot-image--thinking {
    opacity: 0;
  }
}
</style>

<template>
  <section class="feature-carousel" :aria-labelledby="titleId">
    <div class="feature-carousel__heading">
      <span v-if="eyebrow" class="badge">{{ eyebrow }}</span>
      <h2 :id="titleId">{{ title }}</h2>
      <p v-if="description">{{ description }}</p>
    </div>

    <div v-if="activeSlide" class="feature-carousel__frame">
      <button
        class="feature-carousel__nav feature-carousel__nav--prev"
        type="button"
        @click="prevSlide"
        :aria-label="prevLabel"
      >
        ‹
      </button>

      <article class="feature-carousel__slide">
        <div class="feature-carousel__copy">
          <span class="feature-carousel__tag">{{ activeSlide.tag }}</span>
          <h3>{{ activeSlide.title }}</h3>
          <p>{{ activeSlide.description }}</p>
        </div>
        <div class="feature-carousel__visual" :class="{ 'feature-carousel__visual--split': activeSlide.images.length > 1 }">
          <img v-for="image in activeSlide.images" :key="image.src" :src="image.src" :alt="image.alt" />
        </div>
      </article>

      <button
        class="feature-carousel__nav feature-carousel__nav--next"
        type="button"
        @click="nextSlide"
        :aria-label="nextLabel"
      >
        ›
      </button>
    </div>

    <div v-if="slides.length > 1" class="feature-carousel__dots" :aria-label="dotsLabel">
      <button
        v-for="(slide, index) in slides"
        :key="slide.title"
        type="button"
        :class="{ active: index === activeIndex }"
        :aria-label="`${index + 1}번 소개 보기`"
        @click="activeIndex = index"
      />
    </div>
  </section>
</template>

<script>
export default {
  name: 'FeatureCarousel',
  props: {
    eyebrow: {
      type: String,
      default: '',
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      default: '',
    },
    slides: {
      type: Array,
      required: true,
    },
    prevLabel: {
      type: String,
      default: '이전 소개 보기',
    },
    nextLabel: {
      type: String,
      default: '다음 소개 보기',
    },
    dotsLabel: {
      type: String,
      default: '소개 슬라이드 선택',
    },
  },
  data() {
    return {
      activeIndex: 0,
      titleId: `feature-carousel-title-${this._uid}`,
    }
  },
  computed: {
    activeSlide() {
      return this.slides[this.activeIndex] || null
    },
  },
  watch: {
    slides() {
      this.activeIndex = 0
    },
  },
  methods: {
    prevSlide() {
      if (!this.slides.length) return
      this.activeIndex = (this.activeIndex - 1 + this.slides.length) % this.slides.length
    },
    nextSlide() {
      if (!this.slides.length) return
      this.activeIndex = (this.activeIndex + 1) % this.slides.length
    },
  },
}
</script>

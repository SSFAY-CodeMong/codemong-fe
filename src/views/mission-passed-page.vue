<template>
  <ResultPage forced-status="PASSED" />
</template>

<script>
import ResultPage from './mission-result-page.vue'

export default {
  name: 'MissionPassedPage',
  components: { ResultPage },
}
</script>

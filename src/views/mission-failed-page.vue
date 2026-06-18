<template>
  <ResultPage forced-status="FAILED" />
</template>

<script>
import ResultPage from './mission-result-page.vue'

export default {
  name: 'MissionFailedPage',
  components: { ResultPage },
}
</script>

/* eslint-disable indent */
<template>
    <div>
        <div v-for="(logitem, index) in listLogs">
            <div class="logTitle" > Игра {{ index+1 }}, {{ logitem.date }}, Загадал робот: {{ logitem.robotNumber }}, Победил: {{ logitem.winner }}</div>
            <round-statistics :statistics="logitem.data"></round-statistics>

            </div>
        </div>
</template>

<script>

import RoundStatisticsVue from './RoundStatistics.vue'

export default {
  name: 'LogPage',
  components: {
    'round-statistics': RoundStatisticsVue
  },
  data: () => ({
    logs: []
  }),
  computed: {
    listLogs () {
      // return this.$store.getters.getLogs;
      return this.$store.state.logs
    }
  },
  mounted () { // приложение монтируется
    this.$store.dispatch('listLogs')
  }
}
</script>

<style scoped>
.logTitle {
    margin-bottom: 10px;
    font-weight: 600;
    font-size: 1.2em;
}
</style>

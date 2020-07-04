<template>
          <div class="game-raund-statistics table-container" role="table">
            <div class="flex-table header" role="rowgroup">
              <div class="flex-row first" role="columnheader">Попытка</div>
              <div class="flex-row" role="columnheader">Число</div>
              <div class="flex-row" role="columnheader">Быки</div>
              <div class="flex-row" role="columnheader">Коровы</div>
            </div>
            <div v-for="statistic in statistics" :key="statistic.attempt" class="flex-table row" role="rowgroup">
              <div class="flex-row first" role="cell"><span class="flag-icon flag-icon-gb"></span> {{ statistic.attempt }} </div>
              <div class="flex-row" role="cell">{{ statistic.humanNumber }} </div>
              <div class="flex-row" role="cell">{{ statistic.bulls }}</div>
              <div class="flex-row" role="cell">{{ statistic.cows }}</div>
            </div>
          </div>
</template>

<script>
export default {
  name: 'RoundStatistics',
  props: {
    statistics: {
      type: Array,
      default: function () {
        return []
      }
    }
  },
  mounted () { // приложение монтируется

  }
}
</script>

<style scoped>
.flex-table {
    display: grid;
    grid-template-columns: repeat(auto-fill, 25%);
}
.game-raund-statistics {
    margin-bottom: 15px;
}
</style>

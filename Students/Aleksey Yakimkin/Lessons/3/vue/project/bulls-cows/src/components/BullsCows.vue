<template>
  <div class="hello">
    <h1>{{ name }}</h1>
    <div>
      <alert-window ref="notification" ></alert-window>
      <div class="start-control">
        <p>Введите 4-х значное число. У вас 10 попыток.</p>
        <button class="start-button" v-if="!gameOver" @click="robotGenerate">Загадать новое число</button>
        <button class="start-button" v-else @click="robotGenerate">Начать игру</button>
      </div>
      <form v-if="!gameOver" class="gamer-form" @submit.prevent="compareNumbers">
          Введите число: <input class="gamer-variant" name="humanNumber" v-model="humanNumber"> <!--@input debounce-->
            <input type="Submit" value="Отправить"/>
      </form>
      <div v-else>
       <div v-if="robotNumber">
          Робот загадал число {{ robotNumber }}. 
          <span v-if="winner === 'robot'" class="red">Вы не угадали</span>
          <span v-else class="green">Вы угадали</span>
       </div>
      </div>
      <div>
        <h2>Текущий результат</h2>
          <ul class="game-result">
            <li>
              Попытка: {{ attempts }}
            </li>
            <li >
              Быки: {{ bulls }}
            </li>
            <li  >
              Коров: {{ cows }}
            </li>
          </ul>
        <h2>Статистика раунда</h2>
          <round-statistics v-if="roundStatistics" :statistics="roundStatistics"></round-statistics>
      </div>
    </div>
  </div>
</template>

<script>
import AlertWindow from './AlertWindow'
import RoundStatisticsVue from './RoundStatistics.vue'

export default {
  name: 'BullsCows',
  components: {
    'alert-window': AlertWindow,
    'round-statistics': RoundStatisticsVue
  },
  data () {
    return {
      name: 'Быки и коровы',
      humanNumber: '',
      robotNumber: '',
      attempts: 0,
      cows: 0,
      bulls: 0,
      roundStatistics: [],
      gameOver: true,
      winner: '' // robot gamer
    }
  },
  methods: {
    initVars (val = 0) {
      this.bulls = 0
      this.cows = 0
      this.roundStatistics = []
      this.attempts = 0
      this.robotNumber = val
      this.winner = ''
    },
    compareNumbers (e) {
      e.preventDefault()
      this.bulls = 0
      this.cows = 0
      let excludePosition = []
      let validation = this.validationNumber(this.humanNumber)
      if (validation) {
        this.attempts++
        let humanArray = this.humanNumber.split('')
        this.robotNumber.split('').forEach((el, index) => {
          if (el === humanArray[index]) {
            this.bulls++
            excludePosition.push(index)
          } else if (humanArray.includes(el)) {
            this.cows++
          }
        })
        // round log
        this.humanNumber === this.robotNumber ? this.winner = 'gamer' : this.winner = 'robot'
        var now = new Date()
        this.roundStatistics.push({
          date: now.toLocaleString(),
          attempt: this.attempts,
          humanNumber: this.humanNumber,
          cows: this.cows,
          bulls: this.bulls,
          winner: this.winner
        })
        // game over
        if (this.humanNumber === this.robotNumber || this.attempts === 10) {
          this.gameOver = true
          this.writeLog()
        }
      }
    },
    validationNumber (number) {
      if (number.length !== 4) {
        this.$refs.notification.showError({message: 'Введите 4х значное число'}) // ??? life cicle ???
        return false
      } else if ((typeof number === 'string' || typeof number === 'number') && !isNaN(number - 0) && number !== '') {
        return true
      } else {
        this.$refs.notification.showError({message: 'Введите 4х значное число'}) // ??? life cicle ???
        return false
      }
    },
    writeLog (results) {
      var now = new Date()
      this.$store.dispatch({
        type: 'addItemToLog',
        logItem: {
          winner: this.winner,
          robotNumber: this.robotNumber,
          date: now.toLocaleString(),
          data: this.roundStatistics
        }})
    },
    robotGenerate () {
      let val = Math.floor(Math.random() * 9999) + ''
      if (val.length === 1) {
        val = '000' + val
      } else if (val.length === 2) {
        val = '00' + val
      } else if (val.length === 3) {
        val = '0' + val
      }
      this.gameOver = false
      this.initVars(val)
    }
  },
  computed: {
    upperCaseName () {
      return this.name.toUpperCase()
    }
  },
  mounted () {

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.start-control{
  margin-bottom: 15px;
}
.red {
  color: red;
}
.green {
  color: green;
}
</style>

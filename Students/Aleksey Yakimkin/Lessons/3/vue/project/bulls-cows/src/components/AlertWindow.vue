<template>
    <transition name="fade">
        <div class="allertMessage" v-if="showEr">Ошибка: {{ error }}</div>
    </transition>
</template>

<script>
export default {
  name: 'alert-window',
  props: {
    isVisible: false,
    wait: 9000
  },
  computed: {
    showEr () {
      return this.$store.state.error != null && this.$store.state.error !== ''
    },
    error: {
      get () {
        return this.$store.state.error
      },
      set (error) {
        return this.$store.commit('SET_ERROR', error)
      }
    }
  },
  methods: {
    showError (error) {
      console.dir(error)
      this.$store.dispatch('addError', error.message)
      setTimeout(() => this.clear(), this.wait)
    },
    clear () {
      this.$store.dispatch('addError', null)
    }

  },
  mounted () { // приложение монтируется
  }
}
</script>

<style scoped>
    .fade-enter-active{
        transition: opacity .9s;
    }
    .fade-enter{
        opacity:0;
    }
    .fade-enter-to{

    }
    .fade-leave{

    }
    .fade-leave-active{
        transition: opacity .9s;
    }
    .fade-leave-to{
        opacity:0.9;
    }
    .allertMessage{
        display: block;
        text-align: center;
        color: #fff;
        position: absolute;
        background-color: #f1453c;
        padding:20px;
        width: 400px;
        left:0;
        top:0;
    }
</style>

<template>
  <div id="app">
    <header class="container">
      <nav class="menu">
        <router-link to="/" >Игра</router-link>
        <router-link to="/log">Лог</router-link>
      </nav>
    </header>
    <main class="container">
      <router-view></router-view>
    </main>
    <footer class="container">

    </footer>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
nav {
  margin-bottom: 15px;
}
</style>

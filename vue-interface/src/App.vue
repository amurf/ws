<template>
  <div id="app">
    <websurvey></websurvey>
  </div>
</template>

<script>
import websurvey from './components/websurvey'

export default {
  name: 'app',
  components: {
    websurvey,
  }
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
</style>

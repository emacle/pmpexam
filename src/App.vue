<template>
  <div id="app">
    <router-link to="/helloworld1">helloworld1</router-link>|
    <router-link to="/paper/a">Paper-A</router-link>|
    <router-link to="/paper/b">Paper-B</router-link>|
    <router-link to="/paper/ahtml">p-A</router-link>|
    <router-link to="/paper/bhtml">p-B</router-link>|
    <router-link to="/paper/chtml">p-C</router-link>|
    <router-link to="/paper/dhtml">p-D</router-link>|
    <router-link to="/paper/ehtml">p-E</router-link>|
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App',
  components: {

  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 10px;
}
</style>

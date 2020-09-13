<template>
  <div id="app">
    <router-link to="/helloworld1">helloworld1</router-link>|
    <span v-for="(v,k) in jsonArr" :key="k">
      | <router-link :to="'/paper/' + v">Paper-{{v}}</router-link>
    </span>
    <!-- <router-link to="/paper/a">Paper-A</router-link>|
    <router-link to="/paper/b">Paper-B</router-link>|
    <router-link to="/paper/ahtml">p-A</router-link>|
    <router-link to="/paper/bhtml">p-B</router-link>|
    <router-link to="/paper/chtml">p-C</router-link>|
    <router-link to="/paper/dhtml">p-D</router-link>|
    <router-link to="/paper/ehtml">p-E</router-link>|-->
    <router-view />
  </div>
</template>

<script>
import _ from 'lodash'

export default {
  name: 'App',
  components: {

  },
  data() {
    return {
      jsonArr: []
    }
  },
  created() {
    this.$http.get('/').then(res => {
      console.log(res)
      let div = document.createElement("div")
      div.innerHTML = res
      // var text = div.textContent || div.innerText || ""
      let aArr = div.querySelectorAll("a[href]")
      console.log(div, div.querySelectorAll("a[href]"))

      this.jsonArr = _.map(_.drop(aArr, 5), (el) => {
        return _.trimEnd(el.innerHTML, '.json')
      })
      console.log(this.jsonArr)

    }).catch(e => {
      console.log(e)
    })
  },
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

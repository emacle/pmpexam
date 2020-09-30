import Vue from 'vue'
import Router from 'vue-router'

//组件模块
import HelloWorld from './components/HelloWorld'
import HelloWorld1 from './components/HelloWorld1'
import Paper from '@/views/Paper'

Vue.use(Router)

export default new Router({
  routes: [
    { path: '/helloworld', name: 'HelloWorld', component: HelloWorld },
    { path: '/helloworld1', name: 'HelloWorld1', component: HelloWorld1 },
    { path: '/paper/:id?', name: 'Paper', component: Paper },
    { path: '/', redirect: '/helloworld1' },
  ]
})
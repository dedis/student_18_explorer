import '@babel/polyfill'
import Vue from 'vue'
import VueRouter from 'vue-router'
import './plugins/vuetify'
import App from './App'
import LatestBlocks from './components/LatestBlocks'
import BlockInfo from './components/BlockInfo'

Vue.config.productionTip = false
Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    { path: '/', redirect: '/blocks' },
    { path: '/blocks', component: LatestBlocks },
    { path: '/blocks/:index', component: BlockInfo }
  ]
})

new Vue({
  render: h => h(App),
  router
}).$mount('#app')

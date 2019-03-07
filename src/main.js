import '@babel/polyfill'
import Vue from 'vue'
import VueRouter from 'vue-router'
import './plugins/vuetify'
import App from './App'
import LatestBlocks from './components/LatestBlocks'
import BlockInfo from './components/BlockInfo'
import Graph from './components/Graph'
import Measurements from './components/Measurements'
import Status from './components/Status'

Vue.config.productionTip = false
Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    { path: '/:chain', redirect: '/:chain/blocks' },
    { path: '/:chain/blocks', component: LatestBlocks },
    { path: '/:chain/blocks/:blockIndex', component: BlockInfo },
    { path: '/:chain/graph', component: Graph },
    { path: '/:chain/measurements', component: Measurements },
    { path: '/:chain/status', component: Status }
  ]
})

new Vue({
  render: h => h(App),
  router
}).$mount('#app')

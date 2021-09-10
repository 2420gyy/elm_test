import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios' 
import VueAxios from 'vue-axios' 

Vue.config.productionTip = false //是否是生产模式

Vue.use(VueAxios, axios)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})

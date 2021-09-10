import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
import goods from '../components/goods/goods.vue'
import seller from '../components/seller/seller.vue'
import ratings from '../components/ratings/ratings.vue'

Vue.use(Router)

let routes = [
  // Make sure to turn on production mode when deploying for production.
  // {path: '/goods', component: () => import('../components/goods/goods.vue') },
  {path: '/goods', component: goods },
  {path: '/seller', component: seller },
  {path: '/ratings', component: ratings },
  {path: '/', redirect: goods }
]


export default new Router({
  routes: routes,
  mode:"history",
  linkActiveClass: 'active' //设置链接点击样式名
})

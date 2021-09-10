<template>
  <div id="app">
    <!-- <div class="head">head</div> -->
    <v-header :seller="seller"></v-header>
    <div class="tab">
      <div class="tab-item">
      <!-- to:传递指定的链接 -->
        <router-link to="/goods">商品</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/ratings">评论</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/seller">商家</router-link>
      </div>
    </div>
      <!-- 路由出口：路由匹配的组件将在此处渲染 -->
      <router-view></router-view>
  </div>
</template>

<script>  
import header from './components/header/header.vue'
export default {
  name: 'App',
  data () { // 声明变量，json类型
    return {
      seller: {}
    }
  },
  created () {
    var _this = this // 将指向vue对象的this赋值给外部方法定义的属性_this
    this.axios({
      method: 'get',
      url: '/api/seller',
      responseType: 'json'
    }).then(function (response) {
      // console.log(response.data)
      if (response.data.errno === 0) {
        _this.seller = response.data.data // 将response中的数据赋值给seller
      }
    }).catch(function (error) { // 请求失败
      console.log("失败信息"+error)
    })
  },
  components: { // 注册组件
    'v-header': header
  }
}
</script>

<style lang="stylus">
  #app
    .tab
      display flex
      width 100%
      height 40px
      line-height 40px
      .tab-item
        flex 1
        text-align center
      a
        display block
        text-decoration none
        font-size 14px
        color rgb(77, 85 , 93)
        &.active
          color red
</style>

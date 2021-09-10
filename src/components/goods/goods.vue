<template>
  <div class="goods">
    <div class="menu-wrapper" ref="menuWrapper">
      <!--左:菜单-->
      <ul>
        <li class="menu-item" v-for="(item, index) in goods" v-bind:key="index" :class="{'current':currentIndex === index}" 
        @click="selectMenu(index,$event)">
          <span class="text">{{ item.name }}</span>
        </li>
      </ul>
    </div>
    <div class="goods-wrapper" ref="goodsWrapper">
      <!--右:商品列表-->
      <ul>
        <li class="food-list food-list-hook" v-for="(item, index) in goods" v-bind:key="index">
          <h1 class="title">{{ item.name }}</h1><!--标题-->
          <ul>
            <li class="food-item"
              v-for="(food, index) in item.foods"
              v-bind:key="index">
              <div class="icon">
                <img :src="food.icon" width="57" height="57" />
              </div>
              <div class="content">
                <h2 class="name">{{ food.name }}</h2>
                <p class="desc">{{ food.description }}</p>
                <!--描述-->
                <div class="extra">
                  <span class="count">月售{{ food.sellCount }}份</span>
                  <span>好评率{{ food.rating }}%</span>
                </div>
                <div class="price"><!--价格-->
                  <span class="now">￥{{food.price}}</span>
                  <span class="old" v-show="food.oldPrice">{{food.oldPrice}}</span>
                </div>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <!--第三个区域,shopcart区域-->
    <!--
    <shopcart ref="shopcart" :selectFoods="selectFoods" :deliveryPrice="seller.deliveryPrice"
              :minPrice="seller.minPrice"></shopcart>-->
    <!--第四个区域,隐藏的食物详情区域--><!--
    <food @add="addFood" :food="selectedFood" ref="food"></food>-->
  </div>
</template>

<script>
import BScoll from 'better-scroll' //实现菜单，商品列表的滚动
export default {
  data() {
    return {
      goods: [],
      listHeight: [],//保存每个区间的高度
      scrollY:0
      //selectedFood: {} //用来存储当前已被选择的food数据,对象保存形式
    }
  },
  computed:{
    currentIndex(){ // 返回虚拟下表 在menu-item中 :class 绑定此方法映射
      for(let i=0; i<this.listHeight.length; i++){ 
        let height1 = this.listHeight[i]
        let height2 = this.listHeight[i+1]
        //判断某个区间 确定下标
        if(!height2 || (this.scrollY >= height1 && this.scrollY < height2)){
          return i
        }
      }
      return 0
    },
    selectFoods() { //自动将所有的goods.food添加一个count属性,方便做数量运算
        let foods = [];
        this.goods.forEach((good) => {
          good.foods.forEach((food) => {
            if (food.count) {
              foods.push(food);
            }
          });
        });
        return foods;
      }
  },
  methods:{
    // selectFood(food, event){
    //         if (!event._constructed) {//忽略掉BScroll的事件
    //           return;
    //         }
    //         this.selectedFood = food; //写入当前选择的food
    //         this.$refs.food.show(); //显示当前选择的food的详情页
    //   },
      selectMenu(index, event){
        if (!event._constructed) { //忽略掉BScroll的事件
          return;
        }
        let foodsList = this.$refs.goodsWrapper.getElementsByClassName('food-list-hook');
        let el = foodsList[index];
        //类似jump to的功能,通过这个方法,跳转到指定的dom
        this.goodsScroll.scrollToElement(el, 300);
      },
      // addFood(target) {
      //   this._drop(target);
      // },
      // _drop(target) {
      //   // 体验优化,异步执行下落动画
      //   this.$nextTick(() => {
      //     this.$refs.shopcart.drop(target); //调用shopcart的下落动画
      //   });
      // },
    _initScroll(){ // 创建初始化better-scroll方法
      this.menuScroll = new BScoll(this.$refs.menuWrapper, {})
      this.goodsScroll = new BScoll(this.$refs.goodsWrapper, {
        probeType: 3 //在Scroll滚动时实时返回滚动位置，类似指针
      })
      //组件滚动时，获取到Y值
      this.goodsScroll.on('scroll', (pos) => {
        this.scrollY = Math.abs(Math.round(pos.y))
      })
    },
    _calculateHeight(){//计算每个区间高度的方法
    //获取每个food-list的区间高度 获取food-list的父元素，然后通过ClassName找到他
    let foodList = this.$refs.goodsWrapper.getElementsByClassName('food-list-hook')
    let height = 0
    this.listHeight.push(height) //第一个高度
    for(let i = 0; i<foodList.length; i++){
      let item = foodList[i]
      height +=item.clientHeight //获取区间高度
      this.listHeight.push(height)
    }
    // console.log(this.listHeight)

    }
  },
  created() {
    //获取商品数据
    var _this = this;
    this.axios({
      method: "get",
      url: "/api/goods",
      responseType: "json",
    })
      .then(function (response) {
        if (response.data.errno === 0) {
          _this.goods = response.data.data;
          _this.$nextTick(()=>{ //操作原生DOM时，此接口安全
            _this._initScroll() // 调用初始化better-scroll方法
            _this._calculateHeight() //调用方法
          })
          console.log(_this.goods);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  },
};
</script>

<style  lang="stylus">
.goods
  display flex
  position absolute
  top 174px // 顶部header
  bottom 46px // 底部购物车篮
  width 100%
  overflow hidden // 超出可视高度隐藏
  .menu-wrapper
    flex 0 0 80px
    width 80px
    background-color #F4F5F7
    .menu-item
      display table
      width 56px
      height 54px
      padding 0 12px
      line-height 14px
      &.current
        position relative
        z-index 10;
        margin-top -1px
        background-color #ffffff
        font-weight 700
      .text
        display table-cell
        width 56px
        vertical-align middle
        text-align center
        border-bottom 1px solid rgba(7, 17, 27, 0.1)
        font-size 12px
  .goods-wrapper
    flex 1 // 弹性自适应布局
    .food-list
      .title
        padding-left 14px;
        height 26px;
        line-height 26px;
        border-left 2px solid #dadde2;
        font-size 12px;
        color #979AA1;
        background-color #F4f5f7;
      .food-item
        display flex;
        margin 18px;
        padding-bottom 1px solid rgba(7,17,27,0.1);
        .icon
          flex 0 0 57px
          margin-right 10px
        .content
          flex 1;
          .name
            margin 2px 0 8px 0
            height 14px
            line-height 14px
            color rgb(7,17,27)
          .desc, .extra
            margin-bottom 8px
            line-height 10px
            font-size 10px
            color #93999F
          .extra
            &.count
              margin-right 12px
          .price
            font-weight 700
            line-height 24px
            .now
              margin-right 8px
              font-size 14px
              color #eb0e01
            .old
              text-decoration line-line-through
              font-size 10px
              color #90949c

</style>
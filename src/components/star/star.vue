<template>
<!--
绑定星星类型的class(48,36,24尺寸),使用starType
使用class来显示星星,有3种类型,全星,半星,无星,使用star-item代表星星本身,然后分别使用on,off,half代表三种不同类型的星星
一个span代表一个星星项目,并且使用v-for循环将星星项目输出
-->
  <div class="star" :class="starType">
    <span v-for="(itemClass,index) in itemClasses" :class="itemClass" class="star-item" :key="index"></span>
  </div>
</template>

<script>
// 设置常量是为了方便解耦
  const LENGTH = 5
  const CLS_ON = 'on'
  const CLS_HALF = 'half'
  const CLS_OFF = 'off'

  export default {
    props: {
      size: {
        type: Number
      },
      score: {
        type: Number
      }
    },
    computed: {
      starType() { //通过计算属性,返回组装过的类型,用来对应class类型
        return 'star-' + this.size
      },
      itemClasses() {
        let result = []
        const score = Math.floor(this.score * 2) / 2
        const hasDecimal = score % 1 !== 0
        const integer = Math.floor(score)
        for (let i = 0; i < integer; i++) {
          result.push(CLS_ON)//一个整数星星就push一个CLS_ON到数组
        }
        if (hasDecimal) {//非整数星星使用half
          result.push(CLS_HALF)
        }
        while (result.length < LENGTH) {//余下的用无星星补全,使用off
          result.push(CLS_OFF)
        }
        return result
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
// @import  url("../../common/stylus/mixin.styl")

  .star
    display: flex
    align-items: center
    justify-content: center
    .star-item
      background-repeat: no-repeat
    &.star-48
      .star-item
        width: 20px
        height: 20px
        margin-right: 22px
        background-size: 20px 20px
        &:last-child
          margin-right: 0
        &.on
          bg-image('star48_on')
        &.half
          bg-image('star48_half')
        &.off
          bg-image('star48_off')
    &.star-36
      .star-item
        width: 15px
        height: 15px
        margin-right: 6px
        background-size: 15px 15px
        &:last-child
          margin-right: 0
        &.on
          bg-image('star36_on')
        &.half
          bg-image('star36_half')
        &.off
          bg-image('star36_off')
    &.star-24
      .star-item
        width: 10px
        height: 10px
        margin-right: 3px
        background-size: 10px 10px
        &:last-child
          margin-right: 0
        &.on
          bg-image('star24_on')
        &.half
          bg-image('star24_half')
        &.off
          bg-image('star24_off')
</style>

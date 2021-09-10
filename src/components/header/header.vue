<template>
  <div class="header">
    <div class="content-wapper">
      <div class="left">
        <img width="64" height="64" :src="seller.avatar" />
      </div>
      <div class="right">
        <div class="title">
          <span class="brand"></span>
          <span class="name">{{ seller.name }}</span>
        </div>
        <div class="description">
          {{ seller.description }}/{{ seller.deliveryTime }}分钟送达
        </div>
        <div class="support" v-if="seller.supports">
          <span class="icon"></span><!--满减-->
          <span class="text">{{ seller.supports[0].description }}</span>
        </div>
      </div>
      <div v-if="seller.supports" class="support-count" @click="showDetail">
        <span class="count">{{ seller.supports.length }}个</span>
        <i class="jt"> > </i>
      </div>
    </div>
    <div class="bulletin-wrapper" @click="showDetail">
      <!--公告区-->
      <span class="bulletin-title"></span>
      <span class="bulletin-text">{{ seller.bulletin }}</span>
      <i class="jt2"> > </i>
    </div>
    <div class="backgroundPic">
      <!--背景图片-->
      <img :src="seller.avatar" width="100%" height="100%" />
    </div>

    <transition name="fade" type="transition">
      <div class="detail" v-show="detailShow">
        <!--优惠信息详情，弹出窗口-->
        <div class="detail-wrapper">
          <div class="detail-main">
            <!--内容-->
            <h1 class="seller-name">{{ seller.name }}</h1>
            <div class="info-title">
              <div class="line"></div>
              <div class="info-text">优惠信息</div>
              <div class="line"></div>
            </div>
            <ul class="supports" v-if="seller.supports">
              <li class="support-item" v-for="(item, index) in seller.supports" v-bind:key="index">
                <span class="icon"></span>
                <span class="text">{{ item.description }}</span>
              </li>
            </ul>
            <div class="info-title">
              <div class="line"></div>
              <div class="info-text">商家公告</div>
              <div class="line"></div>
            </div>
            <div class="bulletin">
              <div class="content">{{ seller.bulletin }}</div>
            </div>
          </div>
           <!--弹层和css sticky footer-->
          <div class="detail-close" @click="closeDetail">
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>


<script>
import star from '../star/star.vue'
export default {
  //同:seller同名
  props: ["seller"],
  data() {
    return {
      detailShow: false,
    };
  },
  methods: {
    showDetail() {
      this.detailShow = true;
    },
    closeDetail() {
      this.detailShow = false;
    },
  },
  created(){ //主要看这个classMap
      this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
    },
//classMap数组的顺序就对应supports数组的顺序
//例如supports数组的第一个元素就对应decrease,而decrease又对应到.decrease的class
//classMap[seller.supports[0].type]  //seller.supports[0].type就是0,然后classMap的第0个就是decrease,就能够指向到.decrease

    // components: {
    //   'star': star
    // }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus">
.header {
  color: white;
  position: relative;
  background-color: rgba(7, 17, 27, 0.5);

  .content-wapper {
    position: relative;
    padding: 24px 12px 18px 24px;
    font-size: 0;

    .left {
      display: inline-block;
      vertical-align: top;

      img {
        border-radius: 2px;
      }
    }

    .right {
      display: inline-block;
      margin-left: 16px;
      font-size: 14px;

      .title {
        margin: 2px 0 8px 0;

        .brand {
          display: inline-block;
          vertical-align: top;
          width: 30px;
          height: 18px;
          background-image: url('brand@2x.png');
          background-size: 30px 18px;
          background-repeat: no-repeat;
        }

        .name {
          margin-left: 6px;
          font-size: 16px;
          line-height: 18px;
          font-weight: bold;
        }
      }

      .description {
        margin-bottom: 10px;
        line-height: 12px;
        font-weight: bold;
        font-size: 12px;
      }

      .support {
        margin-top: 5px;

        .icon {
          display: inline-block;
          width: 12px;
          height: 12px;
          margin-right: 4px;
          background-image: url('decrease_1@2x.png');
          background-size: 12px 12px;
          background-repeat: no-repeat;
        }

        .text {
          vertical-align: top;
          line-height: 12px;
          font-weigth: 100;
          font-size: 10px;
        }
      }
    }

    .support-count {
      position: absolute;
      right: 12px;
      bottom: 14px;
      padding: 0 8px;
      height: 24px;
      line-height: 24px;
      border-radius: 14px;
      background-color: rgba(0, 0, 0, 0.2);
      text-align: center;

      .count {
        vertical-align: top;
        font-size: 10px;
      }

      .jt {
        margin-left: 2px;
        font-size: 10px;
      }
    }
  }

  .bulletin-wrapper {
    position: relative;
    height: 28px;
    line-height: 28px;
    padding: 0 22px 0 12px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;//text-overflow :ellipsis显示在底部.不是中间,是浏览器的显示处理不同关于文字内容溢出用点点点-省略号表示
    background-color: rgb(7, 17, 27, 0.2);

    .bulletin-title {
      display: inline-block;
      vertical-align: top;
      margin-top: 8px;
      width: 22px;
      height: 12px;
      background-image: url('bulletin@2x.png');
      background-size: 22px 12px;
      background-repeat: no-repeat;
    }

    .bulletin-text {
      vertical-align: top;
      font-size: 10px;
      margin: 0 4px;
      font-weight 100px; 
    }

    .jt2 {
      position: absolute;
      margin-left: 2px;
      font-size: 10px;
      right: 12px;
      top: 1px;
    }
  }

  .backgroundPic {
    position: absolute; // 设置.header 相对定位
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
    filter: blur(5px); // 模糊图片
  }

  .detail {
    position: fixed;
    z-index: 100;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    overflow: auto;
    background-color: rgba(7, 17, 27, 0.8);
    -webkit-transition: all 0.8s;

    &.fade-enter, &.fade-leave-to {
      opacity: 0; // 动画开始和结束
      background-color: rgba(7, 17, 27, 0);
    }

    &.fade-enter-to, &fade-leave {
      opacity: 1;
      background-color: rgba(7, 17, 27, 0.8);
    }

    .detail-wrapper {
      min-height: 100%;

      .detail-main {
        margin-top: 64px;
        padding-bottom: 64px;

        .seller-name {
          line-height: 16px;
          text-align: center;
          font-size: 16px;
          font-weight: 700;
        }

        .info-title {
          display: flex;
          width: 80%;
          margin: 28px auto 24px auto;

          .line {
            flex: 1;
            position: relative;
            top: -6px;
            border-bottom: 1px solid rgba(255, 255, 255, 0.5);
          }

          .info-text {
            padding: 0 12px;
            font-font-weight: 700;
            font-size: 14px;
          }
        }

        .supports {
          width: 80%;
          margin: 0 auto;

          .support-item {
            padding: 0 12px;
            font-size: 0px;

            &.last-child {
              margin-bottom: 0;
            }

            .icon {
              display: inline-block;
              width: 16px;
              height: 16px;
              vertical-align: top;
              margin-right: 6px;
              background-image: url('special_4@2x.png');
              background-size: 16px 16px;
              background-repeat: no-repeat;
            }

            .text {
              line-height: 16px;
              font-size: 12px;
            }
          }
        }

        .bulletin {
          width: 80%;
          margin: 0 auto;

          .content {
            padding: 0 12px;
            line-height: 24px;
            font-size: 12px;
          }
        }
      }

      .detail-close {
        position: relative;
        width: 32px;
        height: 32px;
        margin: -32px auto 0 auto;
        clear: both; // 清除左右两边浮动
        background-image: url('png-2067.png');
        background-size: 32px 32px;
        background-repeat: no-repeat;
      }
    }
  }
}
</style>

<template>
  <div class="Home">
    <!-- NavBar 顶部导航 -->
    <van-nav-bar title="首页"
                 left-text="重新登录">
      <van-icon name="scan"
                slot="right"
                size="25px" />
    </van-nav-bar>
    <!-- 主页轮播 -->
    <div class="swiper">
      <van-swipe :autoplay="3000"
                 indicator-color="white">
        <van-swipe-item>
          <img src="../../assets/1.png"
               alt="">
        </van-swipe-item>
        <van-swipe-item>
          <img src="../../assets/2.png"
               alt="">
        </van-swipe-item>
        <van-swipe-item>
          <img src="../../assets/3.png"
               alt="">
        </van-swipe-item>
        <van-swipe-item>
          <img src="../../assets/4.png"
               alt="">
        </van-swipe-item>
      </van-swipe>
    </div>
    <!-- 菜单项 -->
    <div class="menu">
      <van-row>
        <van-col span="6">
          <van-button icon="point-gift-o"
                      type="primary"
                      color="linear-gradient(to right, #4bb0ff, #6149f6)"
                      round />
          <div class="shoping"
               style="font-size: 13px;">限时优惠</div>
        </van-col>
        <van-col span="6">
          <van-button icon="hot-o"
                      type="primary"
                      color="linear-gradient(to left, #4bb0ff, #6149f6)"
                      round />
          <div class="shoping"
               style="font-size: 13px;">爆款单品</div>

        </van-col>
        <van-col span="6">
          <van-button icon="free-postage"
                      type="primary"
                      color="linear-gradient(to top, #4bb0ff, #6149f6)"
                      round />
          <div class="shoping"
               style="font-size: 13px;">全场包邮</div>

        </van-col>
        <van-col span="6">
          <van-button icon="logistics"
                      type="primary"
                      color="linear-gradient(to bottom, #4bb0ff, #6149f6)"
                      round />
          <div class="shoping"
               style="font-size: 13px;">我的快递</div>

        </van-col>
      </van-row>
      <van-row>
        <van-col span="6">
          <van-button icon="goods-collect-o"
                      type="primary"
                      color="linear-gradient(to right, #ebb0ff, #2c49f6)"
                      round />
          <div class="shoping"
               style="font-size: 13px;">爆火商品</div>

        </van-col>
        <van-col span="6">
          <van-button icon="vip-card-o"
                      type="primary"
                      color="linear-gradient(to top, #cbb0ff, #a149f6)"
                      round />
          <div class="shoping"
               style="font-size: 13px;">大牌会员</div>

        </van-col>
        <van-col span="6">
          <van-button icon="shop-o"
                      type="primary"
                      color="linear-gradient(to right, #ebb0ff, #2c49f6)"
                      round />
          <div class="shoping"
               style="font-size: 13px;">热门商店</div>

        </van-col>
        <van-col span="6">
          <van-button icon="gold-coin-o"
                      type="primary"
                      color="linear-gradient(to bottom, #ebb0ff, #2c49f6)"
                      round />
          <div class="shoping"
               style="font-size: 13px;">我的账户</div>

        </van-col>
      </van-row>
    </div>
    <!-- 图表 -->
    <div class="Home_Echarts">
      <div ref="bar"
           style="width: 10rem; height: 400px; color: white;"></div>
    </div>
    <!-- 底部标签栏 -->
    <div class="footer_nav">
      <van-tabbar v-model="active">
        <van-tabbar-item icon="location-o">打卡</van-tabbar-item>
        <van-tabbar-item icon="shopping-cart-o"
                         dot>购物车</van-tabbar-item>
        <van-tabbar-item icon="apps-o"
                         info="5">分类</van-tabbar-item>
        <van-tabbar-item icon="user-circle-o"
                         info="20">我的</van-tabbar-item>
      </van-tabbar>
    </div>
  </div>
</template>

<script>
import echarts from 'echarts'
export default {
  data () {
    return {
      current: 0,
      active: 0
    }
  },
  mounted () {
    const dom = this.$refs.bar
    const mytEcharts = echarts.init(dom)
    const option = {
      title: {
        text: ''
      },
      tooltip: {
        trigger: 'axis'
      },
      legend: {
        data: ['最高气温', '最低气温']
      },
      toolbox: {
        show: false,
        feature: {
          dataZoom: {
            yAxisIndex: 'none'
          },
          dataView: { readOnly: false },
          magicType: { type: ['line', 'bar'] },
          restore: {},
          saveAsImage: {}
        }
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
      },
      yAxis: {
        type: 'value',
        axisLabel: {
          formatter: '{value} °C'
        }
      },
      series: [
        {
          name: '最高气温',
          type: 'line',
          data: [11, 11, 15, 13, 12, 13, 10],
          markPoint: {
            data: [
              { type: 'max', name: '最大值' },
              { type: 'min', name: '最小值' }
            ]
          },
          markLine: {
            data: [
              { type: 'average', name: '平均值' }
            ]
          }
        },
        {
          name: '最低气温',
          type: 'line',
          data: [1, -2, 2, 5, 3, 2, 0],
          markPoint: {
            data: [
              { name: '周最低', value: -2, xAxis: 1, yAxis: -1.5 }
            ]
          },
          markLine: {
            data: [
              { type: 'average', name: '平均值' },
              [{
                symbol: 'none',
                x: '90%',
                yAxis: 'max'
              }, {
                symbol: 'circle',
                label: {
                  normal: {
                    position: 'start',
                    formatter: '最大值'
                  }
                },
                type: 'max',
                name: '最高点'
              }]
            ]
          }
        }
      ]
    }
    mytEcharts.setOption(option)
  },
  methods: {
    onChange (index) {
      this.current = index
    }
  }
}
</script>

<style lang="less" scoped>
.Home {
  width: 100%;
  height: 2000px;
  background: url("../../assets/Home_Bg.png");
  position: fixed;
  object-fit: cover;
  .van-nav-bar {
    background: #524c4c;
    color: white;
    font-family: "楷体";
    .van-nav-bar__title {
      color: white;
    }
    .van-icon {
      color: white;
    }
    .van-nav-bar__text {
      color: white;
    }
  }
  .swiper {
    width: 100%;
    height: 400px;

    .van-swipe {
      width: 100%;
      height: 100%;

      .van-swipe-item {
        width: 100%;
        height: 100%;
      }
    }
    img {
      width: 100%;
    }
  }
  .menu {
    width: 98%;
    height: 300px;
    // background-color: rgba(209, 205, 205, 0.7);
    border-radius: 20px;
    margin-top: 15px;
    padding: 10px;

    .shoping {
      font-size: 14px;
      color: white;
      font-family: "楷体";
    }
    .van-col {
      padding-left: 30px;
      margin-top: 20px;
      .van-button {
        margin-bottom: 10px;
      }
    }
  }
  .Home_Echarts {
    width: 10rem;
    height: 400px;
    margin: 20px 40px 20px 20px;
    background: white;
  }
  .footer_nav {
    .van-tabbar--fixed {
      background: #524c4c;
    }
  }
}
</style>

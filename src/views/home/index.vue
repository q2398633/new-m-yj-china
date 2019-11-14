<template>
  <div class="Home">
    <!-- NavBar 顶部导航 -->
    <van-nav-bar title="寅卯幼儿园"
                 left-text="重新登录"
                 left-arrow
                 @click-left="onCleck_left">
      <van-icon name="scan"
                slot="right"
                size="25px" />
    </van-nav-bar>
    <van-tabs v-model="active"
              animated
              background="#524c4c"
              color="rgba(124, 89, 214)"
              title-active-color="gold"
              title-inactive-color="white">
      <van-tab title="首页">
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
              <div class="shoping">限时优惠</div>
            </van-col>
            <van-col span="6">
              <van-button icon="hot-o"
                          type="primary"
                          color="linear-gradient(to left, #4bb0ff, #6149f6)"
                          round />
              <div class="shoping">爆款单品</div>

            </van-col>
            <van-col span="6">
              <van-button icon="free-postage"
                          type="primary"
                          color="linear-gradient(to top, #4bb0ff, #6149f6)"
                          round />
              <div class="shoping">全场包邮</div>

            </van-col>
            <van-col span="6">
              <van-button icon="logistics"
                          type="primary"
                          color="linear-gradient(to bottom, #4bb0ff, #6149f6)"
                          round />
              <div class="shoping">我的快递</div>

            </van-col>
          </van-row>
          <van-row>
            <van-col span="6">
              <van-button icon="goods-collect-o"
                          type="primary"
                          color="linear-gradient(to right, #ebb0ff, #2c49f6)"
                          round />
              <div class="shoping">爆火商品</div>

            </van-col>
            <van-col span="6">
              <van-button icon="vip-card-o"
                          type="primary"
                          color="linear-gradient(to top, #cbb0ff, #a149f6)"
                          round />
              <div class="shoping">大牌会员</div>

            </van-col>
            <van-col span="6">
              <van-button icon="shop-o"
                          type="primary"
                          color="linear-gradient(to right, #ebb0ff, #2c49f6)"
                          round />
              <div class="shoping">热门商店</div>

            </van-col>
            <van-col span="6">
              <van-button icon="gold-coin-o"
                          type="primary"
                          color="linear-gradient(to bottom, #ebb0ff, #2c49f6)"
                          round />
              <div class="shoping">我的账户</div>

            </van-col>
          </van-row>
        </div>
        <!-- 图表 -->
        <div class="Home_Echarts">
          <ve-line :data="chartData"></ve-line>
        </div>
      </van-tab>
      <van-tab title="打卡">内容 2</van-tab>
      <van-tab title="分类">内容 3</van-tab>
      <van-tab title="我的">内容 4</van-tab>
    </van-tabs>
    <!-- 底部标签栏 -->
    <div class="footer_nav">
      <van-tabbar v-model="active">
        <van-tabbar-item icon="wap-home-o">首页</van-tabbar-item>
        <van-tabbar-item icon="location-o"
                         dot>签到</van-tabbar-item>
        <van-tabbar-item icon="apps-o"
                         info="5">分类</van-tabbar-item>
        <van-tabbar-item icon="user-circle-o"
                         info="20">我的</van-tabbar-item>
      </van-tabbar>
    </div>
  </div>
</template>

<script>

export default {
  data () {
    return {
      current: 0,
      active: 4,
      chartData: {
        columns: ['日期', '访问用户', '下单用户', '下单率'],
        rows: [
          { '日期': '1/1', '访问用户': 1393, '下单用户': 1093, '下单率': 0.32 },
          { '日期': '1/2', '访问用户': 3530, '下单用户': 3230, '下单率': 0.26 },
          { '日期': '1/3', '访问用户': 2923, '下单用户': 2623, '下单率': 0.76 },
          { '日期': '1/4', '访问用户': 1723, '下单用户': 1423, '下单率': 0.49 },
          { '日期': '1/5', '访问用户': 3792, '下单用户': 3492, '下单率': 0.323 },
          { '日期': '1/6', '访问用户': 4593, '下单用户': 4293, '下单率': 0.78 }
        ]
      }
    }
  },
  mounted () {

  },
  methods: {
    onChange (index) {
      this.current = index
    },
    onCleck_left () {
      this.$router.push('/login')
    }
  }
}
</script>

<style lang="less" scoped>
.Home {
  width: 100%;
  height: 22.66667rem;
  background: #524c4c;
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
    margin-left: 11px;
    padding: 10px;

    .shoping {
      font-size: 0.3rem;
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

  .footer_nav {
    .van-tabbar--fixed {
      background: #524c4c;
    }
  }
}
</style>

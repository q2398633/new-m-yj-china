<template>
  <div class="Home">
    <!-- NavBar 顶部导航 -->
    <van-nav-bar title="寅卯幼儿园"
                 left-text="重新登录"
                 left-arrow
                 @click-left="onCleck_left">
      <van-icon name="scan"
                slot="right"
                size="36px" />
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
      <!-- 打卡 -->
      <van-tab title="打卡">
        <div class="sign-in-top">
          <van-row>
            <van-col span="16">
              <div class="Head-portrait">
                <div class="Fl-left">
                  <img src="../../assets/head.png"
                       alt=""
                       align="left">
                </div>
                <div class="Fl-right">
                  <span class="Nickname">{{ Nickname }}</span>
                  <div class="van-ellipsis Nickname rule"
                       @click="SignInRule">考勤组: {{ AttendanceGroup }} 查看考勤规则</div>
                </div>
              </div>
            </van-col>
            <van-col span="8"
                     class="nav-right">
              <van-icon name="calender-o"
                        color="white"
                        calender-o
                        size="36px" />
            </van-col>
          </van-row>
        </div>
        <van-steps direction="vertical"
                   :active="0">
          <van-step v-if="flag1">
            <h3>上班打卡</h3>
            <p>{{ date }}</p>
            <div class="calendar animated pulse"
                 @click="SignIn">
              <div class="Font-Top">上班打卡</div>
              <div class="Font-Bottom">{{ date }}</div>
            </div>
          </van-step>
          <van-step v-if="flag2">
            <h3>下班打卡</h3>
            <p>{{ date }}</p>
            <div class="calendar animated pulse"
                 @click="SignIn">
              <div class="Font-Top">下班打卡</div>
              <div class="Font-Bottom"> {{ date }}</div>
            </div>
          </van-step>
        </van-steps>
        <div class="Range">
          <van-radio-group v-model="radio">
            <van-radio name="1">
              <span class="Rang_font">{{ Range }} {{ CFN }}</span>
            </van-radio>
          </van-radio-group>
        </div>
      </van-tab>
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
    name: 'Home',
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
            },
            Nickname: '山田孝之',
            AttendanceGroup: '二组',
            date: '',
            timer: null,
            radio: '1',
            Range: '已进入考勤范围:',
            CFN: '里屋',
            count: 0,
            flag1: true,
            flag2: false
        }
    },
    created () {
        this.nowTimes()
        this.getMycount()
    },
    mounted () {
        let _this = this // 声明一个变量指向Vue实例this，保证作用域一致
        this.timer = setInterval(() => {
            _this.time = new Date() // 修改数据date
        }, 1000)
        setTimeout(() => {

        }, 500)
    },
    methods: {
        onChange (index) {
            this.current = index
        },
        onCleck_left () {
            this.$router.push('/login')
        },
        timeFormate (timeStamp) {
            let hh = new Date(timeStamp).getHours() < 10 ? '0' + new Date(timeStamp).getHours() : new Date(timeStamp).getHours()
            let mm = new Date(timeStamp).getMinutes() < 10 ? '0' + new Date(timeStamp).getMinutes() : new Date(timeStamp).getMinutes()
            let ss = new Date(timeStamp).getSeconds() < 10 ? '0' + new Date(timeStamp).getSeconds() : new Date(timeStamp).getSeconds()
            this.date = hh + ':' + mm + ':' + ss
        },
        // 定时器函数
        nowTimes () {
            this.timeFormate(new Date())
            this.timer = setTimeout(this.nowTimes, 1000)
        },
        SignIn () {
            this.count++
            console.log(this.count)
            if (this.count >= 2) {
                this.$toast.fail('请勿重复打卡')
            } else {
                this.$toast.success('打卡成功')
            }
        },
        getMycount () {
            let self = this
            let date = new Date()
            if (date.getHours() >= 6 && date.getHours() < 8) {
                self.flag1 = true
                self.flag2 = false
            } else if (date.getHours() >= 12 && date.getHours() < 13) {
                self.flag1 = false
                self.flag2 = true
            } else if (date.getHours() >= 14 && date.getHours() < 15) {
                self.flag1 = true
                self.flag2 = false
            } else if (date.getHours() >= 18 && date.getHours() < 23 && date.getMinutes() <= 59 && date.getSeconds() <= 59) {
                self.flag1 = false
                self.flag2 = true
            }
        },
        SignInRule () {
            this.$router.push('/SignInRule')
        }

    },
    computed: {

    },
    beforeDestroy () {
        if (this.timer) {
            clearTimeout(this.timer) // 在Vue实例销毁前，清除我们的定时器
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
  .calendar {
    width: 450px;
    height: 450px;
    background: linear-gradient(to bottom, #52e5e7, #736efe);
    margin-left: 90px;
    border-radius: 50%;
    box-shadow: 1px 1px 25px 6px #52e5e7;
    .now_date {
      display: inline-block;
      width: 100%;
      height: 200px;
      line-height: 230px;
      font-size: 0.54rem;
      color: white;
      margin-top: 120px;
      margin-left: 22px;
    }
  }
  .footer_nav {
    .van-tabbar--fixed {
      background: #524c4c;
    }
  }
  .sign-in-top {
    width: 100%;
    height: 120px;

    .Head-portrait {
      width: 100%;
      height: 100px;
      display: inline-block;
      margin-left: 40px;
      .Fl-left {
        height: 5px;
      }
      .Nickname {
        font-size: 30px;
        font-family: "楷体";
        color: white;
      }

      img {
        width: 100px;
        border-radius: 50%;
        margin-top: 20px;
        margin-right: 15px;
      }
      .rule {
        color: #736efe;
      }
    }
    .nav-right {
      padding-top: 56px;
      padding-left: 135px;
    }
    .van-row {
      height: 153px;
      border-top: 0.5px solid #b4afae;
      border-bottom: 0.5px solid #b4afae;
      margin-top: 10px;
    }
  }
  .Font-Top {
    color: white;
    font-size: 40px;
    font-weight: 700;
    width: 100%;
    text-align: center;
    padding-top: 100px;
    font-family: "微软雅黑";
  }
  .Font-Bottom {
    color: white;
    font-size: 70px;
    font-weight: 700;
    width: 100%;
    text-align: center;
    font-family: "微软雅黑";
    padding-top: 40px;
  }
  .Range {
    padding: 0 180px;
    margin-top: 50px;
    .Rang_font {
      font-size: 30px;
      color: white;
      font-weight: 700;
      padding-left: 15px;
    }
  }
  .van-steps {
    background: #524c4c;
  }
}
</style>

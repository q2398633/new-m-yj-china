<script src = "https://webapi.amap.com/maps?v=1.4.15&key=3554afad07a8ac3ddedf7b201e678de9" />

<template>
  <div class="Home">
    <!-- NavBar 顶部导航 -->
    <van-nav-bar title="寅卯幼儿园"
                 left-text="重新登录"
                 left-arrow
                 @click-left="onCleck_left"
                 fixed>
      <van-icon name="scan"
                slot="right"
                size=".6rem" />
    </van-nav-bar>
    <van-tabs v-model="active"
              animated
              background="white"
              color="black"
              title-active-color="#414a67"
              title-inactive-color="black">
      <van-tab title="首页">
        <!-- 主页轮播 -->
        <carousel-3d>
          <slide :index="0">
            <img src="../../assets/1.gif"
                 alt="">
          </slide>
          <slide :index="1">
            <img src="../../assets/2.gif"
                 alt="">
          </slide>
          <slide :index="2">
            <img src="../../assets/3.gif"
                 alt="">
          </slide>
          <slide :index="3">
            <img src="../../assets/4.gif"
                 alt="">
          </slide>
          <slide :index="4">
            <img src="../../assets/3.gif"
                 alt="">
          </slide>
          <slide :index="5">
            <img src="../../assets/1.gif"
                 alt="">
          </slide>
          <slide :index="6">
            <img src="../../assets/4.gif"
                 alt="">
          </slide>
        </carousel-3d>
        <!-- 菜单项 -->
        <div class="menu">
          <div class="default">
            <span class="menu_left">菜单</span>
            <span class="menu_right"
                  @click.prevent="Menu">更多功能</span>
          </div>
          <van-row style="">
            <van-col span="6">
              <van-button icon="point-gift-o"
                          type="primary"
                          color="#9569f9" />
              <div class="shoping">家长管理</div>
            </van-col>
            <van-col span="6">
              <van-button icon="hot-o"
                          type="primary"
                          color="#ff9400" />
              <div class="shoping">员工管理</div>

            </van-col>
            <van-col span="6">
              <van-button icon="free-postage"
                          type="primary"
                          color="#fe6c58" />
              <div class="shoping">班级管理</div>

            </van-col>
            <van-col span="6">
              <van-button icon="logistics"
                          type="primary"
                          color="#6f9dff" />
              <div class="shoping">账户管理</div>

            </van-col>
          </van-row>
          <van-row>
            <van-col span="6">
              <van-button icon="contact"
                          type="primary"
                          color="#93d030"
                          @click.prevent="ChildManagement" />
              <div class="shoping">幼儿管理</div>

            </van-col>
            <van-col span="6">
              <van-button icon="vip-card-o"
                          type="primary"
                          color="#fb6365" />
              <div class="shoping">考勤列表</div>

            </van-col>
            <van-col span="6">
              <van-button icon="shop-o"
                          type="primary"
                          color="#009aff"
                          round />
              <div class="shoping">考勤审核</div>

            </van-col>
            <van-col span="6">
              <van-button icon="ecard-pay"
                          color:white
                          type="primary"
                          color="#30c5cb"
                          round />
              <div class="shoping">督导评估</div>

            </van-col>
          </van-row>
        </div>
        <!-- 图表 -->
        <div class="Home_Echarts">
          <div class="Echarts_details">
            <span class="Echarts_left">可视化图表</span>
          </div>
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
                  <van-popup v-model="CalendarShow">
                    <div class="Calendar">
                      <calendar @change="onChange" />
                      <inlineCalendar />
                    </div>
                  </van-popup>
                </div>
              </div>
            </van-col>
            <van-col span="8"
                     class="nav-right">
              <van-icon name="calender-o"
                        color="black"
                        size="45px"
                        @click.prevent="CalenderShow" />
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
              <span class="Rang_font">{{ Range }}</span>
            </van-radio>
          </van-radio-group>
        </div>
      </van-tab>
      <van-tab title="分类">
      </van-tab>
      <van-tab title="我的">内容 4</van-tab>
    </van-tabs>
    <!-- 底部标签栏 -->
    <div class="footer_nav">
      <van-tabbar v-model="active"
                  active-color="gold"
                  inactive-color="white">
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
      Range: '已进入考勤范围',
      count: 0,
      flag1: true,
      flag2: false,
      CalendarShow: false,
      zb: this.zb
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
    },
    CalenderShow () {
      this.CalendarShow = true
    },
    ChildManagement () {
      this.$router.push('/ChildManagement')
    },
    Menu () {
      this.$router.push('/Menu')
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
  .van-nav-bar {
    background-color: #009aff;

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
  .carousel-3d-slide {
    border-radius: 25px;
    img {
      height: 100%;
    }
  }
  .menu {
    width: 98%;
    height: 300px;
    // background-color: rgba(209, 205, 205, 0.7);
    border-radius: 20px;
    margin-top: 15px;
    margin-left: 11px;
    margin-bottom: 20px;
    padding: 10px;

    .default {
      width: 700px;
      margin-bottom: 15px;
      margin-left: 8px;
      border-radius: 10px;
      background: #0199ff;
      .menu_left {
        font-size: 40px;
        margin-left: 25px;
        color: white;
        line-height: 80px;
        margin-top: 20px;
      }
      .menu_right {
        color: white;
        font-size: 30px;
        margin-top: 28px;
        margin-right: 30px;
        margin-left: 440px;
      }
    }
    .van-button {
      border-radius: 20px;
    }

    .van-button__icon {
      font-size: 50px;
    }
    .shoping {
      font-size: 0.4rem;
      color: black;
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
      background: #0199ff;
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
        font-size: 35px;
        font-family: "楷体";
        color: black;
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
    padding-top: 60px;
  }
  .Range {
    padding: 0 180px;
    margin-top: 50px;

    .Rang_font {
      font-size: 30px;
      color: black;
      font-weight: 700;
      padding-left: 45px;
    }
  }
  .van-steps {
    margin-top: 70px;
  }
  .Home_Echarts {
    margin-top: 200px;
    margin-left: 30px;
    margin-right: 40px;

    .Echarts_details {
      width: 700px;

      background: #009aff;
      margin-bottom: 30px;
      border-radius: 10px;

      .Echarts_left {
        font-size: 40px;
        margin-left: 25px;
        color: white;
        line-height: 90px;
        margin-top: 20px;
      }
    }
  }
  .van-tabs {
    margin-top: 90px;
  }
}
</style>

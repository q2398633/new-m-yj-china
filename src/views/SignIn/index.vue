<template>
  <div class="Home">
    <!-- NavBar 顶部导航 -->
    <van-nav-bar title="考勤规则"
                 left-arrow
                 size="36px"
                 @click-left="back">
    </van-nav-bar>
    <!-- 排班信息 -->
    <div class="UserScheduling">
      <div class="head">
        <img src="../../assets/head.png"
             alt="头像">
      </div>
      <div class="rule">
        <div class="username">{{ username }}</div>
        <div class="AttendanceGroup">考勤组: {{ AttendanceGroup }}</div>
      </div>
    </div>
    <!-- 排班规则 -->
    <van-collapse v-model="activeName"
                  accordion>
      <van-collapse-item title="考勤时间"
                         name="1">
        <h2>上班时间</h2>
        <div>上班打卡时间{{ SatrDaKaShiJian }}-{{ EndDaKaShiJian }} 下班打卡时间 {{ SatrDaKaShiJian2 }}-{{ EndDaKaShiJian2 }}</div>
        <div>{{ Scheduling }}</div>
        <div>通用</div>
      </van-collapse-item>
      <van-collapse-item title="人性化规则"
                         name="2">
        <h2>迟到与早退</h2>
        <div>迟到十四分钟不计时间</div>
        <div>迟到三十分钟以上视为严重迟到</div>
        <div>提前下班视为早退</div>
      </van-collapse-item>
      <van-collapse-item title="考勤范围"
                         name="3">
        <h2>打卡范围</h2>
        <div>方圆50米</div>
        <div>{{  WithinLimits }}</div>
      </van-collapse-item>
    </van-collapse>

  </div>
</template>

<script>
export default {
    name: 'SignInRule',
    data () {
        return {
            username: '山田孝之',
            AttendanceGroup: '第二班',
            activeName: '1',
            SatrDaKaShiJian: '09:00',
            EndDaKaShiJian: '12:00',
            SatrDaKaShiJian2: '12:30',
            EndDaKaShiJian2: '17:00',
            Scheduling: '有排班',
            WithinLimits: '已在打卡范围内',
            show3: false
        }
    },
    created () {

    },
    mounted () {

    },
    methods: {
        back () {
            this.$router.go(-1)
        },
        demo () {
            this.show3 = true
        }
    }
}
</script>

<style lang="less" scoped>
.Home {
  width: 100%;
  height: 22.66667rem;
  background: white;

  .van-nav-bar {
    background: #0199ff;
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
  .UserScheduling {
    width: 100%;
    height: 180px;
    border-bottom: 1px solid #b4afae;
    background: white;
    .head {
      float: left;
      width: 100px;
      height: 100px;
      padding: 24px 10px 20px 35px;
      img {
        border-radius: 50%;
        width: 100%;
      }
    }
    .rule {
      float: left;
      margin-left: 20px;
      margin-top: 40px;

      .username {
        font-size: 40px;
        color: black;
        font-weight: 700;
        font-family: "楷体";
      }

      .AttendanceGroup {
        font-size: 30px;
        color: blavk;
        font-weight: 700;
        font-family: "楷体";
      }
    }
  }
}
</style>

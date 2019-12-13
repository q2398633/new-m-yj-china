<template>
  <div>
    <div class="parentAdmin">
      <!-- 顶部导航 -->
      <van-nav-bar title="日常工作表"
                   left-text="返回"
                   left-arrow
                   @click-left.prevent="back"
                   style="position: fixed; width: 100%;">
      </van-nav-bar>
      <div class="wrapper">
        <div class="ZT">
          <img src="../../assets/ZT.jpg"
               alt=""
               style="width: 8rem; margin: 2.5rem 0 1rem 1rem; border-radius: .6rem;">
        </div>
        <div class="ItemButton">

          <van-row>
            <van-col span="11">
              <van-button size="large"
                          color="linear-gradient(to left, #79F1A4, #0E5CAD)"
                          @click.prevent="MNECheck">晨午晚检</van-button>
            </van-col>
            <van-col span="2"></van-col>
            <van-col span="11">
              <van-button size="large"
                          color="linear-gradient(to right, #79F1A4, #0E5CAD)"
                          @click.prevent="ShiftHandoverRegistration">交接班登记</van-button>
            </van-col>
          </van-row>

          <van-row>
            <van-col span="11">
              <van-button size="large"
                          color="linear-gradient(to left, #97ABFF, #123597)"
                          @click.prevent="HealthEducationRegistration">健康教育登记</van-button>
            </van-col>
            <van-col span="2"></van-col>
            <van-col span="11">
              <van-button size="large"
                          color="linear-gradient(to right, #97ABFF,#123597)"
                          @click.prevent="DPACRegistration">疾病防控登记</van-button>
            </van-col>
          </van-row>

          <van-row>
            <van-col span="11">
              <van-button size="large"
                          color="linear-gradient(to left, #3B2667, #BC78EC)"
                          @click.prevent="MinutesOFMealManagementMeeting">膳食管理会议记录</van-button>
            </van-col>
            <van-col span="2"></van-col>
            <van-col span="11">
              <van-button size="large"
                          color="linear-gradient(to right, #3B2667,#BC78EC)"
                          @click.prevent="InfectiousDiseaseRegistrationInformation">传染病登记信息</van-button>
            </van-col>
          </van-row>
          <van-row>
            <van-col span="11">
              <van-button size="large"
                          color="linear-gradient(to left, #FAB2FF, #1904E5)"
                          @click.prevent="InfirmityRegistration">体弱/肥胖儿童登记</van-button>
            </van-col>
            <van-col span="2"></van-col>
            <van-col span="11">
              <van-button size="large"
                          color="linear-gradient(to right, #FAB2FF, #1904E5)"
                          @click.prevent="ChildInjuriesAndAccidents">儿童伤害与事故登记</van-button>
            </van-col>
          </van-row>
          <van-row>
            <van-col span="11">
              <van-button size="large"
                          color="linear-gradient(to left, #81FFEF, #F067B4)">大型玩具检查登记</van-button>
            </van-col>
            <van-col span="2"></van-col>
            <van-col span="11">
              <van-button size="large"
                          color="linear-gradient(to right, #81FFEF, #F067B4)"
                          @click.prevent="VisionCorrectionRegistration">视力矫正登记</van-button>
            </van-col>
          </van-row>
          <van-row>
            <van-col span="11">
              <van-button size="large"
                          color="linear-gradient(to left, #C2FFD8, #465EFB)"
                          @click.prevent="LargeToys">大型玩具</van-button>
            </van-col>
            <van-col span="2"></van-col>
            <van-col span="11"
                     style="margin-bottom: 2rem;">
              <van-button size="large"
                          color="linear-gradient(to right,#C2FFD8,#465EFB)"
                          @click.prevent="RegistrationOFDentalCaries">龋齿登记</van-button>
            </van-col>
          </van-row>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {

    }
  },
  mounted () {

  },
  created () {

  },
  methods: {
    back () {
      this.$router.go(-1)
    },
    MNECheck () {
      this.$router.push('/MNECheck')
    },
    ShiftHandoverRegistration () {
      this.$router.push('/ShiftHandoverRegistration')
    },
    HealthEducationRegistration () {
      this.$router.push('/HealthEducationRegistration')
    },
    DPACRegistration () {
      this.$router.push('/DPACRegistration')
    },
    MinutesOFMealManagementMeeting () {
      this.$router.push('/MinutesOFMealManagementMeeting')
    },
    InfectiousDiseaseRegistrationInformation () {
      this.$router.push('/InfectiousDiseaseRegistrationInformation')
    },
    InfirmityRegistration () {
      this.$router.push('/InfirmityRegistration')
    },
    ChildInjuriesAndAccidents () {
      this.$router.push('/ChildInjuriesAndAccidents')
    },
    LargeToys () {
      this.$router.push('/LargeToys')
    },
    VisionCorrectionRegistration () {
      this.$router.push('/VisionCorrectionRegistration')
    },
    RegistrationOFDentalCaries () {
      this.$router.push('/RegistrationOFDentalCaries')
    }
  }
}
</script>
<style lang="less" scoped>
.parentAdmin {
  width: 100%;
  height: 100%;
  background: url("../../assets/PXMBG.jpg");

  background-size: cover;
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
    .wrapper {
      width: 100%;
    }
  }
  .ItemButton {
    padding: 20px;
  }
}
</style>

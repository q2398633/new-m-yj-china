<template>
  <div class="parentAdmin">
    <!-- NavBar 顶部导航 -->
    <van-nav-bar
      title="定位打卡"
      left-arrow
      left-text="返回"
      size="36px"
      @click-left="back"
      fixed
    >
    </van-nav-bar>
    <!-- 地图绘制 -->
    <div id="box">
      <div id="time">上海XXXXXXXXXXX有限公司</div>
      <button id="signbtn" class="layui-btn layui-btn-normal">考勤签到</button
      ><br />
      <div id="place" type="button" class="layui-btn-radius">非办公地点</div>
      <div id="distance">系统正在定位中</div>
      <div id="location">系统正在定位中</div>
    </div>
    <input type="hidden" id="isonoff" name="isonoff" value="true" />
    <input type="hidden" id="userid" name="userid" value="0" />
  </div>
</template>
<script>
export default {
  name: 'DaKa',
  data() {
    return {};
  },
  mounted() {},
  created() {
    // 此处为调用精确定位之后，调取ip定位，可根据实际情况改写
    this.getLocation();
  },
  methods: {
    back() {
      this.$router.go(-1);
    }
  }
};
</script>

<style lang="less" scoped>
.parentAdmin {
  width: 100%;
  height: 100%;

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
}
</style>

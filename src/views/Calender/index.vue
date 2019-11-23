<template>
  <div class="Home">
    <!-- NavBar 顶部导航 -->
    <van-nav-bar title="打卡日历"
                 left-arrow
                 size="36px"
                 @click-left="back">
    </van-nav-bar>
    <!-- 日历 -->
    <div class="Calendar">
      <calendar @change="onChange" />
      <inlineCalendar />
    </div>

  </div>
</template>

<script>

export default {
    name: 'SignInRule',
    data () {
        return {

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
        onChange (date) {
            console.log(date.format('YY-MM-DD'))
        }
    }
}
</script>

<style lang="less" scoped>
.Home {
  width: 100%;
  height: 22.66667rem;

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

  .Calendar {
    padding: 20px;
  }
}
</style>

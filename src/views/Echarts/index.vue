<template>
  <div class="parentAdmin">
    <!-- NavBar 顶部导航 -->
    <van-nav-bar title="报表"
                 left-arrow
                 left-text="返回"
                 size="36px"
                 @click-left="back"
                 fixed>
      <van-icon name="search"
                slot="right"
                size="25px"
                @click.prevent="SideMenu" />
    </van-nav-bar>
    <!-- 图表 -->
    <div class="Home_Echarts">
      <ve-line :data="chartData"></ve-line>
    </div>
  </div>
</template>

<script>

export default {
    name: 'StaffAdmin',
    data () {
        return {
            chartData: {
                columns: ['日期', '收入', '支出', '盈亏'],
                rows: [
                    { '日期': '1/1', '收入': 1393, '支出': 1093, '盈亏': 0.32 },
                    { '日期': '1/2', '收入': 3530, '支出': 3230, '盈亏': 0.26 },
                    { '日期': '1/3', '收入': 2923, '支出': 2623, '盈亏': 0.76 },
                    { '日期': '1/4', '收入': 1723, '支出': 1423, '盈亏': 0.49 },
                    { '日期': '1/5', '收入': 3792, '支出': 3492, '盈亏': 0.323 },
                    { '日期': '1/6', '收入': 4593, '支出': 4293, '盈亏': 0.78 }
                ]
            }
        }
    },
    mounted () {

    },
    created () {

    },
    methods: {
        back () {
            this.$router.go(-1)
        }
    }
}
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
  .Home_Echarts {
    margin-top: 200px;
    margin-left: 30px;
    margin-right: 40px;

    .Echarts_details {
      width: 100%;
      height: 90px;
      padding-bottom: 20px;
      background: #009aff;
      margin-bottom: 30px;
      border-radius: 10px;

      .Echarts_left {
        font-size: 40px;
        margin-left: 25px;
        color: white;
        margin-top: 20px;
      }
    }
  }
}
</style>

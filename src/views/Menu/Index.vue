<template>
  <div>
    <div class="Root-body">
      <!-- 顶部导航 -->
      <van-nav-bar title="更多功能"
                   left-text="返回"
                   left-arrow
                   @click-left.prevent="pushHome"
                   fixed>
        <van-icon name="search"
                  slot="right" />
      </van-nav-bar>
      <!-- Tab切换 -->
      <van-tabs v-model="active"
                background="#67d4e8"
                title-active-color="gold"
                title-inactive-color="white"
                color="white">
        <van-tab title="财务管理">
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
          <van-row>
            <van-col span="6">
              <van-button icon="point-gift-o"
                          type="primary"
                          color="#9569f9" />
              <div class="shoping">报表</div>
            </van-col>
            <van-col span="6">
              <van-button icon="point-gift-o"
                          type="primary"
                          color="#9569f9" />
              <div class="shoping">出勤率</div>
            </van-col>
            <van-col span="6">
              <van-button icon="point-gift-o"
                          type="primary"
                          color="#9569f9" />
              <div class="shoping">新增范围</div>
            </van-col>
            <van-col span="6">
              <van-button icon="point-gift-o"
                          type="primary"
                          color="#9569f9"
                          @click.prevent="BudgetAdmin" />
              <div class="shoping">收支管理</div>
            </van-col>
          </van-row>
        </van-tab>
        <van-tab title="营养保健">
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
          <van-row>
            <van-col span="6">
              <van-button icon="point-gift-o"
                          type="primary"
                          color="#9569f9"
                          @click.prevent="Recipes" />
              <div class="shoping">食谱部分</div>
            </van-col>
            <van-col span="6">
              <van-button icon="point-gift-o"
                          type="primary"
                          color="#9569f9" />
              <div class="shoping">日常工作表</div>
            </van-col>
          </van-row>
        </van-tab>
        <van-tab title="食堂管理">
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
          <van-row>
            <van-col span="6">
              <van-button icon="point-gift-o"
                          type="primary"
                          color="#9569f9"
                          @click.prevent="FoodSafety"></van-button>
              <div class="shoping">食品安全监测</div>
            </van-col>
            <van-col span="6">
              <van-button icon="point-gift-o"
                          type="primary"
                          color="#9569f9"
                          @click.prevent="TablewareDisinfection"></van-button>
              <div class="shoping">餐具消毒</div>
            </van-col>
            <van-col span="6">
              <van-button icon="point-gift-o"
                          type="primary"
                          color="#9569f9"></van-button>
              <div class="shoping">区域消毒 </div>
            </van-col>
            <van-col span="6">
              <van-button icon="point-gift-o"
                          type="primary"
                          color="#9569f9"></van-button>
              <div class="shoping">能耗详情</div>
            </van-col>
            <van-col span="6">
              <van-button icon="point-gift-o"
                          type="primary"
                          color="#9569f9"></van-button>
              <div class="shoping">食材处理记录</div>
            </van-col>
            <van-col span="6">
              <van-button icon="point-gift-o"
                          type="primary"
                          color="#9569f9"></van-button>
              <div class="shoping">菜品留样</div>
            </van-col>
          </van-row>
        </van-tab>
        <van-tab title="人事管理">
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
          <van-row>
            <van-col span="6">
              <van-button icon="point-gift-o"
                          type="primary"
                          color="black">
              </van-button>
              <div class="shoping">考勤列表</div>
            </van-col>
            <van-col span="6">
              <van-button icon="point-gift-o"
                          type="primary"
                          color="black">
              </van-button>
              <div class="shoping">打卡</div>
            </van-col>
            <van-col span="6">
              <van-button icon="point-gift-o"
                          type="primary"
                          color="black">
              </van-button>
              <div class="shoping">请销假</div>
            </van-col>
            <van-col span="6">
              <van-button icon="point-gift-o"
                          type="primary"
                          color="black">
              </van-button>
              <div class="shoping">员工奖惩</div>
            </van-col>
            <van-col span="6">
              <van-button icon="point-gift-o"
                          type="primary"
                          color="black">
              </van-button>
              <div class="shoping">员工培训</div>
            </van-col>
            <van-col span="6">
              <van-button icon="point-gift-o"
                          type="primary"
                          color="black">
              </van-button>
              <div class="shoping">绩效评分</div>
            </van-col>
            <van-col span="6">
              <van-button icon="point-gift-o"
                          type="primary"
                          color="black">
              </van-button>
              <div class="shoping">工资列表</div>
            </van-col>
            <van-col span="6">
              <van-button icon="point-gift-o"
                          type="primary"
                          color="black">
              </van-button>
              <div class="shoping">用户管理</div>
            </van-col>
          </van-row>
        </van-tab>
        <van-tab title="招生管理">
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
          <van-row>
            <van-col span="6">
              <van-button icon="point-gift-o"
                          type="peimary"
                          color="greenyellow">
              </van-button>
              <div class="shoping">环境调研</div>
            </van-col>
            <van-col span="6">
              <van-button icon="point-gift-o"
                          type="peimary"
                          color="greenyellow">
              </van-button>
              <div class="shoping">策划方案</div>
            </van-col>
            <van-col span="6">
              <van-button icon="point-gift-o"
                          type="peimary"
                          color="greenyellow">
              </van-button>
              <div class="shoping">来电来访</div>
            </van-col>
          </van-row>
        </van-tab>
        <van-tab title="后勤管理">
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
          <van-row>
            <van-col span="6">
              <van-button icon="point-gift-o"
                          type="primary"
                          color="gold"></van-button>
              <div class="shoping">供应商管理</div>
            </van-col>
            <van-col span="6">
              <van-button icon="point-gift-o"
                          type="primary"
                          color="gold"></van-button>
              <div class="shoping">入库</div>
            </van-col>
            <van-col span="6">
              <van-button icon="point-gift-o"
                          type="primary"
                          color="gold"></van-button>
              <div class="shoping">库存清单</div>
            </van-col>
            <van-col span="6">
              <van-button icon="point-gift-o"
                          type="primary"
                          color="gold"></van-button>
              <div class="shoping">产品管理</div>
            </van-col>
            <van-col span="6">
              <van-button icon="point-gift-o"
                          type="primary"
                          color="gold"></van-button>
              <div class="shoping">出库管理</div>
            </van-col>
          </van-row>
        </van-tab>
        <van-tab title="资产管理">
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
          <van-row>
            <van-col span="6">
              <van-button icon="point-gift-o"
                          type="primary"
                          color="gold"
                          @click.prevent="AssetsInformation"></van-button>
              <div class="shoping">资产信息表</div>
            </van-col>
            <van-col span="6">
              <van-button icon="point-gift-o"
                          type="primary"
                          color="gold"
                          @click.prevent="AssetMaintenance"></van-button>
              <div class="shoping">资产维修</div>
            </van-col>
          </van-row>
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>
<script>
export default {
    data () {
        return {
            active: 0
        }
    },
    mounted () {

    },
    methods: {
        pushHome () {
            this.$router.push('/home')
        },
        onClickRight () {

        },
        BudgetAdmin () {
            this.$router.push('/BudgetAdmin')
        },
        Recipes () {
            this.$router.push('/Recipes')
        },
        FoodSafety () {
            this.$router.push('/FoodSafety')
        },
        AssetsInformation () {
            this.$router.push('/AssetsInformation')
        },
        AssetMaintenance () {
            this.$router.push('/AssetMaintenance')
        },
        TablewareDisinfection () {
            this.$router.push('/TablewareDisinfection')
        }
    }
}
</script>
<style lang="less" scoped>
.Root-body {
  width: 100%;

  .van-nav-bar {
    background: #009aff;

    .van-nav-bar__text {
      color: white;
    }
    .van-icon {
      color: white;
      font-size: 40px;
      font-weight: 700;
    }
    .van-nav-bar__title {
      color: white;
      font-size: 35px;
      font-weight: 550;
    }
  }
  .van-tabs {
    margin-top: 100px;

    .van-button {
      margin-left: 40px;
      margin-top: 30px;
      border-radius: 15px;
      font-size: 42px;
    }
  }
  .shoping {
    width: 100%;
    height: 35px;
    line-height: 35px;
    text-align: center;
    font-size: 0.4rem;
    color: black;
  }
  .carousel-3d-slide {
    border-radius: 25px;
    img {
      height: 100%;
    }
  }
}
</style>

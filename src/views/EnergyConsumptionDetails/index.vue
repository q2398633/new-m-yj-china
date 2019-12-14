<template>
  <div class="parentAdmin">
    <!-- NavBar 顶部导航 -->
    <van-nav-bar title="能耗详情"
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
    <!-- 搜索 -->
    <van-popup v-model="show"
               position="bottom"
               :style="{width: '100%', background: '#524c4c' }"
               close-icon="close">
      <van-cell-group>
        <div style="font-size: 30px; width: 96.2%; height: 53px; line-height: 53px; color: white; font-family: '楷体'; background: #0199ff; padding-left:15px;">搜索能耗详情</div>
        <van-field label="名称:"
                   label-width="70px"
                   autosize
                   placeholder="请输入名称" />
        <van-field label="预算数量:"
                   label-width="70px"
                   autosize
                   placeholder="请输入预算数量" />
        <van-field label="使用数量:"
                   label-width="70px"
                   autosize
                   placeholder="请输入使用数量" />
        <van-field label="预算金额:"
                   label-width="70px"
                   autosize
                   placeholder="请输入预算金额" />
        <van-field label="使用金额:"
                   label-width="70px"
                   autosize
                   placeholder="请输入使用金额" />
        <van-field label="数量差额:"
                   label-width="70px"
                   autosize
                   placeholder="请输入数量差额" />
        <van-field label="费用差额:"
                   label-width="70px"
                   autosize
                   placeholder="请输入费用差额" />
        <van-field label="单位:"
                   label-width="70px"
                   autosize
                   placeholder="请输入单位" />
        <van-field label="单价:"
                   label-width="70px"
                   autosize
                   placeholder="请输入单价" />
        <van-field label="月份:"
                   label-width="70px"
                   autosize
                   placeholder="请输入月份" />
        <van-field label="是否结算:"
                   label-width="70px"
                   autosize
                   placeholder="请输入预算金额" />
      </van-cell-group>
      <div class="submit">
        <van-button type="info"
                    @click.prevent="close"
                    class="ClosePop">退出</van-button>
        <van-button type="primary"
                    @click.prevent="SearchClass"
                    class="AddClass">搜索</van-button>
      </div>
    </van-popup>
    <!-- 区域能耗详情 -->
    <div class="Parent-List">
      <van-pull-refresh v-model="isLoading"
                        @refresh="onRefresh">
        <van-list v-model="loading"
                  :finished="finished"
                  finished-text="没有更多了"
                  @load="onLoad">
          <van-cell v-for="(item) in list"
                    :key="item.Id">
            <van-swipe-cell style="border: 2px solid #ccc;">
              <div class="head">
                <img src="../../assets/NH.jpg"
                     alt="">
                <h1>{{ item.XiaoDuQuYu }}</h1>
              </div>
              <van-cell :border="false"
                        title="名称:"
                        style="padding-left:30px; padding-right: 30px;">
                {{ item.Title }}
              </van-cell>
              <van-cell :border="false"
                        title="预算数量:"
                        style="padding-left:30px; padding-right: 30px;">
                {{ item.YuSuanShuLiang }} {{ item.JiLiangDanWei }}
              </van-cell>
              <van-cell :border="false"
                        title="使用数量:"
                        style="padding-left:30px; padding-right: 30px;">
                {{ item.ShiYongShuLiang }} {{ item.JiLiangDanWei }}
              </van-cell>
              <van-cell :border="false"
                        title="预算金额:"
                        style="padding-left:30px; padding-right: 30px;">
                {{ item.YuSuanShuLiang * item.DanJia}} ¥
              </van-cell>
              <van-cell :border="false"
                        title="使用金额:"
                        style="padding-left:30px; padding-right: 30px;">
                {{ item.ShiYongShuLiang * item.DanJia}} ¥
              </van-cell>
              <van-cell :border="false"
                        title="数量差额:"
                        style="padding-left:30px; padding-right: 30px;">
                {{ item.YuSuanShuLiang - item.ShiYongShuLiang }} {{ item.JiLiangDanWei }}
              </van-cell>
              <van-cell :border="false"
                        title="费用差额:"
                        style="padding-left:30px; padding-right: 30px;">
                {{ item.YuSuanShuLiang * item.DanJia - item.ShiYongShuLiang * item.DanJia }} ¥
              </van-cell>
              <van-cell :border="false"
                        title="单位:"
                        style="padding-left:30px; padding-right: 30px;">
                {{ item.JiLiangDanWei }}
              </van-cell>
              <van-cell :border="false"
                        title="单价:"
                        style="padding-left:30px; padding-right: 30px;">
                {{ item.DanJia }}¥
              </van-cell>
              <van-cell :border="false"
                        title="月份:"
                        style="padding-left:30px; padding-right: 30px;">
                {{ item.Date }}
              </van-cell>
              <van-cell :border="false"
                        title="是否结算:"
                        style="padding-left:30px; padding-right: 30px;">
                {{ item.IsJieSuan }}
              </van-cell>
              <template slot="right">
                <van-button square
                            type="danger"
                            text="删除"
                            @click.prevent="DelList(item)" />
                <van-button square
                            type="primary"
                            text="结算"
                            @click.prevent="Modify(item)" />
              </template>
            </van-swipe-cell>
          </van-cell>
        </van-list>
        <van-button type="info"
                    style="margin-bottom: 50px; width: 100%"
                    @click.prevent="AddList">添加能耗详情</van-button>
        <!-- 添加能耗详情 -->
        <van-popup v-model="AddListshow"
                   style="width: 80%;">
          <form action="/"
                method="POST"
                ref="AddListForm"
                :model="AddListForm">
            <van-cell-group>
              <div>
                <span class="ListSpan">日期:</span>
                <van-field v-model="AddListForm.Date"
                           placeholder="请输入日期"
                           style="display:inline-block;" />
              </div>
              <div>
                <span class="ListSpan">名称:</span>
                <van-field v-model="AddListForm.Title"
                           placeholder="请输入名称"
                           style="display:inline-block;" />
              </div>
              <div>
                <span class="ListSpan">单位:</span>
                <van-field v-model="AddListForm.JiLiangDanWei"
                           placeholder="请输入单位"
                           style="display:inline-block;" />
              </div>
              <div>
                <span class="ListSpan">单价:</span>
                <van-field v-model="AddListForm.DanJia"
                           placeholder="请输入单价"
                           style="display:inline-block;" />
              </div>
              <div>
                <span class="ListSpan">预算:</span>
                <van-field v-model="AddListForm.YuSuanShuLiang"
                           placeholder="请输入预算"
                           style="display:inline-block;" />
              </div>
              <div style="margin-top: 40px; margin-bottom: 30px; padding-left:0px; padding-right: 0px;">
                <van-button type="info"
                            @click.prevent="ClosePop"
                            class="ClosePop">取消</van-button>
                <van-button type="primary"
                            @click.prevent="AddClass"
                            class="AddClass">添加</van-button>
              </div>
            </van-cell-group>

          </form>
        </van-popup>
        <!-- 结算能耗详情-->
        <van-popup v-model="ModifyListshow"
                   style="width: 80%;">
          <form action="/"
                method="POST"
                ref="AddListForm"
                :model="dqList">
            <van-cell-group>
              <div>
                <span class="ListSpan">日期:</span>
                <van-field v-model="dqList.Date"
                           placeholder="请输入日期"
                           style="display:inline-block;" />
              </div>
              <div>
                <span class="ListSpan">名称:</span>
                <van-field v-model="dqList.Title"
                           placeholder="请输入名称"
                           style="display:inline-block;" />
              </div>
              <div>
                <span class="ListSpan">单位:</span>
                <van-field v-model="dqList.JiLiangDanWei"
                           placeholder="请输入单位"
                           style="display:inline-block;" />
              </div>
              <div>
                <span class="ListSpan">单价:</span>
                <van-field v-model="dqList.DanJia"
                           placeholder="请输入单价"
                           style="display:inline-block;" />
              </div>
              <div>
                <span class="ListSpan">预算:</span>
                <van-field v-model="dqList.YuSuanShuLiang"
                           placeholder="请输入使用"
                           style="display:inline-block;" />
              </div>
              <div>
                <span class="ListSpan">使用:</span>
                <van-field v-model="dqList.ShiYongShuLiang"
                           placeholder="请输入预算"
                           style="display:inline-block;" />
              </div>
              <div>
                <span class="ListSpan">银行账户:</span>
                <van-field v-model="dqList.YinHangZhangHuIdName"
                           placeholder="请输入银行账户"
                           style="display:inline-block;" />
              </div>
              <div style="margin-top: 40px; margin-bottom: 30px; padding-left:0px; padding-right: 0px;">
                <van-button type="info"
                            @click.prevent="CloseModify"
                            class="ClosePop">取消</van-button>
                <van-button type="primary"
                            @click.prevent="ModifyList"
                            class="AddClass">结算</van-button>
              </div>
            </van-cell-group>

          </form>
        </van-popup>
      </van-pull-refresh>

      <!-- 分页 -->
      <van-pagination v-model="currentPage"
                      :total-items="1"
                      :show-page-size="3"
                      force-ellipses
                      style="position:fixed; bottom: 0; width: 100%; background: white;" />

    </div>

  </div>
</template>

<script>
import { EnergyConsumptionDetails } from '@/api/EnergyConsumptionDetails'
import { DelectList11 } from '@/api/Delect'
import { AddList11 } from '@/api/AddList'
import { ModifyList11 } from '@/api/ModifyList'
export default {
  name: 'StaffAdmin',
  data () {
    return {
      AddListForm: {
        Date: '',
        Title: '',
        NengHaoXiangMuId: '',
        JiLiangDanWei: '',
        DanJia: 0,
        YuSuanShuLiang: 0,
        Id: ''
      },
      ModifyListForm: {
        Date: '',
        Title: '',
        JiLiangDanWei: '',
        DanJia: 0,
        YuSuanShuLiang: 0,
        ShiYongShuLiang: 0,
        YinHangZhangHuIdName: '',
        Id: ''
      },
      show: false,
      isLoading: false,
      loading: false,
      finished: false,
      list: [],
      currentPage: null,
      isShowDel: false,
      currentList: null,
      AddListshow: false,
      ModifyListshow: false,
      checked: true,
      dqList: [],
      Total: 0
    }
  },
  mounted () {

  },
  created () {
    // 页面一进入加载能耗详情列表
    this.loadEnergyConsumptionDetailsList()
  },
  methods: {
    back () {
      this.$router.go(-1)
    },
    SideMenu () {
      this.show = true
    },
    ClosePop () {
      this.AddListshow = false
      this.$toast.fail('已取消添加')
    },
    CloseModify () {
      this.ModifyListshow = false
      this.$toast.fail('已取消结算')
    },
    close () {
      this.show = false
      this.$toast.fail('已取消搜索')
    },
    onRefresh () {
      setTimeout(() => {
        this.$toast('刷新成功')
        this.isLoading = false
      }, 500)
    },
    async loadEnergyConsumptionDetailsList () {
      let channels = []
      const data = await EnergyConsumptionDetails()
      this.Total = data.length
      console.log(this.Total)
      this.channels = data
      channels = this.channels
      return channels
    },
    async onLoad () {
      const data = await this.loadEnergyConsumptionDetailsList()
      this.list = data
      this.load = false
    },
    async DelList (currentList) {
      this.isShowDel = true
      this.currentList = currentList
      this.$dialog.confirm({
        title: '确认删除吗?',
        message: '删除当前列表数据'
      }).then(async () => {
        const listId11 = this.currentList.Id
        const data = await DelectList11(listId11)
        console.log('确认删除了' + data)
        window.location.reload()
        this.$toast.success('删除成功')
      }).catch(() => {
        console.log('取消删除了')
        this.$toast.fail('删除失败')
      })
    },
    AddList () {
      this.AddListshow = true
    },
    async AddClass () {
      const data = await AddList11(this.AddListForm)
      console.log(data)
      this.AddListshow = false
      this.$toast.success('添加成功')
    },
    Modify (currentList) {
      this.ModifyListshow = true
      this.dqList = currentList
    },
    async ModifyList () {
      const data = await ModifyList11(this.dqList)
      const msg = data.msg
      console.log(data.msg)
      this.ModifyListshow = false
      this.$toast.success(msg)
      window.location.reload()
    },
    SearchClass () {
      this.$toast.success('已完成搜索')
      this.show = false
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
  .submit {
    width: 100%;
    height: 140px;
    background: white;
  }

  .van-list {
    margin-top: 130px;
  }
  .van-popup {
    width: 100%;
    .van-cell-group {
      width: 100%;

      .van-field {
        width: 40%;
        padding: 0 0 0 30px;
        margin-left: 20px;
      }
    }
  }
  .van-cell {
    width: 100%;
    margin-top: 20px;
    border-bottom: 1px solid #ccc;
    padding-left: 250px;
    span {
      display: inline-block;
      width: 100%;
      height: 55px;
      line-height: 55px;
      font-size: 30px;
      font-family: "楷体";
      font-weight: 700;
    }
  }
  .van-cell {
    padding: 0;
  }
  .van-swipe-cell__right {
    .van-button {
      margin-top: 50%;
    }
  }
  .ClosePop {
    float: left;
    width: 50%;
  }
  .AddClass {
    float: right;
    width: 50%;
  }
  .head {
    img {
      width: 200px;
      margin-left: 45px;
      margin-top: 20px;
    }
    h1 {
      display: inline-block;
      height: 40px;
      color: black;
      font-size: 0.5rem;
      font-weight: 700;
      font-family: "楷体";
      margin-left: 45px;
      margin-top: 0;
      margin-bottom: 0;
    }
  }
  .ListSpan {
    font-size: 0.39rem;
    color: black;
    margin-left: 47px;
    margin-right: 10px;
    font-weight: 700;
    font-family: "楷体";
  }
}
</style>

<template>
  <div class="parentAdmin">
    <!-- NavBar 顶部导航 -->
    <van-nav-bar title="区域消毒"
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
        <div style="font-size: 30px; width: 96.2%; height: 53px; line-height: 53px; color: white; font-family: '楷体'; background: #0199ff; padding-left:15px;">搜索区域消毒</div>
        <van-field label="负责人:"
                   label-width="70px"
                   autosize
                   placeholder="请输入负责人" />
        <van-field label="操作员:"
                   label-width="70px"
                   autosize
                   placeholder="请输入操作员" />
        <van-field label="消毒方法:"
                   label-width="70px"
                   autosize
                   placeholder="请输入消毒方法" />
        <van-field label="消毒日期:"
                   label-width="70px"
                   autosize
                   placeholder="请输入消毒日期" />
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
    <!-- 区域消毒列表 -->
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
                <img src="../../assets/XD.jpg"
                     alt="">
                <h1>{{ item.XiaoDuQuYu }}</h1>
              </div>
              <van-cell :border="false"
                        title="负责人:"
                        style="padding-left:30px; padding-right: 30px;">
                {{ item.FuZeRen }}
              </van-cell>
              <van-cell :border="false"
                        title="操作员:"
                        style="padding-left:30px; padding-right: 30px;">
                {{ item.CaoZuoYuan1 }}
              </van-cell>
              <van-cell :border="false"
                        title="消毒方法:"
                        style="padding-left:30px; padding-right: 30px;">
                {{ item.XiaoDuFangFa }}
              </van-cell>
              <van-cell :border="false"
                        title="消毒日期:"
                        style="padding-left:30px; padding-right: 30px;">
                {{ item.Date  | dateFmt('YYYY-MM-DD') }}
              </van-cell>
              <template slot="right">
                <van-button square
                            type="danger"
                            text="删除"
                            @click.prevent="DelList(item)" />
                <van-button square
                            type="primary"
                            text="修改"
                            @click.prevent="Modify(item)" />
              </template>
            </van-swipe-cell>
          </van-cell>
        </van-list>
        <van-button type="info"
                    style="margin-bottom: 50px; width: 100%"
                    @click.prevent="AddList">添加区域消毒</van-button>
        <!-- 添加区域消毒 -->
        <van-popup v-model="AddListshow"
                   style="width: 80%;">
          <form action="/"
                method="POST"
                ref="AddListForm"
                :model="AddListForm">
            <van-cell-group>
              <div>
                <span style="font-size: .39rem; color: black; margin-left: 47px; margin-right: 10px; font-weight: 700; font-family: '楷体';">消毒区域:</span>
                <van-field v-model="AddListForm.XiaoDuQuYu"
                           placeholder="请输入消毒区域"
                           style="display:inline-block;" />
              </div>
              <div>
                <span style="font-size: .39rem; color: black; margin-left: 47px; margin-right: 10px; font-weight: 700; font-family: '楷体';">负责人:</span>
                <van-field v-model="AddListForm.FuZeRen"
                           placeholder="请输入负责人"
                           style="display:inline-block;" />
              </div>
              <div>
                <span style="font-size: .39rem; color: black; margin-left: 47px; margin-right: 10px; font-weight: 700; font-family: '楷体';">操作员:</span>
                <van-field v-model="AddListForm.CaoZuoYuan1"
                           placeholder="请输入操作员"
                           style="display:inline-block;" />
              </div>
              <div>
                <span style="font-size: .39rem; color: black; margin-left: 47px; margin-right: 10px; font-weight: 700; font-family: '楷体';">消毒方法:</span>
                <van-field v-model="AddListForm.XiaoDuFangFa"
                           placeholder="请输入消毒方法"
                           style="display:inline-block;" />
              </div>
              <div>
                <span style="font-size: .39rem; color: black; margin-left: 47px; margin-right: 10px; font-weight: 700; font-family: '楷体';">消毒日期:</span>
                <van-field v-model="AddListForm.Date"
                           placeholder="请输入消毒日期"
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
        <!-- 修改区域消毒-->
        <van-popup v-model="ModifyListshow"
                   style="width: 80%;">
          <form action="/"
                method="POST"
                ref="AddListForm"
                :model="dqList">
            <van-cell-group>
              <div>
                <span style="font-size: .39rem; color: black; margin-left: 47px; margin-right: 10px; font-weight: 700; font-family: '楷体';">消毒区域:</span>
                <van-field v-model="dqList.XiaoDuQuYu"
                           placeholder="请输入消毒区域"
                           style="display:inline-block;" />
              </div>
              <div>
                <span style="font-size: .39rem; color: black; margin-left: 47px; margin-right: 10px; font-weight: 700; font-family: '楷体';">负责人:</span>
                <van-field v-model="dqList.FuZeRen"
                           placeholder="请输入负责人"
                           style="display:inline-block;" />
              </div>
              <div>
                <span style="font-size: .39rem; color: black; margin-left: 47px; margin-right: 10px; font-weight: 700; font-family: '楷体';">操作员:</span>
                <van-field v-model="dqList.CaoZuoYuan1"
                           placeholder="请输入操作员"
                           style="display:inline-block;" />
              </div>
              <div>
                <span style="font-size: .39rem; color: black; margin-left: 47px; margin-right: 10px; font-weight: 700; font-family: '楷体';">消毒方法:</span>
                <van-field v-model="dqList.XiaoDuFangFa"
                           placeholder="请输入消毒方法"
                           style="display:inline-block;" />
              </div>
              <div>
                <span style="font-size: .39rem; color: black; margin-left: 47px; margin-right: 10px; font-weight: 700; font-family: '楷体';">消毒日期:</span>
                <van-field v-model="dqList.Date"
                           placeholder="请输入消毒日期"
                           style="display:inline-block;" />
              </div>
              <div style="margin-top: 40px; margin-bottom: 30px; padding-left:0px; padding-right: 0px;">
                <van-button type="info"
                            @click.prevent="CloseModify"
                            class="ClosePop">取消</van-button>
                <van-button type="primary"
                            @click.prevent="ModifyList"
                            class="AddClass">修改</van-button>
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
import { RegionalDisinfection } from '@/api/RegionalDisinfection'
import { DelectList10 } from '@/api/Delect'
import { AddList10 } from '@/api/AddList'
import { ModifyList10 } from '@/api/ModifyList'
export default {
  name: 'StaffAdmin',
  data () {
    return {
      AddListForm: {
        XiaoDuQuYu: '',
        FuZeRen: '',
        CaoZuoYuan1: '',
        XiaoDuFangFa: '',
        Date: '',
        Id: ''
      },
      ModifyListForm: {
        XiaoDuQuYu: '',
        FuZeRen: '',
        CaoZuoYuan1: '',
        XiaoDuFangFa: '',
        Date: '',
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
    // 页面一进入加载区域消毒列表
    this.loadRegionalDisinfectionList()
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
      this.$toast.fail('已取消修改')
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
    async loadRegionalDisinfectionList () {
      let channels = []
      const data = await RegionalDisinfection()
      this.Total = data.length
      console.log(this.Total)
      this.channels = data
      channels = this.channels
      return channels
    },
    async onLoad () {
      const data = await this.loadRegionalDisinfectionList()
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
        const listId10 = this.currentList.Id
        const data = await DelectList10(listId10)
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
      const data = await AddList10(this.AddListForm)
      console.log(data)
      this.AddListshow = false
      window.location.reload()
      this.$toast.success('添加成功')
    },
    Modify (currentList) {
      this.ModifyListshow = true
      this.dqList = currentList
    },
    async ModifyList () {
      const data = await ModifyList10(this.dqList)
      console.log(data)
      this.ModifyListshow = false
      this.$toast.success('修改成功')
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
}
</style>

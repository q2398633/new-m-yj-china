<template>
  <div>
    <div class="parentAdmin">
      <!-- 顶部导航 -->
      <van-nav-bar title="交接班登记"
                   left-text="返回"
                   left-arrow
                   @click-left.prevent="back"
                   fixed:
                   true
                   style="position: fixed; width: 100%;">
        <van-icon name="search"
                  slot="right"
                  size="25px"
                  @click.prevent="SideMenu" />
      </van-nav-bar>
      <!-- 搜索登记 -->
      <van-popup v-model="show"
                 position="bottom"
                 :style="{width: '100%'}"
                 close-icon="close">
        <van-cell-group>
          <div style="font-size: 30px; width: 96.2%; height: 53px; line-height: 53px; color: white; font-family: '楷体'; background: #0199ff; padding-left:15px;">搜索交接班登记</div>
          <van-field label="班级:"
                     label-width="70px"
                     autosize
                     name="G_BanJiIdName_Like"
                     prop="G_BanJiIdName_Like"
                     v-model="Search.G_BanJiIdName_Like"
                     placeholder="请输入班级名称" />
        </van-cell-group>
        <div class="submit">
          <van-button type="info"
                      class="ClosePop"
                      @click.prevent="close">退出</van-button>
          <van-button type="primary"
                      class="AddClass"
                      @click.prevent="SearchSearchShiftHandoverRegistration">搜索</van-button>
        </div>
      </van-popup>
      <!-- 交接班登记表 -->
      <div class="Parent-List">
        <van-pull-refresh v-model="isLoading"
                          @refresh="onRefresh">
          <van-list v-model="loading"
                    :finished="finished"
                    finished-text="没有更多了"
                    @load="onLoad">
            <van-cell v-for="(item) in list"
                      :key="item.Id">
              <van-swipe-cell style="border: 7px solid rgb(231, 231, 231);">
                <div class="head">
                  <img src="../../assets/JC.jpg"
                       alt="">
                  <h1 style="height: 1rem;color: black; font-size: .5rem;line-height: 1rem;font-weight: 700; font-family: '楷体'; margin-left: 45px;">上午班老师: {{ item.ShangWuLaoShi }}</h1>
                </div>
                <van-cell :border="false"
                          title="班级:"
                          style="padding-left:30px; padding-right: 30px;">
                  {{ item.BanJiIdName }}
                </van-cell>
                <van-cell :border="false"
                          title="应到人数:"
                          style="padding-left:30px; padding-right: 30px;">
                  {{ item.YingDaoRenShu }}
                </van-cell>
                <van-cell :border="false"
                          title="实到人数:"
                          style="padding-left:30px; padding-right: 30px;">
                  {{ item.ShiDaoRenShu }}
                </van-cell>
                <van-cell :border="false"
                          title="下午班老师:"
                          style="padding-left:30px; padding-right: 30px;">
                  {{ item.XiaWuBanLaoShi }}
                </van-cell>
                <van-cell :border="false"
                          title="接班人数:"
                          style="padding-left:30px; padding-right: 30px;">
                  {{ item.JieBanRenShu}}
                </van-cell>
                <van-cell :border="false"
                          title="出园人数:"
                          style="padding-left:30px; padding-right: 30px;">
                  {{ item.ChuYuanRenShu }}
                </van-cell>
                <van-cell :border="false"
                          title="上午事项:"
                          style="padding-left:30px; padding-right: 30px;">
                  {{ item.ShangWuShiXiang }}
                </van-cell>
                <van-cell :border="false"
                          title="下午事项:"
                          style="padding-left:30px; padding-right: 30px;">
                  {{ item.XiaWuShiXiang }}
                </van-cell>
                <van-cell :border="false"
                          title="夜班情况:"
                          style="padding-left:30px; padding-right: 30px;">
                  {{ item.YeBanQingKuang }}
                </van-cell>
                <van-cell :border="false"
                          title="日期:"
                          style="padding-left:30px; padding-right: 30px;">
                  {{ item.Date }}
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
          <!-- 添加交接班登记信息表 -->
          <van-popup v-model="AddListshow"
                     style="width: 80%;">
            <form action="/"
                  method="POST"
                  ref="AddListForm"
                  :model="AddListForm">
              <van-cell-group>
                <div>
                  <span style="font-size: .39rem; color: black; margin-left: .5rem; margin-right: 10px; font-weight: 700; font-family: '楷体';">班级名称:</span>
                  <van-field v-model="AddListForm.BanJiIdName"
                             placeholder="请输入班级名称"
                             style="display:inline-block; width: 55%;" />
                </div>
                <div>
                  <span style="font-size: .39rem; color: black; margin-left: .5rem; margin-right: 10px; font-weight: 700; font-family: '楷体';">班级(ID):</span>
                  <van-field v-model="AddListForm.BanJiId"
                             placeholder="请输入班级ID"
                             style="display:inline-block; width: 55%;" />
                </div>
                <div>
                  <span style="font-size: .39rem; color: black; margin-left: .5rem; margin-right: 10px; font-weight: 700; font-family: '楷体';">日期:</span>
                  <van-field v-model="AddListForm.Date"
                             placeholder="请输入日期"
                             style="display:inline-block; width: 55%;" />
                </div>
                <div>
                  <span style="font-size: .39rem; color: black; margin-left: .5rem; margin-right: 10px; font-weight: 700; font-family: '楷体';">上午班老师:</span>
                  <van-field v-model="AddListForm.ShangWuLaoShi"
                             placeholder="请输入上午班老师姓名"
                             style="display:inline-block; width: 55%;" />
                </div>
                <div>
                  <span style="font-size: .39rem; color: black; margin-left: .5rem; margin-right: 10px; font-weight: 700; font-family: '楷体';">应到人数:</span>
                  <van-field v-model="AddListForm.YingDaoRenShu"
                             placeholder="请输入应到人数"
                             style="display:inline-block; width: 55%;" />
                </div>
                <div>
                  <span style="font-size: .39rem; color: black; margin-left: .5rem; margin-right: 10px; font-weight: 700; font-family: '楷体';">实到人数:</span>
                  <van-field v-model="AddListForm.ShiDaoRenShu"
                             placeholder="请输入实到人数"
                             style="display:inline-block; width: 55%;" />
                </div>
                <div>
                  <span style="font-size: .39rem; color: black; margin-left: .5rem; margin-right: 10px; font-weight: 700; font-family: '楷体';">下午班老师:</span>
                  <van-field v-model="AddListForm.XiaWuBanLaoShi"
                             placeholder="请输入下午班老师"
                             style="display:inline-block; width: 55%;" />
                </div>
                <div>
                  <span style="font-size: .39rem; color: black; margin-left: .5rem; margin-right: 10px; font-weight: 700; font-family: '楷体';">接班人数:</span>
                  <van-field v-model="AddListForm.JieBanRenShu"
                             placeholder="请输入接班人数"
                             style="display:inline-block; width: 55%;" />
                </div>
                <div>
                  <span style="font-size: .39rem; color: black; margin-left: .5rem; margin-right: 10px; font-weight: 700; font-family: '楷体';">出园人数:</span>
                  <van-field v-model="AddListForm.ChuYuanRenShu"
                             placeholder="请输入出园人数"
                             style="display:inline-block; width: 55%;" />
                </div>
                <div>
                  <span style="font-size: .39rem; color: black; margin-left: .5rem; margin-right: 10px; font-weight: 700; font-family: '楷体';">上午事项:</span>
                  <van-field v-model="AddListForm.ShangWuShiXiang"
                             placeholder="请输入上午事项"
                             style="display:inline-block; width: 55%;" />
                </div>
                <div>
                  <span style="font-size: .39rem; color: black; margin-left: .5rem; margin-right: 10px; font-weight: 700; font-family: '楷体';">下午事项:</span>
                  <van-field v-model="AddListForm.XiaWuShiXiang"
                             placeholder="请输入下午事项"
                             style="display:inline-block; width: 55%;" />
                </div>
                <div>
                  <span style="font-size: .39rem; color: black; margin-left: .5rem; margin-right: 10px; font-weight: 700; font-family: '楷体';">夜班情况:</span>
                  <van-field v-model="AddListForm.YeBanQingKuang"
                             placeholder="请输入夜班情况"
                             style="display:inline-block; width: 55%;" />
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
          <!-- 修改交接班登记信息表 -->
          <van-popup v-model="ModifyListshow"
                     style="width: 80%;">
            <form action="/"
                  method="POST"
                  ref="ModifyListForm"
                  :model="dqList">
              <van-cell-group>
                <div>
                  <span style="font-size: .39rem; color: black; margin-left: .5rem; margin-right: 10px; font-weight: 700; font-family: '楷体';">班级名称:</span>
                  <van-field v-model="dqList.BanJiIdName"
                             placeholder="请输入班级名称"
                             style="display:inline-block; width: 55%;" />
                </div>
                <div>
                  <span style="font-size: .39rem; color: black; margin-left: .5rem; margin-right: 10px; font-weight: 700; font-family: '楷体';">班级(ID):</span>
                  <van-field v-model="dqList.BanJiId"
                             placeholder="请输入班级ID"
                             style="display:inline-block; width: 55%;" />
                </div>
                <div>
                  <span style="font-size: .39rem; color: black; margin-left: .5rem; margin-right: 10px; font-weight: 700; font-family: '楷体';">日期:</span>
                  <van-field v-model="dqList.Date"
                             placeholder="请输入日期"
                             style="display:inline-block; width: 55%;" />
                </div>
                <div>
                  <span style="font-size: .39rem; color: black; margin-left: .5rem; margin-right: 10px; font-weight: 700; font-family: '楷体';">上午班老师:</span>
                  <van-field v-model="dqList.ShangWuLaoShi"
                             placeholder="请输入上午班老师姓名"
                             style="display:inline-block; width: 55%;" />
                </div>
                <div>
                  <span style="font-size: .39rem; color: black; margin-left: .5rem; margin-right: 10px; font-weight: 700; font-family: '楷体';">应到人数:</span>
                  <van-field v-model="dqList.YingDaoRenShu"
                             placeholder="请输入应到人数"
                             style="display:inline-block; width: 55%;" />
                </div>
                <div>
                  <span style="font-size: .39rem; color: black; margin-left: .5rem; margin-right: 10px; font-weight: 700; font-family: '楷体';">实到人数:</span>
                  <van-field v-model="dqList.ShiDaoRenShu"
                             placeholder="请输入实到人数"
                             style="display:inline-block; width: 55%;" />
                </div>
                <div>
                  <span style="font-size: .39rem; color: black; margin-left: .5rem; margin-right: 10px; font-weight: 700; font-family: '楷体';">下午班老师:</span>
                  <van-field v-model="dqList.XiaWuBanLaoShi"
                             placeholder="请输入下午班老师"
                             style="display:inline-block; width: 55%;" />
                </div>
                <div>
                  <span style="font-size: .39rem; color: black; margin-left: .5rem; margin-right: 10px; font-weight: 700; font-family: '楷体';">接班人数:</span>
                  <van-field v-model="dqList.JieBanRenShu"
                             placeholder="请输入接班人数"
                             style="display:inline-block; width: 55%;" />
                </div>
                <div>
                  <span style="font-size: .39rem; color: black; margin-left: .5rem; margin-right: 10px; font-weight: 700; font-family: '楷体';">出园人数:</span>
                  <van-field v-model="dqList.ChuYuanRenShu"
                             placeholder="请输入出园人数"
                             style="display:inline-block; width: 55%;" />
                </div>
                <div>
                  <span style="font-size: .39rem; color: black; margin-left: .5rem; margin-right: 10px; font-weight: 700; font-family: '楷体';">上午事项:</span>
                  <van-field v-model="dqList.ShangWuShiXiang"
                             placeholder="请输入上午事项"
                             style="display:inline-block; width: 55%;" />
                </div>
                <div>
                  <span style="font-size: .39rem; color: black; margin-left: .5rem; margin-right: 10px; font-weight: 700; font-family: '楷体';">下午事项:</span>
                  <van-field v-model="dqList.XiaWuShiXiang"
                             placeholder="请输入下午事项"
                             style="display:inline-block; width: 55%;" />
                </div>
                <div>
                  <span style="font-size: .39rem; color: black; margin-left: .5rem; margin-right: 10px; font-weight: 700; font-family: '楷体';">夜班情况:</span>
                  <van-field v-model="dqList.YeBanQingKuang"
                             placeholder="请输入夜班情况"
                             style="display:inline-block; width: 55%;" />
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
      <van-button type="info"
                  style="margin-bottom: 0.1rem; width: 100%; border-radius: 20px;"
                  @click.prevent="AddList">添加交接班登记</van-button>

    </div>
  </div>
</template>
<script>
import { ShiftHandoverRegistration } from '@/api/ShiftHandoverRegistration'
import { DelectList20 } from '@/api/Delect'
import { AddList21 } from '@/api/AddList'
import { ModifyList21 } from '@/api/ModifyList'
import { SearchShiftHandoverRegistration } from '@/api/Search'
export default {
  data () {
    return {
      active: 0,
      Search: {
        G_BanJiIdName_Like: ''
      },
      AddListForm: {
        BanJiIdName: '',
        BanJiId: '',
        Date: '',
        ShangWuLaoShi: '',
        YingDaoRenShu: '',
        ShiDaoRenShu: '',
        XiaWuBanLaoShi: '',
        JieBanRenShu: '',
        ChuYuanRenShu: '',
        ShangWuShiXiang: '',
        XiaWuShiXiang: '',
        YeBanQingKuang: '',
        Id: ''
      },
      ModifyListForm: {
        BanJiIdName: '',
        BanJiId: '',
        Date: '',
        ShangWuLaoShi: '',
        YingDaoRenShu: '',
        ShiDaoRenShu: '',
        XiaWuBanLaoShi: '',
        JieBanRenShu: '',
        ChuYuanRenShu: '',
        ShangWuShiXiang: '',
        XiaWuShiXiang: '',
        YeBanQingKuang: '',
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
      ModifyList2: [],
      Total: 0
    }
  },
  mounted () {

  },
  created () {
    // 页面一进入加载交接班登记表
    this.loadShiftHandoverRegistrationList()
  },
  methods: {
    back () {
      this.$router.go(-1)
    },
    pushHome () {
      this.$router.push('/home')
    },
    onClickRight () {

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
    },
    onRefresh () {
      setTimeout(() => {
        this.$toast('刷新成功')
        this.isLoading = false
        this.finished = true
      }, 500)
    },
    // 晨午晚检
    async loadShiftHandoverRegistrationList () {
      let channels = []
      const data = await ShiftHandoverRegistration()
      this.Total = data.length
      console.log(this.Total)
      this.channels = data
      channels = this.channels
      return channels
    },
    async onLoad () {
      const data = await this.loadShiftHandoverRegistrationList()
      this.list = data
      this.isLoading = false
      this.loading = false
      this.finished = true
    },
    async DelList (currentList) {
      this.isShowDel = true
      this.currentList = currentList
      this.$dialog.confirm({
        title: '确认删除吗?',
        message: '删除当前列表数据'
      }).then(async () => {
        const listId20 = this.currentList.Id
        const data = await DelectList20(listId20)
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
      const data = await AddList21(this.AddListForm)
      console.log(data)
      this.AddListshow = false
      this.$toast.success('添加成功')
      window.location.reload()
    },
    Modify (currentList) {
      this.ModifyListshow = true
      this.finished = false
      this.dqList = currentList
    },
    async ModifyList () {
      const data = await ModifyList21(this.dqList)
      this.ModifyList2 = data
      this.ModifyListshow = false
      this.$toast.success('修改成功')
      window.location.reload()
    },
    async SearchSearchShiftHandoverRegistration () {
      const data = await SearchShiftHandoverRegistration(this.Search)
      const SearchResult = data
      this.list = SearchResult
      this.show = false
      this.$toast.success('搜索完成')
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
  }
  .submit {
    background: white;
    margin-top: 40px;
    margin-bottom: 30px;
    padding-left: 0px;
    padding-right: 0px;
  }

  .van-list {
    margin-top: 130px;
  }
  .van-popup {
    width: 100%;
    margin-top: 30px;
    .van-cell-group {
      width: 100%;

      .van-field {
        width: 100%;
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
    }
    h1 {
      display: inline-block;
    }
  }
}
</style>

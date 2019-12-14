<template>
  <div class="parentAdmin">
    <!-- NavBar 顶部导航 -->
    <van-nav-bar title="请假管理"
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
               :style="{width: '100%',}"
               close-icon="close">
      <form action="/"
            method="POST"
            ref="Search"
            :model="Search">
        <van-cell-group>
          <div style="font-size: 30px; width: 96.2%; height: 53px; line-height: 53px; color: white; font-family: '楷体'; background: #0199ff; padding-left:15px;">搜索请假信息</div>
          <van-field label="班级:"
                     label-width="110px"
                     autosize
                     v-model="Search.G_UsersIdName_Like"
                     name="G_UsersIdName_Like"
                     prop="G_UsersIdName_Like"
                     placeholder="请输入班级名称" />
          <van-field label="姓名:"
                     label-width="110px"
                     autosize
                     v-model="Search.G_Title_Like"
                     name="G_Title_Like"
                     prop="G_Title_Like"
                     placeholder="请输入姓名" />
        </van-cell-group>
        <div class="submit">
          <van-button type="info"
                      class="ClosePop"
                      @click.prevent="close">退出</van-button>
          <van-button type="primary"
                      class="AddClass"
                      @click.prevent="SearchFoodSafety">搜索</van-button>
        </div>
      </form>
    </van-popup>
    <!-- 请假列表 -->
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
                <img src="../../assets/PX.jpg"
                     alt="">
                <h1 style="height: 1rem;color: black; font-size: .5rem;line-height: 1rem;font-weight: 700; font-family: '楷体'; margin-left: 45px;"> {{ item.UsersIdName }}</h1>
              </div>
              <van-cell :border="false"
                        title="培训名称"
                        style="padding-left:30px; padding-right: 30px;">
                {{ item.Title }}
              </van-cell>
              <van-cell :border="false"
                        title="起始日期"
                        style="padding-left:30px; padding-right: 30px;">
                {{ item.StartDate }}
              </van-cell>
              <van-cell :border="false"
                        title="结束日期"
                        style="padding-left:30px; padding-right: 30px;">
                {{ item.EndDate }}
              </van-cell>
              <van-cell :border="false"
                        title="教师费用"
                        style="padding-left:30px; padding-right: 30px;">
                {{ item.JiaoShiFeiYong }}
              </van-cell>
              <van-cell :border="false"
                        title="园所费用"
                        style="padding-left:30px; padding-right: 30px;">
                {{ item.YuanSuoFeiYong }}
              </van-cell>
              <van-cell :border="false"
                        title="讲师"
                        style="padding-left:30px; padding-right: 30px;">
                {{ item.JiangShi }}
              </van-cell>
              <van-cell :border="false"
                        title="培训内容"
                        style="padding-left:30px; padding-right: 30px;">
                {{ item.NeiRong }}
              </van-cell>
              <van-cell :border="false"
                        title="成果"
                        style="padding-left:30px; padding-right: 30px;">
                {{ item.ChengGuo }}
              </van-cell>
              <template slot="right">
                <van-button square
                            type="danger"
                            text="删除"
                            @click.prevent="DelList(item)" />
              </template>
            </van-swipe-cell>
          </van-cell>
        </van-list>
        <van-button type="info"
                    style="margin-bottom: 1.5rem; width: 100%; border-radius: 20px;"
                    @click.prevent="AddList">添加请假信息</van-button>
      </van-pull-refresh>

      <!-- 分页 -->
      <van-pagination v-model="currentPage"
                      :total-items="1"
                      :show-page-size="3"
                      force-ellipses
                      style="position:fixed; bottom: 0; width: 100%; background: white;" />

    </div>
    <van-popup v-model="DateShow"
               position="bottom"
               :style="{ height: '40%' }">
      <van-datetime-picker v-model="currentDate"
                           type="date"
                           @change="changeFn()"
                           @confirm="confirmFn()"
                           @cancel="cancelFn()" />
    </van-popup>
    <van-popup v-model="DateShow2"
               position="bottom"
               :style="{ height: '40%' }">
      <van-datetime-picker v-model="currentDate2"
                           type="date"
                           @change="changeFn2()"
                           @confirm="confirmFn2()"
                           @cancel="cancelFn2()" />
    </van-popup>
  </div>
</template>

<script>
import { LeaveManagement } from '@/api/LeaveManagement'
import { DelectList36 } from '@/api/Delect'
import { AddList36 } from '@/api/AddList'
import { SearchStaffTraining } from '@/api/Search'
export default {
  name: 'StaffAdmin',
  data () {
    return {
      AddListForm: {
        UsersIdName: '',
        UsersId: '',
        Title: '',
        StartDate: '',
        EndDate: '',
        JiaoShiFeiYong: '',
        YuanSuoFeiYong: '',
        JiangShi: '',
        YinHangZhangHuIdName: '',
        YinHangZhangHuId: '',
        NeiRong: '',
        ChengGuo: '',
        Id: ''
      },
      ModifyListForm: {
        UsersIdName: '',
        UsersId: '',
        Title: '',
        StartDate: '',
        EndDate: '',
        JiaoShiFeiYong: '',
        YuanSuoFeiYong: '',
        JiangShi: '',
        YinHangZhangHuIdName: '',
        YinHangZhangHuId: '',
        NeiRong: '',
        ChengGuo: '',
        Id: ''
      },
      Search: {
        G_UsersIdName_Like: '',
        G_Title_Like: ''
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
      Total: 0,
      DateShow: false,
      currentDate: new Date(),
      DateShow2: false,
      currentDate2: new Date()
    }
  },
  mounted () {

  },
  created () {
    // 页面一进入加载员工培训列表
    this.loadStaffTrainingList()
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
    },
    onRefresh () {
      setTimeout(() => {
        this.$toast('刷新成功')
        this.isLoading = false
      }, 500)
    },
    async loadLeaveManagementList () {
      let channels = []
      const data = await LeaveManagement()
      this.Total = data.length
      console.log(this.Total)
      this.channels = data
      channels = this.channels
      return channels
    },
    async onLoad () {
      const data = await this.loadStaffTrainingList()
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
        const listId36 = this.currentList.Id
        const data = await DelectList36(listId36)
        console.log('确认删除了' + data)
        window.location.reload()
        this.$toast.success(data.msg)
      }).catch(() => {
        console.log('取消删除了')
        this.$toast.fail('删除失败')
      })
    },
    AddList () {
      this.AddListshow = true
    },
    async AddClass () {
      const data = await AddList36(this.AddListForm)
      console.log(data)
      this.AddListshow = false
      this.$toast.success(data.msg)
      window.location.reload()
    },
    async SearchFoodSafety () {
      const data = await SearchStaffTraining(this.Search)
      const SearchResult = data
      this.list = SearchResult
      this.show = false
      this.$toast.success('搜索完成')
    },
    NowDate () {
      this.DateShow = true
    },
    showPopFn () {
      this.DateShow = true
    },
    showPopup () {
      this.DateShow = true
    },
    changeFn () { // 值变化是触发
      this.changeDate = this.currentDate // Tue Sep 08 2020 00:00:00 GMT+0800 (中国标准时间)
    },
    confirmFn () { // 确定按钮
      this.dqList.StartDate = this.timeFormat(this.currentDate)
      this.AddListForm.StartDate = this.timeFormat(this.currentDate)
      this.DateShow = false
      this.$toast.success('已选择日期')
    },
    cancelFn () {
      this.DateShow = false
      this.$toast.fail('已取消选择日期')
    },
    timeFormat (time) { // 时间格式化 2019-09-08
      let year = time.getFullYear()
      let month = time.getMonth() + 1
      let day = time.getDate()
      return year + '-' + month + '-' + day
    },
    NowDate2 () {
      this.DateShow2 = true
    },
    showPopFn2 () {
      this.DateShow2 = true
    },
    showPopup2 () {
      this.DateShow2 = true
    },
    changeFn2 () { // 值变化是触发
      this.changeDate2 = this.currentDate2 // Tue Sep 08 2020 00:00:00 GMT+0800 (中国标准时间)
    },
    confirmFn2 () { // 确定按钮
      this.dqList.EndDate = this.timeFormat(this.currentDate2)
      this.AddListForm.EndDate = this.timeFormat(this.currentDate2)
      this.DateShow2 = false
      this.$toast.success('已选择日期')
    },
    cancelFn2 () {
      this.DateShow2 = false
      this.$toast.fail('已取消选择日期')
    },
    timeFormat2 (time) { // 时间格式化 2019-09-08
      let year = time.getFullYear()
      let month = time.getMonth() + 1
      let day = time.getDate()
      return year + '-' + month + '-' + day
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
      margin-left: 50px;
      margin-top: 50px;
      box-shadow: 5px 5px 5px 5px #ccc;
    }
    h1 {
      display: inline-block;
    }
  }
}
</style>

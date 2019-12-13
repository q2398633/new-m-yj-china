<template>
  <div class="parentAdmin">
    <!-- NavBar 顶部导航 -->
    <van-nav-bar title="考勤列表"
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
    <!-- 搜索员工考勤 -->
    <van-popup v-model="show"
               position="bottom"
               :style="{width: '100%', background: '#524c4c' }"
               close-icon="close">
      <form action="/"
            method="POST"
            ref="Search"
            :model="Search">
        <van-cell-group>
          <div style="font-size: 30px; width: 96.2%; height: 53px; line-height: 53px; color: white; font-family: '楷体'; background: #0199ff; padding-left:15px;">搜索员工考勤</div>
          <van-field label="部门:"
                     label-width="110px"
                     autosize
                     v-model="Search.G_StudentIdName_Like"
                     name="G_StudentIdName_Like"
                     prop="G_StudentIdName_Like"
                     placeholder="请输入考勤人员姓名" />
          <van-field label="职务:"
                     label-width="110px"
                     autosize
                     v-model="Search.G_Date_Like"
                     name="G_Date_Like"
                     prop="G_Date_Like"
                     placeholder="请输入考勤日期" />
        </van-cell-group>
        <div class="submit">
          <van-button type="info"
                      @click.prevent="close">退出</van-button>
          <van-button type="primary"
                      @click.prevent="SearchClass">搜索</van-button>
        </div>
      </form>
    </van-popup>
    <!-- 考勤列表 -->
    <div class="Parent-List">
      <van-pull-refresh v-model="isLoading"
                        @refresh="onRefresh">
        <van-list v-model="loading"
                  :finished="finished"
                  finished-text="没有更多了"
                  @load="onLoad">
          <van-cell v-for="(item) in list"
                    :key="item.Id">
            <van-swipe-cell>
              <div class="head">
                <img src="../../assets/ZJZ.jpg"
                     alt="">
                <h1 style="height: 1rem;color: black; font-size: .5rem;line-height: 1rem;font-weight: 700; font-family: '楷体'; margin-left: 45px;">{{ item.StudentIdName }}</h1>
              </div>
              <van-cell :border="false"
                        title="日期"
                        style="padding-left:30px; padding-right: 30px;">
                {{ item.Date  | dateFmt('YYYY-MM-DD') }}
              </van-cell>
              <van-cell :border="false"
                        title="费用"
                        style="padding-left:30px; padding-right: 30px;">
                费用{{item.YingShouFei }} 出勤 {{ item.ShiJiChuQin }} / {{ item.YingChuQin }} 天
              </van-cell>

              <template slot="right">
                <van-button square
                            type="danger"
                            text="删除"
                            @click.prevent="DelList(item)" />
                <van-button square
                            type="primary"
                            text="配餐"
                            @click.prevent="PC(item)" />
              </template>
            </van-swipe-cell>
          </van-cell>
        </van-list>
        <van-button type="info"
                    style="margin-bottom: 1.5rem; width: 100%; border-radius: 20px;"
                    @click.prevent="AddList">添加考勤人员</van-button>
        <!-- 添加考勤列表 -->
        <van-popup v-model="AddListshow"
                   style="width: 80%;">
          <form action="/"
                method="POST"
                ref="AddListForm"
                :model="AddListForm">
            <van-cell-group>

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
import { AttendanceList } from '@/api/AttendanceList'
import { DelectList31 } from '@/api/Delect'
import { AddList31 } from '@/api/AddList'
import { SearchAttendance } from '@/api/Search'
export default {
  name: 'StaffAdmin',
  data () {
    return {
      Search: {
        G_StudentIdName_Like: '',
        G_Date_Like: ''
      },
      AddListForm: {
        RiQi: new Date()
      },
      ModifyListForm: {

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
      AddList2: [],
      ModifyList2: [],
      Total: 0
    }
  },
  mounted () {
  },
  created () {
    // 页面一进入加载考勤列表
    this.loadAttendanceListList()
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
    async loadAttendanceListList () {
      let channels = []
      const data = await AttendanceList()
      this.Total = data.length
      this.channels = data
      channels = this.channels
      return channels
    },
    async onLoad () {
      const data = await this.loadAttendanceListList()
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
        const listId31 = this.currentList.Id
        const data = await DelectList31(listId31)
        console.log('确认删除了' + data)
        window.location.reload()
        this.$toast.success('删除成功')
      }).catch(() => {
        console.log('取消删除了')
        this.$toast.fail('删除失败')
      })
    },
    async AddList () {
      this.RiQi = new Date()
      const data = await AddList31(this.AddListForm)
      this.AddList2 = data
      this.$toast.fail(data.msg)
      window.location.reload()
    },
    Modify (currentList) {
      this.ModifyListshow = true
      this.dqList = currentList
    },
    async SearchClass () {
      const data = await SearchAttendance(this.Search)
      const SearchResult = data
      this.list = SearchResult
      this.show = false
      this.$toast.success('搜索完成')
      // this.Search.data = data
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

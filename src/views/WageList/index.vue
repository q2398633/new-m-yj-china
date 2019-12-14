<template>
  <div>
    <div class="parentAdmin">
      <!-- 顶部导航 -->
      <van-nav-bar title="工资列表"
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
      <!-- 搜索工资列表 -->
      <van-popup v-model="show"
                 position="bottom"
                 :style="{width: '100%'}"
                 close-icon="close">
        <van-cell-group>
          <div style="font-size: 30px; width: 96.2%; height: 53px; line-height: 53px; color: white; font-family: '楷体'; background: #0199ff; padding-left:15px;">搜索工资列表</div>
          <van-field label="食材:"
                     label-width="70px"
                     autosize
                     name="G_FoodName_Like"
                     prop="G_FoodName_Like"
                     v-model="Search.G_FoodName_Like"
                     placeholder="请输入食材名称" />
          <van-field label="领用人:"
                     label-width="70px"
                     autosize
                     name="G_LingYongRen_Like"
                     prop="G_LingYongRen_Like"
                     v-model="Search.G_LingYongRen_Like"
                     placeholder="请输入食材名称" />
          <van-field label="加工人:"
                     label-width="70px"
                     autosize
                     name="G_JiaGongRen_Like"
                     prop="G_JiaGongRen_Like"
                     v-model="Search.G_JiaGongRen_Like"
                     placeholder="请输入食材名称" />
        </van-cell-group>
        <div class="submit">
          <van-button type="info"
                      class="ClosePop"
                      @click.prevent="close">退出</van-button>
          <van-button type="primary"
                      class="AddClass"
                      @click.prevent="SearchFoodProcessingRecord">搜索</van-button>
        </div>
      </van-popup>
      <!-- 工资列表 -->
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
                  <img src="../../assets/GZ.jpg"
                       alt="">
                  <h1 style="height: 1rem;color: black; font-size: .5rem;line-height: 1rem;font-weight: 700; font-family: '楷体'; margin-left: 45px;">{{ item.Title }}</h1>
                </div>
                <van-cell :border="false"
                          title="迟到扣考勤:"
                          style="padding-left:30px; padding-right: 30px;">
                  {{ item.ChiDaoIsKouKaoQin }}
                </van-cell>
                <van-cell :border="false"
                          title="早退扣考勤:"
                          style="padding-left:30px; padding-right: 30px;">
                  {{ item.ZaoTuiIsKouKaoQin }}
                </van-cell>
                <van-cell :border="false"
                          title="迟到算法:"
                          style="padding-left:30px; padding-right: 30px;">
                  {{ item.ChiDaoSuanFa }}
                </van-cell>
                <van-cell :border="false"
                          title="早退算法:"
                          style="padding-left:30px; padding-right: 30px;">
                  {{ item.ZaoTuiSuanFa}}
                </van-cell>
                <van-cell :border="false"
                          title="备注:"
                          style="padding-left:30px; padding-right: 30px;">
                  {{ item.BeiZhu }}
                </van-cell>
                <van-cell :border="false"
                          title="状态:"
                          style="padding-left:30px; padding-right: 30px;">
                  {{ item.Status }}
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
          <!-- 添加工资列表 -->
          <van-popup v-model="AddListshow"
                     style="width: 80%;">
            <form action="/"
                  method="POST"
                  ref="AddListForm"
                  :model="AddListForm">
              <van-cell-group>
                <div>
                  <span style="font-size: .39rem; color: black; margin-left: .5rem; margin-right: 10px; font-weight: 700; font-family: '楷体';">食材编码:</span>
                  <van-field v-model="AddListForm.FoodCode"
                             placeholder="请输入食材编码"
                             style="display:inline-block; width: 55%;" />
                </div>
                <div>
                  <span style="font-size: .39rem; color: black; margin-left: .5rem; margin-right: 10px; font-weight: 700; font-family: '楷体';">食材名称:</span>
                  <van-field v-model="AddListForm.FoodName"
                             placeholder="请输入食材名称"
                             style="display:inline-block; width: 55%;" />
                </div>
                <div>
                  <span style="font-size: .39rem; color: black; margin-left: .5rem; margin-right: 10px; font-weight: 700; font-family: '楷体';">领用人:</span>
                  <van-field v-model="AddListForm.LingYongRen"
                             placeholder="请输入领用人"
                             style="display:inline-block; width: 55%;" />
                </div>
                <div>
                  <span style="font-size: .39rem; color: black; margin-left: .5rem; margin-right: 10px; font-weight: 700; font-family: '楷体';">领用人:</span>
                  <van-field v-model="AddListForm.JiaGongRen"
                             placeholder="请输入加工人"
                             style="display:inline-block; width: 55%;" />
                </div>
                <div>
                  <span style="font-size: .39rem; color: black; margin-left: .5rem; margin-right: 10px; font-weight: 700; font-family: '楷体';">加工日期:</span>
                  <van-field v-model="AddListForm.JiaGongDate"
                             placeholder="请输入加工日期"
                             style="display:inline-block; width: 55%;"
                             @click.prevent="NowDate" />
                </div>
                <div>
                  <span style="font-size: .39rem; color: black; margin-left: .5rem; margin-right: 10px; font-weight: 700; font-family: '楷体';">处理方法:</span>
                  <van-field v-model="AddListForm.ChuLiFangFa"
                             placeholder="请输入处理方法"
                             style="display:inline-block; width: 55%;" />
                </div>
                <div>
                  <span style="font-size: .39rem; color: black; margin-left: .5rem; margin-right: 10px; font-weight: 700; font-family: '楷体';">处理量(KG):</span>
                  <van-field v-model="AddListForm.ChuLiShuLiang"
                             placeholder="请输入处理量"
                             style="display:inline-block; width: 55%;" />
                </div>
                <div>
                  <span style="font-size: .39rem; color: black; margin-left: .5rem; margin-right: 10px; font-weight: 700; font-family: '楷体';">可用数量(KG):</span>
                  <van-field v-model="AddListForm.KeYongShuLiang"
                             placeholder="请输入可用数量"
                             style="display:inline-block; width: 45%;" />
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
          <!-- 修改工资列表 -->
          <van-popup v-model="ModifyListshow"
                     style="width: 80%;">
            <form action="/"
                  method="POST"
                  ref="ModifyListForm"
                  :model="dqList">
              <van-cell-group>
                <div>
                  <span style="font-size: .39rem; color: black; margin-left: .5rem; margin-right: 10px; font-weight: 700; font-family: '楷体';">食材编码:</span>
                  <van-field v-model="dqList.FoodCode"
                             placeholder="请输入食材编码"
                             style="display:inline-block; width: 55%;" />
                </div>
                <div>
                  <span style="font-size: .39rem; color: black; margin-left: .5rem; margin-right: 10px; font-weight: 700; font-family: '楷体';">食材名称:</span>
                  <van-field v-model="dqList.FoodName"
                             placeholder="请输入食材名称"
                             style="display:inline-block; width: 55%;" />
                </div>
                <div>
                  <span style="font-size: .39rem; color: black; margin-left: .5rem; margin-right: 10px; font-weight: 700; font-family: '楷体';">领用人:</span>
                  <van-field v-model="dqList.LingYongRen"
                             placeholder="请输入领用人"
                             style="display:inline-block; width: 55%;" />
                </div>
                <div>
                  <span style="font-size: .39rem; color: black; margin-left: .5rem; margin-right: 10px; font-weight: 700; font-family: '楷体';">加工人:</span>
                  <van-field v-model="dqList.JiaGongRen"
                             placeholder="请输入加工人"
                             style="display:inline-block; width: 55%;" />
                </div>
                <div>
                  <span style="font-size: .39rem; color: black; margin-left: .5rem; margin-right: 10px; font-weight: 700; font-family: '楷体';">加工日期:</span>
                  <van-field v-model="dqList.JiaGongDate"
                             placeholder="请输入加工日期"
                             style="display:inline-block; width: 55%;"
                             @click.prevent="NowDate" />
                </div>
                <div>
                  <span style="font-size: .39rem; color: black; margin-left: .5rem; margin-right: 10px; font-weight: 700; font-family: '楷体';">处理方法:</span>
                  <van-field v-model="dqList.ChuLiFangFa"
                             placeholder="请输入处理方法"
                             style="display:inline-block; width: 55%;" />
                </div>
                <div>
                  <span style="font-size: .39rem; color: black; margin-left: .5rem; margin-right: 10px; font-weight: 700; font-family: '楷体';">处理量(KG):</span>
                  <van-field v-model="dqList.ChuLiShuLiang"
                             placeholder="请输入处理量"
                             style="display:inline-block; width: 55%;" />
                </div>
                <div>
                  <span style="font-size: .39rem; color: black; margin-left: .5rem; margin-right: 10px; font-weight: 700; font-family: '楷体';">可用数量(KG):</span>
                  <van-field v-model="dqList.KeYongShuLiang"
                             placeholder="请输入可用数量"
                             style="display:inline-block; width: 45%;" />
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
                  @click.prevent="AddList">添加工资列表</van-button>

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
  </div>
</template>
<script>
import { WageList } from '@/api/WageList'
import { DelectList32 } from '@/api/Delect'
import { AddList32 } from '@/api/AddList'
import { ModifyList31 } from '@/api/ModifyList'
import { SearchFoodProcessingRecord } from '@/api/Search'
export default {
  data () {
    return {
      active: 0,
      Search: {
        G_FoodName_Like: '',
        G_LingYongRen_Like: '',
        G_JiaGongRen_Like: ''
      },
      AddListForm: {
        FoodCode: '',
        FoodName: '',
        LingYongRen: '',
        JiaGongRen: '',
        JiaGongDate: '',
        ChuLiFangFa: '',
        ChuLiShuLiang: '',
        KeYongShuLiang: '',
        Id: ''
      },
      ModifyListForm: {
        FoodCode: '',
        FoodName: '',
        LingYongRen: '',
        JiaGongRen: '',
        JiaGongDate: '',
        ChuLiFangFa: '',
        ChuLiShuLiang: '',
        KeYongShuLiang: '',
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
      Total: 0,
      DateShow: false,
      currentDate: new Date()
    }
  },
  mounted () {

  },
  created () {
    // 页面一进入加载工资列表
    this.loadWageList()
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
      this.show = false
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
    // 工资列表
    async loadWageList () {
      let channels = []
      const data = await WageList()
      this.Total = data.length
      console.log(this.Total)
      this.channels = data
      channels = this.channels
      return channels
    },
    async onLoad () {
      const data = await this.loadWageList()
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
        const listId32 = this.currentList.Id
        const data = await DelectList32(listId32)
        console.log('确认删除了' + data)
        window.location.reload()
        this.$toast.success('删除成功')
      }).catch(() => {
        console.log('取消删除了')
        this.$toast.fail('删除失败')
      })
    },
    AddList () {
      this.AddListshow = false
    },
    async AddClass () {
      const data = await AddList32(this.AddListForm)
      console.log(data)
      this.AddListshow = false
      this.$toast.success(data.msg)
      window.location.reload()
    },
    Modify (currentList) {
      this.ModifyListshow = false
      this.finished = false
      this.dqList = currentList
    },
    async ModifyList () {
      const data = await ModifyList31(this.dqList)
      this.ModifyList2 = data
      this.ModifyListshow = false
      this.$toast.success(data.msg)
      window.location.reload()
    },
    async SearchFoodProcessingRecord () {
      const data = await SearchFoodProcessingRecord(this.Search)
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
      this.dqList.JiaGongDate = this.timeFormat(this.currentDate)
      this.AddListForm.JiaGongDate = this.timeFormat(this.currentDate)
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

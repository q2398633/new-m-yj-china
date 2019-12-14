<template>
  <div>
    <div class="parentAdmin">
      <!-- 顶部导航 -->
      <van-nav-bar title="体弱/肥胖儿童信息登记"
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
      <!-- 搜索传体弱/肥胖儿童信息登记信息 -->
      <van-popup v-model="show"
                 position="bottom"
                 :style="{width: '100%'}"
                 close-icon="close">
        <van-cell-group>
          <div style="font-size: 30px; width: 96.2%; height: 53px; line-height: 53px; color: white; font-family: '楷体'; background: #0199ff; padding-left:15px;">传体弱/肥胖儿童信息登记信息</div>
          <van-field label="班级:"
                     label-width="70px"
                     autosize
                     name="G_BanJiName_Like"
                     prop="G_BanJiName_Like"
                     v-model="Search.G_BanJiName_Like"
                     placeholder="请输入班级" />
          <van-field label="姓名:"
                     label-width="70px"
                     autosize
                     name="G_StudentIdName_Like"
                     prop="G_StudentIdName_Like"
                     v-model="Search.G_StudentIdName_Like"
                     placeholder="请输入姓名" />
        </van-cell-group>
        <div class="submit">
          <van-button type="info"
                      class="ClosePop"
                      @click.prevent="close">退出</van-button>
          <van-button type="primary"
                      class="AddClass"
                      @click.prevent="SearchloadInfirmityRegistration">搜索</van-button>
        </div>
      </van-popup>
      <!-- 体弱/肥胖儿童信息登记信息表 -->
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
                  <img src="../../assets/FPET.jpg"
                       alt="">
                  <h1 style="height: 1rem;color: black; font-size: .5rem;line-height: 1rem;font-weight: 700; font-family: '楷体'; margin-left: 45px;"> {{ item.StudentIdName }}</h1>
                </div>
                <van-cell :border="false"
                          title="班级:"
                          style="padding-left:30px; padding-right: 30px;">
                  {{ item.BanJiName }}
                </van-cell>
                <van-cell :border="false"
                          title="性别:"
                          style="padding-left:30px; padding-right: 30px;">
                  {{ item.XingBie }}
                </van-cell>
                <van-cell :border="false"
                          title="年龄:"
                          style="padding-left:30px; padding-right: 30px;">
                  {{ item.NianLing }}
                </van-cell>
                <van-cell :border="false"
                          title="分类:"
                          style="padding-left:30px; padding-right: 30px;">
                  {{ item.FenLeiMingCheng }}
                </van-cell>
                <van-cell :border="false"
                          title="首次检查日期:"
                          style="padding-left:30px; padding-right: 30px;">
                  {{ item.JianChaRiQi  | dateFmt('YYYY-MM-DD') }}
                </van-cell>
                <van-cell :border="false"
                          title="首次检查结果:"
                          style="padding-left:30px; padding-right: 30px;">
                  {{ item.ShouCiJieGuo }}
                </van-cell>
                <van-cell :border="false"
                          title="采取措施与复查:"
                          style="padding-left:30px; padding-right: 30px;">
                  {{ item.FuCha }}
                </van-cell>
                <van-cell :border="false"
                          title="转归与结案日期:"
                          style="padding-left:30px; padding-right: 30px;">
                  {{ item.JieAnRiQi  | dateFmt('YYYY-MM-DD') }}
                </van-cell>
                <van-cell :border="false"
                          title="建立专案:"
                          style="padding-left:30px; padding-right: 30px;">
                  {{ item.IsZhuanAn }}
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
          <!-- 添加传体弱/肥胖儿童信息登记信息 -->
          <van-popup v-model="AddListshow"
                     style="width: 80%;">
            <form action="/"
                  method="POST"
                  ref="AddListForm"
                  :model="AddListForm">
              <van-cell-group>
                <div>
                  <span style="font-size: .39rem; color: black; margin-left: .5rem; margin-right: 10px; font-weight: 700; font-family: '楷体';">学生姓名:</span>
                  <van-field v-model="AddListForm.StudentIdName"
                             placeholder="请输入姓名"
                             style="display:inline-block; width: 55%;" />
                </div>
                <div>
                  <span style="font-size: .39rem; color: black; margin-left: .5rem; margin-right: 10px; font-weight: 700; font-family: '楷体';">学生姓名(ID):</span>
                  <van-field v-model="AddListForm.StudentId"
                             placeholder="请输入姓名ID"
                             style="display:inline-block; width: 45%;" />
                </div>
                <div>
                  <span style="font-size: .39rem; color: black; margin-left: .5rem; margin-right: 10px; font-weight: 700; font-family: '楷体';">班级:</span>
                  <van-field v-model="AddListForm.BanJiName"
                             placeholder="请输入所在班级"
                             style="display:inline-block; width: 55%;" />
                </div>
                <div>
                  <span style="font-size: .39rem; color: black; margin-left: .5rem; margin-right: 10px; font-weight: 700; font-family: '楷体';">性别:</span>
                  <van-field v-model="AddListForm.XingBie"
                             placeholder="请输入性别"
                             style="display:inline-block; width: 55%;" />
                </div>
                <div>
                  <span style="font-size: .39rem; color: black; margin-left: .5rem; margin-right: 10px; font-weight: 700; font-family: '楷体';">年龄:</span>
                  <van-field v-model="AddListForm.NianLing"
                             placeholder="请输入年龄"
                             style="display:inline-block; width: 55%;" />
                </div>
                <div>
                  <span style="font-size: .39rem; color: black; margin-left: .5rem; margin-right: 10px; font-weight: 700; font-family: '楷体';">检查日期:</span>
                  <van-field v-model="AddListForm.JianChaRiQi"
                             placeholder="请输入检查日期"
                             style="display:inline-block; width: 55%;"
                             @click.prevent="NowDate" />
                </div>
                <div>
                  <span style="font-size: .39rem; color: black; margin-left: .5rem; margin-right: 10px; font-weight: 700; font-family: '楷体';">结案日期:</span>
                  <van-field v-model="AddListForm.JieAnRiQi"
                             placeholder="请输入结案日期"
                             style="display:inline-block; width: 45%;"
                             @click.prevent="NowDate2" />
                </div>
                <div>
                  <span style="font-size: .39rem; color: black; margin-left: .5rem; margin-right: 10px; font-weight: 700; font-family: '楷体';">分类:</span>
                  <van-field v-model="AddListForm.FenLeiMingCheng"
                             placeholder="请输入分类"
                             style="display:inline-block; width: 45%;" />
                </div>
                <div>
                  <span style="font-size: .39rem; color: black; margin-left: .5rem; margin-right: 10px; font-weight: 700; font-family: '楷体';">是否建立专案:</span>
                  <van-field v-model="AddListForm.IsZhuanAn"
                             placeholder="请输入是否建立专案 "
                             style="display:inline-block; width: 45%;" />
                </div>
                <div>
                  <span style="font-size: .39rem; color: black; margin-left: .5rem; margin-right: 10px; font-weight: 700; font-family: '楷体';">首次检查结果:</span>
                  <van-field v-model="AddListForm.ShouCiJieGuo"
                             placeholder="请输入首次检查结果 "
                             style="display:inline-block; width: 45%;" />
                </div>
                <div>
                  <span style="font-size: .39rem; color: black; margin-left: .5rem; margin-right: 10px; font-weight: 700; font-family: '楷体';">措施与复查:</span>
                  <van-field v-model="AddListForm.FuCha"
                             placeholder="请输入措施与复查 "
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
          <!-- 修改传体弱/肥胖儿童信息登记信息-->
          <van-popup v-model="ModifyListshow"
                     style="width: 80%;">
            <form action="/"
                  method="POST"
                  ref="ModifyListForm"
                  :model="dqList">
              <van-cell-group>
                <div>
                  <span style="font-size: .39rem; color: black; margin-left: .5rem; margin-right: 10px; font-weight: 700; font-family: '楷体';">学生姓名:</span>
                  <van-field v-model="dqList.StudentIdName"
                             placeholder="请输入姓名"
                             style="display:inline-block; width: 55%;" />
                </div>
                <div>
                  <span style="font-size: .39rem; color: black; margin-left: .5rem; margin-right: 10px; font-weight: 700; font-family: '楷体';">学生姓名(ID):</span>
                  <van-field v-model="dqList.StudentId"
                             placeholder="请输入姓名ID"
                             style="display:inline-block; width: 45%;" />
                </div>
                <div>
                  <span style="font-size: .39rem; color: black; margin-left: .5rem; margin-right: 10px; font-weight: 700; font-family: '楷体';">班级:</span>
                  <van-field v-model="dqList.BanJiName"
                             placeholder="请输入所在班级"
                             style="display:inline-block; width: 55%;" />
                </div>
                <div>
                  <span style="font-size: .39rem; color: black; margin-left: .5rem; margin-right: 10px; font-weight: 700; font-family: '楷体';">性别:</span>
                  <van-field v-model="dqList.XingBie"
                             placeholder="请输入性别"
                             style="display:inline-block; width: 55%;" />
                </div>
                <div>
                  <span style="font-size: .39rem; color: black; margin-left: .5rem; margin-right: 10px; font-weight: 700; font-family: '楷体';">年龄:</span>
                  <van-field v-model="dqList.NianLing"
                             placeholder="请输入年龄"
                             style="display:inline-block; width: 55%;" />
                </div>
                <div>
                  <span style="font-size: .39rem; color: black; margin-left: .5rem; margin-right: 10px; font-weight: 700; font-family: '楷体';">检查日期:</span>
                  <van-field v-model="dqList.JianChaRiQi"
                             placeholder="请输入检查日期"
                             style="display:inline-block; width: 55%;"
                             @click.prevent="NowDate" />
                </div>
                <div>
                  <span style="font-size: .39rem; color: black; margin-left: .5rem; margin-right: 10px; font-weight: 700; font-family: '楷体';">结案日期:</span>
                  <van-field v-model="dqList.JieAnRiQi"
                             placeholder="请输入结案日期"
                             style="display:inline-block; width: 45%;"
                             @click.prevent="NowDate2" />
                </div>
                <div>
                  <span style="font-size: .39rem; color: black; margin-left: .5rem; margin-right: 10px; font-weight: 700; font-family: '楷体';">分类:</span>
                  <van-field v-model="dqList.FenLeiMingCheng"
                             placeholder="请输入分类"
                             style="display:inline-block; width: 45%;" />
                </div>
                <div>
                  <span style="font-size: .39rem; color: black; margin-left: .5rem; margin-right: 10px; font-weight: 700; font-family: '楷体';">是否建立专案:</span>
                  <van-field v-model="dqList.IsZhuanAn"
                             placeholder="请输入是否建立专案 "
                             style="display:inline-block; width: 45%;" />
                </div>
                <div>
                  <span style="font-size: .39rem; color: black; margin-left: .5rem; margin-right: 10px; font-weight: 700; font-family: '楷体';">首次检查结果:</span>
                  <van-field v-model="dqList.ShouCiJieGuo"
                             placeholder="请输入首次检查结果 "
                             style="display:inline-block; width: 45%;" />
                </div>
                <div>
                  <span style="font-size: .39rem; color: black; margin-left: .5rem; margin-right: 10px; font-weight: 700; font-family: '楷体';">措施与复查:</span>
                  <van-field v-model="dqList.FuCha"
                             placeholder="请输入措施与复查 "
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
                  style="margin-bottom: 1.5rem; width: 100%; border-radius: 20px;"
                  @click.prevent="AddList">添加体弱/肥胖儿童信息登记信息</van-button>

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
import { InfirmityRegistration } from '@/api/InfirmityRegistration'
import { DelectList25 } from '@/api/Delect'
import { AddList26 } from '@/api/AddList'
import { ModifyList26 } from '@/api/ModifyList'
import { SearchloadInfirmityRegistration } from '@/api/Search'
export default {
  data () {
    return {
      active: 0,
      Search: {
        G_BanJiName_Like: '',
        G_StudentIdName_Like: ''
      },
      AddListForm: {
        StudentIdName: '',
        StudentId: '',
        BanJiIdName: '',
        XingBie: '',
        NianLing: '',
        JianChaRiQi: '',
        JieAnRiQi: '',
        FenLeiMingCheng: '',
        IsZhuanAn: '',
        ShouCiJieGuo: '',
        FuCha: '',
        Id: ''
      },
      ModifyListForm: {
        StudentIdName: '',
        StudentId: '',
        BanJiName: '',
        XingBie: '',
        NianLing: '',
        JianChaRiQi: '',
        JieAnRiQi: '',
        FenLeiMingCheng: '',
        IsZhuanAn: '',
        ShouCiJieGuo: '',
        FuCha: '',
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
      RecoveryListShow: false,
      checked: true,
      dqList: [],
      ModifyList2: [],
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
    // 页面一进入加载体弱/肥胖儿童信息登记信息
    this.loadInfirmityRegistrationList()
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
    CloseRecovery () {
      this.RecoveryListShow = false
      this.$toast.fail('已取消治愈')
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
    async loadInfirmityRegistrationList () {
      let channels = []
      const data = await InfirmityRegistration()
      this.Total = data.length
      console.log(this.Total)
      this.channels = data
      channels = this.channels
      return channels
    },
    async onLoad () {
      const data = await this.loadInfirmityRegistrationList()
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
        const listId25 = this.currentList.Id
        const data = await DelectList25(listId25)
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
      const data = await AddList26(this.AddListForm)
      console.log(data)
      this.AddListshow = false
      this.$toast.success(data.msg)
    },
    Modify (currentList) {
      this.ModifyListshow = true
      this.finished = false
      this.dqList = currentList
    },
    async ModifyList () {
      const data = await ModifyList26(this.dqList)
      this.ModifyList2 = data
      this.ModifyListshow = false
      this.$toast.success(data.msg)
    },
    async SearchloadInfirmityRegistration () {
      const data = await SearchloadInfirmityRegistration(this.Search)
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
      this.dqList.JianChaRiQi = this.timeFormat(this.currentDate)
      this.AddListForm.JianChaRiQi = this.timeFormat(this.currentDate)
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
      this.changeDate = this.currentDate // Tue Sep 08 2020 00:00:00 GMT+0800 (中国标准时间)
    },
    confirmFn2 () { // 确定按钮
      this.dqList.JieAnRiQi = this.timeFormat(this.currentDate2)
      this.AddListForm.JieAnRiQi = this.timeFormat(this.currentDate2)
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
    }
    h1 {
      display: inline-block;
    }
  }
}
</style>

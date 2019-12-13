<template>
  <div>
    <div class="parentAdmin">
      <!-- 顶部导航 -->
      <van-nav-bar title="龋齿登记"
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
      <!-- 搜索龋齿登记信息 -->
      <van-popup v-model="show"
                 position="bottom"
                 :style="{width: '100%'}"
                 close-icon="close">
        <van-cell-group>
          <div style="font-size: 30px; width: 96.2%; height: 53px; line-height: 53px; color: white; font-family: '楷体'; background: #0199ff; padding-left:15px;">搜索龋齿登记信息</div>
          <van-field label="姓名:"
                     label-width="70px"
                     autosize
                     name="G_StudentIdName_Like"
                     prop="G_StudentIdName_Like"
                     v-model="Search.G_StudentIdName_Like"
                     placeholder="请输入姓名" />
          <van-field label="班级:"
                     label-width="70px"
                     autosize
                     name="G_BanJiIdName_Like"
                     prop="G_BanJiIdName_Like"
                     v-model="Search.G_BanJiIdName_Like"
                     placeholder="请输入班级" />
        </van-cell-group>
        <div class="submit">
          <van-button type="info"
                      class="ClosePop"
                      @click.prevent="close">退出</van-button>
          <van-button type="primary"
                      class="AddClass"
                      @click.prevent="SearchRegistrationOFDentalCaries">搜索</van-button>
        </div>
      </van-popup>
      <!-- 龋齿登记信息表 -->
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
                  <img src="../../assets/QC.jpg"
                       alt="">
                  <h1 style="height: 1rem;color: black; font-size: .5rem;line-height: 1rem;font-weight: 700; font-family: '楷体'; margin-left: 45px;"> {{ item.StudentIdName }}</h1>
                </div>
                <van-cell :border="false"
                          title="班级:"
                          style="padding-left:30px; padding-right: 30px;">
                  {{ item.BanJiIdName }}
                </van-cell>
                <van-cell :border="false"
                          title="年龄:"
                          style="padding-left:30px; padding-right: 30px;">
                  {{ item.NianLing }}
                </van-cell>
                <van-cell :border="false"
                          title="检查日期:"
                          style="padding-left:30px; padding-right: 30px;">
                  {{ item.JianChaRiQi  | dateFmt('YYYY-MM-DD') }}
                </van-cell>
                <van-cell :border="false"
                          title="上龋齿:"
                          style="padding-left:30px; padding-right: 30px;">
                  {{ item.ShangQuChi }}
                </van-cell>
                <van-cell :border="false"
                          title="下龋齿:"
                          style="padding-left:30px; padding-right: 30px;">
                  {{ item.XiaQuChi }}
                </van-cell>
                <van-cell :border="false"
                          title="龋齿颗数:"
                          style="padding-left:30px; padding-right: 30px;">
                  {{ item.QuChiKeShu }}
                </van-cell>
                <van-cell :border="false"
                          title="矫治颗数:"
                          style="padding-left:30px; padding-right: 30px;">
                  {{ item.JiaoZhiKeShu }}
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
          <!-- 添加龋齿登记信息 -->
          <van-popup v-model="AddListshow"
                     style="width: 80%;">
            <form action="/"
                  method="POST"
                  ref="AddListForm"
                  :model="AddListForm">
              <van-cell-group>
                <div>
                  <span style="font-size: .39rem; color: black; margin-left: .5rem; margin-right: 10px; font-weight: 700; font-family: '楷体';">姓名:</span>
                  <van-field v-model="AddListForm.StudentIdName"
                             placeholder="请输入姓名"
                             style="display:inline-block; width: 55%;" />
                </div>
                <div>
                  <span style="font-size: .39rem; color: black; margin-left: .5rem; margin-right: 10px; font-weight: 700; font-family: '楷体';">姓名ID:</span>
                  <van-field v-model="AddListForm.StudentId"
                             placeholder="请输入姓名ID"
                             style="display:inline-block; width: 55%;" />
                </div>
                <div>
                  <span style="font-size: .39rem; color: black; margin-left: .5rem; margin-right: 10px; font-weight: 700; font-family: '楷体';">班级:</span>
                  <van-field v-model="AddListForm.BanJiIdName"
                             placeholder="请输入班级"
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
                  <span style="font-size: .39rem; color: black; margin-left: .5rem; margin-right: 10px; font-weight: 700; font-family: '楷体';">医院名称:</span>
                  <van-field v-model="AddListForm.YiYuanMingCheng"
                             placeholder="请输入医院名称"
                             style="display:inline-block; width: 55%;" />
                </div>
                <div>
                  <span style="font-size: .39rem; color: black; margin-left: .5rem; margin-right: 10px; font-weight: 700; font-family: '楷体';">检查日期:</span>
                  <van-field v-model="AddListForm.Date"
                             placeholder="请输入检查日期"
                             style="display:inline-block; width: 55%;" />
                </div>
                <div>
                  <span style="font-size: .39rem; color: black; margin-left: .5rem; margin-right: 10px; font-weight: 700; font-family: '楷体';">左眼:</span>
                  <van-field v-model="AddListForm.ZuoYan"
                             placeholder="请输入左眼"
                             style="display:inline-block; width: 55%;" />
                </div>
                <div>
                  <span style="font-size: .39rem; color: black; margin-left: .5rem; margin-right: 10px; font-weight: 700; font-family: '楷体';">右眼:</span>
                  <van-field v-model="AddListForm.YouYan"
                             placeholder="请输入右眼"
                             style="display:inline-block; width: 55%;" />
                </div>
                <div>
                  <span style="font-size: .39rem; color: black; margin-left: .5rem; margin-right: 10px; font-weight: 700; font-family: '楷体';">确诊名称:</span>
                  <van-field v-model="AddListForm.QueZhenMingCheng"
                             placeholder="请输入确诊名称"
                             style="display:inline-block; width: 55%;" />
                </div>
                <div>
                  <span style="font-size: .39rem; color: black; margin-left: .5rem; margin-right: 10px; font-weight: 700; font-family: '楷体';">矫治方法:</span>
                  <van-field v-model="AddListForm.JiaoZhiFangFa"
                             placeholder="请输入矫治方法"
                             style="display:inline-block; width: 55%;" />
                </div>
                <div>
                  <span style="font-size: .39rem; color: black; margin-left: .5rem; margin-right: 10px; font-weight: 700; font-family: '楷体';">视力复查一:</span>
                  <van-field v-model="AddListForm.FuChaDate1"
                             placeholder="请输入视力复查一的时间"
                             style="display:inline-block; width: 55%;" />
                </div>
                <div>
                  <span style="font-size: .39rem; color: black; margin-left: .5rem; margin-right: 10px; font-weight: 700; font-family: '楷体';">左眼:</span>
                  <van-field v-model="AddListForm.FuChaZuoYan1"
                             placeholder="请输入左眼视力"
                             style="display:inline-block; width: 55%;" />
                </div>
                <div>
                  <span style="font-size: .39rem; color: black; margin-left: .5rem; margin-right: 10px; font-weight: 700; font-family: '楷体';">右眼:</span>
                  <van-field v-model="AddListForm.FuChaYouYan1"
                             placeholder="请输入右眼视力"
                             style="display:inline-block; width: 55%;" />
                </div>
                <div>
                  <span style="font-size: .39rem; color: black; margin-left: .5rem; margin-right: 10px; font-weight: 700; font-family: '楷体';">视力复查二:</span>
                  <van-field v-model="AddListForm.FuChaDate2"
                             placeholder="请输入视力复查二的时间"
                             style="display:inline-block; width: 55%;" />
                </div>
                <div>
                  <span style="font-size: .39rem; color: black; margin-left: .5rem; margin-right: 10px; font-weight: 700; font-family: '楷体';">左眼:</span>
                  <van-field v-model="AddListForm.FuChaZuoYan2"
                             placeholder="请输入左眼视力"
                             style="display:inline-block; width: 55%;" />
                </div>
                <div>
                  <span style="font-size: .39rem; color: black; margin-left: .5rem; margin-right: 10px; font-weight: 700; font-family: '楷体';">右眼:</span>
                  <van-field v-model="AddListForm.FuChaYouYan2"
                             placeholder="请输入右眼视力"
                             style="display:inline-block; width: 55%;" />
                </div>
                <div>
                  <span style="font-size: .39rem; color: black; margin-left: .5rem; margin-right: 10px; font-weight: 700; font-family: '楷体';">备注:</span>
                  <van-field v-model="AddListForm.BeiZhu"
                             placeholder="请输入备注"
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
          <!-- 修改龋齿登记信息-->
          <van-popup v-model="ModifyListshow"
                     style="width: 80%;">
            <form action="/"
                  method="POST"
                  ref="ModifyListForm"
                  :model="dqList">
              <van-cell-group>
                <div>
                  <span style="font-size: .39rem; color: black; margin-left: .5rem; margin-right: 10px; font-weight: 700; font-family: '楷体';">姓名:</span>
                  <van-field v-model="dqList.StudentIdName"
                             placeholder="请输入姓名"
                             style="display:inline-block; width: 55%;" />
                </div>
                <div>
                  <span style="font-size: .39rem; color: black; margin-left: .5rem; margin-right: 10px; font-weight: 700; font-family: '楷体';">姓名ID:</span>
                  <van-field v-model="dqList.StudentId"
                             placeholder="请输入姓名ID"
                             style="display:inline-block; width: 55%;" />
                </div>
                <div>
                  <span style="font-size: .39rem; color: black; margin-left: .5rem; margin-right: 10px; font-weight: 700; font-family: '楷体';">班级:</span>
                  <van-field v-model="dqList.BanJiIdName"
                             placeholder="请输入班级"
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
                  <span style="font-size: .39rem; color: black; margin-left: .5rem; margin-right: 10px; font-weight: 700; font-family: '楷体';">医院名称:</span>
                  <van-field v-model="dqList.YiYuanMingCheng"
                             placeholder="请输入医院名称"
                             style="display:inline-block; width: 55%;" />
                </div>
                <div>
                  <span style="font-size: .39rem; color: black; margin-left: .5rem; margin-right: 10px; font-weight: 700; font-family: '楷体';">检查日期:</span>
                  <van-field v-model="dqList.Date"
                             placeholder="请输入检查日期"
                             style="display:inline-block; width: 55%;" />
                </div>
                <div>
                  <span style="font-size: .39rem; color: black; margin-left: .5rem; margin-right: 10px; font-weight: 700; font-family: '楷体';">左眼:</span>
                  <van-field v-model="dqList.ZuoYan"
                             placeholder="请输入左眼"
                             style="display:inline-block; width: 55%;" />
                </div>
                <div>
                  <span style="font-size: .39rem; color: black; margin-left: .5rem; margin-right: 10px; font-weight: 700; font-family: '楷体';">右眼:</span>
                  <van-field v-model="dqList.YouYan"
                             placeholder="请输入右眼"
                             style="display:inline-block; width: 55%;" />
                </div>
                <div>
                  <span style="font-size: .39rem; color: black; margin-left: .5rem; margin-right: 10px; font-weight: 700; font-family: '楷体';">确诊名称:</span>
                  <van-field v-model="dqList.QueZhenMingCheng"
                             placeholder="请输入确诊名称"
                             style="display:inline-block; width: 55%;" />
                </div>
                <div>
                  <span style="font-size: .39rem; color: black; margin-left: .5rem; margin-right: 10px; font-weight: 700; font-family: '楷体';">矫治方法:</span>
                  <van-field v-model="dqList.JiaoZhiFangFa"
                             placeholder="请输入矫治方法"
                             style="display:inline-block; width: 55%;" />
                </div>
                <div>
                  <span style="font-size: .39rem; color: black; margin-left: .5rem; margin-right: 10px; font-weight: 700; font-family: '楷体';">视力复查一:</span>
                  <van-field v-model="dqList.FuChaDate1"
                             placeholder="请输入视力复查一的时间"
                             style="display:inline-block; width: 55%;" />
                </div>
                <div>
                  <span style="font-size: .39rem; color: black; margin-left: .5rem; margin-right: 10px; font-weight: 700; font-family: '楷体';">左眼:</span>
                  <van-field v-model="dqList.FuChaZuoYan1"
                             placeholder="请输入左眼视力"
                             style="display:inline-block; width: 55%;" />
                </div>
                <div>
                  <span style="font-size: .39rem; color: black; margin-left: .5rem; margin-right: 10px; font-weight: 700; font-family: '楷体';">右眼:</span>
                  <van-field v-model="dqList.FuChaYouYan1"
                             placeholder="请输入右眼视力"
                             style="display:inline-block; width: 55%;" />
                </div>
                <div>
                  <span style="font-size: .39rem; color: black; margin-left: .5rem; margin-right: 10px; font-weight: 700; font-family: '楷体';">视力复查二:</span>
                  <van-field v-model="dqList.FuChaDate2"
                             placeholder="请输入视力复查二的时间"
                             style="display:inline-block; width: 55%;" />
                </div>
                <div>
                  <span style="font-size: .39rem; color: black; margin-left: .5rem; margin-right: 10px; font-weight: 700; font-family: '楷体';">左眼:</span>
                  <van-field v-model="dqList.FuChaZuoYan2"
                             placeholder="请输入左眼视力"
                             style="display:inline-block; width: 55%;" />
                </div>
                <div>
                  <span style="font-size: .39rem; color: black; margin-left: .5rem; margin-right: 10px; font-weight: 700; font-family: '楷体';">右眼:</span>
                  <van-field v-model="dqList.FuChaYouYan2"
                             placeholder="请输入右眼视力"
                             style="display:inline-block; width: 55%;" />
                </div>
                <div>
                  <span style="font-size: .39rem; color: black; margin-left: .5rem; margin-right: 10px; font-weight: 700; font-family: '楷体';">备注:</span>
                  <van-field v-model="dqList.BeiZhu"
                             placeholder="请输入备注"
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
                  style="margin-bottom: 1.5rem; width: 100%; border-radius: 20px;"
                  @click.prevent="AddList">添加龋齿登记信息</van-button>

    </div>
  </div>
</template>
<script>
import { RegistrationOFDentalCaries } from '@/api/RegistrationOFDentalCaries'
import { DelectList29 } from '@/api/Delect'
import { AddList30 } from '@/api/AddList'
import { ModifyList30 } from '@/api/ModifyList'
import { SearchRegistrationOFDentalCaries } from '@/api/Search'
export default {
  data () {
    return {
      active: 0,
      Search: {
        G_StudentIdName_Like: '',
        G_BanJiIdName_Like: ''
      },
      AddListForm: {
        StudentIdName: '',
        StudentId: '',
        BanJiIdName: '',
        XingBie: '',
        NianLing: '',
        YiYuanMingCheng: '',
        Date: '',
        ZuoYan: '',
        YouYan: '',
        QueZhenMingCheng: '',
        JiaoZhiFangFa: '',
        FuChaDate1: '',
        FuChaZuoYan1: '',
        FuChaYouYan1: '',
        FuChaDate2: '',
        FuChaZuoYan2: '',
        FuChaYouYan2: '',
        BeiZhu: '',
        Id: ''
      },
      ModifyListForm: {
        StudentIdName: '',
        StudentId: '',
        BanJiIdName: '',
        XingBie: '',
        NianLing: '',
        YiYuanMingCheng: '',
        Date: '',
        ZuoYan: '',
        YouYan: '',
        QueZhenMingCheng: '',
        JiaoZhiFangFa: '',
        FuChaDate1: '',
        FuChaZuoYan1: '',
        FuChaYouYan1: '',
        FuChaDate2: '',
        FuChaZuoYan2: '',
        FuChaYouYan2: '',
        BeiZhu: '',
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
      Total: 0
    }
  },
  mounted () {

  },
  created () {
    // 页面一进入加载龋齿登记信息
    this.loadRegistrationOFDentalCariesList()
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
    async loadRegistrationOFDentalCariesList () {
      let channels = []
      const data = await RegistrationOFDentalCaries()
      this.Total = data.length
      console.log(this.Total)
      this.channels = data
      channels = this.channels
      return channels
    },
    async onLoad () {
      const data = await this.loadRegistrationOFDentalCariesList()
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
        const listId29 = this.currentList.Id
        const data = await DelectList29(listId29)
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
      const data = await AddList30(this.AddListForm)
      console.log(data)
      this.AddListshow = false
      this.$toast.success('添加成功')
      window.location.reload()
    },
    Modify (currentList) {
      this.ModifyListshow = false
      this.finished = false
      this.dqList = currentList
    },
    async ModifyList () {
      const data = await ModifyList30(this.dqList)
      this.ModifyList2 = data
      this.ModifyListshow = false
      this.$toast.success('修改成功')
      window.location.reload()
    },
    async SearchRegistrationOFDentalCaries () {
      const data = await SearchRegistrationOFDentalCaries(this.Search)
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
      margin-left: 50px;
      margin-top: 50px;
    }
    h1 {
      display: inline-block;
    }
  }
}
</style>

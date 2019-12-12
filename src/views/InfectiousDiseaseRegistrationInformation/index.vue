<template>
  <div>
    <div class="parentAdmin">
      <!-- 顶部导航 -->
      <van-nav-bar title="传染病信息登记"
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
      <!-- 搜索传染病信息登记 -->
      <van-popup v-model="show"
                 position="bottom"
                 :style="{width: '100%'}"
                 close-icon="close">
        <van-cell-group>
          <div style="font-size: 30px; width: 96.2%; height: 53px; line-height: 53px; color: white; font-family: '楷体'; background: #0199ff; padding-left:15px;">搜索传染病信息登记</div>
          <van-field label="班级:"
                     label-width="70px"
                     autosize
                     name="G_BanJiIdName_Like"
                     prop="G_BanJiIdName_Like"
                     v-model="Search.G_BanJiIdName_Like"
                     placeholder="请输入班级" />
          <van-field label="姓名:"
                     label-width="70px"
                     autosize
                     name="G_StudentIdName_Like"
                     prop="G_StudentIdName_Like"
                     v-model="Search.G_StudentIdName_Like"
                     placeholder="请输入姓名" />
          <van-field label="记录人:"
                     label-width="70px"
                     autosize
                     name="G_JiLuRen_Like"
                     prop="G_JiLuRen_Like"
                     v-model="Search.G_JiLuRen_Like"
                     placeholder="请输入记录人" />
        </van-cell-group>
        <div class="submit">
          <van-button type="info"
                      class="ClosePop"
                      @click.prevent="close">退出</van-button>
          <van-button type="primary"
                      class="AddClass"
                      @click.prevent="SearchInfectiousDiseaseRegistrationInformation">搜索</van-button>
        </div>
      </van-popup>
      <!-- 传染病信息登记表 -->
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
                  <img src="../../assets/CRB.jpg"
                       alt="">
                  <h1 style="height: 1rem;color: black; font-size: .5rem;line-height: 1rem;font-weight: 700; font-family: '楷体'; margin-left: 45px;"> {{ item.StudentIdName }}</h1>
                </div>
                <van-cell :border="false"
                          title="班级:"
                          style="padding-left:30px; padding-right: 30px;">
                  {{ item.BanJiIdName }}
                </van-cell>
                <van-cell :border="false"
                          title="性别:"
                          style="padding-left:30px; padding-right: 30px;">
                  {{ item.XingBie }}
                </van-cell>
                <van-cell :border="false"
                          title="发病名称:"
                          style="padding-left:30px; padding-right: 30px;">
                  {{ item.FaBingMingCheng }}
                </van-cell>
                <van-cell :border="false"
                          title="记录人:"
                          style="padding-left:30px; padding-right: 30px;">
                  {{ item.JiLuRen }}
                </van-cell>
                <van-cell :border="false"
                          title="发病日期:"
                          style="padding-left:30px; padding-right: 30px;">
                  {{ item.Date }}
                </van-cell>
                <van-cell :border="false"
                          title="痊愈日期:"
                          style="padding-left:30px; padding-right: 30px;">
                  {{ item.QuYuDate }}
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
                  <van-button square
                              type="info"
                              text="痊愈"
                              @click.prevent="Recovery(item)" />
                </template>
              </van-swipe-cell>
            </van-cell>
          </van-list>
          <!-- 添加传染病信息登记 -->
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
                  <van-field v-model="AddListForm.BanJiIdName"
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
                  <span style="font-size: .39rem; color: black; margin-left: .5rem; margin-right: 10px; font-weight: 700; font-family: '楷体';">发病日期:</span>
                  <van-field v-model="AddListForm.Date"
                             placeholder="请输入发病日期"
                             style="display:inline-block; width: 55%;" />
                </div>
                <div>
                  <span style="font-size: .39rem; color: black; margin-left: .5rem; margin-right: 10px; font-weight: 700; font-family: '楷体';">发病名称:</span>
                  <van-field v-model="AddListForm.FaBingMingCheng"
                             placeholder="请输入发病名称"
                             style="display:inline-block; width: 45%;" />
                </div>
                <div>
                  <span style="font-size: .39rem; color: black; margin-left: .5rem; margin-right: 10px; font-weight: 700; font-family: '楷体';">痊愈日期:</span>
                  <van-field v-model="AddListForm.QuYuDate"
                             placeholder="请输入痊愈日期"
                             style="display:inline-block; width: 45%;" />
                </div>
                <div>
                  <span style="font-size: .39rem; color: black; margin-left: .5rem; margin-right: 10px; font-weight: 700; font-family: '楷体';">记录人:</span>
                  <van-field v-model="AddListForm.JiLuRen"
                             placeholder="请输入记录人"
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
          <!-- 修改传染病信息登记-->
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
                  <van-field v-model="dqList.BanJiIdName"
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
                  <span style="font-size: .39rem; color: black; margin-left: .5rem; margin-right: 10px; font-weight: 700; font-family: '楷体';">发病日期:</span>
                  <van-field v-model="dqList.Date"
                             placeholder="请输入发病日期"
                             style="display:inline-block; width: 55%;" />
                </div>
                <div>
                  <span style="font-size: .39rem; color: black; margin-left: .5rem; margin-right: 10px; font-weight: 700; font-family: '楷体';">发病名称:</span>
                  <van-field v-model="dqList.FaBingMingCheng"
                             placeholder="请输入发病名称"
                             style="display:inline-block; width: 45%;" />
                </div>
                <div>
                  <span style="font-size: .39rem; color: black; margin-left: .5rem; margin-right: 10px; font-weight: 700; font-family: '楷体';">痊愈日期:</span>
                  <van-field v-model="dqList.QuYuDate"
                             placeholder="请输入痊愈日期"
                             style="display:inline-block; width: 45%;" />
                </div>
                <div>
                  <span style="font-size: .39rem; color: black; margin-left: .5rem; margin-right: 10px; font-weight: 700; font-family: '楷体';">记录人:</span>
                  <van-field v-model="dqList.JiLuRen"
                             placeholder="请输入记录人"
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
          <!-- 痊愈传染病信息登记-->
          <van-popup v-model="RecoveryListShow"
                     style="width: 80%;">
            <form action="/"
                  method="POST"
                  ref="RecoveryListForm"
                  :model="RList">
              <van-cell-group>
                <div>
                  <span style="font-size: .39rem; color: black; margin-left: .5rem; margin-right: 10px; font-weight: 700; font-family: '楷体';">学生姓名:</span>
                  <van-field v-model="RList.StudentIdName"
                             placeholder="请输入姓名"
                             style="display:inline-block; width: 55%;" />
                </div>
                <div>
                  <span style="font-size: .39rem; color: black; margin-left: .5rem; margin-right: 10px; font-weight: 700; font-family: '楷体';">学生姓名(ID):</span>
                  <van-field v-model="RList.StudentId"
                             placeholder="请输入姓名ID"
                             style="display:inline-block; width: 45%;" />
                </div>
                <div>
                  <span style="font-size: .39rem; color: black; margin-left: .5rem; margin-right: 10px; font-weight: 700; font-family: '楷体';">班级:</span>
                  <van-field v-model="RList.BanJiIdName"
                             placeholder="请输入所在班级"
                             style="display:inline-block; width: 55%;" />
                </div>
                <div>
                  <span style="font-size: .39rem; color: black; margin-left: .5rem; margin-right: 10px; font-weight: 700; font-family: '楷体';">性别:</span>
                  <van-field v-model="RList.XingBie"
                             placeholder="请输入性别"
                             style="display:inline-block; width: 55%;" />
                </div>
                <div>
                  <span style="font-size: .39rem; color: black; margin-left: .5rem; margin-right: 10px; font-weight: 700; font-family: '楷体';">发病日期:</span>
                  <van-field v-model="RList.Date"
                             placeholder="请输入发病日期"
                             style="display:inline-block; width: 55%;" />
                </div>
                <div>
                  <span style="font-size: .39rem; color: black; margin-left: .5rem; margin-right: 10px; font-weight: 700; font-family: '楷体';">发病名称:</span>
                  <van-field v-model="RList.FaBingMingCheng"
                             placeholder="请输入发病名称"
                             style="display:inline-block; width: 45%;" />
                </div>
                <div>
                  <span style="font-size: .39rem; color: black; margin-left: .5rem; margin-right: 10px; font-weight: 700; font-family: '楷体';">痊愈日期:</span>
                  <van-field v-model="RList.QuYuDate"
                             placeholder="请输入痊愈日期"
                             style="display:inline-block; width: 45%;" />
                </div>
                <div>
                  <span style="font-size: .39rem; color: black; margin-left: .5rem; margin-right: 10px; font-weight: 700; font-family: '楷体';">记录人:</span>
                  <van-field v-model="RList.JiLuRen"
                             placeholder="请输入记录人"
                             style="display:inline-block; width: 45%;" />
                </div>
                <div style="margin-top: 40px; margin-bottom: 30px; padding-left:0px; padding-right: 0px;">
                  <van-button type="info"
                              @click.prevent="CloseRecovery"
                              class="ClosePop">取消</van-button>
                  <van-button type="primary"
                              @click.prevent="RecoveryList"
                              class="AddClass">治愈</van-button>
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
                  @click.prevent="AddList">添加传染病信息登记</van-button>

    </div>
  </div>
</template>
<script>
import { InfectiousDiseaseRegistrationInformation } from '@/api/InfectiousDiseaseRegistrationInformation'
import { DelectList24 } from '@/api/Delect'
import { AddList25 } from '@/api/AddList'
import { ModifyList25 } from '@/api/ModifyList'
import { SearchInfectiousDiseaseRegistrationInformation } from '@/api/Search'
import { RecoveryList1 } from '@/api/RecoveryList'
export default {
  data () {
    return {
      active: 0,
      Search: {
        G_BanJiIdName_Like: '',
        G_StudentIdName_Like: '',
        G_JiLuRen_Like: ''
      },
      AddListForm: {
        StudentIdName: '',
        StudentId: '',
        BanJiIdName: '',
        XingBie: '',
        Date: '',
        FaBingMingCheng: '',
        QuYuDate: '',
        JiLuRen: '',
        Id: ''
      },
      ModifyListForm: {
        StudentIdName: '',
        StudentId: '',
        BanJiIdName: '',
        XingBie: '',
        Date: '',
        FaBingMingCheng: '',
        QuYuDate: '',
        JiLuRen: '',
        Id: ''
      },
      RecoveryListForm: {
        StudentIdName: '',
        StudentId: '',
        BanJiIdName: '',
        XingBie: '',
        Date: '',
        FaBingMingCheng: '',
        QuYuDate: '',
        JiLuRen: '',
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
      RList: [],
      ModifyList2: [],
      RecoveryList2: [],
      Total: 0
    }
  },
  mounted () {

  },
  created () {
    // 页面一进入加载传染病信息登记
    this.loadInfectiousDiseaseRegistrationInformationList()
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
    async loadInfectiousDiseaseRegistrationInformationList () {
      let channels = []
      const data = await InfectiousDiseaseRegistrationInformation()
      this.Total = data.length
      console.log(this.Total)
      this.channels = data
      channels = this.channels
      return channels
    },
    async onLoad () {
      const data = await this.loadInfectiousDiseaseRegistrationInformationList()
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
        const listId24 = this.currentList.Id
        const data = await DelectList24(listId24)
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
      const data = await AddList25(this.AddListForm)
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
      const data = await ModifyList25(this.dqList)
      this.ModifyList2 = data
      this.ModifyListshow = false
      this.$toast.success('修改成功')
      window.location.reload()
    },
    Recovery (currentList) {
      this.RecoveryListShow = true
      this.finished = false
      this.RList = currentList
    },
    async RecoveryList () {
      const data = await RecoveryList1(this.RList)
      this.RecoveryList2 = data
      this.RecoveryListShow = false
      this.$toast.success('治愈成功')
      window.location.reload()
    },
    async SearchInfectiousDiseaseRegistrationInformation () {
      const data = await SearchInfectiousDiseaseRegistrationInformation(this.Search)
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
    }
    h1 {
      display: inline-block;
    }
  }
}
</style>

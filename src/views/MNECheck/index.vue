<template>
  <div>
    <div class="parentAdmin">
      <!-- 顶部导航 -->
      <van-nav-bar title="晨午晚检"
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
      <!-- 搜索晨午晚检 -->
      <van-popup v-model="show"
                 position="bottom"
                 :style="{width: '100%'}"
                 close-icon="close">
        <van-cell-group>
          <div style="font-size: 30px; width: 96.2%; height: 53px; line-height: 53px; color: white; font-family: '楷体'; background: #0199ff; padding-left:15px;">搜索晨午晚检</div>
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
          <van-field label="检查人:"
                     label-width="80px"
                     autosize
                     name="G_JianChaRen_Like"
                     prop="G_JianChaRen_Like"
                     v-model="Search.G_JianChaRen_Like"
                     placeholder="请输入检查人" />
        </van-cell-group>
        <div class="submit">
          <van-button type="info"
                      class="ClosePop"
                      @click.prevent="close">退出</van-button>
          <van-button type="primary"
                      class="AddClass"
                      @click.prevent="SearchMNECheck">搜索</van-button>
        </div>
      </van-popup>
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
                  <h1 style="height: 1rem;color: black; font-size: .5rem;line-height: 1rem;font-weight: 700; font-family: '楷体'; margin-left: 45px;">{{ item.StudentIdName }}</h1>
                </div>
                <van-cell :border="false"
                          title="班级:"
                          style="padding-left:30px; padding-right: 30px;">
                  {{ item.BanJiName }}
                </van-cell>
                <van-cell :border="false"
                          title="症状:"
                          style="padding-left:30px; padding-right: 30px;">
                  {{ item.ZhengZhuang }}
                </van-cell>
                <van-cell :border="false"
                          title="体征:"
                          style="padding-left:30px; padding-right: 30px;">
                  {{ item.TiZheng }}
                </van-cell>
                <van-cell :border="false"
                          title="诊断:"
                          style="padding-left:30px; padding-right: 30px;">
                  {{ item.ZhenDuan }}
                </van-cell>
                <van-cell :border="false"
                          title="处理方式:"
                          style="padding-left:30px; padding-right: 30px;">
                  {{ item.ChuLiFangShi}}
                </van-cell>
                <van-cell :border="false"
                          title="疾病分类:"
                          style="padding-left:30px; padding-right: 30px;">
                  {{ item.JiBingFenLei }}
                </van-cell>
                <van-cell :border="false"
                          title="症状分类:"
                          style="padding-left:30px; padding-right: 30px;">
                  {{ item.ZhengZhuangFenLei }}
                </van-cell>
                <van-cell :border="false"
                          title="检查人:"
                          style="padding-left:30px; padding-right: 30px;">
                  {{ item.JianChaRen }}
                </van-cell>
                <van-cell :border="false"
                          title="日期:"
                          style="padding-left:30px; padding-right: 30px;">
                  {{ item.Date  | dateFmt('YYYY-MM-DD')  }}
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
          <!-- 添加晨午晚检信息表 -->
          <van-popup v-model="AddListshow"
                     style="width: 80%;">
            <form action="/"
                  method="POST"
                  ref="AddListForm"
                  :model="AddListForm">
              <van-cell-group>
                <div>
                  <span style="font-size: .39rem; color: black; margin-left: .5rem; margin-right: 10px; font-weight: 700; font-family: '楷体';">班级:</span>
                  <van-field v-model="AddListForm.BanJiName"
                             placeholder="请输入班级"
                             style="display:inline-block; width: 55%;" />
                </div>
                <div>
                  <span style="font-size: .39rem; color: black; margin-left: .5rem; margin-right: 10px; font-weight: 700; font-family: '楷体';">姓名:</span>
                  <van-field v-model="AddListForm.StudentIdName"
                             placeholder="请输入姓名"
                             style="display:inline-block; width: 55%;" />
                </div>
                <div>
                  <span style="font-size: .39rem; color: black; margin-left: .5rem; margin-right: 10px; font-weight: 700; font-family: '楷体';">姓名(ID):</span>
                  <van-field v-model="AddListForm.StudentId"
                             placeholder="请输入姓名ID"
                             style="display:inline-block; width: 55%;" />
                </div>
                <div>
                  <span style="font-size: .39rem; color: black; margin-left: .5rem; margin-right: 10px; font-weight: 700; font-family: '楷体';">日期:</span>
                  <van-field v-model="AddListForm.Date"
                             placeholder="请输入日期"
                             style="display:inline-block; width: 55%;"
                             @click.prevent="NowDate" />
                </div>
                <div>
                  <span style="font-size: .39rem; color: black; margin-left: .5rem; margin-right: 10px; font-weight: 700; font-family: '楷体';">检查人:</span>
                  <van-field v-model="AddListForm.JianChaRen"
                             placeholder="请输入检查人"
                             style="display:inline-block; width: 55%;" />
                </div>
                <div>
                  <span style="font-size: .39rem; color: black; margin-left: .5rem; margin-right: 10px; font-weight: 700; font-family: '楷体';">症状:</span>
                  <van-field v-model="AddListForm.ZhengZhuang"
                             placeholder="请输入症状"
                             style="display:inline-block; width: 55%;" />
                </div>
                <div>
                  <span style="font-size: .39rem; color: black; margin-left: .5rem; margin-right: 10px; font-weight: 700; font-family: '楷体';">体征:</span>
                  <van-field v-model="AddListForm.TiZheng"
                             placeholder="请输入体征"
                             style="display:inline-block; width: 55%;" />
                </div>
                <div>
                  <span style="font-size: .39rem; color: black; margin-left: .5rem; margin-right: 10px; font-weight: 700; font-family: '楷体';">诊断:</span>
                  <van-field v-model="AddListForm.ZhenDuan"
                             placeholder="请输入诊断"
                             style="display:inline-block; width: 55%;" />
                </div>
                <div>
                  <span style="font-size: .39rem; color: black; margin-left: .5rem; margin-right: 10px; font-weight: 700; font-family: '楷体';">处理方式:</span>
                  <van-field v-model="AddListForm.ChuLiFangShi"
                             placeholder="请输入处理方式"
                             style="display:inline-block; width: 55%;" />
                </div>
                <div>
                  <span style="font-size: .39rem; color: black; margin-left: .5rem; margin-right: 10px; font-weight: 700; font-family: '楷体';">疾病分类:</span>
                  <van-field v-model="AddListForm.JiBingFenLei"
                             placeholder="请输入疾病分类"
                             style="display:inline-block; width: 55%;" />
                </div>
                <div>
                  <span style="font-size: .39rem; color: black; margin-left: .5rem; margin-right: 10px; font-weight: 700; font-family: '楷体';">症状分类:</span>
                  <van-field v-model="AddListForm.ZhengZhuangFenLei"
                             placeholder="请输入症状分类"
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
          <!-- 修改晨午晚检信息表 -->
          <van-popup v-model="ModifyListshow"
                     style="width: 80%;">
            <form action="/"
                  method="POST"
                  ref="ModifyListForm"
                  :model="dqList">
              <van-cell-group>
                <div>
                  <span style="font-size: .39rem; color: black; margin-left: .5rem; margin-right: 10px; font-weight: 700; font-family: '楷体';">班级:</span>
                  <van-field v-model="dqList.BanJiName"
                             placeholder="请输入班级"
                             style="display:inline-block; width: 55%;" />
                </div>
                <div>
                  <span style="font-size: .39rem; color: black; margin-left: .5rem; margin-right: 10px; font-weight: 700; font-family: '楷体';">姓名(ID):</span>
                  <van-field v-model="dqList.StudentId"
                             placeholder="请输入姓名ID"
                             style="display:inline-block; width: 55%;" />
                </div>
                <div>
                  <span style="font-size: .39rem; color: black; margin-left: .5rem; margin-right: 10px; font-weight: 700; font-family: '楷体';">姓名:</span>
                  <van-field v-model="dqList.StudentIdName"
                             placeholder="请输入姓名"
                             style="display:inline-block; width: 55%;" />
                </div>
                <div>
                  <span style="font-size: .39rem; color: black; margin-left: .5rem; margin-right: 10px; font-weight: 700; font-family: '楷体';">日期:</span>
                  <van-field v-model="dqList.Date"
                             placeholder="请输入日期"
                             style="display:inline-block; width: 55%;"
                             @click.prevent="NowDate" />
                </div>
                <div>
                  <span style="font-size: .39rem; color: black; margin-left: .5rem; margin-right: 10px; font-weight: 700; font-family: '楷体';">检查人:</span>
                  <van-field v-model="dqList.JianChaRen"
                             placeholder="请输入检查人"
                             style="display:inline-block; width: 55%;" />
                </div>
                <div>
                  <span style="font-size: .39rem; color: black; margin-left: .5rem; margin-right: 10px; font-weight: 700; font-family: '楷体';">症状:</span>
                  <van-field v-model="dqList.ZhengZhuang"
                             placeholder="请输入症状"
                             style="display:inline-block; width: 55%;" />
                </div>
                <div>
                  <span style="font-size: .39rem; color: black; margin-left: .5rem; margin-right: 10px; font-weight: 700; font-family: '楷体';">体征:</span>
                  <van-field v-model="dqList.TiZheng"
                             placeholder="请输入体征"
                             style="display:inline-block; width: 55%;" />
                </div>
                <div>
                  <span style="font-size: .39rem; color: black; margin-left: .5rem; margin-right: 10px; font-weight: 700; font-family: '楷体';">诊断:</span>
                  <van-field v-model="dqList.ZhenDuan"
                             placeholder="请输入诊断"
                             style="display:inline-block; width: 55%;" />
                </div>
                <div>
                  <span style="font-size: .39rem; color: black; margin-left: .5rem; margin-right: 10px; font-weight: 700; font-family: '楷体';">处理方式:</span>
                  <van-field v-model="dqList.ChuLiFangShi"
                             placeholder="请输入处理方式"
                             style="display:inline-block; width: 55%;" />
                </div>
                <div>
                  <span style="font-size: .39rem; color: black; margin-left: .5rem; margin-right: 10px; font-weight: 700; font-family: '楷体';">疾病分类:</span>
                  <van-field v-model="dqList.JiBingFenLei"
                             placeholder="请输入疾病分类"
                             style="display:inline-block; width: 55%;" />
                </div>
                <div>
                  <span style="font-size: .39rem; color: black; margin-left: .5rem; margin-right: 10px; font-weight: 700; font-family: '楷体';">症状分类:</span>
                  <van-field v-model="dqList.ZhengZhuangFenLei"
                             placeholder="请输入症状分类"
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
                  @click.prevent="AddList">添加晨午晚检</van-button>

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
import { MNECheck } from '@/api/MNECheck'
import { DelectList19 } from '@/api/Delect'
import { AddList20 } from '@/api/AddList'
import { ModifyList20 } from '@/api/ModifyList'
import { SearchMNECheck } from '@/api/Search'
export default {
  data () {
    return {
      active: 0,
      Search: {
        G_BanJiName_Like: '',
        G_StudentIdName_Like: '',
        G_JianChaRen_Like: ''
      },
      AddListForm: {
        StudentIdName: '',
        StudentId: '',
        BanJiName: '',
        Date: '',
        JianChaRen: '',
        ZhengZhuang: '',
        TiZheng: '',
        ZhenDuan: '',
        ChuLiFangShi: '',
        JiBingFenLei: '',
        ZhengZhuangFenLei: '',
        Id: ''
      },
      ModifyListForm: {
        StudentIdName: '',
        StudentId: '',
        BanJiName: '',
        Date: '',
        JianChaRen: '',
        ZhengZhuang: '',
        TiZheng: '',
        ZhenDuan: '',
        ChuLiFangShi: '',
        JiBingFenLei: '',
        ZhengZhuangFenLei: '',
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
    // 页面一进入加载晨午晚检查表
    this.loadMNEChecksList()
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
    async loadMNEChecksList () {
      let channels = []
      const data = await MNECheck()
      this.Total = data.length
      console.log(this.Total)
      this.channels = data
      channels = this.channels
      return channels
    },
    async onLoad () {
      const data = await this.loadMNEChecksList()
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
        const listId19 = this.currentList.Id
        const data = await DelectList19(listId19)
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
      const data = await AddList20(this.AddListForm)
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
      const data = await ModifyList20(this.dqList)
      this.ModifyList2 = data
      this.ModifyListshow = false
      this.$toast.success(data.msg)
      window.location.reload()
    },
    async SearchMNECheck () {
      const data = await SearchMNECheck(this.Search)
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
      this.dqList.Date = this.timeFormat(this.currentDate)
      this.AddListForm.Date = this.timeFormat(this.currentDate)
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
    }
    h1 {
      display: inline-block;
    }
  }
}
</style>

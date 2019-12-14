<template>
  <div>
    <div class="parentAdmin">
      <!-- 顶部导航 -->
      <van-nav-bar title="家长列表"
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
      <!-- 搜索家长信息 -->
      <van-popup v-model="show"
                 position="bottom"
                 :style="{width: '100%'}"
                 close-icon="close">
        <van-cell-group>
          <div style="font-size: 30px; width: 96.2%; height: 53px; line-height: 53px; color: white; font-family: '楷体'; background: #0199ff; padding-left:15px;">搜索家长</div>
          <van-field label="家长姓名:"
                     label-width="110px"
                     autosize
                     v-model="Search.G_RealName_Like"
                     name="G_RealName_Like"
                     prop="G_RealName_Like"
                     placeholder="请输入家长姓名" />
          <van-field label="手机号:"
                     label-width="110px"
                     autosize
                     v-model="Search.G_Mobile_Like"
                     name="G_Mobile_Like"
                     prop="G_Mobile_Like"
                     placeholder="请输入手机号" />
          <van-field label="单位:"
                     v-model="Search.G_WorkPlace_Like"
                     prop="G_WorkPlace_Like"
                     name="G_WorkPlace_Like"
                     label-width="110px"
                     autosize
                     placeholder="请输入所在单位" />
          <van-field label="资源:"
                     v-model="Search.G_ZiYuan_Like"
                     prop="G_WorkPlace_Like"
                     name="G_WorkPlace_Like"
                     label-width="110px"
                     autosize
                     placeholder="请输入所在单位" />
          <van-field label="学历:"
                     v-model="Search.G_ZiYuan_Like"
                     prop="G_WorkPlace_Like"
                     name="G_WorkPlace_Like"
                     label-width="110px"
                     autosize
                     placeholder="请输入所在单位" />
        </van-cell-group>
        <div class="submit">
          <van-button type="info"
                      class="ClosePop"
                      @click.prevent="close">退出</van-button>
          <van-button type="primary"
                      class="AddClass"
                      @click.prevent="SearchParent">搜索</van-button>
        </div>
      </van-popup>
      <!-- 家长信息表 -->
      <div class="Parent-List">
        <van-pull-refresh v-model="isLoading"
                          @refresh="onRefresh"
                          disabled>
          <van-list v-model="loading"
                    :finished="finished"
                    finished-text="没有更多了"
                    @load="onLoad">
            <van-cell v-for="(item) in list"
                      :key="item.Id">
              <van-swipe-cell style="border: 7px solid rgb(231, 231, 231);">
                <div class="head">
                  <img src="../../assets/JZ.jpg"
                       alt="">
                  <h1 style="height: 1rem;color: black; font-size: .5rem;line-height: 1rem;font-weight: 700; font-family: '楷体'; margin-left: 45px;"> {{ item.RealName }}</h1>
                </div>
                <van-cell :border="false"
                          title="手机号"
                          style="padding-left:30px; padding-right: 30px;">
                  {{ item.Mobile }}
                </van-cell>
                <van-cell :border="false"
                          title="关系"
                          style="padding-left:30px; padding-right: 30px;">
                  {{ item.GuanXi }}
                </van-cell>
                <van-cell :border="false"
                          title="常接送人"
                          style="padding-left:30px; padding-right: 30px;">
                  {{ item.IsJieSongRen }}
                </van-cell>
                <van-cell :border="false"
                          title="单位"
                          style="padding-left:30px; padding-right: 30px;">
                  {{ item.WorkPlace }}
                </van-cell>
                <van-cell :border="false"
                          title="身份证号"
                          style="padding-left:30px; padding-right: 30px;">
                  {{ item.IdNumber }}
                </van-cell>
                <van-cell :border="false"
                          title="微信号"
                          style="padding-left:30px; padding-right: 30px;">
                  {{ item.WeChat }}
                </van-cell>
                <van-cell :border="false"
                          title="QQ号"
                          style="padding-left:30px; padding-right: 30px;">
                  {{ item.QQ }}
                </van-cell>
                <van-cell :border="false"
                          title="学生"
                          style="padding-left:30px; padding-right: 30px;">
                  {{ item.StudentIdName }}
                </van-cell>
                <van-cell :border="false"
                          title="学历"
                          style="padding-left:30px; padding-right: 30px;">
                  {{ item.XueLi }}
                </van-cell>
                <van-cell :border="false"
                          title="家庭住址"
                          style="padding-left:30px; padding-right: 30px;">
                  {{ item.ZhuZhi }}
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
          <!-- 添加家长信息 -->
          <van-popup v-model="AddListshow"
                     style="width: 80%;">
            <form action="/"
                  method="POST"
                  ref="AddListForm"
                  :model="AddListForm">
              <van-cell-group>
                <div>
                  <span style="font-size: .39rem; color: black; margin-left: .5rem; margin-right: 10px; font-weight: 700; font-family: '楷体';">幼儿姓名:</span>
                  <van-field v-model="AddListForm.StudentIdName"
                             placeholder="请输入幼儿姓名"
                             style="display:inline-block; width: 55%;" />
                </div>
                <div>
                  <span style="font-size: .39rem; color: black; margin-left: .5rem; margin-right: 10px; font-weight: 700; font-family: '楷体';">幼儿姓名ID:</span>
                  <van-field v-model="AddListForm.StudentId"
                             placeholder="请输入幼儿姓名ID"
                             style="display:inline-block; width: 45%;" />
                </div>
                <div>
                  <span style="font-size: .39rem; color: black; margin-left: .5rem; margin-right: 10px; font-weight: 700; font-family: '楷体';">家长姓名:</span>
                  <van-field v-model="AddListForm.RealName"
                             placeholder="请输入家长姓名"
                             style="display:inline-block; width: 45%;" />
                </div>
                <div>
                  <span style="font-size: .39rem; color: black; margin-left: .5rem; margin-right: 10px; font-weight: 700; font-family: '楷体';">关系:</span>
                  <van-field v-model="AddListForm.GuanXi"
                             placeholder="请输入关系"
                             style="display:inline-block; width: 55%;" />
                </div>
                <div>
                  <span style="font-size: .39rem; color: black; margin-left: .5rem; margin-right: 10px; font-weight: 700; font-family: '楷体';">手机号:</span>
                  <van-field v-model="AddListForm.Mobile"
                             placeholder="请输入手机号"
                             style="display:inline-block; width: 55%;" />
                </div>
                <div>
                  <span style="font-size: .39rem; color: black; margin-left: .5rem; margin-right: 10px; font-weight: 700; font-family: '楷体';">常接送人:</span>
                  <van-field v-model="AddListForm.IsJieSongRen"
                             placeholder="请输入是否常接送人"
                             style="display:inline-block; width: 55%;" />
                </div>
                <div>
                  <span style="font-size: .39rem; color: black; margin-left: .5rem; margin-right: 10px; font-weight: 700; font-family: '楷体';">监护人:</span>
                  <van-field v-model="AddListForm.IsJianHuRen"
                             placeholder="请输入监护人"
                             style="display:inline-block; width: 55%;" />
                </div>
                <div>
                  <span style="font-size: .39rem; color: black; margin-left: .5rem; margin-right: 10px; font-weight: 700; font-family: '楷体';">工作单位:</span>
                  <van-field v-model="AddListForm.WorkPlace"
                             placeholder="请输入工作单位"
                             style="display:inline-block; width: 55%;" />
                </div>
                <div>
                  <span style="font-size: .39rem; color: black; margin-left: .5rem; margin-right: 10px; font-weight: 700; font-family: '楷体';">身份证号:</span>
                  <van-field v-model="AddListForm.IdNumber"
                             placeholder="请输入身份证号"
                             style="display:inline-block; width: 45%;" />
                </div>
                <div>
                  <span style="font-size: .39rem; color: black; margin-left: .5rem; margin-right: 10px; font-weight: 700; font-family: '楷体';">微信号:</span>
                  <van-field v-model="AddListForm.WeChat"
                             placeholder="请输入微信号"
                             style="display:inline-block; width: 45%;" />
                </div>
                <div>
                  <span style="font-size: .39rem; color: black; margin-left: .5rem; margin-right: 10px; font-weight: 700; font-family: '楷体';">QQ号:</span>
                  <van-field v-model="AddListForm.QQ"
                             placeholder="请输入QQ号"
                             style="display:inline-block; width: 45%;" />
                </div>
                <div>
                  <span style="font-size: .39rem; color: black; margin-left: .5rem; margin-right: 10px; font-weight: 700; font-family: '楷体';">学历:</span>
                  <van-field v-model="AddListForm.XueLi"
                             placeholder="请输入家长学历"
                             style="display:inline-block; width: 45%;" />
                </div>
                <div>
                  <span style="font-size: .39rem; color: black; margin-left: .5rem; margin-right: 10px; font-weight: 700; font-family: '楷体';">家庭住址:</span>
                  <van-field v-model="AddListForm.ZhuZhi"
                             placeholder="请输入家庭住址"
                             style="display:inline-block; width: 45%;" />
                </div>
                <div>
                  <span style="font-size: .39rem; color: black; margin-left: .5rem; margin-right: 10px; font-weight: 700; font-family: '楷体';">特殊纪念日:</span>
                  <van-field v-model="AddListForm.TeShuJiNianRiDate"
                             placeholder="请输入纪念日日期"
                             style="display:inline-block; width: 45%;"
                             @click.prevent="NowDate" />
                </div>
                <div>
                  <span style="font-size: .39rem; color: black; margin-left: .5rem; margin-right: 10px; font-weight: 700; font-family: '楷体';">纪念日名称:</span>
                  <van-field v-model="AddListForm.TeShuJiNianRiName"
                             placeholder="请输入纪念日名称"
                             style="display:inline-block; width: 45%;" />
                </div>
                <div>
                  <span style="font-size: .39rem; color: black; margin-left: .5rem; margin-right: 10px; font-weight: 700; font-family: '楷体';">资源:</span>
                  <van-field v-model="AddListForm.ZiYuan"
                             placeholder="请输入家长资源"
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
          <!-- 修改家长信息-->
          <van-popup v-model="ModifyListshow"
                     style="width: 80%;">
            <form action="/"
                  method="POST"
                  ref="ModifyListForm"
                  :model="dqList">
              <van-cell-group>
                <div>
                  <span style="font-size: .39rem; color: black; margin-left: .5rem; margin-right: 10px; font-weight: 700; font-family: '楷体';">幼儿姓名:</span>
                  <van-field v-model="dqList.StudentIdName"
                             placeholder="请输入幼儿姓名"
                             style="display:inline-block; width: 55%;" />
                </div>
                <div>
                  <span style="font-size: .39rem; color: black; margin-left: .5rem; margin-right: 10px; font-weight: 700; font-family: '楷体';">幼儿姓名ID:</span>
                  <van-field v-model="dqList.StudentId"
                             placeholder="请输入幼儿姓名ID"
                             style="display:inline-block; width: 45%;" />
                </div>
                <div>
                  <span style="font-size: .39rem; color: black; margin-left: .5rem; margin-right: 10px; font-weight: 700; font-family: '楷体';">家长姓名:</span>
                  <van-field v-model="dqList.RealName"
                             placeholder="请输入家长姓名"
                             style="display:inline-block; width: 45%;" />
                </div>
                <div>
                  <span style="font-size: .39rem; color: black; margin-left: .5rem; margin-right: 10px; font-weight: 700; font-family: '楷体';">关系:</span>
                  <van-field v-model="dqList.GuanXi"
                             placeholder="请输入关系"
                             style="display:inline-block; width: 55%;" />
                </div>
                <div>
                  <span style="font-size: .39rem; color: black; margin-left: .5rem; margin-right: 10px; font-weight: 700; font-family: '楷体';">手机号:</span>
                  <van-field v-model="dqList.Mobile"
                             placeholder="请输入手机号"
                             style="display:inline-block; width: 55%;" />
                </div>
                <div>
                  <span style="font-size: .39rem; color: black; margin-left: .5rem; margin-right: 10px; font-weight: 700; font-family: '楷体';">常接送人:</span>
                  <van-field v-model="dqList.IsJieSongRen"
                             placeholder="请输入是否常接送人"
                             style="display:inline-block; width: 55%;" />
                </div>
                <div>
                  <span style="font-size: .39rem; color: black; margin-left: .5rem; margin-right: 10px; font-weight: 700; font-family: '楷体';">监护人:</span>
                  <van-field v-model="dqList.IsJianHuRen"
                             placeholder="请输入监护人"
                             style="display:inline-block; width: 55%;" />
                </div>
                <div>
                  <span style="font-size: .39rem; color: black; margin-left: .5rem; margin-right: 10px; font-weight: 700; font-family: '楷体';">工作单位:</span>
                  <van-field v-model="dqList.WorkPlace"
                             placeholder="请输入工作单位"
                             style="display:inline-block; width: 55%;" />
                </div>
                <div>
                  <span style="font-size: .39rem; color: black; margin-left: .5rem; margin-right: 10px; font-weight: 700; font-family: '楷体';">身份证号:</span>
                  <van-field v-model="dqList.IdNumber"
                             placeholder="请输入身份证号"
                             style="display:inline-block; width: 45%;" />
                </div>
                <div>
                  <span style="font-size: .39rem; color: black; margin-left: .5rem; margin-right: 10px; font-weight: 700; font-family: '楷体';">微信号:</span>
                  <van-field v-model="dqList.WeChat"
                             placeholder="请输入微信号"
                             style="display:inline-block; width: 45%;" />
                </div>
                <div>
                  <span style="font-size: .39rem; color: black; margin-left: .5rem; margin-right: 10px; font-weight: 700; font-family: '楷体';">QQ号:</span>
                  <van-field v-model="dqList.QQ"
                             placeholder="请输入QQ号"
                             style="display:inline-block; width: 45%;" />
                </div>
                <div>
                  <span style="font-size: .39rem; color: black; margin-left: .5rem; margin-right: 10px; font-weight: 700; font-family: '楷体';">学历:</span>
                  <van-field v-model="dqList.XueLi"
                             placeholder="请输入家长学历"
                             style="display:inline-block; width: 45%;" />
                </div>
                <div>
                  <span style="font-size: .39rem; color: black; margin-left: .5rem; margin-right: 10px; font-weight: 700; font-family: '楷体';">家庭住址:</span>
                  <van-field v-model="dqList.ZhuZhi"
                             placeholder="请输入家庭住址"
                             style="display:inline-block; width: 45%;" />
                </div>
                <div>
                  <span style="font-size: .39rem; color: black; margin-left: .5rem; margin-right: 10px; font-weight: 700; font-family: '楷体';">特殊纪念日:</span>
                  <van-field v-model="dqList.TeShuJiNianRiDate"
                             placeholder="请输入纪念日日期"
                             style="display:inline-block; width: 45%;"
                             @click.prevent="NowDate" />
                </div>
                <div>
                  <span style="font-size: .39rem; color: black; margin-left: .5rem; margin-right: 10px; font-weight: 700; font-family: '楷体';">纪念日名称:</span>
                  <van-field v-model="dqList.TeShuJiNianRiName"
                             placeholder="请输入纪念日名称"
                             style="display:inline-block; width: 45%;" />
                </div>
                <div>
                  <span style="font-size: .39rem; color: black; margin-left: .5rem; margin-right: 10px; font-weight: 700; font-family: '楷体';">资源:</span>
                  <van-field v-model="dqList.ZiYuan"
                             placeholder="请输入家长资源"
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
                  @click.prevent="AddList">添加家长信息</van-button>

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
import { ParentList } from '@/api/ParentAdmin'
import { DelectList2 } from '@/api/Delect'
import { AddList2 } from '@/api/AddList'
import { ModifyList2 } from '@/api/ModifyList'
import { SearchParent } from '@/api/Search'
export default {
  data () {
    return {
      active: 0,
      Search: {
        G_RealName_Like: '',
        G_Mobile_Like: '',
        G_WorkPlace_Like: '',
        G_ZiYuan_Like: '',
        G_XueLi_Like: ''
      },
      AddListForm: {
        StudentIdName: '',
        StudentId: '',
        RealName: '',
        GuanXi: '',
        Mobile: '',
        IsJieSongRen: '',
        IsJianHuRen: '',
        WorkPlace: '',
        IdNumber: '',
        WeChat: '',
        QQ: '',
        XueLi: '',
        ZhuZhi: '',
        TeShuJiNianRiDate: '',
        TeShuJiNianRiName: '',
        ZiYuan: '',
        Id: ''
      },
      ModifyListForm: {
        StudentIdName: '',
        StudentId: '',
        RealName: '',
        GuanXi: '',
        Mobile: '',
        IsJieSongRen: '',
        IsJianHuRen: '',
        WorkPlace: '',
        IdNumber: '',
        WeChat: '',
        QQ: '',
        XueLi: '',
        ZhuZhi: '',
        TeShuJiNianRiDate: '',
        TeShuJiNianRiName: '',
        ZiYuan: '',
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
      currentDate: new Date()
    }
  },
  mounted () {

  },
  created () {
    // 页面一进入加载家长信息
    this.loadParentListList()
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
        this.finished = true
      }, 500)
    },
    async loadParentListList () {
      let channels = []
      const data = await ParentList()
      this.Total = data.length
      console.log(this.Total)
      this.channels = data
      channels = this.channels
      return channels
    },
    async onLoad () {
      const data = await this.loadParentListList()
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
        const listId2 = this.currentList.Id
        const data = await DelectList2(listId2)
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
      const data = await AddList2(this.AddListForm)
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
      this.disabled = true
      const data = await ModifyList2(this.dqList)
      this.ModifyList2 = data
      this.ModifyListshow = false
      this.$toast.success('修改成功')
      window.location.reload()
    },
    async SearchParent () {
      const data = await SearchParent(this.Search)
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
      this.AddListForm.TeShuJiNianRiDate = this.timeFormat(this.currentDate)
      this.dqList.TeShuJiNianRiDate = this.timeFormat(this.currentDate)
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

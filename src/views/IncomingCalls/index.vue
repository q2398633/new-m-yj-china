<template>
  <div class="parentAdmin">
    <!-- NavBar 顶部导航 -->
    <van-nav-bar title="来电来访"
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
    <!-- 搜索活动来电来访 -->
    <van-popup v-model="show"
               position="bottom"
               :style="{width: '100%'}"
               close-icon="close">
      <van-cell-group>
        <div style="font-size: 30px; width: 96.2%; height: 53px; line-height: 53px; color: white; font-family: '楷体'; background: #0199ff; padding-left:15px;">搜索来访信息</div>
        <van-field label="活动名称:"
                   label-width="70px"
                   autosize
                   name="G_HuoDongIdName_Like"
                   prop="G_HuoDongIdName_Like"
                   v-model="Search.G_HuoDongIdName_Like"
                   placeholder="请输入活动名称" />
        <van-field label="接待人:"
                   label-width="70px"
                   autosize
                   name="G_JieDaiRen_Like"
                   prop="G_JieDaiRen_Like"
                   v-model="Search.G_JieDaiRen_Like"
                   placeholder="请输入接待人姓名" />
      </van-cell-group>
      <div class="submit">
        <van-button type="info"
                    class="ClosePop"
                    @click.prevent="close">退出</van-button>
        <van-button type="primary"
                    class="AddClass"
                    @click.prevent="SearchIncomingCalls">搜索</van-button>
      </div>
    </van-popup>
    <!-- 活动来电来访信息表 -->
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
                <img src="../../assets/LDLF.jpg"
                     alt="">
                <h1 style="height: 1rem;color: black; font-size: .5rem;line-height: 1rem;font-weight: 700; font-family: '楷体'; margin-left: 45px;">{{ item.HuoDongIdName }}</h1>
              </div>
              <van-cell :border="false"
                        title="接待人:"
                        style="padding-left:30px; padding-right: 30px;">
                {{ item.JieDaiRen }}
              </van-cell>
              <van-cell :border="false"
                        title="来访类型:"
                        style="padding-left:30px; padding-right: 30px;">
                {{ item.LaiFangLeiXing }}
              </van-cell>
              <van-cell :border="false"
                        title="幼儿姓名:"
                        style="padding-left:30px; padding-right: 30px;">
                {{ item.StudentName }}
              </van-cell>
              <van-cell :border="false"
                        title="幼儿性别:"
                        style="padding-left:30px; padding-right: 30px;">
                {{ item.XingBie }}
              </van-cell>
              <van-cell :border="false"
                        title="家长姓名:"
                        style="padding-left:30px; padding-right: 30px;">
                {{ item.JiaZhangName}}
              </van-cell>
              <van-cell :border="false"
                        title="关系:"
                        style="padding-left:30px; padding-right: 30px;">
                {{ item.JiaZhangGuanXi }}
              </van-cell>
              <van-cell :border="false"
                        title="家长电话:"
                        style="padding-left:30px; padding-right: 30px;">
                {{ item.JiaZhangDianHua }}
              </van-cell>
              <van-cell :border="false"
                        title="家长微信:"
                        style="padding-left:30px; padding-right: 30px;">
                {{ item.JiaZhangWeiXin }}
              </van-cell>
              <van-cell :border="false"
                        title="家长QQ:"
                        style="padding-left:30px; padding-right: 30px;">
                {{ item.JiaZhangQQ }}
              </van-cell>
              <van-cell :border="false"
                        title="状态:"
                        style="padding-left:30px; padding-right: 30px;">
                {{ item.Status }}
              </van-cell>
              <van-cell :border="false"
                        title="幼儿生日:"
                        style="padding-left:30px; padding-right: 30px;">
                {{ item.StudentShengRi  | dateFmt('YYYY-MM-DD')  }}
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
        <!-- 添加活动来电来访信息表 -->
        <van-popup v-model="AddListshow"
                   style="width: 80%;">
          <form action="/"
                method="POST"
                ref="AddListForm"
                :model="AddListForm">
            <van-cell-group>
              <div>
                <span style="font-size: .39rem; color: black; margin-left: .5rem; margin-right: 10px; font-weight: 700; font-family: '楷体';">活动名称:</span>
                <van-field v-model="AddListForm.HuoDongIdName"
                           placeholder="请输入活动名称"
                           style="display:inline-block; width: 55%;" />
              </div>
              <div>
                <span style="font-size: .39rem; color: black; margin-left: .5rem; margin-right: 10px; font-weight: 700; font-family: '楷体';">状态:</span>
                <van-field v-model="AddListForm.Status"
                           placeholder="请输入状态: 跟进中/已入园/已放弃"
                           style="display:inline-block; width: 55%;" />
              </div>
              <div>
                <span style="font-size: .39rem; color: black; margin-left: .5rem; margin-right: 10px; font-weight: 700; font-family: '楷体';">接待人:</span>
                <van-field v-model="AddListForm.JieDaiRen"
                           placeholder="请输入接待人"
                           style="display:inline-block; width: 55%;" />
              </div>
              <div>
                <span style="font-size: .39rem; color: black; margin-left: .5rem; margin-right: 10px; font-weight: 700; font-family: '楷体';">来访类型:</span>
                <van-field v-model="AddListForm.LaiFangLeiXing"
                           placeholder="请输入来访类型"
                           style="display:inline-block; width: 55%;" />
              </div>
              <div>
                <span style="font-size: .39rem; color: black; margin-left: .5rem; margin-right: 10px; font-weight: 700; font-family: '楷体';">幼儿姓名:</span>
                <van-field v-model="AddListForm.StudentName"
                           placeholder="请输入幼儿名字"
                           style="display:inline-block; width: 55%;" />
              </div>
              <div>
                <span style="font-size: .39rem; color: black; margin-left: .5rem; margin-right: 10px; font-weight: 700; font-family: '楷体';">幼儿性别:</span>
                <van-field v-model="AddListForm.XingBie"
                           placeholder="请输入幼儿性别"
                           style="display:inline-block; width: 55%;" />
              </div>
              <div>
                <span style="font-size: .39rem; color: black; margin-left: .5rem; margin-right: 10px; font-weight: 700; font-family: '楷体';">幼儿生日:</span>
                <van-field v-model="AddListForm.StudentShengRi"
                           placeholder="请输入幼儿生日"
                           style="display:inline-block; width: 55%;" />
              </div>
              <div>
                <span style="font-size: .39rem; color: black; margin-left: .5rem; margin-right: 10px; font-weight: 700; font-family: '楷体';">家长姓名:</span>
                <van-field v-model="AddListForm.JiaZhangName"
                           placeholder="请输入家长姓名"
                           style="display:inline-block; width: 55%;" />
              </div>
              <div>
                <span style="font-size: .39rem; color: black; margin-left: .5rem; margin-right: 10px; font-weight: 700; font-family: '楷体';">关系:</span>
                <van-field v-model="AddListForm.JiaZhangGuanXi"
                           placeholder="请输入家长关系"
                           style="display:inline-block; width: 45%;" />
              </div>
              <div>
                <span style="font-size: .39rem; color: black; margin-left: .5rem; margin-right: 10px; font-weight: 700; font-family: '楷体';">家长电话:</span>
                <van-field v-model="AddListForm.JiaZhangDianHua"
                           placeholder="请输入家长电话"
                           style="display:inline-block; width: 55%;" />
              </div>
              <div>
                <span style="font-size: .39rem; color: black; margin-left: .5rem; margin-right: 10px; font-weight: 700; font-family: '楷体';">家长微信:</span>
                <van-field v-model="AddListForm.JiaZhangWeiXin"
                           placeholder="请输入家长微信"
                           style="display:inline-block; width: 55%;" />
              </div>
              <div>
                <span style="font-size: .39rem; color: black; margin-left: .5rem; margin-right: 10px; font-weight: 700; font-family: '楷体';">家长QQ:</span>
                <van-field v-model="AddListForm.JiaZhangQQ"
                           placeholder="请输入家长QQ"
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
        <!-- 修改活动来电来访信息表 -->
        <van-popup v-model="ModifyListshow"
                   style="width: 80%;">
          <form action="/"
                method="POST"
                ref="ModifyListForm"
                :model="dqList">
            <van-cell-group>
              <div>
                <span style="font-size: .39rem; color: black; margin-left: .5rem; margin-right: 10px; font-weight: 700; font-family: '楷体';">活动名称:</span>
                <van-field v-model="dqList.HuoDongIdName"
                           placeholder="请输入活动名称"
                           style="display:inline-block; width: 55%;" />
              </div>
              <div>
                <span style="font-size: .39rem; color: black; margin-left: .5rem; margin-right: 10px; font-weight: 700; font-family: '楷体';">状态:</span>
                <van-field v-model="dqList.Status"
                           placeholder="请输入状态: 跟进中/已入园/已放弃"
                           style="display:inline-block; width: 55%;" />
              </div>
              <div>
                <span style="font-size: .39rem; color: black; margin-left: .5rem; margin-right: 10px; font-weight: 700; font-family: '楷体';">接待人:</span>
                <van-field v-model="dqList.JieDaiRen"
                           placeholder="请输入接待人"
                           style="display:inline-block; width: 55%;" />
              </div>
              <div>
                <span style="font-size: .39rem; color: black; margin-left: .5rem; margin-right: 10px; font-weight: 700; font-family: '楷体';">来访类型:</span>
                <van-field v-model="dqList.LaiFangLeiXing"
                           placeholder="请输入来访类型"
                           style="display:inline-block; width: 55%;" />
              </div>
              <div>
                <span style="font-size: .39rem; color: black; margin-left: .5rem; margin-right: 10px; font-weight: 700; font-family: '楷体';">幼儿姓名:</span>
                <van-field v-model="dqList.StudentName"
                           placeholder="请输入幼儿名字"
                           style="display:inline-block; width: 55%;" />
              </div>
              <div>
                <span style="font-size: .39rem; color: black; margin-left: .5rem; margin-right: 10px; font-weight: 700; font-family: '楷体';">幼儿性别:</span>
                <van-field v-model="dqList.XingBie"
                           placeholder="请输入幼儿性别"
                           style="display:inline-block; width: 55%;" />
              </div>
              <div>
                <span style="font-size: .39rem; color: black; margin-left: .5rem; margin-right: 10px; font-weight: 700; font-family: '楷体';">幼儿生日:</span>
                <van-field v-model="dqList.StudentShengRi"
                           placeholder="请输入幼儿生日"
                           style="display:inline-block; width: 55%;" />
              </div>
              <div>
                <span style="font-size: .39rem; color: black; margin-left: .5rem; margin-right: 10px; font-weight: 700; font-family: '楷体';">家长姓名:</span>
                <van-field v-model="dqList.JiaZhangName"
                           placeholder="请输入家长姓名"
                           style="display:inline-block; width: 55%;" />
              </div>
              <div>
                <span style="font-size: .39rem; color: black; margin-left: .5rem; margin-right: 10px; font-weight: 700; font-family: '楷体';">关系:</span>
                <van-field v-model="dqList.JiaZhangGuanXi"
                           placeholder="请输入家长关系"
                           style="display:inline-block; width: 45%;" />
              </div>
              <div>
                <span style="font-size: .39rem; color: black; margin-left: .5rem; margin-right: 10px; font-weight: 700; font-family: '楷体';">家长电话:</span>
                <van-field v-model="dqList.JiaZhangDianHua"
                           placeholder="请输入家长电话"
                           style="display:inline-block; width: 55%;" />
              </div>
              <div>
                <span style="font-size: .39rem; color: black; margin-left: .5rem; margin-right: 10px; font-weight: 700; font-family: '楷体';">家长微信:</span>
                <van-field v-model="dqList.JiaZhangWeiXin"
                           placeholder="请输入家长微信"
                           style="display:inline-block; width: 55%;" />
              </div>
              <div>
                <span style="font-size: .39rem; color: black; margin-left: .5rem; margin-right: 10px; font-weight: 700; font-family: '楷体';">家长QQ:</span>
                <van-field v-model="dqList.JiaZhangQQ"
                           placeholder="请输入家长QQ"
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
                style="margin-bottom: 50px; width: 100%"
                @click.prevent="AddList">添加新活动方案</van-button>
  </div>
</template>

<script>
import { IncomingCalls } from '@/api/IncomingCalls'
import { DelectList18 } from '@/api/Delect'
import { AddList19 } from '@/api/AddList'
import { ModifyList19 } from '@/api/ModifyList'
import { SearchIncomingCalls } from '@/api/Search'
export default {
  name: 'IncomingCalls',
  data () {
    return {
      Search: {
        G_HuoDongIdName_Like: '',
        G_JieDaiRen_Like: ''
      },
      AddListForm: {
        HuoDongIdName: '',
        Status: '',
        JieDaiRen: '',
        LaiFangLeiXing: '',
        StudentName: '',
        XingBie: '',
        StudentShengRi: '',
        JiaZhangName: '',
        JiaZhangGuanXi: '',
        JiaZhangDianHua: '',
        JiaZhangWeiXin: '',
        JiaZhangQQ: '',
        Id: ''
      },
      ModifyListForm: {
        HuoDongIdName: '',
        Status: '',
        JieDaiRen: '',
        LaiFangLeiXing: '',
        StudentName: '',
        XingBie: '',
        StudentShengRi: '',
        JiaZhangName: '',
        JiaZhangGuanXi: '',
        JiaZhangDianHua: '',
        JiaZhangWeiXin: '',
        JiaZhangQQ: '',
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
    // 页面一进入加载来电来访信息表
    this.loadIncomingCallsList()
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
    async loadIncomingCallsList () {
      let channels = []
      const data = await IncomingCalls()
      this.Total = data.length
      console.log(this.Total)
      this.channels = data
      channels = this.channels
      return channels
    },
    async onLoad () {
      const data = await this.loadIncomingCallsList()
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
        const listId18 = this.currentList.Id
        const data = await DelectList18(listId18)
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
      const data = await AddList19(this.AddListForm)
      console.log(data)
      this.AddListshow = false
      window.location.reload()
      this.$toast.success('添加成功')
    },
    Modify (currentList) {
      this.ModifyListshow = true
      this.finished = false
      this.dqList = currentList
    },
    async ModifyList () {
      const data = await ModifyList19(this.dqList)
      this.ModifyList2 = data
      this.ModifyListshow = false
      this.$toast.success('修改成功')
      window.location.reload()
    },
    async SearchIncomingCalls () {
      const data = await SearchIncomingCalls(this.Search)
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

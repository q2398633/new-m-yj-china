<template>
  <div>
    <div class="parentAdmin">
      <!-- 顶部导航 -->
      <van-nav-bar title="疾病防控登记"
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
      <!-- 搜索疾病防控登记 -->
      <van-popup v-model="show"
                 position="bottom"
                 :style="{width: '100%'}"
                 close-icon="close">
        <van-cell-group>
          <div style="font-size: 30px; width: 96.2%; height: 53px; line-height: 53px; color: white; font-family: '楷体'; background: #0199ff; padding-left:15px;">搜索疾病防控登记</div>
          <van-field label="目的:"
                     label-width="70px"
                     autosize
                     name="G_Title_Like"
                     prop="G_Title_Like"
                     v-model="Search.G_Title_Like"
                     placeholder="请输入目的" />
          <van-field label="执行人:"
                     label-width="70px"
                     autosize
                     name="G_ZhiXingRen_Like"
                     prop="G_ZhiXingRen_Like"
                     v-model="Search.G_ZhiXingRen_Like"
                     placeholder="请输入执行人" />
        </van-cell-group>
        <div class="submit">
          <van-button type="info"
                      class="ClosePop"
                      @click.prevent="close">退出</van-button>
          <van-button type="primary"
                      class="AddClass"
                      @click.prevent="SearchDPACRegistration">搜索</van-button>
        </div>
      </van-popup>
      <!-- 疾病防控登记表 -->
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
                  <img src="../../assets/JBYF.jpg"
                       alt="">
                  <h1 style="height: 1rem;color: black; font-size: .5rem;line-height: 1rem;font-weight: 700; font-family: '楷体'; margin-left: 45px;"> {{ item.Title }}</h1>
                </div>
                <van-cell :border="false"
                          title="执行人:"
                          style="padding-left:30px; padding-right: 30px;">
                  {{ item.ZhiXingRen }}
                </van-cell>
                <van-cell :border="false"
                          title="对象:"
                          style="padding-left:30px; padding-right: 30px;">
                  {{ item.DuiXiang }}
                </van-cell>
                <van-cell :border="false"
                          title="防控方式或措施:"
                          style="padding-left:30px; padding-right: 30px;">
                  {{ item.FangKong }}
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
          <!-- 添加疾病防控登记信息表 -->
          <van-popup v-model="AddListshow"
                     style="width: 80%;">
            <form action="/"
                  method="POST"
                  ref="AddListForm"
                  :model="AddListForm">
              <van-cell-group>
                <div>
                  <span style="font-size: .39rem; color: black; margin-left: .5rem; margin-right: 10px; font-weight: 700; font-family: '楷体';">日期:</span>
                  <van-field v-model="AddListForm.Date"
                             placeholder="请输入日期"
                             style="display:inline-block; width: 55%;" />
                </div>
                <div>
                  <span style="font-size: .39rem; color: black; margin-left: .5rem; margin-right: 10px; font-weight: 700; font-family: '楷体';">目的:</span>
                  <van-field v-model="AddListForm.Title"
                             placeholder="请输入目的"
                             style="display:inline-block; width: 55%;" />
                </div>
                <div>
                  <span style="font-size: .39rem; color: black; margin-left: .5rem; margin-right: 10px; font-weight: 700; font-family: '楷体';">执行人:</span>
                  <van-field v-model="AddListForm.ZhiXingRen"
                             placeholder="请输入执行人"
                             style="display:inline-block; width: 55%;" />
                </div>
                <div>
                  <span style="font-size: .39rem; color: black; margin-left: .5rem; margin-right: 10px; font-weight: 700; font-family: '楷体';">对象:</span>
                  <van-field v-model="AddListForm.DuiXiang"
                             placeholder="请输入对象"
                             style="display:inline-block; width: 55%;" />
                </div>
                <div>
                  <span style="font-size: .39rem; color: black; margin-left: .5rem; margin-right: 10px; font-weight: 700; font-family: '楷体';">防控方式或措施:</span>
                  <van-field v-model="AddListForm.FangKong"
                             placeholder="请输入内容"
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
          <!-- 修改疾病防控登记信息表 -->
          <van-popup v-model="ModifyListshow"
                     style="width: 80%;">
            <form action="/"
                  method="POST"
                  ref="ModifyListForm"
                  :model="dqList">
              <van-cell-group>
                <div>
                  <span style="font-size: .39rem; color: black; margin-left: .5rem; margin-right: 10px; font-weight: 700; font-family: '楷体';">日期:</span>
                  <van-field v-model="dqList.Date"
                             placeholder="请输入日期"
                             style="display:inline-block; width: 55%;" />
                </div>
                <div>
                  <span style="font-size: .39rem; color: black; margin-left: .5rem; margin-right: 10px; font-weight: 700; font-family: '楷体';">目的:</span>
                  <van-field v-model="dqList.Title"
                             placeholder="请输入目的"
                             style="display:inline-block; width: 55%;" />
                </div>
                <div>
                  <span style="font-size: .39rem; color: black; margin-left: .5rem; margin-right: 10px; font-weight: 700; font-family: '楷体';">执行人:</span>
                  <van-field v-model="dqList.ZhiXingRen"
                             placeholder="请输入执行人"
                             style="display:inline-block; width: 55%;" />
                </div>
                <div>
                  <span style="font-size: .39rem; color: black; margin-left: .5rem; margin-right: 10px; font-weight: 700; font-family: '楷体';">对象:</span>
                  <van-field v-model="dqList.DuiXiang"
                             placeholder="请输入对象"
                             style="display:inline-block; width: 55%;" />
                </div>
                <div>
                  <span style="font-size: .39rem; color: black; margin-left: .5rem; margin-right: 10px; font-weight: 700; font-family: '楷体';">防控方式或措施:</span>
                  <van-field v-model="dqList.FangKong"
                             placeholder="请输入防控方式"
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
                  @click.prevent="AddList">添加健康教育登记</van-button>

    </div>
  </div>
</template>
<script>
import { DPACRegistration } from '@/api/DPACRegistration'
import { DelectList22 } from '@/api/Delect'
import { AddList23 } from '@/api/AddList'
import { ModifyList23 } from '@/api/ModifyList'
import { SearchDPACRegistration } from '@/api/Search'
export default {
  data () {
    return {
      active: 0,
      Search: {
        G_Title_Like: '',
        G_ZhiXingRen_Like: ''
      },
      AddListForm: {
        Date: '',
        Title: '',
        ZhiXingRen: '',
        DuiXiang: '',
        FangKong: '',
        Id: ''
      },
      ModifyListForm: {
        Date: '',
        Title: '',
        ZhiXingRen: '',
        DuiXiang: '',
        FangKong: '',
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
    // 页面一进入加载疾病防控登记表
    this.loadDPACRegistrationList()
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
    async loadDPACRegistrationList () {
      let channels = []
      const data = await DPACRegistration()
      this.Total = data.length
      console.log(this.Total)
      this.channels = data
      channels = this.channels
      return channels
    },
    async onLoad () {
      const data = await this.loadDPACRegistrationList()
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
        const listId22 = this.currentList.Id
        const data = await DelectList22(listId22)
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
      const data = await AddList23(this.AddListForm)
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
      const data = await ModifyList23(this.dqList)
      this.ModifyList2 = data
      this.ModifyListshow = false
      this.$toast.success('修改成功')
      window.location.reload()
    },
    async SearchDPACRegistration () {
      const data = await SearchDPACRegistration(this.Search)
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

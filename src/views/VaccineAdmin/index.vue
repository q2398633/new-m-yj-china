<template>
  <div class="parentAdmin">
    <!-- NavBar 顶部导航 -->
    <van-nav-bar title="疫苗管理"
                 left-arrow
                 left-text="返回"
                 size="36px"
                 @click-left="back"
                 fixed>
      <van-icon name="search"
                slot="right"
                size="25px" />
    </van-nav-bar>

    <!-- 疫苗管理列表 -->
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
            <van-swipe-cell>
              <div class="head">
                <img src="../../assets/YM.jpg"
                     alt="">
                <h1>{{ item.Title }}</h1>
              </div>
              <van-cell :border="false"
                        title="接种年龄:"
                        style="padding-left:30px; padding-right: 30px;">
                {{ item.Age }}
              </van-cell>
              <van-cell :border="false"
                        title="针次:"
                        style="padding-left:30px; padding-right: 30px;">
                {{ item.ZhenCi }}
              </van-cell>
              <van-cell :border="false"
                        title="预防效果:"
                        style="padding-left:30px; padding-right: 30px;">
                {{ item.XiaoGuo }}
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
        <van-button type="info"
                    style="margin-bottom: 1.5rem; width: 100%; border-radius: 20px;"
                    @click.prevent="AddList">添加新疫苗</van-button>
        <!-- 添加疫苗管理 -->
        <van-popup v-model="AddListshow"
                   style="width: 80%;">
          <form action="/"
                method="POST"
                ref="AddListForm"
                :model="AddListForm">
            <van-cell-group>
              <div>
                <span style="font-size: .39rem; color: black; margin-left: 47px; margin-right: 10px; font-weight: 700; font-family: '楷体';">疫苗名称:</span>
                <van-field v-model="AddListForm.Title"
                           placeholder="请输入疫苗名称"
                           style="display:inline-block;" />
              </div>
              <div>
                <span style="font-size: .39rem; color: black; margin-left: 47px; margin-right: 10px; font-weight: 700; font-family: '楷体';">接种年龄:</span>
                <van-field v-model="AddListForm.Age"
                           placeholder="请输入接种年龄"
                           style="display:inline-block;" />
              </div>
              <div>
                <span style="font-size: .39rem; color: black; margin-left: 47px; margin-right: 10px; font-weight: 700; font-family: '楷体';">针次:</span>
                <van-field v-model="AddListForm.ZhenCi"
                           placeholder="请输入针次"
                           style="display:inline-block;" />
              </div>
              <div>
                <span style="font-size: .39rem; color: black; margin-left: 47px; margin-right: 10px; font-weight: 700; font-family: '楷体';">预防效果:</span>
                <van-field v-model="AddListForm.XiaoGuo"
                           placeholder="请输入预防效果"
                           style="display:inline-block;" />
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
        <!-- 修改疫苗管理 -->
        <van-popup v-model="ModifyListshow"
                   style="width: 80%;">
          <form action="/"
                method="POST"
                ref="AddListForm"
                :model="dqList">
            <van-cell-group>
              <div>
                <span style="font-size: .39rem; color: black; margin-left: 47px; margin-right: 10px; font-weight: 700; font-family: '楷体';">疫苗名称:</span>
                <van-field v-model="dqList.Title"
                           placeholder="请输入疫苗名称"
                           style="display:inline-block;" />
              </div>
              <div>
                <span style="font-size: .39rem; color: black; margin-left: 47px; margin-right: 10px; font-weight: 700; font-family: '楷体';">接种年龄:</span>
                <van-field v-model="dqList.Age"
                           placeholder="请输入接种年龄"
                           style="display:inline-block;" />
              </div>
              <div>
                <span style="font-size: .39rem; color: black; margin-left: 47px; margin-right: 10px; font-weight: 700; font-family: '楷体';">针次:</span>
                <van-field v-model="dqList.ZhenCi"
                           placeholder="请输入针次"
                           style="display:inline-block;" />
              </div>
              <div>
                <span style="font-size: .39rem; color: black; margin-left: 47px; margin-right: 10px; font-weight: 700; font-family: '楷体';">预防效果:</span>
                <van-field v-model="dqList.XiaoGuo"
                           placeholder="请输入预防效果"
                           style="display:inline-block;" />
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

  </div>
</template>

<script>
import { vaccineAdmin } from '@/api/vaccineAdmin'
import { DelectList6 } from '@/api/Delect'
import { AddList6 } from '@/api/AddList'
import { ModifyList6 } from '@/api/ModifyList'
export default {
  name: 'StaffAdmin',
  data () {
    return {
      AddListForm: {
        Title: '',
        Age: '',
        ZhenCi: '',
        XiaoGuo: '',
        Id: ''
      },
      ModifyListForm: {
        Title: '',
        Age: '',
        ZhenCi: '',
        XiaoGuo: '',
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
      Total: 0
    }
  },
  mounted () {

  },
  created () {
    // 页面一进入加载疫苗管理列表
    this.loadvaccineAdminList()
  },
  methods: {
    back () {
      this.$router.go(-1)
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
    async loadvaccineAdminList () {
      const data = await vaccineAdmin()
      this.Total = data.length
    },
    async onLoad () {
      const data = await this.loadvaccineAdminList()
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
        const listId6 = this.currentList.Id
        const data = await DelectList6(listId6)
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
      const data = await AddList6(this.AddListForm)
      console.log(data)
      this.AddListshow = false
      window.location.reload()
      this.$toast.success('添加成功')
    },
    Modify (currentList) {
      this.ModifyListshow = true
      this.dqList = currentList
    },
    async ModifyList () {
      const data = await ModifyList6(this.dqList)
      console.log(data)
      this.ModifyListshow = false
      this.$toast.success('修改成功')
      window.location.reload()
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
    .van-nav-bar__text {
      color: white;
    }
  }
  .submit {
    width: 100%;
    height: 140px;
    background: white;
    button {
      margin-left: 180px;
    }
  }

  .van-list {
    margin-top: 130px;
  }
  .van-popup {
    width: 100%;
    .van-cell-group {
      width: 100%;

      .van-field {
        width: 40%;
        padding: 0 0 0 30px;
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
      margin-left: 45px;
      margin-top: 50px;
      box-shadow: 5px 5px 5px 5px #ccc;
    }
    h1 {
      display: inline-block;
      height: 40px;
      color: black;
      font-size: 0.5rem;
      font-weight: 700;
      font-family: "楷体";
      margin-left: 45px;
      margin-top: 0;
      margin-bottom: 0;
    }
  }
}
</style>

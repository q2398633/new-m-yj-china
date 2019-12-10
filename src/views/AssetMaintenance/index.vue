<template>
  <div class="parentAdmin">
    <!-- NavBar 顶部导航 -->
    <van-nav-bar title="资产维护"
                 left-arrow
                 left-text="返回"
                 size="36px"
                 @click-left="back"
                 fixed>
      <van-icon name="search"
                slot="right"
                size="25px" />
    </van-nav-bar>
    <!-- 资产维护列表 -->
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
                <img src="../../assets/ZC.jpg"
                     alt="">
                <h1 style="height: 1rem;color: black; font-size: .5rem;line-height: 1rem;font-weight: 700; font-family: '楷体'; margin-left: 45px;">{{ item.Title }}</h1>
              </div>
              <van-cell :border="false"
                        title="类别:"
                        style="padding-left:30px; padding-right: 30px;">
                {{ item.WeiHuType }}
              </van-cell>
              <van-cell :border="false"
                        title="经手人:"
                        style="padding-left:30px; padding-right: 30px;">
                {{ item.WeiHuRen }}
              </van-cell>
              <van-cell :border="false"
                        title="费用金额:"
                        style="padding-left:30px; padding-right: 30px;">
                {{ item.FeiYong }}
              </van-cell>
              <van-cell :border="false"
                        title="维护内容:"
                        style="padding-left:30px; padding-right: 30px;">
                {{ item.WeiHuNeiRong }}
              </van-cell>
              <van-cell :border="false"
                        title="备注:"
                        style="padding-left:30px; padding-right: 30px;">
                {{ item.BeiZhu }}
              </van-cell>
              <van-cell :border="false"
                        title="维护日期:"
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
        <van-button type="info"
                    style="margin-bottom: 50px; width: 100%"
                    @click.prevent="AddList">添加资产维护项目</van-button>
        <!-- 添加资产列表 -->
        <van-popup v-model="AddListshow"
                   style="width: 80%;">
          <form action="/"
                method="POST"
                ref="AddListForm"
                :model="AddListForm">
            <van-cell-group>
              <div>
                <span style="font-size: .39rem; color: black; margin-left: .5rem; margin-right: 10px; font-weight: 700; font-family: '楷体';">名称:</span>
                <van-field v-model="AddListForm.Title"
                           placeholder="请输入名称"
                           style="display:inline-block; width: 55%;" />
              </div>
              <div>
                <span style="font-size: .39rem; color: black; margin-left: .5rem; margin-right: 10px; font-weight: 700; font-family: '楷体';">资产信息ID:</span>
                <van-field v-model="AddListForm.ZiChanXinXiId"
                           placeholder="请输入资产信息ID"
                           style="display:inline-block; width: 55%;" />
              </div>
              <div>
                <span style="font-size: .39rem; color: black; margin-left: .5rem; margin-right: 10px; font-weight: 700; font-family: '楷体';">类别:</span>
                <van-field v-model="AddListForm.Type"
                           placeholder="请输入类别"
                           style="display:inline-block; width: 55%;" />
              </div>
              <div>
                <span style="font-size: .39rem; color: black; margin-left: .5rem; margin-right: 10px; font-weight: 700; font-family: '楷体';">维护类别:</span>
                <van-field v-model="AddListForm.WeiHuType"
                           placeholder="请输入维护类别"
                           style="display:inline-block; width: 55%;" />
              </div>
              <div>
                <span style="font-size: .39rem; color: black; margin-left: .5rem; margin-right: 10px; font-weight: 700; font-family: '楷体';">维护日期:</span>
                <van-field v-model="AddListForm.Date"
                           placeholder="请输入维护日期"
                           style="display:inline-block; width: 55%;" />
              </div>
              <div>
                <span style="font-size: .39rem; color: black; margin-left: .5rem; margin-right: 10px; font-weight: 700; font-family: '楷体';">银行账户:</span>
                <van-field v-model="AddListForm.YinHangZhangHuIdName"
                           placeholder="请输入要扣款的银行账户"
                           style="display:inline-block; width: 55%;" />
              </div>
              <div>
                <span style="font-size: .39rem; color: black; margin-left: .5rem; margin-right: 10px; font-weight: 700; font-family: '楷体';">银行账户ID:</span>
                <van-field v-model="AddListForm.YinHangZhangHuId"
                           placeholder="请输入要扣款账户ID"
                           style="display:inline-block; width: 55%;" />
              </div>
              <div>
                <span style="font-size: .39rem; color: black; margin-left: .5rem; margin-right: 10px; font-weight: 700; font-family: '楷体';">费用金额:</span>
                <van-field v-model="AddListForm.FeiYong"
                           placeholder="请输入扣款费用金额"
                           style="display:inline-block; width: 55%;" />
              </div>
              <div>
                <span style="font-size: .39rem; color: black; margin-left: .5rem; margin-right: 10px; font-weight: 700; font-family: '楷体';">内容:</span>
                <van-field v-model="AddListForm.WeiHuNeiRong"
                           placeholder="请输入您的内容补充"
                           style="display:inline-block; width: 55%;" />
              </div>
              <div>
                <span style="font-size: .39rem; color: black; margin-left: .5rem; margin-right: 10px; font-weight: 700; font-family: '楷体';">意见:</span>
                <van-field v-model="AddListForm.BeiZhu"
                           placeholder="请输入审核意见"
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
        <!-- 修改资产列表 -->
        <van-popup v-model="ModifyListshow"
                   style="width: 80%;">
          <form action="/"
                method="POST"
                ref="ModifyListForm"
                :model="dqList">
            <van-cell-group>
              <div>
                <span style="font-size: .39rem; color: black; margin-left: .5rem; margin-right: 10px; font-weight: 700; font-family: '楷体';">名称:</span>
                <van-field v-model="dqList.Title"
                           placeholder="请输入名称"
                           style="display:inline-block; width: 55%;" />
              </div>
              <div>
                <span style="font-size: .39rem; color: black; margin-left: .5rem; margin-right: 10px; font-weight: 700; font-family: '楷体';">资产信息ID:</span>
                <van-field v-model="dqList.ZiChanXinXiId"
                           placeholder="请输入资产信息ID"
                           style="display:inline-block; width: 55%;" />
              </div>
              <div>
                <span style="font-size: .39rem; color: black; margin-left: .5rem; margin-right: 10px; font-weight: 700; font-family: '楷体';">类别:</span>
                <van-field v-model="dqList.Type"
                           placeholder="请输入类别"
                           style="display:inline-block; width: 55%;" />
              </div>
              <div>
                <span style="font-size: .39rem; color: black; margin-left: .5rem; margin-right: 10px; font-weight: 700; font-family: '楷体';">维护类别:</span>
                <van-field v-model="dqList.WeiHuType"
                           placeholder="请输入维护类别"
                           style="display:inline-block; width: 55%;" />
              </div>
              <div>
                <span style="font-size: .39rem; color: black; margin-left: .5rem; margin-right: 10px; font-weight: 700; font-family: '楷体';">维护日期:</span>
                <van-field v-model="dqList.Date"
                           placeholder="请输入维护日期"
                           style="display:inline-block; width: 55%;" />
              </div>
              <div>
                <span style="font-size: .39rem; color: black; margin-left: .5rem; margin-right: 10px; font-weight: 700; font-family: '楷体';">银行账户:</span>
                <van-field v-model="dqList.YinHangZhangHuIdName"
                           placeholder="请输入要扣款的银行账户"
                           style="display:inline-block; width: 55%;" />
              </div>
              <div>
                <span style="font-size: .39rem; color: black; margin-left: .5rem; margin-right: 10px; font-weight: 700; font-family: '楷体';">银行账户ID:</span>
                <van-field v-model="dqList.YinHangZhangHuId"
                           placeholder="请输入要扣款账户ID"
                           style="display:inline-block; width: 55%;" />
              </div>
              <div>
                <span style="font-size: .39rem; color: black; margin-left: .5rem; margin-right: 10px; font-weight: 700; font-family: '楷体';">费用金额:</span>
                <van-field v-model="dqList.FeiYong"
                           placeholder="请输入扣款费用金额"
                           style="display:inline-block; width: 55%;" />
              </div>
              <div>
                <span style="font-size: .39rem; color: black; margin-left: .5rem; margin-right: 10px; font-weight: 700; font-family: '楷体';">内容:</span>
                <van-field v-model="dqList.WeiHuNeiRong"
                           placeholder="请输入您的内容补充"
                           style="display:inline-block; width: 55%;" />
              </div>
              <div>
                <span style="font-size: .39rem; color: black; margin-left: .5rem; margin-right: 10px; font-weight: 700; font-family: '楷体';">意见:</span>
                <van-field v-model="dqList.BeiZhu"
                           placeholder="请输入审核意见"
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

  </div>
</template>

<script>
import { AssetMaintenance } from '@/api/AssetMaintenance'
import { DelectList13 } from '@/api/Delect'
import { AddList14 } from '@/api/AddList'
import { ModifyList14 } from '@/api/ModifyList'

export default {
    name: 'StaffAdmin',
    data () {
        return {
            AddListForm: {
                Title: '',
                ZiChanXinXiId: '',
                Type: '',
                WeiHuType: '',
                Date: '',
                YinHangZhangHuIdName: '',
                YinHangZhangHuId: '',
                FeiYong: null,
                WeiHuNeiRong: '',
                BeiZhu: '',
                Id: ''
            },
            ModifyListForm: {
                Title: '',
                ZiChanXinXiId: '',
                Type: '',
                WeiHuType: '',
                Date: '',
                YinHangZhangHuIdName: '',
                YinHangZhangHuId: '',
                FeiYong: null,
                WeiHuNeiRong: '',
                BeiZhu: '',
                Id: ''
            },
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
    // 页面一进入加载资产列表
        this.loadAssetMaintenanceList()
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
        async loadAssetMaintenanceList () {
            let channels = []
            const data = await AssetMaintenance()
            this.Total = data.length
            console.log(this.Total)
            this.channels = data
            channels = this.channels
            return channels
        },
        async onLoad () {
            const data = await this.loadAssetMaintenanceList()
            this.list = data
        },
        async DelList (currentList) {
            this.isShowDel = true
            this.currentList = currentList
            this.$dialog.confirm({
                title: '确认删除吗?',
                message: '删除当前列表数据'
            }).then(async () => {
                const listId13 = this.currentList.Id
                const data = await DelectList13(listId13)
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
            const data = await AddList14(this.AddListForm)
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
            const data = await ModifyList14(this.dqList)
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
        width: 100%;
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
    }
    h1 {
      display: inline-block;
    }
  }
}
</style>

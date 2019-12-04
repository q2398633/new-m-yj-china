<template>
  <div class="parentAdmin">
    <!-- NavBar 顶部导航 -->
    <van-nav-bar title="供应商管理"
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
    <!-- 搜索 -->
    <van-popup v-model="show"
               position="bottom"
               :style="{width: '100%', background: '#524c4c' }"
               close-icon="close">
      <van-cell-group>
        <div style="font-size: 30px; width: 96.2%; height: 53px; line-height: 53px; color: white; font-family: '楷体'; background: #0199ff; padding-left:15px;">搜索班级</div>
        <van-field label="班级名称:"
                   label-width="70px"
                   autosize
                   placeholder="请输入班级名称" />
        <van-field label="年级:"
                   label-width="70px"
                   autosize
                   placeholder="请输入民族" />
        <van-field label="备注:"
                   label-width="70px"
                   autosize />
        <van-field label="创建时间:"
                   label-width="70px"
                   autosize
                   placeholder="请输入户籍" />
      </van-cell-group>
      <div class="submit">
        <van-button type="primary"
                    @click.prevent="SearchClass">搜索</van-button>
        <van-button type="info"
                    @click.prevent="close">退出</van-button>
      </div>
    </van-popup>
    <!-- 供应商列表 -->
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
              <van-cell :border="false"
                        title="名称"
                        style="padding-left:30px; padding-right: 30px;">
                {{ item.Title }}``
              </van-cell>
              <van-cell :border="false"
                        title="联系人"
                        style="padding-left:30px; padding-right: 30px;">
                {{ item.LianXiRen }}
              </van-cell>
              <van-cell :border="false"
                        title="手机号码"
                        style="padding-left:30px; padding-right: 30px;">
                {{ item.Mobile }}
              </van-cell>
              <van-cell :border="false"
                        title="QQ"
                        style="padding-left:30px; padding-right: 30px;">
                {{ item.QQ }}
              </van-cell>
              <van-cell :border="false"
                        title="微信号"
                        style="padding-left:30px; padding-right: 30px;">
                {{ item.WinXin }}
              </van-cell>
              <van-cell :border="false"
                        title="Email"
                        style="padding-left:30px; padding-right: 30px;">
                {{ item.Email }}
              </van-cell>
              <van-cell :border="false"
                        title="地址"
                        style="padding-left:30px; padding-right: 30px;">
                {{ item.DiZhi }}
              </van-cell>
              <van-cell :border="false"
                        title="状态"
                        style="padding-left:30px; padding-right: 30px;">
                {{ item.Status }}
              </van-cell>
              <van-cell :border="false"
                        title="备注"
                        style="padding-left:30px; padding-right: 30px;">
                {{ item.BeiZhu }}
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
                    @click.prevent="AddList">添加供应商</van-button>
        <!-- 添加供应商列表 -->
        <van-popup v-model="AddListshow"
                   style="width: 80%;">
          <form action="/"
                method="POST"
                ref="AddListForm"
                :model="AddListForm">
            <van-cell-group>
              <div>
                <span style="font-size: .39rem; color: black; margin-left: 15px; margin-right: 10px; font-weight: 700; font-family: '楷体';">名称:</span>
                <van-field v-model="AddListForm.Title"
                           placeholder="请输入名称"
                           style="display:inline-block;" />
              </div>
              <div>
                <span style="font-size: .39rem; color: black; margin-left: 47px; margin-right: 10px; font-weight: 700; font-family: '楷体';">联系人:</span>
                <van-field v-model="AddListForm.LianXiRen"
                           placeholder="请输入联系人"
                           style="display:inline-block;" />
              </div>
              <div style="margin-top: 40px;">
                <span style="font-size: .39rem; color: black; margin-left: 47px; margin-right: 10px; font-weight: 700; font-family: '楷体';">手机号码:</span>
                <van-field v-model="AddListForm.Mobile"
                           placeholder="手机号"
                           style="display:inline-block;" />
              </div>
              <div style="margin-top: 40px; margin-bottom: 30px;">
                <span style="font-size: .39rem; color: black; margin-left: 47px; margin-right: 10px; font-weight: 700; font-family: '楷体';">QQ:</span>
                <van-field v-model="AddListForm.QQ"
                           placeholder="排序"
                           style="display:inline-block;" />
              </div>
              <div style="margin-top: 40px; margin-bottom: 30px;">
                <span style="font-size: .39rem; color: black; margin-left: 47px; margin-right: 10px; font-weight: 700; font-family: '楷体';">微信:</span>
                <van-field v-model="AddListForm.WinXin"
                           placeholder="备注"
                           style="display:inline-block;" />
              </div>
              <div style="margin-top: 40px; margin-bottom: 30px;">
                <span style="font-size: .39rem; color: black; margin-left: 47px; margin-right: 10px; font-weight: 700; font-family: '楷体';">邮箱:</span>
                <van-field v-model="AddListForm.Email"
                           placeholder="状态"
                           style="display:inline-block;" />
              </div>
              <div style="margin-top: 40px; margin-bottom: 30px;">
                <span style="font-size: .39rem; color: black; margin-left: 47px; margin-right: 10px; font-weight: 700; font-family: '楷体';">地址:</span>
                <van-field v-model="AddListForm.DiZhi"
                           placeholder="状态"
                           style="display:inline-block;" />
              </div>
              <div style="margin-top: 40px; margin-bottom: 30px;">
                <span style="font-size: .39rem; color: black; margin-left: 47px; margin-right: 10px; font-weight: 700; font-family: '楷体';">状态:</span>
                <van-field v-model="AddListForm.Status"
                           placeholder="状态"
                           style="display:inline-block;" />
              </div>
              <div style="margin-top: 40px; margin-bottom: 30px;">
                <span style="font-size: .39rem; color: black; margin-left: 47px; margin-right: 10px; font-weight: 700; font-family: '楷体';">备注:</span>
                <van-field v-model="AddListForm.BeiZhu"
                           placeholder="状态"
                           style="display:inline-block;" />
              </div>
              <div style="margin-top: 40px; margin-bottom: 30px; padding-left:0px; padding-right: 0px;">
                <van-button type="info"
                            @click.prevent="ClosePop"
                            style="float:left; width: 165px;">取消</van-button>
                <van-button type="primary"
                            @click.prevent="AddClass"
                            style="float:right; width: 165px;">添加</van-button>
              </div>
            </van-cell-group>

          </form>
        </van-popup>
        <!-- 修改供应商列表 -->
        <van-popup v-model="ModifyListshow"
                   style="width: 80%;">
          <form action="/"
                method="POST"
                ref="AddListForm"
                :model="dqList">
            <van-cell-group>
              <div>
                <span style="font-size: .39rem; color: black; margin-left: 15px; margin-right: 10px; font-weight: 700; font-family: '楷体';">名称:</span>
                <van-field v-model="dqList.Title"
                           placeholder="请输入名称"
                           style="display:inline-block;" />
              </div>
              <div>
                <span style="font-size: .39rem; color: black; margin-left: 47px; margin-right: 10px; font-weight: 700; font-family: '楷体';">联系人:</span>
                <van-field v-model="dqList.LianXiRen"
                           placeholder="请输入联系人"
                           style="display:inline-block;" />
              </div>
              <div style="margin-top: 40px;">
                <span style="font-size: .39rem; color: black; margin-left: 47px; margin-right: 10px; font-weight: 700; font-family: '楷体';">手机号码:</span>
                <van-field v-model="dqList.Mobile"
                           placeholder="手机号"
                           style="display:inline-block;" />
              </div>
              <div style="margin-top: 40px; margin-bottom: 30px;">
                <span style="font-size: .39rem; color: black; margin-left: 47px; margin-right: 10px; font-weight: 700; font-family: '楷体';">QQ:</span>
                <van-field v-model="dqList.QQ"
                           placeholder="排序"
                           style="display:inline-block;" />
              </div>
              <div style="margin-top: 40px; margin-bottom: 30px;">
                <span style="font-size: .39rem; color: black; margin-left: 47px; margin-right: 10px; font-weight: 700; font-family: '楷体';">微信:</span>
                <van-field v-model="dqList.WinXin"
                           placeholder="备注"
                           style="display:inline-block;" />
              </div>
              <div style="margin-top: 40px; margin-bottom: 30px;">
                <span style="font-size: .39rem; color: black; margin-left: 47px; margin-right: 10px; font-weight: 700; font-family: '楷体';">邮箱:</span>
                <van-field v-model="dqList.Email"
                           placeholder="状态"
                           style="display:inline-block;" />
              </div>
              <div style="margin-top: 40px; margin-bottom: 30px;">
                <span style="font-size: .39rem; color: black; margin-left: 47px; margin-right: 10px; font-weight: 700; font-family: '楷体';">地址:</span>
                <van-field v-model="dqList.DiZhi"
                           placeholder="状态"
                           style="display:inline-block;" />
              </div>
              <div style="margin-top: 40px; margin-bottom: 30px;">
                <span style="font-size: .39rem; color: black; margin-left: 47px; margin-right: 10px; font-weight: 700; font-family: '楷体';">状态:</span>
                <van-field v-model="dqList.Status"
                           placeholder="状态"
                           style="display:inline-block;" />
              </div>
              <div style="margin-top: 40px; margin-bottom: 30px;">
                <span style="font-size: .39rem; color: black; margin-left: 47px; margin-right: 10px; font-weight: 700; font-family: '楷体';">备注:</span>
                <van-field v-model="dqList.BeiZhu"
                           placeholder="状态"
                           style="display:inline-block;" />
              </div>
              <div style="margin-top: 40px; margin-bottom: 30px; padding-left:0px; padding-right: 0px;">
                <van-button type="info"
                            @click.prevent="CloseModify"
                            style="float:left; width: 165px;">取消</van-button>
                <van-button type="primary"
                            @click.prevent="ModifyList"
                            style="float:right; width: 165px;">修改</van-button>
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
import { SupplierAdmin } from '@/api/SupplierAdmin'
import { DelectList5 } from '@/api/Delect'
import { AddList5 } from '@/api/AddList'
import { ModifyList5 } from '@/api/ModifyList'
export default {
    name: 'StaffAdmin',
    data () {
        return {
            AddListForm: {
                Title: '',
                LianXiRen: '',
                Mobile: '',
                QQ: '',
                WinXin: '',
                Email: '',
                DiZhi: '',
                Status: '',
                BeiZhu: '',
                Id: ''

            },
            ModifyListForm: {
                Title: '',
                LianXiRen: '',
                Mobile: '',
                QQ: '',
                WinXin: '',
                Email: '',
                DiZhi: '',
                Status: '',
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
            checked: true,
            dqList: [],
            Total: 0
        }
    },
    mounted () {

    },
    created () {
    // 页面一进入加载供应商列表
        this.loadSupplierAdminList()
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
            }, 500)
        },
        async loadSupplierAdminList () {
            let channels = []
            const data = await SupplierAdmin()
            this.Total = data.length
            console.log(this.Total)
            this.channels = data
            channels = this.channels
            return channels
        },
        async onLoad () {
            const data = await this.loadSupplierAdminList()
            this.list = data
        },
        async DelList (currentList) {
            this.isShowDel = true
            this.currentList = currentList
            this.$dialog.confirm({
                title: '确认删除吗?',
                message: '删除当前列表数据'
            }).then(async () => {
                const listId5 = this.currentList.Id
                const data = await DelectList5(listId5)
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
            const data = await AddList5(this.AddListForm)
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
            const data = await ModifyList5(this.dqList)
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
        width: 90%;
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
}
</style>

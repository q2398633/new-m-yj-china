<template>
  <div class="parentAdmin">
    <!-- NavBar 顶部导航 -->
    <van-nav-bar title="家长管理"
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
      <van-cell-group class="Search">
        <div style="font-size: 30px; width: 96.2%; height: 53px; line-height: 53px; color: white; font-family: '楷体'; background: #0199ff; padding-left:15px;">搜索家长</div>
        <van-field label="姓名:"
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
    <!-- 家长列表 -->
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
              <div style="width: 99%; height: 1rem; background: #0199ff; color: white; font-size: .5rem; text-align: center; line-height: 1rem; border-radius: 20px; font-weight: 700; font-family: '楷体';">{{ item.RealName }}</div>
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
        <van-button type="info"
                    style="margin-bottom: 50px; width: 100%"
                    @click.prevent="AddList">添加家长</van-button>
        <!-- 添加家长 -->
        <van-popup v-model="AddListshow"
                   style="width: 80%;">
          <form action="/"
                method="POST"
                ref="AddListForm"
                :model="AddListForm">
            <van-cell-group>
              <div>
                <span style="font-size: .39rem; color: black; margin-left: 47px; margin-right: 10px; font-weight: 700; font-family: '楷体';">姓名:</span>
                <van-field v-model="AddListForm.RealName"
                           placeholder="请输入家长名称"
                           style="display:inline-block;" />
              </div>
              <div>
                <span style="font-size: .39rem; color: black; margin-left: 47px; margin-right: 10px; font-weight: 700; font-family: '楷体';">手机号:</span>
                <van-field v-model="AddListForm.Mobile"
                           placeholder="请输入手机号"
                           style="display:inline-block;" />
              </div>
              <div>
                <span style="font-size: .39rem; color: black; margin-left: 47px; margin-right: 10px; font-weight: 700; font-family: '楷体';">关系:</span>
                <van-field v-model="AddListForm.GuanXi"
                           placeholder="您与学生的关系"
                           style="display:inline-block;" />
              </div>
              <div>
                <span style="font-size: .39rem; color: black; margin-left: 47px; margin-right: 10px; font-weight: 700; font-family: '楷体';">常接送人:</span>
                <van-field v-model="AddListForm.IsJieSongRen"
                           placeholder="常接送人"
                           style="display:inline-block;" />
              </div>
              <div>
                <span style="font-size: .39rem; color: black; margin-left: 47px; margin-right: 10px; font-weight: 700; font-family: '楷体';">单位:</span>
                <van-field v-model="AddListForm.WorkPlace"
                           placeholder="您的单位"
                           style="display:inline-block;" />
              </div>
              <div>
                <span style="font-size: .39rem; color: black; margin-left: 47px; margin-right: 10px; font-weight: 700; font-family: '楷体';">身份证:</span>
                <van-field v-model="AddListForm.IdNumber"
                           placeholder="您的身份证号"
                           style="display:inline-block;" />
              </div>
              <div>
                <span style="font-size: .39rem; color: black; margin-left: 47px; margin-right: 10px; font-weight: 700; font-family: '楷体';">微信:</span>
                <van-field v-model="AddListForm.WeChat"
                           placeholder="您的微信号"
                           style="display:inline-block;" />
              </div>
              <div>
                <span style="font-size: .39rem; color: black; margin-left: 47px; margin-right: 10px; font-weight: 700; font-family: '楷体';">QQ:</span>
                <van-field v-model="AddListForm.QQ"
                           placeholder="您的QQ号"
                           style="display:inline-block;" />
              </div>
              <div>
                <span style="font-size: .39rem; color: black; margin-left: 47px; margin-right: 10px; font-weight: 700; font-family: '楷体';">学生:</span>
                <van-field v-model="AddListForm.StudentIdName"
                           placeholder="您的学生"
                           style="display:inline-block;" />
              </div>
              <div>
                <span style="font-size: .39rem; color: black; margin-left: 47px; margin-right: 10px; font-weight: 700; font-family: '楷体';">学历:</span>
                <van-field v-model="AddListForm.XueLi"
                           placeholder="您的学历"
                           style="display:inline-block;" />
              </div>
              <div>
                <span style="font-size: .39rem; color: black; margin-left: 47px; margin-right: 10px; font-weight: 700; font-family: '楷体';">家庭住址:</span>
                <van-field v-model="AddListForm.ZhuZhi"
                           placeholder="您的家庭住址"
                           style="display:inline-block;" />
              </div>
              <div style="margin-bottom: 30px; padding-left:0px; padding-right: 0px;">
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
        <!-- 修改家长信息 -->
        <van-popup v-model="ModifyListshow"
                   style="width: 80%;">
          <form action="/"
                method="POST"
                ref="AddListForm"
                :model="dqList">
            <van-cell-group>
              <div>
                <span style="font-size: .39rem; color: black; margin-left: 47px; margin-right: 10px; font-weight: 700; font-family: '楷体';">姓名:</span>
                <van-field v-model="dqList.RealName"
                           placeholder="请输入家长名称"
                           style="display:inline-block;" />
              </div>
              <div>
                <span style="font-size: .39rem; color: black; margin-left: 47px; margin-right: 10px; font-weight: 700; font-family: '楷体';">手机号:</span>
                <van-field v-model="dqList.Mobile"
                           placeholder="请输入手机号"
                           style="display:inline-block;" />
              </div>
              <div>
                <span style="font-size: .39rem; color: black; margin-left: 47px; margin-right: 10px; font-weight: 700; font-family: '楷体';">关系:</span>
                <van-field v-model="dqList.GuanXi"
                           placeholder="您与学生的关系"
                           style="display:inline-block;" />
              </div>
              <div>
                <span style="font-size: .39rem; color: black; margin-left: 47px; margin-right: 10px; font-weight: 700; font-family: '楷体';">常接送人:</span>
                <van-field v-model="dqList.IsJieSongRen"
                           placeholder="常接送人"
                           style="display:inline-block;" />
              </div>
              <div>
                <span style="font-size: .39rem; color: black; margin-left: 47px; margin-right: 10px; font-weight: 700; font-family: '楷体';">单位:</span>
                <van-field v-model="dqList.WorkPlace"
                           placeholder="您的单位"
                           style="display:inline-block;" />
              </div>
              <div>
                <span style="font-size: .39rem; color: black; margin-left: 47px; margin-right: 10px; font-weight: 700; font-family: '楷体';">身份证:</span>
                <van-field v-model="dqList.IdNumber"
                           placeholder="您的身份证号"
                           style="display:inline-block;" />
              </div>
              <div>
                <span style="font-size: .39rem; color: black; margin-left: 47px; margin-right: 10px; font-weight: 700; font-family: '楷体';">微信:</span>
                <van-field v-model="dqList.WeChat"
                           placeholder="您的微信号"
                           style="display:inline-block;" />
              </div>
              <div>
                <span style="font-size: .39rem; color: black; margin-left: 47px; margin-right: 10px; font-weight: 700; font-family: '楷体';">QQ:</span>
                <van-field v-model="dqList.QQ"
                           placeholder="您的QQ号"
                           style="display:inline-block;" />
              </div>
              <div>
                <span style="font-size: .39rem; color: black; margin-left: 47px; margin-right: 10px; font-weight: 700; font-family: '楷体';">学生:</span>
                <van-field v-model="dqList.StudentIdName"
                           placeholder="您的学生"
                           style="display:inline-block;" />
              </div>
              <div>
                <span style="font-size: .39rem; color: black; margin-left: 47px; margin-right: 10px; font-weight: 700; font-family: '楷体';">学历:</span>
                <van-field v-model="dqList.XueLi"
                           placeholder="您的学历"
                           style="display:inline-block;" />
              </div>
              <div>
                <span style="font-size: .39rem; color: black; margin-left: 47px; margin-right: 10px; font-weight: 700; font-family: '楷体';">家庭住址:</span>
                <van-field v-model="dqList.ZhuZhi"
                           placeholder="您的家庭住址"
                           style="display:inline-block;" />
              </div>
              <div>
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
import { ParentList } from '@/api/ParentAdmin'
import { DelectList2 } from '@/api/Delect'
import { AddList2 } from '@/api/AddList'
import { ModifyList2 } from '@/api/ModifyList'
export default {
    name: 'StaffAdmin',
    data () {
        return {
            AddListForm: {
                StudentIdName: '',
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
                Id: ''
            },
            ModifyListForm: {
                StudentIdName: '',
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
    // 页面一进入加载家长列表
        this.loadParent()
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
        async loadParent () {
            let channels = []
            const data = await ParentList()
            this.Total = data.length
            console.log(this.Total)
            this.channels = data
            channels = this.channels
            return channels
        },
        async onLoad () {
            const data = await this.loadParent()
            this.list = data
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
            window.location.reload()
            this.$toast.success('添加成功')
        },
        Modify (currentList) {
            this.ModifyListshow = true
            this.dqList = currentList
        },
        async ModifyList () {
            const data = await ModifyList2(this.dqList)
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
      margin-top: 100%;
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
}
</style>

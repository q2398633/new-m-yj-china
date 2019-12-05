<template>
  <div class="parentAdmin">
    <!-- NavBar 顶部导航 -->
    <van-nav-bar title="幼儿管理"
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
        <div style="font-size: 30px; width: 96.2%; height: 53px; line-height: 53px; color: white; font-family: '楷体'; background: #0199ff; padding-left:15px;">搜索幼儿</div>
        <van-field label="姓名:"
                   label-width="70px"
                   autosize
                   placeholder="请输入幼儿名称" />
        <van-field label="班级:"
                   label-width="70px"
                   autosize
                   placeholder="请输入班级" />
        <van-field label="年级:"
                   label-width="70px"
                   autosize />
        <van-field label="档案号:"
                   label-width="70px"
                   autosize
                   placeholder="请输入档案号" />
        <van-field label="生日:"
                   label-width="70px"
                   autosize
                   placeholder="选择生日" />
        <van-popup v-model="BirthdayShow"
                   position="bottom">
          <div class="Calendar">
            <calendar @change="onChange" />
            <inlineCalendar />
          </div>
        </van-popup>
        <van-field label="性别:"
                   label-width="70px"
                   autosize />
        <van-field label="民族:"
                   label-width="70px"
                   autosize
                   placeholder="请输入民族" />
        <van-field label="入托日期:"
                   label-width="70px"
                   autosize
                   placeholder="请输入入托日期"
                   @click.prevent="InNursery" />
        <van-popup v-model="InNurseryShow"
                   position="bottom">
          <div class="Calendar">
            <calendar @change="InNurseryDay" />
            <inlineCalendar />
          </div>
        </van-popup>
        <van-field label="入托类型:"
                   label-width="70px"
                   autosize />
        <van-field label="户籍:"
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
    <!-- 幼儿列表 -->
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
                        title="班级:"
                        style="padding-left:30px; padding-right: 30px;">
                {{ item.BanJi }}
              </van-cell>
              <van-cell :border="false"
                        title="性别:"
                        style="padding-left:30px; padding-right: 30px;">
                {{ item.XingBie }}
              </van-cell>
              <van-cell :border="false"
                        title="民族:"
                        style="padding-left:30px; padding-right: 30px;">
                {{ item.MinZu }}
              </van-cell>
              <van-cell :border="false"
                        title="入园时间:"
                        style="padding-left:30px; padding-right: 30px;">
                {{ item.RuTuoRiQi }}
              </van-cell>
              <van-cell :border="false"
                        title="状态:"
                        style="padding-left:30px; padding-right: 30px;">
                {{ item.Status }}
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
                    @click.prevent="AddList">添加幼儿</van-button>
        <!-- 添加幼儿 -->
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
                           placeholder="请输入姓名"
                           style="display:inline-block;" />
              </div>
              <div>
                <span style="font-size: .39rem; color: black; margin-left: 47px; margin-right: 10px; font-weight: 700; font-family: '楷体';">班级:</span>
                <van-field v-model="AddListForm.BanJi"
                           placeholder="请输入班级"
                           style="display:inline-block;" />
              </div>
              <div>
                <span style="font-size: .39rem; color: black; margin-left: 47px; margin-right: 10px; font-weight: 700; font-family: '楷体';">性别:</span>
                <van-field v-model="AddListForm.XingBie"
                           placeholder="请输入性别"
                           style="display:inline-block;" />
              </div>
              <div>
                <span style="font-size: .39rem; color: black; margin-left: 47px; margin-right: 10px; font-weight: 700; font-family: '楷体';">民族:</span>
                <van-field v-model="AddListForm.MinZu"
                           placeholder="请输入民族"
                           style="display:inline-block;" />
              </div>
              <div>
                <span style="font-size: .39rem; color: black; margin-left: 47px; margin-right: 10px; font-weight: 700; font-family: '楷体';">入园日期:</span>
                <van-field v-model="AddListForm.RuTuoRiQi"
                           placeholder="请输入入园时间"
                           style="display:inline-block;" />
              </div>
              <div>
                <span style="font-size: .39rem; color: black; margin-left: 47px; margin-right: 10px; font-weight: 700; font-family: '楷体';">状态:</span>
                <van-field v-model="AddListForm.Status"
                           placeholder="请输入状态"
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
        <!-- 修改幼儿列表 -->
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
                           placeholder="请输入姓名"
                           style="display:inline-block;" />
              </div>
              <div>
                <span style="font-size: .39rem; color: black; margin-left: 47px; margin-right: 10px; font-weight: 700; font-family: '楷体';">班级:</span>
                <van-field v-model="dqList.BanJi"
                           placeholder="请输入班级"
                           style="display:inline-block;" />
              </div>
              <div>
                <span style="font-size: .39rem; color: black; margin-left: 47px; margin-right: 10px; font-weight: 700; font-family: '楷体';">性别:</span>
                <van-field v-model="dqList.XingBie"
                           placeholder="请输入性别"
                           style="display:inline-block;" />
              </div>
              <div>
                <span style="font-size: .39rem; color: black; margin-left: 47px; margin-right: 10px; font-weight: 700; font-family: '楷体';">民族:</span>
                <van-field v-model="dqList.MinZu"
                           placeholder="请输入民族"
                           style="display:inline-block;" />
              </div>
              <div>
                <span style="font-size: .39rem; color: black; margin-left: 47px; margin-right: 10px; font-weight: 700; font-family: '楷体';">入园时间:</span>
                <van-field v-model="dqList.RuTuoRiQi"
                           placeholder="请输入入园时间"
                           style="display:inline-block; width: 55%; padding: 0; margin-left: 0;" />
              </div>
              <div>
                <span style="font-size: .39rem; color: black; margin-left: 47px; margin-right: 10px; font-weight: 700; font-family: '楷体';">状态:</span>
                <van-field v-model="dqList.Status"
                           placeholder="请输入状态"
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
import { getList } from '@/api/channel'
import { DelectList8 } from '@/api/Delect'
import { AddList8 } from '@/api/AddList'
import { ModifyList8 } from '@/api/ModifyList'
export default {
    name: 'SignInRule',
    data () {
        return {
            AddListForm: {
                Title: '',
                BanJi: '',
                XingBie: '',
                MinZu: '',
                RuTuoRiQi: '',
                Status: '',
                Id: ''
            },
            ModifyListForm: {
                Title: '',
                BanJi: '',
                XingBie: '',
                MinZu: '',
                RuTuoRiQi: '',
                Status: '',
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
            Total: 0,
            InNurseryShow: false,
            BirthdayShow: false

        }
    },
    mounted () {

    },
    created () {
    // 页面一进入加载幼儿列表
        this.loadgetList()
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
        Birthday () {
            this.BirthdayShow = true
        },
        onChange (date) {
            console.log(date.format('YY-MM-DD'))
        },
        InNursery () {
            this.InNurseryShow = true
        },
        InNurseryDay () {

        },
        onRefresh () {
            setTimeout(() => {
                this.$toast('刷新成功')
                this.isLoading = false
            }, 500)
        },
        async loadgetList () {
            let channels = []
            const data = await getList()
            this.Total = data.length
            console.log(this.Total)
            this.channels = data
            channels = this.channels
            return channels
        },
        async onLoad () {
            const data = await this.loadgetList()
            this.list = data
        },
        async DelList (currentList) {
            this.isShowDel = true
            this.currentList = currentList
            this.$dialog.confirm({
                title: '确认删除吗?',
                message: '删除当前列表数据'
            }).then(async () => {
                const listId8 = this.currentList.Id
                const data = await DelectList8(listId8)
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
            const data = await AddList8(this.AddListForm)
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
            const data = await ModifyList8(this.dqList)
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
        padding-left: 30px;
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
}
</style>

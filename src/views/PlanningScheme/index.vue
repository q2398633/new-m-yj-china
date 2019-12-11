<template>
  <div class="parentAdmin">
    <!-- NavBar 顶部导航 -->
    <van-nav-bar title="策划方案"
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
    <!-- 搜索策划方案 -->
    <van-popup v-model="show"
               position="bottom"
               :style="{width: '100%'}"
               close-icon="close">
      <van-cell-group>
        <div style="font-size: 30px; width: 96.2%; height: 53px; line-height: 53px; color: white; font-family: '楷体'; background: #0199ff; padding-left:15px;">搜索策划方案</div>
        <van-field label="方案名称:"
                   label-width="70px"
                   autosize
                   name="G_Title_Like"
                   prop="G_Title_Like"
                   v-model="Search.G_Title_Like"
                   placeholder="请输入方案名称" />
        <van-field label="负责人:"
                   label-width="70px"
                   autosize
                   name="G_FuZeRen_Like"
                   prop="G_FuZeRen_Like"
                   v-model="Search.G_FuZeRen_Like"
                   placeholder="请输入负责人姓名" />
      </van-cell-group>
      <div class="submit">
        <van-button type="info"
                    class="ClosePop"
                    @click.prevent="close">退出</van-button>
        <van-button type="primary"
                    class="AddClass"
                    @click.prevent="SearchPlanningScheme">搜索</van-button>
      </div>
    </van-popup>
    <!-- 环境调研信息列表 -->
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
                <img src="../../assets/HDFN.png"
                     alt="">
                <h1 style="height: 1rem;color: black; font-size: .5rem;line-height: 1rem;font-weight: 700; font-family: '楷体'; margin-left: 45px;">{{ item.Title }}</h1>
              </div>
              <van-cell :border="false"
                        title="负责人:"
                        style="padding-left:30px; padding-right: 30px;">
                {{ item.FuZeRen }}
              </van-cell>
              <van-cell :border="false"
                        title="预计招生人数:"
                        style="padding-left:30px; padding-right: 30px;">
                {{ item.YuJiZhaoShengShu }}
              </van-cell>
              <van-cell :border="false"
                        title="实际招生人数:"
                        style="padding-left:30px; padding-right: 30px;">
                {{ item.ZhaoShengShu }}
              </van-cell>
              <van-cell :border="false"
                        title="来访人数:"
                        style="padding-left:30px; padding-right: 30px;">
                {{ item.LaiFangRenShu }}
              </van-cell>
              <van-cell :border="false"
                        title="开始时间:"
                        style="padding-left:30px; padding-right: 30px;">
                {{ item.StartDate}}
              </van-cell>
              <van-cell :border="false"
                        title="结束时间:"
                        style="padding-left:30px; padding-right: 30px;">
                {{ item.EndDate }}
              </van-cell>
              <van-cell :border="false"
                        title="地址:"
                        style="padding-left:30px; padding-right: 30px;">
                {{ item.DiZhi }}
              </van-cell>
              <van-cell :border="false"
                        title="简介:"
                        style="padding-left:30px; padding-right: 30px;">
                {{ item.JianJie }}
              </van-cell>
              <van-cell :border="false"
                        title="缘由背景:"
                        style="padding-left:30px; padding-right: 30px;">
                {{ item.BeiJing }}
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
        <!-- 添加环境调研信息表 -->
        <van-popup v-model="AddListshow"
                   style="width: 80%;">
          <form action="/"
                method="POST"
                ref="AddListForm"
                :model="AddListForm">
            <van-cell-group>
              <div>
                <span style="font-size: .39rem; color: black; margin-left: .5rem; margin-right: 10px; font-weight: 700; font-family: '楷体';">方案名称:</span>
                <van-field v-model="AddListForm.Title"
                           placeholder="请输入方案名称"
                           style="display:inline-block; width: 55%;" />
              </div>
              <div>
                <span style="font-size: .39rem; color: black; margin-left: .5rem; margin-right: 10px; font-weight: 700; font-family: '楷体';">负责人:</span>
                <van-field v-model="AddListForm.FuZeRen"
                           placeholder="请输入负责人姓名"
                           style="display:inline-block; width: 55%;" />
              </div>
              <div>
                <span style="font-size: .39rem; color: black; margin-left: .5rem; margin-right: 10px; font-weight: 700; font-family: '楷体';">开始时间:</span>
                <van-field v-model="AddListForm.StartDate"
                           placeholder="请输入开始时间"
                           style="display:inline-block; width: 55%;" />
              </div>
              <div>
                <span style="font-size: .39rem; color: black; margin-left: .5rem; margin-right: 10px; font-weight: 700; font-family: '楷体';">结束时间:</span>
                <van-field v-model="AddListForm.EndDate"
                           placeholder="请输入结束时间"
                           style="display:inline-block; width: 55%;" />
              </div>
              <div>
                <span style="font-size: .39rem; color: black; margin-left: .5rem; margin-right: 10px; font-weight: 700; font-family: '楷体';">简介:</span>
                <van-field v-model="AddListForm.JianJie"
                           placeholder="请输入简介"
                           style="display:inline-block; width: 55%;" />
              </div>
              <div>
                <span style="font-size: .39rem; color: black; margin-left: .5rem; margin-right: 10px; font-weight: 700; font-family: '楷体';">缘由背景:</span>
                <van-field v-model="AddListForm.BeiJing"
                           placeholder="请输入背景缘由"
                           style="display:inline-block; width: 55%;" />
              </div>
              <div>
                <span style="font-size: .39rem; color: black; margin-left: .5rem; margin-right: 10px; font-weight: 700; font-family: '楷体';">预计招生人数:</span>
                <van-field v-model="AddListForm.YuJiZhaoShengShu"
                           placeholder="请输入预计招生数"
                           style="display:inline-block; width: 55%;" />
              </div>
              <div>
                <span style="font-size: .39rem; color: black; margin-left: .5rem; margin-right: 10px; font-weight: 700; font-family: '楷体';">地址:</span>
                <van-field v-model="AddListForm.DiZhi"
                           placeholder="请输入地址"
                           style="display:inline-block; width: 55%;" />
              </div>
              <div>
                <span style="font-size: .39rem; color: black; margin-left: .5rem; margin-right: 10px; font-weight: 700; font-family: '楷体';">活动模版(ID):</span>
                <van-field v-model="AddListForm.HuoDongMoBanId"
                           placeholder="请输入活动模板ID"
                           style="display:inline-block; width: 45%;" />
              </div>
              <div>
                <span style="font-size: .39rem; color: black; margin-left: .5rem; margin-right: 10px; font-weight: 700; font-family: '楷体';">活动内容:</span>
                <van-field v-model="AddListForm.NeiRong"
                           placeholder="请输入活动内容"
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
        <!-- 修改环境调研信息表 -->
        <van-popup v-model="ModifyListshow"
                   style="width: 80%;">
          <form action="/"
                method="POST"
                ref="ModifyListForm"
                :model="dqList">
            <van-cell-group>
              <div>
                <span style="font-size: .39rem; color: black; margin-left: .5rem; margin-right: 10px; font-weight: 700; font-family: '楷体';">方案名称:</span>
                <van-field v-model="dqList.Title"
                           placeholder="请输入方案名称"
                           style="display:inline-block; width: 55%;" />
              </div>
              <div>
                <span style="font-size: .39rem; color: black; margin-left: .5rem; margin-right: 10px; font-weight: 700; font-family: '楷体';">负责人:</span>
                <van-field v-model="dqList.FuZeRen"
                           placeholder="请输入负责人姓名"
                           style="display:inline-block; width: 55%;" />
              </div>
              <div>
                <span style="font-size: .39rem; color: black; margin-left: .5rem; margin-right: 10px; font-weight: 700; font-family: '楷体';">开始时间:</span>
                <van-field v-model="dqList.StartDate"
                           placeholder="请输入开始时间"
                           style="display:inline-block; width: 55%;" />
              </div>
              <div>
                <span style="font-size: .39rem; color: black; margin-left: .5rem; margin-right: 10px; font-weight: 700; font-family: '楷体';">结束时间:</span>
                <van-field v-model="dqList.EndDate"
                           placeholder="请输入结束时间"
                           style="display:inline-block; width: 55%;" />
              </div>
              <div>
                <span style="font-size: .39rem; color: black; margin-left: .5rem; margin-right: 10px; font-weight: 700; font-family: '楷体';">简介:</span>
                <van-field v-model="dqList.JianJie"
                           placeholder="请输入简介"
                           style="display:inline-block; width: 55%;" />
              </div>
              <div>
                <span style="font-size: .39rem; color: black; margin-left: .5rem; margin-right: 10px; font-weight: 700; font-family: '楷体';">缘由背景:</span>
                <van-field v-model="dqList.BeiJing"
                           placeholder="请输入背景缘由"
                           style="display:inline-block; width: 55%;" />
              </div>
              <div>
                <span style="font-size: .39rem; color: black; margin-left: .5rem; margin-right: 10px; font-weight: 700; font-family: '楷体';">预计招生人数:</span>
                <van-field v-model="dqList.YuJiZhaoShengShu"
                           placeholder="请输入预计招生数"
                           style="display:inline-block; width: 55%;" />
              </div>
              <div>
                <span style="font-size: .39rem; color: black; margin-left: .5rem; margin-right: 10px; font-weight: 700; font-family: '楷体';">地址:</span>
                <van-field v-model="dqList.DiZhi"
                           placeholder="请输入地址"
                           style="display:inline-block; width: 55%;" />
              </div>
              <div>
                <span style="font-size: .39rem; color: black; margin-left: .5rem; margin-right: 10px; font-weight: 700; font-family: '楷体';">活动模版(ID):</span>
                <van-field v-model="dqList.HuoDongMoBanId"
                           placeholder="请输入活动模板ID"
                           style="display:inline-block; width: 45%;" />
              </div>
              <div>
                <span style="font-size: .39rem; color: black; margin-left: .5rem; margin-right: 10px; font-weight: 700; font-family: '楷体';">活动内容:</span>
                <van-field v-model="dqList.NeiRong"
                           placeholder="请输入活动内容"
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
import { PlanningScheme } from '@/api/PlanningScheme'
import { DelectList17 } from '@/api/Delect'
import { AddList18 } from '@/api/AddList'
import { ModifyList18 } from '@/api/ModifyList'
import { SearchPlanningScheme } from '@/api/Search'
export default {
    name: 'StaffAdmin',
    data () {
        return {
            Search: {
                G_Title_Like: '',
                G_FuZeRen_Like: ''
            },
            AddListForm: {
                Title: '',
                FuZeRen: '',
                StartDate: '',
                EndDate: '',
                JianJie: '',
                BeiJing: '',
                YuJiZhaoShengShu: '',
                DiZhi: '',
                HuoDongMoBanId: '',
                NeiRong: '',
                Id: ''
            },
            ModifyListForm: {
                Title: '',
                FuZeRen: '',
                StartDate: '',
                EndDate: '',
                JianJie: '',
                BeiJing: '',
                YuJiZhaoShengShu: '',
                DiZhi: '',
                HuoDongMoBanId: '',
                NeiRong: '',
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
    // 页面一进入加载环境调研信息表
        this.loadPlanningSchemeList()
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
        async loadPlanningSchemeList () {
            let channels = []
            const data = await PlanningScheme()
            this.Total = data.length
            console.log(this.Total)
            this.channels = data
            channels = this.channels
            return channels
        },
        async onLoad () {
            const data = await this.loadPlanningSchemeList()
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
                const listId17 = this.currentList.Id
                const data = await DelectList17(listId17)
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
            const data = await AddList18(this.AddListForm)
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
            const data = await ModifyList18(this.dqList)
            this.ModifyList2 = data
            this.ModifyListshow = false
            this.$toast.success('修改成功')
            window.location.reload()
        },
        async SearchPlanningScheme () {
            const data = await SearchPlanningScheme(this.Search)
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
    .van-nav-bar__text {
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
      margin-left: 45px;
    }
    h1 {
      display: inline-block;
    }
  }
}
</style>

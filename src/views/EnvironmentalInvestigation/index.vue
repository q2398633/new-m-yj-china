<template>
  <div class="parentAdmin">
    <!-- NavBar 顶部导航 -->
    <van-nav-bar title="环境调研"
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
    <!-- 搜索环境调研信息 -->
    <van-popup v-model="show"
               position="bottom"
               :style="{width: '100%'}"
               close-icon="close">
      <van-cell-group>
        <div style="font-size: 30px; width: 96.2%; height: 53px; line-height: 53px; color: white; font-family: '楷体'; background: #0199ff; padding-left:15px;">搜索环境调研信息</div>
        <van-field label="园所名称:"
                   label-width="70px"
                   autosize
                   name="G_Title_Like"
                   prop="G_Title_Like"
                   v-model="Search.G_Title_Like"
                   placeholder="请输入园所名称" />
        <van-field label="园长姓名:"
                   label-width="70px"
                   autosize
                   name="G_YuanZhangXingMing_Like"
                   prop="G_YuanZhangXingMing_Like"
                   v-model="Search.G_YuanZhangXingMing_Like"
                   placeholder="请输入园长姓名" />
        <van-field label="联系电话:"
                   label-width="70px"
                   autosize
                   name="G_LianXiDianHua_Like"
                   prop="G_LianXiDianHua_Like"
                   v-model="Search.G_LianXiDianHua_Like"
                   placeholder="请输入联系电话" />
      </van-cell-group>
      <div class="submit">
        <van-button type="info"
                    class="ClosePop"
                    @click.prevent="close">退出</van-button>
        <van-button type="primary"
                    class="AddClass"
                    @click.prevent="SearchEnvironmentalInvestigation">搜索</van-button>
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
                <img src="../../assets/HJDY.jpg"
                     alt="">
                <h1 style="height: 1rem;color: black; font-size: .5rem;line-height: 1rem;font-weight: 700; font-family: '楷体'; margin-left: 45px;">{{ item.Title }}</h1>
              </div>
              <van-cell :border="false"
                        title="园所地址:"
                        style="padding-left:30px; padding-right: 30px;">
                {{ item.DiZhi }}
              </van-cell>
              <van-cell :border="false"
                        title="距离(千米):"
                        style="padding-left:30px; padding-right: 30px;">
                {{ item.JuLi }}
              </van-cell>
              <van-cell :border="false"
                        title="教师人数:"
                        style="padding-left:30px; padding-right: 30px;">
                {{ item.JiaoShiRenShu }}
              </van-cell>
              <van-cell :border="false"
                        title="园长姓名:"
                        style="padding-left:30px; padding-right: 30px;">
                {{ item.YuanZhangXingMing }}
              </van-cell>
              <van-cell :border="false"
                        title="师幼比:"
                        style="padding-left:30px; padding-right: 30px;">
                {{ item.ShiYouBi}}
              </van-cell>
              <van-cell :border="false"
                        title="教师学历:"
                        style="padding-left:30px; padding-right: 30px;">
                {{ item.JiaoShiXueLi }}
              </van-cell>
              <van-cell :border="false"
                        title="联系电话:"
                        style="padding-left:30px; padding-right: 30px;">
                {{ item.LianXiDianHua }}
              </van-cell>
              <van-cell :border="false"
                        title="园所级类:"
                        style="padding-left:30px; padding-right: 30px;">
                {{ item.YuanSuoJiBie1 }}
              </van-cell>
              <van-cell :border="false"
                        title="园所级类3:"
                        style="padding-left:30px; padding-right: 30px;">
                {{ item.YuanSuoJiBie3 }}
              </van-cell>
              <van-cell :border="false"
                        title="园所性质:"
                        style="padding-left:30px; padding-right: 30px;">
                {{ item.YuanSuoXingZhi }}
              </van-cell>
              <van-cell :border="false"
                        title="托费类型:"
                        style="padding-left:30px; padding-right: 30px;">
                {{ item.TuoFeiLeiXing }}
              </van-cell>
              <van-cell :border="false"
                        title="托费价格:"
                        style="padding-left:30px; padding-right: 30px;">
                {{ item.TuoFei }}
              </van-cell>
              <van-cell :border="false"
                        title="周边知名度:"
                        style="padding-left:30px; padding-right: 30px;">
                {{ item.ZhouBianZhiMingDu }}星
              </van-cell>
              <van-cell :border="false"
                        title="人气人数质量:"
                        style="padding-left:30px; padding-right: 30px;">
                {{ item.RenQiRenShuZhiLiang }}星
              </van-cell>
              <van-cell :border="false"
                        title="教育特色:"
                        style="padding-left:30px; padding-right: 30px;">
                {{ item.ZongJia }}
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
                <span style="font-size: .39rem; color: black; margin-left: .5rem; margin-right: 10px; font-weight: 700; font-family: '楷体';">名称:</span>
                <van-field v-model="AddListForm.Title"
                           placeholder="请输入名称"
                           style="display:inline-block; width: 55%;" />
              </div>
              <div>
                <span style="font-size: .39rem; color: black; margin-left: .5rem; margin-right: 10px; font-weight: 700; font-family: '楷体';">类型:</span>
                <van-field v-model="AddListForm.Type"
                           placeholder="请输入类型"
                           style="display:inline-block; width: 55%;" />
              </div>
              <div>
                <span style="font-size: .39rem; color: black; margin-left: .5rem; margin-right: 10px; font-weight: 700; font-family: '楷体';">购置日期:</span>
                <van-field v-model="AddListForm.GouZhiRiQi"
                           placeholder="请输入购置日期"
                           style="display:inline-block; width: 55%;" />
              </div>
              <div>
                <span style="font-size: .39rem; color: black; margin-left: .5rem; margin-right: 10px; font-weight: 700; font-family: '楷体';">入账日期:</span>
                <van-field v-model="AddListForm.RuZhangRiQi"
                           placeholder="请输入入账日期"
                           style="display:inline-block; width: 55%;" />
              </div>
              <div>
                <span style="font-size: .39rem; color: black; margin-left: .5rem; margin-right: 10px; font-weight: 700; font-family: '楷体';">原值:</span>
                <van-field v-model="AddListForm.YuanZhi"
                           placeholder="请输入原值"
                           style="display:inline-block; width: 55%;" />
              </div>
              <div>
                <span style="font-size: .39rem; color: black; margin-left: .5rem; margin-right: 10px; font-weight: 700; font-family: '楷体';">入账价值:</span>
                <van-field v-model="AddListForm.RuZhangJiaZhi"
                           placeholder="请输入入账价值"
                           style="display:inline-block; width: 55%;" />
              </div>
              <div>
                <span style="font-size: .39rem; color: black; margin-left: .5rem; margin-right: 10px; font-weight: 700; font-family: '楷体';">计量单位:</span>
                <van-field v-model="AddListForm.JiLiangDanWei"
                           placeholder="请输入您的计量单位"
                           style="display:inline-block; width: 55%;" />
              </div>
              <div>
                <span style="font-size: .39rem; color: black; margin-left: .5rem; margin-right: 10px; font-weight: 700; font-family: '楷体';">总量:</span>
                <van-field v-model="AddListForm.Total"
                           placeholder="请输入总量"
                           style="display:inline-block; width: 55%;" />
              </div>
              <div>
                <span style="font-size: .39rem; color: black; margin-left: .5rem; margin-right: 10px; font-weight: 700; font-family: '楷体';">使用月:</span>
                <van-field v-model="AddListForm.ShiYongYue"
                           placeholder="请输入使用月"
                           style="display:inline-block; width: 55%;" />
              </div>
              <div>
                <span style="font-size: .39rem; color: black; margin-left: .5rem; margin-right: 10px; font-weight: 700; font-family: '楷体';">残值率:</span>
                <van-field v-model="AddListForm.CanZhiLv"
                           placeholder="请输入残值率"
                           style="display:inline-block; width: 55%;" />
              </div>
              <div>
                <span style="font-size: .39rem; color: black; margin-left: .5rem; margin-right: 10px; font-weight: 700; font-family: '楷体';">编号:</span>
                <van-field v-model="AddListForm.BianHao"
                           placeholder="请输入编号"
                           style="display:inline-block; width: 55%;" />
              </div>
              <div>
                <span style="font-size: .39rem; color: black; margin-left: .5rem; margin-right: 10px; font-weight: 700; font-family: '楷体';">规格:</span>
                <van-field v-model="AddListForm.GuiGe"
                           placeholder="请输入规格"
                           style="display:inline-block; width: 55%;" />
              </div>
              <div>
                <span style="font-size: .39rem; color: black; margin-left: .5rem; margin-right: 10px; font-weight: 700; font-family: '楷体';">存放地点:</span>
                <van-field v-model="AddListForm.CunFangDiDian"
                           placeholder="请输入存放地点"
                           style="display:inline-block; width: 55%;" />
              </div>
              <div>
                <span style="font-size: .39rem; color: black; margin-left: .5rem; margin-right: 10px; font-weight: 700; font-family: '楷体';">用途:</span>
                <van-field v-model="AddListForm.YongTu"
                           placeholder="请输入用途"
                           style="display:inline-block; width: 55%;" />
              </div>
              <div>
                <span style="font-size: .39rem; color: black; margin-left: .5rem; margin-right: 10px; font-weight: 700; font-family: '楷体';">购置类型:</span>
                <van-field v-model="AddListForm.GouZhiLeiXing"
                           placeholder="请输入购置类型"
                           style="display:inline-block; width: 55%;" />
              </div>
              <div>
                <span style="font-size: .39rem; color: black; margin-left: .5rem; margin-right: 10px; font-weight: 700; font-family: '楷体';">供应商:</span>
                <van-field v-model="AddListForm.GongYingShang"
                           placeholder="请输入供应商"
                           style="display:inline-block; width: 55%;" />
              </div>
              <div>
                <span style="font-size: .39rem; color: black; margin-left: .5rem; margin-right: 10px; font-weight: 700; font-family: '楷体';">产地:</span>
                <van-field v-model="AddListForm.ChanDi"
                           placeholder="请输入产地"
                           style="display:inline-block; width: 55%;" />
              </div>
              <div>
                <span style="font-size: .39rem; color: black; margin-left: .5rem; margin-right: 10px; font-weight: 700; font-family: '楷体';">使用地:</span>
                <van-field v-model="AddListForm.ShiYongDi"
                           placeholder="请输入使用地"
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
                <span style="font-size: .39rem; color: black; margin-left: .5rem; margin-right: 10px; font-weight: 700; font-family: '楷体';">名称:</span>
                <van-field v-model="dqList.Title"
                           placeholder="请输入名称"
                           style="display:inline-block; width: 55%;" />
              </div>
              <div>
                <span style="font-size: .39rem; color: black; margin-left: .5rem; margin-right: 10px; font-weight: 700; font-family: '楷体';">类型:</span>
                <van-field v-model="dqList.Type"
                           placeholder="请输入类型"
                           style="display:inline-block; width: 55%;" />
              </div>
              <div>
                <span style="font-size: .39rem; color: black; margin-left: .5rem; margin-right: 10px; font-weight: 700; font-family: '楷体';">购置日期:</span>
                <van-field v-model="dqList.GouZhiRiQi"
                           placeholder="请输入购置日期"
                           style="display:inline-block; width: 55%;" />
              </div>
              <div>
                <span style="font-size: .39rem; color: black; margin-left: .5rem; margin-right: 10px; font-weight: 700; font-family: '楷体';">入账日期:</span>
                <van-field v-model="dqList.RuZhangRiQi"
                           placeholder="请输入入账日期"
                           style="display:inline-block; width: 55%;" />
              </div>
              <div>
                <span style="font-size: .39rem; color: black; margin-left: .5rem; margin-right: 10px; font-weight: 700; font-family: '楷体';">原值:</span>
                <van-field v-model="dqList.YuanZhi"
                           placeholder="请输入原值"
                           style="display:inline-block; width: 55%;" />
              </div>
              <div>
                <span style="font-size: .39rem; color: black; margin-left: .5rem; margin-right: 10px; font-weight: 700; font-family: '楷体';">入账价值:</span>
                <van-field v-model="dqList.RuZhangJiaZhi"
                           placeholder="请输入入账价值"
                           style="display:inline-block; width: 55%;" />
              </div>
              <div>
                <span style="font-size: .39rem; color: black; margin-left: .5rem; margin-right: 10px; font-weight: 700; font-family: '楷体';">计量单位:</span>
                <van-field v-model="dqList.JiLiangDanWei"
                           placeholder="请输入您的计量单位"
                           style="display:inline-block; width: 55%;" />
              </div>
              <div>
                <span style="font-size: .39rem; color: black; margin-left: .5rem; margin-right: 10px; font-weight: 700; font-family: '楷体';">总量:</span>
                <van-field v-model="dqList.Total"
                           placeholder="请输入总量"
                           style="display:inline-block; width: 55%;" />
              </div>
              <div>
                <span style="font-size: .39rem; color: black; margin-left: .5rem; margin-right: 10px; font-weight: 700; font-family: '楷体';">使用月:</span>
                <van-field v-model="dqList.ShiYongYue"
                           placeholder="请输入使用月"
                           style="display:inline-block; width: 55%;" />
              </div>
              <div>
                <span style="font-size: .39rem; color: black; margin-left: .5rem; margin-right: 10px; font-weight: 700; font-family: '楷体';">残值率:</span>
                <van-field v-model="dqList.CanZhiLv"
                           placeholder="请输入残值率"
                           style="display:inline-block; width: 55%;" />
              </div>
              <div>
                <span style="font-size: .39rem; color: black; margin-left: .5rem; margin-right: 10px; font-weight: 700; font-family: '楷体';">编号:</span>
                <van-field v-model="dqList.BianHao"
                           placeholder="请输入编号"
                           style="display:inline-block; width: 55%;" />
              </div>
              <div>
                <span style="font-size: .39rem; color: black; margin-left: .5rem; margin-right: 10px; font-weight: 700; font-family: '楷体';">规格:</span>
                <van-field v-model="dqList.GuiGe"
                           placeholder="请输入规格"
                           style="display:inline-block; width: 55%;" />
              </div>
              <div>
                <span style="font-size: .39rem; color: black; margin-left: .5rem; margin-right: 10px; font-weight: 700; font-family: '楷体';">存放地点:</span>
                <van-field v-model="dqList.CunFangDiDian"
                           placeholder="请输入存放地点"
                           style="display:inline-block; width: 55%;" />
              </div>
              <div>
                <span style="font-size: .39rem; color: black; margin-left: .5rem; margin-right: 10px; font-weight: 700; font-family: '楷体';">用途:</span>
                <van-field v-model="dqList.YongTu"
                           placeholder="请输入用途"
                           style="display:inline-block; width: 55%;" />
              </div>
              <div>
                <span style="font-size: .39rem; color: black; margin-left: .5rem; margin-right: 10px; font-weight: 700; font-family: '楷体';">购置类型:</span>
                <van-field v-model="dqList.GouZhiLeiXing"
                           placeholder="请输入购置类型"
                           style="display:inline-block; width: 55%;" />
              </div>
              <div>
                <span style="font-size: .39rem; color: black; margin-left: .5rem; margin-right: 10px; font-weight: 700; font-family: '楷体';">供应商:</span>
                <van-field v-model="dqList.GongYingShang"
                           placeholder="请输入供应商"
                           style="display:inline-block; width: 55%;" />
              </div>
              <div>
                <span style="font-size: .39rem; color: black; margin-left: .5rem; margin-right: 10px; font-weight: 700; font-family: '楷体';">产地:</span>
                <van-field v-model="dqList.ChanDi"
                           placeholder="请输入产地"
                           style="display:inline-block; width: 55%;" />
              </div>
              <div>
                <span style="font-size: .39rem; color: black; margin-left: .5rem; margin-right: 10px; font-weight: 700; font-family: '楷体';">使用地:</span>
                <van-field v-model="dqList.ShiYongDi"
                           placeholder="请输入使用地"
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
                @click.prevent="AddList">添加新产品</van-button>
  </div>
</template>

<script>
import { EnvironmentalInvestigation } from '@/api/EnvironmentalInvestigation'
import { DelectList16 } from '@/api/Delect'
import { AddList16 } from '@/api/AddList'
import { ModifyList16 } from '@/api/ModifyList'
import { SearchEnvironmentalInvestigation } from '@/api/Search'
export default {
    name: 'StaffAdmin',
    data () {
        return {
            Search: {
                G_Title_Like: '',
                G_YuanZhangXingMing_Like: '',
                G_LianXiDianHua_Like: ''
            },
            AddListForm: {
                BarCode: null,
                Title: '',
                ChanPinTypeId: '',
                GongYingShangId: '',
                DanJia: '',
                CangKuId: '',
                DanWeiId: '',
                Status: '',
                MaxNum: '',
                MinNum: '',
                BeiZhu: '',
                Id: ''
            },
            ModifyListForm: {
                BarCode: null,
                Title: '',
                ChanPinTypeId: '',
                GongYingShangId: '',
                DanJia: '',
                CangKuId: '',
                DanWeiId: '',
                Status: '',
                MaxNum: '',
                MinNum: '',
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
            ModifyList2: [],
            Total: 0
        }
    },
    mounted () {
    },
    created () {
    // 页面一进入加载环境调研信息表
        this.loadEnvironmentalInvestigationList()
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
        async loadEnvironmentalInvestigationList () {
            let channels = []
            const data = await EnvironmentalInvestigation()
            this.Total = data.length
            console.log(this.Total)
            this.channels = data
            channels = this.channels
            return channels
        },
        async onLoad () {
            const data = await this.loadEnvironmentalInvestigationList()
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
                const listId16 = this.currentList.Id
                const data = await DelectList16(listId16)
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
            const data = await AddList16(this.AddListForm)
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
            const data = await ModifyList16(this.dqList)
            this.ModifyList2 = data
            this.ModifyListshow = false
            this.$toast.success('修改成功')
            window.location.reload()
        },
        async SearchEnvironmentalInvestigation () {
            const data = await SearchEnvironmentalInvestigation(this.Search)
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

<template>
  <div class="parentAdmin">
    <!-- NavBar 顶部导航 -->
    <van-nav-bar title="库存清单"
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
    <!-- 搜索库存清单 -->
    <van-popup v-model="show"
               position="bottom"
               :style="{width: '100%'}"
               close-icon="close">
      <van-cell-group>
        <div style="font-size: 30px; width: 96.2%; height: 53px; line-height: 53px; color: white; font-family: '楷体'; background: #0199ff; padding-left:15px;">搜索库存清单</div>
        <van-field label="产品名称:"
                   label-width="70px"
                   autosize
                   name="G_Title_Like"
                   prop="G_Title_Like"
                   v-model="Search.G_Title_Like"
                   placeholder="请输入产品名称" />
        <van-field label="类型:"
                   label-width="70px"
                   autosize
                   name="G_ChanPinType_Like"
                   prop="G_ChanPinType_Like"
                   v-model="Search.G_ChanPinType_Like"
                   placeholder="请输入类型" />
        <van-field label="供应商:"
                   label-width="70px"
                   autosize
                   name="G_GongYingShangTitle_Like"
                   prop="G_GongYingShangTitle_Like"
                   v-model="Search.G_GongYingShangTitle_Like"
                   placeholder="请输入供应商" />
        <van-field label="联系人:"
                   label-width="70px"
                   autosize
                   name="G_GongYingShangName_Like"
                   prop="G_GongYingShangName_Like"
                   v-model="Search.G_GongYingShangName_Like"
                   placeholder="请输入联系人" />
        <van-field label="供应商电话:"
                   label-width="70px"
                   autosize
                   name="G_GongYingShangDianHua_Like"
                   prop="G_GongYingShangDianHua_Like"
                   v-model="Search.G_GongYingShangDianHua_Like"
                   placeholder="请输入供应商电话" />
      </van-cell-group>
      <div class="submit">
        <van-button type="info"
                    class="ClosePop"
                    @click.prevent="close">退出</van-button>
        <van-button type="primary"
                    class="AddClass"
                    @click.prevent="SearchInventory">搜索</van-button>
      </div>
    </van-popup>
    <!-- 资产信息列表 -->
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
                <img src="../../assets/JJ.jpg"
                     alt="">
                <h1 style="height: 1rem;color: black; font-size: .5rem;line-height: 1rem;font-weight: 700; font-family: '楷体'; margin-left: 45px;">{{ item.Title }}</h1>
              </div>
              <van-cell :border="false"
                        title="条形码:"
                        style="padding-left:30px; padding-right: 30px;">
                {{ item.BarCode }}
              </van-cell>
              <van-cell :border="false"
                        title="类型:"
                        style="padding-left:30px; padding-right: 30px;">
                {{ item.ChanPinType }}
              </van-cell>
              <van-cell :border="false"
                        title="供应商:"
                        style="padding-left:30px; padding-right: 30px;">
                {{ item.GongYingShangTitle }}
              </van-cell>
              <van-cell :border="false"
                        title="联系人:"
                        style="padding-left:30px; padding-right: 30px;">
                {{ item.GongYingShangName}}
              </van-cell>
              <van-cell :border="false"
                        title="电话:"
                        style="padding-left:30px; padding-right: 30px;">
                {{ item.GongYingShangDianHua }}
              </van-cell>
              <van-cell :border="false"
                        title="单位:"
                        style="padding-left:30px; padding-right: 30px;">
                {{ item.DanWei }}
              </van-cell>
              <van-cell :border="false"
                        title="单价:"
                        style="padding-left:30px; padding-right: 30px;">
                {{ item.DanJia }}
              </van-cell>
              <van-cell :border="false"
                        title="数量:"
                        style="padding-left:30px; padding-right: 30px;">
                {{ item.Total }}
              </van-cell>
              <van-cell :border="false"
                        title="入库仓库:"
                        style="padding-left:30px; padding-right: 30px;">
                {{ item.CangKuIdName }}
              </van-cell>
              <van-cell :border="false"
                        title="入库时间:"
                        style="padding-left:30px; padding-right: 30px;">
                {{ item.CreateTime }}
              </van-cell>
            </van-swipe-cell>
          </van-cell>
        </van-list>
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
import { Invetory } from '@/api/Invetory'
import { SearchInventory } from '@/api/Search'
export default {
    name: 'StaffAdmin',
    data () {
        return {
            Search: {
                G_Title_Like: '',
                G_ChanPinType_Like: '',
                G_GongYingShangTitle_Like: '',
                G_GongYingShangName_Like: '',
                G_GongYingShangDianHua_Like: ''
            },
            AddListForm: {
                Title: '',
                Type: '',
                GouZhiRiQi: '',
                RuZhangRiQi: '',
                YuanZhi: '',
                RuZhangJiaZhi: '',
                JiLiangDanWei: '',
                Total: null,
                ShiYongYue: '',
                CanZhiLv: null,
                BianHao: '',
                GuiGe: '',
                CunFangDiDian: '',
                YongTu: '',
                GouZhiLeiXing: '',
                GongYingShang: '',
                ChanDi: '',
                ShiYongDi: '',
                Id: ''
            },
            ModifyListForm: {
                Title: '',
                Type: '',
                GouZhiRiQi: '',
                RuZhangRiQi: '',
                YuanZhi: '',
                RuZhangJiaZhi: '',
                JiLiangDanWei: '',
                Total: null,
                ShiYongYue: '',
                CanZhiLv: null,
                BianHao: '',
                GuiGe: '',
                CunFangDiDian: '',
                YongTu: '',
                GouZhiLeiXing: '',
                GongYingShang: '',
                ChanDi: '',
                ShiYongDi: '',
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
    // 页面一进入加载资产信息列表
        this.loadInvetoryList()
        this.Toast.setDefaultOptions({ duration: 2000 })
    },
    methods: {
        back () {
            this.$router.go(-1)
        },
        SideMenu () {
            this.show = true
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
        async loadInvetoryList () {
            let channels = []
            const data = await Invetory()
            this.Total = data.length
            console.log(this.Total)
            this.channels = data
            channels = this.channels
            return channels
        },
        async onLoad () {
            const data = await this.loadInvetoryList()
            this.list = data
            this.isLoading = false
            this.loading = false
            this.finished = true
        },
        async SearchInventory () {
            const data = await SearchInventory(this.Search)
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

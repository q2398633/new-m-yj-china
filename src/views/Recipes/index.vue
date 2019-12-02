<template>
  <div class="parentAdmin">
    <!-- NavBar 顶部导航 -->
    <van-nav-bar title="食谱管理"
                 left-arrow
                 left-text="返回"
                 size="36px"
                 @click-left="back"
                 fixed>
      <van-icon name="wap-nav"
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
        <div style="font-size: 30px; width: 100%; height: 53px; line-height: 53px; color: white; font-family: '楷体'; background: #0199ff; padding-left:15px;">搜索家长</div>
        <van-field clearable
                   autosize
                   label-width="70px"
                   label="姓名:"
                   right-icon="question-o"
                   placeholder="请输入用户名"
                   @click-right-icon="$toast('家长姓名')" />
        <van-field label="性别:"
                   label-width="70px"
                   autosize />
        <van-field label="民族:"
                   label-width="70px"
                   autosize
                   placeholder="请输入民族" />
        <van-field label="入托类型:"
                   label-width="70px"
                   autosize />
        <van-field label="户籍:"
                   label-width="70px"
                   autosize
                   placeholder="请输入户籍" />
      </van-cell-group>
      <div class="submit">
        <van-button type="primary">搜索</van-button>
        <van-button type="info"
                    @click.prevent="close">退出</van-button>
      </div>
    </van-popup>
    <!-- 食谱列表 -->
    <div class="Parent-List">
      <van-pull-refresh v-model="isLoading"
                        @refresh="onRefresh">
        <van-list v-model="loading"
                  :finished="finished"
                  finished-text="没有更多了"
                  @load="onLoad">
          <van-cell v-for="(item) in list"
                    :key="item.Id">
            <span> {{ '名称: '+item.Title }}</span>
            <span> {{ '菜肴类型: '+item.Type }}</span>
            <span> {{ '水分(克): ' +item.Water }}</span>
            <span> {{ '能量(卡路里): ' +item.EnergyKcal }}</span>
            <span> {{ '能量(千焦):' +item.EnergyKj }}</span>
            <span> {{ '蛋白质(克):' +item.Protein }}</span>
            <span> {{ '脂肪(克):' +item.Fat }}</span>
            <span> {{ '碳水化合物(克):' +item.CHO }}</span>
            <span> {{ '膳食纤维(克):' +item.DietaryFiber }}</span>
            <span> {{ '可溶性膳食纤维(克):' +item.DietaryFiberS }}</span>
            <span> {{ '不溶性膳食纤维(克):' +item.DietaryFiberI }}</span>
            <span> {{ '胆固醇(毫克):' +item.Cholesterol }}</span>
            <span> {{ '灰分(克):' +item.Ash }}</span>
            <span> {{ '维生素A(微克):' +item.VitA }}</span>
            <span> {{ '胡萝卜素(微克):' +item.Carotene }}</span>
            <span> {{ '硫胺素(毫克):' +item.Thiamin }}</span>
            <span> {{ '核黄素(毫克):' +item.Riboflavin }}</span>
            <span> {{ '维生素B6(毫克):' +item.VitB6 }}</span>
            <span> {{ '维生素B12(微克):' +item.VitB12 }}</span>
            <span> {{ '叶酸(微克):' +item.Folate }}</span>
            <span> {{ '烟酸(毫克):' +item.Niacin }}</span>
            <span> {{ '维生素C(毫克):' +item.VitC }}</span>
            <span> {{ '维生素E(毫克):' +item.VitE }}</span>
            <span> {{ '维生素Ea(毫克):' +item.VitEa }}</span>
            <span> {{ '钙(毫克):' +item.Ca }}</span>
            <span> {{ '磷(毫克):' +item.P }}</span>
            <span> {{ '钾(毫克):' +item.K }}</span>
            <span> {{ '钠(毫克):' +item.Na }}</span>
            <span> {{ '镁(毫克):' +item.Mg }}</span>
            <span> {{ '铁(毫克):' +item.Fe }}</span>
            <span> {{ '锌(毫克):' +item.Zn }}</span>
            <span> {{ '硒(微克):' +item.Se }}</span>
            <span> {{ '铜(毫克):' +item.Cu }}</span>
            <span> {{ '锰(毫克):' +item.Mn }}</span>
            <span> {{ '碘(微克):' +item.I }}</span>
            <span> {{ '创建时间:' +item.CreateTime }}</span>
          </van-cell>
        </van-list>
      </van-pull-refresh>
      <!-- 分页 -->
      <van-pagination v-model="currentPage"
                      :total-items="10"
                      :show-page-size="10"
                      force-ellipses
                      style="position:fixed; bottom: 0; width: 100%; background: white;" />

    </div>
  </div>
</template>

<script>
import { RecipesList } from '@/api/Recipes'
export default {
    name: 'StaffAdmin',
    data () {
        return {
            show: false,
            isLoading: false,
            loading: false,
            finished: false,
            list: [],
            currentPage: 1
        }
    },
    created () {
    // 页面一进入加载评测列表
        this.loadRecipesList()
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
            }, 500)
        },
        async loadRecipesList () {
            let channels = []
            const data = await RecipesList()
            this.channels = data
            channels = this.channels
            console.log(channels)
            return channels
        },
        async onLoad () {
            const data = await this.loadRecipesList()
            this.list = data
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
    margin-top: 70px;
  }
  .van-popup {
    width: 100%;
  }
  .van-cell {
    width: 100%;
    margin-top: 20px;
    border-bottom: 1px solid #ccc;
    padding-left: 200px;
    span:nth-child(1) {
      font-size: 30px;
    }

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
  .van-cell-group {
    width: 100%;

    .van-field {
      width: 100%;
    }
  }
}
</style>

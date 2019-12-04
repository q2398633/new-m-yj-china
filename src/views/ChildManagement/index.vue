<template>
  <div class="Home">
    <!-- NavBar 顶部导航 -->
    <van-nav-bar title="幼儿管理"
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
    <!-- 搜索菜单 -->
    <van-popup v-model="show"
               position="bottom"
               :style="{width: '100%', background: '#524c4c' }"
               close-icon="close">
      <van-cell-group>
        <div style="font-size: 30px; width: 100%; height: 53px; line-height: 53px; color: white; font-family: '楷体'; background: #0199ff; padding-left:15px;">搜索幼儿</div>
        <van-field clearable
                   autosize
                   label-width="70px"
                   label="姓名:"
                   right-icon="question-o"
                   placeholder="请输入用户名"
                   @click-right-icon="$toast('宝宝姓名')" />

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
                   placeholder="选择生日"
                   @click.prevent="Birthday" />
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
        <van-button type="primary">搜索</van-button>
        <van-button type="info"
                    @click.prevent="close">退出</van-button>
      </div>
    </van-popup>
    <!-- 幼儿列表 -->
    <div class="Top-Nav">
      <van-pull-refresh v-model="isLoading"
                        @refresh="onRefresh">
        <van-list v-model="loading"
                  :finished="finished"
                  finished-text="没有更多了"
                  @load="onLoad">

          <van-cell v-for="(item) in list"
                    :key="item.RealName">
            <van-swipe-cell>
              <van-cell :border="false"
                        title="姓名">
                {{ item.Title }}
              </van-cell>
              <van-cell :border="false"
                        title="班级">
                {{ item.BanJi }}
              </van-cell>
              <van-cell :border="false"
                        title="性别">
                {{ item.XingBie }}
              </van-cell>
              <van-cell :border="false"
                        title="民族">
                {{ item.MinZu }}
              </van-cell>
              <van-cell :border="false"
                        title="入园时间">
                {{ item.RuTuoRiQi }}
              </van-cell>
              <van-cell :border="false"
                        title="状态">
                {{ item.状态 }}
              </van-cell>
              <template slot="right">
                <van-button square
                            type="danger"
                            text="删除" />
                <van-button square
                            type="primary"
                            text="收藏" />
              </template>
            </van-swipe-cell>
          </van-cell>
        </van-list>
      </van-pull-refresh>
    </div>
    <!-- 分页 -->
    <van-pagination v-model="
                    currentPage"
                    :total-items="10"
                    :show-page-size="10"
                    force-ellipses
                    style="position:fixed; bottom: 0; width: 100%; background: white;" />
  </div>
</template>

<script>
import { getList } from '@/api/channel'
export default {
    name: 'SignInRule',
    data () {
        return {
            show: false,
            list: [],
            loading: false,
            finished: false,
            currentPage: 1,
            isLoading: false,
            BirthdayShow: false,
            InNurseryShow: false
        }
    },
    created () {
    // 加载频道列表
        this.loadchannle()
    },
    mounted () {

    },
    methods: {
        back () {
            this.$router.go(-1)
        },
        SideMenu () {
            this.show = true
        },
        onRefresh () {
            setTimeout(() => {
                this.$toast('刷新成功')
                this.isLoading = false
            }, 500)
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
        async DelectList () {
        },
        async loadchannle () {
            let channels = []
            const data = await getList()
            this.channels = data
            channels = this.channels
            return channels
        },
        async onLoad () {
            const data = await this.loadchannle()
            this.list = data
        }
    }
}
</script>

<style lang="less" scoped>
.Home {
  width: 100%;
  height: 22.66667rem;
  .van-list {
    margin-top: 130px;
  }
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
  .Top-Nav {
    width: 100%;
  }
  .van-field {
    color: black;
  }
  .submit {
    width: 100%;
    height: 140px;
    background: white;
    button {
      margin-left: 180px;
    }
  }
  .van-popup {
    width: 100%;
  }
  .van-cell {
    width: 100%;
    margin-top: 20px;
    border-bottom: 1px solid #ccc;

    span {
      display: inline-block;
      width: 55%;
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
      padding: 0 0 0 30px;
    }
  }
  .van-cell {
    padding: 0;
  }
  .van-button {
    height: null;
  }
}
</style>

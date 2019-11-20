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
    <!-- 侧边菜单 -->
    <van-popup v-model="show"
               position="bottom"
               :style="{width: '100%', background: '#524c4c' }"
               close-icon="close">
      <van-cell-group>
        <div style="font-size: 30px; color: white; font-family: '楷体'; background: #524c4c; margin-left: 15px;">搜索幼儿</div>
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
                   placeholder="选择生日" />
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
                   placeholder="请输入入托日期" />
        <van-field label="入托类型:"
                   label-width="70px"
                   autosize />
        <van-field label="户籍:"
                   label-width="70px"
                   autosize
                   placeholder="请输入户籍" />
      </van-cell-group>
      <div class="submit">
        <van-button plain
                    hairline
                    round
                    type="primary">搜索</van-button>
        <van-button plain
                    hairline
                    round
                    type="info">退出</van-button>
      </div>
    </van-popup>
    <!--通知栏 -->
    <van-notice-bar mode="closeable"
                    left-icon="volume-o">{{ news }}</van-notice-bar>
    <!-- 导航页 -->
    <div class="Top-Nav">

      <van-tabs v-model="active"
                class="channel-tabs">
        <van-tab v-for="(item) in channels"
                 :key='item.id'
                 :title="item.name">
          <van-pull-refresh v-model="isLoading"
                            @refresh="onRefresh">
            <van-list v-model="loading"
                      :finished="finished"
                      finished-text="没有更多了"
                      @load="onLoad">
              <van-cell v-for="item in list"
                        :key="item"
                        :title="item" />
            </van-list>
          </van-pull-refresh>
        </van-tab>
        <van-tab title="小班"></van-tab>
        <van-tab title="中班"></van-tab>
        <van-tab title="大班"></van-tab>
        <van-tab title="学前班"></van-tab>
      </van-tabs>
    </div>
    <!-- 底部tabbar -->
    <van-tabbar v-model="active"
                active-color="#07c160"
                inactive-color="#000">
      <van-tabbar-item icon="friends">亲子班</van-tabbar-item>
      <van-tabbar-item icon="smile">小班</van-tabbar-item>
      <van-tabbar-item icon="manager">中班</van-tabbar-item>
      <van-tabbar-item icon="good-job">大班</van-tabbar-item>
      <van-tabbar-item icon="diamond">学前班</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
import getChannelsDefaultOrUser from '../../api/channel'

import store from '../../store'
export default {
    name: 'SignInRule',
    data () {
        return {
            show: false,
            news: '据中国银行保险监督管理委员会网站11月18日消息，中国建设银行两家分行因严重违反审慎经营规则，分别给予30万元罚款的行政处罚，并责令改正',
            list: [],
            loading: false,
            finished: false,
            currentPage: 1,
            isLoading: false,
            active: 0
        }
    },
    created () {

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
        onLoad () {
            // 异步更新数据
            setTimeout(() => {
                for (let i = 0; i < 10; i++) {
                    this.list.push(this.list.length + 1)
                }
                // 加载状态结束
                this.loading = false

                // 数据全部加载完成
                if (this.list.length >= 40) {
                    this.finished = true
                }
            }, 500)
        },
        onRefresh () {
            setTimeout(() => {
                this.$toast('刷新成功')
                this.isLoading = false
                this.count++
            }, 500)
        },
        async loadchannels () {
            const { user } = store.state
            // 如果用户未登录
            if (!user) {
                const localChannels = JSON.parse(
                    window.localStorage.getItem('channels')
                )
                // 如果有本地数据缓存
                if (localChannels) {
                    this.channels = localChannels
                } else {
                    // 如果没有本地数据缓存
                    const data = await getChannelsDefaultOrUser()
                    this.channels = data.channels
                }
            } else {
                // 如果用户是正常登陆
                const data = await getChannelsDefaultOrUser()
                this.channels = data.channels
            }
        },
        async loadChannels () {
            const { user } = store.state
            const localChannels = JSON.parse(window.localStorage.getItem(channels))
            if (!user && localChannels) this.channels = localChannels
            // 如果用户没登陆且没有本地数据 或用户已登陆
            if ((!user && !localChannels) || user) {
                const data = await getChannelsDefaultOrUser()
                // 规范channels数据结构
                data.channels.forEach(item => {
                    item.articles = [] // 当前列表数据
                    item.downPullLoading = false // 当前下拉状态
                    item.upPullLoading = false // 当前上拉加载更多
                    item.upPullFinished = false // 当前加载完毕
                })
                this.channels = data.channels
            }
        }
    }
}
</script>

<style lang="less" scoped>
.Home {
  width: 100%;
  height: 22.66667rem;
  background: #524c4c;

  .van-nav-bar {
    background: #524c4c;
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
    background: #524c4c;
    color: white;
  }
  .van-cell-group {
    padding: 20px;
    background: #524c4c;
  }
  .submit {
    width: 100%;
    height: 140px;

    button {
      background: #524c4c;
      margin-left: 100px;
    }
  }
}
</style>

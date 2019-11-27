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
    <!--通知栏 -->
    <van-notice-bar mode="closeable"
                    left-icon="volume-o">{{ news }}</van-notice-bar>
    <!-- 导航页 -->
    <div class="Top-Nav">
      <van-pull-refresh v-model="isLoading"
                        @refresh="onRefresh">
        <van-list v-model="loading"
                  :finished="finished"
                  finished-text="没有更多了"
                  @load="onLoad">
          <van-cell v-for="(item) in list"
                    :key="item.Id">
            <span> {{ '姓名: '+item.RealName }}</span>
            <span> {{ '班级: '+item.BanJi }}</span>
            <span> {{ '性别:' + item.XingBie }}</span>
            <span> {{ '民族: '+item.MinZu }}</span>
            <span style="width: 75%;"> {{ '入园时间:'+item.RuTuoRiQi }}</span>
            <span> {{ '状态:' + item.Status }}</span>
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
            InNurseryShow: false,
            news: '据悉，京东某副总裁在朋友圈披露今天的京东集团早会上，刘强东 宣布了一个政策：以后京东的员工只要是在任职期间无论因为什么原因遭遇不幸，公司都将负责其所有孩子一直到22岁'
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
        async loadchannle () {
            let channels = []
            const data = await getList()
            this.channels = data
            channels = this.channels
            console.log(channels)
            return channels
        },
        async onLoad () {
            const data = await this.loadchannle()
            this.list = data
            console.log('----------1')
            console.log(this.list[0])
            console.log('----------2')
        }
    }
}
</script>

<style lang="less" scoped>
.Home {
  width: 100%;
  height: 22.66667rem;
  .van-list {
    margin-top: 70px;
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

    .van-tabs {
      position: fixed;
      width: 100%;
      top: 90px;
      z-index: 100;
    }
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

    span {
      display: inline-block;
      width: 25%;
    }
  }
}
</style>

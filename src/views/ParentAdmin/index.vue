<template>
  <div class="parentAdmin">
    <!-- NavBar 顶部导航 -->
    <van-nav-bar title="家长管理"
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
    <!-- 家长列表 -->
    <div class="Parent-List">
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
                {{ item.RealName }}
              </van-cell>
              <van-cell :border="false"
                        title="手机号">
                {{ item.Mobile }}
              </van-cell>
              <van-cell :border="false"
                        title="关系">
                {{ item.GuanXi }}
              </van-cell>
              <van-cell :border="false"
                        title="常接送人">
                {{ item.IsJieSongRen }}
              </van-cell>
              <van-cell :border="false"
                        title="单位">
                {{ item.WorkPlace }}
              </van-cell>
              <van-cell :border="false"
                        title="身份证号">
                {{ item.IdNumber }}
              </van-cell>
              <van-cell :border="false"
                        title="微信号">
                {{ item.WeChat }}
              </van-cell>
              <van-cell :border="false"
                        title="QQ号">
                {{ item.QQ }}
              </van-cell>
              <van-cell :border="false"
                        title="学生">
                {{ item.StudentIdName }}
              </van-cell>
              <van-cell :border="false"
                        title="学历">
                {{ item.XueLi }}
              </van-cell>
              <van-cell :border="false"
                        title="家庭住址">
                {{ item.ZhuZhi }}
              </van-cell>
              <template slot="right">
                <van-button square
                            type="danger"
                            text="删除" />
                <van-button square
                            type="primary"
                            text="修改" />
              </template>
            </van-swipe-cell>
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
import { ParentList } from '@/api/ParentAdmin'
export default {
    name: 'parentAdmin',
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
    // 加载家长列表
        this.loadParent()
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
        async loadParent () {
            let channels = []
            const data = await ParentList()
            this.channels = data
            channels = this.channels
            console.log(channels)
            return channels
        },
        async onLoad () {
            const data = await this.loadParent()
            this.list = data
            console.log('----------1')
            console.log(this.list[0])
            console.log('----------2')
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
  .van-cell-group {
    width: 100%;

    .van-field {
      width: 50%;
    }
  }
  .van-cell {
    padding: 0;
  }
}
</style>

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
  </div>
</template>

<script>
export default {
    name: 'parentAdmin',
    data () {
        return {

        }
    },
    methods: {
        SideMenu () {
            this.show = true
        },
        close () {
            this.show = false
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
}
</style>

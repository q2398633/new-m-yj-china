<template>
  <div class="Home">
    <!-- NavBar 顶部导航 -->
    <van-nav-bar title="幼儿管理"
                 left-arrow
                 left-text="返回"
                 size="36px"
                 @click-left="back">
      <van-icon name="wap-nav"
                slot="right"
                size="25px"
                @click.prevent="SideMenu" />
    </van-nav-bar>
    <!-- 侧边菜单 -->
    <van-popup v-model="show"
               position="left"
               :style="{ height: '100%', width: '300px', background: '#524c4c' }"
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
      <el-table :data="tableData"
                style="width: 414px; margin-top: 10px;">
        <el-table-column prop="name"
                         label="姓名"
                         width="60px">
        </el-table-column>
        <el-table-column prop="sex"
                         label="性别"
                         width="60px">
        </el-table-column>
        <el-table-column prop="class"
                         label="班级(宝宝班)"
                         width="60px">
        </el-table-column>
        <el-table-column prop="age"
                         label="年龄"
                         width="60px">
        </el-table-column>
        <el-table-column prop="nation"
                         label="民族"
                         width="60px">
        </el-table-column>
        <el-table-column prop="date"
                         label="入托日期"
                         width="60px">
        </el-table-column>
        <el-table-column prop="state"
                         label="状态"
                         width="40px">
        </el-table-column>
      </el-table>
      <van-pagination v-model="currentPage"
                      :total-items="125"
                      :show-page-size="3"
                      force-ellipses
                      style="background: white; margin-top 5px;" />
    </div>
  </div>
</template>

<script>

export default {
    name: 'SignInRule',
    data () {
        return {
            show: false,
            news: '据中国银行保险监督管理委员会网站11月18日消息，中国建设银行两家分行因严重违反审慎经营规则，分别给予30万元罚款的行政处罚，并责令改正',
            tableData: [{
                date: '2016-05-02',
                name: '胡笑笑',
                class: '亲子班',
                age: '0周2月',
                nation: '汉族',
                state: '在园',
                sex: '女'
            },
            {
                date: '2016-05-02',
                name: '胡笑笑',
                class: '亲子班',
                age: '0周2月',
                nation: '汉族',
                state: '在园',
                sex: '女'
            },
            {
                date: '2016-05-02',
                name: '胡笑笑',
                class: '亲子班',
                age: '0周2月',
                nation: '汉族',
                state: '在园',
                sex: '女'
            },
            {
                date: '2016-05-02',
                name: '胡笑笑',
                class: '亲子班',
                age: '0周2月',
                nation: '汉族',
                state: '在园',
                sex: '女'
            }],
            currentPage: 1
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
    height: 220px;
    background: url("../../assets/YRNav.jpg");
    background-repeat: no-repeat;
    background-position: 0px 0px;
    background-size: 100% 100%;
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

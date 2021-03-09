<template>
  <div class="parentAdmin">
    <!-- NavBar 顶部导航 -->
    <van-nav-bar
      title="修改密码"
      left-arrow
      left-text="返回"
      size="36px"
      @click-left="back"
      fixed
    >
    </van-nav-bar>
    <!-- 修改密码 -->
    <div class="ModifyPassWord">
      <form
        action="/"
        method="POST"
        ref="ModifyPassWord"
        :model="ModifyPassWord"
      >
        <div>旧密码:</div>
        <van-cell-group>
          <van-field
            v-model="ModifyPassWord.oldPassword"
            clearable
            right-icon="question-o"
            placeholder="请输入旧密码"
            @click-right-icon="$toast('请输入旧密码')"
          />
        </van-cell-group>
        <div>新密码:</div>
        <van-cell-group>
          <van-field
            v-model="ModifyPassWord.password"
            clearable
            right-icon="question-o"
            placeholder="请输入新密码"
            @click-right-icon="$toast('请输入新密码')"
          />
        </van-cell-group>
        <div>确认密码:</div>
        <van-cell-group>
          <van-field
            v-model="ModifyPassWord.repassword"
            clearable
            right-icon="question-o"
            placeholder="确认新密码"
            @click-right-icon="$toast('确认新密码')"
          />
        </van-cell-group>
      </form>
    </div>
    <div class="ConfirmPassWord">
      <van-button
        type="info"
        style="width:100%; border-radius: 20px;"
        @click.prevent="ModifyPd"
        >确认修改</van-button
      >
    </div>
  </div>
</template>

<script>
import { ModifyPassword } from "@/api/ModifyPassword.js";
export default {
  name: "StaffAdmin",
  data() {
    return {
      ModifyPassWord: {
        oldPassword: "",
        password: "",
        repassword: ""
      }
    };
  },
  mounted() {},
  created() {},
  methods: {
    back() {
      this.$router.go(-1);
    },
    async ModifyPd() {
      const data = await ModifyPassword(this.ModifyPassWord);
      this.$toast.fail(data.msg);
      this.$router.push("/home");
    }
  }
};
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
  .ModifyPassWord {
    margin-top: 100px;
    padding: 40px;
    font-size: 0.5rem;
    color: #0199ff;
    font-weight: 700;
    font-family: "楷体";
  }
}
</style>

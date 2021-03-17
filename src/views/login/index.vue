<template>
  <div class="login_form">
    <!-- LoGo -->
    <div class="login_form_center">
      <!-- 登录表单 -->
      <form action="/" method="POSt" ref="loginForm" ::model="loginForm">
        <div class="login_form_bottom">
          <div class="login_form_top">
            寅卯后台管理系统
          </div>
          <!-- 登录Button -->
          <div class="LoginForm" style="margin-top: 3rem;">
            <div
              style="font-size: .5rem; margin-bottom: 10px; color: #106ecc; font-weight: 700; font-family: 楷体"
            ></div>
            <van-cell-group
              style="margin-top: 0.5rem; background-color: transparent; height: 4rem;"
            >
              <van-field
                name="Account"
                v-model="loginForm.Account"
                clearable
                left-icon="contact"
                prop="Account"
                placeholder="手机号/用户名/邮箱"
                style="background-color: rgb(158 201 222 / 50%); color: black; font-weight: 700; margin-bottom: 1rem;"
              />
              <van-field
                name="Password"
                v-model="loginForm.Password"
                clearable
                left-icon="closed-eye"
                prop="Password"
                type="Password"
                placeholder="密码"
                style="background-color: rgb(158 201 222 / 50%);  color: black; font-weight: 700;"
              />
            </van-cell-group>
            <van-button
              :loading="loginloading"
              loading-type="spinner"
              loading-size="30px"
              color="linear-gradient(to right, #4bb0ff, #6149f6)"
              style="margin-bottom: 3px; width: 100%; "
              block
              round
              icon="contact"
              @click.prevent="Login"
              >登录</van-button
            >
            <div class="footer">
              <span class="LoginText">忘记密码</span>
              <span class="LoginText">|</span>
              <span class="LoginText">帮助</span>
            </div>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>
<script>
import { login } from "@/api/user";

export default {
  name: "Login",
  data() {
    return {
      loginForm: {
        Account: "test",
        AppKey: "ymkjoa",
        Password: "test"
      },
      loginloading: false
    };
  },
  created() {},
  methods: {
    async Login() {
      this.$toast.loading({
        message: "登录中...", // 提示文本
        forbidClick: true, // 禁止背景点击
        duration: 0 // 展示时长(ms)，值为 0 时，toast 不会消失
      });
      try {
        const { data } = await login(this.loginForm);
        // 4. 处理响应结果
        this.$toast.success("登录成功");

        // 将后端返回的用户登录状态（token等数据）放到 Vuex 容器中
        this.$store.commit("setUser", data);

        // 登录成功，跳转幼儿列表页
        this.$router.push("/ChildManagement");
      } catch (err) {
        this.$toast.fail("登录失败，账号或密码错误");
      }
    }
  },
  mounted() {}
};
</script>

<style lang="less" scoped>
* {
  margin: 0;
  padding: 0;
}
.login_form {
  width: 100%;
  height: 1400px;
  float: left;
  position: absolute;
  left: 0;
  top: 0;
  // background: url("../../assets/BG2.jpg") no-repeat center / cover;
  background-image: url("../../assets/LGBG.jpg");
  background-repeat: no-repeat;
  background-size: 100% 100%;
  -moz-background-size: 100% 100%;
  .nav {
    background: linear-gradient(to right, #4bb0ff, #6149f6);
    font-family: "楷体";

    .van-nav-bar__title {
      font-size: 48px;
      color: white;
    }
  }
  .login_form_center {
    width: 9rem;
    height: 11rem;
    position: absolute;
    top: 3rem;
    left: 0.4767rem;
    .login_form_bottom {
      width: 600px;
      height: 10rem;
      background-color: transparent;
      opacity: 1;
      border-radius: 20px;
      margin: -20px 0 0 38px;

      .login_form_top {
        width: 100%;
        font-size: 1rem;
        font-family: '楷体';
      }
    }
    .footer {
      padding: 30px;

      .LoginText {
        font-size: 0.4rem;
        margin-left: 0.5rem;
        color: black;
        font-weight: 700;
      }
    }
    .LoginForm {
      width: 400px;
      height: 400px;
      margin-left: 93px;

      .van-hairline--top-bottom {
        height: 65%;
      }

      .van-field {
        border-bottom: 1px solid #e0e8eb;
      }
    }
    .LGBG {
    }
  }
}
</style>
-

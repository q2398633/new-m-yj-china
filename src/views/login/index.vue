<template>
  <div class="login_form">
    <!-- LoGo -->
    <div class="login_form_center">
      <!-- 登录表单 -->
      <form action="/" method="POSt" ref="loginForm" ::model="loginForm">
        <div class="login_form_bottom">
          <div class="login_form_top">
            <img
              src="https://img.zcool.cn/community/01039857b959590000012e7e08ea22.jpg@1280w_1l_2o_100sh.jpg"
              alt="LOGO"
              style="width:9rem; border-radius: 50%; margin-left: 0;"
            />
          </div>
          <!-- 登录Button -->
          <div class="LoginForm">
            <div
              style="font-size: .5rem; margin-bottom: 10px; color: #106ecc; font-weight: 700; font-family: 楷体"
            ></div>
            <van-cell-group style="margin-top: 0.5rem;">
              <van-field
                v-validate="'required|username'"
                name="username"
                v-model="loginForm.username"
                clearable
                left-icon="contact"
                prop="username"
                placeholder="手机号/用户名/邮箱"
              />

              <van-field
                v-validate="'required|password'"
                name="password"
                v-model="loginForm.password"
                clearable
                left-icon="closed-eye"
                prop="password"
                type="password"
                placeholder="密码"
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
        username: "18000000000",
        password: "caifu123456"
      },
      loginloading: false
    };
  },
  created() {},
  methods: {
    // async handleLogin() {
    //   this.loginloading = true;
    //   const data = await login(this.loginForm);
    //   if (data.Status === 500) {
    //     this.loginloading = false;
    //     this.$toast.fail("登录失败!请检查账户名与密码");
    //   } else {
    //     this.$store.commit("setUser", data);
    //     this.loginloading = false;
    //     this.$router.push("/home");
    //     this.$toast.success("登录成功");
    //   }

    //   this.loginloading = false;
    // }
    Login() {
      if (
        this.loginForm.username == "18000000000" &&
        this.loginForm.password == "caifu123456"
      ) {
        this.$router.replace("/ChildManagement");
      } else {
        // 警告通知
        this.$notify({ type: "warning", message: "账号密码错误" });
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
  background: white;
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
      background: white;
      opacity: 1;
      border-radius: 20px;
      margin: -20px 0 0 38px;

      .login_form_top {
        width: 100%;

        img {
          width: 300px;
          border-radius: 20px;
          margin-left: 24%;
        }
      }
    }
    .footer {
      padding: 30px;

      .LoginText {
        font-size: 0.4rem;
        margin-left: 0.5rem;
        color: #5d5656;
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
  }
}
</style>
-

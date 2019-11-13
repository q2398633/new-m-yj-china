<template>
  <div class="login_form">
    <!-- 顶部导航 -->
    <van-nav-bar title="登录"
                 class="nav" />
    <!-- LoGo -->
    <div class="login_form_center">
      <div class="login_form_top">
        <img src="../../assets/logo.png"
             alt="LOGO"
             style="width:100% border-radius: 50%;">
      </div>
      <!-- 登录表单 -->
      <form action="/"
            method="POST"
            ref="loginForm"
            ::model="loginForm">
        <div class="login_form_bottom">
          <van-cell-group>
            <van-field v-model="loginForm.username"
                       required
                       clearable
                       label="用户名"
                       right-icon="question-o"
                       placeholder="请输入用户名"
                       @click-right-icon="$toast('用户名可以是邮箱,手机号,普通账户')" />

            <van-field v-model="loginForm.password"
                       required
                       clearable
                       prop="code"
                       type="password"
                       label="密码"
                       placeholder="请输入密码"
                       right-icon="question-o"
                       @click-right-icon="$toast('密码长度为6位')" />
          </van-cell-group>
          <!-- 登录Button -->
          <van-button color="linear-gradient(to right, #4bb0ff, #6149f6)"
                      style="margin-bottom: 3px;"
                      loading
                      loading-text="登录中..."
                      @click.prevent="handleLogin">登录</van-button>
        </div>
      </form>
      <div class="footer">
        <a href="#"
           class="forget_password"
           style="margin-top:13px;">忘记密码?</a>
        <div class="footer_right">
          <ul>
            <li>
              <img src="../../assets/11.png"
                   alt="">
            </li>
            <li>
              <img src="../../assets/12.png"
                   alt="">
            </li>
            <li>
              <img src="../../assets/13.png"
                   alt="">
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { login } from '../../api/user'

export default {
  name: 'loginIndex',
  data () {
    return {
      loginForm: {
        username: 'admin',
        password: 'caifu123456'
      }
    }
  },
  methods: {
    async handleLogin () {
      this.loding = true
      const valid = await this.$validator.validate()
      if (!valid) {
        this.loding = false
        return
      }
      try {
        const data = await login(this.loginForm)
        console.log(data)
        this.$store.commit('setUser', data)
        this.$router.push({ path: '/' })
      } catch (error) {
        console.log(error)
      }
      this.loding = false
    }
  }
}
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
  background: url("../../assets/Login_Bg.jpg") no-repeat center / cover;
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
    border-radius: 16px;
    background: white;
    opacity: 0.9;
    position: absolute;
    top: 5rem;
    left: 0.4767rem;
    // transform: translate(-50%, -50%);
    .login_form_top {
      width: 100%;
      height: 24%;

      img {
        width: 45%;
        border-radius: 50%;
        margin-left: 190px;
        margin-top: -100px;
        box-shadow: 1px 1px 0.21333rem 1px;
      }
    }
    .login_form_bottom {
      padding: 10px;

      .van-field__label {
        width: 1.4rem;
      }
      .van-button {
        width: 500px;
        margin-left: 80px;
      }
    }
    .footer {
      padding: 30px;
      a {
        float: left;
        font-size: 30px;
        color: #585151;
      }
      .footer_right {
        float: right;
        width: 200px;

        ul {
          width: 100%;
          float: left;

          li {
            display: inline-block;
            float: left;
            margin-right: 13px;

            img {
              width: 50px;
            }
          }
        }
      }
    }
  }
}
</style>

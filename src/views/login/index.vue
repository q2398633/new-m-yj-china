<template>
  <div class="login_form">
    <!-- LoGo -->
    <div class="login_form_center">
      <div class="login_form_top">
        <img src="../../assets/logo.png"
             alt="LOGO"
             style="width:100% border-radius: 50%;">
      </div>
      <!-- 登录表单 -->
      <form action="/"
            method="POSt"
            ref="loginForm"
            ::model="loginForm">
        <div class="login_form_bottom">
          <van-cell-group style="opacity: 0.6;">
            <van-field v-validate="'required|username'"
                       name="username"
                       :error-message="errors.first('username')"
                       v-model="loginForm.username"
                       required
                       clearable
                       prop="username"
                       label="用户名"
                       placeholder="请输入用户名" />

            <van-field v-validate="'required|password'"
                       name="password"
                       :error-message="errors.first('password')"
                       v-model="loginForm.password"
                       required
                       clearable
                       prop="password"
                       type="password"
                       label="密码"
                       placeholder="请输入密码" />
          </van-cell-group>
          <!-- 登录Button -->
          <van-button :loading="loginloading"
                      loading-type='spinner'
                      loading-size='30px'
                      color="linear-gradient(to right, #4bb0ff, #6149f6)"
                      style="margin-bottom: 3px;"
                      block
                      @click.prevent="handleLogin">登录</van-button>
        </div>
      </form>
      <div class="footer">
        <a href="#"
           class="forget_password"
           style="margin-top:13px;">忘记密码?</a>
      </div>
    </div>
  </div>
</template>
<script>

import { login } from '@/api/user'

export default {
    name: 'Login',
    data () {
        return {
            loginForm: {
                username: 'admin',
                password: 'caifu123456'

            },
            loginloading: false

        }
    },
    created () {

    },
    methods: {
        async handleLogin () {
            this.loginloading = true
            // 先验证
            this.$validator.validate().then(async valid => {
                // 如果验证失败直接return出去 没任何操作
                if (!valid) {
                    return
                }
                // 验证通过, 发送请求
                try {
                    const data = await login(this.loginForm)
                    console.log(data)
                    this.$store.commit('setUser', data)
                    this.loginloading = false
                    this.$router.push('/home')
                    this.$toast.success('登录成功')
                } catch (error) {
                    console.log(error)
                    this.loginloading = false
                    this.$toast.fail('登录失败!请检查账户名与密码')
                }
            })
            this.loginloading = false
        }
    },
    mounted: {

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
    opacity: 0.9;
    position: absolute;
    top: 3rem;
    left: 0.4767rem;
    // transform: translate(-50%, -50%);
    .login_form_top {
      width: 100%;

      img {
        width: 300px;
        border-radius: 50%;
        margin-left: 30%;
        margin-bottom: 80px;
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
    }
  }
}
</style>

<template>
  <div class="login_form">
    <!-- LoGo -->
    <div class="login_form_center">
      <!-- 登录表单 -->
      <form action="/"
            method="POSt"
            ref="loginForm"
            ::model="loginForm">
        <div class="login_form_bottom">
          <div class="login_form_top">
            <img src="../../assets/LoGo.gif"
                 alt="LOGO"
                 style="width:100% border-radius: 50%;">
          </div>
          <!-- 登录Button -->
          <div class="LoginForm">
            <div style="font-size: .5rem; margin-bottom: 10px; color: #106ecc; font-weight: 700; font-family: 楷体">账号登录</div>
            <van-cell-group>
              <van-field v-validate="'required|username'"
                         name="username"
                         :error-message="errors.first('用户名错误')"
                         v-model="loginForm.username"
                         clearable
                         left-icon="contact"
                         prop="username"
                         placeholder="请输入用户名" />

              <van-field v-validate="'required|password'"
                         name="password"
                         :error-message="errors.first('密码错误')"
                         v-model="loginForm.password"
                         clearable
                         left-icon="closed-eye"
                         prop="password"
                         type="password"
                         placeholder="请输入密码" />
            </van-cell-group>
            <van-button :loading="loginloading"
                        loading-type='spinner'
                        loading-size='30px'
                        color="linear-gradient(to right, #4bb0ff, #6149f6)"
                        style="margin-bottom: 3px; width: 100%;"
                        block
                        @click.prevent="handleLogin">登录</van-button>
            <div class="footer">
              <a href="#"
                 style="margin-top:13px;  font-size: .5rem; color: #106ecc; font-weight: 700; font-family: 楷体">忘记密码?</a>
            </div>
          </div>

        </div>
      </form>
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
  background: url("../../assets/BG2.jpg") no-repeat center / cover;
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

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
            <van-field v-validate="'required|alpha_num'"
                       name="username"
                       :error-message="errors.first('mobile')"
                       v-model="loginForm.mobile"
                       required
                       clearable
                       label="用户名"
                       right-icon="question-o"
                       placeholder="请输入用户名"
                       @click-right-icon="$toast('用户名可以是邮箱,手机号,普通账户')" />

            <van-field v-validate="'required|alpha_num'"
                       name="password"
                       v-model="loginForm.code"
                       :error-message="errors.first('code')"
                       required
                       clearable
                       prop="code"
                       type="password"
                       label="密码"
                       placeholder="请输入密码"
                       right-icon="question-o"
                       @click-right-icon="$toast('密码长度为11位')" />
          </van-cell-group>
          <!-- 登录Button -->
          <van-button color="linear-gradient(to right, #4bb0ff, #6149f6)"
                      style="margin-bottom: 3px;"
                      :loading="loading"
                      loading-text="登录中..."
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
import { login } from '../../api/user'
import { mapMutations } from 'vuex'
export default {
    name: 'Login',
    data () {
        return {
            loginForm: {
                mobile: '13911111111',
                code: '246810'

            },
            loading: false // 控制登录按钮是否显示加载
        }
    },
    created () {
    // 配置 VeeValidate 的验证信息
        const dict = {
            custom: {
                // 验证的文本信息
                mobile: {
                    // 验证规则之后失败的提示信息
                    required: '请输入手机号码',
                    digits: '手机号码为11位数字'
                },
                code: {
                    // 验证规则之后失败的提示信息
                    required: '请输入验证码',
                    digits: '验证码为6位数字'
                }
            }
        }
        this.$validator.localize('custom', dict)
    },
    methods: {
        ...mapMutations(['setUser']),
        // 点击按钮处理登录
        async handleLogin () {
            this.loading = true
            try {
                // 表单验证
                // validate() 返回promise对象, 所以可以用await
                const valid = await this.$validator.validate()
                if (!valid) {
                    this.loading = false
                    return // 验证失败出去
                }
                // 验证成功
                const data = await login(this.loginForm)
                // 储存登录状态
                this.setUser(data)
                console.log(data.refresh_token)
                // 跳转到首页
                // 获取url上的查询字符串redirect
                // 如果获取到redirect ，跳转到redirect指向地址
                // 如果没有redirect跳转首页
                this.$router.push(this.$route.query.redirect || '/')
                this.$toast.success('登陆成功!')
            } catch (err) {
                console.log(err)
                this.$toast.fail('登陆失败,您的账号或密码有误!')
                this.loding = false
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

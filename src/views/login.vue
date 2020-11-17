<!--注册页面-->
<template>
    <div>
      <!--:middle-top 头部登录注册信息是不一样的，所以通过父组件传递给子组件-->
      <login-top middle-top="登录blibli">
        <div slot="right" @click="$router.push('/register')" style="font-size: 12px">跳转到注册</div>
      </login-top>
      <!--账号文本框-->
      <login-text label="账号"
                  placeholder="请输入账号"
                  rule="^.{6,16}$"
                  @inputChange="res => model.username = res"
                  style="margin: 15px 0"
      > </login-text>

      <login-text label="密码"
                  type="password"
                  placeholder="请输入密码"
                  rule="^.{6,16}$"
                  @inputChange="res => model.password = res"
      > </login-text>

      <login-btn btntext="登录" @registerCommit="registerCommit"></login-btn>
    </div>
</template>

<script>
import LoginTop from '../components/common/loginTop'
import LoginText from '../components/common/loginText'
import LoginBtn from '../components/common/loginBtn'
export default {
  name: 'register',
  data () {
    return {
      model: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    /*
    *  async ... await 是将异步转换为同步的方法，premise是异步的，后面的输出会先于premise里面的，我们
    *  在有些情况下，必须要执行了异步里面的函数在执行后面的函数就使用async ... await
    * */
    async registerCommit () {
      // console.log(' 按钮被点击了 ')
      // 当正则表达式匹配失败的时候，内容肯定是为空的，这个时候不允许发送请求
      // 只有数据在正则表达式范围内才能注册成功，否则弹出信息错误
      const rulg = /^.{6,16}$/
      if (rulg.test(this.model.username) && rulg.test(this.model.password)) {
        const res = await this.$http.post('/login', this.model)
        // console.log(this.model)
        // 当登录成功弹出登录成功提示
        this.$msg.fail(res.data.msg)
        if (res.data.code === 301 || res.data.code === 302) {
          return
        }
        localStorage.setItem('id', res.data.id)
        localStorage.setItem('token', res.data.token)
        setTimeout(() => {
          this.$router.push('/userinfo')
        }, 1000)
      } else {
        // 当匹配错误弹出框，格式不正确
        this.$msg.fail('格式不正确')
      }
    }
  },
  components: {
    LoginTop,
    LoginText,
    LoginBtn
  }
}
</script>

<style scoped>

</style>

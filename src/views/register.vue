<!--注册页面-->
<template>
    <div>
      <!--:middle-top 头部登录注册信息是不一样的，所以通过父组件传递给子组件-->
      <login-top middle-top="注册blibli">
        <!--具名插槽-->
        <!--this.$router.push('/login')点击之后跳转到登录页面-->
        <div slot="right" @click="$router.push('/login')" style="font-size: 12px">跳转到登录界面</div>
      </login-top>
      <!--姓名文本框-->
      <!--rule="^.{6,16}$" 正则表达式 6-16 位的任意数-->
      <!-- inputChange作用是接收子组件传过来的值 res就是传过来的content，方便整合所有传过来的值，然后再向服务器发起请求-->
      <login-text label="姓名" style="margin: 15px 0"
                  placeholder="请输入姓名"
                  rule="^.{6,16}$"
                  @inputChange="res => model.name = res"
      > </login-text>
      <!--账号文本框-->
      <login-text label="账号"
                  placeholder="请输入账号"
                  rule="^.{6,16}$"
                  @inputChange="res => model.username = res"
      > </login-text>

      <login-text label="密码"
                  type="password"
                  placeholder="请输入密码"
                  rule="^.{6,16}$"
                  @inputChange="res => model.password = res"
      > </login-text>

      <login-btn btntext="注册" @registerCommit="registerCommit"></login-btn>
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
        name: '',
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
      if (rulg.test(this.model.name) && rulg.test(this.model.username) && rulg.test(this.model.password)) {
        const res = await this.$http.post('/register', this.model)
        console.log(res)
        // 当注册成功弹出注册成功提示
        this.$msg.fail(res.data.msg)
        // 点击注册之后，将提交的数据存储到本地，可以根据本地的id找到该用户信息
        // 还有objtoken,防止用户修改id ,盗取信息
        localStorage.setItem('id', res.data.id)
        localStorage.setItem('token', res.data.objtoken)
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

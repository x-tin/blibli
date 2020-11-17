<template>
  <div>
    <navbar :userinfo="model"></navbar>
    <div class="bg">
      <img :src="bgUrl" alt="">
    </div>
    <user-detail :userinfo="model"></user-detail>
  </div>
</template>

<script>
import navbar from '../components/common/navbar'
import userDetail from '../components/content/userDetail'
export default {
  name: 'userinfo',
  data () {
    return {
      bgUrl: require('../assets/bgi.png'),
      model: {}
    }
  },
  components: {
    navbar,
    userDetail
  },
  methods: {
    async UserinfoData () {
      // 请求用户相关信息
      const res = await this.$http.get('/user/' + localStorage.getItem('id'))
      this.model = res.data[0]
    }
  },
  created () {
    this.UserinfoData()
  }
}
</script>

<style scoped lang="less">
.bg {
  height: 100px;
  img {
    height: 100%;
  }
}
</style>

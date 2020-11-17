<template>
<div class="navbar">
  <div class="logo">
    <img :src="logoUrl">
  </div>
  <div>
    <p>
      <van-icon class="ipt-icon" name="search" />
      搜索内容
    </p>
  </div>
  <div>
    <img :src="userinfo.user_img" alt="" style="border-radius: 50%" @click="$router.push('/edit')" >
    <p>下载app</p>
  </div>
</div>
</template>
<script>
export default {
  name: 'navbar',
  data () {
    return {
      logoUrl: require('../../assets/logo.png'),
      headUrl: require('../../assets/headImage.jpg')
    }
  },
  props: ['userinfo']
}
</script>

<style scoped lang="less">
.navbar {
  height: 45px;
  background-color: #fff;
  display: flex;
  .logo{
    display: flex;
    justify-content: center;
    align-items: center;
    width: 120px;
    img {
      width: 80px;
    }
  }
  div:nth-child(2){
    flex: 1;
    align-items: center;
    p{
      background-color: #f4f4f4;
      font-size: 12px;
      color: #aaa;
      height: 26px;
      line-height: 26px;
      text-indent: 2rem;
      width: 80%;
      border-radius: 10px;
      position: relative;
      .ipt-icon{
        position: absolute;
        left: -40%;
        top: 50%;
        transform: translate(0,-40%);
        padding: 0;
        margin: 0;
        color: #aaa;
      }
    }
  }
  div:nth-child(3){
    display: flex;
    justify-content: center;
    align-items: center;
    img{
      width: 24px;
      height: 24px;
    }
    p{
      padding: 5px 10px;
      margin: 0 5px;
      background-color: #fb7299;
      color: #fff;
      font-size: 12px;
    }
  }
}
</style>

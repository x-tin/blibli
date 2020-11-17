<template>
<div class="userDetail">
  <div>
    <!--头像-->
    <div class="user-img">
      <img :src="userinfo.user_img" v-if="userinfo.user_img" style="height: 100%;width: 100%;" alt="">
      <img :src="userUrl" style="height: 100%;width: 100%;" alt="" v-else>
    </div>
    <!--fans ,关注度-->
    <div class="right-content">
      <ul>
        <li v-for="item in userData" :key="item.id">
          <p>{{ item.number }}</p><br>
          <p>{{ item.name }}</p>
        </li>
      </ul>
      <div class="edit" @click="$router.push('/edit')">
        编辑资料
      </div>
    </div>
  </div>
  <div class="bottom-content">
    <h2> {{ userinfo.name }} </h2>
    <p v-if="userinfo.user_desc">{{ userinfo.user_desc }}</p>
    <p v-else>这个人很神秘，什么都没写</p>
    <div class="publish">
      <span>动态</span>
      <span>视频</span>
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: 'userDetail',
  data () {
    return {
      userUrl: require('../../assets/headImage.jpg'),
      userData: [
        { number: 0, name: '粉丝', id: 1 },
        { number: 54, name: '关注', id: 2 },
        { number: 0, name: '获赞', id: 3 }
      ]
    }
  },
  props: ['userinfo']
}
</script>

<style scoped lang="less">
.userDetail{
  background-color: #fff;
  height: 180px;
  margin: -10px;
  position: relative;
  .user-img{
    padding: 0 5px;
    height: 85px;
    width: 85px;
    border-radius: 50%;
    position: absolute;
    left: 30px;
    top: -20px;
    overflow: hidden;
  }
 .right-content{
   display: flex;
   flex-direction: column;
   float: right;
   ul{
     list-style: none;
     margin-right: 10px;
     padding: 0;
     li{
       width: 80px;
       height: 40px;
       float: right;
       display: flex;
       align-items: center;
       justify-content: center;
       border-bottom: 1px solid #f4f4f4;
     }
   }
   .edit{
     width: 80%;
     margin-left: 15px;
     margin-top: 10px;
     flex: 1;
     color: palevioletred;
     display: flex;
     align-items: center;
     justify-content: center;
     border: 1px solid palevioletred;
     border-radius: 5px;
   }
 }
  .bottom-content{
    width: 100%;
    position: absolute;
    bottom: 30px;
    left: 30px;
    h2{
      margin: 0;
      padding: 0;
    }
    p{
      font-size: 12px;
      color: #aaa;
    }
    .publish{
      position: absolute;
      bottom: -30px;
      left: 0;
      border-top: 1px solid #f4f4f4;
      span{
        width: 40px;
        display: inline-block;
        margin-right: 30px;
        line-height: 30px;
        &:nth-child(1){
          color: palevioletred;
        }
      }
    }
  }
}
</style>

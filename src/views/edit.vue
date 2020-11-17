<!--编辑资料页面-->
<template>
  <div class="edit">
    <div style="margin-bottom: 10px">
      <navbar :userinfo="model"></navbar>
    </div>
    <div class="upLoader">
      <!--preview-size 让上传文件的部分和屏幕一样宽，我们点击头像部分任意位置的时候都能上传图片-->
      <van-uploader class="upLoadImg" preview-size="100vw" :after-read="afterRead"/>
      <edit-info left="头像" style="line-height: 40px">
        <img :src="model.user_img" alt="" v-if="model.user_img" style="width: 46px; height: 46px; border-radius: 50%" slot="right">
        <img src="../assets/headImage.jpg" alt="" slot="right" style="width: 46px; height: 46px;" v-else>
      </edit-info>
    </div>
    <!--接收子组件传递的clickBanner方法，执行该方法，弹出修改框-->
    <edit-info left="昵称" @clickBanner="show=true">
      <a href="javascript:;" slot="right">{{model.name}}</a>
    </edit-info>
    <edit-info left="账号">
      <a href="javascript:;" slot="right">{{model.username}}</a>
    </edit-info>
    <edit-info left="性别" @clickBanner="genderShow = true">
      <span slot="right">{{ model.gender }}</span>
    </edit-info>
    <edit-info left="个性签名" @clickBanner="textshow=true">
      <span slot="right">{{model.user_desc}}</span>
    </edit-info>
    <div class="editBack" @click="$router.push('/userinfo')">返回个人中心</div>
    <!--昵称弹出框-->
    <van-dialog v-model="show" title="昵称" show-cancel-button @confirm="confirmClick" @cancel="model.content=''">
      <van-field v-model="content" label="用户名" placeholder="请输入用户名" autofocus />
    </van-dialog>
    <!--个性签名弹出框-->
    <van-dialog v-model="textshow" title="个性签名" show-cancel-button @confirm="confirmClickquoto" @cancel="model.value=''">
      <van-field v-model="value" type="textarea" label="个性签名" placeholder="请输入个性签名" autofocus />
    </van-dialog>
    <!--性别选择-->
    <van-action-sheet v-model="genderShow"
                      :actions="actions"
                      @select="onSelect"
                      cancel-text="取消"
                      close-on-click-action
                      @cancel="model.gender = ''"
                      />
  </div>
</template>

<script>
import navbar from '../components/common/navbar'
import editInfo from '../components/content/editInfo'

export default {
  name: 'edit',
  components: {
    navbar,
    editInfo
  },
  data () {
    return {
      model: {},
      show: false,
      textshow: false,
      content: '',
      value: '',
      genderShow: false,
      actions: [{ name: '男' }, { name: '女' }]
    }
  },
  methods: {
    // 向服务器请求用户相关信息
    async selectUser () {
      const res = await this.$http.get('/user/' + localStorage.getItem('id'))
      this.model = res.data[0]
    },
    // 修改头像文件
    async afterRead (file) {
      // 此时可以自行将文件上传至服务器
      const formData = new FormData()
      formData.append('file', file.file)
      const res = await this.$http.post('/upload', formData)
      // 修改model只是修改前端的内容，但是服务器上的信息没变化，所以当重新刷新的时候又会恢复到原来的头像
      // 我们应该将内容发送到服务器上
      this.model.user_img = res.data.url
      this.userUpdate()
      console.log(res)
    },
    async userUpdate () {
      await this.$http.post('/update/' + localStorage.getItem('id'), this.model)
    },
    // 修改昵称,查看用户是否点击输入框中确认按钮
    confirmClick () {
      this.model.name = this.content
      this.userUpdate()
    },
    // 修改个性签名
    confirmClickquoto () {
      this.model.user_desc = this.value
      this.userUpdate()
    },
    // 选择性别
    onSelect (item) {
      // 默认情况下点击选项时不会自动收起
      // 可以通过 close-on-click-action 属性开启自动收起
      this.genderShow = false
      this.model.gender = item.name
      this.userUpdate()
    }
  },
  // 在页面渲染前去服务器查找用户
  created () {
    this.selectUser()
  }
}
</script>

<style scoped lang="less">
  .edit{
    a{
      text-decoration: none;
      color: #3c3c3c;
    }
    .upLoader {
      position: relative;
      overflow: hidden;
      .upLoadImg{
        opacity: 0;
        position: absolute;
      }
    }
    .editBack{
      background-color: white;
      width: 100%;
      height: 40px;
      color: #6c6c6c;
      margin-top: 20px;
      display: flex;
      justify-content: center;
      align-items: center;
      border-bottom: 1px solid #f4f4f4;
    }
  }

</style>

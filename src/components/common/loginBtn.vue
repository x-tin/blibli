<template>
<div class="btnparent">
  <div class="loginBtn" @click="registerClick">{{ btntext }}</div>
</div>
</template>

<script>
export default {
  name: 'loginBtn',
  props: ['btntext'],
  methods: {
    registerClick () {
      this.$emit('registerCommit')
    }
  }
}
</script>

<style scoped>
  .btnparent{
    padding: 15px 10px;
  }
.loginBtn{
  height: 45px;
  background-color: #ff9db5;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 22.5px;
  font-size: 16px;
}
</style>

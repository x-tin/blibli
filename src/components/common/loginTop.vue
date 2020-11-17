<template>
    <div>
      <div class="login-t">
        <div></div>
        <div>{{ middleTop }}</div>
        <div>
          <!--要填充的内容就会根据name找到具体的插槽进行替换-->
          <slot name="right"></slot>
        </div>
      </div>
    </div>
</template>

<script>
export default {
  name: 'loginTop',
  props: ['middleTop']
}
</script>

<style scoped lang="less">
.login-t{
  height: 44px;
  background-color: #fff;
  display: flex;
  /*将头部组件分为三部分，使用flex来布局*/
  div{
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 16px;
  }
}
</style>

<template>
  <div class="editInfo" @click="clickBanner">
    <span>{{left}}</span>
    <span><slot name="right"></slot></span>
  </div>
</template>

<script>
export default {
  name: 'editInfo',
  props: ['left', 'right'],
  methods: {
    // 点击每一个editInfo时都会给父元素传递一个方法
    clickBanner () {
      this.$emit('clickBanner')
    }
  }
}
</script>

<style scoped lang="less">
.editInfo{
  background-color: #fff;
  padding: 15px;
  font-size: 16px;
  color: #3c3c3c;
  border-bottom: 1px solid #fafafa;
  display: flex;
  /*分成两边*/
  justify-content: space-between;
}
</style>

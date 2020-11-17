<template>
<div>
  <!--都由父组件向子组件进行传递-->
  <van-field v-model="content"
             :label="label"
             :type="type"
             :palceholder="placeholder"
             :rule="rule"
  />
</div>
</template>

<script>

export default {
  name: 'loginText',
  data: function () {
    return {
      content: ''
    }
  },
  props: ['label', 'type', 'placeholder', 'rule'],
  /* 监听data里面的数据是否发生变化 */
  methods: {
    // 判断正则表达式
    handlerulg () {
      // 把字符串转化为正则
      const rue = new RegExp(this.rule)
      if (rue.test(this.content)) {
        // console.log('正则校验成功')
        // 子组件可以使用 $emit 触发父组件的自定义事件 vm.$emit( event, arg ) //触发当前实例上的事件
        this.$emit('inputChange', this.content)
      }
    }
  },
  watch: {
    // 监听content内容的变化,当发生变化时调用handlerulg函数
    content () {
      this.handlerulg()
    }
  }
}
</script>

<style scoped>

</style>

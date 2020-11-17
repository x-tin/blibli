<template>
    <div class="detailitem">
<!--      {{ detailitem }}-->
      <img :src="detailitem.img" alt="" @click="$router.push('/detail/'+detailitem.id+'')">
      <p style="padding: 6px 0;margin: 0; font-size: 13px"> {{detailitem.name}} </p>
      <span class="play">55</span>
      <span class="comment">66</span>
    </div>
</template>

<script>
export default {
  name: 'detail',
  props: ['detailitem']
}
</script>

<style scoped lang="less">
.detailitem{
  position: relative;
  img{
    width: 100%;
    margin-top: 10px;
  }
  .play{
    position: absolute;
    bottom: 30px;
    left: 10px;
    font-size: 10px;
  }
  .comment{
    position: absolute;
    bottom: 30px;
    right: 10px;
    font-size: 10px;
  }
}
</style>

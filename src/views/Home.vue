<template>
  <div class="home">
    <navbar :userinfo="model"></navbar>
    <van-tabs v-model="active">
      <van-tab v-for="(item,index) in category" :title="item.title" :key="index">
        <van-list
            v-model="item.loading"
            finished-text="我也是有底线的~"
            @load="onLoad"
            :finished="item.finished"
            :immediate-check = false
            >
            <div class="detailParent">
            <detail :detailitem='categoryitem' v-for="(categoryitem,categoryIndex) in item.list" :key="categoryIndex" class="detailitem">
            </detail>
            </div>
          </van-list>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import navbar from '../components/common/navbar'
import detail from './detail'
export default {
  name: 'Home',
  components: {
    detail,
    navbar
  },
  data () {
    return {
      model: '',
      category: [],
      active: 0,
      list: []
    }
  },
  methods: {
    async getmodel () {
      const res = await this.$http.get('/user/' + localStorage.getItem('id'))
      this.model = res.data[0]
    },
    async selectCategory () {
      const res = await this.$http.get('/category')
      this.changeCategory(res.data)
    },
    async changeCategory (data) {
      const category1 = data.map((item, index) => {
        item.list = []
        item.page = 0
        item.pagesize = 10
        item.finished = false
        item.loading = false
        return item
      })
      this.category = category1
      this.getContent()
    },
    async getContent () {
      const categoryitem = this.getCategoryItem()
      const res = await this.$http.get('/detail/' + categoryitem._id, {
        params: {
          page: categoryitem.page,
          pagesize: categoryitem.pagesize
        }
      })
      categoryitem.list.push(...res.data)
      categoryitem.loading = false
      // 当最后一次更新的数据小于每次页面需要更新的数据时，结束更新
      if (res.data.length < categoryitem.pagesize) {
        categoryitem.finished = true
      }
    },
    getCategoryItem () {
      const categoryItem = this.category[this.active]
      return categoryItem
    },
    // 是否滚动到底部
    onLoad () {
      const categoryItem = this.getCategoryItem()
      categoryItem.page += 1
      this.getContent()
    }
  },
  watch: {
    active () {
      this.selectCategory()
      this.getContent()
    }
  },
  created () {
    this.getmodel()
    this.selectCategory()
  }
}
</script>

<style lang="less">
  .home{
    .detailParent{
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      .detailitem{
        width: 45%;
      }
    }
  }
</style>

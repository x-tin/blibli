import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import { Field, Toast, Icon, Uploader, Dialog, ActionSheet, Tab, Tabs, List } from 'vant'
import http from './http'

Vue.use(Field)
Vue.use(Toast)
Vue.use(Icon)
Vue.use(Uploader)
Vue.use(Dialog)
Vue.use(ActionSheet)
Vue.use(Tab)
Vue.use(Tabs)
Vue.use(List)
// 将http挂载到vue的原型上，就可以在任意组件使用this.$http来发送请求
Vue.prototype.$http = http
// 轻提示，当提示信息的时候弹出框
Vue.prototype.$msg = Toast

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

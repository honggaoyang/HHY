// 整个项目入口文件
// 先导入Vue  导入App跟文件   router路由                                                          

import Vue from 'vue'
import App from './App'
import router from './router' 
//导入全局样式表
import './assets/css/global.css'

//导入element-ui组件
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

//点击登录发起请求需要引入
import axios from 'axios'
//挂载在Vue原型对象上，这样每一个Vue组件都可以通过this.$http 发起http请求
Vue.prototype.$http=axios 
//配置请求的根路径
axios.defaults.baseURL='https://t.jiyuanet.com'

Vue.use(ElementUI)

Vue.config.productionTip = false

new Vue({
	router,
	render:h=>h(App)
}).$mount('#app')

/*new Vue({
  el: '#app',
  router,  //路由挂在到Vue实例上
  components: { App },   //跟组件渲染到页面上
  template: '<App/>'
})*/

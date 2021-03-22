// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
// 引入路由
import router from './router'
// 引入Vant
import Vant from 'vant';
import 'vant/lib/index.css';
// 引入vuex
import store from "./store/index"

// 1.引入重置样式
import './assets/css/reset.css'

Vue.config.productionTip = false

Vue.use(Vant)

Vue.prototype.event = new Vue();
Vue.prototype.$preImg = "http://localhost:3000";

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})

// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import mavonEditor from 'mavon-editor';
import 'mavon-editor/dist/css/index.css';


import ElementUI from 'element-ui'//引入ElementUI
import axios from 'axios'; /* 引入axios进行地址访问*/
　　Vue.prototype.$http = axios;

import 'element-ui/lib/theme-chalk/index.css';
import 'element-ui/lib/theme-chalk/display.css';


Vue.use(ElementUI)
Vue.use(mavonEditor)
Vue.config.productionTip = false


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})

import Vue from 'vue'
import router from './router'
import App from './App'
import store from '@/stores';

Vue.config.productionTip = false

Vue.use(require('vue-moment'));

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})

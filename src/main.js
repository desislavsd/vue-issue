import Vue from 'vue'
import App from './App.vue'

import VueIssue from './plugins/issue/index'

Vue.use(VueIssue, {});

global.$modal = Vue.$modal;
global.$toast = Vue.$toast;

// eslint-disable-next-line
Vue.prototype.log = console.log;

Vue.config.productionTip = false

Vue.component('bar', {
  name: 'bar',
  render: h => h('div', ['Hi from bar'])
})
new Vue({
  render: h => h(App),
}).$mount('#app')

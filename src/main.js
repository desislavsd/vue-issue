import Vue from 'vue'
import App from './App.vue'

import { createModalService, createToastService } from './plugins/issue/index'

/* Vue.use(VueIssue, {
  modal: {
    defaults: {
      classes: ['modal-center'],
    }
  }
}); */

global.$modal = Vue.$modal = Vue.prototype.$modal = createModalService();
global.$toast = Vue.$toast = Vue.prototype.$toast = createToastService();

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

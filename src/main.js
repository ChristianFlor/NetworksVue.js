import Vue from 'vue'
//import MPS from './MPS.vue'
import MRP from './MRP.vue'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.config.productionTip = false
Vue.use(BootstrapVue)

new Vue({
  render: h => h(MRP),
}).$mount('#app')

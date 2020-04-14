import Vue from 'vue'
//import MPS from './MPS.vue'
//import MRP from './MRP.vue'
import MST from './MST.vue'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.config.productionTip = false
Vue.use(BootstrapVue)

new Vue({
  render: s => s(MST),
}).$mount('#app')


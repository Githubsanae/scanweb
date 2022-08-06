import Vue from 'vue'
import App from './App.vue'
import "echarts";
import VChart from "vue-echarts";
import Axios from 'axios'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'

// Import Bootstrap and BootstrapVue CSS files (order is important)
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

// Make BootstrapVue available throughout your project
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)

Vue.prototype.$http = Axios
Vue.config.productionTip = false
Vue.component("v-chart", VChart);
new Vue({
  render: h => h(App),
}).$mount('#app')

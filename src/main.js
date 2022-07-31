import Vue from 'vue'
import App from './App.vue'
import "echarts";
import VChart from "vue-echarts";
import Axios from 'axios'


Vue.prototype.$http = Axios
Vue.config.productionTip = false
Vue.component("v-chart", VChart);
new Vue({
  render: h => h(App),
}).$mount('#app')

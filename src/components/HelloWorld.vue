<template>
  <div>
    <h1>{{this.items}}/{{this.type}}</h1>
    <b-button-group>
      <b-button variant="success" @click="change_type_to_hours('hours')">hours</b-button>
      <b-button variant="info" @click="change_type_to_hours('days')">days</b-button>
      <b-button variant="warning" @click="change_type_to_hours('min')">minutes</b-button>
    </b-button-group>
    <v-chart class="chart" :option="option" />
    <b-button-group  v-for="item in columns" :key="item">
      <b-button variant="success" @click="change_items(item)" >{{item}}</b-button>
      <!-- <b-button variant="info" @click="change_items('幸运勋章')">幸运勋章</b-button>
      <b-button variant="warning" @click="change_items('《小柯基》')">《小柯基》</b-button> -->
    </b-button-group>
  </div>
  
</template>

<script>
import { THEME_KEY } from "vue-echarts";
export default {
  name: "HelloWorld",
  
  provide: {
    [THEME_KEY]: "dark",
  },
  props: {
    msg: String,
  },
  computed: {
    option(){
      return{
        tooltip: {
        trigger: 'axis'
        },
        xAxis: {
            type: 'category',
            data: this.times,
        },
        yAxis: {
            type: 'value',
        },
        series: [
            {
            name:this.items,
            data:  this.value,
            type: 'line',
            smooth: true
        }
        ]
      }
    }
  },
  data() {
    return {
      items:'幸运勋章',
      type:`days`,
      temp:[],
      value:[],
      times:[],
      columns:[]
    };
  },
  methods:{
    get_price(){
      this.$http.get("https://service-h3sdyd4e-1307716762.gz.apigw.tencentcs.com/release/get_price",{params:{
        items:this.items,
        type:this.type
      }}).then((res)=>{
        this.value = res.data.map(d=>d.pirces)
        this.times = res.data.map(d=>d.times)
      })
    },
    change_type_to_hours(change){
      this.type=change;
      this.get_price();
    },
    change_items(new_items){
      this.items=new_items;
      this.get_price();
    },
    get_columns(){
      this.$http.get("https://service-h3sdyd4e-1307716762.gz.apigw.tencentcs.com/release/get_columns").then(res =>{
      this.columns=res.data.map(d=>d.Field)
      this.columns.splice(0,2)
      })
    }
    
  },
  created() {
    this.get_price(),
    this.get_columns()
}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.chart{
  height:600px
}
</style>

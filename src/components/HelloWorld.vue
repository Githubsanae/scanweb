<template>
  <div>
    <h1>{{this.items}}/{{this.type}}</h1>
    
    <b-button size="sm" variant="outline-success" @click="change_type_to_hours('hours')">hours</b-button>
    <b-button size="sm" variant="outline-info" @click="change_type_to_hours('days')">days</b-button>
    <b-button size="sm" variant="outline-warning" @click="change_type_to_hours('min')">minutes</b-button>
   
    <div class="btn-groups" ref="wrapper">
      <b-button-group size="sm">
        <b-button variant="outline" class="btn-test" v-for="item in columns" :key="item" @click="change_items(item)" >{{item}}</b-button>
      </b-button-group>
    </div>
    <v-chart class="chart" :option="option" />

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
        dataZoom:[
              {
      type: 'slider',
      show: true,
      xAxisIndex: [0],
      start: this.x_precent,
      end: 100
    },
    {
      type: 'slider',
      show: true,
      yAxisIndex: [0],
      start: this.y_precent,
      end: 100
    },
              {
      type: 'inside',
      xAxisIndex: [0],
      start: this.x_precent,
      end: 100
    },
    {
      type: 'inside',
      yAxisIndex: [0],
      start: this.y_precent,
      end: 100
    }],
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
      x_precent:0,
      y_precent:20,
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
      if (change == "hours"){
        this.x_precent = 80
        this.y_precent = 60
      }else if (change == "min"){
        this.x_precent = 95
        this.y_precent = 70
      }else{
        this.x_precent = 0
        this.y_precent = 20
      }
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
.btn-groups{
  width: 100%;
  overflow-x:auto
}
.btn-test{
  white-space: nowrap;
}
.btn-groups::-webkit-scrollbar{
  height: 10px;
  background-color: #ffffff;
}
.btn-groups::-webkit-scrollbar-track {
    box-shadow: inset 0 0 6px #cfcfd1;
    -webkit-box-shadow: inset 0 0 6px #cfcfd1;
    border-radius: 10px;
    background-color:#f7f7f7;
}
.btn-groups::-webkit-scrollbar-thumb{
    border-radius: 10px;
    box-shadow: inset 0 0 6px #cfcfd1;
    -webkit-box-shadow: inset 0 0 6px #cfcfd1;
    background-color: #cfcfd1;
}
</style>

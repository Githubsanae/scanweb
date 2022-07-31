<template>
  <div>
    <v-chart class="chart" :option="option" />
    <div></div>
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
            type: 'value'
        },
        series: [
            {
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
      temp:[],
      value:[],
      times:[]
    };
  },
  methods:{
    randomData(){
      return[
        {时间:'2020-2-20 2:20:20',
              value:Math.random()*100},
              {时间:'2020-2-20 2:20:21',
              value:Math.random()*100},
              {时间:'2020-2-20 2:20:22',
              value:Math.random()*100},
              {时间:'2020-2-20 2:20:23',
              value:Math.random()*100},
              {时间:'2020-2-20 2:20:24',
              value:Math.random()*100},
              {时间:'2020-2-20 2:20:25',
              value:Math.random()*100},
              {时间:'2020-2-20 2:20:26',
              value:Math.random()*100}
      ]
    },
    
    get_price(){
      this.$http.get("http://192.168.2.173:8011/get_price",{params:{
        items:this.items
      }}).then((res)=>{
        this.value = res.data.map(d=>d.幸运勋章)
        this.times = res.data.map(d=>d.时间)

      })
    }
  },
  created() {
    this.get_price()

    
}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.chart{
  height:400px
}
</style>

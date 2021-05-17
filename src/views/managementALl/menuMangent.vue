<template>
  <div id="main" :style="{ width: '100%', height: '300px' }"></div>
</template>
<script>
import { reactive } from "@vue/reactivity";
import { onMounted } from "@vue/runtime-core";
import * as echarts from "echarts";
export default {
  name: "menuMangent",
  setup(props) {
    onMounted(() => {
      let myChart = echarts.init(document.getElementById("main"));
      myChart.setOption({
        title: {
          text: "ECharts 入门示例"
        },
        tooltip: {},
        xAxis: {
          data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"]
        },
        yAxis: {},
        series: [
          {
            name: "销量",
            type: "bar",
            data: [5, 20, 36, 10, 10, 20]
          }
        ]
      });
      window.onresize = function() {
        //自适应大小
        myChart.resize();
      };
    });
  }
};
</script>
<style scoped lang="scss">
</style>
<template>
  <div className="w-full">
    <div ref="chartBody" class="chart-body"></div>
  </div>
</template>

<script>
import { mixinChartResize, mixinGainColor } from "./extendjs/pie_mixin";

export default {
  name: "column_4",
  mounted() {
    this.initChart();
  },
  data() {
    return {
      myChart: null,
      chartOption: {},
      chartData: {}
    };
  },
  props: ["layoutData"],
  mixins: [mixinChartResize, mixinGainColor],
  methods: {
    initChart() {
      let chartDom = this.$refs.chartBody;
      this.myChart = this.$echarts.init(chartDom);
    },
    setOption() {
      this.myChart.setOption(this.chartOption);
    },
    updateChart(chartData) {
      console.log("**************************chartData:", chartData);
      this.chartData = chartData;
      const [xAxis] = chartData.xAxis;
      const yAxis = chartData.yAxis;
      const series = yAxis.map((item, index) => ({
        type: "bar",
        itemStyle: {
          // color: this.gainColorByIndex(index)
          color: params => {
            return this.gainColorByParam(params.name, xAxis, params.dataIndex);
          }
        }
      }));
      this.chartOption = {
        legend: {
          textStyle: {
            color: "#ccc",
            overflow: "truncate",
            fontSize: 14,
            lineHeight: 14
          }
        },
        tooltip: { formatter: "{a}: {b} {c}" },
        dataset: {
          dimensions: [xAxis, ...yAxis],
          source: chartData.data
        },
        xAxis: { type: "category" },
        yAxis: {
          splitLine: {
            show: false
          }
        },
        series: series
      };

      this.setOption();
    }
  }
};
</script>

<style scoped>
.chart-body {
  width: 100%;
  height: 100%;
}
</style>
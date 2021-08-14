<template>
  <div className="w-full">
    <div ref="chartBody" class="chart-body"></div>
  </div>
</template>

<script>
import { mixinChartResize, mixinGainColor, mixinPieChartClick } from "./extendjs/pie_mixin";

export default {
  name: "pie_1",
  mounted() {
    this.initChart();
    this.chartOption.series[0].selectedMode = this.checkCanSelect();
    if (this.checkCanClick())
      this.myChart.on("click", this.chartClick);
  },
  data() {
    return {
      myChart: null,
      chartOption: {},
      chartData: {}
    };
  },
  props: ["layoutData", "chartNextClick", "chartLinkSelect"],
  mixins: [mixinChartResize, mixinGainColor],
  methods: {
    initChart() {
      let chartDom = this.$refs.chartBody;
      this.myChart = this.$echarts.init(chartDom);
      this.chartOption = {
        tooltip: {
          trigger: "item",
          formatter: "{b0}: {c0}万亩 {d0}%"
        },
        legend: {
          type: "scroll",
          top: "center",
          left: "60%",
          orient: "vertical",
          textStyle: {
            color: "#ccc",
            overflow: "truncate",
            fontSize: 14,
            lineHeight: 14
          }
        },
        series: [
          {
            type: "pie",
            radius: ["0", "60%"],
            center: ["30%", "50%"],
            avoidLabelOverlap: false,
            itemStyle: {
              borderRadius: 6,
              borderColor: "#eee",
              borderWidth: 1
            },
            label: {
              show: false,
              position: "center"
            },
            emphasis: {
              label: {
                show: false,
                fontSize: "20",
                fontWeight: "bold"
              }
            },
            labelLine: {
              show: false
            }
          }
        ]
      };
    },
    setOption() {
      this.myChart.setOption(this.chartOption);
    },
    updateChart(chartData) {
      this.chartData = chartData;
      const [xAxis] = chartData.xAxis;
      const [yAxis1, yAxis2] = chartData.yAxis;
      const data = chartData.data.map((item, index) => {
        return {
          name: item[xAxis],
          value: item[yAxis1],
          m_percent: item[yAxis2],
          itemStyle: {
            color: this.gainColorByParam(item[xAxis], xAxis, index)
          }
        };
      });
      const legendData = data.map((item, index) => {
        return {
          name: item.name,
          textStyle: item.itemStyle
        };
      });
      const legendFormatter = (name) => {
        const findItem = data.find(t => t.name === name);
        return `${name} - ${findItem.value} - ${findItem.m_percent}%`;
      };
      this.chartOption.legend.formatter = legendFormatter;
      this.chartOption.legend.data = legendData;
      this.chartOption.series[0].name = xAxis;
      this.chartOption.series[0].data = data;

      this.setOption();
    },
    chartClick({ data, dataIndex }) {
      if (this.checkCanSelect())
        this.chartSelect(data, dataIndex);
      const nextChart = this.layoutData.click.chart;
      if (nextChart) {
        console.log("nextClick:" + nextChart);
        nextChart.params = {
          childfilter: data.name,
          childname: data.name
        };
        this.chartNextClick(nextChart);
      }
    },
    chartSelect(data, dataIndex) {
      const dataArr = this.chartOption.series[0].data;
      dataArr.forEach((item, index) => {
        item.selected = index === dataIndex;
      });
      dataArr[dataIndex].selected = data.selected = !data.selected;
      //调用联动
      if (this.chartLinkSelect) {
        const isSelect = data.selected;
        const params = {
          childfilter: data.name,
          childname: data.name,
          isSelect: data.selected
        };
        this.chartLinkSelect(params);
      }

      this.setOption();
    },
    checkCanSelect() {
      return (this.layoutData.click && this.layoutData.click.canSelect) ? "single" : "false";
    },
    checkCanClick() {
      console.log("layoutData:", this.layoutData);
      return (this.layoutData.click && this.layoutData.click.canClick) ? true : false;
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
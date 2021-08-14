import chartResize from "../../util/chart-resize";

/*根据对应参数获取颜色*/
const mixinGainColor = {
  methods: {
    gainColorByIndex(dataIndex) {
      return this.chartData.colors[dataIndex];
    },
    gainColorByKey(dataKey, xFiled) {
      return this.chartData.xColors.find(item => item.keys[xFiled] === dataKey).color;
    },
    gainColorByParam(dataKey, xFiled, index) {
      if (this.chartData.colors)
        return this.gainColorByIndex(index);
      return this.gainColorByKey(dataKey, xFiled);
    }
  }
};

/*混入饼状图点击事件*/
const mixinPieChartClick = {
  mounted() {
    this.$nextTick(() => {
      this.chartOption.series[0].selectedMode = this.checkCanSelect();
      if (this.checkCanClick())
        this.myChart.on("click", this.chartClick);
    });
  },
  props: ["chartNextClick"],
  methods: {
    chartClick({ data, dataIndex }) {
      console.log("chartClick");
      if (this.checkCanSelect())
        this.chartSelect(data, dataIndex);
      const nextChart = this.layoutData.click.chart;
      if (nextChart) {
        console.log("nextClick:" + nextChart);
        // this.$bus.$emit("nextClick", nextChart);
        this.chartNextClick(nextChart);
      }
    },
    chartSelect(data, dataIndex) {
      const dataArr = this.chartOption.series[0].data;
      dataArr.forEach((item, index) => {
        item.selected = index === dataIndex;
      });
      dataArr[dataIndex].selected = data.selected = !data.selected;
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

/*随dom元素大小改变刷新echarts视图*/
const mixinChartResize = {
  mounted() {
    console.log("mixinMounted");
    this.$nextTick(() => {
      let chartDom = this.$refs.chartBody;
      this.myChart = this.$echarts.getInstanceByDom(chartDom);
      chartResize(this.myChart, this.$refs.chartBody);
    });
  }
};

/*混入调用远程js文件*/
const mixinRemoteJs = {
  components: {
    "remote-js": {
      render(h) {
        return h("script", { attrs: { type: "text/javascript", src: this.src } });
      },
      props: {
        src: { type: String, required: true }
      }
    }
  }
};

export {
  mixinChartResize,
  mixinGainColor,
  mixinRemoteJs,
  mixinPieChartClick
};
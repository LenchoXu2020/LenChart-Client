<template>
  <div class="root-container h-full">
    <top-bar :title="fullTitle"></top-bar>
    <div class="chart-container">
      <grid-app-new :control-btn-full-visible="controlBtnFullVisible"
                    :depth="1" ref="grid"
                    :theme-data="themeData"></grid-app-new>
      <div class="tool-btn" v-show="isCanFull&&controlCanFull">
        <!--        <el-button type="info" icon="el-icon-message" circle></el-button>-->
        <el-button @click="changeMiniFullModel" type="warning" icon="el-icon-star-off" circle></el-button>
      </div>
    </div>
    <len-legend class="len-legend"></len-legend>
  </div>
</template>

<script>
import TopBar from "../components/TopBar";
import GridAppNew from "./GridApp";
import LenLegend from "../components/LenLegend";

export default {
  name: "GridAppContainer",
  mounted() {
    this.$bus.$on("toggleTheme", data => {
      console.log("我是GridApp组件，收到了专题数据：", data);
      this.themeData = data;
      this.initData();
    });
  },
  data() {
    return {
      fullTitle: "全国土地利用结构汇总统计",
      themeData: {},
      isMiniModel: true,
      isCanFull: false,
      controlCanFull: true,
      configData: {}
    };
  },
  components: { LenLegend, GridAppNew, TopBar },
  methods: {
    getDataFromServer() {
      const { themeGroup, themeItem } = this.themeData;
      return this.$http.get(`/layout/${themeGroup}/${themeItem}.json`);
    },
    async initData() {
      const { data: ret } = await this.getDataFromServer();
      console.log("ret:", ret);
      this.configData = ret;
      this.isCanFull = this.configData.canFulled;
      this.fullTitle = this.configData.title; // 专题标题
      this.$refs.grid.initData(this.configData.mini);
    },
    changeMiniFullModel() {
      this.isMiniModel = !this.isMiniModel;
      const curModel = this.isMiniModel ? "mini" : "full";
      this.$refs.grid.initData(this.configData[curModel]);
    },
    controlBtnFullVisible(visible) {
      this.controlCanFull = visible;
    }
  }
};
</script>

<style scoped>
.root-container {
  padding: 0 5px 5px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
}

.chart-container {
  /*height: calc(100% - 70px);*/
  /*height: 100%;*/
  flex: 1;
  width: 100%;
  position: relative;
}

.tool-btn {
  position: absolute;
  bottom: 20px;
  right: 20px;
}

.len-legend{
  position: absolute;
  left: 50px;
  bottom: 55%;
}

</style>
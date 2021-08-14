<template>
  <div id="gridApp" ref="grid" class="chart-container" :style="[gridStyle]">
    <el-button circle v-if="depth>1 && nextLayouts.length+1 === depth" class="btn-back"
               @click="btnBackClick"
               type="primary" size="mini"
               icon="el-icon-d-arrow-left"
               title="返回"></el-button>

    <chart-model class="chart-component w-full" :class="[{'grid-gap':nextLayouts.length+1 === depth}]"
                  v-show="!data.hidden"
                  :key="data.key"
                  v-for="(data,index) of layoutDatas"
                  :prop-btn-max-click="btnMaxClick"
                  :prop-btn-back-click="popLayoutData"
                  :prop-next-click="pushLayoutData"
                  :check-can-back="checkCanBack"
                  :layout-data="data"
                  :parent-layout-data="layoutDatas"
                  :prop-chart-title-click="chartTitleClick"
                  :theme-data="themeData">
      <grid-app :depth="depth+1" :theme-data="themeData"></grid-app>
    </chart-model>
  </div>
</template>

<script>
import ChartModel from "./ChartModel";
import { mapState, mapActions } from "vuex";

export default {
  name: "GridApp",
  mounted() {
    // this.initData();
  },
  data() {
    return {
      layoutDatas: [],
      gridStyle: {},
      layoutMap: {},
      showChild: false
    };
  },
  props: ["themeData", "depth", "controlBtnFullVisible"],
  computed: {
    ...mapState(["nextLayouts"]),
    thisDepth() {
      return this.depth + 1;
    }
  },
  components: { ChartModel },
  methods: {
    ...mapActions(["pushNextLayout", "popNextLayout"]),
    initData(layoutModel) {
      this.curLayoutModel = layoutModel;
      this.gridStyle = this.curLayoutModel.layout;
      this.layoutDatas = this.curLayoutModel.charts.map(t => ({ ...t }));
    },
    pushLayoutData(layoutData) {
      console.log("pushLayoutData", layoutData);
      const gridArea = layoutData.layout["grid-area"];
      let index = this.layoutDatas.findIndex(v => v.layout["grid-area"] == gridArea);
      if (index < 0) return;
      const oldLayoutData = this.layoutDatas.splice(index, 1, layoutData)[0];
      if (!this.layoutMap.hasOwnProperty(gridArea))
        this.layoutMap[gridArea] = [oldLayoutData];
      else this.layoutMap[gridArea].push(oldLayoutData);
    },
    popLayoutData(gridArea) {
      console.log("popLayoutData:" + gridArea);
      if (this.layoutMap.hasOwnProperty(gridArea) && this.layoutMap[gridArea].length > 0) {
        let index = this.layoutDatas.findIndex(v => v.layout["grid-area"] == gridArea);
        if (index < 0) return;
        const lastLayoutData = this.layoutMap[gridArea].pop();
        this.layoutDatas.splice(index, 1, lastLayoutData);
      }
    },
    checkCanBack(gridArea) {
      if (this.layoutMap.hasOwnProperty(gridArea))
        return this.layoutMap[gridArea].length > 0;
      return false;
    },
    btnMaxClick(layoutData, childInstance) {
      const gridArea = layoutData.layout["grid-area"];
      const findGrid = this.layoutDatas.find(v => v.layout["grid-area"] == gridArea);
      this.layoutDatas.forEach(item => item.hidden = item.layout["grid-area"] != gridArea);
      const newGridArea = this.gainGridArea(this.$refs.grid);
      findGrid.layout["grid-area"] = newGridArea;

      this.pushNextLayout({ findGrid, gridArea, childInstance, layoutDatas: this.layoutDatas });
    },
    gainGridArea(domEle) {
      console.log(this.$refs.grid);
      const gridRows = window.getComputedStyle(domEle).getPropertyValue("grid-template-rows");
      const gridRowCount = gridRows.split(" ").length;
      const gridCols = window.getComputedStyle(domEle).getPropertyValue("grid-template-columns");
      const gridColCount = gridCols.split(" ").length;
      return `1 / 1 / ${gridRowCount + 1} /${gridColCount + 1}`;
    },
    /*btnMaxClick(layoutData, slotInstance) {
      const gridArea = layoutData.layout["grid-area"];
      const findGrid = this.layoutDatas.find(v => v.layout["grid-area"] == gridArea);
      this.layoutDatas.forEach(item => item.active = item.layout["grid-area"] == gridArea);
      const newGridArea = this.gainGridArea(this.$refs.grid);
      findGrid.layout["grid-area"] = newGridArea;
      slotInstance?.initData(layoutData.maxItem);
    },*/
    btnBackClick() {
      const { findGrid, gridArea, childInstance, layoutDatas } = this.nextLayouts.pop();
      findGrid.layout["grid-area"] = gridArea;
      childInstance.showChild = false;
      layoutDatas.forEach(item => item.hidden = false);
    },
    chartTitleClick({ key, isChecked }) {
      console.log(key);
      console.log(isChecked);
      if (isChecked) {
        this.layoutDatas.forEach(v => v.title.isChecked = v.key == key);
      }
      console.log(this.layoutDatas.map(t => t.key));
      console.log(this.layoutDatas.map(t => t.title));
    }
  },
  watch: {
    nextLayouts(newVal, oldVal) {
      this.controlBtnFullVisible(newVal.length === 0);
      /*if (newVal.length > 0) {
        console.log("...........");
        this.controlBtnFullVisible(false);
      } else {
        console.log("&&&&&&&&&&&&&");
        this.controlBtnFullVisible(true);
      }*/
    }
  }
};
</script>

<style scoped>
.chart-container {
  height: 100%;
  width: 100%;
  display: grid;
  place-content: stretch stretch;
  /*grid-gap: 10px;*/
  /*  grid-gap: 10px;
    box-sizing: border-box;*/
  position: relative;
}

.grid-gap {
  padding: 5px 5px;
}

.chart-component {
  /*padding: 5px 5px;*/
  box-sizing: border-box;
  /*background-color: #481552;*/
}

#gridApp .btn-back {
  position: absolute;
  width: 30px;
  height: 30px;
  bottom: 30px;
  right: 30px;
  z-index: 99;
}

</style>
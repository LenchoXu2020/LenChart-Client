<template>
  <div class="topBarContainer">
    <menu-bar class="menuBarContainer"></menu-bar>
    <div class="fullTitle">
      <div class="before-bg"></div>
      <div class="titleContent">{{ title }}</div>
      <div class="after-bg"></div>
    </div>
    <div class="right-menu">
      <ChartTheme class="chart-theme"></ChartTheme>
      <RightMenuBar></RightMenuBar>
    </div>
  </div>
</template>

<script>
import MenuBar from "./MenuBar";
import RightMenuBar from "./RightMenuBar";
import ChartTheme from "./ChartTheme";

export default {
  name: "TopBar",
  data() {
    return {
      //title:"全国土地利用结构汇总统计"
    };
  },
  props: ["title", "showMenuBar"],
  components: {
    MenuBar,
    RightMenuBar,
    ChartTheme
  }
};
</script>

<style scoped>
.topBarContainer {
  height: 70px;
  position: relative;
}

.menuBarContainer {
  position: absolute;
  top: 20px;
  left: 20px;
}

.right-menu {
  position: absolute;
  right: 20px;
  top: 20px;
  display: flex;
}

.chart-theme {
  margin-right: 50px;
}

.titleContent {
  text-align: center;
  font-size: 30px;
  color: #83f6df;
  line-height: 70px;
  margin: 0 10px;
}

.fullTitle {
  display: flex;
  justify-content: center;
}

.before-bg {
  margin-top: 22px;
  width: 456px;
  height: 29px;
  background: url(../assets/layoutImages/顶部装饰左.png) no-repeat center center;
}

.after-bg {
  margin-top: 22px;
  margin-left: -18px;
  width: 456px;
  height: 29px;
  background: url(../assets/layoutImages/顶部装饰右.png) no-repeat center center;
}
</style>
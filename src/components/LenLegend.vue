<template>
  <div id="legend">
    <div class="legend-container" v-show="!isMini">
      <div v-for="itemGroup of legendData" :key="itemGroup.id" class="legend-group">
        <div class="legend-title" @click="itemGroup.title.isExpand=!itemGroup.title.isExpand">
          <img src="../assets/images/箭头.svg" :class="[{'unexpand':!itemGroup.title.isExpand}]"
               style="width: 20px;height: 20px;">
          <span class="title-text">{{ itemGroup.title.text }}</span>
        </div>
        <div class="legend-body" v-show="itemGroup.title.isExpand">
          <div class="legend-item" v-for="item of itemGroup.children">
            <div :class="[{'uncheck-opacity':!item.isCheck}]" class="legend-icon"
                 :style="{backgroundColor:item.color}"></div>
            <div @click="legendItemClick(itemGroup,item)" :class="[{'uncheck-opacity':!item.isCheck}]"
                 class="item-text">
              {{ item.text }}
            </div>
            <img @click="legendItemLocate(itemGroup,item)" class="item-locate" src="../assets/images/定位.svg">
          </div>
        </div>
      </div>
      <img class="zoom-out" src="../assets/images/缩小.svg" @click="isMini=true">
    </div>
    <img class="zoom-in" src="../assets/images/legend.svg" @click="isMini=false" v-show="isMini">
  </div>

</template>

<script>
export default {
  name: "LenLegend",
  mounted() {
    this.$bus.$on("initLegendData", (isShow, data) => {

    });
  },
  data() {
    return {
      isMini: false,
      legendData: [
        {
          id: "1001",
          title: { text: "一级地类", isExpand: true },
          children: [
            {
              color: "#b9e0ca",
              text: "湿地",
              isCheck: true
            },
            {
              color: "#fffbb1",
              text: "耕地",
              isCheck: true
            },
            {
              color: "#d6a7c9",
              text: "种植园用地",
              isCheck: true
            },
            {
              color: "#31ad69",
              text: "林地",
              isCheck: true
            },
            {
              color: "#83c238",
              text: "草地",
              isCheck: true
            },
            {
              color: "#e2a195",
              text: "商业服务业用地",
              isCheck: true
            },
            {
              color: "#c59a8c",
              text: "工矿用地",
              isCheck: true
            },
            {
              color: "#e56766",
              text: "住宅用地",
              isCheck: true
            },
            {
              color: "#f191b4",
              text: "公共管理与公共服务用地",
              isCheck: true
            }
          ]
        }
      ]
    };
  },
  methods: {
    legendItemClick(itemGroup, item) {
      console.log("---------------------------", item);
      item.isCheck = !item.isCheck;
    },
    legendItemLocate(itemGroup, item) {
      item.isCheck = true;
      const allCheck = itemGroup.children.every(v => v.isCheck);
      if (allCheck)
        itemGroup.children.forEach(v => {
          v.isCheck = v == item;
        });
      else
        itemGroup.children.forEach(v => v.isCheck = true);
    }
  }
};
</script>

<style scoped>

.legend-container {
  border-radius: 5px;
  background-color: #160c3e55;
  padding: 15px 10px;
  min-height: 200px;
  max-height: 300px;
  overflow-y: auto;
  min-width: 150px;
}

.legend-container
.legend-group {
  display: flex;
  flex-direction: column;
}

.legend-group {
  margin: 10px 0;
}

.legend-title {
  display: flex;
  cursor: pointer;
  margin-bottom: 8px;
}

.title-text {
  margin-left: 10px;
  font-size: 18px;
  color: #fff
}

.legend-body {
  margin: 5px 0 0 5px;
  display: flex;
  flex-direction: column;
}

.legend-item {
  color: #ccc;
  display: flex;
  margin-bottom: 10px;
}

.legend-item:hover .item-locate {
  opacity: 1;
}

.legend-icon {
  cursor: pointer;
  width: 16px;
  height: 16px;
  border-radius: 50%;
}

.item-text {
  cursor: pointer;
  margin-left: 10px;
  color: #ccc;
  font-size: 16px;
}

.item-locate {
  cursor: pointer;
  /*display: none;*/
  opacity: 0;
  margin-left: 5px;
  width: 16px;
  height: 16px;
}

.unexpand {
  transform: rotate(-90deg);
}

.check-opacity {
  opacity: 1;
}

.uncheck-opacity {
  opacity: 0.5;
}

::-webkit-scrollbar { /*滚动条整体样式*/
  width: 10px; /*高宽分别对应横竖滚动条的尺寸*/
  height: 1px;
}

::-webkit-scrollbar-thumb { /*滚动条里面小方块*/
  border-radius: 10px;
  -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  background: #85ce61;
}

::-webkit-scrollbar-track { /*滚动条里面轨道*/
  -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  background: #0f2f34;
}

.legend-container:hover .zoom-out {
  display: block;
}

.zoom-out {
  display: none;
  position: absolute;
  top: 10px;
  right: 10px;
  width: 20px;
  height: 20px;
  cursor: pointer;
}

.zoom-in {
  cursor: pointer;
}
</style>
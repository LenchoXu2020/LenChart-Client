<template>
  <div id="RightMenuBar2">
    <el-popover
      placement="right"
      width="400"
      transition="fade-in-linear"
      trigger="click">
      <div id="popContainer">
        <el-input
          placeholder="输入关键字进行过滤"
          v-model="filterText">
        </el-input>
        <el-tree
          class="filter-tree"
          :data="data"
          @node-click="nodeClick"
          :props="defaultProps"
          accordion
          :filter-node-method="filterNode"
          ref="tree">
        </el-tree>
      </div>
      <el-button @click="btnClick" type="primary" slot="reference">{{ curRegion.label }}</el-button>
    </el-popover>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  name: "RightMenuBar",
  data() {
    return {
      curRegion: {},
      filterText: "",
      data: [{
        id: "000000", label: "全国", level: "qg", children: [{
          id: "110000", level: "sj", label: "北京",
          children: [{
            id: "110102", level: "xj", label: "西城区"
          }, {
            id: "110107", level: "xj", label: "石景山区"
          }]
        }, {
          id: "120000", level: "sj", label: "天津",
          children: [{
            id: "120102", level: "xj", label: "河东区"
          }, {
            id: "120116", level: "xj", label: "滨海新区"
          }]
        }, {
          id: "370000", level: "sj", label: "山东",
          children: [{
            id: "370200", level: "dsj", label: "青岛"
          }, {
            id: "370600", level: "dsj", label: "烟台"
          }]
        }]
      }]
      ,
      defaultProps: {
        children: "children",
        label: "label"
      }
    };
  },
  mounted() {
    this.curRegion = this.data[0];
  },
  watch: {
    filterText(val) {
      this.$refs.tree.filter(val);
    },
    curRegion(val) {
      // console.log(111, val);
      // this.$bus.$emit("regionChanged", val);//把当前行政区发布出去
      console.log(val);
      this.changeRegion({
        regionCode: val.id,
        regionName: val.label,
        regionLevel: val.level
      });
    }
  },
  methods: {
    ...mapActions({ changeRegion: "updateRegionInfo" }),
    btnClick() {
      console.log("btnClick...");
    },
    filterNode(value, data) {
      if (!value) return true;
      return data.label.indexOf(value) !== -1;
    },
    /*共三个参数，依次为：传递给 data 属性的数组中该节点所对应的对象、节点对应的 Node、节点组件本身。*/
    nodeClick(data, node, tree) {
      this.curRegion = data;
      //console.log(data, node, tree);
    }
  }

};
</script>

<style>
.el-popover {
  background-color: #297380;
  border-color: aqua;
}

#popContainer .el-tree {
  color: #cccccc;
}

#popContainer .el-input__inner, .el-tree {
  background-color: transparent;
}

/*#popContainer .el-tree  .is-current {
  background-color: pink;
}

#popContainer .el-tree  .is-current,is-focuable :hover{
  background-color: pink;
}*/
</style>
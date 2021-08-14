<template>
  <el-select v-model="curValue" filterable placeholder="请选择" @change="selectChanged" value-key="id">
    <el-option-group
      v-for="group in options"
      :key="group.label"
      :label="group.label">
      <el-option
        v-for="item in group.options"
        :key="item.themeItem"
        :label="item.label"
        :value="item">
      </el-option>
    </el-option-group>
  </el-select>
</template>

<script>
export default {
  name: "ChartTheme",
  mounted() {
    this.curValue = this.options[1].options[0];
  },
  data() {
    return {
      options: [{
        label: "林地",
        options: [{
          id: "1", themeGroup: "林地", themeItem: "林地一张图总体情况", label: "总体情况"
        }, {
          id: "2", themeGroup: "林地", themeItem: "林地一张图", label: "林地一张图"
        }]
      }, {
        label: "土地利用现状",
        options: [
          {
            id: "3", themeGroup: "土地利用现状", themeItem: "永久基本农田", label: "永久基本农田"
          }
        ]
      }],
      curValue: {}
    };
  },
  methods: {
    selectChanged(val) {
      // console.log(val);
      //this.$bus.$emit("toggleTheme", val);
    }
  },
  watch: {
    curValue: function(newVal, oldVal) {
      // console.log(newVal);
      this.$bus.$emit("toggleTheme", newVal);
    }
    /*curValue: {
      immediate: true,
      handler(newVal, oldVal) {
        this.$bus.$emit("toggleTheme", newVal);
      }
    }*/
  }
};
</script>

<style scoped>

</style>
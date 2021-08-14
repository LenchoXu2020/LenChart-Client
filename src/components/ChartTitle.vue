<template>
  <div @click="titleClick" class="chart-title"
       :class="[{'chart-title-checked':titleTag.isChecked},{'chart-title-click':titleTag.isCanClick}]">{{ titleData.text }}
  </div>
</template>

<script>
export default {
  name: "ChartTitle",
  data() {
    return {
      // titleName: this.titleData.text,
      // isCanClick: this.titleTag.isCanClick,
      // isChecked: this.titleTag.isChecked
    };
  },
  props: ["titleData", "titleTag", "chartTitleClick"],
  methods: {
    titleClick() {
      if (!this.titleTag?.isCanClick) return;
      this.titleTag.isChecked  = !this.titleTag.isChecked;
      this.chartTitleClick?.call(null, { ...this.titleData, isChecked: this.titleTag.isChecked });
    }
  },
  computed: {}
};
</script>

<style scoped>
.chart-title {
  text-align: center;
  line-height: 30px;
  font-size: 18px;
  color: rgb(1, 211, 18);
}

.chart-title-click {
  cursor: pointer;
}

.chart-title-checked {
  color: orange
}
</style>
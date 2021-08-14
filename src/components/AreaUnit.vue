<template>
  <div id="area-unit">
    <span class="area" style="">（面积单位 : </span>
    <div class="drop-down" @mouseover="isShowMenu=true" @mouseleave="isShowMenu=false">
      <span class="cur-unit">{{ curUnit.unitName }}</span>
      <div class="menu" v-show="isShowMenu">
        <div @click="menuItemClick(item)" v-for="item of unitList.filter(t=>!t.isChecked)" class="menu-item">
          {{ item.unitName }}
        </div>
      </div>
    </div>
    <span class="area">）</span>
  </div>
</template>

<script>
export default {
  name: "AreaUnit",
  mounted() {
  },
  props: ["unitSelect"],
  data() {
    return {
      unitList: [
        { unitName: "万亩", unitId: "100", isChecked: true },
        { unitName: "平方千米", unitId: "101", isChecked: false },
        { unitName: "平方米", unitId: "102", isChecked: false },
        { unitName: "万公顷", unitId: "103", isChecked: false }
      ],
      isShowMenu: false
    };
  },
  methods: {
    menuItemClick(item) {
      this.unitList.forEach(v => v.isChecked = v === item);
      this.isShowMenu = false;
      this.unitSelect?.call(null,item)
    }
  },
  computed: {
    curUnit() {
      return this.unitList.find(t => t.isChecked);
    }
  }
};
</script>

<style scoped>
#area-unit {
  display: flex;
  justify-content: center;
  height: 16px;
  line-height: 16px;
  z-index: 999;
}

.area {
  color: #ccc
}

.drop-down {
  color: white;
  position: relative;
}

.cur-unit:hover {
  border-bottom: 1px solid #bfa;
  cursor: pointer;
}

.menu {
  position: absolute;
  flex-direction: column;
  background-color: #0f2f34;
  width: 80px;
}

/*.drop-down:hover .menu {
  display: flex;
}*/

.menu-item {
  cursor: pointer;
  line-height: 18px;
}

.menu-item:hover {
  background-color: #021b47;
}
</style>
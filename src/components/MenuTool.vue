<template>
  <el-row>
    <el-button v-if="menuState.canBack" @click="menuState.btnBackClick" type="primary" size="mini" icon="el-icon-d-arrow-left" circle
               title="返回"></el-button>
    <el-button v-if="menuState.canMaximized" @click="menuState.btnMaxClick" type="success" size="mini" icon="el-icon-zoom-in" circle title="放大"></el-button>
  </el-row>
</template>

<script>
export default {
  name: "MenuTool",
  props:["menuState"]
};
</script>

<style scoped>

</style>
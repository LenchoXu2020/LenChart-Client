<template>
  <div id="menuBar" style="display: flex; z-index: 99999;" >
    <a href="javascript:;" @click="clear" class="clear">
      <img class="w18 h18" :src="reloadImg" alt="clear">
    </a>
    <div id="menu">
      <div class="menuList lencho-scroll-bar flex">
        <p v-for="(item,index) in itemList" v-bind:title="item.itemName" :key="item.id" class="menuItem">
          <span>{{ item.itemName }}</span>
          <a style="margin-left: 5px;" href="javascript:;" @click="removeAt(index)">
            <img class="menuItemClose" :src="closeImg" alt="">
          </a>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import reloadImg from "../assets/images/Reload.png";
import closeImg from "../assets/images/Close-WF.png";
import { mapState, mapActions } from "vuex";

export default {
  name: "MenuBar",
  data() {
    return {
      reloadImg, closeImg
    };
  },
  mounted() {

  },
  computed: {
    ...mapState({ itemList: "itemList" })
  },
  props: ["title"],
  methods: {
    ...mapActions({ removeAt: "removeItemAt", clearItems: "clearItems" }),
    clear() {
      this.clearItems();
      //this.$bus.$emit('hello','lencho')
    }
  }
};
</script>

<style scoped>
.menuBarContainer{
  position: absolute;
  top: 20px;
  left: 20px;
}

.clear{
  margin:3px 10px 0 0;
}

.menuItem {
  border: 1px solid #fff;
  border-radius: 10px;
  padding: 2px 5px;
  margin-right: 3px;
}

.menuItem span {
  font-size: 14px;
  line-height: 18px;
  color: azure;
}

.menuItemClose {
  margin-top: 3px;
  width: 10px;
  height: 10px;
}
</style>
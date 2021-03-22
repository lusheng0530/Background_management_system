<template>
  <div class="menu">
    <el-button type="primary" @click="addMenu">添加</el-button>
    <v-add :info="info" ref="add"></v-add>
    <v-list @edit="setMenuDetail"></v-list>
  </div>
</template>

<script>
import vList from "./components/list";
import vAdd from "./components/add";

export default {
  data() {
    return {
      info: {
        isShow: false,
        isAdd: true,
        addTitle: ""
      }
    };
  },
  methods: {
    setMenuDetail(id) {
      this.info.isAdd = false;
      this.info.isShow = true;
      this.info.addTitle = "修改菜单";
      this.$refs.add.getMenuDetail(id);
    },
    addMenu() {
      this.info.isShow = true;
      this.info.addTitle = "添加菜单";
      this.info.isAdd = true;
    }
  },
  components: {
    vList,
    vAdd
  },
  mounted() {
    document.title = this.$route.name;
  }
};
</script>

<style scoped>
</style>
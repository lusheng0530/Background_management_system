<template>
  <div>
    <el-button type="primary" @click="addUser">添加</el-button>
    <v-add ref="ref" :info="info"></v-add>
    <v-list ref="list" @enit="setUser" ></v-list>
  </div>
</template>

<script>
import vList from "./components/list";
import vAdd from "./components/add"

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
    addUser() {
        this.info.isAdd = true;
        this.info.isShow = true;
        this.info.addTitle = "添加管理员"
    },
    setUser(id){
        this.info.isAdd = false;
        this.info.isShow = true;
        this.info.addTitle = "修改管理员";
        this.$refs.ref.getOneUser(id)  
    }
  },
  components: {
    vList,
    vAdd
  },
  mounted(){
    document.title = this.$route.name
  }
};
</script>

<style>
</style>
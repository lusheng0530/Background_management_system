<template>
  <div>
      <el-button type="primary" @click="addBanner">添加</el-button>
      <v-list @banner="SetBanner"></v-list>
      <v-add ref="ban" :info="info"></v-add>
  </div>
</template>

<script>
import vList from "./components/list";
import vAdd from "./components/add";

export default {
    data(){
        return {
            info:{
                isShow:false,
                isAdd:true,
                title:""
            }
        }
    },
    methods:{
        addBanner(){
            this.info.isShow=true;
            this.info.isAdd=true;
            this.info.title = "添加轮播图";
        },
        SetBanner(id){
            this.info.isShow=true;
            this.info.isAdd=false;
            this.info.title = "修改轮播图";
            this.$refs.ban.getOnceBanner(id)
        }
    },
    components:{
        vList,
        vAdd
    }
}
</script>

<style>

</style>
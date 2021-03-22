<template>
  <div>
      <el-button type="primary" @click="addSpecs">添加</el-button>
      <v-list @enitSpecs="enitSpecs"></v-list>
      <v-add ref="specs" :info="info"></v-add>
  </div>
</template>

<script>
import vList from "./components/list"
import vAdd from "./components/add"

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
        addSpecs(){
            this.info.isShow = true;
            this.info.isAdd = true;
            this.info.title = "添加商品规格"
        },
        enitSpecs(id){
            this.info.isShow = true;
            this.info.isAdd = false;
            this.info.title = "修改商品规格";
            this.$refs.specs.getOneSpecs(id);
        }
    },
    components:{
        vList,
        vAdd
    },
    mounted(){
        document.title = this.$route.name
    }
}
</script>

<style>

</style>
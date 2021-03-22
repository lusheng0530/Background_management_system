<template>
  <div id="goods">
      <el-button type="primary" @click="add">添加</el-button>
      <v-list @enit="enit" @oneGoods="oneGoods"></v-list>
      <v-add ref="goods" :info="info"></v-add>
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
                title:"",
                isPage:true
            }
        }
    },
    methods:{
        enit(isPage){
            this.info.isPage=isPage;
        },
        add(){
            this.info.isShow=true;
            this.info.isAdd=true;
            this.info.title="商品添加"
        },
        oneGoods(id){
            this.info.isShow=true;
            this.info.isAdd=false;
            this.info.title="商品修改"
            this.$refs.goods.oneGoods(id);
        }
    },
    mounted(){
        document.title = this.$route.name
    },
    components:{
        vList,
        vAdd
    }
}
</script>

<style>

</style>
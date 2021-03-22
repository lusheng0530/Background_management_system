<template>
  <div id="seckill">
    <el-button type="primary" @click="addSeckill">添加</el-button>
    <v-list @enit="enit"></v-list>
    <v-add ref="add" :info="info"></v-add>
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
        addSeckill(){
            this.info.isShow = true;
            this.info.isAdd = true;
            this.info.title = "添加活动"
        },
        enit(id){
            this.info.isShow = true;
            this.info.isAdd = false;
            this.info.title = "修改活动"
            this.$refs.add.getOnceSeckill(id)
        }
    },
    mounted(){
        document.title = this.$route.name;
    },
    components:{
        vList,
        vAdd
    }
}
</script>

<style>

</style>
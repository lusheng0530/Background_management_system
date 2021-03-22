<template>
    <div id="category">
        <el-button type="primary" @click="addCateGory">添加</el-button>
        <v-list @edit="setCate"></v-list>
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
                title:"",
                isShow:false,
                isAdd:true
            }
        }
    },
    methods:{
        addCateGory(){
            this.info.title = "添加商品列表";
            this.info.isShow = true;
            this.info.isAdd = true;
        },
        setCate(id){
            this.info.title = "修改商品列表";
            this.info.isShow = true;
            this.info.isAdd = false;
            this.$refs.add.getOneCate(id)
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
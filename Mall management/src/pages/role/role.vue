<template>
  <div class="role">
    <el-button type="primary" @click="addSole">添加</el-button>
    <v-add :info="info" ref="addSole"></v-add>
    <v-sole @enit="update"></v-sole>
  </div>
</template>

<script>
import vSole from "./components/list"
import vAdd from "./components/add"

export default {
    data(){
        return {
            info:{
                isShow:false,
                title:"角色添加",
                isAdd:true
            }
        }
    },
    methods:{
        // 添加用户
        addSole(){
            this.info.isShow = true;
            this.info.isAdd=true;
        },
        // 修改用户
        update(id){
            this.info.isAdd=false;
            this.info.isShow = true;
            this.info.title = "角色修改"
            this.$refs.addSole.getOneSole(id);
        }
    },
    components:{
        vSole,
        vAdd
    },
    mounted() {
        document.title = this.$route.name;
    }
};
</script>

<style>
</style>
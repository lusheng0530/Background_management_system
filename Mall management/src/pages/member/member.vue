<template>
  <div id="member">
      <v-list @member="member"></v-list>
      <v-update ref="member" :info="info"></v-update>
  </div>
</template>

<script>
import vList from "./components/list";
import vUpdate from "./components/update";

export default {
    data(){
        return {
            info:{
                isShow:false,
                isAdd:false,
                title:""
            }
        }
    },
    methods:{
        member(id){
            this.info.isShow=true;
            this.info.isAdd=false;
            this.info.title="会员修改"
            this.$refs.member.memberDetail(id);
        }
    },
    mounted(){
        document.title = this.$route.name;
    },
    components:{
        vList,
        vUpdate
    }
}
</script>

<style>

</style>
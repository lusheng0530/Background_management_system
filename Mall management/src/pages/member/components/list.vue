<template>
  <el-table
    :data="memberList"
    style="width: 100%;margin-bottom: 20px;"
    row-key="id"
    border
    :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
  >
    <el-table-column prop="id" label="用户编号"></el-table-column>
    <el-table-column prop="nickname" label="昵称"></el-table-column>
    <el-table-column prop="phone" label="手机号"></el-table-column>
    <el-table-column prop="status" label="状态">
      <template v-slot="prop">
          <el-button v-if="prop.row.status" type="primary">启用</el-button>
          <el-button v-else type="danger">禁用</el-button>
      </template>
    </el-table-column>
    <el-table-column prop="name" label="操作">
      <template v-slot="prop">
        <el-button type="primary" @click="setMenu(prop.row.uid)">编辑</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
import { mapActions , mapGetters } from "vuex";

export default {
    computed:{
        ...mapGetters({
            memberList:"member/memberList"
        })
    },
    methods:{
        ...mapActions({
            getMemberList:"member/getMemberList"
        }),
        setMenu(uid){
            this.$emit("member",uid);
        }
    },
    mounted(){
        this.getMemberList();
    }
}
</script>

<style>

</style>
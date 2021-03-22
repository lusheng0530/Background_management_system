<template>
  <div>
    <el-table
      :data="tableData"
      style="width: 100%;margin-bottom: 20px;"
      row-key="id"
      border
      :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
    >
      <el-table-column prop="id" label="角色编号"></el-table-column>
      <el-table-column prop="rolename" label="角色名称"></el-table-column>
      <el-table-column prop="status" label="状态">
        <el-button type="primary">启用</el-button>
        <!-- <el-button type="danger">禁用</el-button> -->
      </el-table-column>
      <el-table-column prop="name" label="操作">
        <template v-slot="prop">
          <el-button type="primary" @click="setMenu(prop.row.id)">编辑</el-button>
          <el-button type="danger" @click="delMenu(prop.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { delSloe } from "../../../utils/requests";
import { successAlert } from "../../../utils/sucessAlert";

export default {
  methods: {
    ...mapActions({
      getSoleList: "getSoleAction"
    }),
    setMenu(id) {
      this.$emit("enit", id);
    },
    delMenu(id) {
      this.$confirm("此操作将永久删除该菜单, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          delSloe({ id }).then(res => {
            successAlert(res.data.msg);
            this.getSoleList();
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    }
  },
  computed: {
    ...mapGetters({
      tableData: "getSoleList"
    })
  },
  mounted() {
    this.getSoleList();
  }
};
</script>

<style>
</style>
<template>
  <el-table
    :data="tableData"
    style="width: 100%;margin-bottom: 20px;"
    row-key="id"
    border
    :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
  >
    <el-table-column prop="id" label="菜单编号"></el-table-column>
    <el-table-column prop="title" label="菜单名称"></el-table-column>
    <el-table-column prop="icon" label="菜单图标"></el-table-column>
    <el-table-column prop="url" label="菜单地址"></el-table-column>
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
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { delMenuList } from "../../../utils/requests";
import { warningAlert } from "../../../utils/sucessAlert";

export default {
  computed: {
    ...mapGetters({
      tableData: "getMenu"
    })
  },
  methods: {
    ...mapActions({
      getMenu: "menuListAction"
    }),
    setMenu(id) {
      this.$emit("edit", id);
    },
    delMenu(id) {
      this.$confirm("此操作将永久删除该菜单, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          delMenuList({ id }).then(res => {
            warningAlert(res.data.msg);
            this.getMenu();
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
  mounted() {
    this.getMenu();
  }
};
</script>

<style>
</style>
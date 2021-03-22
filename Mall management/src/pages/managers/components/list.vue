<template>
  <div v-if="userList">
    <el-table
      :data="userList"
      style="width: 100%;margin-bottom: 20px;"
      row-key="id"
      border
      :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
    >
      <el-table-column prop="id" label="用户编号"></el-table-column>
      <el-table-column prop="username" label="用户名"></el-table-column>
      <el-table-column prop="roleid" label="所属角色"></el-table-column>
      <el-table-column prop="status" label="状态">
        <el-button type="primary">启用</el-button>
        <!-- <el-button type="danger">禁用</el-button> -->
      </el-table-column>
      <el-table-column prop="name" label="操作">
        <template v-slot="prop">
          <el-button type="primary" @click="setUser(prop.row.uid)">编辑</el-button>
          <el-button type="danger" @click="delUser(prop.row.uid)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      background
      layout="prev, pager, next"
      :current-page="oldPage"
      :total="count"
      :page-size="size"
      @current-change="handleCurrentChange"
    ></el-pagination>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { deleteUser } from "../../../utils/requests";
import { successAlert } from "../../../utils/sucessAlert";

export default {
  data() {
    return {
      oldPage: 1
    };
  },
  methods: {
    ...mapActions({
      getUserList: "mangers/getUserList",
      getUserNum: "mangers/getUserNum",
      getPage: "mangers/getPage"
    }),
    handleCurrentChange(e) {
      this.getPage(e);
      this.getUserList();
    },
    setUser(id) {
      this.$emit("enit", id);
    },
    delUser(id) {
      this.$confirm("此操作将永久删除该管理员, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          deleteUser({ uid: id }).then(res => {
            successAlert(res.data.msg);
            this.getUserNum();
            this.getUserList();
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
      count: "mangers/count",
      userList: "mangers/userList",
      size: "mangers/size"
    })
  },
  mounted() {
    this.getUserList();
    this.getUserNum();
  }
};
</script>

<style>
.el-pagination {
  text-align: right;
}
</style>
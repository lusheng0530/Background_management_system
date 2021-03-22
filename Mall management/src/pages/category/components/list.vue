<template>
  <el-table
    :data="cateGory"
    style="width: 100%;margin-bottom: 20px;"
    row-key="id"
    border
    :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
  >
    <el-table-column prop="id" label="分类编号"></el-table-column>
    <el-table-column prop="catename" label="分类名称"></el-table-column>
    <el-table-column label="图片">
      <template v-slot="prop">
        <img :src="$preImg+prop.row.img" alt />
      </template>
    </el-table-column>
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
import { delCateGory } from "../../../utils/requests";
import { successAlert } from "../../../utils/sucessAlert";

export default {
  data() {
    return {};
  },
  methods: {
    ...mapActions({
      getCateGory: "category/getCateGory"
    }),
    setMenu(id){
        this.$emit("edit",id)
    },
    delMenu(id) {
      this.$confirm("此操作将永久删除该商品列表, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          delCateGory({ id }).then(res => {
            successAlert(res.data.msg);
            this.getCateGory();
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
      cateGory: "category/cateGory"
    })
  },
  mounted() {
    this.getCateGory();
  }
};
</script>

<style>
img {
  width: 100px;
}
</style>
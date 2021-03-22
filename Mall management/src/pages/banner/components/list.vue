<template>
  <el-table
    :data="bannerList"
    style="width: 100%;margin-bottom: 20px;"
    row-key="id"
    border
    :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
  >
    <el-table-column prop="id" label="编号"></el-table-column>
    <el-table-column prop="title" label="轮播图标题"></el-table-column>
    <el-table-column label="图片">
      <template v-slot="prop">
        <img :src="$preImg+prop.row.img" alt />
      </template>
    </el-table-column>
    <el-table-column prop="status" label="状态">
      <template v-slot="prop">
        <el-button v-if="prop.row.status == 1" type="primary">启用</el-button>
        <el-button v-else type="danger">禁用</el-button>
      </template>
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
import { delBanner } from "../../../utils/requests";
import { successAlert } from "../../../utils/sucessAlert";

export default {
  data() {
    return {
      imageUrl: ""
    };
  },
  computed: {
    ...mapGetters({
      bannerList: "banner/bannerList"
    })
  },
  methods: {
    ...mapActions({
      getBannerList: "banner/getBannerList"
    }),
    setMenu(id) {
      this.$emit("banner", id);
    },
    delMenu(id) {
      this.$confirm("此操作将永久删除该轮播图, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          delBanner({ id }).then(res => {
            successAlert(res.data.msg);
            this.getBannerList();
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
    this.getBannerList();
  }
};
</script>

<style>
img {
  width: 100px;
}
</style>
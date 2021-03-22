<template>
  <div id="specs">
    <el-table
      :data="specsList"
      style="width: 100%;margin-bottom: 20px;"
      row-key="id"
      border
      :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
    >
      <el-table-column prop="id" label="规格编号"></el-table-column>
      <el-table-column prop="specsname" label="规格名称"></el-table-column>
      <el-table-column prop="attrs" label="规格属性">
        <template v-slot="prop">
          <el-tag v-for="(item,index) in prop.row.attrs" :key="index">{{item}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="status" label="状态">
        <el-button type="primary">启用</el-button>
        <!-- <el-button type="danger">禁用</el-button> -->
      </el-table-column>
      <el-table-column prop="name" label="操作">
        <template v-slot="prop">
          <el-button type="primary" @click="setSpecs(prop.row.id)">编辑</el-button>
          <el-button type="danger" @click="delSpecs(prop.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      background
      layout="prev, pager, next"
      :total="count"
      :page-size="size"
      @current-change="handleCurrentChange"
    ></el-pagination>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { delSpecs } from "../../../utils/requests";
import { successAlert } from "../../../utils/sucessAlert";

export default {
  computed: {  
    ...mapGetters({
      size: "specs/size",
      page: "specs/page",
      count: "specs/count",
      specsList: "specs/specsList"
    })
  },
  methods: {
    ...mapActions({
      getPage: "specs/getPage",
      getCount: "specs/getCount",
      getSpecsList: "specs/getSpecsList"
    }),
    // 当分页变动时触发的函数
    handleCurrentChange(e) {
      this.getPage(e);
      this.getSpecsList();
    },
    // 删除
    delSpecs(id) {
      this.$confirm("此操作将永久删除该商品规格, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          delSpecs({ id }).then(res => {
            successAlert(res.data.msg);
            this.getCount();
            this.getSpecsList();
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    // 修改
    setSpecs(id){
        this.$emit("enitSpecs",id)
    }
  },
  mounted() {
    this.getCount();
    this.getSpecsList();
  }
};
</script>

<style>
</style>
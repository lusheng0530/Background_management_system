<template>
  <div id="specs">
    <el-table
      :data="seckillList"
      style="width: 100%;margin-bottom: 20px;"
      row-key="id"
      border
      :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
    >
      <el-table-column prop="title" label="活动名称"></el-table-column>
      <el-table-column label="状态">
        <template v-slot="prop">
          <el-button v-if="prop.row.status == 1" type="primary">启用</el-button>
          <el-button v-else type="danger">禁用</el-button>
        </template>
      </el-table-column>
      <el-table-column prop="name" label="操作">
        <template v-slot="prop">
          <el-button type="primary" @click="setSeckill(prop.row.id)">编辑</el-button>
          <el-button type="danger" @click="delSeckill(prop.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { deleteSeckill } from "../../../utils/requests";
import { successAlert } from "../../../utils/sucessAlert";

export default {
  computed: {
    ...mapGetters({
      seckillList: "seckill/seckillList"
    })
  },
  methods: {
    ...mapActions({
      getSeckillList: "seckill/getSeckillList"
    }),
    setSeckill(id) {
      this.$emit("enit", id);
    },
    delSeckill(id) {
      this.$confirm("此操作将永久删除该秒杀活动, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          deleteSeckill({ id }).then(res => {
            successAlert(res.data.msg);
            this.getSeckillList();
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
    this.getSeckillList();
  }
};
</script>

<style>
</style>
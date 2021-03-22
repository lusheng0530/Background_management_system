<template>
  <div id="goods_list">
    <div id="isPage">
      <b>分页:</b>
      <el-switch v-model="isPage" active-color="#13ce66" inactive-color="#ff4949" @change="paging"></el-switch>
    </div>
    <el-table
      :data="goodsList"
      style="width: 100%;margin-bottom: 20px;"
      row-key="id"
      border
      :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
    >
      <el-table-column prop="id" label="商品编号"></el-table-column>
      <el-table-column prop="goodsname" label="商品名称"></el-table-column>
      <el-table-column prop="price" label="商品价格">
        <template v-slot="prop">{{ prop.row.price | priceFilter }}</template>
      </el-table-column>
      <el-table-column prop="market_price" label="市场价格">
        <template v-slot="prop">{{ prop.row.market_price | priceFilter }}</template>
      </el-table-column>
      <el-table-column prop="img" label="图片">
        <template v-slot="prop">
          <img :src="$preImg + prop.row.img" alt />
        </template>
      </el-table-column>
      <el-table-column prop="isnew" label="是否新品">
        <template v-slot="prop">
          <el-button v-if="prop.row.isnew == 1" type="primary">是</el-button>
          <el-button v-else type="danger">否</el-button>
        </template>
      </el-table-column>
      <el-table-column prop="ishot" label="是否热卖">
        <template v-slot="prop">
          <el-button v-if="prop.row.ishot == 1" type="primary">是</el-button>
          <el-button v-else type="danger">否</el-button>
        </template>
      </el-table-column>
      <el-table-column prop="status" label="状态">
        <template v-slot="prop">
          <el-button v-if="prop.row.status" type="primary">启用</el-button>
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
    <el-pagination
      v-if="isPage"
      background
      layout="prev, pager, next"
      :total="count"
      :page-size="size"
      @current-change="currentChange"
    ></el-pagination>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { delGoods } from "../../../utils/requests";
import { successAlert } from "../../../utils/sucessAlert";

export default {
  data() {
    return {
      isPage: true
    };
  },
  methods: {
    ...mapActions({
      getPage: "goods/getPage",
      getCount: "goods/getCount",
      getGoodsList: "goods/getGoodsList"
    }),
    paging() {
      this.getCount();
      this.getGoodsList(this.isPage);
      this.$emit("enit", this.isPage);
    },
    currentChange(e) {
      this.getPage(e);
      this.getCount();
      this.getGoodsList(this.isPage);
    },
    setMenu(id) {
      this.$emit("oneGoods", id);
    },
    delMenu(id) {
      this.$confirm("此操作将永久删除该商品列表, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          delGoods({ id }).then(res => {
            successAlert(res.data.msg);
            this.getCount();
            this.getGoodsList(this.isPage);
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
      size: "goods/size",
      page: "goods/page",
      count: "goods/count",
      goodsList: "goods/goodsList"
    })
  },
  mounted() {
    this.getCount();
    this.getGoodsList(this.isPage);
  }
};
</script>

<style>
img {
  width: 100px;
}
#isPage {
  margin: 10px 0px;
}
</style>
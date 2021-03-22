<template>
  <div id="cate" class="context">
    <van-sticky>
      <van-nav-bar left-arrow @click-left="onClickLeft" title="分类" />
    </van-sticky>
    <van-tree-select height="100%" :items="items" :main-active-index.sync="active" @click-nav="nav">
    <template #content>
        <van-grid square :column-num="3">
            <van-grid-item v-for="item in grid" :key="item.id" @click="toGoodsList(item.id)">
                <van-image :src="$preImg + item.img" />
                <div>{{item.catename}}</div>
            </van-grid-item>
        </van-grid>
    </template>
    </van-tree-select>
  </div>
</template>

<script>
import { getCateTree } from '../utils/request';
export default {
    data(){
        return {
            active:0,
            // 左侧导航
            items:[{text:""}],
            // 右侧内容
            grid:[],
            // 存储分类列表树
            cateList:[]
        }
    },
    methods:{
        onClickLeft(){
            this.$router.push("/home");
        },
        nav(index){
            this.grid = this.cateList[index].children;
        },
        toGoodsList(id){
            this.event.$emit("emitGoods",id);
            this.$router.push("/goodsList");
        }
    },
    mounted(){
        getCateTree().then(res=>{
            this.items = [];
            this.cateList = res.data.list;
            this.cateList.forEach(element => {
                this.items.push({text:element.catename})
            });
            this.nav(0);
        })
    }
}
</script>

<style>

</style>
<template>
  <div>
    <van-sticky>
      <van-nav-bar left-arrow @click-left="onClickLeft" title="商品列表" />
    </van-sticky>
      <template v-if="goodsList">
        <van-card
        v-for="item in goodsList"
        :key="item.id"
        :price="item.price"
        :title="item.goodsname"
        :thumb="$preImg+item.img"
      />
      </template>
      <van-empty v-else description="商品列表是空的" />
  </div>
</template>

<script>
import { mapActions , mapGetters } from "vuex"

export default {
    data(){
        return {
            id:0,
        }
    },
    computed:{
        ...mapGetters({
            "goodsList":"goodsList"
        })
    },
    methods:{
        ...mapActions({
            "getGoodsList":"getGoodsList"
        }),
        onClickLeft(){
            this.$router.go(-1);
        }
    },
    mounted(){
        this.event.$on("emitGoods",res=>{
            this.id = res;
            this.getGoodsList({fid:this.id});
        })
    }
}
</script>

<style>

</style>
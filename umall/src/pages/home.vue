<template>
  <div id="home" class="context">
    <van-sticky>
      <van-nav-bar title="首页" />
    </van-sticky>
    <van-swipe class="my-swipe" :autoplay="2000" indicator-color="white">
        <van-swipe-item v-for="(banner,index) in bannerList" :key="index">
            <img :src="$preImg + banner.img" alt="" class="banner_img">
        </van-swipe-item>
    </van-swipe>
    <van-tabs v-model="active">
      <van-tab title="热门推荐">
          <van-card
          v-for="(item,index) in goodsList[0].content"
          :key="index"
          :price="item.price"
          tag="hot"
          :origin-price="item.market_price"
          desc="描述信息"
          :title="item.goodsname"
          :thumb="$preImg + item.img"
          >
            <template #footer>
              <van-button size="small" icon="shopping-cart-o" color="linear-gradient(to right, #ff6034, #ee0a24)" @click="changeCart(item.id)"></van-button>
            </template>
          </van-card>
      </van-tab>
      <van-tab title="发现新品">
        <van-card
          v-for="(item,index) in goodsList[1].content"
          :key="index"
          :price="item.price"
          tag="new"
          :origin-price="item.market_price"
          desc="描述信息"
          :title="item.goodsname"
          :thumb="$preImg + item.img"
          >
            <template #footer>
              <van-button size="small" icon="shopping-cart-o" color="linear-gradient(to right, #ff6034, #ee0a24)" @click="changeCart(item.id)"></van-button>
            </template>
          </van-card>
      </van-tab>
      <van-tab title="所有商品">
        <van-card
          v-for="(item,index) in goodsList[2].content"
          :key="index"
          :price="item.price"
          :origin-price="item.market_price"
          desc="描述信息"
          :title="item.goodsname"
          :thumb="$preImg + item.img"
          >
            <template #footer>
              <van-button size="small" icon="shopping-cart-o" color="linear-gradient(to right, #ff6034, #ee0a24)" @click="changeCart(item.id)"></van-button>
            </template>
          </van-card>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import { getBanner , getGoods, addCart } from "../utils/request"
import { mapGetters , mapActions } from "vuex"
import Vue from 'vue';
import { Toast } from 'vant';

Vue.use(Toast);

export default {
    data(){
        return {
            active:0,
            ImageUrl:"",
            bannerList:[],
            goodsList:[{content:[]},{content:[]},{content:[]}],
            goods:{
              uid:"",
              goodsid:"",
              num:1
            }
        }
    },
    computed:{
      ...mapGetters({
        "user":"user"
      })
    },
    methods:{
      ...mapActions({
        "getCartList":"getCartList"
      }),
      changeCart(id){
        this.goods.uid = this.user.uid;
        this.goods.goodsid = id;
        addCart(this.goods).then(res=>{
          Toast.success(res.data.msg);
          this.getCartList({uid:this.user.uid});
        })
      }
    },
    mounted(){
        // 获取banner图
        getBanner().then(res=>{
            this.bannerList = res.data.list;
            // console.log(this.bannerList);
        })
        getGoods().then(res=>{
          this.goodsList = res.data.list;
          console.log(this.goodsList);
        })
    }
}
</script>

<style scoped>
  .my-swipe .van-swipe-item {
    color: #fff;
    font-size: 20px;
    width: 100%;
    /* height: 298px; */
    /* line-height: 150px; */
    text-align: center;
    /* background-color: #39a9ed; */
  }
  .banner_img{
    width: 100%;
    height: 100%;
  }
  /* #home{
    margin-bottom: 50px;
  } */
</style>
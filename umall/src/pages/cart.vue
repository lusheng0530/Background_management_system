<template>
  <div id="cart" class="context">
    <van-sticky>
      <van-nav-bar left-arrow @click-left="onClickLeft" title="购物车" />
    </van-sticky>
    <template v-if="cartList">
        <van-swipe-cell v-for="item in cartList" :key="item.id">
            <van-card
                :price="item.price"
                desc="描述信息"
                :title="item.goodsname"
                :thumb="$preImg+item.img"
            >
                <template #footer>
                <van-stepper v-model="item.num" theme="round" button-size="22" disable-input />
                </template>
            </van-card>
            <template #right>
                <van-button square text="删除" type="danger" class="delete-button" @click="delChangeCart(item.id)"/>
            </template>
        </van-swipe-cell>
        <van-submit-bar :price="sumGoodsPrice*100" button-text="提交订单" @submit="onSubmit" />
    </template>
    <van-empty v-else description="购物车里空空如也" />
  </div>
</template>

<script>
import Vue from 'vue';
import { Toast } from 'vant';
import { mapActions, mapGetters } from "vuex";
import { delCart } from '../utils/request';

Vue.use(Toast);

export default {
  data() {
    return {
      value: 1
    };
  },
  computed: {
    ...mapGetters({
      user: "user",
      cartList: "cartList",
      sumGoodsPrice: "sumGoodsPrice"
    })
  },
  methods: {
    ...mapActions({
      getCartList: "getCartList"
    }),
    onClickLeft() {
      this.$router.push("/home");
    },
    delChangeCart(id){
        delCart({id}).then(res=>{
            Toast.success(res.data.msg);
            this.getCartList({ uid: this.user.uid });
        })
    },
    onSubmit() {}
  },
  mounted() {
    this.getCartList({ uid: this.user.uid });
  }
};
</script>

<style>
.van-swipe-cell{
    margin-top: 10px;
}
.van-submit-bar {
  margin-bottom: 50px;
}
#cart {
  margin-bottom: 100px;
}
  .delete-button {
    height: 100%;
  }
</style>
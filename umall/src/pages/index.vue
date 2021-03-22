<template>
    <div>
        <router-view></router-view>
        <van-tabbar v-model="active">
            <van-tabbar-item icon="home-o" to="/home">首页</van-tabbar-item>
            <van-tabbar-item icon="apps-o" to="/cate">分类</van-tabbar-item>
            <van-tabbar-item v-if="user" icon="shopping-cart-o" to="/cart" :badge="toTal">购物车</van-tabbar-item>
            <van-tabbar-item v-else icon="shopping-cart-o" to="/cart" >购物车</van-tabbar-item>
            <van-tabbar-item icon="user-o" to="mime">我的</van-tabbar-item>
        </van-tabbar>
    </div>
</template>

<script>
import { mapGetters , mapActions } from "vuex"

export default {
    data(){
        return {
            nickname:"",
            active:0
        }
    },
    computed:{
        ...mapGetters({
            "user":"user",
            "toTal":"toTal"
        })
    },
    methods:{
        ...mapActions({
            "getCartList":"getCartList"
        })
    },
    mounted(){
        if(this.user){
            this.getCartList({uid:this.user.uid})
        }
    }
}
</script>

<style>
    .context{
        margin-bottom: 50px;
    }
</style>
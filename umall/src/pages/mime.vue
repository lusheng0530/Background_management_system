<template>
  <div id="mime" class="context">
    <van-sticky>
      <van-nav-bar left-arrow @click-left="onClickLeft" title="我的" />
    </van-sticky>
    <div id="portrait">
            <van-image
                round
                width="10rem"
                height="10rem"
                src="https://img01.yzcdn.cn/vant/cat.jpeg"
            />
    </div>
    <div id="danger_button">
        <van-button type="danger" size="large" @click="changeUser">安全退出</van-button>
    </div>
    <van-cell title="我的收藏" is-link url="/home"/>
    <van-cell title="我的评论" is-link />
    <van-cell title="我的订单" is-link />
  </div>
</template>

<script>
import Vue from 'vue';
import { Toast } from 'vant';
import { mapActions } from "vuex"

Vue.use(Toast);

export default {
    data(){
        return {

        }
    },
    methods:{
        ...mapActions({
            "getUser":"getUser"
        }),
        onClickLeft(){
            this.$router.push("/home");  
        },
        changeUser(){
            this.getUser(null);
            Toast.success("退出成功");
            this.$router.push("/login");
        }
    },    
}
</script>

<style scoped>
#portrait{
    height: 200px;
    background: #f0f0f0;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
}
.van-button{
    width: 95vw;
    margin: 20px 2.5vw;
}

</style>
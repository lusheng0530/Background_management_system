<template>
  <div id="register">
    <h2>用户注册</h2>
    <van-form @submit="onSubmit">
        <van-field
            v-model="form.phone"
            name="手机号"
            label="手机号"
            placeholder="手机号"
            :rules="[{ required: true, message: '请填写手机号' }]"
        />
        <van-field
            v-model="form.nickname"
            name="用户名"
            label="用户名"
            placeholder="用户名"
            :rules="[{ required: true, message: '请填写用户名' }]"
        />
        <van-field
            v-model="form.password"
            type="password"
            name="密码"
            label="密码"
            placeholder="密码"
            :rules="[{ required: true, message: '请填写密码' }]"
        />
        <div style="margin: 16px;">
            <van-button round block type="info" native-type="submit">提交</van-button>
        </div>
    </van-form>
    <div id="login">
        <router-link to="/login">去登陆？</router-link>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
import { Toast } from 'vant';

Vue.use(Toast);

import { register } from '../utils/request'
export default {
    data(){
        return {
            form:{
                phone:"",
                nickname:"",
                password:""
            }
        }
    },
    methods:{
        onSubmit(){
            register(this.form).then(res=>{
                Toast.success(res.data.msg);
                this.$router.push("/login")
            })
        }
    }
}
</script>

<style scoped>
.van-form{
    margin-top: 50px;
}
h2{
    text-align: center;
    margin: 10px auto;
}
#login{
    text-align: right;
}
</style>
<template>
  <div>
  <div id="login">
    <h2>用户登录</h2>
    <van-form @submit="onSubmit">
        <van-field
            v-model="form.phone"
            name="手机号"
            label="手机号"
            placeholder="手机号"
            :rules="[{ required: true, message: '请填写手机号' }]"
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
    <div id="register">
        <router-link to="/register">去注册？</router-link>
    </div>
  </div>
  </div>
</template>

<script>
import Vue from 'vue';
import { Toast } from 'vant';
import {mapActions} from "vuex"

Vue.use(Toast);

import { login } from '../utils/request'
export default {
  data(){
    return {
      form:{
        phone:"",
        password:""
      }
    }
  },
  methods:{
    ...mapActions({
      "getUser":"getUser"
    }),
    onSubmit(){
      login(this.form).then(res=>{
        Toast.success(res.data.msg);
        this.getUser(res.data.list);
        this.$router.push("/mime")
      })
    }
  }
}
</script>

<style>
.van-form{
    margin-top: 50px;
}
h2{
    text-align: center;
    margin: 10px auto;
}
#register{
    text-align: right;
}
</style>
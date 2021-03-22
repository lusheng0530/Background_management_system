<template>
    <div class="container">
        <div class="con">
            <h3>登录</h3>
            <el-input v-model="form.username" placeholder="请输入用户名"></el-input>
            <el-input v-model="form.password" type="password" placeholder="请输入密码"></el-input>
            <div class="btn">
                <el-button  type="primary" @click="adminLogin">登录</el-button>
            </div>
        </div>
    </div>
</template>

<script>
import {login} from "../../utils/requests"
import {warningAlert,successAlert} from "../../utils/sucessAlert"
import { mapActions } from "vuex"

export default {
    data(){
        return {
            form:{
                username:"",
                password:""
            }
        }
    },
    methods: {
        ...mapActions({
            "userActions":"userActions"
        }),
        adminLogin(){
            if(this.form.username !="" && this.form.password != ""){
                login(this.form).then(res=>{
                    successAlert(res.data.msg)
                    this.userActions(res.data.list)
                    this.$router.push("/index/home");
                })
                
            }else{
                warningAlert("请输入账号或者密码！")
            }
        },
    },
    mounted(){
        document.title = this.$route.name
    }
}
</script>

<style scoped>
.container{
  width:100vw;
  height: 100vh;
  background: linear-gradient(#563443,#2F3D60);
  position:fixed;
  top:0;
  left:0;
}
.con{
  width:500px;
  height: 300px;
  background: white;
  position: absolute;
  top:50%;
  left:50%;
  transform: translate(-50%,-50%);
  border-radius: 10px;
}
h3{
    height: 24px;
    line-height: 24px;
    font-size: 24px;
    font-weight: bolder;
    text-align: center;
    margin-top: 35px;
}
.el-input,.el-button{
  width: 320px;
  margin:22px 0px 0px 80px;
}
.el-button{
  color:white;
}
</style>
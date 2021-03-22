<template>
  <el-dialog :title="info.title" :visible.sync="info.isShow" @close="anullo">
    <el-form :model="form">
      <el-form-item label="手机号" :label-width="formLabelWidth">
        <el-input v-model="form.phone" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="昵称" :label-width="formLabelWidth">
        <el-input v-model="form.nickname" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="密码" :label-width="formLabelWidth">
        <el-input v-model="password" autocomplete="off"></el-input>
        <span>留空则不修改</span>
      </el-form-item>
      <el-form-item label="状态" :label-width="formLabelWidth">
        <el-switch v-model="form.status" active-color="#4091FF" inactive-color="#ff4949" :active-value="1" :inactive-value="2"></el-switch>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="anullo">取 消</el-button>
      <el-button v-if="info.isAdd" type="primary" @click="add">确 定</el-button>
      <el-button v-else type="primary" @click="update">修 改</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { oneMember , updateMember } from '../../../utils/requests';
import { successAlert } from '../../../utils/sucessAlert';
import { mapActions } from "vuex"

export default {
    data(){
        return {
            password:"",
            formLabelWidth:"120px",
            form:{
                phone:"",
                nickname:"",
                password:"",
                status:1
            }
        }
    },
    methods:{
        ...mapActions({
            getMemberList:"member/getMemberList"
        }),
        memberDetail(uid){
            oneMember({uid}).then(res=>{
                this.form=res.data.list;
            })
        },
        anullo(){
            this.password="";
            this.info.isShow=false;
            this.form={
                phone:"",
                nickname:"",
                password:"",
                status:1
            }
        },
        update(){
            if(this.password){
                this.form.password = this.password;
            }
            updateMember(this.form).then(res=>{
                successAlert(res.data.msg);
                this.getMemberList();
                this.anullo();
            })
        },
        add(){

        }
    },
    props:["info"]
};
</script>

<style>
</style>
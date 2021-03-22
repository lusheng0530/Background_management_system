<template>
  <el-dialog :title="info.addTitle" :visible.sync="info.isShow">
    <el-form :model="form">
      <el-form-item label="所属角色" :label-width="formLabelWidth">
        <el-select v-model="form.roleid" placeholder="请选择">
          <el-option
            v-for="item in getSoleList"
            :key="item.id"
            :label="item.rolename"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="用户名" :label-width="formLabelWidth">
        <el-input placeholder="请输入用户名" v-model="form.username" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="密码" :label-width="formLabelWidth">
        <el-input placeholder="请输入密码" v-model="form.password" show-password></el-input>
      </el-form-item>
      <el-form-item label="状态" :label-width="formLabelWidth">
        <el-switch v-model="value" active-color="#4091FF" inactive-color="#ff4949"></el-switch>
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
import Vue from "vue";
import { mapActions, mapGetters } from "vuex";
import { addUSer, getUser } from "../../../utils/requests";
import { successAlert } from "../../../utils/sucessAlert";
import { sumAdmin, updateUser } from "../../../utils/requests";
import listVue from "../../menu/components/list.vue";

export default {
  data() {
    return {
      uid: 1,
      pass: "",
      value: true,
      form: {
        roleid: "",
        username: "",
        password: "",
        status: 1
      },
      formLabelWidth: "120px"
    };
  },
  methods: {
    ...mapActions({
      getSoleAction: "getSoleAction",
      getUserList: "mangers/getUserList",
      getUserNum: "mangers/getUserNum"
    }),
    // 取消
    anullo() {
      this.form = {
        roleid: "",
        username: "",
        password: "",
        status: 1
      };
      this.info.isShow = false;
    },
    // 添加
    async add() {
       addUSer(this.form).then(res => {
        successAlert(res.data.msg);
        // 重新获取总记录数
        this.getUserNum();
        // 重新获取列表
        this.getUserList();
        this.anullo();
      })
    },
    getOneUser(id) {
      getUser({ uid: id }).then(res => {
        this.form = res.data.list;
        this.pass = this.form.password;
        this.form.password = "";
        this.uid = id;
        if (this.form.status != 1) {
          this.value = false;
        } else {
          this.value = true;
        }
      });
    },
    // 修改
    update() {
      if (!this.value) {
        this.form.status = 2;
      }
      if (this.form.password == "") {
        this.form.password = this.pass;
      }
      this.form.uid = this.uid;
      updateUser(this.form).then(res => {
        successAlert(res.data.msg);
        this.anullo();
        // 重新获取总记录数
        this.getUserNum();
        // 重新获取列表
        this.getUserList();
      });
    }
  },
  computed: {
    ...mapGetters({
      count: "mangers/count",
      getSoleList: "getSoleList"
    })
  },
  mounted() {
    this.getSoleAction();
  },
  props: ["info"]
};
</script>

<style>
</style>
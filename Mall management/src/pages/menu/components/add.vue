<template>
  <el-dialog :title="info.addTitle" :visible.sync="info.isShow" @close="close">
    <el-form :model="form">
      <el-form-item label="菜单名称" :label-width="formLabelWidth">
        <el-input v-model="form.title" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="上级菜单" :label-width="formLabelWidth">
        <el-select v-model="form.pid" placeholder="请选择">
          <el-option label="顶级菜单" :value="0"></el-option>
          <el-option v-for="item in menu" :key="item.id" :label="item.title" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="菜单类型" :label-width="formLabelWidth">
        <el-radio v-model="form.type" :label="1">目录</el-radio>
        <el-radio v-model="form.type" :label="2">菜单</el-radio>
      </el-form-item>
      <el-form-item v-if="form.type == 1" label="菜单图标" :label-width="formLabelWidth">
        <el-select v-model="form.icon" placeholder="请选择">
          <el-option v-for="item in icons" :key="item" :label="item" :value="item"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item v-else label="菜单地址" :label-width="formLabelWidth">
        <el-select v-model="form.url" placeholder="请选择">
          <el-option v-for="item in urls" :key="item" :label="item" :value="item"></el-option>
        </el-select>
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
import { mapGetters, mapActions } from "vuex";
import { addMenu } from "../../../utils/requests";
import { successAlert } from "../../../utils/sucessAlert";
import {  menuDetail , setMenuDetail } from "../../../utils/requests"

export default {
  data() {
    return {
      radio: "1",
      value: true,
      dialogFormVisible: false,
      form: {
        pid: 0,
        title: "",
        icon: "",
        type: 1, //类型 1目录 2菜单
        url: "",
        status: 1 //状态 1正常 2 禁用
      },
      formLabelWidth: "120px",
      // 所有图标
      icons: ["el-icon-setting", "el-icon-help", "el-icon-menu"],
      // 所有菜单地址
      urls: [
        "menu",
        "home",
        "role",
        "manager",
        "cate",
        "spec",
        "goods",
        "member",
        "banner",
        "seckill"
      ]
    };
  },
  methods: {
    ...mapActions({
      getMenu: "menuListAction"
    }),
    getMenuDetail(id){
        menuDetail({id}).then(res=>{
            this.form = res.data.list
            this.form.id = id
        })
        
    },
    // 取消
    anullo(){
        this.info.isShow = false
        this.form={
            id:0,
            pid: 0,
            title: "",
            icon: "",
            type: 1, //类型 1目录 2菜单
            url: "",
            status: 1 //状态 1正常 2 禁用
        }
    },
    close(){
      this.anullo();
    },
    add(){
        addMenu(this.form).then(res => {
            successAlert(res.data.msg)
            this.anullo();
            this.getMenu();
        })
    },
    update(){
        console.log(this.form);
        
        setMenuDetail(this.form).then(res=>{
            successAlert(res.data.msg);
            this.getMenu();
            this.anullo();
        })
    }
  },
  computed: {
    ...mapGetters({
        menu: "getMenu"
    })
  },
  mounted() {
    this.getMenu();
    console.log(this.info.isAdd);
  },
  props: ["info"]
};
</script>

<style>
</style>
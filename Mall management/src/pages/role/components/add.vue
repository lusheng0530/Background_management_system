<template>
  <el-dialog :title="info.title" :visible.sync="info.isShow">
    <el-form :model="form">
      <el-form-item label="角色名称" :label-width="formLabelWidth">
        <el-input v-model="form.rolename" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="角色权限" :label-width="formLabelWidth">
        <el-tree
          :data="data"
          show-checkbox
          ref="tree"
          node-key="id"
          :default-expand-all="true"
          :props="defaultProps"
        ></el-tree>
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
import { addRole, getSole, updateRole } from "../../../utils/requests";
import { successAlert } from "../../../utils/sucessAlert";

export default {
  data() {
    return {
      value: true,
      form: {
        rolename: "",
        status: 1,
        menus: ""
      },
      formLabelWidth: "120px",
      defaultProps: {
        children: "children",
        label: "title"
      }
    };
  },
  methods: {
    ...mapActions({
      getMenuList: "menuListAction",
      getSoleList: "getSoleAction"
    }),
    add() {
      this.form.menus = this.$refs.tree.getCheckedKeys().toString();
      if (!this.value) {
        this.form.status = 2;
      }
      console.log(this.form);

      addRole(this.form).then(res => {
        successAlert(res.data.msg);
        this.anullo();
        this.getSoleList();
      });
    },
    getOneSole(id) {
      getSole({ id }).then(res => {
        this.form = res.data.list;
        console.log(res.data.list);
        this.$refs.tree.setCheckedKeys(res.data.list.menus.split(","));
        if (res.data.list.status !== 1) {
          this.value = false;
        }
        this.form.id = id;
      });
    },
    update() {
      this.form.menus = this.$refs.tree.getCheckedKeys().toString();
      if (!this.value) {
        this.form.status = 2;
      } else {
        this.form.status = 1;
      }
      updateRole(this.form).then(res => {
        console.log(this.form);
        successAlert(res.data.msg);
        this.getSoleList();
        this.anullo();
      });
    },
    anullo() {
      this.info.isShow = false;
      this.form = {
        rolename: "",
        status: 1,
        menus: []
      };
      this.$refs.tree.setCheckedKeys([]);
    }
  },
  computed: {
    ...mapGetters({
      data: "getMenu"
    })
  },
  createMount() {
    this.getMenuList();
    this.form.list = this.data;
    console.log(this.form.list);
  },
  props: ["info"]
};
</script>

<style>
</style>
<template>
  <el-dialog :title="info.title" :visible.sync="info.isShow">
    <el-form :model="form">
      <el-form-item label="规格名称" :label-width="formLabelWidth">
        <el-input v-model="form.specsname" autocomplete="off"></el-input>
      </el-form-item>
      <template v-for="(item,index) in attrsList">
        <el-form-item label="规格属性" :label-width="formLabelWidth" :key="index">
          <el-row>
            <el-col :span="16">
              <el-input v-model="item.value" autocomplete="off" :span="12"></el-input>
            </el-col>
            <el-col :span="8">
              <el-button v-if="index == 0" type="primary" @click="insert">新 增</el-button>
              <el-button v-else type="danger" @click="del(index)">删 除</el-button>
            </el-col>
          </el-row>
        </el-form-item>
      </template>
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
import { errorAlert, successAlert } from "../../../utils/sucessAlert";
import { insertSpecs , insertOneSpecs , updataSpecs } from "../../../utils/requests";
import { mapActions } from "vuex";

export default {
  data() {
    return {
      value: true,
      attrsList: [{ value: "" }],
      formLabelWidth: "120px",
      form: {
        specsname: "",
        attrs: "",
        status: 1
      }
    };
  },
  methods: {
    ...mapActions({
      getSpecsList: "specs/getSpecsList",
      getCount: "specs/getCount"
    }),
    insert() {
      this.attrsList.push({ value: "" });
    },
    del(index) {
      this.attrsList.splice(index, 1);
    },
    // 添加商品规格
    add() {
      let list = [];
      // 判断是否存在空值
      for (let i in this.attrsList) {
        if (!this.attrsList[i].value) {
          errorAlert("添加失败，不允许存在空数据");
          return;
        }
        list.push(this.attrsList[i].value);
      }
      this.form.attrs = list.toString();
      insertSpecs(this.form).then(res => {
        successAlert(res.data.msg);
        this.getCount();
        this.getSpecsList();
        this.anullo();
      });
      console.log(this.attrsList);
      console.log(this.form);
    },
    // 取消
    anullo() {
      this.form = {
        specsname: "",
        attrs: [],
        status: 1
      };
      this.attrsList = [{ value: "" }];
      this.value = true;
      this.info.isShow = false;
    },
    // 获取一条数据
    getOneSpecs(id){
        insertOneSpecs({id}).then(res=>{
            successAlert(res.data.msg);
            this.attrsList = [];
            this.form = res.data.list[0];
            let arr = this.form.attrs.split(",");
            for(let i in arr){
                this.attrsList.push({value:arr[i]})
            } 
            if(this.form.status != 1){
                this.value = false;
            }   
        })
    },
    // 修改商品规格
    update(){
        let list = [];
        // 判断是否存在空值
        for (let i in this.attrsList) {
            if (!this.attrsList[i].value) {
            errorAlert("添加失败，不允许存在空数据");
            return;
            }
            list.push(this.attrsList[i].value);
        }
        this.form.attrs = list.toString();
        if(!this.value){
            this.form.status = 2;
        }else{
            this.form.status = 1;
        }
        updataSpecs(this.form).then(res => {
            successAlert(res.data.msg);
            this.getCount();
            this.getSpecsList();
            this.anullo();
        })
    }
  },
  props: ["info"]
};
</script>

<style>
</style>
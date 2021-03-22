<template>
  <el-dialog :title="info.title" :visible.sync="info.isShow">
    <el-form :model="form">
      <el-form-item label="上级分类" :label-width="formLabelWidth">
        <el-select v-model="form.pid" placeholder="请选择">
          <el-option label="请选择" :value="-1" disabled></el-option>
          <el-option label="顶级分类" :value="0"></el-option>
          <el-option v-for="item in cateGory" :key="item.id" :label="item.catename" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="分类名称" :label-width="formLabelWidth">
        <el-input v-model="form.catename" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="图片" :label-width="formLabelWidth">
        <el-upload
            ref="upload"
          class="avatar-uploader"
          action="#"
          :show-file-list="false"
          :on-change="changeImg"
        >
          <img v-if="imageUrl" :src="imageUrl" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
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

import { warningAlert, successAlert } from "../../../utils/sucessAlert";
import { mapActions , mapGetters } from "vuex"
import { addCateGory , seletOneCate , updateCate } from '../../../utils/requests';

export default {
  data() {
    return {
      imageUrl: "",
      value: true,
      form: {
        pid: -1,
        catename: "",
        img: "",
        status: 1
      },
      formLabelWidth: "120px"
    };
  },
  computed:{
      ...mapGetters({
          cateGory:"category/cateGory"
      })
  },
  methods: {
      ...mapActions({
          getCateGory:"category/getCateGory"
      }),
    changeImg(e) {
      // 判断图片大小
      if (e.size > 2 * 1024 * 1024) {
        warningAlert("图片大小不能超过2M!");
        return;
      }
      // 判断图片类型
      if (
        e.raw.type !== "image/png" &&
        e.raw.type !== "image/jpeg" &&
        e.raw.type !== "image/gif"
      ) {
        warningAlert("图片格式只能为jpg,png,gif");
        return;
      }
      // 将文件生成url地址,并显示在页面中
      this.imageUrl = URL.createObjectURL(e.raw);
      // 将文件存放到form.img中
      this.form.img = e.raw;
    },
    // 定义取消方法
    anullo() {
        this.value = true;
        this.imageUrl=""
        this.form = {
            pid: "",
            catename: "",
            img: "",
            status: 1
        };
        this.info.isShow = false;
    },
    add() {
        addCateGory(this.form).then(res=>{
            successAlert(res.data.msg);
            this.getCateGory();
            this.anullo();
        })
    },
    getOneCate(id){
        seletOneCate({id}).then(res=>{
            this.form = res.data.list;
            if(this.form.img){
                this.imageUrl = this.$preImg + this.form.img;
            }
            this.form.id = id;
            if(this.form.status != 1){
                this.value = false;
            }
        })
    },
    update() {
        updateCate(this.form).then(res=>{
            successAlert(res.data.msg);
            this.getCateGory();
            this.anullo();
        })
    }
  },
  mounted(){
      this.getCateGory()
  },
  props: ["info"]
};
</script>

<style scoped>
.avatar-uploader >>> .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader >>> .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
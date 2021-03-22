<template>
  <el-dialog :title="info.title" :visible.sync="info.isShow" @close="anullo">
    <el-form :model="form">
      <el-form-item label="菜单名称" :label-width="formLabelWidth">
        <el-input v-model="form.title" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="菜单图标" :label-width="formLabelWidth">
        <el-upload
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
        <el-switch
          v-model="form.status"
          active-color="#4091FF"
          inactive-color="#ff4949"
          :active-value="1"
          :inactive-value="2"
        ></el-switch>
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
import { addBanner, selectOnceBanner, updateBanner } from '../../../utils/requests';
import { mapActions } from "vuex";
export default {
  data() {
    return {
      imageUrl: "",
      formLabelWidth: "120px",
      form: {
        title: "",
        img: "",
        status: 1
      }
    };
  },
  methods: {
      ...mapActions({
          getBannerList:"banner/getBannerList"
      }),
    //   图片上传触发方法
    changeImg(file) {
      if (file.size > 1024 * 1024 * 2) {
        errorAlert("上传的文件大小不能超过2M！");
        return;
      }
      if (
        file.raw.type !== "image/png" &&
        file.raw.type !== "image/jpeg" &&
        file.raw.type !== "image/gif"
      ) {
        errorAlert("上传的文件格式只能为png,img,gif格式");
        return;
      }
      this.imageUrl = URL.createObjectURL(file.raw);
      this.form.img = file.raw;
    },
    anullo() {
        this.form={
                    title: "",
        img: "",
        status: 1
        }
        this.imageUrl = "";
        this.info.isShow=false;
    },
    add() {
        addBanner(this.form).then(res=>{
            successAlert(res.data.msg);
            this.getBannerList();
            this.anullo();
        })
    },
    getOnceBanner(id){
        selectOnceBanner({id}).then(res=>{
            this.form = res.data.list;
            this.form.id = id;
            this.imageUrl = this.$preImg +this.form.img
        })
    },
    update() {
        updateBanner(this.form).then(res=>{
            successAlert(res.data.msg);
            this.getBannerList();
            this.anullo();
        })
    }
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
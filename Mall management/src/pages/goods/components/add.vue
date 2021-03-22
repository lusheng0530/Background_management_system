<template>
    <el-dialog :title="info.title" :visible.sync="info.isShow" @opened="opened" @close="anullo">
    <el-form :model="form">
      <el-form-item label="一级分类" :label-width="formLabelWidth">
        <el-select v-model="form.first_cateid" placeholder="请选择" @change="firstCateidChange(true)">
          <el-option label="请选择" :value="-1" disabled></el-option>
          <el-option v-for="item in cateGory" :key="item.id" :label="item.catename" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="二级分类" :label-width="formLabelWidth">
        <el-select v-model="form.second_cateid" placeholder="请选择">
          <el-option label="请选择" :value="-1" disabled></el-option>
          <template v-if="cateGory[index.cateid]">
              <el-option v-for="item in cateGory[index.cateid].children" :key="item.id" :label="item.catename" :value="item.id"></el-option>
          </template>
        </el-select>
      </el-form-item>
      <el-form-item label="商品名称" :label-width="formLabelWidth">
        <el-input v-model="form.goodsname" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="价格" :label-width="formLabelWidth">
        <el-input v-model="form.price" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="市场价格" :label-width="formLabelWidth">
        <el-input v-model="form.market_price" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="图片" :label-width="formLabelWidth">
        <el-upload
        class="avatar-uploader"
        action="#"
        :show-file-list="false"
        :on-change="changeImg">
            <img v-if="imageUrl" :src="imageUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item label="商品规格" :label-width="formLabelWidth">
        <el-select v-model="form.specsid" placeholder="请选择" @change="specsidChange">
          <el-option label="请选择" :value="-1" disabled></el-option>
          <el-option v-for="item in specsList" :key="item.id" :label="item.specsname" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="规格属性" :label-width="formLabelWidth">
        <el-select v-model="specsattr" multiple placeholder="请选择">
          <el-option label="请选择" :value="-1" disabled></el-option>
          <template v-if="specsList[index.specsid]">
              <el-option v-for="item in specsList[index.specsid].attrs" :key="item" :label="item" :value="item"></el-option>
          </template>
        </el-select>
      </el-form-item>
      <el-form-item label="是否新品" :label-width="formLabelWidth">
        <el-radio v-model="form.isnew" :label="1">是</el-radio>
        <el-radio v-model="form.isnew" :label="2">否</el-radio>
      </el-form-item>
      <el-form-item label="是否热卖" :label-width="formLabelWidth">
        <el-radio v-model="form.ishot" :label="1">是</el-radio>
        <el-radio v-model="form.ishot" :label="2">否</el-radio>
      </el-form-item>
      <el-form-item label="状态" :label-width="formLabelWidth">
        <el-switch v-model="value" active-color="#4091FF" inactive-color="#ff4949"></el-switch>
      </el-form-item>
      <el-form-item label="商品描述" :label-width="formLabelWidth">
        <div id="div1"></div>
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
import E from 'wangeditor';
import { mapActions , mapGetters } from "vuex";
import { insertGoods , goodDetail , updataGoods } from "../../../utils/requests";
import { successAlert } from '../../../utils/sucessAlert';

export default {
    data(){
        return {
            value:true,
            imageUrl:"",
            editor:"",
            formLabelWidth:"120px",
            specsattr:[],
            form:{
                first_cateid:-1,
                second_cateid:-1,
                goodsname:"",
                price:"",
                market_price:"",
                img:"",
                description:"",
                specsid:-1,
                specsattr:"",
                isnew:1,
                ishot:1,
                status:1
            },
            index:{
                cateid:0,
                specsid:0
            }
        }
    },
    computed:{
        ...mapGetters({
            cateGory:"category/cateGory",
            specsList:"specs/specsList"
        })
    },
    methods:{
        ...mapActions({
            getCateGory:"category/getCateGory",
            getSpecsList:"specs/getSpecsList",
            getCount: "goods/getCount",
            getGoodsList: "goods/getGoodsList"
        }),
        // 一级分类列表选择变化时触发
        firstCateidChange(e){
            this.index.cateid = this.cateGory.findIndex(item=>item.id == this.form.first_cateid);
            if(e){
              this.form.second_cateid = -1;
            }
            
        },
        specsidChange(e){
            for(let i in this.specsList){
                if(e == this.specsList[i].id){
                    this.index.specsid = i; 
                }
            }            
            this.form.specsattr = "";
        },
        changeImg(file){
            // 判断图片大小
            if (file.size > 2 * 1024 * 1024) {
                warningAlert("图片大小不能超过2M!");
                return;
            }
            // 判断图片类型
            if (
                file.raw.type !== "image/png" &&
                file.raw.type !== "image/jpeg" &&
                file.raw.type !== "image/gif"
            ) {
                warningAlert("图片格式只能为jpg,png,gif");
                return;
            }
            this.imageUrl = URL.createObjectURL(file.raw);
            this.form.img = file.raw;
        },
        anullo(){
            this.info.isShow = false;
            this.form = {
                first_cateid:-1,
                second_cateid:-1,
                goodsname:"",
                price:"",
                market_price:"",
                img:"",
                description:"",
                specsid:-1,
                specsattr:"",
                isnew:1,
                ishot:1,
                status:1
            }
            this.form.second_cateid = -1;
            this.form.specsattr = "";
        },
        add(){
            this.form.description = this.editor.txt.html();
            this.form.specsattr = this.specsattr.toString();
            console.log(this.form);
            insertGoods(this.form).then(res=>{
                successAlert(res.data.msg);
                this.getCount();
                this.getGoodsList(this.info.isPage);
                this.anullo();
            })
            
        },
        oneGoods(id){
          goodDetail({id}).then(res=>{
            successAlert(res.data.msg);
            this.form = res.data.list;
            this.form.id = id;
            this.firstCateidChange();
            this.imageUrl = this.$preImg + this.form.img;
            this.specsattr = this.form.specsattr.split(",");
          })
        },
        update(){
          updataGoods(this.form).then(res=>{
            successAlert(res.data.msg);
            this.getCount();
            this.getGoodsList(this.info.isPage);
            this.anullo();
          })
        },
        opened(){
            this.editor = new E('#div1');
            this.editor.create();
            this.editor.txt.html(this.form.description);
        }
    },
    props:["info"],
    mounted(){
        this.getCateGory();
        this.getSpecsList(false);
    }
}
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
    border-color: #409EFF;
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
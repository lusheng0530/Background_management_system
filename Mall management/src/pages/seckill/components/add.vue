<template>
  <el-dialog :title="info.title" :visible.sync="info.isShow" @close="anullo">
    <el-form :model="form">
      <el-form-item label="活动名称" :label-width="formLabelWidth">
        <el-input v-model="form.title" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="活动期限" :label-width="formLabelWidth">
            <el-date-picker
            v-model="time"
            type="daterange"
            value-format="timestamp"
            align="right"
            unlink-panels
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            :picker-options="pickerOptions">
            </el-date-picker>
      </el-form-item>
      <el-form-item label="一级分类" :label-width="formLabelWidth">
        <el-select v-model="form.first_cateid" placeholder="请选择" @change="changeCate(true)">
            <el-option label="请选择" :value="-1" disabled></el-option>
            <el-option
            v-for="item in cateGory"
            :key="item.id"
            :label="item.catename"
            :value="item.id">
            </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="二级分类" :label-width="formLabelWidth">
        <el-select v-model="form.second_cateid" placeholder="请选择" @change="changeSecondCate">
            <el-option label="请选择" :value="-1" disabled></el-option>
            <el-option
            v-for="item in secondCateid"
            :key="item.id"
            :label="item.catename"
            :value="item.id">
            </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="商品" :label-width="formLabelWidth">
        <el-select v-model="form.goodsid" placeholder="请选择">
            <el-option label="请选择" :value="-1" disabled></el-option>
            <el-option
            v-for="item in goodsList"
            :key="item.id"
            :label="item.goodsname"
            :value="item.id">
            </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="状态" :label-width="formLabelWidth">
        <el-switch 
            v-model="form.status"
          active-color="#4091FF"
          inactive-color="#ff4949"
          :active-value="1"
          :inactive-value="2"></el-switch>
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
import { mapActions , mapGetters } from "vuex"
import { addSeckill, selectOnceSeckill, updateSeckill } from '../../../utils/requests';
import { successAlert } from '../../../utils/sucessAlert';

export default {
    data(){
        return {
            formLabelWidth:"120px",
            time:"",
            form:{
                title:"",
                begintime:"",
                endtime:"",
                first_cateid:-1,
                second_cateid:-1,
                goodsid:-1,
                status:1
            },
            secondCateid:[],
            pickerOptions: {
                shortcuts: [{
                    text: '最近一周',
                    onClick(picker) {
                    const end = new Date();
                    const start = new Date();
                    start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                    picker.$emit('pick', [start, end]);
                    }
                }, {
                    text: '最近一个月',
                    onClick(picker) {
                    const end = new Date();
                    const start = new Date();
                    start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                    picker.$emit('pick', [start, end]);
                    }
                }, {
                    text: '最近三个月',
                    onClick(picker) {
                    const end = new Date();
                    const start = new Date();
                    start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                    picker.$emit('pick', [start, end]);
                    }
                }]
            },
        }
    },
    computed:{
        ...mapGetters({
            "cateGory":"category/cateGory",
            "goodsList":"goods/goodsList"
        })
    },
    methods:{
        ...mapActions({
            "getCateGory":"category/getCateGory",
            "getGoodsList":"goods/getGoodsList",
            "getSeckillList":"seckill/getSeckillList"
        }),
        changeCate(e){
            this.secondCateid = this.cateGory.find(item=>item.id == this.form.first_cateid).children;
            if(e){
                this.form.goodsid = -1;
                this.form.second_cateid=-1;
            }
        },
        changeSecondCate(){
            if(this.form.second_cateid != -1){
                this.getGoodsList({
                    fid:this.form.first_cateid,
                    sid:this.form.second_cateid
                })
            }
            this.form.goodsid = -1;
        },
        anullo(){
            this.form={
                title:"",
                begintime:"",
                endtime:"",
                first_cateid:-1,
                second_cateid:-1,
                goodsid:-1,
                status:1
            };
            this.time="";
            this.info.isShow=false;
        },
        getOnceSeckill(id){
            selectOnceSeckill({id}).then(res=>{
                this.form = res.data.list;
                this.changeCate(false);
                this.time = [this.form.endtime,this.form.begintime];
                this.form.id = id;
            })
        },
        update(){
            this.form.begintime = this.time[0];
            this.form.endtime = this.time[1];
            updateSeckill(this.form).then(res=>{
                successAlert(res.data.msg);
                this.getSeckillList();
                this.anullo();
            })
        },
        add(){
            this.form.begintime = this.time[0];
            this.form.endtime = this.time[1];
            addSeckill(this.form).then(res=>{
                successAlert(res.data.msg);
                this.getSeckillList();
                this.anullo();
            })
        }
    },
    mounted(){
        this.getCateGory();
        this.getGoodsList()
    },
    props:["info"]
}
</script>

<style>

</style>
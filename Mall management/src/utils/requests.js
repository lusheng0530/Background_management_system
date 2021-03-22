import axios from "axios";
import qs from "qs";
import store from "../store";
import router from "../router";

const baseUrl = "/api"

import {warningAlert} from "./sucessAlert"

// 设置请求头
axios.interceptors.request.use(config=>{
    if(config.url !== baseUrl+'/api/userlogin'){
        // 需要设置请求头
        config.headers.authorization = store.state.user.token
    }
    return config
})

// 响应拦截
axios.interceptors.response.use(res => {
    if(res.data.code != 200){
        warningAlert(res.data.msg)
        if(res.data.code == 403){
            warningAlert(res.data.msg);
            router.push("/login");
        }
        return
    }
    return res
})

// 登录
export const login = (user)=>{
    return axios({
        method:"post",
        url: baseUrl + "/api/userlogin",
        data:qs.stringify(user)
    })
}

// 菜单列表
export const getMenu = (params)=>{
    return axios({
      method:'get',
      url:baseUrl+'/api/menulist',
      params,
    })
}

// 添加菜单列表
export const addMenu = (user) => {
    return axios({
        method:"post",
        url:baseUrl+"/api/menuadd",
        data:qs.stringify(user)
    })
}

// 获取菜单详细
export const menuDetail = (params)=>{
    return axios({
        method:"get",
        url:baseUrl+"/api/menuinfo",
        params
    })
}

// 修改菜单详情
export const setMenuDetail = (user)=>{
    return axios({
        method:"post",
        url:baseUrl+"/api/menuedit",
        data:qs.stringify(user)
    })
}

// 删除菜单
export const delMenuList = (id)=>{
    return axios({
        method:"post",
        url:baseUrl+"/api/menudelete",
        data:qs.stringify(id)
    })
}

// 获取角色列表
export const soleList = () => {
    return axios({
        method:"get",
        url:baseUrl + "/api/rolelist"
    })
}

// 获取一个角色
export const getSole = (params)=>{
    return axios({
        method:"get",
        url:baseUrl+"/api/roleinfo",
        params
    })
}

// 角色添加
export const addRole = (user)=>{
    return axios({
        method:"post",
        url:baseUrl+"/api/roleadd",
        data:qs.stringify(user)
    })
}

// 角色修改
export const updateRole = (user)=>{
    return axios({
        method:"post",
        url:baseUrl+"/api/roleedit",
        data:qs.stringify(user)
    })
}

// 删除角色
export const delSloe =(id)=>{
    return axios({
        method:"post",
        url:baseUrl+"/api/roledelete",
        data:qs.stringify(id)
    })
}

// 获取管理员总数
export const sumAdmin = ()=>{
    return axios({
        method:"get",
        url:baseUrl+"/api/usercount"
    })
}

// 获取管理员列表
export const adminList = (params)=>{
    return axios({
        method:"get",
        url:baseUrl+"/api/userlist",
        params
    })
}

// 添加管理员
export const addUSer =(user)=>{
    return axios({
        method:"post",
        url:baseUrl+"/api/useradd",
        data:qs.stringify(user)
    })
}

// 获取一条管理员数据
export const getUser=(params)=>{
    return axios({
        method:"get",
        url:baseUrl+"/api/userinfo",
        params
    })
}

// 修改管理员
export const updateUser = (user)=>{
    return axios({
        method:"post",
        url:baseUrl+"/api/useredit",
        data:qs.stringify(user)
    })
}

// 删除管理员
export const deleteUser = (params) => {
    return axios({
        method:"post",
        url:baseUrl+"/api/userdelete",
        data:qs.stringify(params)
    })
}

// 获取商品分类列表
export const seletCateGory = () => {
    return axios({
        method:"get",
        url:baseUrl+"/api/catelist",
        params:{
            istree:true
        }
    })
}

// 添加商品分类
export const addCateGory = (data) => {
    let form = new FormData();
    for(let i in data){
        form.append(i,data[i])
    }
    return axios({
        method:"post",
        url:baseUrl+"/api/cateadd",
        data:form
    })
}

// 获取单个商品分类
export const seletOneCate = (params) => {
    return axios({
        method:"get",
        url:baseUrl+"/api/cateinfo",
        params
    })
}

// 修改商品分类
export const updateCate = (data) =>{
    let form = new FormData();
    for(let i in data){
        form.append(i,data[i])
    }
    return axios({
        method:"post",
        url:baseUrl+"/api/cateedit",
        data:form
    })
}

// 商品列表删除
export const delCateGory = (data)=>{
    return axios({
        method:"post",
        url:baseUrl+"/api/catedelete",
        data:data
    })
}

// 商品规格列表总数
export const specsCount = ()=>{
    return axios({
        method:"get",
        url:baseUrl+"/api/specscount"
    })
}

// 商品规格列表
export const seletSpecsList = (params)=>{
    return axios({
        method:"get",
        url:baseUrl+"/api/specslist",
        params
    })
}

// 添加商品规格
export const insertSpecs = (data)=>{
    return axios({
        method:"post",
        url:baseUrl+"/api/specsadd",
        data:qs.stringify(data)
    })
}

// 查询一条商品规格
export const insertOneSpecs = (params)=>{
    return axios({
        method:"get",
        url:baseUrl+"/api/specsinfo",
        params
    })
}

// 修改商品规格
export const updataSpecs = (data)=>{
    return axios({
        method:"post",
        url:baseUrl+"/api/specsedit",
        data:qs.stringify(data)
    })
}

// 删除商品规格
export const delSpecs = (data)=>{
    return axios({
        method:"post",
        url:baseUrl+"/api/specsdelete",
        data:qs.stringify(data)
    })
}

// 查询商品总数
export const goodsCount = ()=>{
    return axios({
        method:"get",
        url:baseUrl+"/api/goodscount"
    })
}

// 查询商品列表
export const selectGoodsList = (params)=>{
    return axios({
        method:"get",
        url:baseUrl+"/api/goodslist",
        params
    })
}

// 商品添加
export const insertGoods = (data)=>{
    var form = new FormData();
    for(var i in data){
        form.append(i,data[i])
    }
    return axios({
        method:"post",
        url:baseUrl+"/api/goodsadd",
        data:form
    })
}

// 商品获取
export const goodDetail = (params)=>{
    return axios({
        method:"get",
        url:baseUrl+"/api/goodsinfo",
        params
    })
}

// 商品修改
export const updataGoods = (goods)=>{
    var form = new FormData();
    for(let i in goods){
        form.append(i,goods[i])
    }
    return axios({
        method:"post",
        url:baseUrl+"/api/goodsedit",
        data:form
    })
}

// 商品删除
export const delGoods = (data)=>{
    return axios({
        method:"post",
        url:baseUrl+"/api/goodsdelete",
        data:qs.stringify(data)
    })
}

// 会员列表
export const memberList = ()=>{
    return axios({
        method:"get",
        url:baseUrl+"/api/memberlist"
    })
}

// 获取会员
export const oneMember = (params)=>{
    return axios({
        method:"get",
        url:baseUrl+"/api/memberinfo",
        params
    })
}

// 修改会员
export const updateMember = (user)=>{
    return axios({
        method:"post",
        url:baseUrl+"/api/memberedit",
        data:qs.stringify(user)
    })
}

// 轮播图列表
export const bannerList = ()=>{
    return axios({
        method:"get",
        url:baseUrl + "/api/bannerlist"
    })
}

// 添加轮播图
export const addBanner = (banner)=>{
    var form = new FormData();
    for(let i in banner){
        form.append(i,banner[i])
    }
    return axios({
        method:"post",
        url:baseUrl+"/api/banneradd",
        data:form
    })
}

// 获取一条轮播图数据
export const selectOnceBanner = (params)=>{
    return axios({
        method:"get",
        url:baseUrl+"/api/bannerinfo",
        params
    })
}

// 修改轮播图
export const updateBanner = (banner)=>{
    var form = new FormData();
    for(let i in banner){
        form.append(i,banner[i])
    }
    return axios({
        method:"post",
        url:baseUrl+"/api/banneredit",
        data:form
    })
}

// 删除轮播图
export const delBanner = (data)=>{
    return axios({
        method:"post",
        url:baseUrl+"/api/bannerdelete",
        data:data
    })
}

// 获取秒杀列表
export const selectSeckillList = ()=>{
    return axios({
        method:"get",
        url:baseUrl+"/api/secklist"
    })
}

// 限时秒杀添加
export const addSeckill = (data)=>{
    return axios({
        method:"post",
        url:baseUrl+"/api/seckadd",
        data:qs.stringify(data)
    })
}

// 获取单个秒杀活动
export const selectOnceSeckill = (params)=>{
    return axios({
        method:"get",
        url:baseUrl+"/api/seckinfo",
        params
    })
}

// 修改秒杀活动
export const updateSeckill = (data)=>{
    return axios({
        method:"post",
        url:baseUrl+"/api/seckedit",
        data:qs.stringify(data)
    })
}

// 删除秒杀活动
export const deleteSeckill = (data)=>{
    return axios({
        method:"post",
        url:baseUrl+"/api/seckdelete",
        data:qs.stringify(data)
    })
}
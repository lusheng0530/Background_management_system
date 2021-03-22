import axios from "axios"
import qs from "qs"

import Vue from 'vue';
import router from "../router";
import { Toast } from 'vant';

Vue.use(Toast);

const baseUrl = "/api"

// 响应拦截
axios.interceptors.response.use(res=>{
    console.group("响应地址为：" + res.config.url);
    if(res.data.code != 200){
        if(res.data.code == 403){
            Toast.fail(res.data.msg);
            router.push("/login");
            return
        }
        Toast.fail(res.data.msg); 
        return;
    }
    console.groupEnd("响应完成")
    return res
})

// 设置请求头
axios.interceptors.request.use(req=>{
    console.group("请求地址为：" + req.url);
    const user = JSON.parse(sessionStorage.getItem("user"));
    if(user){
        req.headers.authorization = user.token;
    }
    console.groupEnd("请求完成")  
    return req
})

// 获取banner列表
export const getBanner = ()=>{
    return axios({
      method:'get',
      url:baseUrl+'/api/getbanner',
    })
}

// 获取goods列表
export const getGoods = ()=>{
    return axios({
        method:"get",
        url:baseUrl+"/api/getindexgoods"
    })
}

// 获取分类列表
export const getCate = ()=>{
    return axios({
        method:"get",
        url:baseUrl+"/api/getcate"
    })
}

// 获取限时秒杀列表
export const getSeckill = ()=>{
    return axios({
        method:"get",
        url:baseUrl+"/api/getseckill"
    })
}

// 获取分类树形列表
export const getCateTree = ()=>{
    return axios({
        method:"get",
        url:baseUrl+"/api/getcatetree"
    })
}

// 注册
export const register = (data)=>{
    return axios({
        method:"post",
        url:baseUrl+"/api/register",
        data:qs.stringify(data)
    })
}

// 登录
export const login = (data)=>{
    return axios({
        method:"post",
        url:baseUrl+"/api/login",
        data:qs.stringify(data)
    })
}

// 获取购物车列表
export const cartList = (params)=>{
    return axios({
        method:"get",
        url:baseUrl+"/api/cartlist",
        params
    })
}

// 添加购物车
export const addCart = (data)=>{
    return axios({
        method:"post",
        url:baseUrl + "/api/cartadd",
        data:qs.stringify(data)
    })
}

// 删除购物车
export const delCart = (data)=>{
    return axios({
        method:"post",
        url:baseUrl+"/api/cartdelete",
        data:qs.stringify(data)
    })
}

// 获取商品列表
export const selectgoodsList = (params)=>{
    return axios({
        method:"get",
        url:baseUrl+"/api/getgoods",
        params
    })
}
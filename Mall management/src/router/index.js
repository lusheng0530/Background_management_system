import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

// 解决push连点两次报错问题
const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

import login from "../pages/login/login";
import index from "../pages/index/index";
import home from "../pages/home/home";
import menu from "../pages/menu/menu";
import role from "../pages/role/role";
import user from "../pages/managers/managers";
import category from "../pages/category/category";
import specs from "../pages/specs/specs";
import goods from "../pages/goods/goods";
import member from "../pages/member/member";
import banner from "../pages/banner/banner";
import seckill from "../pages/seckill/seckill";

export default new Router({
  routes: [
    {
      path: '/login',
      name: '用户登录',
      component: login
    },
    {
      path: '/index',
      name: '首页',
      component: index,
      children:[
        {
          path:"home",
          name:"首页",
          component:home
        },
        {
          path:"menu",
          name:"菜单管理",
          component:menu
        },
        {
          path:"role",
          name:"用户管理",
          component:role
        },
        {
          path:"user",
          name:"管理员管理",
          component:user
        },
        {
          path:"category",
          name:"商品分类",
          component:category
        },
        {
          path:"specs",
          name:"商品规格",
          component:specs
        },
        {
          path:"goods",
          name:"商品管理",
          component:goods
        },
        {
          path:"member",
          name:"会员管理",
          component:member
        },
        {
          path:"banner",
          name:"轮播图管理",
          component:banner
        },
        {
          path:"seckill",
          name:"秒杀活动",
          component:seckill
        },
        {
          path:"*",
          redirect:"/login/home"
        }
      ]
    },
    {
      path:"*",
      redirect:"/login"
    }
  ]
})

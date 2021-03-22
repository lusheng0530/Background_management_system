import Vue from 'vue'
import Router from 'vue-router'
import { Toast } from "vant";


Vue.use(Router);
// 页面布局
import index from "../pages/index"

// 一级路由
import login from "../pages/login"
import register from "../pages/register"
import goodsList from "../pages/goodsList"

// 二级路由
import home from "../pages/home"
import mime from "../pages/mime"
import cate from "../pages/cate"
import cart from "../pages/cart"

const router =  new Router({
  routes: [
    {
      path:'/',
      component:index,
      redirect:'/home',
      children:[
        {
          path:"home",
          component:home
        },
        {
          path:"cate",
          component:cate
        },
        {
          path:"cart",
          component:cart
        },
        {
          path:"mime",
          component:mime
        }
      ]
    },
    {
      path:"/login",
      component:login
    },
    {
      path:"/register",
      component:register
    },
    {
      path:"/goodsList",
      component:goodsList
    },
    {
      path:"*",
      redirect:'/login',
    }
  ]
})

// 设置路由守卫
router.beforeEach((to,from,next)=>{
  if(to.path == '/mime' || to.path == '/cart'){
    const user = JSON.parse(sessionStorage.getItem('user'))
    if(!user){
      // 消息提示
      Toast.fail('请登录');
      // 去到登录页面
      router.push('/login')
      return
    }
  }
  next();
})

export default router;
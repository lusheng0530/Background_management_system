<template>
  <el-container>
    <el-aside style="width:152px">
            <el-menu
        default-active="0"
        class="el-menu-vertical-demo"

        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b"
      >

        <el-menu-item index="0" @click="changeHome">
          <i class="el-icon-menu"></i>
          <span slot="title">首页</span>
        </el-menu-item>
      <template v-for="item in menu.menus">
        <el-submenu v-if="item.children" :index="item.title" :key="item.id">
            <template slot="title">
              <i :class="item.icon"></i>
              <span>{{item.title}}</span>
            </template>
            <el-menu-item-group v-if="item.children">
              <el-menu-item v-for="childItem in item.children" :key="childItem.id" :index="item.id+'-'+childItem.id" @click="changeUrl(childItem.url)" >{{childItem.title}}</el-menu-item>
            </el-menu-item-group>
        </el-submenu>
        <el-menu-item v-else :key="item.id" :index="item.title" @click="changeUrl(item.url)" >{{item.title}}</el-menu-item>
      </template>
      </el-menu>
    </el-aside>
    <el-container>
      <el-header>
        <div class="username">
          <span>{{menu.username}}</span>
          <el-button @click="out" type="primary" icon="el-icon-setting"></el-button>
        </div>
      </el-header>
      <el-main>
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/index/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>{{this.$route.name}}</el-breadcrumb-item>
        </el-breadcrumb>
        <!-- 二级路由出口 -->
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import { mapGetters , mapActions } from "vuex";

export default {
  
    methods:{
      ...mapActions({
        "menuList":"menuListAction",
        "userActions":"userActions"
      }),
      changeUrl(url){
        this.$router.push("/index" + url);
      },
      changeHome(){
        this.$router.push("/index/home");
      },
      out(){
        this.userActions(null);
        this.$router.push("/login");
      }
    },
    computed:{
      ...mapGetters({
        "menu":"user"
      })
    },
    mounted(){
      this.menuList();
    }
};
</script>

<style scoped>
.el-header {
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
  line-height: 60px;
  height: 58px;
  position: relative;
}

.el-header span{
  font-size: 10px;
}

.username{
  position: absolute;
  top: 0px;
  right: 36px;
}

.el-aside {
  background-color: #20222a;
  color: white;
  text-align: center;
  line-height: 200px;
  height: 100vh;
}

.el-menu-item{
  text-align: left;
}

.el-submenu{
  text-align: left;
}

.el-main {
  background-color: white;
  color: #000000;
}
</style>
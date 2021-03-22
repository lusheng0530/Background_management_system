import Vue from "vue"
import Vuex from "vuex"

Vue.use(Vuex);

import { state , mutations , getters } from "./mutations";
import actions from "./actions"

import menu from "./modules/menu";
import sole from "./modules/sole";
import mangers from "./modules/mangers";
import category from "./modules/category";
import specs from "./modules/specs";
import goods from "./modules/goods";
import member from "./modules/member";
import banner from "./modules/banner";
import seckill from "./modules/seckill";

export default new Vuex.Store({
    state,
    mutations,
    actions,
    getters,
    modules:{
        menu,
        sole,
        mangers,
        category,
        specs,
        goods,
        member,
        banner,
        seckill
    }
})
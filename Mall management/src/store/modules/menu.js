import { getMenu } from "../../utils/requests"

const state = {
    menuList:[]
}

const mutations = {
    // 修改列表数据
    menuList(state,res){
        state.menuList = res;  
    }
}

const actions = {
    // 获取列表数据
    menuListAction(context){
        getMenu({istree:true}).then(res => {
            context.commit("menuList",res.data.list);
        })
    }
}

const getters = {
    // 暴露列表数据
    getMenu(state){
        return state.menuList;
    }
}

export default {
    state,
    mutations,
    actions,
    getters,
}
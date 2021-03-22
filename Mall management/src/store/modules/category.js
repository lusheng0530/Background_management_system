import {seletCateGory} from "../../utils/requests"

const state = {
    category:[]
}

const mutations = {
    // 修改state中的商品分类列表
    setCateGory(state,list){
        state.category = list;
    }
}

const actions = {
    // 查询列表
    getCateGory(context){
        seletCateGory().then(res => {
            context.commit("setCateGory",res.data.list)
        })
    }
}

const getters = {
    // 暴露列表
    cateGory(state){
        return state.category;
    }
}

export default {
    state,
    mutations,
    actions,
    getters,
    namespaced:true
}
import { specsCount , seletSpecsList } from "../../utils/requests"

const state = {
    // 查询条数
    size:2,
    // 查询当前页数
    page:1,
    // 规格列表总数
    count:0,
    // 规格列表
    specsList:[]
}

const mutations = {
    setPage(state,page){
        state.page = page
    },
    setCount(state,count){
        state.count = count
    },
    setSpecsList(state,specsList){
        state.specsList = specsList
    }
}

const actions = {
    getPage(context,page){
        context.commit("setPage",page)
    },
    getCount(context){
        specsCount().then(res=>{
            context.commit("setCount",res.data.list[0].total)
        })
    },
    getSpecsList(context,isPage=true){
        var user = null
        if(isPage){
            user = {
                size:context.state.size,
                page:context.state.page
            }
        }
        seletSpecsList(user).then(res=>{
            if((res.data.list.length == 0 || res.data.list == "") && context.state.page > 1){
                var p = context.state.page -1;
                context.commit("setPage",p);
                context.dispatch("getSpecsList");
                return;
            }
            context.commit("setSpecsList",res.data.list)
        })
    }
}

const getters = {
    // 返回查询条数
    size(state){
        return state.size
    },
    // 返回查询页数
    page(state){
        return state.page
    },
    // 返回列表总数
    count(state){
        return state.count
    },
    // 返回规格列表
    specsList(state){
        return state.specsList
    }
}

export default {
    state,
    mutations,
    actions,
    getters,
    namespaced:true
}
import { selectSeckillList } from "../../utils/requests";

const state = {
    seckillList:[]
}

const mutations = {
    setSeckillList(state,seckillList){
        state.seckillList = seckillList;
    }
}

const actions = {
    getSeckillList(context){
        selectSeckillList().then(res=>{
            context.commit("setSeckillList",res.data.list);
        })
    }
}

const getters = {
    seckillList(state){
        return state.seckillList;
    }
}

export default {
    state,
    mutations,
    actions,
    getters,
    namespaced:true
}
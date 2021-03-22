import {soleList} from "../../utils/requests"

const state = {
    sloeList : []
}

const mutations = {
    getSolemutation(state,res){
        state.sloeList = res;
    }
}

const actions = {
    getSoleAction(context){
        soleList().then(res=>{
            context.commit("getSolemutation",res.data.list);
        })
    }
}

const getters = {
    getSoleList(state){
        return state.sloeList;
    }
}

export default {
    state,
    mutations,
    actions,
    getters,
}
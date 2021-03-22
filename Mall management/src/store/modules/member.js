import { memberList } from "../../utils/requests"

const state = {
    memberList:[]
}

const mutations = {
    setMemberList(state,memberList){
        state.memberList = memberList;
    }
}

const actions = {
    getMemberList(context){
        memberList().then(res=>{
            context.commit("setMemberList",res.data.list);
        })
    }
}

const getters = {
    memberList(state){
        return state.memberList;
    }
}

export default {
    state,
    mutations,
    actions,
    getters,
    namespaced:true
}
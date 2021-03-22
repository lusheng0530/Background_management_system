import { bannerList } from "../../utils/requests";

const state = {
    bannerList:[]
}

const mutations = {
    setBannerList(state,bannerList){
        state.bannerList = bannerList;
    }
}

const actions = {
    getBannerList(context){
        bannerList().then(res=>{
            context.commit("setBannerList",res.data.list)
        })
    }
}

const getters = {
    bannerList(state){
        return state.bannerList;
    }
}

export default {
    state,
    mutations,
    actions,
    getters,
    namespaced:true
}
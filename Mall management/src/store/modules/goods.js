import { goodsCount , selectGoodsList } from "../../utils/requests";

const state = {
    // 查询条数
    size:3,
    // 查询页数
    page:1,
    count:0,
    goodsList:[]
}

const mutations = {
    setPage(state,page){
        state.page=page;
    },
    setCount(state,count){
        state.count = count;
    },
    setGoodsList(state,goodsList){
        state.goodsList = goodsList;
    }
}

const actions = {
    getPage(context,page){
        context.commit("setPage",page)
    },
    getCount(context){
        goodsCount().then(res=>{
            context.commit("setCount",res.data.list[0].total);
        })
    },
    getGoodsList(context,isPage){
        let page = null;
        if(isPage){
            if(typeof(isPage) == "object"){
                page=isPage;
            }else{
                page={
                    size:context.state.size,
                    page:context.state.page
                }
            }
        }
        selectGoodsList(page).then(res=>{
            if( typeof(isPage) != "object"){
                if((res.data.list.length==0 || res.data.list == null) && context.state.page > 1){
                    let p = context.state.page - 1;
                    context.commit("setPage",p);
                    context.dispatch("getGoodsList");
                    return
                }
            }
            context.commit("setGoodsList",res.data.list)
        })
    }
}

const getters = {
    size(state){
        return state.size;
    },
    page(state){
        return state.page;
    },
    count(state){
        return state.count;
    },
    goodsList(state){
        return state.goodsList;
    }
}

export default {
    state,
    mutations,
    actions,
    getters,
    namespaced:true
}
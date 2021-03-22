import { sumAdmin, adminList } from "../../utils/requests"

const state = {
    // size :每页显示的条数
    size:2,
    // page: 当前页码数据
    page:1,
    //计算总的记录数
    count:0,
    userList: []
}

const mutations = {
    setUserList(state,list){
        state.userList = list;
    },
    setUserNum(state,total){
        state.count = total;
    },
    setPage(state,p){
        state.page = p;
    }
}

const actions = {
    // 获取管理员列表
    getUserList(context) {
        var params = {
            size: context.state.size,
            page: context.state.page
        }
        // 发起获取管理员列表请求
        adminList(params).then(res => {
            // 判断返回列表的数据是否为空.如果为空,将page-1,如果不为空则直接获取列表数据
            if ((res.data.list == null || res.data.list.length == 0) && context.state.page > 1) {
                // 将page-1
                var p = context.state.page - 1;
                context.commit('setPage', p);
                // 自调
                context.dispatch('getUserList');
                return;
            }
            context.commit('setUserList', res.data.list)
        })
    },
    // 获取总数
    getUserNum(context){
        sumAdmin().then(res=>{
            console.log(res.data.list[0].total);
            
            context.commit('setUserNum',res.data.list[0].total)
        })
    },
    getPage(context,p){
        context.commit("setPage",p)
    }
}

const getters = {
    count(state) {
        return state.count
    },
    userList(state) {
        return state.userList;
    },
    size(state){
        return state.size;
    }
}

export default {
    state,
    mutations,
    actions,
    getters,
    namespaced:true
}
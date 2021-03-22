export const state = {
    user:sessionStorage.getItem("user") ? JSON.parse(sessionStorage.getItem('user')) : null
}

export const mutations = {
    changeUser(state,user){
        state.user = user;
        if(user){
            // 将user值存入sessionStorage
            sessionStorage.setItem("user",JSON.stringify(user))
        }else{
            // 删除sessionStorage里面的user
            sessionStorage.removeItem("user")
        }
    }
}

export const getters = {
    user(state){
        return state.user
    }
}
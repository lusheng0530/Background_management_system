import { cartList , selectgoodsList } from "../utils/request"

export default {
    getUser(context,user){
        context.commit("setUser",user)
    },
    getCartList(context,uid){
        cartList(uid).then(res=>{
            context.commit("setCartList",res.data.list)
        })
    },
    getGoodsList(context,id){
        selectgoodsList(id).then(res=>{
            context.commit("setGoodsList",res.data.list)
        })
    }
}
export const state = {
    user:sessionStorage.getItem("user")?JSON.parse(sessionStorage.getItem("user")):null,
    cartList:[],
    goodsList:[]
}

export const mutations = {
    setUser(state,user){
        state.user = user;
        if(user){
            sessionStorage.setItem("user",JSON.stringify(user));
        }else{
            sessionStorage.removeItem("user");
        }
    },
    setCartList(state,cartList){
        state.cartList = cartList;
    },
    setGoodsList(state,goodsList){
        state.goodsList = goodsList;
    }
}

export const getters = {
    user(state){
        return state.user
    },
    cartList(state){
        return state.cartList
    },
    sumGoodsPrice(state){
        let sum = 0;
        state.cartList.forEach(element => {
            sum += element.price*element.num 
        });
        return sum
    },
    toTal(state){
        let sum = 0;
        if(state.cartList){
            state.cartList.forEach(ele=>{
                sum += ele.num
            })
        }
        return sum
    },
    goodsList(state){
        return state.goodsList
    }
}


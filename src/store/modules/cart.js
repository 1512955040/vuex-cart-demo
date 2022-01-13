import products from "./products"

const state={
    cartProducts:JSON.parse(window.localStorage.getItem('cart-products')) || []
}
const getters={
    //总个数
    totalCount(state){
        return state.cartProducts.reduce((sum,prod)=>sum+prod.count,0)
    },
    //总价格
    totalPrice(state){
        return state.cartProducts.reduce((sum,prod)=>sum+prod.totalPrice,0)
    },
     //选中个数
     checkCount(state){
        const prods= state.cartProducts.filter(cartProduct=>cartProduct.isChecked)
        return prods.reduce((sum,prod)=>sum+prod.count,0)
    },
    //所有选中总价格
    totalPrice(state){
        const prods= state.cartProducts.filter(cartProduct=>cartProduct.isChecked)
        return prods.reduce((sum,prod)=>sum+prod.totalPrice,0)
    }
}
const mutations={
    //添加购物车
    addToCart(state,product){
        //1.cartProducts 中没有商品,把该商品添加到数组，并增加count,ischecked,totalPrice
        //2.cartProducts 有该商品，让商品的数量加1，选中，计算小计
        const prod=state.cartProducts.find(item=>item.id === product.id)
        console.log(product)
        if(prod){
            prod.count++
            prod.isChecked=true
            prod.totalPrice=prod.count * prod.price
        }else{
            state.cartProducts.push({
                ...product,
                 count:1,
                 isChecked:true,
                 totalPrice:product.price
            })
        }
    },
    //删除购物车
    deleteFromCart(state,product){
        const index=state.cartProducts.findIndex(item=>item.id === product)
        index!==-1 && state.cartProducts.splice(index,1)
    },
    //全选
    updateAllProductChecked(state,checked){
        state.cartProducts.forEach(prod=>{
            prod.isChecked=checked
        })
        // let totalAllprice=0
        // if(checked) {
        //      state.cartProducts.forEach((sum,index)=>{
        //         totalAllprice += sum[index].totalPrice
        //      })

        // }
    },
    //单选
    updateProductChecked(state,{checked,prodId}){
        const prod=state.cartProducts.find(prod=>prod.id === prodId )
        prod && (prod.isChecked=checked)
    },
    //单选购物车增加数量
    updateProductValue(state,{prodId,count}){
        const prod=state.cartProducts.find(prod=>prod.id === prodId )
        prod && (prod.totalPrice=count * prod.price)
    }
}
const actions={

}
export default{
    namespaced:true,
    state,
    getters,
    mutations,
    actions
}
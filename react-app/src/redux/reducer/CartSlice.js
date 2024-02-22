import { createSlice } from "@reduxjs/toolkit";

const fetchFromLocalStorage = () => {
    let cart = localStorage.getItem('cart');
    if(cart){
        return JSON.parse(localStorage.getItem('cart'))
    } else {
        return [];
    }
}

const storeInLocalStorage = (data) => {
    localStorage.setItem('cart', JSON.stringify(data))
}

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        data: fetchFromLocalStorage(),
        totalItems: 0,
        totalAmount: 0,
        deliveryCharge: 30000
    }, 
    reducers: {
        addToCart(state, action){
            const tempItem = state.data.find(item => item.product_id === action.payload.product_id);
            if(tempItem){
                const tempCart = state.data.map(item => {
                    if(item.product_id === action.payload.product_id){
                        let newQty = item.quantity + action.payload.quantity;
                        let newTotalPrice = newQty * item.product_price;
                        return { ...item, quantity: newQty, totalPrice: newTotalPrice };
                    } else {
                        return item;
                    }
                });
                state.data = tempCart;
                storeInLocalStorage(state.data);
            } else {
                state.data.push(action.payload);
                storeInLocalStorage(state.data);
            }
        },
        removeFromCart(state, action){
            const tempCart = state.data.filter(item => item.product_id !== action.payload);
            state.data = tempCart;
            storeInLocalStorage(state.data);
        },
        clearCart(state){
            state.data = [];
            storeInLocalStorage(state.data);
        },
        toggleCartQty(state, action){
            const tempCart = state.data.map(item => {
                if(item.product_id === action.payload.product_id){
                    let tempQty = item.quantity;
                    let tempTotalPrice = item.totalPrice;
                    if(action.payload.type === "INC"){
                        tempQty++;
                        tempTotalPrice = tempQty * item.product_price;
                    }
                    if(action.payload.type === "DEC"){
                        // console.log('product price : ',item.product_price );
                        tempQty--;
                        if(tempQty < 1) tempQty = 1;
                        tempTotalPrice = tempQty * item.product_price;
                    }
                    return {...item, quantity: tempQty, totalPrice: tempTotalPrice};
                } else {
                    return item;
                }
            });
            state.data = tempCart;
            storeInLocalStorage(state.data);
        },
        getCartTotal(state){
            state.totalAmount = state.data.reduce((cartTotal, cartItem) => {
                return cartTotal += cartItem.totalPrice;
            }, 0);
            state.totalItems = state.data.length;
        }
    }
});

export const {addToCart, removeFromCart, toggleCartQty, getCartTotal, clearCart} = cartSlice.actions;
export default cartSlice.reducer;
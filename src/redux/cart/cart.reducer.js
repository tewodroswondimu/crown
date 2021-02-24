import CartActionTypes from './cart.types';
import { addItemToCart, removeItemFromCart, clearItemFromCart } from './cart.utils';

const INITIAL_STATE = {
    hidden: true, 
    cartItems: []
}

const cartReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case CartActionTypes.TOGGLE_CART_HIDDEN: 
            return {
                ...state, 
                hidden: !state.hidden
            }
        case CartActionTypes.ADD_ITEM: 
            return {
                ...state, 
                cartItems: addItemToCart(action.payload, state.cartItems)
            }
        case CartActionTypes.REMOVE_ITEM: 
            return {
                ...state, 
                cartItems: removeItemFromCart(action.payload, state.cartItems)
            }
        case CartActionTypes.CLEAR_ITEM_FROM_CART: 
            return {
                ...state,
                cartItems: clearItemFromCart(action.payload, state.cartItems)
            }
        default: 
            return state; 
    }
}

export default cartReducer; 
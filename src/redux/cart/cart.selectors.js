import {  createSelector } from 'reselect';

// return just the slice of the cart
const selectCart = state => state.cart; 

// returns just the slice of cart items
export const selectCartItems = createSelector(
    [selectCart], 
    cart => cart.cartItems
);

// return just the count of the cart items 
export const selectCartItemsCount = createSelector(
    [selectCartItems], 
    // this is a selector, i.e. it pulls down the whole state of cart and
    // slices it to just the quanitity, which we computed
    cartItems => cartItems.reduce( (accumulatedQuantitiy, cartItem) => 
        accumulatedQuantitiy + cartItem.quantity, 0)
)
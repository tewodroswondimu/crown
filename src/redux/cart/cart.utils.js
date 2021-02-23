export const addItemToCart = (cartItemToAdd, cartItems) => {
    const existingCartItem = cartItems.find(
        cartItem => cartItem.id === cartItemToAdd.id
    )

    // check if the item already exists in the list of cart items
    if (existingCartItem) {
        // if it does, then map through each of the cart items
        // when the cart item that has the same id is found,
        // return an object with the cart item and add 1 to the 
        // property called quantity 
        return cartItems.map(cartItem =>
            cartItem.id === cartItemToAdd.id
            ? {  
                ...cartItem, 
                quantity: cartItem.quantity + 1
            }
            : cartItem
        );
    } 

    // if it does not exist, then create a list of cartItems plus
    // the new cart item and set the quantity to 1
    return [...cartItems, { ...cartItemToAdd, quantity: 1 }]

}

export const removeItemFromCart = (cartItemToRemove, cartItems) => {
    const existingCartItem = cartItems.find(
        cartItem => cartItem.id === cartItemToRemove.id
    )

    // check if the item already exists in the list of cart items
    if (existingCartItem) {
        // if it does, then map through each of the cart items
        // when the cart item that has the same id is found,
        // return an object with the cart item and add 1 to the 
        // property called quantity 
        return cartItems.map(cartItem =>
            cartItem.id === cartItemToRemove.id && cartItem.quantity > 1
            ? { ...cartItem, quantity: cartItem.quantity - 1 }
            : null
        )
    } else {
        // if it does not exist, just return 
        return cartItems
    }
}
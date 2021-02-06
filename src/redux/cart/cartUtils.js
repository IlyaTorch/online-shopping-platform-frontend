export const addItemToCart = (cartItems, cartItemToAdd) => {
    const existingCartItem = cartItems.find((cartItem, index) => index === cartItemToAdd.index);

    if (existingCartItem) {
        return cartItems.map((cartItem, index) => index === cartItemToAdd.index
            ? {...cartItem, quantity: cartItem.quantity + 1}
            : cartItem
        )
    }

    return [...cartItems, {...cartItemToAdd, quantity: 1}];
};

export const removeItemFromCart = (cartItems, cartItemToRemove) => {
    const existingCartItem = cartItems.find((cartItem, index) => index === cartItemToRemove.index);

    if (existingCartItem.quantity === 1) {
        return cartItems.filter((cartItem, index) => index !== cartItemToRemove.index);
    }

    return cartItems.map((cartItem, index) => index === cartItemToRemove.index
        ? {...cartItem, quantity: cartItem.quantity - 1}
        : cartItem
    );
};


export const updateQuantityItemsInCart = (cartItems, {item: itemToUpdateQuantity, quantity: newQuantity}) => {
    newQuantity = parseInt(newQuantity);

    if (newQuantity <= 0 || isNaN(newQuantity)) {
        return cartItems.filter((cartItem, index) => index !== itemToUpdateQuantity.index);
    } else {
        return cartItems.map((cartItem, index) => index === itemToUpdateQuantity.index
        ? {...cartItem, quantity: newQuantity}
        : cartItem
    );
    }
};

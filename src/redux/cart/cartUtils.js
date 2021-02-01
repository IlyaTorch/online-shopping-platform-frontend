export const addItemToCart = (cartItems, cartItemToAdd) => {
    const existingCartItem = cartItems.find(cartItem =>
        cartItem.id === cartItemToAdd.id &&
        cartItem.size === cartItemToAdd.size &&
        cartItem.color === cartItemToAdd.color
    );

    if (existingCartItem) {
        return cartItems.map(cartItem =>
                cartItem.id === cartItemToAdd.id &&
                cartItem.size === cartItemToAdd.size &&
                cartItem.color === cartItemToAdd.color
                    ? {...cartItem, quantity: cartItem.quantity + 1}
                    : cartItem
        )
    }

    return [...cartItems, {...cartItemToAdd, quantity: 1}];
};

export const removeItemFromCart = (cartItems, cartItemToRemove) => {
    const existingCartItem = cartItems.find(cartItem =>
        cartItem.id === cartItemToRemove.id &&
        cartItem.size === cartItemToRemove.size &&
        cartItem.color === cartItemToRemove.color
    );

    if (existingCartItem.quantity === 1) {
        return cartItems.filter(cartItem => cartItem.id !== cartItemToRemove.id);
    }

    return cartItems.map(cartItem =>
        cartItem.id === cartItemToRemove.id &&
        cartItem.size === cartItemToRemove.size &&
        cartItem.color === cartItemToRemove.color
        ? {...cartItem, quantity: cartItem.quantity - 1}
        : cartItem
    );
};

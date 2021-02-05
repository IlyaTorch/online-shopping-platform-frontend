import {CartActionTypes} from "./cartTypes";


export const toggleCartHidden = () => ({
    type: CartActionTypes.TOGGLE_CART_HIDDEN
});

export const addItem = item => ({
    type: CartActionTypes.ADD_ITEM,
    payload: item
});

export const removeItem = item => ({
    type: CartActionTypes.REMOVE_ITEM,
    payload: item
});

export const updateItemsQuantity = (item, quantity) => ({
    type: CartActionTypes.UPDATE_ITEMS_QUANTITY,
    payload: {item: item, quantity: quantity}
});

export const clearItemFromCart = item => ({
    type: CartActionTypes.CLEAR_ITEM_FROM_CART,
    payload: item
});

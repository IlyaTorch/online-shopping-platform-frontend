import {CartActionTypes} from './cartTypes';
import {addItemToCart, removeItemFromCart, updateQuantityItemsInCart} from './cartUtils';


const INITIAL_STATE = {
    hidden: true,
    cartItems: [],
};

const cartReducer = (state=INITIAL_STATE, action) => {
    switch (action.type) {
    case CartActionTypes.TOGGLE_CART_HIDDEN:
        return {
            ...state,
            hidden: !state.hidden,
        };
    case CartActionTypes.ADD_ITEM:
        return {
            ...state,
            cartItems: addItemToCart(state.cartItems, action.payload),
        };
    case CartActionTypes.CLEAR_ITEM_FROM_CART:
        return {
            ...state,
            cartItems: state.cartItems.filter((cartItem, index) => index !== action.payload.index),
        };
    case CartActionTypes.REMOVE_ITEM:
        return {
            ...state,
            cartItems: removeItemFromCart(state.cartItems, action.payload),
        };
    case CartActionTypes.UPDATE_ITEMS_QUANTITY:
        return {
            ...state,
            cartItems: updateQuantityItemsInCart(state.cartItems, action.payload),
        };
    default:
        return state;
    }
};

export default cartReducer;

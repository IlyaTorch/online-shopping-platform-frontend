import {combineReducers} from "redux";

import shopReducer from "./shop/shopReducer.js";
import shopsReducer from "./shops/shopsReducer";
import cartReducer from "./cart/cartReducer";


export default combineReducers({
    shop: shopReducer,
    shops: shopsReducer,
    cart: cartReducer
});

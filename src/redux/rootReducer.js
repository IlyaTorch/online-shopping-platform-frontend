import {combineReducers} from "redux";

import shopReducer from "./shop/shopReducer.js";
import platformReducer from "./platform/platformReducer";
import cartReducer from "./cart/cartReducer";


export default combineReducers({
    platform: platformReducer,
    shop: shopReducer,
    cart: cartReducer
});

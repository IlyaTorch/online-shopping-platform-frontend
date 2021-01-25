import {combineReducers} from "redux";

import shopReducer from "./shop/shopReducer.js";
import shopsReducer from "./shops/shopsReducer";


export default combineReducers({
    shop: shopReducer,
    shops: shopsReducer
});

import {combineReducers} from "redux";

import shopItemsReducer from "./shopItems/shopItemsReducer.js";
import shopsReducer from "./shops/shopsReducer";


export default combineReducers({
    shopItems: shopItemsReducer,
    shops: shopsReducer
});

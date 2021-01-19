import {combineReducers} from "redux";

import itemsReducer from "./items/items.reducer";


export default combineReducers({
    items: itemsReducer,
});

import {ItemListActionTypes} from "./items.types";
import {getItemsByUrl} from "./items.utils";


const INITIAL_STATE = {
    itemList: []
};


const itemsReducer = (state=INITIAL_STATE, action) => {
    switch (action.type) {
        case ItemListActionTypes.REFRESH_ITEM_LIST:
            return {
                ...state,
                itemList: getItemsByUrl(action.payload)
            }
        default:
            return state;
    }
};


export default itemsReducer;

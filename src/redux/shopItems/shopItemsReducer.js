import {ShopItemsActionTypes} from "./shopItemsTypes";


const INITIAL_STATE = {
    itemsList: [],
    displayedItems: []
};


const shopItemsReducer = (state=INITIAL_STATE, action) => {
    switch (action.type) {
        case ShopItemsActionTypes.UPDATE_ITEMS_LIST:
            return {
                ...state,
                itemsList: action.payload
            };

        case ShopItemsActionTypes.UPDATE_DISPLAYED_ITEMS:
            return {
                ...state,
                displayedItems: action.payload
            };

        default:
            return state;
    }
};


export default shopItemsReducer;

import {ShopItemsActionTypes} from "./shopItemsTypes";


export const updateItemList = items => (
    {
        type: ShopItemsActionTypes.UPDATE_ITEMS_LIST,
        payload: items
    }
);

export const updateDisplayedItems = items => (
    {
        type: ShopItemsActionTypes.UPDATE_DISPLAYED_ITEMS,
        payload: items
    }
);

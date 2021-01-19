import {ItemListActionTypes} from "./items.types";


export const refreshItems = url => ({
    type: ItemListActionTypes.REFRESH_ITEM_LIST,
    payload: url
});

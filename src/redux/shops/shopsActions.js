import {ShopsActionTypes} from "./shopsTypes";


export const updateShopsList = shops => (
    {
        type: ShopsActionTypes.UPDATE_SHOPS_LIST,
        payload: shops
    }
);

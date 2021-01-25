import {ShopItemsActionTypes} from "./shopTypes";


export const displayAllItems = () => (
    {
        type: ShopItemsActionTypes.DISPLAY_ALL_ITEMS
    }
);

export const displayLimitedItems = () => (
    {
        type: ShopItemsActionTypes.DISPLAY_LIMITED_ITEMS
    }
);

export const displayItemsFromCategory = () => (
    {
        type: ShopItemsActionTypes.DISPLAY_ITEMS_FROM_CATEGORY
    }
);

export const displayItemsByRequestFromSearchForm = () => (
    {
        type: ShopItemsActionTypes.DISPLAY_ITEMS_BY_REQUEST_FROM_SEARCH_FORM
    }
);

export const displayAboutComponent = () => (
    {
        type: ShopItemsActionTypes.DISPLAY_ABOUT
    }
);

export const updateItemList = items => (
    {
        type: ShopItemsActionTypes.UPDATE_ITEMS_LIST,
        payload: items
    }
);

export const updateItemsByRequestFromSearchForm = items => (
    {
        type: ShopItemsActionTypes.UPDATE_ITEMS_BY_REQUEST_FROM_SEARCH_FORM,
        payload: items
    }
);

export const updateItemsFromCategory = items => (
    {
        type: ShopItemsActionTypes.UPDATE_ITEMS_FROM_CATEGORY,
        payload: items
    }
);

export const updateCategories = categories => (
    {
        type: ShopItemsActionTypes.UPDATE_CATEGORIES,
        payload: categories
    }
);

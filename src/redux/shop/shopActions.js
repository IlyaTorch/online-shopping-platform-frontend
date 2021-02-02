import {ShopItemsActionTypes} from "./shopTypes";
import {API_SHOPS_URL} from "../../url-data/urlData";


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

/////////FETCHING SHOP ITEMS////////
export const fetchItemsStart = () => ({
    type: ShopItemsActionTypes.FETCH_ITEMS_START,
});

export const fetchItemsSuccess = items => ({
    type: ShopItemsActionTypes.FETCH_ITEMS_SUCCESS,
    payload: items
});

export const fetchItemsFailure = errorMessage => ({
    type: ShopItemsActionTypes.FETCH_ITEMS_FAILURE,
    payload: errorMessage
});

export const fetchItemsStartAsync = (shopId) => {
    return dispatch => {
        dispatch(fetchItemsStart());

        fetch(`${API_SHOPS_URL}/${shopId}/items/`)
        .then(response => response.json())
        .then(items => {
            dispatch(fetchItemsSuccess(items));
            dispatch(updateItemsByRequestFromSearchForm(items));
        })
        .catch(error => dispatch(fetchItemsFailure(error.message)));
    };
};

import {ShopItemsActionTypes} from './shopTypes';
import {API_CATEGORIES_URL, API_SHOPS_URL} from '../../url-data/urlData';


export const displayAllItems = () => (
    {
        type: ShopItemsActionTypes.DISPLAY_ALL_ITEMS,
    }
);

export const displayLimitedItems = () => (
    {
        type: ShopItemsActionTypes.DISPLAY_LIMITED_ITEMS,
    }
);

export const displayItemsFromCategory = () => (
    {
        type: ShopItemsActionTypes.DISPLAY_ITEMS_FROM_CATEGORY,
    }
);

export const displayItemsByRequestFromSearchForm = () => (
    {
        type: ShopItemsActionTypes.DISPLAY_ITEMS_BY_REQUEST_FROM_SEARCH_FORM,
    }
);

export const displayAboutComponent = () => (
    {
        type: ShopItemsActionTypes.DISPLAY_ABOUT,
    }
);

export const updateItemList = (items) => (
    {
        type: ShopItemsActionTypes.UPDATE_ITEMS_LIST,
        payload: items,
    }
);

export const updateItemsByRequestFromSearchForm = (items) => (
    {
        type: ShopItemsActionTypes.UPDATE_ITEMS_BY_REQUEST_FROM_SEARCH_FORM,
        payload: items,
    }
);

export const updateItemsFromCategory = (items) => (
    {
        type: ShopItemsActionTypes.UPDATE_ITEMS_FROM_CATEGORY,
        payload: items,
    }
);


// ///////FETCHING SHOP////////
export const fetchShopStart = () => ({
    type: ShopItemsActionTypes.FETCH_SHOP_START,
});

export const fetchShopSuccess = (shop) => ({
    type: ShopItemsActionTypes.FETCH_SHOP_SUCCESS,
    payload: shop,
});

export const fetchShopFailure = (errorMessage) => ({
    type: ShopItemsActionTypes.FETCH_SHOP_FAILURE,
    payload: errorMessage,
});

export const fetchShopStartAsync = (shopId) => {
    return (dispatch) => {
        dispatch(fetchShopStart());

        fetch(`${API_SHOPS_URL}/${shopId}`)
            .then((response) => response.json())
            .then((shop) => dispatch(fetchShopSuccess(shop)))
            .catch((error) => dispatch(fetchShopFailure(error.message)));
    };
};

// ///////FETCHING SHOP ITEMS////////
export const fetchItemsStart = () => ({
    type: ShopItemsActionTypes.FETCH_ITEMS_START,
});

export const fetchItemsSuccess = (items) => ({
    type: ShopItemsActionTypes.FETCH_ITEMS_SUCCESS,
    payload: items,
});

export const fetchItemsFailure = (errorMessage) => ({
    type: ShopItemsActionTypes.FETCH_ITEMS_FAILURE,
    payload: errorMessage,
});

export const setNumPages = (numPages) => ({
    type: ShopItemsActionTypes.SET_NUM_PAGES,
    payload: numPages,
});

export const fetchItemsStartAsync = (shopId, pageNum=1) => {
    return (dispatch) => {
        dispatch(fetchItemsStart());

        fetch(`${API_SHOPS_URL}/${shopId}/items/?page=${pageNum}`)
            .then((response) => response.json())
            .then((parsedResponse) => {
                const items = parsedResponse.results;
                dispatch(fetchItemsSuccess(items));
                dispatch(updateItemsByRequestFromSearchForm(items));
            })
            .catch((error) => dispatch(fetchItemsFailure(error.message)));
    };
};

// ///////FETCHING CATEGORIES////////
export const fetchCategoriesStart = () => ({
    type: ShopItemsActionTypes.FETCH_CATEGORIES_START,
});

export const fetchCategoriesSuccess = (categories) => ({
    type: ShopItemsActionTypes.FETCH_CATEGORIES_SUCCESS,
    payload: categories,
});

export const fetchCategoriesFailure = (errorMessage) => ({
    type: ShopItemsActionTypes.FETCH_CATEGORIES_FAILURE,
    payload: errorMessage,
});

export const fetchCategoriesStartAsync = () => {
    return (dispatch) => {
        dispatch(fetchCategoriesStart());

        fetch(`${API_CATEGORIES_URL}/`)
            .then((response) => response.json())
            .then((categories) => dispatch(fetchCategoriesSuccess(categories)))
            .catch((error) => dispatch(fetchCategoriesFailure(error.message)));
    };
};

export const showOrderError = (errorMessage) => {
    return (dispatch) => {
        dispatch({
            type: ShopItemsActionTypes.SHOW_ORDER_ERROR,
            payload: errorMessage,
        });

        setTimeout(() => {
            dispatch(hideOrderError());
        }, 3000);
    };
};

export const hideOrderError = () => ({
    type: ShopItemsActionTypes.HIDE_ORDER_ERROR,
});

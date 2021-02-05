import {ShopItemsActionTypes} from "./shopTypes";


const INITIAL_STATE = {
    errorMessage: undefined,

    itemsList: null,
    isItemsFetching: false,

    shopObj: null,
    isShopFetching: false,

    categories: null,
    isCategoriesFetching: false,


    itemsByRequestFromSearchForm: [],
    itemsFromCategory: [],
    displayAllItems: false,
    displayLimitedItems: false,
    displayItemsFromCategory: false,
    displayItemsByRequestFromSearchForm: false,
    displayAbout: false,
};


const shopReducer = (state=INITIAL_STATE, action) => {
    switch (action.type) {
        /////FETCHING SHOP//////
        case ShopItemsActionTypes.FETCH_SHOP_START:
            return {
                ...state,
                isShopFetching: true
            };
        case ShopItemsActionTypes.FETCH_SHOP_SUCCESS:
            return {
                ...state,
                isShopFetching: false,
                shopObj: action.payload
            };
        case ShopItemsActionTypes.FETCH_SHOP_FAILURE:
            return {
                ...state,
                isShopFetching: false,
                errorMessage: action.payload
            };
        /////FETCHING ITEMS//////
        case ShopItemsActionTypes.FETCH_ITEMS_START:
            return {
                ...state,
                isItemsFetching: true
            };
        case ShopItemsActionTypes.FETCH_ITEMS_SUCCESS:
            return {
                ...state,
                isItemsFetching: false,
                itemsList: action.payload
            };
        case ShopItemsActionTypes.FETCH_ITEMS_FAILURE:
            return {
                ...state,
                isItemsFetching: false,
                errorMessage: action.payload
            };
        /////FETCHING CATEGORIES//////
        case ShopItemsActionTypes.FETCH_CATEGORIES_START:
            return {
                ...state,
                isCategoriesFetching: true
            };
        case ShopItemsActionTypes.FETCH_CATEGORIES_SUCCESS:
            return {
                ...state,
                isCategoriesFetching: false,
                categories: action.payload
            };
        case ShopItemsActionTypes.FETCH_CATEGORIES_FAILURE:
            return {
                ...state,
                isCategoriesFetching: false,
                errorMessage: action.payload
            };


        case ShopItemsActionTypes.DISPLAY_ALL_ITEMS:
            return {
                ...state,
                displayAllItems: true,
                displayLimitedItems: false,
                displayItemsFromCategory: false,
                displayItemsByRequestFromSearchForm: false,
                displayAbout: false,
            }
        case ShopItemsActionTypes.DISPLAY_LIMITED_ITEMS:
            return {
                ...state,
                displayAllItems: false,
                displayLimitedItems: true,
                displayItemsFromCategory: false,
                displayItemsByRequestFromSearchForm: false,
                displayAbout: false,
            }
        case ShopItemsActionTypes.DISPLAY_ITEMS_FROM_CATEGORY:
            return {
                ...state,
                displayAllItems: false,
                displayLimitedItems: false,
                displayItemsFromCategory: true,
                displayItemsByRequestFromSearchForm: false,
                displayAbout: false,
            }
        case ShopItemsActionTypes.DISPLAY_ABOUT:
            return {
                ...state,
                displayAllItems: false,
                displayLimitedItems: false,
                displayItemsFromCategory: false,
                displayItemsByRequestFromSearchForm: false,
                displayAbout: true,
            }
        case ShopItemsActionTypes.DISPLAY_ITEMS_BY_REQUEST_FROM_SEARCH_FORM:
            return {
                ...state,
                displayAllItems: false,
                displayLimitedItems: false,
                displayItemsFromCategory: false,
                displayItemsByRequestFromSearchForm: true,
                displayAbout: false,
            }
        case ShopItemsActionTypes.UPDATE_ITEMS_LIST:
            return {
                ...state,
                itemsList: action.payload
            };

        case ShopItemsActionTypes.UPDATE_ITEMS_BY_REQUEST_FROM_SEARCH_FORM:
            return {
                ...state,
                itemsByRequestFromSearchForm: action.payload
            };
        case ShopItemsActionTypes.UPDATE_ITEMS_FROM_CATEGORY:
            return {
                ...state,
                itemsFromCategory: action.payload
            }

        case ShopItemsActionTypes.UPDATE_CATEGORIES:
            return {
                ...state,
                categories: action.payload
            };
        default:
            return state;
    }
};


export default shopReducer;

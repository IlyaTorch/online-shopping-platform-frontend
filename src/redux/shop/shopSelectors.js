import {createSelector} from "reselect";


export const selectShop = state => state.shop;


export const selectDisplayingAllItemsStatus = createSelector(
    [selectShop],
    shop => shop.displayAllItems
);

export const selectDisplayingLimitedItems = createSelector(
    [selectShop],
    shop => shop.displayLimitedItems
);

export const selectDisplayingItemsFromCategory = createSelector(
    [selectShop],
    shop => shop.displayItemsFromCategory
);

export const selectDisplayingItemsByRequestFromSearchForm = createSelector(
    [selectShop],
    shop => shop.displayItemsByRequestFromSearchForm
)

export const selectDisplayingAboutComponentStatus = createSelector(
    [selectShop],
    shop => shop.displayAbout
);

export const selectItemList = createSelector(
    [selectShop],
    shop => shop.itemsList
);

export const selectItemsByRequestFromSearchForm = createSelector(
    [selectShop],
    shop => shop.itemsByRequestFromSearchForm
);

export const selectLimitedItems = createSelector(
    [selectShop],
    shop => shop.itemsList ? shop.itemsList.filter(item => item.limit_offer_period != null) : null
);

export const selectItemsFromCategory = createSelector(
    [selectShop],
    shop => shop.itemsFromCategory
);

export const selectIsItemsLoading = createSelector(
    [selectShop],
    shop => !!shop.itemsList
);


export const selectShopObj = createSelector(
    [selectShop],
    shop => shop.shopObj
);

export const selectIsShopLoading = createSelector(
    [selectShop],
    shop => !!shop.shopObj
);

export const selectCategories = createSelector(
    [selectShop],
    shop => shop.categories
);

export const selectIsCategoriesLoading = createSelector(
    [selectShop],
    shop => !!shop.categories
);

export const selectPaymentErrorStatus = createSelector(
    [selectShop],
    shop => shop.paymentError
);

export const selectPaymentErrorMessage = createSelector(
    [selectShop],
    shop => shop.errorMessage
);

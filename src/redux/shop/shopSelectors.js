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
    shop => shop.itemsList.filter(item => item.limit_offer_period != null)
);

export const selectItemsFromCategory = createSelector(
    [selectShop],
    shop => shop.itemsFromCategory
);

export const selectCategories = createSelector(
    [selectShop],
    shop => shop.categories
);


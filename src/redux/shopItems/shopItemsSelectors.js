import {createSelector} from "reselect";


export const selectShopItems = state => state.shopItems;

export const selectItemList = createSelector(
    [selectShopItems],
    shopItems => shopItems.itemsList
);

export const selectDisplayedItems = createSelector(
    [selectShopItems],
    shopItems => shopItems.displayedItems
)

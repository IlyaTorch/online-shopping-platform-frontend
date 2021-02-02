import {createSelector} from "reselect";


export const selectPlatform = state => {
    return state.platform
};

export const selectShops = createSelector(
    [selectPlatform],
    platform => platform.shops
);

export const selectIsShopsFetching = createSelector(
    [selectPlatform],
    platform => platform.isFetching
);

export const selectIsShopsLoading = createSelector(
    [selectPlatform],
    platform => !!platform.shops
);

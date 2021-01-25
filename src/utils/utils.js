import {API_SHOPS_URL} from "../url-data/urlData";


export const setShopItemsToReduxState = (shopId, obj) => {
    fetch(`${API_SHOPS_URL}/${shopId}/items/`)
        .then(response => response.json())
        .then(items => {
            obj.props.updateItemList(items);
            obj.props.updateDisplayedItems(items);
            obj.setState({loadingItems: false});
        });
};

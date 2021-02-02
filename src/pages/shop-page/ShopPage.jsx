import React from 'react';
import {connect} from "react-redux";
import {createStructuredSelector} from "reselect";

import './shopPage.scss';

import About from "../../components/about/About";
import ShopHeader from "../../components/shop-header/ShopHeader";
import ItemsList from "../../components/items-list/ItemsList";
import WithSpinner from "../../components/with-spinner/withSpinner";

import {
    selectDisplayingAllItemsStatus, selectDisplayingLimitedItems, selectDisplayingItemsFromCategory,
    selectDisplayingAboutComponentStatus,

    selectItemList,
    selectLimitedItems,
    selectItemsFromCategory, selectDisplayingItemsByRequestFromSearchForm, selectItemsByRequestFromSearchForm,

    selectIsItemsLoading,
    selectShopObj,
    selectIsShopLoading,
} from "../../redux/shop/shopSelectors";

import {
    fetchShopStartAsync,
    fetchItemsStartAsync
} from "../../redux/shop/shopActions";


const ShopHeaderWithSpinner = WithSpinner(ShopHeader);
const ItemsListWithSpinner = WithSpinner(ItemsList);


class ShopPage extends React.Component {
    constructor(props) {
        super(props);

        this.shopId = this.props.match.params.shopId;
    }

    componentDidMount () {
        this.props.fetchShopStartAsync(this.shopId);
        this.props.fetchItemsStartAsync(this.shopId);
    }

    render() {
        return (
            <div className="shop-page-container">
                <ShopHeaderWithSpinner
                    isLoading={!this.props.isShopLoaded}
                    shop={this.props.shop}
                    history={this.props.history}
                    match={this.props.match}
                />

                <div className="items-container">
                {
                    this.props.displayAllItems ? <ItemsListWithSpinner
                                                    isLoading={!this.props.isItemsLoaded}
                                                    items={this.props.shopItems}
                                                  /> :
                        this.props.displayLimitedItems ? <ItemsListWithSpinner
                                                            isLoading={!this.props.isItemsLoaded}
                                                            items={this.props.limitedItems}
                                                          /> :
                            this.props.displayItemsByRequestFromSearchForm ? <ItemsListWithSpinner
                                                                                    isLoading={!this.props.isItemsLoaded}
                                                                                    items={this.props.itemsByRequestFromSearchForm}
                                                                                  /> :
                                this.props.displayItemsFromCategory ? <ItemsListWithSpinner
                                                                        isLoading={!this.props.isItemsLoaded}
                                                                        items={this.props.itemsFromCategory}
                                                                       /> :
                                    this.props.displayAbout ? <About infoAbout={this.props.shop.about}/> : null
                }
                </div>
            </div>
        )
    }
}

const mapStateToProps = createStructuredSelector({
    isShopLoaded: selectIsShopLoading,
    shop: selectShopObj,
    isItemsLoaded: selectIsItemsLoading,
    shopItems: selectItemList,


    limitedItems: selectLimitedItems,
    itemsFromCategory: selectItemsFromCategory,
    itemsByRequestFromSearchForm: selectItemsByRequestFromSearchForm,

    displayAllItems: selectDisplayingAllItemsStatus,
    displayLimitedItems: selectDisplayingLimitedItems,
    displayItemsFromCategory: selectDisplayingItemsFromCategory,
    displayItemsByRequestFromSearchForm: selectDisplayingItemsByRequestFromSearchForm,
    displayAbout: selectDisplayingAboutComponentStatus
});

const mapDispatchToProps = dispatch => ({
    fetchItemsStartAsync: (shopId) => dispatch(fetchItemsStartAsync(shopId)),
    fetchShopStartAsync: (shopId) => dispatch(fetchShopStartAsync(shopId))
});


export default connect(mapStateToProps, mapDispatchToProps)(ShopPage);

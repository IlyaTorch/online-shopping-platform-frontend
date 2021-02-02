import React from 'react';
import {connect} from "react-redux";
import {createStructuredSelector} from "reselect";

import {API_SHOPS_URL} from "../../url-data/urlData";

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

    selectIsItemsFetching, selectIsItemsLoading
} from "../../redux/shop/shopSelectors";

import {
    updateItemList,
    updateItemsByRequestFromSearchForm,

    fetchItemsStartAsync
} from "../../redux/shop/shopActions";


const ShopHeaderWithSpinner = WithSpinner(ShopHeader);
const ItemsListWithSpinner = WithSpinner(ItemsList);


class ShopPage extends React.Component {
    constructor(props) {
        super(props);

        this.shopId = this.props.match.params.shopId;

        this.state = {
            shop: {},
            loadingShop: true,
        };
    }

    componentDidMount () {
        fetch(`${API_SHOPS_URL}/${this.shopId}`)
            .then(response => response.json())
            .then(shop => {
                this.setState({shop: shop});
                this.setState({loadingShop: false});
            });

        this.props.fetchItemsStartAsync(this.shopId);
    }

    render() {
        return (
            <div className="shop-page-container">
                <ShopHeaderWithSpinner
                    isLoading={this.state.loadingShop}
                    shop={this.state.shop}
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
                                    this.props.displayAbout ? <About infoAbout={this.state.shop.about}/> : null
                }
                </div>
            </div>
        )
    }
}

const mapStateToProps = createStructuredSelector({
    shopItems: selectItemList,
    isItemsFetching: selectIsItemsFetching,
    isItemsLoaded: selectIsItemsLoading,


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
    updateItemList: items => dispatch(updateItemList(items)),
    updateDisplayedItems: items => dispatch(updateItemsByRequestFromSearchForm(items)),

    fetchItemsStartAsync: (shopId) => dispatch(fetchItemsStartAsync(shopId))
});


export default connect(mapStateToProps, mapDispatchToProps)(ShopPage);

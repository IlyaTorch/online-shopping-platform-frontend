import React from 'react';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';

import './shopPage.scss';

import About from '../../components/about/About';
import ShopHeader from '../../components/shop-header/ShopHeader';
import ItemsList from '../../components/items-list/ItemsList';
import ShopPageItemsList from '../../components/shop-page-items-list/ShopPageItemsList';
import WithSpinner from '../../components/with-spinner/withSpinner';

import {
    selectDisplayingAllItemsStatus, selectDisplayingLimitedItems, selectDisplayingItemsFromCategory,
    selectDisplayingAboutComponentStatus,

    selectItemList,
    selectLimitedItems,
    selectItemsFromCategory, selectDisplayingItemsByRequestFromSearchForm, selectItemsByRequestFromSearchForm,

    selectIsItemsLoading,
    selectShopObj,
    selectIsShopLoading,
} from '../../redux/shop/shopSelectors';

import {fetchShopStartAsync} from '../../redux/shop/shopActions';

import {API_SHOPS_URL} from '../../url-data/urlData';


const ShopHeaderWithSpinner = WithSpinner(ShopHeader);


class ShopPage extends React.Component {
    constructor(props) {
        super(props);

        this.shopId = this.props.match.params.shopId;
    }

    componentDidMount() {
        this.props.fetchShopStartAsync(this.shopId);
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
                        this.props.displayAllItems ? <ShopPageItemsList
                            items={this.props.shopItems}
                        /> :
                            this.props.displayLimitedItems ? <ShopPageItemsList
                                items={this.props.limitedItems}
                            /> :
                                this.props.displayItemsByRequestFromSearchForm ? <ShopPageItemsList
                                    items={this.props.itemsByRequestFromSearchForm}
                                /> :
                                    this.props.displayItemsFromCategory ? <ShopPageItemsList
                                        items={this.props.itemsFromCategory}
                                    /> :
                                        this.props.displayAbout ?
                                            <About infoAbout={this.props.shop.about}/> :
                                            <ItemsList url={`${API_SHOPS_URL}/${this.shopId}/items`} />
                    }
                </div>
            </div>
        );
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
    displayAbout: selectDisplayingAboutComponentStatus,
});

const mapDispatchToProps = (dispatch) => ({
    fetchShopStartAsync: (shopId) => dispatch(fetchShopStartAsync(shopId)),
});


export default connect(mapStateToProps, mapDispatchToProps)(ShopPage);

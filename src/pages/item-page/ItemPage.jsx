import React from "react";
import {connect} from "react-redux";
import {createStructuredSelector} from "reselect";

import "react-responsive-carousel/lib/styles/carousel.min.css";

import './itempage.scss';

import ShopHeader from "../../components/shop-header/ShopHeader";
import ItemBody from "../../components/item-body/ItemBody";
import SimilarItems from "../../components/similar-items/SimilarItems";
import WithSpinner from "../../components/with-spinner/withSpinner";

import {
    selectIsItemsLoading,
    selectIsShopLoading,
    selectItemList,
    selectShopObj
} from "../../redux/shop/shopSelectors";

import {
    fetchItemsStartAsync,
    fetchShopStartAsync,
} from "../../redux/shop/shopActions";


const ShopHeaderWithSpinner = WithSpinner(ShopHeader);
const ItemBodyWithSpinner = WithSpinner(ItemBody);
const SimilarItemsWithSpinner = WithSpinner(SimilarItems);


class ItemPage extends React.Component {
    constructor(props) {
        super(props);

        this.shopId = this.props.match.params.shopId;
        this.itemId = parseInt(this.props.match.params.itemId);
    }

    componentDidMount () {
        this.props.fetchShopStartAsync(this.shopId);
        this.props.fetchItemsStartAsync(this.shopId);
    }

    componentWillReceiveProps (nextProps, nextContext) {
        if (this.props.location.pathname !== nextProps.location.pathname) {
            const {itemId: newItemId} = nextProps.match.params;
            this.itemId = parseInt(newItemId);
        }
    }

    render() {
        return (
            <div>
                <ShopHeaderWithSpinner
                    isLoading={!this.props.isShopLoaded}
                    shop={this.props.shop}
                    history={this.props.history}
                    match={this.props.match}
                />
                <ItemBodyWithSpinner
                    isLoading={!this.props.isItemsLoaded}
                    item={this.props.isItemsLoaded && this.props.items.find (item => item.id === this.itemId)}
                />

                <SimilarItemsWithSpinner
                    isLoading={!this.props.isItemsLoaded}
                    mainItem={this.props.isItemsLoaded && this.props.items.find (item => item.id === this.itemId)}
                    shopItems={this.props.items}
                />
            </div>
        )
    }
}


const mapStateToProps = createStructuredSelector({
    isShopLoaded: selectIsShopLoading,
    shop: selectShopObj,
    isItemsLoaded: selectIsItemsLoading,
    items: selectItemList,
});

const mapDispatchToProps = dispatch => ({
    fetchShopStartAsync: (shopId) => dispatch(fetchShopStartAsync(shopId)),
    fetchItemsStartAsync: (shopId) => dispatch(fetchItemsStartAsync(shopId)),
});


export default connect(mapStateToProps, mapDispatchToProps)(ItemPage);

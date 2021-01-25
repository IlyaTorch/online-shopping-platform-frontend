import React from "react";
import {connect} from "react-redux";
import {createStructuredSelector} from "reselect";

import "react-responsive-carousel/lib/styles/carousel.min.css";

import './itempage.scss';

import {API_URL, API_SHOPS_URL} from "../../url-data/urlData";

import ShopHeader from "../../components/shop-header/ShopHeader";
import ItemBody from "../../components/item-body/ItemBody";
import SimilarItems from "../../components/similar-items/SimilarItems";
import WithSpinner from "../../components/with-spinner/withSpinner";

import {selectItemList} from "../../redux/shop/shopSelectors";

import {setShopItemsToReduxState} from "../../utils/utils";

import {updateItemList, updateItemsByRequestFromSearchForm} from "../../redux/shop/shopActions";


const ShopHeaderWithSpinner = WithSpinner(ShopHeader);
const ItemBodyWithSpinner = WithSpinner(ItemBody);
const SimilarItemsWithSpinner = WithSpinner(SimilarItems);


class ItemPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            item: {},
            shop: {},
            loadingItem: true,
            loadingShop: true
        }

        this.shopId = this.props.match.params.shopId;
        this.itemId = this.props.match.params.itemId;
    }

    componentDidMount () {
        fetch(`${API_SHOPS_URL}/${this.shopId}`)
            .then(response => response.json())
            .then(shop => {
                this.setState({shop: shop});
                this.setState({loadingShop: false});
            });

        this.fetchItemToState(this.itemId);
        setShopItemsToReduxState(this.shopId, this);
    }

    componentWillReceiveProps (nextProps, nextContext) {
        if (this.props.location.pathname !== nextProps.location.pathname) {
            const {itemId: newItemId} = nextProps.match.params;

            this.fetchItemToState(newItemId);
        }
    }

    fetchItemToState = (itemId) => {
        fetch(`${API_URL}/items/${itemId}`)
            .then(response => response.json())
            .then(item => {
                this.setState({item: item});
                this.setState({loadingItem: false});
            });
    }

    render() {
        return (
            <div>
                <ShopHeaderWithSpinner
                    isLoading={this.state.loadingShop}
                    shop={this.state.shop}
                    history={this.props.history}
                    match={this.props.match}
                />
                <ItemBodyWithSpinner
                    isLoading={this.state.loadingItem}
                    item={this.state.item}
                />
                <SimilarItemsWithSpinner
                    isLoading={this.state.loadingItem}
                    mainItem={this.state.item}
                    shopItems={this.props.items}
                />
            </div>
        )
    }
}


const mapStateToProps = createStructuredSelector({
    items: selectItemList
});

const mapDispatchToProps = dispatch => ({
    updateItemList: items => dispatch(updateItemList(items)),
    updateDisplayedItems: items => dispatch(updateItemsByRequestFromSearchForm(items)),
});


export default connect(mapStateToProps, mapDispatchToProps)(ItemPage);

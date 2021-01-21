import React from 'react';
import {connect} from 'react-redux';
import {createStructuredSelector} from "reselect";

import './shopsPage.scss';

import Shop from "../../components/shop/Shop";

import {selectShops} from "../../redux/shops/shopsSelectors";
import {updateShopsList} from "../../redux/shops/shopsActions";

import {API_SHOPS_URL} from "../../url-data/urlData";


class ShopsPage extends React.Component {
    constructor (props) {
        super (props);

        fetch(API_SHOPS_URL)
            .then(response => response.json())
            .then(shops => {
                this.props.updateShopsList(shops);
            });
    }

    render() {
        return (
            <div className="shops-container">
                {
                    this.props.shops.map(shop => <Shop key={shop.id} shop={shop}/>)
                }
            </div>
        )
    }
}


const mapStateToProps = createStructuredSelector({
    shops: selectShops
});

const mapDispatchToProps = dispatch => ({
    updateShopsList: shops => dispatch(updateShopsList(shops))
})


export default connect(mapStateToProps, mapDispatchToProps)(ShopsPage);

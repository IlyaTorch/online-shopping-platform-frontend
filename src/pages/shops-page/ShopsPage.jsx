import React from 'react';
import {connect} from 'react-redux';
import {createStructuredSelector} from "reselect";

import './shopsPage.scss';

import WithSpinner from "../../components/with-spinner/withSpinner";
import ShopsList from "../../components/shopsList/ShopsList";

import {selectShops} from "../../redux/shops/shopsSelectors";
import {updateShopsList} from "../../redux/shops/shopsActions";

import {API_SHOPS_URL} from "../../url-data/urlData";


const ShopsListWithSpinner = WithSpinner(ShopsList);

class ShopsPage extends React.Component {
    constructor (props) {
        super (props);

        this.state = {
            loading: true
        }
    }

    componentDidMount () {
        fetch(`${API_SHOPS_URL}/`)
            .then(response => response.json())
            .then(shops => {
                this.props.updateShopsList(shops);
                this.setState({loading: false});
            });
    }

    render() {
        return (
            <ShopsListWithSpinner isLoading={this.state.loading} shops={this.props.shops} />
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

import React from 'react';
import {connect} from 'react-redux';
import {createStructuredSelector} from "reselect";

import './shopsPage.scss';

import WithSpinner from "../../components/with-spinner/withSpinner";
import ShopsList from "../../components/shopsList/ShopsList";

import {selectShops, selectIsShopsLoading} from "../../redux/platform/platformSelectors";

import {fetchShopsStartAsync} from "../../redux/platform/platformActions";


const ShopsListWithSpinner = WithSpinner(ShopsList);


class ShopsPage extends React.Component {
    componentDidMount () {
        this.props.fetchShopsStartAsync();
    }

    render() {
        return (
            <ShopsListWithSpinner isLoading={!this.props.isShopsLoaded} shops={this.props.shops} />
        );
    }
}


const mapStateToProps = createStructuredSelector({
    shops: selectShops,
    isShopsLoaded: selectIsShopsLoading
});

const mapDispatchToProps = dispatch => ({
    fetchShopsStartAsync: () => dispatch(fetchShopsStartAsync())
});


export default connect(mapStateToProps, mapDispatchToProps)(ShopsPage);

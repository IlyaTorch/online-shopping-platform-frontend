import React from 'react';
import {connect} from "react-redux";
import {createStructuredSelector} from "reselect";

import './homepage.scss'

import {API_URL} from "../../url-data/urlData";

import {selectItemsByRequestFromSearchForm} from "../../redux/shop/shopSelectors";

import ItemsList from "../../components/items-list/ItemsList";
import WithSpinner from "../../components/with-spinner/withSpinner";

import {updateItemsByRequestFromSearchForm, updateItemList} from "../../redux/shop/shopActions";


const ItemsListWithSpinner = WithSpinner(ItemsList);


class HomePage extends React.Component {
    constructor (props) {
        super(props);

        this.state = {
            loading: true
        }
    }

    componentDidMount () {
        fetch(`${API_URL}/`)
            .then(response => response.json())
            .then(items => {
                this.props.updateItems(items);
                this.props.updateItemsByRequestFromSearchForm(items);
                this.setState({loading: false})
            });
    }

    render () {
        return (
            <div className="homepage-container">
                <h1>ITEMS</h1>
                <ItemsListWithSpinner isLoading={this.state.loading} items={this.props.itemsByRequestFromSearchForm} />
            </div>
        )
    }
}

const mapStateToProps = createStructuredSelector({
    itemsByRequestFromSearchForm: selectItemsByRequestFromSearchForm
});

const mapDispatchToProps = dispatch => ({
    updateItems: items => dispatch(updateItemList(items)),
    updateItemsByRequestFromSearchForm: items => dispatch(updateItemsByRequestFromSearchForm(items))
});


export default connect(mapStateToProps, mapDispatchToProps)(HomePage);

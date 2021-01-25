import React from 'react';
import {connect} from 'react-redux';
import {createStructuredSelector} from "reselect";


import './searchForm.scss';

import {updateDisplayedItems} from "../../redux/shopItems/shopItemsActions";
import {selectItemList} from "../../redux/shopItems/shopItemsSelectors";


import FormInput from "../form-input/FormInput";


class SearchForm extends React.Component {

    handleChange = event => {
        const {value} = event.target;
        this.props.updateDisplayedItems(this.props.items.filter(item => item.title.toLowerCase().includes(value)));
    }

    render() {
        return (
            <div className="search-form">
                <form onSubmit={this.handleSubmit} method="GET">
                    <FormInput
                        name="search"
                        type="text"
                        label="SEARCH"
                        handleChange={this.handleChange}
                    />
                </form>
            </div>
        )
    }
}


const mapStateToProps = createStructuredSelector({
    items: selectItemList,
});


const mapDispatchToProps = dispatch => ({
    updateDisplayedItems: items => dispatch(updateDisplayedItems(items))
});


export default connect(mapStateToProps, mapDispatchToProps)(SearchForm);

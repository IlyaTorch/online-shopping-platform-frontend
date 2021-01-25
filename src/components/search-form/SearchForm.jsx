import React from 'react';
import {connect} from 'react-redux';
import {createStructuredSelector} from "reselect";


import './searchForm.scss';

import {updateItemsByRequestFromSearchForm, displayItemsByRequestFromSearchForm} from "../../redux/shop/shopActions";
import {selectItemList} from "../../redux/shop/shopSelectors";


import FormInput from "../form-input/FormInput";


class SearchForm extends React.Component {

    handleChange = event => {
        const {value} = event.target;
        this.props.updateItemsByRequestFromSearchForm(this.props.items.filter(item => item.title.toLowerCase().includes(value)));
    }

    render() {
        const searchOnClick = () => this.props.displayItemsByRequestFromSearchForm();

        return (
            <div className="search-form" onClick={searchOnClick}>
                <form method="GET">
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
    updateItemsByRequestFromSearchForm: items => dispatch(updateItemsByRequestFromSearchForm(items)),
    displayItemsByRequestFromSearchForm: () => dispatch(displayItemsByRequestFromSearchForm())

});


export default connect(mapStateToProps, mapDispatchToProps)(SearchForm);

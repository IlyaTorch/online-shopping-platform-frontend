import React from 'react';
import {connect} from 'react-redux';

import {refreshItems} from "../../redux/items/items.actions";

import './search-form.styles.scss';
import FormInput from "../form-input/form-input.component";
import CustomButton from "../custom-button/custom-button.component";


class SearchForm extends React.Component {
    constructor(props) {
        super(props);

        this.fieldForSearch = props.fieldForSearch;

        this.state = {
            search: ''
        }
    }

    handleSubmit = event => {
        event.preventDefault();

        const {search} = this.state;

        try {
            let url = `http://127.0.0.1:8000/api/?format=json&search_by_${this.fieldForSearch}=${search}`;

            this.props.refreshItems(url);

            this.setState({search: ''})
        } catch (error) {
            console.error(error);
        }
    }

    handleChange = event => {
        const {value, name} = event.target;
        this.setState({[name]: value});
        console.log(this.state);
    }

    render() {
        return (
            <div className="search-form">
                <h2 className="search-header">FILTER ITEMS BY {this.fieldForSearch.toUpperCase()} TITLE</h2>

                <form onSubmit={this.handleSubmit} method="GET">
                    <FormInput
                        name="search"
                        type="text"
                        label="Search by title"
                        handleChange={this.handleChange}
                        value={this.state.search}
                    />

                    <div className="buttons">
                        <CustomButton type="submit">
                            Search
                        </CustomButton>
                    </div>
                </form>
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => ({
    refreshItems: url => dispatch(refreshItems(url))
})


export default connect(null, mapDispatchToProps)(SearchForm);

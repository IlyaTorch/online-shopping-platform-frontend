import React from 'react';

import './search-form.styles.scss';
import FormInput from "../form-input/form-input.component";
import CustomButton from "../custom-button/custom-button.component";


class SearchForm extends React.Component {
    constructor(props) {
        super(props);

        this.fieldForSearch = props.fieldForSearch;
    }

    handleSubmit = async event => {
        event.preventDefault();

        try {
            console.log(event);
        } catch (error) {
            console.error(error);
        }
    }

    render() {
        return (
            <div className="search-form">
                <h2 className="search-header">FIND ITEMS BY {this.fieldForSearch.toUpperCase()} TITLE</h2>

                <form onSubmit={this.handleSubmit} method="GET">
                    <FormInput
                        name="search"
                        type="text"
                        label="Search by title"
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


export default SearchForm;

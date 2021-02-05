import React from 'react';
import {connect} from "react-redux";
import {createStructuredSelector} from "reselect";

import './shopHeader.scss';

import CustomButton from "../custom-button/CustomButton";
import CategoriesDropdown from "../categories-dropdown/CategoriesDropdown";
import SearchForm from "../search-form/SearchForm";
import WithSpinner from "../with-spinner/withSpinner";

import {selectCategories, selectIsCategoriesLoading} from "../../redux/shop/shopSelectors";

import {
    fetchCategoriesStartAsync,
    displayAllItems,
    displayAboutComponent,
    displayLimitedItems
} from "../../redux/shop/shopActions";


const CategoriesDropdownWithSpinner = WithSpinner(CategoriesDropdown);

class ShopHeader extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            displayAboutComponent: false,
            displayCategoriesDropdown: false,
        };
    }

    componentDidMount () {
        this.props.fetchCategoriesStartAsync();
    }

    isCurrentPageItemPage = () => {
        return 'itemId' in this.props.match.params;
    }

    returnToTheShopPage = () => {
        const shopPageLocation = `/shops/${this.props.shop.id}`;
        this.props.history.push(shopPageLocation);
    }

    render() {
        const allItemsOnClick = () => {
            this.isCurrentPageItemPage() &&  this.returnToTheShopPage();
            this.props.displayAllItems();
            this.setState({displayCategoriesDropdown: false});
        };

        const categoriesOnClick = () => {
            this.setState({displayCategoriesDropdown: !this.state.displayCategoriesDropdown});
        };

        const limitedOfferItemsOnClick = () => {
            this.isCurrentPageItemPage() &&  this.returnToTheShopPage();
            this.props.displayLimitedItems();
            this.setState({displayCategoriesDropdown: false});
        };

        const aboutOnClick = () => {
            this.isCurrentPageItemPage() &&  this.returnToTheShopPage();
            this.props.displayAboutComponent();
            this.setState({displayCategoriesDropdown: false});
        };


        return (
            <div className="shop-header">
                <h1 className="shop-title">{this.props.shop.title}</h1>
                <img src={this.props.shop.image} alt={this.props.shop.title} />

                <div className="shop-info">
                    <CustomButton onClick={allItemsOnClick} >
                        ALL ITEMS
                    </CustomButton>

                    <CustomButton onClick={categoriesOnClick} >
                        CATEGORIES
                    </CustomButton>
                    {
                        this.state.displayCategoriesDropdown &&
                            <CategoriesDropdownWithSpinner
                                isLoading={!this.props.categoriesLoaded}
                                categories={this.props.categories}
                                history={this.props.history}
                                isCurrentPageItemPage={this.isCurrentPageItemPage}
                                returnToTheShopPage={this.returnToTheShopPage}
                            />
                    }

                    {
                        !this.isCurrentPageItemPage() &&
                            <div className="shop-search-form">
                                <SearchForm/>
                            </div>
                    }

                    <CustomButton onClick={limitedOfferItemsOnClick} >
                        LIMITED OFFER
                    </CustomButton>

                    <CustomButton onClick={aboutOnClick} >
                        ABOUT
                    </CustomButton>
                </div>
            </div>
        )
    }
}


const mapStateToProps = createStructuredSelector({
    categoriesLoaded: selectIsCategoriesLoading,
    categories: selectCategories
});

const mapDispatchToProps = dispatch => ({
    fetchCategoriesStartAsync: () => dispatch(fetchCategoriesStartAsync()),
    displayAllItems: () => dispatch(displayAllItems()),
    displayAboutComponent: () => dispatch(displayAboutComponent()),
    displayLimitedItems: () => dispatch(displayLimitedItems())
});



export default connect(mapStateToProps, mapDispatchToProps)(ShopHeader);

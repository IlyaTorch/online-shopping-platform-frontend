import React from 'react';
import {connect} from "react-redux";
import {createStructuredSelector} from "reselect";

import {API_SHOPS_URL, API_CATEGORIES_URL} from "../../url-data/urlData";

import './shopPage.scss';

import Item from "../../components/item/Item";
import About from "../../components/about/About";
import CustomButton from "../../components/custom-button/CustomButton";
import CategoriesDropdown from "../../components/categories-dropdown/CategoriesDropdown";
import SearchForm from "../../components/search-form/SearchForm";

import {selectDisplayedItems, selectItemList} from "../../redux/shopItems/shopItemsSelectors";
import {updateDisplayedItems, updateItemList} from "../../redux/shopItems/shopItemsActions";


class ShopPage extends React.Component {
    constructor(props) {
        super(props);

        this.shopId = this.props.match.params.id;

        this.state = {
            shop: {},
            categories: [],
            displayAboutComponent: false,
            displayCategoriesDropdown: false
        };

        fetch(`${API_SHOPS_URL}${this.shopId}`)
            .then(response => response.json())
            .then(shop => {
                this.setState({shop: shop});
            });

        this.setShopItemsToReduxState();

        fetch(API_CATEGORIES_URL)
            .then(response => response.json())
            .then(categories => {
                this.setState({categories: categories});
            });
    }


    setShopItemsToReduxState = () => {
        fetch(`${API_SHOPS_URL}${this.shopId}/items/`)
            .then(response => response.json())
            .then(items => {
                this.props.updateItemList(items);
                this.props.updateDisplayedItems(items);
            });
    }

    setAllShopItemsToDisplayedItems = () => {
        this.props.updateDisplayedItems(this.props.shopItems);
    }

    setItemsFromLimitOfferToDisplayedItems = () => {
        this.props.updateDisplayedItems(this.props.shopItems.filter(item => item.limit_offer_period != null));
    }

    changeDisplayAboutState = () => {
        this.setState({displayAboutComponent: !this.state.displayAboutComponent});
    }

    isDisplayAboutActive = () => this.state.displayAboutComponent;

    render() {
        return (
            <div className="shop-page-container">
                <h1 className="shop-title">{this.state.shop.title}</h1>
                <div className="shop-header">

                    <img src={this.state.shop.image} alt={this.state.shop.title} />

                    <div className="shop-info">
                        <CustomButton
                            onClick={() => {
                                    this.isDisplayAboutActive() && this.changeDisplayAboutState();
                                    this.setAllShopItemsToDisplayedItems();
                                    this.setState({displayCategoriesDropdown: false});
                                }
                            }
                        >
                            ALL ITEMS
                        </CustomButton>
                        <CustomButton
                            onClick={() => {
                                    this.setState({displayCategoriesDropdown: !this.state.displayCategoriesDropdown});
                                }
                            }
                        >
                            CATEGORIES
                        </CustomButton>
                        {
                            this.state.displayCategoriesDropdown &&
                                <CategoriesDropdown categories={this.state.categories}/>
                        }

                        <div className="shop-search-form">
                            <SearchForm />
                        </div>

                        <CustomButton
                            onClick={() => {
                                    this.isDisplayAboutActive() && this.changeDisplayAboutState();
                                    this.setItemsFromLimitOfferToDisplayedItems();
                                    this.setState({displayCategoriesDropdown: false});
                                }
                            }
                        >
                            LIMITED OFFER
                        </CustomButton>

                        <CustomButton
                            onClick={() => {
                                    this.changeDisplayAboutState();
                                    this.setState({displayCategoriesDropdown: false});
                                }
                            }
                        >
                            ABOUT
                        </CustomButton>
                    </div>
                </div>

                {
                    this.state.displayAboutComponent
                        ? <About infoAbout={this.state.shop.about}/>
                        :
                            <div className="items-container">
                                {
                                    this.props.displayedItems.map(item => <Item key={item.id} item={item}/>)
                                }
                            </div>
                }
            </div>
        )
    }
}

const mapStateToProps = createStructuredSelector({
    shopItems: selectItemList,
    displayedItems: selectDisplayedItems
});

const mapDispatchToProps = dispatch => ({
    updateItemList: items => dispatch(updateItemList(items)),
    updateDisplayedItems: items => dispatch(updateDisplayedItems(items))
});


export default connect(mapStateToProps, mapDispatchToProps)(ShopPage);

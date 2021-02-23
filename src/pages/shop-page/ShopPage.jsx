import React from 'react';
import ReactPaginate from 'react-paginate';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';

import './shopPage.scss';

import About from '../../components/about/About';
import ShopHeader from '../../components/shop-header/ShopHeader';
import ItemsList from '../../components/items-list/ItemsList';
import WithSpinner from '../../components/with-spinner/withSpinner';

import {
    selectDisplayingAllItemsStatus, selectDisplayingLimitedItems, selectDisplayingItemsFromCategory,
    selectDisplayingAboutComponentStatus,

    selectNumPages,
    selectItemList,
    selectLimitedItems,
    selectItemsFromCategory, selectDisplayingItemsByRequestFromSearchForm, selectItemsByRequestFromSearchForm,

    selectIsItemsLoading,
    selectShopObj,
    selectIsShopLoading,
} from '../../redux/shop/shopSelectors';

import {
    fetchShopStartAsync,
    fetchItemsStartAsync, fetchNumPagesAsync,
} from '../../redux/shop/shopActions';


const ShopHeaderWithSpinner = WithSpinner(ShopHeader);
const ItemsListWithSpinner = WithSpinner(ItemsList);


class ShopPage extends React.Component {
    constructor(props) {
        super(props);

        this.shopId = this.props.match.params.shopId;
    }

    componentDidMount() {
        this.props.fetchNumPagesAsync(this.shopId);
        this.props.fetchShopStartAsync(this.shopId);
        this.props.fetchItemsStartAsync(this.shopId);
    }

    handlePageClick = (data) => {
        const pageNum = data.selected + 1;

        this.props.fetchItemsStartAsync(this.shopId, pageNum);
    }

    render() {
        return (
            <div className="shop-page-container">
                <ShopHeaderWithSpinner
                    isLoading={!this.props.isShopLoaded}
                    shop={this.props.shop}
                    history={this.props.history}
                    match={this.props.match}
                />

                <div className="items-container">
                    {
                        this.props.displayAllItems ? <ItemsListWithSpinner
                            isLoading={!this.props.isItemsLoaded}
                            items={this.props.shopItems}
                        /> :
                            this.props.displayLimitedItems ? <ItemsListWithSpinner
                                isLoading={!this.props.isItemsLoaded}
                                items={this.props.limitedItems}
                            /> :
                                this.props.displayItemsByRequestFromSearchForm ? <ItemsListWithSpinner
                                    isLoading={!this.props.isItemsLoaded}
                                    items={this.props.itemsByRequestFromSearchForm}
                                /> :
                                    this.props.displayItemsFromCategory ? <ItemsListWithSpinner
                                        isLoading={!this.props.isItemsLoaded}
                                        items={this.props.itemsFromCategory}
                                    /> :
                                        this.props.displayAbout ?
                                            <About infoAbout={this.props.shop.about}/> : null
                    }
                </div>
                <ReactPaginate
                    previousLabel={'Previous'}
                    nextLabel={'Next'}
                    breakLabel={'...'}
                    breakClassName={'break-me'}
                    pageCount={this.props.numPages}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={5}
                    onPageChange={this.handlePageClick}
                    containerClassName={'pagination'}
                    activeClassName={'active'}
                    previousClassName="page-item"
                    nextClassName="page-item"
                    pageClassName="page-item"
                    pageLinkClassName="page-link"
                    previousLinkClassName="page-link"
                    nextLinkClassName="page-link"
                    disabledClassName="disabled"
                />
            </div>
        );
    }
}

const mapStateToProps = createStructuredSelector({
    isShopLoaded: selectIsShopLoading,
    shop: selectShopObj,
    isItemsLoaded: selectIsItemsLoading,
    shopItems: selectItemList,

    numPages: selectNumPages,

    limitedItems: selectLimitedItems,
    itemsFromCategory: selectItemsFromCategory,
    itemsByRequestFromSearchForm: selectItemsByRequestFromSearchForm,

    displayAllItems: selectDisplayingAllItemsStatus,
    displayLimitedItems: selectDisplayingLimitedItems,
    displayItemsFromCategory: selectDisplayingItemsFromCategory,
    displayItemsByRequestFromSearchForm: selectDisplayingItemsByRequestFromSearchForm,
    displayAbout: selectDisplayingAboutComponentStatus,
});

const mapDispatchToProps = (dispatch) => ({
    fetchNumPagesAsync: (shopId) => dispatch(fetchNumPagesAsync(shopId)),
    fetchItemsStartAsync: (shopId, pageNum) => dispatch(fetchItemsStartAsync(shopId, pageNum)),
    fetchShopStartAsync: (shopId) => dispatch(fetchShopStartAsync(shopId)),
});


export default connect(mapStateToProps, mapDispatchToProps)(ShopPage);

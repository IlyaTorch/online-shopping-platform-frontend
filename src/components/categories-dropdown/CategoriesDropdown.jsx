import React from 'react';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';

import './categoriesDropdown.scss';

import {selectItemList} from '../../redux/shop/shopSelectors';

import {updateItemsFromCategory, displayItemsFromCategory} from '../../redux/shop/shopActions';


const CategoriesDropdown = ({
    categories,
    shopItems,
    updateItemsFromCategory,
    displayItemsFromCategory,
    returnToTheShopPage,
    isCurrentPageItemPage,
}) => {
    const categoryOnClick = (category) => {
        isCurrentPageItemPage() && returnToTheShopPage();
        updateItemsFromCategory(shopItems.filter((item) => item.category === category));
        displayItemsFromCategory();
    };
    const categoryOnClickWrapper = (category) => {
        return () => {
            categoryOnClick(category);
        };
    };

    return (
        <div className="categories-dropdown">
            <div className="category-items">
                {
                    categories.length ?
                        <ul>
                            {
                                categories.map((category) =>
                                    <li
                                        key={category}
                                        onClick={categoryOnClickWrapper(category)}
                                    >
                                        {category}
                                    </li>,
                                )
                            }
                        </ul> :
                        <span className="empty">No Categories</span>
                }
            </div>
        </div>
    );
};


const mapStateToProps = createStructuredSelector({
    shopItems: selectItemList,
});


const mapDispatchToProps = (dispatch) => ({
    displayItemsFromCategory: () => dispatch(displayItemsFromCategory()),
    updateItemsFromCategory: (items) => dispatch(updateItemsFromCategory(items)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CategoriesDropdown);

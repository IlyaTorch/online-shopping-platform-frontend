import React from 'react';
import {connect} from "react-redux";

import './categoriesDropdown.scss';

import {updateDisplayedItems} from "../../redux/shopItems/shopItemsActions";
import {createStructuredSelector} from "reselect";
import {selectItemList} from "../../redux/shopItems/shopItemsSelectors";


const CategoriesDropdown = ({categories, shopItems, updateDisplayedItems}) => (
    <div className="categories-dropdown">
        <div className="category-items">
            {
                categories.length
                    ? <ul>
                        {
                            categories.map(category =>
                                <li
                                    key={category}
                                    onClick={() => updateDisplayedItems(
                                        shopItems.filter(item => item.category === category)
                                    )}
                                >
                                    {category}
                                </li>
                            )
                        }
                    </ul>
                    : <span className="empty">No Categories</span>
            }
        </div>
    </div>
);


const mapStateToProps = createStructuredSelector({
    shopItems: selectItemList,
});


const mapDispatchToProps = dispatch => ({
    updateDisplayedItems: items => dispatch(updateDisplayedItems(items))
});

export default connect(mapStateToProps, mapDispatchToProps)(CategoriesDropdown);

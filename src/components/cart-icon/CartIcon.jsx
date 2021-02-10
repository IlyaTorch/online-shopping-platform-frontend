import React from 'react';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';

import './cartIcon.scss';

import {ReactComponent as ShoppingIcon} from '../../assets/shopping-bag.svg';

import {toggleCartHidden} from '../../redux/cart/cartActions';

import {selectCartItemsCount} from '../../redux/cart/cartSelectors';


const CartIcon = ({itemCount, toggleCartHidden}) => (
    <div className="cart-icon" onClick={toggleCartHidden}>
        <ShoppingIcon className="shopping-icon"/>
        <span className="item-count">{itemCount}</span>
    </div>
);

const mapStateToProps = createStructuredSelector({
    itemCount: selectCartItemsCount,
});

const mapDispatchToProps = (dispatch) => ({
    toggleCartHidden: () => dispatch(toggleCartHidden() ),
});

export default connect(mapStateToProps, mapDispatchToProps)(CartIcon);

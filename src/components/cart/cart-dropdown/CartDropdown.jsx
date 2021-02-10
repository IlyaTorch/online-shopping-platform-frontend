import React from 'react';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';
import {withRouter} from 'react-router-dom';

import './cartDropdown.scss';
import CustomButton from '../../custom-button/CustomButton';
import CartItem from '../../cart-item/CartItem';

import {selectCartItems} from '../../../redux/cart/cartSelectors';

import {toggleCartHidden} from '../../../redux/cart/cartActions';


const CartDropdown = ({cartItems, history, dispatch}) => {
    const checkoutOnClick = () => {
        history.push('/checkout');
        dispatch(toggleCartHidden());
    };

    return (
        <div className="cart-dropdown">
            <div className="cart-items">
                {
                    cartItems.length ?
                        cartItems.map((cartItem, index) => <CartItem key={index} item={cartItem}/>) :
                        <span className="empty-message">Your cart is empty</span>
                }
            </div>

            <CustomButton onClick={checkoutOnClick}>
                GO TO CHECKOUT
            </CustomButton>
        </div>
    );
};


const mapStateToProps = createStructuredSelector({
    cartItems: selectCartItems,
});


export default withRouter(connect(mapStateToProps)(CartDropdown));

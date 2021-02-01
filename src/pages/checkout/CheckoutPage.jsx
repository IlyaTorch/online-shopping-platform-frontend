import React from "react";
import {connect} from "react-redux";
import {createStructuredSelector} from "reselect";

import {selectCartItems} from "../../redux/cart/cartSelectors";
import {selectCartTotal} from "../../redux/cart/cartSelectors";

import "./checkoutPage.scss";

import CheckoutItem from "../../components/checkout-item/CheckoutItem";
import CustomButton from "../../components/custom-button/CustomButton";


const CheckoutPage = ({cartItems, total}) => (
    <div className="checkout-page">
        <div className="checkout-header">
            <div className="header-block">
                <span>Product</span>
            </div>
            <div className="header-block">
                <span>Description</span>
            </div>
            <div className="header-block">
                <span>Quantity</span>
            </div>
            {/*<div className="header-block">*/}
            {/*    <span>Size</span>*/}
            {/*</div>*/}
            {/*<div className="header-block">*/}
            {/*    <span>Color</span>*/}
            {/*</div>*/}
            <div className="header-block">
                <span>Price</span>
            </div>
            <div className="header-block">
                <span>Remove</span>
            </div>
        </div>

        {
            cartItems.map((cartItem, index) => <CheckoutItem key={index} cartItem={cartItem} />)
        }

        <div className="total">
            <span>TOTAL: ${total}</span>
        </div>

        <CustomButton>BUY</CustomButton>
    </div>
);


const mapStateToProps = createStructuredSelector({
    cartItems: selectCartItems,
    total: selectCartTotal
});


export default connect(mapStateToProps)(CheckoutPage);

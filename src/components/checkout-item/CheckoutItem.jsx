import React from "react";
import {connect} from "react-redux";

import "./checkoutItem.scss";

import {clearItemFromCart, addItem, removeItem, updateItemsQuantity} from "../../redux/cart/cartActions";


const CheckoutItem = ({cartItem, clearItem, addItem, removeItem, updateQuantity}) => {
    const clearItemOnClick = () => clearItem(cartItem);
    const addItemOnClick = () => addItem(cartItem);
    const removeItemOnClick = () => removeItem(cartItem);

    const inputHandleChange = event => {
        if (event.target.value <= cartItem.total_quantity) {
            updateQuantity (cartItem, event.target.value);
        }
    }

    return (
        <div className="checkout-item">
            <div className="image-container">
                <img src={cartItem.images[0]} alt="item"/>
            </div>

            <span className="title">
            {cartItem.title}<br/>
            <b>SIZE: {cartItem.size}</b><br/>
            <b>COLOR: {cartItem.color}</b>
            </span>
            <span className="quantity">
                <div className="arrow" onClick={removeItemOnClick}>&#10094;</div>
                <input type="number" value={cartItem.quantity} onChange={inputHandleChange} max={cartItem.total_quantity}/>
                <div className="arrow" onClick={addItemOnClick}>&#10095;</div>
            </span>
            <span className="price">{cartItem.price}</span>
            <div className="remove-button" onClick={clearItemOnClick}>
                &#10005;
            </div>
        </div>
    );
};


const mapDispatchToProps = dispatch => ({
    clearItem: item => dispatch(clearItemFromCart(item)),
    addItem: item => dispatch(addItem(item)),
    removeItem: item => dispatch(removeItem(item)),
    updateQuantity: (item, quantity) => dispatch(updateItemsQuantity(item, quantity))
})


export default connect(null, mapDispatchToProps)(CheckoutItem);

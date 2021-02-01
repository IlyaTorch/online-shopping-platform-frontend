import React from "react";

import "./cartItem.scss";


const CartItem = ({item}) => (
    <div className="cart-item">
        <img src={item.images[0]} alt="item"/>
        <div className="item-details">
            <span className="title">
                {item.title}
            </span>

            <span className="price">
                {item.quantity} x ${item.price}
            </span>
        </div>
    </div>
);


export default CartItem;
